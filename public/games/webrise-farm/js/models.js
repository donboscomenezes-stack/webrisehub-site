// Procedural cartoon models. Everything is built from primitives, merged into one geometry
// per model with vertex colours, so the whole farm renders with very few materials.
import * as THREE from 'three';
import { mergeGeometries } from './lib/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from './lib/RoundedBoxGeometry.js';

export const MAT = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0 });
export const GLOW_MAT = new THREE.MeshStandardMaterial({ color: 0xfff1c2, emissive: 0xffc861, emissiveIntensity: 0.15, roughness: 0.4 });
export const WATER_MAT = new THREE.MeshStandardMaterial({ color: 0x5cc8ef, roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.88 });

/* ---------------- builder ---------------- */
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _c = new THREE.Color();
export class B {
  constructor() { this.parts = []; }
  add(geo, color, t = {}) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && !(color === null && k === 'color')) g.deleteAttribute(k);
    _e.set(t.rx || 0, t.ry || 0, t.rz || 0, 'YXZ'); _q.setFromEuler(_e);
    const s = t.s ?? 1; _s.set(t.sx ?? s, t.sy ?? s, t.sz ?? s);
    _p.set(t.x || 0, t.y || 0, t.z || 0); _m.compose(_p, _q, _s);
    g.applyMatrix4(_m);
    if (color !== null) {
      _c.set(color); const n = g.attributes.position.count, a = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { a[i * 3] = _c.r; a[i * 3 + 1] = _c.g; a[i * 3 + 2] = _c.b; }
      g.setAttribute('color', new THREE.BufferAttribute(a, 3));
    }
    this.parts.push(g); return this;
  }
  // bake a soft ground-contact darkening (cheap fake ambient occlusion)
  geo(ao = 0.28) {
    const g = mergeGeometries(this.parts);
    if (ao > 0) {
      g.computeBoundingBox();
      const { min, max } = g.boundingBox, h = Math.max(0.001, max.y - min.y);
      const p = g.attributes.position, c = g.attributes.color;
      for (let i = 0; i < p.count; i++) { const t = Math.min(1, (p.getY(i) - min.y) / Math.min(h, 1.6)); const k = 1 - ao + ao * Math.sqrt(t); c.setXYZ(i, c.getX(i) * k, c.getY(i) * k, c.getZ(i) * k); }
    }
    g.computeBoundingSphere();
    return g;
  }
  mesh(ao, mat = MAT) { const m = new THREE.Mesh(this.geo(ao), mat); m.castShadow = true; m.receiveShadow = true; return m; }
}
export const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
export const rbox = (w, h, d, r = 0.08) => new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
export const cyl = (rt, rb, h, seg = 12) => new THREE.CylinderGeometry(rt, rb, h, seg);
export const sph = (r, ws = 12, hs = 9) => new THREE.SphereGeometry(r, ws, hs);
export const cone = (r, h, seg = 10) => new THREE.ConeGeometry(r, h, seg);
export const ico = (r, d = 1) => new THREE.IcosahedronGeometry(r, d);
export const tor = (r, t, rs = 8, ts = 20, arc = Math.PI * 2) => new THREE.TorusGeometry(r, t, rs, ts, arc);

