export function removeElementById(id) {
  const el = document.getElementById(id);
  if (el?.parentNode) el.parentNode.removeChild(el);
}
