export const brainGamesData = {
  memoryCards: {
    title: 'মেমোরি কার্ড',
    description: 'কার্ড মিলিয়ে মেমোরি পরীক্ষা করো',
    emojis: ['🍎', '🍊', '🍋', '🍇', '🍓', '🌸'],
  },
  numberMemory: {
    title: 'সংখ্যা মনে রাখো',
    description: 'সংক্ষেপে দেখানো সংখ্যা মনে রেখে লেখো',
    displayTime: { easy: 4000, medium: 3000, hard: 2000 },
    digits: { easy: 3, medium: 4, hard: 5 },
  },
  stroop: {
    title: 'রঙ চেনো',
    description: 'শব্দের রঙ মিলিয়ে সঠিক উত্তর দাও',
    colors: [
      { name: 'লাল', value: 'red', hex: '#EF4444' },
      { name: 'নীল', value: 'blue', hex: '#3B82F6' },
      { name: 'সবুজ', value: 'green', hex: '#10B981' },
      { name: 'হলুদ', value: 'yellow', hex: '#F59E0B' },
    ],
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
  riddles: [
    { question: 'এমন একটা জিনিস যা যত বেশি নেওয়া হয় তত বড় হয়?', answer: 'গর্ত/ছিদ্র' },
    { question: 'চোখ আছে কিন্তু দেখতে পারে না?', answer: 'সুই' },
    { question: 'পা আছে কিন্তু হাঁটতে পারে না?', answer: 'টেবিল/চেয়ার' },
    { question: 'সবসময় সামনে যায় কিন্তু কখনো পিছনে যায় না?', answer: 'ভবিষ্যৎ/সময়' },
    { question: 'বাড়ি আছে কিন্তু দরজা-জানালা নেই?', answer: 'ডিম' },
  ],
};
