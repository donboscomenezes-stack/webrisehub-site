// Offline support: on the first visit every game file is cached, so the farm keeps
// working with no internet. Bump VERSION whenever you change any game file.
const VERSION = 'webrise-farm-v1';
const FILES = [
  './',
  'fonts/fredoka-latin-400-normal.woff2',
  'fonts/fredoka-latin-500-normal.woff2',
  'fonts/fredoka-latin-600-normal.woff2',
  'fonts/fredoka-latin-700-normal.woff2',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'index.html',
  'js/animals.js',
  'js/audio.js',
  'js/config.js',
  'js/farm.js',
  'js/fx.js',
  'js/game.js',
  'js/input.js',
  'js/lib/BufferGeometryUtils.js',
  'js/lib/RoundedBoxGeometry.js',
  'js/lib/three.module.js',
  'js/main.js',
  'js/models.js',
  'js/photo.js',
  'js/ui.js',
  'js/workers.js',
  'js/world.js',
  'manifest.webmanifest',
  'styles.css',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// cache first (instant + offline), then refresh the cache in the background when online
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) cache.put(e.request, r.clone()); return r; }).catch(() => null);
    return hit || (await net) || cache.match('./index.html');
  }));
});
