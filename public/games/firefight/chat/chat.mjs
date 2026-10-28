import { MAX_TEXT, characters, cleanText, parseMessage, MessageHistory, SendLimit, suspendGameInput, resumeGameInput } from "./core.mjs";

// Additive adapter for the existing compiled game. No game bundle is rewritten.
const params = new URLSearchParams(location.search);
const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
const preview = isLoopback && params.get("chatPreview") === "1";
const previewRoom = /^[a-zA-Z0-9_-]{1,32}$/.test(params.get("chatRoom") || "")
  ? params.get("chatRoom") : "demo";
const identity = { id: crypto.randomUUID(), name: cleanText(params.get("chatName"), 28) || "Test player" };
const history = new MessageHistory();
const limit = new SendLimit();
const muted = new Set();
let room = null, me = null, net = null, readyRoom = null, cleanup = [], open = false;
let unread = 0, inputGuard = null, statusKey = "", channel = null;
let composing = false;
let requestChatSupport = false, subscribedRoom = null;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function button(text, label, handler) {
  const node = element("button", "", text);
  node.type = "button";
  if (label) node.setAttribute("aria-label", label);
  node.addEventListener("click", handler);
  return node;
}
const root = element("section", "ffchat");
root.hidden = true;
root.setAttribute("aria-label", "Firefight room chat");
const launcher = button("Chat", "Open room chat", () => setOpen(!open));
launcher.className = "ffchat-launcher";
launcher.setAttribute("aria-expanded", "false");
launcher.setAttribute("aria-controls", "ffchat-panel");
const panel = element("div", "ffchat-panel");
panel.id = "ffchat-panel"; panel.hidden = true;
const header = element("header", "ffchat-header");
const title = element("strong", "", "Room chat");
const close = button("×", "Close chat", () => setOpen(false));
header.append(title, close);
const banner = element("p", "ffchat-banner", preview ? "LOCAL TEST · SAME BROWSER ONLY · NO SERVER" : "");
banner.hidden = !preview;
const subtitle = element("p", "ffchat-subtitle");
const log = element("div", "ffchat-log");
log.setAttribute("role", "log"); log.setAttribute("aria-label", "Room messages");
log.setAttribute("aria-live", "polite"); log.setAttribute("aria-relevant", "additions");
log.tabIndex = 0;
const empty = element("p", "ffchat-empty", "Say hello to your room. Text and emoji are welcome.");
log.append(empty);
const form = element("form", "ffchat-form");
const input = element("input", "ffchat-input");
input.type = "text"; input.placeholder = "Message your room…";
input.setAttribute("aria-label", "Chat message");
input.maxLength = 4000; input.autocomplete = "off";
const actions = element("div", "ffchat-actions");
const emojiToggle = button("😊", "Choose emoji", () => {
  picker.hidden = !picker.hidden;
  emojiToggle.setAttribute("aria-expanded", String(!picker.hidden));
  if (!picker.hidden) picker.querySelector("button")?.focus();
});
emojiToggle.setAttribute("aria-expanded", "false");
emojiToggle.setAttribute("aria-controls", "ffchat-emoji");
const counter = element("span", "ffchat-count", `0/${MAX_TEXT}`);
counter.setAttribute("aria-label", "Message character count");
const send = element("button", "ffchat-send", "Send"); send.type = "submit";
actions.append(emojiToggle, counter, send);
const picker = element("div", "ffchat-emoji"); picker.id = "ffchat-emoji"; picker.hidden = true;
picker.setAttribute("role", "group"); picker.setAttribute("aria-label", "Emoji picker");
for (const [emoji, name] of [["👋","Wave"],["👍","Thumbs up"],["❤️","Heart"],["😂","Laugh"],["🔥","Fire"],["🎯","Bullseye"],["👏","Applause"],["😎","Cool"],["😅","Relieved"],["🤝","Handshake"],["💪","Strong"],["🎉","Celebrate"]]) {
  picker.append(button(emoji, name, () => {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    input.setRangeText(emoji, start, end, "end");
    updateCount(); input.focus();
  }));
}
const feedback = element("p", "ffchat-feedback", "Enter to send · Esc to close");
feedback.setAttribute("role", "status");
const unmute = button("Unmute players", "Unmute all players", () => { muted.clear(); renderHistory(); });
unmute.className = "ffchat-unmute"; unmute.hidden = true;
form.append(input, picker, actions, feedback);
panel.append(header, banner, subtitle, log, form, unmute);
root.append(launcher, panel); document.body.append(root);

