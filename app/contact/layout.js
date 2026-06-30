import { buildPageMetadata, getWebPageSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'যোগাযোগ';
const description = 'BrainKhela.com-এ যোগাযোগ করুন। Contact BrainKhela — feedback and support for Bangladesh education games.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/contact',
});

export default function ContactLayout({ children }) {
  return (
    <>
      <JsonLd data={getWebPageSchema({ title, description, path: '/contact' })} />
      {children}
    </>
  );
}
