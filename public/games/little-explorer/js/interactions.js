// One reusable interaction architecture + every activity, animal and NPC in the village.
import * as THREE from 'three';
import { G, clamp, damp, angleDamp, lerp, rand, terrainHeight as H, groundAt, resolve, isWater, POND, WATER_Y } from './state.js';
import { LOC } from './world.js';
import { makeItemMesh } from './collectibles.js';

/* ================================================================== */
/*  Registry                                                           */
/* ================================================================== */
export class Interactions {
  constructor() { this.list = []; this.current = null; this.acc = 0; }
  // { id, pos: Vector3 | () => Vector3, radius, text: string | fn, action: fn, enabled?: fn, room?: bool, state?: {} }
  add(o) { o.state = o.state || {}; o.room = !!o.room; this.list.push(o); return o; }
  posOf(o) { return typeof o.pos === 'function' ? o.pos() : o.pos; }
  update(dt) {
    const p = G.player;
    if (G.mode !== 'play') { G.ui.prompt(null); return; }
    // while riding / sitting, E always exits
    if (p.mount) {
      G.ui.prompt(p.mount.exitText || 'Stop');
      if (G.pressed.KeyE && p.mount.canExit !== false) p.mount.exit();
      return;
    }
    this.acc += dt;
    if (this.acc > 0.08) {
      this.acc = 0;
      let best = null, bd = 1e9;
      for (const o of this.list) {
        if (o.room !== G.inRoom) continue;
        if (o.enabled && !o.enabled()) continue;
        const q = this.posOf(o);
        const d = Math.hypot(q.x - p.pos.x, q.z - p.pos.z);
        if (d > o.radius || Math.abs(q.y - p.pos.y) > 3.2) continue;
        const score = d - (o.priority || 0);
        if (score < bd) { bd = score; best = o; }
      }
      this.current = best;
    }
    const c = this.current;
    G.ui.prompt(c ? (typeof c.text === 'function' ? c.text() : c.text) : null);
    if (c && G.pressed.KeyE && !p.oneShot) { c.action(c); this.acc = 1; }
  }
}

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */
const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, ...o });
function shadow(o) { o.traverse(m => { if (m.isMesh) m.castShadow = true; }); return o; }
function hearts(pos, n = 5) { G.ui.hearts(pos, n); }
const tmp = new THREE.Vector3();

/* ================================================================== */
/*  Vehicles                                                           */
/* ================================================================== */
function makeBike() {
  const g = new THREE.Group();
  const frameM = M(0x7cc8ff, { metalness: 0.3, roughness: 0.4 }), tireM = M(0x3c3452), seatM = M(0xff8fb8);
  for (const z of [-0.52, 0.52]) {
    const w = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.045, 8, 24), tireM); w.rotation.y = Math.PI / 2; w.position.set(0, 0.35, z); g.add(w);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.1, 6), frameM); hub.rotation.z = Math.PI / 2; hub.position.set(0, 0.35, z); g.add(hub);
  }
  const bar = (a, b, r = 0.03) => { const v = new THREE.Vector3().subVectors(b, a); const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, v.length(), 6), frameM); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize()); g.add(m); };
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  bar(V(0, 0.35, -0.52), V(0, 0.8, -0.1)); bar(V(0, 0.8, -0.1), V(0, 0.82, 0.38)); bar(V(0, 0.35, 0.52), V(0, 0.95, 0.4)); bar(V(0, 0.45, 0.0), V(0, 0.82, 0.38)); bar(V(0, 0.35, -0.52), V(0, 0.45, 0));
  const hb = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 6), frameM); hb.rotation.z = Math.PI / 2; hb.position.set(0, 0.97, 0.42); g.add(hb);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.28), seatM); seat.position.set(0, 0.86, -0.12); g.add(seat);
  const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.18, 10, 1, true), M(0xd9a066, { side: THREE.DoubleSide })); basket.position.set(0, 0.92, 0.62); g.add(basket);
  return shadow(g);
}
function makeScooter() {
  const g = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.8), M(0xffd66b)); deck.position.y = 0.12; g.add(deck);
  for (const z of [-0.36, 0.36]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.05, 12), M(0x3c3452)); w.rotation.z = Math.PI / 2; w.position.set(0, 0.09, z); g.add(w); }
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.95, 6), M(0xb9b2c9, { metalness: 0.5 })); pole.position.set(0, 0.6, 0.38); pole.rotation.x = -0.12; g.add(pole);
  const hb = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.45, 6), M(0xff8fb8)); hb.rotation.z = Math.PI / 2; hb.position.set(0, 1.06, 0.33); g.add(hb);
  return shadow(g);
}
function makeSkate() {
  const g = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.82), M(0xb28dff)); deck.position.y = 0.1; g.add(deck);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.245, 0.042, 0.12), M(0xffffff)); stripe.position.y = 0.1; g.add(stripe);
  for (const z of [-0.28, 0.28]) for (const x of [-0.1, 0.1]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 10), M(0xffd66b)); w.rotation.z = Math.PI / 2; w.position.set(x, 0.04, z); g.add(w); }
  return shadow(g);
}

