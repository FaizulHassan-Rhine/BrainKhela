'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getAllBrainGames, resolveGameText } from '@/lib/data/brainGamesDataset';
import Num from '@/components/ui/Num';
import BrainGamePreview from '@/components/brain-games/BrainGamePreview';

const CATEGORY_META = [
  { id: 'all', key: 'brain.allCategories' },
  { id: 'memory', key: 'brain.catMemory' },
  { id: 'logic', key: 'brain.catLogic' },
  { id: 'math', key: 'brain.catMath' },
  { id: 'word', key: 'brain.catWord' },
  { id: 'reaction', key: 'brain.catReaction' },
];

const CATEGORY_BADGE = {
  memory: 'bg-violet-100 text-violet-800',
  logic: 'bg-sky-100 text-sky-800',
  math: 'bg-amber-100 text-amber-800',
  word: 'bg-emerald-100 text-emerald-800',
  reaction: 'bg-rose-100 text-rose-800',
};

export default function BrainGameHub() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState('all');
  const games = useMemo(() => getAllBrainGames(), []);

  const filtered = category === 'all' ? games : games.filter((g) => g.category === category);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">{t('brain.title')}</h1>
        <p className="text-muted-foreground">{t('brain.hubSubtitle')}</p>
        <p className="text-sm text-muted-foreground mt-2">
          <Num value={games.length} className="text-primary-dark" /> {t('brain.gameCount')}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {CATEGORY_META.map(({ id, key }) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              category === id ? 'bg-primary text-cream-light' : 'bg-cream-light border border-accent text-muted-foreground'
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((game) => (
          <Link
            key={game.id}
            href={`/brain-game/${game.id}`}
            className="group rounded-2xl border border-accent bg-cream-light shadow-card hover:shadow-soft hover:border-primary/30 transition-all overflow-hidden"
          >
            <BrainGamePreview game={game} lang={lang} />

            <div className="p-4 sm:p-5">
              <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${CATEGORY_BADGE[game.category] || 'bg-accent text-primary'}`}>
                {game.category}
              </span>
              <h2 className="font-bold text-primary group-hover:text-primary-dark mb-1.5 leading-snug">
                {resolveGameText(game.name, lang)}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                {resolveGameText(game.description, lang)}
              </p>
              <span className="inline-block mt-4 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {t('brain.play')} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
