"use strict";

const TAU = Math.PI * 2;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;
const distSq = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
};
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];
const format = (n) => Math.round(n).toLocaleString("en-US");

const CONFIG = {
  worldSize: 5200,
  foodTarget: 720,
  botTarget: 24,
  hazardCount: 13,
  consumeRatio: 1.12,
  consumeOverlap: 0.42,
  cellMassFactor: 0.062,
  initialMass: 120,
  minBotMass: 78,
  maxDt: 0.04,
  rushDuration: 1.8,
  rushCooldown: 7,
  magnetDuration: 8,
  magnetReach: 250,
  magnetSpeed: 430,
  crownDuration: 30,
  scoreAttackDuration: 90,
  overdriveMass: 650,
  overdriveCost: 0.08,
  rivalMass: 850,
};

const BOT_NAMES = ["NOVA", "BLOB", "PIXEL", "MILO", "ZEN", "BYTE", "ORBIT", "NEXO", "ACE", "LUNA", "ION", "VEX", "KAI", "JUNO", "MICA", "SOL"];
const BOT_PALETTE = ["#6ee7b7", "#93c5fd", "#fda4af", "#c4b5fd", "#f9a8d4", "#fcd34d", "#67e8f9", "#a7f3d0", "#fdba74", "#bfdbfe"];
const FOOD_PALETTE = ["#86efac", "#93c5fd", "#f9a8d4", "#fde68a", "#c4b5fd", "#99f6e4"];
const FOOD_TYPES = [
  { kind: "pellet", weight: 44, color: "#93c5fd", value: [1.0, 1.45], radius: [3.2, 4.8] },
  { kind: "berry", weight: 18, color: "#f472b6", value: [1.3, 1.8], radius: [4.3, 5.8] },
  { kind: "bean", weight: 16, color: "#86efac", value: [1.6, 2.2], radius: [4.8, 6.4], protein: true },
  { kind: "egg", weight: 10, color: "#fff7d6", value: [2.2, 3.0], radius: [5.8, 7.2], protein: true },
  { kind: "fish", weight: 7, color: "#67e8f9", value: [2.8, 3.8], radius: [6.5, 8.0], protein: true },
];
const PERSONALITIES = {
  AGGRESSIVE: { chase: 1.35, flee: 0.82, food: 0.85, risk: 1.18, wander: 0.7 },
  CAUTIOUS: { chase: 0.74, flee: 1.34, food: 1.08, risk: 0.78, wander: 0.95 },
  OPPORTUNIST: { chase: 1.08, flee: 1.0, food: 0.9, risk: 0.96, wander: 0.85 },
  GREEDY: { chase: 0.78, flee: 0.92, food: 1.46, risk: 0.95, wander: 0.85 },
  HUNTER: { chase: 1.22, flee: 0.94, food: 0.72, risk: 1.04, wander: 0.72 },
  COWARD: { chase: 0.62, flee: 1.65, food: 1.02, risk: 0.62, wander: 1.1 },
};

class SpatialHash {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.buckets = new Map();
  }

  key(x, y) {
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }

  rebuild(items) {
    this.buckets.clear();
    for (const item of items) {
      const key = this.key(item.x, item.y);
      let bucket = this.buckets.get(key);
      if (!bucket) {
        bucket = [];
        this.buckets.set(key, bucket);
      }
      bucket.push(item);
    }
  }

  query(x, y, radius) {
    const minX = Math.floor((x - radius) / this.cellSize);
    const maxX = Math.floor((x + radius) / this.cellSize);
    const minY = Math.floor((y - radius) / this.cellSize);
    const maxY = Math.floor((y + radius) / this.cellSize);
    const result = [];
    for (let gx = minX; gx <= maxX; gx++) {
      for (let gy = minY; gy <= maxY; gy++) {
        const bucket = this.buckets.get(`${gx},${gy}`);
        if (bucket) result.push(...bucket);
      }
    }
    return result;
  }
}

// Four bars of A minor, each with a bass note, a pad voicing and a sparse motif.
const MUSIC_BARS = [
  { bass: 45, pad: [57, 60, 64, 71], lead: [72, null, null, 76, null, 71, null, 69] },
  { bass: 41, pad: [57, 60, 64, 65], lead: [null, 72, null, 76, null, null, 77, null] },
  { bass: 48, pad: [55, 60, 64, 67], lead: [76, null, 79, null, null, 74, null, 72] },
  { bass: 43, pad: [55, 59, 62, 69], lead: [71, null, null, 74, null, 69, null, null] },
];
const MUSIC_STEP = 60 / 112 / 2;
const noteFrequency = (note) => 440 * 2 ** ((note - 69) / 12);

class AudioManager {
  constructor() {
    this.enabled = localStorage.getItem("cellRush.sound") !== "off";
    this.musicEnabled = localStorage.getItem("cellRush.music") !== "off";
    this.ctx = null;
    this.lastPellet = 0;
    this.mix = null;
    this.musicMix = null;
    this.musicStep = 0;
    this.nextMusicNote = 0;
  }

  unlock() {
    if (!this.enabled && !this.musicEnabled) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.mix = this.ctx.createGain();
      this.mix.gain.value = this.enabled ? 0.45 : 0;
      this.mix.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
  }

  setEnabled(value) {
    this.enabled = value;
    localStorage.setItem("cellRush.sound", value ? "on" : "off");
    if (this.mix) this.mix.gain.setTargetAtTime(value ? 0.45 : 0, this.ctx.currentTime, 0.015);
  }

  setMusicEnabled(value) {
    this.musicEnabled = value;
    localStorage.setItem("cellRush.music", value ? "on" : "off");
    if (!value) this.stopMusic();
  }

  stopMusic() {
    if (!this.musicMix) return;
    const mix = this.musicMix;
    mix.gain.setTargetAtTime(0, this.ctx.currentTime, 0.025);
    setTimeout(() => mix.disconnect(), 150);
    this.musicMix = null;
  }

  updateMusic() {
    if (!this.musicEnabled || this.ctx?.state !== "running") return;
    const now = this.ctx.currentTime;
    if (!this.musicMix) {
      this.musicMix = this.ctx.createGain();
      this.musicMix.gain.value = 0.38;
      this.musicMix.connect(this.ctx.destination);
      this.nextMusicNote = now + 0.04;
    }
    // Recover gracefully from a delayed frame without replaying missed notes.
    if (this.nextMusicNote < now) this.nextMusicNote = now + 0.015;
    while (this.nextMusicNote < now + 0.12) {
      const beat = this.musicStep % 8;
      const { bass, pad, lead } = MUSIC_BARS[Math.floor(this.musicStep / 8)];
      const time = this.nextMusicNote;
      const mix = this.musicMix;
      if (beat === 0) {
        for (const note of pad) this.voice(time, noteFrequency(note), noteFrequency(note), 2.12, 0.032, mix, 0.35);
      }
      if (beat === 0 || beat === 3 || beat === 6) {
        const pitch = noteFrequency(beat === 6 ? bass + 12 : bass);
        this.voice(time, pitch, pitch, 0.24, 0.16, mix, 0.035, "triangle");
      }
      if (beat % 2 === 0) this.voice(time, 110, 47, 0.14, 0.095, mix, 0.012);
      if (lead[beat] !== null) {
        const pitch = noteFrequency(lead[beat]);
        this.voice(time, pitch, pitch, 0.48, 0.055, mix, 0.028);
        this.voice(time + MUSIC_STEP, pitch, pitch, 0.33, 0.017, mix, 0.025);
      }
      this.musicStep = (this.musicStep + 1) % (MUSIC_BARS.length * 8);
      this.nextMusicNote += MUSIC_STEP;
    }
  }

