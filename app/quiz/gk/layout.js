import { buildPageMetadata, getLearningResourceSchema, getBreadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'সাধারণ জ্ঞান কুইজ';
const description =
  'সাধারণ জ্ঞান (GK) কুইজ বাংলা ও ইংরেজি — বাংলাদেশ, আন্তর্জাতিক, ভূগোল, ইতিহাস, বিজ্ঞান, খেলাধুলা, সাহিত্য। ৫০০+ প্রশ্ন। Free general knowledge quiz for Bangladesh students on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/quiz/gk',
  keywords: [
    'সাধারণ জ্ঞান কুইজ',
    'GK quiz bangla',
    'general knowledge bangladesh',
    'GK MCQ bangla',
    'bangla gk test online',
  ],
});

export default function GKQuizLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          getLearningResourceSchema({ title, description, path: '/quiz/gk', educationalLevel: 'General' }),
          getBreadcrumbSchema([
            { name: 'হোম', path: '/' },
            { name: 'কুইজ', path: '/quiz' },
            { name: title, path: '/quiz/gk' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
