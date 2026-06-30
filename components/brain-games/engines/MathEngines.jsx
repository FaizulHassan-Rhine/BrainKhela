'use client';

import { useState, useEffect, useRef } from 'react';
import Num from '@/components/ui/Num';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { shuffle } from '@/lib/brain-games/helpers';
import {
  useRoundSession, RoundHeader, TextAnswer, Feedback, SessionDone, PlayAgain, normalizeAnswer,
} from '../shared';
import { TextInputGame } from './LogicEngines';

export function TimedMath({ samples, timeLimit, operation, rounds }) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [score, setScore] = useState(0);
  const [q, setQ] = useState(null);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const genQ = () => {
    if (samples.length) {
      const s = samples[Math.floor(Math.random() * samples.length)];
      return { text: `${s.a} ${s.op || '+'} ${s.b} = ?`, answer: String(s.answer ?? eval(`${s.a}${s.op || '+'}${s.b}`)) };
    }
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const ops = operation === 'mix' ? ['+', '-', '×'] : [operation === '×' ? '×' : operation];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const ans = op === '+' ? a + b : op === '-' ? a - b : a * b;
    return { text: `${a} ${op} ${b} = ?`, answer: String(ans) };
  };

  useEffect(() => {
    setQ(genQ());
    setTimeLeft(timeLimit);
    setScore(0);
    setDone(false);
  }, [timeLimit]);

  useEffect(() => {
    if (done) return;
    if (timeLeft <= 0) { setDone(true); return; }
    const tmr = setInterval(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearInterval(tmr);
  }, [timeLeft, done]);

  if (done) {
    return (
      <div className="text-center space-y-4">
        <p className="text-xl font-bold">{t('common.score')}: <Num value={score} /></p>
        <PlayAgain onReset={() => { setDone(false); setTimeLeft(timeLimit); setScore(0); setQ(genQ()); }} />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <p>{t('common.time')}: <Num value={timeLeft} />s · {t('common.score')}: <Num value={score} /></p>
      <p className="text-2xl font-bold">{q?.text}</p>
      <TextAnswer
        onSubmit={(val) => {
          const ok = normalizeAnswer(val) === normalizeAnswer(q.answer);
          setFeedback(ok ? 'ok' : 'bad');
          if (ok) setScore((s) => s + 1);
          setQ(genQ());
          setTimeout(() => setFeedback(null), 400);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function FractionInput({ samples, rounds }) {
  const items = samples.map((s) => ({
    question: `${s.num}/${s.den} + ${s.num2}/${s.den2} = ?`,
    answer: String(s.answer),
  }));
  return <TextInputGame items={items} rounds={rounds} />;
}

export function GridSum({ grid, targetSum }) {
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const flat = grid?.flat?.() || [];
  const sum = selected.reduce((n, i) => n + Number(flat[i]), 0);

  const toggle = (i) => {
    setSelected((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);
  };

  const check = () => setFeedback(sum === targetSum ? 'ok' : 'bad');

  return (
    <div className="space-y-4 text-center">
      <p className="text-muted-foreground">Target: <Num value={targetSum} /></p>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {flat.map((cell, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`aspect-square rounded-lg border ${selected.includes(i) ? 'bg-primary text-cream-light' : 'bg-cream-light border-accent'}`}
          >
            <Num value={cell} />
          </button>
        ))}
      </div>
      <button onClick={check} className="btn-primary mx-auto block">Check</button>
      <Feedback status={feedback} />
    </div>
  );
}

export function GuessNumber({ min, max, maxAttempts }) {
  const { t } = useLanguage();
  const [target] = useState(() => Math.floor(Math.random() * (max - min + 1)) + min);
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  const [won, setWon] = useState(false);

  const guess = (val) => {
    const n = Number(val);
    setAttempts((a) => a + 1);
    if (n === target) setWon(true);
    else if (n < target) setHint('↑');
    else setHint('↓');
  };

  return (
    <div className="space-y-4 text-center">
      <p><Num value={min} /> – <Num value={max} /> · {t('common.moves')}: <Num value={attempts} />/<Num value={maxAttempts} /></p>
      {won ? <p className="text-success font-bold">🎉 <Num value={target} /></p> : (
        <>
          <p className="text-2xl">{hint}</p>
          {attempts < maxAttempts && <TextAnswer onSubmit={guess} />}
        </>
      )}
    </div>
  );
}

export function EquationInput({ items, rounds }) {
  return <TextInputGame items={items.map((i) => ({ question: i.equation, answer: String(i.answer) }))} rounds={rounds} />;
}
