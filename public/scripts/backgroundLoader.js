// js/backgroundLoader.js

export function loadBackgroundImage() {
  const galaxyCssValue = getComputedStyle(document.documentElement)
    .getPropertyValue("--galaxy")
    .trim();

  // Extract URL from the CSS variable (e.g., url("/galaxy.jpg"))
  const galaxyUrl = galaxyCssValue
    .replace(/^url\((['"])?/, "")
    .replace(/(['"])?\)$/, "");

  const bgImage = new Image();
  bgImage.src = galaxyUrl;

  return new Promise((resolve) => {
    if (bgImage.decode) {
      bgImage.decode().then(() => resolve(galaxyUrl)).catch(() => resolve(galaxyUrl));
    } else {
      bgImage.onload = () => resolve(galaxyUrl);
      bgImage.onerror = () => resolve(galaxyUrl);
    }
  });
}
