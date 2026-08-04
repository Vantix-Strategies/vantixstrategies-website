#!/usr/bin/env bash
#
# Vantix website — ONE-TIME GCP bootstrap.
#
# Creates the dedicated GCP project and the handful of things Terraform cannot
# create for itself (it needs them to exist in order to run at all):
#
#   1. the project + billing link
#   2. the APIs Terraform's own provider calls
#   3. the GCS bucket holding Terraform remote state
#   4. the service accounts + WIF pool GitHub Actions authenticates through
#   5. the GitHub repo variables the workflows read
#
# Everything here is ALSO codified in the .tf files and pulled into state by
# imports.sh immediately afterwards — this script just breaks the chicken-and-egg.
#
# Run by a user with project-creation + billing rights, after `gcloud auth login`:
#
#   ORG_ID=<id> BILLING_ACCOUNT=<id> ./infra/terraform/bootstrap.sh
#
# Idempotent. Safe to re-run.
set -euo pipefail

PROJECT="${PROJECT:-vantixstrategies-website}"
PROJECT_NAME="${PROJECT_NAME:-vantixstrategies-website}"
REGION="${REGION:-us-central1}"
STATE_BUCKET="${STATE_BUCKET:-vantixstrategies-website-tf-state}"
GITHUB_REPO="${GITHUB_REPO:-Vantix-Strategies/vantixstrategies-website}"
DEPLOY_BRANCH_REF="${DEPLOY_BRANCH_REF:-refs/heads/main}"
ORG_ID="${ORG_ID:-}"
BILLING_ACCOUNT="${BILLING_ACCOUNT:-}"

DEPLOYER_SA="github-deployer@${PROJECT}.iam.gserviceaccount.com"
PLANNER_SA="github-planner@${PROJECT}.iam.gserviceaccount.com"
RUNTIME_SA="website-runtime@${PROJECT}.iam.gserviceaccount.com"
BUILD_SA="cloudbuild-runner@${PROJECT}.iam.gserviceaccount.com"

say() { printf "\n\033[1;36m== %s ==\033[0m\n" "$1"; }
note() { printf "   %s\n" "$1"; }

# ── 0. Preflight ───────────────────────────────────────────────────────────
say "0. Preflight"
gcloud auth print-access-token >/dev/null 2>&1 || {
  echo "Not authenticated. Run: gcloud auth login" >&2
  exit 1
}

if [[ -z "$BILLING_ACCOUNT" ]]; then
  # Avoid `mapfile` — macOS ships bash 3.2, where it does not exist.
  ACCOUNTS="$(gcloud billing accounts list --filter='open=true' --format='value(name)')"
  ACCOUNT_COUNT="$(printf '%s\n' "$ACCOUNTS" | grep -c . || true)"
  if [[ "$ACCOUNT_COUNT" -eq 1 ]]; then
    BILLING_ACCOUNT="${ACCOUNTS#billingAccounts/}"
    note "auto-detected billing account: ${BILLING_ACCOUNT}"
  else
    echo "Set BILLING_ACCOUNT=<id> (found ${ACCOUNT_COUNT} open accounts)." >&2
    gcloud billing accounts list >&2
    exit 1
  fi
fi
note "project:  ${PROJECT}"
note "region:   ${REGION}"
note "repo:     ${GITHUB_REPO}"

# ── 1. Project ─────────────────────────────────────────────────────────────
say "1. Project (${PROJECT})"
if gcloud projects describe "$PROJECT" >/dev/null 2>&1; then
  note "already exists, skip"
else
  # Project IDs are globally unique; a clash here means picking another id.
  if [[ -n "$ORG_ID" ]]; then
    gcloud projects create "$PROJECT" --name="$PROJECT_NAME" --organization="$ORG_ID"
  else
    note "no ORG_ID set — creating a standalone project (no org parent)"
    gcloud projects create "$PROJECT" --name="$PROJECT_NAME"
  fi
fi

say "2. Billing"
if gcloud billing projects describe "$PROJECT" --format='value(billingEnabled)' 2>/dev/null | grep -qi true; then
  note "already linked, skip"
else
  gcloud billing projects link "$PROJECT" --billing-account="$BILLING_ACCOUNT"
fi

# ── 3. APIs (must match local.project_apis in apis.tf) ─────────────────────
say "3. APIs"
APIS=(
  artifactregistry.googleapis.com
  cloudbuild.googleapis.com
  cloudresourcemanager.googleapis.com
  compute.googleapis.com
  iam.googleapis.com
  iamcredentials.googleapis.com
  logging.googleapis.com
  monitoring.googleapis.com
  run.googleapis.com
  secretmanager.googleapis.com
  serviceusage.googleapis.com
  storage.googleapis.com
  sts.googleapis.com
)
gcloud services enable "${APIS[@]}" --project "$PROJECT"
note "enabled ${#APIS[@]} APIs"