class Vehicle {
  constructor({ name, mesh, at, rot, speed, accel, decel, turn, anim, riseY, camH, lean, verb }) {
    Object.assign(this, { name, mesh, speed, accel, decel, turn, anim, riseY, camH, verb });
    this.leanAmt = lean; this.home = { x: at.x, z: at.z, rot };
    this.radius = 0.45; this.exitText = 'Get Off'; this.noJump = false;
    this.park(at.x, at.z, rot);
    G.inter.add({ id: 'ride-' + name, pos: () => this.mesh.position, radius: 1.8, enabled: () => !this.ridden, text: `${verb} ${name}`, action: () => this.mountOn() });
  }
  park(x, z, rot) {
    G.scene.add(this.mesh);
    this.mesh.position.set(x, groundAt(x, z), z); this.mesh.rotation.set(0, rot, 0); this.ridden = false;
  }
  mountOn() {
    const p = G.player; this.ridden = true;
    p.teleportSoft(this.mesh.position.x, this.mesh.position.z, this.mesh.rotation.y);
    p.char.offset.add(this.mesh); this.mesh.position.set(0, -this.riseY, 0); this.mesh.rotation.set(0, 0, 0);
    p.char.offset.position.y = this.riseY;
    p.mount = this;
    G.ui.toast('', `${this.verb === 'Ride' ? '🚲' : '🛹'} ${this.name} — hold SHIFT to go faster`, 2.5, true);
    G.audio?.play('click');
  }
  lean(dt, hs) {
    const p = G.player;
    const turnRate = ((p.yaw - (this._py ?? p.yaw) + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    this._py = p.yaw;
    this._lean = damp(this._lean || 0, clamp(-turnRate / Math.max(dt, 1e-3) * 0.06 * this.leanAmt, -0.35, 0.35) * Math.min(1, hs / 3), 6, dt);
    p.char.offset.rotation.z = this._lean;
    if (this.name === 'Bicycle') { this.mesh.children.forEach((c, i) => { if (i < 4 && c.geometry?.type === 'TorusGeometry') c.rotation.x += hs * dt / 0.33; }); }
  }
  exit() {
    const p = G.player;
    p.mount = null; p.char.offset.position.set(0, 0, 0); p.char.offset.rotation.set(0, 0, 0);
    const x = p.pos.x, z = p.pos.z, r = p.yaw;
    p.char.offset.remove(this.mesh);
    this.park(x, z, r);
    // step off to the side
    p.pos.x += Math.cos(r) * 0.9; p.pos.z -= Math.sin(r) * 0.9;
    resolve(p.pos, 0.35, p.pos.y);
    p.vel.set(0, 0, 0);
  }
}

/* ================================================================== */
/*  Activities                                                         */
/* ================================================================== */
export function setupActivities() {
  const W = G.world, P = G.player;

  // player helper: move without resetting camera
  P.teleportSoft = (x, z, yaw) => { P.pos.set(x, groundAt(x, z, 99), z); P.vel.set(0, 0, 0); P.vy = 0; P.yaw = yaw; P.root.rotation.y = yaw; };

  // ---- vehicles
  new Vehicle({ name: 'Bicycle', mesh: makeBike(), at: LOC.bike, rot: 0.9, speed: 10.5, accel: 3.2, decel: 2.2, turn: 3.6, anim: 'sit', riseY: 0.2, camH: 1.7, lean: 1, verb: 'Ride' });
  new Vehicle({ name: 'Scooter', mesh: makeScooter(), at: LOC.scooter, rot: 0.5, speed: 8.2, accel: 4, decel: 2.6, turn: 5, anim: 'idle', riseY: 0.15, camH: 1.6, lean: 0.7, verb: 'Ride' });
  new Vehicle({ name: 'Skateboard', mesh: makeSkate(), at: LOC.skate, rot: -0.4, speed: 7.6, accel: 3.6, decel: 1.4, turn: 4.2, anim: 'idle', riseY: 0.12, camH: 1.55, lean: 1.3, verb: 'Ride' });

  // ---- football
  const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 1), new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, roughness: 0.5, vertexColors: true }));
  { // paint patches
    const g = ball.geometry, n = g.attributes.position.count, col = new Float32Array(n * 3);
    for (let i = 0; i < n; i += 3) { const dark = (i / 3) % 4 === 0; for (let k = 0; k < 3; k++) { col[(i + k) * 3] = dark ? 0.22 : 1; col[(i + k) * 3 + 1] = dark ? 0.2 : 1; col[(i + k) * 3 + 2] = dark ? 0.3 : 1; } }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  }
  ball.castShadow = true; G.scene.add(ball);
  const B = { m: ball, v: new THREE.Vector3(), home: new THREE.Vector3(LOC.ball.x, 0, LOC.ball.z), r: 0.24, goalCd: 0 };
  const resetBall = () => { ball.position.set(B.home.x, H(B.home.x, B.home.z) + 0.24, B.home.z); B.v.set(0, 0, 0); };
  resetBall();
  G.inter.add({ id: 'ball', pos: () => ball.position, radius: 1.6, text: 'Kick Ball', action: () => {
    const f = new THREE.Vector3(Math.sin(P.yaw), 0, Math.cos(P.yaw));
    const run = Math.hypot(P.vel.x, P.vel.z);
    B.v.set(f.x * (9 + run), 3.5 + Math.random() * 1.5, f.z * (9 + run));
    P.playOnce('pickup', 0.35); G.audio?.play('kick');
  } });
  G.updaters.push((dt) => {
    if (G.inRoom) return;
    const p = ball.position;
    B.v.y -= 20 * dt; p.addScaledVector(B.v, dt);
    const g = groundAt(p.x, p.z, p.y) + B.r;
    if (p.y < g) { p.y = g; if (B.v.y < -1.5) B.v.y *= -0.45; else B.v.y = 0; B.v.x *= Math.pow(0.35, dt); B.v.z *= Math.pow(0.35, dt); }
    const before = p.clone();
    resolve(p, B.r, p.y - B.r, 0.5);
    if (before.distanceToSquared(p) > 1e-6) { const n = p.clone().sub(before).setY(0).normalize(); const vn = B.v.dot(n); if (vn < 0) B.v.addScaledVector(n, -1.6 * vn); }
    // player dribble
    const dx = p.x - P.pos.x, dz = p.z - P.pos.z, d = Math.hypot(dx, dz);
    if (d < 0.62 && d > 0.01 && p.y < P.pos.y + 0.6) { p.x = P.pos.x + dx / d * 0.62; p.z = P.pos.z + dz / d * 0.62; const hs = Math.hypot(P.vel.x, P.vel.z); B.v.x += dx / d * hs * 0.9; B.v.z += dz / d * hs * 0.9; }
    // roll visual
    const hv = Math.hypot(B.v.x, B.v.z); if (hv > 0.01) { tmp.set(B.v.z, 0, -B.v.x).normalize(); ball.rotateOnWorldAxis(tmp, hv * dt / B.r); }
    // goal!
    B.goalCd -= dt;
    const gl = W.goal; const lx = (p.x - gl.x) * Math.cos(gl.rot) - (p.z - gl.z) * Math.sin(gl.rot), lz = (p.x - gl.x) * Math.sin(gl.rot) + (p.z - gl.z) * Math.cos(gl.rot);
    if (B.goalCd < 0 && Math.abs(lx) < 1.7 && lz > 0.1 && lz < 0.9 && p.y < H(gl.x, gl.z) + 1.8) { B.goalCd = 3; G.ui.floatText('GOAL! ⚽', p.clone().setY(p.y + 1.5), '#ffb030'); G.audio?.play('goal'); B.v.multiplyScalar(0.2); }
    if (Math.hypot(p.x, p.z) > 84 || isWater(p.x, p.z) || p.y < -10) resetBall();
  });

  // ---- kite
  const kite = new THREE.Group();
  const kshape = new THREE.Shape(); kshape.moveTo(0, 0.7); kshape.lineTo(0.45, 0); kshape.lineTo(0, -0.9); kshape.lineTo(-0.45, 0); kshape.closePath();
  const kmesh = new THREE.Mesh(new THREE.ShapeGeometry(kshape), M(0xff8fb8, { side: THREE.DoubleSide })); kite.add(kmesh);
  const kcross = new THREE.Mesh(new THREE.ShapeGeometry((() => { const s = new THREE.Shape(); s.moveTo(0, 0.7); s.lineTo(0.45, 0); s.lineTo(0, 0); s.closePath(); return s; })()), M(0xffd66b, { side: THREE.DoubleSide })); kcross.position.z = 0.01; kite.add(kcross);
  const tailPts = []; for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 3), M([0x7cc8ff, 0xffd66b, 0xb28dff][i % 3])); kite.add(b); tailPts.push(b); }
  kite.visible = false; G.scene.add(kite);
  const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  const kline = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })); kline.frustumCulled = false; kline.visible = false; G.scene.add(kline);
  const kiteStand = new THREE.Group(); kiteStand.add(kmesh.clone()); kiteStand.scale.setScalar(0.6); kiteStand.position.set(LOC.kite.x + 0.4, H(LOC.kite.x, LOC.kite.z) + 1.8, LOC.kite.z); kiteStand.rotation.z = 0.3; G.scene.add(kiteStand);
  const kitePos = new THREE.Vector3();
  const kiteMode = {
    name: 'kite', speed: 2.2, accel: 8, decel: 10, turn: 8, anim: null, noJump: true, exitText: 'Stop Flying Kite', radius: 0.35, t: 0,
    update(dt) {
      this.t += dt;
      const wind = new THREE.Vector3(Math.sin(this.t * 0.3) * 3, 0, -1);
      const target = new THREE.Vector3(P.pos.x - Math.sin(P.yaw) * 7 + wind.x, P.pos.y + 12 + Math.sin(this.t * 0.8) * 1.2, P.pos.z - Math.cos(P.yaw) * 7 - 3);
      kitePos.lerp(target, 1 - Math.exp(-1.5 * dt));
      kite.position.copy(kitePos); kite.lookAt(P.pos.x, P.pos.y + 1.2, P.pos.z); kite.rotateZ(Math.sin(this.t * 1.7) * 0.25);
      tailPts.forEach((b, i) => { b.position.set(Math.sin(this.t * 3 + i) * 0.12 * i, -0.9 - i * 0.28, 0); b.rotation.z = Math.sin(this.t * 3 + i) * 0.5; });
      const hand = P.handWorld(tmp);
      const pa = lineGeo.attributes.position; pa.setXYZ(0, hand.x, hand.y, hand.z); pa.setXYZ(1, kitePos.x, kitePos.y - 0.1, kitePos.z); pa.needsUpdate = true;
    },
    exit() { P.mount = null; kite.visible = false; kline.visible = false; kiteStand.visible = true; },
  };
  G.inter.add({ id: 'kite', pos: kiteStand.position.clone().setY(H(LOC.kite.x, LOC.kite.z)), radius: 2.4, text: 'Fly Kite', action: () => {
    kitePos.set(P.pos.x, P.pos.y + 3, P.pos.z); kite.visible = true; kline.visible = true; kiteStand.visible = false; kiteMode.t = 0; P.mount = kiteMode;
    G.ui.toast('', '🪁 Up it goes! Walk around slowly to steer.', 2.5, true);
  } });

  // ---- swing
  const swingSeat = W.swingSeats[0];
  const swingMode = {
    override: true, exitText: 'Get Off Swing', t: 0, amp: 0,
    update(dt, inp) {
      this.t += dt; this.amp = Math.min(0.75, this.amp + dt * 0.18 + (inp.len > 0 ? dt * 0.2 : 0));
      const a = Math.sin(this.t * 2.05) * this.amp;
      swingSeat.rotation.x = a;
      swingSeat.updateMatrixWorld(true);
      const seatW = new THREE.Vector3(0, -2.32, 0.05).applyMatrix4(swingSeat.matrixWorld);
      P.pos.copy(seatW); P.pos.y -= P.sitHip;
      P.yaw = W.swingSet.rotation.y; P.root.rotation.set(a, P.yaw, 0, 'YXZ');
      P.anim.play('sit', 0.35);
    },
    exit() { P.mount = null; swingSeat.rotation.x = 0; P.root.rotation.set(0, P.yaw, 0); P.teleportSoft(LOC.swing.x - 0.75, LOC.swing.z + 1.2, P.yaw); },
  };
  G.inter.add({ id: 'swing', pos: new THREE.Vector3(LOC.swing.x - 0.75, H(LOC.swing.x, LOC.swing.z), LOC.swing.z), radius: 1.9, text: 'Use Swing', action: () => { swingMode.t = 0; swingMode.amp = 0.1; P.mount = swingMode; } });

  // ---- slide (scripted)
  const slideMode = {
    override: true, exitText: 'Wheee!', canExit: false, t: 0,
    update(dt) {
      this.t += dt;
      const sg = W.slide; sg.updateMatrixWorld(true);
      const base = new THREE.Vector3(LOC.slide.x, H(LOC.slide.x, LOC.slide.z), LOC.slide.z);
      if (this.t < 1.1) {           // climb the ladder
        const k = this.t / 1.1;
        P.pos.set(base.x - 2.6, base.y + k * 2.5, base.z); P.yaw = Math.PI / 2; P.anim.play('walk', 0.2);
      } else if (this.t < 1.5) {    // step onto platform
        const k = (this.t - 1.1) / 0.4; P.pos.set(base.x - 2.6 + k * 1.3, base.y + 2.56, base.z); P.anim.play('idle', 0.2);
      } else {
        const k = Math.min(1, (this.t - 1.5) / 1.3), e = k * k * (3 - 2 * k) * 0.3 + k * 0.7;
        const c = W.slideCurve.getPointAt(Math.min(1, e));
        P.pos.set(base.x + c.x, base.y + c.y + 0.36, base.z + c.z); P.anim.play('sit', 0.25);
        if (k >= 1) { P.mount = null; P.vel.set(3.5, 0, 0); P.vy = 0; G.ui.floatText('Wheee!', P.pos.clone().setY(P.pos.y + 2), '#ff6fa5'); }
      }
      P.root.rotation.set(0, P.yaw, 0);
    },
  };
  G.inter.add({ id: 'slide', pos: new THREE.Vector3(LOC.slide.x - 2.7, H(LOC.slide.x, LOC.slide.z), LOC.slide.z), radius: 1.8, text: 'Go Down the Slide', action: () => { slideMode.t = 0; P.mount = slideMode; G.audio?.play('click'); } });

  // ---- benches (sit)
  for (const b of W.benches) {
    const sitMode = {
      override: true, exitText: 'Stand Up', b,
      update(dt) { P.anim.play('sit', 0.4); },
      exit() { P.mount = null; P.teleportSoft(b.x + Math.sin(b.rot) * 0.9, b.z + Math.cos(b.rot) * 0.9, b.rot); },
    };
    G.inter.add({ id: 'bench', pos: new THREE.Vector3(b.x + Math.sin(b.rot) * 0.6, b.y, b.z + Math.cos(b.rot) * 0.6), radius: 1.4, text: 'Sit', action: () => {
      P.mount = sitMode; P.yaw = b.rot; P.root.rotation.set(0, b.rot, 0);
      P.pos.set(b.x + Math.sin(b.rot) * 0.05, b.y + 0.5 - P.sitHip, b.z + Math.cos(b.rot) * 0.05);
    } });
  }

  // ---- gate
  G.inter.add({ id: 'gate', pos: new THREE.Vector3(LOC.gate.x + LOC.gateDir.x * 1.3, H(LOC.gate.x, LOC.gate.z), LOC.gate.z + LOC.gateDir.z * 1.3), radius: 3,
    enabled: () => !W.gate.opening,
    text: () => G.collect.bag.has('key') ? 'Unlock Gate' : 'Inspect Gate',
    action: () => {
      if (!G.collect.bag.has('key')) { G.ui.toast('', '🔒 The gate is locked.', 2.5, true); G.audio?.play('locked'); return; }
      W.gate.opening = true; G.flags.gateOpen = true; G.audio?.play('unlock');
      G.ui.toast('🗝️ CLICK!', 'The old gate creaks open...', 3);
      G.save?.();
    } });
}

