import { buildPageMetadata, getWebPageSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'আমাদের সম্পর্কে';
const description =
  'BrainKhela.com — বাংলাদেশের শিক্ষার্থীদের জন্য বিনামূল্যে বাংলা-ইংরেজি শিক্ষামূলক গেম প্ল্যাটফর্ম। About BrainKhela free education games for Bangladesh.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/about',
  keywords: ['BrainKhela about', 'education platform bangladesh'],
});

export default function AboutLayout({ children }) {
  return (
    <>
      <JsonLd data={getWebPageSchema({ title, description, path: '/about' })} />
      {children}
    </>
  );
}