  blip(type) {
    if (!this.enabled) return;
    if (this.ctx?.state !== "running") return;
    const now = this.ctx.currentTime;
    if (type === "pellet" && now - this.lastPellet < 0.105) return;
    if (type === "pellet") this.lastPellet = now;
    const table = {
      pellet: [[390, 230, 0.045, 0.025, 0]],
      gold: [[440, 440, 0.13, 0.07, 0], [659, 659, 0.18, 0.045, 0.055]],
      eat: [[155, 70, 0.23, 0.15, 0], [310, 210, 0.095, 0.05, 0.025]],
      power: [[262, 392, 0.14, 0.07, 0], [392, 523, 0.18, 0.045, 0.05]],
      rush: [[100, 225, 0.22, 0.12, 0], [230, 350, 0.18, 0.035, 0.025]],
      overdrive: [[65, 230, 0.36, 0.15, 0], [130, 375, 0.28, 0.06, 0.04]],
      magnet: [[349, 440, 0.25, 0.065, 0], [523, 587, 0.28, 0.055, 0.055]],
      danger: [[145, 115, 0.16, 0.045, 0]],
      death: [[220, 98, 0.46, 0.12, 0], [330, 146, 0.32, 0.065, 0.055]],
      rival: [[98, 98, 0.28, 0.11, 0], [147, 145, 0.38, 0.08, 0.14]],
      record: [[392, 392, 0.2, 0.07, 0], [494, 494, 0.24, 0.08, 0.09], [587, 587, 0.32, 0.075, 0.18]],
    };
    for (const [from, to, duration, level, delay] of table[type] || table.pellet) {
      this.voice(now + delay, from, to, duration, level, this.mix, Math.min(0.03, duration / 4));
    }
  }

  voice(start, from, to, duration, level, mix, attack, wave = "sine") {
    const end = start + duration;
    const oscillator = this.ctx.createOscillator();
    const envelope = this.ctx.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(to, end);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(level, start + attack);
    envelope.gain.exponentialRampToValueAtTime(0.0001, end);
    oscillator.connect(envelope).connect(mix);
    oscillator.start(start);
    oscillator.stop(end);
  }
}

class StorageManager {
  constructor() {
    this.key = "cellRush.records";
    this.records = JSON.parse(localStorage.getItem(this.key) || "{}");
  }

  save(stats, mode, won) {
    const before = JSON.stringify(this.records);
    if (mode === "score") {
      this.records.scoreAttackBest = Math.max(this.records.scoreAttackBest || 0, stats.score);
      localStorage.setItem(this.key, JSON.stringify(this.records));
      return before !== JSON.stringify(this.records);
    }
    if (won) this.records.crownWins = (this.records.crownWins || 0) + 1;
    this.records.bestScore = Math.max(this.records.bestScore || 0, stats.score);
    this.records.largestMass = Math.max(this.records.largestMass || 0, stats.maxMass);
    this.records.mostCells = Math.max(this.records.mostCells || 0, stats.cellsEaten);
    this.records.longestSurvival = Math.max(this.records.longestSurvival || 0, stats.survival);
    this.records.bestRank = Math.min(this.records.bestRank || 999, stats.bestRank);
    localStorage.setItem(this.key, JSON.stringify(this.records));
    return before !== JSON.stringify(this.records);
  }
}

class InputManager {
  constructor(canvas, joystick, joystickThumb) {
    this.canvas = canvas;
    this.pointer = { x: innerWidth / 2, y: innerHeight / 2, active: false };
    this.keys = new Set();
    this.joystick = { x: 0, y: 0, active: false, pointerId: null };
    canvas.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "touch") this.setPointer(e);
    }, { passive: true });
    canvas.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;
      this.pointer.active = true;
      this.setPointer(e);
    }, { passive: true });
    addEventListener("pointerup", () => { this.pointer.active = false; }, { passive: true });
    addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
        if (document.activeElement?.tagName === "INPUT") return;
        e.preventDefault();
        this.keys.add(e.code);
      }
    });
    addEventListener("keyup", (e) => this.keys.delete(e.code));
    joystick.addEventListener("pointerdown", (e) => {
      this.joystick.active = true;
      this.joystick.pointerId = e.pointerId;
      joystick.setPointerCapture(e.pointerId);
      joystick.classList.add("active");
      this.updateJoystick(e, joystick, joystickThumb);
    });
    joystick.addEventListener("pointermove", (e) => {
      if (this.joystick.active && e.pointerId === this.joystick.pointerId) this.updateJoystick(e, joystick, joystickThumb);
    });
    const releaseJoystick = (e) => {
      if (e.pointerId !== this.joystick.pointerId) return;
      this.joystick = { x: 0, y: 0, active: false, pointerId: null };
      joystick.classList.remove("active");
      joystickThumb.style.transform = "translate(-50%, -50%)";
    };
    joystick.addEventListener("pointerup", releaseJoystick);
    joystick.addEventListener("pointercancel", releaseJoystick);
  }

  setPointer(e) {
    this.pointer.x = e.clientX;
    this.pointer.y = e.clientY;
  }

  updateJoystick(e, base, thumb) {
    const rect = base.getBoundingClientRect();
    const max = rect.width * 0.31;
    let dx = e.clientX - (rect.left + rect.width / 2);
    let dy = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if (distance > max) {
      dx = (dx / distance) * max;
      dy = (dy / distance) * max;
    }
    this.joystick.x = dx / max;
    this.joystick.y = dy / max;
    thumb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  movement() {
    let x = this.joystick.x;
    let y = this.joystick.y;
    if (this.keys.has("ArrowLeft") || this.keys.has("KeyA")) x -= 1;
    if (this.keys.has("ArrowRight") || this.keys.has("KeyD")) x += 1;
    if (this.keys.has("ArrowUp") || this.keys.has("KeyW")) y -= 1;
    if (this.keys.has("ArrowDown") || this.keys.has("KeyS")) y += 1;
    const length = Math.hypot(x, y);
    if (length > 1) return { x: x / length, y: y / length, active: true };
    return { x, y, active: length > 0.08 };
  }
}

class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
    this.shake = 0;
  }

  update(target, dt, reducedMotion) {
    const desiredZoom = clamp(1.28 - Math.sqrt(target.mass) * 0.012, 0.52, 1.18);
    const follow = reducedMotion ? 1 : 1 - Math.exp(-dt * 4.5);
    this.x = lerp(this.x, target.x, follow);
    this.y = lerp(this.y, target.y, follow);
    this.zoom = lerp(this.zoom, desiredZoom, reducedMotion ? 0.18 : 1 - Math.exp(-dt * 2.4));
    this.shake = Math.max(0, this.shake - dt * 8);
  }

  bump(amount) {
    this.shake = Math.max(this.shake, amount);
  }
}

