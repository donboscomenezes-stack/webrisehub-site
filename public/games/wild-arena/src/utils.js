export const TAU = Math.PI * 2;

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export function length(x, y) {
  return Math.hypot(x, y);
}

export function normalize(x, y) {
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
}

export function angleTo(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

export function angleDiff(a, b) {
  let d = ((a - b + Math.PI) % TAU) - Math.PI;
  if (d < -Math.PI) d += TAU;
  return d;
}

export function rand(min, max) {
  return min + Math.random() * (max - min);
}

export function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

export function choice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function chance(probability) {
  return Math.random() < probability;
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function pointInArc(origin, point, facing, range, arc, extraRadius = 0) {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const dist = Math.hypot(dx, dy);
  if (dist > range + extraRadius) return false;
  const dir = Math.atan2(dy, dx);
  return Math.abs(angleDiff(dir, facing)) <= arc / 2;
}
