// The farm grid: tilling, planting, watering, harvesting, land expansion, decorations & placement.
import * as THREE from 'three';
import { G, emit, addItem, addXP, spend, earn, clamp } from './game.js';
import { GW, GH, TILE, CHUNK, CROPS, DECOR, LAND_COSTS } from './config.js';
import * as M from './models.js';
import { mergeGeometries } from './lib/BufferGeometryUtils.js';
import { buildTime, siteMesh } from './workers.js';
import { HALF_W, HALF_H } from './world.js';

const tileX = i => -HALF_W + (i + 0.5) * TILE;
const tileZ = j => -HALF_H + (j + 0.5) * TILE;

export class Farm {
  constructor() {
    this.scene = G.scene;
    this.tiles = [];
    for (let i = 0; i < GW; i++) { this.tiles[i] = []; for (let j = 0; j < GH; j++) this.tiles[i][j] = { i, j, x: tileX(i), z: tileZ(j), type: 'grass', crop: null, progress: 0, stage: -1, wet: 0, decor: null, soil: null, plant: null, pop: 0, job: null }; }
    this.decors = [];
    this.chunks = [];
    this.landBought = 0;
    this.ghost = null; this.placing = null; this.ghostRot = 0;
    this.sparkleTiles = [];
    this.buildChunks();
    this.buildHighlight();
    this.buildSparkles();
  }
  get(i, j) { return (i >= 0 && j >= 0 && i < GW && j < GH) ? this.tiles[i][j] : null; }
  tileAt(x, z) { return this.get(Math.floor((x + HALF_W) / TILE), Math.floor((z + HALF_H) / TILE)); }
  plots() { const out = []; for (const col of this.tiles) for (const t of col) if (t.type === 'soil') out.push(t); return out; }
  decorCount() { return this.decors.length; }
  hasDecor(def) { return this.decors.some(d => DECOR[d.id] === def); }
  landOwned() { return this.chunks.filter(c => !c.locked).length; }

