import { ARMORS, WEAPONS } from "./data.js";
import { angleDiff, angleTo, chance, clamp, pointInArc, rand, TAU } from "./utils.js";

let nextId = 1;

export class Fighter {
  constructor({ x, y, name, isPlayer = false, color = "#d9b15e", weapon = WEAPONS.sword }) {
    this.id = nextId++;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.r = 18;
    this.name = name;
    this.isPlayer = isPlayer;
    this.color = color;
    this.weapon = { ...weapon, rarity: "common" };
    this.armor = { ...ARMORS.medium };
    this.shield = { id: "buckler", name: "Buckler", block: 0.55, parry: 0.24 };
    this.maxHealth = 120;
    this.health = this.maxHealth;
    this.maxStamina = 100;
    this.stamina = this.maxStamina;
    this.facing = 0;
    this.moveSpeed = isPlayer ? 260 : 230;
    this.alive = true;
    this.kills = 0;
    this.damageDealt = 0;
    this.damageTaken = 0;
    this.parries = 0;
    this.dodges = 0;
    this.cooldown = 0;
    this.attackTimer = 0;
    this.attackDuration = 0;
    this.attackFacing = 0;
    this.attackHeavy = false;
    this.hasHit = new Set();
    this.blocking = false;
    this.blockHeld = 0;
    this.guardBroken = 0;
    this.stunned = 0;
    this.dodgeTimer = 0;
    this.dodgeCooldown = 0;
    this.invulnerable = 0;
    this.hitFlash = 0;
    this.deadTimer = 0;
    this.healTimer = 0;
    this.pendingHeal = 0;
    this.status = { burn: 0, frost: 0 };
    this.lastAttacker = null;
  }

  get speedMultiplier() {
    let mult = this.armor.speed || 1;
    if (this.shield?.speed) mult *= this.shield.speed;
    if (this.blocking) mult *= 0.54;
    if (this.healTimer > 0) mult *= 0.38;
    if (this.status.frost > 0) mult *= 0.75;
    return mult;
  }

