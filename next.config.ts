import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker multi-stage build on Cloud Run
  output: "standalone",

  // Image optimization settings
  images: {
    remotePatterns: [],
  },

  // Trailing slashes for cleaner URLs
  trailingSlash: false,

  async redirects() {
    return [
      // NOTE: host canonicalization (root <-> www) is handled by Vercel's
      // primary-domain setting (www is primary; root 307s to www). Do NOT add a
      // host redirect here — it fights Vercel's redirect and causes an infinite
      // loop (ERR_TOO_MANY_REDIRECTS).
      {
        source: "/benchmarks",
        destination: "/blog/industry-metrics-we-evaluated",
        permanent: true,
      },
      {
        source: "/blog/industry-benchmark-methodology",
        destination: "/blog/industry-metrics-we-evaluated",
        permanent: true,
      },
      // Static HTML decks and prototypes are only linked by their clean URL.
      // Collapse any direct .html request onto it. Redirects match the
      // incoming path before rewrites run, so the internal :slug.html rewrite
      // target below does not loop back through here.
      {
        source: "/decks/:slug.html",
        destination: "/decks/:slug",
        permanent: true,
      },
      {
        source: "/prototypes/:slug.html",
        destination: "/prototypes/:slug",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    // Serve campaign prototypes from public/prototypes/<slug>.html at a clean
    // /prototypes/<slug> URL. Default (afterFiles) placement means real
    // routes — including the /prototypes index page — still win.
    // Slide decks work the same way from public/decks/<slug>.html.
    return [
      { source: "/prototypes/:slug", destination: "/prototypes/:slug.html" },
      { source: "/decks/:slug", destination: "/decks/:slug.html" },
    ];
  },

  async headers() {
    // Campaign prototypes are for email recipients, not search engines. We
    // deliberately do NOT disallow /prototypes/ in robots.ts: a blocked
    // crawler never fetches the page, never sees this header, and can still
    // index the URL from an inbound link. Allow the crawl, refuse the index.
    return [
      {
        source: "/prototypes/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      // Decks are indexable by default (public ones back blog posts). Decks
      // prepared for a specific client are unlisted: add them here, and give
      // the HTML a <meta name="robots" content="noindex, nofollow"> tag too.
      {
        source: "/decks/allianz-workforce-ai",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
