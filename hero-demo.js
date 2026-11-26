(() => {
  const root = document.querySelector("[data-hero-demo]");
  if (!root) return;

  const textEl = root.querySelector("[data-hero-text]");
  const timerEl = root.querySelector("[data-hero-timer]");
  const faces = {
    idle: root.querySelector('[data-face="idle"]'),
    listening: root.querySelector('[data-face="listening"]'),
    pasted: root.querySelector('[data-face="pasted"]'),
  };

  const samples = [
    "I will send the fixes by tomorrow morning and let you know when they are ready.",
    "Can you share the deck before standup? I will add my notes right after.",
  ];

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const setFace = (name) => {
    Object.values(faces).forEach((el) => el?.classList.remove("is-on"));
    faces[name]?.classList.add("is-on");
  };

  const clearClasses = () => {
    root.classList.remove("is-keys", "is-listening", "is-pasted", "is-pasted-hold", "is-typing");
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

  const runTimers = async () => {
    if (!timerEl) return;
    const ticks = ["0:01", "0:02", "0:03"];
    for (const t of ticks) {
      timerEl.textContent = t;
      await wait(reduced ? 0 : 520);
    }
  };

  const runStatic = async () => {
    root.classList.add("is-reduced-motion");
    setFace("pasted");
    root.classList.add("is-pasted");
    if (textEl) textEl.textContent = samples[0];
    if (timerEl) timerEl.textContent = "0:02";
  };

  const runLoop = async (lineIndex) => {
    const line = samples[lineIndex % samples.length];
    clearClasses();
    setFace("idle");
    if (textEl) textEl.textContent = "";
    if (timerEl) timerEl.textContent = "0:00";

    await wait(reduced ? 0 : 1400);

    root.classList.add("is-keys");
    await wait(reduced ? 0 : 320);

    root.classList.add("is-listening");
    setFace("listening");
    await runTimers();

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