import dataset from '@/data/brain_games_dataset.json';

export const brainGamesDataset = dataset;

export function getAllBrainGames() {
  return dataset.games || [];
}

export function getBrainGameById(id) {
  return dataset.games?.find((g) => g.id === id) || null;
}

export function getBrainGameCategories() {
  return dataset.categories || [];
}

export function resolveGameText(value, lang = 'bn') {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (lang === 'en' && value.en) return value.en;
    return value.bn ?? value.en ?? '';
  }
  return String(value);
}
