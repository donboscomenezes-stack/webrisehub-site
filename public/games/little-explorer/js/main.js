// Little Explorer — entry point: loading, menus, input, game modes, story, room, selfie, main loop.
import * as THREE from 'three';
import { GLTFLoader } from './lib/addons/loaders/GLTFLoader.js';
import { G, clamp, smooth, terrainHeight as H } from './state.js';
import { World, LOC } from './world.js';
import { prepareCharacter, Player, ThirdPersonCam } from './player.js';
import { Interactions, setupActivities, setupNPCs, Cat, Ducks, Dog } from './interactions.js';
import { Collectibles, makeItemMesh } from './collectibles.js';
import { UI } from './ui.js';
import { Audio } from './audio.js';

const $ = id => document.getElementById(id);
const DAY_LENGTH = 11 * 60;   // seconds of play from bright day to sunset

/* ---------------- renderer ---------------- */
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
window.G = G; // handy for debugging in the console
$('game').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 600);
camera.position.set(20, 14, 30);
Object.assign(G, { renderer, scene, camera, clock: new THREE.Clock(), pressed: {} });
G.ui = new UI();
G.audio = new Audio();
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });

/* ---------------- loading ---------------- */
const M = 'assets/models/';
const ASSETS = [
  { key: 'player', file: 'anime_female_mage.glb', size: 6.0, required: true },
  { key: 'house', file: 'pixellabs-house-3334.glb', size: 1.8 },
  { key: 'watchtower', file: 'pixellabs-watchtower-3424.glb', size: 1.8 },
  { key: 'signpost', file: 'pixellabs-fantasy-signpost-3561.glb', size: 1.75 },
  { key: 'wizard', file: 'pixellabs-fantasy-3830.glb', size: 2.05 },
  { key: 'floating', file: 'pixellabs-floating-house-3416.glb', size: 1.65 },
  { key: 'reaper', file: 'pixellabs-glb-3402.glb', size: 1.85 },
  { key: 'castle', file: 'tiny_planet_friends_3d-castle-3002.glb', size: 3.5 },
  { key: 'undead', file: 'pixellabs-undead-3417.glb', size: 1.8 },
  { key: 'novice', file: 'wings_of_freedom-novice-3675.glb', size: 3.3 },
];
const TEXTURES = ['head', 'body', 'eyes', 'hair', 'outfit'];

async function loadAll() {
  const loader = new GLTFLoader();
  const texLoader = new THREE.TextureLoader();
  const totalW = ASSETS.reduce((a, b) => a + b.size, 0) + TEXTURES.length * 0.5;
  const prog = {};
  const report = () => G.ui.setLoad(Object.values(prog).reduce((a, b) => a + b, 0) / totalW * 0.92);
  const texPromises = TEXTURES.map(n => new Promise(res => {
    texLoader.load(`assets/textures/${n}_color.png`, t => { t.flipY = false; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; prog['t' + n] = 0.5; report(); res([n, t]); },
      undefined, e => { console.warn('texture failed', n, e); prog['t' + n] = 0.5; res([n, null]); });
  }));
  const modelPromises = ASSETS.map(a => new Promise(res => {
    loader.load(M + a.file, g => { prog[a.key] = a.size; report(); res([a.key, g]); },
      e => { if (e.total) { prog[a.key] = a.size * e.loaded / e.total * 0.95; report(); } },
      err => { console.error(`[Loader] ${a.file} failed — continuing without it`, err); prog[a.key] = a.size; report(); res([a.key, null]); });
  }));
  const textures = Object.fromEntries(await Promise.all(texPromises));
  for (const [k, g] of await Promise.all(modelPromises)) if (g) G.models[k] = g;
  if (!G.models.player) throw new Error('Player character failed to load');
  return textures;
}

