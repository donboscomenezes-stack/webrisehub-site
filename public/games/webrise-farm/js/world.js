// World: lighting, sky, terrain, surroundings, farm buildings, pens, weather and the day cycle.
import * as THREE from 'three';
import { G, clamp, lerp, rand } from './game.js';
import { GW, GH, TILE, DAY_LENGTH } from './config.js';
import * as M from './models.js';

export const HALF_W = GW * TILE / 2, HALF_H = GH * TILE / 2;   // 16, 12
export const PENS = {
  coop:  { x0: -31, x1: -19, z0: -10, z1: 3,  trough: [-20.6, -1.5, Math.PI / 2], label: '🐔 Chicken Coop' },
  cows:  { x0: 19,  x1: 32,  z0: -12, z1: -1, trough: [20.6, -6.5, Math.PI / 2], label: '🐄 Cow Pasture' },
  sheep: { x0: 19,  x1: 32,  z0: 2,   z1: 12, trough: [20.6, 7, Math.PI / 2], label: '🐑 Sheep Meadow' },
};
const ROAD_Z = 19;
const BLOCKED = [   // areas where scatter (trees, bushes) must not go
  [-HALF_W - 2, HALF_W + 2, -HALF_H - 2, HALF_H + 2], [-34, 34, -26, -13], [-33, -17, -12, 5], [17, 34, -14, 14],
  [-100, 100, ROAD_Z - 3, ROAD_Z + 3], [-31, -19, 6, 16], [-14, 10, 12, 18],
];
const blocked = (x, z, pad = 0) => BLOCKED.some(([x0, x1, z0, z1]) => x > x0 - pad && x < x1 + pad && z > z0 - pad && z < z1 + pad);

export function groundHeight(x, z) {
  const ax = Math.max(0, Math.abs(x) - 40), az = Math.max(0, z < 0 ? -z - 30 : z - 28);
  const d = Math.hypot(ax, az);
  return d <= 0 ? 0 : Math.pow(d / 18, 1.6) * 6 * (0.75 + 0.25 * Math.sin(x * 0.07) * Math.cos(z * 0.05));
}

export class World {
  constructor() {
    this.scene = G.scene;
    this.pickables = [];
    this.lamps = [];
    this.smoke = [];
    this.halos = [];
  }
  build() {
    this.lights(); this.sky(); this.terrain(); this.road(); this.buildings(); this.pens(); this.nature(); this.weather(); this.life();
  }
  // soft additive glow used for windows and lanterns at night
  halo(x, y, z, s = 2.2, color = 0xffc861) {
    if (!this.glowTex) this.glowTex = G.fx.dot;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glowTex, color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    sp.position.set(x, y, z); sp.scale.setScalar(s); this.halos.push(sp); return sp;
  }
  tap(obj, kind, data) { obj.userData.tap = kind; if (data) obj.userData.tapData = data; this.pickables.push(obj); return obj; }

