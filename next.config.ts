import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    formats: ["image/webp"],
    qualities: [75, 80, 85, 90],
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
