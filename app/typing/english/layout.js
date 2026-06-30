import { buildPageMetadata, getWebPageSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'ইংরেজি টাইপিং টেস্ট';
const description =
  'ফ্রি ইংরেজি টাইপিং টেস্ট অনলাইন। WPM, accuracy ও practice paragraphs। English typing speed test for students in Bangladesh — free on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/typing/english',
  keywords: [
    'english typing test',
    'ইংরেজি টাইপিং',
    'typing speed test',
    'WPM test bangladesh',
    'english typing practice free',
  ],
});

export default function EnglishTypingLayout({ children }) {
  return (
    <>
      <JsonLd data={getWebPageSchema({ title, description, path: '/typing/english' })} />
      {children}
    </>
  );
}
