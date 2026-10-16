// Photo mode: frame a shot, pick angle / time / filter, export an Instagram-ready 1080×1350 postcard.
import * as THREE from 'three';
import { G, emit, farmRating } from './game.js';
import { BRAND } from './config.js';
import { roundRect } from './farm.js';

const $ = id => document.getElementById(id);
const OUT_W = 1080, OUT_H = 1350;
const CARD = { x: 54, y: 196, w: 972, h: 880 };          // photo window inside the postcard
const ANGLES = {
  hero: { target: new THREE.Vector3(0, 0, -1), yaw: Math.PI / 4, pitch: 0.62, dist: 42 },
  iso:  { target: new THREE.Vector3(0, 0, 0), yaw: Math.PI / 4, pitch: 0.95, dist: 52 },
  low:  { target: new THREE.Vector3(0, 1, 2), yaw: Math.PI / 4 + 0.25, pitch: 0.26, dist: 30 },
  top:  { target: new THREE.Vector3(0, 0, 0), yaw: Math.PI / 4, pitch: 1.33, dist: 60 },
};
const TIMES = { day: 0.2, golden: 0.47, sunset: 0.54, night: 0.75 };
const FILTERS = {
  natural: { css: 'none' },
  vivid:   { css: 'saturate(1.2) contrast(1.05)', sat: 1.2, con: 1.05 },
  warm:    { css: 'sepia(.18) saturate(1.2) brightness(1.04)', sep: 0.18, sat: 1.2, bri: 1.04 },
  pastel:  { css: 'saturate(.78) brightness(1.1) contrast(.9)', sat: 0.78, bri: 1.1, con: 0.9 },
  retro:   { css: 'sepia(.35) contrast(1.08) saturate(.92)', sep: 0.35, con: 1.08, sat: 0.92, vig: 0.45 },
};

