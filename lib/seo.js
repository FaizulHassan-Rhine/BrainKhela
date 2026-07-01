import { SITE_NAME, SITE_URL, SITE_TAGLINE } from '@/lib/constants';
import { BRAND_OG_IMAGE, BRAND_LOGO } from '@/lib/brand';
import { getAllBrainGames } from '@/lib/data/brainGamesDataset';

/** Shared bilingual keywords for Bangladesh education searches */
export const GLOBAL_KEYWORDS = [
  'BrainKhela',
  'brainkhela.com',
  'বাংলা কুইজ',
  'bangla quiz',
  'SSC MCQ',
  'SSC MCQ practice',
  'এসএসসি এমসিকিউ',
  'HSC MCQ',
  'HSC MCQ practice',
  'এইচএসসি এমসিকিউ',
  'বাংলা টাইপিং টেস্ট',
  'bangla typing test',
  'ইংরেজি টাইপিং টেস্ট',
  'english typing test',
  'IQ test bangla',
  'আইকিউ টেস্ট বাংলা',
  'brain game bangla',
  'ব্রেইন গেম',
  'গণিত প্র্যাকটিস',
  'math practice bangla',
  'সাধারণ জ্ঞান কুইজ',
  'general knowledge quiz bangladesh',
  'education game bangladesh',
  'শিক্ষামূলক গেম',
  'free quiz bangladesh',
  'বিনামূল্যে কুইজ',
  'MCQ practice online',
  'অনলাইন এমসিকিউ',
];

export const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/typing/bangla', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/typing/english', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/quiz', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/quiz/gk', priority: 0.88, changeFrequency: 'weekly' },
  { path: '/quiz/ssc', priority: 0.92, changeFrequency: 'weekly' },
  { path: '/quiz/hsc-accounting', priority: 0.92, changeFrequency: 'weekly' },
  { path: '/math', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/iq-test', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/brain-game', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/mini-games', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
];

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = BRAND_OG_IMAGE,
  noIndex = false,
}) {
  const url = absoluteUrl(path);
  const allKeywords = [...new Set([...keywords, ...GLOBAL_KEYWORDS.slice(0, 12)])];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'bn_BD',
      alternateLocale: ['en_US'],
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${SITE_NAME} - ${title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(BRAND_LOGO.xl),
    image: absoluteUrl(BRAND_OG_IMAGE),
    description: 'বাংলাদেশের শিক্ষার্থীদের জন্য বিনামূল্যে বাংলা-ইংরেজি কুইজ, টাইপিং টেস্ট, IQ টেস্ট ও ব্রেইন গেম।',
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
    availableLanguage: ['bn', 'en'],
    sameAs: [],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free bilingual educational games for Bangladesh students — SSC MCQ, HSC quiz, Bangla typing, IQ test & brain games.',
    inLanguage: ['bn-BD', 'en'],
    image: absoluteUrl(BRAND_OG_IMAGE),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/quiz?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getWebPageSchema({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: SITE_NAME },
    inLanguage: ['bn-BD', 'en'],
  };
}

export function getLearningResourceSchema({ title, description, path, educationalLevel }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description,
    url: absoluteUrl(path),
    learningResourceType: 'Quiz',
    educationalLevel,
    inLanguage: ['bn', 'en'],
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getGameSchema({ name, description, path, category }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name,
    description,
    url: absoluteUrl(path),
    gamePlatform: 'Web browser',
    genre: category,
    inLanguage: ['bn', 'en'],
    isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function getAllSitemapEntries() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const brainGames = getAllBrainGames().map((game) => ({
    url: absoluteUrl(`/brain-game/${game.id}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticEntries, ...brainGames];
}

export const HOME_METADATA = buildPageMetadata({
  title: 'BrainKhela - বাংলা কুইজ, টাইপিং টেস্ট ও ব্রেইন গেম',
  description:
    'BrainKhela.com — বাংলাদেশের #১ ফ্রি শিক্ষামূলক গেমিং সাইট। SSC MCQ (১০০০+), HSC MCQ (১০০০+), বাংলা ও ইংরেজি টাইপিং টেস্ট, IQ টেস্ট, গণিত প্র্যাকটিস ও ৫০টি ব্রেইন গেম — সম্পূর্ণ বিনামূল্যে। Free Bangla quiz, typing test & brain games for Bangladesh students.',
  path: '/',
  ogImage: BRAND_OG_IMAGE,
  keywords: [
    'BrainKhela',
    'মাথা খাটাও মজা করো',
    'bangladesh education website',
    'online learning game bangla',
  ],
});
