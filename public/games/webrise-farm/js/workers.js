// Farmers: every farm action becomes a job. A farmer walks over, works for a while
// (hoeing, planting, watering, harvesting, building, clearing land) and then it happens.
import * as THREE from 'three';
import { G, emit, earn, spend, clamp, rand } from './game.js';
import { CROPS, DECOR, HELPERS, JOB_TIME } from './config.js';
import * as M from './models.js';

const HOME = [[-4, -14.6], [-6.5, -15.2], [3.5, -15], [6, -14.4]];
const inside = (x, z) => Math.abs(x) < 16.3 && Math.abs(z) < 12.3;
const GATES = [{ out: new THREE.Vector3(0, 0, -14.2), in: new THREE.Vector3(0, 0, -11.2) }, { out: new THREE.Vector3(0, 0, 14.2), in: new THREE.Vector3(0, 0, 11.2) }];

export function buildTime(id) { const d = DECOR[id]; return d.build ?? clamp(Math.round(3 + d.cost / 5), 3, 30); }

/* ---------------- farmer model ---------------- */
function farmerMesh(look) {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  const skin = 0xf3c9a5, boots = 0x6b4226;
  const b = new M.B();
  b.add(M.rbox(0.5, 0.36, 0.32, 0.1), look.overalls, { y: 0.78 });                 // overalls
  b.add(M.rbox(0.5, 0.3, 0.32, 0.1), look.shirt, { y: 1.06 });                     // shirt
  b.add(M.rbox(0.36, 0.22, 0.05, 0.03), look.overalls, { y: 0.98, z: 0.15 });      // bib
  for (const sx of [-0.13, 0.13]) { b.add(M.box(0.06, 0.26, 0.04), look.overalls, { x: sx, y: 1.1, z: 0.165 }); b.add(M.sph(0.025, 6, 4), 0xffd54f, { x: sx, y: 1.02, z: 0.19 }); }
  b.add(M.sph(0.25, 14, 12), skin, { y: 1.47 });                                   // head
  b.add(M.sph(0.06, 8, 6), 0xf0a98a, { y: 1.44, z: 0.24 });                        // nose
  b.add(M.sph(0.07, 8, 6), look.hair, { y: 1.36, z: 0.2, sx: 1.9, sy: 0.55, sz: 0.7 }); // mustache / smile
  for (const sx of [-0.09, 0.09]) b.add(M.sph(0.03, 6, 4), 0x2b2b33, { x: sx, y: 1.52, z: 0.22 });
  b.add(M.sph(0.255, 12, 8), look.hair, { y: 1.5, z: -0.04, sy: 0.85 });            // back hair
  b.add(M.cyl(0.46, 0.46, 0.04, 18), look.hat, { y: 1.66 });                       // straw hat
  b.add(M.cyl(0.21, 0.24, 0.22, 14), look.hat, { y: 1.78 });
  b.add(M.cyl(0.245, 0.245, 0.06, 14), look.band, { y: 1.72 });
  body.add(b.mesh(0.1));
  const limb = (len, r, col, endCol, endR) => { const lb = new M.B(); lb.add(M.cyl(r, r * 0.9, len, 8), col, { y: -len / 2 }); lb.add(M.sph(endR, 8, 6), endCol, { y: -len }); return lb.mesh(0); };
  const legL = new THREE.Group(), legR = new THREE.Group();
  legL.position.set(-0.12, 0.62, 0); legR.position.set(0.12, 0.62, 0);
  legL.add(limb(0.52, 0.085, look.overalls, boots, 0.11)); legR.add(limb(0.52, 0.085, look.overalls, boots, 0.11));
  g.add(legL, legR);
  const armL = new THREE.Group(), armR = new THREE.Group();
  armL.position.set(-0.31, 1.15, 0); armR.position.set(0.31, 1.15, 0);
  armL.add(limb(0.46, 0.07, look.shirt, skin, 0.075)); armR.add(limb(0.46, 0.07, look.shirt, skin, 0.075));
  body.add(armL, armR);
  // tools held in the right hand (local -Y is "down the arm")
  const tools = {};
  const tool = (name, fn) => { const tb = new M.B(); fn(tb); const m = tb.mesh(0); m.position.y = -0.48; m.visible = false; armR.add(m); tools[name] = m; };
  tool('hoe', tb => { tb.add(M.cyl(0.025, 0.025, 1.1, 6), 0xa8744a, { y: -0.45 }); tb.add(M.box(0.24, 0.05, 0.2), 0x9aa3ad, { y: -1.0, z: 0.08 }); });
  tool('axe', tb => { tb.add(M.cyl(0.028, 0.028, 0.9, 6), 0xa8744a, { y: -0.35 }); tb.add(M.box(0.05, 0.24, 0.26), 0x9aa3ad, { y: -0.75, z: 0.12 }); });
  tool('hammer', tb => { tb.add(M.cyl(0.025, 0.025, 0.45, 6), 0xa8744a, { y: -0.18 }); tb.add(M.rbox(0.1, 0.1, 0.24, 0.02), 0x6d737b, { y: -0.42, z: 0.04 }); });
  tool('can', tb => { tb.add(M.cyl(0.13, 0.15, 0.24, 12), 0x5bb7e8, { y: -0.08, z: 0.12, rx: Math.PI / 2 }); tb.add(M.cyl(0.02, 0.035, 0.32, 6), 0x5bb7e8, { y: -0.08, z: 0.36, rx: 1.0 }); tb.add(M.tor(0.07, 0.015, 4, 10, Math.PI), 0x3d8bb5, { y: 0.02, z: 0.12 }); });
  const bk = new M.B(); bk.add(M.cyl(0.17, 0.13, 0.18, 10), 0xc98b58, { y: -0.04 }); bk.add(M.tor(0.15, 0.015, 4, 10, Math.PI), 0x8a5a36, { y: 0.04 }); for (let i = 0; i < 3; i++) bk.add(M.sph(0.06, 6, 4), [0xf07a22, 0xe53935, 0xffd23f][i], { x: (i - 1) * 0.07, y: 0.06 });
  const basket = bk.mesh(0); basket.position.y = -0.5; basket.visible = false; armL.add(basket); tools.basket = basket;
  g.userData = { body, legL, legR, armL, armR, tools };
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

function barTexture() {
  const c = document.createElement('canvas'); c.width = 160; c.height = 40;
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return { c, t, x: c.getContext('2d'), last: -1 };
}
function drawBar(bar, p, label) {
  const q = Math.round(p * 40) / 40; if (q === bar.last) return; bar.last = q;
  const x = bar.x; x.clearRect(0, 0, 160, 40);
  x.fillStyle = 'rgba(255,252,245,0.95)'; rr(x, 2, 2, 156, 36, 18); x.fill();
  x.fillStyle = '#efe2cf'; rr(x, 44, 12, 104, 16, 8); x.fill();
  const g = x.createLinearGradient(44, 0, 148, 0); g.addColorStop(0, '#9be067'); g.addColorStop(1, '#5cb83c');
  x.fillStyle = g; rr(x, 44, 12, Math.max(16, 104 * q), 16, 8); x.fill();
  x.font = '24px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 24, 21);
  bar.t.needsUpdate = true;
}
function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }

/* ---------------- construction site ---------------- */
function siteMesh(id, rot) {
  const g = new THREE.Group();
  const sb = new M.B();
  for (const [x, z] of [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]]) sb.add(M.cyl(0.04, 0.05, 1.6, 6), 0xd9a066, { x, y: 0.8, z });
  sb.add(M.box(1.7, 0.06, 0.1), 0xc98b58, { y: 1.2, z: 0.8 }); sb.add(M.box(1.7, 0.06, 0.1), 0xc98b58, { y: 0.5, z: -0.8, rz: 0.2 });
  sb.add(M.box(0.1, 0.06, 1.7), 0xc98b58, { x: 0.8, y: 1.0 }); sb.add(M.box(0.1, 0.06, 1.7), 0xc98b58, { x: -0.8, y: 0.7 });
  sb.add(M.rbox(0.5, 0.18, 0.3, 0.03), 0xb88b5c, { x: 0.65, y: 0.09, z: 0.65, ry: 0.4 }); sb.add(M.rbox(0.5, 0.18, 0.3, 0.03), 0xb88b5c, { x: 0.6, y: 0.27, z: 0.62, ry: 0.1 });
  sb.add(M.cone(0.12, 0.3, 8), 0xff8a3c, { x: -0.75, y: 0.15, z: 0.75 });
  g.add(sb.mesh(0.2));
  const ghost = M.decorMesh(id);
  ghost.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.55; } });
  ghost.rotation.y = rot * Math.PI / 2; ghost.scale.set(1, 0.05, 1);
  g.add(ghost); g.userData.ghost = ghost;
  return g;
}

