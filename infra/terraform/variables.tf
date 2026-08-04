variable "project" {
  description = "GCP project ID. Dedicated to the website — NOT the shared vantix-strategies project."
  type        = string
  default     = "vantixstrategies-website"
}

variable "region" {
  description = "Default GCP region."
  type        = string
  default     = "us-central1"
}

variable "github_repo" {
  description = "owner/name of the GitHub repo allowed to impersonate the CI service accounts via WIF."
  type        = string
  default     = "Vantix-Strategies/vantixstrategies-website"
}

variable "deploy_branch_ref" {
  description = "Git ref allowed to impersonate the (privileged) deployer SA. Everything else can only plan."
  type        = string
  default     = "refs/heads/main"
}

variable "artifact_repo" {
  description = "Artifact Registry repository holding the website image."
  type        = string
  default     = "containers"
}

variable "tf_state_bucket" {
  description = "GCS bucket holding Terraform remote state. Created by bootstrap.sh; only its IAM is managed here."
  type        = string
  default     = "vantixstrategies-website-tf-state"
}

# CI sets this to the commit SHA on each deploy so every Cloud Run revision gets
# an immutable image tag. Defaults to "latest" for a manual `terraform apply`.
variable "image_tag" {
  description = "Container image tag to deploy to Cloud Run."
  type        = string
  default     = "latest"
}

variable "min_instances" {
  description = <<-EOT
    Cloud Run min instances. 0 keeps idle cost at ~$0 but adds a ~1-2s cold start
    to the first request after a quiet period. Raise to 1 (~$10-20/mo) if cold
    starts start showing up in Core Web Vitals once the domain is cut over.
  EOT
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Cloud Run max instances."
  type        = number
  default     = 10
}

variable "cpu" {
  description = "Cloud Run CPU limit per instance."
  type        = string
  default     = "1000m"
}

variable "memory" {
  description = "Cloud Run memory limit per instance."
  type        = string
  default     = "512Mi"
}

variable "smtp_port" {
  description = "SMTP port for the contact form. Not a secret; 465 switches nodemailer to implicit TLS."
  type        = number
  default     = 587
}

variable "contact_to_email" {
  description = "Recipient of contact-form submissions. Already public on the site, so not a secret."
  type        = string
  default     = "hello@vantixstrategies.com"
}
