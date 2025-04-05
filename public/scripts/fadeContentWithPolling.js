// /src/scripts/fadeContentWithPolling.js
export {}; // Ensure this file is treated as an ES module

document.addEventListener("DOMContentLoaded", () => {
  const MAX_WAIT = 3000; // Maximum wait time in milliseconds
  let waited = 0;
  const pollInterval = 100;

  // Poll until the loader is removed (or until MAX_WAIT is reached)
  function checkLoader() {
    if (!document.getElementById("loader") || waited >= MAX_WAIT) {
      initFadeTransitions();
    } else {
      waited += pollInterval;
      setTimeout(checkLoader, pollInterval);
    }
  }

  function initFadeTransitions() {
    const contentEl = document.querySelector('.content');
    console.log("Initializing fade transitions:", contentEl);
    if (contentEl) {
      // Force a reflow before applying new classes
      void contentEl.offsetWidth;
      // Slight delay to ensure styles are applied before starting the fade in
      setTimeout(() => {
        contentEl.classList.remove("fading-out");
        contentEl.classList.add("visible");
        console.log("Content should now be fading in:", contentEl.className);
      }, 50);
    }

    // Intercept internal link clicks to fade out the content before navigating
    document.querySelectorAll('a').forEach(link => {
      // Only intercept internal links
      if (link.href && link.href.startsWith(window.location.origin)) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const destination = link.href;
          if (contentEl) {
            console.log("Fading out content");
            contentEl.classList.remove("visible");
            // Force a reflow so that the removal is processed
            void contentEl.offsetWidth;
            contentEl.classList.add("fading-out");
            console.log("Current classes on .content:", contentEl.className);
          }
          // Wait for the fade-out transition (1 second) before navigating
          setTimeout(() => {
            window.location.href = destination;
          }, 100);
        });
      }
    });
  }

  checkLoader();
});
