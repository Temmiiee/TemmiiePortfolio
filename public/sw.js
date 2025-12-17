const CACHE_NAME = 'mattheo-termine';

// Ressources à mettre en cache
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon.ico'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_RESOURCES))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

// Activate
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
      self.clients.claim()
    ]).catch(() => {
      // Ignorer les erreurs
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET et les requêtes externes
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }
  
  // Cache-first pour les ressources statiques
  if (request.url.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|ico)$/)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request).then(response => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(request, responseClone))
                .catch(() => {}); // Ignorer les erreurs de cache
            }
            return response;
          });
        })
        .catch(() => fetch(request)) // Fallback vers le réseau
    );
  }
});
