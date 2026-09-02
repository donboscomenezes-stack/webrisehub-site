import { Confetti, animateNumber, createDrawSound, setupFloatingShapes } from "./animations.js";
import { DrawingEngine } from "./drawingEngine.js";
import { average, loadStats, ratingFor, saveResult } from "./gameState.js";
import { drawShapeToCanvas, getShape, renderShapeMask, SHAPES } from "./shapes.js";
import { scoreDrawing } from "./scoring.js";

const screens = [...document.querySelectorAll(".screen")];
const shapeGrid = document.querySelector("#shapeGrid");
const drawingCanvas = document.querySelector("#drawingCanvas");
const referenceCanvas = document.querySelector("#referenceCanvas");
const referenceThumb = document.querySelector("#referenceThumb");
const confetti = new Confetti(document.querySelector("#fxCanvas"));
const sound = createDrawSound();

let currentShape = getDailyShape();
let latestResult = null;
let startedAt = 0;
let timerId = null;

setupFloatingShapes(document.querySelector(".bg-shapes"));

const engine = new DrawingEngine(drawingCanvas, {
  onChange: updateDrawingState,
  onDrawPoint: () => sound.chirp(document.querySelector("#soundToggle").checked)
});

buildShapeGrid();
hydrateHome();
wireEvents();

function wireEvents() {
  document.querySelector("#startBtn").addEventListener("click", () => showScreen("chooseScreen"));
  document.querySelector("#dailyBtn").addEventListener("click", () => selectShape(getDailyShape().id));
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.go));
  });
  document.querySelector("#brushSize").addEventListener("input", (event) => engine.setBrushSize(event.target.value));
  document.querySelector("#undoBtn").addEventListener("click", () => engine.undo());
  document.querySelector("#redoBtn").addEventListener("click", () => engine.redo());
  document.querySelector("#clearBtn").addEventListener("click", () => engine.clear());
  document.querySelector("#finishBtn").addEventListener("click", finishDrawing);
  document.querySelector("#tryAgainBtn").addEventListener("click", () => selectShape(currentShape.id));
  document.querySelector("#elseBtn").addEventListener("click", () => showScreen("chooseScreen"));
  document.querySelector("#shareBtn").addEventListener("click", shareScore);
  document.querySelector("#overlayToggle").addEventListener("change", renderOverlay);
}

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("screen-active", screen.id === id);
  });
  if (id !== "drawScreen") stopTimer();
  if (id === "drawScreen") {
    requestAnimationFrame(() => engine.resize());
    startTimer();
  }
}

function buildShapeGrid() {
  const categories = ["Easy", "Medium", "Hard"];
  shapeGrid.innerHTML = categories
    .map((category) => {
      const cards = SHAPES.filter((shape) => shape.category === category)
        .map((shape) => `<button class="shape-card" data-shape="${shape.id}">
          <canvas width="128" height="128" aria-hidden="true"></canvas>
          <strong>${shape.name}</strong>
          <span class="difficulty-${shape.difficulty.toLowerCase()}">${shape.difficulty}</span>
        </button>`)
        .join("");
      return `<section class="shape-category"><h3>${category}</h3><div class="category-grid">${cards}</div></section>`;
    })
    .join("");

  shapeGrid.querySelectorAll(".shape-card").forEach((card) => {
    const shape = getShape(card.dataset.shape);
    drawShapeToCanvas(card.querySelector("canvas"), shape, { color: "#171512", lineWidth: 8 });
    card.addEventListener("click", () => selectShape(shape.id));
  });
}

function selectShape(id) {
  currentShape = getShape(id);
  document.querySelector("#drawTitle").textContent = `Draw a ${currentShape.name}`;
  drawShapeToCanvas(referenceCanvas, currentShape, { color: "#171512", lineWidth: 15 });
  drawShapeToCanvas(referenceThumb, currentShape, { color: "#171512", lineWidth: 8 });
  engine.clear();
  showReference();
}

function showReference() {
  showScreen("referenceScreen");
  const countdown = document.querySelector("#countdown");
  let count = 3;
  countdown.textContent = count;
  const interval = setInterval(() => {
    count--;
    countdown.textContent = count || "Draw";
    if (count <= 0) {
      clearInterval(interval);
      setTimeout(() => {
        referenceThumb.hidden = !document.querySelector("#keepReference").checked;
        showScreen("drawScreen");
      }, 420);
    }
  }, 820);
}

function updateDrawingState(count) {
  document.querySelector("#emptyHint").hidden = count > 0;
}

