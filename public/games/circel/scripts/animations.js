export function setupFloatingShapes(container) {
  const placements = [
    [8, 14, 1], [82, 10, 1.4], [72, 74, 0.8], [14, 78, 1.3], [46, 8, 0.9], [92, 48, 1.1]
  ];
  container.innerHTML = "";
  placements.forEach(([left, top, speed], index) => {
    const shape = document.createElement("span");
    shape.className = "float-shape";
    shape.style.left = `${left}%`;
    shape.style.top = `${top}%`;
    shape.style.animationDuration = `${16 * speed}s`;
    shape.style.animationDelay = `${index * -2}s`;
    container.appendChild(shape);
  });
}

export function animateNumber(element, target, suffix = "%", duration = 950) {
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    element.textContent = `${Math.round(target * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export class Confetti {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  burst() {
    const colors = ["#ff5a3d", "#44b59a", "#5375d7", "#171512", "#f3c24f"];
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.25,
        vx: (Math.random() - 0.5) * 9,
        vy: Math.random() * -7 - 2,
        g: Math.random() * 0.18 + 0.08,
        s: Math.random() * 7 + 4,
        r: Math.random() * Math.PI,
        color: colors[i % colors.length],
        life: 90 + Math.random() * 30
      });
    }
    this.tick();
  }

  tick() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.particles = this.particles.filter((p) => p.life > 0);
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.g;
      p.r += 0.1;
      p.life--;
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.r);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.55);
      this.ctx.restore();
    }
    if (this.particles.length) requestAnimationFrame(() => this.tick());
  }
}

export function createDrawSound() {
  let context;
  let last = 0;
  return {
    chirp(enabled) {
      if (!enabled || performance.now() - last < 80) return;
      last = performance.now();
      context ||= new AudioContext();
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "sine";
      osc.frequency.value = 420 + Math.random() * 90;
      gain.gain.value = 0.018;
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.045);
      osc.stop(context.currentTime + 0.05);
    }
  };
}
