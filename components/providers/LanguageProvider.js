'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTranslation } from '@/lib/translations';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'brainkhela-lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('bn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getLocalStorage(STORAGE_KEY, 'bn');
    setLangState(saved === 'en' ? 'en' : 'bn');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
    setLocalStorage(STORAGE_KEY, lang);
  }, [lang, mounted]);

  const setLang = useCallback((newLang) => {
    setLangState(newLang === 'en' ? 'en' : 'bn');
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'bn' ? 'en' : 'bn'));
  }, []);

  const t = useCallback((key) => getTranslation(lang, key), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