function connected() { return preview ? Boolean(channel) : net?.state === "open" && readyRoom === room; }
function updateCount() {
  const length = characters(input.value).length;
  counter.textContent = `${length}/${MAX_TEXT}`;
  counter.classList.toggle("ffchat-over-limit", length > MAX_TEXT);
  send.disabled = !connected() || !cleanText(input.value) || length > MAX_TEXT;
}
input.addEventListener("input", updateCount);
input.addEventListener("compositionstart", () => { composing = true; });
input.addEventListener("compositionend", () => { composing = false; updateCount(); });

function append(message) {
  const row = element("div", "ffchat-message");
  row.classList.toggle("ffchat-own", message.sender.id === me);
  const meta = element("div", "ffchat-message-meta");
  meta.append(element("strong", "", message.sender.name));
  const time = element("time", "", new Date(message.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  time.dateTime = new Date(message.sentAt).toISOString(); meta.append(time);
  if (message.sender.id !== me) {
    meta.append(button("Mute", `Mute ${message.sender.name}`, () => {
      muted.add(message.sender.id); renderHistory(); feedback.textContent = `${message.sender.name} muted in this room.`;
    }));
  }
  // User content is always text; never parse HTML, Markdown or links.
  row.append(meta, element("p", "ffchat-message-text", message.text));
  log.append(row);
}
function renderHistory() {
  log.replaceChildren();
  const messages = history.messages.filter(message => !muted.has(message.sender.id));
  if (!messages.length) log.append(empty);
  for (const message of messages) append(message);
  unmute.hidden = muted.size === 0;
  log.scrollTop = log.scrollHeight;
}
function receive(value) {
  const message = parseMessage(value, room);
  if (!message || muted.has(message.sender.id) || !history.add(message)) return;
  const nearBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 50;
  empty.remove(); append(message);
  while (log.children.length > 60) log.firstElementChild.remove();
  if (nearBottom || message.sender.id === me) log.scrollTop = log.scrollHeight;
  if (!open) unread = Math.min(99, unread + 1);
  updateLauncher();
}
function updateLauncher() {
  launcher.textContent = `Chat${unread ? ` · ${unread}` : ""}`;
  launcher.setAttribute("aria-label", `Open room chat${unread ? `, ${unread} unread messages` : ""}`);
}
function restoreControls() {
  const guard = inputGuard; inputGuard = null;
  resumeGameInput(window.__app, guard, room, net?.state === "open");
  // A fresh click in the canvas captures the pointer again.
}
function guardControls() {
  inputGuard = suspendGameInput(window.__app, inputGuard);
}
function setOpen(value, focus = true) {
  open = value; panel.hidden = !value;
  launcher.setAttribute("aria-expanded", String(value));
  if (value) {
    unread = 0; updateLauncher(); guardControls();
    if (focus) input.focus(); log.scrollTop = log.scrollHeight;
  } else {
    picker.hidden = true; emojiToggle.setAttribute("aria-expanded", "false");
    restoreControls(); if (focus && !root.hidden) launcher.focus();
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  if (composing) return;
  if (!connected()) { feedback.textContent = "Chat is not connected. Your message was not sent."; return; }
  if (characters(input.value).length > MAX_TEXT) { feedback.textContent = `Keep messages to ${MAX_TEXT} characters.`; return; }
  const text = cleanText(input.value); if (!text) return;
  const wait = limit.wait(performance.now());
  if (wait > 0) { feedback.textContent = `Please wait ${Math.ceil(wait / 1000)} seconds before sending again.`; return; }
  const id = crypto.randomUUID();
  if (preview) {
    const message = { t: "chat", id, room, sender: identity, text, sentAt: Date.now() };
    try { channel.postMessage(message); receive(message); }
    catch { feedback.textContent = "Local test connection closed. Reload to reconnect."; return; }
  } else if (!net.send({ t: "chat", text, clientId: id })) {
    feedback.textContent = "Connection lost. Your message was not sent."; return;
  }
  limit.record(performance.now()); input.value = ""; updateCount(); input.focus();
  feedback.textContent = preview ? "Local test message sent to this browser's other test tabs." : "Sent. Waiting for the room server to confirm.";
});

// Capture before the game's global keyboard handlers. IME Enter must not send.
window.addEventListener("keydown", event => {
  if (root.hidden) return;
  if (open) {
    event.stopImmediatePropagation();
    if (event.key === "Escape" && !event.isComposing) {
      event.preventDefault();
      if (!picker.hidden) { picker.hidden = true; emojiToggle.setAttribute("aria-expanded", "false"); input.focus(); }
      else setOpen(false);
    } else if (event.key === "Enter" && event.target === input && !event.isComposing && event.keyCode !== 229) {
      event.preventDefault(); form.requestSubmit();
    }
  } else if (event.key === "Enter" && !event.repeat && !event.isComposing &&
      !event.target.closest?.("input,textarea,select,button,[contenteditable=true],summary") &&
      (preview || window.__app?.screen === "match")) {
    event.preventDefault(); event.stopImmediatePropagation(); setOpen(true);
  }
}, true);
window.addEventListener("keyup", event => { if (open) event.stopImmediatePropagation(); }, true);

function resetRoom(nextRoom) {
  if (open) setOpen(false, false);
  room = nextRoom; readyRoom = null; subscribedRoom = null; input.value = ""; unread = 0;
  history.clear(); muted.clear(); renderHistory(); updateLauncher();
}
function detach() { for (const off of cleanup) off(); cleanup = []; net = null; readyRoom = null; subscribedRoom = null; }
function sync() {
  const app = window.__app;
  if (preview) {
    const solo = app?.match?.kind === "solo";
    root.hidden = solo;
    if (solo && open) setOpen(false, false);
    return;
  }
  const mp = app?.multiplayer;
  const nextRoom = typeof mp?.room?.code === "string" ? mp.room.code : null;
  const nextNet = mp?.net ?? null;
  if (nextRoom !== room) resetRoom(nextRoom);
  if (net !== nextNet) {
    detach(); net = nextNet;
    if (net && typeof net.on === "function") {
      cleanup.push(net.on("chat-ready", message => {
        if (message?.v === 1 && message.room === room && mp?.room?.code === room) { readyRoom = room; updateStatus(); }
      }), net.on("chat", message => {
        if (connected() && mp?.room?.code === room) {
          receive(message);
          if (message?.sender?.id === me) feedback.textContent = "Delivered to the room.";
        }
      }), net.on("chat-error", message => {
        if (message?.room === room) feedback.textContent = "The server could not send that message. Please try again shortly.";
      }), net.on("_lost", () => {
        readyRoom = null; subscribedRoom = null; if (open) setOpen(false, false); updateStatus();
      }));
    }
  }
  me = mp?.me ?? null;
  // Explicit opt-in avoids sending unknown messages to older game servers.
  // Request after listeners are attached, so a fast room join cannot lose readiness.
  if (requestChatSupport && room && net?.state === "open" && subscribedRoom !== room) {
    if (net.send({ t: "chat-subscribe", v: 1 })) subscribedRoom = room;
  }
  const visible = Boolean(room) && app?.match?.kind !== "solo";
  root.hidden = !visible;
  if (!visible && open) setOpen(false, false);
  if (open) guardControls();
  updateStatus();
}
function updateStatus() {
  const key = `${room}:${connected()}`;
  if (statusKey === key) return;
  statusKey = key;
  subtitle.textContent = preview ? `Test room: ${room} · ${identity.name}` :
    connected() ? `Room ${room} · Text & emoji` : `Room ${room ?? ""} · Chat server support required`;
  input.disabled = !connected(); emojiToggle.disabled = !connected(); updateCount();
}

if (preview) {
  room = previewRoom; me = identity.id;
  try {
    channel = new BroadcastChannel(`firefight-chat-preview:${room}`);
    channel.onmessage = event => receive(event.data);
  } catch { feedback.textContent = "This browser does not support the local two-tab test."; }
  root.hidden = false; updateStatus(); setOpen(true, false);
} else {
  fetch(new URL("../config.json", import.meta.url), { cache: "no-cache" })
    .then(response => response.ok ? response.json() : {})
    .then(config => { requestChatSupport = config.roomChat === true; sync(); })
    .catch(() => {}); // Missing optional config never interrupts gameplay.
}
sync();
const watcher = setInterval(sync, 250);
window.addEventListener("pagehide", event => {
  if (event.persisted) return;
  clearInterval(watcher); detach(); channel?.close();
});
