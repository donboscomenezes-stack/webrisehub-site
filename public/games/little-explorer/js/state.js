// Shared game context + lightweight custom physics helpers (no physics engine needed).
import * as THREE from 'three';

export const G = {
  scene: null, camera: null, renderer: null, clock: null,
  mode: 'loading',          // loading | menu | howto | play | paused | backpack | selfie | dialog | complete
  time: 0,                  // gameplay seconds
  models: {},               // loaded GLB scenes by key
  solids: [],               // collision / walkable shapes
  interactables: [],
  updaters: [],             // per-frame world callbacks (dt, t)
  player: null, cam: null, ui: null, world: null, collect: null, inter: null,
  keys: {}, inRoom: false,
  flags: {},                // story flags
  day: 0,                   // 0 = bright day … 1 = sunset
};

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
export const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
export function angleDamp(a, b, k, dt) {
  let d = ((b - a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  return a + d * (1 - Math.exp(-k * dt));
}
export const rand = (a, b) => a + Math.random() * (b - a);

// Seeded random for deterministic world layout
let _seed = 1337;
export function srand() { _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; }
export const srange = (a, b) => a + srand() * (b - a);

/* ---------------- terrain height ---------------- */
function gauss(x, z, cx, cz, r, h) { const d2 = (x - cx) ** 2 + (z - cz) ** 2; return h * Math.exp(-d2 / (r * r)); }
export const POND = { x: 30, z: 22, r: 9.5 };
export const WATER_Y = -0.45;
export function terrainHeight(x, z) {
  const r = Math.hypot(x, z);
  let h = 0.55 * Math.sin(x * 0.07 + 1.3) * Math.cos(z * 0.06) + 0.3 * Math.sin(x * 0.13 - z * 0.11);
  h *= smooth(9, 24, r);                              // flat village square
  h += gauss(x, z, 0, -64, 17, 6.0);                  // castle hill
  h += gauss(x, z, 42, -38, 9, 3.4);                  // watchtower hill
  h += gauss(x, z, -52, -54, 13, 1.4);                // garden plateau
  h += gauss(x, z, -26, 30, 10, 1.6);                 // soft hill SW
  // pond bowl
  const dp = Math.hypot(x - POND.x, z - POND.z);
  h -= 2.0 * (1 - smooth(POND.r - 4, POND.r + 1.5, dp));
  // world rim hills
  h += Math.pow(smooth(80, 104, r), 1.6) * 22;
  return h;
}

/* ---------------- solids ----------------
   {kind:'circle', x,z,r, y0,y1}  or  {kind:'box', x,z,hw,hd,rot, y0,y1}
   Anything whose top is within a step of the feet becomes walkable ground. */
export function addCircle(x, z, r, y1 = 50, y0 = -50, opts = {}) {
  const s = { kind: 'circle', x, z, r, y0, y1, ...opts }; G.solids.push(s); return s;
}
export function addBox(x, z, hw, hd, rot = 0, y1 = 50, y0 = -50, opts = {}) {
  const s = { kind: 'box', x, z, hw, hd, rot, c: Math.cos(rot), s: Math.sin(rot), y0, y1, ...opts }; G.solids.push(s); return s;
}
function inside(s, x, z, pad = 0) {
  if (s.disabled) return false;
  if (s.kind === 'circle') return (x - s.x) ** 2 + (z - s.z) ** 2 < (s.r + pad) ** 2;
  const dx = x - s.x, dz = z - s.z;
  const lx = dx * s.c - dz * s.s, lz = dx * s.s + dz * s.c;
  return Math.abs(lx) < s.hw + pad && Math.abs(lz) < s.hd + pad;
}
const STEP = 0.45;
export function groundAt(x, z, feetY = 1e9) {
  if (G.inRoom) return G.world?.roomFloor ?? 0;
  let g = terrainHeight(x, z);
  for (const s of G.solids) {
    if (s.walk === false || s.ghost || s.y1 > feetY + STEP || s.y1 <= g) continue;
    if (inside(s, x, z)) g = s.y1;
  }
  return g;
}
export function isWater(x, z) {
  if (G.inRoom) return false;
  return terrainHeight(x, z) < WATER_Y - 0.25 && groundAt(x, z) < WATER_Y;
}
// push a circle (x,z,radius) out of solids that block at this height
export function resolve(pos, radius, feetY, height = 1.6) {
  for (const s of G.solids) {
    if (s.disabled || s.ghost) continue;
    if (s.y1 <= feetY + STEP || s.y0 >= feetY + height) continue;
    if (G.inRoom !== !!s.room) continue;
    if (s.kind === 'circle') {
      const dx = pos.x - s.x, dz = pos.z - s.z, d = Math.hypot(dx, dz), m = s.r + radius;
      if (d < m && d > 1e-5) { pos.x = s.x + dx / d * m; pos.z = s.z + dz / d * m; }
    } else {
      const dx = pos.x - s.x, dz = pos.z - s.z;
      let lx = dx * s.c - dz * s.s, lz = dx * s.s + dz * s.c;
      const ex = s.hw + radius, ez = s.hd + radius;
      if (Math.abs(lx) < ex && Math.abs(lz) < ez) {
        const px = ex - Math.abs(lx), pz = ez - Math.abs(lz);
        if (px < pz) lx = Math.sign(lx || 1) * ex; else lz = Math.sign(lz || 1) * ez;
        pos.x = s.x + lx * s.c + lz * s.s; pos.z = s.z - lx * s.s + lz * s.c;
      }
    }
  }
}
// used by camera: is point blocked?
export function pointBlocked(p) {
  if (!G.inRoom && p.y < terrainHeight(p.x, p.z) + 0.25) return true;
  for (const s of G.solids) {
    if (s.disabled || (s.ghost && !s.camOnly) || s.noCam) continue;
    if (G.inRoom !== !!s.room) continue;
    if (p.y > s.y1 + 0.2 || p.y < s.y0) continue;
    if (inside(s, p.x, p.z, 0.25)) return true;
  }
  return false;
}

export const tmpV = new THREE.Vector3();
