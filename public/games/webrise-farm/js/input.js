// Camera rig (isometric-style orbit) + unified mouse/touch/keyboard input.
import * as THREE from 'three';
import { G, clamp, damp } from './game.js';

export class CameraRig {
  constructor(camera) {
    this.camera = camera;
    this.target = new THREE.Vector3(0, 0, 3); this.tTarget = this.target.clone();
    this.yaw = Math.PI / 4; this.tYaw = this.yaw;
    this.pitch = 0.88; this.tPitch = this.pitch;
    this.dist = 46; this.tDist = this.dist;
    this.minD = 12; this.maxD = 80;
    this.shake = 0;
  }
  focus(p, dist) { this.tTarget.set(p.x, 0, p.z); if (dist) this.tDist = dist; }
  set({ target, yaw, pitch, dist }, snap = false) {
    if (target) this.tTarget.copy(target); if (yaw !== undefined) this.tYaw = yaw; if (pitch !== undefined) this.tPitch = pitch; if (dist !== undefined) this.tDist = dist;
    if (snap) { this.target.copy(this.tTarget); this.yaw = this.tYaw; this.pitch = this.tPitch; this.dist = this.tDist; }
  }
  update(dt) {
    this.tDist = clamp(this.tDist, this.minD, this.maxD);
    this.tPitch = clamp(this.tPitch, 0.18, 1.35);
    this.tTarget.x = clamp(this.tTarget.x, -36, 36); this.tTarget.z = clamp(this.tTarget.z, -28, 26);
    this.target.x = damp(this.target.x, this.tTarget.x, 10, dt); this.target.z = damp(this.target.z, this.tTarget.z, 10, dt); this.target.y = damp(this.target.y, this.tTarget.y, 10, dt);
    this.yaw = damp(this.yaw, this.tYaw, 10, dt); this.pitch = damp(this.pitch, this.tPitch, 10, dt); this.dist = damp(this.dist, this.tDist, 9, dt);
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    this.camera.position.set(this.target.x + Math.sin(this.yaw) * cp * this.dist, this.target.y + sp * this.dist, this.target.z + Math.cos(this.yaw) * cp * this.dist);
    this.camera.lookAt(this.target.x, this.target.y + 0.5, this.target.z);
  }
}

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hitP = new THREE.Vector3();
export function groundPoint(x, y, out = new THREE.Vector3()) {
  const r = G.renderer.domElement.getBoundingClientRect();
  ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, G.camera);
  return ray.ray.intersectPlane(plane, out) ? out : null;
}
function pickObject(x, y) {
  const r = G.renderer.domElement.getBoundingClientRect();
  ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, G.camera);
  const list = [...G.world.pickables, ...G.animals.pickables, ...G.workers.pickables];
  const hits = ray.intersectObjects(list, true);
  for (const h of hits) { let o = h.object; while (o && !o.userData.tap) o = o.parent; if (o) return o; }
  return null;
}

const PAINT = new Set(['hand', 'hoe', 'seed', 'water', 'harvest']);

