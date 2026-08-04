# Remote state lives in a GCS bucket created once by bootstrap.sh (NOT managed
# here, to avoid a chicken-and-egg between the backend and the state it holds).
terraform {
  backend "gcs" {
    bucket = "vantixstrategies-website-tf-state"
    prefix = "website"
  }
}
