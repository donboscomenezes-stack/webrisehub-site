import { ARMORS, RARITIES, SHIELDS, WEAPONS, WORLD_SIZE } from "./data.js";
import { chance, choice, clamp, distance, rand, randInt } from "./utils.js";

export class Camera {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
    this.shake = 0;
  }

  follow(target, dt) {
    const tx = target.x - this.canvas.width / 2;
    const ty = target.y - this.canvas.height / 2;
    this.x += (tx - this.x) * clamp(dt * 7, 0, 1);
    this.y += (ty - this.y) * clamp(dt * 7, 0, 1);
    this.x = clamp(this.x, 0, WORLD_SIZE - this.canvas.width);
    this.y = clamp(this.y, 0, WORLD_SIZE - this.canvas.height);
    this.shake = Math.max(0, this.shake - dt * 24);
  }

  addShake(amount) {
    this.shake = Math.max(this.shake, amount);
  }

  begin(ctx) {
    const sx = (Math.random() - 0.5) * this.shake;
    const sy = (Math.random() - 0.5) * this.shake;
    ctx.save();
    ctx.translate(-this.x + sx, -this.y + sy);
  }

  end(ctx) {
    ctx.restore();
  }
}

export class SpatialGrid {
  constructor(size = 180) {
    this.size = size;
    this.buckets = new Map();
  }

  clear() {
    this.buckets.clear();
  }

  key(x, y) {
    return `${Math.floor(x / this.size)},${Math.floor(y / this.size)}`;
  }

  add(entity) {
    const key = this.key(entity.x, entity.y);
    if (!this.buckets.has(key)) this.buckets.set(key, []);
    this.buckets.get(key).push(entity);
  }

  query(x, y, radius) {
    const minX = Math.floor((x - radius) / this.size);
    const maxX = Math.floor((x + radius) / this.size);
    const minY = Math.floor((y - radius) / this.size);
    const maxY = Math.floor((y + radius) / this.size);
    const out = [];
    for (let gx = minX; gx <= maxX; gx += 1) {
      for (let gy = minY; gy <= maxY; gy += 1) {
        const bucket = this.buckets.get(`${gx},${gy}`);
        if (bucket) out.push(...bucket);
      }
    }
    return out;
  }
}

export class World {
  constructor() {
    this.size = WORLD_SIZE;
    this.obstacles = [];
    this.decals = [];
    this.chests = [];
    this.generate();
  }

  generate() {
    this.obstacles.length = 0;
    this.decals.length = 0;
    this.chests.length = 0;

    for (let i = 0; i < 260; i += 1) {
      this.decals.push({ x: rand(40, this.size - 40), y: rand(40, this.size - 40), r: rand(2, 9), c: choice(["#314529", "#3d5431", "#5c5431", "#293b25"]) });
    }

    const addObstacle = (x, y, r, type) => {
      this.obstacles.push({ x, y, r, type, hp: type === "crate" ? 35 : Infinity });
    };

    for (let i = 0; i < 70; i += 1) {
      addObstacle(rand(120, this.size - 120), rand(120, this.size - 120), rand(24, 42), "tree");
    }
    for (let i = 0; i < 42; i += 1) {
      addObstacle(rand(100, this.size - 100), rand(100, this.size - 100), rand(22, 52), "rock");
    }

    for (let i = 0; i < 6; i += 1) {
      const cx = rand(420, this.size - 420);
      const cy = rand(420, this.size - 420);
      for (let j = 0; j < randInt(5, 9); j += 1) {
        addObstacle(cx + rand(-160, 160), cy + rand(-110, 110), rand(18, 32), "ruin");
      }
    }

    for (let i = 0; i < 28; i += 1) {
      addObstacle(rand(160, this.size - 160), rand(160, this.size - 160), 21, "crate");
    }

    for (let i = 0; i < 9; i += 1) {
      this.chests.push({ x: rand(180, this.size - 180), y: rand(180, this.size - 180), r: 28, opened: false, progress: 0 });
    }
  }

  spawnPoint(nearCenter = false) {
    for (let tries = 0; tries < 300; tries += 1) {
      const x = nearCenter ? rand(this.size * 0.42, this.size * 0.58) : rand(140, this.size - 140);
      const y = nearCenter ? rand(this.size * 0.42, this.size * 0.58) : rand(140, this.size - 140);
      if (!this.collidesCircle(x, y, 40)) return { x, y };
    }
    return { x: this.size / 2, y: this.size / 2 };
  }

  collidesCircle(x, y, r) {
    if (x < r || y < r || x > this.size - r || y > this.size - r) return true;
    return this.obstacles.some((o) => o.hp > 0 && distance({ x, y }, o) < r + o.r);
  }

  resolve(entity) {
    entity.x = clamp(entity.x, entity.r, this.size - entity.r);
    entity.y = clamp(entity.y, entity.r, this.size - entity.r);
    for (const o of this.obstacles) {
      if (o.hp <= 0) continue;
      const dx = entity.x - o.x;
      const dy = entity.y - o.y;
      const dist = Math.hypot(dx, dy) || 1;
      const min = entity.r + o.r;
      if (dist < min) {
        const push = min - dist;
        entity.x += (dx / dist) * push;
        entity.y += (dy / dist) * push;
        entity.vx *= 0.35;
        entity.vy *= 0.35;
      }
    }
  }

