'use client';

import { toBanglaNumber } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BnDigits } from '@/components/ui/Num';

export default function Timer({ seconds, total, size = 'lg' }) {
  const { lang } = useLanguage();
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = lang === 'en'
    ? `${mins}:${secs.toString().padStart(2, '0')}`
    : `${toBanglaNumber(mins)}:${toBanglaNumber(secs.toString().padStart(2, '0'))}`;
  const percentage = total ? ((total - seconds) / total) * 100 : 0;
  const isLow = seconds <= 10 && seconds > 0;

  const sizeClasses = size === 'lg' ? 'text-4xl' : 'text-2xl';

  return (
    <div className="text-center">
      <div className={`font-bold ${sizeClasses} ${isLow ? 'text-error animate-pulse' : 'text-primary'}`}>
        {lang === 'en' ? display : <BnDigits>{display}</BnDigits>}
      </div>
      {total > 0 && (
        <div className="w-full bg-accent/40 rounded-full h-2 mt-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function TimerDisplay({ seconds, lang = 'bn' }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = lang === 'en'
    ? `${mins}:${secs.toString().padStart(2, '0')}`
    : `${toBanglaNumber(mins)}:${toBanglaNumber(secs.toString().padStart(2, '0'))}`;

  return (
    <span className="font-bold text-primary">
      {lang === 'en' ? display : <BnDigits>{display}</BnDigits>}
    </span>
  );
}
