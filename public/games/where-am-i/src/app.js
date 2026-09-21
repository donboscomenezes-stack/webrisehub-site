(function () {
  "use strict";

  const ROUND_COUNT = 5;
  const MAX_ROUND_SCORE = 5000;
  const STORAGE_KEY = "whereAmI.stats.v1";
  const SETTINGS_KEY = "whereAmI.settings.v1";
  const locations = (window.WHERE_AM_I_LOCATIONS || []).map((location) => ({
    ...location,
    category: location.category || (/(city|town|district|suburb)/.test(location.type) ? "city" : "landmark")
  }));
  const memoryStore = {};
  const galleryCache = new Map();

  const el = {
    screens: {
      home: document.getElementById("homeScreen"),
      play: document.getElementById("playScreen"),
      result: document.getElementById("resultScreen"),
      final: document.getElementById("finalScreen")
    },
    homeBg: document.getElementById("homeBg"),
    finalBg: document.getElementById("finalBg"),
    roundLabel: document.getElementById("roundLabel"),
    modeLabel: document.getElementById("modeLabel"),
    scoreLabel: document.getElementById("scoreLabel"),
    timerLabel: document.getElementById("timerLabel"),
    imageStage: document.getElementById("imageStage"),
    image: document.getElementById("locationImage"),
    imageLoading: document.getElementById("imageLoading"),
    photoCounter: document.getElementById("photoCounter"),
    reveal: document.getElementById("revealButton"),
    previousPhoto: document.getElementById("previousPhotoButton"),
    nextPhoto: document.getElementById("nextPhotoButton"),
    zoomIn: document.getElementById("zoomInButton"),
    zoomOut: document.getElementById("zoomOutButton"),
    resetView: document.getElementById("resetViewButton"),
    expand: document.getElementById("expandButton"),
    openMap: document.getElementById("openMapButton"),
    hintOne: document.getElementById("hintOneButton"),
    hintTwo: document.getElementById("hintTwoButton"),
    countryChoices: document.getElementById("countryChoices"),
    categorySelect: document.getElementById("categorySelect"),
    regionSelect: document.getElementById("regionSelect"),
    mapOverlay: document.getElementById("mapOverlay"),
    guessMap: document.getElementById("guessMap"),
    resultMap: document.getElementById("resultMap"),
    closeMap: document.getElementById("closeMapButton"),
    confirmGuess: document.getElementById("confirmGuessButton"),
    pinStatus: document.getElementById("pinStatus"),
    mapRoundLabel: document.getElementById("mapRoundLabel"),
    resultTone: document.getElementById("resultTone"),
    resultPlace: document.getElementById("resultPlace"),
    distanceLabel: document.getElementById("distanceLabel"),
    roundScoreLabel: document.getElementById("roundScoreLabel"),
    clueList: document.getElementById("clueList"),
    nextRound: document.getElementById("nextRoundButton"),
    finalMode: document.getElementById("finalMode"),
    finalScore: document.getElementById("finalScore"),
    finalSummary: document.getElementById("finalSummary"),
    roundStrip: document.getElementById("roundStrip"),
    journeyRecap: document.getElementById("journeyRecap"),
    shareButton: document.getElementById("shareButton"),
    homeButton: document.getElementById("homeButton"),
    statsButton: document.getElementById("statsButton"),
    creditsButton: document.getElementById("creditsButton"),
    dialog: document.getElementById("infoDialog"),
    dialogContent: document.getElementById("dialogContent")
  };

  const state = {
    mode: "world",
    difficulty: "explorer",
    roundIndex: 0,
    totalScore: 0,
    roundLocations: [],
    results: [],
    current: null,
    guess: null,
    hintCount: 0,
    revealCount: 0,
    gallery: [],
    photoIndex: 0,
    maxPhotoIndex: 0,
    countryCorrect: null,
    hotColdAttempts: 0,
    timeLeft: 60,
    timerId: null,
    category: "all",
    region: "all",
    failedImages: new Set(),
    map: null,
    resultMap: null,
    guessMarker: null,
    fallbackGuessHandler: null,
    audioEnabled: true
  };

  const viewer = {
    scale: 1,
    x: 0,
    y: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0
  };

  const modeNames = {
    world: "World Tour",
    daily: "Daily Journey",
    city: "City Hunt",
    timed: "Against the Clock",
    country: "Country Challenge",
    hotCold: "Hot & Cold",
    scenic: "Scenic Expedition",
    noHints: "No Hints"
  };

  function showScreen(name) {
    Object.entries(el.screens).forEach(([key, node]) => {
      node.classList.toggle("active", key === name);
    });
  }

  function formatNumber(value) {
    return Math.round(value).toLocaleString("en-US");
  }

  function imageUrl(location) {
    return location.image || "";
  }

  async function fetchGallery(location) {
    if (galleryCache.has(location.id)) return galleryCache.get(location.id);
    const gallery = [];
    const titles = location.wikiTitles || [location.city];
    try {
      const resolved = await Promise.all(titles.map(async (title) => {
        const params = new URLSearchParams({
          action: "query", format: "json", origin: "*", redirects: "1", prop: "pageimages|info",
          inprop: "url", piprop: "thumbnail|original", pilicense: "any", pithumbsize: "1800", titles: title
        });
        const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
        if (!response.ok) return null;
        const payload = await response.json();
        const page = Object.values((payload.query && payload.query.pages) || {})[0];
        if (!page || page.missing !== undefined || !page.thumbnail) return null;
        const leadName = String(page.pageimage || page.thumbnail.source || "").toLowerCase();
        if (/\.svg($|\/)|logo|flag|seal|coat[_ -]of[_ -]arms|locator[_ -]map|icon|emblem/.test(leadName)) return null;
        return {
          url: page.thumbnail.source,
          source: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`,
          credit: `Wikipedia lead image: ${page.title}`
        };
      }));
      resolved.filter(Boolean).forEach((item) => {
        if (!gallery.some((existing) => existing.url === item.url)) gallery.push(item);
      });
    } catch (error) {
      console.warn("Curated photos unavailable", error);
    }
    if (location.image && !gallery.some((item) => item.url === location.image)) {
      gallery.push({ url: location.image, source: location.imageSource, credit: location.imageCredit });
    }
    const result = gallery.slice(0, 3);
    galleryCache.set(location.id, result);
    return result;
  }

  function setPhoto(index) {
    if (!state.gallery.length) return;
    state.photoIndex = Math.max(0, Math.min(state.gallery.length - 1, index));
    el.imageLoading.textContent = "Loading location...";
    el.imageLoading.classList.remove("hidden");
    el.image.style.opacity = "0";
    el.image.src = state.gallery[state.photoIndex].url;
    el.photoCounter.textContent = `Photo ${state.photoIndex + 1} / ${state.gallery.length}`;
    el.previousPhoto.disabled = state.photoIndex === 0;
    el.nextPhoto.disabled = state.photoIndex >= Math.min(state.maxPhotoIndex, state.gallery.length - 1);
    resetViewer();
    if (state.revealCount === 0) {
      viewer.scale = state.difficulty === "casual" ? 1.25 : state.difficulty === "expert" ? 1.75 : 1.5;
      applyViewerTransform();
      el.imageStage.classList.add("concealed");
    }
  }

  function revealMore() {
    if (state.revealCount === 0) {
      state.revealCount += 1;
      el.imageStage.classList.remove("concealed");
      resetViewer();
      el.reveal.textContent = "Show another photo";
    } else if (state.photoIndex < state.gallery.length - 1) {
      state.revealCount += 1;
      state.maxPhotoIndex = Math.max(state.maxPhotoIndex, state.photoIndex + 1);
      setPhoto(state.photoIndex + 1);
      el.imageStage.classList.remove("concealed");
    }
    el.reveal.disabled = state.revealCount >= 3 || (state.photoIndex >= state.gallery.length - 1 && state.revealCount > 0);
    playTone(300, 0.05);
  }

  function storageRead(key, fallback) {
    try {
      const store = window.localStorage;
      if (!store) return memoryStore[key] || fallback;
      return JSON.parse(store.getItem(key)) || fallback;
    } catch (error) {
      return memoryStore[key] || fallback;
    }
  }

  function storageWrite(key, value) {
    try {
      memoryStore[key] = value;
      const store = window.localStorage;
      if (store) store.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Storage unavailable", error);
    }
  }

  function defaultStats() {
    return {
      gamesPlayed: 0,
      roundsPlayed: 0,
      bestGame: 0,
      bestCloseStreak: 0,
      totalScore: 0,
      perfectRounds: 0,
      countries: [],
      dailyResults: {},
      currentDailyStreak: 0,
      modesPlayed: [],
      achievements: []
    };
  }

  function shuffle(list, random = Math.random) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function seededRandom(seedText) {
    let seed = 2166136261;
    for (let i = 0; i < seedText.length; i += 1) {
      seed ^= seedText.charCodeAt(i);
      seed = Math.imul(seed, 16777619);
    }
    return function next() {
      seed += 0x6d2b79f5;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function selectLocations(mode, difficulty) {
    let pool = locations.filter((location) => !state.failedImages.has(location.id));
    if (mode === "city") {
      pool = pool.filter((location) => location.type.includes("city") || location.type.includes("historic"));
    }
    if (mode === "noHints") {
      pool = pool.filter((location) => location.difficulty !== "easy");
    }
    if (mode === "scenic") pool = pool.filter((location) => location.category === "nature");
    if (state.category !== "all") pool = pool.filter((location) => location.category === state.category);
    if (state.region !== "all") pool = pool.filter((location) => location.continent === state.region);
    if (pool.length < ROUND_COUNT) pool = locations.filter((location) => !state.failedImages.has(location.id));
    if (difficulty === "casual") {
      pool = [...pool.filter((location) => location.difficulty === "easy"), ...pool.filter((location) => location.difficulty === "medium")];
    } else if (difficulty === "expert") {
      pool = [...pool.filter((location) => location.difficulty !== "easy"), ...pool.filter((location) => location.difficulty === "easy")];
    }

    const random = mode === "daily" ? seededRandom(new Date().toISOString().slice(0, 10)) : Math.random;
    const selected = [];
    const continents = new Set();
    for (const item of shuffle(pool, random)) {
      if (selected.length < ROUND_COUNT && (!continents.has(item.continent) || selected.length > 2)) {
        selected.push(item);
        continents.add(item.continent);
      }
    }
    for (const item of shuffle(pool, random)) {
      if (selected.length >= ROUND_COUNT) break;
      if (!selected.some((existing) => existing.id === item.id)) selected.push(item);
    }
    return selected.slice(0, ROUND_COUNT);
  }

  function startGame(mode) {
    clearInterval(state.timerId);
    state.mode = mode;
    state.category = el.categorySelect.value;
    state.region = el.regionSelect.value;
    state.roundIndex = 0;
    state.totalScore = 0;
    state.results = [];
    state.roundLocations = selectLocations(mode, state.difficulty);
    if (mode === "noHints") {
      el.hintOne.disabled = true;
      el.hintTwo.disabled = true;
    }
    showScreen("play");
    loadRound();
  }

  async function loadRound() {
    state.current = state.roundLocations[state.roundIndex];
    state.guess = null;
    state.hintCount = 0;
    state.revealCount = 0;
    state.photoIndex = 0;
    state.maxPhotoIndex = 0;
    state.countryCorrect = null;
    state.hotColdAttempts = 0;
    state.guessMarker = null;
    resetViewer();
    updateHud();
    el.hintOne.textContent = "Hint: Continent";
    el.hintTwo.textContent = "Hint: Clue";
    el.hintOne.disabled = state.mode === "noHints";
    el.hintTwo.disabled = state.mode === "noHints";
    el.reveal.disabled = false;
    el.reveal.textContent = "Reveal wider view";
    el.countryChoices.hidden = true;
    el.countryChoices.innerHTML = "";
    el.openMap.textContent = state.mode === "country" ? "Choose Country" : "Guess Location";
    el.imageLoading.classList.remove("hidden");
    el.image.style.opacity = "0";
    state.gallery = await fetchGallery(state.current);
    if (!state.gallery.length) {
      state.failedImages.add(state.current.id);
      const replacement = selectLocations(state.mode, state.difficulty).find((item) => !state.roundLocations.some((round) => round.id === item.id));
      if (replacement) {
        state.roundLocations[state.roundIndex] = replacement;
        loadRound();
        return;
      }
      el.imageLoading.textContent = "No image could be loaded for this expedition.";
      return;
    }
    setPhoto(0);
    if (state.mode === "timed") startTimer();
    preloadNext();
  }

  function updateHud() {
    el.roundLabel.textContent = `Round ${state.roundIndex + 1} / ${ROUND_COUNT}`;
    el.mapRoundLabel.textContent = `Round ${state.roundIndex + 1} / ${ROUND_COUNT}`;
    el.modeLabel.textContent = modeNames[state.mode] || "World Tour";
    el.scoreLabel.textContent = `${formatNumber(state.totalScore)} PTS`;
    el.timerLabel.hidden = state.mode !== "timed";
  }

  function preloadNext() {
    const next = state.roundLocations[state.roundIndex + 1];
    if (!next) return;
    const img = new Image();
    if (imageUrl(next)) img.src = imageUrl(next);
  }

  function resetViewer() {
    viewer.scale = 1;
    viewer.x = 0;
    viewer.y = 0;
    applyViewerTransform();
  }

  function applyViewerTransform() {
    const maxOffset = 240 * viewer.scale;
    viewer.x = Math.max(-maxOffset, Math.min(maxOffset, viewer.x));
    viewer.y = Math.max(-maxOffset, Math.min(maxOffset, viewer.y));
    el.image.style.transform = `translate(calc(-50% + ${viewer.x}px), calc(-50% + ${viewer.y}px)) scale(${viewer.scale})`;
  }

  function changeZoom(delta) {
    viewer.scale = Math.max(1, Math.min(3.2, viewer.scale + delta));
    if (viewer.scale === 1) {
      viewer.x = 0;
      viewer.y = 0;
    }
    applyViewerTransform();
  }

  function useHint(which) {
    if (state.mode === "noHints") return;
    if (which === 1 && !el.hintOne.disabled) {
      state.hintCount += 1;
      el.hintOne.textContent = `Continent: ${state.current.continent}`;
      el.hintOne.disabled = true;
      playTone(260, 0.05);
    }
    if (which === 2 && !el.hintTwo.disabled) {
      state.hintCount += 1;
      const clue = state.current.clueTags[Math.min(1, state.current.clueTags.length - 1)];
      el.hintTwo.textContent = clue;
      el.hintTwo.disabled = true;
      playTone(330, 0.05);
    }
  }

  function startTimer() {
    clearInterval(state.timerId);
    state.timeLeft = state.difficulty === "casual" ? 75 : state.difficulty === "expert" ? 40 : 60;
    el.timerLabel.textContent = `${state.timeLeft}s`;
    el.timerLabel.classList.remove("urgent");
    state.timerId = setInterval(() => {
      state.timeLeft -= 1;
      el.timerLabel.textContent = `${state.timeLeft}s`;
      el.timerLabel.classList.toggle("urgent", state.timeLeft <= 10);
      if (state.timeLeft <= 0) {
        clearInterval(state.timerId);
        state.guess = state.guess || { lat: 0, lng: 0 };
        finalizeGuess(true);
      }
    }, 1000);
  }

  function showCountryChoices() {
    const otherCountries = shuffle([...new Set(locations.map((item) => item.country).filter((country) => country !== state.current.country))]).slice(0, 3);
    const choices = shuffle([state.current.country, ...otherCountries]);
    el.countryChoices.innerHTML = choices.map((country) => `<button type="button" data-country="${escapeHtml(country)}">${escapeHtml(country)}</button>`).join("");
    el.countryChoices.hidden = false;
    el.openMap.textContent = "Select a country above";
    el.countryChoices.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        state.countryCorrect = button.dataset.country === state.current.country;
        el.countryChoices.querySelectorAll("button").forEach((choice) => {
          choice.disabled = true;
          choice.classList.toggle("correct", choice.dataset.country === state.current.country);
          choice.classList.toggle("wrong", choice === button && !state.countryCorrect);
        });
        el.openMap.textContent = state.countryCorrect ? "Correct - Place Exact Pin" : "Place Exact Pin";
        setTimeout(openMap, 450);
      });
    });
  }

  function haversineKm(a, b) {
    const radius = 6371.0088;
    const toRad = (value) => value * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * radius * Math.asin(Math.sqrt(h));
  }

  function scoreDistance(distanceKm, hintCount) {
    const base = Math.round(MAX_ROUND_SCORE * Math.exp(-distanceKm / 1500));
    const precisionBonus = distanceKm <= 1 ? 300 : distanceKm <= 10 ? 140 : 0;
    const hintPenalty = hintCount * (state.difficulty === "expert" ? 450 : state.difficulty === "casual" ? 180 : 300);
    const revealPenalty = state.revealCount * 250;
    const timeBonus = state.mode === "timed" ? Math.min(600, state.timeLeft * 10) : 0;
    const countryAdjustment = state.mode === "country" ? (state.countryCorrect ? 350 : -350) : 0;
    return Math.max(0, Math.min(MAX_ROUND_SCORE, base + precisionBonus + timeBonus + countryAdjustment - hintPenalty - revealPenalty));
  }

  function resultTone(distanceKm) {
    if (distanceKm <= 1) return "Incredible";
    if (distanceKm <= 10) return "So Close";
    if (distanceKm <= 100) return "Great Guess";
    if (distanceKm <= 700) return "Solid Read";
    return "Worlds Away";
  }

  function openMap() {
    if (state.mode === "country" && state.countryCorrect === null) {
      showCountryChoices();
      return;
    }
    el.mapOverlay.classList.add("open");
    el.mapOverlay.setAttribute("aria-hidden", "false");
    state.guess = null;
    state.guessMarker = null;
    el.confirmGuess.disabled = true;
    el.confirmGuess.textContent = state.mode === "hotCold" ? "Check Temperature" : "Confirm Guess";
    el.pinStatus.textContent = "Click the map to place a pin.";
    setupGuessMap();
    playTone(180, 0.035);
  }

  function closeMap() {
    el.mapOverlay.classList.remove("open");
    el.mapOverlay.setAttribute("aria-hidden", "true");
  }

  function setupGuessMap() {
    if (state.map && typeof state.map.remove === "function") {
      state.map.remove();
    }
    el.guessMap.innerHTML = "";

    if (window.L && window.L.map) {
      state.map = L.map(el.guessMap, {
        zoomControl: true,
        worldCopyJump: true,
        minZoom: 2
      }).setView([18, 8], 2);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(state.map);
      state.map.on("click", (event) => setGuess(event.latlng.lat, event.latlng.lng));
      setTimeout(() => state.map.invalidateSize(), 80);
    } else {
      state.map = null;
      setupFallbackMap(el.guessMap, (lat, lng) => setGuess(lat, lng));
    }
  }

  function setGuess(lat, lng) {
    state.guess = { lat, lng };
    el.pinStatus.textContent = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    el.confirmGuess.disabled = false;
    if (state.map && window.L) {
      const icon = markerIcon("guess");
      if (!state.guessMarker) {
        state.guessMarker = L.marker([lat, lng], { icon, draggable: true }).addTo(state.map);
        state.guessMarker.on("dragend", () => {
          const pos = state.guessMarker.getLatLng();
          setGuess(pos.lat, pos.lng);
        });
      } else {
        state.guessMarker.setLatLng([lat, lng]);
      }
    } else {
      drawFallbackGuess(el.guessMap, lat, lng);
    }
    playTone(440, 0.04);
  }

  function confirmGuess() {
    if (!state.guess) return;
    const actual = { lat: state.current.latitude, lng: state.current.longitude };
    const distance = haversineKm(state.guess, actual);
    if (state.mode === "hotCold" && state.hotColdAttempts < 2 && distance > 100) {
      state.hotColdAttempts += 1;
      const temperature = distance < 500 ? "Very hot" : distance < 1500 ? "Warm" : distance < 4000 ? "Cool" : "Cold";
      el.pinStatus.textContent = `${temperature}: ${formatNumber(distance)} km away. Attempt ${state.hotColdAttempts + 1} of 3.`;
      el.confirmGuess.textContent = "Try This Pin";
      playTone(distance < 1500 ? 520 : 180, 0.08);
      return;
    }
    finalizeGuess(false);
  }

  function finalizeGuess(timedOut) {
    if (!state.guess) return;
    clearInterval(state.timerId);
    const actual = { lat: state.current.latitude, lng: state.current.longitude };
    const distance = haversineKm(state.guess, actual);
    const roundScore = timedOut ? 0 : scoreDistance(distance, state.hintCount);
    const result = {
      location: state.current,
      guess: state.guess,
      distance,
      score: roundScore,
      hintCount: state.hintCount,
      revealCount: state.revealCount,
      countryCorrect: state.countryCorrect,
      timedOut: Boolean(timedOut),
      photo: state.gallery[state.photoIndex] || state.gallery[0]
    };
    state.results.push(result);
    state.totalScore += roundScore;
    closeMap();
    showResult(result);
    playTone(!timedOut && distance <= 10 ? 660 : 240, 0.09);
  }

  function showResult(result) {
    showScreen("result");
    el.resultTone.textContent = result.timedOut ? "Time Up" : resultTone(result.distance);
    el.resultPlace.textContent = `${result.location.city}, ${result.location.country}`;
    el.distanceLabel.textContent = `${formatNumber(result.distance)} km`;
    el.roundScoreLabel.textContent = `${formatNumber(result.score)} / 5,000`;
    const roundNotes = [...result.location.clueTags.slice(0, 4)];
    if (result.countryCorrect === true) roundNotes.push("Country call was correct: +350 points");
    if (result.countryCorrect === false) roundNotes.push("Country call was incorrect: -350 points");
    if (result.revealCount) roundNotes.push(`${result.revealCount} photo reveal${result.revealCount === 1 ? "" : "s"}: -${formatNumber(result.revealCount * 250)} points`);
    el.clueList.innerHTML = roundNotes.map((clue) => `<li>${escapeHtml(clue)}</li>`).join("");
    el.nextRound.textContent = state.roundIndex + 1 >= ROUND_COUNT ? "See Final Score" : "Next Round";
    setupResultMap(result);
  }

  function setupResultMap(result) {
    if (state.resultMap && typeof state.resultMap.remove === "function") {
      state.resultMap.remove();
    }
    el.resultMap.innerHTML = "";
    const actual = [result.location.latitude, result.location.longitude];
    const guess = [result.guess.lat, result.guess.lng];

    if (window.L && window.L.map) {
      state.resultMap = L.map(el.resultMap, {
        zoomControl: true,
        minZoom: 2
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(state.resultMap);
      L.marker(guess, { icon: markerIcon("guess") }).addTo(state.resultMap).bindPopup("Your guess");
      L.marker(actual, { icon: markerIcon("actual") }).addTo(state.resultMap).bindPopup(`${result.location.city}, ${result.location.country}`);
      L.polyline([guess, actual], { color: "#d7b35b", weight: 3, opacity: 0.88 }).addTo(state.resultMap);
      state.resultMap.fitBounds([guess, actual], { padding: [64, 64], maxZoom: 8 });
      setTimeout(() => state.resultMap.invalidateSize(), 80);
    } else {
      drawFallbackResult(el.resultMap, result);
    }
  }

  function nextRound() {
    state.roundIndex += 1;
    if (state.roundIndex >= ROUND_COUNT) {
      finishGame();
    } else {
      showScreen("play");
      loadRound();
    }
  }

  function finishGame() {
    updateStats();
    const bestRound = Math.max(...state.results.map((result) => result.score));
    const avgDistance = state.results.reduce((sum, result) => sum + result.distance, 0) / state.results.length;
    el.finalMode.textContent = `${modeNames[state.mode]} Complete`;
    el.finalScore.textContent = `${formatNumber(state.totalScore)} / 25,000`;
    el.finalSummary.textContent = bestRound >= 4800
      ? `Best round: ${formatNumber(bestRound)} points. Average miss: ${formatNumber(avgDistance)} km.`
      : `Average miss: ${formatNumber(avgDistance)} km. The map always has another run in it.`;
    const lastResult = state.results[state.results.length - 1];
    el.finalBg.style.backgroundImage = `url("${lastResult.photo ? lastResult.photo.url : imageUrl(lastResult.location)}"), url("assets/expedition-home.png")`;
    el.roundStrip.innerHTML = state.results.map((result, index) => {
      return `<span class="round-chip">R${index + 1}: ${formatNumber(result.score)}</span>`;
    }).join("");
    el.journeyRecap.innerHTML = state.results.map((result, index) => `
      <article class="recap-row">
        <span class="recap-rank">${index + 1}</span>
        <img src="${escapeHtml(result.photo ? result.photo.url : imageUrl(result.location))}" alt="" loading="lazy">
        <div><strong>${escapeHtml(result.location.city)}, ${escapeHtml(result.location.country)}</strong><span>${formatNumber(result.distance)} km away${result.revealCount ? ` - ${result.revealCount} reveals` : ""}</span></div>
        <b>${formatNumber(result.score)}</b>
      </article>
    `).join("");
    showScreen("final");
  }

  function updateStats() {
    const stats = storageRead(STORAGE_KEY, defaultStats());
    stats.gamesPlayed += 1;
    stats.roundsPlayed = (stats.roundsPlayed || 0) + state.results.length;
    stats.totalScore += state.totalScore;
    stats.bestGame = Math.max(stats.bestGame, state.totalScore);
    state.results.forEach((result) => {
      if (result.distance <= 1) stats.perfectRounds += 1;
      if (!stats.countries.includes(result.location.country)) stats.countries.push(result.location.country);
    });
    let closeStreak = 0;
    let bestCloseStreak = 0;
    state.results.forEach((result) => {
      closeStreak = result.distance <= 500 ? closeStreak + 1 : 0;
      bestCloseStreak = Math.max(bestCloseStreak, closeStreak);
    });
    stats.bestCloseStreak = Math.max(stats.bestCloseStreak || 0, bestCloseStreak);
    stats.modesPlayed = [...new Set([...(stats.modesPlayed || []), state.mode])];
    if (state.mode === "daily") {
      const today = new Date().toISOString().slice(0, 10);
      stats.dailyResults[today] = state.totalScore;
      stats.currentDailyStreak = computeDailyStreak(stats.dailyResults);
    }
    stats.achievements = computeAchievements(stats);
    storageWrite(STORAGE_KEY, stats);
  }

  function computeDailyStreak(results) {
    let streak = 0;
    const date = new Date();
    while (true) {
      const key = date.toISOString().slice(0, 10);
      if (!results[key]) break;
      streak += 1;
      date.setDate(date.getDate() - 1);
    }
    return streak;
  }

  function computeAchievements(stats) {
    const achievements = new Set(stats.achievements || []);
    if (stats.countries.length >= 12) achievements.add("World Traveler");
    if (stats.perfectRounds > 0) achievements.add("Sharpshooter");
    if (stats.bestGame >= 20000) achievements.add("No Clues Needed");
    if ((stats.bestCloseStreak || 0) >= 3) achievements.add("On a Roll");
    if ((stats.modesPlayed || []).length >= 5) achievements.add("Expedition Leader");
    if ((stats.roundsPlayed || 0) >= 50) achievements.add("Cartographer");
    return [...achievements];
  }

  function shareResult() {
    const blocks = state.results.map((result) => result.score >= 4000 ? "\uD83D\uDFE9" : result.score >= 2500 ? "\uD83D\uDFE8" : result.score >= 1000 ? "\uD83D\uDFE7" : "\u2B1B").join("");
    const text = `WHERE AM I? ${modeNames[state.mode]}\n${blocks}\n${formatNumber(state.totalScore)} / 25,000`;
    if (navigator.share) {
      navigator.share({ title: "WHERE AM I?", text }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        el.shareButton.textContent = "Copied";
        setTimeout(() => { el.shareButton.textContent = "Share Result"; }, 1500);
      }).catch(() => {});
    }
  }

  function markerIcon(kind) {
    const className = kind === "actual" ? "actual-marker" : "guess-marker";
    const label = kind === "actual" ? "A" : "G";
    return L.divIcon({
      className: "",
      html: `<div class="custom-marker ${className}"><span>${label}</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 34]
    });
  }

  function setupFallbackMap(container, clickHandler) {
    container.className = "map-surface fallback-map";
    container.addEventListener("click", function handler(event) {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const lng = x * 360 - 180;
      const lat = 90 - y * 180;
      clickHandler(lat, lng);
    });
  }

  function project(lat, lng) {
    return {
      x: ((lng + 180) / 360) * 100,
      y: ((90 - lat) / 180) * 100
    };
  }

  function drawFallbackGuess(container, lat, lng) {
    container.querySelectorAll(".fallback-pin.guess").forEach((node) => node.remove());
    const pos = project(lat, lng);
    const pin = document.createElement("div");
    pin.className = "fallback-pin guess";
    pin.style.left = `${pos.x}%`;
    pin.style.top = `${pos.y}%`;
    container.appendChild(pin);
  }

  function drawFallbackResult(container, result) {
    container.className = "result-map fallback-map";
    const guess = project(result.guess.lat, result.guess.lng);
    const actual = project(result.location.latitude, result.location.longitude);
    const dx = actual.x - guess.x;
    const dy = actual.y - guess.y;
    const line = document.createElement("div");
    line.className = "fallback-line";
    line.style.left = `${guess.x}%`;
    line.style.top = `${guess.y}%`;
    line.style.width = `${Math.hypot(dx, dy)}%`;
    line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    container.appendChild(line);
    [["guess", guess], ["actual", actual]].forEach(([kind, pos]) => {
      const pin = document.createElement("div");
      pin.className = `fallback-pin ${kind}`;
      pin.style.left = `${pos.x}%`;
      pin.style.top = `${pos.y}%`;
      container.appendChild(pin);
    });
  }

  function openStats() {
    const stats = storageRead(STORAGE_KEY, defaultStats());
    const average = stats.gamesPlayed ? Math.round(stats.totalScore / stats.gamesPlayed) : 0;
    el.dialogContent.innerHTML = `
      <p class="eyebrow">Progress</p>
      <h2>Stats</h2>
      <div class="stat-grid">
        <div><span>Games Played</span><strong>${formatNumber(stats.gamesPlayed)}</strong></div>
        <div><span>Average Score</span><strong>${formatNumber(average)}</strong></div>
        <div><span>Best Game</span><strong>${formatNumber(stats.bestGame)}</strong></div>
        <div><span>Perfect Rounds</span><strong>${formatNumber(stats.perfectRounds)}</strong></div>
        <div><span>Rounds Played</span><strong>${formatNumber(stats.roundsPlayed || 0)}</strong></div>
        <div><span>Close Streak</span><strong>${formatNumber(stats.bestCloseStreak || 0)}</strong></div>
        <div><span>Countries Seen</span><strong>${formatNumber(stats.countries.length)}</strong></div>
        <div><span>Daily Streak</span><strong>${formatNumber(stats.currentDailyStreak)}</strong></div>
      </div>
      <h3>Achievements</h3>
      <p>${stats.achievements.length ? stats.achievements.map(escapeHtml).join(", ") : "No achievements yet."}</p>
    `;
    el.dialog.showModal();
  }

  function openCredits() {
    el.dialogContent.innerHTML = `
      <p class="eyebrow">Attribution</p>
      <h2>Image Credits</h2>
      <p>Gameplay uses only the lead photographs from these explicitly curated Wikipedia pages. The original files and licenses are available from each page.</p>
      <div class="credits-list">
        ${locations.map((location) => `
          <div class="credit-item">
            <strong>${escapeHtml(location.city)}, ${escapeHtml(location.country)}</strong><br>
            ${(location.wikiTitles || [location.city]).map((title) => `<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}" target="_blank" rel="noreferrer">${escapeHtml(title)}</a>`).join(" / ")}
          </div>
        `).join("")}
      </div>
    `;
    el.dialog.showModal();
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function playTone(frequency, duration) {
    const settings = storageRead(SETTINGS_KEY, { sound: true });
    if (!settings.sound || !window.AudioContext && !window.webkitAudioContext) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = frequency;
      osc.type = "sine";
      gain.gain.value = 0.0001;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch (error) {
      console.warn("Audio unavailable", error);
    }
  }

  function bindEvents() {
    document.querySelectorAll(".start-mode").forEach((button) => {
      button.addEventListener("click", () => startGame(button.dataset.mode || "world"));
    });
    document.querySelectorAll(".mode-pill").forEach((button) => {
      button.addEventListener("click", () => {
        state.difficulty = button.dataset.difficulty;
        document.querySelectorAll(".mode-pill").forEach((node) => node.classList.toggle("selected", node === button));
      });
    });
    el.image.addEventListener("load", () => {
      el.imageLoading.classList.add("hidden");
      el.image.style.opacity = "1";
    });
    el.image.addEventListener("error", () => {
      if (state.photoIndex + 1 < state.gallery.length) {
        state.gallery.splice(state.photoIndex, 1);
        state.maxPhotoIndex = Math.max(state.maxPhotoIndex, state.photoIndex);
        setPhoto(Math.min(state.photoIndex, state.gallery.length - 1));
        return;
      }
      state.failedImages.add(state.current.id);
      const replacement = selectLocations(state.mode, state.difficulty).find((item) => !state.roundLocations.some((round) => round.id === item.id));
      if (replacement) {
        state.roundLocations[state.roundIndex] = replacement;
        loadRound();
      } else {
        el.imageLoading.textContent = "Location image unavailable. Try another mode.";
      }
    });
    el.zoomIn.addEventListener("click", () => changeZoom(0.25));
    el.zoomOut.addEventListener("click", () => changeZoom(-0.25));
    el.resetView.addEventListener("click", resetViewer);
    el.reveal.addEventListener("click", revealMore);
    el.previousPhoto.addEventListener("click", () => setPhoto(state.photoIndex - 1));
    el.nextPhoto.addEventListener("click", () => setPhoto(state.photoIndex + 1));
    el.expand.addEventListener("click", () => {
      el.imageStage.classList.toggle("expanded");
      el.expand.textContent = el.imageStage.classList.contains("expanded") ? "Close" : "Expand";
    });
    el.openMap.addEventListener("click", openMap);
    el.closeMap.addEventListener("click", closeMap);
    el.confirmGuess.addEventListener("click", confirmGuess);
    el.nextRound.addEventListener("click", nextRound);
    el.homeButton.addEventListener("click", () => showScreen("home"));
    el.hintOne.addEventListener("click", () => useHint(1));
    el.hintTwo.addEventListener("click", () => useHint(2));
    el.statsButton.addEventListener("click", openStats);
    el.creditsButton.addEventListener("click", openCredits);
    el.shareButton.addEventListener("click", shareResult);
    document.addEventListener("keydown", (event) => {
      if (event.key === "+" || event.key === "=") changeZoom(0.25);
      if (event.key === "-") changeZoom(-0.25);
      if (event.key.toLowerCase() === "h") useHint(el.hintOne.disabled ? 2 : 1);
      if (event.key.toLowerCase() === "m" && el.screens.play.classList.contains("active")) openMap();
      if (event.key === "ArrowLeft" && !el.previousPhoto.disabled) setPhoto(state.photoIndex - 1);
      if (event.key === "ArrowRight" && !el.nextPhoto.disabled) setPhoto(state.photoIndex + 1);
      if (event.key === "Escape" && el.mapOverlay.classList.contains("open")) closeMap();
    });
    bindViewerDrag();
  }

  function bindViewerDrag() {
    el.imageStage.addEventListener("pointerdown", (event) => {
      viewer.dragging = true;
      viewer.startX = event.clientX;
      viewer.startY = event.clientY;
      viewer.originX = viewer.x;
      viewer.originY = viewer.y;
      el.imageStage.classList.add("dragging");
      el.imageStage.setPointerCapture(event.pointerId);
    });
    el.imageStage.addEventListener("pointermove", (event) => {
      if (!viewer.dragging || viewer.scale <= 1) return;
      viewer.x = viewer.originX + event.clientX - viewer.startX;
      viewer.y = viewer.originY + event.clientY - viewer.startY;
      applyViewerTransform();
    });
    el.imageStage.addEventListener("pointerup", (event) => {
      viewer.dragging = false;
      el.imageStage.classList.remove("dragging");
      try {
        el.imageStage.releasePointerCapture(event.pointerId);
      } catch (error) {
        return;
      }
    });
    el.imageStage.addEventListener("wheel", (event) => {
      event.preventDefault();
      changeZoom(event.deltaY < 0 ? 0.18 : -0.18);
    }, { passive: false });
  }

  function initHome() {
    el.homeBg.style.backgroundImage = "url(\"assets/expedition-home.png\")";
  }

  bindEvents();
  initHome();
  showScreen("home");
})();
