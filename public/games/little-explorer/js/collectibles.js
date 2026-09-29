// 20 discoveries + quest items, with pickup meshes, sparkle, and backpack bookkeeping.
import * as THREE from 'three';
import { G, terrainHeight as H } from './state.js';
import { LOC } from './world.js';

export const CATS = {
  flower: { icon: '🌸', label: 'Flowers', total: 6 },
  crystal: { icon: '💎', label: 'Crystals', total: 5 },
  hidden: { icon: '🧸', label: 'Hidden Objects', total: 5 },
  food: { icon: '🍎', label: 'Food', total: 3 },
  secret: { icon: '⭐', label: 'Special', total: 1 },
};

// cat = backpack category, kind = visual style
const DEFS = [
  // flowers
  { id: 'lavender', name: 'Lavender Flower', icon: '💜', cat: 'flower', kind: 'flower', color: 0xb28dff, at: [-26, 7.5], hint: 'behind the house' },
  { id: 'sunflower', name: 'Sunflower', icon: '🌻', cat: 'flower', kind: 'flower', color: 0xffd23f, at: [24.6, -20.2], hint: 'behind the slide' },
  { id: 'waterlily', name: 'Water Lily', icon: '🪷', cat: 'flower', kind: 'flower', color: 0xffb3d1, at: [38.2, 15.6] },
  { id: 'bluebell', name: 'Bluebell', icon: '🔔', cat: 'flower', kind: 'flower', color: 0x6fa8ff, at: [-27.5, -24.5] },
  { id: 'moonpetal', name: 'Moonpetal Blossom', icon: '🌙', cat: 'flower', kind: 'flower', color: 0xd9f2ff, glow: true, at: [-56.5, -50.5] },
  { id: 'twilightrose', name: 'Twilight Rose', icon: '🌹', cat: 'flower', kind: 'flower', color: 0xff5c8a, glow: true, at: [-3.8, -3.8], sunset: true },
  // crystals
  { id: 'skycrystal', name: 'Sky Crystal', icon: '🔷', cat: 'crystal', kind: 'crystal', color: 0x7fd0ff, sky: true },
  { id: 'emerald', name: 'Emerald Shard', icon: '💚', cat: 'crystal', kind: 'crystal', color: 0x4fe39a, at: [-41, -24] },
  { id: 'rosequartz', name: 'Rose Quartz', icon: '🩷', cat: 'crystal', kind: 'crystal', color: 0xff9ecb, at: [LOC.guardian.x + 1.6, LOC.guardian.z + 0.6] },
  { id: 'azure', name: 'Azure Crystal', icon: '💙', cat: 'crystal', kind: 'crystal', color: 0x5f8dff, at: [-9, -54] },
  { id: 'amber', name: 'Amber Crystal', icon: '🧡', cat: 'crystal', kind: 'crystal', color: 0xffb04f, at: [35.4, 33.0] },
  // hidden objects (toys + special objects)
  { id: 'teddy', name: 'Teddy Bear', icon: '🧸', cat: 'hidden', kind: 'teddy', color: 0xc98b58, at: [-33.5, -27], y: 0.25 },
  { id: 'boat', name: 'Toy Boat', icon: '⛵', cat: 'hidden', kind: 'boat', color: 0xff6f91, at: [39.6, 25.5] },
  { id: 'top', name: 'Spinning Top', icon: '🪀', cat: 'hidden', kind: 'top', color: 0x7cc8ff, at: [27.4, -20.5] },
  { id: 'compass', name: 'Old Compass', icon: '🧭', cat: 'hidden', kind: 'compass', color: 0xffd66b, at: [12, -58] },
  { id: 'musicbox', name: 'Music Box', icon: '🎶', cat: 'hidden', kind: 'musicbox', color: 0xb28dff, room: 'bed' },
  // food
  { id: 'icecream', name: 'Ice Cream', icon: '🍦', cat: 'food', kind: 'none' },                        // from the stall
  { id: 'apple', name: 'Red Apple', icon: '🍎', cat: 'food', kind: 'apple', color: 0xff4f5e, at: [-11.2, 14.3] },
  { id: 'honey', name: 'Honey Jar', icon: '🍯', cat: 'food', kind: 'honey', color: 0xffb830, tower: true },
  // secret treasure
  { id: 'starlight', name: 'Starlight Treasure', icon: '⭐', cat: 'secret', kind: 'star', color: 0xffe27a, glow: true, pedestal: true },
];
// quest items (not counted as discoveries)
const QUEST = [
  { id: 'catfood', name: 'Cat Food', icon: '🐟', kind: 'catfood', color: 0x7cc8ff, at: [19.2, -3.4], y: 0.6 },
  { id: 'duckfood', name: 'Duck Food', icon: '🌾', kind: 'none', color: 0xe2c79a },
  { id: 'key', name: 'Strange Key', icon: '🗝️', kind: 'key', color: 0xffd66b, at: [25.8, 21], y: 0.12, glow: true },
];

