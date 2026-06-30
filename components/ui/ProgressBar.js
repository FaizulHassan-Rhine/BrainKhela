'use client';

import Num from '@/components/ui/Num';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function ProgressBar({ current, total, label }) {
  const { t, lang } = useLanguage();
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      {(label || total > 0) && (
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          {label && <span>{label}</span>}
          <span className={!label ? 'w-full text-right' : ''}>
            {t('common.question')} <Num value={current} />/<Num value={total} />
          </span>
        </div>
      )}
      <div className="w-full bg-accent/40 rounded-full h-3">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
