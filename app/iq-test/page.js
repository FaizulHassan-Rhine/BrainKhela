'use client';

import IQTest from '@/components/games/IQTest';
import { iqQuestions } from '@/lib/data/iqQuestions';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function IQTestPage() {
  const { t } = useLanguage();

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">{t('iq.title')}</h1>
      <IQTest questions={iqQuestions} />
    </div>
  );
}
