/**
 * Google Cloud Translation API v2
 * https://cloud.google.com/translate/docs/reference/rest/v2/translate
 *
 * Set GOOGLE_TRANSLATE_API_KEY in .env.local
 */
export async function translateTexts(texts, { source = 'bn', target = 'en' } = {}) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_TRANSLATE_API_KEY is not configured');
  }

  if (!texts.length) return [];

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: texts,
      source,
      target,
      format: 'text',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Google Translate API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return data.data.translations.map((t) => t.translatedText);
}
