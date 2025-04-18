// public/scripts/fade/preloaderRadical.js

import { loadBackgroundImage } from '../backgroundLoader.js';
import { removeElementById } from './domUtils.js';
import { fadeIn, fadeOut } from './fadeTransitions.js';

export function initPreloadRadical({
  loaderId,
  fadeOutDuration,
  fadeInDuration,
  transitionDelay,
  contentSelector,
}) {
  const loader = document.getElementById(loaderId);
  if (!loader) return;

  document.body.style.overflow = 'hidden';

  loadBackgroundImage()
    .then(() => loader.classList.add('loaded'))
    .catch(() => loader.classList.add('loaded'));

  setTimeout(() => {
    fadeOut(loader, fadeOutDuration, () => removeElementById(loaderId));

    const radical = document.querySelector('.pre-loader-radical');
    const inverse = document.querySelector('.pre-loader-radical-inverse');

    const fadeInContent = () => {
      const content = document.querySelector(contentSelector);
      if (content) {
        content.style.opacity = 0;
        fadeIn(content, fadeInDuration);
        setTimeout(() => {
          document.body.style.overflow = '';
        }, fadeInDuration);
      }
    };

    if (radical && inverse) {
      radical.classList.add('fade-out');
      inverse.classList.add('fade-out');
      radical.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'opacity') {
          radical.removeEventListener('transitionend', handler);
          radical.remove();
          inverse.remove();
          fadeInContent();
        }
      });
    } else {
      fadeInContent();
    }
  }, transitionDelay);
}