function startTimer() {
  startedAt = Date.now();
  const timer = document.querySelector("#timer");
  timerId = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    timer.textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
  }, 250);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function finishDrawing() {
  const targetMask = renderShapeMask(currentShape, 420);
  const userCanvas = engine.exportCanvas(420, 420);
  latestResult = scoreDrawing(userCanvas, targetMask);
  const stats = saveResult(currentShape, latestResult.overall);
  renderResult(userCanvas, targetMask, stats);
  showScreen("resultScreen");
  if (latestResult.overall >= 90) confetti.burst();
  if (latestResult.overall < 40) {
    const burst = document.querySelector("#scoreBurst");
    burst.classList.remove("shake");
    requestAnimationFrame(() => burst.classList.add("shake"));
  }
}

function renderResult(userCanvas, targetCanvas, stats) {
  const score = latestResult.overall;
  document.querySelector("#animatedScore").textContent = "0%";
  document.querySelector("#rating").textContent = ratingFor(score);
  animateNumber(document.querySelector("#animatedScore"), score);

  drawCanvasInto(document.querySelector("#targetResultCanvas"), targetCanvas);
  drawCanvasInto(document.querySelector("#userResultCanvas"), userCanvas);

  document.querySelector("#metricAccuracy").textContent = `${score}%`;
  document.querySelector("#metricShape").textContent = `${latestResult.metrics.shape}%`;
  document.querySelector("#metricPosition").textContent = `${latestResult.metrics.position}%`;
  document.querySelector("#metricSize").textContent = `${latestResult.metrics.size}%`;
  document.querySelector("#metricStroke").textContent = `${latestResult.metrics.stroke}%`;
  renderStats(stats);
  document.querySelector("#shareStatus").textContent = "";
  document.querySelector("#overlayToggle").checked = false;
  renderOverlay();
}

function drawCanvasInto(canvas, source) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
}

function renderOverlay() {
  const overlay = document.querySelector("#overlayCanvas");
  overlay.hidden = !document.querySelector("#overlayToggle").checked || !latestResult;
  if (overlay.hidden) return;
  const ctx = overlay.getContext("2d");
  ctx.clearRect(0, 0, overlay.width, overlay.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, overlay.width, overlay.height);
  ctx.globalAlpha = 0.8;
  ctx.drawImage(latestResult.normalizedUser, 0, 0, overlay.width, overlay.height);
  ctx.globalAlpha = 0.72;
  ctx.globalCompositeOperation = "multiply";
  ctx.strokeStyle = "#ff5a3d";
  ctx.lineWidth = 1;
  ctx.drawImage(tintCanvas(latestResult.normalizedTarget, "#ff5a3d"), 0, 0, overlay.width, overlay.height);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

function tintCanvas(source, color) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext("2d");
  const sourceCtx = source.getContext("2d");
  const src = sourceCtx.getImageData(0, 0, source.width, source.height);
  const out = ctx.createImageData(source.width, source.height);
  const rgb = hexToRgb(color);
  for (let i = 0; i < src.data.length; i += 4) {
    const darkness = 255 - Math.max(src.data[i], src.data[i + 1], src.data[i + 2]);
    const alpha = src.data[i + 3] > 20 && darkness > 25 ? Math.min(255, darkness * 2.2) : 0;
    out.data[i] = rgb.r;
    out.data[i + 1] = rgb.g;
    out.data[i + 2] = rgb.b;
    out.data[i + 3] = alpha;
  }
  ctx.putImageData(out, 0, 0);
  return canvas;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16)
  };
}

async function shareScore() {
  if (!latestResult) return;
  const text = `I scored ${latestResult.overall}% drawing a ${currentShape.name.toLowerCase()} on DrawMatch. Can you beat me?`;
  const status = document.querySelector("#shareStatus");
  try {
    if (navigator.share) {
      await navigator.share({ title: "DrawMatch", text });
      status.textContent = "Shared.";
    } else {
      await navigator.clipboard.writeText(text);
      status.textContent = "Copied score to clipboard.";
    }
  } catch {
    status.textContent = "Share canceled.";
  }
}

function hydrateHome() {
  const daily = getDailyShape();
  const stats = loadStats();
  document.querySelector("#dailyName").textContent = `Draw a ${daily.name}`;
  document.querySelector("#dailyBest").textContent = `Best Score: ${stats.objectBests[daily.id] || 0}%`;
  renderStats(stats);
}

function renderStats(stats) {
  document.querySelector("#bestScore").textContent = `${stats.bestScore || 0}%`;
  document.querySelector("#averageScore").textContent = `${average(stats)}%`;
  document.querySelector("#completedCount").textContent = stats.completed || 0;
  document.querySelector("#bestObject").textContent = stats.bestObject || "-";
  const streak = document.querySelector("#streakStat strong");
  streak.textContent = stats.streak >= 3 ? `${stats.streak} DRAW STREAK` : stats.streak || 0;
}

function getDailyShape() {
  const now = new Date();
  const seed = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000;
  return SHAPES[Math.floor(seed) % SHAPES.length];
}
