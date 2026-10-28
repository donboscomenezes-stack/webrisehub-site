import test from "node:test";
import assert from "node:assert/strict";
import { cleanText, characters, parseMessage, MessageHistory, SendLimit, suspendGameInput, resumeGameInput } from "../public/games/firefight/chat/core.mjs";

const message = overrides => ({ t: "chat", id: "m-1", room: "ABC123", sender: { id: "p-1", name: "Alex" }, text: "Good game! 🎯", sentAt: 1000, ...overrides });

test("Unicode chat preserves family emoji, skin tones, flags and non-Latin text", () => {
  const text = "नमस्ते 👨‍👩‍👧‍👦 👍🏽 🇮🇳 ❤️";
  assert.equal(cleanText(text), text);
  assert.equal(characters("👨‍👩‍👧‍👦👍🏽🇮🇳❤️").length, 4);
  assert.equal(cleanText("👨‍👩‍👧‍👦👍🏽🇮🇳❤️", 2), "👨‍👩‍👧‍👦👍🏽");
});
test("message limit never splits a compound emoji", () => {
  const text = "a".repeat(199) + "👨‍👩‍👧‍👦" + "z";
  assert.equal(characters(cleanText(text)).length, 200);
  assert.ok(cleanText(text).endsWith("👨‍👩‍👧‍👦"));
});
test("remove control and bidi overrides while retaining normal text", () => {
  assert.equal(cleanText("  hello\u0000\nworld\u202e  "), "hello world");
  assert.equal(cleanText(null), "");
  assert.equal(cleanText({ text: "x" }), "");
});
test("room mismatch, malformed payloads and blank messages are rejected", () => {
  for (const value of [null, {}, message({ room: "OTHER" }), message({ text: "\n " }),
    message({ sender: { id: "", name: "Fake" } }), message({ sentAt: Infinity }),
    message({ sentAt: 9000000000000000 }), message({ text: "x".repeat(5000) })]) {
    assert.equal(parseMessage(value, "ABC123"), null);
  }
  assert.equal(parseMessage(message(), "ABC123").text, "Good game! 🎯");
});
test("HTML-looking messages remain literal data for textContent rendering", () => {
  const text = '<img src=x onerror="alert(1)">';
  const parsed = parseMessage(message({ text, sender: { id: "p-1", name: "<b>Alex</b>" } }), "ABC123");
  assert.equal(parsed.text, text);
  assert.equal(parsed.sender.name, "<b>Alex</b>");
});
test("history deduplicates server echoes and keeps a bounded session log", () => {
  const log = new MessageHistory(3);
  assert.equal(log.add(message()), true);
  assert.equal(log.add(message()), false);
  for (let i = 2; i <= 5; i++) log.add(message({ id: `m-${i}` }));
  assert.deepEqual(log.messages.map(m => m.id), ["m-3", "m-4", "m-5"]);
  assert.equal(log.seen.size, 3);
  log.clear(); assert.equal(log.messages.length, 0); assert.equal(log.seen.size, 0);
});
test("client throttle rejects bursts and allows sending after the cooldown", () => {
  const limit = new SendLimit();
  assert.equal(limit.wait(0), 0);
  limit.record(0); assert.equal(limit.wait(300), 700);
  assert.equal(limit.wait(1000), 0);
  for (const time of [1000, 2000, 3000, 4000]) limit.record(time);
  assert.equal(limit.wait(5000), 5000);
  assert.equal(limit.wait(10000), 0);
});

function game() {
  return { screen: "match", multiplayer: { room: { code: "ABC123" } },
    match: { kind: "online", paused: false, ended: false },
    input: { enabled: true, firing: true, held: new Set(["KeyW"]), setEnabled(value) {
      this.enabled = value;
      if (!value) { this.firing = false; this.held.clear(); }
    } } };
}
test("typing suspends movement/fire; closing restores only the same live online match", () => {
  const app = game(); const guard = suspendGameInput(app);
  assert.equal(app.input.enabled, false); assert.equal(app.input.firing, false); assert.equal(app.input.held.size, 0);
  assert.equal(resumeGameInput(app, guard, "ABC123", true), true); assert.equal(app.input.enabled, true);
});
test("chat cannot resume a paused, disconnected, ended, replaced or different-room match", () => {
  for (const mutate of [a => { a.match.paused = true; }, a => { a.match.ended = true; },
    a => { a.screen = "settings"; }, a => { a.multiplayer.room.code = "OTHER"; },
    a => { a.match = { ...a.match }; }, a => { a.input = { ...a.input }; }]) {
    const app = game(); const guard = suspendGameInput(app); mutate(app);
    assert.equal(resumeGameInput(app, guard, "ABC123", true), false); assert.equal(app.input.enabled, false);
  }
  const app = game(); const guard = suspendGameInput(app);
  assert.equal(resumeGameInput(app, guard, "ABC123", false), false);
});
test("chat does not change solo input or enable controls that were already disabled", () => {
  const app = game(); app.match.kind = "solo";
  assert.equal(suspendGameInput(app), null); assert.equal(app.input.enabled, true);
  app.match.kind = "online"; app.input.enabled = false;
  const guard = suspendGameInput(app);
  assert.equal(resumeGameInput(app, guard, "ABC123", true), false);
});
test("a game re-enabling input while chat is open is suspended again", () => {
  const app = game(); const guard = suspendGameInput(app); app.input.enabled = true;
  assert.equal(suspendGameInput(app, guard), guard); assert.equal(app.input.enabled, false);
  assert.equal(resumeGameInput(app, guard, "ABC123", true), true);
});
