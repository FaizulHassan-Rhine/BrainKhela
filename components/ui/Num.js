'use client';

import { formatNumber } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

/** Bengali/English number with a clearer digit font when lang is bn. */
export default function Num({ value, className = '' }) {
  const { lang } = useLanguage();
  const text = formatNumber(value, lang);

  if (lang === 'en') {
    return <span className={`tabular-nums ${className}`}>{text}</span>;
  }

  return (
    <span className={`font-bn-digits tabular-nums font-semibold ${className}`} lang="bn">
      {text}
    </span>
  );
}

/** Pre-formatted numeric string (e.g. from formatNumber) with digit font. */
export function BnDigits({ children, className = '' }) {
  const { lang } = useLanguage();

  if (lang === 'en') {
    return <span className={`tabular-nums ${className}`}>{children}</span>;
  }

  return (
    <span className={`font-bn-digits tabular-nums font-semibold ${className}`} lang="bn">
      {children}
    </span>
  );
}
