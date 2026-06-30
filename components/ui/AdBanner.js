'use client';

import { useEffect } from 'react';
import { ADSENSE_CLIENT } from '@/lib/constants';
import { useLanguage } from '@/components/providers/LanguageProvider';

const SIZES = {
  leaderboard: { width: 728, height: 90, label: '728 × 90' },
  rectangle: { width: 300, height: 250, label: '300 × 250' },
  responsive: { width: '100%', height: 250, label: 'Responsive' },
};

export default function AdBanner({ size = 'responsive' }) {
  const { t } = useLanguage();
  const isDev = process.env.NODE_ENV === 'development';
  const dimensions = SIZES[size] || SIZES.responsive;

  useEffect(() => {
    if (!isDev) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // ignore
      }
    }
  }, [isDev]);

  if (isDev) {
    return (
      <div className="flex justify-center my-4">
        <div
          className="bg-accent/30 border-2 border-dashed border-accent flex items-center justify-center text-muted-foreground text-sm rounded-xl"
          style={{
            width: typeof dimensions.width === 'number' ? dimensions.width : '100%',
            maxWidth: '100%',
            height: dimensions.height,
            minHeight: 90,
          }}
        >
          <span>{t('common.adPlaceholder')} ({dimensions.label})</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot="XXXXXXXXXX"
        data-ad-format={size === 'responsive' ? 'auto' : undefined}
        data-full-width-responsive={size === 'responsive' ? 'true' : undefined}
      />
    </div>
  );
}
