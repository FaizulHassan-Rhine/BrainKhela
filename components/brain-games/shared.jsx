'use client';

import { useState, useMemo, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import Num from '@/components/ui/Num';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { shuffle } from '@/lib/brain-games/helpers';

export function useRoundSession(items = [], rounds = 5) {
  const session = useMemo(() => {
    if (!items.length) return [];
    const shuffled = shuffle(items);
    const out = [];
    for (let i = 0; i < rounds; i++) out.push(shuffled[i % shuffled.length]);
    return out;
  }, [items, rounds]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = session[index] ?? null;
  const total = session.length;

  const advance = useCallback((correct) => {
    if (correct) setScore((s) => s + 1);
    if (index + 1 >= total) setDone(true);
    else setIndex((i) => i + 1);
  }, [index, total]);

  const reset = useCallback(() => {
    setIndex(0);
    setScore(0);
    setDone(false);
  }, []);

  return { session, current, index, total, score, done, advance, reset };
}

export function RoundHeader({ index, total, score }) {
  const { t } = useLanguage();
  return (
    <div className="flex justify-between text-sm text-muted-foreground mb-4">
      <span>{t('common.round')} <Num value={index + 1} />/<Num value={total} /></span>
      <span>{t('common.score')}: <Num value={score} /></span>
    </div>
  );
}

export function OptionGrid({ options, onPick, disabled }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => onPick(i)}
          className="py-3 px-4 rounded-xl border-2 border-accent bg-cream-light hover:border-primary text-left disabled:opacity-60"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function TextAnswer({ onSubmit, placeholder }) {
  const { t } = useLanguage();
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2 max-w-md mx-auto">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || t('common.typeHere')}
        className="flex-1 px-4 py-2 rounded-lg border border-accent bg-white"
      />
      <button type="submit" className="btn-primary px-4 py-2 text-sm">{t('brain.check')}</button>
    </form>
  );
}

export function Feedback({ status }) {
  const { t } = useLanguage();
  if (!status) return null;
  return (
    <p className={`text-center font-semibold ${status === 'ok' ? 'text-success' : 'text-error'}`}>
      {status === 'ok' ? t('brain.correctMsg') : t('brain.wrongMsg')}
    </p>
  );
}

export function SessionDone({ score, total, onReset }) {
  const { t } = useLanguage();
  return (
    <div className="text-center space-y-4">
      <p className="text-xl font-bold text-primary">{t('brain.sessionDone')}</p>
      <p className="text-muted-foreground">
        {t('common.score')}: <Num value={score} />/<Num value={total} />
      </p>
      <PlayAgain onReset={onReset} />
    </div>
  );
}

export function PlayAgain({ onReset }) {
  const { t } = useLanguage();
  return (
    <button onClick={onReset} className="btn-secondary flex items-center gap-2 mx-auto text-sm py-2 px-4">
      <RotateCcw size={16} /> {t('common.playAgain')}
    </button>
  );
}

export function normalizeAnswer(s) {
  return String(s).trim().toLowerCase().replace(/\s+/g, '');
}
