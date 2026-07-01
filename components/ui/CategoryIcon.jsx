import Image from 'next/image';
import { BRAND_ALT, BRAND_LOGO } from '@/lib/brand';

/** Category / feature icon — uses mapped image or brand logo fallback */
export default function CategoryIcon({
  src,
  alt,
  size = 48,
  className = '',
}) {
  const imageSrc = src || BRAND_LOGO.md;

  return (
    <Image
      src={imageSrc}
      alt={alt || BRAND_ALT}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
