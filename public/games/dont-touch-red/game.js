const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const els = {
  bestTime: document.getElementById("bestTime"),
  currentTime: document.getElementById("currentTime"),
  startOverlay: document.getElementById("startOverlay"),
  pauseOverlay: document.getElementById("pauseOverlay"),
  gameOverOverlay: document.getElementById("gameOverOverlay"),
  resultTime: document.getElementById("resultTime"),
  resultMessage: document.getElementById("resultMessage"),
  resultStats: document.getElementById("resultStats"),
  startButton: document.getElementById("startButton"),
  restartButton: document.getElementById("restartButton"),
  focusButton: document.getElementById("focusButton"),
  focusPips: document.getElementById("focusPips"),
  soundButton: document.getElementById("soundButton"),
  toast: document.getElementById("toast"),
};

const storage = {
  bestTime: "dtr.bestTime",
  bestCloseCalls: "dtr.bestCloseCalls",
  sound: "dtr.sound",
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function circleRectCollision(circle, rect) {
  const left = rect.x - rect.w / 2;
  const right = rect.x + rect.w / 2;
  const top = rect.y - rect.h / 2;
  const bottom = rect.y + rect.h / 2;
  const cx = clamp(circle.x, left, right);
  const cy = clamp(circle.y, top, bottom);
  const dx = circle.x - cx;
  const dy = circle.y - cy;
  return dx * dx + dy * dy <= circle.r * circle.r;
}

function circleRotatedRectCollision(circle, rect) {
  const cos = Math.cos(-rect.angle);
  const sin = Math.sin(-rect.angle);
  const dx = circle.x - rect.x;
  const dy = circle.y - rect.y;
  const local = {
    x: dx * cos - dy * sin + rect.x,
    y: dx * sin + dy * cos + rect.y,
    r: circle.r,
  };
  return circleRectCollision(local, rect);
}

function distanceToRect(circle, rect) {
  const left = rect.x - rect.w / 2;
  const right = rect.x + rect.w / 2;
  const top = rect.y - rect.h / 2;
  const bottom = rect.y + rect.h / 2;
  const cx = clamp(circle.x, left, right);
  const cy = clamp(circle.y, top, bottom);
  return Math.hypot(circle.x - cx, circle.y - cy) - circle.r;
}

class AudioManager {
  constructor() {
    this.enabled = localStorage.getItem(storage.sound) !== "off";
    this.ctx = null;
  }

  ensure() {
    if (!this.enabled) return;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    localStorage.setItem(storage.sound, enabled ? "on" : "off");
  }

  tone(freq, duration = 0.05, gain = 0.035, type = "sine", bend = 0) {
    if (!this.enabled) return;
    this.ensure();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const amp = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (bend) osc.frequency.exponentialRampToValueAtTime(Math.max(24, freq + bend), now + duration);
    amp.gain.setValueAtTime(0, now);
    amp.gain.linearRampToValueAtTime(gain, now + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(amp).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  flip() {
    this.tone(260, 0.04, 0.025, "triangle", 90);
  }

  close() {
    this.tone(520, 0.055, 0.028, "sine", 160);
  }

  focus() {
    this.tone(180, 0.16, 0.045, "sine", -80);
  }

  milestone() {
    this.tone(460, 0.09, 0.032, "triangle", 140);
  }

  hit() {
    this.tone(92, 0.18, 0.08, "sawtooth", -48);
  }
}

class Player {
  constructor(game) {
    this.game = game;
    this.reset();
  }

  reset() {
    const a = this.game.arena;
    this.r = Math.max(7, Math.min(a.w, a.h) * 0.021);
    this.x = a.x + a.w * 0.27;
    this.y = a.y + a.h * 0.52;
    this.vx = Math.max(185, a.w * 0.33);
    this.vy = -Math.max(180, a.h * 0.42);
    this.trail = [];
    this.alive = true;
  }

  preview(dt) {
    this.update(dt * 0.55);
  }

  flip() {
    this.vy *= -1;
  }

  update(dt) {
    const a = this.game.arena;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.x - this.r < a.x) {
      this.x = a.x + this.r;
      this.vx = Math.abs(this.vx);
    } else if (this.x + this.r > a.x + a.w) {
      this.x = a.x + a.w - this.r;
      this.vx = -Math.abs(this.vx);
    }

    if (this.y - this.r < a.y) {
      this.y = a.y + this.r;
      this.vy = Math.abs(this.vy);
    } else if (this.y + this.r > a.y + a.h) {
      this.y = a.y + a.h - this.r;
      this.vy = -Math.abs(this.vy);
    }

    this.trail.push({ x: this.x, y: this.y, age: 0 });
    const maxTrail = reducedMotion ? 4 : 13;
    while (this.trail.length > maxTrail) this.trail.shift();
    for (const p of this.trail) p.age += dt;
  }

  render(ctx) {
    if (!reducedMotion) {
      for (let i = 0; i < this.trail.length; i++) {
        const p = this.trail[i];
        const t = i / this.trail.length;
        ctx.globalAlpha = 0.06 * t;
        ctx.fillStyle = "#fffaf0";
        ctx.beginPath();
        ctx.arc(p.x, p.y, this.r * (0.55 + t * 0.45), 0, TAU);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3.2);
    glow.addColorStop(0, "rgba(255, 250, 240, 0.98)");
    glow.addColorStop(0.34, "rgba(255, 250, 240, 0.25)");
    glow.addColorStop(1, "rgba(255, 250, 240, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 3.2, 0, TAU);
    ctx.fill();

    ctx.fillStyle = "#fffaf0";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, TAU);
    ctx.fill();
  }
}

class Obstacle {
  constructor(config) {
    Object.assign(this, config);
    this.id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    this.age = 0;
    this.alpha = 0;
    this.closeAwarded = false;
    this.angle = this.angle || 0;
  }

  update(dt, game) {
    this.age += dt;
    this.alpha = Math.min(1, this.age / 0.32);
    if (this.type === "moving") {
      const t = Math.sin(this.age * this.speed + this.phase);
      if (this.axis === "x") this.x = this.baseX + t * this.range;
      if (this.axis === "y") this.y = this.baseY + t * this.range;
    }
    if (this.type === "rotating") {
      this.angle += this.spin * dt;
    }
    if (this.type === "expanding") {
      const scale = Math.min(1, this.age / this.growTime);
      this.w = lerp(this.startW, this.endW, scale);
      this.h = lerp(this.startH, this.endH, scale);
    }
    if (this.type === "gap") {
      const t = Math.sin(this.age * this.speed + this.phase);
      this.gapCenter = clamp(this.baseGapCenter + t * this.range, this.gapSize / 2 + 12, game.arena.h - this.gapSize / 2 - 12);
    }
  }

  getRects(game) {
    const a = game.arena;
    if (this.type !== "gap") {
      return [{ x: this.x, y: this.y, w: this.w, h: this.h, angle: this.angle || 0, rotated: this.type === "rotating" }];
    }

    const gapTop = a.y + this.gapCenter - this.gapSize / 2;
    const gapBottom = a.y + this.gapCenter + this.gapSize / 2;
    const wallW = this.w;
    const topH = Math.max(0, gapTop - a.y);
    const bottomH = Math.max(0, a.y + a.h - gapBottom);
    return [
      { x: this.x, y: a.y + topH / 2, w: wallW, h: topH, angle: 0, rotated: false },
      { x: this.x, y: gapBottom + bottomH / 2, w: wallW, h: bottomH, angle: 0, rotated: false },
    ].filter((rect) => rect.h > 2);
  }

  collides(circle, game) {
    return this.getRects(game).some((rect) => (rect.rotated ? circleRotatedRectCollision(circle, rect) : circleRectCollision(circle, rect)));
  }

  proximity(circle, game) {
    return Math.min(...this.getRects(game).map((rect) => distanceToRect(circle, rect)));
  }

  render(ctx, game) {
    const rects = this.getRects(game);
    ctx.save();
    ctx.globalAlpha = this.alpha;
    for (const rect of rects) {
      ctx.save();
      ctx.translate(rect.x, rect.y);
      ctx.rotate(rect.angle || 0);
      const grad = ctx.createLinearGradient(0, -rect.h / 2, 0, rect.h / 2);
      grad.addColorStop(0, "#d63d3d");
      grad.addColorStop(1, "#9f2428");
      ctx.fillStyle = grad;
      ctx.shadowColor = "rgba(200, 50, 50, 0.16)";
      ctx.shadowBlur = 10;
      ctx.fillRect(-rect.w / 2, -rect.h / 2, rect.w, rect.h);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(-rect.w / 2 + 0.5, -rect.h / 2 + 0.5, rect.w - 1, rect.h - 1);
      ctx.restore();
    }
    ctx.restore();
  }
}

class ObstacleManager {
  constructor(game) {
    this.game = game;
    this.obstacles = [];
    this.spawnTimer = 0;
    this.lastType = "";
  }

  reset() {
    this.obstacles = [];
    this.spawnTimer = 1.2;
    this.lastType = "";
  }

  update(dt) {
    const g = this.game;
    for (const obstacle of this.obstacles) obstacle.update(dt, g);
    this.obstacles = this.obstacles.filter((o) => o.age < o.life);
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawn();
      this.spawnTimer = rand(1.08, 1.72) / g.difficulty.spawnRate;
    }
  }

  spawn() {
    const g = this.game;
    const a = g.arena;
    const d = g.difficulty;
    const types = ["static"];
    if (g.time > 6) types.push("double");
    if (g.time > 13) types.push("moving", "gap");
    if (g.time > 28) types.push("rotating", "movingGap");
    if (g.time > 38) types.push("expanding");

    let type = types[Math.floor(Math.random() * types.length)];
    if (type === this.lastType && types.length > 2) type = types[Math.floor(Math.random() * types.length)];
    this.lastType = type;

    const configs = this.makeConfig(type, a, d);
    const safe = configs.every((config) => this.isSafe(config, a, g.player));
    if (!safe) return;
    for (const config of configs) this.obstacles.push(new Obstacle(config));
  }

  makeConfig(type, a, d) {
    const margin = Math.min(a.w, a.h) * 0.09;
    const x = rand(a.x + margin, a.x + a.w - margin);
    const y = rand(a.y + margin, a.y + a.h - margin);
    const life = rand(5.8, 7.6);
    const red = { life };

    if (type === "double") {
      const vertical = Math.random() > 0.35;
      const gap = Math.max(94, Math.min(a.w, a.h) * rand(0.23, 0.31) / d.gapTightness);
      if (vertical) {
        const center = rand(a.y + a.h * 0.34, a.y + a.h * 0.66);
        const w = rand(34, 56);
        return [
          { ...red, type: "static", x, y: center - gap / 2 - 35, w, h: 70 },
          { ...red, type: "static", x: x + rand(-38, 38), y: center + gap / 2 + 35, w, h: 70 },
        ];
      }
      const center = rand(a.x + a.w * 0.32, a.x + a.w * 0.68);
      const h = rand(32, 48);
      return [
        { ...red, type: "static", x: center - gap / 2 - 45, y, w: 90, h },
        { ...red, type: "static", x: center + gap / 2 + 45, y: y + rand(-34, 34), w: 90, h },
      ];
    }

    if (type === "moving" || type === "movingGap") {
      const axis = Math.random() > 0.5 ? "x" : "y";
      const w = axis === "x" ? rand(42, 70) : rand(118, 160);
      const h = axis === "x" ? rand(118, 150) : rand(38, 58);
      return [{
        ...red,
        type: "moving",
        x,
        y,
        baseX: x,
        baseY: y,
        w,
        h,
        axis,
        range: Math.min(axis === "x" ? a.w : a.h, 150) * rand(0.22, 0.4),
        speed: rand(0.85, 1.25) * d.hazardSpeed,
        phase: rand(0, TAU),
      }];
    }

    if (type === "gap") {
      return [{
        ...red,
        type: "gap",
        x: rand(a.x + a.w * 0.24, a.x + a.w * 0.76),
        w: rand(28, 42),
        gapCenter: rand(a.h * 0.28, a.h * 0.72),
        baseGapCenter: rand(a.h * 0.28, a.h * 0.72),
        gapSize: Math.max(120, a.h * rand(0.36, 0.46) / d.gapTightness),
        range: gTimeRange(this.game.time, a.h),
        speed: this.game.time > 30 ? rand(0.55, 0.78) : 0,
        phase: rand(0, TAU),
      }];
    }

    if (type === "rotating") {
      return [{
        ...red,
        type: "rotating",
        x,
        y,
        w: rand(136, 190),
        h: rand(18, 24),
        angle: rand(0, TAU),
        spin: rand(0.55, 0.9) * (Math.random() > 0.5 ? 1 : -1) * d.hazardSpeed,
      }];
    }

    if (type === "expanding") {
      return [{
        ...red,
        type: "expanding",
        x,
        y,
        startW: 20,
        startH: 20,
        endW: rand(80, 130),
        endH: rand(54, 96),
        w: 20,
        h: 20,
        growTime: rand(1.8, 2.6),
      }];
    }

    return [{
      ...red,
      type: "static",
      x,
      y,
      w: rand(58, 118) * d.sizeScale,
      h: rand(34, 86) * d.sizeScale,
    }];
  }

  isSafe(config, a, player) {
    const obstacle = new Obstacle(config);
    const buffer = Math.min(a.w, a.h) * 0.13;
    if (obstacle.proximity({ x: player.x, y: player.y, r: player.r + buffer }, this.game) < 0) return false;
    for (let i = 1; i <= 24; i++) {
      const t = i / 24;
      const p = {
        x: player.x + player.vx * t * 1.25,
        y: player.y + player.vy * t * 1.25,
        r: player.r + 8,
      };
      if (p.x > a.x && p.x < a.x + a.w && p.y > a.y && p.y < a.y + a.h && obstacle.collides(p, this.game)) return false;
    }
    return !this.obstacles.some((existing) => Math.hypot((existing.x || 0) - (config.x || 0), (existing.y || 0) - (config.y || 0)) < 72);
  }

  render(ctx) {
    for (const obstacle of this.obstacles) obstacle.render(ctx, this.game);
  }
}

function gTimeRange(time, height) {
  return time > 30 ? height * rand(0.09, 0.17) : 0;
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  reset() {
    this.particles = [];
  }

  burst(x, y, color, count, power = 1) {
    if (reducedMotion) count = Math.ceil(count * 0.25);
    for (let i = 0; i < count; i++) {
      const angle = rand(0, TAU);
      const speed = rand(70, 260) * power;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rand(1.2, 3.2),
        life: rand(0.32, 0.7),
        age: 0,
        color,
      });
    }
  }

  update(dt) {
    for (const p of this.particles) {
      p.age += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.98;
      p.vy *= 0.98;
    }
    this.particles = this.particles.filter((p) => p.age < p.life);
  }

  render(ctx) {
    for (const p of this.particles) {
      ctx.globalAlpha = 1 - p.age / p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

class Game {
  constructor() {
    this.state = "start";
    this.time = 0;
    this.bestTime = Number(localStorage.getItem(storage.bestTime) || 0);
    this.bestCloseCalls = Number(localStorage.getItem(storage.bestCloseCalls) || 0);
    this.closeCalls = 0;
    this.focusCharges = 1;
    this.maxFocus = 1;
    this.focusTimer = 0;
    this.focusUsed = false;
    this.nextFocusMilestone = 15;
    this.nextTextMilestone = 10;
    this.flash = 0;
    this.shake = 0;
    this.hitFreeze = 0;
    this.lastFrame = performance.now();
    this.arena = { x: 0, y: 0, w: 1, h: 1 };
    this.difficulty = {};
    this.audio = new AudioManager();
    this.player = new Player(this);
    this.obstacles = new ObstacleManager(this);
    this.particles = new ParticleSystem();
    this.resize();
    this.bind();
    this.updateUI();
    requestAnimationFrame((time) => this.loop(time));
  }

  bind() {
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        this.primaryAction();
      }
      if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        event.preventDefault();
        this.activateFocus();
      }
      if (event.code === "Escape" && this.state === "playing") this.pause();
    });

    canvas.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      this.primaryAction();
    });

    els.startButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.startRun();
    });
    els.restartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.startRun();
    });
    els.focusButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.activateFocus();
    });
    els.soundButton.addEventListener("click", () => {
      this.audio.setEnabled(!this.audio.enabled);
      this.updateUI();
      this.audio.ensure();
      this.audio.flip();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.state === "playing") this.pause();
    });
  }

  resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.width = rect.width;
    this.height = rect.height;
    const pad = Math.max(18, Math.min(rect.width, rect.height) * 0.045);
    this.arena = { x: pad, y: pad, w: rect.width - pad * 2, h: rect.height - pad * 2 };
    if (this.player) this.player.reset();
  }

  primaryAction() {
    this.audio.ensure();
    if (this.state === "start" || this.state === "gameOver") {
      this.startRun();
      return;
    }
    if (this.state === "paused") {
      this.resume();
      return;
    }
    if (this.state === "playing") {
      this.player.flip();
      this.audio.flip();
      this.particles.burst(this.player.x, this.player.y, "rgba(255,250,240,0.72)", 5, 0.45);
    }
  }

  startRun() {
    this.state = "playing";
    this.time = 0;
    this.closeCalls = 0;
    this.focusCharges = 1;
    this.focusTimer = 0;
    this.focusUsed = false;
    this.nextFocusMilestone = 15;
    this.nextTextMilestone = 10;
    this.flash = 0;
    this.shake = 0;
    this.hitFreeze = 0;
    this.player.reset();
    this.obstacles.reset();
    this.particles.reset();
    this.hideToast();
    this.updateUI();
  }

  pause() {
    this.state = "paused";
    this.updateUI();
  }

  resume() {
    this.state = "playing";
    this.lastFrame = performance.now();
    this.updateUI();
  }

  activateFocus() {
    this.audio.ensure();
    if (this.state !== "playing" || this.focusCharges <= 0 || this.focusTimer > 0) return;
    this.focusCharges -= 1;
    this.focusTimer = 1;
    this.focusUsed = true;
    this.shake = Math.max(this.shake, reducedMotion ? 0 : 2);
    this.showToast("FOCUS");
    this.audio.focus();
    this.updateUI();
  }

  getDifficulty() {
    const t = this.time;
    return {
      spawnRate: clamp(0.74 + t / 46, 0.74, 1.8),
      hazardSpeed: clamp(0.8 + t / 75, 0.8, 1.42),
      gapTightness: clamp(1 + t / 105, 1, 1.36),
      sizeScale: clamp(0.9 + t / 100, 0.9, 1.18),
    };
  }

  update(dt) {
    this.flash = Math.max(0, this.flash - dt * 3.5);
    this.shake = Math.max(0, this.shake - dt * 10);
    this.particles.update(dt);

    if (this.hitFreeze > 0) {
      this.hitFreeze -= dt;
      if (this.hitFreeze <= 0) this.finishGameOver();
      return;
    }

    if (this.state === "start") {
      this.player.preview(dt);
      return;
    }

    if (this.state !== "playing") return;

    const slowScale = this.focusTimer > 0 ? 0.45 : 1;
    this.focusTimer = Math.max(0, this.focusTimer - dt);
    const gameDt = dt * slowScale;
    this.time += gameDt;
    this.difficulty = this.getDifficulty();
    this.player.update(gameDt);
    this.obstacles.update(gameDt);
    this.checkCollisions();
    this.checkMilestones();
    this.updateUI();
  }

  checkCollisions() {
    const circle = { x: this.player.x, y: this.player.y, r: this.player.r };
    for (const obstacle of this.obstacles.obstacles) {
      if (obstacle.collides(circle, this)) {
        this.hitObstacle();
        return;
      }
      const closeDistance = Math.max(8, this.player.r * 0.92);
      if (!obstacle.closeAwarded && obstacle.age > 0.45 && obstacle.proximity(circle, this) > 0 && obstacle.proximity(circle, this) < closeDistance) {
        obstacle.closeAwarded = true;
        this.closeCalls += 1;
        this.flash = Math.max(this.flash, 0.18);
        this.shake = Math.max(this.shake, reducedMotion ? 0 : 1.8);
        this.particles.burst(this.player.x, this.player.y, "rgba(255,250,240,0.58)", 8, 0.55);
        this.showToast("CLOSE CALL +1");
        this.audio.close();
      }
    }
  }

  checkMilestones() {
    if (this.time >= this.nextTextMilestone) {
      const text = this.nextTextMilestone >= 60 ? "LEGENDARY." : this.nextTextMilestone >= 45 ? "HOW?" : this.nextTextMilestone >= 30 ? "OKAY, YOU'RE GOOD." : this.nextTextMilestone >= 20 ? "STILL ALIVE?" : "NICE.";
      this.showToast(text);
      this.audio.milestone();
      this.nextTextMilestone += this.nextTextMilestone < 30 ? 10 : 15;
    }

    if (this.time >= this.nextFocusMilestone) {
      this.focusCharges = Math.min(this.maxFocus, this.focusCharges + 1);
      this.nextFocusMilestone += 15;
      this.updateUI();
    }
  }

  hitObstacle() {
    if (this.state !== "playing") return;
    this.state = "dying";
    this.hitFreeze = 0.1;
    this.flash = 1;
    this.shake = reducedMotion ? 0 : 7;
    this.particles.burst(this.player.x, this.player.y, "rgba(255,250,240,0.92)", 32, 1.1);
    this.particles.burst(this.player.x, this.player.y, "rgba(200,50,50,0.76)", 18, 0.9);
    this.audio.hit();
  }

  finishGameOver() {
    const oldBest = this.bestTime;
    const beatBest = this.time > oldBest;
    if (beatBest) {
      this.bestTime = this.time;
      localStorage.setItem(storage.bestTime, String(this.bestTime));
    }
    if (this.closeCalls > this.bestCloseCalls) {
      this.bestCloseCalls = this.closeCalls;
      localStorage.setItem(storage.bestCloseCalls, String(this.bestCloseCalls));
    }
    this.state = "gameOver";
    this.updateUI();

    if (beatBest && oldBest > 0) {
      els.resultMessage.textContent = `NEW BEST +${(this.time - oldBest).toFixed(1)}s`;
    } else if (oldBest > 0 && oldBest - this.time > 0 && oldBest - this.time <= 1.5) {
      els.resultMessage.textContent = `YOU WERE ${(oldBest - this.time).toFixed(1)}s FROM YOUR BEST.`;
    } else if (beatBest) {
      els.resultMessage.textContent = "NEW BEST";
    } else {
      els.resultMessage.textContent = "";
    }
  }

  showToast(text) {
    els.toast.textContent = text;
    els.toast.setAttribute("aria-hidden", "false");
    els.toast.classList.add("visible");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => this.hideToast(), 720);
  }

  hideToast() {
    els.toast.classList.remove("visible");
    els.toast.setAttribute("aria-hidden", "true");
    els.toast.textContent = "";
  }

  updateUI() {
    els.bestTime.textContent = this.bestTime.toFixed(1);
    els.currentTime.textContent = this.time.toFixed(1);
    els.resultTime.textContent = this.time.toFixed(1);
    els.resultStats.textContent = `BEST ${this.bestTime.toFixed(1)} · CLOSE CALLS ${this.closeCalls}`;
    els.focusPips.textContent = this.focusCharges > 0 ? "●".repeat(this.focusCharges) : "○";
    els.focusButton.classList.toggle("available", this.focusCharges > 0 && this.state === "playing");
    els.soundButton.setAttribute("aria-pressed", String(this.audio.enabled));
    els.soundButton.setAttribute("aria-label", this.audio.enabled ? "Sound on" : "Sound off");
    els.soundButton.firstElementChild.textContent = this.audio.enabled ? "SOUND" : "MUTED";
    this.setOverlay(els.startOverlay, this.state === "start");
    this.setOverlay(els.pauseOverlay, this.state === "paused");
    this.setOverlay(els.gameOverOverlay, this.state === "gameOver");
  }

  setOverlay(element, visible) {
    element.classList.toggle("hidden", !visible);
    element.setAttribute("aria-hidden", String(!visible));
    if ("inert" in element) element.inert = !visible;
  }

  render() {
    const sx = this.shake > 0 ? rand(-this.shake, this.shake) : 0;
    const sy = this.shake > 0 ? rand(-this.shake, this.shake) : 0;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();
    ctx.translate(sx, sy);
    this.renderBackground();
    this.renderArena();
    this.obstacles.render(ctx);
    if (this.state !== "gameOver" && (this.state !== "dying" || this.hitFreeze > 0.05)) this.player.render(ctx);
    this.particles.render(ctx);
    if (this.focusTimer > 0) this.renderFocusWash();
    if (this.flash > 0) this.renderFlash();
    ctx.restore();
  }

  renderBackground() {
    ctx.fillStyle = "#0d0d10";
    ctx.fillRect(0, 0, this.width, this.height);
    if (reducedMotion) return;
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "#fffaf0";
    const seed = Math.floor(this.time * 4);
    for (let i = 0; i < 28; i++) {
      const x = ((i * 89 + seed * 7) % Math.max(1, this.width));
      const y = ((i * 53 + seed * 3) % Math.max(1, this.height));
      ctx.fillRect(x, y, 1, 1);
    }
    ctx.globalAlpha = 1;
  }

  renderArena() {
    const a = this.arena;
    ctx.strokeStyle = "rgba(244,241,232,0.18)";
    ctx.lineWidth = 1;
    ctx.strokeRect(a.x + 0.5, a.y + 0.5, a.w - 1, a.h - 1);

    ctx.strokeStyle = "rgba(244,241,232,0.035)";
    ctx.lineWidth = 1;
    const step = Math.max(42, Math.min(a.w, a.h) * 0.13);
    for (let x = a.x + step; x < a.x + a.w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, a.y);
      ctx.lineTo(x, a.y + a.h);
      ctx.stroke();
    }
    for (let y = a.y + step; y < a.y + a.h; y += step) {
      ctx.beginPath();
      ctx.moveTo(a.x, y);
      ctx.lineTo(a.x + a.w, y);
      ctx.stroke();
    }
  }

  renderFocusWash() {
    ctx.globalAlpha = 0.08 * (this.focusTimer / 1);
    ctx.fillStyle = "#fffaf0";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalAlpha = 1;
  }

  renderFlash() {
    ctx.globalAlpha = this.flash * 0.16;
    ctx.fillStyle = "#fffaf0";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalAlpha = 1;
  }

  loop(frameTime) {
    const rawDt = (frameTime - this.lastFrame) / 1000;
    this.lastFrame = frameTime;
    const dt = Math.min(rawDt || 0, 0.033);
    this.update(dt);
    this.render();
    requestAnimationFrame((time) => this.loop(time));
  }
}

new Game();
