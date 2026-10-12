// Shared game state + economy (coins, XP, inventory, orders). Nothing is ever persisted:
// the farm lives only in this browser tab.
import { CROPS, GOODS, ANIMALS, RECIPES, DECOR, LEVELS, MAX_LEVEL, itemInfo } from './config.js';

export const G = {
  scene: null, camera: null, renderer: null,
  farmName: 'My Little Farm',
  coins: 60, xp: 0, level: 1,
  inv: {},                       // item id -> qty
  stats: { harvested: 0, planted: 0, orders: 0, sold: 0, cooked: 0, collected: 0 },
  tool: 'hand', seed: 'wheat',
  mode: 'title',                 // title | play | photo | panel
  time: 0, dayT: 0.12,           // dayT: 0..1 (0.25 = noon-ish)
  rain: 0,
  ui: null, farm: null, world: null, animals: null, audio: null, cam: null,
  orders: [],
  listeners: {},
};

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
export const rand = (a, b) => a + Math.random() * (b - a);
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function on(ev, fn) { (G.listeners[ev] ||= []).push(fn); }
export function emit(ev, data) { (G.listeners[ev] || []).forEach(f => f(data)); }

export function addItem(id, n = 1) { G.inv[id] = (G.inv[id] || 0) + n; emit('inv'); }
export function hasItems(needs) { return Object.entries(needs).every(([id, q]) => (G.inv[id] || 0) >= q); }
export function takeItems(needs) { if (!hasItems(needs)) return false; for (const [id, q] of Object.entries(needs)) { G.inv[id] -= q; if (G.inv[id] <= 0) delete G.inv[id]; } emit('inv'); return true; }
export function spend(n) { if (G.coins < n) return false; G.coins -= n; emit('coins'); return true; }
export function earn(n) { G.coins += n; emit('coins'); }

export function addXP(n) {
  G.xp += n;
  let up = false;
  while (G.level < MAX_LEVEL && G.xp >= LEVELS[G.level + 1]) { G.level++; up = true; emit('levelup', G.level); }
  emit('xp');
  return up;
}
export function xpProgress() {
  if (G.level >= MAX_LEVEL) return 1;
  const a = LEVELS[G.level], b = LEVELS[G.level + 1];
  return (G.xp - a) / (b - a);
}
export function unlocksAt(level) {
  const list = [];
  for (const [id, c] of Object.entries(CROPS)) if (c.lvl === level) list.push(`${c.icon} ${c.name} seeds`);
  for (const [id, a] of Object.entries(ANIMALS)) if (a.lvl === level) list.push(`${a.icon} ${a.name}s`);
  for (const r of RECIPES) if (r.lvl === level) list.push(`${GOODS[r.id].icon} ${GOODS[r.id].name} recipe`);
  for (const [id, d] of Object.entries(DECOR)) if (d.lvl === level) list.push(`${d.icon} ${d.name}`);
  return list;
}

/* ---------------- orders ---------------- */
function availableItems() {
  const items = [];
  for (const [id, c] of Object.entries(CROPS)) if (c.lvl <= G.level) items.push(id);
  for (const a of Object.values(ANIMALS)) if (a.lvl <= G.level && G.animals?.count(a.pen) > 0) items.push(a.product);
  for (const r of RECIPES) if (r.lvl <= G.level && G.level >= 3) items.push(r.id);
  for (const d of Object.values(DECOR)) if (d.prod && G.farm?.hasDecor(d)) items.push(d.prod.item);
  return [...new Set(items)];
}
const CUSTOMERS = [['🐰', 'Mrs. Bunny'], ['🦊', 'Fox Bakery'], ['🐻', 'Bear Café'], ['🐸', 'Froggy'], ['🦉', 'Professor Owl'], ['🐷', 'Pip the Pig'], ['🐱', 'Miso'], ['🦔', 'Hazel']];
export function makeOrder() {
  const items = availableItems();
  const kinds = Math.min(items.length, 1 + Math.floor(Math.random() * Math.min(3, 1 + G.level / 2)));
  const chosen = [];
  const pool = [...items];
  // favour cheaper items early
  const used = new Set(G.orders.flatMap(o => Object.keys(o.needs)));
  pool.sort((a, b) => (used.has(a) - used.has(b)) || (Math.random() - 0.5));
  for (let i = 0; i < kinds && pool.length; i++) chosen.push(pool.splice(0, 1)[0]);
  const needs = {}; let value = 0;
  for (const id of chosen) {
    const info = itemInfo(id);
    const q = Math.max(1, Math.round((info.sell < 8 ? 3 + Math.random() * 4 : info.sell < 30 ? 1 + Math.random() * 3 : 1 + Math.random()) * (1 + G.level * 0.08)));
    needs[id] = q; value += info.sell * q;
  }
  const [face, who] = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  return { id: Math.random().toString(36).slice(2), needs, coins: Math.round(value * 1.6 + 5), xp: Math.max(2, Math.round(value / 5)), face, who, wait: 0 };
}
export function refreshOrders() { while (G.orders.length < 3) G.orders.push(makeOrder()); emit('orders'); }

export function farmRating() {
  // playful score for the photo card: variety + size + liveliness
  const f = G.farm, a = G.animals;
  const crops = new Set(f.plots().filter(p => p.crop).map(p => p.crop)).size;
  const decor = f.decorCount();
  const animals = a.total();
  const score = Math.min(5, 1 + crops * 0.35 + Math.min(decor, 20) * 0.08 + animals * 0.18 + (G.level - 1) * 0.15 + f.landOwned() * 0.1);
  return Math.max(1, Math.round(score * 2) / 2);
}
