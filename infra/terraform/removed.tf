# One-time adoption step.
#
# An earlier, uncommitted version of this configuration managed the GCP project
# itself as `resource "google_project" "this"`. This configuration deliberately
# does not: a `terraform destroy` — or simply dropping the resource block —
# would then plan to DELETE the whole project. The project is created once by
# bootstrap.sh and lives outside Terraform's blast radius.
#
# `destroy = false` makes Terraform forget the resource without touching the
# real project. This is the reviewable equivalent of running
# `terraform state rm google_project.this` by hand.
#
# SAFE TO DELETE once this has applied successfully — after that it is a no-op.
removed {
  from = google_project.this

  lifecycle {
    destroy = false
  }
}
