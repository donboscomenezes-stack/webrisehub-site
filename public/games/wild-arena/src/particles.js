import { rand, TAU } from "./utils.js";

export class ParticleSystem {
  constructor() {
    this.particles = [];
    this.texts = [];
  }

  reset() {
    this.particles.length = 0;
    this.texts.length = 0;
  }

  burst(x, y, color, count = 8, power = 130) {
    for (let i = 0; i < count; i += 1) {
      const a = rand(0, TAU);
      const s = rand(power * 0.35, power);
      this.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: rand(0.22, 0.55), max: 0.55, r: rand(2, 5), color });
    }
  }

  dust(x, y, dx, dy) {
    this.particles.push({ x, y, vx: -dx * rand(20, 80), vy: -dy * rand(20, 80), life: 0.28, max: 0.28, r: rand(4, 9), color: "rgba(209, 188, 130, 0.45)" });
  }

  text(x, y, text, color = "#f2df9c", size = 18) {
    this.texts.push({ x, y, text, color, size, life: 0.86, max: 0.86 });
  }

  update(dt) {
    for (const p of this.particles) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= Math.pow(0.05, dt);
      p.vy *= Math.pow(0.05, dt);
    }
    for (const t of this.texts) {
      t.life -= dt;
      t.y -= dt * 42;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
    this.texts = this.texts.filter((t) => t.life > 0);
  }

  draw(ctx) {
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.life / p.max);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    for (const t of this.texts) {
      ctx.globalAlpha = Math.max(0, t.life / t.max);
      ctx.fillStyle = t.color;
      ctx.font = `900 ${t.size}px system-ui`;
      ctx.strokeStyle = "rgba(0,0,0,0.72)";
      ctx.lineWidth = 4;
      ctx.strokeText(t.text, t.x, t.y);
      ctx.fillText(t.text, t.x, t.y);
    }
    ctx.globalAlpha = 1;
  }
}