class ParticleSystem {
  constructor(reducedMotion) {
    this.particles = [];
    this.reducedMotion = reducedMotion;
  }

  burst(x, y, color, count, power = 140) {
    if (this.reducedMotion) count = Math.ceil(count * 0.25);
    for (let i = 0; i < count; i++) {
      const a = rand(0, TAU);
      const speed = rand(power * 0.25, power);
      this.particles.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        r: rand(2, 5),
        life: rand(0.35, 0.75),
        max: 0,
        color,
      });
    }
    for (const p of this.particles) if (!p.max) p.max = p.life;
  }

  update(dt) {
    for (const p of this.particles) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.96;
      p.vy *= 0.96;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
  }

  render(ctx) {
    for (const p of this.particles) {
      ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

class Cell {
  constructor({ x, y, mass, name, color, player = false, personality = null }) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.mass = mass;
    this.displayMass = mass;
    this.name = name;
    this.color = color;
    this.player = player;
    this.personality = personality;
    this.target = { x, y };
    this.radius = this.radiusFromMass(mass);
    this.alive = true;
    this.wobble = rand(0, TAU);
    this.boostTime = 0;
    this.rushTime = 0;
    this.overdrive = false;
    this.rushCooldown = 0;
    this.magnetTime = 0;
    this.shieldTime = 0;
    this.stunTime = 0;
    this.decisionTimer = 0;
    this.state = "WANDER";
    this.wanderAngle = rand(0, TAU);
    this.score = Math.round(mass * 8);
  }

  radiusFromMass(mass) {
    return Math.sqrt(mass / CONFIG.cellMassFactor);
  }

  addMass(amount) {
    this.mass = Math.max(30, this.mass + amount);
    this.score += Math.max(0, amount * 8);
  }

  speed() {
    const base = 265 - 120 * this.mass / (this.mass + 400);
    if (this.rushTime > 0) return base * (this.overdrive ? 2.55 : 1.8);
    const boost = this.boostTime > 0 ? 1.52 : 1;
    return base * boost;
  }

  update(dt, world) {
    this.boostTime = Math.max(0, this.boostTime - dt);
    this.rushTime = Math.max(0, this.rushTime - dt);
    if (this.rushTime === 0) this.overdrive = false;
    this.rushCooldown = Math.max(0, this.rushCooldown - dt);
    this.magnetTime = Math.max(0, this.magnetTime - dt);
    this.shieldTime = Math.max(0, this.shieldTime - dt);
    this.stunTime = Math.max(0, this.stunTime - dt);
    this.displayMass = lerp(this.displayMass, this.mass, 1 - Math.exp(-dt * 8));
    this.radius = this.radiusFromMass(this.displayMass);
    this.wobble += dt * (this.player ? 2.2 : 1.6);

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;
    const desire = clamp(dist / (this.player ? 120 : 240), 0, 1);
    const maxSpeed = this.speed() * desire * (this.stunTime > 0 ? 0.36 : 1);
    const desiredVx = (dx / dist) * maxSpeed;
    const desiredVy = (dy / dist) * maxSpeed;
    const response = this.rushTime > 0 ? 11 : 7 - 2.5 * this.mass / (this.mass + 550);
    const inertia = 1 - Math.exp(-dt * response);
    this.vx = lerp(this.vx, desiredVx, inertia);
    this.vy = lerp(this.vy, desiredVy, inertia);
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    const margin = this.radius + 10;
    this.x = clamp(this.x, margin, world.size - margin);
    this.y = clamp(this.y, margin, world.size - margin);
  }
}

class BotAI {
  decide(bot, world) {
    const p = PERSONALITIES[bot.personality];
    const scan = clamp(560 + bot.radius * 4, 620, 1250);
    const cells = world.cells.filter((c) => c !== bot && c.alive && distSq(c, bot) < scan * scan);
    const threats = cells.filter((c) => c.radius > bot.radius * (CONFIG.consumeRatio + 0.02));
    const prey = cells.filter((c) => bot.radius > c.radius * (CONFIG.consumeRatio + 0.03));
    const nearestThreat = this.nearest(bot, threats);

    if (nearestThreat && Math.sqrt(distSq(bot, nearestThreat)) < (bot.radius + nearestThreat.radius + 210 * p.flee)) {
      const dx = bot.x - nearestThreat.x;
      const dy = bot.y - nearestThreat.y;
      const edgeNudge = this.edgeVector(bot, world);
      bot.target = { x: bot.x + dx * 2.2 + edgeNudge.x, y: bot.y + dy * 2.2 + edgeNudge.y };
      bot.state = "FLEE";
      return;
    }

    const crownGold = this.nearest(bot, world.powerups.filter((pickup) =>
      pickup.crownGold && distSq(bot, pickup) < scan * scan));
    if (crownGold) {
      bot.target = crownGold;
      bot.state = "FEED";
      return;
    }

    const bestPrey = prey
      .map((c) => ({ c, value: (c.mass / Math.max(80, Math.sqrt(distSq(c, bot)))) * p.chase * rand(0.82, 1.12) }))
      .sort((a, b) => b.value - a.value)[0];
    if (bestPrey && bestPrey.value > 0.22 / p.risk) {
      const lead = clamp(Math.sqrt(distSq(bestPrey.c, bot)) / 300, 0, 0.55);
      bot.target = { x: bestPrey.c.x + bestPrey.c.vx * lead, y: bestPrey.c.y + bestPrey.c.vy * lead };
      bot.state = bot.mass > bestPrey.c.mass * 2.2 ? "HUNT" : "CHASE";
      return;
    }

    const foods = world.foodHash.query(bot.x, bot.y, 560);
    let bestFood = null;
    let bestScore = -Infinity;
    for (const f of foods) {
      const d = Math.max(25, Math.sqrt(distSq(f, bot)));
      const score = ((f.value || 1) * 140) / d * p.food + rand(-0.05, 0.05);
      if (score > bestScore) {
        bestFood = f;
        bestScore = score;
      }
    }
    if (bestFood && bestScore > 0.14) {
      bot.target = { x: bestFood.x, y: bestFood.y };
      bot.state = "FEED";
      return;
    }

    const edge = this.edgeVector(bot, world);
    if (Math.abs(edge.x) + Math.abs(edge.y) > 0) {
      bot.target = { x: bot.x + edge.x, y: bot.y + edge.y };
      bot.state = "ESCAPE";
      return;
    }

    bot.wanderAngle += rand(-0.85, 0.85) * p.wander;
    bot.target = {
      x: bot.x + Math.cos(bot.wanderAngle) * rand(260, 620),
      y: bot.y + Math.sin(bot.wanderAngle) * rand(260, 620),
    };
    bot.state = "WANDER";
  }

  nearest(from, list) {
    let best = null;
    let bestD = Infinity;
    for (const item of list) {
      const d = distSq(from, item);
      if (d < bestD) {
        bestD = d;
        best = item;
      }
    }
    return best;
  }

  edgeVector(cell, world) {
    const pad = 360;
    let x = 0;
    let y = 0;
    if (cell.x < pad) x += 720;
    if (cell.x > world.size - pad) x -= 720;
    if (cell.y < pad) y += 720;
    if (cell.y > world.size - pad) y -= 720;
    return { x, y };
  }
}

class World {
  constructor(game) {
    this.game = game;
    this.size = CONFIG.worldSize;
    this.food = [];
    this.powerups = [];
    this.hazards = [];
    this.bots = [];
    this.cells = [];
    this.foodHash = new SpatialHash(260);
    this.ai = new BotAI();
    this.respawnQueue = 0;
    this.specialTimer = 2;
  }

  reset(playerName) {
    this.food = [];
    this.powerups = [];
    this.hazards = [];
    this.bots = [];
    this.respawnQueue = 0;
    this.specialTimer = 2;
    this.player = new Cell({
      x: this.size / 2,
      y: this.size / 2,
      mass: CONFIG.initialMass,
      name: playerName || "YOU",
      color: "#63ead7",
      player: true,
    });
    this.cells = [this.player];
    this.seedFood();
    this.seedOpening();
    for (let i = 0; i < CONFIG.hazardCount; i++) this.hazards.push(this.createHazard());
    for (let i = 0; i < CONFIG.botTarget; i++) this.spawnBot(i < 7);
    this.foodHash.rebuild(this.food);
  }

  seedFood() {
    while (this.food.length < CONFIG.foodTarget) this.food.push(this.createFood());
  }

  seedOpening() {
    for (let i = 0; i < 90; i++) {
      const a = rand(0, TAU);
      const d = rand(110, 560);
      this.food.push(this.createFood(this.player.x + Math.cos(a) * d, this.player.y + Math.sin(a) * d));
    }
    this.powerups.push(this.createPowerup("gold", this.player.x + 420, this.player.y - 160));
    this.powerups.push(this.createPowerup("magnet", this.player.x - 330, this.player.y + 130));
  }

  createFood(x = rand(60, this.size - 60), y = rand(60, this.size - 60)) {
    const special = Math.random() < 0.012;
    let roll = rand(0, FOOD_TYPES.reduce((sum, item) => sum + item.weight, 0));
    const profile = FOOD_TYPES.find((item) => (roll -= item.weight) <= 0) || FOOD_TYPES[0];
    return {
      x: clamp(x, 40, this.size - 40),
      y: clamp(y, 40, this.size - 40),
      r: special ? rand(7.0, 8.8) : rand(...profile.radius),
      color: special ? "#f6c453" : profile.color,
      value: special ? rand(5.2, 7.5) : rand(...profile.value),
      type: special ? "goldFood" : "food",
      kind: special ? "gold" : profile.kind,
      protein: !special && Boolean(profile.protein),
      rotation: rand(0, TAU),
    };
  }

  createPowerup(type, x = rand(160, this.size - 160), y = rand(160, this.size - 160)) {
    const meta = {
      speed: { r: 10, color: "#60a5fa", value: 5 },
      shield: { r: 11, color: "#a78bfa", value: 4 },
      gold: { r: 12, color: "#f6c453", value: 12 },
      magnet: { r: 12, color: "#82dcca", value: 4 },
    }[type];
    return { x, y, type, ...meta, pulse: rand(0, TAU) };
  }

  createHazard() {
    let x = rand(320, this.size - 320);
    let y = rand(320, this.size - 320);
    if (Math.hypot(x - this.size / 2, y - this.size / 2) < 780) {
      x += rand(650, 1100) * (Math.random() < 0.5 ? -1 : 1);
      y += rand(650, 1100) * (Math.random() < 0.5 ? -1 : 1);
    }
    return { x: clamp(x, 220, this.size - 220), y: clamp(y, 220, this.size - 220), r: rand(33, 48), spin: rand(-1, 1), phase: rand(0, TAU) };
  }

  spawnBot(opening = false) {
    let pos = null;
    for (let tries = 0; tries < 90; tries++) {
      const candidate = {
        x: opening ? this.player.x + rand(-880, 880) : rand(120, this.size - 120),
        y: opening ? this.player.y + rand(-880, 880) : rand(120, this.size - 120),
      };
      candidate.x = clamp(candidate.x, 120, this.size - 120);
      candidate.y = clamp(candidate.y, 120, this.size - 120);
      const nearPlayer = distSq(candidate, this.player) < (opening ? 210 * 210 : 720 * 720);
      const nearHuge = this.cells.some((c) => c.mass > 800 && distSq(candidate, c) < 540 * 540);
      if (!nearPlayer && !nearHuge) {
        pos = candidate;
        break;
      }
    }
    if (!pos) pos = { x: rand(160, this.size - 160), y: rand(160, this.size - 160) };
    const personality = pick(Object.keys(PERSONALITIES));
    const mass = opening ? rand(CONFIG.minBotMass, 260) : rand(CONFIG.minBotMass, 360);
    const bot = new Cell({
      ...pos,
      mass,
      name: pick(BOT_NAMES),
      color: pick(BOT_PALETTE),
      personality,
    });
    bot.decisionTimer = rand(0.05, 0.3);
    this.bots.push(bot);
    this.cells.push(bot);
    return bot;
  }

  spawnRival(mass) {
    const { x, y } = this.player;
    const angle = Math.atan2(this.size / 2 - y, this.size / 2 - x) + rand(-0.7, 0.7);
    const distance = Math.max(740, this.player.radius * 3);
    const rival = new Cell({
      x: clamp(x + Math.cos(angle) * distance, 240, this.size - 240),
      y: clamp(y + Math.sin(angle) * distance, 240, this.size - 240),
      mass,
      name: "APEX",
      color: "#ef8d70",
      personality: "HUNTER",
    });
    rival.rival = true;
    rival.decisionTimer = 0;
    this.bots.push(rival);
    this.cells.push(rival);
  }

  spawnCrownGold() {
    const angle = rand(0, TAU);
    const distance = this.player.radius + rand(215, 365);
    const x = clamp(this.player.x + Math.cos(angle) * distance, 40, this.size - 40);
    const y = clamp(this.player.y + Math.sin(angle) * distance, 40, this.size - 40);
    const pickup = this.createPowerup("gold", x, y);
    pickup.crownGold = true;
    pickup.life = 9;
    this.powerups.push(pickup);
  }

  update(dt) {
    const player = this.player;
    const movement = this.game.input.movement();
    player.target = movement.active
      ? { x: player.x + movement.x * 360, y: player.y + movement.y * 360 }
      : this.game.screenToWorld(this.game.input.pointer.x, this.game.input.pointer.y);

    for (const bot of this.bots) {
      bot.decisionTimer -= dt;
      if (bot.decisionTimer <= 0) {
        this.ai.decide(bot, this);
        bot.decisionTimer = rand(0.12, 0.32);
      }
    }

    for (const cell of this.cells) cell.update(dt, this);
    this.handlePowerups(dt);
    this.attractFood(dt);
    this.handleFood();
    this.handleHazards(dt);
    this.handleCellConsumption();
    this.replenish(dt);
    this.cells = [this.player, ...this.bots].filter((c) => c.alive);
  }

  attractFood(dt) {
    const targets = new Map();
    for (const cell of this.cells) {
      if (cell.magnetTime <= 0) continue;
      const reach = cell.radius + CONFIG.magnetReach;
      for (const food of this.foodHash.query(cell.x, cell.y, reach)) {
        const distanceSquared = distSq(food, cell);
        if (distanceSquared > reach * reach || distanceSquared === 0) continue;
        const current = targets.get(food);
        if (!current || distanceSquared < current.distanceSquared) {
          targets.set(food, { cell, distanceSquared });
        }
      }
    }
    for (const [food, { cell, distanceSquared }] of targets) {
      const fraction = Math.min(1, CONFIG.magnetSpeed * dt / Math.sqrt(distanceSquared));
      food.x = lerp(food.x, cell.x, fraction);
      food.y = lerp(food.y, cell.y, fraction);
    }
    if (targets.size > 0) this.foodHash.rebuild(this.food);
  }

  handleFood() {
    let consumed = false;
    for (const cell of this.cells) {
      const nearby = this.foodHash.query(cell.x, cell.y, cell.radius + 24);
      for (const food of nearby) {
        if (food.dead) continue;
        const eatDistance = cell.radius + food.r * 0.65;
        if (distSq(cell, food) < eatDistance * eatDistance) {
          food.dead = true;
          consumed = true;
          const gain = food.value * (cell.player ? 2.25 : 1.65);
          cell.addMass(gain);
          if (cell.player) {
            this.game.stats.score += food.type === "goldFood" ? 50 : Math.round(gain * 7);
            this.game.audio.blip(food.type === "goldFood" ? "gold" : "pellet");
            this.game.particles.burst(food.x, food.y, food.color, food.type === "goldFood" ? 9 : 3, 68);
            if (food.type === "goldFood") this.game.toast("BONUS +50");
            else if (food.protein && Math.random() < 0.2) this.game.toast("PROTEIN BOOST");
          }
        }
      }
    }
    if (consumed) {
      this.food = this.food.filter((f) => !f.dead);
      this.foodHash.rebuild(this.food);
    }
  }

  handlePowerups(dt) {
    for (const p of this.powerups) {
      if (p.crownGold) {
        p.life -= dt;
        if (p.life <= 0) {
          p.dead = true;
          continue;
        }
      }
      p.pulse += dt * 4;
      for (const cell of this.cells) {
        const d = cell.radius + p.r;
        if (distSq(cell, p) < d * d) {
          p.dead = true;
          if (p.type === "speed") cell.boostTime = Math.max(cell.boostTime, 3.2);
          if (p.type === "magnet") cell.magnetTime = CONFIG.magnetDuration;
          if (p.type === "shield") cell.shieldTime = Math.max(cell.shieldTime, 2.8);
          if (p.type === "gold") cell.addMass(p.crownGold ? (cell.player ? 55 : 85) : (cell.player ? 24 : 16));
          if (cell.player) {
            if (p.type === "speed") cell.rushCooldown = 0;
            this.game.audio.blip(p.type === "gold" || p.type === "magnet" ? p.type : "power");
            const pickupLabel = { speed: "SPEED · RUSH RECHARGED", shield: "SHIELD", gold: "BONUS +120", magnet: "FOOD MAGNET" };
            this.game.toast(pickupLabel[p.type]);
            this.game.stats.score += p.type === "gold" ? 120 : 35;
            this.game.particles.burst(p.x, p.y, p.color, 18, 160);
          }
          break;
        }
      }
    }
    this.powerups = this.powerups.filter((p) => !p.dead);
  }

  handleHazards() {
    for (const h of this.hazards) {
      for (const cell of this.cells) {
        if (cell.radius < h.r * 0.86 || cell.shieldTime > 0) continue;
        const d = h.r + cell.radius * 0.72;
        if (distSq(cell, h) < d * d) {
          const angle = Math.atan2(cell.y - h.y, cell.x - h.x);
          cell.mass *= cell.player ? 0.86 : 0.82;
          cell.vx += Math.cos(angle) * 420;
          cell.vy += Math.sin(angle) * 420;
          cell.stunTime = 0.38;
          if (cell.player) {
            this.game.toast("MASS LOST");
            this.game.camera.bump(0.8);
            this.game.particles.burst(cell.x, cell.y, "#b9f8d3", 24, 220);
          }
        }
      }
    }
  }

  handleCellConsumption() {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = i + 1; j < this.cells.length; j++) {
        const a = this.cells[i];
        const b = this.cells[j];
        if (!a.alive || !b.alive) continue;
        let big = a;
        let small = b;
        if (b.radius > a.radius) {
          big = b;
          small = a;
        }
        if (big.radius < small.radius * CONFIG.consumeRatio) continue;
        if (small.shieldTime > 0 && big.radius < small.radius * 1.55) continue;
        const d = Math.sqrt(distSq(big, small));
        const needed = big.radius - small.radius * CONFIG.consumeOverlap;
        if (d < needed) this.consume(big, small);
      }
    }
  }

  consume(big, small) {
    small.alive = false;
    big.addMass(small.mass * 0.72);
    this.game.particles.burst(small.x, small.y, small.color, small.player ? 36 : 24, small.player ? 260 : 190);
    if (big.player) {
      this.game.stats.cellsEaten++;
      this.game.stats.streak++;
      const points = Math.round(small.mass * 9);
      const multiplier = this.game.mode === "score" ? Math.min(4, this.game.stats.streak) : 1;
      this.game.stats.bestCombo = Math.max(this.game.stats.bestCombo || 1, multiplier);
      this.game.stats.score += points * multiplier;
      this.game.stats.lastEatAt = this.game.elapsed;
      this.game.camera.bump(small.mass > 300 ? 0.9 : 0.45);
      this.game.audio.blip("eat");
      this.game.toast(multiplier > 1 ? `${multiplier}× COMBO · +${format(points * multiplier)}` :
        small.mass > 300 ? `DEVOUR +${points}` : `${this.game.stats.streak} EATS`);
    } else if (small.player) {
      this.game.killPlayer(big);
    }

    if (!small.player) {
      this.bots = this.bots.filter((b) => b !== small);
      this.respawnQueue += 1;
    }
  }

  replenish(dt) {
    while (this.food.length < CONFIG.foodTarget) this.food.push(this.createFood());
    this.foodHash.rebuild(this.food);
    this.specialTimer -= dt;
    if (this.specialTimer <= 0 && this.powerups.length < 5) {
      this.powerups.push(this.createPowerup(pick(["gold", "gold", "speed", "shield", "magnet"])));
      this.specialTimer = rand(5, 10);
    }
    if (this.respawnQueue > 0 && Math.random() < dt * 1.2) {
      this.spawnBot(false);
      this.respawnQueue -= 1;
    }
    while (this.bots.length < CONFIG.botTarget && Math.random() < dt * 0.45) this.spawnBot(false);
  }
}

