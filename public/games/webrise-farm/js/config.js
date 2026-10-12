// All tunable game data lives here: crops, animals, recipes, shop, levels, branding.

export const BRAND = {
  game: 'Webrise Farm',
  instagram: '@webrisehub',          // ← the Instagram account players should tag
  site: 'webrisehub.com',
  hashtags: '#WebriseFarm #CozyFarm #webrisehub',
};

export const TILE = 2;               // world units per grid tile
export const GW = 16, GH = 12;       // farm grid (tiles)
export const CHUNK = 4;              // land expansion block size (tiles)

// Crops — time in seconds (short, so a session is fun in 10–20 minutes)
export const CROPS = {
  wheat:      { name: 'Wheat',      icon: '🌾', seed: 1,  time: 20, sell: 3,  xp: 1, lvl: 1 },
  carrot:     { name: 'Carrot',     icon: '🥕', seed: 3,  time: 30, sell: 7,  xp: 2, lvl: 1 },
  cabbage:    { name: 'Cabbage',    icon: '🥬', seed: 5,  time: 40, sell: 11, xp: 3, lvl: 2 },
  corn:       { name: 'Corn',       icon: '🌽', seed: 6,  time: 45, sell: 13, xp: 3, lvl: 2 },
  sunflower:  { name: 'Sunflower',  icon: '🌻', seed: 8,  time: 50, sell: 18, xp: 4, lvl: 3 },
  tomato:     { name: 'Tomato',     icon: '🍅', seed: 10, time: 60, sell: 22, xp: 5, lvl: 3 },
  strawberry: { name: 'Strawberry', icon: '🍓', seed: 14, time: 70, sell: 30, xp: 6, lvl: 4 },
  pumpkin:    { name: 'Pumpkin',    icon: '🎃', seed: 20, time: 90, sell: 45, xp: 8, lvl: 5 },
};

// Products (animals, trees, kitchen)
export const GOODS = {
  egg:    { name: 'Egg',    icon: '🥚', sell: 10 },
  milk:   { name: 'Milk',   icon: '🥛', sell: 25 },
  wool:   { name: 'Wool',   icon: '🧶', sell: 32 },
  honey:  { name: 'Honey',  icon: '🍯', sell: 20 },
  apple:  { name: 'Apple',  icon: '🍎', sell: 8 },
  orange: { name: 'Orange', icon: '🍊', sell: 14 },
  bread:  { name: 'Bread',  icon: '🍞', sell: 20 },
  popcorn:{ name: 'Popcorn',icon: '🍿', sell: 32 },
  cheese: { name: 'Cheese', icon: '🧀', sell: 60 },
  cake:   { name: 'Strawberry Cake', icon: '🍰', sell: 120 },
  pie:    { name: 'Pumpkin Pie', icon: '🥧', sell: 95 },
};

export function itemInfo(id) {
  if (CROPS[id]) return { ...CROPS[id], sell: CROPS[id].sell };
  return GOODS[id];
}

export const ANIMALS = {
  chicken: { name: 'Chicken', icon: '🐔', cost: 40,  lvl: 2, feed: 'wheat',  feedQty: 1, product: 'egg',  time: 30, xp: 2, pen: 'coop',   max: 6 },
  cow:     { name: 'Cow',     icon: '🐄', cost: 120, lvl: 3, feed: 'corn',   feedQty: 1, product: 'milk', time: 45, xp: 4, pen: 'cows',   max: 5 },
  sheep:   { name: 'Sheep',   icon: '🐑', cost: 150, lvl: 4, feed: 'carrot', feedQty: 2, product: 'wool', time: 50, xp: 5, pen: 'sheep',  max: 5 },
};

export const RECIPES = [
  { id: 'bread',   needs: { wheat: 3 },                                     time: 25, xp: 4,  lvl: 3 },
  { id: 'popcorn', needs: { corn: 2 },                                      time: 30, xp: 5,  lvl: 3 },
  { id: 'cheese',  needs: { milk: 2 },                                      time: 40, xp: 7,  lvl: 4 },
  { id: 'pie',     needs: { pumpkin: 1, wheat: 2, egg: 1 },                 time: 55, xp: 10, lvl: 5 },
  { id: 'cake',    needs: { wheat: 2, egg: 1, milk: 1, strawberry: 2 },     time: 60, xp: 12, lvl: 5 },
];

