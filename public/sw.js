// WebRiseHub offline support. Pages are fetched from the network first (so visitors
// always get the latest version when online) and saved as they are visited; when
// offline, saved pages are shown, and anything never visited shows /offline.
// Games with their own service worker (e.g. /games/firefight/) are controlled by it.
const CACHE = "wrh-v5";
const PRECACHE = ["/", "/games/", "/blog/", "/offline", "/logo.png", "/icon.png", "/games/firefight-card.jpg", "/games/webrise-farm-card.jpg"];
const MAX_BYTES = 8 * 1024 * 1024; // don't save very large single files

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith("wrh-") && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

async function save(req, res) {
  if (!res || !res.ok || res.redirected || res.type !== "basic") return;
  const len = Number(res.headers.get("content-length") || 0);
  if (len > MAX_BYTES) return;
  const c = await caches.open(CACHE);
  await c.put(req, res);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // ads, analytics, fonts: leave alone

  // Pages: network first, then the saved copy, then the offline page.
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        event.waitUntil(save(req, res.clone()));
        return res;
      } catch {
        return (await caches.match(req, { ignoreSearch: true }))
          || (await caches.match(url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname + "/"))
          || (await caches.match("/offline"));
      }
    })());
    return;
  }

  // Build files have content hashes in their names, so a saved copy is always right.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      event.waitUntil(save(req, res.clone()));
      return res;
    })());
    return;
  }

  // Everything else (images, game files, page data): network first, saved copy offline.
  event.respondWith((async () => {
    try {
      const res = await fetch(req);
      event.waitUntil(save(req, res.clone()));
      return res;
    } catch {
      const hit = await caches.match(req, { ignoreSearch: true });
      if (hit) return hit;
      throw new Error("offline");
    }
  })());
});
