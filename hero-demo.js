(() => {
  const root = document.querySelector("[data-hero-demo]");
  if (!root) return;

  const textEl = root.querySelector("[data-hero-text]");
  const timerEl = root.querySelector("[data-hero-timer]");
  const waveSpans = root.querySelectorAll(".hero-pill-wave span");
  const faces = {
    idle: root.querySelector('[data-face="idle"]'),
    listening: root.querySelector('[data-face="listening"]'),
    pasted: root.querySelector('[data-face="pasted"]'),
  };

  const samples = [
    "Hey, I'll push the fixes by tomorrow morning and let you know when they're ready.",
    "Can you share the deck before standup? I'll add my notes right after.",
    "Let's move the review to Thursday afternoon so we have time to polish the copy.",
  ];

  const LISTEN_TICKS = ["0:01", "0:02", "0:03", "0:04", "0:05"];
  const LISTEN_STEP_MS = 1000;
  const WAVE_LEVELS = [4, 6, 8, 10, 12, 14, 16, 18];

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const setFace = (name) => {
    Object.values(faces).forEach((el) => el?.classList.remove("is-on"));
    faces[name]?.classList.add("is-on");
  };

  const clearClasses = () => {
    root.classList.remove("is-keys", "is-listening", "is-pasted", "is-pasted-hold", "is-typing");
  };

  const bumpWave = () => {
    waveSpans.forEach((el) => {
      const h = WAVE_LEVELS[Math.floor(Math.random() * WAVE_LEVELS.length)];
      el.style.setProperty("--h", `${h}px`);
    });
  };

  const startWaveLoop = () => {
    if (reduced || !waveSpans.length) return null;
    bumpWave();
    return window.setInterval(bumpWave, 130);
  };

  const stopWaveLoop = (id) => {
    if (id != null) window.clearInterval(id);
  };

  const typeText = async (text) => {
    if (!textEl) return;
    textEl.textContent = "";
    root.classList.add("is-typing");
    const step = reduced ? text.length : 1;
    for (let i = 0; i < text.length; i += step) {
      textEl.textContent = text.slice(0, i + step);
      if (!reduced) await wait(22);
    }
    root.classList.remove("is-typing");
  };

  const runListening = async () => {
    if (!timerEl) return;
    const waveId = startWaveLoop();
    try {
      for (const t of LISTEN_TICKS) {
        timerEl.textContent = t;
        if (!reduced) bumpWave();
        await wait(reduced ? 0 : LISTEN_STEP_MS);
      }
    } finally {
      stopWaveLoop(waveId);
    }
  };

  const runStatic = async () => {
    root.classList.add("is-reduced-motion");
    setFace("pasted");
    root.classList.add("is-pasted");
    if (textEl) textEl.textContent = samples[0];
    if (timerEl) timerEl.textContent = "0:05";
    waveSpans.forEach((el) => el.style.setProperty("--h", "12px"));
  };

  const runLoop = async (lineIndex) => {
    const line = samples[lineIndex % samples.length];
    clearClasses();
    setFace("idle");
    if (textEl) textEl.textContent = "";
    if (timerEl) timerEl.textContent = "0:00";
    waveSpans.forEach((el) => el.style.setProperty("--h", "6px"));

    await wait(reduced ? 0 : 1400);

    root.classList.add("is-keys");
    await wait(reduced ? 0 : 320);

    root.classList.add("is-listening");
    setFace("listening");
    await runListening();

    root.classList.remove("is-keys");
    root.classList.remove("is-listening");
    root.classList.add("is-pasted");
    setFace("pasted");
    await wait(reduced ? 0 : 280);

    await typeText(line);
    await wait(reduced ? 0 : 700);

    root.classList.remove("is-pasted");
    setFace("idle");
    await wait(reduced ? 0 : 1200);

    runLoop(lineIndex + 1);
  };

  if (reduced) {
    runStatic();
    return;
  }

  runLoop(0);
})();