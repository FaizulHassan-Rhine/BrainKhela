export const SITE_NAME = 'BrainKhela';
export const SITE_URL = 'https://brainkhela.com';
export const SITE_TAGLINE = 'মাথা খাটাও, মজা করো!';

export const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const NAV_LINKS = [
  { href: '/', label: 'হোম' },
  { href: '/typing/bangla', label: 'টাইপিং' },
  { href: '/quiz', label: 'কুইজ' },
  { href: '/math', label: 'গণিত' },
  { href: '/iq-test', label: 'IQ টেস্ট' },
  { href: '/brain-game', label: 'ব্রেইন গেম' },
];

export const FEATURES = [
  { href: '/typing/bangla', title: 'বাংলা টাইপিং টেস্ট', icon: 'Keyboard', color: 'bg-purple-100 text-primary' },
  { href: '/typing/english', title: 'ইংরেজি টাইপিং টেস্ট', icon: 'Type', color: 'bg-indigo-100 text-secondary' },
  { href: '/quiz/gk', title: 'সাধারণ জ্ঞান কুইজ', icon: 'BookOpen', color: 'bg-amber-100 text-amber-600' },
  { href: '/quiz/ssc', title: 'SSC MCQ প্র্যাকটিস', icon: 'GraduationCap', color: 'bg-green-100 text-success' },
  { href: '/quiz/hsc-accounting', title: 'HSC অ্যাকাউন্টিং MCQ', icon: 'Calculator', color: 'bg-blue-100 text-blue-600' },
  { href: '/math', title: 'গণিত প্র্যাকটিস গেম', icon: 'Hash', color: 'bg-red-100 text-error' },
  { href: '/iq-test', title: 'IQ টেস্ট বাংলা', icon: 'Brain', color: 'bg-violet-100 text-violet-600' },
  { href: '/brain-game', title: 'ব্রেইন গেম', icon: 'Zap', color: 'bg-yellow-100 text-yellow-600' },
  { href: '/mini-games', title: 'মিনি গেম', icon: 'Gamepad2', color: 'bg-pink-100 text-pink-600' },
];

export const GRADE_THRESHOLDS = [
  { min: 90, grade: 'A+' },
  { min: 80, grade: 'A' },
  { min: 70, grade: 'B' },
  { min: 60, grade: 'C' },
  { min: 0, grade: 'F' },
];

export const IQ_CATEGORIES = [
  { min: 130, label: 'অত্যন্ত মেধাবী', range: '130+' },
  { min: 110, label: 'উপরের গড়', range: '110-129' },
  { min: 90, label: 'গড় বুদ্ধিমত্তা', range: '90-109' },
  { min: 0, label: 'আরও চেষ্টা করো', range: '৯০-এর নিচে' },
];