function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const cache = new Map();
const cached = (k, fn) => { if (!cache.has(k)) cache.set(k, fn()); return cache.get(k); };
const shadowed = (o) => { o.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

/* ---------------- soil ---------------- */
export function soilGeo(wet) {
  return cached('soil' + wet, () => {
    const b = new B();
    const base = wet ? 0x6b4026 : 0x9a6236, ridge = wet ? 0x7a4a2c : 0xae7143;
    b.add(rbox(1.86, 0.26, 1.86, 0.1), base, { y: 0.1 });
    for (let i = 0; i < 4; i++) b.add(rbox(1.62, 0.12, 0.26, 0.06), ridge, { y: 0.24, z: -0.6 + i * 0.4 });
    return b.geo(0.15);
  });
}

/* ---------------- crops ---------------- */
const GREEN = 0x5dbb3f, DGREEN = 0x3f9a32, LGREEN = 0x8fd65a;
function grid(n, span = 1.4) { const pts = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) pts.push([(i + 0.5) / n * span - span / 2, (j + 0.5) / n * span - span / 2]); return pts; }
export function cropGeo(id, stage) {
  return cached(`crop-${id}-${stage}`, () => {
    const b = new B(), r = rng(id.length * 131 + stage * 7);
    const Y = 0.28;
    if (stage === 0) {   // sprouts
      for (const [x, z] of grid(3, 1.2)) {
        b.add(sph(0.07, 6, 4), LGREEN, { x: x - 0.05, y: Y + 0.07, z, sx: 1.5, sy: 0.5, rz: 0.5 });
        b.add(sph(0.07, 6, 4), LGREEN, { x: x + 0.05, y: Y + 0.07, z, sx: 1.5, sy: 0.5, rz: -0.5 });
        b.add(cyl(0.015, 0.015, 0.1, 4), GREEN, { x, y: Y + 0.03, z });
      }
      return b.geo(0.2);
    }
    const k = stage === 1 ? 0.45 : stage === 2 ? 0.75 : 1;
    const ripe = stage === 3;
    const jit = () => (r() - 0.5) * 0.12;
    switch (id) {
      case 'wheat': for (const [x, z] of grid(4, 1.45)) {
        const h = (0.75 + r() * 0.2) * k, px = x + jit(), pz = z + jit();
        const stalk = ripe ? 0xd9b04a : stage === 2 ? 0x9cc94c : GREEN;
        b.add(cyl(0.018, 0.025, h, 4), stalk, { x: px, y: Y + h / 2, z: pz, rz: jit() });
        if (stage >= 2) b.add(sph(0.06, 6, 5), ripe ? 0xf2c552 : 0xc6d86a, { x: px, y: Y + h + 0.08, z: pz, sy: 3, sx: 0.9 });
        b.add(sph(0.05, 5, 3), stalk, { x: px + 0.04, y: Y + h * 0.4, z: pz, sx: 0.4, sy: 2.4, rz: -0.6 });
      } break;
      case 'carrot': for (const [x, z] of grid(3, 1.3)) {
        for (let i = 0; i < 4; i++) { const a = i * 1.6 + r(); b.add(cone(0.05, 0.42 * k, 4), i % 2 ? GREEN : LGREEN, { x: x + Math.cos(a) * 0.05, y: Y + 0.2 * k, z: z + Math.sin(a) * 0.05, rx: Math.sin(a) * 0.4, rz: Math.cos(a) * 0.4 }); }
        if (ripe) b.add(cone(0.1, 0.25, 8), 0xf07a22, { x, y: Y + 0.02, z, rx: Math.PI });
      } break;
      case 'cabbage': for (const [x, z] of grid(2, 1.1)) {
        b.add(sph(0.26 * k, 10, 8), ripe ? 0xa8e07a : LGREEN, { x, y: Y + 0.2 * k, z, sy: 0.85 });
        for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; b.add(sph(0.2 * k, 8, 6), DGREEN + (i % 2) * 0x080808, { x: x + Math.cos(a) * 0.22 * k, y: Y + 0.1 * k, z: z + Math.sin(a) * 0.22 * k, sx: 1.2, sy: 0.45, ry: -a }); }
      } break;
      case 'corn': for (const [x, z] of grid(3, 1.3)) {
        const h = 1.55 * k, px = x + jit(), pz = z + jit();
        b.add(cyl(0.04, 0.06, h, 6), stage === 3 ? 0x7cb342 : GREEN, { x: px, y: Y + h / 2, z: pz });
        for (let i = 0; i < 3; i++) { const a = i * 2.1 + r(); b.add(sph(0.08, 6, 4), i % 2 ? GREEN : DGREEN, { x: px + Math.cos(a) * 0.15, y: Y + h * (0.35 + i * 0.2), z: pz + Math.sin(a) * 0.15, sx: 3, sy: 0.25, sz: 0.8, ry: -a, rz: 0.4 }); }
        if (stage >= 2) b.add(sph(0.06, 6, 4), 0xe8d26a, { x: px, y: Y + h + 0.06, z: pz, sy: 1.8 });
        if (ripe) { b.add(new THREE.CapsuleGeometry(0.07, 0.22, 3, 8), 0xffd23f, { x: px + 0.09, y: Y + h * 0.62, z: pz, rz: -0.35 }); b.add(sph(0.075, 6, 4), 0x9ccc65, { x: px + 0.07, y: Y + h * 0.55, z: pz, sy: 2.2, rz: -0.35 }); }
      } break;
      case 'sunflower': for (const [x, z] of grid(2, 1.1)) {
        const h = 1.45 * k;
        b.add(cyl(0.035, 0.05, h, 6), GREEN, { x, y: Y + h / 2, z });
        b.add(sph(0.1, 6, 4), DGREEN, { x: x + 0.12, y: Y + h * 0.45, z, sx: 2.2, sy: 0.3, rz: 0.4 });
        b.add(sph(0.1, 6, 4), DGREEN, { x: x - 0.12, y: Y + h * 0.6, z, sx: 2.2, sy: 0.3, rz: -0.4 });
        if (stage === 2) b.add(sph(0.1, 8, 6), 0x7cb342, { x, y: Y + h + 0.05, z });
        if (ripe) {
          const fy = Y + h + 0.05;
          b.add(cyl(0.16, 0.16, 0.08, 14), 0x6d4c25, { x, y: fy, z: z + 0.05, rx: Math.PI / 2 - 0.35 });
          for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; b.add(sph(0.08, 6, 4), 0xffcc1f, { x: x + Math.cos(a) * 0.24, y: fy + Math.sin(a) * 0.24 * 0.94, z: z + 0.01 - Math.sin(a) * 0.08, sx: 1.8, sy: 0.8, sz: 0.4, rz: a, rx: -0.35 }); }
        }
      } break;
      case 'tomato': for (const [x, z] of grid(2, 1.1)) {
        const h = 0.9 * k;
        b.add(cyl(0.02, 0.02, h + 0.2, 4), 0xb08a5a, { x: x + 0.12, y: Y + (h + 0.2) / 2, z });
        for (let i = 0; i < 4; i++) b.add(ico(0.2 * k, 1), i % 2 ? GREEN : DGREEN, { x: x + (r() - 0.5) * 0.2, y: Y + h * (0.35 + i * 0.18), z: z + (r() - 0.5) * 0.2 });
        if (stage >= 2) for (let i = 0; i < 5; i++) { const a = i * 1.3 + r(); b.add(sph(0.075, 8, 6), ripe ? 0xe8332a : 0x9ccc65, { x: x + Math.cos(a) * 0.17 * k, y: Y + h * (0.35 + r() * 0.5), z: z + Math.sin(a) * 0.17 * k }); }
      } break;
      case 'strawberry': for (const [x, z] of grid(3, 1.3)) {
        for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + r(); b.add(sph(0.1 * k, 6, 4), i % 2 ? GREEN : DGREEN, { x: x + Math.cos(a) * 0.1 * k, y: Y + 0.08 * k, z: z + Math.sin(a) * 0.1 * k, sx: 1.3, sy: 0.4, ry: -a }); }
        if (stage === 2) b.add(sph(0.04, 6, 4), 0xffffff, { x, y: Y + 0.14, z });
        if (ripe) for (let i = 0; i < 2; i++) { const a = i * 3 + r(); b.add(cone(0.065, 0.14, 8), 0xf03a4a, { x: x + Math.cos(a) * 0.14, y: Y + 0.08, z: z + Math.sin(a) * 0.14, rx: Math.PI }); }
      } break;
      case 'pumpkin': {
        for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; b.add(sph(0.22 * k, 8, 5), i % 2 ? GREEN : DGREEN, { x: Math.cos(a) * 0.5, y: Y + 0.05, z: Math.sin(a) * 0.5, sx: 1.4, sy: 0.3, ry: -a }); }
        b.add(tor(0.35, 0.025, 4, 16), DGREEN, { y: Y + 0.03, rx: Math.PI / 2 });
        if (stage >= 2) {
          const s = ripe ? 0.42 : 0.22, col = ripe ? 0xf28a1e : 0x9ccc65;
          for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; b.add(sph(s * 0.6, 10, 8), col, { x: Math.cos(a) * s * 0.35, y: Y + s * 0.62, z: Math.sin(a) * s * 0.35, sy: 1.05 }); }
          b.add(cyl(0.035, 0.05, 0.16, 6), 0x6d8a3a, { y: Y + s * 1.25, rz: 0.2 });
        }
      } break;
    }
    return b.geo(0.32);
  });
}