/* ================================================================== */
/*  Cat companion                                                      */
/* ================================================================== */
function makeCat() {
  const g = new THREE.Group();
  const fur = M(0xffb070), cream = M(0xfff1dc), dark = M(0x3c3452), pink = M(0xff9ecb);
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 10), fur); body.scale.set(0.85, 0.8, 1.35); body.position.y = 0.3; g.add(body);
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), cream); belly.scale.set(0.8, 0.7, 1.1); belly.position.set(0, 0.26, 0.05); g.add(belly);
  const head = new THREE.Group(); head.position.set(0, 0.5, 0.28); g.add(head);
  const hm = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), fur); hm.scale.set(1.1, 0.95, 1); head.add(hm);
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), cream); muzzle.position.set(0, -0.05, 0.13); muzzle.scale.set(1.2, 0.8, 0.8); head.add(muzzle);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 4), fur); ear.position.set(s * 0.1, 0.15, -0.01); ear.rotation.z = -s * 0.25; head.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), dark); eye.position.set(s * 0.07, 0.02, 0.15); head.add(eye);
  }
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 4), pink); nose.position.set(0, -0.02, 0.2); head.add(nose);
  const legs = [];
  for (const [x, z] of [[-0.1, 0.18], [0.1, 0.18], [-0.1, -0.18], [0.1, -0.18]]) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 6), fur); l.position.set(x, 0.1, z); g.add(l); legs.push(l); }
  const tail = new THREE.Group(); tail.position.set(0, 0.36, -0.28); g.add(tail);
  const tm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.4, 6), fur); tm.position.y = 0.2; tail.add(tm); tail.rotation.x = -0.6;
  g.userData = { head, legs, tail, body };
  return shadow(g);
}
export class Cat {
  constructor() {
    this.m = makeCat(); G.scene.add(this.m);
    this.home = new THREE.Vector3(-13.5, 0, 9.5); this.home.y = H(this.home.x, this.home.z);
    this.m.position.copy(this.home); this.m.rotation.y = 1.2;
    this.friend = false; this.sitT = 0; this.vel = 0; this.inRoom = false; this.t = 0;
    G.inter.add({ id: 'cat', pos: () => this.m.position, radius: 1.7, room: false, enabled: () => !this.inRoom, text: () => this.text(), action: () => this.act() });
    G.inter.add({ id: 'cat-room', pos: () => this.m.position, radius: 1.7, room: true, enabled: () => this.inRoom, text: 'Pet Cat', action: () => this.act() });
  }
  text() { if (!this.friend) return G.collect.bag.has('catfood') ? 'Feed Cat' : 'Pet Cat'; return 'Pet Cat'; }
  act() {
    const P = G.player;
    this.face(P.pos);
    if (!this.friend && G.collect.bag.has('catfood')) {
      G.collect.use('catfood'); this.friend = true; G.flags.catFriend = true;
      hearts(this.m.position, 8); G.ui.toast('❤️', 'You made a new friend!', 3.5); G.audio?.play('meow');
      this.hop = 1; G.save?.();
      return;
    }
    hearts(this.m.position, 4); G.audio?.play('meow'); this.hop = 1;
    if (!this.friend) G.ui.toast('', '🐱 The cat looks at you hopefully... maybe it is hungry?', 3, true);
    else G.ui.toast('', '🐱 Purrrr...', 1.8, true);
  }
  face(p) { this.m.rotation.y = Math.atan2(p.x - this.m.position.x, p.z - this.m.position.z); }
  enterRoom(yes) {
    if (!this.friend) return;
    if (yes && Math.random() < 0.8) { this.inRoom = true; const s = G.world.roomSlots.catBed.pos; this.m.position.set(s.x, 0.05, s.z); this.m.rotation.y = 0.5; this.sitT = 99; }
    else if (!yes && this.inRoom) { this.inRoom = false; const d = G.world.houseDoor; this.m.position.set(d.x + 1.2, H(d.x + 1.2, d.z + 1), d.z + 1); }
    else if (yes) { this.m.visible = false; }
    if (!yes) this.m.visible = true;
  }
  update(dt) {
    this.t += dt;
    const u = this.m.userData, P = G.player, m = this.m;
    let moving = false;
    if (this.friend && !this.inRoom && !G.inRoom) {
      const d = Math.hypot(P.pos.x - m.position.x, P.pos.z - m.position.z);
      if (d > 30) { // too far → pop closer
        m.position.set(P.pos.x - Math.sin(P.yaw) * 2, 0, P.pos.z - Math.cos(P.yaw) * 2); m.position.y = groundAt(m.position.x, m.position.z);
      } else if (d > 2.4) {
        const sp = d > 7 ? 7.5 : d > 4 ? 4.5 : 2.4;
        this.vel = damp(this.vel, sp, 5, dt);
        const a = Math.atan2(P.pos.x - m.position.x, P.pos.z - m.position.z);
        m.rotation.y = angleDamp(m.rotation.y, a, 8, dt);
        m.position.x += Math.sin(m.rotation.y) * this.vel * dt; m.position.z += Math.cos(m.rotation.y) * this.vel * dt;
        resolve(m.position, 0.25, m.position.y, 0.5);
        if (isWater(m.position.x, m.position.z)) { m.position.x -= Math.sin(m.rotation.y) * this.vel * dt; m.position.z -= Math.cos(m.rotation.y) * this.vel * dt; }
        m.position.y = damp(m.position.y, groundAt(m.position.x, m.position.z, m.position.y + 0.3), 20, dt);
        moving = true; this.sitT = 0;
      } else { this.vel = 0; this.sitT += dt; }
    } else if (!this.friend) { this.sitT += dt; if (Math.hypot(P.pos.x - m.position.x, P.pos.z - m.position.z) < 5) m.rotation.y = angleDamp(m.rotation.y, Math.atan2(P.pos.x - m.position.x, P.pos.z - m.position.z), 2, dt); }
    // animation
    const sit = !moving && this.sitT > 1.5;
    const w = moving ? this.t * this.vel * 3.2 : 0;
    u.legs.forEach((l, i) => { l.rotation.x = moving ? Math.sin(w + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0)) * 0.6 : 0; l.scale.y = sit && i > 1 ? 0.4 : 1; });
    u.body.rotation.x = damp(u.body.rotation.x, sit ? -0.35 : 0, 6, dt);
    u.tail.rotation.z = Math.sin(this.t * (moving ? 6 : 2)) * 0.4;
    u.head.rotation.y = moving ? 0 : Math.sin(this.t * 0.7) * 0.35;
    if (this.hop > 0) { this.hop = Math.max(0, this.hop - dt * 2.5); u.body.position.y = 0.3 + Math.sin(this.hop * Math.PI) * 0.18; u.head.position.y = 0.5 + Math.sin(this.hop * Math.PI) * 0.18; }
  }
}

