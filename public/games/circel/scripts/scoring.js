const SAMPLE_SIZE = 180;

export function scoreDrawing(userCanvas, targetCanvas) {
  const userInfo = extractMask(userCanvas);
  if (!userInfo.hasInk) return emptyScore();

  const targetInfo = extractMask(targetCanvas);
  const normalizedUser = normalizeToSample(userCanvas, userInfo.bbox);
  const normalizedTarget = normalizeToSample(targetCanvas, targetInfo.bbox);

  const userMask = readBinaryMask(normalizedUser);
  const targetMask = readBinaryMask(normalizedTarget);
  const userEdges = edgeMap(userMask);
  const targetEdges = edgeMap(targetMask);

  const targetDistance = distanceTransform(targetMask);
  const userDistance = distanceTransform(userMask);
  const edgeDistance = distanceTransform(targetEdges);

  const shapeSimilarity = tolerantIoU(userMask, targetMask, targetDistance, userDistance, 10);
  const strokeSimilarity = directedEdgeScore(userEdges, targetEdges, edgeDistance, 12);
  const sizeAccuracy = compareSize(userInfo.bbox, targetInfo.bbox, userCanvas, targetCanvas);
  const positionAccuracy = comparePosition(userInfo.bbox, userCanvas);

  const raw =
    shapeSimilarity * 0.6 +
    sizeAccuracy * 0.15 +
    positionAccuracy * 0.1 +
    strokeSimilarity * 0.15;

  const overall = Math.round(clamp(raw * 100, 0, 100));
  return {
    overall,
    metrics: {
      shape: Math.round(shapeSimilarity * 100),
      size: Math.round(sizeAccuracy * 100),
      position: Math.round(positionAccuracy * 100),
      stroke: Math.round(strokeSimilarity * 100)
    },
    normalizedUser,
    normalizedTarget
  };
}

function emptyScore() {
  const blank = document.createElement("canvas");
  blank.width = SAMPLE_SIZE;
  blank.height = SAMPLE_SIZE;
  return {
    overall: 0,
    metrics: { shape: 0, size: 0, position: 0, stroke: 0 },
    normalizedUser: blank,
    normalizedTarget: blank
  };
}

function extractMask(canvas) {
  const ctx = canvas.getContext("2d");
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = -1;
  let maxY = -1;
  let count = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      const alpha = image[i + 3];
      const darkness = 255 - Math.max(image[i], image[i + 1], image[i + 2]);
      if (alpha > 30 && darkness > 20) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        count++;
      }
    }
  }

  return {
    hasInk: count > 18,
    inkCount: count,
    bbox: { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1 }
  };
}

function normalizeToSample(canvas, bbox) {
  const out = document.createElement("canvas");
  out.width = SAMPLE_SIZE;
  out.height = SAMPLE_SIZE;
  const ctx = out.getContext("2d");
  const pad = 22;
  const safeW = Math.max(1, bbox.width);
  const safeH = Math.max(1, bbox.height);
  const scale = Math.min((SAMPLE_SIZE - pad * 2) / safeW, (SAMPLE_SIZE - pad * 2) / safeH);
  const w = safeW * scale;
  const h = safeH * scale;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  ctx.drawImage(
    canvas,
    bbox.minX,
    bbox.minY,
    safeW,
    safeH,
    (SAMPLE_SIZE - w) / 2,
    (SAMPLE_SIZE - h) / 2,
    w,
    h
  );
  return out;
}

function readBinaryMask(canvas) {
  const data = canvas.getContext("2d").getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
  const mask = new Uint8Array(SAMPLE_SIZE * SAMPLE_SIZE);
  for (let i = 0; i < mask.length; i++) {
    const j = i * 4;
    const darkness = 255 - Math.max(data[j], data[j + 1], data[j + 2]);
    mask[i] = data[j + 3] > 20 && darkness > 25 ? 1 : 0;
  }
  return mask;
}

function edgeMap(mask) {
  const edge = new Uint8Array(mask.length);
  for (let y = 1; y < SAMPLE_SIZE - 1; y++) {
    for (let x = 1; x < SAMPLE_SIZE - 1; x++) {
      const i = y * SAMPLE_SIZE + x;
      if (!mask[i]) continue;
      if (!mask[i - 1] || !mask[i + 1] || !mask[i - SAMPLE_SIZE] || !mask[i + SAMPLE_SIZE]) edge[i] = 1;
    }
  }
  return edge;
}

