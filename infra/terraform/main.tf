provider "google" {
  project = var.project
  region  = var.region
}

# Used to derive the project number (WIF principalSet strings need it).
data "google_project" "this" {
  project_id = var.project
}

locals {
  runtime_sa_email    = google_service_account.runtime.email
  deployer_sa_email   = google_service_account.deployer.email
  planner_sa_email    = google_service_account.planner.email
  cloudbuild_sa_email = google_service_account.cloudbuild.email

  cloud_run_service = "vantixstrategies-website"
  image_name        = "website"
  image             = "${var.region}-docker.pkg.dev/${var.project}/${var.artifact_repo}/${local.image_name}:${var.image_tag}"
}
