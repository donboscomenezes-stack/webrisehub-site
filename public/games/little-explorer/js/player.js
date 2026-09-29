// Player character: anime_female_mage.glb, animation state machine, controller and third-person camera.
import * as THREE from 'three';
import { G, clamp, damp, angleDamp, groundAt, resolve, isWater, pointBlocked, lerp } from './state.js';

const CHAR_HEIGHT = 1.65;           // metres
const TEX_NAMES = ['head', 'body', 'eyes', 'hair', 'outfit'];

/* ------------------------------------------------------------------ */
/*  Character setup                                                    */
/* ------------------------------------------------------------------ */
export function prepareCharacter(gltf, textures) {
  const model = gltf.scene;
  // 1) materials: the GLB ships black base colours + no images -> plug in the supplied textures
  model.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = true; o.receiveShadow = false; o.frustumCulled = false; // skinned bounds are unreliable
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    mats.forEach(m => {
      const key = TEX_NAMES.find(n => m.name.toLowerCase().includes(n));
      if (key && textures[key]) {
        if (!m.map) { m.map = textures[key]; m.color.set(key === 'head' || key === 'body' ? 0xfff0ea : 0xffffff); }
        m.emissive.set(0x000000);
        m.emissiveIntensity = 0;
        m.vertexColors = false;     // vertex colour sets are authoring masks, not albedo
        m.roughness = 0.75; m.metalness = 0.0;
        if (key === 'hair' || key === 'eyes') { m.alphaTest = 0.4; m.transparent = false; }
        m.needsUpdate = true;
      }
    });
  });
  // 2) scale + grounding
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  const h = box.max.y - box.min.y;
  const s = CHAR_HEIGHT / h;
  const scaler = new THREE.Group();
  scaler.scale.setScalar(s);
  model.position.y = -box.min.y;     // feet exactly at y=0
  scaler.add(model);
  // 3) orientation: this model faces +Z (verified in inspection); root yaw 0 == facing +Z
  const root = new THREE.Group();
  const offset = new THREE.Group();   // used by vehicles / seats to lift or lean the character
  root.add(offset); offset.add(scaler);
  console.log(`[Player] bbox height ${h.toFixed(3)} → scale ${s.toFixed(3)}; clips:`, gltf.animations.map(a => `${a.name} (${a.duration.toFixed(2)}s)`));
  return { root, offset, scaler, model, scale: s, baseY: model.position.y };
}

/* ------------------------------------------------------------------ */
/*  Animation state machine                                            */
/* ------------------------------------------------------------------ */
const CLIP_RULES = {
  idle:   { find: [/^idle$/i, /^idle[_\d]*$/i, /(^|_)idle/i], exclude: /combat|float/i },
  walk:   { find: [/walk/i], fallback: 'run', timeScale: 0.62 },
  run:    { find: [/^run$/i, /^running$/i, /(^|_)run/i], exclude: /combat/i },
  jump:   { find: [/jump/i, /float.*idle/i, /float/i], comp: [0.2, 0.85, 0.2] },
  sit:    { find: [/sit/i, /float.*idle/i], comp: [1, 1, 1] },
  dance:  { find: [/dance/i, /spin/i], comp: [1, 1, 1], procedural: 'dance' },
  wave:   { find: [/wave/i, /greet/i, /scratch_head/i, /think/i] },
  pickup: { find: [/pick/i, /collect/i], fallback: 'idle', procedural: 'lean' },
};

