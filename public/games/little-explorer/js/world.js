// World construction: terrain, sky, lighting, village, park, pond, forest, garden, player room, GLB landmarks.
import * as THREE from 'three';
import { mergeGeometries } from './lib/addons/utils/BufferGeometryUtils.js';
import { G, terrainHeight, addCircle, addBox, srand, srange, smooth, clamp, lerp, POND, WATER_Y } from './state.js';

export const LOC = {
  square: { x: 0, z: 0 },
  house: { x: -19, z: 4 },
  signpost: { x: 2.2, z: -13 },
  park: { x: 22, z: -10 },
  swing: { x: 15, z: -15 },
  slide: { x: 22, z: -18 },
  tramp: { x: 29, z: -12 },
  ball: { x: 24, z: -5 },
  goal: { x: 32, z: -3 },
  bike: { x: 10.5, z: -5.5 },
  scooter: { x: 13, z: -2.5 },
  skate: { x: 6, z: -8.5 },
  kite: { x: 15, z: -28 },
  pond: POND,
  dock: { x0: 20.2, x1: 26.2, z: 21 },
  tower: { x: 42, z: -38 },
  castle: { x: 0, z: -68 },
  guardian: { x: 10, z: -47 },
  garden: { x: -52, z: -54, r: 10 },
  gate: null,     // computed
  floating: { x: -57, z: -60 },
  wizard: { x: -57, z: -59 },
  stall: { x: 7.5, z: 7.5 },
  room: { x: 500, z: 500 },
};
const gdx = -43 - LOC.garden.x, gdz = -42 - LOC.garden.z, gl = Math.hypot(gdx, gdz);
LOC.gateDir = { x: gdx / gl, z: gdz / gl };
LOC.gate = { x: LOC.garden.x + LOC.gateDir.x * LOC.garden.r, z: LOC.garden.z + LOC.gateDir.z * LOC.garden.r };

const PATHS = [
  { w: 1.9, pts: [[0, -8.5], [0.5, -13], [0, -24], [-1, -36], [0, -47]] },                       // north to castle
  { w: 1.6, pts: [[0.5, -13], [-8, -17], [-17, -15.5], [-26, -21], [-30, -30], [-38, -34], [LOC.gate.x + LOC.gateDir.x * 2.5, LOC.gate.z + LOC.gateDir.z * 2.5]] }, // forest
  { w: 1.8, pts: [[8.5, -3], [14, -6.5], [20, -9]] },                                            // park
  { w: 1.7, pts: [[7, 5], [14, 11], [19.5, 17.5]] },                                              // pond
  { w: 1.7, pts: [[-8.5, 2.5], [-14, 4]] },                                                       // house
  { w: 1.4, pts: [[24, -18], [31, -25], [37, -32], [41, -35.5]] },                               // tower
  { w: 1.4, pts: [[0, 8.5], [-3, 16], [-8, 24]] },                                                // south stroll
];
const SEGS = [];
for (const p of PATHS) for (let i = 0; i < p.pts.length - 1; i++) SEGS.push({ a: p.pts[i], b: p.pts[i + 1], w: p.w });
export function pathDist(x, z) {
  let best = 1e9, w = 1;
  for (const s of SEGS) {
    const [ax, az] = s.a, [bx, bz] = s.b;
    const vx = bx - ax, vz = bz - az; const t = clamp(((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz), 0, 1);
    const d = Math.hypot(x - ax - vx * t, z - az - vz * t) - s.w;
    if (d < best) { best = d; w = s.w; }
  }
  return best;
}
// regions where decorative scatter should not go
const CLEAR = [
  { x: 0, z: 0, r: 12 }, { x: LOC.house.x, z: LOC.house.z, r: 7.5 }, { x: 21, z: -10, r: 13.5 },
  { x: POND.x, z: POND.z, r: POND.r + 1 }, { x: LOC.tower.x, z: LOC.tower.z, r: 6 }, { x: 0, z: -68, r: 17 },
  { x: LOC.garden.x, z: LOC.garden.z, r: LOC.garden.r + 2.5 }, { x: LOC.kite.x, z: LOC.kite.z, r: 6 },
  { x: LOC.guardian.x, z: LOC.guardian.z, r: 3.5 },
];
const isClear = (x, z, pad = 0) => CLEAR.some(c => (x - c.x) ** 2 + (z - c.z) ** 2 < (c.r + pad) ** 2);
export const inForest = (x, z) => x < -8 && z < -8 && x > -70 && z > -62 && Math.hypot(x, z) < 80;
export const forestDepth = (x, z) => clamp((Math.hypot(x + 8, z + 12) - 8) / 38, 0, 1);

/* ------------------------------------------------------------------ */
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...o });
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
function glowTex() {
  return canvasTex(64, 64, (g, w) => {
    const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.3, 'rgba(255,255,255,.6)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, w);
  });
}
function shadowAll(o, cast = true, recv = true) { o.traverse(m => { if (m.isMesh) { m.castShadow = cast; m.receiveShadow = recv; } }); return o; }
const H = terrainHeight;

export class World {
  constructor() {
    this.scene = G.scene;
    this.glow = glowTex();
    this.lamps = []; this.nightGlows = []; this.animated = [];
    this.roomFloor = 0;
  }
  build() {
    this.buildLights();
    this.buildSky();
    this.buildTerrain();
    this.buildWater();
    this.buildScatter();
    this.buildSquare();
    this.buildPark();
    this.buildPond();
    this.buildForestAndGarden();
    this.buildLandmarks();
    this.buildRoom();
    this.buildAmbient();
  }

