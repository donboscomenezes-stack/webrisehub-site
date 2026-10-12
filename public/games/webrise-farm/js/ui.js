// HUD, toolbar, panels (barn, orders, shop, kitchen, farm), tutorial, toasts and juicy feedback.
import * as THREE from 'three';
import { G, on, emit, earn, spend, addXP, takeItems, hasItems, xpProgress, unlocksAt, refreshOrders, makeOrder, farmRating } from './game.js';
import { CROPS, GOODS, ANIMALS, RECIPES, DECOR, BRAND, HELPERS, itemInfo, MAX_LEVEL, LEVELS } from './config.js';
import { buildTime } from './workers.js';

const $ = id => document.getElementById(id);
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const icon = id => itemInfo(id)?.icon || '❔';
const nameOf = id => itemInfo(id)?.name || id;

const TOOLS = [
  { id: 'hand', icon: '👆', label: 'Tap' },
  { id: 'hoe', icon: '⛏️', label: 'Hoe' },
  { id: 'seed', icon: '🌱', label: 'Plant' },
  { id: 'water', icon: '💧', label: 'Water' },
  { id: 'harvest', icon: '🧺', label: 'Harvest' },
  { id: 'edit', icon: '✋', label: 'Edit' },
];
const TUTORIAL = [
  { ev: 'harvest', n: 1, text: '✨ Wheat is ready! <b>Tap the sparkling crops</b> — Farmer Joe will walk over and harvest them.' },
  { ev: 'plant', n: 2, text: '🌱 Tap empty brown soil to <b>plant seeds</b> — drag across fields to give Joe a whole list of jobs!' },
  { ev: 'water', n: 1, text: '💧 <b>Tap a sprout to water it</b> — watered crops grow twice as fast.' },
  { ev: 'feed', n: 1, text: '🐔 Your chicken is hungry. <b>Tap the chicken</b> (or its trough) to feed it wheat.' },
  { ev: 'order', n: 1, text: '📋 Open <b>Orders</b> and deliver goods to earn coins & XP.' },
  { ev: 'till', n: 1, text: '⛏️ Pick the <b>Hoe</b> and tap grass to make more fields.' },
  { ev: 'shop', n: 1, text: '🛒 Visit the <b>Shop</b> to buy animals and decorations — or <b>hire helpers</b> to work faster!' },
  { ev: 'photo', n: 1, text: `📸 Proud of your farm? <b>Take a photo</b> and tag ${BRAND.instagram}!` },
];

