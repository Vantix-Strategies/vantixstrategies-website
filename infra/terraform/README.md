# Vantix website infrastructure (Terraform)

**Terraform is the single source of truth for the GCP infrastructure _and_ the
Cloud Run deploy.** Nothing is created by hand, and nothing is deployed with
`gcloud run deploy`.

The site runs in its own project — `vantixstrategies-website` — deliberately
separate from the shared `vantix-strategies` project that hosts Sendscape.
Separate project, separate state bucket, separate Artifact Registry repo,
separate billing line. No resource is shared between the two.

## Status

The project, state, and service are **live**. Terraform state lives at
`gs://vantixstrategies-website-tf-state/website/default.tfstate`.

One thing is **not** done: the service is not publicly reachable. See
[Public access](#public-access-org-policy) below — it is blocked by an
organization policy, not by anything in this configuration.

The domain has **not** been cut over. `www.vantixstrategies.com` is still served
by Vercel, so the migration currently carries no user-facing risk.

## The deploy pipeline

```
PR opened ──▶ types · unit tests · terraform fmt/validate/plan
                                          │
                                    plan posted as a PR comment  ◀── the review gate
                                          │ merge
                                          ▼
push to main ──▶ verify ──▶ Cloud Build image:<sha> ──▶ terraform apply
                                                            │
                                                            ▼
                                                   Cloud Run rolls to :<sha>
```

Defined in [`ci.yml`](../../.github/workflows/ci.yml) and
[`deploy.yml`](../../.github/workflows/deploy.yml). Auth is keyless via Workload
Identity Federation — no service-account JSON key exists anywhere.

### Why there is no manual approval gate

Merging to main deploys. The compensating controls are:

1. **The plan is reviewed on the PR** before the merge that triggers the apply.
2. **Privilege is branch-scoped.** Two service accounts back CI:
   `github-planner` (read-only, any ref) and `github-deployer` (privileged,
   `refs/heads/main` only). A PR branch — including one that rewrites
   `.github/workflows/` — cannot impersonate the deployer, because its WIF
   binding matches on a synthetic `repository_ref` attribute that a PR ref can
   never satisfy. See [`cicd.tf`](cicd.tf).
3. **`prevent_destroy`** on the secret containers, and `deletion_protection` on
   the Cloud Run service.

## Public access (org policy)

The org policy `constraints/iam.allowedPolicyMemberDomains` is set at the
organization level to allow only members of customer ID `C036mgkl6`
(vantixstrategies.com). That policy blocks granting `roles/run.invoker` to
`allUsers`, which is what makes a Cloud Run service public — so
`google_cloud_run_v2_service_iam_member.public` in [`cloud_run.tf`](cloud_run.tf)
fails to apply with:

```
Error 400: One or more users named in the policy do not belong to a permitted
customer, perhaps due to an organization policy.
```

Org policy is hierarchical (org → folder → project) and a project-level policy
overrides its parent, so the exception can be scoped to this project alone.
**The sibling `vantix-strategies` project already does exactly this** — it carries
a project-level `iam.allowedPolicyMemberDomains` policy with `reset: true`, set
2026-04-06, which is why Sendscape's Cloud Run can hold an `allUsers` binding.

The matching fix here:

```bash
gcloud services enable orgpolicy.googleapis.com --project=vantixstrategies-website
gcloud org-policies reset constraints/iam.allowedPolicyMemberDomains \
  --project=vantixstrategies-website
```

Then re-run `terraform apply` and the binding lands.

The tradeoff: within this project, any IAM binding may name any principal, not
just `allUsers`. Scoped to a project that hosts only a public marketing site
that is acceptable — do **not** apply it org-wide.

### Alternative: disable the invoker check instead

Google's current recommendation for this exact problem is the newer
`constraints/run.managed.requireInvokerIam` constraint. Disabling it at the
project level makes Cloud Run services public *without* any `allUsers` binding,
so domain-restricted sharing stays fully intact:

```bash
gcloud org-policies disable-enforce constraints/run.managed.requireInvokerIam \
  --project=vantixstrategies-website
```

Going that route means **deleting** `google_cloud_run_v2_service_iam_member.public`
from [`cloud_run.tf`](cloud_run.tf) — it becomes unnecessary.

It is not used here for two reasons: it diverges from the pattern already
established in `vantix-strategies`, and it makes public access *invisible* in the
service's IAM policy (nothing in `get-iam-policy` would tell you the service is
open to the world), while also applying to every Cloud Run service in the project
rather than this one.

