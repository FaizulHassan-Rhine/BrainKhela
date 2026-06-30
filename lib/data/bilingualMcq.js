import { resolveText } from '@/lib/i18n/resolveText';

function getSubjectKey(item) {
  return item.subject?.en || resolveText(item.subject, 'en')
    || item.category?.en || resolveText(item.category, 'en');
}

function getChapterKey(item) {
  return item.chapter?.en || resolveText(item.chapter, 'en');
}

function resolveOptions(item, lang) {
  const l = lang === 'en' ? 'en' : 'bn';
  if (Array.isArray(item.options)) {
    return item.options.map((opt) => String(resolveText(opt, lang)));
  }
  if (Array.isArray(item.options?.[l])) {
    return item.options[l].map((opt) => String(opt));
  }
  if (Array.isArray(item.options?.bn)) {
    return item.options.bn.map((opt) => String(opt));
  }
  return [];
}

/** Strip trailing "(62)" / "(৬২)" suffixes used as placeholder IDs in generated datasets. */
export function normalizeQuestionKey(text) {
  return String(text || '')
    .replace(/\s*\([^)]*\)\s*$/g, '')
    .trim()
    .toLowerCase();
}

/** Unique key for deduping placeholder repeats in SSC/HSC JSON. */
export function getMcqDedupeKey(item) {
  const bn = normalizeQuestionKey(resolveText(item.question, 'bn'));
  const en = normalizeQuestionKey(resolveText(item.question, 'en'));
  return bn || en || item.id || '';
}

export function dedupeMcqItems(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = getMcqDedupeKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

export function isBilingualMcqItem(item) {
  return (
    item?.question?.bn != null &&
    item?.question?.en != null &&
    (item?.options?.bn || item?.options?.en)
  );
}

export function isBilingualMcqDataset(questions) {
  return Array.isArray(questions) && questions.length > 0 && isBilingualMcqItem(questions[0]);
}

/** Flatten one bilingual MCQ item for QuizEngine. */
export function normalizeBilingualItem(item, lang = 'bn') {
  const options = resolveOptions(item, lang);

  const subjectKey = getSubjectKey(item);
  const chapterKey = getChapterKey(item);

  return {
    id: item.id,
    subject: subjectKey ? resolveText(item.subject || item.category, lang) : undefined,
    chapter: chapterKey ? resolveText(item.chapter, lang) : undefined,
    category: item.category ? resolveText(item.category, lang) : undefined,
    question: resolveText(item.question, lang),
    options,
    correct: item.correct,
    explanation: item.explanation ? resolveText(item.explanation, lang) : undefined,
    hint: item.hint ? resolveText(item.hint, lang) : undefined,
  };
}

export function normalizeBilingualList(items, lang = 'bn') {
  return items.map((item) => normalizeBilingualItem(item, lang));
}

export function buildSubjectMeta(items, lang = 'bn') {
  const map = new Map();

  for (const item of items) {
    const key = getSubjectKey(item);
    if (!key) continue;

    if (!map.has(key)) {
      const source = item.subject || item.category;
      map.set(key, {
        key,
        label: resolveText(source, lang),
        labelBn: resolveText(source, 'bn'),
        labelEn: resolveText(source, 'en'),
        count: 0,
        chapters: new Map(),
      });
    }

    const subject = map.get(key);
    subject.count += 1;

    const chapterKey = getChapterKey(item);
    const chapterLabel = resolveText(item.chapter, lang);

    if (chapterKey) {
      if (!subject.chapters.has(chapterKey)) {
        subject.chapters.set(chapterKey, {
          key: chapterKey,
          label: chapterLabel,
          labelBn: resolveText(item.chapter, 'bn'),
          labelEn: resolveText(item.chapter, 'en'),
          count: 0,
        });
      }
      subject.chapters.get(chapterKey).count += 1;
    }
  }

  return [...map.values()]
    .map((s) => ({
      ...s,
      chapters: [...s.chapters.values()].sort((a, b) => a.label.localeCompare(b.label, lang)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, lang));
}

export function filterMcqItems(items, { subject, chapter } = {}) {
  return items.filter((item) => {
    const subjectKey = getSubjectKey(item);
    if (subject && subjectKey !== subject) return false;

    if (chapter) {
      const chapterKey = getChapterKey(item);
      if (chapterKey !== chapter) return false;
    }

    return true;
  });
}

/** GK dataset: group by category with difficulty sub-counts. */
export function buildCategoryMeta(items, lang = 'bn') {
  const map = new Map();

  for (const item of items) {
    const key = item.category?.en || resolveText(item.category, 'en');
    if (!key) continue;

    if (!map.has(key)) {
      map.set(key, {
        key,
        label: resolveText(item.category, lang),
        labelBn: resolveText(item.category, 'bn'),
        labelEn: resolveText(item.category, 'en'),
        count: 0,
        chapters: new Map(),
      });
    }

    const category = map.get(key);
    category.count += 1;

    const diffKey = item.difficulty?.en || resolveText(item.difficulty, 'en');
    if (diffKey) {
      if (!category.chapters.has(diffKey)) {
        category.chapters.set(diffKey, {
          key: diffKey,
          label: resolveText(item.difficulty, lang),
          labelBn: resolveText(item.difficulty, 'bn'),
          labelEn: resolveText(item.difficulty, 'en'),
          count: 0,
        });
      }
      category.chapters.get(diffKey).count += 1;
    }
  }

  return [...map.values()]
    .map((c) => ({
      ...c,
      chapters: [...c.chapters.values()].sort((a, b) => a.label.localeCompare(b.label, lang)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, lang));
}

export function filterCategoryItems(items, { category, difficulty } = {}) {
  return items.filter((item) => {
    const catKey = item.category?.en || resolveText(item.category, 'en');
    if (category && catKey !== category) return false;

    if (difficulty) {
      const diffKey = item.difficulty?.en || resolveText(item.difficulty, 'en');
      if (diffKey !== difficulty) return false;
    }

    return true;
  });
}

export const GK_CATEGORY_ICONS = {
  Geography: 'Globe',
  History: 'Landmark',
  Science: 'FlaskConical',
  Sports: 'Trophy',
  'Current Affairs': 'Newspaper',
};

export const GK_CATEGORY_COLORS = {
  Geography: 'from-accent to-secondary',
  History: 'from-cream-dark to-accent',
  Science: 'from-secondary to-cream-light',
  Sports: 'from-accent to-cream-light',
  'Current Affairs': 'from-cream-dark to-secondary',
};

export const SUBJECT_ICONS = {
  Mathematics: 'Hash',
  Physics: 'Zap',
  Chemistry: 'FlaskConical',
  Biology: 'Leaf',
  ICT: 'Monitor',
  English: 'Languages',
  Accounting: 'Calculator',
  History: 'Landmark',
  Geography: 'Globe',
  Bangla: 'BookOpen',
  Science: 'FlaskConical',
  'Physics & Mathematics': 'Hash',
};

export const SUBJECT_COLORS = {
  Mathematics: 'from-cream-dark to-accent',
  Physics: 'from-accent to-secondary',
  Chemistry: 'from-secondary to-cream-light',
  Biology: 'from-cream-dark to-secondary',
  ICT: 'from-accent to-cream-light',
  English: 'from-secondary to-accent',
  Bangla: 'from-secondary to-accent',
  Science: 'from-accent to-cream-light',
  'Physics & Mathematics': 'from-cream-dark to-accent',
  Accounting: 'from-cream-dark to-cream-light',
};
