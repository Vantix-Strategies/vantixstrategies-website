# The website's own image repo. Deliberately NOT the shared `vantix-services`
# repo in vantix-strategies — pulling across projects would mean granting this
# project's Cloud Run service agent reader on a repo owned by another project,
# which re-couples the two systems we're trying to separate.
resource "google_artifact_registry_repository" "containers" {
  project       = var.project
  location      = var.region
  repository_id = var.artifact_repo
  format        = "DOCKER"
  description   = "Vantix website container images"

  # Every merge to main pushes a new :<sha> image. Without this, storage grows
  # unbounded and nothing ever reclaims it.
  cleanup_policies {
    id     = "keep-recent-releases"
    action = "KEEP"
    most_recent_versions {
      keep_count = 20
    }
  }

  cleanup_policies {
    id     = "delete-old-untagged"
    action = "DELETE"
    condition {
      tag_state  = "UNTAGGED"
      older_than = "604800s" # 7 days
    }
  }

  depends_on = [google_project_service.enabled]
}
