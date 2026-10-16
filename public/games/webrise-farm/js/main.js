// Webrise Farm — a cozy little farm. Entry point: renderer, title screen, starting farm, main loop.
import * as THREE from 'three';
import { G, refreshOrders } from './game.js';
import { DAY_LENGTH, BRAND } from './config.js';
import { World } from './world.js';
import { FX } from './fx.js';
import { Farm } from './farm.js';
import { Animals, Kitchen } from './animals.js';
import { CameraRig, Input } from './input.js';
import { UI } from './ui.js';
import { Photo } from './photo.js';
import { Audio } from './audio.js';
import { Workers } from './workers.js';

const $ = id => document.getElementById(id);
const mobile = matchMedia('(pointer: coarse)').matches;

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.6 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
$('game').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, 0.5, 900);
Object.assign(G, { renderer, scene, camera, updaters: [] });
window.G = G; // handy for debugging in the console

G.audio = new Audio();
G.fx = new FX();
G.world = new World(); G.world.build();
G.workers = new Workers();
G.farm = new Farm();
G.animals = new Animals();
G.kitchen = new Kitchen();
G.cam = new CameraRig(camera);
G.ui = new UI();
G.photo = new Photo();
G.input = new Input();

G.resize = () => {
  if (G.mode === 'photo') { G.photo.layout(); return; }
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  // keep the farm comfortably in view on narrow (portrait) screens
  G.cam.maxD = innerWidth < innerHeight ? 110 : 80;
};
addEventListener('resize', G.resize);
G.resize();

/* ---------------- the starting farm ---------------- */
function seedFarm() {
  const F = G.farm;
  for (let i = 6; i <= 9; i++) for (let j = 6; j <= 7; j++) F.till(F.get(i, j), true);
  for (let i = 6; i <= 9; i++) { const t = F.get(i, 6); F.plant(t, 'wheat', true); t.progress = 1; F.setStage(t, 3); }
  for (const i of [6, 7]) { const t = F.get(i, 7); F.plant(t, 'carrot', true); t.progress = 0.4; F.setStage(t, 1); }
  F.placeDecor('flowers', F.get(5, 9), 0, true);
  F.placeDecor('bench', F.get(10, 9), 2, true);
  F.placeDecor('path', F.get(7, 11), 0, true); F.placeDecor('path', F.get(8, 11), 0, true);
  F.placeDecor('appletree', F.get(11, 5), 0, true);
  G.animals.spawn('chicken', true);
  G.animals.addDog();
  G.workers.hire('joe', true);
  refreshOrders();
  // the first order is always something easy
  G.orders[0] = { ...G.orders[0], needs: { wheat: 2 }, coins: 15, xp: 3, face: '🐰', who: 'Mrs. Bunny' };
}
seedFarm();

/* ---------------- title screen ---------------- */
G.cam.set({ target: new THREE.Vector3(0, 0, -2), yaw: 0.2, pitch: 0.5, dist: 58 }, true);
$('tag-line').textContent = `Snap a photo of your farm & tag ${BRAND.instagram}`;
// Full screen (hides the browser's address bar on Android / desktop; iPhone Safari doesn't allow it)
const fsEl = document.documentElement;
const canFull = !!(fsEl.requestFullscreen || fsEl.webkitRequestFullscreen);
const isFull = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
G.toggleFullscreen = (on = !isFull()) => {
  try {
    if (on) (fsEl.requestFullscreen ? fsEl.requestFullscreen({ navigationUI: 'hide' }) : fsEl.webkitRequestFullscreen())?.catch?.(() => {});
    else (document.exitFullscreen || document.webkitExitFullscreen)?.call(document)?.catch?.(() => {});
  } catch (e) { }
};
if (canFull) {
  $('btn-full').classList.remove('hidden');
  $('btn-full').onclick = () => G.toggleFullscreen();
  const sync = () => { $('btn-full').textContent = isFull() ? '🗗' : '⛶'; setTimeout(G.resize, 120); };
  document.addEventListener('fullscreenchange', sync); document.addEventListener('webkitfullscreenchange', sync);
}
// re-fit after the phone is rotated (some browsers report the new size a moment late)
addEventListener('orientationchange', () => setTimeout(G.resize, 250));
$('start-btn').onclick = () => {
  G.audio.unlock();
  if (mobile && canFull) G.toggleFullscreen(true);
  const n = $('farm-input').value.trim();
  G.ui.setFarmName(n || 'My Little Farm');
  $('title').classList.add('leaving');
  setTimeout(() => $('title').classList.add('hidden'), 600);
  $('hud').classList.remove('hidden');
  G.mode = 'play';
  G.cam.set({ target: new THREE.Vector3(0, 0, 3), yaw: Math.PI / 4, pitch: 0.88, dist: mobile && innerWidth < innerHeight ? 60 : 40 });
  G.ui.start();
  G.audio.play('levelup');
};
$('farm-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('start-btn').click(); });
addEventListener('beforeunload', e => { if (G.stats.harvested + G.stats.planted > 6) { e.preventDefault(); e.returnValue = ''; } });

/* ---------------- loop ---------------- */
const clock = new THREE.Clock();
let skyTimer = 0;
function frame(dt, draw = true) {
  G.time += dt;
  const t = G.time;
  if (G.mode === 'title') { G.cam.tYaw += dt * 0.05; }
  if (G.mode === 'play') G.dayT = (G.dayT + dt / DAY_LENGTH) % 1;
  skyTimer -= dt;
  if (skyTimer <= 0 || G.mode === 'photo') { skyTimer = 0.1; G.world.setTime(G.photoTime ?? G.dayT); }
  G.input.update(dt);
  G.cam.update(dt);
  G.world.update(dt, t);
  G.farm.update(dt, t);
  G.animals.update(dt, t);
  G.kitchen.update(dt, t);
  G.workers.update(dt, t);
  for (const u of [...G.updaters]) u(dt, t);
  G.fx.update(dt);
  G.ui.update(dt);
  G.audio.update(G.world.night > 0.5);
  if (draw) renderer.render(scene, camera);
}
function loop() { requestAnimationFrame(loop); frame(Math.min(clock.getDelta(), 1 / 20)); }
G.step = (n = 1, dt = 1 / 60) => { for (let i = 0; i < n; i++) frame(dt, i === n - 1); };
renderer.compile(scene, camera);
$('loading').classList.add('hidden');
loop();

// offline support (service worker caches the whole game on first visit)
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(e => console.warn('Offline mode unavailable', e)));
}
