import { SITE_NAME, SITE_URL } from '@/lib/constants';

export default function manifest() {
  return {
    name: `${SITE_NAME} - বাংলা কুইজ, টাইপিং ও ব্রেইন গেম`,
    short_name: SITE_NAME,
    description: 'বাংলাদেশের ফ্রি শিক্ষামূলক গেম — SSC MCQ, HSC quiz, typing test, IQ test & brain games.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFCF9',
    theme_color: '#5a5349',
    lang: 'bn',
    dir: 'ltr',
    categories: ['education', 'games'],
    icons: [
      { src: '/og-image.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
    related_applications: [],
    prefer_related_applications: false,
    scope: '/',
  };
}