class UIManager {
  constructor(game) {
    this.game = game;
    this.scoreText = document.getElementById("scoreText");
    this.massText = document.getElementById("massText");
    this.rankText = document.getElementById("rankText");
    this.leaderboardList = document.getElementById("leaderboardList");
    this.outside = document.getElementById("playerRankOutside");
    this.finalScore = document.getElementById("finalScore");
    this.statsGrid = document.getElementById("statsGrid");
  }

  update() {
    const player = this.game.world.player;
    const ranked = [...this.game.world.cells]
      .filter((c) => c.alive)
      .sort((a, b) => b.mass - a.mass);
    const playerRank = ranked.indexOf(player) + 1;
    if (playerRank) this.game.stats.bestRank = Math.min(this.game.stats.bestRank, playerRank);
    this.scoreText.textContent = format(this.game.stats.score);
    this.massText.textContent = format(player.mass);
    this.rankText.textContent = `#${playerRank}`;
    this.leaderboardList.innerHTML = "";
    for (const cell of ranked.slice(0, 5)) {
      const li = document.createElement("li");
      const row = document.createElement("div");
      row.className = "row";
      const name = document.createElement("span");
      name.textContent = cell.name;
      const mass = document.createElement("strong");
      mass.textContent = format(cell.mass);
      row.append(name, mass);
      li.appendChild(row);
      this.leaderboardList.appendChild(li);
    }
    this.outside.textContent = playerRank > 5 ? `${player.name} - #${playerRank}` : "";
    return playerRank;
  }

