// DOM overlays: HUD, prompt, toasts, dialog, floating world text, backpack.
import * as THREE from 'three';
import { G } from './state.js';
import { CATS } from './collectibles.js';

const $ = id => document.getElementById(id);

export class UI {
  constructor() {
    this.floaters = [];
    this.dlg = null;
    this.lastPrompt = undefined;
  }
  show(id, on = true) { $(id).classList.toggle('hidden', !on); }
  setLoad(p) { $('bar-fill').style.width = (p * 100).toFixed(1) + '%'; $('load-pct').textContent = Math.round(p * 100) + '%'; }
  prompt(text) {
    if (text === this.lastPrompt) return;
    this.lastPrompt = text;
    if (!text) { this.show('prompt', false); return; }
    $('prompt-text').textContent = text; this.show('prompt', true);
  }
  toast(t1, t2, life = 3, msg = false) {
    const el = document.createElement('div');
    el.className = 'toast' + (msg ? ' msg' : '');
    el.style.setProperty('--life', life + 's');
    el.innerHTML = (t1 ? `<div class="t1">${t1}</div>` : '') + `<div class="t2">${t2}</div>`;
    $('toasts').appendChild(el);
    setTimeout(() => el.remove(), (life + 0.6) * 1000);
    while ($('toasts').children.length > 4) $('toasts').firstChild.remove();
  }
  setCount(n, total) {
    $('disc-n').textContent = n;
    const el = $('hud-count'); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  }
  banner(small, big) {
    $('banner-small').textContent = small; $('banner-big').textContent = big;
    const b = $('banner'); b.classList.add('hidden'); void b.offsetWidth; b.classList.remove('hidden');
    clearTimeout(this._bt); this._bt = setTimeout(() => b.classList.add('hidden'), 4600);
  }
  // dialog: array of lines, advances with E / click
  dialog(name, lines, onDone) {
    this.dlg = { name, lines, i: 0, onDone };
    G.setMode('dialog');
    $('dlg-name').textContent = name; $('dlg-text').textContent = lines[0];
    this.show('dialog', true);
    G.audio?.play('talk');
  }
  advanceDialog() {
    const d = this.dlg; if (!d) return;
    d.i++;
    if (d.i >= d.lines.length) { this.show('dialog', false); this.dlg = null; G.setMode('play'); d.onDone?.(); return; }
    $('dlg-text').textContent = d.lines[d.i]; G.audio?.play('talk');
  }
  floatText(text, pos, color = '#ff6fa5', life = 1.4, size = 30) {
    const el = document.createElement('div');
    el.textContent = text;
    Object.assign(el.style, { position: 'absolute', left: 0, top: 0, fontWeight: 700, fontSize: size + 'px', color, textShadow: '0 3px 0 #fff, 0 0 12px rgba(255,255,255,.9)', pointerEvents: 'none', whiteSpace: 'nowrap', willChange: 'transform' });
    $('hud').appendChild(el);
    this.floaters.push({ el, pos: pos.clone(), life, max: life, vy: 1.2 });
  }
  hearts(pos, n = 5) {
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const p = pos.clone(); p.x += (Math.random() - 0.5) * 0.8; p.z += (Math.random() - 0.5) * 0.8; p.y += 0.6 + Math.random() * 0.4;
        this.floatText('❤', p, ['#ff6f91', '#ff8fb8', '#ffb3d1'][i % 3], 1.3, 22 + Math.random() * 10);
      }, i * 110);
    }
  }
  update(dt) {
    const cam = G.camera, w = innerWidth, h = innerHeight, v = new THREE.Vector3();
    for (let i = this.floaters.length - 1; i >= 0; i--) {
      const f = this.floaters[i];
      f.life -= dt; f.pos.y += f.vy * dt;
      if (f.life <= 0) { f.el.remove(); this.floaters.splice(i, 1); continue; }
      v.copy(f.pos).project(cam);
      const vis = v.z < 1 && G.mode !== 'selfie';
      f.el.style.display = vis ? 'block' : 'none';
      const a = Math.min(1, f.life / (f.max * 0.4));
      const s = 1 + (1 - f.life / f.max) * 0.25;
      f.el.style.opacity = a;
      f.el.style.transform = `translate(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px) translate(-50%,-50%) scale(${s})`;
    }
  }
  renderBackpack() {
    const C = G.collect;
    $('bp-cats').innerHTML = Object.entries(CATS).map(([k, c]) => {
      const n = C.countCat(k);
      return `<div class="cat"><span class="ci">${c.icon}</span><span class="cn">${c.label}</span><span class="cb"><div style="width:${n / c.total * 100}%"></div></span><span class="cc">${n} / ${c.total}</span></div>`;
    }).join('');
    const found = C.order.map(id => C.items[id]);
    $('bp-items').innerHTML = found.length ? found.map(d => `<span class="item">${d.icon} ${d.name}</span>`).join('') : '<span class="item locked">Nothing yet — go explore! 🌸</span>';
    const bag = [...C.bag].map(id => C.items[id]);
    if (G.flags.catFriend) bag.push({ icon: '🐱', name: 'Cat friend' });
    $('bp-quest').innerHTML = bag.length ? bag.map(d => `<span class="item">${d.icon} ${d.name}</span>`).join('') : '<span class="item locked">Empty</span>';
  }
}
