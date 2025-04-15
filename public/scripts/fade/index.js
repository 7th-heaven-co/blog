// public/scripts/fade/index.js
import { defaultFadeConfig } from "./config.js";
import { initFadeOnly } from "./fadeOnly.js";
import { initPreloadRadical } from "./preloaderRadical.js";

/**
 * Entry point — auto-detects whether to run radical loader or basic fade.
 */
export function init(options = {}) {
  const config = { ...defaultFadeConfig, ...options };

  const run = () => {
    const loaderExists = document.getElementById(config.loaderId);
    if (loaderExists) {
      initPreloadRadical(config);
    } else {
      initFadeOnly(config.contentSelector);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}