export function makeItemMesh(d) { return makeMesh(d); }
function makeMesh(d) {
  const g = new THREE.Group();
  const m = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5, ...o });
  const col = d.color ?? 0xffffff;
  switch (d.kind) {
    case 'flower': {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.6, 5), m(0x4f9a3f)); stem.position.y = 0.3; g.add(stem);
      for (let i = 0; i < 6; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), m(col, { emissive: col, emissiveIntensity: d.glow ? 0.8 : 0.25 })); const a = i / 6 * Math.PI * 2; p.scale.set(1, 0.4, 0.6); p.position.set(Math.cos(a) * 0.13, 0.62, Math.sin(a) * 0.13); p.rotation.y = -a; g.add(p); }
      const c = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), m(0xffe27a)); c.position.y = 0.63; g.add(c);
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 4), m(0x5fae4a)); leaf.scale.set(1, 0.2, 0.5); leaf.position.set(0.08, 0.25, 0); g.add(leaf);
      break;
    }
    case 'crystal': {
      const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), m(col, { emissive: col, emissiveIntensity: 0.8, flatShading: true, roughness: 0.15, transparent: true, opacity: 0.92 }));
      c.scale.y = 1.6; c.position.y = 0.55; g.add(c); g.userData.spin = c; break;
    }
    case 'teddy': {
      const b = m(col); const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), b); body.position.y = 0.2; body.scale.y = 1.1; g.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), b); head.position.y = 0.48; g.add(head);
      for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), b); e.position.set(s * 0.11, 0.6, 0); g.add(e); }
      const sn = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), m(0xf3d9b8)); sn.position.set(0, 0.46, 0.13); g.add(sn);
      break;
    }
    case 'boat': {
      const hull = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.22), m(col)); hull.position.y = 0.1; g.add(hull);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 4), m(0x8a5a3c)); mast.position.y = 0.4; g.add(mast);
      const sail = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.4, 3), m(0xffffff)); sail.position.set(0.06, 0.4, 0); g.add(sail);
      break;
    }
    case 'top': {
      const t = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.28, 12), m(col)); t.rotation.x = Math.PI; t.position.y = 0.2; g.add(t);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.185, 0.05, 12), m(0xff8fb8)); band.position.y = 0.32; g.add(band);
      g.userData.spin = g; break;
    }
    case 'compass': {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 20), m(col, { metalness: 0.6, roughness: 0.3 })); c.position.y = 0.05; g.add(c);
      const face = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20), m(0xfff8ef)); face.rotation.x = -Math.PI / 2; face.position.y = 0.085; g.add(face);
      const nd = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.22, 4), m(0xff4f5e)); nd.rotation.x = -Math.PI / 2; nd.position.y = 0.1; g.add(nd);
      break;
    }
    case 'musicbox': {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.24), m(col)); b.position.y = 0.1; g.add(b);
      const lid = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.05, 0.26), m(0xffd66b)); lid.position.y = 0.22; g.add(lid);
      break;
    }
    case 'apple': {
      const a = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), m(col)); a.position.y = 0.15; g.add(a);
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.1, 4), m(0x6b4a2e)); s.position.y = 0.32; g.add(s);
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), m(0x5fae4a)); l.scale.set(1, 0.3, 0.5); l.position.set(0.05, 0.33, 0); g.add(l);
      break;
    }
    case 'honey': {
      const j = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.13, 0.26, 12), m(col, { transparent: true, opacity: 0.9 })); j.position.y = 0.13; g.add(j);
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.06, 12), m(0xff6f91)); lid.position.y = 0.29; g.add(lid);
      break;
    }
    case 'star': {
      const shape = new THREE.Shape();
      for (let i = 0; i < 10; i++) { const r = i % 2 ? 0.14 : 0.32, a = i / 10 * Math.PI * 2 + Math.PI / 2; i ? shape.lineTo(Math.cos(a) * r, Math.sin(a) * r) : shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
      const s = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 }), m(col, { emissive: 0xffc830, emissiveIntensity: 1, metalness: 0.4, roughness: 0.25 }));
      s.position.y = 0.55; g.add(s); g.userData.spin = s; break;
    }
    case 'key': {
      const km = m(col, { metalness: 0.7, roughness: 0.3, emissive: 0x553300 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.025, 6, 14), km); ring.position.set(-0.14, 0.05, 0); ring.rotation.x = Math.PI / 2; g.add(ring);
      const sh = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.03, 0.03), km); sh.position.set(0.05, 0.05, 0); g.add(sh);
      const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.07), km); t1.position.set(0.15, 0.05, 0.04); g.add(t1);
      break;
    }
    case 'catfood': {
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.12, 14), m(col, { metalness: 0.4 })); can.position.y = 0.06; g.add(can);
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 3), m(0xff8f6b)); f.rotation.z = Math.PI / 2; f.position.y = 0.13; g.add(f);
      break;
    }
  }
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  if (d.kind !== 'none') {
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: G.world.glow, color: d.color ?? 0xffffff, transparent: true, opacity: d.glow ? 0.8 : 0.45, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.setScalar(d.glow ? 1.5 : 1.0); halo.position.y = 0.45; g.add(halo); g.userData.halo = halo;
  }
  return g;
}

