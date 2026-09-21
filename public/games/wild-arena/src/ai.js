import { PERSONALITIES } from "./data.js";
import { angleTo, chance, clamp, distance, normalize, rand } from "./utils.js";

export class AIController {
  constructor(fighter, personalityKey) {
    this.fighter = fighter;
    this.personalityKey = personalityKey;
    this.personality = PERSONALITIES[personalityKey];
    this.target = null;
    this.lootTarget = null;
    this.thinkTimer = rand(0.02, 0.2);
    this.intent = { x: 0, y: 0, block: false, dodge: false, attack: false, heavy: false };
    this.errorTimer = 0;
    this.reaction = 0.22;
  }

  update(dt, game) {
    const f = this.fighter;
    if (!f.alive) return;
    this.thinkTimer -= dt;
    this.errorTimer -= dt;
    if (this.thinkTimer <= 0) {
      this.reaction = game.difficulty.reaction + rand(0, 0.11);
      this.think(game);
      this.thinkTimer = this.reaction;
    }

    if (this.intent.block && f.stamina > 15) f.setBlocking(true);
    else f.setBlocking(false);

    if (this.intent.dodge) {
      if (f.dodge()) game.audio.dodge();
      this.intent.dodge = false;
    }

    f.steer(this.intent.x, this.intent.y, dt);
    if (Math.abs(this.intent.x) + Math.abs(this.intent.y) > 0.05 && !this.target) {
      f.facing = Math.atan2(this.intent.y, this.intent.x);
    }
    if (this.target?.alive) f.facing = angleTo(f, this.target);

    if (this.intent.attack && f.cooldown <= 0 && this.target?.alive) {
      if (f.startAttack(this.intent.heavy)) game.audio.swing();
      this.intent.attack = false;
    }
  }

  think(game) {
    const f = this.fighter;
    const enemies = game.fighters.filter((x) => x !== f && x.alive);
    const visible = enemies
      .map((e) => ({ e, d: distance(f, e), score: this.scoreEnemy(f, e) }))
      .filter((x) => x.d < 720)
      .sort((a, b) => b.score - a.score);
    const nearest = visible.slice().sort((a, b) => a.d - b.d)[0];
    const weak = visible.find((x) => x.e.health < f.health * 0.75);
    const betterLoot = this.findLoot(game);
    const lowHealth = f.health / f.maxHealth < 0.34;
    const outStorm = distance(f, game.storm.center) > game.storm.radius * 0.94;

    this.target = weak?.e || visible[0]?.e || null;
    this.lootTarget = betterLoot;
    this.intent = { x: 0, y: 0, block: false, dodge: false, attack: false, heavy: false };

    if (outStorm) {
      this.moveToward(game.storm.center, 1);
      return;
    }

    if (betterLoot && (!nearest || nearest.d > 220 || this.personality.loot > Math.random())) {
      this.moveToward(betterLoot, 0.9);
      return;
    }

    if (!this.target) {
      const wander = { x: f.x + rand(-280, 280), y: f.y + rand(-280, 280) };
      this.moveToward(wander, 0.45);
      return;
    }

    const d = distance(f, this.target);
    const range = f.weapon.range;
    const courage = this.personality.courage * game.difficulty.aggression;
    const danger = this.target.health / this.target.maxHealth + this.target.kills * 0.08;
    const selfPower = f.health / f.maxHealth + f.kills * 0.09 + (f.weapon.damage - 20) / 80;
    const shouldFlee = (lowHealth && danger > selfPower * 0.72 && chance(0.7)) || (nearest?.d < 80 && f.stamina < 18);

    if (shouldFlee) {
      this.moveAway(this.target, 1);
      if (chance(this.personality.dodge)) this.intent.dodge = true;
      return;
    }

    const targetAttacking = this.target.attackTimer > 0 && this.target.canDamageNow && this.target.canDamageNow();
    if (targetAttacking && d < this.target.weapon.range + 38) {
      if (chance(this.personality.dodge)) this.intent.dodge = true;
      else if (chance(this.personality.block)) this.intent.block = true;
    }

    if (d > range * 0.82) {
      this.moveToward(this.target, clamp(courage, 0.45, 1));
      this.strafe(d);
    } else if (d < range * 0.42) {
      if (chance(0.45)) this.moveAway(this.target, 0.65);
      else this.strafe(d);
    } else {
      this.strafe(d);
      this.intent.attack = chance(0.84);
      this.intent.heavy = chance(this.personality.heavy) && f.stamina > 48;
      if (chance(this.personality.block * 0.6)) this.intent.block = true;
    }

    if (this.errorTimer <= 0 && chance(0.08)) {
      this.intent.x *= -0.35;
      this.intent.y *= -0.35;
      this.intent.block = false;
      this.errorTimer = rand(0.2, 0.5);
    }
  }

  scoreEnemy(f, enemy) {
    let score = 0;
    score += enemy.isPlayer ? 0.3 : 0;
    score += (1 - enemy.health / enemy.maxHealth) * 1.4;
    score += clamp(400 - distance(f, enemy), 0, 400) / 400;
    if (this.personalityKey === "hunter") score += (1 - enemy.health / enemy.maxHealth) * 1.2;
    if (this.personalityKey === "scavenger") score -= enemy.health / enemy.maxHealth;
    return score;
  }

  findLoot(game) {
    let best = null;
    let bestScore = 0;
    for (const item of game.loot.items) {
      const d = distance(this.fighter, item);
      if (d > 440) continue;
      let score = 0.4 - d / 1000;
      if (item.kind === "heal" && this.fighter.health < this.fighter.maxHealth * 0.62) score += 1.2;
      if (item.kind === "weapon" && item.weapon.damage > this.fighter.weapon.damage + 3) score += 0.8;
      if (item.kind === "armor" && item.armor.defense > this.fighter.armor.defense) score += 0.55;
      if (item.kind === "shield" && item.shield.block > this.fighter.shield.block) score += 0.4;
      score *= this.personality.loot + 0.25;
      if (score > bestScore) {
        best = item;
        bestScore = score;
      }
    }
    return best;
  }

  moveToward(target, power = 1) {
    const n = normalize(target.x - this.fighter.x, target.y - this.fighter.y);
    this.intent.x += n.x * power;
    this.intent.y += n.y * power;
  }

  moveAway(target, power = 1) {
    const n = normalize(this.fighter.x - target.x, this.fighter.y - target.y);
    this.intent.x += n.x * power;
    this.intent.y += n.y * power;
  }

  strafe(d) {
    if (!this.target) return;
    const dir = angleTo(this.fighter, this.target) + (this.fighter.id % 2 ? Math.PI / 2 : -Math.PI / 2);
    const strength = d < this.fighter.weapon.range ? 0.58 : 0.32;
    this.intent.x += Math.cos(dir) * strength;
    this.intent.y += Math.sin(dir) * strength;
  }
}
