import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [75, 80, 85, 90],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns'
    ],
  },

  // Compression and optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Compiler optimizations for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Configuration pour l'export statique
  trailingSlash: false,
};

export default nextConfig;