/* ---------------- trees & nature ---------------- */
export function treeMesh(type = 'oak', seed = 1) {
  const r = rng(seed * 997);
  const b = new B();
  const trunk = 0x8a5a36;
  if (type === 'pine') {
    b.add(cyl(0.18, 0.26, 1.2, 7), trunk, { y: 0.6 });
    const g = 0x2e8b57 + Math.floor(r() * 3) * 0x020602;
    b.add(cone(1.3, 1.8, 8), g, { y: 1.8 }); b.add(cone(1.0, 1.5, 8), g + 0x0a0a04, { y: 2.6 }); b.add(cone(0.65, 1.2, 8), g + 0x141408, { y: 3.3 });
    return b.mesh(0.35);
  }
  const leaf = type === 'blossom' ? [0xffb3cf, 0xffc8dc, 0xff9ec2] : type === 'orangetree' ? [0x4caf50, 0x43a047, 0x66bb6a] : [0x6cc24a, 0x5cb83c, 0x7fd05a];
  b.add(cyl(0.2, 0.3, 1.6, 8), trunk, { y: 0.8 });
  b.add(cyl(0.07, 0.1, 0.8, 5), trunk, { x: 0.3, y: 1.4, rz: -0.7 });
  const blobs = [[0, 2.3, 0, 1.15], [0.65, 2.0, 0.25, 0.8], [-0.6, 2.05, -0.2, 0.85], [0.1, 2.9, -0.15, 0.8], [-0.2, 2.2, 0.6, 0.75]];
  blobs.forEach(([x, y, z, s], i) => b.add(ico(s, 1), leaf[i % 3], { x, y, z }));
  const m = b.mesh(0.3);
  const g = new THREE.Group(); g.add(m);
  if (type === 'appletree' || type === 'orangetree') {
    const fb = new B(), col = type === 'appletree' ? 0xe53935 : 0xff9800;
    for (let i = 0; i < 9; i++) { const a = i * 2.39, bl = blobs[i % blobs.length]; fb.add(sph(0.13, 8, 6), col, { x: bl[0] + Math.cos(a) * bl[3] * 0.9, y: bl[1] + (r() - 0.4) * bl[3], z: bl[2] + Math.sin(a) * bl[3] * 0.9 }); }
    const fruit = fb.mesh(0); g.add(fruit); g.userData.fruit = fruit;
  }
  return shadowed(g);
}
export function bushMesh(seed = 1, color = 0x5cb83c) {
  const r = rng(seed), b = new B();
  for (let i = 0; i < 4; i++) b.add(ico(0.45 + r() * 0.2, 1), color + (i % 2) * 0x0a0a04, { x: (r() - 0.5) * 0.7, y: 0.35 + r() * 0.15, z: (r() - 0.5) * 0.7 });
  if (r() < 0.5) for (let i = 0; i < 5; i++) b.add(sph(0.07, 6, 4), [0xffffff, 0xff6f91, 0xffd54f][i % 3], { x: (r() - 0.5) * 0.9, y: 0.6 + r() * 0.2, z: (r() - 0.5) * 0.9 });
  return b.mesh(0.3);
}
export function rockMesh(seed = 1, s = 1) {
  const r = rng(seed), b = new B();
  b.add(ico(0.55 * s, 0), 0xa9a49c, { y: 0.25 * s, sy: 0.65, ry: r() * 6 });
  b.add(ico(0.32 * s, 0), 0xbdb7ae, { x: 0.45 * s, y: 0.15 * s, z: 0.2, sy: 0.7, ry: r() * 6 });
  return b.mesh(0.25);
}
export function stumpMesh() {
  const b = new B();
  b.add(cyl(0.38, 0.48, 0.5, 10), 0x8a5a36, { y: 0.25 });
  b.add(cyl(0.36, 0.36, 0.04, 10), 0xd9b27a, { y: 0.51 });
  b.add(cyl(0.1, 0.16, 0.4, 5), 0x8a5a36, { x: 0.45, y: 0.1, rz: 1.2 });
  return b.mesh(0.2);
}
export function grassTuftGeo() {
  return cached('tuft', () => { const b = new B(); for (let i = 0; i < 5; i++) b.add(cone(0.05, 0.4, 3), i % 2 ? 0x6cc24a : 0x58ad3a, { x: (i - 2) * 0.05, y: 0.18, z: (i % 2) * 0.05, rz: (i - 2) * 0.2 }); return b.geo(0.3); });
}
export function flowerGeo(color) {
  return cached('flower' + color, () => { const b = new B(); b.add(cyl(0.012, 0.012, 0.3, 3), 0x4f9a3f, { y: 0.15 }); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; b.add(sph(0.05, 5, 3), color, { x: Math.cos(a) * 0.06, y: 0.31, z: Math.sin(a) * 0.06, sy: 0.4 }); } b.add(sph(0.035, 5, 3), 0xffe066, { y: 0.32 }); return b.geo(0); });
}
export function cloudMesh(seed) {
  const r = rng(seed), b = new B();
  const n = 4 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) b.add(ico(1.4 + r() * 1.2, 1), 0xffffff, { x: i * 1.8 - n * 0.9, y: r() * 0.8, z: (r() - 0.5) * 1.5, sy: 0.7 });
  const m = new THREE.Mesh(b.geo(0), new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0xffffff, emissiveIntensity: 0.35, transparent: true, opacity: 0.95 }));
  return m;
}

