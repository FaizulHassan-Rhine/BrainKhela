'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Num from '@/components/ui/Num';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { shuffle } from '@/lib/brain-games/helpers';
import {
  useRoundSession, RoundHeader, OptionGrid, Feedback, SessionDone, PlayAgain,
} from '../shared';

export function ReactionTime({ triggerColor, waitColor, minDelay, maxDelay, rounds }) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState('idle');
  const [times, setTimes] = useState([]);
  const [round, setRound] = useState(0);
  const startRef = useRef(0);
  const timerRef = useRef(null);

  const startRound = () => {
    setPhase('wait');
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    timerRef.current = setTimeout(() => {
      setPhase('go');
      startRef.current = Date.now();
    }, delay);
  };

  useEffect(() => {
    startRound();
    return () => clearTimeout(timerRef.current);
  }, [round]);

  const click = () => {
    if (phase === 'wait') {
      clearTimeout(timerRef.current);
      setPhase('early');
      return;
    }
    if (phase !== 'go') return;
    const ms = Date.now() - startRef.current;
    setTimes((t) => [...t, ms]);
    if (round + 1 >= rounds) setPhase('done');
    else { setRound((r) => r + 1); setPhase('idle'); setTimeout(startRound, 500); }
  };

  const bg = phase === 'go' ? triggerColor : phase === 'wait' ? waitColor : '#e5e7eb';

  if (phase === 'done') {
    const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    return (
      <div className="text-center space-y-4">
        <p>Avg: <Num value={avg} /> ms</p>
        <PlayAgain onReset={() => { setRound(0); setTimes([]); setPhase('idle'); startRound(); }} />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <button
        onClick={click}
        className="w-full h-48 rounded-2xl text-xl font-bold transition-colors"
        style={{ background: bg }}
      >
        {phase === 'wait' && t('brain.wait')}
        {phase === 'go' && t('brain.clickNow')}
        {phase === 'early' && t('brain.tooEarly')}
        {phase === 'idle' && t('common.start')}
      </button>
      <p><Num value={round + 1} />/<Num value={rounds} /></p>
    </div>
  );
}

export function Stroop({ items, rounds }) {
  const { t } = useLanguage();
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);
  const colorOptions = [...new Set(items.map((i) => i.textColor))];

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-6 text-center">
      <p className="text-sm text-muted-foreground">{t('brain.stroopHint')}</p>
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-5xl font-bold" style={{ color: current.textColor }}>{current.word}</p>
      <OptionGrid
        options={colorOptions}
        disabled={!!feedback}
        onPick={(i) => {
          const ok = colorOptions[i] === current.textColor;
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function ColorMatch({ colors, rounds }) {
  const items = colors.map((c) => ({ ...c, options: shuffle(colors.map((x) => x.name)) }));
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <div className="w-24 h-24 rounded-full mx-auto" style={{ background: current.hex }} />
      <OptionGrid
        options={current.options}
        disabled={!!feedback}
        onPick={(i) => {
          const ok = current.options[i] === current.name;
          setFeedback(ok ? 'ok' : 'bad');
          setTimeout(() => { setFeedback(null); advance(ok); }, 700);
        }}
      />
      <Feedback status={feedback} />
    </div>
  );
}

export function QuickCount({ objects, countRange, displayMs, rounds }) {
  const items = Array.from({ length: rounds }, () => {
    const count = countRange[0] + Math.floor(Math.random() * (countRange[1] - countRange[0] + 1));
    const obj = objects[Math.floor(Math.random() * objects.length)];
    return { display: Array(count).fill(obj).join(' '), count };
  });
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [phase, setPhase] = useState('show');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setPhase('show');
    setFeedback(null);
    const tmr = setTimeout(() => setPhase('input'), displayMs);
    return () => clearTimeout(tmr);
  }, [current, displayMs]);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4 text-center">
      <RoundHeader index={index} total={total} score={score} />
      {phase === 'show' ? <p className="text-3xl">{current.display}</p> : (
        <OptionGrid
          options={[current.count, current.count + 1, current.count - 1, current.count + 2].map(String)}
          disabled={!!feedback}
          onPick={(i) => {
            const opts = [current.count, current.count + 1, current.count - 1, current.count + 2].map(String);
            const ok = opts[i] === String(current.count);
            setFeedback(ok ? 'ok' : 'bad');
            setTimeout(() => { setFeedback(null); advance(ok); }, 700);
          }}
        />
      )}
      <Feedback status={feedback} />
    </div>
  );
}

