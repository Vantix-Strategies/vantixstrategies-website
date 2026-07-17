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
    ];
  },
};

export default nextConfig;
