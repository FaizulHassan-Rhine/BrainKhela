import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'translations.json');

function hashKey(text, source, target) {
  return crypto.createHash('sha256').update(`${source}|${target}|${text}`).digest('hex');
}

function readCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) return {};
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeCache(data) {
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 0), 'utf8');
  } catch {
    // ignore write errors in read-only environments
  }
}

export function getCachedTranslations(texts, source, target) {
  const cache = readCache();
  const results = [];
  const missing = [];
  const missingIndices = [];

  texts.forEach((text, i) => {
    const key = hashKey(text, source, target);
    if (cache[key]) {
      results[i] = cache[key];
    } else {
      missing.push(text);
      missingIndices.push(i);
    }
  });

  return { results, missing, missingIndices };
}

export function setCachedTranslations(texts, translations, source, target) {
  const cache = readCache();
  texts.forEach((text, i) => {
    if (translations[i]) {
      cache[hashKey(text, source, target)] = translations[i];
    }
  });
  writeCache(cache);
}