  lights() {
    this.hemi = new THREE.HemisphereLight(0xdff2ff, 0x9fc96b, 1.3); this.scene.add(this.hemi);
    const sun = new THREE.DirectionalLight(0xfff2d9, 2.6);
    sun.castShadow = true;
    const mob = matchMedia('(pointer: coarse)').matches;
    sun.shadow.mapSize.set(mob ? 1536 : 2048, mob ? 1536 : 2048);
    const c = sun.shadow.camera; c.left = -44; c.right = 44; c.top = 38; c.bottom = -38; c.near = 5; c.far = 160;
    sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.05;
    sun.target.position.set(0, 0, -2);
    this.scene.add(sun, sun.target); this.sun = sun;
    this.scene.fog = new THREE.Fog(0xcfeeff, 90, 230);
  }
  sky() {
    const u = { top: { value: new THREE.Color(0x58b4ff) }, bot: { value: new THREE.Color(0xd8f1ff) } };
    this.skyU = u;
    const m = new THREE.ShaderMaterial({
      uniforms: u, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'uniform vec3 top,bot; varying vec3 vP; void main(){ float y = clamp(vP.y*1.6+0.1,0.,1.); gl_FragColor = vec4(mix(bot,top,pow(y,0.8)),1.); }',
    });
    this.skyMesh = new THREE.Mesh(new THREE.SphereGeometry(400, 24, 12), m);
    this.skyMesh.frustumCulled = false; this.scene.add(this.skyMesh);
    this.clouds = [];
    for (let i = 0; i < 12; i++) {
      const c = M.cloudMesh(i + 3); c.position.set(rand(-120, 120), rand(28, 42), rand(-110, 40)); c.userData.v = rand(0.6, 1.4);
      c.scale.setScalar(rand(0.8, 1.4)); this.scene.add(c); this.clouds.push(c);
    }
  }
  terrain() {
    const geo = new THREE.PlaneGeometry(260, 260, 130, 130); geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position, col = new Float32Array(p.count * 3);
    const c1 = new THREE.Color(0x86d05a), c2 = new THREE.Color(0x6fbf48), cRoad = new THREE.Color(0xdcc28f), cFarm = new THREE.Color(0x7ccb52), cHill = new THREE.Color(0x63b444), t = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      p.setY(i, groundHeight(x, z) - 0.02);
      const n = Math.sin(x * 0.19) * Math.cos(z * 0.16) * 0.5 + Math.sin(x * 0.05 + z * 0.07) * 0.5;
      t.copy(c1).lerp(c2, n * 0.5 + 0.5);
      if (Math.abs(x) < HALF_W && Math.abs(z) < HALF_H) t.lerp(cFarm, 0.5);
      if (Math.abs(z - ROAD_Z) < 2.2) t.lerp(cRoad, 0.95);
      if (Math.abs(x) < 1.4 && z > HALF_H - 0.5 && z < ROAD_Z) t.lerp(cRoad, 0.85);              // path farm → road
      if (Math.abs(x) < 1.4 && z < -HALF_H + 0.5 && z > -16.5) t.lerp(cRoad, 0.85);             // path farm → buildings
      if (z < -14 && z > -17 && x > -18 && x < 18) t.lerp(cRoad, 0.8);                          // yard in front of buildings
      if (groundHeight(x, z) > 0.5) t.lerp(cHill, 0.4);
      col[i * 3] = t.r; col[i * 3 + 1] = t.g; col[i * 3 + 2] = t.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); geo.computeVertexNormals();
    const ground = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }));
    ground.receiveShadow = true; this.scene.add(ground); this.ground = ground;
    // subtle grid overlay shown in building/hoe modes
    const pts = [];
    for (let i = 0; i <= GW; i++) pts.push(-HALF_W + i * TILE, 0.03, -HALF_H, -HALF_W + i * TILE, 0.03, HALF_H);
    for (let j = 0; j <= GH; j++) pts.push(-HALF_W, 0.03, -HALF_H + j * TILE, HALF_W, 0.03, -HALF_H + j * TILE);
    const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    this.gridLines = new THREE.LineSegments(gg, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 }));
    this.scene.add(this.gridLines);
    // farm border fence (gaps at the paths)
    const fenceM = M.fenceGeo(2, 0xc98b58);
    const addFence = (x, z, ry) => { const f = new THREE.Mesh(fenceM, M.MAT); f.position.set(x, 0, z); f.rotation.y = ry; f.castShadow = true; this.scene.add(f); };
    for (let i = 0; i < GW; i++) { const x = -HALF_W + 1 + i * 2; if (Math.abs(x) > 1.5) { addFence(x, -HALF_H - 0.6, 0); addFence(x, HALF_H + 0.6, 0); } }
    for (let j = 0; j < GH; j++) { const z = -HALF_H + 1 + j * 2; addFence(-HALF_W - 0.6, z, Math.PI / 2); addFence(HALF_W + 0.6, z, Math.PI / 2); }
  }
  road() {
    // dashed centre line + stones
    const dash = new THREE.InstancedMesh(new THREE.BoxGeometry(1.4, 0.02, 0.18), new THREE.MeshStandardMaterial({ color: 0xf7ecd2 }), 60);
    const d = new THREE.Object3D();
    for (let i = 0; i < 60; i++) { d.position.set(-120 + i * 4, 0.02, ROAD_Z); d.updateMatrix(); dash.setMatrixAt(i, d.matrix); }
    this.scene.add(dash);
  }
  buildings() {
    const add = (mesh, x, z, ry = 0, kind = null, label = null) => { mesh.position.set(x, 0, z); mesh.rotation.y = ry; this.scene.add(mesh); if (kind) this.tap(mesh, kind); if (label) mesh.userData.label = label; return mesh; };
    this.barn = add(M.barnMesh(), 12.5, -20, 0, 'barn');
    this.house = add(M.houseMesh(), -11.5, -20, 0, 'house');
    this.kitchen = add(M.kitchenMesh(), 0.5, -19.5, 0, 'kitchen');
    this.mill = add(M.windmill(), -24, -19, 0.5);
    this.stall = add(M.stallMesh(), -8.5, 15.2, 0, 'market');
    this.board = add(M.boardMesh(), -3.6, 15.4, 0, 'orders');
    this.truck = add(M.truck(), 7, ROAD_Z + 0.2, Math.PI / 2);
    this.truck.userData.home = this.truck.position.clone();
    this.truck.userData.state = 'idle';
    // window glows (night)
    const wins = [[-11.5 - 1.6, 1.8, -20 + 2.25], [-11.5 + 1.6, 1.8, -20 + 2.25], [-11.5, 3.9, -20 + 2.25], [0.5 + 0.9, 1.5, -19.5 + 1.85], [12.5, 4.2, -20 + 3.1], [-24, 3.4, -19 + 1.3], [-27.5 + 1.0, 1.6, -6.5 - 0.7]];
    for (const [x, y, z] of wins) this.scene.add(this.halo(x, y, z, 2.4));
    this.sign = M.signMesh(G.farmName, 3.2); this.sign.position.set(3.4, 0, HALF_H + 2.4); this.scene.add(this.sign);
    // mailbox + flowers at the gate
    const mb = M.decorMesh('mailbox'); mb.position.set(-2.2, 0, HALF_H + 2.2); this.scene.add(mb);
    // hay + crates by the barn
    const hay = M.decorMesh('hay'); hay.position.set(18, 0, -16.5); hay.rotation.y = 0.4; this.scene.add(hay);
    // pond (south-west)
    const pond = new THREE.Group();
    const water = new THREE.Mesh(new THREE.CircleGeometry(4.2, 32), M.WATER_MAT); water.rotation.x = -Math.PI / 2; water.position.y = 0.05; water.scale.set(1.3, 1, 1); pond.add(water);
    const rocks = new M.B();
    for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2; rocks.add(M.ico(0.45 + Math.random() * 0.3, 0), 0xb9b0a8, { x: Math.cos(a) * 5.4, y: 0.12, z: Math.sin(a) * 4.2, sy: 0.6 }); }
    for (let i = 0; i < 7; i++) { const a = Math.random() * 6.28, r = Math.random() * 3; rocks.add(M.cyl(0.35, 0.35, 0.02, 10), 0x5fb15a, { x: Math.cos(a) * r * 1.3, y: 0.08, z: Math.sin(a) * r }); }
    pond.add(rocks.mesh(0.2));
    pond.position.set(-25, 0, 11); this.scene.add(pond); this.pond = pond;
    // ducks on the pond
    this.ducks = [];
    for (let i = 0; i < 3; i++) {
      const b = new M.B();
      b.add(M.sph(0.25, 10, 8), i === 2 ? 0xffe27a : 0xffffff, { y: 0.15, sz: 1.3 }); b.add(M.sph(0.15, 8, 6), i === 2 ? 0xffe27a : 0x2e7d4f, { y: 0.4, z: 0.22 }); b.add(M.cone(0.05, 0.14, 6), 0xff9a3c, { y: 0.38, z: 0.4, rx: Math.PI / 2 });
      const dk = b.mesh(0); dk.userData.ph = i * 2; this.scene.add(dk); this.ducks.push(dk);
    }
  }
  pens() {
    const fenceG = M.fenceGeo(2);
    for (const [key, p] of Object.entries(PENS)) {
      const w = p.x1 - p.x0, h = p.z1 - p.z0;
      const segs = [];
      for (let x = p.x0 + 1; x < p.x1; x += 2) { segs.push([x, p.z0, 0]); segs.push([x, p.z1, 0]); }
      for (let z = p.z0 + 1; z < p.z1; z += 2) { segs.push([p.x0, z, Math.PI / 2]); segs.push([p.x1, z, Math.PI / 2]); }
      const im = new THREE.InstancedMesh(fenceG, M.MAT, segs.length); const d = new THREE.Object3D();
      segs.forEach(([x, z, r], i) => { d.position.set(x, 0, z); d.rotation.y = r; d.updateMatrix(); im.setMatrixAt(i, d.matrix); });
      im.castShadow = true; this.scene.add(im);
      // pen floor tint
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.4, h - 0.4), new THREE.MeshStandardMaterial({ color: key === 'coop' ? 0xd9c48a : 0x9fd86a, roughness: 1, transparent: true, opacity: key === 'coop' ? 0.55 : 0.35 }));
      floor.rotation.x = -Math.PI / 2; floor.position.set((p.x0 + p.x1) / 2, 0.02, (p.z0 + p.z1) / 2); floor.receiveShadow = true; this.scene.add(floor);
      const tr = M.troughMesh(); tr.position.set(p.trough[0], 0, p.trough[1]); tr.rotation.y = p.trough[2]; this.scene.add(tr);
      this.tap(tr, 'trough', key); p.troughMesh = tr;
      p.cx = (p.x0 + p.x1) / 2; p.cz = (p.z0 + p.z1) / 2;
    }
    this.coop = M.coopMesh(); this.coop.position.set(-27.5, 0, -6.5); this.coop.rotation.y = Math.PI / 2; this.scene.add(this.coop); this.tap(this.coop, 'trough', 'coop');
    // shelter for cows/sheep
    const shed = new M.B();
    for (const sx of [-1.6, 1.6]) for (const sz of [-1, 1]) shed.add(M.cyl(0.1, 0.1, 2.2, 6), 0x8a5a36, { x: sx, y: 1.1, z: sz });
    shed.add(M.box(3.8, 0.18, 2.8), 0xd9443a, { y: 2.25, rx: 0.12 });
    shed.add(M.cyl(0.55, 0.55, 1.0, 12), 0xf2c552, { x: -0.8, y: 0.55, rz: Math.PI / 2 });
    for (const [x, z] of [[29, -9], [29, 9]]) { const s = shed.mesh(0.2); s.position.set(x, 0, z); s.rotation.y = -Math.PI / 2; this.scene.add(s); }
  }
  nature() {
    const d = new THREE.Object3D();
    // trees (individual meshes are fine: geometry is shared per variant)
    const variants = [M.treeMesh('oak', 1), M.treeMesh('oak', 2), M.treeMesh('pine', 3), M.treeMesh('pine', 4), M.treeMesh('blossom', 5)];
    const geos = variants.map(v => { const meshes = []; v.traverse(o => o.isMesh && meshes.push(o)); return meshes; });
    const placed = [];
    const tryTree = (x, z, s) => {
      if (blocked(x, z, 1.5) || Math.hypot(x + 25, z - 11) < 7) return;
      for (const p of placed) if ((p[0] - x) ** 2 + (p[1] - z) ** 2 < 9) return;
      placed.push([x, z, s]);
    };
    for (let i = 0; i < 1400 && placed.length < 230; i++) {
      const a = Math.random() * Math.PI * 2, r = 30 + Math.pow(Math.random(), 0.7) * 75;
      tryTree(Math.cos(a) * r * 1.15, Math.sin(a) * r, rand(0.9, 1.6));
    }
    // a few friendly trees near the farm
    [[-20, 8], [-18, -12], [18, -14.5], [-36, -3], [36, 4], [-14, 16], [14, 16], [24, 16], [-33, 14], [34, -16]].forEach(([x, z]) => placed.push([x, z, rand(1, 1.3)]));
    // instance per variant part
    const byVar = variants.map(() => []);
    placed.forEach((p, i) => byVar[(Math.abs(Math.floor(p[0] * 7 + p[1] * 3))) % variants.length].push(p));
    byVar.forEach((list, vi) => {
      for (const src of geos[vi]) {
        const im = new THREE.InstancedMesh(src.geometry, src.material, list.length);
        list.forEach(([x, z, s], i) => { d.position.set(x, groundHeight(x, z) - 0.05, z); d.rotation.set(0, x * 13.7, 0); d.scale.setScalar(s); d.updateMatrix(); im.setMatrixAt(i, d.matrix); });
        im.castShadow = true; im.receiveShadow = true; this.scene.add(im);
      }
    });
    // bushes, tufts, flowers
    const bushV = [M.bushMesh(1), M.bushMesh(2, 0x4fae3a), M.bushMesh(3, 0x66c04a)];
    bushV.forEach((bm, vi) => {
      const pts = []; for (let i = 0; i < 400 && pts.length < 45; i++) { const x = rand(-70, 70), z = rand(-55, 50); if (!blocked(x, z, 0.8)) pts.push([x, z]); }
      const im = new THREE.InstancedMesh(bm.geometry, bm.material, pts.length);
      pts.forEach(([x, z], i) => { d.position.set(x, groundHeight(x, z), z); d.rotation.set(0, i, 0); d.scale.setScalar(rand(0.7, 1.3)); d.updateMatrix(); im.setMatrixAt(i, d.matrix); });
      im.castShadow = true; this.scene.add(im);
    });
    const tuft = M.grassTuftGeo();
    const tpts = []; for (let i = 0; i < 4000 && tpts.length < 1500; i++) { const x = rand(-80, 80), z = rand(-60, 55); if (!blocked(x, z, -0.5) && Math.abs(z - ROAD_Z) > 2.5) tpts.push([x, z]); }
    const tim = new THREE.InstancedMesh(tuft, M.MAT, tpts.length);
    tpts.forEach(([x, z], i) => { d.position.set(x, groundHeight(x, z), z); d.rotation.set(0, i * 2.1, 0); d.scale.setScalar(rand(0.8, 1.6)); d.updateMatrix(); tim.setMatrixAt(i, d.matrix); });
    this.scene.add(tim);
    const fcols = [0xff6f91, 0xffffff, 0xffd54f, 0xb388ff, 0xff8a65];
    fcols.forEach((c, ci) => {
      const pts = []; for (let i = 0; i < 2000 && pts.length < 120; i++) { const cx = rand(-60, 60), cz = rand(-45, 45); if (blocked(cx, cz, 0.3)) continue; for (let k = 0; k < 6; k++) pts.push([cx + rand(-1, 1), cz + rand(-1, 1)]); }
      const im = new THREE.InstancedMesh(M.flowerGeo(c), M.MAT, pts.length);
      pts.forEach(([x, z], i) => { d.position.set(x, groundHeight(x, z), z); d.rotation.set(0, i, 0); d.scale.setScalar(rand(0.9, 1.5)); d.updateMatrix(); im.setMatrixAt(i, d.matrix); });
      this.scene.add(im);
    });
    // flower beds along the house front + fence line
    // a little life inside the pens
    for (const [k, p] of Object.entries(PENS)) {
      const pts = []; for (let i = 0; i < 70; i++) pts.push([rand(p.x0 + 0.8, p.x1 - 0.8), rand(p.z0 + 0.8, p.z1 - 0.8)]);
      const im = new THREE.InstancedMesh(tuft, M.MAT, pts.length);
      pts.forEach(([x, z], i) => { d.position.set(x, 0, z); d.rotation.set(0, i, 0); d.scale.setScalar(rand(0.9, 1.7)); d.updateMatrix(); im.setMatrixAt(i, d.matrix); });
      this.scene.add(im);
      if (k !== 'coop') { const fl = new THREE.InstancedMesh(M.flowerGeo(k === 'cows' ? 0xffffff : 0xffd54f), M.MAT, 30); for (let i = 0; i < 30; i++) { d.position.set(rand(p.x0 + 1, p.x1 - 1), 0, rand(p.z0 + 1, p.z1 - 1)); d.scale.setScalar(1.3); d.updateMatrix(); fl.setMatrixAt(i, d.matrix); } this.scene.add(fl); }
    }
    for (const x of [-15, -8, 5, 9]) { const f = M.decorMesh('flowers'); f.position.set(x, 0, -15.6); f.scale.setScalar(0.8); this.scene.add(f); }
  }
  weather() {
    const n = 900, pos = new Float32Array(n * 6);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.rainLines = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0 }));
    this.rainLines.frustumCulled = false; this.scene.add(this.rainLines);
    this.rainDrops = Array.from({ length: n }, () => [rand(-40, 40), rand(0, 30), rand(-35, 35)]);
    // rainbow (appears after rain)
    const rg = new THREE.TorusGeometry(40, 1.6, 8, 64, Math.PI);
    const rcol = new Float32Array(rg.attributes.position.count * 3); const rc = [0xff5252, 0xffa040, 0xffe14d, 0x6bd35b, 0x4fa8ff, 0x9c6bff].map(c => new THREE.Color(c));
    const rp = rg.attributes.position;
    for (let i = 0; i < rp.count; i++) { const rr = Math.hypot(rp.getX(i), rp.getY(i)); const t = clamp((rr - 38.4) / 3.2, 0, 0.999); const c = rc[Math.floor(t * 6)]; rcol[i * 3] = c.r; rcol[i * 3 + 1] = c.g; rcol[i * 3 + 2] = c.b; }
    rg.setAttribute('color', new THREE.BufferAttribute(rcol, 3));
    this.rainbow = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, depthWrite: false, fog: false }));
    this.rainbow.position.set(-10, -6, -95); this.scene.add(this.rainbow);
    this.rainbowT = 0; this.nextRain = 150 + Math.random() * 90; this.rainLeft = 0;
  }
  life() {
    // fireflies (night only)
    const fn = 160, fpos = new Float32Array(fn * 3);
    const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
    this.fireflies = new THREE.Points(fg, new THREE.PointsMaterial({ color: 0xfff27a, size: 0.45, map: G.fx.dot, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.fireflies.frustumCulled = false; this.scene.add(this.fireflies);
    this.ffSeeds = Array.from({ length: fn }, () => [rand(-34, 34), rand(0.5, 3), rand(-24, 22), Math.random() * 6]);
    // butterflies
    this.butterflies = [];
    const wing = new THREE.PlaneGeometry(0.22, 0.16); wing.translate(0.11, 0, 0);
    const cols = [0xffb3d1, 0xffe27a, 0xb8e0ff, 0xffffff];
    for (let i = 0; i < 14; i++) {
      const m = new THREE.MeshStandardMaterial({ color: cols[i % 4], side: THREE.DoubleSide, emissive: cols[i % 4], emissiveIntensity: 0.2 });
      const b = new THREE.Group(); const l = new THREE.Mesh(wing, m), r = new THREE.Mesh(wing, m); r.scale.x = -1; b.add(l, r);
      b.userData = { l, r, home: new THREE.Vector3(rand(-18, 18), 1.2, rand(-13, 13)), ph: Math.random() * 10 };
      this.scene.add(b); this.butterflies.push(b);
    }
    // birds
    this.birds = new THREE.Group();
    const bg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.6, 0.2, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.6, 0.2, 0)]);
    for (let i = 0; i < 5; i++) { const l = new THREE.Line(bg, new THREE.LineBasicMaterial({ color: 0x4a4a5a })); l.position.set(-i * 1.2, i % 2 * 0.5, i * 1.1); this.birds.add(l); }
    this.birds.position.set(-150, 26, -40); this.scene.add(this.birds);
    // chimney smoke puffs
    const tex = M.emojiTexture('☁️', false);
    for (let i = 0; i < 6; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false })); s.userData.ph = i / 6; this.scene.add(s); this.smoke.push(s); }
  }

  /* ---------------- day cycle ---------------- */
  setTime(t) {
    // keyframes across the day (0 morning … 0.5 sunset … 0.75 night … 1 morning)
    const K = [
      { t: 0.0, top: 0x7cc4ff, bot: 0xffe6c9, sun: 0xffe0b8, si: 2.1, hemi: 1.15, fog: 0xffe8d4 },
      { t: 0.2, top: 0x4aa8ff, bot: 0xd8f1ff, sun: 0xfff4dc, si: 2.7, hemi: 1.3, fog: 0xd2efff },
      { t: 0.42, top: 0x5aa0f0, bot: 0xffe1b0, sun: 0xffd08a, si: 2.4, hemi: 1.2, fog: 0xffe4c4 },
      { t: 0.55, top: 0x6f6ccc, bot: 0xffa98a, sun: 0xff9a6a, si: 1.6, hemi: 1.0, fog: 0xf5b3a0 },
      { t: 0.68, top: 0x1d2b5e, bot: 0x4e5fa8, sun: 0x9db4ff, si: 0.7, hemi: 0.75, fog: 0x3c4c8a },
      { t: 0.86, top: 0x1d2b5e, bot: 0x4e5fa8, sun: 0x9db4ff, si: 0.7, hemi: 0.75, fog: 0x3c4c8a },
      { t: 1.0, top: 0x7cc4ff, bot: 0xffe6c9, sun: 0xffe0b8, si: 2.1, hemi: 1.15, fog: 0xffe8d4 },
    ];
    let i = 0; while (i < K.length - 2 && t > K[i + 1].t) i++;
    const a = K[i], b = K[i + 1], f = clamp((t - a.t) / (b.t - a.t), 0, 1);
    const C = (x, y) => new THREE.Color(x).lerp(new THREE.Color(y), f);
    const rainDim = 1 - G.rain * 0.35;
    this.skyU.top.value.copy(C(a.top, b.top)).lerp(new THREE.Color(0x8a9bb0), G.rain * 0.6);
    this.skyU.bot.value.copy(C(a.bot, b.bot)).lerp(new THREE.Color(0xc5ced8), G.rain * 0.6);
    this.sun.color.copy(C(a.sun, b.sun)); this.sun.intensity = lerp(a.si, b.si, f) * rainDim;
    this.hemi.intensity = lerp(a.hemi, b.hemi, f) * (1 - G.rain * 0.15);
    this.scene.fog.color.copy(C(a.fog, b.fog)).lerp(new THREE.Color(0xc5ced8), G.rain * 0.5);
    // sun arc: east → overhead → west; at night it becomes a soft moon light from above
    const night = t > 0.6 && t < 0.92;
    const ang = night ? 0.9 : clamp(t / 0.6, 0, 1) * Math.PI;
    const el = night ? 1.0 : 0.35 + Math.sin(ang) * 0.75;
    this.sun.position.set(Math.cos(ang) * 50, Math.sin(el) * 60 + 10, 30 - Math.sin(ang) * 10);
    this.night = clamp((t - 0.55) / 0.08, 0, 1) * clamp((0.95 - t) / 0.06, 0, 1);
    for (const l of this.lamps) { l.material.emissiveIntensity = 0.15 + this.night * 2.2; }
    M.GLOW_MAT.emissiveIntensity = 0.15 + this.night * 2.2;
    this.cloudsDim = 1 - this.night * 0.6;
    this.hemi.color.set(0xdff2ff).lerp(new THREE.Color(0x7d8cff), this.night);
    this.hemi.groundColor.set(0x9fc96b).lerp(new THREE.Color(0x2e3d6b), this.night);
    for (const h of this.halos) h.material.opacity = this.night * 0.95;
    if (this.fireflies) this.fireflies.material.opacity = this.night * 0.9;
  }

  update(dt, t) {
    this.skyMesh.position.copy(G.camera.position);
    for (const c of this.clouds) { c.position.x += c.userData.v * dt; if (c.position.x > 150) c.position.x = -150; c.material.emissiveIntensity = 0.35 * this.cloudsDim; }
    if (this.mill.userData.blades) this.mill.userData.blades.rotation.z += dt * 0.7;
    // ducks paddle around the pond
    for (const dk of this.ducks) { const ph = dk.userData.ph + t * 0.25; dk.position.set(-25 + Math.cos(ph) * 3.5, 0.05 + Math.sin(t * 2 + ph) * 0.03, 11 + Math.sin(ph * 1.3) * 2.4); dk.rotation.y = Math.atan2(-Math.sin(ph) * 3.5, Math.cos(ph * 1.3) * 1.3 * 2.4); }
    // butterflies
    for (const b of this.butterflies) { const u = b.userData, tt = t * 0.8 + u.ph; b.position.set(u.home.x + Math.sin(tt * 0.7) * 3, u.home.y + Math.sin(tt * 1.7) * 0.4, u.home.z + Math.cos(tt * 0.5) * 3); b.rotation.y = tt * 0.7; const f = Math.sin(t * 16 + u.ph) * 1.1; u.l.rotation.y = f; u.r.rotation.y = -f; b.visible = this.night < 0.5 && G.rain < 0.5; }
    if (this.night > 0.01) { const fp = this.fireflies.geometry.attributes.position; this.ffSeeds.forEach(([x, y, z, ph], i) => fp.setXYZ(i, x + Math.sin(t * 0.4 + ph) * 1.5, y + Math.sin(t * 1.2 + ph * 2) * 0.4, z + Math.cos(t * 0.3 + ph) * 1.5)); fp.needsUpdate = true; }
    // birds fly by now and then
    this.birds.position.x += dt * 9; if (this.birds.position.x > 160) { this.birds.position.set(-160, rand(22, 32), rand(-60, 0)); }
    this.birds.children.forEach((l, i) => l.scale.y = 1 + Math.sin(t * 8 + i) * 0.5);
    // chimney smoke
    const ch = new THREE.Vector3(-11.5 + 1.4, 5.6, -20 - 0.8);
    for (const s of this.smoke) { const k = (t * 0.25 + s.userData.ph) % 1; s.position.set(ch.x + k * 1.5, ch.y + k * 3, ch.z - k * 0.6); s.scale.setScalar(0.5 + k * 1.4); s.material.opacity = Math.sin(k * Math.PI) * 0.55; }
    // truck delivery animation
    this.updateTruck(dt);
    // weather
    this.updateRain(dt);
  }
  sendTruck() {
    const tk = this.truck; if (tk.userData.state !== 'idle') return;
    tk.userData.state = 'out'; tk.userData.t = 0;
  }
  updateTruck(dt) {
    const tk = this.truck, u = tk.userData;
    if (u.state === 'idle') return;
    u.t += dt;
    if (u.state === 'out') { tk.position.x += dt * Math.min(16, 2 + u.t * 6); if (tk.position.x > 110) { u.state = 'away'; u.t = 0; } }
    else if (u.state === 'away') { if (u.t > 4) { u.state = 'back'; tk.position.x = -110; } }
    else if (u.state === 'back') { const dx = u.home.x - tk.position.x; tk.position.x += Math.min(dx, dt * Math.max(2.5, Math.min(16, dx * 0.8))); if (dx < 0.02) { tk.position.x = u.home.x; u.state = 'idle'; } }
  }
  startRain(sec = 25) { this.rainLeft = sec; }
  updateRain(dt) {
    if (G.mode === 'play') this.nextRain -= dt;
    if (this.nextRain < 0 && this.rainLeft <= 0) { this.startRain(22 + Math.random() * 12); this.nextRain = 200 + Math.random() * 140; G.ui?.toast('🌧️ A gentle rain', 'All your crops are being watered!'); }
    this.rainLeft -= dt;
    const target = this.rainLeft > 0 ? 1 : 0;
    const was = G.rain;
    G.rain += (target - G.rain) * Math.min(1, dt * 0.6);
    if (was > 0.5 && G.rain <= 0.5) this.rainbowT = 22;
    this.rainbowT -= dt;
    this.rainbow.material.opacity = clamp(Math.min(this.rainbowT, 22 - this.rainbowT) / 4, 0, 0.55) * (1 - this.night);
    this.rainLines.material.opacity = G.rain * 0.55;
    if (G.rain > 0.02) {
      const c = G.cam.target, pos = this.rainLines.geometry.attributes.position.array;
      this.rainDrops.forEach((d, i) => {
        d[1] -= dt * 28; if (d[1] < 0) { d[1] = 30; d[0] = rand(-40, 40); d[2] = rand(-35, 35); }
        const x = c.x + d[0], z = c.z + d[2];
        pos[i * 6] = x; pos[i * 6 + 1] = d[1]; pos[i * 6 + 2] = z; pos[i * 6 + 3] = x + 0.08; pos[i * 6 + 4] = d[1] - 0.7; pos[i * 6 + 5] = z;
      });
      this.rainLines.geometry.attributes.position.needsUpdate = true;
    }
  }
}
