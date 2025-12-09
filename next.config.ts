import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    qualities: [75, 80, 85, 90],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
