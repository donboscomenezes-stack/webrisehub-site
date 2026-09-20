"use strict";

const CONFIG = {
  worldWidth: 1000,
  worldHeight: 1600,
  roadWidth: 690,
  lanes: 4,
  playerY: 1240,
  minPlayerY: 1020,
  maxPlayerY: 1375,
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (min, max) => min + Math.random() * (max - min);
const choice = (items) => items[(Math.random() * items.length) | 0];

class StorageManager {
  constructor() {
    this.key = "getaway.stats.v1";
    this.stats = this.load();
  }

  load() {
    try {
      return {
        bestScore: 0,
        longestSurvival: 0,
        highestWanted: 1,
        bestNearMissStreak: 0,
        mostTakedowns: 0,
        ...JSON.parse(localStorage.getItem(this.key) || "{}")
      };
    } catch {
      return { bestScore: 0, longestSurvival: 0, highestWanted: 1, bestNearMissStreak: 0, mostTakedowns: 0 };
    }
  }

  saveRun(run) {
    const previousBest = this.stats.bestScore || 0;
    this.stats.bestScore = Math.max(this.stats.bestScore, run.score);
    this.stats.longestSurvival = Math.max(this.stats.longestSurvival, run.time);
    this.stats.highestWanted = Math.max(this.stats.highestWanted, run.wanted);
    this.stats.bestNearMissStreak = Math.max(this.stats.bestNearMissStreak, run.bestStreak);
    this.stats.mostTakedowns = Math.max(this.stats.mostTakedowns, run.takedowns);
    localStorage.setItem(this.key, JSON.stringify(this.stats));
    return run.score > previousBest;
  }
}

class AudioManager {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.master = null;
    this.engine = null;
    this.engineGain = null;
    this.sirenOsc = null;
    this.sirenGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      this.enabled = false;
      return;
    }
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.22;
    this.master.connect(this.ctx.destination);

    this.engine = this.ctx.createOscillator();
    this.engineGain = this.ctx.createGain();
    this.engine.type = "sawtooth";
    this.engine.frequency.value = 55;
    this.engineGain.gain.value = 0;
    this.engine.connect(this.engineGain);
    this.engineGain.connect(this.master);
    this.engine.start();

    this.sirenOsc = this.ctx.createOscillator();
    this.sirenGain = this.ctx.createGain();
    this.sirenOsc.type = "triangle";
    this.sirenOsc.frequency.value = 420;
    this.sirenGain.gain.value = 0;
    this.sirenOsc.connect(this.sirenGain);
    this.sirenGain.connect(this.master);
    this.sirenOsc.start();
  }

  setEnabled(value) {
    this.enabled = value;
    if (this.master) this.master.gain.value = value ? 0.22 : 0;
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  }

  update(game) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const targetEngine = game.state === "PLAYING" || game.state === "ESCAPE" ? 0.085 : 0;
    this.engineGain.gain.setTargetAtTime(targetEngine, now, 0.08);
    this.engine.frequency.setTargetAtTime(54 + game.speed * 0.03 + (game.nitroActive ? 36 : 0), now, 0.05);

    const siren = game.police.some((p) => p.active) && (game.state === "PLAYING" || game.state === "ESCAPE") ? 0.025 : 0;
    this.sirenGain.gain.setTargetAtTime(siren, now, 0.12);
    this.sirenOsc.frequency.setTargetAtTime(440 + Math.sin(game.time * 6) * 130, now, 0.04);
  }

  blip(type) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const map = {
      near: [760, 0.052, "sine"],
      nitro: [130, 0.18, "sawtooth"],
      hit: [95, 0.18, "square"],
      takedown: [220, 0.22, "triangle"],
      warning: [520, 0.16, "square"],
      star: [980, 0.13, "sine"],
      over: [70, 0.45, "sawtooth"]
    };
    const [freq, dur, wave] = map[type] || map.near;
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(35, freq * 0.48), now + dur);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(type === "hit" ? 0.2 : 0.11, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + dur + 0.03);
  }
}

class InputManager {
  constructor(canvas) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.nitro = false;
    this.startPressed = false;
    this.pausePressed = false;
    this.pointerState = new Map();
    this.canvas = canvas;
    this.bind();
  }

  bind() {
    window.addEventListener("keydown", (event) => {
      if (event.repeat && event.code !== "Space") return;
      if (["ArrowLeft", "KeyA"].includes(event.code)) this.left = true;
      if (["ArrowRight", "KeyD"].includes(event.code)) this.right = true;
      if (["ArrowUp", "KeyW"].includes(event.code)) this.up = true;
      if (["ArrowDown", "KeyS"].includes(event.code)) this.down = true;
      if (event.code === "Space") {
        this.nitro = true;
        this.startPressed = true;
      }
      if (event.code === "Escape" || event.code === "KeyP") this.pausePressed = true;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(event.code)) event.preventDefault();
    });

    window.addEventListener("keyup", (event) => {
      if (["ArrowLeft", "KeyA"].includes(event.code)) this.left = false;
      if (["ArrowRight", "KeyD"].includes(event.code)) this.right = false;
      if (["ArrowUp", "KeyW"].includes(event.code)) this.up = false;
      if (["ArrowDown", "KeyS"].includes(event.code)) this.down = false;
      if (event.code === "Space") this.nitro = false;
    });

    const updateTouch = (event) => {
      this.pointerState.clear();
      for (const touch of event.touches) {
        const x = touch.clientX / window.innerWidth;
        const y = touch.clientY / window.innerHeight;
        if (y > 0.72 && x > 0.63) continue;
        this.pointerState.set(touch.identifier, x < 0.5 ? "left" : "right");
      }
      this.left = [...this.pointerState.values()].includes("left");
      this.right = [...this.pointerState.values()].includes("right");
    };

    window.addEventListener("touchstart", (event) => {
      this.startPressed = true;
      updateTouch(event);
    }, { passive: false });
    window.addEventListener("touchmove", updateTouch, { passive: false });
    window.addEventListener("touchend", updateTouch, { passive: false });
    window.addEventListener("touchcancel", updateTouch, { passive: false });
  }

  consumeStart() {
    const value = this.startPressed;
    this.startPressed = false;
    return value;
  }

  consumePause() {
    const value = this.pausePressed;
    this.pausePressed = false;
    return value;
  }
}

class ParticleSystem {
  constructor() {
    this.items = [];
  }

  emit(x, y, count, color, speed = 220, life = 0.45) {
    if (CONFIG.reducedMotion) count = Math.ceil(count * 0.35);
    for (let i = 0; i < count && this.items.length < 260; i++) {
      const angle = rand(0, Math.PI * 2);
      const power = rand(speed * 0.2, speed);
      this.items.push({
        x,
        y,
        vx: Math.cos(angle) * power,
        vy: Math.sin(angle) * power + rand(60, 220),
        size: rand(2, 6),
        color,
        life: rand(life * 0.45, life),
        maxLife: life
      });
    }
  }

  update(dt) {
    for (const p of this.items) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 420 * dt;
      p.life -= dt;
    }
    this.items = this.items.filter((p) => p.life > 0);
  }

  render(ctx) {
    for (const p of this.items) {
      ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }
}

