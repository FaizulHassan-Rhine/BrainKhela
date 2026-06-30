import mathJson from '@/data/math_practice_game.json';

const OP_CATEGORIES = {
  add: 'addition',
  sub: 'subtraction',
  mul: 'multiplication',
  div: 'division',
};

function toBilingualMcq(item) {
  const options = (item.options || []).map(String);
  return {
    id: item.id,
    category: item.category,
    level: item.level,
    question: item.question,
    options: { bn: options, en: options },
    correct: item.answer_index,
  };
}

export function getMathQuestions({ difficulty, operation } = {}) {
  const questions = [];
  for (const [levelKey, levelData] of Object.entries(mathJson.levels || {})) {
    if (difficulty && difficulty !== 'all' && levelKey !== difficulty) continue;
    for (const item of levelData.questions || []) {
      if (operation && operation !== 'all') {
        const cat = OP_CATEGORIES[operation];
        if (cat && item.category !== cat) continue;
      }
      questions.push(toBilingualMcq(item));
    }
  }
  return questions;
}

export const mathQuestions = getMathQuestions();