export class UI {
  constructor() {
    this.floats = [];
    this.tut = 0; this.tutCount = 0; this.tutOff = false;
    this.coinShown = G.coins;
    this.buildToolbar();
    this.bind();
  }
  /* ---------------- setup ---------------- */
  buildToolbar() {
    const tb = $('toolbar');
    tb.innerHTML = TOOLS.map((t, i) => `<button class="tool" data-tool="${t.id}" title="${t.label} (${i + 1})"><span class="ti" id="ti-${t.id}">${t.icon}</span><span class="tl">${t.label}</span></button>`).join('');
    tb.querySelectorAll('.tool').forEach(b => b.onclick = () => { G.audio.unlock(); const id = b.dataset.tool; if (id === 'seed' && G.tool === 'seed') this.toggleSeeds(); else this.setTool(id); });
    this.renderSeeds();
    this.setTool('hand');
  }
  bind() {
    $('btn-orders').onclick = () => this.openOrders();
    $('btn-barn').onclick = () => this.openBarn();
    $('btn-shop').onclick = () => this.openShop();
    $('btn-photo').onclick = () => G.photo.enter();
    $('btn-sound').onclick = () => { const on = !(G.audio.music || G.audio.sfx); G.audio.music = on; G.audio.sfx = on; $('btn-sound').textContent = on ? '🔊' : '🔇'; };
    $('btn-help').onclick = () => this.openHelp();
    $('btn-center').onclick = () => G.cam.set({ target: new THREE.Vector3(0, 0, 3), dist: 46, pitch: 0.88 });
    $('place-rotate').onclick = () => G.farm.rotateGhost();
    $('place-done').onclick = () => G.farm.cancelPlace();
    $('overlay').addEventListener('pointerdown', e => { if (e.target.id === 'overlay') this.closeAll(); });
    $('hint').onclick = () => { $('hint').classList.add('hidden'); };
    on('coins', () => this.updateCoins());
    on('xp', () => this.updateXP());
    on('inv', () => { this.updateBadges(); this.renderSeeds(); if (this.panel === 'orders') this.openOrders(true); if (this.panel === 'barn') this.openBarn(true); if (this.panel === 'kitchen') this.openKitchen(true); });
    on('orders', () => this.updateBadges());
    on('levelup', lv => setTimeout(() => this.levelUp(lv), 500));
    on('placing', p => { $('placebar').classList.toggle('hidden', !p); $('toolbar').classList.toggle('hidden', p); $('seedtray').classList.add('hidden'); if (p) { const d = DECOR[G.farm.placing.id]; $('place-name').textContent = `${d.icon} ${d.name}`; $('place-cost').textContent = G.farm.placing.moving ? 'Moving' : `🪙 ${d.cost}`; } });
    on('jobs', () => this.updateJobs());
    on('hire', () => this.updateJobs());
    on('kitchen', () => { if (this.panel === 'kitchen') this.openKitchen(true); });
    for (const ev of ['harvest', 'plant', 'water', 'feed', 'order', 'till', 'shop', 'photo']) on(ev, () => this.tutEvent(ev));
  }
  start() {
    $('farm-name').textContent = G.farmName;
    this.updateCoins(true); this.updateXP(); this.updateBadges();
    this.showTut();
  }
  /* ---------------- tools & seeds ---------------- */
  setTool(id) {
    if (G.farm.placing) G.farm.cancelPlace();
    G.tool = id;
    document.querySelectorAll('.tool').forEach(b => b.classList.toggle('active', b.dataset.tool === id));
    $('seedtray').classList.toggle('hidden', id !== 'seed');
    G.world.gridLines.material.opacity = (id === 'hoe' || id === 'edit') ? 0.18 : 0;
    G.audio.play('click');
    const tips = { hoe: 'Tap or drag over grass to make fields', seed: 'Pick a seed, then tap or drag over soil', water: 'Tap or drag over growing crops', harvest: 'Drag over ripe crops to harvest', edit: 'Tap a decoration to move, rotate or sell it' };
    if (tips[id]) this.hint(tips[id]);
  }
  toggleSeeds() { $('seedtray').classList.toggle('hidden'); }
  renderSeeds() {
    const tray = $('seedtray');
    tray.innerHTML = Object.entries(CROPS).map(([id, c]) => {
      const locked = c.lvl > G.level;
      return `<button class="seed ${G.seed === id ? 'sel' : ''} ${locked ? 'locked' : ''}" data-seed="${id}"><span class="si">${locked ? '🔒' : c.icon}</span><span class="sn">${c.name}</span><span class="sc">${locked ? 'Lv ' + c.lvl : '🪙' + c.seed + ' · ' + c.time + 's'}</span>${G.inv[id] ? `<i>${G.inv[id]}</i>` : ''}</button>`;
    }).join('');
    tray.querySelectorAll('.seed').forEach(b => b.onclick = () => {
      const id = b.dataset.seed; if (CROPS[id].lvl > G.level) { this.toast('🔒 Locked', `${CROPS[id].name} unlocks at level ${CROPS[id].lvl}`); return; }
      G.seed = id; this.renderSeeds(); $('ti-seed').textContent = CROPS[id].icon; G.audio.play('click');
      if (G.tool !== 'seed') this.setTool('seed');
    });
    $('ti-seed').textContent = CROPS[G.seed].icon;
  }
  /* ---------------- HUD numbers ---------------- */
  updateCoins(snap) {
    const el = $('coin-n'); const from = this.coinShown, to = G.coins;
    if (snap || from === to) { el.textContent = to; this.coinShown = to; return; }
    cancelAnimationFrame(this._coinRaf);
    const t0 = performance.now();
    const step = () => { const k = Math.min(1, (performance.now() - t0) / 450); const v = Math.round(from + (to - from) * k); el.textContent = v; this.coinShown = v; if (k < 1) this._coinRaf = requestAnimationFrame(step); };
    step();
    this.bump('coins');
  }
  updateXP() {
    $('lvl-n').textContent = G.level;
    $('xp-fill').style.width = (xpProgress() * 100).toFixed(1) + '%';
    $('xp-text').textContent = G.level >= MAX_LEVEL ? 'MAX' : `${G.xp - LEVELS[G.level]} / ${LEVELS[G.level + 1] - LEVELS[G.level]} XP`;
  }
  updateBadges() {
    const ready = G.orders.filter(o => hasItems(o.needs)).length;
    const b = $('orders-badge'); b.textContent = ready; b.classList.toggle('hidden', !ready);
    const n = Object.values(G.inv).reduce((a, b) => a + b, 0);
    const bb = $('barn-badge'); bb.textContent = n; bb.classList.toggle('hidden', !n);
  }
  updateJobs() {
    const n = G.workers.pending(), el = $('jobs');
    el.classList.toggle('hidden', !n);
    const busy = G.workers.farmers.length;
    el.innerHTML = `👨‍🌾 <b>${n}</b> job${n === 1 ? '' : 's'} queued <small>· ${busy} farmer${busy === 1 ? '' : 's'}</small>`;
  }
  bump(id) { const el = $(id === 'coins' ? 'coins' : id === 'barn' ? 'btn-barn' : id); if (!el) return; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }

  /* ---------------- feedback ---------------- */
  toast(title, text, life = 2.8) {
    const el = h(`<div class="toast" style="--life:${life}s">${title ? `<b>${title}</b>` : ''}<span>${text}</span></div>`);
    $('toasts').appendChild(el); setTimeout(() => el.remove(), (life + 0.5) * 1000);
    while ($('toasts').children.length > 3) $('toasts').firstChild.remove();
  }
  hint(text) {
    if (this.tut < TUTORIAL.length && !this.tutOff) return;   // tutorial owns the hint bubble
    const el = $('mini-hint'); el.textContent = text; el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  }
  screenPos(v) { const p = v.clone().project(G.camera); return { x: (p.x * 0.5 + 0.5) * innerWidth, y: (-p.y * 0.5 + 0.5) * innerHeight, vis: p.z < 1 }; }
  fly(worldPos, emoji, target = 'barn', count = 1) {
    const s = this.screenPos(worldPos);
    const tEl = target === 'coins' ? $('coins') : $('btn-barn');
    const r = tEl.getBoundingClientRect();
    for (let i = 0; i < Math.min(count, 4); i++) {
      const el = h(`<div class="flyer">${emoji}</div>`); document.body.appendChild(el);
      el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%,-50%) scale(1.3)`;
      setTimeout(() => {
        el.style.transition = 'transform .75s cubic-bezier(.5,-0.3,.6,1), opacity .75s';
        el.style.transform = `translate(${r.left + r.width / 2}px, ${r.top + r.height / 2}px) translate(-50%,-50%) scale(.6)`;
      }, 60 + i * 90);
      setTimeout(() => { el.remove(); this.bump(target); }, 880 + i * 90);
    }
  }
  floatText(text, worldPos, color = '#fff', life = 1.3, size = 22) {
    const el = h(`<div class="floater" style="color:${color};font-size:${size}px">${text}</div>`); $('floats').appendChild(el);
    this.floats.push({ el, pos: worldPos.clone(), life, max: life });
  }
  hearts(pos, n = 3) { for (let i = 0; i < n; i++) setTimeout(() => this.floatText('❤', pos.clone().add(new THREE.Vector3((Math.random() - .5) * .8, Math.random() * .4, (Math.random() - .5) * .8)), ['#ff6f91', '#ff8fb8', '#ff4f7a'][i % 3], 1.2, 20 + Math.random() * 8), i * 110); }
  update(dt) {
    for (let i = this.floats.length - 1; i >= 0; i--) {
      const f = this.floats[i]; f.life -= dt; f.pos.y += dt * 1.1;
      if (f.life <= 0) { f.el.remove(); this.floats.splice(i, 1); continue; }
      const s = this.screenPos(f.pos);
      f.el.style.opacity = Math.min(1, f.life / (f.max * 0.4));
      f.el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%,-50%)`;
      f.el.style.display = s.vis ? 'block' : 'none';
    }
  }
  /* ---------------- tutorial ---------------- */
  showTut() {
    const el = $('hint');
    if (this.tutOff || this.tut >= TUTORIAL.length) { el.classList.add('hidden'); return; }
    el.innerHTML = `<span class="step">${this.tut + 1}/${TUTORIAL.length}</span> ${TUTORIAL[this.tut].text} <button id="tut-skip" title="Hide tips">✕</button>`;
    el.classList.remove('hidden'); el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    $('tut-skip').onclick = (e) => { e.stopPropagation(); this.tutOff = true; el.classList.add('hidden'); };
  }
  tutEvent(ev) {
    const step = TUTORIAL[this.tut]; if (!step || ev !== step.ev) return;
    if (++this.tutCount >= step.n) { this.tut++; this.tutCount = 0; G.audio.play('coin'); setTimeout(() => this.showTut(), 600); }
  }

  /* ---------------- panels ---------------- */
  openPanel(name, title, body, opts = {}) {
    this.panel = name;
    const ov = $('overlay');
    ov.innerHTML = '';
    const p = h(`<div class="panel ${opts.cls || ''}"><div class="ph"><h2>${title}</h2><button class="x">✕</button></div><div class="pb"></div></div>`);
    p.querySelector('.pb').append(...(Array.isArray(body) ? body : [body]));
    p.querySelector('.x').onclick = () => this.closeAll();
    ov.appendChild(p); ov.classList.remove('hidden');
    if (!opts.keep) G.audio.play('open');
    G.farm.highlight(null);
    return p;
  }
  closeAll() { $('overlay').classList.add('hidden'); $('overlay').innerHTML = ''; this.panel = null; }

  openBarn(keep) {
    const items = Object.entries(G.inv).filter(([, q]) => q > 0);
    const total = items.reduce((a, [id, q]) => a + itemInfo(id).sell * q, 0);
    const grid = h(`<div class="items"></div>`);
    if (!items.length) grid.appendChild(h(`<div class="empty">Your barn is empty.<br>Harvest crops and collect animal goods to fill it! 🌾</div>`));
    for (const [id, q] of items) {
      const info = itemInfo(id);
      const card = h(`<div class="item"><div class="ii">${info.icon}<i>${q}</i></div><div class="in">${info.name}</div><div class="ip">🪙 ${info.sell} each</div><div class="ib"><button class="b1">Sell 1</button><button class="ba">All</button></div></div>`);
      card.querySelector('.b1').onclick = () => this.sell(id, 1);
      card.querySelector('.ba').onclick = () => this.sell(id, G.inv[id]);
      grid.appendChild(card);
    }
    const foot = h(`<div class="pfoot"><span>Market value: <b>🪙 ${total}</b></span><span class="muted">Tip: orders pay ~60% more than the market!</span></div>`);
    this.openPanel('barn', '🏠 Barn & Market', [grid, foot], { keep });
  }
  sell(id, n) {
    const info = itemInfo(id); if (!takeItems({ [id]: n })) return;
    earn(info.sell * n); G.stats.sold += n;
    G.audio.play('coin');
    this.toast('', `Sold ${n} ${info.icon} for 🪙 ${info.sell * n}`, 1.6);
  }
  openOrders(keep) {
    if (!keep) emit('ordersopen');
    const wrap = h(`<div class="orders"></div>`);
    for (const o of G.orders) {
      const ok = hasItems(o.needs);
      const needs = Object.entries(o.needs).map(([id, q]) => { const have = G.inv[id] || 0; return `<span class="need ${have >= q ? 'ok' : ''}">${icon(id)} <b>${Math.min(have, q)}/${q}</b></span>`; }).join('');
      const card = h(`<div class="order ${ok ? 'ready' : ''}"><div class="who"><span class="face">${o.face}</span><span>${o.who}</span></div><div class="needs">${needs}</div><div class="reward">🪙 ${o.coins} <span>⭐ ${o.xp} XP</span></div><div class="ob"><button class="del" ${ok ? '' : 'disabled'}>Deliver</button><button class="skip" title="Swap for a new order">↻</button></div></div>`);
      card.querySelector('.del').onclick = () => this.deliver(o);
      card.querySelector('.skip').onclick = () => { G.orders[G.orders.indexOf(o)] = makeOrder(); G.audio.play('click'); this.openOrders(true); this.updateBadges(); };
      wrap.appendChild(card);
    }
    this.openPanel('orders', '📋 Orders', [wrap, h(`<div class="pfoot muted">Deliveries go out on the little blue truck 🚚</div>`)], { keep });
  }
  deliver(o) {
    if (!takeItems(o.needs)) return;
    G.orders.splice(G.orders.indexOf(o), 1);
    earn(o.coins); addXP(o.xp); G.stats.orders++;
    G.audio.play('order');
    G.world.sendTruck();
    const r = $('btn-orders').getBoundingClientRect();
    for (let i = 0; i < 5; i++) setTimeout(() => { const el = h(`<div class="flyer">🪙</div>`); document.body.appendChild(el); el.style.transform = `translate(${r.left}px,${r.top}px)`; const c = $('coins').getBoundingClientRect(); setTimeout(() => { el.style.transition = 'transform .6s ease-in'; el.style.transform = `translate(${c.left + 20}px,${c.top + 18}px) scale(.7)`; }, 30); setTimeout(() => el.remove(), 700); }, i * 70);
    this.toast('🚚 Order delivered!', `${o.who} paid 🪙 ${o.coins} (+${o.xp} XP)`);
    emit('order');
    setTimeout(() => { refreshOrders(); if (this.panel === 'orders') this.openOrders(true); }, 900);
    this.openOrders(true);
  }
  openShop(tab = 'animals') {
    emit('shop');
    const tabs = h(`<div class="tabs"><button data-t="helpers">👨‍🌾 Helpers</button><button data-t="animals">🐮 Animals</button><button data-t="trees">🌳 Trees</button><button data-t="decor">🌷 Decor</button></div>`);
    const grid = h(`<div class="items shop"></div>`);
    const render = (t) => {
      tabs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
      grid.innerHTML = '';
      if (t === 'helpers') {
        for (const hp of HELPERS) {
          const owned = G.workers.hired.has(hp.id), locked = hp.lvl > G.level;
          const card = h(`<div class="item ${locked ? 'locked' : ''}"><div class="ii">${hp.icon}</div><div class="in">${hp.name}</div><div class="ip">${owned ? 'On your farm 💛' : locked ? `🔒 Level ${hp.lvl}` : 'Works on jobs alongside your team'}</div><div class="ib"><button class="buy" ${owned || locked ? 'disabled' : ''}>${owned ? 'Hired' : '🪙 ' + hp.cost}</button></div></div>`);
          card.querySelector('.buy').onclick = () => { if (G.workers.hire(hp.id)) this.closeAll(); };
          grid.appendChild(card);
        }
      } else if (t === 'animals') {
        for (const [id, a] of Object.entries(ANIMALS)) {
          const locked = a.lvl > G.level, n = G.animals.count(a.pen);
          const card = h(`<div class="item ${locked ? 'locked' : ''}"><div class="ii">${a.icon}</div><div class="in">${a.name}</div><div class="ip">${locked ? `🔒 Level ${a.lvl}` : `${n}/${a.max} · eats ${CROPS[a.feed].icon}`}</div><div class="ip">gives ${GOODS[a.product].icon} every ${a.time}s</div><div class="ib"><button class="buy" ${locked || n >= a.max ? 'disabled' : ''}>🪙 ${a.cost}</button></div></div>`);
          card.querySelector('.buy').onclick = () => { if (G.animals.buy(id)) this.closeAll(); };
          grid.appendChild(card);
        }
      } else {
        for (const [id, d] of Object.entries(DECOR)) {
          if (d.cat !== t) continue;
          const locked = d.lvl > G.level;
          const card = h(`<div class="item ${locked ? 'locked' : ''}"><div class="ii">${d.icon}</div><div class="in">${d.name}</div><div class="ip">${locked ? `🔒 Level ${d.lvl}` : d.prod ? `gives ${GOODS[d.prod.item].icon} ×${d.prod.qty} / ${d.prod.time}s` : 'decoration'}</div><div class="ip">🔨 ${buildTime(id)}s to build</div><div class="ib"><button class="buy" ${locked ? 'disabled' : ''}>🪙 ${d.cost}</button></div></div>`);
          card.querySelector('.buy').onclick = () => { if (G.coins < d.cost) { this.toast('🪙 Not enough coins', `${d.name} costs ${d.cost}.`); G.audio.play('nope'); return; } this.closeAll(); G.farm.startPlace(id); this.hint('Tap a grass tile to place it · R or ↻ to rotate'); };
          grid.appendChild(card);
        }
      }
    };
    tabs.querySelectorAll('button').forEach(b => b.onclick = () => { render(b.dataset.t); G.audio.play('click'); });
    render(tab);
    this.openPanel('shop', '🛒 Shop', [tabs, grid], { cls: 'wide' });
  }
  openKitchen(keep) {
    if (G.level < 3) { this.toast('🍳 Kitchen', 'The kitchen opens at level 3 — keep farming!'); return; }
    const K = G.kitchen;
    const list = h(`<div class="recipes"></div>`);
    for (const r of RECIPES) {
      const g = GOODS[r.id], locked = r.lvl > G.level, ok = !locked && hasItems(r.needs);
      const needs = Object.entries(r.needs).map(([id, q]) => `<span class="need ${(G.inv[id] || 0) >= q ? 'ok' : ''}">${icon(id)} ${G.inv[id] || 0}/${q}</span>`).join('');
      const row = h(`<div class="recipe ${locked ? 'locked' : ''}"><div class="ri">${g.icon}</div><div class="rm"><b>${g.name}</b><div class="needs">${locked ? `🔒 Level ${r.lvl}` : needs}</div></div><div class="rr"><span>⏱ ${r.time}s · 🪙 ${g.sell}</span><button ${ok ? '' : 'disabled'}>Cook</button></div></div>`);
      row.querySelector('button').onclick = () => { if (K.cook(r)) this.openKitchen(true); };
      list.appendChild(row);
    }
    const q = K.queue.map((x, i) => `<span class="qi">${GOODS[x.recipe.id].icon}${i === 0 ? ` ${Math.ceil(x.t)}s` : ''}</span>`).join('') || '<span class="muted">Nothing cooking</span>';
    const ready = K.ready.length ? `<button class="collect">Collect ${K.ready.map(r => GOODS[r.id].icon).join('')}</button>` : '';
    const foot = h(`<div class="pfoot"><span>Cooking: ${q}</span>${ready}</div>`);
    foot.querySelector('.collect')?.addEventListener('click', () => { K.collect(); this.openKitchen(true); });
    this.openPanel('kitchen', '🍳 Kitchen', [list, foot], { keep });
  }
  openFarmInfo() {
    const s = G.stats, stars = farmRating();
    const body = h(`<div class="info">
      <label>Farm name<input id="name-input" maxlength="26" value="${G.farmName.replace(/"/g, '&quot;')}"></label>
      <div class="stars">${starStr(stars)}</div>
      <div class="statgrid"><div><b>${G.level}</b>Level</div><div><b>${s.harvested}</b>Harvests</div><div><b>${G.animals.total()}</b>Animals</div><div><b>${s.orders}</b>Orders</div><div><b>${G.farm.decorCount()}</b>Decorations</div><div><b>${G.farm.landOwned()}/12</b>Land</div></div>
      <button class="primary" id="info-photo">📸 Take a farm photo</button>
      <p class="muted center">Nothing is saved — your farm lives only in this tab.<br>Snap a photo before you leave!</p></div>`);
    this.openPanel('info', '🏡 Your Farm', body);
    const inp = $('name-input');
    inp.onchange = () => this.setFarmName(inp.value);
    $('info-photo').onclick = () => { this.setFarmName(inp.value); this.closeAll(); G.photo.enter(); };
  }
  setFarmName(v) { v = (v || '').trim().slice(0, 26) || 'My Little Farm'; G.farmName = v; $('farm-name').textContent = v; G.world.sign.userData.setText(v); }
  openHelp() {
    const body = h(`<div class="help">
      <div class="hrow"><b>👆 Tap</b> Smart tool: plants, waters and harvests. Drag across fields to queue many jobs at once.</div>
      <div class="hrow"><b>👨‍🌾 Farmers</b> Every job is done by your farmers — they walk over and work. Buildings take longer. Hire helpers in the Shop to go faster. Use ✋ Edit on a queued tile to cancel it.</div>
      <div class="hrow"><b>⛏️ Hoe</b> Turn grass into soil. <b>🌱 Plant</b> pick a seed. <b>✋ Edit</b> move or sell decorations.</div>
      <div class="hrow"><b>🐔 Animals</b> Tap to feed them, then tap again to collect eggs, milk & wool.</div>
      <div class="hrow"><b>📋 Orders</b> Deliver goods for coins & XP. Level up to unlock new crops, animals & recipes.</div>
      <div class="hrow"><b>🔒 Land</b> Tap overgrown areas to expand your farm.</div>
      <div class="hrow"><b>🖱️ Camera</b> Drag to move · scroll / pinch to zoom · right-drag or two-finger twist to rotate · WASD + Q/E</div>
      <div class="hrow"><b>📸 Photo</b> Make a postcard of your farm and tag <b>${BRAND.instagram}</b> on Instagram!</div>
      <p class="muted center">No sign-up, no saving. Just a cozy little farm. 🌻</p></div>`);
    this.openPanel('help', '❓ How to play', body);
  }
  levelUp(lv) {
    const list = unlocksAt(lv);
    const bonus = 10 + lv * 10;
    earn(bonus);
    G.audio.play('levelup');
    const body = h(`<div class="lvlup"><div class="lvl-big">${lv}</div><p>Level up! <b>+🪙 ${bonus}</b></p>${list.length ? `<h3>New unlocks</h3><div class="unlocks">${list.map(x => `<span>${x}</span>`).join('')}</div>` : ''}<button class="primary" id="lv-ok">Yay!</button></div>`);
    this.openPanel('level', '🎉 Level Up!', body, { cls: 'narrow' });
    $('lv-ok').onclick = () => this.closeAll();
    this.renderSeeds();
    G.fx.burst(G.cam.target.clone().setY(3), 0xffd54f, 60, 6);
    if (lv === 3) setTimeout(() => this.toast('🍳 Kitchen open!', 'Tap the kitchen to bake bread & popcorn.'), 1200);
  }
  confirm(title, text, okLabel, onOk) {
    const body = h(`<div class="confirm"><p>${text}</p><div class="cb"><button class="ghost">Cancel</button><button class="primary">${okLabel}</button></div></div>`);
    this.openPanel('confirm', title, body, { cls: 'narrow' });
    body.querySelector('.ghost').onclick = () => this.closeAll();
    body.querySelector('.primary').onclick = () => { this.closeAll(); onOk(); };
  }
  confirmLand(ch) {
    if (ch.clearing) { this.toast('🪓 Already on it', 'Your farmer is clearing this land.'); return; }
    const cost = G.farm.nextLandCost();
    this.confirm('🌱 Expand your farm?', `Clear this overgrown patch (16 tiles) for <b>🪙 ${cost}</b>.<br><small>Your farmer will chop it clear in about 30 seconds.</small>`, `Clear for 🪙 ${cost}`, () => G.farm.buyChunk(ch));
  }
  decorMenu(d) {
    const def = DECOR[d.id];
    const body = h(`<div class="confirm"><div class="dm-ic">${def.icon}</div><div class="cb col"><button class="primary" data-a="move">↔ Move</button><button data-a="rot">↻ Rotate</button><button class="ghost" data-a="sell">Sell for 🪙 ${Math.floor(def.cost / 2)}</button></div></div>`);
    this.openPanel('decor', def.name, body, { cls: 'narrow' });
    body.querySelectorAll('button').forEach(b => b.onclick = () => {
      const a = b.dataset.a; if (a === 'rot') { G.farm.rotateDecor(d); return; }
      this.closeAll();
      if (a === 'move') G.farm.pickUp(d); else G.farm.sellDecor(d);
    });
  }
}
export function starStr(n) { let s = ''; for (let i = 1; i <= 5; i++) s += `<span class="st ${n >= i ? 'full' : n >= i - 0.5 ? 'half' : ''}">★</span>`; return s; }