/* ---------------- game setup ---------------- */
async function init() {
  const textures = await loadAll();
  G.ui.setLoad(0.94);
  await new Promise(r => setTimeout(r, 30));
  const world = new World(); G.world = world;
  world.build();
  G.inter = new Interactions();
  // player
  const char = prepareCharacter(G.models.player, textures);
  const player = new Player(char, G.models.player.animations);
  G.player = player;
  G.cam = new ThirdPersonCam(camera);
  G.cam.cinematic = { t: 0 };
  player.teleport(-1.2, 0, 6.2, Math.PI);
  G.collect = new Collectibles();
  G.collect.spawn();
  setupActivities();
  G.npcs = setupNPCs();
  G.cat = new Cat(); G.ducks = new Ducks(); G.dog = new Dog();
  setupRoom();
  setupStory();
  world.setDay(0);
  G.ui.setCount(0, G.collect.total);
  // warm up: compile shaders & upload textures before showing the menu
  renderer.compile(scene, camera);
  G.ui.setLoad(1);
  await new Promise(r => setTimeout(r, 350));
  G.ui.show('loading', false);
  G.setMode('menu');
  loop();
}

/* ---------------- modes ---------------- */
G.setMode = (m) => {
  const prev = G.mode; G.mode = m;
  G.ui.show('menu', m === 'menu');
  G.ui.show('howto', m === 'howto');
  G.ui.show('hud', m === 'play' || m === 'dialog');
  G.ui.show('pause', m === 'paused');
  G.ui.show('backpack', m === 'backpack');
  G.ui.show('selfie', m === 'selfie');
  G.ui.show('complete', m === 'complete');
  if (m === 'backpack') G.ui.renderBackpack();
  const needLock = m === 'play' || m === 'dialog';
  if (!needLock && document.pointerLockElement) document.exitPointerLock();
  if (m === 'play') $('clickhint').classList.toggle('hidden', !!document.pointerLockElement);
  G.player && (G.player.frozen = m !== 'play');
  for (const k in G.keys) G.keys[k] = false;
};
let howtoReturn = 'play';
$('btn-play').onclick = () => { G.audio.init(); G.audio.play('click'); if (!G.flags.seenHowTo) { howtoReturn = 'start'; G.setMode('howto'); } else startGame(); };
$('btn-howto').onclick = () => { G.audio.init(); G.audio.play('click'); howtoReturn = 'menu'; G.setMode('howto'); };
$('btn-start').onclick = () => {
  G.audio.play('click');
  G.flags.seenHowTo = true;
  if (howtoReturn === 'menu') G.setMode('menu');
  else if (howtoReturn === 'paused') G.setMode('paused');
  else startGame();
};
$('btn-howto').addEventListener('click', () => { $('btn-start').textContent = 'BACK'; });
$('btn-play').addEventListener('click', () => { $('btn-start').textContent = 'START EXPLORING'; });
$('btn-resume').onclick = () => { G.setMode('play'); lock(); };
$('btn-p-howto').onclick = () => { howtoReturn = 'paused'; $('btn-start').textContent = 'BACK'; G.setMode('howto'); };
$('btn-p-bag').onclick = () => { bagReturn = 'paused'; G.setMode('backpack'); };
$('btn-p-menu').onclick = () => { G.cam.cinematic = { t: 0 }; G.setMode('menu'); };
$('btn-continue').onclick = () => { G.setMode('play'); lock(); };
$('btn-collection').onclick = () => { bagReturn = 'play'; G.setMode('backpack'); };
$('btn-photo').onclick = () => takePhoto();
$('btn-selfie-exit').onclick = () => exitSelfie();
let bagReturn = 'play';
let started = false;
function startGame() {
  G.cam.cinematic = null;
  if (!started) {
    started = true;
    G.cam.yaw = G.player.yaw; G.cam.pitch = 0.22; G.cam.snap();
    setTimeout(() => G.ui.toast('🌸 WELCOME', 'Little Village', 3.5), 600);
    setTimeout(() => G.ui.toast('', 'Tip: talk to the little monk near the fountain!', 4, true), 4500);
  }
  G.cam.snap();
  G.setMode('play');
  lock();
}

