// public/scripts/fadeTransitions.js

/**
 * Fades an element out by transitioning its opacity from 1 to 0.
 * @param {Element} element - The DOM element to fade out.
 * @param {number} duration - Duration of the transition in ms.
 * @param {Function} callback - Optional callback to run when the transition ends.
 */
export function fadeOut(element, duration, callback) {
  if (!element) return;
  // Set up the transition
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  // Force a reflow so that the transition starts
  element.getBoundingClientRect();
  // Start the fade-out
  element.style.opacity = 0;
  // Listen for the transition end, filtering for the opacity property
  element.addEventListener('transitionend', function handler(event) {
    if (event.propertyName === 'opacity') {
      element.removeEventListener('transitionend', handler);
      if (typeof callback === 'function') callback();
    }
  });
}

/**
 * Fades an element in by transitioning its opacity from 0 to 1.
 * @param {Element} element - The DOM element to fade in.
 * @param {number} duration - Duration of the transition in ms.
 * @param {Function} callback - Optional callback to run when the transition ends.
 */
export function fadeIn(element, duration, callback) {
  if (!element) return;
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  // Force a reflow so that the transition starts
  element.getBoundingClientRect();
  // Start the fade-in
  element.style.opacity = 1;
  element.addEventListener('transitionend', function handler(event) {
    if (event.propertyName === 'opacity') {
      element.removeEventListener('transitionend', handler);
      if (typeof callback === 'function') callback();
    }
  });
}