# ── 4. Terraform state bucket ──────────────────────────────────────────────
say "4. Terraform state (gs://${STATE_BUCKET})"
if ! gcloud storage buckets describe "gs://${STATE_BUCKET}" --project "$PROJECT" >/dev/null 2>&1; then
  gcloud storage buckets create "gs://${STATE_BUCKET}" \
    --project "$PROJECT" --location "$REGION" --uniform-bucket-level-access
fi
# Versioning lets us recover a clobbered/corrupted state file.
gcloud storage buckets update "gs://${STATE_BUCKET}" --versioning --project "$PROJECT" >/dev/null

# GCS adds default projectViewer/projectEditor grants on creation, which would
# let any project Viewer read Terraform state. Strip them: only project Owners
# and the CI service accounts (granted explicitly below) should reach it.
for pair in \
  "roles/storage.legacyBucketReader:projectViewer:${PROJECT}" \
  "roles/storage.legacyObjectReader:projectViewer:${PROJECT}" \
  "roles/storage.legacyBucketOwner:projectEditor:${PROJECT}" \
  "roles/storage.legacyObjectOwner:projectEditor:${PROJECT}"; do
  gcloud storage buckets remove-iam-policy-binding "gs://${STATE_BUCKET}" \
    --role="${pair%%:*}" --member="${pair#*:}" --project "$PROJECT" >/dev/null 2>&1 || true
done
note "versioning on, default viewer/editor grants stripped"

# ── 5. Service accounts ────────────────────────────────────────────────────
say "5. Service accounts"
mk_sa() { # mk_sa <account_id> <display name>
  if gcloud iam service-accounts describe "${1}@${PROJECT}.iam.gserviceaccount.com" \
    --project "$PROJECT" >/dev/null 2>&1; then
    note "exists: $1"
  else
    gcloud iam service-accounts create "$1" --project "$PROJECT" --display-name="$2"
    note "created: $1"
  fi
}
mk_sa github-deployer   "GitHub Actions deployer (main branch apply)"
mk_sa github-planner    "GitHub Actions planner (PR terraform plan)"
mk_sa website-runtime   "Vantix website runtime"
mk_sa cloudbuild-runner "Cloud Build runner (website image)"

say "6. Project IAM (must match cicd.tf / iam.tf)"
grant() { # grant <member> <role>
  gcloud projects add-iam-policy-binding "$PROJECT" \
    --member="$1" --role="$2" --condition=None >/dev/null
  note "$2 -> ${1#serviceAccount:}"
}

# Deployer: matches local.deployer_roles in cicd.tf.
for role in roles/run.admin roles/cloudbuild.builds.editor roles/artifactregistry.admin \
  roles/secretmanager.admin roles/iam.serviceAccountAdmin \
  roles/resourcemanager.projectIamAdmin roles/iam.workloadIdentityPoolAdmin \
  roles/serviceusage.serviceUsageAdmin roles/logging.viewer roles/storage.admin; do
  grant "serviceAccount:${DEPLOYER_SA}" "$role"
done

# Planner: read-only. State-bucket write is bucket-scoped, granted below.
grant "serviceAccount:${PLANNER_SA}" roles/viewer

# Runtime: matches local.runtime_roles in iam.tf (secret access is per-secret).
for role in roles/logging.logWriter roles/monitoring.metricWriter; do
  grant "serviceAccount:${RUNTIME_SA}" "$role"
done

# Cloud Build: matches local.cloudbuild_roles in iam.tf.
for role in roles/artifactregistry.writer roles/logging.logWriter roles/storage.objectViewer; do
  grant "serviceAccount:${BUILD_SA}" "$role"
done

say "7. State bucket IAM (planner)"
gcloud storage buckets add-iam-policy-binding "gs://${STATE_BUCKET}" \
  --member="serviceAccount:${PLANNER_SA}" --role=roles/storage.objectAdmin \
  --project "$PROJECT" >/dev/null
note "objectAdmin -> ${PLANNER_SA}"

say "8. actAs bindings"
gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SA" \
  --project "$PROJECT" --member="serviceAccount:${DEPLOYER_SA}" \
  --role=roles/iam.serviceAccountUser >/dev/null
gcloud iam service-accounts add-iam-policy-binding "$BUILD_SA" \
  --project "$PROJECT" --member="serviceAccount:${DEPLOYER_SA}" \
  --role=roles/iam.serviceAccountUser >/dev/null
