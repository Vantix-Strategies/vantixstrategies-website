import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for deployment
  output: 'export',
  distDir: 'dist',
  
  // Image optimization settings
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Trailing slashes for cleaner URLs
  trailingSlash: true,
};

export default nextConfig;
