/**
 * Resolve a field that may be a plain string (Bangla default) or { bn, en }.
 */
export function resolveText(value, lang = 'bn') {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (lang === 'en' && value.en) return value.en;
    return value.bn ?? value.en ?? '';
  }
  return String(value);
}

export function resolveList(values, lang = 'bn') {
  if (!Array.isArray(values)) return [];
  return values.map((v) => resolveText(v, lang));
}