  showGameOver(records, isRecord) {
    const s = this.game.stats;
    this.finalScore.textContent = format(s.score);
    const fields = [
      ["Max Mass", format(s.maxMass)],
      ["Cells Eaten", format(s.cellsEaten)],
      ["Best Rank", `#${s.bestRank}`],
      ["Survived", this.formatTime(s.survival)],
      ["Best Score", format((this.game.mode === "score" ? records.scoreAttackBest : records.bestScore) || s.score)],
      this.game.mode === "score" ? ["Best Combo", `${s.bestCombo || 1}×`] : ["Crown Wins", format(records.crownWins || 0)],
    ];
    this.statsGrid.innerHTML = fields.map(([label, value]) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`).join("");
    if (isRecord) this.game.toast("NEW RECORD");
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
}

class Renderer {
  constructor(game) {
    this.game = game;
  }

  draw(ctx) {
    const { canvas, camera, world } = this.game;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    const shakeX = rand(-camera.shake, camera.shake) * 7;
    const shakeY = rand(-camera.shake, camera.shake) * 7;
    ctx.translate(canvas.width / 2 + shakeX, canvas.height / 2 + shakeY);
    ctx.scale(camera.zoom * this.game.dpr, camera.zoom * this.game.dpr);
    ctx.translate(-camera.x, -camera.y);
    this.drawArena(ctx, world);
    const halfWidth = canvas.width / (2 * camera.zoom * this.game.dpr);
    const halfHeight = canvas.height / (2 * camera.zoom * this.game.dpr);
    this.drawFood(ctx, world.food, camera, halfWidth, halfHeight);
    this.drawPowerups(ctx, world.powerups);
    this.drawHazards(ctx, world.hazards);
    this.game.particles.render(ctx);
    const cells = [...world.cells].sort((a, b) => a.radius - b.radius);
    for (const cell of cells) this.drawCell(ctx, cell);
    this.drawDanger(ctx);
    ctx.restore();
  }

  drawArena(ctx, world) {
    ctx.fillStyle = "#070a12";
    ctx.fillRect(0, 0, world.size, world.size);
    const grid = 90;
    ctx.strokeStyle = "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1;
    const left = Math.max(0, this.game.camera.x - this.game.canvas.width / this.game.camera.zoom);
    const right = Math.min(world.size, this.game.camera.x + this.game.canvas.width / this.game.camera.zoom);
    const top = Math.max(0, this.game.camera.y - this.game.canvas.height / this.game.camera.zoom);
    const bottom = Math.min(world.size, this.game.camera.y + this.game.canvas.height / this.game.camera.zoom);
    ctx.beginPath();
    for (let x = Math.floor(left / grid) * grid; x < right; x += grid) {
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
    }
    for (let y = Math.floor(top / grid) * grid; y < bottom; y += grid) {
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(99,234,215,0.42)";
    ctx.lineWidth = 18;
    ctx.strokeRect(8, 8, world.size - 16, world.size - 16);
  }

  drawFood(ctx, food, camera, halfWidth, halfHeight) {
    for (const f of food) {
      if (Math.abs(f.x - camera.x) > halfWidth + 36 || Math.abs(f.y - camera.y) > halfHeight + 36) continue;
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.fillStyle = f.color;
      ctx.globalAlpha = f.type === "goldFood" ? 0.96 : 0.84;
      if (f.kind === "egg") {
        ctx.scale(0.78, 1.1);
        ctx.beginPath();
        ctx.ellipse(0, 0, f.r, f.r * 1.15, 0, 0, TAU);
        ctx.fill();
        ctx.fillStyle = "#f6c453";
        ctx.beginPath();
        ctx.arc(0, 1, f.r * 0.42, 0, TAU);
        ctx.fill();
      } else if (f.kind === "fish") {
        ctx.beginPath();
        ctx.ellipse(0, 0, f.r, f.r * 0.58, 0, 0, TAU);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-f.r * 0.7, 0);
        ctx.lineTo(-f.r * 1.45, -f.r * 0.72);
        ctx.lineTo(-f.r * 1.45, f.r * 0.72);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#071019";
        ctx.beginPath();
        ctx.arc(f.r * 0.48, -f.r * 0.12, Math.max(1, f.r * 0.12), 0, TAU);
        ctx.fill();
      } else if (f.kind === "bean") {
        ctx.beginPath();
        ctx.ellipse(0, 0, f.r * 1.08, f.r * 0.7, -0.55, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = "rgba(7, 16, 25, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(f.r * 0.12, -f.r * 0.1, f.r * 0.55, 0.4, 2.45);
        ctx.stroke();
      } else if (f.kind === "berry") {
        ctx.beginPath();
        ctx.arc(-f.r * 0.35, 0, f.r * 0.7, 0, TAU);
        ctx.arc(f.r * 0.35, 0, f.r * 0.7, 0, TAU);
        ctx.arc(0, f.r * 0.35, f.r * 0.7, 0, TAU);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, f.r, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  drawPowerups(ctx, powerups) {
    for (const p of powerups) {
      const pulse = Math.sin(p.pulse) * 2;
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + 8 + pulse, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.fill();
      if (p.type === "magnet") {
        ctx.strokeStyle = "#101720";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(p.x - 5, p.y - 5);
        ctx.lineTo(p.x - 5, p.y + 1);
        ctx.arc(p.x, p.y + 1, 5, Math.PI, 0, true);
        ctx.lineTo(p.x + 5, p.y - 5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  drawHazards(ctx, hazards) {
    for (const h of hazards) {
      h.phase += 0.012 * h.spin;
      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate(h.phase);
      ctx.fillStyle = "#173326";
      ctx.strokeStyle = "#b9f8d3";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 18; i++) {
        const r = i % 2 ? h.r * 0.78 : h.r * 1.2;
        const a = (i / 18) * TAU;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  drawCell(ctx, cell) {
    const wobble = Math.sin(cell.wobble) * clamp(cell.radius * 0.018, 0.4, 2.2);
    const r = cell.radius + wobble;
    if (cell.magnetTime > 0) {
      ctx.strokeStyle = "rgba(130, 220, 202, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 8]);
      ctx.beginPath();
      ctx.arc(cell.x, cell.y, cell.radius + CONFIG.magnetReach, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    const grad = ctx.createRadialGradient(cell.x - r * 0.34, cell.y - r * 0.38, r * 0.1, cell.x, cell.y, r);
    if (cell.rushTime > 0 && !this.game.reducedMotion) {
      ctx.fillStyle = cell.color;
      for (const [lag, opacity] of [[0.16, 0.12], [0.09, 0.24]]) {
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(cell.x - cell.vx * lag, cell.y - cell.vy * lag, r, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    grad.addColorStop(0, cell.color);
    grad.addColorStop(1, this.darken(cell.color, 0.58));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cell.x, cell.y, r, 0, TAU);
    ctx.fill();
    ctx.lineWidth = cell.player ? 5 : 2.5;
    ctx.strokeStyle = cell.player ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.34)";
    ctx.stroke();
    if (cell.shieldTime > 0) {
      ctx.strokeStyle = "rgba(180,160,255,0.92)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cell.x, cell.y, r + 9, 0, TAU);
      ctx.stroke();
    }
    if (cell.boostTime > 0 || cell.rushTime > 0) {
      ctx.strokeStyle = "rgba(96,165,250,0.7)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cell.x, cell.y, r + 15, -cell.wobble, -cell.wobble + Math.PI * 1.25);
      ctx.stroke();
    }
    if (r > 22) this.drawCellText(ctx, cell, r);
  }

  drawCellText(ctx, cell, r) {
    ctx.fillStyle = "rgba(4, 10, 18, 0.7)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `800 ${clamp(r * 0.23, 12, 24)}px Inter, sans-serif`;
    ctx.fillText(cell.name, cell.x, cell.y - (r > 42 ? 7 : 0));
    if (cell.player && r > 42) {
      ctx.font = `700 ${clamp(r * 0.16, 11, 18)}px Inter, sans-serif`;
      ctx.fillStyle = "rgba(4, 10, 18, 0.58)";
      ctx.fillText(Math.round(cell.mass).toString(), cell.x, cell.y + 15);
    }
  }

  drawDanger(ctx) {
    const player = this.game.world.player;
    const threats = this.game.world.bots.filter((b) => b.radius > player.radius * 1.28 && distSq(b, player) < 620 * 620);
    if (!threats.length) return;
    const t = threats.sort((a, b) => distSq(a, player) - distSq(b, player))[0];
    const angle = Math.atan2(t.y - player.y, t.x - player.x);
    const x = player.x + Math.cos(angle) * (player.radius + 56);
    const y = player.y + Math.sin(angle) * (player.radius + 56);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "rgba(255,107,138,0.86)";
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-12, -9);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-12, 9);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  darken(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const r = ((n >> 16) & 255) * amount;
    const g = ((n >> 8) & 255) * amount;
    const b = (n & 255) * amount;
    return `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.mini = document.getElementById("miniCanvas");
    this.miniCtx = this.mini.getContext("2d");
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.input = new InputManager(this.canvas, document.getElementById("joystick"), document.getElementById("joystickThumb"));
    this.camera = new Camera();
    this.audio = new AudioManager();
    this.storage = new StorageManager();
    this.particles = new ParticleSystem(this.reducedMotion);
    this.world = new World(this);
    this.renderer = new Renderer(this);
    this.ui = new UIManager(this);
    this.running = false;
    this.dead = false;
    this.elapsed = 0;
    this.last = performance.now();
    this.stats = {};
    this.bindUI();
    this.resize();
    addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => this.onVisibility());
    requestAnimationFrame((t) => this.loop(t));
  }

