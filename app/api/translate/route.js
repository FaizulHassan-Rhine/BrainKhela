import { NextResponse } from 'next/server';
import { getCachedTranslations, setCachedTranslations } from '@/lib/i18n/serverTranslationCache';
import { translateTexts } from '@/lib/i18n/googleTranslate';

export const dynamic = 'force-dynamic';

const MAX_BATCH = 100;
const MAX_TEXT_LENGTH = 5000;

export async function POST(request) {
  try {
    const body = await request.json();
    const { texts, source = 'bn', target = 'en' } = body;

    if (!Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: 'texts array required' }, { status: 400 });
    }

    if (texts.length > MAX_BATCH) {
      return NextResponse.json({ error: `Max ${MAX_BATCH} texts per request` }, { status: 400 });
    }

    const sanitized = texts.map((t) => String(t).slice(0, MAX_TEXT_LENGTH));
    const { results, missing, missingIndices } = getCachedTranslations(sanitized, source, target);

    if (missing.length > 0) {
      const translated = await translateTexts(missing, { source, target });
      setCachedTranslations(missing, translated, source, target);

      missing.forEach((_, i) => {
        results[missingIndices[i]] = translated[i];
      });
    }

    return NextResponse.json({
      translations: results,
      cached: missing.length === 0,
    });
  } catch (error) {
    const message = error.message || 'Translation failed';

    if (message.includes('GOOGLE_TRANSLATE_API_KEY')) {
      return NextResponse.json(
        {
          error: 'Translation API not configured',
          hint: 'Add GOOGLE_TRANSLATE_API_KEY to .env.local — enable Cloud Translation API in Google Cloud Console',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
