import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    qualities: [75, 80, 85, 90],
  },
  productionBrowserSourceMaps: false,

  // Disable webpack cache for Cloudflare Pages (25MB file limit)
  webpack: (config) => {
    if (process.env.CF_PAGES) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
