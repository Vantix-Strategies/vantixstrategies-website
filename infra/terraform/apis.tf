# Project APIs. bootstrap.sh enables these first (Terraform itself needs several
# of them to run at all); imports.sh then brings them under management here so
# the enabled set is codified rather than remembered.
#
# disable_on_destroy = false: turning an API off is a project-wide, blast-radius
# action we never want a `terraform destroy` of one resource to trigger.
locals {
  project_apis = [
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "compute.googleapis.com", # Artifact Registry / Cloud Build dependency
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
    "run.googleapis.com",
    "secretmanager.googleapis.com",
    "serviceusage.googleapis.com",
    "storage.googleapis.com",
    "sts.googleapis.com", # Workload Identity Federation token exchange
  ]
}

resource "google_project_service" "enabled" {
  for_each = toset(local.project_apis)

  project = var.project
  service = each.value

  disable_on_destroy         = false
  disable_dependent_services = false
}
