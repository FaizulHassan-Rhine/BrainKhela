import { resolveText, resolveList } from './resolveText';

const QUESTION_FIELDS = ['question', 'explanation', 'category', 'chapter', 'hint', 'subject'];

/** Collect unique Bangla strings that need API translation (plain strings only). */
export function collectTranslatableStrings(questions) {
  const seen = new Set();
  const list = [];

  const add = (val) => {
    if (!val || typeof val !== 'string') return;
    const trimmed = val.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    list.push(trimmed);
  };

  for (const q of questions) {
    for (const field of QUESTION_FIELDS) {
      add(typeof q[field] === 'string' ? q[field] : null);
    }
    if (Array.isArray(q.options)) {
      q.options.forEach((opt) => add(typeof opt === 'string' ? opt : null));
    }
  }

  return list;
}

/** Build localized question list from pre-stored {bn,en} fields or a translation map. */
export function localizeQuestions(questions, lang, translationMap = {}) {
  return questions.map((q) => {
    const localized = { ...q };

    for (const field of QUESTION_FIELDS) {
      if (q[field] != null) {
        if (typeof q[field] === 'object') {
          localized[field] = resolveText(q[field], lang);
        } else if (lang === 'en' && translationMap[q[field]]) {
          localized[field] = translationMap[q[field]];
        }
      }
    }

    if (Array.isArray(q.options)) {
      localized.options = q.options.map((opt) => {
        if (typeof opt === 'object') return resolveText(opt, lang);
        if (lang === 'en' && translationMap[opt]) return translationMap[opt];
        return opt;
      });
    }

    return localized;
  });
}

export function questionsCacheKey(questions, lang) {
  const ids = questions.map((q) => q.id).join('-');
  return `bk-tr-${lang}-${ids}`;
}

export function buildTranslationMap(originals, translated) {
  const map = {};
  originals.forEach((text, i) => {
    if (translated[i]) map[text] = translated[i];
  });
  return map;
}
