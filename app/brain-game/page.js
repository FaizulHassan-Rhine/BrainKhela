'use client';

import { useState, useEffect, useCallback } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import { brainGamesData } from '@/data/brain-games';
import { getLocalStorage, setLocalStorage, toBanglaNumber } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

function MemoryCardGame({ difficulty }) {
  const pairCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const emojis = brainGamesData.memoryCards.emojis.slice(0, pairCount);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const init = useCallback(() => {
    const deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(deck.map((emoji, i) => ({ id: i, emoji })));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  }, [emojis]);

  useEffect(() => { init(); }, [init]);

  const handleClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          setWon(true);
          const key = `memory-${difficulty}`;
          const best = getLocalStorage(key, 999);
          if (moves + 1 < best) setLocalStorage(key, moves + 1);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const cols = pairCount <= 4 ? 'grid-cols-4' : pairCount <= 6 ? 'grid-cols-4' : 'grid-cols-4';

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">মুভ: {toBanglaNumber(moves)}</p>
      <div className={`grid ${cols} gap-3 max-w-md mx-auto`}>
        {cards.map((card) => {
          const isVisible = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <button
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all ${
                isVisible ? 'bg-purple-100 border-2 border-primary' : 'bg-primary text-white hover:bg-purple-700'
              }`}
            >
              {isVisible ? card.emoji : '?'}
            </button>
          );
        })}
      </div>
      {won && <p className="text-center text-success font-semibold">🎉 জয়! {toBanglaNumber(moves)} মুভে সম্পন্ন!</p>}
      <button onClick={init} className="btn-secondary flex items-center gap-2 mx-auto text-sm py-2 px-4">
        <RotateCcw size={16} /> আবার খেলো
      </button>
    </div>
  );
}

function NumberMemoryGame({ difficulty }) {
  const config = brainGamesData.numberMemory;
  const digits = config.digits[difficulty];
  const displayTime = config.displayTime[difficulty];
  const [number, setNumber] = useState('');
  const [phase, setPhase] = useState('ready');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const startRound = () => {
    const num = String(Math.floor(Math.random() * Math.pow(10, digits))).padStart(digits, '0');
    setNumber(num);
    setPhase('show');
    setInput('');
    setTimeout(() => setPhase('input'), displayTime);
  };

  const checkAnswer = () => {
    if (input === number) {
      setScore((s) => s + 1);
      const key = `number-memory-${difficulty}`;
      const best = getLocalStorage(key, 0);
      if (score + 1 > best) setLocalStorage(key, score + 1);
    }
    setRound((r) => r + 1);
    if (round + 1 >= 5) setPhase('done');
    else startRound();
  };

  if (phase === 'ready') {
    return (
      <button onClick={startRound} className="btn-primary mx-auto block">শুরু করো</button>
    );
  }

  if (phase === 'done') {
    return (
      <div className="text-center space-y-4">
        <p className="text-2xl font-bold text-primary">স্কোর: {toBanglaNumber(score)}/৫</p>
        <button onClick={() => { setRound(0); setScore(0); setPhase('ready'); }} className="btn-primary">আবার খেলো</button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      {phase === 'show' ? (
        <p className="text-5xl font-bold text-primary tracking-widest">{number}</p>
      ) : (
        <>
          <p className="text-gray-500">সংখ্যাটি মনে করে লেখো</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-3xl text-center border-2 border-gray-200 rounded-xl p-3 w-full max-w-xs mx-auto focus:border-primary focus:outline-none"
            maxLength={digits}
          />
          <button onClick={checkAnswer} className="btn-primary">জমা দাও</button>
        </>
      )}
      <p className="text-sm text-gray-500">রাউন্ড {toBanglaNumber(round + 1)}/৫</p>
    </div>
  );
}

function StroopGame({ difficulty }) {
  const { colors } = brainGamesData.stroop;
  const totalRounds = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);

  const newRound = useCallback(() => {
    const wordColor = colors[Math.floor(Math.random() * colors.length)];
    const inkColors = colors.filter((c) => c.value !== wordColor.value || Math.random() > 0.5);
    const inkColor = inkColors[Math.floor(Math.random() * inkColors.length)];
    setCurrent({ word: wordColor.name, ink: inkColor, correct: inkColor.name });
    setFeedback(null);
  }, [colors]);

  useEffect(() => { newRound(); }, [newRound]);

  const handleAnswer = (colorName) => {
    if (feedback) return;
    const correct = colorName === current.correct;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (round + 1 >= totalRounds) {
        setDone(true);
        const key = `stroop-${difficulty}`;
        const best = getLocalStorage(key, 0);
        if (score + (correct ? 1 : 0) > best) setLocalStorage(key, score + (correct ? 1 : 0));
      } else {
        setRound((r) => r + 1);
        newRound();
      }
    }, 600);
  };

  if (done) {
    return (
      <div className="text-center space-y-4">
        <p className="text-2xl font-bold text-primary">স্কোর: {toBanglaNumber(score)}/{toBanglaNumber(totalRounds)}</p>
        <button onClick={() => { setRound(0); setScore(0); setDone(false); newRound(); }} className="btn-primary">আবার খেলো</button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <p className="text-sm text-gray-500">শব্দের <strong>রঙ</strong> বেছে নাও (অর্থ নয়)</p>
      {current && (
        <p className="text-5xl font-bold" style={{ color: current.ink.hex }}>{current.word}</p>
      )}
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => handleAnswer(c.name)}
            className="py-3 rounded-xl border-2 border-gray-200 hover:border-primary font-medium"
            style={{ color: c.hex }}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">{toBanglaNumber(round + 1)}/{toBanglaNumber(totalRounds)}</p>
    </div>
  );
}

const GAMES = [
  { key: 'memory', title: 'মেমোরি কার্ড', component: MemoryCardGame },
  { key: 'number', title: 'সংখ্যা মনে রাখো', component: NumberMemoryGame },
  { key: 'stroop', title: 'রঙ চেনো', component: StroopGame },
];

const DIFFICULTIES = [
  { key: 'easy', label: 'সহজ' },
  { key: 'medium', label: 'মাঝারি' },
  { key: 'hard', label: 'কঠিন' },
];

export default function BrainGamePage() {
  const [difficulty, setDifficulty] = useState('medium');

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">ব্রেইন গেম</h1>
        <div className="flex gap-2 justify-center flex-wrap">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.key}
              onClick={() => setDifficulty(d.key)}
              className={`px-4 py-2 rounded-lg text-sm ${difficulty === d.key ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {GAMES.map((game) => {
        const GameComponent = game.component;
        return (
          <section key={game.key} className="card">
            <h2 className="text-xl font-bold text-primary mb-6 text-center">{game.title}</h2>
            <GameComponent difficulty={difficulty} />
            <AdBanner size="rectangle" />
          </section>
        );
      })}
    </div>
  );
}
