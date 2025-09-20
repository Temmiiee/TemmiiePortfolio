import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Désactiver les source maps en production pour éviter les erreurs 404
  productionBrowserSourceMaps: false,
  
  // Configuration pour améliorer les performances
  compress: true,
  
  // Configuration des headers de sécurité
  async headers() {
    return [
      {
        // Appliquer ces headers à toutes les routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Headers spécifiques pour les fichiers statiques
        source: '/(.*)\\.(js|css|woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Configuration conditionnelle pour webpack (uniquement si pas Turbopack)
  ...(!process.env.TURBOPACK && {
    webpack: (config, { dev, isServer }) => {
      // En production, désactiver les warnings de source maps manquantes
      if (!dev && !isServer) {
        config.devtool = false;
      }
      
      return config;
    },
  }),
};

export default nextConfig;
