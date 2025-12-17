import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [75, 80, 85, 90],
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  
  // Optimisations pour réduire les requêtes bloquantes
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Compression et optimisations
  compress: true,
  
  // Configuration pour l'export statique
  trailingSlash: false,
};

export default nextConfig;
