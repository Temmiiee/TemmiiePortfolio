import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    qualities: [75, 80, 85, 90],
  },
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
