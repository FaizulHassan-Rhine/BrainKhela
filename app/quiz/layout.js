import { buildPageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'কুইজ হাব';
const description =
  'SSC MCQ, HSC MCQ ও সাধারণ জ্ঞান কুইজ — বাংলা ও ইংরেজি দ্বিভাষিক। Quiz hub for Bangladesh students: free bilingual MCQ practice on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/quiz',
  keywords: [
    'কুইজ হাব',
    'quiz hub bangladesh',
    'MCQ practice online',
    'SSC HSC quiz',
    'bilingual quiz bangla english',
  ],
});

export default function QuizHubLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          getWebPageSchema({ title, description, path: '/quiz' }),
          getBreadcrumbSchema([
            { name: 'হোম', path: '/' },
            { name: title, path: '/quiz' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
