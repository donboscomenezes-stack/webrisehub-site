// My Garden has been removed. This worker replaces the old one on visitors' devices,
// deletes its offline copy and unregisters itself.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (/garden/i.test(key)) await caches.delete(key);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: "window" })) c.navigate("/");
  })());
});
