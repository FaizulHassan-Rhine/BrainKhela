'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  collectTranslatableStrings,
  localizeQuestions,
  questionsCacheKey,
  buildTranslationMap,
} from '@/lib/i18n/localizeQuestions';
import {
  isBilingualMcqDataset,
  normalizeBilingualList,
} from '@/lib/data/bilingualMcq';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';

/**
 * Localize quiz/question data for the active language.
 * Bilingual JSON ({ bn, en }) is normalized synchronously.
 * Legacy Bangla-only data uses /api/translate for English (cached).
 */
export function useLocalizedQuestions(questions, lang) {
  const syncLocalized = useMemo(() => {
    if (!questions?.length) return [];

    if (isBilingualMcqDataset(questions)) {
      return normalizeBilingualList(questions, lang);
    }

    if (lang === 'bn') {
      return localizeQuestions(questions, 'bn');
    }

    return null;
  }, [questions, lang]);

  const [asyncLocalized, setAsyncLocalized] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cacheKey = useMemo(
    () => (questions?.length ? questionsCacheKey(questions, lang) : null),
    [questions, lang]
  );

  useEffect(() => {
    if (syncLocalized !== null) {
      setLoading(false);
      setError(null);
      return;
    }

    if (!questions?.length) {
      setAsyncLocalized([]);
      return;
    }

    const needsApi = collectTranslatableStrings(questions).length > 0;
    if (!needsApi) {
      setAsyncLocalized(questions);
      return;
    }

    const cached = getLocalStorage(cacheKey);
    if (cached) {
      setAsyncLocalized(cached);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const strings = collectTranslatableStrings(questions);

    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: strings, source: 'bn', target: 'en' }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.hint || data.error || 'Translation failed');
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        const map = buildTranslationMap(strings, data.translations);
        const result = localizeQuestions(questions, 'en', map);
        setLocalStorage(cacheKey, result);
        setAsyncLocalized(result);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setAsyncLocalized(localizeQuestions(questions, 'bn'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [syncLocalized, questions, lang, cacheKey]);

  if (syncLocalized !== null) {
    return { questions: syncLocalized, loading: false, error: null };
  }

  return { questions: asyncLocalized, loading, error };
}
