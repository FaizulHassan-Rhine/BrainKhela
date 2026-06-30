'use client';

import { useState, useEffect, useCallback } from 'react';
import Num from '@/components/ui/Num';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { shuffle } from '@/lib/brain-games/helpers';
import {
  useRoundSession, RoundHeader, OptionGrid, TextAnswer, Feedback, SessionDone, PlayAgain, normalizeAnswer,
} from '../shared';

export function MemoryPairs({ items, tileType = 'emoji', cols = 4 }) {
  const { t } = useLanguage();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const init = useCallback(() => {
    const deck = shuffle([...items, ...items]);
    setCards(deck.map((val, i) => ({ id: i, val })));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  }, [items]);

  useEffect(() => { init(); }, [init]);

  const handleClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (cards[a].val === cards[b].val) {
        const m = [...matched, a, b];
        setMatched(m);
        setFlipped([]);
        if (m.length === cards.length) setWon(true);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  const renderTile = (val, visible) => {
    if (!visible) return '?';
    if (tileType === 'color') return <span className="w-8 h-8 rounded-full inline-block" style={{ background: val }} />;
    if (tileType === 'text') return <Num value={val} />;
    return val;
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-center text-muted-foreground">{t('common.moves')}: <Num value={moves} /></p>
      <div className={`grid gap-3 max-w-md mx-auto`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {cards.map((c) => {
          const visible = flipped.includes(c.id) || matched.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => handleClick(c.id)}
              className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all ${
                visible ? 'bg-secondary border-2 border-primary/40' : 'bg-primary text-cream-light'
              }`}
            >
              {renderTile(c.val, visible)}
            </button>
          );
        })}
      </div>
      {won && <p className="text-center text-success font-semibold">🎉 {t('brain.win')}</p>}
      <PlayAgain onReset={init} />
    </div>
  );
}

export function RecallNumber({ digits, displayMs, rounds, samples }) {
  const { t } = useLanguage();
  const pool = samples.length ? samples : Array.from({ length: rounds }, () =>
    String(Math.floor(Math.random() * Math.pow(10, digits))).padStart(digits, '0')
  );
  const { current, index, total, score, done, advance, reset } = useRoundSession(pool, rounds);
  const [phase, setPhase] = useState('show');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!current || done) return;
    setPhase('show');
    setFeedback(null);
    const tmr = setTimeout(() => setPhase('input'), displayMs);
    return () => clearTimeout(tmr);
  }, [current, displayMs, done]);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  const check = (val) => {
    const ok = normalizeAnswer(val) === normalizeAnswer(current);
    setFeedback(ok ? 'ok' : 'bad');
    setTimeout(() => advance(ok), 800);
  };

  return (
    <div className="space-y-6 text-center">
      <RoundHeader index={index} total={total} score={score} />
      {phase === 'show' ? (
        <p className="text-4xl font-bold tracking-widest"><Num value={current} /></p>
      ) : (
        <>
          <p className="text-muted-foreground">{t('brain.typeNumber')}</p>
          <TextAnswer onSubmit={check} placeholder={t('brain.typeNumber')} />
        </>
      )}
      <Feedback status={feedback} />
    </div>
  );
}

export function RecallWords({ wordLists, displayMs, rounds }) {
  const { t } = useLanguage();
  const lists = wordLists.length ? wordLists : [['কলম', 'বই', 'মেজ']];
  const { current, index, total, score, done, advance, reset } = useRoundSession(lists, rounds);
  const [phase, setPhase] = useState('show');
  const [feedback, setFeedback] = useState(null);
  const [pick, setPick] = useState(null);
  const [quiz, setQuiz] = useState({ quizWord: '', options: [], wasInList: true });

  useEffect(() => {
    if (!current || done) return;
    setPhase('show');
    setFeedback(null);
    setPick(null);
    const tmr = setTimeout(() => {
      const quizWord = current[Math.floor(Math.random() * current.length)];
      const wasInList = Math.random() > 0.4;
      const options = wasInList
        ? [quizWord, ...shuffle(current.filter((w) => w !== quizWord)).slice(0, 3)]
        : shuffle([quizWord, ...current]).slice(0, 4);
      setQuiz({ quizWord, options: shuffle(options), wasInList });
      setPhase('quiz');
    }, displayMs);
    return () => clearTimeout(tmr);
  }, [current, displayMs, done]);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  const answer = (word) => {
    const ok = quiz.wasInList ? word === quiz.quizWord : !current.includes(word);
    setFeedback(ok ? 'ok' : 'bad');
    setPick(word);
    setTimeout(() => advance(ok), 800);
  };

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      {phase === 'show' ? (
        <div className="flex flex-wrap gap-2 justify-center">
          {current.map((w) => <span key={w} className="px-3 py-1 bg-secondary rounded-lg">{w}</span>)}
        </div>
      ) : (
        <>
          <p className="text-center">{t('brain.remember')}: <strong>{quiz.quizWord}</strong> — {t('common.correct')}?</p>
          <OptionGrid options={quiz.options} onPick={(i) => answer(quiz.options[i])} disabled={!!pick} />
        </>
      )}
      <Feedback status={feedback} />
    </div>
  );
}

export function Simon({ colors, startLength, maxLength }) {
  const { t } = useLanguage();
  const [sequence, setSequence] = useState([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [phase, setPhase] = useState('watch');
  const [active, setActive] = useState(-1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const start = useCallback(() => {
    const first = shuffle(colors.map((_, i) => i)).slice(0, startLength);
    setSequence(first);
    setPlayerStep(0);
    setPhase('watch');
    setGameOver(false);
    setScore(0);
  }, [colors, startLength]);

  useEffect(() => { start(); }, [start]);

  useEffect(() => {
    if (phase !== 'watch' || !sequence.length) return;
    let i = 0;
    const play = () => {
      if (i >= sequence.length) { setPhase('play'); setActive(-1); return; }
      setActive(sequence[i]);
      setTimeout(() => { setActive(-1); i++; setTimeout(play, 200); }, 500);
    };
    const tmr = setTimeout(play, 400);
    return () => clearTimeout(tmr);
  }, [phase, sequence]);

  const tap = (idx) => {
    if (phase !== 'play' || gameOver) return;
    if (sequence[playerStep] !== idx) {
      setGameOver(true);
      return;
    }
    const next = playerStep + 1;
    if (next >= sequence.length) {
      setScore(sequence.length);
      const extended = [...sequence, Math.floor(Math.random() * colors.length)];
      if (extended.length > maxLength) setGameOver(true);
      else {
        setSequence(extended);
        setPlayerStep(0);
        setPhase('watch');
      }
    } else setPlayerStep(next);
  };

  return (
    <div className="space-y-4 text-center">
      <p>{t('common.score')}: <Num value={score} /></p>
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            className={`h-16 rounded-xl border-2 transition-transform ${active === i ? 'scale-105 border-primary' : 'border-transparent'}`}
            style={{ background: c.hex }}
          >
            {c.label}
          </button>
        ))}
      </div>
      {gameOver && (
        <>
          <p className="text-error font-semibold">{t('common.gameOver')}</p>
          <PlayAgain onReset={start} />
        </>
      )}
    </div>
  );
}

export function GridPosition({ rows, cols, highlightCount, displayMs, rounds }) {
  const cells = Array.from({ length: rows * cols }, (_, i) => i);
  const { index, total, score, done, advance, reset } = useRoundSession(cells, rounds);
  const [highlighted, setHighlighted] = useState([]);
  const [phase, setPhase] = useState('show');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const picked = shuffle(cells).slice(0, highlightCount);
    setHighlighted(picked);
    setPhase('show');
    setFeedback(null);
    const tmr = setTimeout(() => setPhase('pick'), displayMs);
    return () => clearTimeout(tmr);
  }, [index, highlightCount, displayMs, cells]);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  const pick = (cell) => {
    const ok = highlighted.includes(cell);
    setFeedback(ok ? 'ok' : 'bad');
    setTimeout(() => advance(ok), 700);
  };

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <div className="grid gap-1 max-w-xs mx-auto" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {cells.map((c) => (
          <button
            key={c}
            onClick={() => phase === 'pick' && pick(c)}
            className={`aspect-square rounded-lg border ${
              phase === 'show' && highlighted.includes(c) ? 'bg-primary text-cream-light' : 'bg-cream-light border-accent'
            }`}
          />
        ))}
      </div>
      <Feedback status={feedback} />
    </div>
  );
}

export function FaceName({ names, avatars, rounds }) {
  const items = names.map((name, i) => ({ name, avatar: avatars[i] || '👤' }));
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [phase, setPhase] = useState('show');
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!current) return;
    setPhase('show');
    setFeedback(null);
    const wrong = shuffle(names.filter((n) => n !== current.name)).slice(0, 3);
    setOptions(shuffle([current.name, ...wrong]));
    const tmr = setTimeout(() => setPhase('quiz'), 2000);
    return () => clearTimeout(tmr);
  }, [current, names]);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-6xl">{current?.avatar}</p>
      {phase === 'quiz' && (
        <OptionGrid
          options={options}
          disabled={!!feedback}
          onPick={(i) => {
            const ok = options[i] === current.name;
            setFeedback(ok ? 'ok' : 'bad');
            setTimeout(() => advance(ok), 700);
          }}
        />
      )}
      <Feedback status={feedback} />
    </div>
  );
}

export function NBack({ n, pool, length }) {
  const { t } = useLanguage();
  const [sequence] = useState(() => Array.from({ length }, () => shuffle(pool)[0]));
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const current = sequence[step];
  const isMatch = step >= n && sequence[step] === sequence[step - n];

  const respond = (match) => {
    if (step >= length) return;
    const ok = match === isMatch;
    if (ok) setScore((s) => s + 1);
    setFeedback(ok ? 'ok' : 'bad');
    setTimeout(() => {
      setFeedback(null);
      if (step + 1 >= length) setDone(true);
      else setStep((s) => s + 1);
    }, 500);
  };

  if (done) {
    return (
      <div className="text-center space-y-4">
        <p>{t('common.score')}: <Num value={score} />/<Num value={length - n} /></p>
        <PlayAgain onReset={() => { setStep(0); setScore(0); setDone(false); }} />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <p className="text-5xl">{current}</p>
      <p className="text-sm text-muted-foreground">{n}-back · <Num value={step + 1} />/<Num value={length} /></p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => respond(true)} className="btn-primary px-6">{t('common.correct')}</button>
        <button onClick={() => respond(false)} className="btn-secondary px-6">{t('common.wrong')}</button>
      </div>
      <Feedback status={feedback} />
    </div>
  );
}
