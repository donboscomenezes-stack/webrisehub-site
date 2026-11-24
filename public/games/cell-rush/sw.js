"use strict";

// Increment this version when the cached Cell Rush files change.
const CACHE_PREFIX = "cell-rush-offline-";
const CACHE = CACHE_PREFIX + "4";
const scope = self.registration.scope;
const home = new URL("./", scope).href;
const index = new URL("./index.html", scope).href;
const files = ["./style.css", "./game.js", "./offline.js"].map((file) => new URL(file, scope).href);

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll([home, ...files].map((url) => new Request(url, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  url.search = "";
  const cacheKey = url.href === index ? home : url.href;
  if (cacheKey !== home && !files.includes(cacheKey)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return await cache.match(cacheKey) || fetch(event.request);
  })());
});