class FloatingTextSystem {
  constructor() {
    this.items = [];
  }

  add(x, y, text, color = "#fff", size = 24) {
    this.items.push({ x, y, text, color, size, life: 1.05, maxLife: 1.05 });
  }

  update(dt) {
    for (const item of this.items) {
      item.y -= 66 * dt;
      item.life -= dt;
    }
    this.items = this.items.filter((item) => item.life > 0);
  }

  render(ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const item of this.items) {
      const t = clamp(item.life / item.maxLife, 0, 1);
      ctx.globalAlpha = Math.min(1, t * 1.5);
      ctx.font = `900 ${item.size}px Inter, system-ui, sans-serif`;
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 14;
      ctx.fillStyle = item.color;
      ctx.fillText(item.text, item.x, item.y);
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

class Vehicle {
  constructor(kind = "sedan") {
    this.active = false;
    this.kind = kind;
    this.reset();
  }

  reset() {
    this.id = Math.random().toString(36).slice(2);
    this.active = false;
    this.x = 0;
    this.y = -200;
    this.w = 64;
    this.h = 122;
    this.vx = 0;
    this.vy = 420;
    this.lane = 0;
    this.targetLane = 0;
    this.color = "#303946";
    this.type = "civilian";
    this.policeMode = "";
    this.health = 1;
    this.nearMissed = false;
    this.crashed = false;
    this.markedByPlayer = false;
    this.intentTimer = 0;
    this.warning = 0;
    this.mass = 1;
    this.scoreValue = 500;
    this.flashSeed = Math.random() * 10;
    this.spike = false;
  }

  rect(margin = 0) {
    return {
      left: this.x - this.w / 2 + margin,
      right: this.x + this.w / 2 - margin,
      top: this.y - this.h / 2 + margin,
      bottom: this.y + this.h / 2 - margin
    };
  }

  update(dt, game) {
    if (this.crashed) {
      this.x += this.vx * dt;
      this.y += (game.speed * 0.88 + this.vy) * dt;
      this.vx *= Math.pow(0.55, dt);
      this.vy *= Math.pow(0.62, dt);
      return;
    }

    if (this.type === "civilian") {
      const laneX = game.laneCenter(this.targetLane);
      this.x = lerp(this.x, laneX, 1 - Math.pow(0.08, dt));
      this.y += this.vy * dt;
      this.intentTimer -= dt;
      if (this.intentTimer <= 0 && Math.random() < 0.12) {
        const next = clamp(this.targetLane + choice([-1, 1]), 0, CONFIG.lanes - 1);
        if (game.isLaneChangeSafe(this, next)) this.targetLane = next;
        this.intentTimer = rand(2.5, 5.5);
      }
    } else if (this.type === "police") {
      this.updatePolice(dt, game);
    } else if (this.type === "roadblock") {
      this.y += game.speed * dt;
    }
  }

  updatePolice(dt, game) {
    const p = game.player;
    const steerPower = (this.policeMode === "side" ? 440 : 360) + game.wanted.level * 22;
    const vertical = game.speed * (this.policeMode === "blocker" ? 0.72 : 0.9);
    let targetX = p.x;
    if (this.policeMode === "chaser") {
      targetX = p.x + Math.sin(game.time * 2.1 + this.flashSeed) * 26;
      if (this.y < p.y + 160) this.y += (vertical + 120) * dt;
      else this.y += game.speed * 0.72 * dt;
    } else if (this.policeMode === "side") {
      const side = this.x < p.x ? -1 : 1;
      targetX = p.x + side * 58;
      this.y += (game.speed * 0.98 + Math.sin(game.time * 2 + this.flashSeed) * 42) * dt;
    } else if (this.policeMode === "blocker") {
      targetX = p.x + Math.sin(game.time * 1.5 + this.flashSeed) * 88;
      this.y += vertical * dt;
    } else if (this.policeMode === "pincer") {
      const side = this.x < CONFIG.worldWidth / 2 ? -1 : 1;
      targetX = p.x + side * 70;
      this.y += (game.speed * 0.92) * dt;
    }

    const left = game.roadLeft() + this.w / 2 + 8;
    const right = game.roadRight() - this.w / 2 - 8;
    const dx = clamp(targetX - this.x, -steerPower * dt, steerPower * dt);
    this.x = clamp(this.x + dx, left, right);
  }

  render(ctx, game) {
    if (!this.active) return;
    if (this.type === "roadblock") {
      this.renderRoadblock(ctx);
      return;
    }
    const police = this.type === "police";
    const truck = this.kind === "truck";
    const suv = this.kind === "suv" || this.kind === "police-suv";
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.crashed) ctx.rotate(Math.sin(this.flashSeed + game.time * 4) * 0.2);
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 10;
    roundRect(ctx, -this.w / 2, -this.h / 2, this.w, this.h, suv ? 9 : 13);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = police ? "#e8eef7" : "rgba(210, 230, 245, 0.52)";
    roundRect(ctx, -this.w * 0.34, -this.h * 0.28, this.w * 0.68, this.h * (truck ? 0.18 : 0.25), 5);
    ctx.fill();
    ctx.fillStyle = "rgba(5, 9, 14, 0.45)";
    roundRect(ctx, -this.w * 0.32, this.h * 0.06, this.w * 0.64, this.h * 0.27, 5);
    ctx.fill();

    if (police) {
      const phase = Math.sin((game.time + this.flashSeed) * 16) > 0;
      ctx.fillStyle = phase ? "#ff2f4d" : "#2f7cff";
      roundRect(ctx, -this.w * 0.27, -this.h * 0.08, this.w * 0.2, 12, 3);
      ctx.fill();
      ctx.fillStyle = phase ? "#2f7cff" : "#ff2f4d";
      roundRect(ctx, this.w * 0.07, -this.h * 0.08, this.w * 0.2, 12, 3);
      ctx.fill();
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = phase ? "#ff2f4d" : "#2f7cff";
      ctx.beginPath();
      ctx.ellipse(-this.w * 0.2, 0, this.w * 0.55, this.h * 0.72, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = "#f5f5da";
    ctx.fillRect(-this.w * 0.32, -this.h / 2 - 1, this.w * 0.22, 6);
    ctx.fillRect(this.w * 0.1, -this.h / 2 - 1, this.w * 0.22, 6);
    ctx.fillStyle = police ? "#ff425e" : "#c92338";
    ctx.fillRect(-this.w * 0.32, this.h / 2 - 5, this.w * 0.2, 5);
    ctx.fillRect(this.w * 0.12, this.h / 2 - 5, this.w * 0.2, 5);
    ctx.restore();
  }

  renderRoadblock(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.spike) {
      ctx.fillStyle = "#141a23";
      roundRect(ctx, -this.w / 2, -this.h / 2, this.w, this.h, 5);
      ctx.fill();
      ctx.fillStyle = "#d9e1e8";
      for (let x = -this.w / 2 + 8; x < this.w / 2 - 8; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 8, -this.h / 2 + 8);
        ctx.lineTo(x + 16, 0);
        ctx.fill();
      }
    } else if (this.kind === "barrier") {
      ctx.fillStyle = "#29313d";
      roundRect(ctx, -this.w / 2, -this.h / 2, this.w, this.h, 6);
      ctx.fill();
      for (let i = -2; i <= 2; i++) {
        ctx.fillStyle = i % 2 ? "#ffb347" : "#f8fafc";
        ctx.fillRect(i * 34 - 12, -this.h / 2, 24, this.h);
      }
    } else {
      this.type = "police";
      this.color = "#111a27";
      this.render(ctx, { time: performance.now() / 1000 });
      this.type = "roadblock";
    }
    ctx.restore();
  }
}

class PlayerCar {
  constructor(game) {
    this.game = game;
    this.x = CONFIG.worldWidth / 2;
    this.y = CONFIG.playerY;
    this.w = 66;
    this.h = 124;
    this.vx = 0;
    this.vy = 0;
    this.health = 100;
    this.invuln = 0;
    this.damageFlash = 0;
    this.spin = 0;
  }

