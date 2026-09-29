// Tiny WebAudio synth: soft sound effects + a gentle generative music box loop. No audio files needed.
export class Audio {
  constructor() { this.ctx = null; this.musicOn = true; this.nextNote = 0; this.step = 0; }
  init() {
    if (this.ctx) { this.ctx.resume(); return; }
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain(); this.master.gain.value = 0.5; this.master.connect(this.ctx.destination);
      this.musicBus = this.ctx.createGain(); this.musicBus.gain.value = 0.16; this.musicBus.connect(this.master);
    } catch (e) { console.warn('Audio unavailable', e); }
  }
  tone(freq, dur = 0.2, type = 'sine', vol = 0.3, when = 0, slide = 0, bus) {
    const c = this.ctx; if (!c) return;
    const t = c.currentTime + when;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || this.master); o.start(t); o.stop(t + dur + 0.05);
  }
  play(name) {
    if (!this.ctx) return;
    const T = (...a) => this.tone(...a);
    switch (name) {
      case 'pickup': [880, 1175, 1568].forEach((f, i) => T(f, 0.25, 'triangle', 0.22, i * 0.07)); break;
      case 'discover': [659, 880, 1047, 1319].forEach((f, i) => T(f, 0.35, 'triangle', 0.2, i * 0.08)); break;
      case 'jump': T(420, 0.16, 'sine', 0.12, 0, 1.8); break;
      case 'land': T(140, 0.12, 'sine', 0.12, 0, 0.6); break;
      case 'boing': T(180, 0.45, 'sine', 0.35, 0, 3.2); T(360, 0.3, 'triangle', 0.1, 0.02, 2); break;
      case 'kick': T(120, 0.12, 'square', 0.12, 0, 0.5); T(300, 0.08, 'triangle', 0.1); break;
      case 'goal': [523, 659, 784, 1047].forEach((f, i) => T(f, 0.3, 'square', 0.08, i * 0.09)); break;
      case 'meow': T(700, 0.35, 'sine', 0.18, 0, 1.4); T(900, 0.25, 'sine', 0.1, 0.12, 0.7); break;
      case 'woof': T(220, 0.12, 'sawtooth', 0.12, 0, 0.7); T(200, 0.14, 'sawtooth', 0.1, 0.18, 0.7); break;
      case 'quack': T(520, 0.12, 'sawtooth', 0.08, 0, 0.6); T(500, 0.12, 'sawtooth', 0.08, 0.16, 0.6); break;
      case 'click': T(1200, 0.05, 'triangle', 0.1); break;
      case 'talk': T(600 + Math.random() * 200, 0.07, 'triangle', 0.08); T(700 + Math.random() * 200, 0.07, 'triangle', 0.06, 0.07); break;
      case 'locked': T(200, 0.1, 'square', 0.08); T(180, 0.12, 'square', 0.08, 0.12); break;
      case 'unlock': [392, 523, 659, 784, 1047].forEach((f, i) => T(f, 0.5, 'triangle', 0.16, i * 0.12)); break;
      case 'secret': [523, 659, 784, 988, 1175, 1568].forEach((f, i) => T(f, 0.9, 'sine', 0.16, i * 0.15)); break;
      case 'dance': [523, 587, 659, 784, 659, 587, 523, 784].forEach((f, i) => T(f, 0.2, 'triangle', 0.12, i * 0.25)); break;
      case 'shutter': T(2000, 0.04, 'square', 0.1); T(900, 0.08, 'square', 0.08, 0.05); break;
      case 'door': T(300, 0.2, 'triangle', 0.12, 0, 0.8); break;
    }
  }
  // generative pentatonic music box; called every frame
  update(day) {
    const c = this.ctx; if (!c || !this.musicOn) return;
    if (c.currentTime < this.nextNote - 0.1) return;
    const scale = [0, 2, 4, 7, 9, 12, 14, 16];
    const root = day > 0.7 ? 220 : 262;
    const beat = 0.42;
    if (this.nextNote < c.currentTime) this.nextNote = c.currentTime + 0.05;
    const s = this.step++;
    const when = this.nextNote - c.currentTime;
    if (Math.random() < 0.72) {
      const n = scale[Math.floor(Math.random() * scale.length)];
      this.tone(root * 2 * Math.pow(2, n / 12), 1.4, 'sine', 0.35, when, 0, this.musicBus);
    }
    if (s % 8 === 0) { const b = [0, 5, 7, 3][(s / 8) % 4 | 0]; this.tone(root / 2 * Math.pow(2, b / 12), 3.2, 'triangle', 0.3, when, 0, this.musicBus); }
    this.nextNote += beat;
  }
}
