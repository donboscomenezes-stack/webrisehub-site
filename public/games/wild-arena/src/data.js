export const WORLD_SIZE = 3100;

export const DIFFICULTY = {
  casual: { bots: 12, reaction: 0.32, aggression: 0.82, damageTaken: 0.88, loot: 1.24 },
  normal: { bots: 15, reaction: 0.22, aggression: 1, damageTaken: 1, loot: 1 },
  brutal: { bots: 18, reaction: 0.14, aggression: 1.24, damageTaken: 1.13, loot: 0.82 }
};

export const WEAPONS = {
  sword: {
    id: "sword",
    name: "Sword",
    damage: 22,
    speed: 0.48,
    range: 82,
    arc: 1.52,
    stamina: 8,
    knockback: 220,
    crit: 0.09,
    color: "#d9d3ba"
  },
  axe: {
    id: "axe",
    name: "Axe",
    damage: 34,
    speed: 0.78,
    range: 78,
    arc: 1.35,
    stamina: 13,
    knockback: 330,
    crit: 0.13,
    color: "#c98638"
  },
  spear: {
    id: "spear",
    name: "Spear",
    damage: 24,
    speed: 0.57,
    range: 118,
    arc: 0.68,
    stamina: 9,
    knockback: 250,
    crit: 0.1,
    color: "#d6c185"
  },
  dagger: {
    id: "dagger",
    name: "Dagger",
    damage: 14,
    speed: 0.27,
    range: 58,
    arc: 1.32,
    stamina: 5,
    knockback: 150,
    crit: 0.18,
    color: "#b9d6dc"
  },
  hammer: {
    id: "hammer",
    name: "Hammer",
    damage: 42,
    speed: 1,
    range: 86,
    arc: 1.12,
    stamina: 18,
    knockback: 440,
    crit: 0.12,
    color: "#9e8c78"
  }
};

export const RARITIES = {
  common: { name: "Common", mult: 1, color: "#dfd8c5" },
  uncommon: { name: "Uncommon", mult: 1.12, color: "#75c97f" },
  rare: { name: "Rare", mult: 1.28, color: "#6faee9" },
  legendary: { name: "Legendary", mult: 1.48, color: "#f5bd53" }
};

export const ARMORS = {
  light: { id: "light", name: "Light Armor", defense: 0.08, speed: 1.08, color: "#8fc88d" },
  medium: { id: "medium", name: "Medium Armor", defense: 0.18, speed: 1, color: "#b9a079" },
  heavy: { id: "heavy", name: "Heavy Armor", defense: 0.3, speed: 0.9, color: "#899197" }
};

export const SHIELDS = {
  buckler: { id: "buckler", name: "Buckler", block: 0.55, parry: 0.26 },
  kite: { id: "kite", name: "Kite Shield", block: 0.72, parry: 0.2 },
  tower: { id: "tower", name: "Tower Shield", block: 0.82, parry: 0.15, speed: 0.94 }
};

export const NAMES = [
  "RAVEN",
  "BRICK",
  "ASH",
  "WOLF",
  "MIRA",
  "THORN",
  "FANG",
  "RUNE",
  "AXEL",
  "NOVA",
  "VALE",
  "ORIN",
  "KITE",
  "ROOK",
  "SABLE",
  "EMBER",
  "GLEN",
  "ONYX"
];

export const PERSONALITIES = {
  aggressive: { label: "Aggressive", courage: 0.85, block: 0.12, dodge: 0.22, loot: 0.22, heavy: 0.42 },
  defensive: { label: "Defensive", courage: 0.46, block: 0.55, dodge: 0.2, loot: 0.34, heavy: 0.14 },
  duelist: { label: "Duelist", courage: 0.65, block: 0.32, dodge: 0.46, loot: 0.28, heavy: 0.2 },
  hunter: { label: "Hunter", courage: 0.7, block: 0.18, dodge: 0.28, loot: 0.18, heavy: 0.28 },
  scavenger: { label: "Scavenger", courage: 0.38, block: 0.2, dodge: 0.34, loot: 0.72, heavy: 0.12 },
  berserker: { label: "Berserker", courage: 0.96, block: 0.04, dodge: 0.12, loot: 0.12, heavy: 0.58 }
};
