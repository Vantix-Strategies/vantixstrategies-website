import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings - Vercel handles this automatically
  images: {
    remotePatterns: [],
  },
  
  // Trailing slashes for cleaner URLs
  trailingSlash: false,
};

export default nextConfig;