/* ================================================================== */
/*  Ducks + dog                                                        */
/* ================================================================== */
function makeDuck() {
  const g = new THREE.Group();
  const w = M(0xfffaf0), y = M(0xffd66b), o = M(0xff9a3c), d = M(0x3c3452);
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), w); body.scale.set(0.9, 0.75, 1.25); g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), w); head.position.set(0, 0.2, 0.18); g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 6), o); beak.rotation.x = Math.PI / 2; beak.position.set(0, 0.19, 0.31); g.add(beak);
  for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.017, 6, 4), d); e.position.set(s * 0.06, 0.24, 0.26); g.add(e); }
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 4), y); tail.rotation.x = -1.1; tail.position.set(0, 0.06, -0.25); g.add(tail);
  return shadow(g);
}
export class Ducks {
  constructor() {
    this.list = [];
    for (let i = 0; i < 6; i++) {
      const m = makeDuck(); if (i === 5) m.scale.setScalar(0.6);
      const a = i / 6 * Math.PI * 2; m.position.set(POND.x + Math.cos(a) * 4, WATER_Y + 0.05, POND.z + Math.sin(a) * 4);
      G.scene.add(m); this.list.push({ m, target: m.position.clone(), t: Math.random() * 5, ph: Math.random() * 6 });
    }
    this.feedT = 0; this.feedPoint = new THREE.Vector3();
    const edgeInteract = () => {
      const P = G.player.pos; const dx = P.x - POND.x, dz = P.z - POND.z, d = Math.hypot(dx, dz);
      return new THREE.Vector3(POND.x + dx / d * Math.min(d, POND.r), P.y, POND.z + dz / d * Math.min(d, POND.r));
    };
    G.inter.add({ id: 'ducks', pos: edgeInteract, radius: 3.2, priority: -1.5, text: () => G.collect.bag.has('duckfood') ? 'Feed Ducks' : 'Watch Ducks', action: () => this.feed() });
    G.inter.add({ id: 'duckfood', pos: () => G.world.duckSack.position, radius: 1.6, enabled: () => !G.collect.bag.has('duckfood'), text: 'Take Duck Food', action: () => { G.player.playOnce('pickup', 0.6); G.collect.give('duckfood'); } });
  }
  feed() {
    const P = G.player.pos;
    if (!G.collect.bag.has('duckfood')) { G.ui.toast('', '🦆 Quack! The ducks look hungry... is there food nearby?', 3, true); G.audio?.play('quack'); return; }
    const dx = P.x - POND.x, dz = P.z - POND.z, d = Math.hypot(dx, dz);
    this.feedPoint.set(POND.x + dx / d * (POND.r - 2.2), WATER_Y + 0.05, POND.z + dz / d * (POND.r - 2.2));
    this.feedT = 7; G.player.playOnce('pickup', 0.6);
    G.ui.toast('❤️', 'The ducks like you!', 3); G.audio?.play('quack');
    setTimeout(() => this.list.forEach(k => hearts(k.m.position, 2)), 1600);
    if (!G.flags.fedDucks) { G.flags.fedDucks = true; }
  }
  update(dt, t) {
    this.feedT -= dt;
    for (const k of this.list) {
      const m = k.m; k.t -= dt;
      if (this.feedT > 0) { k.target.copy(this.feedPoint).add(new THREE.Vector3(Math.sin(k.ph) * 1.2, 0, Math.cos(k.ph) * 1.2)); }
      else if (k.t < 0) { k.t = 3 + Math.random() * 5; const a = Math.random() * 6.28, r = Math.random() * (POND.r - 3); k.target.set(POND.x + Math.cos(a) * r, WATER_Y + 0.05, POND.z + Math.sin(a) * r); }
      const dx = k.target.x - m.position.x, dz = k.target.z - m.position.z, d = Math.hypot(dx, dz);
      if (d > 0.2) { m.rotation.y = angleDamp(m.rotation.y, Math.atan2(dx, dz), 3, dt); const sp = this.feedT > 0 ? 1.6 : 0.5; m.position.x += Math.sin(m.rotation.y) * sp * dt; m.position.z += Math.cos(m.rotation.y) * sp * dt; }
      m.position.y = WATER_Y + 0.05 + Math.sin(t * 2 + k.ph) * 0.02;
      m.rotation.z = Math.sin(t * 1.5 + k.ph) * 0.05;
    }
  }
}
function makeDog() {
  const g = new THREE.Group();
  const fur = M(0xf2e3cf), brown = M(0xa0703c), d = M(0x3c3452);
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), fur); body.scale.set(0.8, 0.75, 1.3); body.position.y = 0.42; g.add(body);
  const head = new THREE.Group(); head.position.set(0, 0.7, 0.36); g.add(head);
  head.add(new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 10), fur));
  const sn = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), fur); sn.position.set(0, -0.05, 0.17); sn.scale.z = 1.3; head.add(sn);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), d); nose.position.set(0, -0.02, 0.28); head.add(nose);
  for (const s of [-1, 1]) { const ear = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), brown); ear.scale.set(0.5, 1.2, 0.8); ear.position.set(s * 0.17, 0.02, 0); head.add(ear); const e = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), d); e.position.set(s * 0.08, 0.05, 0.16); head.add(e); }
  const legs = []; for (const [x, z] of [[-0.12, 0.2], [0.12, 0.2], [-0.12, -0.2], [0.12, -0.2]]) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6), fur); l.position.set(x, 0.15, z); g.add(l); legs.push(l); }
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.28, 6), brown); tail.position.set(0, 0.55, -0.38); tail.rotation.x = -0.9; g.add(tail);
  g.userData = { head, legs, tail };
  return shadow(g);
}
export class Dog {
  constructor() {
    this.m = makeDog(); G.scene.add(this.m);
    this.m.position.set(5, 0, -5); this.target = this.m.position.clone(); this.t = 0; this.wait = 2; this.hop = 0;
    G.inter.add({ id: 'dog', pos: () => this.m.position, radius: 1.7, text: 'Pet Dog', action: () => { hearts(this.m.position, 5); this.hop = 1; this.wait = 3; G.audio?.play('woof'); G.ui.toast('', '🐶 Woof! Happy tail wags!', 2, true); const P = G.player.pos; this.m.rotation.y = Math.atan2(P.x - this.m.position.x, P.z - this.m.position.z); } });
  }
  update(dt, t) {
    const m = this.m, u = m.userData; this.t += dt; this.wait -= dt;
    let moving = false;
    if (this.wait < 0) {
      const dx = this.target.x - m.position.x, dz = this.target.z - m.position.z, d = Math.hypot(dx, dz);
      if (d < 0.3) { this.wait = 2 + Math.random() * 4; const a = Math.random() * 6.28, r = 5 + Math.random() * 4; this.target.set(Math.cos(a) * r, 0, Math.sin(a) * r); }
      else { m.rotation.y = angleDamp(m.rotation.y, Math.atan2(dx, dz), 5, dt); m.position.x += Math.sin(m.rotation.y) * 1.8 * dt; m.position.z += Math.cos(m.rotation.y) * 1.8 * dt; moving = true; resolve(m.position, 0.3, 0, 0.6); }
    }
    m.position.y = H(m.position.x, m.position.z);
    u.legs.forEach((l, i) => l.rotation.x = moving ? Math.sin(this.t * 10 + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI : 0)) * 0.6 : 0);
    u.tail.rotation.z = Math.sin(this.t * (this.hop > 0 ? 25 : 8)) * 0.5;
    if (this.hop > 0) { this.hop = Math.max(0, this.hop - dt * 2); m.position.y += Math.abs(Math.sin(this.hop * Math.PI * 2)) * 0.3; }
  }
}

