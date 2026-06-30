import { buildPageMetadata, getLearningResourceSchema, getBreadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'HSC MCQ প্র্যাকটিস';
const description =
  'এইচএসসি MCQ প্র্যাকটিস — পদার্থবিজ্ঞান ও গণিত, রসায়ন, জীববিজ্ঞান, ইংরেজি, ICT। ১০০০+ বাংলা-ইংরেজি প্রশ্ন। Free HSC MCQ practice online for Bangladesh on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/quiz/hsc-accounting',
  keywords: [
    'HSC MCQ',
    'এইচএসসি এমসিকিউ',
    'HSC MCQ practice',
    'HSC physics math MCQ',
    'HSC chemistry MCQ bangla',
    'HSC biology quiz',
  ],
});

export default function HSCLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          getLearningResourceSchema({ title, description, path: '/quiz/hsc-accounting', educationalLevel: 'HSC' }),
          getBreadcrumbSchema([
            { name: 'হোম', path: '/' },
            { name: 'কুইজ', path: '/quiz' },
            { name: title, path: '/quiz/hsc-accounting' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
