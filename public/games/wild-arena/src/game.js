import { AIController } from "./ai.js";
import { AudioManager } from "./audio.js";
import { DIFFICULTY, NAMES, PERSONALITIES, WEAPONS } from "./data.js";
import { Fighter } from "./entities.js";
import { InputManager } from "./input.js";
import { ParticleSystem } from "./particles.js";
import { StorageManager } from "./storage.js";
import { UIManager } from "./ui.js";
import { Camera, LootSystem, SpatialGrid, StormSystem, World } from "./world.js";
import { angleTo, chance, choice, clamp, distance, formatTime, normalize, rand } from "./utils.js";

const COLORS = ["#c86a4a", "#d6a657", "#b75e67", "#7ab072", "#7ba1b0", "#b48ccc", "#d48b58"];

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.resize();
    this.input = new InputManager(canvas);
    this.audio = new AudioManager();
    this.storage = new StorageManager();
    this.ui = new UIManager(this);
    this.camera = new Camera(canvas);
    this.world = new World();
    this.loot = new LootSystem();
    this.storm = new StormSystem();
    this.particles = new ParticleSystem();
    this.grid = new SpatialGrid();
    this.fighters = [];
    this.controllers = [];
    this.player = null;
    this.state = "MENU";
    this.difficultyKey = "normal";
    this.difficulty = DIFFICULTY.normal;
    this.elapsed = 0;
    this.playerCharge = 0;
    this.last = performance.now();
    this.killsAtLastBanner = 0;
    this.bannerFlags = new Set();
    this.tabHidden = false;
    this.bindUI();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  bindUI() {
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.state === "PLAYING") this.pause();
      this.tabHidden = document.hidden;
    });
    document.querySelectorAll("[data-difficulty]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-difficulty]").forEach((b) => b.classList.remove("selected"));
        button.classList.add("selected");
        this.difficultyKey = button.dataset.difficulty;
      });
    });
    document.querySelector("#startButton").addEventListener("click", () => this.start());
    document.querySelector("#muteButton").addEventListener("click", () => {
      const muted = this.audio.toggle();
      document.querySelector("#muteButton").textContent = muted ? "×" : "♪";
    });
    this.input.bindMobile(document);
    this.ui.records.textContent = this.storage.summary();
    document.querySelector("#muteButton").textContent = this.audio.muted ? "×" : "♪";
  }

  resize() {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.audio.unlock();
    this.world = new World();
    this.loot = new LootSystem();
    this.storm.reset();
    this.particles.reset();
    this.fighters = [];
    this.controllers = [];
    this.elapsed = 0;
    this.playerCharge = 0;
    this.killsAtLastBanner = 0;
    this.bannerFlags.clear();
    this.difficulty = DIFFICULTY[this.difficultyKey] || DIFFICULTY.normal;
    const nameInput = document.querySelector("#playerName");
    const playerName = nameInput?.value?.trim().toUpperCase() || "YOU";
    const p = this.world.spawnPoint(true);
    this.player = new Fighter({ x: p.x, y: p.y, name: playerName, isPlayer: true, color: "#f0b44c", weapon: WEAPONS.sword });
    this.fighters.push(this.player);
    const used = new Set();
    for (let i = 0; i < this.difficulty.bots; i += 1) {
      const point = this.world.spawnPoint();
      let name = choice(NAMES);
      while (used.has(name)) name = choice(NAMES);
      used.add(name);
      const weapon = choice(Object.values(WEAPONS));
      const bot = new Fighter({ x: point.x, y: point.y, name, color: choice(COLORS), weapon });
      bot.health = rand(94, 126);
      bot.maxHealth = bot.health;
      bot.moveSpeed = rand(215, 255);
      this.fighters.push(bot);
      this.controllers.push(new AIController(bot, choice(Object.keys(PERSONALITIES))));
    }
    this.loot.reset(this.world, this.difficulty.loot);
    this.loot.dropRandom(this.player.x + 80, this.player.y + 40, "weapon");
    this.ui.hideMenu();
    document.querySelector("#mobileControls").classList.toggle("hidden", !this.input.usingTouch && !matchMedia("(pointer: coarse)").matches);
    this.ui.toastMessage("Walk over loot and press E.\nLeft click attacks. Hold briefly for a heavy strike.", 5);
    this.state = "PLAYING";
  }

  pause() {
    if (this.state !== "PLAYING") return;
    this.state = "PAUSED";
    this.ui.showMenu(`
      <section class="menu-panel">
        <h1>PAUSED</h1>
        <p>${formatTime(this.elapsed)} survived</p>
        <button id="resumeButton" class="primary">Resume</button>
        <button id="pauseRestartButton" class="secondary">Restart</button>
        <button id="quitButton" class="secondary">Quit</button>
      </section>
    `);
    document.querySelector("#resumeButton").addEventListener("click", () => {
      this.state = "PLAYING";
      this.ui.hideMenu();
    });
    document.querySelector("#pauseRestartButton").addEventListener("click", () => this.start());
    document.querySelector("#quitButton").addEventListener("click", () => location.reload());
  }

  loop(now) {
    const dt = Math.min(0.033, (now - this.last) / 1000 || 0);
    this.last = now;
    this.input.update(dt);
    if (this.state === "PLAYING") this.update(dt);
    if (this.input.consume("pause")) {
      if (this.state === "PLAYING") this.pause();
    }
    this.render();
    this.input.endFrame();
    requestAnimationFrame(this.loop);
  }

  update(dt) {
    this.elapsed += dt;
    this.handlePlayerInput(dt);
    for (const c of this.controllers) c.update(dt, this);
    for (const f of this.fighters) f.update(dt, this.world);
    this.preventFighterOverlap();
    this.handleCombat();
    this.handleLoot();
    this.handleChests(dt);
    this.storm.update(dt, this.fighters);
    this.loot.update(dt);
    this.particles.update(dt);
    this.camera.follow(this.player, dt);
    this.updateBanners();
    this.ui.update(dt);
    this.cleanupDead();
    this.checkEndStates();
  }

  handlePlayerInput(dt) {
    const p = this.player;
    if (!p?.alive) return;
    const move = this.input.movementVector();
    p.steer(move.x, move.y, dt);
    const aimWorld = { x: this.input.mouse.x + this.camera.x, y: this.input.mouse.y + this.camera.y };
    p.facing = angleTo(p, aimWorld);
    p.setBlocking(this.input.mouse.right);
    if (this.input.consume("dodge")) {
      if (p.dodge()) {
        this.audio.dodge();
        this.particles.dust(p.x, p.y, Math.cos(p.facing), Math.sin(p.facing));
      }
    }

    if (this.input.mouse.justDown) this.playerCharge = 0.001;
    if (this.input.mouse.down && this.playerCharge > 0) {
      this.playerCharge += dt;
      if (this.playerCharge > 0.36 && p.cooldown <= 0 && p.attackTimer <= 0) {
        if (p.startAttack(true)) this.audio.swing();
        this.playerCharge = 0;
      }
    }
    if (this.input.mouse.justReleased && this.playerCharge > 0) {
      if (p.cooldown <= 0 && p.attackTimer <= 0) {
        if (p.startAttack(false)) this.audio.swing();
      }
      this.playerCharge = 0;
    }
  }

  preventFighterOverlap() {
    this.grid.clear();
    for (const f of this.fighters) if (f.alive) this.grid.add(f);
    for (const f of this.fighters) {
      if (!f.alive) continue;
      for (const other of this.grid.query(f.x, f.y, f.r * 3)) {
        if (other === f || !other.alive) continue;
        const dx = f.x - other.x;
        const dy = f.y - other.y;
        const d = Math.hypot(dx, dy) || 1;
        const min = f.r + other.r;
        if (d < min) {
          const push = (min - d) * 0.5;
          f.x += (dx / d) * push;
          f.y += (dy / d) * push;
          other.x -= (dx / d) * push;
          other.y -= (dy / d) * push;
        }
      }
    }
  }

  handleCombat() {
    for (const attacker of this.fighters) {
      if (!attacker.alive || !attacker.canDamageNow()) continue;
      for (const target of this.fighters) {
        if (target === attacker || !target.alive) continue;
        const result = attacker.tryHit(target);
        if (!result?.hit) continue;
        if (result.parry) {
          this.audio.parry();
          this.particles.text(target.x, target.y - 34, "PARRY", "#f5db68", 20);
          this.particles.burst(attacker.x, attacker.y, "#f5db68", 10, 110);
          this.camera.addShake(5);
        } else if (result.blocked) {
          this.audio.block();
          this.particles.text(target.x, target.y - 28, result.guardBreak ? "GUARD BREAK" : "BLOCK", "#9fd7e8", 15);
          this.particles.burst(target.x, target.y, "#9fd7e8", 5, 80);
        } else {
          this.audio.hit(attacker.attackHeavy);
          this.particles.burst(target.x, target.y, result.critical ? "#ffe174" : "#d94a40", attacker.attackHeavy ? 14 : 8, attacker.attackHeavy ? 180 : 120);
          this.particles.text(target.x, target.y - 28, result.critical ? "CRITICAL" : Math.round(result.damage).toString(), result.critical ? "#ffe174" : "#f2df9c", result.critical ? 19 : 15);
          this.camera.addShake(result.critical || attacker.attackHeavy ? 8 : 4);
        }
        if (!target.alive) this.onKill(attacker, target);
      }

      for (const obstacle of this.world.obstacles) {
        if (obstacle.hp <= 0 || obstacle.hp === Infinity) continue;
        const fake = { id: `o${obstacle.x}${obstacle.y}`, alive: true, x: obstacle.x, y: obstacle.y, r: obstacle.r };
        if (attacker.hasHit.has(fake.id)) continue;
        const inRange = distance(attacker, obstacle) < attacker.weapon.range + obstacle.r && Math.abs(Math.atan2(obstacle.y - attacker.y, obstacle.x - attacker.x) - attacker.attackFacing) < attacker.weapon.arc;
        if (inRange) {
          attacker.hasHit.add(fake.id);
          if (this.world.damageObstacle(obstacle, attacker.weapon.damage)) {
            this.particles.burst(obstacle.x, obstacle.y, "#8a5428", 12, 150);
            if (chance(0.3)) this.loot.dropRandom(obstacle.x, obstacle.y, "consumable");
          }
        }
      }
    }
  }

  handleLoot() {
    for (const f of this.fighters) {
      if (!f.alive) continue;
      const nearest = this.loot.nearest(f, f.isPlayer ? 66 : 42);
      if (!nearest) continue;
      if (f.isPlayer) {
        this.ui.toastMessage(`${nearest.name.toUpperCase()}\n[E] PICK UP`, 0.12);
        if (this.input.consume("interact")) {
          const name = this.loot.pickup(f, nearest);
          this.audio.pickup();
          this.ui.toastMessage(`${name.toUpperCase()} EQUIPPED`, 1.4);
        }
      } else if (chance(0.025) || nearest.kind === "heal") {
        this.loot.pickup(f, nearest);
      }
    }
  }

  handleChests(dt) {
    for (const chest of this.world.chests) {
      if (chest.opened) continue;
      const playerNear = this.player.alive && distance(this.player, chest) < 58;
      if (playerNear) {
        this.ui.toastMessage("CHEST\nHold E to open", 0.12);
        if (this.input.actions.interact) chest.progress += dt;
      } else {
        const bot = this.fighters.find((f) => f.alive && !f.isPlayer && distance(f, chest) < 44);
        if (bot && chance(0.3)) chest.progress += dt * 0.65;
        else chest.progress = Math.max(0, chest.progress - dt * 0.25);
      }
      if (chest.progress > 0.85) {
        chest.opened = true;
        this.particles.burst(chest.x, chest.y, "#e3bb62", 18, 180);
        this.loot.dropRandom(chest.x - 24, chest.y, "weapon");
        this.loot.dropRandom(chest.x + 24, chest.y);
        this.audio.pickup();
      }
    }
  }

  onKill(attacker, target) {
    this.audio.death();
    this.loot.dropFromFighter(target);
    this.particles.burst(target.x, target.y, "#2c2419", 18, 130);
    if (attacker.isPlayer) {
      this.ui.bannerMessage(`ELIMINATED — ${target.name}\n+100`, 1.5);
      const streak = attacker.kills - this.killsAtLastBanner;
      if (streak === 2) this.ui.bannerMessage("DOUBLE KILL", 1.5);
      if (streak === 3) this.ui.bannerMessage("TRIPLE KILL", 1.5);
      if (streak >= 4) this.ui.bannerMessage("RAMPAGE", 1.5);
    }
  }

  updateBanners() {
    if (this.storm.active && !this.bannerFlags.has("storm")) {
      this.bannerFlags.add("storm");
      this.ui.bannerMessage("THE STORM IS CLOSING", 2.5);
    }
    const alive = this.fighters.filter((f) => f.alive).length;
    if (alive === 2 && !this.bannerFlags.has("duel")) {
      this.bannerFlags.add("duel");
      this.ui.bannerMessage("FINAL DUEL", 2.4);
    }
  }

  cleanupDead() {
    this.controllers = this.controllers.filter((c) => c.fighter.alive || c.fighter.deadTimer < 8);
  }

  checkEndStates() {
    if (!this.player.alive && this.state === "PLAYING") {
      this.state = "DYING";
      setTimeout(() => this.finish(false), 850);
      return;
    }
    const alive = this.fighters.filter((f) => f.alive);
    if (alive.length === 1 && alive[0] === this.player && this.state === "PLAYING") {
      this.state = "VICTORY";
      setTimeout(() => this.finish(true), 650);
    }
  }

  finish(won) {
    if (!["DYING", "VICTORY"].includes(this.state)) return;
    const aliveBetter = this.fighters.filter((f) => f.alive && f !== this.player).length;
    const placement = won ? 1 : aliveBetter + 1;
    const stats = {
      placement,
      kills: this.player.kills,
      time: this.elapsed,
      damageDealt: this.player.damageDealt,
      damageTaken: this.player.damageTaken,
      parries: this.player.parries,
      dodges: this.player.dodges,
      bestWeapon: this.player.weapon.name
    };
    this.storage.saveRun(stats);
    this.ui.resultScreen(won ? "VICTORY" : "DEFEATED", stats, won);
    this.state = won ? "VICTORY_DONE" : "GAME_OVER";
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.state === "MENU") {
      this.drawMenuBackdrop(ctx);
      return;
    }
    this.camera.begin(ctx);
    this.world.draw(ctx);
    this.storm.draw(ctx);
    this.loot.draw(ctx);
    const sorted = this.fighters.slice().sort((a, b) => a.y - b.y);
    for (const f of sorted) f.draw(ctx);
    this.particles.draw(ctx);
    this.camera.end(ctx);
    if (this.state === "DYING") this.drawVignette(ctx, 0.4);
    if (this.player?.health < this.player?.maxHealth * 0.28 && this.state === "PLAYING") this.drawVignette(ctx, 0.22);
  }

  drawMenuBackdrop(ctx) {
    ctx.fillStyle = "#1f2d1d";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(220, 185, 93, 0.08)";
    for (let i = 0; i < 80; i += 1) {
      ctx.beginPath();
      ctx.arc((i * 97) % this.canvas.width, (i * 151) % this.canvas.height, 2 + (i % 4), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawVignette(ctx, alpha) {
    const gradient = ctx.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, this.canvas.height * 0.1, this.canvas.width / 2, this.canvas.height / 2, this.canvas.height * 0.72);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, `rgba(90, 8, 8, ${alpha})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
