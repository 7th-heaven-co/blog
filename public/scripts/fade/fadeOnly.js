// public/scripts/fade/fadeOnly.js

export function initFadeOnly(contentSelector = '.content') {
  const contentEl = document.querySelector(contentSelector);
  if (!contentEl) return;

  // ───── initial fade‑in ─────
  void contentEl.offsetWidth; // force reflow/paint
  setTimeout(() => {
    contentEl.classList.remove('fading-out');
    contentEl.classList.add('visible');
  }, 50);

  // ───── link navigation fade‑out ─────
  const links = document.querySelectorAll('a');
  for (const link of links) {
    if (link.href?.startsWith(window.location.origin)) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const destination = link.href;

        contentEl.classList.remove('visible');
        void contentEl.offsetWidth; // re‑trigger reflow
        contentEl.classList.add('fading-out');

        setTimeout(() => {
          window.location.href = destination;
        }, 100);
      });
    }
  }

  // ───── restore fade when tab regains focus ─────
  const replay = () => {
    contentEl.classList.remove('visible');
    void contentEl.offsetWidth;
    contentEl.classList.add('fading-out');
    setTimeout(() => {
      contentEl.classList.remove('fading-out');
      contentEl.classList.add('visible');
    }, 50);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') replay();
  });
  window.addEventListener('focus', replay);
}
