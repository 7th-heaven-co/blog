//fadeContentWithPollingPreLoadRadical.js
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
  
  function removeLoaderElement(elementId) {
    const loader = document.getElementById(elementId);
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  }

  function initLoaderTransition() {
    const loader = document.getElementById(loaderId);
    if (!loader) return;

    // Disable scrolling during the transition.
    document.body.style.overflow = 'hidden';

    // Load the background image.
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
      // Fade out the loader.
      fadeOut(loader, fadeOutDuration, () => {
        removeLoaderElement(loaderId);
      });
      // Inside initLoaderTransition’s setTimeout callback:
      const loaderRadical = document.querySelector(".pre-loader-radical");
      const loaderRadicalInverse = document.querySelector(".pre-loader-radical-inverse");
      if (loaderRadical && loaderRadicalInverse) {
        // Trigger the overlay to fade out.
        loaderRadical.classList.add("fade-out");
        loaderRadicalInverse.classList.add("fade-out");

        // Listen for the opacity transition to finish on loaderRadical,
        // then remove both elements and fade in the main content.
        loaderRadical.addEventListener("transitionend", function handler(e) {
          if (e.propertyName === "opacity") {
            loaderRadical.removeEventListener("transitionend", handler);
            // Remove both elements from the DOM.
            loaderRadical.remove();
            loaderRadicalInverse.remove();
            
            // Fade in the main content.
            const content = document.querySelector(contentSelector);
            if (content) {
              content.style.opacity = 0;
              fadeIn(content, fadeInDuration);
            }
            
            // Re-enable scrolling after fade-in.
            setTimeout(() => {
              document.body.style.overflow = '';
            }, fadeInDuration);
          }
        });
      } else {
        // If no radial element exists, just fade in the content.
        const content = document.querySelector(contentSelector);
        if (content) {
          content.style.opacity = 0;
          fadeIn(content, fadeInDuration);
        }
        setTimeout(() => {
          document.body.style.overflow = '';
        }, fadeInDuration);
      }
    }, transitionDelay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLoaderTransition);
  } else {
    initLoaderTransition();
  }
}
