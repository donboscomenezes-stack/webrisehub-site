(function () {
  var prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  function initScrollReveal() {
    var targets = document.querySelectorAll(".reveal, .fade-up");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("reveal-in");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initHeroStagger() {
    var targets = document.querySelectorAll(".stagger-words");
    if (!targets.length) return;

    targets.forEach(function (el) {
      if (el.dataset.staggered === "true") return;
      var text = (el.textContent || "").trim();
      if (!text) return;

      el.dataset.staggered = "true";
      el.setAttribute("aria-label", text);

      var words = text.split(/\s+/g);
      el.textContent = "";

      words.forEach(function (w, idx) {
        var span = document.createElement("span");
        span.className = "word";
        span.textContent = w;
        span.style.transitionDelay = (idx * 70).toString() + "ms";
        el.appendChild(span);

        if (idx !== words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      // Trigger after paint
      requestAnimationFrame(function () {
        el.classList.add("stagger-in");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initScrollReveal();
      initHeroStagger();
    });
  } else {
    initScrollReveal();
    initHeroStagger();
  }
})();
