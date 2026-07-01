import sscJson from '@/data/ssc_mcq_1000.json';
import hscJson from '@/data/hsc_mcq_1000.json';
import gkJson from '@/data/gk_quiz_500.json';

const LEVEL_LABELS = {
  easy: { en: 'Easy', bn: 'সহজ' },
  medium: { en: 'Medium', bn: 'মাঝারি' },
  hard: { en: 'Hard', bn: 'কঠিন' },
};

const SUBJECT_BY_PREFIX = {
  math: { en: 'Mathematics', bn: 'গণিত' },
  math2: { en: 'Mathematics', bn: 'গণিত' },
  science: { en: 'Science', bn: 'বিজ্ঞান' },
  science2: { en: 'Science', bn: 'বিজ্ঞান' },
  bangla: { en: 'Bangla', bn: 'বাংলা' },
  bangla2: { en: 'Bangla', bn: 'বাংলা' },
  english: { en: 'English', bn: 'ইংরেজি' },
  english2: { en: 'English', bn: 'ইংরেজি' },
  ict: { en: 'ICT', bn: 'তথ্য ও যোগাযোগ প্রযুক্তি' },
  ict2: { en: 'ICT', bn: 'তথ্য ও যোগাযোগ প্রযুক্তি' },
  physmath: { en: 'Physics & Mathematics', bn: 'পদার্থবিজ্ঞান ও গণিত' },
  physmath2: { en: 'Physics & Mathematics', bn: 'পদার্থবিজ্ঞান ও গণিত' },
  chemistry: { en: 'Chemistry', bn: 'রসায়ন' },
  chemistry2: { en: 'Chemistry', bn: 'রসায়ন' },
  biology: { en: 'Biology', bn: 'জীববিজ্ঞান' },
  biology2: { en: 'Biology', bn: 'জীববিজ্ঞান' },
  hscenglish: { en: 'English', bn: 'ইংরেজি' },
  hscenglish2: { en: 'English', bn: 'ইংরেজি' },
  hscict: { en: 'ICT', bn: 'তথ্য ও যোগাযোগ প্রযুক্তি' },
  hscict2: { en: 'ICT', bn: 'তথ্য ও যোগাযোগ প্রযুক্তি' },
};

function idPrefix(id) {
  return String(id || '').replace(/_\d+$/, '');
}

function stripBracketSuffix(text) {
  return String(text || '').replace(/\s*\[\d+\]\s*$/g, '').trim();
}

function enrichGkItem(item) {
  const levelKey = String(item.level || item.difficulty?.en || '').toLowerCase();
  const difficulty = LEVEL_LABELS[levelKey] || item.difficulty;
  const question = item.question
    ? {
        bn: stripBracketSuffix(item.question.bn),
        en: stripBracketSuffix(item.question.en),
      }
    : item.question;
  return { ...item, question, difficulty };
}

function enrichMcqItem(item) {
  if (item.subject?.en || item.category?.en) return item;
  const subject = SUBJECT_BY_PREFIX[idPrefix(item.id)];
  if (!subject) return item;
  return { ...item, subject };
}

function isValidMcq(item) {
  return !!(
    item?.question?.bn &&
    item?.question?.en &&
    (item?.chapter?.en || item?.subject?.en || item?.category?.en || SUBJECT_BY_PREFIX[idPrefix(item.id)])
  );
}

function prepareMcqList(items) {
  return (items || []).filter(isValidMcq).map(enrichMcqItem);
}

function prepareGkList(items) {
  return (items || [])
    .filter((item) => item?.question?.bn && item?.question?.en && item?.category?.en)
    .map(enrichGkItem);
}

export const MCQ_SOURCES = {
  ssc: prepareMcqList(sscJson.questions),
  hsc: prepareMcqList(hscJson.questions),
  gk: prepareGkList(gkJson.questions),
};

export function getMcqItems(level) {
  return MCQ_SOURCES[level] || [];
}