/* ================================================================== */
/*  NPCs                                                               */
/* ================================================================== */
function makeVendor() {
  const g = new THREE.Group();
  const skin = M(0xffe0cc), shirt = M(0x9be8c4), hat = M(0xffffff), hair = M(0x6b4a2e), d = M(0x3c3452);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 0.75, 12), shirt); body.position.y = 0.55; g.add(body);
  const apron = new THREE.Mesh(new THREE.CylinderGeometry(0.225, 0.325, 0.5, 12, 1, true, -0.8, 1.6), M(0xff8fb8, { side: THREE.DoubleSide })); apron.position.y = 0.5; g.add(apron);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12), skin); head.position.y = 1.18; g.add(head);
  const hr = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), hair); hr.position.y = 1.2; hr.rotation.x = -0.3; g.add(hr);
  const h = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.22, 12), hat); h.position.y = 1.5; g.add(h);
  const puff = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), hat); puff.position.y = 1.65; puff.scale.y = 0.6; g.add(puff);
  for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), d); e.position.set(s * 0.09, 1.2, 0.23); g.add(e); const c = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), M(0xffa3b8)); c.position.set(s * 0.15, 1.12, 0.2); g.add(c); }
  for (const s of [-1, 1]) { const a = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), shirt); a.position.set(s * 0.3, 0.72, 0.05); a.rotation.z = s * 0.3; g.add(a); }
  return shadow(g);
}
class NPC {
  constructor({ name, obj, x, z, lines, extra }) {
    this.name = name; this.obj = obj; this.base = obj.rotation.y; this.t = Math.random() * 5; this.dance = 0;
    this.x = x; this.z = z; this.y = obj.position.y; Object.assign(this, extra || {});
    this.linesFn = lines;
  }
  update(dt) {
    this.t += dt;
    const P = G.player.pos, o = this.obj;
    const d = Math.hypot(P.x - this.x, P.z - this.z);
    const want = d < 7 ? Math.atan2(P.x - this.x, P.z - this.z) : this.base;
    o.rotation.y = angleDamp(o.rotation.y, want, 3, dt);
    const breathe = 1 + Math.sin(this.t * 2.2) * 0.015;
    o.scale.set(1, breathe, 1);
    if (this.dance > 0) {
      this.dance -= dt;
      o.position.y = this.y + Math.abs(Math.sin(this.t * 6)) * 0.25;
      o.rotation.y += Math.sin(this.t * 3) * 0.4;
      o.rotation.z = Math.sin(this.t * 6) * 0.12;
    } else { o.position.y = damp(o.position.y, this.y + (this.bob ? Math.sin(this.t * 1.5) * this.bob : 0), 8, dt); o.rotation.z = 0; }
  }
}

