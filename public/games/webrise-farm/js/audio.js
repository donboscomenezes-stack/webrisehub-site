// WebAudio synth: cheerful sound effects + a gentle generative ukulele-ish loop. No audio files.
export class Audio {
  constructor() { this.ctx = null; this.music = true; this.sfx = true; this.next = 0; this.step = 0; this.lastRipe = 0; }
  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain(); this.master.gain.value = 0.55; this.master.connect(this.ctx.destination);
      this.mbus = this.ctx.createGain(); this.mbus.gain.value = 0.13; this.mbus.connect(this.master);
    } catch (e) { this.ctx = null; }
  }
  tone(f, dur = 0.2, type = 'sine', vol = 0.3, when = 0, slide = 0, bus) {
    const c = this.ctx; if (!c) return;
    const t = c.currentTime + when, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f * slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || this.master); o.start(t); o.stop(t + dur + 0.05);
  }
  noise(dur = 0.15, vol = 0.15, freq = 1200, when = 0) {
    const c = this.ctx; if (!c) return;
    const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const s = c.createBufferSource(); s.buffer = buf; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; const g = c.createGain(); g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(this.master); s.start(c.currentTime + when);
  }
  play(name) {
    if (!this.ctx || !this.sfx) return;
    const T = (...a) => this.tone(...a);
    switch (name) {
      case 'click': T(900, 0.05, 'triangle', 0.08); break;
      case 'boop': T(500, 0.12, 'sine', 0.15, 0, 1.5); break;
      case 'dig': this.noise(0.1, 0.14, 500); T(160, 0.08, 'sine', 0.07, 0, 0.6); break;
      case 'plant': T(620, 0.09, 'triangle', 0.12); T(880, 0.1, 'triangle', 0.1, 0.05); break;
      case 'water': this.noise(0.35, 0.12, 2400); T(1200, 0.15, 'sine', 0.06, 0, 0.5); break;
      case 'harvest': T(784, 0.12, 'triangle', 0.14); T(1175, 0.16, 'triangle', 0.12, 0.06); break;
      case 'ripe': { const n = performance.now(); if (n - this.lastRipe < 400) return; this.lastRipe = n; T(1568, 0.25, 'sine', 0.05); T(2093, 0.3, 'sine', 0.04, 0.08); break; }
      case 'coin': [1319, 1760].forEach((f, i) => T(f, 0.12, 'square', 0.05, i * 0.07)); break;
      case 'place': T(300, 0.1, 'sine', 0.2, 0, 1.6); this.noise(0.08, 0.1, 800); break;
      case 'clear': this.noise(0.4, 0.25, 600); [523, 659, 784].forEach((f, i) => T(f, 0.2, 'triangle', 0.1, 0.1 + i * 0.08)); break;
      case 'nope': T(220, 0.12, 'square', 0.06); T(180, 0.14, 'square', 0.05, 0.1); break;
      case 'levelup': [523, 659, 784, 1047, 1319].forEach((f, i) => T(f, 0.35, 'triangle', 0.14, i * 0.09)); break;
      case 'order': [659, 784, 988, 1319].forEach((f, i) => T(f, 0.25, 'triangle', 0.12, i * 0.08)); [1319, 1760].forEach((f, i) => T(f, 0.12, 'square', 0.04, 0.35 + i * 0.07)); break;
      case 'cook': this.noise(0.5, 0.08, 3000); T(440, 0.1, 'triangle', 0.08); break;
      case 'ding': T(1760, 0.6, 'sine', 0.12); T(2637, 0.5, 'sine', 0.05, 0.02); break;
      case 'chicken': T(900, 0.08, 'square', 0.04, 0, 1.3); T(1100, 0.1, 'square', 0.04, 0.1, 0.8); break;
      case 'cow': T(180, 0.5, 'sawtooth', 0.07, 0, 0.7); break;
      case 'sheep': for (let i = 0; i < 4; i++) T(420, 0.08, 'sawtooth', 0.05, i * 0.07, 1.05); break;
      case 'woof': T(260, 0.1, 'sawtooth', 0.1, 0, 0.6); T(240, 0.12, 'sawtooth', 0.09, 0.16, 0.6); break;
      case 'shutter': this.noise(0.06, 0.3, 4000); T(1800, 0.05, 'square', 0.05, 0.05); break;
      case 'tok': this.tone(700 + Math.random() * 120, 0.05, 'square', 0.035); this.noise(0.04, 0.06, 2500); break;
      case 'chop': this.tone(220, 0.08, 'triangle', 0.08, 0, 0.6); this.noise(0.07, 0.12, 900); break;
      case 'open': T(520, 0.08, 'sine', 0.1, 0, 1.4); break;
    }
  }
  update(night) {
    const c = this.ctx; if (!c || !this.music) return;
    if (c.currentTime < this.next - 0.15) return;
    if (this.next < c.currentTime) this.next = c.currentTime + 0.05;
    const when = this.next - c.currentTime, s = this.step++;
    const chords = [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14], [7, 11, 14]];
    const ch = chords[Math.floor(s / 8) % chords.length], root = night ? 196 : 262;
    const beat = s % 8;
    if (beat === 0 || beat === 3 || beat === 6) this.tone(root / 2 * Math.pow(2, ch[0] / 12), 0.9, 'triangle', 0.4, when, 0, this.mbus);
    if (Math.random() < 0.62) { const n = ch[Math.floor(Math.random() * 3)] + (Math.random() < 0.4 ? 12 : 0); this.tone(root * Math.pow(2, n / 12), 0.45, 'triangle', 0.32, when, 0, this.mbus); }
    this.next += 0.27;
  }
}
