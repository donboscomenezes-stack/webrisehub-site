import { clamp, normalize } from "./utils.js";

export class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, down: false, right: false, justDown: false, justReleased: false, downTime: 0 };
    this.actions = { dodge: false, interact: false, pause: false, attack: false, block: false };
    this.mobileMove = { x: 0, y: 0 };
    this.usingTouch = false;
    this.bind();
  }

  bind() {
    window.addEventListener("keydown", (event) => {
      const code = event.code;
      if (["Space", "KeyW", "KeyA", "KeyS", "KeyD", "KeyE"].includes(code)) event.preventDefault();
      this.keys.add(code);
      if (code === "Space") this.actions.dodge = true;
      if (code === "KeyE") this.actions.interact = true;
      if (code === "Escape") this.actions.pause = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.code);
    });

    this.canvas.addEventListener("mousemove", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = event.clientX - rect.left;
      this.mouse.y = event.clientY - rect.top;
    });

    this.canvas.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (event.button === 0) {
        this.mouse.down = true;
        this.mouse.justDown = true;
        this.actions.attack = true;
        this.mouse.downTime = 0;
      }
      if (event.button === 2) {
        this.mouse.right = true;
        this.actions.block = true;
      }
    });

    window.addEventListener("mouseup", (event) => {
      if (event.button === 0) {
        this.mouse.down = false;
        this.mouse.justReleased = true;
      }
      if (event.button === 2) {
        this.mouse.right = false;
        this.actions.block = false;
      }
    });

    this.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  }

  bindMobile(root) {
    const joystick = root.querySelector("#joystick");
    const nub = joystick.querySelector("i");
    const buttons = root.querySelectorAll("[data-action]");
    let joystickPointer = null;

    const updateStick = (event) => {
      const rect = joystick.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const mag = Math.hypot(dx, dy);
      const limit = rect.width * 0.35;
      const scale = mag > limit ? limit / mag : 1;
      nub.style.transform = `translate(${dx * scale}px, ${dy * scale}px)`;
      const normalized = normalize(dx, dy);
      const power = clamp(mag / limit, 0, 1);
      this.mobileMove.x = normalized.x * power;
      this.mobileMove.y = normalized.y * power;
      this.mouse.x = window.innerWidth / 2 + this.mobileMove.x * 120;
      this.mouse.y = window.innerHeight / 2 + this.mobileMove.y * 120;
    };

    joystick.addEventListener("pointerdown", (event) => {
      this.usingTouch = true;
      joystickPointer = event.pointerId;
      joystick.setPointerCapture(event.pointerId);
      updateStick(event);
    });
    joystick.addEventListener("pointermove", (event) => {
      if (event.pointerId === joystickPointer) updateStick(event);
    });
    const releaseStick = (event) => {
      if (event.pointerId !== joystickPointer) return;
      joystickPointer = null;
      this.mobileMove.x = 0;
      this.mobileMove.y = 0;
      nub.style.transform = "translate(0, 0)";
    };
    joystick.addEventListener("pointerup", releaseStick);
    joystick.addEventListener("pointercancel", releaseStick);

    buttons.forEach((button) => {
      const action = button.dataset.action;
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        this.usingTouch = true;
        if (action === "attack") {
          this.mouse.down = true;
          this.mouse.justDown = true;
          this.actions.attack = true;
          this.mouse.downTime = 0;
        } else if (action === "block") {
          this.mouse.right = true;
          this.actions.block = true;
        } else {
          this.actions[action] = true;
        }
      });
      button.addEventListener("pointerup", () => {
        if (action === "attack") {
          this.mouse.down = false;
          this.mouse.justReleased = true;
        }
        if (action === "block") {
          this.mouse.right = false;
          this.actions.block = false;
        }
      });
      button.addEventListener("pointercancel", () => {
        if (action === "attack") {
          this.mouse.down = false;
          this.mouse.justReleased = true;
        }
        if (action === "block") {
          this.mouse.right = false;
          this.actions.block = false;
        }
      });
    });
  }

  movementVector() {
    let x = 0;
    let y = 0;
    if (this.keys.has("KeyA")) x -= 1;
    if (this.keys.has("KeyD")) x += 1;
    if (this.keys.has("KeyW")) y -= 1;
    if (this.keys.has("KeyS")) y += 1;
    x += this.mobileMove.x;
    y += this.mobileMove.y;
    const n = normalize(x, y);
    const power = clamp(Math.hypot(x, y), 0, 1);
    return { x: n.x * power, y: n.y * power };
  }

  update(dt) {
    if (this.mouse.down) this.mouse.downTime += dt;
  }

  consume(action) {
    const value = this.actions[action];
    this.actions[action] = false;
    return value;
  }

  endFrame() {
    this.mouse.justDown = false;
    this.mouse.justReleased = false;
  }
}