export function setupNPCs() {
  const W = G.world, C = G.collect;
  const npcs = [];
  // Tobi — the little monk who lost a key (wings_of_freedom-novice)
  const tobiM = W.placeModel('novice', { x: -5.4, z: 0.8, height: 1.25, rotY: 1.4, colScale: 1.2 });
  if (tobiM) {
    const tobi = new NPC({ name: 'Tobi', obj: tobiM.wrap, x: -5.4, z: 0.8 });
    npcs.push(tobi);
    G.inter.add({ id: 'tobi', pos: tobiM.wrap.position, radius: 2.2, text: 'Talk to Tobi', action: () => {
      if (G.flags.keyReturned) return G.ui.dialog('Tobi', ['The gate is deep in the Whispering Woods.', 'Follow the path past the signpost — the one that says SECRET PATH!']);
      if (C.bag.has('key')) {
        G.flags.keyReturned = true; G.save?.();
        hearts(tobiM.wrap.position, 6);
        return G.ui.dialog('Tobi', ['Oh! You found it!', 'Thank you so much, Explorer!', "There's an old gate in the forest. Try the key there.", "I think... you should keep it. It likes you more than me."], () => G.ui.toast('🗝️ QUEST', 'Find the old gate in the forest', 3.5));
      }
      G.flags.talkedTobi = true;
      G.ui.dialog('Tobi', ['H-hello! Welcome to the village!', 'I lost a strange key near the pond...', "It's golden and a little bit sparkly. Could you look for it?"]);
    } });
  }
  // Mori — the cheerful dancer in the park (pixellabs-glb chibi)
  const moriM = W.placeModel('reaper', { x: 30.5, z: -7, height: 1.35, rotY: -1.2, colScale: 1.1 });
  if (moriM) {
    const mori = new NPC({ name: 'Mori', obj: moriM.wrap, x: 30.5, z: -7, extra: { bob: 0.12 } });
    npcs.push(mori);
    const P = G.player;
    const danceMode = {
      override: true, exitText: 'Dancing!', canExit: false, t: 0,
      update(dt) {
        this.t += dt; P.anim.play('dance', 0.35);
        if (this.t > 5.2) { P.mount = null; G.ui.toast('💃', 'Mori: "You\'ve got moves!"', 2.5, true); }
      },
    };
    G.inter.add({ id: 'mori', pos: moriM.wrap.position, radius: 2.4, text: () => G.flags.metMori ? 'Dance' : 'Talk to Mori', action: () => {
      if (!G.flags.metMori) { G.flags.metMori = true; return G.ui.dialog('Mori', ["Hiii! I'm Mori! Don't mind the scythe, it's for gardening.", 'Do you like dancing? Come back and press E to dance with me!']); }
      P.yaw = Math.atan2(moriM.wrap.position.x - P.pos.x, moriM.wrap.position.z - P.pos.z); P.root.rotation.y = P.yaw;
      danceMode.t = 0; P.mount = danceMode; mori.dance = 5.2; G.audio?.play('dance');
      G.ui.floatText('♪ ♫ ♪', moriM.wrap.position.clone().setY(moriM.wrap.position.y + 2), '#b28dff');
    } });
  }
  // Pip — ice cream vendor (simple procedural villager)
  const pip = makeVendor();
  const s = LOC.stall; const px = s.x - Math.sin(-2.3) * 1.1, pz = s.z - Math.cos(-2.3) * 1.1;
  pip.position.set(px, H(px, pz), pz); pip.rotation.y = -2.3; G.scene.add(pip);
  npcs.push(new NPC({ name: 'Pip', obj: pip, x: px, z: pz }));
  const front = new THREE.Vector3(s.x + Math.sin(-2.3) * 1.5, H(s.x, s.z), s.z + Math.cos(-2.3) * 1.5);
  G.inter.add({ id: 'icecream', pos: front, radius: 2.0, text: 'Get Ice Cream', action: () => {
    const first = !C.found.has('icecream');
    G.ui.dialog('Pip', first ? ['Welcome to Pip\'s Scoops! 🍦', 'Strawberry-vanilla swirl, on the house. Enjoy!'] : [['Another one? Of course!', 'Minty-cloud flavour today!', 'Careful, it melts fast in the sun!'][Math.floor(Math.random() * 3)]], () => {
      if (first) C.give('icecream'); else G.ui.toast('', '🍦 Yum!', 1.6, true);
      G.player.holdIceCream();
    });
  } });
  G.updaters.push(dt => npcs.forEach(n => n.update(dt)));
  return npcs;
}
export { makeCat };
