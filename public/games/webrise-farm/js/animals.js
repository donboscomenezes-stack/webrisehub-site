// Farm animals living in pens: wander, get hungry, eat, produce goods. Plus a free-roaming pet dog.
import * as THREE from 'three';
import { G, emit, addItem, addXP, spend, takeItems, rand, clamp } from './game.js';
import { ANIMALS, CROPS, GOODS } from './config.js';
import * as M from './models.js';
import { PENS } from './world.js';

export class Animals {
  constructor() {
    this.list = [];
    this.pickables = [];
    this.dog = null;
  }
  count(pen) { return this.list.filter(a => a.pen === pen).length; }
  total() { return this.list.length; }
  spawn(type, quiet = false) {
    const def = ANIMALS[type], p = PENS[def.pen];
    const mesh = M.animalMesh(type);
    const x = rand(p.x0 + 2, p.x1 - 2), z = rand(p.z0 + 2, p.z1 - 2);
    mesh.position.set(x, 0, z); mesh.rotation.y = rand(0, 6.28);
    G.scene.add(mesh);
    const a = { type, def, pen: def.pen, mesh, state: 'hungry', t: 0, target: new THREE.Vector3(x, 0, z), idle: rand(0.5, 3), walk: 0, bubble: null, hop: 0 };
    mesh.userData.tap = 'animal'; mesh.userData.animal = a;
    this.pickables.push(mesh);
    this.list.push(a);
    this.setBubble(a);
    if (!quiet) { G.fx.burst(mesh.position.clone().setY(0.6), 0xffffff, 24, 2.5); a.hop = 1; }
    return a;
  }
  buy(type) {
    const def = ANIMALS[type];
    if (def.lvl > G.level) { G.ui.toast('🔒 Locked', `${def.name}s unlock at level ${def.lvl}.`); return false; }
    if (this.count(def.pen) >= def.max) { G.ui.toast('🏡 Pen is full', `The ${PENS[def.pen].label} holds ${def.max} ${def.name.toLowerCase()}s.`); return false; }
    if (!spend(def.cost)) { G.ui.toast('🪙 Not enough coins', `A ${def.name.toLowerCase()} costs ${def.cost}.`); G.audio.play('nope'); return false; }
    const a = this.spawn(type);
    G.audio.play(type);
    addXP(3);
    G.cam.focus(a.mesh.position, 26);
    emit('animal', type);
    return a;
  }
  setBubble(a) {
    if (a.bubble) { G.scene.remove(a.bubble); a.bubble = null; }
    let icon = null;
    if (a.state === 'hungry') icon = CROPS[a.def.feed].icon;
    if (a.state === 'ready') icon = GOODS[a.def.product].icon;
    if (!icon) return;
    a.bubble = M.iconSprite(icon, a.type === 'cow' ? 1.0 : 0.85);
    G.scene.add(a.bubble);
  }
  feed(a, quiet) {
    if (a.state !== 'hungry') return false;
    const need = { [a.def.feed]: a.def.feedQty };
    if (!takeItems(need)) { if (!quiet) { G.ui.toast(`${a.def.icon} Hungry!`, `Needs ${a.def.feedQty} ${CROPS[a.def.feed].icon} ${CROPS[a.def.feed].name}. Grow some in your fields.`); G.audio.play('nope'); } return false; }
    a.state = 'busy'; a.t = a.def.time; a.hop = 1;
    this.setBubble(a);
    G.ui.hearts(a.mesh.position.clone().setY(1.2), 3);
    G.audio.play(a.type);
    emit('feed', a.type);
    return true;
  }
  collect(a) {
    if (a.state !== 'ready') return false;
    const prod = a.def.product;
    addItem(prod, 1); addXP(a.def.xp); G.stats.collected++;
    G.ui.fly(a.mesh.position.clone().setY(1.4), GOODS[prod].icon, 'barn');
    a.state = 'hungry'; a.hop = 1;
    this.setBubble(a);
    G.audio.play('harvest');
    emit('collect', prod);
    return true;
  }
  tap(a) {
    if (a.state === 'ready') return this.collect(a);
    if (a.state === 'hungry') return this.feed(a);
    G.ui.floatText(`⏳ ${Math.ceil(a.t)}s`, a.mesh.position.clone().setY(a.type === 'cow' ? 2.2 : 1.4), '#5a3e2b');
    a.hop = 0.6; G.audio.play(a.type);
    return false;
  }
  tapPen(pen) {   // trough / coop: feed everyone hungry & collect everything ready
    const here = this.list.filter(a => a.pen === pen);
    if (!here.length) {
      const def = Object.values(ANIMALS).find(d => d.pen === pen);
      if (def.lvl > G.level) G.ui.toast(`${def.icon} ${PENS[pen].label}`, `${def.name}s unlock at level ${def.lvl}.`);
      else G.ui.openShop('animals');
      return;
    }
    let did = 0;
    for (const a of here) if (a.state === 'ready') { this.collect(a); did++; }
    let fed = 0, starving = 0;
    for (const a of here) if (a.state === 'hungry') { if (this.feed(a, true)) fed++; else starving++; }
    if (starving && !fed && !did) { const d = here[0].def; G.ui.toast(`${d.icon} Hungry animals`, `They eat ${CROPS[d.feed].icon} ${CROPS[d.feed].name}. Harvest some first!`); G.audio.play('nope'); }
    else if (!did && !fed) { const busy = here.filter(a => a.state === 'busy'); if (busy.length) G.ui.toast(`${here[0].def.icon} All fed`, `Next ${GOODS[here[0].def.product].name.toLowerCase()} in ${Math.ceil(Math.min(...busy.map(a => a.t)))}s`); }
  }
  addDog() {
    const d = M.animalMesh('dog'); d.position.set(3, 0, 14); G.scene.add(d);
    d.userData.tap = 'dog'; this.pickables.push(d);
    this.dog = { mesh: d, target: new THREE.Vector3(3, 0, 14), idle: 2, walk: 0, hop: 0 };
  }
  petDog() { const d = this.dog; d.hop = 1; d.idle = 3; G.ui.hearts(d.mesh.position.clone().setY(1), 4); G.audio.play('woof'); }

