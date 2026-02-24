import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for deployment
  // output: 'export',
  // distDir: 'dist',
  
  // Image optimization settings
  images: {
    unoptimized: true, // Set to true for static export
  },
  
  // Trailing slashes for cleaner URLs
  trailingSlash: true,
  
  // Redirects (optional)
  async redirects() {
    return [];
  },
  
  // Headers (optional - for security, caching, etc.)
  async headers() {
    return [];
  },
};

export default nextConfig;
