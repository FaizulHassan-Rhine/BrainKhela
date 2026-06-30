'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Brain, Zap, Calculator, BookOpen, Target } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getAllBrainGames, resolveGameText } from '@/lib/data/brainGamesDataset';
import Num from '@/components/ui/Num';

const CATEGORY_META = [
  { id: 'all', key: 'brain.allCategories', icon: Brain },
  { id: 'memory', key: 'brain.catMemory', icon: Brain },
  { id: 'logic', key: 'brain.catLogic', icon: Zap },
  { id: 'math', key: 'brain.catMath', icon: Calculator },
  { id: 'word', key: 'brain.catWord', icon: BookOpen },
  { id: 'reaction', key: 'brain.catReaction', icon: Target },
];

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
        {CATEGORY_META.map(({ id, key, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors ${
              category === id ? 'bg-primary text-cream-light' : 'bg-cream-light border border-accent text-muted-foreground'
            }`}
          >
            <Icon size={16} />
            {t(key)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((game) => (
          <Link
            key={game.id}
            href={`/brain-game/${game.id}`}
            className="card hover:border-primary/40 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground uppercase">{game.category}</span>
              <span className="text-xs text-muted-foreground">{game.id}</span>
            </div>
            <h2 className="font-bold text-primary group-hover:text-primary-dark mb-2">
              {resolveGameText(game.name, lang)}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {resolveGameText(game.description, lang)}
            </p>
            <span className="inline-block mt-4 text-sm font-medium text-primary">
              {t('brain.play')} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