  reset() {
    this.x = CONFIG.worldWidth / 2;
    this.y = CONFIG.playerY;
    this.vx = 0;
    this.vy = 0;
    this.health = 100;
    this.invuln = 0;
    this.damageFlash = 0;
    this.spin = 0;
  }

  rect(margin = 7) {
    return {
      left: this.x - this.w / 2 + margin,
      right: this.x + this.w / 2 - margin,
      top: this.y - this.h / 2 + margin,
      bottom: this.y + this.h / 2 - margin
    };
  }

  update(dt, input, game) {
    const steer = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const vertical = (input.down ? 1 : 0) - (input.up ? 1 : 0);
    const accel = game.nitroActive ? 2200 : 1800;
    const max = game.nitroActive ? 640 : 540;
    const friction = steer === 0 ? 6.6 : 3.4;
    this.vx += steer * accel * dt;
    this.vx *= Math.exp(-friction * dt);
    this.vx = clamp(this.vx, -max, max);

    this.vy += vertical * 850 * dt;
    this.vy *= Math.exp(-5.3 * dt);
    this.vy = clamp(this.vy, -230, 230);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    const left = game.roadLeft() + this.w / 2 + 5;
    const right = game.roadRight() - this.w / 2 - 5;
    if (this.x < left || this.x > right) {
      this.x = clamp(this.x, left, right);
      this.vx *= -0.24;
      game.scrapeBarrier(this.x < CONFIG.worldWidth / 2 ? -1 : 1);
    }

    this.y = clamp(this.y, CONFIG.minPlayerY, CONFIG.maxPlayerY);
    this.invuln = Math.max(0, this.invuln - dt);
    this.damageFlash = Math.max(0, this.damageFlash - dt);
  }

  damage(amount, game, source = "hit") {
    if (this.invuln > 0 && amount > 10) return false;
    this.health = clamp(this.health - amount, 0, 100);
    this.invuln = amount > 10 ? 0.38 : 0.04;
    this.damageFlash = 0.18;
    game.shake(amount * 0.17);
    game.particles.emit(this.x + rand(-20, 20), this.y + rand(-35, 35), amount > 25 ? 20 : 8, source === "spike" ? "#d9e1e8" : "#ffb347", 360, 0.42);
    game.audio.blip("hit");
    if (amount > 12) game.resetMultiplier();
    if (this.health <= 0) game.beginCrash();
    return true;
  }