export class Collectibles {
  constructor() {
    this.items = {};             // id -> def
    this.found = new Set();      // discoveries
    this.bag = new Set();        // quest items currently held
    this.order = [];
    for (const d of [...DEFS, ...QUEST]) this.items[d.id] = { ...d, quest: QUEST.includes(d) };
    this.total = DEFS.length;
  }
  spawn() {
    const W = G.world;
    for (const d of Object.values(this.items)) {
      if (d.kind === 'none') continue;
      let pos;
      if (d.sky) pos = new THREE.Vector3(W.skyIsland.x, W.skyIsland.y, W.skyIsland.z);
      else if (d.pedestal) pos = new THREE.Vector3(W.pedestal.x, W.pedestal.y, W.pedestal.z);
      else if (d.tower) { const a = -Math.PI * 0.8; pos = new THREE.Vector3(LOC.tower.x + Math.sin(a) * 4.2, 0, LOC.tower.z + Math.cos(a) * 4.2); pos.y = H(pos.x, pos.z); }
      else if (d.room) pos = W.roomSlots[d.room].pos.clone();
      else pos = new THREE.Vector3(d.at[0], H(d.at[0], d.at[1]) + (d.y ?? 0), d.at[1]);
      if (d.id === 'key') pos.y = 0.06 + (d.y ?? 0);
      if (d.id === 'catfood') pos.y = H(pos.x, pos.z) + 0.55;  // on the park bench
      const mesh = makeMesh(d);
      mesh.position.copy(pos);
      mesh.userData.baseY = pos.y;
      G.scene.add(mesh);
      d.mesh = mesh; d.pos = pos;
      if (d.sunset) mesh.visible = false;
      G.inter.add({
        id: 'pick-' + d.id, pos, radius: d.sky ? 1.6 : 1.7, priority: 1,
        room: !!d.room,
        enabled: () => !this.has(d.id) && mesh.visible,
        text: () => `Pick Up ${d.name}`,
        action: () => this.pickup(d.id),
      });
    }
  }
  has(id) { return this.found.has(id) || this.bag.has(id) || this.items[id]?.used; }
  pickup(id) {
    const d = this.items[id];
    G.player.playOnce('pickup', 0.6);
    G.audio?.play('pickup');
    if (d.mesh) { const m = d.mesh; setTimeout(() => { G.world.burst(m.position.clone().setY(m.position.y + 0.4), d.color ?? 0xffffff); m.visible = false; }, 250); }
    this.give(id);
  }
  give(id) {
    const d = this.items[id];
    if (d.quest) {
      this.bag.add(id);
      G.ui.toast('🎒 ADDED TO BAG', `${d.icon} ${d.name}`);
      G.onQuestItem?.(id);
    } else {
      if (this.found.has(id)) return;
      this.found.add(id); this.order.push(id);
      G.ui.toast('✨ NEW DISCOVERY', `${d.icon} ${d.name}`);
      G.ui.setCount(this.found.size, this.total);
      G.onDiscovery?.(id);
    }
    G.save?.();
  }
  use(id) { this.bag.delete(id); this.items[id].used = true; }
  countCat(cat) { let n = 0; for (const id of this.found) if (this.items[id].cat === cat) n++; return n; }
  update(dt, t) {
    for (const d of Object.values(this.items)) {
      const m = d.mesh; if (!m || !m.visible) continue;
      if (d.sunset) continue;
      m.position.y = m.userData.baseY + Math.sin(t * 2 + m.position.x) * 0.06;
      if (m.userData.spin) m.userData.spin.rotation.y = t * 1.5;
      if (m.userData.halo) m.userData.halo.material.opacity = (d.glow ? 0.7 : 0.35) + Math.sin(t * 3 + m.position.z) * 0.15;
    }
    // twilight rose appears at sunset
    const tr = this.items.twilightrose;
    if (tr.mesh && !this.has('twilightrose')) {
      const show = G.day > 0.78;
      if (show && !tr.mesh.visible) { tr.mesh.visible = true; G.ui.toast('🌅 SUNSET', 'Something is blooming near the fountain...', 4.5, true); }
    }
  }
}
