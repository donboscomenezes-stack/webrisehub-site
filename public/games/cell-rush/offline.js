"use strict";

const offlineButton = document.getElementById("offlineButton");
const offlineStatus = document.getElementById("offlineStatus");
const workerURL = new URL("./sw.js", location.href);

function showOfflineReady() {
  offlineButton.hidden = true;
  offlineStatus.textContent = "Saved for offline play on this browser.";
}

if ("serviceWorker" in navigator) {
  offlineButton.hidden = false;
  navigator.serviceWorker.getRegistration(location.href).then((registration) => {
    if (registration?.active?.scriptURL === workerURL.href) showOfflineReady();
  }).catch(() => {});

  offlineButton.addEventListener("click", async () => {
    offlineButton.disabled = true;
    offlineStatus.textContent = "Saving game files…";
    try {
      const registration = await navigator.serviceWorker.register(workerURL);
      const worker = registration.installing || registration.waiting || registration.active;
      if (!worker) throw new Error("No offline worker");
      await new Promise((resolve, reject) => {
        const checkState = () => {
          if (worker.state === "activated" || worker.state === "redundant") {
            worker.removeEventListener("statechange", checkState);
            if (worker.state === "activated") resolve();
            else reject(new Error("Offline cache setup failed"));
          }
        };
        worker.addEventListener("statechange", checkState);
        checkState();
      });
      showOfflineReady();
    } catch {
      offlineStatus.textContent = "Could not save the game. Check your connection and try again.";
      offlineButton.disabled = false;
    }
  });
}