export class Input {
  constructor() {
    this.el = G.renderer.domElement;
    this.ptrs = new Map();
    this.g = null;          // current gesture
    this.keys = {};
    const el = this.el;
    el.addEventListener('pointerdown', e => this.down(e));
    el.addEventListener('pointermove', e => this.move(e));
    el.addEventListener('pointerup', e => this.up(e));
    el.addEventListener('pointercancel', e => this.up(e, true));
    el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !this.ptrs.size) G.farm.highlight(null); });
    el.addEventListener('wheel', e => { e.preventDefault(); if (G.mode === 'title') return; G.cam.tDist *= Math.exp(e.deltaY * 0.0012); }, { passive: false });
    el.addEventListener('contextmenu', e => e.preventDefault());
    addEventListener('keydown', e => this.key(e, true));
    addEventListener('keyup', e => this.key(e, false));
    addEventListener('blur', () => { this.keys = {}; });
  }
  active() { return G.mode === 'play' || G.mode === 'photo'; }
  down(e) {
    if (!this.active()) return;
    this.el.setPointerCapture(e.pointerId);
    this.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, btn: e.button, type: e.pointerType });
    G.audio.unlock();
    if (this.ptrs.size === 2) { this.startMulti(); return; }
    if (this.ptrs.size > 2) return;
    const gp = groundPoint(e.clientX, e.clientY);
    const tile = gp ? G.farm.tileAt(gp.x, gp.z) : null;
    const rotateBtn = e.pointerType === 'mouse' && (e.button === 2 || e.button === 1);
    this.g = { kind: rotateBtn ? 'rotate' : 'pending', tile, moved: false, painted: new Set(), last: gp ? gp.clone() : null, t0: performance.now() };
    if (rotateBtn || G.mode === 'photo') { if (G.mode === 'photo' && !rotateBtn) this.g.kind = 'pan'; return; }
    if (G.farm.placing) { this.g.kind = 'place'; G.farm.moveGhost(tile); return; }
    // start painting immediately when pressing on a surface the tool works on
    if (PAINT.has(G.tool) && tile && this.paintable(G.tool, tile) && !pickObject(e.clientX, e.clientY)) {
      this.g.kind = 'paint';
      this.paintTile(tile, true);
    }
  }
  paintable(tool, t) {
    if (G.farm.isLocked(t)) return false;
    if (tool === 'hoe') return t.type === 'grass' && !t.decor;
    return t.type === 'soil';
  }
  paintTile(t, first) {
    if (!t || this.g.painted.has(t)) return;
    this.g.painted.add(t);
    const ok = G.farm.apply(G.tool, t, first);
    if (ok) this.g.didPaint = true;
    if (G.tool === 'hand' && !ok && first && t.crop && t.stage < 3 && t.wet > 0) { /* timer shown */ }
  }
  move(e) {
    if (!this.active()) return;
    const p = this.ptrs.get(e.pointerId);
    if (!p) { if (e.pointerType === 'mouse') this.hover(e); return; }
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (this.ptrs.size >= 2) { this.multi(); return; }
    const g = this.g; if (!g) return;
    if (Math.hypot(p.x - p.sx, p.y - p.sy) > (p.type === 'mouse' ? 5 : 10)) g.moved = true;
    if (g.kind === 'rotate') { G.cam.tYaw -= dx * 0.006; G.cam.tPitch += dy * 0.004; return; }
    if (g.kind === 'place') { const gp = groundPoint(e.clientX, e.clientY); G.farm.moveGhost(gp ? G.farm.tileAt(gp.x, gp.z) : null); return; }
    if (g.kind === 'paint') {
      const gp = groundPoint(e.clientX, e.clientY); if (!gp) return;
      // sample along the drag so fast swipes don't skip tiles
      const from = g.last || gp, steps = Math.ceil(from.distanceTo(gp) / 0.6) || 1;
      for (let i = 1; i <= steps; i++) { const q = from.clone().lerp(gp, i / steps); const t = G.farm.tileAt(q.x, q.z); if (t && this.paintable(G.tool, t)) this.paintTile(t, false); }
      g.last = gp.clone();
      const t = G.farm.tileAt(gp.x, gp.z); G.farm.highlight(t, t && this.paintable(G.tool, t));
      return;
    }
    if (g.kind === 'pending' && g.moved) g.kind = 'pan';
    if (g.kind === 'pan') this.panBy(p.x - dx, p.y - dy, p.x, p.y);
  }
  panBy(x0, y0, x1, y1) {
    const a = groundPoint(x0, y0), b = groundPoint(x1, y1, hitP);
    if (a && b) { G.cam.tTarget.x -= b.x - a.x; G.cam.tTarget.z -= b.z - a.z; G.cam.target.x -= b.x - a.x; G.cam.target.z -= b.z - a.z; }
  }
  up(e, cancel) {
    const p = this.ptrs.get(e.pointerId); if (!p) return;
    this.ptrs.delete(e.pointerId);
    if (this.ptrs.size >= 1) { this.g = null; if (this.ptrs.size === 1) this.mt = null; return; }
    const g = this.g; this.g = null; this.mt = null;
    if (!g || cancel) return;
    if (g.kind === 'place') { const gp = groundPoint(e.clientX, e.clientY); const t = gp ? G.farm.tileAt(gp.x, gp.z) : null; if (t) G.farm.confirmPlace(t); return; }
    if (g.kind === 'paint') { if (p.type !== 'mouse') G.farm.highlight(null); return; }
    if (g.kind === 'pending' && !g.moved && G.mode === 'play') this.tap(e.clientX, e.clientY, g.tile);
    if (G.mode === 'photo' && !g.moved) G.photo?.tapScene();
  }
  tap(x, y, tile) {
    const o = pickObject(x, y);
    if (o) {
      const k = o.userData.tap;
      if (k === 'animal') G.animals.tap(o.userData.animal);
      else if (k === 'dog') G.animals.petDog();
      else if (k === 'farmer') G.workers.tapFarmer(o);
      else if (k === 'trough') G.animals.tapPen(o.userData.tapData);
      else if (k === 'kitchen') { if (!G.kitchen.collect()) G.ui.openKitchen(); }
      else if (k === 'barn') G.ui.openBarn();
      else if (k === 'market') G.ui.openBarn();
      else if (k === 'orders') G.ui.openOrders();
      else if (k === 'house') G.ui.openFarmInfo();
      G.audio.play('click');
      return;
    }
    if (tile) G.farm.apply(G.tool, tile, true);
  }
  hover(e) {
    if (G.mode !== 'play') return;
    const gp = groundPoint(e.clientX, e.clientY);
    const t = gp ? G.farm.tileAt(gp.x, gp.z) : null;
    if (G.farm.placing) { G.farm.moveGhost(t); return; }
    const o = t ? null : pickObject(e.clientX, e.clientY);
    this.el.style.cursor = o ? 'pointer' : 'default';
    if (!t) { G.farm.highlight(null); return; }
    let ok = true;
    if (G.tool === 'hoe') ok = G.farm.canTill(t);
    else if (G.tool === 'seed') ok = t.type === 'soil' && !t.crop;
    else if (G.tool === 'water') ok = !!t.crop && t.stage < 3 && t.wet <= 0;
    else if (G.tool === 'harvest') ok = t.stage === 3;
    else if (G.tool === 'hand') ok = (t.type === 'soil' && !t.job) || !!t.decor || G.farm.isLocked(t);
    else if (G.tool === 'edit') ok = !!t.decor || t.type === 'soil';
    G.farm.highlight(t, ok);
    this.el.style.cursor = ok ? 'pointer' : 'default';
  }
  startMulti() {
    const [a, b] = [...this.ptrs.values()];
    if (this.g?.kind === 'paint') { G.farm.highlight(null); }
    this.g = null;
    this.mt = { d: Math.hypot(a.x - b.x, a.y - b.y), ang: Math.atan2(b.y - a.y, b.x - a.x), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
  }
  multi() {
    const [a, b] = [...this.ptrs.values()]; const m = this.mt; if (!m) return this.startMulti();
    const d = Math.hypot(a.x - b.x, a.y - b.y), ang = Math.atan2(b.y - a.y, b.x - a.x), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    G.cam.tDist *= m.d / Math.max(10, d);
    let da = ang - m.ang; if (da > Math.PI) da -= Math.PI * 2; if (da < -Math.PI) da += Math.PI * 2;
    G.cam.tYaw -= da;
    this.panBy(m.mx, m.my, mx, my);
    Object.assign(m, { d, ang, mx, my });
  }
  key(e, down) {
    const k = e.code; this.keys[k] = down;
    if (!down || e.repeat) return;
    if (G.mode === 'title') return;
    if (document.activeElement?.tagName === 'INPUT') return;
    if (k === 'Escape') { if (G.farm.placing) G.farm.cancelPlace(); else if (G.mode === 'photo') G.photo.exit(); else G.ui.closeAll(); }
    if (G.mode !== 'play') return;
    if (k === 'KeyR') { if (G.farm.placing) G.farm.rotateGhost(); }
    const tools = { Digit1: 'hand', Digit2: 'hoe', Digit3: 'seed', Digit4: 'water', Digit5: 'harvest', Digit6: 'edit' };
    if (tools[k]) G.ui.setTool(tools[k]);
    if (k === 'KeyP') G.photo.enter();
    if (k === 'KeyB') G.ui.openBarn();
    if (k === 'KeyO') G.ui.openOrders();
    if (k === 'KeyM') G.ui.openShop();
  }
  update(dt) {
    if (!this.active() || document.activeElement?.tagName === 'INPUT') return;
    const k = this.keys, sp = G.cam.dist * 0.9 * dt;
    let fx = 0, fz = 0;
    if (k.KeyW || k.ArrowUp) fz -= 1; if (k.KeyS || k.ArrowDown) fz += 1; if (k.KeyA || k.ArrowLeft) fx -= 1; if (k.KeyD || k.ArrowRight) fx += 1;
    if (fx || fz) { const y = G.cam.yaw; G.cam.tTarget.x += (Math.cos(y) * fx + Math.sin(y) * fz) * sp; G.cam.tTarget.z += (-Math.sin(y) * fx + Math.cos(y) * fz) * sp; }
    if (k.KeyQ) G.cam.tYaw += dt * 1.6; if (k.KeyE) G.cam.tYaw -= dt * 1.6;
    if (k.Equal || k.NumpadAdd) G.cam.tDist *= 1 - dt; if (k.Minus || k.NumpadSubtract) G.cam.tDist *= 1 + dt;
  }
}
