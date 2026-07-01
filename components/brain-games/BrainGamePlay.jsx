'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import BrainGameEngine from '@/components/brain-games/BrainGameEngine';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { resolveGameText } from '@/lib/data/brainGamesDataset';
import { getGamePlayConfig } from '@/lib/brain-games/getGamePlayConfig';

const DIFF_KEYS = ['easy', 'medium', 'hard'];

export default function BrainGamePlay({ game }) {
  const { t, lang } = useLanguage();
  const [difficulty, setDifficulty] = useState('medium');
  const [started, setStarted] = useState(false);

  const config = useMemo(
    () => getGamePlayConfig(game, lang, difficulty),
    [game, lang, difficulty]
  );

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto space-y-6">
      <Link href="/brain-game" className="text-sm text-primary font-medium hover:underline">
        {t('brain.backToHub')}
      </Link>

      <div className="text-center">
        <p className="text-xs uppercase text-muted-foreground mb-1">{game.category} · {game.id}</p>
        <h1 className="text-2xl font-bold text-primary">{resolveGameText(game.name, lang)}</h1>
        <p className="text-muted-foreground mt-2">{resolveGameText(game.description, lang)}</p>
      </div>

      {!started ? (
        <div className="card space-y-4 max-w-md mx-auto">
          <h2 className="font-semibold">{t('common.selectDifficulty')}</h2>
          <div className="flex gap-2 flex-wrap">
            {DIFF_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  difficulty === key ? 'bg-primary text-cream-light' : 'bg-cream-light border border-accent text-muted-foreground'
                }`}
              >
                {t(`common.${key}`)}
              </button>
            ))}
          </div>
          <button onClick={() => setStarted(true)} className="btn-primary w-full">
            {t('common.start')}
          </button>
        </div>
      ) : (
        <section className="card">
          <BrainGameEngine engine={config.engine} props={config.props} />
        </section>
      )}
    </div>
  );
}
