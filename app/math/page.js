'use client';

import MathGame from '@/components/games/MathGame';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function MathPage() {
  const { t } = useLanguage();

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">{t('math.title')}</h1>
      <MathGame />
    </div>
  );
}
