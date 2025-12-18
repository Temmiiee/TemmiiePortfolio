const CACHE_NAME = 'mattheo-termine-v2';
const STATIC_CACHE = 'static-v2';
const RUNTIME_CACHE = 'runtime-v2';

// Ressources critiques à précharger
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon.ico',
  '/theme-init.js'
];

// Install - précharger les ressources critiques
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => 
        cache.addAll(CRITICAL_RESOURCES).catch(() => {})
      ),
      self.skipWaiting()
    ])
  );
});

// Activate - nettoyer les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!['mattheo-termine-v2', 'static-v2', 'runtime-v2'].includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch - stratégie de cache optimisée
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET et externes
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }
  
  // Stratégie cache-first pour les ressources statiques
  if (request.url.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|ico|json)$/)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            // Mise à jour en arrière-plan pour les ressources anciennes
            if (shouldUpdateCache(response)) {
              fetch(request).then(fetchResponse => {
                if (fetchResponse.status === 200) {
                  cache.put(request, fetchResponse.clone());
                }
              }).catch(() => {});
            }
            return response;
          }
          
          // Pas en cache, récupérer et mettre en cache
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.status === 200) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      }).catch(() => fetch(request))
    );
  }
  
  // Stratégie network-first pour les pages HTML
  else if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request).then(response => {
        if (response.status === 200) {
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, response.clone());
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request).then(response => {
          return response || caches.match('/');
        });
      })
    );
  }
});

// Vérifier si une ressource en cache doit être mise à jour
function shouldUpdateCache(response) {
  const cacheDate = new Date(response.headers.get('date') || 0);
  const now = new Date();
  const hoursSinceCache = (now - cacheDate) / (1000 * 60 * 60);
  return hoursSinceCache > 24; // Mettre à jour après 24h
}

// Gérer les messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
