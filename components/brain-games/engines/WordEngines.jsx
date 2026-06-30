'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { shuffle } from '@/lib/brain-games/helpers';
import {
  useRoundSession, RoundHeader, OptionGrid, TextAnswer, Feedback, SessionDone, PlayAgain, normalizeAnswer,
} from '../shared';

function buildWordSearchGrid(words, rows, cols) {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
  const word = words[0] || 'গেম';
  const chars = word.split('');
  const r = Math.floor(Math.random() * rows);
  const c = Math.floor(Math.random() * Math.max(1, cols - chars.length));
  chars.forEach((ch, i) => { grid[r][c + i] = ch; });
  const filler = 'অআইঈউঊএঐওঔকখগঘচছজঝটঠডঢতথদধনপফবভমযরলশষসহ';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!grid[i][j]) grid[i][j] = filler[Math.floor(Math.random() * filler.length)];
    }
  }
  return { grid, target: word };
}

export function WordScramble({ words, rounds }) {
  const items = words.map((w) => ({ scrambled: shuffle(w.split('')).join(''), word: w }));
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-3xl tracking-widest">{current.scrambled}</p>
      <TextAnswer
        onSubmit={(val) => {
          const ok = normalizeAnswer(val) === normalizeAnswer(current.word);
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function WordSearch({ words, rows, cols }) {
  const { t } = useLanguage();
  const { grid, target } = useMemo(() => buildWordSearchGrid(words, rows, cols), [words, rows, cols]);
  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState(false);

  const handleCell = (ri, ci) => {
    const key = `${ri}-${ci}`;
    const next = selected.includes(key) ? selected.filter((s) => s !== key) : [...selected, key];
    setSelected(next);
    const word = next.map((k) => {
      const [r, c] = k.split('-').map(Number);
      return grid[r][c];
    }).join('');
    if (word === target || word.split('').reverse().join('') === target) setFound(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-center">{t('mini.findWord')}: <strong>{target}</strong></p>
      <div className="grid gap-1 max-w-sm mx-auto" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {grid.map((row, ri) =>
          row.map((cell, ci) => (
            <button
              key={`${ri}-${ci}`}
              onClick={() => handleCell(ri, ci)}
              className={`aspect-square rounded text-sm font-bold ${
                selected.includes(`${ri}-${ci}`) ? 'bg-primary text-cream-light' : found ? 'bg-success text-white' : 'bg-cream-light border border-accent'
              }`}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {found && <p className="text-center text-success font-semibold">🎉 {t('mini.foundWord')}</p>}
    </div>
  );
}

export function SentenceBlank({ items, rounds }) {
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-lg text-center">{current.sentence}</p>
      <TextAnswer
        onSubmit={(val) => {
          const ok = normalizeAnswer(val) === normalizeAnswer(current.answer);
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function WordChain({ starters, rounds }) {
  const { t } = useLanguage();
  const { current, index, total, score, done, advance, reset } = useRoundSession(starters, rounds);
  const [chain, setChain] = useState([]);
  const [input, setInput] = useState('');

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  const add = () => {
    if (!input.trim()) return;
    const last = chain.length ? chain[chain.length - 1] : current;
    const ok = input.trim().charAt(0) === last.trim().slice(-1);
    if (ok) {
      setChain((c) => [...c, input.trim()]);
      setInput('');
      if (chain.length + 1 >= 3) advance(true);
    } else advance(false);
  };

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <p>{t('brain.remember')}: <strong>{current}</strong></p>
      <p className="text-sm">{chain.join(' → ')}</p>
      <form onSubmit={(e) => { e.preventDefault(); add(); }} className="flex gap-2 max-w-md mx-auto">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-accent" />
        <button type="submit" className="btn-primary px-4">{t('brain.check')}</button>
      </form>
    </div>
  );
}

export function Hangman({ words, rounds }) {
  const { current, index, total, score, done, advance, reset } = useRoundSession(words, rounds);
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);
  const maxWrong = 6;

  const letters = current?.split('') || [];
  const won = letters.length > 0 && letters.every((ch) => guessed.includes(ch) || ch === ' ');
  const lost = wrong >= maxWrong;

  useEffect(() => {
    setGuessed([]);
    setWrong(0);
  }, [current]);

  useEffect(() => {
    if (won) advance(true);
    else if (lost) advance(false);
  }, [won, lost, advance]);

  const guess = (ch) => {
    if (guessed.includes(ch) || won || lost) return;
    setGuessed((g) => [...g, ch]);
    if (!letters.includes(ch)) setWrong((w) => w + 1);
  };

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-2xl tracking-widest">{letters.map((ch) => (guessed.includes(ch) || ch === ' ' ? ch : '_')).join(' ')}</p>
      <p className="text-error">✗ {wrong}/{maxWrong}</p>
      <div className="flex flex-wrap gap-1 justify-center max-w-md mx-auto">
        {'অআইঈউঊএঐওঔকখগঘচছজঝটঠডঢতথদধনপফবভমযরলশষসহabcdefghijklmnopqrstuvwxyz'.split('').map((ch) => (
          <button key={ch} onClick={() => guess(ch)} disabled={guessed.includes(ch)} className="w-8 h-8 text-sm rounded border border-accent disabled:opacity-40">
            {ch}
          </button>
        ))}
      </div>
    </div>
  );
}
