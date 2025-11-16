// Production Service Worker for Matthéo Termine Portfolio
const CACHE_NAME = 'mattheo-termine-v3';
const STATIC_CACHE = 'static-v3';

// Only cache truly static assets - NOT Next.js chunks
const urlsToCache = [
  '/',
  '/manifest.webmanifest',
  '/images/mattheo-termine-photo.png',
  '/cv-mattheo-termine.pdf',
  '/favicon.ico'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch((err) => {
          console.warn('Failed to cache some resources:', err);
          // Continue even if some resources fail to cache
          return Promise.resolve();
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Minimal intervention strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  try {
    const url = new URL(request.url);

    // Skip cross-origin requests - let browser handle them
    if (url.origin !== location.origin) {
      return;
    }

    // CRITICAL: Don't intercept Next.js chunks, JS, CSS, or API routes
    // Let the browser handle these directly without SW intervention
    if (
      url.pathname.startsWith('/_next/') ||
      url.pathname.startsWith('/api/') ||
      url.pathname.includes('hot-update') ||
      url.pathname.includes('webpack') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.map')
    ) {
      // Don't intercept at all - let browser fetch normally
      return;
    }

    // Only handle static assets and HTML pages
    const isStaticAsset = url.pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|pdf|woff|woff2|webp)$/);
    const isHTMLPage = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');

    if (!isStaticAsset && !isHTMLPage) {
      // Don't intercept other types of requests
      return;
    }

    // Network-first strategy for static assets and pages
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response && response.status === 200 && request.method === 'GET') {
            // Clone the response before caching
            const responseToCache = response.clone();
            
            // Cache static assets and homepage
            if (isStaticAsset || url.pathname === '/') {
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, responseToCache).catch(() => {
                  // Silently fail if caching doesn't work
                });
              });
            }
          }
          return response;
        })
        .catch(() => {
          // On network failure, try to serve from cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If not in cache and it's a navigation request, return cached homepage
            if (isHTMLPage) {
              return caches.match('/').then((homeResponse) => {
                return homeResponse || new Response('Offline - Please check your connection', {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({
                    'Content-Type': 'text/plain'
                  })
                });
              });
            }
            
            // For other requests, return a basic error response
            return new Response('Network error', {
              status: 408,
              statusText: 'Request Timeout'
            });
          });
        })
    );
  } catch (error) {
    // If anything goes wrong, don't intercept the request
    return;
  }
});
