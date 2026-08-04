output "cloud_run_url" {
  description = "Public URL of the Cloud Run service."
  value       = google_cloud_run_v2_service.website.uri
}

output "deployed_image" {
  description = "Image currently deployed to Cloud Run."
  value       = local.image
}

output "artifact_repo_url" {
  description = "Artifact Registry base path for the website image."
  value       = "${var.region}-docker.pkg.dev/${var.project}/${var.artifact_repo}"
}

# ── GitHub Actions repo variables ──────────────────────────────────────────
output "wif_provider" {
  description = "GCP_WIF_PROVIDER repo variable."
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "deployer_sa" {
  description = "GCP_DEPLOYER_SA repo variable (main-branch apply)."
  value       = google_service_account.deployer.email
}

output "planner_sa" {
  description = "GCP_PLANNER_SA repo variable (PR plan)."
  value       = google_service_account.planner.email
}

output "project_id" {
  description = "GCP_PROJECT_ID repo variable."
  value       = var.project
}
