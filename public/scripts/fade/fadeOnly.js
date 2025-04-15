// public/scripts/fade/fadeOnly.js

export function initFadeOnly(contentSelector = ".content") {
  const contentEl = document.querySelector(contentSelector);
  if (!contentEl) return;

  void contentEl.offsetWidth;
  setTimeout(() => {
    contentEl.classList.remove("fading-out");
    contentEl.classList.add("visible");
  }, 50);

  document.querySelectorAll("a").forEach((link) => {
    if (link.href && link.href.startsWith(window.location.origin)) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const destination = link.href;
        contentEl.classList.remove("visible");
        void contentEl.offsetWidth;
        contentEl.classList.add("fading-out");
        setTimeout(() => {
          window.location.href = destination;
        }, 100);
      });
    }
  });

  const replay = () => {
    contentEl.classList.remove("visible");
    void contentEl.offsetWidth;
    contentEl.classList.add("fading-out");
    setTimeout(() => {
      contentEl.classList.remove("fading-out");
      contentEl.classList.add("visible");
    }, 50);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") replay();
  });
  window.addEventListener("focus", replay);
}