export class Animator {
  constructor(char, clips) {
    this.char = char;
    this.mixer = new THREE.AnimationMixer(char.model);
    this.actions = {}; this.meta = {};
    const find = (rule) => {
      for (const re of rule.find) {
        const c = clips.find(c => re.test(c.name) && !(rule.exclude && rule.exclude.test(c.name)));
        if (c) return c;
      }
      return null;
    };
    for (const [state, rule] of Object.entries(CLIP_RULES)) {
      let clip = find(rule), ts = 1, fromFallback = false;
      if (!clip && rule.fallback) { clip = find(CLIP_RULES[rule.fallback]); ts = rule.timeScale ?? 1; fromFallback = true; }
      if (!clip) { clip = find(CLIP_RULES.idle) || clips[0]; fromFallback = true; }
      if (!clip) continue;
      const a = this.mixer.clipAction(clip.clone(), char.model);
      a.setEffectiveTimeScale(ts);
      this.actions[state] = a;
      this.meta[state] = { comp: rule.comp || null, procedural: rule.procedural || null, fromFallback, clip: clip.name };
    }
    console.log('[Player] animation map:', Object.fromEntries(Object.entries(this.meta).map(([k, v]) => [k, v.clip + (v.fromFallback ? ' (fallback)' : '')])));
    this.state = null;
    this.spine = char.model.getObjectByName('DEF-spine') || null;
    this.compW = 0; this.compTarget = [0, 0, 0];
    this.procT = 0;
    // rest pose for root-motion compensation
    this.play('idle', 0); this.mixer.update(0.01);
    this.rest = this.spine ? this.spine.position.clone() : null;
  }
  play(state, fade = 0.25) {
    if (state === this.state || !this.actions[state]) return;
    const next = this.actions[state];
    const prev = this.state ? this.actions[this.state] : null;
    next.enabled = true; next.reset();
    next.setEffectiveWeight(1);
    if (prev && prev !== next) { next.crossFadeFrom(prev, fade, false); }
    next.play();
    this.state = state; this.procT = 0;
    const m = this.meta[state];
    this.compTarget = m.comp || [0, 0, 0];
  }
  update(dt) {
    this.mixer.update(dt);
    this.procT += dt;
    // root-motion compensation: flat rig bakes body offsets into every bone, so counter-shift the model
    const model = this.char.model;
    const wantComp = this.compTarget.some(v => v > 0) ? 1 : 0;
    this.compW = damp(this.compW, wantComp, 9, dt);
    let ox = 0, oy = 0, oz = 0;
    if (this.spine && this.rest && this.compW > 0.001) {
      const d = this.spine.position;
      const c = this.compTarget;
      ox = -(d.x - this.rest.x) * c[0] * this.compW;
      oy = -(d.y - this.rest.y) * c[1] * this.compW;
      oz = -(d.z - this.rest.z) * c[2] * this.compW;
    }
    model.position.set(ox, this.char.baseY + oy, oz);
    // procedural extras (for missing clips)
    const sc = this.char.scaler;
    const m = this.meta[this.state] || {};
    sc.rotation.set(0, 0, 0); sc.position.set(0, 0, 0);
    if (m.procedural === 'dance') {
      const t = this.procT;
      sc.position.y = Math.abs(Math.sin(t * 6)) * 0.12;
      sc.rotation.y = Math.sin(t * 3) * 0.6 + (t > 2 && t < 2.6 ? (t - 2) / 0.6 * Math.PI * 2 : 0);
      sc.rotation.z = Math.sin(t * 6) * 0.06;
    } else if (m.procedural === 'lean') {
      const k = Math.sin(clamp(this.procT / 0.7, 0, 1) * Math.PI);
      sc.rotation.x = k * 0.45; sc.position.z = k * 0.08;
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Player controller                                                  */
/* ------------------------------------------------------------------ */
export class Player {
  constructor(char, animations) {
    this.char = char;
    this.root = char.root;
    G.scene.add(this.root);
    this.anim = new Animator(char, animations);
    this.pos = this.root.position;
    this.vel = new THREE.Vector3();
    this.vy = 0; this.grounded = true;
    this.yaw = 0;                // facing (0 = +Z)
    this.radius = 0.35;
    this.frozen = true;          // no control in menu
    this.mount = null;           // vehicle / activity controller
    this.oneShot = null;         // {state, t}
    this.speedMul = 1;
    this.lastSafe = new THREE.Vector3();
    this.coyote = 0; this.jumpBuf = 0;
    this.airTime = 0;
    // invisible collider helper (debug only, never rendered)
    this.collider = { radius: this.radius, height: 1.6 };
    const rest = this.anim.rest ? this.anim.rest.y : 0.8;
    this.sitHip = (char.baseY + rest) * char.scale - 0.12;
    this.hand = char.model.getObjectByName('DEF-handR') || char.model.getObjectByName('DEF-hand.R') || null;
    char.model.traverse(o => { if (!this.hand && o.isBone && /hand.*(.r|_r|right)$/i.test(o.name)) this.hand = o; });
    if (!this.hand) char.model.traverse(o => { if (!this.hand && o.isBone && /hand/i.test(o.name)) this.hand = o; });
    console.log('[Player] hand bone:', this.hand?.name, 'sit hip', this.sitHip.toFixed(2));
    this.iceT = 0;
  }
  handWorld(out) {
    if (this.hand) return this.hand.getWorldPosition(out);
    return out.set(this.pos.x, this.pos.y + 1.1, this.pos.z);
  }
  holdIceCream() {
    if (!this.cone) {
      const g = new THREE.Group();
      const c = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 10), new THREE.MeshStandardMaterial({ color: 0xe8b26b }));
      c.rotation.x = Math.PI; g.add(c);
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffb3d1 })); s.position.y = 0.08; g.add(s);
      const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), new THREE.MeshStandardMaterial({ color: 0xfff3c4 })); s2.position.y = 0.14; g.add(s2);
      this.cone = g; G.scene.add(g);
    }
    this.cone.visible = true; this.iceT = 25;
  }
  updateHeld(dt) {
    if (!this.cone || !this.cone.visible) return;
    this.iceT -= dt;
    if (this.iceT <= 0) { this.cone.visible = false; return; }
    this.handWorld(this.cone.position); this.cone.position.y += 0.1;
    this.cone.rotation.set(0, this.yaw, 0);
  }
  teleport(x, y, z, yaw = this.yaw) {
    this.pos.set(x, y, z); this.vel.set(0, 0, 0); this.vy = 0; this.yaw = yaw;
    this.root.rotation.y = yaw; this.lastSafe.copy(this.pos);
    G.cam?.snap();
  }
  playOnce(state, dur) { this.oneShot = { state, t: dur }; this.anim.play(state, 0.2); }

  update(dt) {
    const k = G.keys;
    let ix = 0, iz = 0;
    const controllable = !this.frozen && G.mode === 'play';
    if (controllable) {
      if (k.KeyW || k.ArrowUp) iz += 1;
      if (k.KeyS || k.ArrowDown) iz -= 1;
      if (k.KeyA || k.ArrowLeft) ix += 1;
      if (k.KeyD || k.ArrowRight) ix -= 1;
    }
    const len = Math.hypot(ix, iz);
    // camera-relative direction
    const cy = G.cam.yaw;
    let dx = 0, dz = 0;
    if (len > 0) {
      ix /= len; iz /= len;
      dx = Math.sin(cy) * iz + Math.cos(cy) * ix;
      dz = Math.cos(cy) * iz - Math.sin(cy) * ix;
    }
    const running = controllable && (k.ShiftLeft || k.ShiftRight);

    // activity with custom motion (swing, slide, dance …)
    if (this.mount && this.mount.override) {
      this.mount.update(dt, { dx, dz, len, running });
      this.anim.update(dt);
      return;
    }

    let maxSpeed = running ? 6.6 : 3.3;
    let accel = 9, decel = 11, turn = 12;
    if (this.mount) { const m = this.mount; maxSpeed = running ? m.speed * 1.25 : m.speed; accel = m.accel ?? 5; decel = m.decel ?? 3; turn = m.turn ?? 5; }
    maxSpeed *= this.speedMul;
    if (this.oneShot) { maxSpeed *= 0.15; }

    // horizontal velocity with acceleration/deceleration
    const tx = dx * maxSpeed * len, tz = dz * maxSpeed * len;
    const a = len > 0 ? accel : decel;
    const airC = this.grounded ? 1 : 0.35;
    this.vel.x = damp(this.vel.x, tx, a * airC, dt);
    this.vel.z = damp(this.vel.z, tz, a * airC, dt);
    const hs = Math.hypot(this.vel.x, this.vel.z);

    // facing
    if (len > 0 && hs > 0.2) this.yaw = angleDamp(this.yaw, Math.atan2(dx, dz), turn, dt);
    this.root.rotation.y = this.yaw;
    if (this.mount?.lean) this.mount.lean(dt, hs, dx, dz);

    // jump (buffer + coyote time)
    this.jumpBuf -= dt; this.coyote -= dt;
    if (controllable && G.pressed.Space) this.jumpBuf = 0.15;
    if (this.jumpBuf > 0 && this.coyote > 0 && !this.mount?.noJump) {
      this.vy = this.mount ? 6.5 : 8.2; this.grounded = false; this.coyote = 0; this.jumpBuf = 0;
      G.audio?.play('jump');
    }

    // integrate
    const prevX = this.pos.x, prevZ = this.pos.z;
    this.vy -= 22 * dt;
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.pos.y += this.vy * dt;
    resolve(this.pos, this.mount?.radius ?? this.radius, this.pos.y, 1.6);
    // world bounds (the rim hills normally stop you first)
    if (!G.inRoom) {
      const r = Math.hypot(this.pos.x, this.pos.z);
      if (r > 86) { this.pos.x *= 86 / r; this.pos.z *= 86 / r; }
      // do not walk into the pond (unless on a dock)
      if (isWater(this.pos.x, this.pos.z)) { this.pos.x = prevX; this.pos.z = prevZ; if (isWater(prevX, prevZ)) { this.pos.copy(this.lastSafe); } this.vel.multiplyScalar(0.3); }
    } else G.world.clampRoom(this.pos, this.radius);

    // ground
    const g = groundAt(this.pos.x, this.pos.z, this.pos.y);
    const wasGrounded = this.grounded;
    if (this.pos.y <= g + 0.02 && this.vy <= 0) {
      const bounced = !wasGrounded && this.onLand(-this.vy);
      if (!bounced) { this.pos.y = g; this.vy = 0; this.grounded = true; this.coyote = 0.12; }
    } else if (wasGrounded && this.vy <= 0 && this.pos.y - g < 0.35) {
      this.pos.y = g; this.vy = 0; this.grounded = true; this.coyote = 0.12; // stick to slopes / steps down
    } else {
      this.grounded = false;
    }
    if (this.grounded) { this.airTime = 0; if (!G.inRoom) this.lastSafe.copy(this.pos); } else this.airTime += dt;
    if (this.pos.y < -30) this.teleport(this.lastSafe.x, this.lastSafe.y + 1, this.lastSafe.z);

    // trampoline & other landing hooks
    this.mount?.update?.(dt, { dx, dz, len, running, hs });

    // animation state
    if (this.oneShot) {
      this.oneShot.t -= dt;
      if (this.oneShot.t <= 0) this.oneShot = null;
    }
    if (!this.oneShot) {
      let st;
      if (this.mount && this.mount.anim) st = this.mount.anim;
      else if (!this.grounded && this.airTime > 0.12) st = 'jump';
      else if (hs > 4.6) st = 'run';
      else if (hs > 0.35) st = 'walk';
      else st = 'idle';
      this.anim.play(st, st === 'jump' ? 0.18 : 0.28);
      // scale walk/run playback to real speed so feet don't skate
      const act = this.anim.actions[st];
      if (st === 'walk') act.setEffectiveTimeScale(clamp(hs / 3.3, 0.45, 1) * 0.62);
      if (st === 'run') act.setEffectiveTimeScale(clamp(hs / 6.6, 0.7, 1.15));
    }
    this.anim.update(dt);
  }
  onLand(speed) {
    if (G.world?.onPlayerLand?.(speed)) return true;
    if (speed > 9) G.audio?.play('land');
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Third-person camera                                                */
/* ------------------------------------------------------------------ */
export class ThirdPersonCam {
  constructor(camera) {
    this.camera = camera;
    this.yaw = Math.PI; this.pitch = 0.28;    // yaw PI => looking toward +Z (behind a player facing +Z)
    this.dist = 5.4; this.targetDist = 5.4; this.curDist = 5.4;
    this.target = new THREE.Vector3();
    this.pos = new THREE.Vector3();
    this.shoulder = 0.45;
    this.cinematic = null;   // menu orbit
    this.selfie = null;
  }
  onMouse(dx, dy) {
    if (this.selfie) { this.selfie.yaw = clamp(this.selfie.yaw - dx * 0.003, -0.9, 0.9); this.selfie.pitch = clamp(this.selfie.pitch + dy * 0.003, -0.4, 0.6); return; }
    this.yaw -= dx * 0.0025;
    this.pitch = clamp(this.pitch + dy * 0.0022, -0.35, 1.2);
  }
  onWheel(d) {
    if (this.selfie) { this.selfie.dist = clamp(this.selfie.dist + d * 0.002, 1.3, 4); return; }
    this.targetDist = clamp(this.targetDist + d * 0.004, 3, 10);
  }
  snap() { this._snap = true; }
  desired(out, dist) {
    const p = G.player;
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    // camera sits behind: direction from target to camera
    const bx = -Math.sin(this.yaw) * cp, bz = -Math.cos(this.yaw) * cp;
    // right vector for shoulder offset
    const rx = -Math.cos(this.yaw), rz = Math.sin(this.yaw);
    out.set(this.target.x + bx * dist + rx * this.shoulder, this.target.y + sp * dist, this.target.z + bz * dist + rz * this.shoulder);
    return out;
  }
  update(dt) {
    const cam = this.camera, p = G.player;
    if (this.cinematic) {
      const t = this.cinematic.t += dt * 0.05;
      const r = 34 + Math.sin(t * 0.7) * 6;
      cam.position.set(Math.sin(t) * r + 4, 12 + Math.sin(t * 0.5) * 3, Math.cos(t) * r + 2);
      cam.lookAt(2, 3, -8);
      return;
    }
    // target: upper body of the character, smoothed
    const ty = p.pos.y + (p.mount?.camH ?? 1.45);
    if (this._snap) { this.target.set(p.pos.x, ty, p.pos.z); }
    this.target.x = damp(this.target.x, p.pos.x, 14, dt);
    this.target.z = damp(this.target.z, p.pos.z, 14, dt);
    this.target.y = damp(this.target.y, ty, 8, dt);

    if (this.selfie) {
      const s = this.selfie;
      const a = p.yaw + s.yaw;
      const eye = new THREE.Vector3(p.pos.x + Math.sin(a) * s.dist, p.pos.y + 1.45 + s.pitch * s.dist * 0.6, p.pos.z + Math.cos(a) * s.dist);
      if (s.fresh) { cam.position.copy(eye); s.fresh = false; } else cam.position.lerp(eye, 1 - Math.exp(-8 * dt));
      cam.lookAt(p.pos.x, p.pos.y + 1.3, p.pos.z);
      return;
    }

    this.dist = damp(this.dist, this.targetDist, 6, dt);
    let maxD = G.inRoom ? Math.min(this.dist, 3.6) : this.dist;
    // camera collision: march from target toward desired position
    const probe = new THREE.Vector3();
    let hit = maxD;
    for (let i = 1; i <= 12; i++) {
      const d = maxD * i / 12;
      this.desired(probe, d);
      if (G.inRoom ? !G.world.insideRoom(probe) : pointBlocked(probe)) { hit = Math.max(0.9, d - maxD / 12 - 0.1); break; }
    }
    // pull in quickly, ease back out slowly
    this.curDist = hit < this.curDist ? damp(this.curDist, hit, 18, dt) : damp(this.curDist, hit, 3, dt);
    if (this._snap) { this.curDist = hit; }
    this.desired(this.pos, this.curDist);
    if (this._snap) { cam.position.copy(this.pos); this._snap = false; }
    else cam.position.lerp(this.pos, 1 - Math.exp(-20 * dt));
    const look = new THREE.Vector3(this.target.x - Math.cos(this.yaw) * this.shoulder * 0.9, this.target.y + 0.1, this.target.z + Math.sin(this.yaw) * this.shoulder * 0.9);
    cam.lookAt(look);
  }
}
