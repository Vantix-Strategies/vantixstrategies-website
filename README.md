# Vantix Strategies website

Marketing site for Vantix Strategies, plus industry proof-of-concept prototypes. The app is a [Next.js](https://nextjs.org) project (`consulting-site` in `package.json`). Prototypes are self-contained static HTML demos registered for the `/prototypes` listing.

## Local setup

This repo uses npm (`package-lock.json`).

```bash
npm install
cp .env.local.template .env.local
```

`.env.local` is gitignored. Fill it in from the template; do not commit it or paste real values into the repo.

| Variable | Role |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, robots, and JSON-LD |
| `NEXT_PUBLIC_SITE_NAME` | Public site name |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email |
| `NEXT_PUBLIC_CONTACT_PHONE` | Public contact phone |
| `NEXT_PUBLIC_GA_ID` | Optional analytics id (commented out in the template) |
| `FORM_ENDPOINT` | Optional form endpoint (commented out in the template) |
| `OPENAI_API_KEY` | Optional server-side key (commented out in the template) |
| `CONTACT_TO_EMAIL` | Server-side inbox for the contact form |
| `SMTP_HOST` | Server-side SMTP host |
| `SMTP_PORT` | Server-side SMTP port |
| `SMTP_USER` | Server-side SMTP user |
| `SMTP_PASS` | Server-side SMTP password |
| `SMTP_FROM` | Server-side From address. The template requires this to differ from `CONTACT_TO_EMAIL` |

## Scripts

| Script | What it runs |
| --- | --- |
| `npm run dev` | `next dev` — local development server (Next.js defaults to http://localhost:3000) |
| `npm run lint` | `eslint` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | `vitest run` |
| `npm run test:watch` | `vitest` |
| `npm run build` | `next build` |
| `npm start` | `next start` — serves the output of `npm run build` locally |

## Adding a prototype

Each prototype is a static file plus a registry entry. `src/app/prototypes/data.ts` is the registry, and `public/prototypes/` holds the HTML. The listing and its pages are excluded from the sitemap.

1. Add `public/prototypes/<slug>.html`.
2. Set the document `<title>`.
3. In the document head, add `<meta name="robots" content="noindex, nofollow">` and Open Graph tags: `og:title`, `og:description`, `og:image`, and `og:type`.
4. Append an entry to the `prototypes` array in `src/app/prototypes/data.ts`. The `slug` must match the HTML filename without `.html`.

```ts
{
  slug: "<slug>",
  title: "",
  campaign: "",
  industry: "",
  summary: "",
  added: "YYYY-MM-DD",
  status: "live", // or "draft"
}
```

`status` is `"live"` or `"draft"`. The `/prototypes` page lists these entries and links to `/prototypes/<slug>`.

## Changes

Track work in the [WEB Jira project](https://vantixstrategies.atlassian.net/browse/WEB). Delivery and engineering practice lives in the [VX Delivery and engineering playbook](https://vantixstrategies.atlassian.net/wiki/spaces/VX/pages/3506184).

Every change carries a WEB ticket key in the branch name, the commit message, and the pull request title.
