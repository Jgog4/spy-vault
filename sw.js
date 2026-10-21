// Offline support: the app is cached on first visit. When the iPad is online it always
// loads the latest version; when offline (or the network is slow) it uses the cached copy.
// Bump CACHE when you add or rename files so the precache list is refreshed.
const CACHE = 'spyvault-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './img/star-photo.jpg',
];
const NETWORK_TIMEOUT_MS = 3000;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first (fresh when online), cache fallback (works with no signal).
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const network = fetch(req.url, { cache: 'no-cache' }).then(res => {
      if (res && res.ok) cache.put(req, res.clone()); // a late answer still refreshes the cache
      return res;
    });
    try {
      const res = await Promise.race([
        network,
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT_MS)),
      ]);
      if (res.ok) return res;
      const cached = await cache.match(req, { ignoreSearch: true });
      return cached || res;
    } catch (e) {
      network.catch(() => {});
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const shell = (await cache.match('./index.html')) || (await cache.match('./'));
        if (shell) return shell;
      }
      return Response.error();
    }
  })());
});
