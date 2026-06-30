import dataset from '@/data/brain_games_dataset.json';

function gameById(id) {
  return dataset.games?.find((g) => g.id === id);
}

const memory = gameById('g01');
const numberMem = gameById('g04');
const stroop = gameById('g42');
const riddles = gameById('g40');

const numberLevels = numberMem?.dataset?.levels || [];

export const brainGamesData = {
  memoryCards: {
    title: memory?.name?.bn || 'মেমোরি কার্ড',
    description: memory?.description?.bn || '',
    emojis: memory?.dataset?.icons || ['🍎', '🍊', '🍋', '🍇', '🍓', '🌸'],
  },
  numberMemory: {
    title: numberMem?.name?.bn || 'সংখ্যা মনে রাখো',
    description: numberMem?.description?.bn || '',
    displayTime: {
      easy: numberLevels[0]?.display_ms ?? 4000,
      medium: numberLevels[1]?.display_ms ?? 3000,
      hard: numberLevels[2]?.display_ms ?? 2000,
    },
    digits: {
      easy: numberLevels[0]?.digits ?? 3,
      medium: numberLevels[1]?.digits ?? 4,
      hard: numberLevels[2]?.digits ?? 5,
    },
  },
  stroop: {
    title: stroop?.name?.bn || 'রঙ চেনো',
    description: stroop?.description?.bn || '',
    colors: (stroop?.dataset?.items || []).map((item) => ({
      name: item.word_bn || item.word_en || '',
      value: (item.word_bn || item.word_en || '').toLowerCase(),
      hex: item.text_color || '#659287',
    })),
  },
};

export const miniGamesData = {
  wordSearch: {
    title: 'শব্দ খোঁজো',
    words: ['বাংলা', 'ঢাকা', 'স্কুল', 'বই', 'খেলা'],
    grid: [
      ['ব', 'অ', 'ন', 'য', 'া'],
      ['া', 'ঙ', 'ল', 'া', 'খ'],
      ['ং', 'ল', 'আ', 'ে', 'ল'],
      ['ল', 'া', 'ঢ', 'া', 'া'],
      ['া', 'ক', 'া', 'স', 'ক'],
    ],
  },
  riddles: (riddles?.dataset?.items || []).map((item) => ({
    question: item.riddle_bn || item.riddle_en,
    answer: item.answer_bn || item.answer_en,
  })),
};
