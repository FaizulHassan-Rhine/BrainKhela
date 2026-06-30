import { buildPageMetadata, getWebPageSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'বাংলা টাইপিং টেস্ট';
const description =
  'বিনামূল্যে বাংলা টাইপিং টেস্ট অনলাইন। গতি (WPM), নির্ভুলতা ও স্ট্রিক ট্র্যাক করো। Bangla typing speed test for Bangladesh — practice Unicode Bangla keyboard free on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/typing/bangla',
  keywords: [
    'বাংলা টাইপিং',
    'bangla typing',
    'bangla typing test online',
    'bangla keyboard practice',
    'টাইপিং স্পিড টেস্ট',
    'unicode bangla typing',
  ],
});

export default function BanglaTypingLayout({ children }) {
  return (
    <>
      <JsonLd data={getWebPageSchema({ title, description, path: '/typing/bangla' })} />
      {children}
    </>
  );
}
