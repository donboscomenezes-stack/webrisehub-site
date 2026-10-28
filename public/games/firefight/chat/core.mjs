export const MAX_TEXT = 200;
export const HISTORY_LIMIT = 60;
const segmenter = typeof Intl.Segmenter === "function"
  ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;

export function characters(text) {
  return segmenter ? Array.from(segmenter.segment(text), part => part.segment) : Array.from(text);
}

export function cleanText(value, limit = MAX_TEXT) {
  if (typeof value !== "string") return "";
  // Keep emoji joiners/variation selectors; discard control and bidi overrides.
  const text = value.slice(0, 8000).normalize("NFC")
    .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, " ")
    .replace(/\s+/gu, " ").trim();
  return characters(text).slice(0, limit).join("");
}

export function parseMessage(value, room) {
  if (!value || value.t !== "chat" || value.room !== room ||
      typeof value.id !== "string" || !value.id || value.id.length > 100 ||
      !value.sender || typeof value.sender.id !== "string" ||
      !value.sender.id || value.sender.id.length > 100 ||
      typeof value.sender.name !== "string" ||
      typeof value.text !== "string" || value.text.length > 4000 ||
      !Number.isSafeInteger(value.sentAt) || value.sentAt < 0 || value.sentAt > 8640000000000000) return null;
  const text = cleanText(value.text);
  if (!text) return null;
  return { t: "chat", id: value.id, room, text,
    sender: { id: value.sender.id, name: cleanText(value.sender.name, 28) || "Player" },
    sentAt: value.sentAt };
}

export class MessageHistory {
  constructor(limit = HISTORY_LIMIT) { this.limit = limit; this.messages = []; this.seen = new Set(); }
  add(message) {
    if (this.seen.has(message.id)) return false;
    this.messages.push(message); this.seen.add(message.id);
    while (this.messages.length > this.limit) this.seen.delete(this.messages.shift().id);
    return true;
  }
  clear() { this.messages = []; this.seen.clear(); }
}

export class SendLimit {
  constructor() { this.sent = []; }
  wait(now) {
    this.sent = this.sent.filter(time => now - time < 10000);
    return Math.max(0, this.sent.length ? 1000 - (now - this.sent.at(-1)) : 0,
      this.sent.length >= 5 ? 10000 - (now - this.sent[0]) : 0);
  }
  record(now) { this.sent.push(now); }
}

export function suspendGameInput(app, guard = null) {
  if (!app?.input || app.match?.kind !== "online") return guard;
  if (guard?.match !== app.match) {
    guard = { input: app.input, wasEnabled: app.input.enabled, match: app.match };
  }
  if (app.input.enabled) app.input.setEnabled(false);
  return guard;
}

export function resumeGameInput(app, guard, room, connected) {
  if (!guard?.wasEnabled || app?.input !== guard.input || app.match !== guard.match ||
      app.match?.kind !== "online" || app.match.paused || app.match.ended ||
      app.screen !== "match" || app.multiplayer?.room?.code !== room || !connected) return false;
  app.input.setEnabled(true);
  return true;
}