  /* ---------------- land chunks ---------------- */
  buildChunks() {
    const nx = GW / CHUNK, nz = GH / CHUNK;
    for (let cx = 0; cx < nx; cx++) for (let cz = 0; cz < nz; cz++) {
      const locked = !(cx >= 1 && cx <= 2 && cz >= 1);
      const ch = { cx, cz, locked, obstacles: [], sign: null };
      this.chunks.push(ch);
      if (locked) this.dressLocked(ch);
    }
  }
  chunkOf(t) { return this.chunks.find(c => c.cx === Math.floor(t.i / CHUNK) && c.cz === Math.floor(t.j / CHUNK)); }
  isLocked(t) { return this.chunkOf(t).locked; }
  dressLocked(ch) {
    const g = new THREE.Group();
    let seed = ch.cx * 7 + ch.cz * 13;
    const r = () => { seed = (seed * 16807) % 2147483647; return (seed % 1000) / 1000; };
    for (let a = 0; a < CHUNK; a++) for (let b = 0; b < CHUNK; b++) {
      const t = this.get(ch.cx * CHUNK + a, ch.cz * CHUNK + b), k = r();
      let m;
      if (k < 0.18) m = M.rockMesh(seed + a, 0.9 + r() * 0.5);
      else if (k < 0.42) m = M.bushMesh(seed + b * 3, 0x5aa83a);
      else if (k < 0.52) m = M.stumpMesh();
      else { m = new THREE.Group(); for (let q = 0; q < 4; q++) { const tf = new THREE.Mesh(M.grassTuftGeo(), M.MAT); tf.position.set((r() - 0.5) * 1.4, 0, (r() - 0.5) * 1.4); tf.scale.setScalar(1.6 + r()); m.add(tf); } }
      m.position.set(t.x + (r() - 0.5) * 0.5, 0, t.z + (r() - 0.5) * 0.5); m.rotation.y = r() * 6;
      g.add(m);
    }
    // merge all obstacles of this chunk into one mesh (1 draw call instead of dozens)
    g.updateMatrixWorld(true);
    const parts = [];
    g.traverse(o => { if (o.isMesh) { const geo = o.geometry.clone(); geo.applyMatrix4(o.matrixWorld); parts.push(geo); } });
    g.clear();
    const merged = new THREE.Mesh(mergeGeometries(parts), M.MAT); merged.castShadow = true; merged.receiveShadow = true;
    g.add(merged);
    // overgrown tint over the chunk
    const s = CHUNK * TILE;
    const tint = new THREE.Mesh(new THREE.PlaneGeometry(s - 0.1, s - 0.1), new THREE.MeshStandardMaterial({ color: 0x4f9e3a, transparent: true, opacity: 0.35, roughness: 1 }));
    tint.rotation.x = -Math.PI / 2; tint.position.set(-HALF_W + (ch.cx + 0.5) * s, 0.025, -HALF_H + (ch.cz + 0.5) * s); tint.receiveShadow = true; g.add(tint);
    // "for sale" sign
    const sign = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.saleTexture(), transparent: true, depthWrite: false }));
    sign.scale.set(2.6, 1.3, 1); sign.position.set(tint.position.x, 2.2, tint.position.z); sign.renderOrder = 4; g.add(sign);
    ch.sign = sign; ch.group = g;
    this.scene.add(g);
  }
  saleTexture() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
    x.fillStyle = 'rgba(255,250,240,0.95)'; roundRect(x, 6, 6, 244, 116, 26); x.fill();
    x.strokeStyle = '#c98b58'; x.lineWidth = 6; x.stroke();
    x.font = '700 40px Fredoka, sans-serif'; x.textAlign = 'center'; x.fillStyle = '#6b4224'; x.fillText('🔒 Land', 128, 56);
    x.font = '700 30px Fredoka, sans-serif'; x.fillStyle = '#e88a1a'; x.fillText('tap to expand', 128, 98);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  nextLandCost() { return LAND_COSTS[Math.min(this.landBought, LAND_COSTS.length - 1)]; }
  buyChunk(ch) {
    if (ch.clearing) { G.ui.toast('🪓 Already on it', 'Your farmer is clearing this land.'); return false; }
    const cost = this.nextLandCost();
    if (!spend(cost)) { G.ui.toast('🪙 Not enough coins', `You need ${cost} coins to clear this land.`); G.audio.play('nope'); return false; }
    ch.clearing = true; this.landBought++;
    ch.sign.visible = false;
    const center = new THREE.Vector3(ch.sign.position.x, 0, ch.sign.position.z);
    const obstacles = ch.group.children[0];
    G.workers.add('clear', null, { pos: center, refund: cost,
      onCancel: () => { ch.clearing = false; this.landBought--; ch.sign.visible = true; obstacles.scale.set(1, 1, 1); },
      progress: p => { obstacles.scale.set(1, 1 - p * 0.75, 1); }, done: () => this.finishClear(ch) });
    G.ui.toast('🪓 Clearing land', 'Your farmer will clear it — this takes about 30 seconds.');
    G.audio.play('click');
    return true;
  }
  finishClear(ch) {
    ch.locked = false; ch.clearing = false;
    const pos = new THREE.Vector3(ch.sign.position.x, 1, ch.sign.position.z);
    G.fx.burst(pos, 0xd8c39a, 60, 4);
    G.audio.play('clear');
    // animate obstacles sinking away
    const grp = ch.group; let k = 0;
    const fn = (dt) => { k += dt * 2.2; grp.children.forEach(c => { c.scale.multiplyScalar(Math.max(0, 1 - dt * 3)); }); if (k > 1) { this.scene.remove(grp); G.updaters.splice(G.updaters.indexOf(fn), 1); } };
    G.updaters.push(fn);
    addXP(5);
    G.ui.toast('🌱 New land!', 'More room to grow. Use the hoe ⛏️ to make fields.');
    emit('land');
    return true;
  }

  /* ---------------- highlight + sparkles ---------------- */
  buildHighlight() {
    const s = TILE * 0.96;
    const shape = new THREE.Shape(); const o = s / 2, i = o - 0.12;
    shape.moveTo(-o, -o); shape.lineTo(o, -o); shape.lineTo(o, o); shape.lineTo(-o, o); shape.closePath();
    const hole = new THREE.Path(); hole.moveTo(-i, -i); hole.lineTo(-i, i); hole.lineTo(i, i); hole.lineTo(i, -i); hole.closePath(); shape.holes.push(hole);
    const g = new THREE.ShapeGeometry(shape); g.rotateX(-Math.PI / 2);
    this.hl = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, depthWrite: false }));
    this.hl.position.y = 0.34; this.hl.visible = false; this.hl.renderOrder = 3; this.scene.add(this.hl);
  }
  highlight(t, ok) {
    if (!t) { this.hl.visible = false; return; }
    this.hl.visible = true; this.hl.position.set(t.x, t.type === 'soil' ? 0.34 : 0.06, t.z);
    this.hl.material.color.set(ok ? 0xffffff : 0xff6b6b);
  }
  buildSparkles() {
    const n = 240; const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.spark = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xfff3a6, size: 0.32, map: G.fx.dot, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.spark.frustumCulled = false; this.scene.add(this.spark);
  }

  /* ---------------- soil & crops ---------------- */
  canTill(t) { return t && !this.isLocked(t) && t.type === 'grass' && !t.decor && !t.job; }
  till(t, quiet) {
    if (!this.canTill(t)) return false;
    t.type = 'soil';
    t.soil = new THREE.Mesh(M.soilGeo(false), M.MAT); t.soil.position.set(t.x, 0, t.z); t.soil.receiveShadow = true; t.soil.castShadow = false;
    t.soil.scale.setScalar(0.01); t.pop = 1;
    this.scene.add(t.soil);
    if (!quiet) { G.fx.burst(new THREE.Vector3(t.x, 0.3, t.z), 0xa8744a, 10, 1.5); G.audio.play('dig'); G.stats.tilled = (G.stats.tilled || 0) + 1; emit('till'); }
    return true;
  }
  untill(t) {
    if (!t || t.type !== 'soil' || t.crop) return false;
    this.scene.remove(t.soil); t.soil = null; t.type = 'grass'; G.audio.play('dig');
    return true;
  }
  plant(t, seed, quiet, paid) {
    if (!t || t.type !== 'soil' || t.crop) return false;
    const c = CROPS[seed];
    if (c.lvl > G.level) { G.ui.toast('🔒 Locked', `${c.name} unlocks at level ${c.lvl}.`); return false; }
    if (!quiet && !paid && !spend(c.seed)) { G.ui.toast('🪙 Not enough coins', `${c.name} seeds cost ${c.seed}.`); G.audio.play('nope'); return 'broke'; }
    t.crop = seed; t.progress = 0; t.stage = -1; t.wet = Math.max(0, t.wet);
    this.setStage(t, 0);
    if (!quiet) { G.audio.play('plant'); G.stats.planted++; emit('plant'); G.fx.burst(new THREE.Vector3(t.x, 0.35, t.z), 0x8fd65a, 6, 1); }
    return true;
  }
  setStage(t, s) {
    if (t.stage === s) return;
    t.stage = s;
    if (!t.plant) { t.plant = new THREE.Mesh(M.cropGeo(t.crop, s), M.MAT); t.plant.castShadow = true; t.plant.receiveShadow = true; t.plant.position.set(t.x, 0, t.z); t.plant.rotation.y = ((t.i * 7 + t.j * 3) % 4) * Math.PI / 2; this.scene.add(t.plant); }
    else t.plant.geometry = M.cropGeo(t.crop, s);
    t.pop = 1;
    if (s === 3) { G.audio.play('ripe', t); }
  }
  water(t, quiet) {
    if (!t || !t.crop || t.stage === 3 || t.wet > 0) return false;
    t.wet = 45; t.soil.geometry = M.soilGeo(true);
    if (!quiet) { G.fx.burst(new THREE.Vector3(t.x, 0.8, t.z), 0x6fc8ff, 14, 2, -4); G.audio.play('water'); G.stats.watered = (G.stats.watered || 0) + 1; emit('water'); }
    return true;
  }
  harvest(t) {
    if (!t || !t.crop || t.stage !== 3) return false;
    const c = CROPS[t.crop], id = t.crop;
    addItem(id, 1); addXP(c.xp); G.stats.harvested++;
    G.ui.fly(new THREE.Vector3(t.x, 0.8, t.z), c.icon, 'barn');
    G.fx.burst(new THREE.Vector3(t.x, 0.6, t.z), 0xfff3a6, 12, 2.5);
    this.scene.remove(t.plant); t.plant = null; t.crop = null; t.stage = -1; t.progress = 0;
    t.wet = 0; t.soil.geometry = M.soilGeo(false);
    G.audio.play('harvest'); emit('harvest', id);
    return true;
  }
  timeLeft(t) { const c = CROPS[t.crop]; return Math.ceil((1 - t.progress) * c.time / (t.wet > 0 || G.rain > 0.5 ? 2 : 1)); }

  /* ---------------- jobs for the farmers ---------------- */
  queueTill(t) {
    if (!this.canTill(t)) return false;
    G.workers.add('till', t, { check: () => t.type === 'grass' && !t.decor, done: () => this.till(t) });
    G.audio.play('click'); return true;
  }
  queuePlant(t, seed) {
    if (!t || t.type !== 'soil' || t.crop || t.job) return false;
    const c = CROPS[seed];
    if (c.lvl > G.level) { G.ui.toast('🔒 Locked', `${c.name} unlocks at level ${c.lvl}.`); return false; }
    if (!spend(c.seed)) { G.ui.toast('🪙 Not enough coins', `${c.name} seeds cost ${c.seed}.`); G.audio.play('nope'); return false; }
    G.workers.add('plant', t, { seed, icon: c.icon, refund: c.seed, check: () => t.type === 'soil' && !t.crop, done: () => this.plant(t, seed, false, true) });
    G.audio.play('click'); return true;
  }
  queueWater(t) {
    if (!t || !t.crop || t.stage === 3 || t.wet > 0 || t.job) return false;
    G.workers.add('water', t, { check: () => t.crop && t.stage < 3, done: () => this.water(t) });
    G.audio.play('click'); return true;
  }
  queueHarvest(t) {
    if (!t || !t.crop || t.stage !== 3 || t.job) return false;
    G.workers.add('harvest', t, { check: () => t.crop && t.stage === 3, done: () => this.harvest(t) });
    G.audio.play('click'); return true;
  }
  queueBuild(id, t, rot) {
    const def = DECOR[id];
    if (!this.canPlace(t)) return false;
    if (!spend(def.cost)) { G.ui.toast('🪙 Not enough coins', `${def.name} costs ${def.cost}.`); G.audio.play('nope'); return false; }
    const site = siteMesh(id, rot); site.position.set(t.x, 0, t.z); this.scene.add(site);
    G.workers.add('build', t, { time: buildTime(id), refund: def.cost, label: def.icon,
      progress: p => { site.userData.ghost.scale.y = 0.05 + 0.95 * p; },
      onCancel: () => this.scene.remove(site),
      done: () => {
        this.scene.remove(site);
        const d = this.placeDecor(id, t, rot, true);
        if (d) { G.audio.play('place'); G.fx.burst(new THREE.Vector3(t.x, 0.6, t.z), 0xfff3a6, 24, 3); addXP(1 + Math.round(def.cost / 40)); emit('decor', id); G.ui.floatText(`${def.icon} Built!`, new THREE.Vector3(t.x, 2.2, t.z), '#4a9a2e'); }
      } });
    G.audio.play('place');
    return true;
  }
  // smart action used by the hand tool (and drag-painting)
  smart(t, first) {
    if (!t) return false;
    if (this.isLocked(t)) { if (first) G.ui.confirmLand(this.chunkOf(t)); return false; }
    if (t.job) { if (first) G.ui.floatText('⏳ Queued', new THREE.Vector3(t.x, 1.3, t.z), '#5a3e2b'); return false; }
    if (t.decor) { if (first) return this.tapDecor(t.decor); return false; }
    if (t.type !== 'soil') { if (first && G.tool === 'hand') G.ui.hint('Grass — use the hoe ⛏️ to turn it into a field'); return false; }
    if (t.crop && t.stage === 3) return this.queueHarvest(t);
    if (!t.crop) return this.queuePlant(t, G.seed);
    if (t.wet <= 0 && G.rain < 0.5) return this.queueWater(t);
    if (first) G.ui.floatText(`⏳ ${this.timeLeft(t)}s`, new THREE.Vector3(t.x, 1.4, t.z), '#5a3e2b');
    return false;
  }
  // apply a tool to a tile; returns true when something happened
  apply(tool, t, first) {
    switch (tool) {
      case 'hand': return this.smart(t, first);
      case 'hoe':
        if (t && this.isLocked(t)) { if (first) G.ui.confirmLand(this.chunkOf(t)); return false; }
        if (t?.decor && first) { G.ui.hint('Something is already here'); return false; }
        return this.queueTill(t);
      case 'seed': if (t && this.isLocked(t)) { if (first) G.ui.confirmLand(this.chunkOf(t)); return false; } return this.queuePlant(t, G.seed);
      case 'water': return this.queueWater(t);
      case 'harvest': return this.queueHarvest(t);
      case 'edit':
        if (!first) return false;
        if (t?.job) { G.workers.cancel(t.job); G.ui.toast('', '✋ Job cancelled (coins refunded)', 1.6); G.audio.play('click'); return true; }
        if (t?.decor) { G.ui.decorMenu(t.decor); return true; }
        if (t?.type === 'soil' && !t.crop) return this.untill(t);
        if (t?.type === 'soil' && t.crop) { G.ui.confirm('Dig up this crop?', `The ${CROPS[t.crop].name.toLowerCase()} will be removed.`, 'Dig up', () => { this.scene.remove(t.plant); t.plant = null; t.crop = null; t.stage = -1; G.audio.play('dig'); }); return true; }
        return false;
    }
    return false;
  }

  /* ---------------- decorations ---------------- */
  canPlace(t) { return t && !this.isLocked(t) && t.type === 'grass' && !t.decor && !t.job; }
  placeDecor(id, t, rot = 0, free = false) {
    const def = DECOR[id];
    if (!this.canPlace(t)) return false;
    if (!free && !spend(def.cost)) { G.ui.toast('🪙 Not enough coins', `${def.name} costs ${def.cost}.`); G.audio.play('nope'); return false; }
    const mesh = M.decorMesh(id);
    mesh.position.set(t.x, 0, t.z); mesh.rotation.y = rot * Math.PI / 2;
    mesh.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    this.scene.add(mesh);
    const d = { id, t, rot, mesh, prodT: 0, ready: false, bubble: null, pop: 1, baseY: 0 };
    if (def.prod) { d.prodT = def.prod.time; if (mesh.userData.fruit) mesh.userData.fruit.visible = false; }
    if (id === 'lamp') { const h = G.world.halo(0, 2.33, 0, 2.6); mesh.add(h); }
    t.decor = d; this.decors.push(d);
    if (!free) { G.audio.play('place'); G.fx.burst(new THREE.Vector3(t.x, 0.3, t.z), 0xfff3a6, 12, 2); addXP(1); emit('decor', id); }
    return d;
  }
  removeDecor(d) {
    this.scene.remove(d.mesh); if (d.bubble) this.scene.remove(d.bubble);
    d.t.decor = null; this.decors.splice(this.decors.indexOf(d), 1);
  }
  sellDecor(d) { const refund = Math.floor(DECOR[d.id].cost / 2); this.removeDecor(d); earn(refund); G.audio.play('coin'); G.ui.toast('🪙 Sold', `+${refund} coins`); }
  rotateDecor(d) { d.rot = (d.rot + 1) % 4; d.mesh.rotation.y = d.rot * Math.PI / 2; d.pop = 0.6; G.audio.play('click'); }
  tapDecor(d) {
    const def = DECOR[d.id];
    if (def.prod && d.ready) {
      addItem(def.prod.item, def.prod.qty); addXP(def.prod.xp); G.stats.collected++;
      const info = { apple: '🍎', orange: '🍊', honey: '🍯' }[def.prod.item];
      G.ui.fly(d.mesh.position.clone().setY(2.5), info, 'barn', def.prod.qty);
      d.ready = false; d.prodT = def.prod.time; if (d.bubble) { this.scene.remove(d.bubble); d.bubble = null; }
      if (d.mesh.userData.fruit) d.mesh.userData.fruit.visible = false;
      G.audio.play('harvest'); emit('collect');
      return true;
    }
    if (def.prod) { G.ui.floatText(`⏳ ${Math.ceil(d.prodT)}s`, d.mesh.position.clone().setY(2.6), '#5a3e2b'); return false; }
    d.pop = 0.7; G.audio.play('boop');
    return false;
  }
  // placement ghost
  startPlace(id, moving = null) {
    this.cancelPlace();
    this.placing = { id, moving };
    this.ghostRot = moving ? moving.rot : 0;
    const g = M.decorMesh(id);
    g.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.6; o.castShadow = false; } });
    this.ghost = g; g.visible = false; g.rotation.y = this.ghostRot * Math.PI / 2;
    this.scene.add(g);
    G.world.gridLines.material.opacity = 0.28;
    emit('placing', true);
  }
  rotateGhost() { if (!this.ghost) return; this.ghostRot = (this.ghostRot + 1) % 4; this.ghost.rotation.y = this.ghostRot * Math.PI / 2; G.audio.play('click'); }
  moveGhost(t) {
    if (!this.ghost) return;
    if (!t) { this.ghost.visible = false; this.highlight(null); return; }
    this.ghost.visible = true; this.ghost.position.set(t.x, 0, t.z);
    this.highlight(t, this.canPlace(t));
  }
  confirmPlace(t) {
    const p = this.placing; if (!p) return;
    if (!this.canPlace(t)) { G.audio.play('nope'); return; }
    if (p.moving) {
      p.done = true;
      const d = this.placeDecor(p.id, t, this.ghostRot, true);
      if (d) { d.prodT = p.moving.prodT; G.audio.play('place'); }
      this.cancelPlace(); return;
    }
    const d = this.queueBuild(p.id, t, this.ghostRot);
    if (!d) return;
    // keep placing cheap repeatables; otherwise finish
    const def = DECOR[p.id];
    if (!(def.cost <= 12 && G.coins >= def.cost)) this.cancelPlace();
  }
  cancelPlace() {
    if (this.placing?.moving && !this.placing.done) { /* moving cancelled: put it back */ const m = this.placing.moving; const back = this.placeDecor(m.id, m.t, m.rot, true); if (back) back.prodT = m.prodT; }
    if (this.ghost) this.scene.remove(this.ghost);
    this.ghost = null; this.placing = null;
    G.world.gridLines.material.opacity = (G.tool === 'hoe' || G.tool === 'edit') ? 0.18 : 0;
    this.highlight(null);
    emit('placing', false);
  }
  pickUp(d) {        // move an existing decoration
    this.removeDecor(d);
    this.startPlace(d.id, d);
  }

  /* ---------------- per frame ---------------- */
  update(dt, t) {
    const raining = G.rain > 0.5;
    this.sparkleTiles.length = 0;
    for (const col of this.tiles) for (const tile of col) {
      if (tile.pop > 0) {
        tile.pop = Math.max(0, tile.pop - dt * 3.2);
        const s = 1 + Math.sin(tile.pop * Math.PI) * 0.18;
        const e = 1 - tile.pop;
        if (tile.soil) tile.soil.scale.setScalar(tile.soil.scale.x < 0.99 ? Math.min(1, 0.2 + e * 1.1) : 1);
        if (tile.plant) tile.plant.scale.set(s, 1 + Math.sin(tile.pop * Math.PI) * 0.3, s);
      }
      if (!tile.crop) continue;
      if (tile.stage < 3) {
        const c = CROPS[tile.crop];
        const mul = (tile.wet > 0 || raining) ? 2 : 1;
        tile.progress = Math.min(1, tile.progress + dt / c.time * mul);
        const st = tile.progress >= 1 ? 3 : Math.min(2, Math.floor(tile.progress * 3));
        if (st !== tile.stage) this.setStage(tile, st);
        if (raining && tile.wet <= 0) { tile.wet = 1; tile.soil.geometry = M.soilGeo(true); }
      } else {
        this.sparkleTiles.push(tile);
        if (tile.plant) tile.plant.rotation.z = Math.sin(t * 1.5 + tile.i) * 0.02;
      }
      if (tile.wet > 0) { tile.wet -= dt; if (tile.wet <= 0 && !raining) { tile.wet = 0; tile.soil.geometry = M.soilGeo(false); } }
    }
    // ripe sparkles
    const pos = this.spark.geometry.attributes.position, n = pos.count;
    for (let k = 0; k < n; k++) {
      const tile = this.sparkleTiles[k % Math.max(1, this.sparkleTiles.length)];
      if (!tile || k >= this.sparkleTiles.length * 3) { pos.setXYZ(k, 0, -50, 0); continue; }
      const ph = t * 0.9 + k * 1.7, h = (ph % 1);
      pos.setXYZ(k, tile.x + Math.sin(k * 3.1 + Math.floor(ph)) * 0.6, 0.5 + h * 1.4, tile.z + Math.cos(k * 2.3 + Math.floor(ph)) * 0.6);
    }
    pos.needsUpdate = true;
    this.spark.material.opacity = 0.6 + Math.sin(t * 6) * 0.3;
    // decorations: production + bounce
    for (const d of this.decors) {
      const def = DECOR[d.id];
      if (d.pop > 0) { d.pop = Math.max(0, d.pop - dt * 3); const s = 1 + Math.sin(d.pop * Math.PI) * 0.15; d.mesh.scale.set(s, 1 + Math.sin(d.pop * Math.PI) * 0.25, s); }
      if (def.prod && !d.ready) {
        d.prodT -= dt;
        if (d.prodT <= 0) {
          d.ready = true;
          if (d.mesh.userData.fruit) d.mesh.userData.fruit.visible = true;
          d.bubble = M.iconSprite({ apple: '🍎', orange: '🍊', honey: '🍯' }[def.prod.item], 1.0);
          d.bubble.position.set(d.mesh.position.x, d.id === 'beehive' ? 2.6 : 4.2, d.mesh.position.z); this.scene.add(d.bubble);
        }
      }
      if (d.bubble) d.bubble.position.y = (d.id === 'beehive' ? 2.6 : 4.2) + Math.sin(t * 3 + d.t.i) * 0.12;
      if (d.mesh.userData.float) d.mesh.position.y = 0.4 + Math.sin(t * 0.8 + d.t.j) * 0.35;
    }
  }
}

export function roundRect(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
