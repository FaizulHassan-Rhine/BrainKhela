/** BrainKhela brand assets — all paths under /public */
export const BRAND_LOGO = {
  xs: '/brainkhela-logo-16X16.png',
  sm: '/brainkhela-logo-32X32.png',
  md: '/brainkhela-logo-48X48.png',
  lg: '/brainkhela-logo-192X192.png',
  xl: '/brainkhela-logo-512X512.png',
  favicon: '/favicon.ico',
};

export const BRAND_NAME = 'BrainKhela';
export const BRAND_ALT =
  'BrainKhela — বাংলা কুইজ, SSC HSC MCQ, টাইপিং টেস্ট, IQ টেস্ট ও ব্রেইন গেম';

/** Default OG / social share image */
export const BRAND_OG_IMAGE = BRAND_LOGO.xl;

export const LOGO_SIZES = {
  xs: 16,
  sm: 32,
  md: 48,
  nav: 60,
  footer: 56,
  lg: 192,
  xl: 512,
};

/** Main feature / section icons (brand logo per category until custom icons are added) */
export const FEATURE_IMAGES = {
  '/typing/bangla': BRAND_LOGO.md,
  '/typing/english': BRAND_LOGO.md,
  '/quiz/gk': BRAND_LOGO.md,
  '/quiz/ssc': BRAND_LOGO.md,
  '/quiz/hsc-accounting': BRAND_LOGO.md,
  '/math': BRAND_LOGO.md,
  '/iq-test': BRAND_LOGO.md,
  '/brain-game': BRAND_LOGO.md,
  '/mini-games': BRAND_LOGO.md,
};

export const QUIZ_HUB_IMAGES = {
  '/quiz/gk': BRAND_LOGO.lg,
  '/quiz/ssc': BRAND_LOGO.lg,
  '/quiz/hsc-accounting': BRAND_LOGO.lg,
};

/** GK quiz sub-category icons */
export const GK_CATEGORY_IMAGES = {
  Bangladesh: BRAND_LOGO.md,
  International: BRAND_LOGO.md,
  Geography: BRAND_LOGO.md,
  History: BRAND_LOGO.md,
  Science: BRAND_LOGO.md,
  Sports: BRAND_LOGO.md,
  Literature: BRAND_LOGO.md,
  'General Knowledge': BRAND_LOGO.md,
};

/** SSC / HSC subject icons */
export const SUBJECT_IMAGES = {
  Mathematics: BRAND_LOGO.md,
  Science: BRAND_LOGO.md,
  Bangla: BRAND_LOGO.md,
  English: BRAND_LOGO.md,
  ICT: BRAND_LOGO.md,
  'Physics & Mathematics': BRAND_LOGO.md,
  Chemistry: BRAND_LOGO.md,
  Biology: BRAND_LOGO.md,
};

/** Brain game category icons */
export const BRAIN_CATEGORY_IMAGES = {
  all: BRAND_LOGO.md,
  memory: BRAND_LOGO.md,
  logic: BRAND_LOGO.md,
  math: BRAND_LOGO.md,
  word: BRAND_LOGO.md,
  reaction: BRAND_LOGO.md,
};

export function getMetadataIcons() {
  return {
    icon: [
      { url: BRAND_LOGO.favicon },
      { url: BRAND_LOGO.xs, sizes: '16x16', type: 'image/png' },
      { url: BRAND_LOGO.sm, sizes: '32x32', type: 'image/png' },
      { url: BRAND_LOGO.md, sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: BRAND_LOGO.lg, sizes: '192x192', type: 'image/png' }],
    shortcut: BRAND_LOGO.favicon,
  };
}

export function getManifestIcons() {
  return [
    { src: BRAND_LOGO.sm, sizes: '32x32', type: 'image/png', purpose: 'any' },
    { src: BRAND_LOGO.md, sizes: '48x48', type: 'image/png', purpose: 'any' },
    { src: BRAND_LOGO.lg, sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: BRAND_LOGO.xl, sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: BRAND_LOGO.xl, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ];
}