/* ---------------- input ---------------- */
function lock() { try { const r = renderer.domElement.requestPointerLock?.(); r?.catch?.(() => {}); } catch (e) { } }
let dragging = false;
renderer.domElement.addEventListener('mousedown', e => {
  if (G.mode === 'play') { if (!document.pointerLockElement) lock(); }
  if (G.mode === 'selfie') dragging = true;
  if (G.mode === 'dialog') G.ui.advanceDialog();
});
$('dialog').addEventListener('mousedown', () => G.ui.advanceDialog());
addEventListener('mouseup', () => dragging = false);
addEventListener('mousemove', e => {
  if (!G.cam || G.cam.cinematic) return;
  if (G.mode !== 'play' && G.mode !== 'selfie') return;
  if (document.pointerLockElement || dragging) G.cam.onMouse(e.movementX, e.movementY);
});
addEventListener('wheel', e => { if (G.cam && (G.mode === 'play' || G.mode === 'selfie')) G.cam.onWheel(e.deltaY); }, { passive: true });
document.addEventListener('pointerlockchange', () => {
  const locked = !!document.pointerLockElement;
  $('clickhint').classList.toggle('hidden', locked || G.mode !== 'play');
  // browser ESC releases pointer lock → treat as pause
  if (!locked && G.mode === 'play' && !G._ignoreUnlock) { G.setMode('paused'); G._pausedAt = performance.now(); }
  G._ignoreUnlock = false;
});
addEventListener('keydown', e => {
  if (e.repeat) { G.keys[e.code] = true; return; }
  G.keys[e.code] = true; G.pressed[e.code] = true;
  if (['Space', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.code)) e.preventDefault();
  const m = G.mode;
  if (m === 'dialog' && (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter')) { G.pressed = {}; G.ui.advanceDialog(); return; }
  if (e.code === 'Escape') {
    if (m === 'play') G.setMode('paused');
    else if (m === 'paused') { if (performance.now() - (G._pausedAt || 0) > 400) { G.setMode('play'); lock(); } }
    else if (m === 'backpack') { G.setMode(bagReturn); if (bagReturn === 'play') lock(); }
    else if (m === 'selfie') exitSelfie();
    else if (m === 'howto' && howtoReturn !== 'start') $('btn-start').click();
  }
  if (e.code === 'KeyB') {
    if (m === 'play') { bagReturn = 'play'; G._ignoreUnlock = true; G.setMode('backpack'); }
    else if (m === 'backpack') { G.setMode(bagReturn); if (bagReturn === 'play') lock(); }
  }
  if (e.code === 'KeyP') { if (m === 'play' && !G.player.mount) enterSelfie(); else if (m === 'selfie') exitSelfie(); }
  if (m === 'selfie' && (e.code === 'Space' || e.code === 'Enter')) takePhoto();
  if (e.code === 'KeyM') { G.audio.musicOn = !G.audio.musicOn; G.ui.toast('', G.audio.musicOn ? '🎵 Music on' : '🔇 Music off', 1.5, true); }
});
addEventListener('keyup', e => { G.keys[e.code] = false; });
addEventListener('blur', () => { for (const k in G.keys) G.keys[k] = false; });

/* ---------------- selfie mode ---------------- */
let lastPhoto = null;
function enterSelfie() {
  G.cam.selfie = { yaw: 0.25, pitch: 0.08, dist: 1.9, fresh: true };
  G._ignoreUnlock = true; G.setMode('selfie');
  G.player.anim.play('wave', 0.3);
}
function exitSelfie() { G.cam.selfie = null; G._ignoreUnlock = true; G.setMode('play'); lock(); G.cam.snap(); }
function takePhoto() {
  G.audio.play('shutter');
  renderer.render(scene, camera);
  let url = null;
  try { url = renderer.domElement.toDataURL('image/png'); } catch (e) { console.warn('Photo capture blocked', e); }
  const f = $('flash'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on');
  if (url) {
    lastPhoto = url;
    try { const a = document.createElement('a'); a.href = url; a.download = `little-explorer-${Date.now()}.png`; document.body.appendChild(a); a.click(); a.remove(); } catch (e) { }
    const img = new Image(); img.onload = () => { const t = new THREE.Texture(img); t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; G.photoTex = t; if (G.flags.photoHung) hangPhoto(); }; img.src = url;
    G.flags.tookPhoto = true;
  }
  setTimeout(() => G.ui.toast('📸 SNAP!', url ? 'Photo saved! Hang it in your room 🏡' : 'What a lovely moment!', 2.6), 400);
}

/* ---------------- home & decorating ---------------- */
function fadeSwap(fn) {
  const ov = document.createElement('div');
  Object.assign(ov.style, { position: 'fixed', inset: 0, background: '#fff8ef', opacity: 0, transition: 'opacity .35s', zIndex: 30, pointerEvents: 'none' });
  document.body.appendChild(ov); requestAnimationFrame(() => ov.style.opacity = 1);
  setTimeout(() => { fn(); ov.style.opacity = 0; setTimeout(() => ov.remove(), 400); }, 380);
}
function hangPhoto() { const s = G.world.roomSlots.photo; if (G.photoTex) { s.mesh.material = new THREE.MeshBasicMaterial({ map: G.photoTex }); } }
function setupRoom() {
  const W = G.world, P = G.player, C = G.collect;
  const door = W.houseDoor;
  G.inter.add({ id: 'home', pos: new THREE.Vector3(door.x, H(door.x, door.z), door.z), radius: 2.2, text: 'Enter Home', action: () => fadeSwap(() => {
    G.audio.play('door');
    G.inRoom = true; W.room.visible = true;
    P.teleport(W.roomDoor.x, 0, W.roomDoor.z - 0.6, Math.PI);
    G.cam.yaw = Math.PI; G.cam.pitch = 0.3; G.cam.snap();
    G.cat.enterRoom(true);
    if (!G.flags.visitedRoom) { G.flags.visitedRoom = true; setTimeout(() => G.ui.toast('🏡 HOME SWEET HOME', 'Decorate your room with what you discover!', 3.5), 500); }
  }) });
  G.inter.add({ id: 'exit', room: true, pos: new THREE.Vector3(W.roomDoor.x, 0, W.roomDoor.z), radius: 1.5, text: 'Go Outside', action: () => fadeSwap(() => {
    G.audio.play('door');
    G.inRoom = false; W.room.visible = false;
    P.teleport(door.x + 1.2, H(door.x + 1.2, door.z), door.z, Math.PI / 2);
    G.cam.yaw = Math.PI / 2; G.cam.pitch = 0.25; G.cam.snap();
    G.cat.enterRoom(false);
  }) });
  // decoration slots
  const placed = { flower: 0, toy: 0, crystal: 0, secret: 0 };
  const groups = {};
  const slotCats = { vase: 'flower', shelf: 'hidden', desk: 'crystal', pedestal: 'secret' };
  const vaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.28, 12), new THREE.MeshStandardMaterial({ color: 0x9fd8ff, roughness: 0.3 }));
  vaseMesh.position.copy(W.roomSlots.vase.pos).y += 0.14; G.scene.add(vaseMesh); vaseMesh.visible = false;
  const decorate = (slot) => {
    const cat = slotCats[slot], s = W.roomSlots[slot];
    const ids = C.order.filter(id => C.items[id].cat === cat);
    if (groups[slot]) G.scene.remove(groups[slot]);
    const g = new THREE.Group();
    ids.forEach((id, i) => {
      const m = makeItemMesh(C.items[id]);
      m.children.filter(c => c.isSprite).forEach(c => c.visible = false);
      if (slot === 'vase') { m.scale.setScalar(0.7); const a = i / Math.max(1, ids.length) * Math.PI * 2; m.position.set(Math.cos(a) * 0.05, 0.05, Math.sin(a) * 0.05); m.rotation.z = Math.cos(a) * 0.3; m.rotation.x = Math.sin(a) * 0.3; }
      else if (slot === 'shelf') { m.scale.setScalar(0.8); m.position.set(0, Math.floor(i / 3) * 0.6, -0.55 + (i % 3) * 0.55); m.rotation.y = -Math.PI / 2; }
      else if (slot === 'desk') { m.scale.setScalar(0.55); m.position.set(-0.6 + i * 0.3, -0.25, 0); }
      else { m.scale.setScalar(1); m.position.y = -0.4; }
      g.add(m);
    });
    g.position.copy(s.pos); G.scene.add(g); groups[slot] = g;
    if (slot === 'vase') vaseMesh.visible = true;
    placed[cat] = ids.length;
    G.ui.toast('🏡 DECORATED', `${s.label} (${ids.length})`, 2.2);
    G.audio.play('pickup');
  };
  for (const slot of Object.keys(slotCats)) {
    const s = W.roomSlots[slot], cat = slotCats[slot];
    G.inter.add({ id: 'deco-' + slot, room: true, pos: s.pos.clone().setY(0), radius: 1.6,
      enabled: () => C.countCat(cat) > (placed[cat] || 0),
      text: () => (placed[cat] ? 'Add to ' : 'Decorate: ') + s.label, action: () => decorate(slot) });
  }
  G.inter.add({ id: 'deco-photo', room: true, pos: W.roomSlots.photo.pos.clone().setY(0), radius: 1.8,
    enabled: () => !!G.photoTex && G.photoTex !== G._hung,
    text: 'Hang Your Photo', action: () => { hangPhoto(); G._hung = G.photoTex; G.flags.photoHung = true; G.ui.toast('🖼️ DECORATED', 'Your selfie looks great on the wall!', 2.5); G.audio.play('pickup'); } });
  G.inter.add({ id: 'room-hint', room: true, pos: W.roomSlots.photo.pos.clone().setY(0), radius: 1.8,
    enabled: () => !G.photoTex, text: 'Photo Frame (take a selfie with P!)', action: () => G.ui.toast('', '📸 Take a selfie outside with P, then come back to hang it.', 3, true) });
  G.inter.add({ id: 'bed', room: true, pos: W.roomSlots.bed.pos.clone().setY(0), radius: 1.6, enabled: () => C.has('musicbox'), text: 'Rest a Moment', action: () => { G.ui.toast('💤', 'You feel cozy and refreshed!', 2.5, true); G.player.playOnce('wave', 1.5); } });
}

/* ---------------- story ---------------- */
function setupStory() {
  const W = G.world;
  G.onQuestItem = (id) => {
    if (id === 'key') {
      if (G.flags.talkedTobi) setTimeout(() => G.ui.toast('', '🗝️ This must be Tobi\'s key! Bring it back to the village.', 3.5, true), 1500);
      else setTimeout(() => G.ui.toast('', '🗝️ A strange golden key... someone must have lost it.', 3.5, true), 1500);
    }
    if (id === 'catfood') setTimeout(() => G.ui.toast('', '🐟 Maybe the cat near your house would like this...', 3.5, true), 1500);
    if (id === 'duckfood') setTimeout(() => G.ui.toast('', '🌾 The ducks will love this!', 3, true), 1200);
  };
  G.onDiscovery = (id) => {
    G.audio.play('discover');
    const n = G.collect.found.size;
    if (n === 5) setTimeout(() => G.ui.toast('', '🎒 Press B to see your backpack!', 3, true), 3500);
    if (id === 'starlight' && !G.flags.complete) {
      G.flags.complete = true;
      setTimeout(() => { G.audio.play('secret'); G.setMode('complete'); }, 2600);
    }
  };
  // entering the garden
  G.updaters.push(() => {
    if (G.flags.gardenFound || !G.flags.gateOpen || G.inRoom) return;
    const p = G.player.pos;
    if (Math.hypot(p.x - LOC.garden.x, p.z - LOC.garden.z) < LOC.garden.r - 1.8) {
      G.flags.gardenFound = true;
      G.ui.banner('✨ SECRET DISCOVERED', 'THE HIDDEN GARDEN');
      G.audio.play('secret');
      G.world.burst(p.clone().setY(p.y + 1.5), 0xd9b8ff, 60);
    }
  });
  // discovering zones → gentle location toasts
  const zones = [
    { id: 'park', x: 22, z: -10, r: 9, name: '🛝 Sunny Park' }, { id: 'pond', x: POND().x, z: POND().z, r: 12, name: '🦆 Lily Pond' },
    { id: 'forest', x: -22, z: -18, r: 7, name: '🌳 Whispering Woods' }, { id: 'tower', x: LOC.tower.x, z: LOC.tower.z, r: 8, name: '🗼 Old Watchtower' },
    { id: 'castle', x: 0, z: -55, r: 9, name: '🏰 Castle Hill' }, { id: 'kite', x: LOC.kite.x, z: LOC.kite.z, r: 6, name: '🪁 Kite Hill' },
  ];
  G.updaters.push(() => {
    if (G.inRoom || G.mode !== 'play') return;
    const p = G.player.pos;
    for (const z of zones) if (!G.flags['z_' + z.id] && Math.hypot(p.x - z.x, p.z - z.z) < z.r) { G.flags['z_' + z.id] = true; G.ui.toast('📍 NOW EXPLORING', z.name, 2.6); }
  });
}
function POND() { return { x: 30, z: 22 }; }

/* ---------------- main loop ---------------- */
let envTimer = 0, dayTimer = 0, lastInRoom = false;
function loop() {
  requestAnimationFrame(loop);
  frame(Math.min(G.clock.getDelta(), 1 / 20));
}
// debug helper: advance the simulation manually (e.g. G.step(60) in the console)
G.step = (n = 1, dt = 1 / 60) => { for (let i = 0; i < n; i++) frame(dt, i === n - 1); };
function frame(dt, draw = true) {
  const playing = G.mode === 'play' || G.mode === 'dialog' || G.mode === 'selfie';
  const worldRuns = G.mode !== 'backpack' && G.mode !== 'paused';   // backpack & pause freeze gameplay
  if (worldRuns) {
    const t = (G.time += dt);
    if (playing && started) {
      G.day = clamp(G.day + dt / DAY_LENGTH, 0, 1);
    }
    dayTimer -= dt; if (dayTimer < 0) { dayTimer = 0.2; G.world.setDay(G.day); }
    if (G.inRoom !== lastInRoom) { lastInRoom = G.inRoom; G.world.setDay(G.day); scene.fog.near = G.inRoom ? 400 : 70; scene.fog.far = G.inRoom ? 500 : 190; }
    envTimer -= dt; if (envTimer < 0) { envTimer = 20; if (G.day > 0.02) G.world.refreshEnv(); }
    G.player.update(dt);
    G.player.updateHeld(dt);
    G.world.update(dt, t);
    G.collect.update(dt, t);
    G.cat.update(dt); G.ducks.update(dt, t); G.dog.update(dt, t);
    G.inter.update(dt);
    G.ui.update(dt);
    G.cam.update(dt);
    G.audio.update(G.day);
  }
  G.pressed = {};
  if (draw) renderer.render(scene, camera);
}

init().catch(err => {
  console.error(err);
  $('load-pct').textContent = 'Something went wrong: ' + err.message + ' (run from a local web server)';
});
