import { notFound } from 'next/navigation';
import BrainGamePlay from '@/components/brain-games/BrainGamePlay';
import { getAllBrainGames, getBrainGameById } from '@/lib/data/brainGamesDataset';

export function generateStaticParams() {
  return getAllBrainGames().map((g) => ({ id: g.id }));
}

export default function BrainGameIdPage({ params }) {
  const game = getBrainGameById(params.id);
  if (!game) notFound();
  return <BrainGamePlay game={game} />;
}
