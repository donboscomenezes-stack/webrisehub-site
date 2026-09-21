export class AudioManager {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("wildArenaMuted") === "1";
  }

  unlock() {
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === "suspended") this.ctx.resume();
  }

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem("wildArenaMuted", this.muted ? "1" : "0");
    return this.muted;
  }

  tone(freq, duration, type = "sine", gain = 0.035, slide = 0) {
    if (this.muted) return;
    this.unlock();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const volume = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), now + duration);
    volume.gain.setValueAtTime(0.0001, now);
    volume.gain.exponentialRampToValueAtTime(gain, now + 0.01);
    volume.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(volume).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  swing() {
    this.tone(220, 0.08, "triangle", 0.025, 120);
  }

  hit(heavy = false) {
    this.tone(heavy ? 90 : 130, heavy ? 0.14 : 0.09, "sawtooth", heavy ? 0.05 : 0.035, -30);
  }

  block() {
    this.tone(320, 0.08, "square", 0.025, -80);
  }

  parry() {
    this.tone(620, 0.14, "triangle", 0.05, 320);
  }

  pickup() {
    this.tone(500, 0.1, "sine", 0.035, 220);
  }

  dodge() {
    this.tone(170, 0.08, "triangle", 0.02, -70);
  }

  death() {
    this.tone(80, 0.36, "sawtooth", 0.035, -45);
  }
}