/* ---------------- buildings ---------------- */
function prism(shapePts, depth) {
  const s = new THREE.Shape(); shapePts.forEach(([x, y], i) => i ? s.lineTo(x, y) : s.moveTo(x, y)); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false }); g.translate(0, 0, -depth / 2); return g;
}
function slab(b, x0, y0, x1, y1, depth, thick, color, z = 0) {   // a roof panel between two profile points
  const len = Math.hypot(x1 - x0, y1 - y0), a = Math.atan2(y1 - y0, x1 - x0);
  const nx = -Math.sin(a) * thick / 2, ny = Math.cos(a) * thick / 2;
  b.add(box(len + 0.25, thick, depth), color, { x: (x0 + x1) / 2 + nx, y: (y0 + y1) / 2 + ny, z, rz: a });
}
function windowAt(b, x, y, z, w = 0.7, h = 0.8, frame = 0xffffff, glass = 0x8fd3ff, ry = 0) {
  const c = Math.cos(ry), s = Math.sin(ry);
  const P = (dx, dz) => ({ x: x + dx * c + dz * s, z: z - dx * s + dz * c });
  b.add(box(w + 0.16, h + 0.16, 0.08), frame, { ...P(0, 0), y, ry });
  b.add(box(w, h, 0.1), glass, { ...P(0, 0.01), y, ry });
  b.add(box(0.06, h, 0.12), frame, { ...P(0, 0.02), y, ry });
  b.add(box(w, 0.06, 0.12), frame, { ...P(0, 0.02), y, ry });
}
export function barnMesh() {
  const b = new B(), w = 3.6, h = 3.4, d = 6;
  const red = 0xd9443a, white = 0xfbf6ee, roof = 0x8a4b38;
  const prof = [[-w, 0], [w, 0], [w, h], [w * 0.6, h + 1.7], [0, h + 2.4], [-w * 0.6, h + 1.7], [-w, h]];
  b.add(prism(prof, d), red);
  // roof panels
  slab(b, w, h, w * 0.6, h + 1.7, d + 0.5, 0.28, roof); slab(b, w * 0.6, h + 1.7, 0, h + 2.4, d + 0.5, 0.28, roof);
  slab(b, -w * 0.6, h + 1.7, -w, h, d + 0.5, 0.28, roof); slab(b, 0, h + 2.4, -w * 0.6, h + 1.7, d + 0.5, 0.28, roof);
  // white trim on the gable fronts
  for (const zf of [d / 2 + 0.03, -d / 2 - 0.03]) {
    for (let i = 0; i < prof.length; i++) { const [x0, y0] = prof[i], [x1, y1] = prof[(i + 1) % prof.length]; if (i === 0) continue; const len = Math.hypot(x1 - x0, y1 - y0); b.add(box(len + 0.18, 0.18, 0.08), white, { x: (x0 + x1) / 2, y: (y0 + y1) / 2, z: zf, rz: Math.atan2(y1 - y0, x1 - x0) }); }
  }
  // big door with X braces
  const dz = d / 2 + 0.06;
  b.add(box(2.6, 2.6, 0.06), 0xb8352d, { y: 1.3, z: dz });
  for (const [x0, y0, x1, y1] of [[-1.3, 0, -1.3, 2.6], [1.3, 0, 1.3, 2.6], [-1.3, 2.6, 1.3, 2.6], [0, 0, 0, 2.6]]) { const len = Math.hypot(x1 - x0, y1 - y0); b.add(box(0.2, len + 0.2, 0.1), white, { x: (x0 + x1) / 2, y: (y0 + y1) / 2, z: dz + 0.02, rz: Math.atan2(x1 - x0, y1 - y0) * -1 }); }
  for (const sx of [-0.65, 0.65]) { const len = Math.hypot(1.3, 2.6); b.add(box(0.16, len, 0.1), white, { x: sx, y: 1.3, z: dz + 0.03, rz: Math.atan2(1.3, 2.6) }); b.add(box(0.16, len, 0.1), white, { x: sx, y: 1.3, z: dz + 0.03, rz: -Math.atan2(1.3, 2.6) }); }
  // hayloft
  b.add(box(1.2, 1.0, 0.06), 0x6b3a2a, { y: h + 0.8, z: dz });
  b.add(box(1.4, 0.14, 0.1), white, { y: h + 1.35, z: dz + 0.02 }); b.add(box(1.4, 0.14, 0.1), white, { y: h + 0.25, z: dz + 0.02 });
  b.add(box(0.14, 1.2, 0.1), white, { x: -0.7, y: h + 0.8, z: dz + 0.02 }); b.add(box(0.14, 1.2, 0.1), white, { x: 0.7, y: h + 0.8, z: dz + 0.02 });
  b.add(cyl(0.6, 0.6, 0.18, 10), 0xf2c552, { y: h + 0.75, z: dz - 0.02, rx: Math.PI / 2 }); // hay peeking
  // side windows
  windowAt(b, w + 0.04, 2.1, -1.2, 0.8, 0.8, white, 0xf6d48b, Math.PI / 2); windowAt(b, w + 0.04, 2.1, 1.2, 0.8, 0.8, white, 0xf6d48b, Math.PI / 2);
  windowAt(b, -w - 0.04, 2.1, 0, 0.8, 0.8, white, 0xf6d48b, -Math.PI / 2);
  // foundation
  b.add(box(2 * w + 0.3, 0.3, d + 0.3), 0xbdb3a6, { y: 0.1 });
  // ramp
  b.add(box(2.8, 0.2, 1.2), 0xb88b5c, { y: 0.1, z: d / 2 + 0.7, rx: 0.12 });
  return b.mesh(0.2);
}
export function houseMesh() {
  const b = new B();
  const wall = 0xfff3dc, roof = 0x5c8ed6, trim = 0xffffff, wood = 0xa8744a;
  b.add(rbox(5.2, 3.0, 4.2, 0.1), wall, { y: 1.6 });
  b.add(box(5.5, 0.35, 4.5), 0xc8beb0, { y: 0.15 });
  const roofP = [[-3.0, 0], [3.0, 0], [0, 2.1]];
  b.add(prism([[-2.6, 0], [2.6, 0], [0, 1.8]], 4.2), wall, { y: 3.1 });
  slab(b, 3.05, 3.0, 0, 5.05, 5.0, 0.3, roof); slab(b, 0, 5.05, -3.05, 3.0, 5.0, 0.3, roof);
  // chimney
  b.add(rbox(0.6, 1.4, 0.6, 0.05), 0xc0705a, { x: 1.4, y: 4.6, z: -0.8 });
  b.add(box(0.75, 0.15, 0.75), 0xa85a46, { x: 1.4, y: 5.35, z: -0.8 });
  // door + porch
  b.add(rbox(1.0, 1.9, 0.12, 0.04), 0x8c5a3c, { y: 1.25, z: 2.12 });
  b.add(sph(0.06, 6, 4), 0xffd54f, { x: 0.35, y: 1.25, z: 2.2 });
  b.add(box(2.6, 0.18, 1.3), wood, { y: 0.35, z: 2.75 });
  b.add(box(2.8, 0.12, 1.5), roof, { y: 2.55, z: 2.8, rx: 0.12 });
  for (const sx of [-1.2, 1.2]) b.add(cyl(0.07, 0.07, 2.2, 6), trim, { x: sx, y: 1.45, z: 3.35 });
  windowAt(b, -1.6, 1.8, 2.12, 0.9, 0.9, trim); windowAt(b, 1.6, 1.8, 2.12, 0.9, 0.9, trim);
  windowAt(b, 0, 3.9, 2.12, 0.6, 0.6, trim);
  // flower boxes
  for (const sx of [-1.6, 1.6]) { b.add(box(1.1, 0.22, 0.25), wood, { x: sx, y: 1.25, z: 2.3 }); for (let i = 0; i < 5; i++) b.add(sph(0.08, 6, 4), [0xff6f91, 0xffd54f, 0xffffff][i % 3], { x: sx - 0.4 + i * 0.2, y: 1.42, z: 2.32 }); }
  return b.mesh(0.2);
}
export function kitchenMesh() {
  const b = new B();
  const wall = 0xffe2a8, roof = 0xe8734f, trim = 0xffffff;
  b.add(rbox(4.2, 2.6, 3.4, 0.1), wall, { y: 1.4 });
  b.add(box(4.5, 0.3, 3.7), 0xc8beb0, { y: 0.12 });
  slab(b, 2.5, 2.7, 0, 4.2, 4.0, 0.28, roof); slab(b, 0, 4.2, -2.5, 2.7, 4.0, 0.28, roof);
  b.add(prism([[-2.1, 0], [2.1, 0], [0, 1.35]], 3.4), wall, { y: 2.7 });
  b.add(cyl(0.3, 0.35, 1.3, 8), 0x9e9e9e, { x: -1.2, y: 4.1, z: -0.4 });
  // striped awning
  for (let i = 0; i < 8; i++) b.add(box(0.5, 0.08, 1.1), i % 2 ? 0xffffff : 0xe8473f, { x: -1.75 + i * 0.5, y: 2.35, z: 2.15, rx: 0.4 });
  b.add(rbox(1.0, 1.7, 0.1, 0.04), 0x8c5a3c, { x: -0.9, y: 1.1, z: 1.72 });
  windowAt(b, 0.9, 1.5, 1.72, 1.2, 0.9, trim, 0xfff1c2);
  b.add(box(1.8, 0.5, 0.08), 0x8c5a3c, { y: 3.1, z: 1.75 });   // sign board
  b.add(sph(0.18, 8, 6), 0xd99a4a, { x: -0.4, y: 3.1, z: 1.82, sx: 1.6, sy: 0.9 }); // bread
  b.add(sph(0.16, 8, 6), 0xfff3e0, { x: 0.35, y: 3.1, z: 1.82 });
  return b.mesh(0.2);
}
export function coopMesh() {
  const b = new B();
  const wood = 0xd06a3a, roof = 0x8a4b38, trim = 0xfbf6ee;
  for (const sx of [-0.9, 0.9]) for (const sz of [-0.7, 0.7]) b.add(cyl(0.08, 0.08, 0.6, 6), 0x8a5a36, { x: sx, y: 0.3, z: sz });
  b.add(rbox(2.2, 1.5, 1.8, 0.08), wood, { y: 1.35 });
  b.add(prism([[-1.1, 0], [1.1, 0], [0, 0.9]], 1.8), wood, { y: 2.1 });
  slab(b, 1.35, 2.0, 0, 3.05, 2.2, 0.16, roof); slab(b, 0, 3.05, -1.35, 2.0, 2.2, 0.16, roof);
  b.add(rbox(0.6, 0.7, 0.06, 0.03), 0x5a3626, { y: 1.15, z: 0.92 });
  b.add(box(0.5, 0.06, 1.3), 0xb88b5c, { y: 0.4, z: 1.45, rx: 0.55 });
  for (let i = 0; i < 4; i++) b.add(box(0.5, 0.04, 0.05), 0x8a5a36, { y: 0.32 + i * 0.12, z: 1.0 + i * 0.27 });
  windowAt(b, -0.7, 1.6, 0.92, 0.35, 0.35, trim, 0xffe08a);
  return b.mesh(0.2);
}
export function windmill() {
  const g = new THREE.Group();
  const b = new B();
  b.add(cyl(1.0, 1.6, 5.5, 8), 0xfff3dc, { y: 2.75 });
  b.add(cone(1.4, 1.6, 8), 0xd9443a, { y: 6.3 });
  b.add(rbox(0.8, 1.3, 0.1, 0.04), 0x8c5a3c, { y: 0.75, z: 1.45, rx: -0.1 });
  windowAt(b, 0, 3.4, 1.18, 0.45, 0.5, 0xffffff, 0x8fd3ff);
  b.add(cyl(0.18, 0.18, 0.6, 8), 0x6d4c41, { y: 5.4, z: 1.2, rx: Math.PI / 2 });
  const body = b.mesh(0.2); g.add(body);
  const blades = new THREE.Group(); blades.position.set(0, 5.4, 1.55);
  const bb = new B();
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
    bb.add(box(0.14, 3.0, 0.08), 0x8a5a36, { x: -s * 1.5, y: c * 1.5, rz: a });
    bb.add(box(0.75, 2.4, 0.04), 0xfffaf0, { x: -s * 1.75 + c * 0.42, y: c * 1.75 + s * 0.42, z: 0.05, rz: a });
  }
  bb.add(sph(0.25, 8, 6), 0xd9443a);
  blades.add(bb.mesh(0)); g.add(blades); g.userData.blades = blades;
  return shadowed(g);
}
export function stallMesh() {
  const b = new B();
  const wood = 0xc98b58;
  b.add(rbox(3, 1.0, 1.2, 0.06), wood, { y: 0.5 });
  for (const sx of [-1.4, 1.4]) for (const sz of [-0.5, 0.5]) b.add(cyl(0.06, 0.06, 2.4, 6), 0x8a5a36, { x: sx, y: 1.2, z: sz });
  for (let i = 0; i < 6; i++) b.add(box(0.53, 0.08, 1.6), i % 2 ? 0xffffff : 0x4caf50, { x: -1.32 + i * 0.53, y: 2.45, z: 0.1, rx: 0.25 });
  const goods = [[0xf07a22, -1], [0xe53935, -0.35], [0xffd23f, 0.3], [0x8bc34a, 0.95]];
  for (const [c, x] of goods) { b.add(rbox(0.55, 0.25, 0.5, 0.04), 0xa8744a, { x, y: 1.12, z: 0.15 }); for (let i = 0; i < 4; i++) b.add(sph(0.1, 6, 4), c, { x: x - 0.12 + (i % 2) * 0.24, y: 1.3, z: 0.05 + Math.floor(i / 2) * 0.2 }); }
  return b.mesh(0.2);
}
export function boardMesh() {
  const b = new B();
  for (const sx of [-1.0, 1.0]) b.add(cyl(0.08, 0.1, 2.4, 6), 0x8a5a36, { x: sx, y: 1.2 });
  b.add(rbox(2.4, 1.5, 0.14, 0.05), 0xc98b58, { y: 1.6 });
  b.add(box(2.6, 0.18, 0.3), 0x8a4b38, { y: 2.45 });
  const notes = [[-0.65, 1.75, 0xfffbe6, 0.1], [0.05, 1.6, 0xffe0ec, -0.08], [0.7, 1.8, 0xe3f6ff, 0.12]];
  for (const [x, y, c, r] of notes) { b.add(box(0.55, 0.65, 0.04), c, { x, y, z: 0.09, rz: r }); b.add(sph(0.05, 6, 4), 0xe53935, { x, y: y + 0.27, z: 0.13 }); }
  return b.mesh(0.2);
}
export function truck() {
  const g = new THREE.Group(), b = new B();
  const body = 0x5bb7e8;
  b.add(rbox(1.8, 0.7, 4.0, 0.15), body, { y: 0.75 });
  b.add(rbox(1.7, 0.9, 1.5, 0.2), body, { y: 1.45, z: 0.95 });
  b.add(box(1.5, 0.55, 0.05), 0xbfe8ff, { y: 1.55, z: 1.72 });
  b.add(box(1.72, 0.08, 1.9), 0x3d8bb5, { y: 1.12, z: -1.0 });
  for (const sx of [-0.86, 0.86]) b.add(box(0.08, 0.45, 1.9), body, { x: sx, y: 1.32, z: -1.0 });
  b.add(box(1.72, 0.45, 0.08), body, { y: 1.32, z: -1.98 });
  for (const sx of [-0.6, 0.6]) b.add(sph(0.12, 8, 6), 0xfff6c4, { x: sx, y: 0.85, z: 2.0, sz: 0.5 });
  // crates in the bed
  b.add(rbox(0.6, 0.45, 0.6, 0.04), 0xc98b58, { x: -0.35, y: 1.38, z: -0.7 }); b.add(rbox(0.6, 0.45, 0.6, 0.04), 0xc98b58, { x: 0.35, y: 1.38, z: -1.4 });
  g.add(b.mesh(0.15));
  const wb = new B();
  for (const sx of [-0.9, 0.9]) for (const sz of [-1.3, 1.3]) { wb.add(cyl(0.38, 0.38, 0.3, 14), 0x37323f, { x: sx, y: 0.38, z: sz, rz: Math.PI / 2 }); wb.add(cyl(0.18, 0.18, 0.32, 10), 0xd0d0d0, { x: sx, y: 0.38, z: sz, rz: Math.PI / 2 }); }
  g.add(wb.mesh(0));
  return shadowed(g);
}
export function fenceGeo(len = 2, color = 0xfbf6ee) {
  return cached(`fence${len}${color}`, () => {
    const b = new B(), n = Math.max(1, Math.round(len / 1));
    for (let i = 0; i <= n; i++) b.add(rbox(0.14, 0.9, 0.14, 0.03), color, { x: -len / 2 + i * len / n, y: 0.45 });
    for (const y of [0.35, 0.7]) b.add(rbox(len + 0.1, 0.1, 0.07, 0.03), color, { y });
    return b.geo(0.2);
  });
}
export function troughMesh() {
  const b = new B();
  b.add(rbox(1.4, 0.4, 0.6, 0.06), 0x8a5a36, { y: 0.25 });
  b.add(box(1.2, 0.08, 0.42), 0xf2c552, { y: 0.44 });
  for (const sx of [-0.55, 0.55]) b.add(box(0.1, 0.3, 0.5), 0x6d4528, { x: sx, y: 0.1 });
  return b.mesh(0.2);
}
export function signMesh(text, w = 2.2) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = '#f6e2bf'; x.fillRect(0, 0, 512, 128); x.strokeStyle = '#a5774c'; x.lineWidth = 12; x.strokeRect(6, 6, 500, 116);
  x.fillStyle = '#6b4224'; x.textAlign = 'center'; x.textBaseline = 'middle';
  let fs = 64; do { x.font = `800 ${fs}px Fredoka, 'Segoe UI', sans-serif`; fs -= 4; } while (x.measureText(text).width > 470 && fs > 20);
  x.fillText(text, 256, 68);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0xa5774c, roughness: 0.8 });
  const face = new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 });
  const board = new THREE.Mesh(new THREE.BoxGeometry(w, w / 4, 0.1), [wood, wood, wood, wood, face, wood]);
  board.position.y = 1.25; g.add(board);
  for (const sx of [-w * 0.38, w * 0.38]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.3, 6), wood); p.position.set(sx, 0.65, -0.02); g.add(p); }
  g.userData.setText = (s) => { x.fillStyle = '#f6e2bf'; x.fillRect(12, 12, 488, 104); x.fillStyle = '#6b4224'; let f = 64; do { x.font = `800 ${f}px Fredoka, 'Segoe UI', sans-serif`; f -= 4; } while (x.measureText(s).width > 470 && f > 20); x.fillText(s, 256, 68); t.needsUpdate = true; };
  return shadowed(g);
}

