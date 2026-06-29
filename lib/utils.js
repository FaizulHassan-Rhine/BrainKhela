export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getRandomItems(array, count) {
  return shuffleArray(array).slice(0, Math.min(count, array.length));
}

export function calculateGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  return 'F';
}

export function calculateWPM(characters, timeInSeconds, isBangla = false) {
  if (timeInSeconds <= 0) return 0;
  const words = isBangla ? characters / 5 : characters / 5;
  return Math.round((words / timeInSeconds) * 60);
}

export function calculateCPM(characters, timeInSeconds) {
  if (timeInSeconds <= 0) return 0;
  return Math.round((characters / timeInSeconds) * 60);
}

export function calculateAccuracy(correct, total) {
  if (total <= 0) return 100;
  return Math.round((correct / total) * 100);
}

export function toBanglaNumber(num) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[parseInt(d, 10)]);
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getIQScore(correct, total) {
  const percentage = (correct / total) * 100;
  const baseIQ = 70 + (percentage * 0.6);
  const low = Math.round(baseIQ - 5);
  const high = Math.round(baseIQ + 5);
  return { low, high, percentage };
}

export function getIQCategory(iqHigh) {
  if (iqHigh >= 130) return { label: 'অত্যন্ত মেধাবী', range: '130+' };
  if (iqHigh >= 110) return { label: 'উপরের গড়', range: '110-129' };
  if (iqHigh >= 90) return { label: 'গড় বুদ্ধিমত্তা', range: '90-109' };
  return { label: 'আরও চেষ্টা করো', range: '৯০-এর নিচে' };
}

export function getLocalStorage(key, defaultValue = null) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function generateMathProblem(difficulty, operation) {
  const ops = operation === 'all'
    ? ['+', '-', '×', '÷']
    : [operation === 'add' ? '+' : operation === 'sub' ? '-' : operation === 'mul' ? '×' : '÷'];

  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  const ranges = {
    easy: { min: 1, max: 20 },
    medium: { min: 10, max: 50 },
    hard: { min: 20, max: 100 },
  };

  const range = ranges[difficulty] || ranges.easy;

  switch (op) {
    case '+':
      a = Math.floor(Math.random() * range.max) + range.min;
      b = Math.floor(Math.random() * range.max) + range.min;
      answer = a + b;
      break;
    case '-':
      a = Math.floor(Math.random() * range.max) + range.min;
      b = Math.floor(Math.random() * a) + 1;
      answer = a - b;
      break;
    case '×':
      a = Math.floor(Math.random() * (difficulty === 'hard' ? 15 : 12)) + 2;
      b = Math.floor(Math.random() * (difficulty === 'hard' ? 15 : 12)) + 2;
      answer = a * b;
      break;
    case '÷':
      b = Math.floor(Math.random() * 10) + 2;
      answer = Math.floor(Math.random() * 10) + 1;
      a = b * answer;
      break;
    default:
      a = 1; b = 1; answer = 2;
  }

  return { a, b, operation: op, answer };
}

export function shareText(text) {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({ text, title: 'BrainKhela' });
  } else if (typeof navigator !== 'undefined') {
    navigator.clipboard?.writeText(text);
    alert('স্কোর কপি হয়েছে!');
  }
}