  update(dt, world) {
    if (!this.alive) {
      this.deadTimer += dt;
      return;
    }
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.attackTimer = Math.max(0, this.attackTimer - dt);
    this.guardBroken = Math.max(0, this.guardBroken - dt);
    this.stunned = Math.max(0, this.stunned - dt);
    this.dodgeTimer = Math.max(0, this.dodgeTimer - dt);
    this.dodgeCooldown = Math.max(0, this.dodgeCooldown - dt);
    this.invulnerable = Math.max(0, this.invulnerable - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.status.burn = Math.max(0, this.status.burn - dt);
    this.status.frost = Math.max(0, this.status.frost - dt);
    if (this.status.burn > 0) this.takeRawDamage(dt * 4, null, "burn");

    if (this.healTimer > 0) {
      this.healTimer -= dt;
      if (this.healTimer <= 0 && this.alive) {
        this.health = Math.min(this.maxHealth, this.health + this.pendingHeal);
        this.pendingHeal = 0;
      }
    }

    if (!this.blocking && this.guardBroken <= 0) this.stamina = Math.min(this.maxStamina, this.stamina + dt * 27);
    if (this.blocking) this.blockHeld += dt;
    else this.blockHeld = 0;

    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vx *= Math.pow(0.06, dt);
    this.vy *= Math.pow(0.06, dt);
    world.resolve(this);
  }

  steer(mx, my, dt) {
    if (!this.alive || this.stunned > 0 || this.attackTimer > this.attackDuration * 0.54) return;
    const accel = 1160 * this.speedMultiplier;
    this.vx += mx * accel * dt;
    this.vy += my * accel * dt;
    const max = this.moveSpeed * this.speedMultiplier * (this.dodgeTimer > 0 ? 2.6 : 1);
    const speed = Math.hypot(this.vx, this.vy);
    if (speed > max) {
      this.vx = (this.vx / speed) * max;
      this.vy = (this.vy / speed) * max;
    }
  }

  startAttack(heavy = false) {
    if (!this.alive || this.cooldown > 0 || this.stunned > 0 || this.guardBroken > 0 || this.healTimer > 0) return false;
    const cost = heavy ? this.weapon.stamina + 18 : Math.max(0, this.weapon.stamina - 3);
    if (this.stamina < cost) return false;
    this.stamina -= cost;
    this.blocking = false;
    this.attackHeavy = heavy;
    this.attackDuration = this.weapon.speed * (heavy ? 1.35 : 0.82);
    this.attackTimer = this.attackDuration;
    this.cooldown = this.weapon.speed * (heavy ? 1.15 : 0.92);
    this.attackFacing = this.facing;
    this.hasHit.clear();
    return true;
  }

  dodge() {
    if (!this.alive || this.stamina < 28 || this.dodgeCooldown > 0 || this.stunned > 0 || this.healTimer > 0) return false;
    this.stamina -= 28;
    this.dodgeTimer = 0.25;
    this.dodgeCooldown = 0.58;
    this.invulnerable = 0.17;
    this.blocking = false;
    this.vx += Math.cos(this.facing) * 560;
    this.vy += Math.sin(this.facing) * 560;
    this.dodges += 1;
    return true;
  }

  setBlocking(on) {
    this.blocking = on && this.alive && this.guardBroken <= 0 && this.stunned <= 0 && this.healTimer <= 0 && this.attackTimer <= 0;
  }

  startHeal(amount) {
    if (!this.alive) return;
    this.pendingHeal = amount;
    this.healTimer = 1.25;
  }

  takeRawDamage(amount, attacker, type = "hit") {
    if (!this.alive || this.invulnerable > 0) return false;
    this.health -= amount;
    this.damageTaken += amount;
    if (attacker) this.lastAttacker = attacker;
    if (this.health <= 0) this.die(attacker);
    return true;
  }

  receiveHit({ attacker, damage, knockback, direction, heavy, critical, effect }) {
    if (!this.alive || this.invulnerable > 0) return { hit: false };
    const frontal = Math.abs(angleDiff(direction + Math.PI, this.facing)) < 1.18;
    if (this.blocking && frontal && this.guardBroken <= 0) {
      const parryWindow = this.blockHeld < (this.shield?.parry || 0.2);
      if (parryWindow) {
        attacker.stunned = 0.72;
        attacker.vx -= Math.cos(direction) * 120;
        attacker.vy -= Math.sin(direction) * 120;
        this.parries += 1;
        return { hit: true, blocked: true, parry: true };
      }
      const reduction = this.shield?.block || 0.58;
      const staminaCost = heavy ? 28 : 16;
      this.stamina -= staminaCost;
      if (this.stamina <= 0) {
        this.stamina = 0;
        this.guardBroken = 1.05;
        this.blocking = false;
        damage *= 0.7;
      } else {
        damage *= 1 - reduction;
      }
      this.vx += Math.cos(direction) * knockback * 0.22;
      this.vy += Math.sin(direction) * knockback * 0.22;
      return { hit: true, blocked: true, guardBreak: this.guardBroken > 0 };
    }

    damage *= 1 - (this.armor.defense || 0);
    if (critical) damage *= 1.62;
    this.health -= damage;
    this.damageTaken += damage;
    this.hitFlash = 0.13;
    this.lastAttacker = attacker;
    this.vx += Math.cos(direction) * knockback;
    this.vy += Math.sin(direction) * knockback;
    if (effect === "burn") this.status.burn = 2.5;
    if (effect === "frost") this.status.frost = 1.8;
    if (effect === "vampire") attacker.health = Math.min(attacker.maxHealth, attacker.health + damage * 0.16);
    if (effect === "thunder") {
      this.vx += Math.cos(direction) * 170;
      this.vy += Math.sin(direction) * 170;
    }
    attacker.damageDealt += damage;
    if (this.health <= 0) this.die(attacker);
    return { hit: true, blocked: false, damage, critical };
  }

  die(attacker) {
    if (!this.alive) return;
    this.alive = false;
    this.health = 0;
    this.deadTimer = 0;
    if (attacker && attacker !== this) attacker.kills += 1;
  }

  canDamageNow() {
    return this.attackTimer > 0 && this.attackTimer < this.attackDuration * 0.68 && this.attackTimer > this.attackDuration * 0.18;
  }

  tryHit(target) {
    if (!this.canDamageNow() || this.hasHit.has(target.id) || !target.alive) return null;
    const range = this.weapon.range * (this.attackHeavy ? 1.12 : 1);
    const arc = this.weapon.arc * (this.attackHeavy ? 1.18 : 1);
    if (!pointInArc(this, target, this.attackFacing, range, arc, target.r)) return null;
    this.hasHit.add(target.id);
    const direction = angleTo(this, target);
    const critical = chance((this.weapon.crit || 0.08) + (this.attackHeavy ? 0.05 : 0));
    return target.receiveHit({
      attacker: this,
      damage: this.weapon.damage * (this.attackHeavy ? 1.75 : 1),
      knockback: this.weapon.knockback * (this.attackHeavy ? 1.55 : 1),
      direction,
      heavy: this.attackHeavy,
      critical,
      effect: this.weapon.effect
    });
  }

  draw(ctx) {
    if (!this.alive && this.deadTimer > 8) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.facing);
    const alpha = this.alive ? 1 : Math.max(0.18, 1 - this.deadTimer * 1.2);
    ctx.globalAlpha = alpha;

    if (this.dodgeTimer > 0) {
      ctx.strokeStyle = "rgba(230, 220, 180, 0.38)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 29, 0, TAU);
      ctx.stroke();
    }

    if (this.attackTimer > 0) this.drawWeaponArc(ctx);

    if (this.blocking) {
      ctx.fillStyle = "rgba(158, 186, 203, 0.82)";
      ctx.beginPath();
      ctx.moveTo(18, -18);
      ctx.lineTo(34, -8);
      ctx.lineTo(34, 8);
      ctx.lineTo(18, 18);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 13, 21, 9, 0, 0, TAU);
    ctx.fill();

    ctx.fillStyle = this.hitFlash > 0 ? "#fff0d3" : this.armor.color || this.color;
    ctx.strokeStyle = "#171814";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(6, 0, 9, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#1a1712";
    ctx.beginPath();
    ctx.arc(12, -4, 2, 0, TAU);
    ctx.arc(12, 4, 2, 0, TAU);
    ctx.fill();

    ctx.restore();

    if (this.alive) this.drawNameplate(ctx);
  }

  drawWeaponArc(ctx) {
    const progress = 1 - this.attackTimer / this.attackDuration;
    const sweep = (progress - 0.5) * this.weapon.arc * 1.6;
    const length = this.weapon.range * (this.attackHeavy ? 1.08 : 0.92);
    ctx.save();
    ctx.rotate(sweep);
    ctx.strokeStyle = this.weapon.color;
    ctx.lineWidth = this.attackHeavy ? 9 : 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (this.weapon.id === "spear") {
      ctx.moveTo(12, 0);
      ctx.lineTo(length, 0);
    } else {
      ctx.arc(0, 0, length * 0.68, -this.weapon.arc / 2, this.weapon.arc / 2);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawNameplate(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y - 38);
    ctx.font = "700 11px system-ui";
    ctx.textAlign = "center";
    ctx.fillStyle = this.isPlayer ? "#f8d373" : "#eee0bf";
    ctx.fillText(this.name, 0, 0);
    ctx.fillStyle = "rgba(0,0,0,0.52)";
    ctx.fillRect(-24, 7, 48, 5);
    ctx.fillStyle = this.health < this.maxHealth * 0.35 ? "#d94a40" : "#62bd67";
    ctx.fillRect(-24, 7, 48 * clamp(this.health / this.maxHealth, 0, 1), 5);
    if (this.guardBroken > 0) {
      ctx.fillStyle = "#f1ca57";
      ctx.fillText("BREAK", 0, 24);
    }
    ctx.restore();
  }
}
