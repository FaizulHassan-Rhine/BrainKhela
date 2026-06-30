import { buildPageMetadata, getWebPageSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'গোপনীয়তা নীতি';
const description = 'BrainKhela.com গোপনীয়তা নীতি — Privacy Policy for our free educational gaming platform in Bangladesh.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/privacy-policy',
  noIndex: false,
});

export default function PrivacyLayout({ children }) {
  return (
    <>
      <JsonLd data={getWebPageSchema({ title, description, path: '/privacy-policy' })} />
      {children}
    </>
  );
}
