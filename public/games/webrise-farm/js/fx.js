// Tiny pooled particle system for dust, sparkles, water drops and poofs.
import * as THREE from 'three';
import { G } from './game.js';

export class FX {
  constructor() {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d'); const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.45, 'rgba(255,255,255,.8)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    this.dot = new THREE.CanvasTexture(c);
    this.N = 700;
    this.p = Array.from({ length: this.N }, () => ({ life: 0, x: 0, y: -99, z: 0, vx: 0, vy: 0, vz: 0, g: -9, max: 1 }));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.N * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(this.N * 3), 3));
    this.points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.38, map: this.dot, vertexColors: true, transparent: true, depthWrite: false }));
    this.points.frustumCulled = false;
    G.scene.add(this.points);
    this.i = 0;
  }
  burst(pos, color, n = 12, speed = 2, g = -9) {
    const c = new THREE.Color(color), col = this.points.geometry.attributes.color;
    for (let k = 0; k < n; k++) {
      const q = this.p[this.i]; const idx = this.i; this.i = (this.i + 1) % this.N;
      const a = Math.random() * Math.PI * 2, s = speed * (0.4 + Math.random() * 0.8);
      Object.assign(q, { x: pos.x, y: pos.y, z: pos.z, vx: Math.cos(a) * s, vz: Math.sin(a) * s, vy: g < 0 ? speed * (0.8 + Math.random()) : -Math.random() * 2, g, life: 0.7 + Math.random() * 0.5 }); q.max = q.life;
      const v = 0.85 + Math.random() * 0.3; col.setXYZ(idx, c.r * v, c.g * v, c.b * v);
    }
    col.needsUpdate = true;
  }
  update(dt) {
    const pos = this.points.geometry.attributes.position, col = this.points.geometry.attributes.color;
    for (let k = 0; k < this.N; k++) {
      const q = this.p[k];
      if (q.life <= 0) { if (q.y > -90) { q.y = -99; pos.setXYZ(k, 0, -99, 0); } continue; }
      q.life -= dt; q.vy += q.g * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt;
      if (q.y < 0.05) { q.y = 0.05; q.vy *= -0.3; q.vx *= 0.7; q.vz *= 0.7; }
      pos.setXYZ(k, q.x, q.life > 0 ? q.y : -99, q.z);
    }
    pos.needsUpdate = true;
  }
}
