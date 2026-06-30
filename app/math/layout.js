import { buildPageMetadata, getWebPageSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'গণিত প্র্যাকটিস গেম';
const description =
  'বিনামূল্যে গণিত MCQ গেম — যোগ, বিয়োগ, গুণ, ভাগ। সহজ, মাঝারি, কঠিন লেভেল। Free math practice quiz game in Bangla & English for SSC students on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/math',
  keywords: [
    'গণিত প্র্যাকটিস',
    'math practice bangla',
    'math quiz game',
    'SSC math MCQ',
    'গণিত কুইজ',
    'mental math practice',
  ],
});

export default function MathLayout({ children }) {
  return (
    <>
      <JsonLd data={getWebPageSchema({ title, description, path: '/math' })} />
      {children}
    </>
  );
}
