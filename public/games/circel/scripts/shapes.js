export const SHAPES = [
  { id: "circle", name: "Circle", category: "Easy", difficulty: "Easy", draw: drawCircle },
  { id: "square", name: "Square", category: "Easy", difficulty: "Easy", draw: drawSquare },
  { id: "triangle", name: "Triangle", category: "Easy", difficulty: "Easy", draw: drawTriangle },
  { id: "heart", name: "Heart", category: "Easy", difficulty: "Easy", draw: drawHeart },
  { id: "star", name: "Star", category: "Easy", difficulty: "Easy", draw: drawStar },
  { id: "cloud", name: "Cloud", category: "Medium", difficulty: "Medium", draw: drawCloud },
  { id: "flower", name: "Flower", category: "Medium", difficulty: "Medium", draw: drawFlower },
  { id: "apple", name: "Apple", category: "Medium", difficulty: "Medium", draw: drawApple },
  { id: "fish", name: "Fish", category: "Medium", difficulty: "Medium", draw: drawFish },
  { id: "bolt", name: "Lightning Bolt", category: "Medium", difficulty: "Medium", draw: drawBolt },
  { id: "cat", name: "Cat", category: "Hard", difficulty: "Hard", draw: drawCat },
  { id: "house", name: "House", category: "Hard", difficulty: "Hard", draw: drawHouse },
  { id: "rocket", name: "Rocket", category: "Hard", difficulty: "Hard", draw: drawRocket },
  { id: "umbrella", name: "Umbrella", category: "Hard", difficulty: "Hard", draw: drawUmbrella },
  { id: "bicycle", name: "Bicycle", category: "Hard", difficulty: "Hard", draw: drawBicycle }
];

export function getShape(id) {
  return SHAPES.find((shape) => shape.id === id) || SHAPES[0];
}

export function drawShapeToCanvas(canvas, shape, options = {}) {
  const ctx = canvas.getContext("2d");
  const size = Math.min(canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate((canvas.width - size) / 2, (canvas.height - size) / 2);
  shape.draw(ctx, size, options);
  ctx.restore();
}

export function renderShapeMask(shape, size = 220) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  drawShapeToCanvas(canvas, shape, { color: "#111", lineWidth: 13 });
  return canvas;
}

function setup(ctx, size, options) {
  ctx.strokeStyle = options.color || "#171512";
  ctx.fillStyle = options.fill || "transparent";
  ctx.lineWidth = options.lineWidth || Math.max(5, size * 0.055);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function drawCircle(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.32, 0, Math.PI * 2);
  ctx.stroke();
}

function drawSquare(ctx, size, options = {}) {
  setup(ctx, size, options);
  const s = size * 0.58;
  ctx.strokeRect((size - s) / 2, (size - s) / 2, s, s);
}

function drawTriangle(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.18);
  ctx.lineTo(size * 0.82, size * 0.78);
  ctx.lineTo(size * 0.18, size * 0.78);
  ctx.closePath();
  ctx.stroke();
}

function drawHeart(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.79);
  ctx.bezierCurveTo(size * 0.16, size * 0.55, size * 0.16, size * 0.29, size * 0.36, size * 0.27);
  ctx.bezierCurveTo(size * 0.47, size * 0.25, size * 0.5, size * 0.36, size * 0.5, size * 0.36);
  ctx.bezierCurveTo(size * 0.5, size * 0.36, size * 0.56, size * 0.25, size * 0.68, size * 0.27);
  ctx.bezierCurveTo(size * 0.89, size * 0.31, size * 0.83, size * 0.58, size * 0.5, size * 0.79);
  ctx.stroke();
}