// Decorations / trees placed on grass tiles. prod = optional production
export const DECOR = {
  flowers:   { name: 'Flower Bed',     icon: '🌷', cost: 10,  lvl: 1, cat: 'decor' },
  path:      { name: 'Stone Path',     icon: '🪨', cost: 2,   lvl: 1, cat: 'decor', flat: true },
  fence:     { name: 'Fence',          icon: '🪵', cost: 3,   lvl: 1, cat: 'decor' },
  hay:       { name: 'Hay Bales',      icon: '🟨', cost: 8,   lvl: 1, cat: 'decor' },
  bench:     { name: 'Bench',          icon: '🪑', cost: 20,  lvl: 1, cat: 'decor' },
  scarecrow: { name: 'Scarecrow',      icon: '🧑‍🌾', cost: 25,  lvl: 2, cat: 'decor' },
  mailbox:   { name: 'Mailbox',        icon: '📮', cost: 15,  lvl: 2, cat: 'decor' },
  lamp:      { name: 'Lantern Post',   icon: '🏮', cost: 30,  lvl: 2, cat: 'decor' },
  blossom:   { name: 'Blossom Tree',   icon: '🌸', cost: 45,  lvl: 2, cat: 'trees' },
  appletree: { name: 'Apple Tree',     icon: '🍎', cost: 50,  lvl: 2, cat: 'trees', prod: { item: 'apple', time: 45, qty: 2, xp: 1 } },
  birdbath:  { name: 'Bird Bath',      icon: '🐦', cost: 35,  lvl: 3, cat: 'decor' },
  well:      { name: 'Wishing Well',   icon: '🪣', cost: 55,  lvl: 3, cat: 'decor' },
  picnic:    { name: 'Picnic Blanket', icon: '🧺', cost: 30,  lvl: 3, cat: 'decor' },
  beehive:   { name: 'Beehive',        icon: '🐝', cost: 60,  lvl: 4, cat: 'decor', prod: { item: 'honey', time: 50, qty: 1, xp: 2 } },
  gnome:     { name: 'Garden Gnome',   icon: '🧙', cost: 40,  lvl: 4, cat: 'decor' },
  pond:      { name: 'Lily Pond',      icon: '🪷', cost: 70,  lvl: 4, cat: 'decor' },
  orangetree:{ name: 'Orange Tree',    icon: '🍊', cost: 90,  lvl: 5, cat: 'trees', prod: { item: 'orange', time: 55, qty: 2, xp: 2 } },
  fountain:  { name: 'Fountain',       icon: '⛲', cost: 120, lvl: 5, cat: 'decor' },
  tractor:   { name: 'Tractor',        icon: '🚜', cost: 150, lvl: 6, cat: 'decor' },
  balloon:   { name: 'Hot Air Balloon',icon: '🎈', cost: 200, lvl: 7, cat: 'decor' },
};

// Land expansion chunk prices in order of purchase
export const LAND_COSTS = [80, 120, 170, 230, 300, 380, 470, 560];

// XP needed to reach level n (index = level)
export const LEVELS = [0, 0, 12, 40, 90, 170, 280, 430, 630, 900, 1250];
export const MAX_LEVEL = LEVELS.length - 1;

export const DAY_LENGTH = 8 * 60;    // seconds for a full morning→night→morning cycle

// How long a farmer works on each job (seconds). Buildings use buildTime() in workers.js:
// cheap decorations take a few seconds, big ones (fountain, tractor, balloon) up to 30s.
export const JOB_TIME = { till: 2.5, plant: 1.6, water: 1.3, harvest: 1.8, clear: 30 };

// Farmers you can hire. The first one works for free from the start.
export const HELPERS = [
  { id: 'joe',  name: 'Farmer Joe', icon: '👨‍🌾', cost: 0,   lvl: 1, look: { shirt: 0xe8473f, overalls: 0x3f6fc4, hat: 0xf2c552, band: 0xe8473f, hair: 0x6b4226 } },
  { id: 'lily', name: 'Lily',       icon: '👩‍🌾', cost: 120, lvl: 2, look: { shirt: 0xffffff, overalls: 0xe86f9e, hat: 0xf5d77a, band: 0x7cc8ff, hair: 0xd9853b } },
  { id: 'sam',  name: 'Sam',        icon: '🧑‍🌾', cost: 260, lvl: 4, look: { shirt: 0x6cc24a, overalls: 0x7a5236, hat: 0xe8c066, band: 0x3f6fc4, hair: 0x2b2b33 } },
  { id: 'rosa', name: 'Rosa',       icon: '👩‍🌾', cost: 450, lvl: 6, look: { shirt: 0xffd23f, overalls: 0x5c4db8, hat: 0xf2c552, band: 0xff8fb8, hair: 0x3a2418 } },
];
