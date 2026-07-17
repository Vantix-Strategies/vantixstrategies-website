import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import type { Phase } from "./data";

const provider = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
} as const;

const TRACK_NAME = "Vantix AI Engineering Track";
const TRACK_DESCRIPTION =
  "A hands-on, five-phase track that takes you from writing code to building and deploying a full AI system on cloud infrastructure you own — cloud foundations, Cloud Run, Vertex AI, RAG, and an OAuth MCP server.";

/** schema.org Course JSON-LD for the whole AI Engineering Track (hub page). */
export function trackCourseSchema(phases: Phase[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: TRACK_NAME,
    description: TRACK_DESCRIPTION,
    url: `${SITE_URL}/careers`,
    provider,
    image: absoluteUrl("/opengraph-image.png"),
    hasPart: phases.map((p) => ({
      "@type": "Course",
      name: `Phase ${p.number}: ${p.name}`,
      description: `${p.subtitle}. ${p.tagline}`,
      url: `${SITE_URL}/careers/${p.slug}`,
    })),
  };
}

/** schema.org Course JSON-LD for a single phase page. */
export function phaseCourseSchema(phase: Phase) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Phase ${phase.number}: ${phase.name} — ${phase.subtitle}`,
    description: `${phase.tagline} You build: ${phase.youBuild} Core concept: ${phase.coreConcept}`,
    url: `${SITE_URL}/careers/${phase.slug}`,
    provider,
    image: absoluteUrl("/opengraph-image.png"),
    isPartOf: {
      "@type": "Course",
      name: TRACK_NAME,
      url: `${SITE_URL}/careers`,
    },
  };
}

/** Generic schema.org BreadcrumbList JSON-LD. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
