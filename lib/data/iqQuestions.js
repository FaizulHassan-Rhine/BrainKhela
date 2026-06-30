import iqJson from '@/data/iq_test_merged.json';

function toBilingualMcq(item) {
  const options = (item.options || []).map(String);
  return {
    id: item.id,
    type: item.category,
    level: item.level,
    question: item.question,
    options: { bn: options, en: options },
    correct: item.answer_index,
    explanation: item.explanation,
  };
}

export function getIqQuestions() {
  const questions = [];
  for (const levelData of Object.values(iqJson.levels || {})) {
    const list = levelData.questions || [];
    for (const item of list) {
      questions.push(toBilingualMcq(item));
    }
  }
  return questions;
}

export const iqQuestions = getIqQuestions();
