export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function diffIndex(difficulty) {
  if (difficulty === 'easy') return 0;
  if (difficulty === 'hard') return 2;
  return 1;
}

export function parseGridSize(size = '4x4') {
  const [r, c] = String(size).split('x').map(Number);
  return { rows: r || 4, cols: c || 4 };
}

export function gridSizeToPairs(gridSize) {
  const { rows, cols } = parseGridSize(gridSize);
  return Math.floor((rows * cols) / 2);
}
