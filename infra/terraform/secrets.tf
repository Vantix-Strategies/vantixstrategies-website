# Secret CONTAINERS only — values are never managed here and never enter
# Terraform state. Set them out-of-band, once, with:
#
#   gcloud secrets versions add smtp-pass --project=vantixstrategies-website --data-file=- <<< '<value>'
#
# Only the credential half of the SMTP config lives in Secret Manager. The port
# and the recipient address are plain Terraform variables (see variables.tf) —
# they are not secrets and putting them here would just add cutover steps.
locals {
  secret_ids = [
    "smtp-host",
    "smtp-user",
    "smtp-pass",
    "smtp-from",
  ]
}

resource "google_secret_manager_secret" "app" {
  for_each = toset(local.secret_ids)

  project   = var.project
  secret_id = each.value

  replication {
    auto {}
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [labels]
  }

  depends_on = [google_project_service.enabled]
}

# Scoped per-secret rather than a project-wide secretmanager.secretAccessor, so
# the runtime SA can only read the four secrets it actually needs.
resource "google_secret_manager_secret_iam_member" "runtime_accessor" {
  for_each = google_secret_manager_secret.app

  project   = var.project
  secret_id = each.value.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.runtime.email}"
}