/* ---------------- decorations ---------------- */
export function decorMesh(id) {
  const b = new B();
  switch (id) {
    case 'flowers': {
      b.add(cyl(0.8, 0.85, 0.2, 14), 0x8a5a36, { y: 0.1, sz: 0.75 });
      b.add(cyl(0.72, 0.72, 0.06, 14), 0x6b4026, { y: 0.21, sz: 0.68 });
      const r = rng(5); const cols = [0xff6f91, 0xffd54f, 0xffffff, 0xb388ff, 0xff8a65];
      for (let i = 0; i < 16; i++) { const a = r() * 6.28, rr = Math.sqrt(r()) * 0.6; const x = Math.cos(a) * rr, z = Math.sin(a) * rr * 0.7; b.add(cyl(0.012, 0.012, 0.25, 3), 0x4f9a3f, { x, y: 0.33, z }); b.add(sph(0.08, 6, 4), cols[i % 5], { x, y: 0.47, z }); }
      break;
    }
    case 'path': { const r = rng(9); for (let i = 0; i < 5; i++) b.add(cyl(0.32 + r() * 0.15, 0.36 + r() * 0.15, 0.08, 7), 0xcfc6b8 + Math.floor(r() * 3) * 0x050505, { x: (i % 2 ? 0.4 : -0.35) + (r() - 0.5) * 0.2, y: 0.04, z: -0.65 + i * 0.33, ry: r() * 3 }); break; }
    case 'fence': return new THREE.Mesh(fenceGeo(2, 0xc98b58), MAT);
    case 'hay': b.add(cyl(0.45, 0.45, 1.0, 14), 0xf2c552, { x: -0.25, y: 0.45, rz: Math.PI / 2 }); b.add(cyl(0.45, 0.45, 1.0, 14), 0xe8b84a, { x: 0.35, y: 0.45, z: 0.5, rz: Math.PI / 2, ry: 0.4 }); b.add(cyl(0.42, 0.42, 0.9, 14), 0xf5cd5e, { x: 0.05, y: 1.2, z: 0.2, rz: Math.PI / 2, ry: 0.2 }); break;
    case 'bench': for (let i = 0; i < 3; i++) b.add(rbox(1.5, 0.07, 0.15, 0.02), 0xc98b58, { y: 0.48, z: -0.18 + i * 0.18 }); for (let i = 0; i < 2; i++) b.add(rbox(1.5, 0.13, 0.05, 0.02), 0xc98b58, { y: 0.7 + i * 0.2, z: -0.3, rx: -0.15 }); for (const sx of [-0.65, 0.65]) b.add(box(0.07, 0.48, 0.5), 0x5a4a5a, { x: sx, y: 0.24 }); break;
    case 'scarecrow': b.add(cyl(0.05, 0.05, 1.8, 6), 0x8a5a36, { y: 0.9 }); b.add(cyl(0.04, 0.04, 1.4, 6), 0x8a5a36, { y: 1.3, rz: Math.PI / 2 }); b.add(rbox(0.6, 0.6, 0.3, 0.06), 0x5c8ed6, { y: 1.15 }); b.add(rbox(0.3, 0.3, 0.32, 0.04), 0xe8473f, { x: 0.12, y: 1.05, z: 0.01 }); b.add(sph(0.22, 10, 8), 0xe8cfa2, { y: 1.65 }); b.add(cyl(0.45, 0.45, 0.04, 14), 0xf2c552, { y: 1.8 }); b.add(cone(0.22, 0.35, 12), 0xf2c552, { y: 1.97 }); b.add(sph(0.03, 5, 3), 0x333333, { x: -0.08, y: 1.7, z: 0.19 }); b.add(sph(0.03, 5, 3), 0x333333, { x: 0.08, y: 1.7, z: 0.19 }); for (const sx of [-0.7, 0.7]) b.add(cone(0.06, 0.2, 5), 0xf2c552, { x: sx, y: 1.28, rz: sx > 0 ? -Math.PI / 2 : Math.PI / 2 }); break;
    case 'mailbox': b.add(cyl(0.05, 0.05, 1.0, 6), 0x8a5a36, { y: 0.5 }); b.add(rbox(0.32, 0.32, 0.55, 0.14), 0x5c8ed6, { y: 1.1 }); b.add(box(0.04, 0.25, 0.08), 0xe53935, { x: 0.18, y: 1.25, z: -0.1 }); break;
    case 'lamp': { b.add(cyl(0.06, 0.09, 2.2, 8), 0x4d3f5a, { y: 1.1 }); b.add(cone(0.3, 0.3, 6), 0x4d3f5a, { y: 2.6 }); b.add(box(0.36, 0.06, 0.36), 0x4d3f5a, { y: 2.18 }); const g = new THREE.Group(); g.add(b.mesh(0.2)); const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.3, 0.26), GLOW_MAT); bulb.position.y = 2.33; g.add(bulb); g.userData.glow = bulb; return shadowed(g); }
    case 'blossom': return treeMesh('blossom', 3);
    case 'appletree': return treeMesh('appletree', 4);
    case 'orangetree': return treeMesh('orangetree', 6);
    case 'birdbath': b.add(cyl(0.12, 0.2, 0.7, 10), 0xd8d2c8, { y: 0.35 }); b.add(cyl(0.45, 0.25, 0.18, 14), 0xd8d2c8, { y: 0.78 }); b.add(cyl(0.38, 0.38, 0.03, 14), 0x7fd3f5, { y: 0.86 }); b.add(sph(0.08, 8, 6), 0x5c8ed6, { x: 0.3, y: 0.95 }); b.add(cone(0.03, 0.08, 4), 0xffb74d, { x: 0.39, y: 0.96, rz: -Math.PI / 2 }); break;
    case 'well': b.add(cyl(0.65, 0.7, 0.75, 12), 0xb9b0a8, { y: 0.37 }); b.add(cyl(0.52, 0.52, 0.05, 12), 0x5cc8ef, { y: 0.6 }); for (const sx of [-0.6, 0.6]) b.add(box(0.1, 1.4, 0.1), 0x8a5a36, { x: sx, y: 1.3 }); b.add(cyl(0.05, 0.05, 1.3, 6), 0x8a5a36, { y: 1.65, rz: Math.PI / 2 }); slab(b, 0.9, 1.8, 0, 2.4, 1.2, 0.08, 0xd9443a); slab(b, 0, 2.4, -0.9, 1.8, 1.2, 0.08, 0xd9443a); b.add(cyl(0.12, 0.1, 0.18, 8), 0x8a5a36, { y: 1.2 }); break;
    case 'picnic': for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) b.add(box(0.36, 0.03, 0.36), (i + j) % 2 ? 0xffffff : 0xe8473f, { x: -0.54 + i * 0.36, y: 0.02, z: -0.54 + j * 0.36 }); b.add(rbox(0.5, 0.3, 0.35, 0.06), 0xc98b58, { x: 0.3, y: 0.18, z: -0.2 }); b.add(tor(0.2, 0.025, 4, 12, Math.PI), 0x8a5a36, { x: 0.3, y: 0.32, z: -0.2 }); b.add(sph(0.08, 6, 4), 0xe53935, { x: -0.3, y: 0.08, z: 0.2 }); b.add(cyl(0.05, 0.05, 0.25, 8), 0xffffff, { x: -0.1, y: 0.13, z: 0.35 }); break;
    case 'beehive': b.add(box(0.12, 0.6, 0.12), 0x8a5a36, { y: 0.3 }); b.add(box(0.9, 0.08, 0.7), 0x8a5a36, { y: 0.62 }); for (let i = 0; i < 3; i++) b.add(rbox(0.78 - i * 0.04, 0.3, 0.6, 0.04), i % 2 ? 0xf2c552 : 0xffdf73, { y: 0.82 + i * 0.3 }); b.add(rbox(0.9, 0.12, 0.72, 0.04), 0xc98b58, { y: 1.75 }); b.add(box(0.2, 0.06, 0.04), 0x5a3626, { y: 0.75, z: 0.31 }); break;
    case 'gnome': b.add(cyl(0.25, 0.3, 0.45, 12), 0x5c8ed6, { y: 0.23 }); b.add(sph(0.18, 10, 8), 0xf3c9a5, { y: 0.6 }); b.add(cone(0.24, 0.55, 12), 0xe53935, { y: 0.98, rz: 0.15 }); b.add(cone(0.18, 0.35, 10), 0xffffff, { y: 0.42, z: 0.12, rx: Math.PI + 0.3 }); b.add(sph(0.06, 6, 4), 0xf09a8a, { y: 0.6, z: 0.17 }); for (const sx of [-0.12, 0.12]) b.add(sph(0.08, 6, 4), 0x6d4c41, { x: sx, y: 0.04, z: 0.08, sz: 1.4 }); break;
    case 'pond': { const g = new THREE.Group(); const r = rng(11); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; b.add(ico(0.22 + r() * 0.1, 0), 0xb9b0a8, { x: Math.cos(a) * 0.82, y: 0.08, z: Math.sin(a) * 0.82, sy: 0.6 }); } b.add(cyl(0.85, 0.85, 0.06, 18), 0x6b5a4a, { y: 0.02 }); for (let i = 0; i < 3; i++) { const a = i * 2.1; b.add(cyl(0.16, 0.16, 0.02, 10), 0x5fb15a, { x: Math.cos(a) * 0.4, y: 0.11, z: Math.sin(a) * 0.4 }); } b.add(sph(0.06, 6, 4), 0xff9ec2, { x: 0.4, y: 0.15 }); for (let i = 0; i < 5; i++) b.add(cyl(0.015, 0.02, 0.6, 3), 0x6b9a3f, { x: -0.6 + i * 0.05, y: 0.35, z: -0.5 + (i % 2) * 0.08, rz: (i - 2) * 0.12 }); g.add(b.mesh(0.2)); const w = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.04, 20), WATER_MAT); w.position.y = 0.09; w.receiveShadow = true; g.add(w); return shadowed(g); }
    case 'fountain': { const g = new THREE.Group(); b.add(cyl(0.9, 0.95, 0.4, 18), 0xe5ded2, { y: 0.2 }); b.add(cyl(0.15, 0.25, 0.9, 10), 0xe5ded2, { y: 0.7 }); b.add(cyl(0.45, 0.2, 0.15, 14), 0xd8d0c4, { y: 1.15 }); b.add(sph(0.12, 8, 6), 0xe5ded2, { y: 1.3 }); g.add(b.mesh(0.2)); const w = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.04, 20), WATER_MAT); w.position.y = 0.36; g.add(w); const w2 = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.03, 14), WATER_MAT); w2.position.y = 1.22; g.add(w2); g.userData.fountain = true; return shadowed(g); }
    case 'tractor': { b.add(rbox(1.0, 0.6, 1.5, 0.12), 0xe53935, { y: 0.75, z: 0.2 }); b.add(rbox(0.9, 0.7, 0.75, 0.1), 0xe53935, { y: 1.3, z: -0.3 }); b.add(box(0.8, 0.45, 0.05), 0xbfe8ff, { y: 1.4, z: 0.08 }); b.add(rbox(1.05, 0.08, 0.9, 0.03), 0x37323f, { y: 1.68, z: -0.3 }); b.add(cyl(0.06, 0.06, 0.5, 6), 0x37323f, { x: 0.3, y: 1.3, z: 0.75 }); for (const sx of [-0.62, 0.62]) { b.add(cyl(0.55, 0.55, 0.32, 16), 0x37323f, { x: sx, y: 0.55, z: -0.35, rz: Math.PI / 2 }); b.add(cyl(0.3, 0.3, 0.34, 12), 0xffd23f, { x: sx, y: 0.55, z: -0.35, rz: Math.PI / 2 }); b.add(cyl(0.3, 0.3, 0.22, 12), 0x37323f, { x: sx * 0.85, y: 0.3, z: 0.75, rz: Math.PI / 2 }); b.add(cyl(0.15, 0.15, 0.24, 10), 0xffd23f, { x: sx * 0.85, y: 0.3, z: 0.75, rz: Math.PI / 2 }); } break; }
    case 'balloon': {
      const g = new THREE.Group();
      const cols = [0xff6f91, 0xffd54f, 0x4fc3f7, 0x81c784, 0xb388ff, 0xff8a65];
      for (let i = 0; i < 12; i++) { const s = new THREE.SphereGeometry(1.0, 2, 14, i / 12 * Math.PI * 2, Math.PI * 2 / 12 + 0.01); b.add(s, cols[i % 6], { y: 3.4, sy: 1.15 }); }
      b.add(cone(0.55, 0.7, 12), cols[0], { y: 2.15, rx: Math.PI });
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4; b.add(cyl(0.012, 0.012, 1.1, 3), 0x5a3626, { x: Math.cos(a) * 0.32, y: 1.35, z: Math.sin(a) * 0.32 }); }
      b.add(rbox(0.6, 0.45, 0.6, 0.06), 0xc98b58, { y: 0.6 });
      g.add(b.mesh(0)); g.userData.float = true; return shadowed(g);
    }
  }
  return b.mesh(0.25);
}