  render(ctx, game) {
    ctx.save();
    ctx.translate(this.x, this.y);
    const tilt = clamp(this.vx / 1600, -0.18, 0.18);
    ctx.rotate(tilt + this.spin);
    if (this.damageFlash > 0) {
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(0, 0, this.w * 0.9, this.h * 0.76, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.shadowColor = "rgba(0,0,0,0.65)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 12;
    roundRect(ctx, -this.w / 2, -this.h / 2, this.w, this.h, 16);
    ctx.fillStyle = "#d9eef5";
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    const stripe = ctx.createLinearGradient(0, -this.h / 2, 0, this.h / 2);
    stripe.addColorStop(0, "#66e1ff");
    stripe.addColorStop(1, "#ffcf5a");
    ctx.fillStyle = stripe;
    roundRect(ctx, -7, -this.h / 2 + 8, 14, this.h - 16, 5);
    ctx.fill();

    ctx.fillStyle = "rgba(7, 12, 18, 0.74)";
    roundRect(ctx, -this.w * 0.33, -this.h * 0.28, this.w * 0.66, this.h * 0.25, 6);
    ctx.fill();
    roundRect(ctx, -this.w * 0.3, this.h * 0.08, this.w * 0.6, this.h * 0.22, 6);
    ctx.fill();

    ctx.fillStyle = "#fff7c2";
    ctx.fillRect(-this.w * 0.36, -this.h / 2 - 2, this.w * 0.22, 7);
    ctx.fillRect(this.w * 0.14, -this.h / 2 - 2, this.w * 0.22, 7);
    ctx.fillStyle = "#ff3656";
    ctx.fillRect(-this.w * 0.34, this.h / 2 - 5, this.w * 0.24, 5);
    ctx.fillRect(this.w * 0.1, this.h / 2 - 5, this.w * 0.24, 5);

    if (game.nitroActive) {
      ctx.globalAlpha = 0.75;
      const exhaust = ctx.createLinearGradient(0, this.h / 2, 0, this.h / 2 + 110);
      exhaust.addColorStop(0, "#6ee7f9");
      exhaust.addColorStop(1, "rgba(110,231,249,0)");
      ctx.fillStyle = exhaust;
      ctx.beginPath();
      ctx.moveTo(-18, this.h / 2);
      ctx.lineTo(0, this.h / 2 + rand(70, 110));
      ctx.lineTo(18, this.h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (this.health < 45) {
      ctx.globalAlpha = 0.36;
      ctx.fillStyle = "#a8b2be";
      ctx.beginPath();
      ctx.ellipse(rand(-12, 12), this.h / 2 + rand(12, 34), rand(8, 18), rand(8, 24), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }
}

class WantedSystem {
  constructor() {
    this.level = 1;
    this.nextScoreMilestone = 10000;
  }

  reset() {
    this.level = 1;
    this.nextScoreMilestone = 10000;
  }

  update(game) {
    const old = this.level;
    const timeLevel = 1 + Math.floor(game.runTime / 22);
    const scoreLevel = 1 + Math.floor(game.score / 8500);
    this.level = clamp(Math.max(timeLevel, scoreLevel), 1, 5);
    if (this.level > old) {
      game.banner(`${this.level} STARS`, 2);
      game.audio.blip("star");
      game.addScore(600 * this.level, "WANTED BONUS", CONFIG.worldWidth / 2, 430);
    }
  }
}

class SpawnManager {
  constructor(game) {
    this.game = game;
    this.vehiclePool = [];
    this.trafficTimer = 0;
    this.policeTimer = 0;
    this.firstPolice = 5;
    this.roadblockCooldown = 15;
    this.safeSpawnRows = new Set();
  }

  reset() {
    for (const vehicle of this.vehiclePool) vehicle.active = false;
    this.trafficTimer = 0.35;
    this.policeTimer = 4.4;
    this.firstPolice = 4.6;
    this.roadblockCooldown = 13;
  }

  getVehicle(kind) {
    const found = this.vehiclePool.find((vehicle) => !vehicle.active);
    const vehicle = found || new Vehicle(kind);
    if (!found) this.vehiclePool.push(vehicle);
    vehicle.reset();
    vehicle.kind = kind;
    vehicle.active = true;
    return vehicle;
  }

  update(dt) {
    const game = this.game;
    const difficulty = game.difficulty();
    this.trafficTimer -= dt;
    this.policeTimer -= dt;
    this.roadblockCooldown -= dt;

    if (this.trafficTimer <= 0) {
      this.spawnTrafficRow();
      this.trafficTimer = rand(0.62, 1.1) / difficulty.trafficRate;
    }

    if (this.firstPolice > 0) {
      this.firstPolice -= dt;
    } else if (this.policeTimer <= 0 && game.state !== "ESCAPE") {
      this.spawnPolicePattern();
      this.policeTimer = rand(4.1, 7.2) / difficulty.policeRate;
    }

    if (game.wanted.level >= 3 && this.roadblockCooldown <= 0 && !game.majorEventActive()) {
      game.events.startRoadblock();
      this.roadblockCooldown = rand(15, 22) - game.wanted.level * 1.5;
    }
  }

  spawnTrafficRow() {
    const game = this.game;
    const lanes = [...Array(CONFIG.lanes).keys()];
    const count = Math.random() < 0.24 + game.wanted.level * 0.035 ? 2 : 1;
    const openNearPlayer = game.closestLaneTo(game.player.x);
    const blocked = new Set();
    for (let i = 0; i < count; i++) {
      let laneChoices = lanes.filter((lane) => !blocked.has(lane));
      if (game.runTime < 8) laneChoices = laneChoices.filter((lane) => lane !== openNearPlayer);
      const lane = choice(laneChoices.length ? laneChoices : lanes);
      blocked.add(lane);
      this.spawnCivilian(lane, -160 - i * rand(130, 210));
    }
  }

  spawnCivilian(lane, y) {
    const game = this.game;
    if (!game.laneHasSpace(lane, y, 260)) return null;
    const kind = choice(["sedan", "sedan", "suv", "van", "truck"]);
    const vehicle = this.getVehicle(kind);
    vehicle.type = "civilian";
    vehicle.lane = lane;
    vehicle.targetLane = lane;
    vehicle.x = game.laneCenter(lane);
    vehicle.y = y;
    vehicle.w = kind === "truck" ? 82 : kind === "suv" ? 72 : 64;
    vehicle.h = kind === "truck" ? 174 : kind === "van" ? 144 : 124;
    vehicle.vy = game.speed * rand(0.53, 0.8) + rand(-28, 42);
    vehicle.color = choice(["#293241", "#3d4857", "#614f45", "#243c4a", "#4b4f61", "#6b6f77"]);
    vehicle.mass = kind === "truck" ? 2.2 : kind === "suv" ? 1.5 : 1;
    game.traffic.push(vehicle);
    return vehicle;
  }

  spawnPolicePattern() {
    const game = this.game;
    const level = game.wanted.level;
    const roll = Math.random();
    if (level >= 4 && roll < 0.2) {
      this.spawnPolice("pincer", 0, game.player.y + 250);
      this.spawnPolice("pincer", CONFIG.lanes - 1, game.player.y + 260);
      game.banner("PINCER", 1.2);
    } else if (level >= 2 && roll < 0.45) {
      const sideLane = game.player.x < CONFIG.worldWidth / 2 ? CONFIG.lanes - 1 : 0;
      this.spawnPolice("side", sideLane, game.player.y + rand(70, 180));
    } else if (level >= 3 && roll < 0.65) {
      this.spawnPolice("blocker", game.closestLaneTo(game.player.x), -190);
    } else {
      this.spawnPolice("chaser", game.closestLaneTo(game.player.x), game.player.y + rand(240, 380));
    }
  }

  spawnPolice(mode, lane, y) {
    const game = this.game;
    const vehicle = this.getVehicle(mode === "blocker" && game.wanted.level >= 3 ? "police-suv" : "police");
    vehicle.type = "police";
    vehicle.policeMode = mode;
    vehicle.lane = lane;
    vehicle.targetLane = lane;
    vehicle.x = game.laneCenter(lane) + rand(-20, 20);
    vehicle.y = y;
    vehicle.w = vehicle.kind === "police-suv" ? 78 : 68;
    vehicle.h = vehicle.kind === "police-suv" ? 144 : 128;
    vehicle.color = vehicle.kind === "police-suv" ? "#0d1522" : "#101927";
    vehicle.health = vehicle.kind === "police-suv" ? 2 : 1;
    vehicle.mass = vehicle.kind === "police-suv" ? 1.7 : 1.2;
    game.police.push(vehicle);
    return vehicle;
  }

  spawnRoadblock() {
    const game = this.game;
    const safeLane = clamp(game.closestLaneTo(game.player.x) + choice([-1, 0, 1]), 0, CONFIG.lanes - 1);
    const useSpikes = game.wanted.level >= 4 && Math.random() < 0.36;
    for (let lane = 0; lane < CONFIG.lanes; lane++) {
      if (lane === safeLane) continue;
      const item = this.getVehicle(lane % 2 ? "barrier" : "roadblock-police");
      item.type = "roadblock";
      item.kind = lane % 2 ? "barrier" : "roadblock-police";
      item.x = game.laneCenter(lane);
      item.y = -230;
      item.w = 120;
      item.h = 86;
      item.color = "#121a26";
      game.obstacles.push(item);
    }
    if (useSpikes) {
      const spikeLane = clamp(safeLane + choice([-1, 1]), 0, CONFIG.lanes - 1);
      if (spikeLane !== safeLane) {
        const spike = this.getVehicle("spike");
        spike.type = "roadblock";
        spike.kind = "spike";
        spike.spike = true;
        spike.x = game.laneCenter(spikeLane);
        spike.y = -92;
        spike.w = 128;
        spike.h = 44;
        game.obstacles.push(spike);
      }
    }
  }
}

class EventManager {
  constructor(game) {
    this.game = game;
    this.timer = 0;
    this.current = null;
    this.escapeTimer = 0;
    this.eventCooldown = 10;
    this.heliTimer = 0;
    this.heliActive = false;
    this.spotlight = { x: CONFIG.worldWidth / 2, y: 650, heat: 0 };
  }

  reset() {
    this.timer = 0;
    this.current = null;
    this.escapeTimer = 0;
    this.eventCooldown = 9;
    this.heliTimer = 0;
    this.heliActive = false;
    this.spotlight = { x: CONFIG.worldWidth / 2, y: 650, heat: 0 };
  }

  update(dt) {
    const game = this.game;
    this.eventCooldown -= dt;
    if (this.current === "roadblock-warning") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.current = "roadblock";
        game.spawn.spawnRoadblock();
      }
    }

    if (game.state === "PLAYING" && game.runTime > 26 && this.eventCooldown <= 0 && !game.majorEventActive()) {
      const options = ["escape"];
      if (game.wanted.level >= 4) options.push("helicopter");
      if (game.wanted.level >= 2) options.push("heavy");
      const event = choice(options);
      if (event === "escape") this.startEscape();
      if (event === "helicopter") this.startHelicopter();
      if (event === "heavy") this.startHeavyTraffic();
      this.eventCooldown = rand(15, 24);
    }

    if (game.state === "ESCAPE") {
      this.escapeTimer -= dt;
      game.banner(`LOSE THEM - ${Math.ceil(this.escapeTimer)}s`, 0.2);
      if (this.escapeTimer <= 0) this.finishEscape();
    }

    if (this.heliActive) {
      this.heliTimer -= dt;
      this.spotlight.x = lerp(this.spotlight.x, game.player.x, 1 - Math.pow(0.08, dt));
      this.spotlight.y = lerp(this.spotlight.y, game.player.y - 120, 1 - Math.pow(0.12, dt));
      const d = Math.hypot(game.player.x - this.spotlight.x, game.player.y - this.spotlight.y);
      this.spotlight.heat = d < 115 ? this.spotlight.heat + dt : Math.max(0, this.spotlight.heat - dt * 0.75);
      if (this.spotlight.heat > 2.2) {
        game.banner("SPOTLIGHT LOCK", 1);
        game.spawn.policeTimer = Math.min(game.spawn.policeTimer, 0.4);
        game.spawn.roadblockCooldown = Math.min(game.spawn.roadblockCooldown, 2.2);
        this.spotlight.heat = 0.7;
      }
      if (this.heliTimer <= 0 || game.state === "ESCAPE") this.heliActive = false;
    }
  }

  startRoadblock() {
    this.current = "roadblock-warning";
    this.timer = 1.25;
    this.game.banner("ROADBLOCK", 1.35);
    this.game.audio.blip("warning");
  }

  startEscape() {
    this.game.state = "ESCAPE";
    this.current = "escape";
    this.escapeTimer = 8;
    this.game.police.forEach((p) => {
      p.vy += 230;
      p.markedByPlayer = true;
    });
    this.game.banner("ESCAPE WINDOW", 2);
    this.game.audio.blip("warning");
  }

  failEscape() {
    if (this.game.state !== "ESCAPE") return;
    this.game.state = "PLAYING";
    this.current = null;
    this.escapeTimer = 0;
    this.game.banner("THEY FOUND YOU", 1.5);
  }

  finishEscape() {
    this.game.state = "PLAYING";
    this.current = null;
    this.game.addScore(1500 + this.game.wanted.level * 300, "ESCAPED", CONFIG.worldWidth / 2, 520);
    this.game.banner("ESCAPED", 2.1);
    this.game.police.forEach((p) => {
      p.crashed = true;
      p.vy = 420;
    });
    this.game.spawn.policeTimer = 4;
    this.eventCooldown = 7;
  }

  startHelicopter() {
    this.heliActive = true;
    this.heliTimer = rand(12, 18);
    this.game.banner("HELICOPTER INBOUND", 1.8);
    this.game.audio.blip("warning");
  }

  startHeavyTraffic() {
    this.current = "heavy";
    this.timer = 6;
    this.game.banner("HEAVY TRAFFIC", 1.3);
    this.game.spawn.trafficTimer = 0.1;
  }

  majorActive() {
    return this.current === "roadblock-warning" || this.current === "escape";
  }

  render(ctx) {
    if (!this.heliActive) return;
    const s = this.spotlight;
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const grd = ctx.createRadialGradient(s.x, s.y, 12, s.x, s.y, 180);
    grd.addColorStop(0, "rgba(255, 255, 210, 0.2)");
    grd.addColorStop(0.42, "rgba(255, 255, 210, 0.11)");
    grd.addColorStop(1, "rgba(255, 255, 210, 0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.ellipse(s.x, s.y, 165, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(s.x + 150, s.y - 330);
    ctx.fillStyle = "rgba(7, 10, 16, 0.8)";
    roundRect(ctx, -72, -20, 144, 40, 20);
    ctx.fill();
    ctx.fillRect(-12, -46, 24, 92);
    ctx.fillRect(-118, -3, 236, 6);
    ctx.restore();
  }
}

class Renderer {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.pixelRatio = 1;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(window.innerWidth * this.pixelRatio);
    this.canvas.height = Math.floor(window.innerHeight * this.pixelRatio);
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.scale = Math.min(this.canvas.width / CONFIG.worldWidth, this.canvas.height / CONFIG.worldHeight);
    this.offsetX = (this.canvas.width - CONFIG.worldWidth * this.scale) / 2;
    this.offsetY = (this.canvas.height - CONFIG.worldHeight * this.scale) / 2;
  }

  render() {
    const ctx = this.ctx;
    const game = this.game;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#06090d";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const shake = CONFIG.reducedMotion ? 0 : game.shakeAmount;
    const zoom = 1 + (game.nitroActive && !CONFIG.reducedMotion ? -0.025 : 0) + (game.zoomKick || 0);
    ctx.translate(this.offsetX + rand(-shake, shake) * this.pixelRatio, this.offsetY + rand(-shake, shake) * this.pixelRatio);
    ctx.scale(this.scale * zoom, this.scale * zoom);
    ctx.translate((CONFIG.worldWidth * (1 - zoom)) / (2 * zoom), (CONFIG.worldHeight * (1 - zoom)) / (2 * zoom));

    this.drawWorld(ctx);
  }

  drawWorld(ctx) {
    const game = this.game;
    const left = game.roadLeft();
    const right = game.roadRight();
    this.drawBackdrop(ctx, left, right);
    this.drawRoad(ctx, left, right);
    game.events.render(ctx);

    for (const e of [...game.traffic, ...game.police, ...game.obstacles].sort((a, b) => a.y - b.y)) e.render(ctx, game);
    game.player.render(ctx, game);
    game.particles.render(ctx);
    game.text.render(ctx);

    if (game.nitroActive) this.drawSpeedLines(ctx);
    if (game.state === "CRASHING") this.drawCrashVignette(ctx);
  }

  drawBackdrop(ctx, left, right) {
    const game = this.game;
    const grd = ctx.createLinearGradient(0, 0, 0, CONFIG.worldHeight);
    grd.addColorStop(0, "#111923");
    grd.addColorStop(0.55, "#080c11");
    grd.addColorStop(1, "#030507");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, CONFIG.worldWidth, CONFIG.worldHeight);

    const theme = Math.floor(game.runTime / 24) % 4;
    const colors = [["#6ee7f9", "#ffcf5a"], ["#8e9aff", "#ff4d68"], ["#9fffd6", "#f0f6ff"], ["#ffb347", "#75d5ff"]][theme];
    const speed = game.roadScroll * 0.22;
    for (let side = 0; side < 2; side++) {
      const start = side === 0 ? 36 : right + 34;
      const end = side === 0 ? left - 52 : CONFIG.worldWidth - 34;
      for (let i = 0; i < 16; i++) {
        const y = ((i * 155 + speed) % (CONFIG.worldHeight + 180)) - 90;
        const x = lerp(start, end, (Math.sin(i * 4.1 + side) + 1) * 0.5);
        ctx.globalAlpha = 0.14 + (i % 3) * 0.05;
        ctx.fillStyle = i % 2 ? colors[0] : colors[1];
        ctx.fillRect(x, y, rand(14, 28), rand(34, 86));
      }
    }
    ctx.globalAlpha = 1;
  }

  drawRoad(ctx, left, right) {
    const game = this.game;
    const width = right - left;
    ctx.fillStyle = "#171c22";
    ctx.fillRect(left, -20, width, CONFIG.worldHeight + 40);

    const asphalt = ctx.createLinearGradient(left, 0, right, 0);
    asphalt.addColorStop(0, "#11171f");
    asphalt.addColorStop(0.5, "#1d232b");
    asphalt.addColorStop(1, "#11171f");
    ctx.fillStyle = asphalt;
    ctx.fillRect(left + 18, -20, width - 36, CONFIG.worldHeight + 40);

    ctx.fillStyle = "rgba(255,255,255,0.1)";
    for (let i = 0; i < 100; i++) {
      const y = ((i * 37 + game.roadScroll * 0.75) % (CONFIG.worldHeight + 60)) - 30;
      const x = left + 24 + ((i * 97) % (width - 48));
      ctx.fillRect(x, y, 2, 2);
    }

    ctx.fillStyle = "#202834";
    ctx.fillRect(left - 28, -20, 24, CONFIG.worldHeight + 40);
    ctx.fillRect(right + 4, -20, 24, CONFIG.worldHeight + 40);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(left + 15, -20, 4, CONFIG.worldHeight + 40);
    ctx.fillRect(right - 19, -20, 4, CONFIG.worldHeight + 40);

    for (let lane = 1; lane < CONFIG.lanes; lane++) {
      const x = left + (width / CONFIG.lanes) * lane;
      for (let y = ((game.roadScroll * 1.1) % 92) - 92; y < CONFIG.worldHeight; y += 92) {
        ctx.fillStyle = "rgba(240, 246, 252, 0.62)";
        roundRect(ctx, x - 3, y, 6, 48, 3);
        ctx.fill();
      }
    }

    ctx.fillStyle = "rgba(255, 209, 102, 0.72)";
    for (let y = ((game.roadScroll * 0.92) % 170) - 170; y < CONFIG.worldHeight; y += 170) {
      ctx.fillRect(left - 19, y, 11, 50);
      ctx.fillRect(right + 8, y + 40, 11, 50);
    }
  }

  drawSpeedLines(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.34;
    ctx.strokeStyle = "#6ee7f9";
    ctx.lineWidth = 2;
    for (let i = 0; i < 24; i++) {
      const x = rand(90, CONFIG.worldWidth - 90);
      const y = rand(-20, CONFIG.worldHeight);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + rand(-10, 10), y + rand(90, 160));
      ctx.stroke();
    }
    ctx.restore();
  }

  drawCrashVignette(ctx) {
    const grd = ctx.createRadialGradient(CONFIG.worldWidth / 2, CONFIG.worldHeight / 2, 300, CONFIG.worldWidth / 2, CONFIG.worldHeight / 2, 850);
    grd.addColorStop(0, "rgba(255,255,255,0)");
    grd.addColorStop(1, "rgba(255, 44, 72, 0.34)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, CONFIG.worldWidth, CONFIG.worldHeight);
  }
}

class UIManager {
  constructor(game) {
    this.game = game;
    this.menu = document.getElementById("menu");
    this.pause = document.getElementById("pauseScreen");
    this.gameOver = document.getElementById("gameOver");
    this.score = document.getElementById("score");
    this.wanted = document.getElementById("wanted");
    this.eventBanner = document.getElementById("eventBanner");
    this.nitroFill = document.getElementById("nitroFill");
    this.nitroButton = document.getElementById("nitroButton");
    this.soundToggle = document.getElementById("soundToggle");
    this.condition = [document.getElementById("conditionA"), document.getElementById("conditionB"), document.getElementById("conditionC")];
    this.finalScore = document.getElementById("finalScore");
    this.stats = document.getElementById("stats");
    this.bestBadge = document.getElementById("bestBadge");

    document.getElementById("startButton").addEventListener("click", () => game.start());
    document.getElementById("restartButton").addEventListener("click", () => game.start());
    this.soundToggle.addEventListener("click", () => {
      game.audio.setEnabled(!game.audio.enabled);
      this.soundToggle.textContent = game.audio.enabled ? "SND" : "OFF";
    });
    this.nitroButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      game.tryNitro();
    });
  }

  update() {
    const game = this.game;
    this.score.textContent = Math.floor(game.score).toLocaleString();
    this.wanted.textContent = `${"\u2605".repeat(game.wanted.level)}${"-".repeat(5 - game.wanted.level)}`;
    this.nitroFill.style.width = `${Math.floor(game.nitro)}%`;
    this.nitroButton.classList.toggle("ready", game.nitro >= 35 && (game.state === "PLAYING" || game.state === "ESCAPE"));

    const blocks = Math.ceil(game.player.health / 34);
    this.condition.forEach((el, index) => {
      el.className = index < blocks ? (game.player.health < 45 ? "low" : "") : "empty";
    });

    if (game.bannerText && game.bannerTimer > 0) {
      this.eventBanner.textContent = game.bannerText;
      this.eventBanner.classList.add("visible");
    } else {
      this.eventBanner.classList.remove("visible");
    }

    this.menu.classList.toggle("hidden", game.state !== "MENU");
    this.pause.classList.toggle("hidden", game.state !== "PAUSED");
    this.gameOver.classList.toggle("hidden", game.state !== "GAME_OVER");
  }

  showGameOver(run, newBest, previousBest) {
    this.finalScore.textContent = Math.floor(run.score).toLocaleString();
    this.bestBadge.textContent = newBest ? "NEW BEST" : `${Math.max(0, previousBest - run.score).toLocaleString()} POINTS FROM YOUR BEST`;
    this.stats.innerHTML = "";
    const rows = [
      ["Best score", Math.floor(this.game.storage.stats.bestScore).toLocaleString()],
      ["Wanted", `${"\u2605".repeat(run.wanted)}${"-".repeat(5 - run.wanted)}`],
      ["Survived", `${run.time.toFixed(1)}s`],
      ["Near misses", run.nearMisses],
      ["Takedowns", run.takedowns],
      ["Best streak", run.bestStreak]
    ];
    for (const [label, value] of rows) {
      const node = document.createElement("div");
      node.className = "stat";
      node.innerHTML = `<b>${label}</b><span>${value}</span>`;
      this.stats.appendChild(node);
    }
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.input = new InputManager(this.canvas);
    this.storage = new StorageManager();
    this.audio = new AudioManager();
    this.player = new PlayerCar(this);
    this.wanted = new WantedSystem();
    this.spawn = new SpawnManager(this);
    this.events = new EventManager(this);
    this.particles = new ParticleSystem();
    this.text = new FloatingTextSystem();
    this.renderer = new Renderer(this, this.canvas);
    this.ui = new UIManager(this);

    this.state = "MENU";
    this.previousState = "MENU";
    this.traffic = [];
    this.police = [];
    this.obstacles = [];
    this.time = 0;
    this.runTime = 0;
    this.score = 0;
    this.multiplier = 1;
    this.nearMisses = 0;
    this.nearMissStreak = 0;
    this.bestStreak = 0;
    this.takedowns = 0;
    this.nitro = 0;
    this.nitroActive = false;
    this.nitroTimer = 0;
    this.speed = 690;
    this.roadScroll = 0;
    this.shakeAmount = 0;
    this.zoomKick = 0;
    this.bannerText = "";
    this.bannerTimer = 0;
    this.crashTimer = 0;
    this.last = performance.now();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && (this.state === "PLAYING" || this.state === "ESCAPE")) this.pauseGame();
    });