export class Photo {
  constructor() {
    this.opts = { angle: 'free', time: 'live', filter: 'natural', frame: 'postcard' };
    this.saved = null;
    this.bind();
    document.querySelectorAll('.ig').forEach(e => e.textContent = BRAND.instagram);
  }
  bind() {
    document.querySelectorAll('#photo-ui [data-o]').forEach(b => b.onclick = () => { this.set(b.dataset.o, b.dataset.v); G.audio.play('click'); });
    $('ph-close').onclick = () => this.exit();
    $('ph-shoot').onclick = () => this.shoot();
    $('pr-retake').onclick = () => { $('photo-result').classList.add('hidden'); };
    $('pr-done').onclick = () => { $('photo-result').classList.add('hidden'); this.exit(); };
    $('pr-save').onclick = () => this.download();
    $('pr-share').onclick = () => this.share();
    $('pr-copy').onclick = () => this.copyCaption();
  }
  active() { return G.mode === 'photo'; }
  enter() {
    if (G.mode !== 'play') return;
    G.farm.cancelPlace(); G.ui.closeAll(); G.farm.highlight(null);
    this.saved = { target: G.cam.tTarget.clone(), yaw: G.cam.tYaw, pitch: G.cam.tPitch, dist: G.cam.tDist, day: G.dayT };
    G.mode = 'photo';
    $('hud').classList.add('hidden'); $('photo-ui').classList.remove('hidden');
    document.body.classList.add('photo');
    G.farm.chunks.forEach(c => { if (c.sign) c.sign.visible = false; });
    this.refreshButtons(); this.layout(); this.applyFilterPreview();
    G.audio.play('open');
  }
  exit() {
    if (G.mode !== 'photo') return;
    G.mode = 'play';
    $('hud').classList.remove('hidden'); $('photo-ui').classList.add('hidden'); $('photo-result').classList.add('hidden');
    document.body.classList.remove('photo');
    G.farm.chunks.forEach(c => { if (c.sign) c.sign.visible = true; });
    const c = G.renderer.domElement; c.style.filter = ''; Object.assign(c.style, { left: '0px', top: '0px', width: '100%', height: '100%' });
    G.cam.set(this.saved);
    if (this.opts.time !== 'live') G.dayT = this.saved.day;
    G.photoTime = null;
    G.resize();
  }
  set(k, v) {
    this.opts[k] = v;
    if (k === 'angle' && ANGLES[v]) G.cam.set(ANGLES[v]);
    if (k === 'time') G.photoTime = v === 'live' ? null : TIMES[v];
    if (k === 'filter') this.applyFilterPreview();
    if (k === 'frame') this.layout();
    this.refreshButtons();
  }
  tapScene() { this.opts.angle = 'free'; this.refreshButtons(); }
  refreshButtons() { document.querySelectorAll('#photo-ui [data-o]').forEach(b => b.classList.toggle('on', this.opts[b.dataset.o] === b.dataset.v)); }
  applyFilterPreview() { G.renderer.domElement.style.filter = FILTERS[this.opts.filter].css; }
  aspect() { return this.opts.frame === 'postcard' ? CARD.w / CARD.h : OUT_W / OUT_H; }
  // size the live canvas to exactly the photo's aspect so the preview matches the export
  layout() {
    if (G.mode !== 'photo') return;
    const short = innerHeight < 520;
    const top = short ? 42 : 64, bottom = short ? 86 : innerWidth < 700 ? 210 : 150, pad = short ? 6 : 12;
    const aw = innerWidth - pad * 2, ah = innerHeight - top - bottom;
    const a = this.aspect();
    let w = aw, hh = aw / a; if (hh > ah) { hh = ah; w = ah * a; }
    const c = G.renderer.domElement;
    Object.assign(c.style, { left: ((innerWidth - w) / 2) + 'px', top: (top + (ah - hh) / 2) + 'px', width: w + 'px', height: hh + 'px' });
    G.renderer.setSize(w, hh, false);
    G.camera.aspect = a; G.camera.updateProjectionMatrix();
    const fr = $('ph-frame'); Object.assign(fr.style, { left: c.style.left, top: c.style.top, width: c.style.width, height: c.style.height });
  }
  renderShot(w, h) {
    const r = G.renderer, prevPR = r.getPixelRatio(), size = r.getSize(new THREE.Vector2());
    r.setPixelRatio(1); r.setSize(w, h, false);
    G.camera.aspect = w / h; G.camera.updateProjectionMatrix();
    r.render(G.scene, G.camera);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d').drawImage(r.domElement, 0, 0, w, h);
    r.setPixelRatio(prevPR); r.setSize(size.x, size.y, false);
    G.camera.aspect = size.x / size.y; G.camera.updateProjectionMatrix();
    return c;
  }
  filterPixels(canvas) {
    const f = FILTERS[this.opts.filter]; if (!f.sat && !f.sep && !f.con && !f.bri && !f.vig) return canvas;
    const x = canvas.getContext('2d'), w = canvas.width, h = canvas.height;
    const img = x.getImageData(0, 0, w, h), d = img.data;
    const sat = f.sat ?? 1, con = f.con ?? 1, bri = f.bri ?? 1, sep = f.sep ?? 0, vig = f.vig ?? 0;
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      let r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
      if (sep) { const sr = r * 0.393 + g * 0.769 + b * 0.189, sg = r * 0.349 + g * 0.686 + b * 0.168, sb = r * 0.272 + g * 0.534 + b * 0.131; r += (sr - r) * sep; g += (sg - g) * sep; b += (sb - b) * sep; }
      const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
      r = l + (r - l) * sat; g = l + (g - l) * sat; b = l + (b - l) * sat;
      r = (r - 0.5) * con + 0.5; g = (g - 0.5) * con + 0.5; b = (b - 0.5) * con + 0.5;
      r *= bri; g *= bri; b *= bri;
      if (vig) { const px = (p % w) / w - 0.5, py = Math.floor(p / w) / h - 0.5; const v = 1 - vig * Math.pow(Math.min(1, (px * px + py * py) * 2.2), 1.5); r *= v; g *= v; b *= v; }
      d[i] = r * 255; d[i + 1] = g * 255; d[i + 2] = b * 255;
    }
    x.putImageData(img, 0, 0);
    return canvas;
  }
  async shoot() {
    G.audio.play('shutter');
    const fl = $('ph-flash'); fl.classList.remove('on'); void fl.offsetWidth; fl.classList.add('on');
    try { await document.fonts.load('700 40px Fredoka'); } catch (e) { }
    $('pr-img').removeAttribute('src'); $('pr-img').classList.add('developing'); $('photo-result').classList.remove('hidden'); $('pr-share').classList.add('hidden');
    $('pr-caption').textContent = 'Developing your photo…';
    await new Promise(r => setTimeout(r, 30));
    const out = document.createElement('canvas'); out.width = OUT_W; out.height = OUT_H;
    const x = out.getContext('2d');
    if (this.opts.frame === 'postcard') {
      const shot = this.filterPixels(this.renderShot(CARD.w, CARD.h));
      this.drawPostcard(x, shot);
    } else {
      const shot = this.filterPixels(this.renderShot(OUT_W, OUT_H));
      x.drawImage(shot, 0, 0);
      this.drawWatermark(x);
    }
    this.layout();
    this.result = out;
    out.toBlob(b => {
      this.blob = b;
      if (this.url) URL.revokeObjectURL(this.url);
      this.url = URL.createObjectURL(b);
      $('pr-img').src = this.url; $('pr-img').classList.remove('developing');
      $('pr-share').classList.toggle('hidden', !this.canShare());
      $('pr-caption').textContent = this.caption();
    }, 'image/png');
    G.stats.photos = (G.stats.photos || 0) + 1;
    emit('photo');
  }
  drawPostcard(x, shot) {
    // paper background with soft dots
    const bg = x.createLinearGradient(0, 0, 0, OUT_H); bg.addColorStop(0, '#fff8ec'); bg.addColorStop(1, '#ffeedd');
    x.fillStyle = bg; x.fillRect(0, 0, OUT_W, OUT_H);
    x.fillStyle = 'rgba(255,170,190,0.14)';
    for (let i = 0; i < 60; i++) { x.beginPath(); x.arc((i * 197) % OUT_W, (i * 311) % OUT_H, 6 + (i % 4) * 3, 0, Math.PI * 2); x.fill(); }
    // header
    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    x.fillStyle = '#e8618f'; x.font = '700 26px Fredoka, "Segoe UI", sans-serif';
    x.fillText(`✿  LEVEL ${G.level} FARM  ✿`, OUT_W / 2, 72);
    let fs = 76; do { x.font = `700 ${fs}px Fredoka, "Segoe UI", sans-serif`; fs -= 4; } while (x.measureText(G.farmName).width > OUT_W - 160 && fs > 30);
    x.lineWidth = 10; x.strokeStyle = '#ffffff'; x.lineJoin = 'round'; x.strokeText(G.farmName, OUT_W / 2, 152);
    x.fillStyle = '#5a3e2b'; x.fillText(G.farmName, OUT_W / 2, 152);
    // photo window
    x.save();
    x.shadowColor = 'rgba(90,60,40,0.25)'; x.shadowBlur = 30; x.shadowOffsetY = 10;
    x.fillStyle = '#fff'; roundRect(x, CARD.x - 14, CARD.y - 14, CARD.w + 28, CARD.h + 28, 44); x.fill();
    x.restore();
    x.save(); roundRect(x, CARD.x, CARD.y, CARD.w, CARD.h, 32); x.clip(); x.drawImage(shot, CARD.x, CARD.y); x.restore();
    // rating badge on the photo
    const stars = farmRating();
    x.fillStyle = 'rgba(255,255,255,0.92)'; roundRect(x, CARD.x + 22, CARD.y + 22, 252, 64, 32); x.fill();
    this.drawStars(x, CARD.x + 52, CARD.y + 66, stars, 34);
    // stats row
    const s = G.stats, stats = [['🌾', s.harvested, 'harvests'], ['🐾', G.animals.total(), 'animals'], ['📦', s.orders, 'orders'], ['🌷', G.farm.decorCount(), 'decor']];
    const sy = CARD.y + CARD.h + 70, cw = OUT_W / 4;
    stats.forEach(([ic, n, label], i) => {
      const cx = cw * i + cw / 2;
      x.font = '44px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; x.textAlign = 'center'; x.fillText(ic, cx - 52, sy + 8);
      x.fillStyle = '#5a3e2b'; x.font = '700 44px Fredoka, sans-serif'; x.textAlign = 'left'; x.fillText(String(n), cx - 22, sy + 10);
      x.fillStyle = '#a07a5c'; x.font = '600 22px Fredoka, sans-serif'; x.fillText(label, cx - 22, sy + 40);
    });
    // footer CTA + tag pill
    x.textAlign = 'center';
    x.fillStyle = '#a07a5c'; x.font = '600 26px Fredoka, sans-serif';
    x.fillText(`Grown with love on ${BRAND.game} · ${BRAND.site}`, OUT_W / 2, OUT_H - 104);
    const tag = BRAND.instagram; x.font = '700 34px Fredoka, sans-serif';
    const tw = x.measureText(tag).width + 90;
    const g = x.createLinearGradient(OUT_W / 2 - tw / 2, 0, OUT_W / 2 + tw / 2, 0); g.addColorStop(0, '#f58529'); g.addColorStop(0.5, '#dd2a7b'); g.addColorStop(1, '#8134af');
    x.fillStyle = g; roundRect(x, OUT_W / 2 - tw / 2, OUT_H - 82, tw, 56, 28); x.fill();
    x.fillStyle = '#fff'; x.fillText('📷 ' + tag, OUT_W / 2, OUT_H - 43);
    // cute corner stickers
    x.font = '64px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    x.fillText('🌻', 70, 120); x.fillText('🐔', OUT_W - 70, 120);
  }
  drawWatermark(x) {
    const label = `🌻 ${G.farmName}  ·  ${BRAND.instagram}`;
    x.font = '700 30px Fredoka, sans-serif'; const w = x.measureText(label).width + 48;
    x.fillStyle = 'rgba(255,255,255,0.88)'; roundRect(x, 34, OUT_H - 96, w, 60, 30); x.fill();
    x.fillStyle = '#5a3e2b'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(label, 58, OUT_H - 65);
    this.drawStars(x, OUT_W - 260, OUT_H - 62, farmRating(), 32, true);
  }
  drawStars(x, sx, y, n, size, shadow) {
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `700 ${size}px "Segoe UI Symbol", "Apple Symbols", sans-serif`;
    for (let i = 0; i < 5; i++) {
      const px = sx + i * size * 1.1;
      if (shadow) { x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillText('★', px + 2, y + 2); }
      x.fillStyle = '#e6dccf'; x.fillText('★', px, y);
      const fill = Math.max(0, Math.min(1, n - i));
      if (fill > 0) { x.save(); x.beginPath(); x.rect(px, y - size, size * fill, size * 1.3); x.clip(); x.fillStyle = '#ffb703'; x.fillText('★', px, y); x.restore(); }
    }
  }
  caption() { return `Meet ${G.farmName} 🌻 my cozy Level ${G.level} farm on ${BRAND.game}! Grow yours at ${BRAND.site} ${BRAND.instagram} ${BRAND.hashtags}`; }
  fileName() { return `${G.farmName.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'my-farm'}-webrise-farm.png`; }
  download() {
    const a = document.createElement('a'); a.href = this.url; a.download = this.fileName(); document.body.appendChild(a); a.click(); a.remove();
    G.ui.toast('⬇️ Saved!', `Post it on Instagram & tag ${BRAND.instagram} 💛`, 4);
  }
  canShare() {
    try { return !!(navigator.canShare && this.blob && navigator.canShare({ files: [new File([this.blob], this.fileName(), { type: 'image/png' })] })); } catch (e) { return false; }
  }
  async share() {
    const file = new File([this.blob], this.fileName(), { type: 'image/png' });
    try { await navigator.clipboard?.writeText(this.caption()); } catch (e) { }
    try { await navigator.share({ files: [file], title: G.farmName, text: this.caption() }); }
    catch (e) { if (e.name !== 'AbortError') this.download(); }
  }
  async copyCaption() {
    try { await navigator.clipboard.writeText(this.caption()); G.ui.toast('📋 Caption copied', 'Paste it into your Instagram post!'); }
    catch (e) { const r = document.createRange(); r.selectNodeContents($('pr-caption')); getSelection().removeAllRanges(); getSelection().addRange(r); G.ui.toast('📋 Select & copy', 'Copy the caption text below the photo.'); }
  }
}
