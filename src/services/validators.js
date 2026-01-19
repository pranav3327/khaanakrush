export function isNonEmpty(value) {
  return String(value || '').trim().length > 0;
}

export function isValidEmail(email) {
  const v = String(email || '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isValidPhone(phone) {
  const v = String(phone || '').trim();
  return /^[6-9]\d{9}$/.test(v) || /^\+?\d{10,14}$/.test(v);
}

export function asPositiveInt(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const i = Math.floor(n);
  return i > 0 ? i : null;
}

export function asPositiveMoney(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return n >= 0 ? n : null;
}