function drawStar(ctx, size, options = {}) {
  setup(ctx, size, options);
  const cx = size / 2;
  const cy = size / 2;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? size * 0.35 : size * 0.15;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawCloud(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.moveTo(size * 0.25, size * 0.66);
  ctx.bezierCurveTo(size * 0.08, size * 0.64, size * 0.12, size * 0.42, size * 0.3, size * 0.43);
  ctx.bezierCurveTo(size * 0.34, size * 0.22, size * 0.61, size * 0.2, size * 0.67, size * 0.41);
  ctx.bezierCurveTo(size * 0.83, size * 0.37, size * 0.91, size * 0.55, size * 0.78, size * 0.67);
  ctx.closePath();
  ctx.stroke();
}

function drawFlower(ctx, size, options = {}) {
  setup(ctx, size, options);
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const x = size * 0.5 + Math.cos(a) * size * 0.16;
    const y = size * 0.42 + Math.sin(a) * size * 0.16;
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.11, size * 0.17, a, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(size * 0.5, size * 0.42, size * 0.08, 0, Math.PI * 2);
  ctx.moveTo(size * 0.5, size * 0.57);
  ctx.quadraticCurveTo(size * 0.45, size * 0.72, size * 0.5, size * 0.86);
  ctx.moveTo(size * 0.48, size * 0.7);
  ctx.quadraticCurveTo(size * 0.32, size * 0.62, size * 0.32, size * 0.76);
  ctx.stroke();
}

function drawApple(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.32);
  ctx.bezierCurveTo(size * 0.25, size * 0.18, size * 0.18, size * 0.49, size * 0.28, size * 0.7);
  ctx.bezierCurveTo(size * 0.37, size * 0.9, size * 0.48, size * 0.79, size * 0.5, size * 0.79);
  ctx.bezierCurveTo(size * 0.52, size * 0.79, size * 0.63, size * 0.9, size * 0.72, size * 0.7);
  ctx.bezierCurveTo(size * 0.84, size * 0.47, size * 0.73, size * 0.2, size * 0.5, size * 0.32);
  ctx.moveTo(size * 0.51, size * 0.3);
  ctx.quadraticCurveTo(size * 0.52, size * 0.16, size * 0.64, size * 0.13);
  ctx.moveTo(size * 0.54, size * 0.23);
  ctx.quadraticCurveTo(size * 0.68, size * 0.21, size * 0.73, size * 0.31);
  ctx.stroke();
}

function drawFish(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.ellipse(size * 0.45, size * 0.52, size * 0.28, size * 0.18, 0, 0, Math.PI * 2);
  ctx.moveTo(size * 0.72, size * 0.52);
  ctx.lineTo(size * 0.9, size * 0.36);
  ctx.lineTo(size * 0.9, size * 0.68);
  ctx.closePath();
  ctx.moveTo(size * 0.32, size * 0.48);
  ctx.arc(size * 0.32, size * 0.48, size * 0.012, 0, Math.PI * 2);
  ctx.stroke();
}

function drawBolt(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.moveTo(size * 0.57, size * 0.12);
  ctx.lineTo(size * 0.28, size * 0.52);
  ctx.lineTo(size * 0.5, size * 0.52);
  ctx.lineTo(size * 0.4, size * 0.88);
  ctx.lineTo(size * 0.75, size * 0.43);
  ctx.lineTo(size * 0.54, size * 0.43);
  ctx.closePath();
  ctx.stroke();
}

function drawCat(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.arc(size * 0.5, size * 0.55, size * 0.28, 0, Math.PI * 2);
  ctx.moveTo(size * 0.29, size * 0.38);
  ctx.lineTo(size * 0.32, size * 0.16);
  ctx.lineTo(size * 0.45, size * 0.32);
  ctx.moveTo(size * 0.55, size * 0.32);
  ctx.lineTo(size * 0.68, size * 0.16);
  ctx.lineTo(size * 0.71, size * 0.38);
  ctx.moveTo(size * 0.41, size * 0.5);
  ctx.arc(size * 0.41, size * 0.5, size * 0.012, 0, Math.PI * 2);
  ctx.moveTo(size * 0.59, size * 0.5);
  ctx.arc(size * 0.59, size * 0.5, size * 0.012, 0, Math.PI * 2);
  ctx.moveTo(size * 0.5, size * 0.57);
  ctx.lineTo(size * 0.5, size * 0.62);
  ctx.moveTo(size * 0.5, size * 0.62);
  ctx.quadraticCurveTo(size * 0.42, size * 0.66, size * 0.36, size * 0.62);
  ctx.moveTo(size * 0.5, size * 0.62);
  ctx.quadraticCurveTo(size * 0.58, size * 0.66, size * 0.64, size * 0.62);
  ctx.stroke();
}

