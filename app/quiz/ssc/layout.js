import { buildPageMetadata, getLearningResourceSchema, getBreadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'SSC MCQ প্র্যাকটিস';
const description =
  'এসএসসি MCQ প্র্যাকটিস — গণিত, বিজ্ঞান, বাংলা, ইংরেজি, ICT। ১০০০+ বাংলা-ইংরেজি দ্বিভাষিক প্রশ্ন বিনামূল্যে। Free SSC MCQ practice online for Bangladesh students on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/quiz/ssc',
  keywords: [
    'SSC MCQ',
    'এসএসসি এমসিকিউ',
    'SSC MCQ practice online',
    'SSC exam preparation',
    'SSC math MCQ',
    'SSC science MCQ bangla',
  ],
});

export default function SSCLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          getLearningResourceSchema({ title, description, path: '/quiz/ssc', educationalLevel: 'SSC' }),
          getBreadcrumbSchema([
            { name: 'হোম', path: '/' },
            { name: 'কুইজ', path: '/quiz' },
            { name: title, path: '/quiz/ssc' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
