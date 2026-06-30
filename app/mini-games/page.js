'use client';

import { useState, useEffect } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import { miniGamesData } from '@/lib/data/brainGames';
import Num from '@/components/ui/Num';
import { RotateCcw, Eye } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

function QuickClickGame() {
  const { t, lang } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!playing) return;
    if (timeLeft <= 0) { setPlaying(false); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [playing, timeLeft]);

  const start = () => {
    setScore(0);
    setTimeLeft(10);
    setPlaying(true);
    moveTarget();
  };

  const moveTarget = () => {
    setPos({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 70 });
  };

  const click = () => {
    setScore((s) => s + 1);
    moveTarget();
  };

  return (
    <div className="space-y-4">
      {!playing ? (
        <div className="text-center">
          {timeLeft === 0 && score > 0 && (
            <p className="text-2xl font-bold text-primary mb-4">{t('common.score')}: <Num value={score} /></p>
          )}
          <button onClick={start} className="btn-primary">
            {t('common.start')} (10 {t('mini.seconds')})
          </button>
        </div>
      ) : (
        <>
          <p className="text-center font-bold text-primary">
            {t('common.time')}: <Num value={timeLeft} />s | {t('common.score')}: <Num value={score} />
          </p>
          <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={click}
              className="absolute w-12 h-12 bg-error rounded-full hover:scale-110 transition-transform shadow-lg"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function WordSearchGame() {
  const { t } = useLanguage();
  const { words, grid } = miniGamesData.wordSearch;
  const [found, setFound] = useState([]);
  const [selected, setSelected] = useState([]);
  const targetWord = words[0];

  const handleCell = (row, col) => {
    const key = `${row}-${col}`;
    const newSel = selected.includes(key) ? selected.filter((s) => s !== key) : [...selected, key];
    setSelected(newSel);
    const word = newSel.map((k) => {
      const [r, c] = k.split('-').map(Number);
      return grid[r][c];
    }).join('');
    if (word === targetWord || word.split('').reverse().join('') === targetWord) {
      if (!found.includes(targetWord)) setFound([...found, targetWord]);
      setSelected([]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-gray-600">{t('mini.findWord')}: <strong className="text-primary">{targetWord}</strong></p>
      <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto">
        {grid.map((row, ri) =>
          row.map((cell, ci) => (
            <button
              key={`${ri}-${ci}`}
              onClick={() => handleCell(ri, ci)}
              className={`aspect-square rounded-lg text-lg font-bold flex items-center justify-center ${
                selected.includes(`${ri}-${ci}`) ? 'bg-primary text-white' :
                found.length > 0 ? 'bg-success text-white' : 'bg-white border border-gray-200'
              }`}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {found.length > 0 && (
        <p className="text-center text-success font-semibold">🎉 {targetWord} {t('mini.foundWord')}</p>
      )}
    </div>
  );
}

function RiddleGame() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const riddles = miniGamesData.riddles;
  const riddle = riddles[index];

  const next = () => {
    setIndex((i) => (i + 1) % riddles.length);
    setRevealed(false);
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-lg font-semibold">{riddle.question}</p>
      {revealed ? (
        <p className="text-xl text-primary font-bold">{riddle.answer}</p>
      ) : (
        <button onClick={() => setRevealed(true)} className="btn-secondary flex items-center gap-2 mx-auto text-sm py-2">
          <Eye size={16} /> {t('mini.revealAnswer')}
        </button>
      )}
      <button onClick={next} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mx-auto">
        <RotateCcw size={14} /> {t('mini.nextRiddle')}
      </button>
    </div>
  );
}

export default function MiniGamesPage() {
  const { t } = useLanguage();

  const games = [
    { titleKey: 'mini.quickClick', component: QuickClickGame },
    { titleKey: 'mini.wordSearch', component: WordSearchGame },
    { titleKey: 'mini.riddle', component: RiddleGame },
  ];

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold text-center text-primary">{t('mini.title')}</h1>

      {games.map((game, i) => {
        const GameComponent = game.component;
        return (
          <div key={i}>
            <section className="card">
              <h2 className="text-xl font-bold text-primary mb-6 text-center">{t(game.titleKey)}</h2>
              <GameComponent />
            </section>
            {i < games.length - 1 && <AdBanner size="leaderboard" />}
          </div>
        );
      })}
    </div>
  );
}
