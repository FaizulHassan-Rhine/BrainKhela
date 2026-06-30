'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className="flex items-center rounded-lg border border-accent overflow-hidden text-xs font-semibold shadow-card"
      role="group"
      aria-label={t('lang.switchTo')}
    >
      <button
        onClick={() => setLang('bn')}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === 'bn' ? 'bg-primary text-cream-light' : 'bg-cream-light text-muted-foreground hover:bg-secondary'
        }`}
        aria-pressed={lang === 'bn'}
      >
        {t('lang.bn')}
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === 'en' ? 'bg-primary text-cream-light' : 'bg-cream-light text-muted-foreground hover:bg-secondary'
        }`}
        aria-pressed={lang === 'en'}
      >
        {t('lang.en')}
      </button>
    </div>
  );
}
