'use client';

import Image from 'next/image';
import { BRAND_ALT, BRAND_LOGO } from '@/lib/brand';

const SIZE_MAP = {
  sm: { logo: 28, rings: 52 },
  md: { logo: 56, rings: 96 },
  lg: { logo: 72, rings: 120 },
};

export default function LuxuryLoader({
  variant = 'inline',
  size = 'md',
  label,
  className = '',
}) {
  const isFullscreen = variant === 'fullscreen';
  const isPage = variant === 'page';
  const isInline = variant === 'inline';
  const dimensions = SIZE_MAP[isInline ? 'sm' : size] || SIZE_MAP.md;

  const wrapperClass = isFullscreen
    ? 'fixed inset-0 z-[100] flex items-center justify-center luxury-loader-overlay'
    : isPage
      ? 'min-h-[50vh] flex items-center justify-center py-20'
      : `flex items-center justify-center py-12 ${className}`;

  return (
    <div
      className={wrapperClass}
      role="status"
      aria-live="polite"
      aria-label={label || 'Loading'}
    >
      {isFullscreen && <div className="luxury-loader-backdrop" aria-hidden="true" />}

      <div className="luxury-loader-core">
        <div
          className="luxury-loader-stage"
          style={{ width: dimensions.rings, height: dimensions.rings }}
        >
          <span className="luxury-loader-ring luxury-loader-ring-1" />
          <span className="luxury-loader-ring luxury-loader-ring-2" />
          <span className="luxury-loader-ring luxury-loader-ring-3" />
          <span className="luxury-loader-glow" aria-hidden="true" />

          <div className="luxury-loader-logo">
            <Image
              src={BRAND_LOGO.xl}
              alt={BRAND_ALT}
              width={dimensions.logo}
              height={dimensions.logo}
              className="object-contain luxury-loader-logo-img"
              priority={isFullscreen}
            />
          </div>
        </div>

        {(label && (isFullscreen || isPage || isInline)) && (
          <p className={`luxury-loader-text ${isInline ? 'luxury-loader-text--inline' : ''}`}>{label}</p>
        )}

        <div className={`luxury-loader-dots ${isInline ? 'luxury-loader-dots--sm' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

/** Compact spinner for buttons — matches luxury palette */
export function LuxuryLoaderSpinner({ className = '' }) {
  return (
    <span className={`luxury-loader-btn-spin ${className}`} aria-hidden="true" />
  );
}
