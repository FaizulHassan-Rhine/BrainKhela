import { buildPageMetadata, getLearningResourceSchema, getBreadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'IQ টেস্ট বাংলা';
const description =
  'বিনামূল্যে IQ টেস্ট বাংলায়। ৩০০+ প্রশ্ন, তাৎক্ষণিক স্কোর ও বুদ্ধিমত্তার মাত্রা। Free IQ test in Bangla & English for Bangladesh students — logic, pattern & reasoning on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/iq-test',
  keywords: [
    'IQ test bangla',
    'আইকিউ টেস্ট',
    'free IQ test online',
    'IQ test bangladesh',
    'বুদ্ধিমত্তা পরীক্ষা',
    'logic test bangla',
  ],
});

export default function IqTestLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          getLearningResourceSchema({ title, description, path: '/iq-test', educationalLevel: 'Secondary' }),
          getBreadcrumbSchema([
            { name: 'হোম', path: '/' },
            { name: title, path: '/iq-test' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
