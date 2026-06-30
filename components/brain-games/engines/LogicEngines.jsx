'use client';

import { useState, useEffect } from 'react';
import Num from '@/components/ui/Num';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { shuffle } from '@/lib/brain-games/helpers';
import {
  useRoundSession, RoundHeader, OptionGrid, TextAnswer, Feedback, SessionDone, PlayAgain, normalizeAnswer,
} from '../shared';

export function McqQuiz({ items, rounds }) {
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;
  if (!current) return null;

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-lg font-medium text-center">{current.question}</p>
      <OptionGrid
        options={current.options}
        disabled={!!feedback}
        onPick={(i) => {
          const ok = i === current.correct;
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function StoryMcq({ stories }) {
  const { t } = useLanguage();
  const [storyIdx, setStoryIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);

  const story = stories[storyIdx];
  const question = story?.questions?.[qIdx];

  const totalQ = stories.reduce((n, s) => n + (s.questions?.length || 0), 0);
  const answered = stories.slice(0, storyIdx).reduce((n, s) => n + (s.questions?.length || 0), 0) + qIdx;

  const next = (ok) => {
    if (ok) setScore((s) => s + 1);
    const sq = story.questions.length;
    if (qIdx + 1 < sq) setQIdx((i) => i + 1);
    else if (storyIdx + 1 < stories.length) { setStoryIdx((i) => i + 1); setQIdx(0); }
    else setDone(true);
    setFeedback(null);
  };

  if (!stories.length) return <p className="text-center text-muted-foreground">{t('brain.unsupported')}</p>;
  if (done) return <SessionDone score={score} total={totalQ} onReset={() => { setStoryIdx(0); setQIdx(0); setScore(0); setDone(false); }} />;

  const options = shuffle([question.answer, question.answer + '?', '—', '...'].slice(0, 4));

  return (
    <div className="space-y-4">
      <RoundHeader index={answered} total={totalQ} score={score} />
      <p className="text-sm bg-secondary/50 p-4 rounded-xl">{story.text}</p>
      <p className="font-medium">{question.question}</p>
      <OptionGrid
        options={[question.answer]}
        disabled={!!feedback}
        onPick={() => {
          setFeedback('ok');
          setTimeout(() => next(true), 600);
        }}
      />
      <TextAnswer
        onSubmit={(val) => {
          const ok = normalizeAnswer(val) === normalizeAnswer(question.answer);
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => next(ok), 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function SequenceInput({ series, rounds }) {
  const { current, index, total, score, done, advance, reset } = useRoundSession(series, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;
  const shown = current?.slice(0, -1) || [];
  const answer = String(current?.[current.length - 1] ?? '');

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-2xl font-bold">{shown.join(', ')} , ?</p>
      <TextAnswer
        onSubmit={(val) => {
          const ok = normalizeAnswer(val) === normalizeAnswer(answer);
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function ShapePattern({ shapes, answer, pool }) {
  const { t } = useLanguage();
  const [feedback, setFeedback] = useState(null);
  const options = shuffle([answer, ...shuffle(pool.filter((s) => s !== answer)).slice(0, 3)]);

  return (
    <div className="space-y-4 text-center">
      <p className="text-3xl">{shapes.join(' ')} ?</p>
      <OptionGrid
        options={options}
        disabled={!!feedback}
        onPick={(i) => setFeedback(options[i] === answer ? 'ok' : 'bad')}
      />
      {feedback && <PlayAgain onReset={() => setFeedback(null)} />}
      {!feedback && feedback === null && <p className="text-sm text-muted-foreground">{t('brain.tapTarget')}</p>}
      <Feedback status={feedback} />
    </div>
  );
}

export function OddOneOut({ sets, rounds }) {
  const { current, index, total, score, done, advance, reset } = useRoundSession(sets, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <OptionGrid
        options={current.items}
        disabled={!!feedback}
        onPick={(i) => {
          const ok = i === current.oddIndex;
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function TextInputGame({ items, rounds }) {
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-lg text-center">{current.question}</p>
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

export function MatrixPick({ grid, answer }) {
  const [feedback, setFeedback] = useState(null);
  const flat = grid?.flat?.() || [];

  return (
    <div className="space-y-4 text-center">
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {flat.map((cell, i) => (
          <button
            key={i}
            onClick={() => setFeedback(cell === answer ? 'ok' : 'bad')}
            className="aspect-square rounded-lg border border-accent bg-cream-light text-xl"
          >
            {cell}
          </button>
        ))}
      </div>
      <Feedback status={feedback} />
      {feedback && <PlayAgain onReset={() => setFeedback(null)} />}
    </div>
  );
}

export function CipherInput({ code, shift, answer }) {
  const [feedback, setFeedback] = useState(null);
  return (
    <div className="space-y-4 text-center">
      <p className="text-2xl font-mono tracking-widest">{code}</p>
      <TextAnswer
        onSubmit={(val) => {
          const ok = normalizeAnswer(val) === normalizeAnswer(answer);
          setFeedback(ok ? 'ok' : 'bad');
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function OrderItems({ sequences, rounds }) {
  const { t } = useLanguage();
  const { current, index, total, score, done, advance, reset } = useRoundSession(sequences, rounds);
  const [order, setOrder] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => { setOrder(shuffle(current?.items || [])); setFeedback(null); }, [current]);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  const check = () => {
    const ok = order.every((v, i) => v === current.items[i]);
    setFeedback(ok ? 'ok' : 'bad');
    setTimeout(() => { setFeedback(null); advance(ok); }, 700);
  };

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <div className="flex flex-wrap gap-2 justify-center">
        {order.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === 0) return;
              const next = [...order];
              [next[i - 1], next[i]] = [next[i], next[i - 1]];
              setOrder(next);
            }}
            className="px-3 py-2 bg-secondary rounded-lg"
          >
            {item}
          </button>
        ))}
      </div>
      <button onClick={check} className="btn-primary mx-auto block">{t('brain.check')}</button>
      <Feedback status={feedback} />
    </div>
  );
}

export function TrueFalse({ items, rounds }) {
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);
  const { t } = useLanguage();

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-sm">{current.premise1}</p>
      <p className="text-sm">{current.premise2}</p>
      <p className="font-medium">{current.conclusion}</p>
      <div className="flex gap-3 justify-center">
        {[true, false].map((val) => (
          <button
            key={String(val)}
            onClick={() => {
              const ok = val === current.valid;
              setFeedback(ok ? 'ok' : 'bad');
              setTimeout(() => { setFeedback(null); advance(ok); }, 700);
            }}
            className="btn-secondary px-6"
          >
            {val ? t('common.correct') : t('common.wrong')}
          </button>
        ))}
      </div>
      <Feedback status={feedback} />
    </div>
  );
}

export function ShapeSort({ attributes, pool, rounds }) {
  const items = pool.map((shape) => ({ shape, attr: attributes[Math.floor(Math.random() * attributes.length)] }));
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);
  const target = attributes[0];

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-4xl">{current?.shape}</p>
      <OptionGrid
        options={attributes}
        disabled={!!feedback}
        onPick={(i) => {
          const ok = attributes[i] === current.attr;
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function SlidingPuzzle({ size }) {
  const n = size * size;
  const [tiles, setTiles] = useState([]);
  const [won, setWon] = useState(false);

  const init = () => {
    const arr = Array.from({ length: n - 1 }, (_, i) => i + 1);
    arr.push(0);
    setTiles(shuffle(arr));
    setWon(false);
  };

  useEffect(() => { init(); }, [size]);

  const move = (idx) => {
    const empty = tiles.indexOf(0);
    const valid = (empty === idx - 1 && idx % size !== 0) || (empty === idx + 1 && idx % size !== size - 1)
      || empty === idx - size || empty === idx + size;
    if (!valid) return;
    const next = [...tiles];
    [next[empty], next[idx]] = [next[idx], next[empty]];
    setTiles(next);
    if (next.every((v, i) => v === (i + 1) % n)) setWon(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-1 max-w-xs mx-auto" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {tiles.map((v, i) => (
          <button
            key={i}
            onClick={() => move(i)}
            className={`aspect-square rounded-lg text-xl font-bold ${v ? 'bg-primary text-cream-light' : 'bg-transparent'}`}
          >
            {v ? <Num value={v} /> : ''}
          </button>
        ))}
      </div>
      {won && <p className="text-center text-success font-semibold">🎉</p>}
      <PlayAgain onReset={init} />
    </div>
  );
}
