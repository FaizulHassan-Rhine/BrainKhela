import banglaJson from '@/data/bangla_typing_test.json';
import englishJson from '@/data/english_typing_test.json';

function flattenTypingLevels(json) {
  const texts = [];
  for (const [difficulty, items] of Object.entries(json.levels || {})) {
    for (const item of items) {
      texts.push({
        id: item.id,
        difficulty,
        text: item.text,
      });
    }
  }
  return texts;
}

export const banglaTexts = flattenTypingLevels(banglaJson);
export const englishTexts = flattenTypingLevels(englishJson);