## Day-to-day

- **Ship a change:** open a PR → review the plan comment → merge. That's it.
- **Re-deploy current main:** Actions ▸ Deploy ▸ Run workflow.
- **Run a plan locally:** `terraform plan` (reads live state; safe).
- **Rotate an SMTP credential:** `gcloud secrets versions add smtp-pass …`, then
  redeploy so Cloud Run picks up the new `:latest` version.

Terraform needs credentials. Either `gcloud auth application-default login`, or
for a one-off:

```bash
export GOOGLE_OAUTH_ACCESS_TOKEN="$(gcloud auth print-access-token)"
```

## Rules

- **Secret values never live here.** Terraform manages the Secret Manager
  *containers* ([`secrets.tf`](secrets.tf)); values are set out-of-band with
  `gcloud secrets versions add`. State therefore contains no plaintext secrets.
- **`smtp-from` must differ from `contact_to_email`**, or the contact route
  refuses to send (see `src/app/api/contact/route.ts`). There is a unit test for
  this.
- **`NEXT_PUBLIC_SITE_URL` is a build arg, not a Cloud Run env var.** Next
  inlines `NEXT_PUBLIC_*` into the client bundle at build time, so setting it
  here would be a silent no-op in the browser. Change it via `_SITE_URL` in
  [`cloudbuild.yaml`](../../cloudbuild.yaml) — which requires a rebuild.
- **The GCP project is not Terraform-managed.** It is created once by
  `bootstrap.sh` and deliberately kept outside Terraform's blast radius, so no
  plan can ever propose deleting it. See [`removed.tf`](removed.tf) for the
  one-time adoption step that took it out of state.
- **Image tag** is supplied by CI (`-var=image_tag=$GITHUB_SHA`); the `latest`
  default is only for manual use.

## Cost shape

`min_instances = 0`, so the service scales to zero and idles at roughly $0. The
tradeoff is a ~1–2s cold start on the first request after a quiet period. If
that starts showing up in Core Web Vitals once the domain is cut over, set
`min_instances = 1` (~$10–20/mo). Artifact Registry is capped by a cleanup
policy that keeps the 20 most recent images and drops untagged ones after 7 days.

## Disaster recovery

`bootstrap.sh` and `imports.sh` are idempotent and exist to rebuild this from
nothing — `bootstrap.sh` creates the project, state bucket, service accounts and
WIF pool; `imports.sh` pulls live resources back into a fresh state file. Neither
needs to be run in normal operation.

## File map

| File | Owns |
|------|------|
| `versions.tf` / `backend.tf` | provider + GCS remote state |
| `variables.tf` / `main.tf` | inputs, provider config, locals |
| `apis.tf` | project API enablements |
| `artifact_registry.tf` | the `containers` image repo + cleanup policies |
| `secrets.tf` | SMTP secret containers (`prevent_destroy`) + per-secret runtime access |
| `iam.tf` | runtime SA and Cloud Build SA |
| `cloud_run.tf` | the service + public invoker |
| `cicd.tf` | WIF pool/provider, `github-planner`, `github-deployer` |
| `removed.tf` | one-time: forget `google_project` without destroying it |
| `outputs.tf` | service URL + the four GitHub repo variables |
| `bootstrap.sh` / `imports.sh` | disaster recovery only |
