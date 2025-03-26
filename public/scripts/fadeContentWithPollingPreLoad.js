// src/scripts/fadeContentWithPollingPreLoad.js
import { fadeOut, fadeIn } from "./fadeTransitions.js";
import { loadBackgroundImage } from "./backgroundLoader.js";

/**
 * Initializes the loader transition by loading a background image, fading out the loader,
 * and then fading in the main content.
 * 
 * @param {Object} [options={}] - Configuration options for the loader transition.
 * @param {string} [options.loaderId="pre-loader"] - The ID of the loader element.
 * @param {number} [options.fadeOutDuration=1000] - Duration (in ms) for fading out the loader.
 * @param {number} [options.fadeInDuration=1000] - Duration (in ms) for fading in the content.
 * @param {number} [options.fadeInTimeout=500] - Delay (in ms) before starting the fade-in after fade-out begins.
 * @param {number} [options.transitionDelay=4000] - Delay (in ms) before starting the loader transition.
 * @param {string} [options.contentSelector=".content"] - CSS selector for the content element to fade in.
 */
export function init({
  loaderId = "pre-loader",
  fadeOutDuration = 1000,
  fadeInDuration = 1000,
  fadeInTimeout = 500,
  transitionDelay = 4000,
  contentSelector = ".content"
} = {}) {
  function removeLoaderElement() {
    const loader = document.getElementById(loaderId);
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  }

  function initLoaderTransition() {
    const loader = document.getElementById(loaderId);
    if (!loader) return;

    // Load the background image
    loadBackgroundImage()
      .then((galaxyUrl) => {
        console.log("Background image loaded:", galaxyUrl);
        loader.classList.add("loaded");
      })
      .catch((error) => {
        console.error("Error loading background image:", error);
        loader.classList.add("loaded");
      });

    setTimeout(() => {
      loader.textContent = "";
      fadeOut(loader, fadeOutDuration, () => {
        removeLoaderElement();
      });

      const content = document.querySelector(contentSelector);
      if (content) {
        content.style.opacity = 0;
        setTimeout(() => {
          fadeIn(content, fadeInDuration);
        }, fadeInTimeout);
      }
    }, transitionDelay);
  }

  // Attach to DOMContentLoaded if the document is not ready yet
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLoaderTransition);
  } else {
    initLoaderTransition();
  }
}
