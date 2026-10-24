export function padId(id) {
  return String(id).padStart(3, '0');
}

export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function normalizeQuery(text) {
  return String(text).trim().toLowerCase();
}