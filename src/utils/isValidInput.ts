export function escapeHTML(input: string) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

export function sanitizeInput(input: string) {
  return input.replace(/[<>{}"'`;()|&]/g, ""); // Remove dangerous characters
}

export function validateAlphanumeric(input: string) {
  return /^[a-zA-Z0-9\s]+$/.test(input);
}

export function limitInputLength(input: string, maxLength = 50) {
  return input.substring(0, maxLength);
}