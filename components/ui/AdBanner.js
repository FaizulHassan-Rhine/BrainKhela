'use client';

import { useEffect } from 'react';
import { ADSENSE_CLIENT } from '@/lib/constants';

const SIZES = {
  leaderboard: { width: 728, height: 90, label: '728 × 90' },
  rectangle: { width: 300, height: 250, label: '300 × 250' },
  responsive: { width: '100%', height: 250, label: 'Responsive' },
};

export default function AdBanner({ size = 'responsive' }) {
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
          className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-sm rounded-lg"
          style={{
            width: typeof dimensions.width === 'number' ? dimensions.width : '100%',
            maxWidth: '100%',
            height: dimensions.height,
            minHeight: 90,
          }}
        >
          <span>Ad Placeholder ({dimensions.label})</span>
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
        data-ad-layout-key={size === 'leaderboard' ? '-fb+5w+4e-db+86' : undefined}
      />
    </div>
  );
}
