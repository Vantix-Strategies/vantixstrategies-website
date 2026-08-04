# Keyless GitHub Actions -> GCP auth via Workload Identity Federation.
# No JSON service-account keys exist anywhere in this setup.
#
# Two service accounts, because `terraform apply` runs automatically on merge to
# main and PR branches must not be able to reach that privilege:
#
#   github-planner   read-only  · any ref in this repo   · runs `terraform plan`
#   github-deployer  privileged · refs/heads/main ONLY   · runs `terraform apply`
#
# A PR that edits .github/workflows still cannot escalate: the deployer binding
# is pinned to the main ref, so it can only be impersonated by a workflow that
# has already been merged and reviewed.

resource "google_iam_workload_identity_pool" "github" {
  project                   = var.project
  workload_identity_pool_id = "github-pool"
  display_name              = "GitHub Actions"

  depends_on = [google_project_service.enabled]
}

resource "google_iam_workload_identity_pool_provider" "github" {
  project                            = var.project
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "GitHub provider"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
    "attribute.ref"        = "assertion.ref"
    # A principalSet can only match ONE attribute, so repo and ref are combined
    # into a single synthetic attribute to pin the deployer to main.
    "attribute.repository_ref" = "assertion.repository + '@' + assertion.ref"
  }

  # Pin trust to our repo only, before any binding is even considered.
  attribute_condition = "assertion.repository=='${var.github_repo}'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

# ── Planner: read-only, any ref ────────────────────────────────────────────
resource "google_service_account" "planner" {
  project      = var.project
  account_id   = "github-planner"
  display_name = "GitHub Actions planner (PR terraform plan)"
}

resource "google_project_iam_member" "planner_viewer" {
  project = var.project
  role    = "roles/viewer"
  member  = "serviceAccount:${google_service_account.planner.email}"
}

# `terraform plan` writes a lock object, so read-only on the bucket is not
# enough. Scoped to the state bucket — the planner gets no other storage access.
resource "google_storage_bucket_iam_member" "planner_state" {
  bucket = var.tf_state_bucket
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.planner.email}"
}

resource "google_service_account_iam_member" "planner_wif" {
  service_account_id = google_service_account.planner.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${var.github_repo}"
}

# ── Deployer: privileged, main only ────────────────────────────────────────
resource "google_service_account" "deployer" {
  project      = var.project
  account_id   = "github-deployer"
  display_name = "GitHub Actions deployer (main branch apply)"
}

locals {
  # Broad because Terraform manages IAM, secrets and WIF itself. Narrower than
  # the sendscape equivalent — no SQL/tasks/pubsub/scheduler here. The
  # compensating controls are the reviewed PR plan and the main-only WIF pin.
  deployer_roles = [
    "roles/run.admin",
    "roles/cloudbuild.builds.editor",
    "roles/artifactregistry.admin",
    "roles/secretmanager.admin",
    "roles/iam.serviceAccountAdmin",
    "roles/resourcemanager.projectIamAdmin",
    "roles/iam.workloadIdentityPoolAdmin",
    "roles/serviceusage.serviceUsageAdmin",
    "roles/logging.viewer", # stream Cloud Build logs
    "roles/storage.admin",  # tf state bucket + the _cloudbuild source staging bucket
  ]
}

resource "google_project_iam_member" "deployer" {
  for_each = toset(local.deployer_roles)

  project = var.project
  role    = each.value
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

# Deploys Cloud Run AS the runtime SA, and submits builds AS the build SA.
# Both require actAs on the target account.
resource "google_service_account_iam_member" "deployer_act_as_runtime" {
  service_account_id = google_service_account.runtime.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.deployer.email}"
}

resource "google_service_account_iam_member" "deployer_act_as_cloudbuild" {
  service_account_id = google_service_account.cloudbuild.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.deployer.email}"
}

# The main-branch pin. Note this is attribute.repository_ref, not
# attribute.repository — a PR branch cannot satisfy it.
resource "google_service_account_iam_member" "deployer_wif" {
  service_account_id = google_service_account.deployer.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository_ref/${var.github_repo}@${var.deploy_branch_ref}"
}