  damageObstacle(target, amount) {
    if (!target || target.hp === Infinity || target.hp <= 0) return false;
    target.hp -= amount;
    return target.hp <= 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#263621";
    ctx.fillRect(0, 0, this.size, this.size);

    ctx.fillStyle = "rgba(72, 89, 42, 0.25)";
    for (let x = 0; x < this.size; x += 210) {
      ctx.fillRect(x, 0, 4, this.size);
    }
    for (let y = 0; y < this.size; y += 210) {
      ctx.fillRect(0, y, this.size, 4);
    }

    ctx.fillStyle = "rgba(55, 83, 89, 0.24)";
    ctx.beginPath();
    ctx.ellipse(this.size * 0.3, this.size * 0.6, 135, 620, -0.36, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(84, 66, 41, 0.44)";
    ctx.beginPath();
    ctx.ellipse(this.size * 0.68, this.size * 0.27, 520, 210, 0.18, 0, Math.PI * 2);
    ctx.fill();

    for (const d of this.decals) {
      ctx.fillStyle = d.c;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const chest of this.chests) {
      if (chest.opened) continue;
      ctx.save();
      ctx.translate(chest.x, chest.y);
      ctx.fillStyle = "#6c4420";
      ctx.strokeStyle = "#e3bb62";
      ctx.lineWidth = 3;
      ctx.fillRect(-24, -18, 48, 36);
      ctx.strokeRect(-24, -18, 48, 36);
      ctx.fillStyle = "#23170d";
      ctx.fillRect(-5, -3, 10, 11);
      ctx.restore();
    }

    for (const o of this.obstacles) {
      if (o.hp <= 0) continue;
      ctx.save();
      ctx.translate(o.x, o.y);
      if (o.type === "tree") {
        ctx.fillStyle = "#182215";
        ctx.beginPath();
        ctx.arc(4, 6, o.r * 0.72, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#315328";
        ctx.beginPath();
        ctx.arc(0, 0, o.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#4e321d";
        ctx.fillRect(-5, o.r * 0.45, 10, o.r * 0.7);
      } else if (o.type === "rock") {
        ctx.fillStyle = "#6b716b";
        ctx.beginPath();
        ctx.ellipse(0, 0, o.r * 1.1, o.r * 0.8, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.14)";
        ctx.beginPath();
        ctx.arc(-o.r * 0.25, -o.r * 0.24, o.r * 0.18, 0, Math.PI * 2);
        ctx.fill();
      } else if (o.type === "ruin") {
        ctx.fillStyle = "#726b5d";
        ctx.fillRect(-o.r, -o.r * 0.55, o.r * 2, o.r * 1.1);
        ctx.fillStyle = "#4d493f";
        ctx.fillRect(-o.r * 0.5, -o.r * 0.18, o.r, o.r * 0.32);
      } else {
        ctx.fillStyle = "#7a4a22";
        ctx.fillRect(-o.r, -o.r, o.r * 2, o.r * 2);
        ctx.strokeStyle = "#392313";
        ctx.strokeRect(-o.r, -o.r, o.r * 2, o.r * 2);
      }
      ctx.restore();
    }
  }
}

export class StormSystem {
  constructor() {
    this.center = { x: WORLD_SIZE / 2, y: WORLD_SIZE / 2 };
    this.radius = WORLD_SIZE * 0.73;
    this.targetRadius = WORLD_SIZE * 0.73;
    this.timer = 0;
    this.active = false;
    this.finalDuelShown = false;
  }

  reset() {
    this.radius = WORLD_SIZE * 0.73;
    this.targetRadius = WORLD_SIZE * 0.73;
    this.timer = 0;
    this.active = false;
    this.finalDuelShown = false;
  }

  update(dt, fighters) {
    this.timer += dt;
    if (this.timer > 75) {
      this.active = true;
      const phase = Math.floor((this.timer - 75) / 34);
      this.targetRadius = clamp(WORLD_SIZE * 0.58 - phase * 220, 260, WORLD_SIZE);
    }
    this.radius += (this.targetRadius - this.radius) * dt * 0.045;
    if (!this.active) return;
    for (const f of fighters) {
      if (!f.alive) continue;
      const d = distance(f, this.center);
      if (d > this.radius) f.takeRawDamage(dt * (5 + (d - this.radius) * 0.012), null, "storm");
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(20, 18, 28, 0.45)";
    ctx.beginPath();
    ctx.rect(0, 0, WORLD_SIZE, WORLD_SIZE);
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
    ctx.strokeStyle = "rgba(165, 121, 223, 0.72)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

export class LootSystem {
  constructor() {
    this.items = [];
  }

  reset(world, multiplier = 1) {
    this.items.length = 0;
    const total = Math.floor(34 * multiplier);
    for (let i = 0; i < total; i += 1) {
      const p = world.spawnPoint();
      this.dropRandom(p.x, p.y, i < 8 ? "weapon" : null);
    }
  }

  rollRarity() {
    const r = Math.random();
    if (r > 0.975) return "legendary";
    if (r > 0.87) return "rare";
    if (r > 0.62) return "uncommon";
    return "common";
  }

  createWeapon(id = choice(Object.keys(WEAPONS)), rarity = this.rollRarity()) {
    const base = WEAPONS[id];
    const rare = RARITIES[rarity];
    const item = {
      kind: "weapon",
      id: base.id,
      rarity,
      name: `${rare.name} ${base.name}`,
      color: rare.color,
      weapon: { ...base, damage: Math.round(base.damage * rare.mult), knockback: Math.round(base.knockback * (0.92 + rare.mult * 0.08)), rarity }
    };
    if (rarity === "legendary") {
      const effect = choice(["burn", "frost", "vampire", "thunder"]);
      item.weapon.effect = effect;
      item.name = `${effect.toUpperCase()} ${base.name}`;
    }
    return item;
  }

  createArmor(rarity = this.rollRarity()) {
    const armor = { ...choice(Object.values(ARMORS)) };
    armor.defense = Math.min(0.46, armor.defense * RARITIES[rarity].mult);
    return { kind: "armor", rarity, name: `${RARITIES[rarity].name} ${armor.name}`, color: armor.color, armor };
  }

  createConsumable() {
    return chance(0.72)
      ? { kind: "heal", name: "Wildberry Tonic", color: "#d84e5c", heal: 42 }
      : { kind: "stamina", name: "Mint Draught", color: "#70d789", stamina: 58 };
  }

  createShield(rarity = this.rollRarity()) {
    const shield = { ...choice(Object.values(SHIELDS)) };
    shield.block = Math.min(0.9, shield.block * RARITIES[rarity].mult);
    return { kind: "shield", rarity, name: `${RARITIES[rarity].name} ${shield.name}`, color: RARITIES[rarity].color, shield };
  }

  dropRandom(x, y, forcedKind = null) {
    const roll = Math.random();
    let data;
    const kind = forcedKind || (roll < 0.48 ? "weapon" : roll < 0.67 ? "armor" : roll < 0.81 ? "shield" : "consumable");
    if (kind === "weapon") data = this.createWeapon();
    else if (kind === "armor") data = this.createArmor();
    else if (kind === "shield") data = this.createShield();
    else data = this.createConsumable();
    this.items.push({ ...data, x, y, r: 17, age: 0, bob: Math.random() * Math.PI * 2 });
  }

  dropFromFighter(fighter) {
    this.items.push({ kind: "weapon", name: fighter.weapon.name, color: RARITIES[fighter.weapon.rarity || "common"].color, weapon: { ...fighter.weapon }, x: fighter.x + rand(-16, 16), y: fighter.y + rand(-16, 16), r: 17, age: 0, bob: 0 });
    if (chance(0.36)) this.dropRandom(fighter.x + rand(-30, 30), fighter.y + rand(-30, 30));
    if (chance(0.18)) this.items.push({ ...this.createConsumable(), x: fighter.x + rand(-20, 20), y: fighter.y + rand(-20, 20), r: 17, age: 0, bob: 1 });
  }

  update(dt) {
    for (const item of this.items) item.age += dt;
  }

  nearest(fighter, radius = 62) {
    let best = null;
    let bestD = radius;
    for (const item of this.items) {
      const d = distance(fighter, item);
      if (d < bestD) {
        best = item;
        bestD = d;
      }
    }
    return best;
  }

  pickup(fighter, item) {
    if (!item) return "";
    if (item.kind === "weapon") fighter.weapon = { ...item.weapon };
    if (item.kind === "armor") fighter.armor = { ...item.armor };
    if (item.kind === "shield") fighter.shield = { ...item.shield };
    if (item.kind === "heal") fighter.startHeal(item.heal);
    if (item.kind === "stamina") fighter.stamina = Math.min(fighter.maxStamina, fighter.stamina + item.stamina);
    this.items.splice(this.items.indexOf(item), 1);
    return item.name;
  }

  draw(ctx) {
    for (const item of this.items) {
      const y = item.y + Math.sin(item.age * 4 + item.bob) * 3;
      ctx.save();
      ctx.translate(item.x, y);
      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.beginPath();
      ctx.ellipse(0, 11, 17, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = item.color || "#f3dd94";
      ctx.strokeStyle = "#1f1a12";
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (item.kind === "weapon") ctx.moveTo(-13, 11), ctx.lineTo(13, -11), ctx.lineTo(17, -5), ctx.lineTo(-8, 15);
      else if (item.kind === "armor") ctx.rect(-12, -13, 24, 25);
      else if (item.kind === "shield") ctx.moveTo(0, -16), ctx.lineTo(14, -8), ctx.lineTo(10, 12), ctx.lineTo(0, 18), ctx.lineTo(-10, 12), ctx.lineTo(-14, -8);
      else ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
}
