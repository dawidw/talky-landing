(() => {
  const stageHost = document.querySelector(".talky-stage-host");
  if (stageHost && "IntersectionObserver" in window) {
    const stageObserver = new IntersectionObserver(
      ([entry]) => {
        stageHost.classList.toggle("talky-stage-host--offscreen", entry.intersectionRatio === 0);
      },
      { threshold: [0, 0.02] }
    );
    stageObserver.observe(stageHost);
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();