/* ---------------- animals ---------------- */
export function animalMesh(type) {
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  const legs = [];
  const b = new B();
  if (type === 'chicken') {
    b.add(sph(0.26, 12, 10), 0xffffff, { y: 0.38, sx: 0.9, sz: 1.15 });
    b.add(sph(0.16, 10, 8), 0xffffff, { y: 0.66, z: 0.2 });
    b.add(sph(0.06, 6, 4), 0xe53935, { y: 0.82, z: 0.2, sx: 0.6, sz: 1.4 });
    b.add(cone(0.05, 0.12, 6), 0xffa726, { y: 0.64, z: 0.37, rx: Math.PI / 2 });
    b.add(sph(0.04, 6, 4), 0xe53935, { y: 0.56, z: 0.33 });
    for (const sx of [-1, 1]) { b.add(sph(0.025, 5, 3), 0x222222, { x: sx * 0.09, y: 0.7, z: 0.33 }); b.add(sph(0.12, 8, 6), 0xf5f5f5, { x: sx * 0.22, y: 0.4, z: -0.02, sx: 0.4, sz: 1.2 }); }
    b.add(sph(0.12, 8, 6), 0xf5f5f5, { y: 0.5, z: -0.28, sy: 1.3, sx: 0.6, rx: -0.5 });
    for (const sx of [-0.08, 0.08]) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 4), new THREE.MeshStandardMaterial({ color: 0xffa726 })); l.position.set(sx, 0.1, 0); g.add(l); legs.push(l); }
  } else if (type === 'cow') {
    b.add(rbox(0.85, 0.7, 1.4, 0.25), 0xffffff, { y: 0.85 });
    const spots = [[0.43, 0.9, 0.2, 0.22], [-0.43, 0.8, -0.3, 0.25], [0.2, 1.2, -0.4, 0.2], [-0.25, 1.15, 0.35, 0.16], [0.43, 0.75, -0.45, 0.14]];
    for (const [x, y, z, r] of spots) b.add(sph(r, 8, 6), 0x2b2b33, { x: x * 0.98, y, z, sx: Math.abs(x) > 0.4 ? 0.25 : 1, sy: Math.abs(x) > 0.4 ? 1 : 0.25 });
    b.add(rbox(0.55, 0.5, 0.55, 0.18), 0xffffff, { y: 1.15, z: 0.85 });
    b.add(rbox(0.5, 0.26, 0.2, 0.1), 0xffb3c1, { y: 1.02, z: 1.14 });
    for (const sx of [-1, 1]) { b.add(sph(0.03, 5, 3), 0x222222, { x: sx * 0.13, y: 1.25, z: 1.12 }); b.add(cone(0.05, 0.18, 6), 0xf5ecd7, { x: sx * 0.2, y: 1.48, z: 0.8, rz: -sx * 0.4 }); b.add(sph(0.1, 6, 4), 0xffffff, { x: sx * 0.33, y: 1.28, z: 0.75, sx: 1.4, sy: 0.5 }); }
    b.add(sph(0.12, 8, 6), 0xffb3c1, { y: 0.48, z: -0.2, sy: 0.6 });
    b.add(cyl(0.02, 0.02, 0.6, 4), 0xffffff, { y: 0.85, z: -0.75, rx: 0.4 });
    b.add(sph(0.05, 5, 3), 0x2b2b33, { y: 0.6, z: -0.85 });
    for (const [x, z] of [[-0.28, 0.45], [0.28, 0.45], [-0.28, -0.45], [0.28, -0.45]]) { const lb = new B(); lb.add(cyl(0.09, 0.08, 0.55, 8), 0xffffff, { y: -0.27 }); lb.add(cyl(0.09, 0.09, 0.1, 8), 0x3a2e2a, { y: -0.52 }); const l = lb.mesh(0); l.position.set(x, 0.6, z); g.add(l); legs.push(l); }
  } else if (type === 'sheep') {
    const r = rng(3);
    for (let i = 0; i < 9; i++) b.add(ico(0.28, 1), i % 2 ? 0xfdfbf6 : 0xf3efe6, { x: (r() - 0.5) * 0.45, y: 0.8 + (r() - 0.3) * 0.25, z: (r() - 0.5) * 0.8 });
    b.add(sph(0.22, 10, 8), 0x3a3540, { y: 0.92, z: 0.58, sy: 1.1 });
    b.add(ico(0.16, 1), 0xfdfbf6, { y: 1.12, z: 0.55 });
    for (const sx of [-1, 1]) { b.add(sph(0.08, 6, 4), 0x3a3540, { x: sx * 0.22, y: 0.98, z: 0.52, sx: 1.6, sy: 0.5 }); b.add(sph(0.035, 5, 3), 0xffffff, { x: sx * 0.09, y: 0.97, z: 0.77 }); }
    for (const [x, z] of [[-0.18, 0.3], [0.18, 0.3], [-0.18, -0.3], [0.18, -0.3]]) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x3a3540 })); l.geometry.translate(0, -0.25, 0); l.position.set(x, 0.55, z); g.add(l); legs.push(l); }
  } else if (type === 'dog') {
    b.add(rbox(0.38, 0.38, 0.75, 0.15), 0xd9a066, { y: 0.48 });
    b.add(rbox(0.36, 0.34, 0.36, 0.13), 0xd9a066, { y: 0.78, z: 0.42 });
    b.add(rbox(0.2, 0.15, 0.18, 0.06), 0xf5e1c0, { y: 0.72, z: 0.62 });
    b.add(sph(0.04, 6, 4), 0x222222, { y: 0.77, z: 0.72 });
    for (const sx of [-1, 1]) { b.add(sph(0.08, 6, 4), 0x8a5a36, { x: sx * 0.2, y: 0.82, z: 0.38, sx: 0.5, sy: 1.3 }); b.add(sph(0.03, 5, 3), 0x222222, { x: sx * 0.08, y: 0.84, z: 0.6 }); }
    b.add(box(0.36, 0.06, 0.08), 0xe53935, { y: 0.66, z: 0.27 });
    for (const [x, z] of [[-0.12, 0.25], [0.12, 0.25], [-0.12, -0.25], [0.12, -0.25]]) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.32, 6), new THREE.MeshStandardMaterial({ color: 0xd9a066 })); l.geometry.translate(0, -0.16, 0); l.position.set(x, 0.32, z); g.add(l); legs.push(l); }
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.3, 5), new THREE.MeshStandardMaterial({ color: 0xd9a066 })); tail.geometry.translate(0, 0.15, 0); tail.position.set(0, 0.6, -0.36); tail.rotation.x = -0.6; g.add(tail); g.userData.tail = tail;
  }
  body.add(b.mesh(0.15));
  g.userData.legs = legs; g.userData.body = body;
  return shadowed(g);
}

/* ---------------- emoji sprite textures ---------------- */
const emojiCache = new Map();
export function emojiTexture(e, bubble = true) {
  const k = e + bubble;
  if (emojiCache.has(k)) return emojiCache.get(k);
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  if (bubble) {
    x.fillStyle = 'rgba(255,255,255,0.95)'; x.beginPath(); x.arc(64, 58, 50, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(50, 100); x.lineTo(78, 100); x.lineTo(64, 122); x.fill();
    x.strokeStyle = 'rgba(120,90,60,0.25)'; x.lineWidth = 4; x.beginPath(); x.arc(64, 58, 50, 0, Math.PI * 2); x.stroke();
  }
  x.font = `${bubble ? 56 : 96}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(e, 64, bubble ? 62 : 70);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  emojiCache.set(k, t); return t;
}
export function iconSprite(e, scale = 0.9) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: emojiTexture(e), depthTest: true, transparent: true }));
  s.scale.setScalar(scale); s.renderOrder = 5;
  return s;
}
