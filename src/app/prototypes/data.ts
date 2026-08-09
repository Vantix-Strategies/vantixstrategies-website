// Registry of campaign prototypes — self-contained static HTML demos sent to
// prospects in email marketing campaigns, not deployed applications. To add
// one: drop the exported HTML in public/prototypes/<slug>.html, patch its
// <title> and add noindex/OG meta tags in the head, then add an entry here.
// This page and its listing are intentionally excluded from the sitemap.

export interface Prototype {
  slug: string;
  title: string;
  campaign: string;
  industry: string;
  summary: string;
  added: string;
  status: "live" | "draft";
}

export const prototypes: Prototype[] = [
  {
    slug: "trellis",
    title: "Trellis",
    campaign: "Fitness & Wellness",
    industry: "Fitness & Wellness Studios",
    summary:
      "An AI operations platform for a strength and conditioning studio — retention radar, session logging, photo-to-structured-note extraction, and a client-facing progress portal.",
    added: "2026-08-08",
    status: "live",
  },
];