  /* ---------------- lights + sky ---------------- */
  buildLights() {
    const hemi = new THREE.HemisphereLight(0xcfe9ff, 0x8fbf6a, 1.05);
    this.scene.add(hemi); this.hemi = hemi;
    const sun = new THREE.DirectionalLight(0xfff3dd, 2.6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera; sc.left = -38; sc.right = 38; sc.top = 38; sc.bottom = -38; sc.near = 1; sc.far = 160;
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04;
    this.scene.add(sun); this.scene.add(sun.target); this.sun = sun;
    this.scene.fog = new THREE.Fog(0xcfeaff, 70, 190);
  }
  buildSky() {
    const u = { top: { value: new THREE.Color(0x5fb4ff) }, mid: { value: new THREE.Color(0xbfe4ff) }, bot: { value: new THREE.Color(0xfff1e0) }, sunDir: { value: new THREE.Vector3(0, 1, 0) }, sunCol: { value: new THREE.Color(0xfff6d8) } };
    this.skyU = u;
    const m = new THREE.ShaderMaterial({
      uniforms: u, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `uniform vec3 top,mid,bot,sunDir,sunCol; varying vec3 vP;
        void main(){ float y=vP.y; vec3 c = y>0.? mix(mid,top,pow(clamp(y,0.,1.),.6)) : mix(mid,bot,clamp(-y*4.,0.,1.));
          c = mix(c, bot, (1.-smoothstep(0.,.18,abs(y)))*.55);
          float s = max(dot(normalize(vP),normalize(sunDir)),0.); c += sunCol*(pow(s,600.)*2.5 + pow(s,12.)*.35);
          gl_FragColor = vec4(c,1.); }`,
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), m);
    sky.renderOrder = -1; sky.frustumCulled = false;
    this.scene.add(sky); this.sky = sky;
    // environment map for reflections (regenerated as the day warms up)
    this.pmrem = new THREE.PMREMGenerator(G.renderer);
    this.envScene = new THREE.Scene();
    this.envScene.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), m));
    this.refreshEnv();
    // clouds
    this.clouds = [];
    const cm = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.25, fog: false });
    this.cloudMat = cm;
    for (let i = 0; i < 16; i++) {
      const parts = [];
      const n = 4 + Math.floor(srand() * 4);
      for (let j = 0; j < n; j++) {
        const g = new THREE.IcosahedronGeometry(srange(5, 9), 1);
        g.scale(1, 0.6, 1); g.translate(j * 6 - n * 3 + srange(-2, 2), srange(-1, 2), srange(-3, 3));
        parts.push(g);
      }
      const cl = new THREE.Mesh(mergeGeometries(parts), cm);
      const a = srand() * Math.PI * 2, r = srange(120, 230);
      cl.position.set(Math.cos(a) * r, srange(55, 90), Math.sin(a) * r);
      cl.userData.speed = srange(0.6, 1.4);
      this.scene.add(cl); this.clouds.push(cl);
    }
  }
  refreshEnv() {
    const rt = this.pmrem.fromScene(this.envScene, 0.02);
    if (this.envRT) this.envRT.dispose();
    this.envRT = rt; this.scene.environment = rt.texture;
    this.scene.environmentIntensity = 0.55;
  }

  /* ---------------- terrain ---------------- */
  buildTerrain() {
    const SIZE = 230, SEG = 210;
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position, col = new Float32Array(pos.count * 3);
    const cA = new THREE.Color(0x8fd46a), cB = new THREE.Color(0x6cbf58), cPath = new THREE.Color(0xe8d2a6), cPlaza = new THREE.Color(0xc7a888),
      cSand = new THREE.Color(0xeedfb5), cForest = new THREE.Color(0x4f9e56), cMagic = new THREE.Color(0x6fc9a6), cRim = new THREE.Color(0x7cc35e), tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const y = H(x, z); pos.setY(i, y);
      const n = Math.sin(x * 0.21) * Math.cos(z * 0.17) * 0.5 + Math.sin(x * 0.043 + z * 0.061) * 0.5;
      tmp.copy(cA).lerp(cB, n * 0.5 + 0.5);
      if (inForest(x, z)) { const f = forestDepth(x, z); tmp.lerp(cForest, 0.35 + f * 0.3); tmp.lerp(cMagic, Math.max(0, f - 0.6) * 0.8); }
      const gd = Math.hypot(x - LOC.garden.x, z - LOC.garden.z);
      if (gd < LOC.garden.r + 1) tmp.lerp(cMagic, 0.55);
      const dp = Math.hypot(x - POND.x, z - POND.z);
      if (dp < POND.r + 2.2) tmp.lerp(cSand, smooth(POND.r + 2.2, POND.r - 0.5, dp));
      const r = Math.hypot(x, z);
      if (r < 10.5) tmp.lerp(cPlaza, smooth(10.5, 9.6, r));
      const pd = pathDist(x, z);
      if (pd < 0.5) tmp.lerp(cPath, smooth(0.5, -0.3, pd) * 0.95);
      if (r > 82) tmp.lerp(cRim, 0.5);
      col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.computeVertexNormals();
    const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 });
    const t = new THREE.Mesh(geo, m);
    t.receiveShadow = true;
    this.scene.add(t); this.terrain = t;
    // plaza tiles ring
    const ring = new THREE.Mesh(new THREE.RingGeometry(9.6, 10.3, 64), mat(0xc9b9a6));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.03; ring.receiveShadow = true; this.scene.add(ring);
  }
  buildWater() {
    const nt = canvasTex(256, 256, (g, w) => {
      const img = g.createImageData(w, w);
      for (let y = 0; y < w; y++) for (let x = 0; x < w; x++) {
        const a = Math.sin(x * 0.098 + Math.sin(y * 0.05) * 2) * 0.5 + Math.sin(y * 0.12 + x * 0.03) * 0.5;
        const b = Math.cos(y * 0.098 + Math.sin(x * 0.07) * 2) * 0.5;
        const i = (y * w + x) * 4; img.data[i] = 128 + a * 40; img.data[i + 1] = 128 + b * 40; img.data[i + 2] = 255; img.data[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
    });
    nt.colorSpace = THREE.NoColorSpace; nt.wrapS = nt.wrapT = THREE.RepeatWrapping; nt.repeat.set(4, 4);
    const wm = new THREE.MeshStandardMaterial({ color: 0x5fc3e8, roughness: 0.08, metalness: 0.2, transparent: true, opacity: 0.82, normalMap: nt, normalScale: new THREE.Vector2(0.35, 0.35) });
    const w = new THREE.Mesh(new THREE.CircleGeometry(POND.r + 1.6, 48), wm);
    w.rotation.x = -Math.PI / 2; w.position.set(POND.x, WATER_Y, POND.z); w.receiveShadow = true;
    this.scene.add(w); this.water = w;
    G.updaters.push((dt, t) => { nt.offset.set(t * 0.015, t * 0.01); });
  }

  /* ---------------- instanced scenery ---------------- */
  buildScatter() {
    const dummy = new THREE.Object3D();
    const trees = [];   // {x,z,s,type,tint}
    const tryTree = (x, z, type, s) => {
      if (isClear(x, z, 1.5) || pathDist(x, z) < 1.6 || H(x, z) < -0.2) return false;
      for (const t of trees) if ((t.x - x) ** 2 + (t.z - z) ** 2 < 9) return false;
      trees.push({ x, z, s, type }); return true;
    };
    // forest (dense, winding path kept clear)
    for (let i = 0; i < 900 && trees.length < 170; i++) {
      const x = srange(-70, -8), z = srange(-60, -8);
      if (!inForest(x, z)) continue;
      const f = forestDepth(x, z);
      const type = f > 0.62 ? (srand() < 0.5 ? 'blossom' : 'round') : (srand() < 0.45 ? 'pine' : 'round');
      tryTree(x, z, type, srange(0.85, 1.35));
    }
    // village + park edges
    const hand = [[-8, 12], [8, -12], [-11, -7], [12, 12], [-4, 18], [5, 20], [-15, 16], [-24, -3], [-27, 12], [36, 6], [40, 0], [34, -18], [10, -22], [20, -32], [28, -36], [16, 32], [30, 40], [44, 20], [46, 30], [-12, 30], [-34, 22], [-40, 5], [-38, 30], [52, -10], [50, -24], [8, 38], [-20, 42], [24, 44]];
    for (const [x, z] of hand) tryTree(x, z, srand() < 0.3 ? 'pine' : 'round', srange(0.9, 1.3));
    // world rim ring (hides edge)
    for (let i = 0; i < 700; i++) {
      const a = srand() * Math.PI * 2, r = srange(76, 104);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      tryTree(x, z, srand() < 0.55 ? 'pine' : 'round', srange(1.1, 1.8));
    }
    // mid scatter
    for (let i = 0; i < 400; i++) {
      const x = srange(-75, 75), z = srange(-75, 75);
      if (Math.hypot(x, z) > 76 || inForest(x, z)) continue;
      if (srand() < 0.75) continue;
      tryTree(x, z, srand() < 0.35 ? 'pine' : 'round', srange(0.9, 1.3));
    }
    this.trees = trees;
    // appletree next to house (for Red Apple)
    // geometry
    const trunkG = new THREE.CylinderGeometry(0.22, 0.34, 2.6, 7); trunkG.translate(0, 1.3, 0);
    const blobG = new THREE.IcosahedronGeometry(1.6, 1); blobG.scale(1, 0.9, 1); blobG.translate(0, 3.6, 0);
    const blob2 = new THREE.IcosahedronGeometry(1.15, 1); blob2.translate(0.9, 3.0, 0.5);
    const blob3 = new THREE.IcosahedronGeometry(1.05, 1); blob3.translate(-0.8, 4.4, -0.3);
    const canopyG = mergeGeometries([blobG, blob2, blob3]);
    const pineG = mergeGeometries([
      (() => { const g = new THREE.ConeGeometry(1.9, 2.6, 8); g.translate(0, 2.4, 0); return g; })(),
      (() => { const g = new THREE.ConeGeometry(1.5, 2.2, 8); g.translate(0, 3.7, 0); return g; })(),
      (() => { const g = new THREE.ConeGeometry(1.0, 1.8, 8); g.translate(0, 4.9, 0); return g; })(),
    ]);
    const trunkM = mat(0x8a5a3c), leafM = new THREE.MeshStandardMaterial({ roughness: 0.8, flatShading: true }), pineM = new THREE.MeshStandardMaterial({ roughness: 0.8, flatShading: true });
    const nRound = trees.filter(t => t.type !== 'pine').length, nPine = trees.length - nRound;
    const trunks = new THREE.InstancedMesh(trunkG, trunkM, trees.length);
    const canopies = new THREE.InstancedMesh(canopyG, leafM, nRound);
    const pines = new THREE.InstancedMesh(pineG, pineM, nPine);
    let ir = 0, ip = 0; const c = new THREE.Color();
    trees.forEach((t, i) => {
      const y = H(t.x, t.z) - 0.1;
      dummy.position.set(t.x, y, t.z); dummy.rotation.set(0, srand() * 6.28, 0); dummy.scale.setScalar(t.s); dummy.updateMatrix();
      trunks.setMatrixAt(i, dummy.matrix);
      if (t.type === 'pine') { pines.setMatrixAt(ip, dummy.matrix); pines.setColorAt(ip++, c.setHSL(0.36 + srand() * 0.05, 0.45, 0.32 + srand() * 0.08)); }
      else {
        canopies.setMatrixAt(ir, dummy.matrix);
        if (t.type === 'blossom') c.setHSL(0.93 + srand() * 0.05, 0.7, 0.78 + srand() * 0.06);
        else c.setHSL(0.24 + srand() * 0.08, 0.55, 0.45 + srand() * 0.1);
        canopies.setColorAt(ir++, c);
      }
      if (Math.hypot(t.x, t.z) < 88) {
        addCircle(t.x, t.z, 0.42 * t.s, y + 3, y - 1, { noCam: true, tree: true });
        addCircle(t.x, t.z, (t.type === 'pine' ? 1.3 : 1.6) * t.s, y + 5.6 * t.s, y + 2.3 * t.s, { ghost: true, camOnly: true, walk: false });
      }
    });
    [trunks, canopies, pines].forEach(m => { m.castShadow = true; m.receiveShadow = true; this.scene.add(m); });

    // bushes
    const bushG = new THREE.IcosahedronGeometry(0.8, 1); bushG.scale(1, 0.75, 1); bushG.translate(0, 0.45, 0);
    const bushPts = [];
    for (let i = 0; i < 260; i++) {
      const x = srange(-78, 78), z = srange(-78, 78);
      if (Math.hypot(x, z) > 80 || isClear(x, z, 0.3) || pathDist(x, z) < 0.9 || H(x, z) < -0.3) continue;
      bushPts.push([x, z]);
    }
    const bushes = new THREE.InstancedMesh(bushG, new THREE.MeshStandardMaterial({ roughness: 0.85, flatShading: true }), bushPts.length);
    bushPts.forEach(([x, z], i) => { dummy.position.set(x, H(x, z), z); dummy.rotation.set(0, srand() * 6, 0); dummy.scale.setScalar(srange(0.6, 1.3)); dummy.updateMatrix(); bushes.setMatrixAt(i, dummy.matrix); bushes.setColorAt(i, c.setHSL(0.27 + srand() * 0.07, 0.5, 0.35 + srand() * 0.1)); });
    bushes.castShadow = true; bushes.receiveShadow = true; this.scene.add(bushes);

    // grass tufts
    const blade = new THREE.ConeGeometry(0.06, 0.45, 3); blade.translate(0, 0.22, 0);
    const tuftG = mergeGeometries([0, 1, 2, 3, 4].map(k => { const g = blade.clone(); g.rotateZ((k - 2) * 0.25); g.translate((k - 2) * 0.06, 0, (k % 2) * 0.05); return g; }));
    const tuftN = 5200;
    const tufts = new THREE.InstancedMesh(tuftG, new THREE.MeshStandardMaterial({ roughness: 1 }), tuftN);
    let n = 0;
    for (let i = 0; i < tuftN * 3 && n < tuftN; i++) {
      const x = srange(-80, 80), z = srange(-80, 80);
      const r = Math.hypot(x, z);
      if (r > 84 || r < 10.8 || pathDist(x, z) < 0.3 || H(x, z) < -0.35) continue;
      dummy.position.set(x, H(x, z), z); dummy.rotation.set(0, srand() * 6, 0); dummy.scale.setScalar(srange(0.7, 1.5)); dummy.updateMatrix();
      tufts.setMatrixAt(n, dummy.matrix); tufts.setColorAt(n++, c.setHSL(0.26 + srand() * 0.06, 0.55, 0.38 + srand() * 0.14));
    }
    tufts.count = n; tufts.receiveShadow = true; this.scene.add(tufts);

    // flowers
    const headG = new THREE.IcosahedronGeometry(0.11, 0); headG.translate(0, 0.34, 0);
    const stemG = new THREE.CylinderGeometry(0.012, 0.012, 0.34, 3); stemG.translate(0, 0.17, 0);
    const flowerN = 1600;
    const heads = new THREE.InstancedMesh(headG, new THREE.MeshStandardMaterial({ roughness: 0.6, emissive: 0x111111 }), flowerN);
    const stems = new THREE.InstancedMesh(stemG, mat(0x4f9a3f), flowerN);
    const palette = [0xff8fb8, 0xffffff, 0xffd66b, 0xb28dff, 0xff9f6b, 0x8fd3ff, 0xff6f91];
    n = 0; this.flowerSpots = [];
    const addFlower = (x, z, colr) => {
      if (n >= flowerN) return;
      dummy.position.set(x, H(x, z), z); dummy.rotation.set(0, srand() * 6, 0); dummy.scale.setScalar(srange(0.8, 1.4)); dummy.updateMatrix();
      heads.setMatrixAt(n, dummy.matrix); stems.setMatrixAt(n, dummy.matrix); heads.setColorAt(n++, c.set(colr));
    };
    // flower patches
    for (let p = 0; p < 70; p++) {
      const cx = srange(-70, 70), cz = srange(-70, 70);
      if (Math.hypot(cx, cz) > 76 || pathDist(cx, cz) < 1 || H(cx, cz) < -0.3 || (Math.hypot(cx, cz) < 11)) continue;
      const colr = palette[Math.floor(srand() * palette.length)];
      this.flowerSpots.push(new THREE.Vector3(cx, H(cx, cz) + 0.6, cz));
      for (let k = 0; k < 16; k++) { const x = cx + srange(-2, 2), z = cz + srange(-2, 2); if (pathDist(x, z) > 0.4) addFlower(x, z, colr); }
    }
    // flower beds around the plaza ring
    for (let k = 0; k < 220; k++) {
      const a = srand() * Math.PI * 2, r = srange(10.6, 12.2), x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (pathDist(x, z) > 0.5) addFlower(x, z, palette[k % palette.length]);
    }
    this.flowerSpots.push(new THREE.Vector3(0, 1, 11), new THREE.Vector3(-11, 1, 0));
    heads.count = stems.count = n; this.scene.add(heads, stems);

    // rocks
    const rockG = new THREE.DodecahedronGeometry(0.6, 0);
    const rockPts = [];
    for (let i = 0; i < 180; i++) {
      const x = srange(-80, 80), z = srange(-80, 80);
      if (Math.hypot(x, z) > 84 || isClear(x, z) || pathDist(x, z) < 0.8) continue;
      rockPts.push([x, z, srange(0.4, 1.4)]);
    }
    const rocks = new THREE.InstancedMesh(rockG, new THREE.MeshStandardMaterial({ roughness: 0.9, flatShading: true }), rockPts.length);
    rockPts.forEach(([x, z, s], i) => {
      dummy.position.set(x, H(x, z) + 0.1 * s, z); dummy.rotation.set(srand(), srand() * 6, srand()); dummy.scale.set(s, s * 0.7, s); dummy.updateMatrix();
      rocks.setMatrixAt(i, dummy.matrix); rocks.setColorAt(i, c.setHSL(0.08 + srand() * 0.05, 0.12, 0.62 + srand() * 0.12));
      if (s > 0.9) addCircle(x, z, 0.5 * s, H(x, z) + 0.45 * s, -50, { noCam: true });
    });
    rocks.castShadow = true; rocks.receiveShadow = true; this.scene.add(rocks);
  }

  /* ---------------- props ---------------- */
  bench(x, z, rot) {
    const g = new THREE.Group();
    const wood = mat(0xc98b58), iron = mat(0x5a4a5a);
    for (let i = 0; i < 3; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.07, 0.16), wood); s.position.set(0, 0.48, -0.2 + i * 0.2); g.add(s); }
    for (let i = 0; i < 2; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.05), wood); s.position.set(0, 0.72 + i * 0.2, -0.33); s.rotation.x = -0.15; g.add(s); }
    for (const sx of [-0.8, 0.8]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.6), iron); l.position.set(sx, 0.24, -0.05); g.add(l); }
    const y = H(x, z); g.position.set(x, y, z); g.rotation.y = rot;
    shadowAll(g); this.scene.add(g);
    addBox(x, z, 0.95, 0.35, rot, y + 0.55, y - 1, { noCam: true, walk: true });
    this.benches = this.benches || [];
    this.benches.push({ x, z, rot, y, obj: g });
    return g;
  }
  lamp(x, z) {
    const g = new THREE.Group();
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 3, 8), mat(0x4d3f5a)); post.position.y = 1.5; g.add(post);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.3, 6), mat(0x4d3f5a)); cap.position.y = 3.45; g.add(cap);
    const bulbM = new THREE.MeshStandardMaterial({ color: 0xfff2c4, emissive: 0xffc56b, emissiveIntensity: 0.1 });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), bulbM); bulb.position.y = 3.15; g.add(bulb);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glow, color: 0xffc56b, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.setScalar(2.4); halo.position.y = 3.15; g.add(halo);
    g.position.set(x, H(x, z), z); shadowAll(g, true, false); this.scene.add(g);
    addCircle(x, z, 0.14, H(x, z) + 3.3);
    this.lamps.push({ bulbM, halo });
  }
  fence(x0, z0, x1, z1) {
    const len = Math.hypot(x1 - x0, z1 - z0), n = Math.max(2, Math.round(len / 1.4));
    const wood = mat(0xf2e3cf);
    const parts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = lerp(x0, x1, t), z = lerp(z0, z1, t);
      const p = new THREE.BoxGeometry(0.12, 0.9, 0.12); p.translate(x, H(x, z) + 0.45, z); parts.push(p);
    }
    const g = mergeGeometries(parts);
    const m = new THREE.Mesh(g, wood); m.castShadow = true; this.scene.add(m);
    for (const hgt of [0.35, 0.7]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.08, 0.06), wood);
      const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
      rail.position.set(mx, H(mx, mz) + hgt, mz); rail.rotation.y = -Math.atan2(z1 - z0, x1 - x0); rail.castShadow = true; this.scene.add(rail);
    }
  }
  textSign(lines, w = 1.4, h = 0.4, bg = '#f6e2bf', fg = '#6b4a2e', font = 58) {
    const tex = canvasTex(512, Math.round(512 * h / w), (g, W, Hh) => {
      g.fillStyle = bg; g.fillRect(0, 0, W, Hh); g.strokeStyle = '#a57a4f'; g.lineWidth = 14; g.strokeRect(0, 0, W, Hh);
      g.fillStyle = fg; g.font = `700 ${font}px Fredoka, 'Segoe UI', sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
      lines.forEach((l, i) => g.fillText(l, W / 2, Hh / 2 + (i - (lines.length - 1) / 2) * font * 1.05));
    });
    const m = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
    const board = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), [mat(0xa57a4f), mat(0xa57a4f), mat(0xa57a4f), mat(0xa57a4f), m, m]);
    board.castShadow = true;
    return board;
  }

  buildSquare() {
    // fountain with floating magic crystal
    const f = new THREE.Group();
    const stone = mat(0xe9ddd0), stone2 = mat(0xcdbfb0);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.35, 0.8, 32, 1, true), stone); rim.position.y = 0.4; f.add(rim);
    const rimTop = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.2, 8, 40), stone2); rimTop.rotation.x = Math.PI / 2; rimTop.position.y = 0.82; f.add(rimTop);
    const bottom = new THREE.Mesh(new THREE.CircleGeometry(3.2, 32), stone2); bottom.rotation.x = -Math.PI / 2; bottom.position.y = 0.1; f.add(bottom);
    const fw = new THREE.Mesh(new THREE.CircleGeometry(3.05, 32), this.water ? this.water.material : mat(0x6cc4e6)); fw.rotation.x = -Math.PI / 2; fw.position.y = 0.62; f.add(fw);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 1.8, 12), stone); pillar.position.y = 1; f.add(pillar);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 0.5, 0.45, 20), stone2); bowl.position.y = 1.95; f.add(bowl);
    const crystalM = new THREE.MeshStandardMaterial({ color: 0xa8e6ff, emissive: 0x6fd0ff, emissiveIntensity: 1.1, roughness: 0.15, metalness: 0.1, flatShading: true, transparent: true, opacity: 0.92 });
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), crystalM); crystal.scale.y = 1.7; crystal.position.y = 3.2; f.add(crystal);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glow, color: 0x8fdcff, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })); halo.scale.setScalar(3.4); halo.position.y = 3.2; f.add(halo);
    shadowAll(f); crystal.castShadow = false;
    this.scene.add(f);
    addCircle(0, 0, 3.4, 0.9, -5);
    // water jets as particles
    const jets = this.particles(160, 0x9fe0ff, 0.22, 0.9);
    f.add(jets.points);
    G.updaters.push((dt, t) => {
      crystal.position.y = 3.2 + Math.sin(t * 1.6) * 0.18; crystal.rotation.y = t * 0.8;
      const p = jets.pos;
      for (let i = 0; i < jets.n; i++) {
        const ph = (t * 0.7 + i / jets.n) % 1, a = i * 2.399;
        const r = 0.4 + ph * 1.9;
        p[i * 3] = Math.cos(a) * r; p[i * 3 + 2] = Math.sin(a) * r; p[i * 3 + 1] = 2.1 + Math.sin(ph * Math.PI) * 0.9 - ph * 1.4;
      }
      jets.points.geometry.attributes.position.needsUpdate = true;
    });
    this.fountain = f;

    // benches + lamps around plaza
    [[0.5, 1], [2.2, 1], [3.8, 1], [5.4, 1]].forEach(([a]) => this.bench(Math.cos(a) * 7.3, Math.sin(a) * 7.3, -a - Math.PI / 2));
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.26; this.lamp(Math.cos(a) * 9.4, Math.sin(a) * 9.4); }
    this.lamp(-2, -30); this.lamp(2, -20); this.lamp(-20, -17); this.lamp(12, 10); this.lamp(-12, 5.5); this.lamp(17, -7);

    // ice cream stall
    const s = new THREE.Group();
    const counter = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.05, 1.2), mat(0xfff0f5)); counter.position.y = 0.52; s.add(counter);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 1.3), mat(0xff8fb8)); trim.position.y = 1.08; s.add(trim);
    for (const sx of [-1.2, 1.2]) for (const sz of [-0.5, 0.5]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 6), mat(0xffffff)); p.position.set(sx, 1.2, sz); s.add(p); }
    const stripes = canvasTex(256, 64, (g, w, h) => { for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#ff8fb8'; g.fillRect(i * w / 8, 0, w / 8, h); } });
    const canopy = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 2.0, 0.7, 8, 1, true), new THREE.MeshStandardMaterial({ map: stripes, side: THREE.DoubleSide, roughness: 0.8 }));
    canopy.scale.z = 0.6; canopy.position.y = 2.65; s.add(canopy);
    const sign = this.textSign(['ICE CREAM'], 1.8, 0.45, '#fff6fa', '#e8618f', 70); sign.position.set(0, 0.62, 0.62); s.add(sign);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 12), mat(0xe8b26b)); cone.rotation.x = Math.PI; cone.position.y = 3.35; s.add(cone);
    const scoop = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), mat(0xffb3d1)); scoop.position.y = 3.85; s.add(scoop);
    const scoop2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), mat(0xfff3c4)); scoop2.position.y = 4.25; s.add(scoop2);
    // tubs of ice cream on counter
    [0xffb3d1, 0xb8f0d0, 0xfff3c4, 0xc9b3ff].forEach((cc, i) => { const tub = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), mat(cc)); tub.position.set(-0.8 + i * 0.5, 1.2, 0.1); s.add(tub); });
    const { x: sx, z: sz } = LOC.stall;
    s.position.set(sx, H(sx, sz), sz); s.rotation.y = -2.3; shadowAll(s); this.scene.add(s);
    addBox(sx, sz, 1.35, 0.65, -2.3, 1.1, -3);
    this.stall = s;

    // planters & crates
    const crateM = mat(0xd9a066);
    [[-6.5, -6], [6, 9.5], [-9, 8.5]].forEach(([x, z]) => {
      const cr = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), crateM); cr.position.set(x, 0.4, z); cr.rotation.y = x; shadowAll(cr); this.scene.add(cr);
      addBox(x, z, 0.4, 0.4, -x, 0.8, -1);
    });
    // welcome arch south of plaza
    const arch = new THREE.Group();
    for (const ax of [-2, 2]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 3.4, 8), mat(0xf2e3cf)); p.position.set(ax, 1.7, 0); arch.add(p); addCircle(ax, 12.5, 0.2, 3.4); }
    const top = this.textSign(['LITTLE VILLAGE'], 4.6, 0.7, '#fff5e6', '#e8618f', 80); top.position.y = 3.4; arch.add(top);
    const flowersArch = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.12, 6, 30, Math.PI), mat(0x7cc35e)); flowersArch.position.y = 3.3; arch.add(flowersArch);
    arch.position.set(0, 0, 12.5); arch.rotation.y = Math.PI; shadowAll(arch); this.scene.add(arch);
  }

  /* ---------------- park ---------------- */
  buildPark() {
    const pink = mat(0xff8fb8), blue = mat(0x7cc8ff), yellow = mat(0xffd66b), white = mat(0xffffff), metal = mat(0xb9b2c9, { metalness: 0.3, roughness: 0.5 });
    // low fence around the park (decorative, with openings)
    this.fence(10, -21, 20, -23); this.fence(34, -22, 36, -4);
    // swing set
    {
      const { x, z } = LOC.swing, y = H(x, z);
      const g = new THREE.Group();
      for (const sx of [-1.6, 1.6]) for (const sz of [-0.9, 0.9]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.1, 8), blue); leg.position.set(sx, 1.45, sz * 0.5); leg.rotation.x = sz > 0 ? -0.28 : 0.28; g.add(leg);
      }
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.4, 8), pink); bar.rotation.z = Math.PI / 2; bar.position.y = 2.95; g.add(bar);
      this.swingSeats = [];
      for (const sx of [-0.75, 0.75]) {
        const pivot = new THREE.Group(); pivot.position.set(sx, 2.95, 0);
        for (const rx of [-0.25, 0.25]) { const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.35, 4), metal); rope.position.set(rx, -1.17, 0); pivot.add(rope); }
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.06, 0.3), yellow); seat.position.y = -2.35; pivot.add(seat);
        g.add(pivot); this.swingSeats.push(pivot);
      }
      g.position.set(x, y, z); shadowAll(g); this.scene.add(g); this.swingSet = g;
      for (const sx of [-1.6, 1.6]) addCircle(x + sx, z, 0.25, y + 3);
    }
    // slide
    {
      const { x, z } = LOC.slide, y = H(x, z);
      const g = new THREE.Group();
      const plat = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.12, 1.3), yellow); plat.position.set(-1.6, 2.5, 0); g.add(plat);
      for (const sx of [-2.2, -1.0]) for (const sz of [-0.6, 0.6]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.3, 8), blue); p.position.set(sx, 1.65, sz); g.add(p); }
      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.8, 4), pink); roof.position.set(-1.6, 3.7, 0); roof.rotation.y = Math.PI / 4; g.add(roof);
      // ladder
      for (let i = 0; i < 7; i++) { const r = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6), white); r.rotation.x = Math.PI / 2; r.position.set(-2.35, 0.3 + i * 0.35, 0); r.rotation.z = 0; g.add(r); }
      // chute: curve from platform down to +x
      const pts = []; for (let i = 0; i <= 20; i++) { const t = i / 20; pts.push(new THREE.Vector3(-0.95 + t * 4.2, 2.5 - (1 - Math.cos(t * Math.PI)) / 2 * 2.2, 0)); }
      this.slideCurve = new THREE.CatmullRomCurve3(pts);
      const chute = new THREE.Mesh(new THREE.TubeGeometry(this.slideCurve, 40, 0.42, 10, false), new THREE.MeshStandardMaterial({ color: 0xff8fb8, side: THREE.DoubleSide, roughness: 0.4 }));
      g.add(chute);
      g.position.set(x, y, z); shadowAll(g); this.scene.add(g); this.slide = g;
      addBox(x - 1.6, z, 0.7, 0.7, 0, y + 2.56, y + 2.4);
      for (const sx of [-2.2, -1.0]) for (const sz of [-0.6, 0.6]) addCircle(x + sx, z + sz, 0.1, y + 3.3);
    }
    // trampoline
    {
      const { x, z } = LOC.tramp, y = H(x, z);
      const g = new THREE.Group();
      const frame = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.12, 8, 32), blue); frame.rotation.x = Math.PI / 2; frame.position.y = 0.45; g.add(frame);
      const pad = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.18, 6, 32), pink); pad.rotation.x = Math.PI / 2; pad.position.y = 0.5; pad.scale.z = 0.5; g.add(pad);
      const mesh = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32), mat(0x3c3452)); mesh.rotation.x = -Math.PI / 2; mesh.position.y = 0.42; g.add(mesh);
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; const l = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.55, 6), blue); l.position.set(Math.cos(a) * 1.7, 0.27, Math.sin(a) * 1.7); g.add(l); }
      g.position.set(x, y, z); shadowAll(g); this.scene.add(g);
      this.trampoline = { g, mesh, x, z, y: y + 0.42, squash: 0 };
      this.trampSolid = addCircle(x, z, 1.7, y + 0.42, y - 1, { tramp: true });
      // floating stepping stone with a crystal above it
      const isl = new THREE.Group();
      const rockM = mat(0xd8cbbd, { flatShading: true });
      const top = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 0.5, 0.9, 9), rockM); top.position.y = -0.45; isl.add(top);
      const grass = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.35, 0.14, 9), mat(0x8fd46a)); grass.position.y = 0.02; isl.add(grass);
      const ix = x + 2.6, iz = z - 1.2, iy = y + 5.2;
      isl.position.set(ix, iy, iz); shadowAll(isl); this.scene.add(isl);
      addCircle(ix, iz, 1.35, iy + 0.08, iy - 0.9);
      this.skyIsland = { x: ix, y: iy + 0.08, z: iz, g: isl };
      G.updaters.push((dt, t) => { isl.rotation.y = Math.sin(t * 0.3) * 0.1; });
    }
    // football goal
    {
      const { x, z } = LOC.goal, y = H(x, z);
      const g = new THREE.Group();
      for (const sx of [-1.8, 1.8]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.8, 8), white); p.position.set(sx, 0.9, 0); g.add(p); }
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.6, 8), white); bar.rotation.z = Math.PI / 2; bar.position.y = 1.8; g.add(bar);
      const net = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.8, 12, 6), new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.6 }));
      net.position.set(0, 0.9, 0.8); g.add(net);
      g.position.set(x, y, z); g.rotation.y = -Math.PI / 2 + 0.3; shadowAll(g); this.scene.add(g);
      this.goal = { x, z, rot: g.rotation.y };
      const gx = Math.cos(g.rotation.y), gz = -Math.sin(g.rotation.y);
      addCircle(x + gx * 1.8, z + gz * 1.8, 0.12, y + 1.8); addCircle(x - gx * 1.8, z - gz * 1.8, 0.12, y + 1.8);
    }
    // park benches
    this.bench(18.5, -4.2, Math.PI + 0.3);
    this.bench(27, -21, 0.2);
    // sandbox
    const sand = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.2, 20), mat(0xf3e1b0)); sand.position.set(28, H(28, -4) + 0.05, -4); sand.receiveShadow = true; this.scene.add(sand);
    const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.13, 0.3, 10), mat(0xff6f91)); bucket.position.set(28.5, H(28, -4) + 0.3, -3.6); this.scene.add(bucket);
    // kite stand in the open meadow
    {
      const { x, z } = LOC.kite, y = H(x, z);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.3, 6), mat(0xc98b58)); post.position.set(x, y + 0.65, z); shadowAll(post); this.scene.add(post);
      const s = this.textSign(['KITE HILL'], 1.2, 0.35); s.position.set(x, y + 1.3, z); s.rotation.y = 0.8; this.scene.add(s);
    }
  }

  /* ---------------- pond ---------------- */
  buildPond() {
    const { x, z, r } = POND;
    // dock
    const d = LOC.dock;
    const planks = new THREE.Group();
    const wood = mat(0xb8835a);
    for (let px = d.x0; px < d.x1; px += 0.42) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 1.5), wood); p.position.set(px, 0.02, d.z); p.rotation.y = (srand() - 0.5) * 0.04; planks.add(p); }
    for (let px = d.x0 + 1; px <= d.x1; px += 2.2) for (const pz of [-0.72, 0.72]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.4, 6), wood); p.position.set(px, -0.6, d.z + pz); planks.add(p); }
    shadowAll(planks); this.scene.add(planks);
    addBox((d.x0 + d.x1) / 2, d.z, (d.x1 - d.x0) / 2, 0.75, 0, 0.06, -3);
    // stepping stones + rocks around
    const rockM = mat(0xcfc6bb, { flatShading: true });
    for (let i = 0; i < 26; i++) {
      const a = i / 26 * Math.PI * 2 + srand() * 0.2;
      if (Math.abs(a - Math.PI) < 0.25) continue;
      const rr = r + srange(0.3, 1.3), px = x + Math.cos(a) * rr, pz = z + Math.sin(a) * rr;
      const s = srange(0.35, 0.8);
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockM); m.position.set(px, H(px, pz) + s * 0.2, pz); m.scale.y = 0.6; m.rotation.y = srand() * 6; shadowAll(m); this.scene.add(m);
    }
    // amber crystal rocks (far side)
    for (const [ax, az, s] of [[33, 31.8, 1.2], [34.6, 31.2, 0.8], [31.8, 32.6, 0.7]]) {
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockM); m.position.set(ax, H(ax, az) + s * 0.3, az); shadowAll(m); this.scene.add(m);
      addCircle(ax, az, s * 0.8, H(ax, az) + s * 0.9);
    }
    // lily pads
    const padM = mat(0x5fb15a, { side: THREE.DoubleSide });
    for (let i = 0; i < 16; i++) {
      const a = srand() * Math.PI * 2, rr = srange(2, r - 1.5);
      const p = new THREE.Mesh(new THREE.CircleGeometry(srange(0.3, 0.55), 12, 0.3, Math.PI * 1.8), padM);
      p.rotation.x = -Math.PI / 2; p.rotation.z = srand() * 6; p.position.set(x + Math.cos(a) * rr, WATER_Y + 0.02, z + Math.sin(a) * rr);
      this.scene.add(p);
      if (i % 3 === 0) { const fl = new THREE.Mesh(new THREE.IcosahedronGeometry(0.1, 0), mat(0xffb3d1, { emissive: 0x552233 })); fl.position.copy(p.position).y += 0.07; this.scene.add(fl); }
    }
    // reeds
    const reedG = new THREE.CylinderGeometry(0.02, 0.03, 1.2, 4); reedG.translate(0, 0.6, 0);
    const reeds = new THREE.InstancedMesh(reedG, mat(0x6b9a3f), 90);
    const dm = new THREE.Object3D(); let n = 0;
    for (let i = 0; i < 90; i++) {
      const a = srand() * Math.PI * 2; if (a > 2.7 && a < 3.6) continue; const rr = r - srange(-0.2, 1.2);
      const px = x + Math.cos(a) * rr, pz = z + Math.sin(a) * rr;
      dm.position.set(px, Math.max(H(px, pz), WATER_Y - 0.2), pz); dm.rotation.set(srange(-0.15, 0.15), 0, srange(-0.15, 0.15)); dm.scale.setScalar(srange(0.7, 1.3)); dm.updateMatrix(); reeds.setMatrixAt(n++, dm.matrix);
    }
    reeds.count = n; this.scene.add(reeds);
    this.bench(19.6, 27.2, Math.PI * 0.25 + Math.PI);
    this.lamp(20.5, 24); this.lamp(38, 16);
    // duck food sack
    const sack = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), mat(0xe2c79a)); sack.scale.y = 1.2; sack.position.set(20.6, H(20.6, 25.2) + 0.35, 25.2); shadowAll(sack); this.scene.add(sack);
    this.duckSack = sack;
  }

  /* ---------------- forest + gate + hidden garden ---------------- */
  buildForestAndGarden() {
    // glowing mushrooms deeper in the forest
    const capG = new THREE.SphereGeometry(0.22, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2); capG.translate(0, 0.28, 0);
    const stG = new THREE.CylinderGeometry(0.06, 0.08, 0.3, 6); stG.translate(0, 0.14, 0);
    const pts = [];
    for (let i = 0; i < 500 && pts.length < 130; i++) {
      const x = srange(-66, -8), z = srange(-60, -8);
      if (!inForest(x, z) || pathDist(x, z) < 0.4 || isClear(x, z)) continue;
      if (srand() > 0.25 + forestDepth(x, z)) continue;
      pts.push([x, z, forestDepth(x, z)]);
    }
    const caps = new THREE.InstancedMesh(capG, new THREE.MeshStandardMaterial({ roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.35 }), pts.length);
    const stems = new THREE.InstancedMesh(stG, mat(0xfff3e0), pts.length);
    const dm = new THREE.Object3D(), c = new THREE.Color();
    pts.forEach(([x, z, f], i) => {
      dm.position.set(x, H(x, z), z); dm.scale.setScalar(srange(0.8, 2.2)); dm.rotation.set(0, srand() * 6, 0); dm.updateMatrix();
      caps.setMatrixAt(i, dm.matrix); stems.setMatrixAt(i, dm.matrix);
      caps.setColorAt(i, f > 0.55 ? c.setHSL(0.5 + srand() * 0.3, 0.8, 0.65) : c.setHSL(0.99, 0.75, 0.6));
    });
    caps.instanceColor.needsUpdate = true;
    this.scene.add(caps, stems); this.mushrooms = caps;
    // hollow log (teddy bear hides here)
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 3, 12, 1, true), new THREE.MeshStandardMaterial({ color: 0x8a5a3c, side: THREE.DoubleSide }));
    log.rotation.z = Math.PI / 2; log.rotation.y = 0.5; log.position.set(-33.5, H(-33.5, -27) + 0.5, -27); shadowAll(log); this.scene.add(log);
    addBox(-33.5, -27, 0.6, 1.5, 0.5, H(-33.5, -27) + 1.1, -50, { walk: true, noCam: true });
    // forest sign
    const fs = this.textSign(['WHISPERING', 'WOODS'], 1.3, 0.6, '#f6e2bf', '#3f6b3a', 54);
    fs.position.set(-11, H(-11, -14) + 1.5, -14.6); fs.rotation.y = 0.9; this.scene.add(fs);
    const fsp = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.5, 6), mat(0x8a5a3c)); fsp.position.set(-11, H(-11, -14) + 0.75, -14.6); this.scene.add(fsp);

    // garden wall of mossy stones with a gap for the gate
    const { x: gx, z: gz, r } = LOC.garden;
    const gateA = Math.atan2(LOC.gateDir.z, LOC.gateDir.x);
    const stoneM = new THREE.MeshStandardMaterial({ color: 0xb9b0a8, roughness: 0.95, flatShading: true });
    const mossM = new THREE.MeshStandardMaterial({ color: 0x6fae5a, roughness: 1, flatShading: true });
    const wallStones = [];
    for (let a = 0; a < Math.PI * 2; a += 0.14) {
      let da = Math.atan2(Math.sin(a - gateA), Math.cos(a - gateA));
      if (Math.abs(da) < 0.32) continue;
      const px = gx + Math.cos(a) * r, pz = gz + Math.sin(a) * r;
      const s = srange(1.1, 1.5);
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), stoneM); m.position.set(px, H(px, pz) + s * 0.55, pz); m.scale.y = 1.35; m.rotation.set(srand(), srand() * 6, srand());
      const moss = new THREE.Mesh(new THREE.DodecahedronGeometry(s * 0.8, 0), mossM); moss.position.copy(m.position).y += s * 0.7; moss.scale.set(1, 0.5, 1);
      shadowAll(m); shadowAll(moss); this.scene.add(m, moss); wallStones.push(m);
      addCircle(px, pz, s * 0.95, H(px, pz) + 3.5);
    }
    // hedge ring behind the stones for extra height
    const hedgeG = new THREE.IcosahedronGeometry(1.5, 1); hedgeG.scale(1, 1.25, 1);
    const hedgePts = [];
    for (let a = 0; a < Math.PI * 2; a += 0.16) { if (Math.abs(Math.atan2(Math.sin(a - gateA), Math.cos(a - gateA))) < 0.34) continue; hedgePts.push(a); }
    const hedges = new THREE.InstancedMesh(hedgeG, new THREE.MeshStandardMaterial({ roughness: 0.9, flatShading: true }), hedgePts.length);
    const hd = new THREE.Object3D(), hc = new THREE.Color();
    hedgePts.forEach((a, i) => { const px = gx + Math.cos(a) * (r + 1.6), pz = gz + Math.sin(a) * (r + 1.6); hd.position.set(px, H(px, pz) + 1.1, pz); hd.rotation.y = srand() * 6; hd.scale.setScalar(srange(0.9, 1.2)); hd.updateMatrix(); hedges.setMatrixAt(i, hd.matrix); hedges.setColorAt(i, hc.setHSL(0.33 + srand() * 0.04, 0.45, 0.32 + srand() * 0.06)); });
    hedges.castShadow = true; hedges.receiveShadow = true; this.scene.add(hedges);
    // gate
    const { x: tx, z: tz } = LOC.gate, ty = H(tx, tz);
    const gate = new THREE.Group();
    const iron = new THREE.MeshStandardMaterial({ color: 0x5a4a6a, metalness: 0.5, roughness: 0.4 });
    const goldM = new THREE.MeshStandardMaterial({ color: 0xffd66b, metalness: 0.6, roughness: 0.3, emissive: 0x332200 });
    for (const sx of [-1.75, 1.75]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.55, 3.4, 0.55), stoneM); p.position.set(sx, 1.7, 0); gate.add(p);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), goldM); orb.position.set(sx, 3.6, 0); gate.add(orb);
    }
    const archC = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.13, 6, 24, Math.PI), iron); archC.position.y = 3.2; gate.add(archC);
    const leaves = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group(); pivot.position.set(side * 1.48, 0, 0);
      const leaf = new THREE.Group();
      for (let i = 0; i < 5; i++) { const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.7, 6), iron); bar.position.set(-side * (0.15 + i * 0.3), 1.45, 0); leaf.add(bar); }
      for (const hy of [0.4, 1.5, 2.6]) { const b = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.08, 0.08), iron); b.position.set(-side * 0.74, hy, 0); leaf.add(b); }
      const lock = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.26, 0.16), goldM); lock.position.set(-side * 1.42, 1.4, 0.05); leaf.add(lock);
      pivot.add(leaf); gate.add(pivot); leaves.push({ pivot, side });
    }
    gate.position.set(tx, ty, tz);
    gate.rotation.y = Math.atan2(LOC.gateDir.x, LOC.gateDir.z);
    shadowAll(gate); this.scene.add(gate);
    const gRot = gate.rotation.y;   // box rot convention
    this.gateSolid = addBox(tx, tz, 1.6, 0.25, gRot, ty + 3);
    for (const sx of [-1.75, 1.75]) addCircle(tx + Math.cos(gate.rotation.y) * sx, tz - Math.sin(gate.rotation.y) * sx, 0.35, ty + 3.5);
    this.gate = { g: gate, leaves, open: 0, opening: false };
    G.updaters.push(dt => {
      const gt = this.gate; if (!gt.opening || gt.open >= 1) return;
      gt.open = Math.min(1, gt.open + dt * 0.45);
      const e = 1 - Math.pow(1 - gt.open, 3);
      gt.leaves.forEach(l => l.pivot.rotation.y = -l.side * e * 1.75);
      if (gt.open > 0.5) this.gateSolid.disabled = true;
    });

    // inside: glowing plants, crystals, pedestal
    const glowPlantM = new THREE.MeshStandardMaterial({ color: 0xb8f7ff, emissive: 0x6fe3ff, emissiveIntensity: 0.9, roughness: 0.4 });
    const glowPinkM = new THREE.MeshStandardMaterial({ color: 0xffd0f0, emissive: 0xff8fe0, emissiveIntensity: 0.9, roughness: 0.4 });
    for (let i = 0; i < 40; i++) {
      const a = srand() * Math.PI * 2, rr = Math.sqrt(srand()) * (r - 1.8);
      const px = gx + Math.cos(a) * rr, pz = gz + Math.sin(a) * rr;
      if (Math.hypot(px - LOC.wizard.x, pz - LOC.wizard.z) < 3.4) continue;
      const g = new THREE.Group();
      const n = 3 + Math.floor(srand() * 3);
      for (let k = 0; k < n; k++) {
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.8, 4), mat(0x5fae8a)); const ang = k / n * 6.28;
        stalk.position.set(Math.cos(ang) * 0.12, 0.4, Math.sin(ang) * 0.12); stalk.rotation.set(Math.sin(ang) * 0.3, 0, Math.cos(ang) * 0.3); g.add(stalk);
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), i % 2 ? glowPlantM : glowPinkM); bulb.position.set(Math.cos(ang) * 0.24, 0.8, Math.sin(ang) * 0.24); g.add(bulb);
      }
      g.position.set(px, H(px, pz), pz); g.scale.setScalar(srange(0.8, 1.6)); this.scene.add(g);
    }
    // crystal clusters
    const crysM = new THREE.MeshStandardMaterial({ color: 0xd9b8ff, emissive: 0xa77bff, emissiveIntensity: 0.6, roughness: 0.2, flatShading: true, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 7; i++) {
      const a = i / 7 * Math.PI * 2 + 0.4, px = gx + Math.cos(a) * (r - 2.2), pz = gz + Math.sin(a) * (r - 2.2);
      if (Math.abs(Math.atan2(Math.sin(a - gateA), Math.cos(a - gateA))) < 0.5) continue;
      const g = new THREE.Group();
      for (let k = 0; k < 4; k++) { const cc = new THREE.Mesh(new THREE.OctahedronGeometry(srange(0.2, 0.45), 0), crysM); cc.scale.y = 2.4; cc.position.set(srange(-0.4, 0.4), 0.4, srange(-0.4, 0.4)); cc.rotation.set(srange(-0.4, 0.4), srand() * 6, srange(-0.4, 0.4)); g.add(cc); }
      g.position.set(px, H(px, pz), pz); this.scene.add(g);
    }
    // pedestal
    const ped = new THREE.Group();
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 1.1, 10), mat(0xf4ecff)); col.position.y = 0.55; ped.add(col);
    const topP = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.55, 0.16, 10), goldM); topP.position.y = 1.15; ped.add(topP);
    const px = gx + 1.5, pz = gz + 1.5;
    ped.position.set(px, H(px, pz), pz); shadowAll(ped); this.scene.add(ped);
    addCircle(px, pz, 0.62, H(px, pz) + 1.23);
    this.pedestal = { x: px, z: pz, y: H(px, pz) + 1.23 };
    // garden sparkles
    const sp = this.particles(160, 0xd9f2ff, 0.25, 1);
    this.scene.add(sp.points);
    const seeds = Array.from({ length: sp.n }, () => [srand() * 6.28, Math.sqrt(srand()) * (r - 0.5), srange(0.3, 5), srange(0.3, 1)]);
    G.updaters.push((dt, t) => {
      for (let i = 0; i < sp.n; i++) { const [a, rr, h, s] = seeds[i]; sp.pos[i * 3] = gx + Math.cos(a + t * 0.05 * s) * rr; sp.pos[i * 3 + 1] = H(gx, gz) + h + Math.sin(t * s + a) * 0.4; sp.pos[i * 3 + 2] = gz + Math.sin(a + t * 0.05 * s) * rr; }
      sp.points.geometry.attributes.position.needsUpdate = true;
    });
    // soft coloured light in the garden (single dynamic light)
    const gl = new THREE.PointLight(0xb98bff, 18, 22, 1.6); gl.position.set(gx, H(gx, gz) + 4, gz); this.scene.add(gl);
  }

  /* ---------------- supplied GLB landmarks ---------------- */
  placeModel(key, { x, z, height, rotY = 0, sink = 0.05, y = null, collider = 'circle', colScale = 1, keepHeightAbove = null }) {
    const src = G.models[key];
    if (!src) { console.warn('[World] model missing, skipped:', key); return null; }
    const model = src.scene;
    const wrap = new THREE.Group();
    wrap.add(model);
    model.updateMatrixWorld(true);
    let box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const s = height / size.y;
    model.scale.multiplyScalar(s);
    model.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(model);
    const ctr = box.getCenter(new THREE.Vector3());
    model.position.x -= ctr.x; model.position.z -= ctr.z; model.position.y -= box.min.y;
    const gy = y ?? (H(x, z) - sink);
    wrap.position.set(x, gy, z); wrap.rotation.y = rotY;
    model.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; if (o.material) { o.material.envMapIntensity = 0.6; } } });
    this.scene.add(wrap);
    const sz = box.getSize(new THREE.Vector3());
    console.log(`[World] ${key}: raw ${size.toArray().map(v => v.toFixed(2))} → scale ${s.toFixed(2)} → ${sz.toArray().map(v => v.toFixed(1)).join('×')} m`);
    if (collider === 'circle') addCircle(x, z, Math.min(sz.x, sz.z) * 0.42 * colScale, gy + sz.y);
    else if (collider === 'box') {
      // rotate footprint: rotY about Y
      addBox(x, z, sz.x / 2 * 0.86 * colScale, sz.z / 2 * 0.86 * colScale, rotY, gy + sz.y);
    }
    return { wrap, model, size: sz, y: gy };
  }
  buildLandmarks() {
    // Player house (front faces +X toward the square)
    this.house = this.placeModel('house', { x: LOC.house.x, z: LOC.house.z, height: 9.5, rotY: Math.PI / 2, collider: 'box', colScale: 0.82 });
    const hs = this.house?.size || new THREE.Vector3(8, 9, 7);
    this.houseDoor = { x: LOC.house.x + hs.x / 2 * 0.82 + 0.9, z: LOC.house.z };
    const hsign = this.textSign(['HOME'], 0.9, 0.35, '#fff5e6', '#e8618f', 70);
    hsign.position.set(this.houseDoor.x + 0.3, H(this.houseDoor.x, LOC.house.z + 2.4) + 1.3, LOC.house.z + 2.4); hsign.rotation.y = Math.PI / 2; this.scene.add(hsign);
    const hp = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.3, 6), mat(0xc98b58)); hp.position.set(this.houseDoor.x + 0.3, H(this.houseDoor.x, LOC.house.z + 2.4) + 0.65, LOC.house.z + 2.4); this.scene.add(hp);
    // doormat marks the entrance
    const matD = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1), mat(0xff8fb8)); matD.rotation.x = -Math.PI / 2; matD.position.set(this.houseDoor.x - 0.2, H(this.houseDoor.x, LOC.house.z) + 0.03, LOC.house.z); this.scene.add(matD);
    // apple tree near the house
    const at = new THREE.Group();
    const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 2.4, 7), mat(0x8a5a3c)); tr.position.y = 1.2; at.add(tr);
    const cn = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 1), new THREE.MeshStandardMaterial({ color: 0x74c05a, flatShading: true })); cn.position.y = 3.3; at.add(cn);
    for (let i = 0; i < 9; i++) { const ap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), mat(0xff4f5e)); const a = i * 0.7; ap.position.set(Math.cos(a) * 1.5, 3 + Math.sin(i) * 0.6, Math.sin(a) * 1.5); at.add(ap); }
    at.position.set(-12, H(-12, 13), 13); shadowAll(at); this.scene.add(at);
    addCircle(-12, 13, 0.4, H(-12, 13) + 3);

    // Watchtower on its hill
    this.placeModel('watchtower', { x: LOC.tower.x, z: LOC.tower.z, height: 15, rotY: -Math.PI * 0.8, sink: 0.4, colScale: 0.75 });
    // stone steps up the hill along the tower path
    const stepM = mat(0xd5c9bb, { flatShading: true });
    for (let i = 0; i < 9; i++) {
      const t = i / 8, sx = lerp(35, 40, t), sz = lerp(-30.5, -35, t);
      const st = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 0.7), stepM);
      st.position.set(sx, H(sx, sz) + 0.02, sz); st.rotation.y = -0.73; st.receiveShadow = true; this.scene.add(st);
    }
    // Castle landmark on the northern hill (floating-island base sunk into the hill)
    this.castle = this.placeModel('castle', { x: LOC.castle.x, z: LOC.castle.z, height: 34, rotY: 0, sink: 14, colScale: 0.75 });
    // Old guardian statue near the castle path (on a plinth — a statue, not an enemy)
    const pl = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 0.7, 8), mat(0xd9d0c4)); pl.position.set(LOC.guardian.x, H(LOC.guardian.x, LOC.guardian.z) + 0.35, LOC.guardian.z); shadowAll(pl); this.scene.add(pl);
    this.placeModel('undead', { x: LOC.guardian.x, z: LOC.guardian.z, height: 2.3, y: H(LOC.guardian.x, LOC.guardian.z) + 0.68, rotY: -0.5, colScale: 1.4 });
    const gs = this.textSign(['THE OLD', 'GUARDIAN'], 1.0, 0.5, '#efe7da', '#6b5a7a', 50);
    gs.position.set(LOC.guardian.x - 1.3 * Math.sin(0.5), H(LOC.guardian.x, LOC.guardian.z) + 0.55, LOC.guardian.z + 1.35); gs.rotation.y = -0.5; gs.rotation.x = -0.2; this.scene.add(gs);
    // Signpost at the main intersection, with direction boards
    const sp = this.placeModel('signpost', { x: LOC.signpost.x, z: LOC.signpost.z, height: 3.6, rotY: 0.3, colScale: 0.5 });
    const boards = [['VILLAGE', Math.PI], ['POND', Math.PI * 0.72], ['FOREST', -Math.PI * 0.37], ['CASTLE', 0], ['SECRET PATH', -Math.PI * 0.2]];
    const colrs = ['#e8618f', '#3a86c8', '#3f6b3a', '#6b4ab0', '#9a5a2e'];
    boards.forEach(([t, a], i) => {
      const b = this.textSign([t], t.length > 8 ? 1.5 : 1.15, 0.3, '#f6e2bf', colrs[i], t.length > 8 ? 56 : 64);
      const pivot = new THREE.Group(); pivot.position.set(LOC.signpost.x, H(LOC.signpost.x, LOC.signpost.z) + 1.35 + i * 0.3, LOC.signpost.z);
      // board points along world direction a (0 = -Z north)
      pivot.rotation.y = -a + Math.PI / 2;
      b.position.x = 0.7; b.rotation.y = 0; pivot.add(b);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.25, 3), mat(0xf6e2bf)); tip.rotation.z = -Math.PI / 2; tip.position.x = 0.7 + b.geometry.parameters.width / 2 + 0.1; pivot.add(tip);
      this.scene.add(pivot);
    });
    // NPC models placed by the interaction module (monk + reaper) — just prepared here
    // Floating house hovering above the hidden garden
    this.floating = this.placeModel('floating', { x: LOC.floating.x, z: LOC.floating.z, height: 11, y: H(LOC.floating.x, LOC.floating.z) + 17, collider: null, rotY: 0.7 });
    if (this.floating) {
      const base = this.floating.wrap.position.y;
      G.updaters.push((dt, t) => { this.floating.wrap.position.y = base + Math.sin(t * 0.5) * 0.8; this.floating.wrap.rotation.y = 0.7 + Math.sin(t * 0.15) * 0.15; });
    }
    // Wizard tower: the fantasy centrepiece inside the hidden garden
    this.wizard = this.placeModel('wizard', { x: LOC.wizard.x, z: LOC.wizard.z, height: 11, rotY: Math.atan2(LOC.gateDir.x, LOC.gateDir.z), sink: 0.2, colScale: 0.6 });
  }

  /* ---------------- player room (interior) ---------------- */
  buildRoom() {
    const R = new THREE.Group();
    const { x: rx, z: rz } = LOC.room;
    this.roomBox = { x0: rx - 4, x1: rx + 4, z0: rz - 3.5, z1: rz + 3.5, h: 3.3 };
    const floorT = canvasTex(256, 256, (g, w) => { for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#d9a878' : '#cf9c6c'; g.fillRect(0, i * w / 8, w, w / 8); g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(0, i * w / 8, w, 2); } });
    floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping; floorT.repeat.set(3, 3);
    const wallT = canvasTex(256, 256, (g, w) => { g.fillStyle = '#fff1e8'; g.fillRect(0, 0, w, w); g.fillStyle = '#ffe0ea'; for (let i = 0; i < 8; i++) g.fillRect(i * 32 + 12, 0, 8, w); });
    wallT.wrapS = wallT.wrapT = THREE.RepeatWrapping; wallT.repeat.set(4, 1);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 7), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.7 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; R.add(floor);
    const wallM = new THREE.MeshStandardMaterial({ map: wallT, roughness: 0.9, side: THREE.DoubleSide });
    const mk = (w, h, px, py, pz, ry) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallM); m.position.set(px, py, pz); m.rotation.y = ry; R.add(m); return m; };
    mk(8, 3.3, 0, 1.65, -3.5, 0); mk(8, 3.3, 0, 1.65, 3.5, Math.PI); mk(7, 3.3, -4, 1.65, 0, Math.PI / 2); mk(7, 3.3, 4, 1.65, 0, -Math.PI / 2);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(8, 7), mat(0xfff8f0, { side: THREE.DoubleSide })); ceil.rotation.x = Math.PI / 2; ceil.position.y = 3.3; R.add(ceil);
    // window with sky view
    const win = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshBasicMaterial({ color: 0xbfe6ff })); win.position.set(0, 1.9, -3.48); R.add(win);
    const winF = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.06, 4, 4), mat(0xffffff)); winF.rotation.z = Math.PI / 4; winF.scale.set(1.35, 0.9, 1); winF.position.set(0, 1.9, -3.46); R.add(winF);
    this.roomWindow = win;
    // rug
    const rug = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32), mat(0xffb3d1)); rug.rotation.x = -Math.PI / 2; rug.position.y = 0.01; R.add(rug);
    // bed
    const bed = new THREE.Group();
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 2.3), mat(0xc98b58)); frame.position.y = 0.22; bed.add(frame);
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 2.2), mat(0xffffff)); mattress.position.y = 0.55; bed.add(mattress);
    const blanket = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.08, 1.4), mat(0xb28dff)); blanket.position.set(0, 0.66, 0.35); bed.add(blanket);
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.18, 0.45), mat(0xfff0f5)); pillow.position.set(0, 0.72, -0.8); bed.add(pillow);
    bed.position.set(-3.1, 0, -2.2); R.add(bed);
    this.addRoomSolid(-3.1, -2.2, 0.8, 1.15, 0.7);
    // furniture slots for decoration
    const wood = mat(0xd9a066);
    const table = new THREE.Group(); const tt = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.06, 20), wood); tt.position.y = 0.72; table.add(tt);
    const tl = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.72, 8), wood); tl.position.y = 0.36; table.add(tl);
    table.position.set(2.8, 0, 2.4); R.add(table); this.addRoomSolid(2.8, 2.4, 0.55, 0.55, 0.8);
    const desk = new THREE.Group(); const dt = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.07, 0.7), wood); dt.position.y = 0.78; desk.add(dt);
    for (const sx of [-0.72, 0.72]) for (const sz of [-0.28, 0.28]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.78, 0.07), wood); l.position.set(sx, 0.39, sz); desk.add(l); }
    desk.position.set(2.9, 0, -3.0); R.add(desk); this.addRoomSolid(2.9, -3.0, 0.8, 0.4, 0.85);
    const shelf = new THREE.Group();
    for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 1.8), wood); b.position.set(0, 0.6 + i * 0.6, 0); shelf.add(b); }
    const sb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.9, 1.8), wood); sb.position.set(0.2, 0.95, 0); shelf.add(sb);
    shelf.position.set(3.75, 0, 0); R.add(shelf); this.addRoomSolid(3.75, 0, 0.25, 0.9, 2);
    const pedR = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1, 10), mat(0xf4ecff)); pedR.position.set(-3.3, 0.5, 2.4); R.add(pedR); this.addRoomSolid(-3.3, 2.4, 0.45, 0.45, 1);
    const frameW = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.0, 0.06), mat(0xc98b58)); frameW.position.set(-3.96, 1.8, 0); frameW.rotation.y = Math.PI / 2; R.add(frameW);
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(1.14, 0.84), new THREE.MeshBasicMaterial({ color: 0xeeeeee })); photo.position.set(-3.92, 1.8, 0); photo.rotation.y = Math.PI / 2; R.add(photo);
    // door (exit)
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.2, 0.08), mat(0xb8835a)); door.position.set(0, 1.1, 3.46); R.add(door);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), mat(0xffd66b)); knob.position.set(0.4, 1.1, 3.4); R.add(knob);
    // warm light
    const lamp = new THREE.PointLight(0xffe2b8, 14, 14, 1.4); lamp.position.set(0, 2.9, 0); R.add(lamp);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff3d8 })); bulb.position.set(0, 3.05, 0); R.add(bulb);
    const ambient = new THREE.AmbientLight(0xffe8dc, 0.0); R.add(ambient);
    R.position.set(rx, 0, rz);
    R.traverse(o => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = true; } });
    R.visible = false; this.scene.add(R);
    this.room = R; this.roomLight = lamp;
    this.roomSlots = {
      vase: { pos: new THREE.Vector3(rx + 2.8, 0.75, rz + 2.4), label: 'Flower Vase', cat: 'flower' },
      shelf: { pos: new THREE.Vector3(rx + 3.7, 0.63, rz), label: 'Toy Shelf', cat: 'toy' },
      desk: { pos: new THREE.Vector3(rx + 2.9, 0.82, rz - 3.0), label: 'Crystal Desk', cat: 'crystal' },
      photo: { mesh: photo, pos: new THREE.Vector3(rx - 3.9, 1.8, rz), label: 'Photo Frame', cat: 'photo' },
      pedestal: { pos: new THREE.Vector3(rx - 3.3, 1.0, rz + 2.4), label: 'Treasure Pedestal', cat: 'secret' },
      bed: { pos: new THREE.Vector3(rx - 3.1, 0.72, rz - 1.2) },
      catBed: { pos: new THREE.Vector3(rx - 1.2, 0.02, rz - 2.6) },
    };
    const catBed = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.12, 8, 16), mat(0x9fd8ff)); catBed.rotation.x = Math.PI / 2; catBed.position.set(-1.2, 0.1, -2.6); R.add(catBed);
    this.roomDoor = { x: rx, z: rz + 2.9 };
  }
  addRoomSolid(lx, lz, hw, hd, h) { addBox(LOC.room.x + lx, LOC.room.z + lz, hw, hd, 0, h, -1, { room: true, walk: false }); }
  insideRoom(p) { const b = this.roomBox; return p.x > b.x0 + 0.2 && p.x < b.x1 - 0.2 && p.z > b.z0 + 0.2 && p.z < b.z1 - 0.2 && p.y < b.h - 0.15 && p.y > 0.1; }
  clampRoom(pos, r) { const b = this.roomBox; pos.x = clamp(pos.x, b.x0 + r, b.x1 - r); pos.z = clamp(pos.z, b.z0 + r, b.z1 - r); }

  /* ---------------- ambient life ---------------- */
  particles(n, color, size, opacity = 1) {
    const g = new THREE.BufferGeometry(); const pos = new Float32Array(n * 3);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color, size, map: this.glow, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const p = new THREE.Points(g, m); p.frustumCulled = false;
    return { points: p, pos, n, mat: m };
  }
  buildAmbient() {
    // butterflies
    const wingG = new THREE.PlaneGeometry(0.22, 0.16); wingG.translate(0.11, 0, 0);
    const bcols = [0xffb3d1, 0xffe27a, 0xb8e0ff, 0xd9b8ff, 0xffffff];
    this.butterflies = [];
    const spots = this.flowerSpots.length ? this.flowerSpots : [new THREE.Vector3()];
    for (let i = 0; i < 26; i++) {
      const m = new THREE.MeshStandardMaterial({ color: bcols[i % bcols.length], side: THREE.DoubleSide, emissive: bcols[i % bcols.length], emissiveIntensity: 0.25 });
      const b = new THREE.Group();
      const l = new THREE.Mesh(wingG, m), r = new THREE.Mesh(wingG, m); r.scale.x = -1; b.add(l, r);
      const home = spots[i % spots.length].clone();
      b.userData = { l, r, home, ph: srand() * 10, sp: srange(0.6, 1.2) };
      this.scene.add(b); this.butterflies.push(b);
    }
    // forest motes (always) + fireflies (sunset)
    this.motes = this.particles(220, 0xc8ffb0, 0.18, 0.8);
    this.scene.add(this.motes.points);
    this.moteSeeds = [];
    for (let i = 0; i < this.motes.n; i++) {
      let x, z; do { x = srange(-66, -10); z = srange(-60, -10); } while (!inForest(x, z));
      this.moteSeeds.push([x, z, srange(0.5, 3), srand() * 6]);
    }
    this.fireflies = this.particles(260, 0xfff09a, 0.3, 0);
    this.scene.add(this.fireflies.points);
    this.ffSeeds = [];
    for (let i = 0; i < this.fireflies.n; i++) {
      let x, z; do { x = srange(-70, 60); z = srange(-60, 45); } while (Math.hypot(x, z) > 72 || Math.hypot(x, z) < 6);
      this.ffSeeds.push([x, z, srange(0.6, 3), srand() * 6]);
    }
  }

  /* ---------------- per-frame ---------------- */
  update(dt, t) {
    // clouds drift
    this.sky.position.copy(G.camera.position);
    for (const c of this.clouds) { c.position.x += c.userData.speed * dt; if (c.position.x > 260) c.position.x = -260; }
    // butterflies (only update near player)
    const pp = G.player?.pos;
    for (const b of this.butterflies) {
      const u = b.userData, tt = t * u.sp + u.ph;
      b.position.set(u.home.x + Math.sin(tt * 0.7) * 2.2, u.home.y + 0.4 + Math.sin(tt * 1.3) * 0.5, u.home.z + Math.cos(tt * 0.5) * 2.2);
      b.rotation.y = tt * 0.7 + Math.PI / 2;
      const f = Math.sin(t * 18 + u.ph) * 1.1; u.l.rotation.y = f; u.r.rotation.y = -f;
    }
    // motes
    const mp = this.motes.pos;
    for (let i = 0; i < this.motes.n; i++) { const [x, z, h, ph] = this.moteSeeds[i]; mp[i * 3] = x + Math.sin(t * 0.3 + ph) * 1.2; mp[i * 3 + 1] = H(x, z) + h + Math.sin(t * 0.8 + ph) * 0.4; mp[i * 3 + 2] = z + Math.cos(t * 0.25 + ph) * 1.2; }
    this.motes.points.geometry.attributes.position.needsUpdate = true;
    // fireflies
    const ffa = smooth(0.72, 0.95, G.day);
    this.fireflies.mat.opacity = ffa * (0.75 + Math.sin(t * 3) * 0.2);
    if (ffa > 0.01) {
      const fp = this.fireflies.pos;
      for (let i = 0; i < this.fireflies.n; i++) { const [x, z, h, ph] = this.ffSeeds[i]; fp[i * 3] = x + Math.sin(t * 0.4 + ph) * 1.6; fp[i * 3 + 1] = H(x, z) + h + Math.sin(t * 1.1 + ph * 2) * 0.5; fp[i * 3 + 2] = z + Math.cos(t * 0.35 + ph) * 1.6; }
      this.fireflies.points.geometry.attributes.position.needsUpdate = true;
    }
    // trampoline squash
    const tr = this.trampoline;
    if (tr.squash > 0) { tr.squash = Math.max(0, tr.squash - dt * 3); const s = Math.sin(tr.squash * Math.PI * 3) * tr.squash; tr.mesh.position.y = 0.42 - s * 0.25; tr.g.scale.set(1 + s * 0.05, 1 - s * 0.12, 1 + s * 0.05); }
    // shadow camera follows the player
    if (pp) {
      const sd = this.sunDir || new THREE.Vector3(0.5, 0.8, 0.3);
      this.sun.target.position.set(pp.x, pp.y, pp.z);
      this.sun.position.set(pp.x + sd.x * 80, pp.y + sd.y * 80, pp.z + sd.z * 80);
    }
    for (const u of G.updaters) u(dt, t);
  }
  // day → golden hour → sunset
  setDay(d) {
    const K = [
      { t: 0.0, top: 0x4fa8ff, mid: 0xbfe4ff, bot: 0xfff4e6, sun: 0xfff3dd, si: 2.7, hemiS: 0xcfe9ff, hemiG: 0x8fbf6a, hi: 1.05, fog: 0xcfeaff, el: 1.05 },
      { t: 0.55, top: 0x6aa6f0, mid: 0xffd9a8, bot: 0xffe0b0, sun: 0xffd08a, si: 2.4, hemiS: 0xffe2c2, hemiG: 0x9ab86a, hi: 1.1, fog: 0xffe0c0, el: 0.45 },
      { t: 1.0, top: 0x5a5fb8, mid: 0xff9e8a, bot: 0xffc58f, sun: 0xff9a6a, si: 1.5, hemiS: 0xffb8a8, hemiG: 0x7a7aa0, hi: 0.95, fog: 0xf7b4a0, el: 0.16 },
    ];
    let a = K[0], b = K[1];
    if (d > K[1].t) { a = K[1]; b = K[2]; }
    const f = clamp((d - a.t) / (b.t - a.t), 0, 1);
    const C = (x, y) => new THREE.Color(x).lerp(new THREE.Color(y), f);
    const u = this.skyU;
    u.top.value.copy(C(a.top, b.top)); u.mid.value.copy(C(a.mid, b.mid)); u.bot.value.copy(C(a.bot, b.bot)); u.sunCol.value.copy(C(a.sun, b.sun));
    this.sun.color.copy(C(a.sun, b.sun)); this.sun.intensity = lerp(a.si, b.si, f);
    this.hemi.color.copy(C(a.hemiS, b.hemiS)); this.hemi.groundColor.copy(C(a.hemiG, b.hemiG)); this.hemi.intensity = lerp(a.hi, b.hi, f);
    this.scene.fog.color.copy(C(a.fog, b.fog));
    const el = lerp(a.el, b.el, f), az = -0.6 + d * 1.2;
    this.sunDir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az) * -1).normalize();
    u.sunDir.value.copy(this.sunDir);
    this.cloudMat.emissive.copy(C(0xffffff, d > 0.55 ? 0xffb89a : 0xffe8d0));
    // lights on at sunset
    const on = smooth(0.7, 0.85, d);
    for (const l of this.lamps) { l.bulbM.emissiveIntensity = 0.1 + on * 2.2; l.halo.material.opacity = on * 0.8; }
    this.mushrooms.material.emissiveIntensity = 0.35 + on * 0.8;
    if (this.roomWindow) this.roomWindow.material.color.copy(u.mid.value);
    if (G.inRoom) { this.sun.intensity = 0; this.hemi.intensity *= 0.45; }
  }
  // short sparkle burst (collect / secret effects)
  burst(pos, color = 0xffffff, n = 36) {
    const p = this.particles(n, color, 0.28, 1);
    const vel = [];
    for (let i = 0; i < n; i++) { p.pos[i * 3] = pos.x; p.pos[i * 3 + 1] = pos.y; p.pos[i * 3 + 2] = pos.z; vel.push(new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 4 + 1, (Math.random() - 0.5) * 4)); }
    this.scene.add(p.points);
    let life = 1.2;
    const fn = (dt) => {
      life -= dt;
      for (let i = 0; i < n; i++) { const v = vel[i]; v.y -= 5 * dt; p.pos[i * 3] += v.x * dt; p.pos[i * 3 + 1] += v.y * dt; p.pos[i * 3 + 2] += v.z * dt; }
      p.points.geometry.attributes.position.needsUpdate = true; p.mat.opacity = Math.max(0, life / 1.2);
      if (life <= 0) { this.scene.remove(p.points); p.points.geometry.dispose(); p.mat.dispose(); G.updaters.splice(G.updaters.indexOf(fn), 1); }
    };
    G.updaters.push(fn);
  }
  onPlayerLand(speed) {
    const p = G.player.pos, tr = this.trampoline;
    if (!G.inRoom && Math.hypot(p.x - tr.x, p.z - tr.z) < 1.65 && Math.abs(p.y - tr.y) < 0.2) {
      G.player.vy = Math.max(13.5, Math.min(16.5, speed * 0.95 + 4)); G.player.grounded = false; G.player.pos.y += 0.05;
      tr.squash = 1;
      G.ui.floatText('BOING!', p.clone().setY(p.y + 2.2), '#ff6fa5');
      G.audio?.play('boing');
      return true;
    }
    return false;
  }
}
