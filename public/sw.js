// Version 5 - Optimisé pour éviter les erreurs de mise à jour
const CACHE_NAME = 'mattheo-termine-v5';

// Install - skip waiting immediately
self.addEventListener('install', (event) => {
  // Skip waiting pour activer immédiatement le nouveau SW
  self.skipWaiting();
  // Ne pas attendre l'installation
  event.waitUntil(self.skipWaiting());
});

// Activate - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Prendre le contrôle immédiatement
      self.clients.claim().catch(() => {
        // Ignorer les erreurs silencieusement
      })
    ])
  );
});
