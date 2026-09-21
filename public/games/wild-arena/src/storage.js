import { formatTime } from "./utils.js";

export class StorageManager {
  constructor() {
    this.key = "wildArenaRecords";
    this.records = this.load();
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || { kills: 0, time: 0, placement: 99 };
    } catch {
      return { kills: 0, time: 0, placement: 99 };
    }
  }

  saveRun(stats) {
    this.records.kills = Math.max(this.records.kills || 0, stats.kills);
    this.records.time = Math.max(this.records.time || 0, stats.time);
    this.records.placement = Math.min(this.records.placement || 99, stats.placement);
    localStorage.setItem(this.key, JSON.stringify(this.records));
  }

  summary() {
    if (!this.records.time) return "Best records will appear after your first run.";
    return `Best: ${this.records.kills} kills · ${formatTime(this.records.time)} · place ${this.records.placement}`;
  }
}