  bindUI() {
    this.startScreen = document.getElementById("startScreen");
    this.gameOverScreen = document.getElementById("gameOverScreen");
    this.pauseScreen = document.getElementById("pauseScreen");
    this.playerName = document.getElementById("playerName");
    this.modeSelect = document.getElementById("gameMode");
    const modeHint = document.getElementById("modeHint");
    this.modeSelect.addEventListener("change", () => {
      modeHint.textContent = this.modeSelect.value === "score"
        ? "Chain rival takedowns for up to 4× points before time runs out."
        : "Reach #1 and defend it for 30 seconds.";
    });
    this.objectiveText = document.getElementById("objectiveText");
    this.gameOverTitle = document.getElementById("gameOverTitle");
    this.rushButton = document.getElementById("rushButton");
    this.overdriveButton = document.getElementById("overdriveButton");
    this.rushStatus = document.getElementById("rushStatus");
    this.magnetStatus = document.getElementById("magnetStatus");
    this.magnetTimer = document.getElementById("magnetTimer");
    this.rushButton.addEventListener("click", () => this.activateRush());
    this.overdriveButton.addEventListener("click", () => this.activateRush(true));
    addEventListener("keydown", (event) => {
      if (!["Space", "KeyE"].includes(event.code) || !this.running ||
          event.target.closest?.("input, select") ||
          (event.code === "Space" && event.target.closest?.("button, a, summary"))) return;
      event.preventDefault();
      if (!event.repeat) this.activateRush(event.code === "KeyE");
    });
    document.getElementById("playButton").addEventListener("click", () => this.start());
    document.getElementById("againButton").addEventListener("click", () => this.start());
    document.getElementById("menuButton").addEventListener("click", () => {
      this.gameOverScreen.classList.remove("active");
      this.startScreen.classList.add("active");
      this.modeSelect.focus();
    });
    this.playerName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.start();
    });
    const soundButton = document.getElementById("soundButton");
    soundButton.setAttribute("aria-pressed", String(this.audio.enabled));
    soundButton.addEventListener("click", () => {
      this.audio.setEnabled(!this.audio.enabled);
      soundButton.setAttribute("aria-pressed", String(this.audio.enabled));
      this.audio.unlock();
      if (this.audio.enabled) this.audio.blip("power");
    });
    const musicButton = document.getElementById("musicButton");
    musicButton.setAttribute("aria-pressed", String(this.audio.musicEnabled));
    musicButton.addEventListener("click", () => {
      this.audio.setMusicEnabled(!this.audio.musicEnabled);
      musicButton.setAttribute("aria-pressed", String(this.audio.musicEnabled));
      this.audio.unlock();
    });
  }

  resize() {
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(innerWidth * this.dpr);
    this.canvas.height = Math.floor(innerHeight * this.dpr);
    this.mini.width = 132 * this.dpr;
    this.mini.height = 132 * this.dpr;
  }

  start() {
    this.audio.unlock();
    this.audio.musicStep = 0;
    const name = (this.playerName.value || "YOU").trim().slice(0, 10).toUpperCase() || "YOU";
    this.stats = {
      score: 0,
      maxMass: CONFIG.initialMass,
      cellsEaten: 0,
      bestRank: 99,
      survival: 0,
      streak: 0,
      lastEatAt: 0,
    };
    this.elapsed = 0;
    this.mode = this.modeSelect.value;
    this.crownHeld = 0;
    this.crownDropTimer = 0;
    this.rivalSpawned = false;
    this.dead = false;
    this.running = true;
    document.getElementById("gameShell").classList.add("playing");
    this.world.reset(name);
    this.updateRushControl();
    this.updateObjective(0, 0);
    this.camera.x = this.world.player.x;
    this.camera.y = this.world.player.y;
    this.camera.zoom = 1.14;
    this.startScreen.classList.remove("active");
    this.gameOverScreen.classList.remove("active");
    this.pauseScreen.classList.remove("active");
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  activateRush(overdrive = false) {
    if (!this.running || this.dead) return;
    const player = this.world.player;
    if (player.rushCooldown > 0 || player.rushTime > 0) return;
    if (overdrive && player.mass < CONFIG.overdriveMass) return;
    if (overdrive) player.addMass(-player.mass * CONFIG.overdriveCost);
    player.overdrive = overdrive;
    player.rushTime = CONFIG.rushDuration + (overdrive ? 0.65 : 0);
    player.rushCooldown = CONFIG.rushCooldown;
    this.audio.blip(overdrive ? "overdrive" : "rush");
    this.updateRushControl();
  }

  updateRushControl() {
    const player = this.world.player;
    const magnetSeconds = Math.ceil(player.magnetTime);
    this.magnetStatus.hidden = magnetSeconds === 0;
    if (magnetSeconds > 0 && this.magnetTimer.textContent !== `${magnetSeconds}s`) {
      this.magnetTimer.textContent = `${magnetSeconds}s`;
    }
    const ready = player.rushCooldown === 0 && player.rushTime === 0;
    const overdriveLocked = player.mass < CONFIG.overdriveMass;
    if (this.overdriveButton.hidden !== overdriveLocked) this.overdriveButton.hidden = overdriveLocked;
    if (this.overdriveButton.getAttribute("aria-disabled") !== String(!ready)) {
      this.overdriveButton.setAttribute("aria-disabled", String(!ready));
    }
    const status = player.rushTime > 0 ? "Active" : ready ? "Ready" : `${Math.ceil(player.rushCooldown)}s`;
    if (this.rushStatus.textContent !== status) this.rushStatus.textContent = status;
    if (this.rushButton.getAttribute("aria-disabled") !== String(!ready)) {
      this.rushButton.setAttribute("aria-disabled", String(!ready));
    }
    this.rushButton.style.setProperty("--charge", 1 - player.rushCooldown / CONFIG.rushCooldown);
  }

  onVisibility() {
    if (document.hidden && this.running && !this.dead) {
      this.running = false;
      this.audio.stopMusic();
      this.pauseScreen.classList.add("active");
    } else if (!document.hidden && !this.dead && !this.startScreen.classList.contains("active")) {
      this.running = true;
      this.pauseScreen.classList.remove("active");
      this.last = performance.now();
    }
  }

  loop(now) {
    const dt = Math.min(CONFIG.maxDt, (now - this.last) / 1000 || 0);
    this.last = now;
    if (this.running && !this.dead) this.update(dt);
    this.renderer.draw(this.ctx);
    this.drawMini();
    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    this.audio.updateMusic();
    this.elapsed += dt;
    this.stats.survival = this.elapsed;
    if (this.elapsed - this.stats.lastEatAt > 3) this.stats.streak = 0;
    this.world.update(dt);
    this.stats.maxMass = Math.max(this.stats.maxMass, this.world.player.mass);
    this.camera.update(this.world.player, dt, this.reducedMotion);
    this.particles.update(dt);
    const rank = this.ui.update();
    this.updateRushControl();
    if (!this.dead) this.updateObjective(dt, rank);
  }

  updateObjective(dt, rank) {
    if (this.mode === "score") {
      const left = Math.max(0, Math.ceil(CONFIG.scoreAttackDuration - this.elapsed));
      this.setObjective(`Score Attack · ${left}s`);
      if (left === 0) this.finishRun("Time’s up");
      return;
    }

    const mass = this.world.player.mass;
    if (!this.rivalSpawned && (mass >= CONFIG.rivalMass || rank === 1)) {
      this.world.spawnRival(Math.max(240, mass * 0.9));
      this.rivalSpawned = true;
      this.toast("APEX HAS ENTERED THE ARENA");
      this.audio.blip("rival");
    }
    if (rank !== 1) {
      this.crownHeld = 0;
      this.crownDropTimer = 0;
      this.setObjective("Crown Hold · Reach #1");
      return;
    }
    this.crownHeld += dt;
    this.crownDropTimer -= dt;
    if (this.crownDropTimer <= 0) {
      this.world.spawnCrownGold();
      this.crownDropTimer = 4;
    }
    const left = Math.max(0, Math.ceil(CONFIG.crownDuration - this.crownHeld));
    this.setObjective(`Crown Hold · ${left}s`);
    if (left === 0) this.finishRun("Crown secured", true);
  }

  setObjective(text) {
    if (this.objectiveText.textContent !== text) this.objectiveText.textContent = text;
  }

  screenToWorld(clientX, clientY) {
    const x = (clientX * this.dpr - this.canvas.width / 2) / (this.camera.zoom * this.dpr) + this.camera.x;
    const y = (clientY * this.dpr - this.canvas.height / 2) / (this.camera.zoom * this.dpr) + this.camera.y;
    return { x, y };
  }

  killPlayer(killer) {
    this.audio.blip("death");
    this.camera.bump(1.2);
    this.toast(`EATEN BY ${killer.name}`);
    this.finishRun("Run complete", false, 520);
  }

  finishRun(title, won = false, delay = 0) {
    if (this.dead) return;
    this.dead = true;
    this.running = false;
    this.audio.stopMusic();
    document.getElementById("gameShell").classList.remove("playing");
    setTimeout(() => {
      const isRecord = this.storage.save(this.stats, this.mode, won);
      if (isRecord || won) this.audio.blip("record");
      this.gameOverTitle.textContent = title;
      this.ui.showGameOver(this.storage.records, isRecord);
      this.gameOverScreen.classList.add("active");
      document.getElementById("againButton").focus();
    }, delay);
  }

  toast(text) {
    const layer = document.getElementById("toastLayer");
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = text;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  drawMini() {
    if (!this.world.player) {
      this.miniCtx.clearRect(0, 0, this.mini.width, this.mini.height);
      return;
    }
    const ctx = this.miniCtx;
    const w = this.mini.width;
    const h = this.mini.height;
    const scale = w / this.world.size;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(7,10,18,0.72)";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.strokeRect(1, 1, w - 2, h - 2);
    ctx.globalAlpha = 0.38;
    ctx.fillStyle = "#9fb1c7";
    for (let i = 0; i < this.world.food.length; i += 18) {
      const f = this.world.food[i];
      ctx.fillRect(f.x * scale, f.y * scale, 1.2 * this.dpr, 1.2 * this.dpr);
    }
    ctx.globalAlpha = 0.75;
    for (const b of this.world.bots) {
      if (b.rival) {
        const x = b.x * scale;
        const y = b.y * scale;
        const size = 6 * this.dpr;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.fill();
      } else {
        ctx.fillStyle = b.radius > this.world.player.radius * 1.15 ? "#ff6b8a" : "#edf7ff";
        ctx.beginPath();
        ctx.arc(b.x * scale, b.y * scale, clamp(b.radius * scale, 1.5, 4.5) * this.dpr, 0, TAU);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#63ead7";
    ctx.beginPath();
    ctx.arc(this.world.player.x * scale, this.world.player.y * scale, 4.4 * this.dpr, 0, TAU);
    ctx.fill();
  }
}

new Game();
