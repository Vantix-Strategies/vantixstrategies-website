# Service account the Cloud Run service runs AS. Intentionally minimal: the
# website reads four secrets and writes logs/metrics. Nothing else.
resource "google_service_account" "runtime" {
  project      = var.project
  account_id   = "website-runtime"
  display_name = "Vantix website runtime"
}

locals {
  # Secret access is granted per-secret in secrets.tf, not here.
  # A non-default runtime SA gets NO permissions implicitly — without these two
  # the service runs but silently emits no logs or metrics.
  runtime_roles = [
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
  ]
}

resource "google_project_iam_member" "runtime" {
  for_each = toset(local.runtime_roles)

  project = var.project
  role    = each.value
  member  = "serviceAccount:${google_service_account.runtime.email}"
}

# ── Cloud Build ────────────────────────────────────────────────────────────
# A dedicated build SA rather than the Compute Engine default. Projects created
# after mid-2024 no longer get the legacy Cloud Build SA behaviour, so builds
# must name the account they run as (see `serviceAccount:` in cloudbuild.yaml).
resource "google_service_account" "cloudbuild" {
  project      = var.project
  account_id   = "cloudbuild-runner"
  display_name = "Cloud Build runner (website image)"
}

locals {
  cloudbuild_roles = [
    "roles/artifactregistry.writer", # push the built image
    "roles/logging.logWriter",       # required by logging = CLOUD_LOGGING_ONLY
    "roles/storage.objectViewer",    # read the uploaded source tarball
  ]
}

resource "google_project_iam_member" "cloudbuild" {
  for_each = toset(local.cloudbuild_roles)

  project = var.project
  role    = each.value
  member  = "serviceAccount:${google_service_account.cloudbuild.email}"
}
