import Image from 'next/image';
import { BRAND_ALT, BRAND_LOGO, BRAND_NAME, LOGO_SIZES } from '@/lib/brand';

const SIZE_MAP = {
  xs: LOGO_SIZES.xs,
  sm: LOGO_SIZES.sm,
  md: LOGO_SIZES.md,
  nav: LOGO_SIZES.nav,
  footer: LOGO_SIZES.footer,
  lg: LOGO_SIZES.lg,
  xl: LOGO_SIZES.xl,
};

export default function BrandLogo({
  size = 'md',
  showName = true,
  className = '',
  nameClassName = 'font-bold text-xl text-primary',
  priority = false,
}) {
  const displayPx = SIZE_MAP[size] || LOGO_SIZES.md;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={BRAND_LOGO.xl}
        alt={BRAND_ALT}
        width={displayPx}
        height={displayPx}
        priority={priority}
        className="shrink-0 object-contain"
      />
      {showName && <span className={nameClassName}>{BRAND_NAME}</span>}
    </span>
  );
}
