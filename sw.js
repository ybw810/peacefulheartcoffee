/**
 * Mindful Drip - PWA Service Worker (v1.0.1)
 * Intelligent Network-First for Navigation, Stale-While-Revalidate for Assets
 */

const CACHE_NAME = 'mindful-drip-v1.0.1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/design-tokens.css?v=1.0.0',
  './css/app.css?v=1.0.0',
  './js/app.js?v=1.0.0',
  './js/brew-calc.js?v=1.0.0',
  './js/timer.js?v=1.0.0',
  './js/golden-cup.js?v=1.0.0',
  './js/compass-bh.js?v=1.0.0',
  './js/qr-modal.js?v=1.0.0',
  './js/pwa-register.js?v=1.0.0',
  './og-image.png',
  './favicon.ico',
  './favicon.svg',
  './apple-touch-icon.png',
  './touch-icon.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './assets/icons/favicon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/og-image.png',
  './assets/qr/official-account.png',
  './assets/qr/mini-program.png'
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Mindful Drip v1.0.0...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[Service Worker] Pre-caching offline assets for v1.0.0');
      // Resilient pre-caching: cache assets individually so one failure does not break the entire SW
      await Promise.allSettled(
        ASSETS_TO_CACHE.map(url => cache.add(url).catch(err => console.warn('[SW Pre-cache Error]', url, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Mindful Drip v1.0.0...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Purging obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Google Fonts: Cache-First
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;
        try {
          const networkResponse = await fetch(event.request);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          return cachedResponse;
        }
      })
    );
    return;
  }

  // 2. Navigation Requests (index.html / pages): Network-First (Eliminates need for incognito mode!)
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(async () => {
        console.log('[Service Worker] Offline: serving cached navigation');
        const cached = await caches.match('./index.html') || await caches.match(event.request);
        return cached;
      })
    );
    return;
  }

  // 3. Version metadata: Always fresh from network
  if (url.pathname.endsWith('version.json')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // 4. Other static assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});
