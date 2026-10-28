# Firefight room chat

Additive client UI for Firefight only. The original compiled game is unchanged.
**No multiplayer/chat server exists in this repository. This does not enable online multiplayer.**

## Local test

Serve the site's `public/` folder or built `out/` folder over HTTP on localhost. Open two tabs in the **same browser profile and origin**:

- `/games/firefight/?chatPreview=1&chatRoom=demo&chatName=Alex`
- `/games/firefight/?chatPreview=1&chatRoom=demo&chatName=Sam`

Messages use BroadcastChannel, not a server. The banner explicitly identifies the test. Other computers, other browser profiles, private windows and different ports do not share it. Only loopback hostnames enable this test flag; it is ignored on a public site. Different `chatRoom` values isolate test rooms. No messages are stored across page reloads.

Text supports ordinary Unicode, including keyboard/pasted emoji, joined family emoji, skin tones and flags. The twelve-button picker is a convenience; it is not the limit of supported emoji. No images, uploads, GIFs, Markdown or clickable links are implemented.

## Normal game behavior

- Hidden unless the game has joined a multiplayer room. Never shown in a solo bot match.
- Enter opens chat during a match; Enter sends; Escape closes the picker first, then chat.
- Chat disables game input and clears held movement/fire through the existing input API before releasing the pointer. Closing chat restores input only for the same connected, active online match. Click the canvas to capture the pointer again. Online matches continue while typing.
- At most 200 graphemes per message; 60 messages kept in memory; mute per sender for the room; no cross-room history.
- Plain `textContent` rendering. Client sending cooldown is one second and at most five messages per ten seconds.
- Messages are not shown as delivered until echoed by the real server. Client validation/throttling is UX protection, not server security.

## Required future game-server contract

The adapter observes the existing `window.__app.multiplayer.net` connection and `.room.code`/`.me` fields. It subscribes to the net emitter's `chat-ready`, `chat`, `chat-error`, and `_lost` events. It never opens a second public connection or sets a server URL.

When the compatible game server is implemented, opt in using the existing game config:

```json
{"multiplayerUrl":"wss://YOUR-GAME-SERVER/ws","roomChat":true}
```

The endpoint above is a placeholder, not a configured service. Leave the current empty config unchanged until the real server is available. With `roomChat: true`, the adapter sends `{"t":"chat-subscribe","v":1}` once on its current room connection, and again after reconnecting or changing rooms. This idempotent request attaches listeners before requesting readiness, so a fast initial room join cannot lose the response. A game server should reject the request if the socket has not joined a room.

After successfully authenticating a player and joining/resuming the game room, the server responds to that request with:

```json
{"t":"chat-ready","v":1,"room":"ABC123"}
```

Until this arrives for the current room, sending is disabled. A server without chat support receives no new message types unless explicitly opted in. Send `chat-ready` again after a successful reconnect/resume subscription. The existing game config's `multiplayerUrl` will be configured when a compatible game server is chosen; chat does not set it.

The client sends on the existing connection:

```json
{"t":"chat","text":"Good game! 🎯","clientId":"unique-client-message-id"}
```

The server must derive the sender and room from its authenticated socket/session, validate text and length, enforce rate limits, deduplicate client IDs per session, and broadcast only to current members of that room, including the sender:

```json
{"t":"chat","id":"server-message-id","room":"ABC123","sender":{"id":"authenticated-player-id","name":"current-display-name"},"text":"Good game! 🎯","sentAt":1793160000000}
```

For rejection:

```json
{"t":"chat-error","room":"ABC123","code":"rate_limited"}
```

Never trust client-supplied player names, IDs, room routing or timestamps. Validate origin/session, enforce maximum wire payload sizes and quotas, keep chat out of simulation/input packets, and decide moderation/reporting and retention policy before public release. This repository supplies no server-side moderation or report endpoint yet. Local muting only hides messages for the player who muted them.

The adapter depends on inspected runtime fields in the current compiled game. Recheck it when replacing the game bundle, retain the two HTML asset references, and regenerate the service worker with the chat files included. Prefer integrating the same functionality into original source if that project becomes available.

## Validation

`node --test scripts/firefight-chat.test.mjs`

Before online release: test two real authenticated clients, a third client in a different room, forged sender/room fields, server throttling, disconnect/resume, duplicate echoes, room changes, input while typing, IME composition, HTML-looking text, emoji, muting and mobile page layout. No online-server tests can pass until the server exists.
