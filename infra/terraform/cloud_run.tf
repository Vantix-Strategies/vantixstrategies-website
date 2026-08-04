# The website itself. Terraform owns the deploy — cloudbuild.yaml only builds
# and pushes the image; it must never run `gcloud run deploy`.
#
# NOTE: NEXT_PUBLIC_SITE_URL is deliberately absent below. Next inlines
# NEXT_PUBLIC_* into the client bundle at BUILD time, so setting it here would
# be a no-op for anything rendered in the browser and would drift from the value
# baked into the image. It is a Docker build-arg instead (see Dockerfile /
# cloudbuild.yaml `_SITE_URL`).
locals {
  # Plain (non-secret) env vars.
  run_env = {
    SMTP_PORT        = tostring(var.smtp_port)
    CONTACT_TO_EMAIL = var.contact_to_email
  }

  # Env var name => Secret Manager secret id (always :latest).
  run_secrets = {
    SMTP_HOST = "smtp-host"
    SMTP_USER = "smtp-user"
    SMTP_PASS = "smtp-pass"
    SMTP_FROM = "smtp-from"
  }
}

resource "google_cloud_run_v2_service" "website" {
  project  = var.project
  name     = local.cloud_run_service
  location = var.region

  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = true

  template {
    service_account = google_service_account.runtime.email

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    containers {
      image = local.image

      # Must match ENV PORT in the Dockerfile's runner stage.
      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = var.cpu
          memory = var.memory
        }
        # CPU is only allocated while a request is in flight. Correct for a
        # marketing site; revisit if background work is ever added.
        cpu_idle = true
      }

      dynamic "env" {
        for_each = local.run_env
        content {
          name  = env.key
          value = env.value
        }
      }

      dynamic "env" {
        for_each = local.run_secrets
        content {
          name = env.key
          value_source {
            secret_key_ref {
              secret  = env.value
              version = "latest"
            }
          }
        }
      }
    }
  }

  depends_on = [
    google_project_iam_member.runtime,
    google_secret_manager_secret_iam_member.runtime_accessor,
    google_project_service.enabled,
  ]

  lifecycle {
    # The API re-stamps these deploy-metadata fields on every revision, so they
    # would otherwise show a perpetual no-op diff. Revision scaling stays
    # Terraform-managed via template.scaling above.
    ignore_changes = [
      client,
      client_version,
      scaling,
    ]
  }
}

# Public website: anyone can invoke it.
resource "google_cloud_run_v2_service_iam_member" "public" {
  project  = var.project
  location = var.region
  name     = google_cloud_run_v2_service.website.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
