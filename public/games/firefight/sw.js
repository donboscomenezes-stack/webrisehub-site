// Firefight service worker (generated at build time from client/sw-template.js).
// Precaches every file of the build so the solo game works fully offline after
// the first visit. Paths are relative to this file, so hosting under any
// sub-path (e.g. /game/) works.
const VERSION = 'aba571433b5a';
const PRECACHE = [
 "./",
 "assets/audio-game/music-high.mp3",
 "assets/audio-game/music-low.mp3",
 "assets/audio-game/music-menu.mp3",
 "assets/audio-game/music-mid.mp3",
 "assets/human/anims.glb",
 "assets/human/body-female.glb",
 "assets/human/body-male.glb",
 "assets/human/eyebrows-female.glb",
 "assets/human/eyebrows-regular.glb",
 "assets/human/hair-beard.glb",
 "assets/human/hair-buzzed.glb",
 "assets/human/hair-buzzedfemale.glb",
 "assets/human/hair-simpleparted.glb",
 "assets/kit/SOURCE.md",
 "assets/kit/props/barrier-fixed.glb",
 "assets/kit/props/barrier-large.glb",
 "assets/kit/props/barrier-trash.glb",
 "assets/kit/props/debris-papers-1.glb",
 "assets/kit/props/debris-pile.glb",
 "assets/kit/props/debris-tires.glb",
 "assets/kit/props/exploding-barrel.glb",
 "assets/kit/props/fence-long.glb",
 "assets/kit/props/metal-fence.glb",
 "assets/kit/props/pallet.glb",
 "assets/kit/props/pipes.glb",
 "assets/kit/props/sofa-small.glb",
 "assets/kit/props/sofa.glb",
 "assets/kit/props/tank.glb",
 "assets/kit/props/traffic-cone.glb",
 "assets/kit/props/trash-container-open.glb",
 "assets/kit/props/tree-1.glb",
 "assets/kit/props/tree-2.glb",
 "assets/kit/props/tree-3.glb",
 "assets/kit/props/tree-4.glb",
 "assets/kit/props/water-tank-floor.glb",
 "assets/kit/props/water-tank-platform.glb",
 "assets/kit/props/wood-planks.glb",
 "assets/maps/depot/ground.webp",
 "assets/maps/depot/map.json",
 "assets/maps/depot/preview.webp",
 "assets/maps/neon/ground.webp",
 "assets/maps/neon/map.json",
 "assets/maps/neon/preview.webp",
 "assets/maps/outpost/ground.webp",
 "assets/maps/outpost/map.json",
 "assets/maps/outpost/preview.webp",
 "assets/maps/riverside/ground.webp",
 "assets/maps/riverside/map.json",
 "assets/maps/riverside/preview.webp",
 "assets/maps/scrapyard/ground.webp",
 "assets/maps/scrapyard/map.json",
 "assets/maps/scrapyard/preview.webp",
 "assets/real/Barrel_01.glb",
 "assets/real/SOURCE.md",
 "assets/real/cardboard_box_01.glb",
 "assets/real/concrete_road_barrier_02.glb",
 "assets/real/covered_car.glb",
 "assets/real/guns/ak.glb",
 "assets/real/guns/marksman.glb",
 "assets/real/guns/pistol.glb",
 "assets/real/guns/shotgun.glb",
 "assets/real/guns/smg.glb",
 "assets/real/guns/sniper.glb",
 "assets/real/medical_box.glb",
 "assets/real/metal_jerrycan.glb",
 "assets/real/metal_trash_can.glb",
 "assets/real/propane_tank.glb",
 "assets/real/sandbags.glb",
 "assets/real/sandbags_small.glb",
 "assets/real/street_lamp_01.glb",
 "assets/real/wooden_crate_02.glb",
 "assets/ui/weapons/ak.png",
 "assets/ui/weapons/barrel.png",
 "assets/ui/weapons/marksman.png",
 "assets/ui/weapons/pistol.png",
 "assets/ui/weapons/shotgun.png",
 "assets/ui/weapons/smg.png",
 "assets/ui/weapons/sniper.png",
 "build/barlow-condensed-latin-500-normal-BZhxI-S8.woff2",
 "build/barlow-condensed-latin-500-normal-CgFv4DbK.woff",
 "build/barlow-condensed-latin-600-normal-BN11TKSn.woff2",
 "build/barlow-condensed-latin-600-normal-CX7qwx3H.woff",
 "build/barlow-condensed-latin-700-normal-B9NQhHK3.woff2",
 "build/barlow-condensed-latin-700-normal-IaWpoxiT.woff",
 "build/barlow-condensed-latin-ext-500-normal-8xWaBKho.woff2",
 "build/barlow-condensed-latin-ext-500-normal-aT87XWLU.woff",
 "build/barlow-condensed-latin-ext-600-normal-BYLMsm3F.woff",
 "build/barlow-condensed-latin-ext-600-normal-DEVAjXQy.woff2",
 "build/barlow-condensed-latin-ext-700-normal-CUij3gnH.woff",
 "build/barlow-condensed-latin-ext-700-normal-D1u2T3o9.woff2",
 "build/barlow-condensed-vietnamese-500-normal-BiFOxWMd.woff",
 "build/barlow-condensed-vietnamese-500-normal-DJF-uNlS.woff2",
 "build/barlow-condensed-vietnamese-600-normal-B_SkwFzN.woff",
 "build/barlow-condensed-vietnamese-600-normal-DWeQVCYr.woff2",
 "build/barlow-condensed-vietnamese-700-normal-6E49mAj2.woff2",
 "build/barlow-condensed-vietnamese-700-normal-fAytnyZo.woff",
 "build/barlow-latin-400-normal-CtwdMZP0.woff2",
 "build/barlow-latin-400-normal-Gqj0RTbC.woff",
 "build/barlow-latin-500-normal-BAaAwKGi.woff",
 "build/barlow-latin-500-normal-BRhHB0xN.woff2",
 "build/barlow-latin-600-normal-DMnFtVx9.woff2",
 "build/barlow-latin-600-normal-DznpAvW9.woff",
 "build/barlow-latin-ext-400-normal-DGsTVCL_.woff",
 "build/barlow-latin-ext-400-normal-DsA6LmuC.woff2",
 "build/barlow-latin-ext-500-normal-B8S-Wk_i.woff",
 "build/barlow-latin-ext-500-normal-D9Q9nrG3.woff2",
 "build/barlow-latin-ext-600-normal-Brs4HSvV.woff2",
 "build/barlow-latin-ext-600-normal-DxfNEZIW.woff",
 "build/barlow-vietnamese-400-normal-B8B3d_DU.woff2",
 "build/barlow-vietnamese-400-normal-Dcxa7Lg7.woff",
 "build/barlow-vietnamese-500-normal-Ds--_AhX.woff2",
 "build/barlow-vietnamese-500-normal-OcIDFxwj.woff",
 "build/barlow-vietnamese-600-normal--rM-LJkj.woff",
 "build/barlow-vietnamese-600-normal-gKnznvH6.woff2",
 "build/index-D1_cGoOP.css",
 "build/index-Dg8Vjl75.js",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "manifest.webmanifest"
];
const CACHE = `firefight-${VERSION}`;
const scope = self.registration.scope;
const urls = PRECACHE.map((p) => new URL(p, scope).href);
const NETWORK_ONLY = [/\/ws$/, /\/health$/];
// Small files that change with every build: fetched fresh when online so a page
// never pairs new code with an old cached map.
const NETWORK_FIRST = [/\/config\.json$/, /\/map\.json$/];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Add in small batches so one slow file doesn't stall everything.
    for (let i = 0; i < urls.length; i += 8) {
      await cache.addAll(urls.slice(i, i + 8).map((u) => new Request(u, { cache: 'reload' })));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('firefight-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
    for (const c of await self.clients.matchAll()) c.postMessage({ type: 'precached', version: VERSION });
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'status') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const keys = new Set((await cache.keys()).map((r) => r.url));
    const complete = urls.every((u) => keys.has(u));
    event.ports[0]?.postMessage({ complete, version: VERSION });
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (NETWORK_ONLY.some((re) => re.test(url.pathname))) return;

  if (req.mode === 'navigate') {
    // App shell: always serve the cached page (invite links carry ?room=).
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh.ok) return fresh;
      } catch { /* offline */ }
      return (await caches.match(new URL('./', scope).href)) ?? (await caches.match(new URL('index.html', scope).href)) ?? Response.error();
    })());
    return;
  }

  if (NETWORK_FIRST.some((re) => re.test(url.pathname))) {
    event.respondWith(fetch(req).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r ?? new Response('{}', { headers: { 'content-type': 'application/json' } }))));
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    const res = await fetch(req);
    if (res.ok && res.type === 'basic') {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  })());
});