    requestAnimationFrame((now) => this.loop(now));
  }

  resetRun() {
    this.player.reset();
    this.wanted.reset();
    this.spawn.reset();
    this.events.reset();
    this.traffic = [];
    this.police = [];
    this.obstacles = [];
    this.particles.items = [];
    this.text.items = [];
    this.time = 0;
    this.runTime = 0;
    this.score = 0;
    this.multiplier = 1;
    this.nearMisses = 0;
    this.nearMissStreak = 0;
    this.bestStreak = 0;
    this.takedowns = 0;
    this.nitro = 20;
    this.nitroActive = false;
    this.nitroTimer = 0;
    this.speed = 690;
    this.roadScroll = 0;
    this.shakeAmount = 0;
    this.zoomKick = 0;
    this.bannerText = "";
    this.bannerTimer = 0;
    this.crashTimer = 0;
    this.spawn.spawnCivilian(1, -420);
    this.spawn.spawnCivilian(3, -760);
  }

  start() {
    this.audio.resume();
    this.resetRun();
    this.state = "PLAYING";
    this.banner("GO", 0.8);
  }

  pauseGame() {
    if (this.state !== "PLAYING" && this.state !== "ESCAPE") return;
    this.previousState = this.state;
    this.state = "PAUSED";
  }

  resumeGame() {
    if (this.state !== "PAUSED") return;
    this.state = this.previousState === "ESCAPE" ? "ESCAPE" : "PLAYING";
    this.last = performance.now();
  }

  loop(now) {
    const dt = clamp((now - this.last) / 1000, 0, 0.033);
    this.last = now;
    this.update(dt);
    this.renderer.render();
    this.ui.update();
    requestAnimationFrame((next) => this.loop(next));
  }

  update(dt) {
    this.time += dt;
    const pauseRequested = this.input.consumePause();
    const startRequested = this.input.consumeStart();
    if (pauseRequested) this.state === "PAUSED" ? this.resumeGame() : this.pauseGame();
    if (this.state === "MENU" && startRequested) this.start();
    if (this.state === "GAME_OVER" && startRequested) this.start();
    if (this.state === "PAUSED" && startRequested) this.resumeGame();

    this.bannerTimer = Math.max(0, this.bannerTimer - dt);
    this.shakeAmount *= Math.exp(-7.8 * dt);
    this.zoomKick *= Math.exp(-7 * dt);
    this.audio.update(this);

    if (this.state !== "PLAYING" && this.state !== "ESCAPE" && this.state !== "CRASHING") {
      this.particles.update(dt);
      this.text.update(dt);
      return;
    }

    const activeDt = this.state === "CRASHING" ? dt * 0.62 : dt;
    if (this.state === "PLAYING" || this.state === "ESCAPE") this.runTime += activeDt;
    this.updateNitro(activeDt);
    this.speed = this.computeSpeed();
    this.roadScroll += this.speed * activeDt;

    if (this.state === "PLAYING" || this.state === "ESCAPE") {
      this.player.update(activeDt, this.input, this);
      this.spawn.update(activeDt);
      this.events.update(activeDt);
      this.wanted.update(this);
      this.addScore((12 + this.wanted.level * 2.4) * this.multiplier * activeDt * (this.nitroActive ? 1.55 : 1));
      this.decayMultiplier(activeDt);
      if (this.input.nitro) this.tryNitro();
    } else if (this.state === "CRASHING") {
      this.crashTimer -= dt;
      this.player.spin += dt * 5.5;
      this.player.y -= dt * 120;
      if (this.crashTimer <= 0) this.finishGameOver();
    }

    for (const vehicle of [...this.traffic, ...this.police, ...this.obstacles]) vehicle.update(activeDt, this);
    this.handleCollisions();
    this.cleanup();
    this.particles.update(activeDt);
    this.text.update(activeDt);
  }

  computeSpeed() {
    const base = 690 + this.runTime * 3.7 + this.wanted.level * 38;
    return base * (this.nitroActive ? 1.36 : 1);
  }

  difficulty() {
    return {
      trafficRate: clamp(1 + this.runTime / 80 + this.wanted.level * 0.13, 1, 2.2),
      policeRate: clamp(1 + this.runTime / 95 + this.wanted.level * 0.18, 1, 2.4)
    };
  }

  roadLeft() {
    return (CONFIG.worldWidth - CONFIG.roadWidth) / 2;
  }

  roadRight() {
    return this.roadLeft() + CONFIG.roadWidth;
  }

  laneCenter(lane) {
    return this.roadLeft() + (CONFIG.roadWidth / CONFIG.lanes) * (lane + 0.5);
  }

  closestLaneTo(x) {
    return clamp(Math.floor((x - this.roadLeft()) / (CONFIG.roadWidth / CONFIG.lanes)), 0, CONFIG.lanes - 1);
  }

  laneHasSpace(lane, y, minDistance) {
    return ![...this.traffic, ...this.police, ...this.obstacles].some((v) => v.active && Math.abs(v.y - y) < minDistance && this.closestLaneTo(v.x) === lane);
  }

  isLaneChangeSafe(vehicle, lane) {
    const laneX = this.laneCenter(lane);
    return ![...this.traffic, ...this.police].some((v) => v !== vehicle && v.active && Math.abs(v.x - laneX) < 85 && Math.abs(v.y - vehicle.y) < 220);
  }

  majorEventActive() {
    return this.events.majorActive();
  }

  updateNitro(dt) {
    if (this.nitroActive) {
      this.nitroTimer -= dt;
      this.nitro = Math.max(0, this.nitro - dt * 30);
      if (this.nitroTimer <= 0 || this.nitro <= 0) this.nitroActive = false;
      this.particles.emit(this.player.x, this.player.y + 70, 1, "#6ee7f9", 190, 0.28);
    } else {
      this.nitro = clamp(this.nitro + dt * 1.4, 0, 100);
    }
  }

  tryNitro() {
    if ((this.state !== "PLAYING" && this.state !== "ESCAPE") || this.nitroActive || this.nitro < 35) return;
    this.nitroActive = true;
    this.nitroTimer = clamp(this.nitro / 44, 1.5, 2.8);
    this.nitro -= 18;
    this.banner("NITRO", 0.7);
    this.audio.blip("nitro");
    this.shake(3.4);
  }

  addScore(amount, label, x, y) {
    this.score += amount;
    if (label) this.text.add(x, y, `${label} +${Math.floor(amount)}`, "#ffd166", 25);
    if (this.score >= this.wanted.nextScoreMilestone) {
      this.banner(`${Math.floor(this.wanted.nextScoreMilestone).toLocaleString()} SCORE`, 1.4);
      this.wanted.nextScoreMilestone += 10000;
    }
  }

  banner(text, duration = 1) {
    this.bannerText = text;
    this.bannerTimer = Math.max(this.bannerTimer, duration);
  }

  resetMultiplier() {
    this.multiplier = 1;
    this.nearMissStreak = 0;
  }

  decayMultiplier(dt) {
    if (this.nearMissStreak <= 0) return;
    this.nearMissTimer = (this.nearMissTimer || 0) - dt;
    if (this.nearMissTimer <= 0) {
      this.nearMissStreak = Math.max(0, this.nearMissStreak - 1);
      this.multiplier = clamp(1 + this.nearMissStreak, 1, 5);
      this.nearMissTimer = 3.4;
    }
  }

  nearMiss(vehicle) {
    if (vehicle.nearMissed || vehicle.crashed) return;
    vehicle.nearMissed = true;
    this.nearMisses += 1;
    this.nearMissStreak += 1;
    this.bestStreak = Math.max(this.bestStreak, this.nearMissStreak);
    this.multiplier = clamp(1 + this.nearMissStreak, 1, 5);
    this.nearMissTimer = 3.3;
    this.nitro = clamp(this.nitro + 13, 0, 100);
    const points = 100 * this.multiplier;
    this.addScore(points);
    this.text.add(vehicle.x, vehicle.y - 70, `NEAR MISS x${this.multiplier}`, "#6ee7f9", 24);
    this.particles.emit((vehicle.x + this.player.x) / 2, (vehicle.y + this.player.y) / 2, 6, "#6ee7f9", 160, 0.28);
    this.shake(this.multiplier >= 4 ? 4 : 2);
    this.audio.blip("near");
  }

  policeTakedown(police, strong = false) {
    if (police.markedByPlayer) return;
    police.markedByPlayer = true;
    police.crashed = true;
    police.vx = rand(-260, 260);
    police.vy = rand(180, 420);
    this.takedowns += 1;
    const label = strong ? "CHAIN TAKEDOWN" : "TAKEDOWN";
    this.addScore(strong ? 850 : 500, label, police.x, police.y - 80);
    this.particles.emit(police.x, police.y, strong ? 34 : 22, "#ffb347", 470, 0.56);
    this.nitro = clamp(this.nitro + 18, 0, 100);
    this.shake(strong ? 8 : 5);
    this.zoomKick = CONFIG.reducedMotion ? 0 : 0.025;
    this.audio.blip("takedown");
  }

  scrapeBarrier(side) {
    if (this.player.invuln <= 0.02) {
      this.player.damage(3, this, "scrape");
      this.particles.emit(side < 0 ? this.roadLeft() + 12 : this.roadRight() - 12, this.player.y, 5, "#ffcf5a", 180, 0.3);
    }
  }

  handleCollisions() {
    if (this.state !== "PLAYING" && this.state !== "ESCAPE") return;
    const playerRect = this.player.rect();
    const all = [...this.traffic, ...this.police, ...this.obstacles];
    for (const vehicle of all) {
      if (!vehicle.active || vehicle.crashed) continue;
      const r = vehicle.rect(vehicle.type === "roadblock" ? 4 : 8);
      if (aabb(playerRect, r)) {
        if (vehicle.spike) {
          this.player.damage(24, this, "spike");
          this.player.vx += rand(-260, 260);
          vehicle.active = false;
          this.banner("SPIKES", 1);
        } else if (vehicle.type === "police") {
          this.player.damage(vehicle.policeMode === "side" ? 16 : 22, this, "police");
          vehicle.vx += Math.sign(vehicle.x - this.player.x || 1) * 160;
          if (this.state === "ESCAPE") this.events.failEscape();
        } else {
          const heavy = Math.abs(this.player.vx) > 280 || this.nitroActive || vehicle.type === "roadblock";
          this.player.damage(heavy ? 42 : 24, this, "traffic");
          vehicle.crashed = true;
          vehicle.vx = Math.sign(vehicle.x - this.player.x || rand(-1, 1)) * rand(100, 260);
          vehicle.vy = rand(140, 330);
        }
      } else if (vehicle.type !== "roadblock") {
        const near = expandRect(r, 25);
        const passed = vehicle.y > this.player.y - 42 && vehicle.y < this.player.y + 95;
        if (passed && aabb(playerRect, near)) this.nearMiss(vehicle);
      }
    }

    for (const police of this.police) {
      if (!police.active || police.crashed) continue;
      for (const target of [...this.traffic, ...this.obstacles, ...this.police]) {
        if (target === police || !target.active || target.crashed) continue;
        if (aabb(police.rect(4), target.rect(5))) {
          const nearPlayer = Math.hypot(police.x - this.player.x, police.y - this.player.y) < 280 || police.markedByPlayer;
          if (nearPlayer || target.type === "roadblock") this.policeTakedown(police, target.type === "police");
          if (target.type === "police") this.policeTakedown(target, true);
          if (target.type === "civilian") {
            target.crashed = true;
            target.vx = rand(-160, 160);
            target.vy = rand(120, 300);
          }
        }
      }
    }
  }

  cleanup() {
    const keep = (vehicle) => vehicle.active && vehicle.y < CONFIG.worldHeight + 360 && vehicle.y > -520 && vehicle.x > -220 && vehicle.x < CONFIG.worldWidth + 220;
    for (const listName of ["traffic", "police", "obstacles"]) {
      const list = this[listName];
      for (const vehicle of list) {
        if (!keep(vehicle)) vehicle.active = false;
      }
      this[listName] = list.filter((vehicle) => vehicle.active);
    }
  }

  beginCrash() {
    if (this.state === "CRASHING" || this.state === "GAME_OVER") return;
    this.state = "CRASHING";
    this.crashTimer = 1.25;
    this.shake(14);
    this.audio.blip("over");
    this.particles.emit(this.player.x, this.player.y, 56, "#ff4d68", 560, 0.9);
    this.banner("BUSTED", 1);
  }

  finishGameOver() {
    this.state = "GAME_OVER";
    const run = {
      score: Math.floor(this.score),
      time: this.runTime,
      wanted: this.wanted.level,
      nearMisses: this.nearMisses,
      takedowns: this.takedowns,
      bestStreak: this.bestStreak
    };
    const previousBest = this.storage.stats.bestScore || 0;
    const newBest = this.storage.saveRun(run);
    this.ui.showGameOver(run, newBest, previousBest);
  }

  shake(amount) {
    if (CONFIG.reducedMotion) amount *= 0.25;
    this.shakeAmount = Math.max(this.shakeAmount, amount);
  }
}

function aabb(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function expandRect(rect, amount) {
  return {
    left: rect.left - amount,
    right: rect.right + amount,
    top: rect.top - amount,
    bottom: rect.bottom + amount
  };
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

window.addEventListener("load", () => {
  window.getawayGame = new Game();
});