note "deployer can act as the runtime and build accounts"

# ── 9. Workload Identity Federation ────────────────────────────────────────
say "9. Workload Identity Federation"
if ! gcloud iam workload-identity-pools describe github-pool \
  --project "$PROJECT" --location=global >/dev/null 2>&1; then
  gcloud iam workload-identity-pools create github-pool \
    --project "$PROJECT" --location=global --display-name="GitHub Actions"
fi

if ! gcloud iam workload-identity-pools providers describe github-provider \
  --project "$PROJECT" --location=global --workload-identity-pool=github-pool >/dev/null 2>&1; then
  gcloud iam workload-identity-pools providers create-oidc github-provider \
    --project "$PROJECT" --location=global --workload-identity-pool=github-pool \
    --display-name="GitHub provider" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref,attribute.repository_ref=assertion.repository + '@' + assertion.ref" \
    --attribute-condition="assertion.repository=='${GITHUB_REPO}'"
fi

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')"
POOL="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool"

# Planner: any ref in the repo. Deployer: the main ref only.
gcloud iam service-accounts add-iam-policy-binding "$PLANNER_SA" \
  --project "$PROJECT" --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/${POOL}/attribute.repository/${GITHUB_REPO}" >/dev/null
gcloud iam service-accounts add-iam-policy-binding "$DEPLOYER_SA" \
  --project "$PROJECT" --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/${POOL}/attribute.repository_ref/${GITHUB_REPO}@${DEPLOY_BRANCH_REF}" >/dev/null
note "planner: any ref · deployer: ${DEPLOY_BRANCH_REF} only"

# ── 10. Secret containers ──────────────────────────────────────────────────
# Created empty here so the first `terraform plan` has something to import.
# VALUES are added out-of-band — see the next-steps block below.
say "10. Secret containers"
for s in smtp-host smtp-user smtp-pass smtp-from; do
  if gcloud secrets describe "$s" --project "$PROJECT" >/dev/null 2>&1; then
    note "exists: $s"
  else
    gcloud secrets create "$s" --project "$PROJECT" --replication-policy=automatic
    note "created: $s (no versions yet)"
  fi
done

# ── 11. GitHub repo variables ──────────────────────────────────────────────
say "11. GitHub repo variables"
PROVIDER="${POOL}/providers/github-provider"
if command -v gh >/dev/null 2>&1; then
  gh variable set GCP_PROJECT_ID  --repo "$GITHUB_REPO" --body "$PROJECT"
  gh variable set GCP_WIF_PROVIDER --repo "$GITHUB_REPO" --body "$PROVIDER"
  gh variable set GCP_DEPLOYER_SA  --repo "$GITHUB_REPO" --body "$DEPLOYER_SA"
  gh variable set GCP_PLANNER_SA   --repo "$GITHUB_REPO" --body "$PLANNER_SA"
  note "set 4 repo variables via gh"
else
  note "gh CLI not found — set these repo variables manually:"
  note "  GCP_PROJECT_ID   = ${PROJECT}"
  note "  GCP_WIF_PROVIDER = ${PROVIDER}"
  note "  GCP_DEPLOYER_SA  = ${DEPLOYER_SA}"
  note "  GCP_PLANNER_SA   = ${PLANNER_SA}"
fi

cat <<EOF

────────────────────────────────────────────────────────────
✅ Bootstrap complete.

1. Add the SMTP secret VALUES (never stored in Terraform):

   gcloud secrets versions add smtp-host --project=${PROJECT} --data-file=- <<< 'smtp.example.com'
   gcloud secrets versions add smtp-user --project=${PROJECT} --data-file=- <<< '<user>'
   gcloud secrets versions add smtp-pass --project=${PROJECT} --data-file=- <<< '<app password>'
   gcloud secrets versions add smtp-from --project=${PROJECT} --data-file=- <<< '<sender@vantixstrategies.com>'

   smtp-from MUST differ from CONTACT_TO_EMAIL (${PROJECT}) or the contact route
   rejects the send — see src/app/api/contact/route.ts.

2. Import what this script just created, then confirm a clean plan:

   cd infra/terraform
   terraform init
   ./imports.sh
   terraform plan     # expect only benign in-place updates, zero destroys

3. Build the first image, then apply:

   gcloud builds submit --config cloudbuild.yaml --project ${PROJECT} \\
     --substitutions=_TAG=bootstrap .
   terraform apply -var="image_tag=bootstrap"
────────────────────────────────────────────────────────────
EOF
