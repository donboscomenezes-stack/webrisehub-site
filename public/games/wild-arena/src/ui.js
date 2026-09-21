import { formatTime } from "./utils.js";

export class UIManager {
  constructor(game) {
    this.game = game;
    this.hud = document.querySelector("#hud");
    this.overlay = document.querySelector("#overlay");
    this.healthBar = document.querySelector("#healthBar");
    this.staminaBar = document.querySelector("#staminaBar");
    this.healthText = document.querySelector("#healthText");
    this.weaponInfo = document.querySelector("#weaponInfo");
    this.leaderboard = document.querySelector("#leaderboard");
    this.banner = document.querySelector("#banner");
    this.toast = document.querySelector("#toast");
    this.records = document.querySelector("#records");
    this.minimap = document.querySelector("#minimap");
    this.mm = this.minimap.getContext("2d");
    this.toastTimer = 0;
    this.bannerTimer = 0;
  }

  showMenu(html = null) {
    this.hud.classList.add("hidden");
    this.overlay.classList.remove("hidden");
    if (html) this.overlay.innerHTML = html;
  }

  hideMenu() {
    this.overlay.classList.add("hidden");
    this.hud.classList.remove("hidden");
  }

  toastMessage(text, duration = 2) {
    this.toast.textContent = text;
    this.toastTimer = duration;
  }

  bannerMessage(text, duration = 2.2) {
    this.banner.textContent = text;
    this.bannerTimer = duration;
  }

  update(dt) {
    const p = this.game.player;
    if (!p) return;
    this.healthBar.style.transform = `scaleX(${Math.max(0, p.health / p.maxHealth)})`;
    this.staminaBar.style.transform = `scaleX(${Math.max(0, p.stamina / p.maxStamina)})`;
    this.healthText.textContent = Math.ceil(p.health);
    this.weaponInfo.textContent = `${p.weapon.name.toUpperCase()} · ${Math.round(p.weapon.damage)} DMG`;
    this.updateLeaderboard();
    this.drawMinimap();
    this.toastTimer -= dt;
    this.bannerTimer -= dt;
    if (this.toastTimer <= 0) this.toast.textContent = "";
    if (this.bannerTimer <= 0) this.banner.textContent = "";
  }

  updateLeaderboard() {
    const rows = this.game.fighters
      .slice()
      .sort((a, b) => b.kills - a.kills || b.health - a.health)
      .slice(0, 5)
      .map((f, i) => `${i + 1}. ${f.isPlayer ? "YOU" : f.name} — ${f.kills}${f.alive ? "" : " †"}`);
    this.leaderboard.innerHTML = `<strong>Ranking</strong>${rows.join("<br>")}`;
  }

  drawMinimap() {
    const ctx = this.mm;
    const scale = this.minimap.width / this.game.world.size;
    ctx.clearRect(0, 0, this.minimap.width, this.minimap.height);
    ctx.fillStyle = "#1e2c1e";
    ctx.fillRect(0, 0, this.minimap.width, this.minimap.height);
    ctx.strokeStyle = "rgba(178,132,221,0.85)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.game.storm.center.x * scale, this.game.storm.center.y * scale, this.game.storm.radius * scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#8b8470";
    for (const o of this.game.world.obstacles.slice(0, 80)) ctx.fillRect(o.x * scale, o.y * scale, 2, 2);
    for (const f of this.game.fighters) {
      if (!f.alive) continue;
      if (!f.isPlayer && Math.hypot(f.x - this.game.player.x, f.y - this.game.player.y) > 420) continue;
      ctx.fillStyle = f.isPlayer ? "#f4d66e" : "#d95748";
      ctx.beginPath();
      ctx.arc(f.x * scale, f.y * scale, f.isPlayer ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  resultScreen(title, stats, won = false) {
    const button = won ? "Play Again" : "Try Again";
    this.showMenu(`
      <section class="menu-panel">
        <h1>${title}</h1>
        <p>${won ? "Last fighter standing." : "The arena remembers."}</p>
        <div class="records">
          <span>Placement ${stats.placement}</span>
          <span>Kills ${stats.kills}</span>
          <span>Survived ${formatTime(stats.time)}</span>
          <span>Damage ${Math.round(stats.damageDealt)}</span>
          <span>Parries ${stats.parries}</span>
          <span>Dodges ${stats.dodges}</span>
          <span>Best ${stats.bestWeapon}</span>
        </div>
        <button id="restartButton" class="primary">${button}</button>
      </section>
    `);
    document.querySelector("#restartButton").addEventListener("click", () => this.game.start());
  }
}