  update(dt, t) {
    for (const a of this.list) {
      const m = a.mesh, p = PENS[a.pen];
      if (a.state === 'busy') { a.t -= dt; if (a.t <= 0) { a.state = 'ready'; this.setBubble(a); a.hop = 1; } }
      // wander
      const dx = a.target.x - m.position.x, dz = a.target.z - m.position.z, d = Math.hypot(dx, dz);
      let moving = false;
      if (a.idle > 0) { a.idle -= dt; }
      else if (d < 0.2) { a.idle = rand(1.5, 5); a.target.set(rand(p.x0 + 1.6, p.x1 - 1.6), 0, rand(p.z0 + 1.6, p.z1 - 1.6)); }
      else {
        const sp = a.type === 'chicken' ? 1.3 : 0.8;
        const want = Math.atan2(dx, dz);
        let diff = ((want - m.rotation.y + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
        m.rotation.y += diff * Math.min(1, dt * 4);
        if (Math.abs(diff) < 0.8) { m.position.x += Math.sin(m.rotation.y) * sp * dt; m.position.z += Math.cos(m.rotation.y) * sp * dt; moving = true; }
      }
      a.walk += moving ? dt * (a.type === 'chicken' ? 14 : 7) : 0;
      const legs = m.userData.legs;
      legs.forEach((l, i) => l.rotation.x = moving ? Math.sin(a.walk + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI : 0)) * 0.45 : 0);
      const body = m.userData.body;
      if (a.type === 'chicken') body.rotation.x = !moving && a.idle > 0 && Math.sin(t * 2 + m.position.x) > 0.6 ? 0.5 : 0;    // pecking
      if (a.hop > 0) a.hop = Math.max(0, a.hop - dt * 2.5);
      m.position.y = Math.abs(Math.sin(a.hop * Math.PI * 2)) * 0.35 * a.hop + (moving && a.type === 'chicken' ? Math.abs(Math.sin(a.walk)) * 0.05 : 0);
      if (a.bubble) a.bubble.position.set(m.position.x, (a.type === 'cow' ? 2.3 : a.type === 'sheep' ? 1.9 : 1.35) + Math.sin(t * 3 + m.position.z) * 0.08, m.position.z);
    }
    // dog trots between interesting spots
    const dg = this.dog;
    if (dg) {
      const m = dg.mesh, dx = dg.target.x - m.position.x, dz = dg.target.z - m.position.z, d = Math.hypot(dx, dz);
      let moving = false;
      if (dg.idle > 0) dg.idle -= dt;
      else if (d < 0.3) { dg.idle = rand(2, 6); const spots = [[3, 14], [-4, 14.5], [10, 15], [0, -15], [-6, -15.5], [8, -15], [17.5, 0], [-17.5, 4], [-14, 14]]; const s = spots[Math.floor(Math.random() * spots.length)]; dg.target.set(s[0] + rand(-1, 1), 0, s[1] + rand(-1, 1)); }
      else { const want = Math.atan2(dx, dz); let diff = ((want - m.rotation.y + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; m.rotation.y += diff * Math.min(1, dt * 5); if (Math.abs(diff) < 0.7) { m.position.x += Math.sin(m.rotation.y) * 2.6 * dt; m.position.z += Math.cos(m.rotation.y) * 2.6 * dt; moving = true; } }
      dg.walk += moving ? dt * 12 : 0;
      m.userData.legs.forEach((l, i) => l.rotation.x = moving ? Math.sin(dg.walk + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI : 0)) * 0.6 : 0);
      if (m.userData.tail) m.userData.tail.rotation.z = Math.sin(t * (dg.hop > 0 ? 28 : 10)) * 0.6;
      if (dg.hop > 0) dg.hop = Math.max(0, dg.hop - dt * 2);
      m.position.y = Math.abs(Math.sin(dg.hop * Math.PI * 3)) * 0.4 * dg.hop;
    }
  }
}

/* ---------------- kitchen ---------------- */
export class Kitchen {
  constructor() { this.queue = []; this.ready = []; this.bubble = null; }
  get busy() { return this.queue.length > 0; }
  cook(recipe) {
    if (recipe.lvl > G.level) return false;
    if (this.queue.length >= 3) { G.ui.toast('🍳 Kitchen busy', 'Up to 3 dishes can be queued.'); return false; }
    if (!takeItems(recipe.needs)) { G.ui.toast('🧺 Missing ingredients', 'Grow or collect what the recipe needs.'); G.audio.play('nope'); return false; }
    this.queue.push({ recipe, t: recipe.time });
    G.audio.play('cook'); emit('kitchen');
    return true;
  }
  collect() {
    if (!this.ready.length) return false;
    const pos = G.world.kitchen.position.clone().setY(4);
    for (const r of this.ready) { addItem(r.id, 1); addXP(r.xp); G.stats.cooked++; G.ui.fly(pos, GOODS[r.id].icon, 'barn'); }
    this.ready = [];
    this.updateBubble();
    G.audio.play('harvest'); emit('kitchen'); emit('collect');
    return true;
  }
  updateBubble() {
    if (this.bubble) { G.scene.remove(this.bubble); this.bubble = null; }
    const icon = this.ready.length ? GOODS[this.ready[0].id].icon : this.queue.length ? '🍳' : null;
    if (!icon) return;
    this.bubble = M.iconSprite(icon, 1.4);
    this.bubble.position.copy(G.world.kitchen.position).setY(5.6);
    G.scene.add(this.bubble);
  }
  update(dt, t) {
    const q = this.queue[0];
    if (q) {
      q.t -= dt;
      if (q.t <= 0) { this.queue.shift(); this.ready.push(q.recipe); this.updateBubble(); G.audio.play('ding'); emit('kitchen'); }
      else if (!this.bubble) this.updateBubble();
    }
    if (this.bubble) this.bubble.position.y = 5.6 + Math.sin(t * 3) * 0.15;
  }
}
