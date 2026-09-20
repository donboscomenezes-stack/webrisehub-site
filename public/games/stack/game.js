(() => {
  "use strict";

  const State = Object.freeze({
    START: "START",
    PLAYING: "PLAYING",
    RESOLVING_DROP: "RESOLVING_DROP",
    GAME_OVER: "GAME_OVER",
  });

  const canvas = document.getElementById("game");
  const shell = document.querySelector(".shell");
  const ctx = canvas.getContext("2d", { alpha: false });
  const scoreEl = document.getElementById("score");
  const bestScoreEl = document.getElementById("bestScore");
  const startPanel = document.getElementById("startPanel");
  const gameOverPanel = document.getElementById("gameOverPanel");
  const finalScoreEl = document.getElementById("finalScore");
  const finalBestEl = document.getElementById("finalBest");
  const finalPerfectEl = document.getElementById("finalPerfect");
  const finalTimeEl = document.getElementById("finalTime");
  const sharePreviewEl = document.getElementById("sharePreview");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");
  const shareButton = document.getElementById("shareButton");
  const soundToggle = document.getElementById("soundToggle");
  const soundState = document.getElementById("soundState");
  const toastEl = document.getElementById("toast");

  const storage = {
    get numberBestScore() {
      return Number(localStorage.getItem("stack.bestScore") || 0);
    },
    set numberBestScore(value) {
      localStorage.setItem("stack.bestScore", String(value));
    },
    get numberBestPerfect() {
      return Number(localStorage.getItem("stack.bestPerfectStreak") || 0);
    },
    set numberBestPerfect(value) {
      localStorage.setItem("stack.bestPerfectStreak", String(value));
    },
    get soundEnabled() {
      return localStorage.getItem("stack.sound") !== "off";
    },
    set soundEnabled(value) {
      localStorage.setItem("stack.sound", value ? "on" : "off");
    },
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const game = {
    state: State.START,
    dpr: 1,
    width: 0,
    height: 0,
    worldW: 900,
    cameraY: 0,
    targetCameraY: 0,
    score: 0,
    bestScore: storage.numberBestScore,
    bestPerfect: storage.numberBestPerfect,
    perfectStreak: 0,
    runBestPerfect: 0,
    tower: [],
    current: null,
    falling: [],
    particles: [],
    messageTimer: 0,
    pulse: 0,
    newBestShown: false,
    sound: storage.soundEnabled,
    audio: null,
    lastTime: 0,
    runStartedAt: 0,
    runEndedAt: 0,
    finalDurationMs: 0,
  };

  const blockH = 32;
  const baseY = 120;
  const minOverlapForClose = 0.22;
  const dropSpeed = 1650;

  class AudioBus {
    constructor() {
      this.ctx = null;
      this.master = null;
    }

    ensure() {
      if (this.ctx) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.18;
      this.master.connect(this.ctx.destination);
    }

    resume() {
      this.ensure();
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    }

    tone(freq, duration, type = "sine", delay = 0, gain = 1) {
      if (!game.sound) return;
      this.resume();
      if (!this.ctx) return;
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const amp = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      amp.gain.setValueAtTime(0.0001, now);
      amp.gain.exponentialRampToValueAtTime(0.5 * gain, now + 0.012);
      amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(amp);
      amp.connect(this.master);
      osc.start(now);
      osc.stop(now + duration + 0.03);
    }

    drop() {
      this.tone(150, 0.08, "triangle", 0, 0.55);
    }

    slice(amount) {
      this.tone(230 + Math.min(amount, 160), 0.06, "sawtooth", 0, 0.24);
    }

    perfect(streak) {
      this.tone(440, 0.08, "sine", 0, 0.45);
      this.tone(660 + Math.min(streak, 10) * 16, 0.12, "sine", 0.055, 0.38);
    }

    gameOver() {
      this.tone(180, 0.16, "triangle", 0, 0.5);
      this.tone(92, 0.25, "triangle", 0.11, 0.45);
    }

    record() {
      this.tone(520, 0.09, "sine", 0, 0.38);
      this.tone(780, 0.16, "sine", 0.08, 0.34);
    }
  }

  game.audio = new AudioBus();

  function resize() {
    game.dpr = Math.min(window.devicePixelRatio || 1, 2);
    game.width = Math.max(320, window.innerWidth);
    game.height = Math.max(420, window.innerHeight);
    canvas.width = Math.floor(game.width * game.dpr);
    canvas.height = Math.floor(game.height * game.dpr);
    ctx.setTransform(game.dpr, 0, 0, game.dpr, 0, 0);
    game.worldW = Math.max(620, Math.min(960, game.width * 1.15));
    if (game.state === State.START) setupPreview();
  }

  function setupPreview() {
    const width = Math.min(330, game.worldW * 0.48);
    game.tower = [
      block(game.worldW / 2 - width / 2, baseY, width, palette(0), 0),
      block(game.worldW / 2 - width * 0.47, baseY + blockH, width * 0.94, palette(1), 1),
      block(game.worldW / 2 - width * 0.43, baseY + blockH * 2, width * 0.86, palette(2), 2),
    ];
    game.current = movingBlock(width * 0.86, 3);
    game.current.y = baseY + blockH * 4.05;
    game.cameraY = 0;
    game.targetCameraY = 0;
  }

  function block(x, y, w, color, level) {
    return { x, y, w, h: blockH, color, level, squash: 0 };
  }

  function movingBlock(w, level) {
    const direction = chooseDirection(level);
    const margin = 32;
    const start = direction > 0 ? margin - w : game.worldW - margin;
    const speed = difficultySpeed(level);
    return {
      x: start,
      y: baseY + (level + 1) * blockH,
      w,
      h: blockH,
      color: palette(level),
      level,
      direction,
      speed,
      dropV: 0,
      dropping: false,
      wobble: Math.random() * Math.PI * 2,
    };
  }

  function chooseDirection(level) {
    if (level < 4) return level % 2 === 0 ? 1 : -1;
    return Math.random() > 0.5 ? 1 : -1;
  }

  function difficultySpeed(level) {
    const base = Math.min(520, 205 + level * 11);
    const rhythm = level > 8 ? 1 + (Math.random() - 0.5) * 0.18 : 1;
    const lateKick = level > 28 ? Math.min(70, (level - 28) * 3) : 0;
    return (base + lateKick) * rhythm;
  }

  function palette(level) {
    const hue = (level * 47 + 8) % 360;
    const sat = 78 + (level % 3) * 4;
    const light = 60 + (level % 2) * 4;
    return `hsl(${hue} ${sat}% ${light}%)`;
  }

  function resetRun() {
    game.state = State.PLAYING;
    game.score = 0;
    game.perfectStreak = 0;
    game.runBestPerfect = 0;
    game.newBestShown = false;
    game.falling.length = 0;
    game.particles.length = 0;
    game.messageTimer = 0;
    game.pulse = 0;
    game.runStartedAt = performance.now();
    game.runEndedAt = 0;
    game.finalDurationMs = 0;
    const startW = Math.min(330, game.worldW * 0.5);
    game.tower = [block(game.worldW / 2 - startW / 2, baseY, startW, palette(0), 0)];
    game.current = movingBlock(startW, 1);
    game.cameraY = 0;
    game.targetCameraY = 0;
    updateHud();
    showPanel(startPanel, false);
    showPanel(gameOverPanel, false);
  }

  function showPanel(panel, visible) {
    panel.classList.toggle("is-visible", visible);
    panel.setAttribute("aria-hidden", String(!visible));
    panel.toggleAttribute("inert", !visible);
  }

  function updateHud() {
    scoreEl.textContent = String(game.score);
    bestScoreEl.textContent = String(game.bestScore);
    syncDebugAttributes();
  }

  function syncDebugAttributes() {
    shell.dataset.state = game.state;
    shell.dataset.score = String(game.score);
    shell.dataset.best = String(game.bestScore);
    shell.dataset.perfectStreak = String(game.perfectStreak);
    shell.dataset.runBestPerfect = String(game.runBestPerfect);
    shell.dataset.time = formatDuration(game.finalDurationMs || currentRunDuration());
  }

  function startDrop() {
    if (game.state === State.START || game.state === State.GAME_OVER) {
      resetRun();
      game.audio.resume();
      return;
    }
    if (game.state !== State.PLAYING || !game.current) return;
    game.state = State.RESOLVING_DROP;
    game.current.dropping = true;
    game.current.dropV = dropSpeed;
    game.audio.drop();
  }

  function settleCurrent() {
    const current = game.current;
    const previous = game.tower[game.tower.length - 1];
    const currentLeft = current.x;
    const currentRight = current.x + current.w;
    const previousLeft = previous.x;
    const previousRight = previous.x + previous.w;
    const overlapLeft = Math.max(currentLeft, previousLeft);
    const overlapRight = Math.min(currentRight, previousRight);
    const overlap = overlapRight - overlapLeft;

    if (overlap <= 0) {
      current.dropV = 760;
      createFalling(current.x, previous.y + blockH, current.w, current.h, current.color, current.direction * 0.08);
      game.current = null;
      game.audio.gameOver();
      setTimeout(() => finishGameOver(), reduceMotion ? 120 : 390);
      return;
    }

    const diff = Math.abs(current.x - previous.x);
    const threshold = Math.max(5, Math.min(13, previous.w * 0.045));
    const isPerfect = diff <= threshold;
    let newX = overlapLeft;
    let newW = overlap;

    if (isPerfect) {
      const restore = Math.min(8, (Math.min(340, previous.w + 18) - previous.w) * 0.55);
      newW = Math.min(340, previous.w + Math.max(0, restore));
      newX = previous.x + previous.w / 2 - newW / 2;
      game.perfectStreak += 1;
      game.runBestPerfect = Math.max(game.runBestPerfect, game.perfectStreak);
      game.pulse = Math.min(1.6, 0.7 + game.perfectStreak * 0.05);
      showToast(`Perfect x${game.perfectStreak}`);
      burst(newX + newW / 2, previous.y + blockH, 9 + Math.min(18, game.perfectStreak * 2), true);
      game.audio.perfect(game.perfectStreak);
    } else {
      game.perfectStreak = 0;
      const cutLeft = currentLeft < previousLeft ? previousLeft - currentLeft : 0;
      const cutRight = currentRight > previousRight ? currentRight - previousRight : 0;
      if (cutLeft > 0) createFalling(currentLeft, previous.y + blockH, cutLeft, current.h, current.color, -0.1);
      if (cutRight > 0) createFalling(previousRight, previous.y + blockH, cutRight, current.h, current.color, 0.1);
      game.audio.slice(Math.max(cutLeft, cutRight));
      burst(current.x + (cutLeft > 0 ? cutLeft : current.w - cutRight), previous.y + blockH, 6, false);
      if (overlap / previous.w < minOverlapForClose && game.score > 3) showToast(Math.random() > 0.5 ? "Barely" : "That was close");
    }

    const placed = block(newX, previous.y + blockH, newW, current.color, current.level);
    placed.squash = reduceMotion ? 0.05 : 0.22;
    game.tower.push(placed);
    game.score += 1;

    if (game.score > game.bestScore) {
      game.bestScore = game.score;
      storage.numberBestScore = game.bestScore;
      if (!game.newBestShown && game.score > 1) {
        showToast("New Best");
        game.audio.record();
        game.newBestShown = true;
      }
    }
    if (game.perfectStreak > game.bestPerfect) {
      game.bestPerfect = game.perfectStreak;
      storage.numberBestPerfect = game.bestPerfect;
    }

    game.current = movingBlock(newW, game.tower.length);
    game.targetCameraY = Math.max(0, placed.y - game.height * 0.42);
    game.state = State.PLAYING;
    updateHud();
  }

  function createFalling(x, y, w, h, color, spin) {
    if (w <= 0.5) return;
    game.falling.push({
      x,
      y,
      w,
      h,
      color,
      vx: (Math.random() * 80 + 40) * Math.sign(spin || 1),
      vy: -90 - Math.random() * 50,
      rot: 0,
      spin: spin + (Math.random() - 0.5) * 0.08,
      alpha: 1,
    });
  }

  function burst(x, y, count, perfect) {
    if (reduceMotion) count = Math.min(4, count);
    for (let i = 0; i < count && game.particles.length < 90; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const s = (perfect ? 130 : 75) * (0.4 + Math.random() * 0.8);
      game.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s + (perfect ? 25 : 0),
        life: perfect ? 0.52 : 0.34,
        max: perfect ? 0.52 : 0.34,
        size: perfect ? 2.2 + Math.random() * 2.2 : 1.5 + Math.random() * 1.8,
        color: perfect ? "#f4e0a8" : "#d6c7aa",
      });
    }
  }

  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("is-visible");
    game.messageTimer = 0.72;
  }

  function finishGameOver() {
    if (game.state === State.GAME_OVER) return;
    game.state = State.GAME_OVER;
    game.runEndedAt = performance.now();
    game.finalDurationMs = Math.max(0, game.runEndedAt - game.runStartedAt);
    finalScoreEl.textContent = String(game.score);
    finalBestEl.textContent = String(game.bestScore);
    finalPerfectEl.textContent = String(game.runBestPerfect);
    finalTimeEl.textContent = formatDuration(game.finalDurationMs);
    sharePreviewEl.textContent = buildShareText();
    updateHud();
    showPanel(gameOverPanel, true);
  }

  function currentRunDuration() {
    if (game.state === State.START || !game.runStartedAt) return 0;
    return (game.runEndedAt || performance.now()) - game.runStartedAt;
  }

  function formatDuration(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  function buildShareText() {
    const blocks = game.score === 1 ? "block" : "blocks";
    const perfects = game.runBestPerfect === 1 ? "perfect" : "perfects";
    return `I stacked ${game.score} ${blocks} in ${formatDuration(game.finalDurationMs)} on STACK. Best perfect streak: ${game.runBestPerfect} ${perfects}.`;
  }

  async function shareResult(event) {
    event.stopPropagation();
    const text = buildShareText();
    try {
      if (navigator.share) {
        await navigator.share({ title: "STACK result", text });
        showToast("Shared");
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast("Copied");
        return;
      }
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
    showToast(text);
  }

  function update(dt) {
    if (game.state === State.PLAYING && game.current) {
      const block = game.current;
      block.wobble += dt * 2.4;
      block.x += block.direction * block.speed * dt;
      const leftBound = 18 - block.w;
      const rightBound = game.worldW - 18;
      if (block.x < leftBound) {
        block.x = leftBound;
        block.direction = 1;
      } else if (block.x > rightBound) {
        block.x = rightBound;
        block.direction = -1;
      }
    } else if (game.state === State.RESOLVING_DROP && game.current) {
      game.current.y -= game.current.dropV * dt;
      const previous = game.tower[game.tower.length - 1];
      const targetY = previous.y + blockH;
      if (game.current.y <= targetY) {
        game.current.y = targetY;
        settleCurrent();
      }
    }

    const cameraEase = reduceMotion ? 0.34 : 0.09;
    game.cameraY += (game.targetCameraY - game.cameraY) * (1 - Math.pow(1 - cameraEase, dt * 60));
    game.pulse = Math.max(0, game.pulse - dt * 1.9);
    if (game.messageTimer > 0) {
      game.messageTimer -= dt;
      if (game.messageTimer <= 0) toastEl.classList.remove("is-visible");
    }

    for (let i = game.tower.length - 1; i >= 0; i -= 1) {
      const b = game.tower[i];
      b.squash = Math.max(0, b.squash - dt * 1.8);
    }

    for (let i = game.falling.length - 1; i >= 0; i -= 1) {
      const f = game.falling[i];
      f.vy -= 980 * dt;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.rot += f.spin * dt * 8;
      f.alpha -= dt * 0.12;
      if (worldToScreenY(f.y) > game.height + 180 || f.alpha <= 0) game.falling.splice(i, 1);
    }

    for (let i = game.particles.length - 1; i >= 0; i -= 1) {
      const p = game.particles[i];
      p.life -= dt;
      p.vy -= 260 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life <= 0) game.particles.splice(i, 1);
    }
  }

  function draw() {
    drawBackground();
    ctx.save();
    ctx.translate(worldOffsetX(), game.height - 92 + game.cameraY);
    drawStageShadow();
    for (const b of game.tower) drawBlock(b);
    if (game.current) drawBlock(game.current);
    for (const f of game.falling) drawFalling(f);
    for (const p of game.particles) drawParticle(p);
    ctx.restore();
    drawAtmosphere();
  }

  function worldOffsetX() {
    return game.width / 2 - game.worldW / 2;
  }

  function worldToScreenY(y) {
    return game.height - 92 + game.cameraY - y;
  }

  function drawBackground() {
    const climb = Math.min(1, game.score / 45);
    const r = Math.round(16 - climb * 3);
    const g = Math.round(17 + climb * 8);
    const b = Math.round(19 + climb * 16);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, game.width, game.height);
    const glow = ctx.createLinearGradient(0, 0, 0, game.height);
    glow.addColorStop(0, `rgba(${42 + climb * 28}, ${43 + climb * 12}, ${47 + climb * 20}, 0.36)`);
    glow.addColorStop(0.48, "rgba(0, 0, 0, 0)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0.3)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, game.width, game.height);
  }

  function drawAtmosphere() {
    const topFade = ctx.createLinearGradient(0, 0, 0, game.height * 0.26);
    topFade.addColorStop(0, "rgba(244, 240, 232, 0.035)");
    topFade.addColorStop(1, "rgba(244, 240, 232, 0)");
    ctx.fillStyle = topFade;
    ctx.fillRect(0, 0, game.width, game.height * 0.26);
  }

  function drawStageShadow() {
    const last = game.tower[game.tower.length - 1];
    if (!last) return;
    ctx.save();
    ctx.globalAlpha = 0.13;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.ellipse(game.worldW / 2, -baseY + 17, Math.max(95, last.w * 0.9), 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBlock(b) {
    const screenY = -b.y;
    const pulseScale = game.pulse > 0 && b === game.tower[game.tower.length - 1] ? 1 + game.pulse * 0.012 : 1;
    const squash = b.squash || 0;
    ctx.save();
    ctx.translate(b.x + b.w / 2, screenY + b.h / 2);
    ctx.scale(pulseScale + squash * 0.09, pulseScale - squash * 0.1);
    roundedBlock(-b.w / 2, -b.h / 2, b.w, b.h, 4);
    ctx.shadowColor = "rgba(0, 0, 0, 0.34)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = b.color;
    ctx.fill();
    ctx.shadowColor = "transparent";
    const shine = ctx.createLinearGradient(0, -b.h / 2, 0, b.h / 2);
    shine.addColorStop(0, "rgba(255, 255, 255, 0.24)");
    shine.addColorStop(0.42, "rgba(255, 255, 255, 0.06)");
    shine.addColorStop(1, "rgba(0, 0, 0, 0.18)");
    ctx.fillStyle = shine;
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  function drawFalling(f) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, f.alpha);
    ctx.translate(f.x + f.w / 2, -f.y + f.h / 2);
    ctx.rotate(f.rot);
    roundedBlock(-f.w / 2, -f.h / 2, f.w, f.h, 4);
    ctx.shadowColor = "rgba(0, 0, 0, 0.28)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = f.color;
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "rgba(0, 0, 0, 0.14)";
    ctx.fill();
    ctx.restore();
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, -p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function roundedBlock(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  function frame(now) {
    const dt = Math.min(0.032, (now - game.lastTime) / 1000 || 0.016);
    game.lastTime = now;
    update(dt);
    syncDebugAttributes();
    draw();
    requestAnimationFrame(frame);
  }

  function handlePointer(event) {
    if (event.target === soundToggle) return;
    event.preventDefault();
    startDrop();
  }

  function handleKey(event) {
    if (event.code !== "Space") return;
    event.preventDefault();
    startDrop();
  }

  function toggleSound(event) {
    event.stopPropagation();
    game.sound = !game.sound;
    storage.soundEnabled = game.sound;
    soundToggle.setAttribute("aria-pressed", String(game.sound));
    soundState.textContent = game.sound ? "On" : "Off";
    if (game.sound) {
      game.audio.resume();
      game.audio.tone(520, 0.08, "sine", 0, 0.25);
    }
  }

  function boot() {
    bestScoreEl.textContent = String(game.bestScore);
    soundToggle.setAttribute("aria-pressed", String(game.sound));
    soundState.textContent = game.sound ? "On" : "Off";
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", handleKey, { passive: false });
    canvas.addEventListener("pointerdown", handlePointer, { passive: false });
    startButton.addEventListener("click", startDrop);
    restartButton.addEventListener("click", startDrop);
    shareButton.addEventListener("click", shareResult);
    soundToggle.addEventListener("click", toggleSound);
    showPanel(startPanel, true);
    showPanel(gameOverPanel, false);
    requestAnimationFrame((time) => {
      game.lastTime = time;
      requestAnimationFrame(frame);
    });
  }

  window.STACK_DEBUG = {
    game,
    resetRun,
    startDrop,
    settleCurrent,
    State,
  };

  boot();
})();
