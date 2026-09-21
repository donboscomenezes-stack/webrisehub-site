(function () {
  "use strict";

  const ROWS = 6;
  const COLS = 5;
  const EPOCH = "2026-01-01";
  const STORAGE_PREFIX = "wordLock.";
  const STATES = {
    READY: "READY",
    TYPING: "TYPING",
    REVEALING: "REVEALING",
    WON: "WON",
    LOST: "LOST"
  };
  const RESULT_PRIORITY = { absent: 1, present: 2, correct: 3 };
  const RESULT_MARK = { correct: "✓", present: "•", absent: "×" };
  const WIN_TITLES = ["GENIUS", "BRILLIANT", "IMPRESSIVE", "NICE", "CLOSE ONE", "CLUTCH"];

  const words = window.WORD_LOCK_WORDS;
  const solutionWords = words.solutions.map((word) => word.toUpperCase());
  const acceptedWords = new Set(words.accepted.map((word) => word.toUpperCase()));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const elements = {
    board: document.getElementById("board"),
    keyboard: document.getElementById("keyboard"),
    message: document.getElementById("message"),
    toast: document.getElementById("toast"),
    timer: document.getElementById("timer"),
    hintBar: document.getElementById("hintBar"),
    hintButton: document.getElementById("hintButton"),
    hintText: document.getElementById("hintText"),
    quickModeButton: document.getElementById("quickModeButton"),
    dailyModeButton: document.getElementById("dailyModeButton"),
    difficultyPill: document.getElementById("difficultyPill"),
    themeButton: document.getElementById("themeButton"),
    soundButton: document.getElementById("soundButton"),
    statsButton: document.getElementById("statsButton"),
    helpButton: document.getElementById("helpButton"),
    helpModal: document.getElementById("helpModal"),
    statsModal: document.getElementById("statsModal"),
    resultModal: document.getElementById("resultModal"),
    quickStats: document.getElementById("quickStats"),
    dailyStats: document.getElementById("dailyStats"),
    distribution: document.getElementById("distribution"),
    resultKicker: document.getElementById("resultKicker"),
    resultTitle: document.getElementById("resultTitle"),
    resultMeta: document.getElementById("resultMeta"),
    playAgainButton: document.getElementById("playAgainButton"),
    shareBox: document.getElementById("shareBox"),
    shareText: document.getElementById("shareText"),
    copyButton: document.getElementById("copyButton"),
    confettiCanvas: document.getElementById("confettiCanvas")
  };

  class StorageManager {
    static get(key, fallback) {
      try {
        const value = localStorage.getItem(STORAGE_PREFIX + key);
        return value === null ? fallback : JSON.parse(value);
      } catch {
        return fallback;
      }
    }

    static set(key, value) {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    }
  }

  class WordEvaluator {
    static evaluate(secret, guess) {
      const target = secret.toUpperCase().split("");
      const attempt = guess.toUpperCase().split("");
      const result = Array(COLS).fill("absent");
      const remaining = {};

      for (let index = 0; index < COLS; index += 1) {
        if (attempt[index] === target[index]) {
          result[index] = "correct";
        } else {
          remaining[target[index]] = (remaining[target[index]] || 0) + 1;
        }
      }

      for (let index = 0; index < COLS; index += 1) {
        if (result[index] === "correct") {
          continue;
        }
        const letter = attempt[index];
        if (remaining[letter] > 0) {
          result[index] = "present";
          remaining[letter] -= 1;
        }
      }

      return result;
    }
  }

  class DailyWordManager {
    static todayKey() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    static dayNumber(dateKey = DailyWordManager.todayKey()) {
      const [year, month, day] = dateKey.split("-").map(Number);
      const [epochYear, epochMonth, epochDay] = EPOCH.split("-").map(Number);
      const current = Date.UTC(year, month - 1, day);
      const epoch = Date.UTC(epochYear, epochMonth - 1, epochDay);
      return Math.floor((current - epoch) / 86400000);
    }

    static wordFor(dateKey = DailyWordManager.todayKey()) {
      const dayNumber = DailyWordManager.dayNumber(dateKey);
      const index = ((dayNumber % solutionWords.length) + solutionWords.length) % solutionWords.length;
      return solutionWords[index];
    }

    static getSavedGame(dateKey) {
      const saved = StorageManager.get("dailyGame", null);
      return saved && saved.dateKey === dateKey ? saved : null;
    }

    static saveGame(payload) {
      StorageManager.set("dailyGame", payload);
    }
  }

  class StatsManager {
    constructor() {
      this.quick = StorageManager.get("quickStats", this.blankQuickStats());
      this.daily = StorageManager.get("dailyStats", this.blankDailyStats());
    }

    blankQuickStats() {
      return {
        games: 0,
        wins: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalAttempts: 0,
        hintsUsed: 0,
        distribution: [0, 0, 0, 0, 0, 0]
      };
    }

    blankDailyStats() {
      return {
        played: 0,
        wins: 0,
        currentStreak: 0,
        bestStreak: 0,
        lastWinDate: null,
        distribution: [0, 0, 0, 0, 0, 0]
      };
    }

    recordQuick({ won, attempts, hintUsed }) {
      this.quick.games += 1;
      if (hintUsed) {
        this.quick.hintsUsed += 1;
      }
      if (won) {
        this.quick.wins += 1;
        this.quick.currentStreak += 1;
        this.quick.bestStreak = Math.max(this.quick.bestStreak, this.quick.currentStreak);
        this.quick.totalAttempts += attempts;
        this.quick.distribution[attempts - 1] += 1;
      } else {
        this.quick.currentStreak = 0;
      }
      StorageManager.set("quickStats", this.quick);
    }

    recordDaily({ won, attempts, dateKey }) {
      this.daily.played += 1;
      if (won) {
        this.daily.wins += 1;
        const previous = this.daily.lastWinDate;
        const yesterdayNumber = DailyWordManager.dayNumber(dateKey) - 1;
        const previousNumber = previous ? DailyWordManager.dayNumber(previous) : null;
        this.daily.currentStreak = previousNumber === yesterdayNumber ? this.daily.currentStreak + 1 : 1;
        this.daily.bestStreak = Math.max(this.daily.bestStreak, this.daily.currentStreak);
        this.daily.lastWinDate = dateKey;
        this.daily.distribution[attempts - 1] += 1;
      } else {
        this.daily.currentStreak = 0;
      }
      StorageManager.set("dailyStats", this.daily);
    }
  }

  class AudioManager {
    constructor() {
      this.enabled = StorageManager.get("sound", false);
      this.context = null;
    }

    setEnabled(value) {
      this.enabled = value;
      StorageManager.set("sound", value);
      elements.soundButton.setAttribute("aria-label", value ? "Sound on" : "Sound off");
      elements.soundButton.classList.toggle("active", value);
    }

    play(type) {
      if (!this.enabled) {
        return;
      }
      if (!this.context) {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
      }
      const frequencies = { key: 280, enter: 360, reveal: 520, win: 720, loss: 180 };
      const duration = type === "win" ? 0.16 : 0.055;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = type === "loss" ? "triangle" : "sine";
      oscillator.frequency.value = frequencies[type] || 320;
      gain.gain.setValueAtTime(0.0001, this.context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.045, this.context.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + duration);
      oscillator.connect(gain).connect(this.context.destination);
      oscillator.start();
      oscillator.stop(this.context.currentTime + duration);
    }
  }

  class UIManager {
    constructor(game) {
      this.game = game;
      this.tileNodes = [];
      this.keyNodes = new Map();
      this.toastTimeout = null;
    }

    init() {
      this.renderBoard();
      this.renderKeyboard();
    }

    renderBoard() {
      elements.board.innerHTML = "";
      this.tileNodes = [];
      for (let rowIndex = 0; rowIndex < ROWS; rowIndex += 1) {
        const row = document.createElement("div");
        row.className = "row";
        row.setAttribute("role", "row");
        const rowTiles = [];
        for (let colIndex = 0; colIndex < COLS; colIndex += 1) {
          const tile = document.createElement("div");
          tile.className = "tile";
          tile.setAttribute("role", "gridcell");
          tile.setAttribute("aria-label", `Row ${rowIndex + 1}, column ${colIndex + 1}, empty`);
          row.appendChild(tile);
          rowTiles.push(tile);
        }
        elements.board.appendChild(row);
        this.tileNodes.push(rowTiles);
      }
    }

    renderKeyboard() {
      const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
      elements.keyboard.innerHTML = "";
      this.keyNodes.clear();
      rows.forEach((letters, rowIndex) => {
        const row = document.createElement("div");
        row.className = "key-row";
        if (rowIndex === 1) {
          row.appendChild(document.createElement("span"));
        }
        if (rowIndex === 2) {
          row.appendChild(this.createKey("ENTER", "Enter", true));
        }
        letters.split("").forEach((letter) => row.appendChild(this.createKey(letter, letter, false)));
        if (rowIndex === 1) {
          row.appendChild(document.createElement("span"));
        }
        if (rowIndex === 2) {
          row.appendChild(this.createKey("BACK", "Backspace", true));
        }
        elements.keyboard.appendChild(row);
      });
    }

    createKey(label, value, wide) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = wide ? "key wide" : "key";
      button.textContent = label === "BACK" ? "⌫" : label;
      button.setAttribute("aria-label", label === "BACK" ? "Backspace" : label);
      button.dataset.key = value;
      button.addEventListener("click", () => this.game.handleKey(value));
      if (value.length === 1) {
        this.keyNodes.set(value, button);
      }
      return button;
    }

    syncBoard() {
      for (let rowIndex = 0; rowIndex < ROWS; rowIndex += 1) {
        for (let colIndex = 0; colIndex < COLS; colIndex += 1) {
          const tile = this.tileNodes[rowIndex][colIndex];
          const locked = this.game.guesses[rowIndex];
          const letter = locked ? locked.word[colIndex] : rowIndex === this.game.currentRow ? this.game.currentGuess[colIndex] : "";
          tile.textContent = letter || "";
          tile.className = "tile";
          if (letter) {
            tile.classList.add("filled");
          }
          if (locked) {
            const state = locked.result[colIndex];
            tile.classList.add(state);
            this.addMark(tile, RESULT_MARK[state]);
          } else if (rowIndex === this.game.currentRow && colIndex === this.game.currentGuess.length && this.game.state !== STATES.REVEALING) {
            tile.classList.add("current");
          }
          tile.setAttribute("aria-label", this.describeTile(rowIndex, colIndex, letter, locked));
        }
      }
    }

    describeTile(rowIndex, colIndex, letter, locked) {
      if (!letter) {
        return `Row ${rowIndex + 1}, column ${colIndex + 1}, empty`;
      }
      if (!locked) {
        return `Row ${rowIndex + 1}, column ${colIndex + 1}, ${letter}`;
      }
      const state = locked.result[colIndex].replace("present", "wrong position").replace("correct", "correct position").replace("absent", "not in word");
      return `Row ${rowIndex + 1}, column ${colIndex + 1}, ${letter}, ${state}`;
    }

    addMark(tile, mark) {
      const span = document.createElement("span");
      span.className = "mark";
      span.textContent = mark;
      tile.appendChild(span);
    }

    async reveal(rowIndex, result) {
      const tiles = this.tileNodes[rowIndex];
      for (let colIndex = 0; colIndex < COLS; colIndex += 1) {
        const tile = tiles[colIndex];
        const state = result[colIndex];
        tile.classList.add("flip");
        window.setTimeout(() => {
          tile.classList.add(state);
          this.addMark(tile, RESULT_MARK[state]);
        }, reduceMotion ? 0 : 190);
        await wait(reduceMotion ? 5 : 180);
        this.game.audio.play("reveal");
      }
      await wait(reduceMotion ? 5 : 260);
    }

    setKeyStates(keyStates) {
      this.keyNodes.forEach((node, letter) => {
        node.classList.remove("correct", "present", "absent");
        if (keyStates[letter]) {
          node.classList.add(keyStates[letter]);
        }
      });
    }

    shakeRow(rowIndex) {
      const row = elements.board.children[rowIndex];
      row.classList.remove("shake");
      void row.offsetWidth;
      row.classList.add("shake");
    }

    bounceRow(rowIndex) {
      const row = elements.board.children[rowIndex];
      row.classList.add("win");
      Array.from(row.children).forEach((tile, index) => {
        tile.style.animationDelay = `${index * 70}ms`;
      });
    }

    setMessage(message, warning = false) {
      elements.message.textContent = message;
      elements.message.classList.toggle("warn", warning);
    }

    showToast(message) {
      clearTimeout(this.toastTimeout);
      elements.toast.textContent = message;
      elements.toast.classList.add("show");
      this.toastTimeout = window.setTimeout(() => elements.toast.classList.remove("show"), 1400);
    }

    renderStats(stats) {
      const quickWinPct = stats.quick.games ? Math.round((stats.quick.wins / stats.quick.games) * 100) : 0;
      const quickAvg = stats.quick.wins ? (stats.quick.totalAttempts / stats.quick.wins).toFixed(1) : "—";
      const dailyWinPct = stats.daily.played ? Math.round((stats.daily.wins / stats.daily.played) * 100) : 0;
      elements.quickStats.innerHTML = statCard("Games", stats.quick.games) + statCard("Win %", quickWinPct) + statCard("Best Streak", stats.quick.bestStreak) + statCard("Avg Attempts", quickAvg);
      elements.dailyStats.innerHTML = statCard("Played", stats.daily.played) + statCard("Win %", dailyWinPct) + statCard("Current", stats.daily.currentStreak) + statCard("Best", stats.daily.bestStreak);
      const distribution = this.game.mode === "daily" ? stats.daily.distribution : stats.quick.distribution;
      const max = Math.max(1, ...distribution);
      elements.distribution.innerHTML = distribution.map((count, index) => {
        const width = Math.max(5, Math.round((count / max) * 100));
        return `<div class="dist-row"><span>${index + 1}</span><div class="dist-track"><div class="dist-bar" style="width:${width}%"></div></div><span>${count}</span></div>`;
      }).join("");
    }
  }

  class GameManager {
    constructor() {
      this.stats = new StatsManager();
      this.audio = new AudioManager();
      this.ui = new UIManager(this);
      this.mode = StorageManager.get("mode", "quick");
      this.hardMode = StorageManager.get("hardMode", false);
      this.keyStates = {};
      this.timerId = null;
      this.startTime = Date.now();
      this.hintUsed = false;
      this.hintLetter = null;
      this.state = STATES.READY;
      this.guesses = [];
      this.currentGuess = "";
      this.currentRow = 0;
      this.secret = "";
    }

    init() {
      this.applyTheme();
      this.ui.init();
      this.audio.setEnabled(this.audio.enabled);
      this.bindEvents();
      this.startMode(this.mode);
      if (!StorageManager.get("helpSeen", false)) {
        StorageManager.set("helpSeen", true);
        window.setTimeout(() => this.openModal(elements.helpModal), 450);
      }
      runEvaluationTests();
    }

    bindEvents() {
      document.addEventListener("keydown", (event) => {
        if (event.ctrlKey || event.metaKey || event.altKey) {
          return;
        }
        if (event.key === "Enter" || event.key === "Backspace" || /^[a-zA-Z]$/.test(event.key)) {
          event.preventDefault();
          this.handleKey(event.key);
        }
      });
      elements.quickModeButton.addEventListener("click", () => this.startMode("quick"));
      elements.dailyModeButton.addEventListener("click", () => this.startMode("daily"));
      elements.difficultyPill.addEventListener("click", () => this.toggleHardMode());
      elements.difficultyPill.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.toggleHardMode();
        }
      });
      elements.themeButton.addEventListener("click", () => this.toggleTheme());
      elements.soundButton.addEventListener("click", () => this.audio.setEnabled(!this.audio.enabled));
      elements.statsButton.addEventListener("click", () => {
        this.ui.renderStats(this.stats);
        this.openModal(elements.statsModal);
      });
      elements.helpButton.addEventListener("click", () => this.openModal(elements.helpModal));
      elements.hintButton.addEventListener("click", () => this.useHint());
      elements.playAgainButton.addEventListener("click", () => {
        this.closeModal(elements.resultModal);
        if (this.mode === "quick") {
          this.newQuickGame();
        } else {
          this.startMode("daily");
        }
      });
      elements.copyButton.addEventListener("click", () => this.copyShareText());
      document.querySelectorAll("[data-close]").forEach((button) => {
        button.addEventListener("click", () => this.closeModal(document.getElementById(button.dataset.close)));
      });
      document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
          if (event.target === dialog) {
            this.closeModal(dialog);
          }
        });
      });
      window.addEventListener("resize", () => resizeConfettiCanvas());
    }

    startMode(mode) {
      this.mode = mode;
      StorageManager.set("mode", mode);
      elements.quickModeButton.classList.toggle("active", mode === "quick");
      elements.dailyModeButton.classList.toggle("active", mode === "daily");
      elements.hintBar.hidden = mode !== "quick";
      if (mode === "quick") {
        this.newQuickGame();
      } else {
        this.loadDailyGame();
      }
    }

    resetCommon(secret) {
      this.secret = secret;
      this.keyStates = {};
      this.state = STATES.READY;
      this.guesses = [];
      this.currentGuess = "";
      this.currentRow = 0;
      this.startTime = Date.now();
      this.hintUsed = false;
      this.hintLetter = null;
      elements.hintButton.disabled = false;
      elements.hintText.textContent = this.mode === "quick" ? "One hint available in Quick Play." : "";
      this.ui.renderBoard();
      this.ui.setKeyStates(this.keyStates);
      this.ui.syncBoard();
      this.ui.setMessage(this.mode === "quick" ? "Quick Play" : "Daily Word");
      this.updateModeDetails();
      this.startTimer();
    }

    newQuickGame() {
      const secret = solutionWords[Math.floor(Math.random() * solutionWords.length)];
      this.resetCommon(secret);
    }

    loadDailyGame() {
      const dateKey = DailyWordManager.todayKey();
      const saved = DailyWordManager.getSavedGame(dateKey);
      this.resetCommon(DailyWordManager.wordFor(dateKey));
      this.stopTimer();
      elements.timer.textContent = `#${DailyWordManager.dayNumber(dateKey) + 1}`;
      if (saved) {
        this.guesses = saved.guesses || [];
        this.currentRow = this.guesses.length;
        this.keyStates = saved.keyStates || {};
        this.state = saved.state;
        this.currentGuess = "";
        this.ui.syncBoard();
        this.ui.setKeyStates(this.keyStates);
        if (this.state === STATES.WON || this.state === STATES.LOST) {
          this.ui.setMessage(this.state === STATES.WON ? "Completed" : `Word: ${this.secret}`);
          elements.playAgainButton.textContent = "Close";
          window.setTimeout(() => this.showResult(false), 200);
        }
      }
    }

    updateModeDetails() {
      elements.difficultyPill.textContent = this.hardMode ? "Hard" : "Normal";
      elements.timer.hidden = false;
      elements.playAgainButton.textContent = this.mode === "quick" ? "Play Again" : "Close";
    }

    startTimer() {
      this.stopTimer();
      if (this.mode !== "quick") {
        return;
      }
      const update = () => {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const seconds = String(elapsed % 60).padStart(2, "0");
        elements.timer.textContent = `${minutes}:${seconds}`;
      };
      update();
      this.timerId = window.setInterval(update, 1000);
    }

    stopTimer() {
      if (this.timerId) {
        window.clearInterval(this.timerId);
        this.timerId = null;
      }
    }

    handleKey(key) {
      if (this.state === STATES.REVEALING || this.state === STATES.WON || this.state === STATES.LOST) {
        return;
      }
      if (key === "Enter") {
        this.submitGuess();
        return;
      }
      if (key === "Backspace") {
        this.currentGuess = this.currentGuess.slice(0, -1);
        this.ui.syncBoard();
        this.audio.play("key");
        return;
      }
      const letter = key.toUpperCase();
      if (/^[A-Z]$/.test(letter) && this.currentGuess.length < COLS) {
        this.state = STATES.TYPING;
        this.currentGuess += letter;
        this.ui.syncBoard();
        this.audio.play("key");
      }
    }

    async submitGuess() {
      if (this.state === STATES.REVEALING) {
        return;
      }
      this.audio.play("enter");
      if (this.currentGuess.length < COLS) {
        this.reject("NOT ENOUGH LETTERS");
        return;
      }
      if (!acceptedWords.has(this.currentGuess)) {
        this.reject("NOT IN WORD LIST");
        return;
      }
      const hardModeMessage = this.getHardModeViolation(this.currentGuess);
      if (hardModeMessage) {
        this.reject(hardModeMessage);
        return;
      }

      this.state = STATES.REVEALING;
      const guess = this.currentGuess;
      const result = WordEvaluator.evaluate(this.secret, guess);
      const rowIndex = this.currentRow;
      this.ui.syncBoard();
      await this.ui.reveal(rowIndex, result);
      this.guesses.push({ word: guess, result });
      this.currentGuess = "";
      this.updateKeyboard(guess, result);
      this.currentRow += 1;

      const won = guess === this.secret;
      if (won) {
        this.finish(true);
      } else if (this.currentRow >= ROWS) {
        this.finish(false);
      } else {
        this.state = STATES.READY;
        this.ui.syncBoard();
        this.ui.setMessage(`${ROWS - this.currentRow} tries left`);
        this.saveDailyProgress();
      }
    }

    reject(message) {
      this.ui.shakeRow(this.currentRow);
      this.ui.setMessage(message, true);
      this.ui.showToast(message);
    }

    updateKeyboard(guess, result) {
      guess.split("").forEach((letter, index) => {
        const state = result[index];
        const current = this.keyStates[letter];
        if (!current || RESULT_PRIORITY[state] > RESULT_PRIORITY[current]) {
          this.keyStates[letter] = state;
        }
      });
      this.ui.setKeyStates(this.keyStates);
    }

    getHardModeViolation(guess) {
      if (!this.hardMode || this.guesses.length === 0) {
        return "";
      }
      const requiredPositions = {};
      const requiredLetters = new Set();
      this.guesses.forEach((entry) => {
        entry.word.split("").forEach((letter, index) => {
          if (entry.result[index] === "correct") {
            requiredPositions[index] = letter;
          }
          if (entry.result[index] === "correct" || entry.result[index] === "present") {
            requiredLetters.add(letter);
          }
        });
      });
      for (const [index, letter] of Object.entries(requiredPositions)) {
        if (guess[Number(index)] !== letter) {
          return `${letter} must stay in slot ${Number(index) + 1}`;
        }
      }
      for (const letter of requiredLetters) {
        if (!guess.includes(letter)) {
          return `Guess must include ${letter}`;
        }
      }
      return "";
    }

    finish(won) {
      this.stopTimer();
      this.state = won ? STATES.WON : STATES.LOST;
      const attempts = this.guesses.length;
      if (won) {
        this.ui.bounceRow(attempts - 1);
        this.ui.setMessage("WORD FOUND");
        this.audio.play("win");
        launchConfetti();
      } else {
        this.ui.setMessage(`THE WORD WAS ${this.secret}`);
        this.audio.play("loss");
      }

      if (this.mode === "quick") {
        this.stats.recordQuick({ won, attempts, hintUsed: this.hintUsed });
      } else {
        this.stats.recordDaily({ won, attempts, dateKey: DailyWordManager.todayKey() });
      }
      this.saveDailyProgress();
      window.setTimeout(() => this.showResult(true), won && !reduceMotion ? 850 : 350);
    }

    showResult(autoOpen) {
      const won = this.state === STATES.WON;
      const attempts = this.guesses.length;
      elements.resultKicker.textContent = won ? "WORD FOUND" : "THE WORD WAS";
      elements.resultTitle.textContent = won ? WIN_TITLES[attempts - 1] : this.secret;
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const timeText = this.mode === "quick" ? `<span>Time: ${formatDuration(elapsed)}</span>` : "";
      const streak = this.mode === "quick" ? this.stats.quick.currentStreak : this.stats.daily.currentStreak;
      elements.resultMeta.innerHTML = `
        <span>Attempts used: ${attempts}/6</span>
        ${timeText}
        <span>Current streak: ${streak}</span>
        ${this.hintUsed ? "<span>Hint used this round</span>" : ""}
      `;
      if (this.mode === "daily") {
        const share = this.buildShareText();
        elements.shareText.value = share;
        elements.shareBox.hidden = false;
      } else {
        elements.shareBox.hidden = true;
      }
      if (autoOpen || !elements.resultModal.open) {
        this.openModal(elements.resultModal);
      }
    }

    buildShareText() {
      const day = DailyWordManager.dayNumber(DailyWordManager.todayKey()) + 1;
      const score = this.state === STATES.WON ? `${this.guesses.length}/6` : "X/6";
      const rows = this.guesses.map((entry) => entry.result.map((state) => {
        if (state === "correct") return "🟩";
        if (state === "present") return "🟨";
        return "⬛";
      }).join(""));
      return [`WORD LOCK #${day} ${score}`, "", ...rows].join("\n");
    }

    async copyShareText() {
      elements.shareText.select();
      try {
        await navigator.clipboard.writeText(elements.shareText.value);
        this.ui.showToast("COPIED");
      } catch {
        this.ui.showToast("SELECTED RESULT");
      }
    }

    useHint() {
      if (this.mode !== "quick" || this.hintUsed || this.state === STATES.WON || this.state === STATES.LOST) {
        return;
      }
      const known = new Set();
      this.guesses.forEach((entry) => {
        entry.word.split("").forEach((letter, index) => {
          if (entry.result[index] !== "absent") {
            known.add(letter);
          }
        });
      });
      this.currentGuess.split("").forEach((letter) => known.add(letter));
      const candidates = this.secret.split("").filter((letter) => !known.has(letter));
      this.hintLetter = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : this.secret[Math.floor(Math.random() * COLS)];
      this.hintUsed = true;
      elements.hintButton.disabled = true;
      elements.hintText.textContent = `The word contains the letter ${this.hintLetter}.`;
      this.ui.setMessage(`Contains ${this.hintLetter}`);
    }

    toggleHardMode() {
      this.hardMode = !this.hardMode;
      StorageManager.set("hardMode", this.hardMode);
      this.updateModeDetails();
      this.ui.setMessage(this.hardMode ? "Hard Mode" : "Normal Mode");
    }

    toggleTheme() {
      const current = document.documentElement.dataset.theme;
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      StorageManager.set("theme", next);
    }

    applyTheme() {
      const stored = StorageManager.get("theme", null);
      const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = stored || system;
    }

    saveDailyProgress() {
      if (this.mode !== "daily") {
        return;
      }
      DailyWordManager.saveGame({
        dateKey: DailyWordManager.todayKey(),
        state: this.state,
        guesses: this.guesses,
        keyStates: this.keyStates
      });
    }

    openModal(modal) {
      if (!modal.open) {
        modal.showModal();
      }
    }

    closeModal(modal) {
      if (modal.open) {
        modal.close();
      }
    }
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function statCard(label, value) {
    return `<div class="stat-card"><strong>${value}</strong><span>${label}</span></div>`;
  }

  function formatDuration(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function resizeConfettiCanvas() {
    const canvas = elements.confettiCanvas;
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * scale);
    canvas.height = Math.floor(window.innerHeight * scale);
  }

  function launchConfetti() {
    if (reduceMotion) {
      return;
    }
    resizeConfettiCanvas();
    const canvas = elements.confettiCanvas;
    const context = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;
    const colors = ["#26745a", "#d2a246", "#ffffff", "#e06861"];
    const particles = Array.from({ length: 70 }, () => ({
      x: (window.innerWidth / 2 + (Math.random() - 0.5) * 220) * scale,
      y: (window.innerHeight * 0.28 + Math.random() * 40) * scale,
      vx: (Math.random() - 0.5) * 8 * scale,
      vy: (-4 - Math.random() * 5) * scale,
      size: (4 + Math.random() * 5) * scale,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI
    }));
    let frame = 0;
    function draw() {
      frame += 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.22 * scale;
        particle.rotation += 0.12;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.6);
        context.restore();
      });
      if (frame < 92) {
        requestAnimationFrame(draw);
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    draw();
  }

  function runEvaluationTests() {
    const cases = [
      { secret: "THEME", guess: "EERIE", expected: ["present", "absent", "absent", "absent", "correct"] },
      { secret: "SHELL", guess: "SALON", expected: ["correct", "absent", "present", "absent", "absent"] },
      { secret: "LEVEL", guess: "LEECH", expected: ["correct", "correct", "present", "absent", "absent"] },
      { secret: "PLANT", guess: "SLATE", expected: ["absent", "correct", "correct", "present", "absent"] },
      { secret: "ARRAY", guess: "RARER", expected: ["present", "present", "correct", "absent", "absent"] }
    ];
    cases.forEach((testCase) => {
      const actual = WordEvaluator.evaluate(testCase.secret, testCase.guess);
      const pass = actual.join("|") === testCase.expected.join("|");
      if (!pass) {
        throw new Error(`Evaluation failed for ${testCase.secret}/${testCase.guess}: ${actual.join(",")}`);
      }
    });
    window.WordLockTest = { WordEvaluator, DailyWordManager };
  }

  resizeConfettiCanvas();
  new GameManager().init();
})();
