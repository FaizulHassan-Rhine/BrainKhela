import { buildPageMetadata, getWebPageSchema } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const title = 'মিনি গেম';
const description =
  'দ্রুত ক্লিক, শব্দ খোঁজো ও ধাঁধা — ছোট মজার গেম। Free mini games in Bangla for quick brain breaks on BrainKhela.';

export const metadata = buildPageMetadata({
  title,
  description,
  path: '/mini-games',
  keywords: ['মিনি গেম', 'mini games bangla', 'word search bangla', 'quick click game'],
});

export default function MiniGamesLayout({ children }) {
  return (
    <>
      <JsonLd data={getWebPageSchema({ title, description, path: '/mini-games' })} />
      {children}
    </>
  );
}
