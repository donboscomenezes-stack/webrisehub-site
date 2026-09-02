const KEY = "drawmatch.stats.v1";

export function loadStats() {
  const fallback = {
    bestScore: 0,
    totalScore: 0,
    completed: 0,
    bestObject: "-",
    streak: 0,
    objectBests: {}
  };
  try {
    return { ...fallback, ...(JSON.parse(localStorage.getItem(KEY)) || {}) };
  } catch {
    return fallback;
  }
}

export function saveResult(shape, score) {
  const stats = loadStats();
  stats.completed += 1;
  stats.totalScore += score;
  if (score > stats.bestScore) {
    stats.bestScore = score;
    stats.bestObject = shape.name;
  }
  stats.streak = score >= 80 ? stats.streak + 1 : 0;
  stats.objectBests[shape.id] = Math.max(stats.objectBests[shape.id] || 0, score);
  localStorage.setItem(KEY, JSON.stringify(stats));
  return stats;
}

export function average(stats) {
  return stats.completed ? Math.round(stats.totalScore / stats.completed) : 0;
}

export function ratingFor(score) {
  if (score >= 95) return "Pixel Perfect";
  if (score >= 90) return "Almost Perfect";
  if (score >= 80) return "Great Drawing";
  if (score >= 70) return "Pretty Good";
  if (score >= 60) return "Close Enough";
  if (score >= 40) return "Needs Practice";
  return "What happened here? :)";
}
