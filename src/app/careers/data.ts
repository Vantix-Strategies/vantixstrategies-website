// Content for the Vantix "AI Engineering Track" — the interactive onboarding
// experience. Ported faithfully from the six-document onboarding series
// (Intro + Phase 0–4). This module is server-importable and contains no client
// code; pages and client components read from it.

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AskClaudePrompt {
  prompt: string;
  note?: string;
}

export interface CodeBlock {
  filename?: string;
  code: string;
}

export interface Callout {
  title: string;
  text: string;
}

export interface Resource {
  label: string;
  url: string;
  note?: string;
}

export interface Step {
  /** Stable id used for progress tracking, e.g. "ship-it/containerize". */
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  /** Optional concept diagram key, rendered by PhaseDiagram. */
  diagram?: string;
  prompts?: AskClaudePrompt[];
  code?: CodeBlock[];
  callouts?: Callout[];
  resources?: Resource[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  answer: number;
  explanation: string;
}

export interface Phase {
  slug: string;
  number: number;
  name: string;
  subtitle: string;
  tagline: string;
  youBuild: string;
  coreConcept: string;
  /** "Why it matters in industry" framing, from the Intro doc. */
  industry: { why: string; example: string };
  intro: string[];
  vocab?: { term: string; def: string }[];
  steps: Step[];
  /** The "done when" checklist. */
  checklist: string[];
  quiz: QuizQuestion[];
  resources: Resource[];
  prevSlug?: string;
  nextSlug?: string;
}

// ─── The method (Intro doc) — rendered on the /careers hub ───────────────────

export const introContent = {
  eyebrow: "Start Here",
  title: "How to Learn This — By Asking AI",
  lede:
    "This is a five-part, hands-on track that takes you from “I can write code but I've never really built with AI” to “I've built and deployed a full AI system on cloud infrastructure I own.” You build one project — a personal portfolio site on Google Cloud — and each phase adds a new capability to it.",
  coreIdea:
    "You are not expected to already know this material, and you are not expected to memorize commands. Throughout every phase you'll see “▸ Ask Claude: …” prompts — hand those to your AI tool. It does the typing; you direct, review, and learn. The real skill isn't typing cloud commands. It's learning to work with an AI over many rounds to build something genuinely good — and to stop and ask whenever something doesn't make sense.",
  loop: [
    {
      title: "Describe what you want",
      text: "In plain English. “Set up X” or “Explain how Y works in this project.”",
    },
    { title: "Let the AI draft it", text: "Code, a config file, or an explanation." },
    {
      title: "Review before you accept",
      text: "Glance at what it actually did — which files, roughly what changed — rather than rubber-stamping.",
    },
    {
      title: "Ask follow-ups until it's clear",
      text: "“Why this way and not another?” “What does this line do?”",
    },
    { title: "Ship it, then iterate", text: "Nothing's right on the first try; refining is the job." },
  ],
  unstuckPrompts: [
    {
      prompt:
        "I don't understand what a [term] is. Explain it like I'm new to cloud, with a small real-world example.",
      note: "Use this the instant a word is unfamiliar — repo, container, embedding, OAuth, whatever.",
    },
    {
      prompt: "Walk me through what this command / file does, line by line.",
      note: "Turns any code block in these docs into a lesson instead of a copy-paste.",
    },
    {
      prompt: "I got this error: [paste it]. What does it mean and how do I fix it?",
      note: "Paste the whole error. Errors are normal and are some of the best learning moments.",
    },
    {
      prompt: "Before you change anything, give me a plan for how you'd do this.",
      note: "“Plan Mode” thinking — catch a wrong assumption as a sentence, before it becomes five bad files.",
    },
    {
      prompt: "Why did you choose this approach over the alternatives?",
      note: "Builds real understanding of trade-offs — what separates engineers from code-pasters.",
    },
  ] as AskClaudePrompt[],
  keepInMind: [
    {
      title: "AI systems aren't like normal software",
      text: "Traditional code is deterministic: same input, same output. LLMs are not — the same prompt can give different answers, and a model can be confidently wrong. That's why testing, careful design, and evaluation aren't extras in AI engineering; they're the core of the job. If you come from normal software, this is the biggest mental adjustment.",
    },
    {
      title: "Stay inside the free credit",
      text: "Phase 0 has you claim Google Cloud's $300 free credit and set a budget alert before building anything. The whole track is designed to fit inside free/near-free usage. The one thing that bills continuously (rather than scaling to zero) is the database in Phase 3 — so that's the resource to shut down when you're not using it.",
    },
  ],
  toolNote:
    "These prompts say “Claude,” but the workflow is the same with any capable agentic AI coding tool (Claude Code, Codex, and others). The key move is using a tool that can create files and run commands in your project — not just a chat window you copy-paste from. That's what lets you direct instead of type.",
  resources: [
    { label: "Anthropic — Build with Claude", url: "https://docs.anthropic.com/", note: "Official hands-on guides for prompting, tool use, and RAG." },
    { label: "Get Claude Pro (referral)", url: "https://claude.ai/referral/GtOaEAye3w", note: "The plan that unlocks Claude Code, the tool that drives every phase." },
    { label: "Claude Code docs", url: "https://docs.claude.com/en/docs/claude-code/overview", note: "How to use the agentic tool that drives every phase." },
    { label: "Google Cloud free program", url: "https://cloud.google.com/free", note: "The $300 trial and always-free tier you'll use throughout." },
  ] as Resource[],
};

// ─── Phases ──────────────────────────────────────────────────────────────────

export const phases: Phase[] = [
  // ── Phase 0 ────────────────────────────────────────────────────────────────
  {
    slug: "foundations",
    number: 0,
    name: "Foundations",
    subtitle: "Set Up Your Cloud Home Base",
    tagline: "One GCP project, done right, that every later phase builds on.",
    youBuild: "The account, project, and guardrails.",
    coreConcept: "Cloud basics, IAM, keyless auth (Workload Identity Federation).",
    industry: {
      why: "Companies run on repeatable, reviewable infrastructure — not on someone clicking around a console and forgetting what they did. Leaked cloud credentials are one of the most common causes of real breaches, so keyless authentication is now standard practice.",
      example:
        "A fintech startup describes its entire production environment in code. A new engineer can recreate the whole stack from the repo, every change goes through a pull request, and CI/CD deploys automatically — with zero long-lived keys stored anywhere.",
    },
    intro: [
      "Phase 0 is the part most tutorials skip and most people regret skipping. Before writing a line of application code, you'll stand up a Google Cloud account, claim the free $300 credit, create a clean project, and put the guardrails and tooling in place. Do this once, carefully, and the next four phases are smooth.",
      "This track is generalizable — make it yours. Everywhere you see YOUR_NAME, PROJECT_ID, YOUR_REGION, or your-github-user/your-repo, substitute your own values. Build the site around your real resume and interests so the result is something you'd actually put on LinkedIn.",
    ],
    vocab: [
      { term: "Project", def: "The top-level container in GCP. Everything (services, databases, billing, permissions) lives inside a project. You'll make exactly one for this whole track." },
      { term: "Region", def: "Which physical datacenter your stuff runs in (e.g. us-central1). Pick one near you and reuse it everywhere to avoid latency and cross-region charges." },
      { term: "IAM", def: "Identity and Access Management: who (or what) is allowed to do what. “Least privilege” means giving each identity the minimum it needs." },
      { term: "Service account", def: "A non-human identity that programs use to act on GCP, instead of your personal login. Your CI/CD pipeline will use one." },
      { term: "gcloud CLI", def: "The command-line tool for talking to Google Cloud from your terminal." },
    ],
    steps: [
      {
        id: "foundations/account",
        eyebrow: "Step 1 · Account",
        title: "Create the account and claim $300",
        body: [
          "New Google Cloud customers get $300 in free credit, valid for 90 days, plus an always-free tier on many products. You won't be charged, and billing only starts if you manually upgrade — the trial account auto-closes at 90 days or when the credit runs out. A card is required only to verify identity.",
          "Go to cloud.google.com/free and click Get started for free. Sign in with a Google account. Accept the terms, add a card for verification, and confirm the $300 / 90-day credit is showing. In the console top bar, create a New Project and note its PROJECT_ID (permanent and globally unique; yourname-portfolio works well). Make sure billing is linked to it.",
        ],
        resources: [
          { label: "Free trial FAQ", url: "https://cloud.google.com/free/docs/free-cloud-features" },
        ],
      },
      {
        id: "foundations/tools",
        eyebrow: "Step 2 · Tools",
        title: "Install your local tools — with Claude's help",
        body: [
          "You'll drive most of this from an AI coding tool that can run commands in a terminal. First install that tool itself, then let it help you install the rest: the Google Cloud CLI (gcloud), Git + GitHub CLI (gh), and Docker.",
          "Once your AI tool is installed, you don't have to look up install steps — ask it to detect what's missing and install it, then authenticate.",
        ],
        prompts: [
          {
            prompt:
              "Check which of these are installed on my machine — gcloud, git, gh, docker — and walk me through installing whatever's missing for my OS.",
            note: "It can detect your system, tell you what's missing, and run the installs. Review each step before approving.",
          },
          {
            prompt:
              "Log me into gcloud, set my project to PROJECT_ID, and set up application-default credentials. Explain what each command does as you go.",
            note: "Under the hood: gcloud auth login, gcloud config set project, and gcloud auth application-default login.",
          },
        ],
        code: [
          {
            filename: "Terminal — authenticate",
            code: `gcloud auth login                       # your personal login
gcloud config set project PROJECT_ID    # target this project
gcloud auth application-default login    # creds for local code`,
          },
        ],
      },
      {
        id: "foundations/guardrails",
        eyebrow: "Step 3 · Guardrails",
        title: "Set a budget before you build anything",
        body: [
          "The single most important habit for staying inside the free credit is a budget alert. It won't stop spending on its own, but it emails you the moment you cross a threshold, so nothing surprises you.",
          "In the console: Billing → Budgets & alerts → Create budget. Scope it to your project, set an amount (e.g. $50), and add alert thresholds at 50%, 90%, and 100%. Or do it from the terminal:",
        ],
        prompts: [
          {
            prompt:
              "Help me create a GCP billing budget of $50 on PROJECT_ID with email alerts at 50, 90, and 100 percent.",
            note: "It can use the gcloud billing budgets commands — review what it proposes before running it.",
          },
        ],
        code: [
          {
            filename: "Terminal — budget with alerts",
            code: `gcloud billing budgets create \\
  --billing-account=BILLING_ACCOUNT_ID \\
  --display-name="portfolio budget" \\
  --budget-amount=50USD \\
  --threshold-rule=percent=0.5 \\
  --threshold-rule=percent=0.9 \\
  --threshold-rule=percent=1.0`,
          },
        ],
        callouts: [
          {
            title: "Habits that keep it free",
            text: "Everything in one region · scale services to zero when idle (Cloud Run does this by default) · tear down anything you're done experimenting with · check the billing dashboard weekly. The database in Phase 3 is the main thing that bills continuously.",
          },
        ],
      },
      {
        id: "foundations/enable-services",
        eyebrow: "Step 4 · Enable Services",
        title: "Turn on the APIs you'll need",
        body: [
          "GCP services are off by default; you enable the ones you use. Turn on the core set now (later phases enable a couple more when they need them).",
        ],
        prompts: [
          {
            prompt:
              "Enable these GCP APIs on PROJECT_ID and tell me what each one is for: run, artifactregistry, cloudbuild, iam, iamcredentials, sts.",
            note: "These cover hosting (Cloud Run), image storage, building, and the identity pieces Workload Identity Federation needs in Step 5.",
          },
        ],
        code: [
          {
            filename: "Terminal — enable core APIs",
            code: `gcloud services enable \\
  run.googleapis.com \\
  artifactregistry.googleapis.com \\
  cloudbuild.googleapis.com \\
  iam.googleapis.com \\
  iamcredentials.googleapis.com \\
  sts.googleapis.com`,
          },
        ],
      },
      {
        id: "foundations/wif",
        eyebrow: "Step 5 · Keyless CI/CD Auth",
        title: "Set up Workload Identity Federation",
        diagram: "wif",
        body: [
          "In Phase 1, GitHub Actions will deploy your site to GCP. The old way was to create a service-account JSON key and paste it into GitHub — a long-lived credential that can leak. The modern best practice is Workload Identity Federation (WIF): GitHub proves its identity with a short-lived token, GCP trusts it directly, and no key is stored anywhere.",
          "What gets created: a workload identity pool and provider that trust GitHub's OIDC issuer; a deploy service account with least-privilege roles; and a binding that lets only your specific repo impersonate that service account.",
        ],
        prompts: [
          {
            prompt:
              "Set up Workload Identity Federation between GCP project PROJECT_ID and my GitHub repo your-github-user/your-repo, so GitHub Actions can deploy without any stored keys. Create a least-privilege deploy service account, and restrict impersonation to ONLY that one repo. Then give me the two values I'll need as GitHub secrets: the provider resource name and the service account email. Explain each piece as you create it.",
            note: "The “restrict to only that repo” part is the security-critical bit — don't skip it. Save the two output values for Phase 1.",
          },
        ],
        callouts: [
          {
            title: "Why this matters beyond this project",
            text: "Keyless federation is exactly what real teams use, and “can you set up WIF between GitHub and GCP” is a genuine interview-grade skill. You're building the production pattern, not a toy.",
          },
        ],
      },
    ],
    checklist: [
      "GCP account created, $300 credit confirmed, budget alerts set.",
      "One project with a memorable PROJECT_ID, billing linked.",
      "Your AI coding tool, gcloud, Git/gh, and Docker installed and authenticated.",
      "Core APIs enabled.",
      "Workload Identity Federation configured and scoped to your repo, with the two secret values saved for Phase 1.",
    ],
    quiz: [
      {
        id: "foundations/q1",
        question: "In the Workload Identity Federation setup, which detail is the security-critical one?",
        options: [
          "Choosing a memorable name for the workload identity pool",
          "Restricting impersonation to ONLY your specific repo",
          "Enabling all available GCP APIs up front",
          "Storing the service-account JSON key in GitHub secrets",
        ],
        answer: 1,
        explanation:
          "WIF's whole point is that no long-lived key is stored anywhere, and that only your one repo can impersonate the deploy service account. Scoping the binding to that single repo is the part you must not skip.",
      },
      {
        id: "foundations/q2",
        question: "What does a GCP budget alert actually do?",
        options: [
          "Automatically stops all spending when you hit the limit",
          "Emails you when you cross a threshold, but doesn't stop spending",
          "Prevents any service from being enabled",
          "Refunds any charges above the free credit",
        ],
        answer: 1,
        explanation:
          "A budget alert is a notification, not a hard cap. It emails you at your thresholds (e.g. 50/90/100%) so nothing surprises you — the habit that keeps you inside the free credit.",
      },
    ],
    resources: [
      { label: "Google Cloud free program", url: "https://cloud.google.com/free" },
      { label: "Budgets & alerts", url: "https://cloud.google.com/billing/docs/how-to/budgets" },
      { label: "Workload Identity Federation with GitHub Actions", url: "https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines" },
    ],
    nextSlug: "ship-it",
  },

  // ── Phase 1 ────────────────────────────────────────────────────────────────
  {
    slug: "ship-it",
    number: 1,
    name: "Ship It",
    subtitle: "A Portfolio Site, Live on Cloud Run",
    tagline: "From empty repo to a public URL that redeploys when you merge a pull request.",
    youBuild: "A live site, auto-deployed on PR merge.",
    coreConcept: "Containers, Cloud Run, Terraform, Git & PRs, CI/CD.",
    industry: {
      why: "Paying for idle servers is waste. Platforms that scale to zero and back up on demand let small teams run real products for almost nothing and handle traffic spikes without capacity planning.",
      example:
        "A side-project SaaS serves thousands of users on Cloud Run for a few dollars a month, because it only runs — and only bills — when requests come in. The same architecture would scale to millions without a rewrite.",
    },
    intro: [
      "Now the fun part. You'll create the repository, build your portfolio site as a container, describe its infrastructure with Terraform kept right in the repo, and learn the Git pull-request flow that every real engineering team uses. When you merge a pull request into main, a pipeline automatically deploys your site to Cloud Run — using the keyless auth you set up in Phase 0.",
      "What you'll have at the end: a public *.run.app URL showing your portfolio, a repo where your whole infrastructure is code, and a pull-request workflow where merging to main deploys automatically. A link you can put on your resume.",
    ],
    vocab: [
      { term: "Container", def: "Your app plus everything it needs to run, packaged into one portable image. “Works on my machine” becomes “works everywhere.”" },
      { term: "Artifact Registry", def: "GCP's storage for those container images. Your pipeline pushes here; Cloud Run pulls from here." },
    ],
    steps: [
      {
        id: "ship-it/repo",
        eyebrow: "Step 1 · Repo & Site",
        title: "Create the repository and build the site",
        body: [
          "Create the repo with the exact name your Phase 0 WIF binding trusts — they must match, or deploys will be rejected.",
          "Then build the site itself. Use whatever stack you like — the architecture doesn't care. Next.js is a good default (it's easy to add the AI features from Phase 2 onward). Have Claude scaffold it from your real material, and get it running locally before moving on.",
        ],
        prompts: [
          { prompt: "Create a new public GitHub repo called your-repo, clone it locally, and cd into it.", note: "Uses the GitHub CLI (gh repo create). Use the repo name from your Phase 0 WIF setup." },
          {
            prompt:
              "Scaffold a Next.js portfolio site in this repo based on my resume and interests (I'll paste them). Give it a distinctive look — an unusual color palette and a layout that isn't just stacked sections — not a generic template. Then run it locally so I can see it.",
            note: "Push it to feel like YOU. Get it running locally (npm run dev → localhost:3000) before moving on.",
          },
        ],
        code: [
          {
            filename: "Terminal — create the repo & run locally",
            code: `gh repo create your-repo --public --clone   # use your WIF repo name
cd your-repo
# …AI scaffolds the Next.js site…
npm run dev                                 # open http://localhost:3000`,
          },
        ],
      },
      {
        id: "ship-it/containerize",
        eyebrow: "Step 2 · Containerize",
        title: "Add a Dockerfile",
        body: [
          "A container image is how Cloud Run runs your site. Rather than hand-write it, ask Claude — and have it explain the result so you understand what a container actually is.",
          "The one Cloud Run rule: your app must listen on the PORT env var (default 8080) on 0.0.0.0. That's the #1 first-deploy gotcha. Test the container locally before going further.",
        ],
        prompts: [
          { prompt: "Write a production Dockerfile for this Next.js app, optimized for Cloud Run (small final image, listens on the PORT env var). Then explain what each stage does and how a container works, like I've never used Docker." },
          { prompt: "Build and run my Dockerfile locally and give me the URL to check it in my browser.", note: "Under the hood: docker build then docker run -p 8080:8080. Confirm the site loads at localhost:8080." },
        ],
        code: [
          {
            filename: "Terminal — build & run the container",
            code: `docker build -t portfolio .
docker run -p 8080:8080 portfolio   # open http://localhost:8080`,
          },
        ],
      },
      {
        id: "ship-it/iac",
        eyebrow: "Step 3 · Infrastructure as Code",
        title: "What Terraform is, and why it lives in your repo",
        body: [
          "Terraform lets you describe your cloud infrastructure in files instead of clicking around the console. You write what you want — “a Cloud Run service, an image registry” — and Terraform figures out the API calls to make it real. This is infrastructure as code, one of the most important ideas in modern engineering.",
          "Why it's worth it: reproducible (anyone can recreate your setup from the files), reviewable (infra changes go through the same PR review as code), and version-controlled (every change is in Git history; you can roll back).",
          "Terraform's core loop is write → plan → apply. You write a description of the desired state, run terraform plan to preview exactly what it will create/change/destroy, then terraform apply to make it real. You'll keep all of it in a /terraform subdirectory inside your repo.",
        ],
      },
      {
        id: "ship-it/write-terraform",
        eyebrow: "Step 4 · Write the Terraform",
        title: "Describe your infrastructure",
        body: [
          "Have Claude create the /terraform files. Ask it to explain each resource as it writes them — that's how you learn what the infrastructure actually is. Then run the preview once locally to see the loop in action.",
        ],
        prompts: [
          { prompt: "In a /terraform subdirectory, write Terraform for: (1) the Google provider pointed at PROJECT_ID and YOUR_REGION, (2) an Artifact Registry Docker repo, and (3) a Cloud Run service that scales to zero and is publicly reachable, taking the container image as a variable. Explain each resource and how the pieces connect." },
          { prompt: "Run terraform init and terraform plan in /terraform and explain what the plan output is telling me before I apply anything.", note: "'plan' shows what WILL change without changing it — read it every time. This is Terraform's safety net." },
        ],
        code: [
          {
            filename: "terraform/main.tf (excerpt)",
            code: `resource "google_cloud_run_v2_service" "site" {
  name     = "portfolio"
  location = var.region
  template {
    containers {
      image = var.image          # set by the pipeline each deploy
      ports { container_port = 8080 }
    }
    scaling { min_instance_count = 0 }   # scale to zero
  }
}`,
          },
          {
            filename: "Terminal — preview before applying",
            code: `cd terraform
terraform init
terraform plan     # shows what WILL change — changes nothing`,
          },
        ],
      },
      {
        id: "ship-it/git-workflow",
        eyebrow: "Step 5 · The Git Workflow",
        title: "Branches, pull requests, and merging",
        diagram: "pr-flow",
        body: [
          "Here's the single most important habit in team-based coding: nothing reaches main without going through a pull request. main is the official version of your project — the one that gets deployed — so it should always be trustworthy. You never edit it directly. You work on a branch, then propose merging it back via a pull request (PR).",
          "The flow: branch off main, commit your work in small labeled snapshots, push and open a PR, review the diff (yourself, on a solo project — the discipline still matters), then merge. The merge is the moment your changes join main — and the moment deployment kicks off.",
        ],
        prompts: [
          { prompt: "Create a branch called feature/initial-site, commit all my work with clear messages, push it, and open a pull request into main with a description of what changed and how I tested it.", note: "Review the diff it shows before you approve." },
          { prompt: "Review this pull request: summarize what it changes, and flag anything risky or unclear before I merge it.", note: "A great habit even solo. On real teams, AI reviewers now comment on PRs automatically alongside humans." },
        ],
        code: [
          {
            filename: "Terminal — the branch → PR → merge loop",
            code: `git checkout -b feature/initial-site
git add -A && git commit -m "Initial portfolio site"
git push -u origin feature/initial-site
gh pr create --fill --base main
# …review the diff…
gh pr merge --squash --delete-branch   # merge = deploy`,
          },
        ],
      },
      {
        id: "ship-it/cicd",
        eyebrow: "Step 6 · CI/CD",
        title: "Deploy automatically when a PR merges",
        body: [
          "The last piece: a GitHub Actions workflow that runs when a pull request merges into main. It authenticates to GCP with the keyless WIF from Phase 0, builds and pushes your container image, then runs terraform apply from your /terraform folder to roll out the new version. No manual deploys, no stored keys.",
          "Add the two values you saved in Phase 0 (the WIF provider name and deploy service-account email) as GitHub repository secrets, then have Claude write the workflow.",
        ],
        prompts: [
          { prompt: "Add my WIF_PROVIDER and DEPLOY_SA values as GitHub repo secrets, then write a GitHub Actions workflow at .github/workflows/deploy.yml that runs on push to main. It should authenticate to GCP with Workload Identity Federation (no keys), build and push my Docker image to Artifact Registry tagged with the commit SHA, and run terraform apply in /terraform with that image. Explain the workflow to me.", note: "Merging a PR into main IS a push to main — so this fires exactly on merge." },
        ],
        code: [
          {
            filename: "Terminal — store the two Phase 0 values as secrets",
            code: `gh secret set WIF_PROVIDER --body "projects/…/providers/github-provider"
gh secret set DEPLOY_SA   --body "deploy@PROJECT_ID.iam.gserviceaccount.com"`,
          },
          {
            filename: ".github/workflows/deploy.yml (shape)",
            code: `on: { push: { branches: [main] } }        # fires on PR merge
permissions: { contents: read, id-token: write }  # id-token = WIF
  # ...auth@v2 with workload_identity_provider + service_account
  # ...docker build & push  $IMAGE
  # ...terraform -chdir=terraform apply -auto-approve -var=image=$IMAGE`,
          },
        ],
      },
      {
        id: "ship-it/go-live",
        eyebrow: "Step 7 · Go Live",
        title: "Merge, and watch it deploy",
        body: [
          "Merge your Step 5 pull request into main. Open the Actions tab in GitHub and watch the job run: auth → build → push → terraform apply. When it's green, get your live URL.",
        ],
        prompts: [
          { prompt: "Get the public URL of my deployed Cloud Run service and open it.", note: "That's your site, live on the internet, deployed by merging a pull request." },
        ],
        code: [
          {
            filename: "Terminal — get your live URL",
            code: `gcloud run services describe portfolio \\
  --region YOUR_REGION --format 'value(status.url)'`,
          },
        ],
      },
      {
        id: "ship-it/iterate",
        eyebrow: "Step 8 · Iterate",
        title: "Make it genuinely yours (open-ended)",
        body: [
          "This is where the site stops looking like a template and starts looking like you — and it's the loop you'll repeat most in real work. Every change now flows through the same cycle: branch → commit → PR → review → merge → auto-deploy.",
          "A few directions: visual polish (palette, typography, spacing, mobile responsiveness); content (a projects section, a photo, a resume-download button, GitHub/LinkedIn links); small interactions (a dark-mode toggle, subtle scroll animations, a contact section). Keep PRs small — easier to review, easier to undo.",
        ],
        prompts: [
          { prompt: "I want to [change X] on my site. Make the change on a new branch, open a PR, and once I approve, merge it so it deploys.", note: "The natural stopping point is when you'd be comfortable putting the URL on a real resume or LinkedIn." },
        ],
      },
    ],
    checklist: [
      "Repo created with the name your WIF binding trusts.",
      "Portfolio site built, running locally, and containerized.",
      "Infrastructure described in a committed /terraform folder.",
      "You understand the branch → commit → PR → review → merge flow, and can drive it with Claude.",
      "GitHub Actions deploys automatically on merge to main, keylessly.",
      "A live public URL you're happy to share.",
    ],
    quiz: [
      {
        id: "ship-it/q1",
        question: "What is the #1 first-deploy gotcha for a container on Cloud Run?",
        options: [
          "The image is larger than 1 GB",
          "The app doesn't listen on the PORT env var on 0.0.0.0",
          "The Dockerfile has more than one build stage",
          "The repo isn't public",
        ],
        answer: 1,
        explanation:
          "Cloud Run injects a PORT env var (default 8080) and expects your app to listen on it on 0.0.0.0. Not doing so is the most common reason a first deploy fails to serve traffic.",
      },
      {
        id: "ship-it/q2",
        question: "In the Git workflow, what triggers an automatic production deploy?",
        options: [
          "Pushing any branch to GitHub",
          "Opening a pull request",
          "Merging a pull request into main (a push to main)",
          "Running terraform plan locally",
        ],
        answer: 2,
        explanation:
          "The GitHub Actions workflow fires on push to main — and merging a PR into main IS a push to main. That's why nothing reaches production except through a reviewed, merged PR.",
      },
      {
        id: "ship-it/q3",
        question: "Why run `terraform plan` before `terraform apply`?",
        options: [
          "It's required to authenticate to GCP",
          "It previews exactly what will be created/changed/destroyed without changing anything",
          "It's faster than apply",
          "It pushes your container image",
        ],
        answer: 1,
        explanation:
          "plan is Terraform's safety net: it shows what WILL change without touching anything, so you can sanity-check before apply makes it real.",
      },
    ],
    resources: [
      { label: "What is Cloud Run", url: "https://cloud.google.com/run/docs/overview/what-is-cloud-run" },
      { label: "Terraform intro (HashiCorp)", url: "https://developer.hashicorp.com/terraform/intro" },
      { label: "GitHub flow", url: "https://docs.github.com/en/get-started/using-github/github-flow" },
      { label: "Deploy to Cloud Run with GitHub Actions", url: "https://cloud.google.com/blog/products/devops-sre/deploy-to-cloud-run-with-github-actions" },
    ],
    prevSlug: "foundations",
    nextSlug: "make-it-smart",
  },

  // ── Phase 2 ────────────────────────────────────────────────────────────────
  {
    slug: "make-it-smart",
    number: 2,
    name: "Make It Smart",
    subtitle: "Add an LLM Feature with Vertex AI",
    tagline: "Your site stops being a brochure and starts doing something.",
    youBuild: "An LLM feature in the site.",
    coreConcept: "Calling an LLM, prompting, Vertex AI.",
    industry: {
      why: "Almost every product now has an “AI feature.” Knowing how to call a model from a backend safely — keeping keys server-side, controlling cost, guarding against bad output — is table-stakes engineering, not research.",
      example:
        "A customer-support tool adds a “summarize this ticket” button. It's a single server-side model call behind an endpoint — structurally identical to the feature you'll wire into your site here.",
    },
    intro: [
      "Your portfolio is live. Now you'll give it a brain. In this phase you enable Vertex AI — Google Cloud's managed home for foundation models like Gemini — and add a backend endpoint that calls an LLM, then wire an interactive AI feature into the site itself.",
      "A natural default: an “Ask my resume” chat box. But the pattern is generic — swap in a project-idea generator, a tone-adjustable bio, or a “summarize my experience for a recruiter in X industry” button. Whatever you pick, the shape is identical — and it's the shape of nearly every LLM feature you'll ever build.",
    ],
    steps: [
      {
        id: "make-it-smart/how-it-works",
        eyebrow: "Concept",
        title: "How an LLM feature actually works",
        diagram: "llm-flow",
        body: [
          "Three moving parts: a frontend (a box where the user types something and sees a response); a backend endpoint (a route like /api/ask that receives the text, builds a prompt, and calls the model — this must live on the server); and Vertex AI (you send messages, you get a generated response).",
          "The one security rule: keep model calls server-side. Never call the model directly from browser JavaScript, and never ship credentials to the client. The browser talks to your backend; your backend talks to Vertex AI.",
        ],
      },
      {
        id: "make-it-smart/enable",
        eyebrow: "Step 1 · Enable Vertex AI",
        title: "Turn on the API",
        body: ["Add Vertex AI to the services you enabled in Phase 0."],
        prompts: [
          { prompt: "Enable the Vertex AI API (aiplatform.googleapis.com) on PROJECT_ID and tell me in plain terms what Vertex AI is.", note: "Gemini models are served through Vertex AI. For a chat feature, a fast, inexpensive Gemini Flash model is the right default." },
        ],
        code: [
          {
            filename: "Terminal — enable Vertex AI",
            code: `gcloud services enable aiplatform.googleapis.com`,
          },
        ],
      },
      {
        id: "make-it-smart/permissions",
        eyebrow: "Step 2 · Permissions",
        title: "Let your Cloud Run service call the model",
        body: [
          "Here's where Cloud Run shines. Your service runs as a service account, and you can grant that identity permission to use Vertex AI directly — so your code authenticates automatically, with no key anywhere. Add this to the Terraform in your /terraform folder, as a normal pull request.",
          "Because the code runs as that service account, Google's client libraries pick up credentials automatically (“Application Default Credentials”). You never write a key into your app.",
        ],
        prompts: [
          { prompt: "In my /terraform folder, add a dedicated service account for the Cloud Run site, grant it the Vertex AI User role, and attach it to the Cloud Run service. Put it on a branch and open a PR so it deploys when I merge. Explain why running as a service account means no API key in my code." },
        ],
        code: [
          {
            filename: "terraform/main.tf",
            code: `resource "google_service_account" "site" {
  account_id = "portfolio-run"
}

resource "google_project_iam_member" "vertex" {
  project = "PROJECT_ID"
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:\${google_service_account.site.email}"
}

# attach that identity to the Cloud Run service
#   template { service_account = google_service_account.site.email ... }`,
          },
        ],
      },
      {
        id: "make-it-smart/backend",
        eyebrow: "Step 3 · The Backend Call",
        title: "Add the model-calling endpoint",
        body: [
          "Install the Google Gen AI SDK and add a server route. The core call is small; the point is understanding request → prompt → response.",
        ],
        prompts: [
          { prompt: "Add a server-side API route to my site (e.g. /api/ask) that takes a question, calls Gemini on Vertex AI with the Google Gen AI SDK, and returns the answer. Keep it strictly server-side. Walk me through how the model call works." },
        ],
        code: [
          {
            filename: "Terminal — install the SDK",
            code: `npm install @google/genai`,
          },
          {
            filename: "app/api/ask/route.ts (server-side only)",
            code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: 'YOUR_REGION',
});

export async function POST(req: Request) {
  const { question } = await req.json();
  const resp = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Answer as ME, based on my resume below.\\n\` +
              \`RESUME:\\n\${MY_RESUME}\\n\\nQUESTION: \${question}\`,
  });
  return Response.json({ answer: resp.text });
}`,
          },
        ],
      },
      {
        id: "make-it-smart/prompt",
        eyebrow: "Step 4 · The Prompt",
        title: "Make it answer well",
        body: [
          "The quality of the feature is mostly the quality of the prompt. Give it a role and context (“Use only the resume below. If something isn't covered, say so rather than inventing it.”). Guard against hallucination explicitly — an LLM will confidently fabricate a job you never had if you let it. Set the tone to match your site's voice.",
        ],
        callouts: [
          {
            title: "A preview of Phase 3",
            text: "Notice you're pasting your whole resume into every prompt. That works for one short document. But answering from dozens of documents by stuffing them all into every prompt breaks down fast. That problem is exactly what Phase 3 (RAG) solves.",
          },
        ],
      },
      {
        id: "make-it-smart/ship",
        eyebrow: "Step 5 · Wire It In & Ship",
        title: "Connect the frontend and deploy",
        body: [
          "Add a chat box, deploy through the same PR-merge loop, then test against edge cases: an off-topic question, an empty input, something not in your resume. Confirm it degrades gracefully.",
        ],
        prompts: [
          { prompt: "Add a chat box to my site that POSTs to /api/ask and streams the response back token by token. Then put it all on a branch and open a PR so it deploys when I merge.", note: "Set GOOGLE_CLOUD_PROJECT as an env var on the Cloud Run service (in your Terraform template block)." },
        ],
        callouts: [
          {
            title: "Cost & safety guardrails",
            text: "A public LLM endpoint can be abused. Before sharing widely: add basic rate limiting, cap the response length, and keep an eye on your budget alert. A Gemini Flash model answering short questions is cheap, but an open endpoint with no limits is how a free trial disappears overnight.",
          },
        ],
      },
    ],
    checklist: [
      "Vertex AI enabled; a Gemini model chosen.",
      "Cloud Run service account granted aiplatform.user — no keys in code.",
      "A server-side endpoint that calls the model.",
      "A prompt that answers as you, without hallucinating.",
      "An interactive AI feature, live on your site, with basic guardrails.",
    ],
    quiz: [
      {
        id: "make-it-smart/q1",
        question: "Where must the call to the LLM live, and why?",
        options: [
          "In browser JavaScript, so it's fast for the user",
          "On the server (your backend endpoint), so credentials never reach the client",
          "In the Terraform files",
          "In a public GitHub Action",
        ],
        answer: 1,
        explanation:
          "The one security rule: keep model calls server-side. The browser talks to your backend; your backend talks to Vertex AI. Calling the model from the browser would expose credentials.",
      },
      {
        id: "make-it-smart/q2",
        question: "On Cloud Run, how does your code authenticate to Vertex AI with no API key?",
        options: [
          "A JSON key committed to the repo",
          "A password typed in at deploy time",
          "Application Default Credentials — it runs as a service account granted the Vertex AI User role",
          "It doesn't need authentication",
        ],
        answer: 2,
        explanation:
          "The service runs as a service account you granted roles/aiplatform.user. Google's client libraries pick up those credentials automatically (ADC), so there's no key in your code.",
      },
    ],
    resources: [
      { label: "Generative AI on Vertex AI — overview", url: "https://cloud.google.com/vertex-ai/generative-ai/docs/overview" },
      { label: "Google Gen AI SDK", url: "https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview" },
      { label: "Application Default Credentials", url: "https://cloud.google.com/docs/authentication/application-default-credentials" },
      { label: "Anthropic prompt engineering docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
    ],
    prevSlug: "ship-it",
    nextSlug: "ground-it",
  },

  // ── Phase 3 ────────────────────────────────────────────────────────────────
  {
    slug: "ground-it",
    number: 3,
    name: "Ground It",
    subtitle: "A RAG System with Cloud SQL + pgvector",
    tagline: "Answers grounded in your real documents, not just one pasted resume.",
    youBuild: "Answers from your own documents.",
    coreConcept: "RAG, embeddings, vector search.",
    industry: {
      why: "A base model doesn't know your company's documents, and it will confidently make things up. RAG connects a model to a private knowledge source so answers are grounded and cite-able. It's the most widely deployed enterprise AI pattern, and the most requested skill in AI-engineer job postings.",
      example:
        "An insurance company builds an internal assistant that answers policy questions from thousands of internal PDFs — with citations, so agents can verify. That's the same retrieve-then-generate pipeline you'll build over your own documents here.",
    },
    intro: [
      "In Phase 2 you pasted your resume into every prompt. That doesn't scale past a page or two. In this phase you'll build RAG — Retrieval-Augmented Generation — so your site can answer from a whole library of your material. This is the single most important pattern in applied AI, and the most valuable thing in this entire track to have built.",
      "The mental model, in one paragraph: split your documents into chunks. Turn each chunk into an embedding (a list of numbers capturing its meaning) and store it in Postgres. When a question comes in, embed the question too, find the chunks whose embeddings are most similar (retrieval), and hand just those chunks to Gemini along with the question (generation). “Find the relevant bits, then answer grounded in them.”",
    ],
    vocab: [
      { term: "Embedding", def: "Meaning turned into numbers, so similarity can be measured mathematically. Generated by an embedding model (you'll use Vertex AI's)." },
      { term: "Vector", def: "That list of numbers. Vertex's text-embedding models output a fixed size (e.g. 768); your database column must match it exactly." },
      { term: "pgvector", def: "The Postgres extension adding a vector column type and similarity operators (<=> for cosine distance)." },
      { term: "Chunking", def: "How you split documents. Do it badly and retrieval quality collapses, so it's worth experimenting with sizes and overlap." },
      { term: "Cloud SQL", def: "GCP's managed Postgres. It supports both pgvector and a google_ml_integration extension that can call Vertex AI embeddings directly from SQL." },
    ],
    steps: [
      {
        id: "ground-it/provision",
        eyebrow: "Step 1 · Provision",
        title: "Stand up Cloud SQL for Postgres",
        body: [
          "Enable the API and define a small Postgres instance in Terraform. For a portfolio, the smallest tier is plenty. Unlike Cloud Run, a database bills continuously — so understanding its cost and how to pause it matters here.",
        ],
        prompts: [
          { prompt: "Enable the Cloud SQL Admin API, then in my /terraform folder add a small Postgres 16 Cloud SQL instance (smallest tier, deletion protection off) and a database called portfolio. Put it on a branch and open a PR. Explain what this will cost and how to stop it when I'm not using it." },
        ],
        code: [
          {
            filename: "Terminal — enable & provision",
            code: `gcloud services enable sqladmin.googleapis.com
cd terraform && terraform init && terraform apply`,
          },
          {
            filename: "terraform/db.tf",
            code: `resource "google_sql_database_instance" "pg" {
  name             = "portfolio-pg"
  database_version = "POSTGRES_16"
  region           = "YOUR_REGION"
  settings {
    tier = "db-f1-micro"           # smallest; fine for a portfolio
    ip_configuration { ipv4_enabled = true }
  }
  deletion_protection = false        # so you can tear it down easily
}

resource "google_sql_database" "app" {
  name     = "portfolio"
  instance = google_sql_database_instance.pg.name
}`,
          },
        ],
        callouts: [
          {
            title: "This is the piece most likely to cost money — watch it",
            text: "Unlike Cloud Run, a database runs continuously and bills continuously — it doesn't scale to zero. On the free credit it's fine, but this is the resource to shut down when you're done experimenting. Your Phase 0 budget alert is your safety net.",
          },
        ],
      },
      {
        id: "ground-it/extensions",
        eyebrow: "Step 2 · Enable the Extensions",
        title: "Turn Postgres into a vector store",
        body: [
          "Connect to the database securely with the Cloud SQL Auth Proxy (no exposing the database to the public internet), enable the two extensions, then create your table.",
        ],
        prompts: [
          { prompt: "Help me connect to my Cloud SQL Postgres instance securely with the Cloud SQL Auth Proxy, enable the vector and google_ml_integration extensions, and create a doc_chunks table with an embedding column and an index. Explain what each extension does." },
        ],
        code: [
          {
            filename: "Terminal — connect securely via the Auth Proxy",
            code: `./cloud-sql-proxy PROJECT_ID:YOUR_REGION:portfolio-pg &
psql "host=127.0.0.1 dbname=portfolio user=postgres"`,
          },
          {
            filename: "psql — run once per database",
            code: `CREATE EXTENSION IF NOT EXISTS vector;               -- pgvector
CREATE EXTENSION IF NOT EXISTS google_ml_integration; -- Vertex AI from SQL

CREATE TABLE doc_chunks (
  id         BIGSERIAL PRIMARY KEY,
  source     TEXT,           -- which document this came from
  content    TEXT,           -- the chunk text
  embedding  VECTOR(768)     -- must match your embedding model's size
);

-- an index makes similarity search fast at scale
CREATE INDEX ON doc_chunks
  USING hnsw (embedding vector_cosine_ops);`,
          },
        ],
      },
      {
        id: "ground-it/ingest",
        eyebrow: "Step 3 · Ingest",
        title: "Load and embed your documents",
        body: [
          "Write a one-time ingestion script: gather source material (resume, project write-ups, a bio, blog posts), chunk it into passages of a few hundred tokens with a little overlap, embed each chunk with Vertex AI, and insert the rows.",
        ],
        prompts: [
          { prompt: "Write a script that loads my documents (I'll point you at them), splits them into overlapping chunks, generates a Vertex AI embedding for each, and inserts them into doc_chunks. Explain how you chose the chunk size and why overlap matters." },
        ],
        code: [
          {
            filename: "psql — SQL-native embeddings",
            code: `-- with google_ml_integration you can embed straight from SQL
INSERT INTO doc_chunks (source, content, embedding)
VALUES (
  'resume.md',
  'Led migration of the risk model to a RAG pipeline...',
  embedding('text-embedding-005',
            'Led migration of the risk model to a RAG pipeline...')
);`,
          },
        ],
      },
      {
        id: "ground-it/retrieve-generate",
        eyebrow: "Step 4 · Retrieve + Generate",
        title: "Upgrade your endpoint to use RAG",
        diagram: "rag-flow",
        body: [
          "Now change the /api/ask endpoint from Phase 2. Instead of pasting your whole resume, you embed the question, pull the top matching chunks from Postgres, and give only those to Gemini — with their sources, so it can cite where each answer came from.",
        ],
        prompts: [
          { prompt: "Upgrade my /api/ask endpoint to use RAG: embed the incoming question, retrieve the top matching chunks from doc_chunks by vector similarity, and pass only those (with their sources) to Gemini. Have it cite which source each answer came from. Then branch, PR, and merge to deploy." },
        ],
        code: [
          {
            filename: "psql — semantic search ($1 = the user's question)",
            code: `-- the retrieval query: closest chunks to the question
SELECT source, content
FROM doc_chunks
ORDER BY embedding <=> embedding('text-embedding-005', $1)
LIMIT 5;`,
          },
          {
            filename: "app/api/ask — retrieve then generate (pseudocode)",
            code: `const chunks = await db.query(RETRIEVAL_SQL, [question]);
const context = chunks.map(c => c.content).join('\\n---\\n');
const answer  = await gemini(\`
  Answer using ONLY the context below. If it's not covered,
  say you don't have that information.
  CONTEXT:\\n\${context}\\n\\nQUESTION: \${question}\`);`,
          },
        ],
        callouts: [
          {
            title: "Cite the source — it's the moment RAG clicks",
            text: "Because each chunk carries its source, you can show the user where each answer came from. When your site correctly answers something the base model couldn't possibly know — pulled from your own writing, with a citation — that's the payoff.",
          },
        ],
      },
      {
        id: "ground-it/refine",
        eyebrow: "Step 5 · Refine & Connect",
        title: "Tune retrieval, then ship",
        body: [
          "A first RAG system is rarely great; making it good is the real learning. In order of impact: tune chunk size & overlap (too big and retrieval is vague, too small and it loses context); tune how many chunks to retrieve (more context isn't always better — irrelevant chunks distract the model); and connect from Cloud Run securely.",
        ],
        prompts: [
          { prompt: "Connect my Cloud Run service to Cloud SQL using the built-in connector and IAM database auth (no password in code). Grant the site's service account the cloudsql.client role in /terraform, add the DB connection settings to the Cloud Run service, then branch, PR, and merge to deploy.", note: "IAM database auth means there's no password stored anywhere — same keyless philosophy as WIF." },
        ],
      },
    ],
    checklist: [
      "Cloud SQL Postgres running, with vector and google_ml_integration enabled.",
      "A doc_chunks table with an embedding column and an index.",
      "An ingestion script that chunks and embeds your documents.",
      "A retrieval-backed /api/ask that answers from your material and cites sources.",
      "Cloud Run connected to Cloud SQL with no password in code.",
    ],
    quiz: [
      {
        id: "ground-it/q1",
        question: "What is the core RAG loop, in order?",
        options: [
          "Generate an answer, then search documents to verify it",
          "Embed the question, retrieve the most similar chunks, then generate an answer grounded in them",
          "Paste every document into the prompt every time",
          "Fine-tune the model on your documents",
        ],
        answer: 1,
        explanation:
          "RAG is retrieve-then-generate: embed the question, find the chunks whose embeddings are most similar, and hand just those (with sources) to the model to answer from.",
      },
      {
        id: "ground-it/q2",
        question: "Which Phase 3 resource is the one that bills continuously and must be watched?",
        options: [
          "The Cloud Run service (it scales to zero)",
          "The Cloud SQL Postgres database (it runs continuously)",
          "The Artifact Registry repo",
          "The GitHub Actions workflow",
        ],
        answer: 1,
        explanation:
          "Unlike Cloud Run, which scales to zero when idle, a Cloud SQL database runs — and bills — continuously. It's the resource to shut down when you're done experimenting.",
      },
      {
        id: "ground-it/q3",
        question: "Why store each chunk's source alongside its text and embedding?",
        options: [
          "It's required for the embedding to work",
          "So the model can cite where each answer came from, and users can verify",
          "To make the database smaller",
          "It has no effect on the answer",
        ],
        answer: 1,
        explanation:
          "Carrying the source through retrieval lets you show citations. Answering something the base model couldn't know, with a citation back to your own writing, is the payoff of RAG.",
      },
    ],
    resources: [
      { label: "Build generative AI apps with Cloud SQL", url: "https://cloud.google.com/sql/docs/postgres/generative-ai-overview" },
      { label: "What is pgvector", url: "https://cloud.google.com/blog/products/databases/using-pgvector-llms-and-langchain-with-google-cloud-databases" },
      { label: "Advanced RAG techniques (Google Codelab)", url: "https://codelabs.developers.google.com/" },
      { label: "Anthropic: contextual retrieval", url: "https://www.anthropic.com/news/contextual-retrieval" },
    ],
    prevSlug: "make-it-smart",
    nextSlug: "open-it-up",
  },

  // ── Phase 4 ────────────────────────────────────────────────────────────────
  {
    slug: "open-it-up",
    number: 4,
    name: "Open It Up",
    subtitle: "Connect Claude to Your Site with an OAuth MCP Server",
    tagline: "Give an AI assistant secure, authenticated hands on your own project.",
    youBuild: "An AI connector to your site.",
    coreConcept: "Agents, tools, MCP, OAuth.",
    industry: {
      why: "The frontier is AI that doesn't just talk but acts — querying systems, taking actions. MCP is becoming the standard way to connect assistants to tools, and engineers who can build MCP servers are still a small minority. It's a genuine differentiator.",
      example:
        "A company exposes its internal tools through an MCP server so employees can ask an assistant to “pull last week's numbers and draft the update” — securely, behind OAuth. You'll build a small version that lets Claude post and pull content on your own site.",
    },
    intro: [
      "For the finale, you'll build a remote MCP server — protected by OAuth — and deploy it alongside your site on Cloud Run. Once it's connected, you can open Claude or Codex and say “pull my latest projects” or “post this new blog entry to my site,” and the assistant does it through your server, acting as you.",
      "MCP (Model Context Protocol) is an open standard from Anthropic for connecting an AI to external tools and data in a uniform way. Think of it as a universal socket: your server exposes tools (like list_projects or create_post), and any MCP-capable assistant can plug in and call them through plain conversation.",
    ],
    steps: [
      {
        id: "open-it-up/standard",
        eyebrow: "The Current Standard",
        title: "What Claude expects (verify as you go)",
        body: [
          "MCP's transport and auth have evolved quickly, so build against the current spec and expect it to keep moving. A remote server that Claude can connect to needs: Streamable HTTP transport (the older HTTP+SSE is deprecated); OAuth 2.1 + PKCE; Dynamic Client Registration (so Claude can register itself as a client); discovery metadata (the RFC-standard endpoints Claude probes); and a 401 that points to your auth server.",
          "Don't hand-roll all of OAuth. Two saner paths: put an identity provider (Auth0, Okta, or Google Identity) in front and have your server validate its tokens; or use a hosting platform with built-in MCP OAuth management. Either way, your tool logic stays simple and the auth heavy lifting is handled by something battle-tested.",
        ],
      },
      {
        id: "open-it-up/define-tools",
        eyebrow: "Step 1 · Define Tools",
        title: "Write the MCP server and its tools",
        body: [
          "Use the official MCP SDK (TypeScript or Python). Each tool is a named function with a described input schema — the description is how the model knows when to call it, so write it well. Notice these tools reuse your Phase 3 database: the MCP server is a thin, authenticated doorway onto work you already built.",
        ],
        prompts: [
          { prompt: "Scaffold a remote MCP server using the official SDK with two tools: list_projects (reads from my Cloud SQL database) and create_post (writes a new post to it). Explain how MCP tools and their input schemas work, and why the tool description matters." },
        ],
        code: [
          {
            filename: "Terminal — install the MCP SDK",
            code: `npm install @modelcontextprotocol/sdk zod`,
          },
          {
            filename: "server.ts (TypeScript SDK)",
            code: `server.tool(
  'list_projects',
  'List the projects shown on my portfolio site.',
  {},
  async () => ({ content: [{ type: 'text',
    text: JSON.stringify(await db.getProjects()) }] })
);

server.tool(
  'create_post',
  'Publish a new blog post to my site.',
  { title: z.string(), body: z.string() },
  async ({ title, body }) => {
    await db.insertPost({ title, body });   // reuses your Phase 3 DB
    return { content: [{ type: 'text', text: 'Published.' }] };
  }
);`,
          },
        ],
      },
      {
        id: "open-it-up/protect",
        eyebrow: "Step 2 · Protect It",
        title: "Add OAuth in front of the tools",
        diagram: "mcp-oauth",
        body: [
          "Wrap the server so every tool call must carry a valid access token. The flow: Claude hits your server unauthenticated and gets a 401 that advertises your auth server; Claude registers as a client (DCR) and redirects you to sign in; you approve in the provider's own screen; Claude receives a short-lived token (with PKCE) and calls your tools, which validate it on every request.",
        ],
        prompts: [
          { prompt: "Add OAuth 2.1 with PKCE and Dynamic Client Registration to my MCP server over Streamable HTTP, so every tool call requires a valid token. I'd like to use [an identity provider like Auth0/Google Identity] rather than hand-rolling it. Walk me through the flow and check it against Anthropic's current custom-connector requirements." },
        ],
        callouts: [
          {
            title: "Why OAuth is non-negotiable here",
            text: "A read-only public endpoint might not need auth. The moment your server can change your site, it must verify who's calling. OAuth is how the assistant proves it's acting for you, without you ever pasting a password or long-lived token into it.",
          },
        ],
      },
      {
        id: "open-it-up/deploy",
        eyebrow: "Step 3 · Deploy & Connect",
        title: "Ship it and plug Claude in",
        body: [
          "Deploy the MCP server to Cloud Run as a second service (same Terraform + PR-merge pattern as your site). Register your provider's OAuth callback URLs, including Claude's callback — missing callback URLs are the most common reason connections fail. Then in Claude: Settings → Connectors → Add custom connector, paste your server URL, click Connect, and complete the OAuth sign-in. Your tools appear.",
        ],
        prompts: [
          { prompt: "Containerize my MCP server, add it to /terraform as a second Cloud Run service, and wire it into the deploy pipeline. Branch, PR, and merge so it deploys. Give me its public URL." },
        ],
        code: [
          {
            filename: "Terminal — debug the OAuth flow locally first",
            code: `npx @modelcontextprotocol/inspector   # walks auth + calls your tools`,
          },
        ],
        callouts: [
          {
            title: "Test with the Inspector first",
            text: "Before wiring into Claude, debug locally with the MCP Inspector — it walks the OAuth flow and calls your tools so you can confirm everything works in isolation. Connecting to Claude is much smoother once the Inspector is green.",
          },
          {
            title: "Safety: you're giving an AI write access to your site",
            text: "Scope tokens to the minimum. Keep destructive tools (delete) out, or require confirmation. Log every tool call. Rate-limit. Treat anything the model sends as untrusted input, and validate it before it touches your database. This is real production security thinking — exactly the kind of judgment the role is about.",
          },
        ],
      },
      {
        id: "open-it-up/next",
        eyebrow: "Where To Take It Next",
        title: "AI features to build into this project",
        body: [
          "You now own every layer — site, model, retrieval, and an authenticated AI doorway. Features that build naturally on that, roughly easiest to most ambitious: recruiter-tuned summaries; “chat with my work” over all your documents with citations; a self-updating site via MCP (your CMS becomes a conversation); auto-drafted blog posts; semantic project search; a contact-triage agent; an eval harness that scores your RAG answers against known-good Q&A pairs; and a multi-step agent given several tools and a goal.",
          "The through-line: every one of these is the same loop — describe, build, verify, ship — applied to a new problem, on infrastructure you own. That loop, plus the judgment to secure and evaluate what you build, is AI engineering. You've now done it end to end.",
        ],
      },
    ],
    checklist: [
      "An MCP server exposing pull and post tools over your Phase 3 data.",
      "OAuth 2.1 + PKCE + DCR over Streamable HTTP, via a provider or platform.",
      "Deployed to Cloud Run with the Phase 1 pipeline; callback URLs registered.",
      "Connected to Claude/Codex and driving your site by conversation.",
      "Least-privilege scoping, logging, and validation on every tool.",
    ],
    quiz: [
      {
        id: "open-it-up/q1",
        question: "Why must a write-capable MCP server sit behind OAuth?",
        options: [
          "OAuth makes the server faster",
          "Because the moment a server can change your site, it must verify who's calling — without you pasting a long-lived token",
          "It's only needed for read-only endpoints",
          "OAuth is required to deploy to Cloud Run",
        ],
        answer: 1,
        explanation:
          "A read-only public endpoint might not need auth, but a server that can modify your site must verify the caller. OAuth lets the assistant prove it's acting for you, with short-lived tokens instead of a stored secret.",
      },
      {
        id: "open-it-up/q2",
        question: "What is the most common reason a Claude ↔ MCP connection fails?",
        options: [
          "The server uses TypeScript instead of Python",
          "Missing OAuth callback URLs (including Claude's callback)",
          "The tool descriptions are too long",
          "The MCP server runs on Cloud Run",
        ],
        answer: 1,
        explanation:
          "Registering your provider's OAuth callback URLs — including Claude's callback — is easy to forget, and missing callback URLs are the most common reason connections fail.",
      },
      {
        id: "open-it-up/q3",
        question: "How should you treat input the model sends to your write tools?",
        options: [
          "As trusted, since it comes from an AI",
          "As untrusted input to validate before it touches your database",
          "As already sanitized by OAuth",
          "It doesn't matter for a personal project",
        ],
        answer: 1,
        explanation:
          "Treat anything the model sends as untrusted: scope tokens to the minimum, log every call, rate-limit, and validate before it touches your database. That production security judgment is exactly what the role is about.",
      },
    ],
    resources: [
      { label: "Building custom connectors — Anthropic", url: "https://support.anthropic.com/en/articles/11175166-about-custom-integrations-using-remote-mcp" },
      { label: "MCP authorization specification", url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization" },
      { label: "MCP TypeScript SDK", url: "https://github.com/modelcontextprotocol/typescript-sdk" },
      { label: "MCP Inspector", url: "https://github.com/modelcontextprotocol/inspector" },
    ],
    prevSlug: "ground-it",
  },
];

// ─── Routing / lookup helpers ────────────────────────────────────────────────

export const PHASE_SLUGS = phases.map((p) => p.slug);

export function phaseBySlug(slug: string): Phase | undefined {
  return phases.find((p) => p.slug === slug);
}

/** Total number of trackable "step" units across all phases (for progress %). */
export const TOTAL_STEPS = phases.reduce((n, p) => n + p.steps.length, 0);
