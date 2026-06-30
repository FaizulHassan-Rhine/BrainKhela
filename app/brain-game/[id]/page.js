import { notFound } from 'next/navigation';
import BrainGamePlay from '@/components/brain-games/BrainGamePlay';
import JsonLd from '@/components/seo/JsonLd';
import { getAllBrainGames, getBrainGameById } from '@/lib/data/brainGamesDataset';
import { buildPageMetadata, getGameSchema, getBreadcrumbSchema } from '@/lib/seo';

export function generateStaticParams() {
  return getAllBrainGames().map((g) => ({ id: g.id }));
}

export function generateMetadata({ params }) {
  const game = getBrainGameById(params.id);
  if (!game) return { title: 'Game not found' };

  const titleBn = game.name.bn;
  const titleEn = game.name.en;
  const descBn = game.description.bn;
  const descEn = game.description.en;

  return buildPageMetadata({
    title: `${titleBn} | ${titleEn}`,
    description: `${descBn} Play free online: ${descEn}. Brain game on BrainKhela — বাংলা ও ইংরেজি।`,
    path: `/brain-game/${game.id}`,
    keywords: [
      titleBn,
      titleEn,
      'brain game bangla',
      'ব্রেইন গেম',
      game.category,
      'free online brain game',
    ],
  });
}

export default function BrainGameIdPage({ params }) {
  const game = getBrainGameById(params.id);
  if (!game) notFound();

  return (
    <>
      <JsonLd
        data={[
          getGameSchema({
            name: `${game.name.bn} / ${game.name.en}`,
            description: `${game.description.bn} ${game.description.en}`,
            path: `/brain-game/${game.id}`,
            category: game.category,
          }),
          getBreadcrumbSchema([
            { name: 'হোম', path: '/' },
            { name: 'ব্রেইন গেম', path: '/brain-game' },
            { name: game.name.bn, path: `/brain-game/${game.id}` },
          ]),
        ]}
      />
      <BrainGamePlay game={game} />
    </>
  );
}
