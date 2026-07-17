/**
 * Single source of truth for site-wide identity + SEO constants.
 * Used by layout metadata, sitemap, robots, and JSON-LD.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vantixstrategies.com"
).replace(/\/$/, "");

export const SITE_NAME = "Vantix Strategies";

export const SITE_DESCRIPTION =
  "We do not deliver strategy decks. We ship production AI systems inside your existing environment. Forward Deployed Engineers specializing in AI orchestration, enterprise data engineering, and operational redesign.";

export const SITE_TAGLINE = "AI Forward Deployed Engineering";

/** Public profiles for entity disambiguation (schema.org sameAs). */
export const COMPANY_LINKEDIN =
  "https://www.linkedin.com/company/vantix-strategies/";
export const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/holm-connor/";

/** Absolute URL helper. */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
