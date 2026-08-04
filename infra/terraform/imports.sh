#!/usr/bin/env bash
#
# Vantix website Terraform — import the resources bootstrap.sh created into
# state. Run ONCE, after `bootstrap.sh` + `terraform init`, from infra/terraform/:
#
#   ./imports.sh
#
# Idempotent: each resource is skipped if it is already in state. Afterwards
# `terraform plan` MUST show zero destroys and zero creates of the imported
# resources — only benign in-place updates (descriptions, cleanup policies).
# Iterate on the .tf config until that is true BEFORE the first apply.
set -euo pipefail

PROJECT="${PROJECT:-vantixstrategies-website}"
REGION="${REGION:-us-central1}"
STATE_BUCKET="${STATE_BUCKET:-vantixstrategies-website-tf-state}"

DEPLOYER_SA="github-deployer@${PROJECT}.iam.gserviceaccount.com"
PLANNER_SA="github-planner@${PROJECT}.iam.gserviceaccount.com"
RUNTIME_SA="website-runtime@${PROJECT}.iam.gserviceaccount.com"
BUILD_SA="cloudbuild-runner@${PROJECT}.iam.gserviceaccount.com"

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')"

# imp <terraform address> <import id> — import only if not already in state.
imp() {
  if terraform state show "$1" >/dev/null 2>&1; then
    echo "  in state, skip: $1"
  else
    echo "  import: $1"
    terraform import -input=false "$1" "$2"
  fi
}

echo "== Project APIs =="
for api in artifactregistry cloudbuild cloudresourcemanager compute iam \
  iamcredentials logging monitoring run secretmanager serviceusage storage sts; do
  imp "google_project_service.enabled[\"${api}.googleapis.com\"]" "${PROJECT}/${api}.googleapis.com"
done

echo "== Secrets =="
for s in smtp-host smtp-user smtp-pass smtp-from; do
  imp "google_secret_manager_secret.app[\"${s}\"]" "projects/${PROJECT}/secrets/${s}"
done

echo "== Service accounts =="
imp google_service_account.runtime "projects/${PROJECT}/serviceAccounts/${RUNTIME_SA}"
imp google_service_account.cloudbuild "projects/${PROJECT}/serviceAccounts/${BUILD_SA}"
imp google_service_account.deployer "projects/${PROJECT}/serviceAccounts/${DEPLOYER_SA}"
imp google_service_account.planner "projects/${PROJECT}/serviceAccounts/${PLANNER_SA}"

echo "== Runtime IAM =="
for role in roles/logging.logWriter roles/monitoring.metricWriter; do
  imp "google_project_iam_member.runtime[\"${role}\"]" \
    "${PROJECT} ${role} serviceAccount:${RUNTIME_SA}"
done

echo "== Cloud Build IAM =="
for role in roles/artifactregistry.writer roles/logging.logWriter roles/storage.objectViewer; do
  imp "google_project_iam_member.cloudbuild[\"${role}\"]" \
    "${PROJECT} ${role} serviceAccount:${BUILD_SA}"
done

echo "== Deployer IAM =="
for role in roles/run.admin roles/cloudbuild.builds.editor roles/artifactregistry.admin \
  roles/secretmanager.admin roles/iam.serviceAccountAdmin \
  roles/resourcemanager.projectIamAdmin roles/iam.workloadIdentityPoolAdmin \
  roles/serviceusage.serviceUsageAdmin roles/logging.viewer roles/storage.admin; do
  imp "google_project_iam_member.deployer[\"${role}\"]" \
    "${PROJECT} ${role} serviceAccount:${DEPLOYER_SA}"
done
imp google_service_account_iam_member.deployer_act_as_runtime \
  "projects/${PROJECT}/serviceAccounts/${RUNTIME_SA} roles/iam.serviceAccountUser serviceAccount:${DEPLOYER_SA}"
imp google_service_account_iam_member.deployer_act_as_cloudbuild \
  "projects/${PROJECT}/serviceAccounts/${BUILD_SA} roles/iam.serviceAccountUser serviceAccount:${DEPLOYER_SA}"

echo "== Planner IAM =="
imp google_project_iam_member.planner_viewer \
  "${PROJECT} roles/viewer serviceAccount:${PLANNER_SA}"
imp google_storage_bucket_iam_member.planner_state \
  "b/${STATE_BUCKET} roles/storage.objectAdmin serviceAccount:${PLANNER_SA}"

echo "== Workload Identity Federation =="
imp google_iam_workload_identity_pool.github \
  "projects/${PROJECT}/locations/global/workloadIdentityPools/github-pool"
imp google_iam_workload_identity_pool_provider.github \
  "projects/${PROJECT}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"

POOL="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool"
GITHUB_REPO="${GITHUB_REPO:-Vantix-Strategies/vantixstrategies-website}"
DEPLOY_BRANCH_REF="${DEPLOY_BRANCH_REF:-refs/heads/main}"

imp google_service_account_iam_member.planner_wif \
  "projects/${PROJECT}/serviceAccounts/${PLANNER_SA} roles/iam.workloadIdentityUser principalSet://iam.googleapis.com/${POOL}/attribute.repository/${GITHUB_REPO}"
imp google_service_account_iam_member.deployer_wif \
  "projects/${PROJECT}/serviceAccounts/${DEPLOYER_SA} roles/iam.workloadIdentityUser principalSet://iam.googleapis.com/${POOL}/attribute.repository_ref/${GITHUB_REPO}@${DEPLOY_BRANCH_REF}"

echo
echo "Note: the Artifact Registry repo and the Cloud Run service are NOT imported."
echo "Neither exists yet — Terraform creates both on the first apply."
echo
echo "✅ Imports done. Now run: terraform plan  (expect zero destroys)"