// Two-pass chamfer distance gives every pixel its distance to the nearest ink pixel.
// That lets rough human lines score well when they are close to the target line.
function distanceTransform(mask) {
  const dist = new Float32Array(mask.length);
  const inf = 1e6;
  for (let i = 0; i < mask.length; i++) dist[i] = mask[i] ? 0 : inf;

  for (let y = 0; y < SAMPLE_SIZE; y++) {
    for (let x = 0; x < SAMPLE_SIZE; x++) {
      const i = y * SAMPLE_SIZE + x;
      if (x > 0) dist[i] = Math.min(dist[i], dist[i - 1] + 1);
      if (y > 0) dist[i] = Math.min(dist[i], dist[i - SAMPLE_SIZE] + 1);
      if (x > 0 && y > 0) dist[i] = Math.min(dist[i], dist[i - SAMPLE_SIZE - 1] + 1.4);
      if (x < SAMPLE_SIZE - 1 && y > 0) dist[i] = Math.min(dist[i], dist[i - SAMPLE_SIZE + 1] + 1.4);
    }
  }

  for (let y = SAMPLE_SIZE - 1; y >= 0; y--) {
    for (let x = SAMPLE_SIZE - 1; x >= 0; x--) {
      const i = y * SAMPLE_SIZE + x;
      if (x < SAMPLE_SIZE - 1) dist[i] = Math.min(dist[i], dist[i + 1] + 1);
      if (y < SAMPLE_SIZE - 1) dist[i] = Math.min(dist[i], dist[i + SAMPLE_SIZE] + 1);
      if (x < SAMPLE_SIZE - 1 && y < SAMPLE_SIZE - 1) dist[i] = Math.min(dist[i], dist[i + SAMPLE_SIZE + 1] + 1.4);
      if (x > 0 && y < SAMPLE_SIZE - 1) dist[i] = Math.min(dist[i], dist[i + SAMPLE_SIZE - 1] + 1.4);
    }
  }

  return dist;
}

function tolerantIoU(userMask, targetMask, targetDistance, userDistance, tolerance) {
  let intersection = 0;
  let union = 0;
  let targetCount = 0;
  let userCount = 0;

  for (let i = 0; i < userMask.length; i++) {
    const userNear = userMask[i] || userDistance[i] <= tolerance;
    const targetNear = targetMask[i] || targetDistance[i] <= tolerance;
    if (userMask[i]) userCount++;
    if (targetMask[i]) targetCount++;
    if (userNear && targetNear) intersection++;
    if (userNear || targetNear) union++;
  }

  const iou = union ? intersection / union : 0;
  const coverage = coverageScore(userMask, targetDistance, tolerance);
  const recall = coverageScore(targetMask, userDistance, tolerance);
  const inkBalance = 1 - Math.min(1, Math.abs(userCount - targetCount) / Math.max(targetCount, userCount, 1));
  return clamp(iou * 0.45 + coverage * 0.25 + recall * 0.25 + inkBalance * 0.05, 0, 1);
}

function coverageScore(sourceMask, otherDistance, tolerance) {
  let total = 0;
  let score = 0;
  for (let i = 0; i < sourceMask.length; i++) {
    if (!sourceMask[i]) continue;
    total++;
    const d = otherDistance[i];
    if (d <= tolerance) score += 1 - d / (tolerance * 1.4);
  }
  return total ? clamp(score / total, 0, 1) : 0;
}

function directedEdgeScore(userEdges, targetEdges, targetDistance, tolerance) {
  const userToTarget = coverageScore(userEdges, targetDistance, tolerance);
  const targetToUser = coverageScore(targetEdges, distanceTransform(userEdges), tolerance);
  return clamp(userToTarget * 0.55 + targetToUser * 0.45, 0, 1);
}

function compareSize(userBox, targetBox, userCanvas, targetCanvas) {
  const userScale = Math.sqrt((userBox.width * userBox.height) / (userCanvas.width * userCanvas.height));
  const targetScale = Math.sqrt((targetBox.width * targetBox.height) / (targetCanvas.width * targetCanvas.height));
  const ratio = Math.min(userScale, targetScale) / Math.max(userScale, targetScale, 0.001);
  return clamp(Math.pow(ratio, 0.6), 0, 1);
}

function comparePosition(bbox, canvas) {
  const cx = (bbox.minX + bbox.maxX) / 2;
  const cy = (bbox.minY + bbox.maxY) / 2;
  const dx = Math.abs(cx - canvas.width / 2) / (canvas.width / 2);
  const dy = Math.abs(cy - canvas.height / 2) / (canvas.height / 2);
  const dist = Math.sqrt(dx * dx + dy * dy);
  return clamp(1 - dist * 0.9, 0, 1);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