/* ---------------- workers ---------------- */
export class Workers {
  constructor() {
    this.farmers = []; this.jobs = []; this.pickables = [];
    this.hired = new Set();
  }
  hire(id, quiet) {
    const h = HELPERS.find(x => x.id === id); if (!h || this.hired.has(id)) return false;
    if (!quiet) {
      if (h.lvl > G.level) { G.ui.toast('🔒 Locked', `${h.name} can be hired at level ${h.lvl}.`); return false; }
      if (!spend(h.cost)) { G.ui.toast('🪙 Not enough coins', `Hiring ${h.name} costs ${h.cost}.`); G.audio.play('nope'); return false; }
    }
    this.hired.add(id);
    const mesh = farmerMesh(h.look);
    const [hx, hz] = HOME[this.farmers.length % HOME.length];
    mesh.position.set(hx, 0, hz); mesh.rotation.y = Math.PI * 0.1;
    mesh.userData.tap = 'farmer'; mesh.userData.helper = h;
    G.scene.add(mesh); this.pickables.push(mesh);
    const bar = barTexture();
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: bar.t, transparent: true, depthWrite: false }));
    sprite.scale.set(1.9, 0.48, 1); sprite.visible = false; sprite.renderOrder = 6; G.scene.add(sprite);
    const f = { h, mesh, state: 'idle', path: [], job: null, t: 0, phase: Math.random() * 6, idleT: rand(1, 3), home: new THREE.Vector3(hx, 0, hz), bar, sprite, lastStrike: 0, speed: h.speed || 1 };
    this.farmers.push(f);
    if (!quiet) { G.fx.burst(mesh.position.clone().setY(1), 0xffd54f, 30, 3); G.ui.toast(`👨‍🌾 ${h.name} joined!`, 'More hands make the work go faster.'); G.audio.play('levelup'); G.cam.focus(mesh.position, 26); emit('hire'); }
    return f;
  }
  pending() { return this.jobs.length; }
  /* ---------- queueing ---------- */
  add(type, tile, opts = {}) {
    const job = { type, tile, by: null, t: 0, time: opts.time ?? JOB_TIME[type], created: G.time, ...opts };
    job.pos = opts.pos || new THREE.Vector3(tile.x, 0, tile.z);
    if (tile) tile.job = job;
    const icon = opts.icon || { till: '⛏️', water: '💧', harvest: '🧺', clear: '🪓', build: '🔨' }[type];
    if (icon && type !== 'clear') {
      job.marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: M.emojiTexture(icon, false), transparent: true, opacity: 0.9, depthWrite: false }));
      job.marker.scale.setScalar(type === 'build' ? 0.8 : 0.62); job.marker.position.set(job.pos.x, type === 'build' ? 2.1 : 0.95, job.pos.z); job.marker.renderOrder = 5;
      G.scene.add(job.marker);
    }
    this.jobs.push(job);
    emit('jobs');
    return job;
  }
  finish(job) {
    if (job.marker) G.scene.remove(job.marker);
    if (job.tile && job.tile.job === job) job.tile.job = null;
    this.jobs.splice(this.jobs.indexOf(job), 1);
    emit('jobs');
  }
  cancel(job) {
    if (job.by) { job.by.job = null; job.by.state = 'idle'; job.by.sprite.visible = false; }
    if (job.refund) earn(job.refund);
    job.onCancel?.();
    this.finish(job);
  }
  /* ---------- routing ---------- */
  route(from, to) {
    const a = inside(from.x, from.z), b = inside(to.x, to.z);
    if (a === b) return [to.clone()];
    const gate = GATES.reduce((best, g) => (from.distanceTo(g.out) + g.out.distanceTo(to) < from.distanceTo(best.out) + best.out.distanceTo(to) ? g : best), GATES[0]);
    return a ? [gate.in.clone(), gate.out.clone(), to.clone()] : [gate.out.clone(), gate.in.clone(), to.clone()];
  }
  standPoint(job, from) {
    const c = job.pos, d = new THREE.Vector3(from.x - c.x, 0, from.z - c.z);
    if (d.lengthSq() < 0.01) d.set(0, 0, 1);
    d.normalize().multiplyScalar(job.type === 'build' ? 1.25 : job.type === 'clear' ? 1.4 : 1.0);
    return c.clone().add(d);
  }
  assign(f) {
    let best = null, bd = 1e9;
    for (const j of this.jobs) {
      if (j.by) continue;
      // nearest first, but jobs that have waited a while jump the queue (so big jobs never starve)
      const d = j.pos.distanceTo(f.mesh.position) + (j.type === 'clear' ? 6 : 0) - (G.time - j.created) * 0.8;
      if (d < bd) { bd = d; best = j; }
    }
    if (!best) return false;
    best.by = f; f.job = best;
    const stand = this.standPoint(best, f.mesh.position);
    f.path = this.route(f.mesh.position, stand);
    f.state = 'walk';
    return true;
  }
  /* ---------- per frame ---------- */
  update(dt, t) {
    for (const f of this.farmers) this.updateFarmer(f, dt, t);
    for (const j of this.jobs) if (j.marker) j.marker.visible = !j.by || j.by.state !== 'work';
    for (const j of this.jobs) if (j.marker && !j.by) { j.marker.position.y = (j.type === 'build' ? 2.1 : 0.95) + Math.sin(t * 3 + j.pos.x) * 0.06; j.marker.material.opacity = 0.65 + Math.sin(t * 4 + j.pos.z) * 0.25; }
  }
  updateFarmer(f, dt, t) {
    const m = f.mesh, u = m.userData;
    if (f.state === 'idle' || f.state === 'stroll') { if (this.assign(f)) { } }
    let anim = 'stand';
    if (f.state === 'idle') {
      f.idleT -= dt;
      if (f.idleT < 0) { // potter around the yard
        const p = f.home.clone().add(new THREE.Vector3(rand(-2, 2), 0, rand(-1, 1)));
        f.path = this.route(m.position, p); f.state = 'stroll';
      }
    }
    if (f.state === 'walk' || f.state === 'stroll') {
      const target = f.path[0];
      if (!target) { f.state = f.state === 'walk' ? 'arrive' : 'idle'; f.idleT = rand(3, 7); }
      else {
        const d = new THREE.Vector3(target.x - m.position.x, 0, target.z - m.position.z), dist = d.length();
        const sp = (f.state === 'stroll' ? 1.6 : this.jobs.length > 5 ? 6.2 : 4.6) * f.speed;
        if (dist < 0.08) f.path.shift();
        else {
          const want = Math.atan2(d.x, d.z);
          m.rotation.y += angDiff(m.rotation.y, want) * Math.min(1, dt * 12);
          const step = Math.min(dist, sp * dt); m.position.x += d.x / dist * step; m.position.z += d.z / dist * step;
          f.phase += dt * sp * 2.4; anim = 'walk';
        }
      }
    }
    if (f.state === 'arrive') {
      const j = f.job;
      if (!j || !this.jobs.includes(j)) { f.state = 'idle'; f.job = null; }
      else if (j.check && !j.check()) { this.cancel(j); f.state = 'idle'; }
      else { f.state = 'work'; f.t = 0; f.sprite.visible = true; f.bar.last = -1; }
    }
    if (f.state === 'work') {
      const j = f.job;
      if (!j || !this.jobs.includes(j)) { f.state = 'idle'; f.job = null; f.sprite.visible = false; }
      else {
        m.rotation.y += angDiff(m.rotation.y, Math.atan2(j.pos.x - m.position.x, j.pos.z - m.position.z)) * Math.min(1, dt * 10);
        f.t += dt * f.speed;
        const p = Math.min(1, f.t / j.time);
        j.progress?.(p);
        drawBar(f.bar, p, j.label || { till: '⛏️', plant: CROPS[j.seed]?.icon || '🌱', water: '💧', harvest: '🧺', build: '🔨', clear: '🪓' }[j.type]);
        f.sprite.position.set(j.pos.x, j.type === 'clear' ? 3.2 : j.type === 'build' ? 2.9 : 2.2, j.pos.z);
        anim = { till: 'chop', clear: 'chop', plant: 'kneel', harvest: 'kneel', water: 'water', build: 'hammer' }[j.type];
        if (p >= 1) {
          f.sprite.visible = false; f.job = null; f.state = 'idle'; f.idleT = rand(1, 2.5);
          this.finish(j);
          j.done();
        }
      }
    }
    this.animate(f, anim, dt, t);
  }
  animate(f, anim, dt, t) {
    const u = f.mesh.userData, T = u.tools;
    for (const k in T) T[k].visible = false;
    const lerpTo = (o, v) => { o.rotation.x += (v - o.rotation.x) * Math.min(1, dt * 14); };
    let bodyY = 0, lean = 0, aL = 0, aR = 0, lL = 0, lR = 0;
    if (anim === 'walk') { const s = Math.sin(f.phase); lL = s * 0.7; lR = -s * 0.7; aL = -s * 0.55; aR = s * 0.55; bodyY = Math.abs(Math.cos(f.phase)) * 0.05; }
    else if (anim === 'stand') { aL = Math.sin(t * 1.3 + f.phase) * 0.05; aR = -aL; bodyY = Math.sin(t * 2 + f.phase) * 0.01; }
    else if (anim === 'chop') {
      T[f.job?.type === 'clear' ? 'axe' : 'hoe'].visible = true;
      f.phase += dt * 1.9; const p = f.phase % 1;
      const a = p < 0.62 ? -0.9 - (p / 0.62) * 1.9 : -2.8 + ((p - 0.62) / 0.38) * 2.1;
      aR = a; aL = a * 0.9; lean = p < 0.62 ? -0.1 : 0.2; lL = 0.25; lR = -0.15;
      u.armR.rotation.x = a; u.armL.rotation.x = a * 0.9;
      if (p > 0.95 && f.lastStrike !== Math.floor(f.phase)) { f.lastStrike = Math.floor(f.phase); this.strike(f, f.job?.type === 'clear' ? 0x8a5a36 : 0xa8744a, f.job?.type === 'clear' ? 'chop' : 'dig'); }
    }
    else if (anim === 'kneel') {
      T.basket.visible = f.job?.type === 'harvest';
      f.phase += dt * 3; bodyY = -0.2; lean = 0.45; lL = -0.6; lR = -0.25;
      aR = -1.0 + Math.sin(f.phase) * 0.35; aL = f.job?.type === 'harvest' ? -0.5 : -1.0 - Math.sin(f.phase) * 0.35;
    }
    else if (anim === 'water') {
      T.can.visible = true; aR = -1.25 + Math.sin(t * 3) * 0.05; aL = -0.2; lean = 0.08;
      f.drip = (f.drip || 0) + dt; if (f.drip > 0.06) { f.drip = 0; const tip = new THREE.Vector3(0, -0.56, 0.38); T.can.localToWorld(tip); G.fx.burst(tip, 0x6fc8ff, 2, 0.4, -9); }
    }
    else if (anim === 'hammer') {
      T.hammer.visible = true; f.phase += dt * 2.6; const p = f.phase % 1;
      aR = p < 0.6 ? -1.0 - (p / 0.6) * 1.5 : -2.5 + ((p - 0.6) / 0.4) * 1.7; aL = -0.7; lean = 0.15; bodyY = -0.05;
      if (p > 0.95 && f.lastStrike !== Math.floor(f.phase)) { f.lastStrike = Math.floor(f.phase); this.strike(f, 0xd9a066, 'tok'); }
    }
    if (anim !== 'chop') { lerpTo(u.armR, aR); lerpTo(u.armL, aL); }
    lerpTo(u.legL, lL); lerpTo(u.legR, lR);
    u.body.position.y += (bodyY - u.body.position.y) * Math.min(1, dt * 12);
    u.body.rotation.x += (lean - u.body.rotation.x) * Math.min(1, dt * 10);
    u.legL.position.y = u.legR.position.y = 0.62 + Math.min(0, u.body.position.y);
  }
  strike(f, color, sound) {
    const j = f.job; if (!j) return;
    const p = j.type === 'clear' ? f.mesh.position.clone().lerp(j.pos, 0.5) : j.pos.clone();
    G.fx.burst(p.setY(0.3), color, 5, 1.4);
    // only play sounds for work that's on screen-ish to avoid a racket
    if (G.cam.target.distanceTo(f.mesh.position) < 34) G.audio.play(sound);
  }
  tapFarmer(mesh) {
    const f = this.farmers.find(x => x.mesh === mesh); if (!f) return;
    G.ui.hearts(mesh.position.clone().setY(2), 3);
    const lines = ['Howdy! 🤠', 'Lovely day for farming!', 'Got any jobs for me?', 'Those crops look tasty!', 'Yee-haw! 🌾'];
    G.ui.floatText(f.job ? 'Working on it! 💪' : lines[Math.floor(Math.random() * lines.length)], mesh.position.clone().setY(2.4), '#5a3e2b', 1.8, 18);
    G.audio.play('boop');
  }
}
function angDiff(a, b) { return ((b - a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; }
export { siteMesh };
