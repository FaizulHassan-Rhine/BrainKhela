'use client';

import TypingTest from '@/components/games/TypingTest';
import { banglaTexts, englishTexts } from '@/lib/data/typingTexts';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function BanglaTypingPage() {
  const { t } = useLanguage();

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">{t('typing.banglaTitle')}</h1>
      <TypingTest texts={banglaTexts} language="bangla" />
    </div>
  );
}
