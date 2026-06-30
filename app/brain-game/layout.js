import { buildPageMetadata, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'ব্রেইন গেম';
const description =
  '৫০টি ফ্রি ব্রেইন গেম — মেমোরি, লজিক, গণিত, শব্দ ও রিঅ্যাকশন। ৫০ free brain training games in Bangla & English for students on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/brain-game',
  keywords: [
    'ব্রেইন গেম',
    'brain game bangla',
    'memory game online',
    'brain training bangladesh',
    'মেমোরি গেম',
    'cognitive games free',
  ],
});

export default function BrainGameLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          getWebPageSchema({ title, description, path: '/brain-game' }),
          getBreadcrumbSchema([
            { name: 'হোম', path: '/' },
            { name: title, path: '/brain-game' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
