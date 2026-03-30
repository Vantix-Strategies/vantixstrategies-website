import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings - Vercel handles this automatically
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