export function SpotDiff({ pairs, rounds }) {
  const { t } = useLanguage();
  const emojis = ['🌳', '🏠', '☀️', '🌙', '⭐', '🐕', '🚗', '🌸'];
  const { index, total, score, done, advance, reset } = useRoundSession(emojis, rounds);
  const [diffIdx, setDiffIdx] = useState(0);
  const [grid, setGrid] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const base = emojis[Math.floor(Math.random() * emojis.length)];
    const diff = emojis.filter((e) => e !== base)[0];
    const cells = Array(16).fill(base);
    const di = Math.floor(Math.random() * 16);
    cells[di] = diff;
    setGrid(cells);
    setDiffIdx(di);
    setFeedback(null);
  }, [index]);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-4">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-center text-sm text-muted-foreground">{t('brain.tapTarget')}</p>
      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
        {grid.map((cell, i) => (
          <button
            key={i}
            onClick={() => {
              const ok = i === diffIdx;
              setFeedback(ok ? 'ok' : 'bad');
              setTimeout(() => { setFeedback(null); advance(ok); }, 700);
            }}
            className="aspect-square text-2xl rounded-lg bg-cream-light border border-accent"
          >
            {cell}
          </button>
        ))}
      </div>
      <Feedback status={feedback} />
    </div>
  );
}

export function FocusTap({ target, distractors, rounds }) {
  const items = Array.from({ length: rounds }, () => (Math.random() > 0.5 ? target : distractors[Math.floor(Math.random() * distractors.length)]));
  const { current, index, total, score, done, advance, reset } = useRoundSession(items, rounds);
  const [feedback, setFeedback] = useState(null);

  if (done) return <SessionDone score={score} total={total} onReset={reset} />;

  return (
    <div className="space-y-6 text-center">
      <RoundHeader index={index} total={total} score={score} />
      <p className="text-6xl">{current}</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => {
            const ok = current === target;
            setFeedback(ok ? 'ok' : 'bad');
            setTimeout(() => { setFeedback(null); advance(ok); }, 500);
          }}
          className="btn-primary px-8"
        >
          TAP
        </button>
      </div>
      <Feedback status={feedback} />
    </div>
  );
}

export function WhackMole({ rows, cols, interval, sessionSec }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(-1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(sessionSec);
  const [playing, setPlaying] = useState(false);
  const cells = rows * cols;

  useEffect(() => {
    if (!playing) return;
    if (timeLeft <= 0) { setPlaying(false); return; }
    const tmr = setInterval(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearInterval(tmr);
  }, [playing, timeLeft]);

  useEffect(() => {
    if (!playing) return;
    const hop = setInterval(() => setActive(Math.floor(Math.random() * cells)), interval);
    return () => clearInterval(hop);
  }, [playing, cells, interval]);

  const whack = (i) => {
    if (i === active) { setScore((s) => s + 1); setActive(-1); }
  };

  if (!playing) {
    return (
      <div className="text-center space-y-4">
        {timeLeft === 0 && <p>{t('common.score')}: <Num value={score} /></p>}
        <button onClick={() => { setPlaying(true); setTimeLeft(sessionSec); setScore(0); }} className="btn-primary">{t('common.start')}</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-center">{t('common.time')}: <Num value={timeLeft} />s · <Num value={score} /></p>
      <div className="grid gap-2 max-w-xs mx-auto" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cells }, (_, i) => (
          <button
            key={i}
            onClick={() => whack(i)}
            className={`aspect-square rounded-xl ${active === i ? 'bg-primary text-cream-light text-2xl' : 'bg-cream-light border border-accent'}`}
          >
            {active === i ? '🐹' : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ObjectTrack({ objectCount, distractorCount, durationSec }) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState('watch');
  const [guess, setGuess] = useState(null);
  const target = objectCount;

  useEffect(() => {
    setPhase('watch');
    const tmr = setTimeout(() => setPhase('guess'), durationSec * 1000);
    return () => clearTimeout(tmr);
  }, [durationSec]);

  return (
    <div className="space-y-4 text-center">
      {phase === 'watch' ? (
        <p className="text-4xl">{'⭐'.repeat(objectCount)}{'🔴'.repeat(distractorCount)}</p>
      ) : (
        <>
          <p>{t('brain.remember')} ⭐?</p>
          <OptionGrid
            options={[target, target + 1, target - 1, target + 2].map(String)}
            onPick={(i) => {
              const opts = [target, target + 1, target - 1, target + 2].map(String);
              setGuess(opts[i] === String(target));
            }}
          />
          {guess !== null && <p className={guess ? 'text-success' : 'text-error'}>{guess ? '✓' : '✗'}</p>}
        </>
      )}
    </div>
  );
}

export function GoNogo({ goColor, nogoColor, goRatio, rounds }) {
  const sequence = useMemo(() => Array.from({ length: rounds }, () => Math.random() < goRatio), [rounds, goRatio]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const isGo = sequence[step];

  const tap = () => {
    if (isGo) setScore((s) => s + 1);
    setFeedback(isGo ? 'ok' : 'bad');
    setTimeout(() => {
      setFeedback(null);
      if (step + 1 >= rounds) return;
      setStep((s) => s + 1);
    }, 400);
  };

  const done = step >= rounds - 1 && feedback;

  if (done) {
    return (
      <div className="text-center space-y-4">
        <p><Num value={score} />/<Num value={rounds} /></p>
        <PlayAgain onReset={() => { setStep(0); setScore(0); }} />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <button
        onClick={tap}
        className="w-full h-40 rounded-2xl"
        style={{ background: isGo ? goColor : nogoColor }}
      />
      <p><Num value={step + 1} />/<Num value={rounds} /></p>
      <Feedback status={feedback} />
    </div>
  );
}
