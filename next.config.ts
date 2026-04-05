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