function drawHouse(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.moveTo(size * 0.18, size * 0.48);
  ctx.lineTo(size * 0.5, size * 0.18);
  ctx.lineTo(size * 0.82, size * 0.48);
  ctx.moveTo(size * 0.26, size * 0.45);
  ctx.lineTo(size * 0.26, size * 0.82);
  ctx.lineTo(size * 0.74, size * 0.82);
  ctx.lineTo(size * 0.74, size * 0.45);
  ctx.moveTo(size * 0.45, size * 0.82);
  ctx.lineTo(size * 0.45, size * 0.62);
  ctx.lineTo(size * 0.57, size * 0.62);
  ctx.lineTo(size * 0.57, size * 0.82);
  ctx.stroke();
}

function drawRocket(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.13);
  ctx.bezierCurveTo(size * 0.27, size * 0.35, size * 0.34, size * 0.68, size * 0.5, size * 0.78);
  ctx.bezierCurveTo(size * 0.66, size * 0.68, size * 0.73, size * 0.35, size * 0.5, size * 0.13);
  ctx.moveTo(size * 0.43, size * 0.76);
  ctx.lineTo(size * 0.32, size * 0.88);
  ctx.moveTo(size * 0.57, size * 0.76);
  ctx.lineTo(size * 0.68, size * 0.88);
  ctx.moveTo(size * 0.5, size * 0.8);
  ctx.lineTo(size * 0.5, size * 0.93);
  ctx.moveTo(size * 0.5, size * 0.39);
  ctx.arc(size * 0.5, size * 0.39, size * 0.07, 0, Math.PI * 2);
  ctx.stroke();
}

function drawUmbrella(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.arc(size * 0.5, size * 0.52, size * 0.34, Math.PI, Math.PI * 2);
  ctx.lineTo(size * 0.84, size * 0.52);
  ctx.quadraticCurveTo(size * 0.76, size * 0.62, size * 0.68, size * 0.52);
  ctx.quadraticCurveTo(size * 0.59, size * 0.63, size * 0.5, size * 0.52);
  ctx.quadraticCurveTo(size * 0.41, size * 0.63, size * 0.32, size * 0.52);
  ctx.quadraticCurveTo(size * 0.24, size * 0.62, size * 0.16, size * 0.52);
  ctx.moveTo(size * 0.5, size * 0.52);
  ctx.lineTo(size * 0.5, size * 0.82);
  ctx.quadraticCurveTo(size * 0.5, size * 0.92, size * 0.39, size * 0.9);
  ctx.stroke();
}

function drawBicycle(ctx, size, options = {}) {
  setup(ctx, size, options);
  ctx.beginPath();
  ctx.arc(size * 0.28, size * 0.68, size * 0.15, 0, Math.PI * 2);
  ctx.moveTo(size * 0.87, size * 0.68);
  ctx.arc(size * 0.72, size * 0.68, size * 0.15, 0, Math.PI * 2);
  ctx.moveTo(size * 0.28, size * 0.68);
  ctx.lineTo(size * 0.45, size * 0.46);
  ctx.lineTo(size * 0.56, size * 0.68);
  ctx.lineTo(size * 0.28, size * 0.68);
  ctx.moveTo(size * 0.56, size * 0.68);
  ctx.lineTo(size * 0.72, size * 0.68);
  ctx.lineTo(size * 0.58, size * 0.45);
  ctx.lineTo(size * 0.45, size * 0.46);
  ctx.moveTo(size * 0.43, size * 0.4);
  ctx.lineTo(size * 0.55, size * 0.4);
  ctx.moveTo(size * 0.58, size * 0.45);
  ctx.lineTo(size * 0.68, size * 0.34);
  ctx.lineTo(size * 0.77, size * 0.38);
  ctx.stroke();
}
