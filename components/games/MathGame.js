'use client';

import { useState, useEffect, useCallback } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import ScoreCard from '@/components/ui/ScoreCard';
import Timer from '@/components/ui/Timer';
import { generateMathProblem, toBanglaNumber } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

const DIFFICULTY_MULTIPLIER = { easy: 1, medium: 2, hard: 3 };
const DIFFICULTY_LABELS = { easy: 'সহজ', medium: 'মাঝারি', hard: 'কঠিন' };
const OP_LABELS = { add: 'যোগ (+)', sub: 'বিয়োগ (-)', mul: 'গুণ (×)', div: 'ভাগ (÷)', all: 'সব' };
const OP_MAP = { add: '+', sub: '-', mul: '×', div: '÷' };

export default function MathGame() {
  const [difficulty, setDifficulty] = useState('easy');
  const [operation, setOperation] = useState('all');
  const [problem, setProblem] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const TOTAL_ROUNDS = 10;

  const newProblem = useCallback(() => {
    const op = operation === 'all' ? 'all' : operation;
    const opChar = op === 'all' ? 'all' : OP_MAP[op];
    setProblem(generateMathProblem(difficulty, opChar === 'all' ? 'all' : op));
    setInput('');
    setFeedback(null);
  }, [difficulty, operation]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setRound(0);
    setTimeLeft(60);
    setStarted(true);
    setFinished(false);
    newProblem();
  };

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, finished, timeLeft]);

  const submitAnswer = () => {
    if (!problem || feedback !== null) return;
    const userAnswer = parseInt(input, 10);
    const correct = userAnswer === problem.answer;
    setFeedback(correct ? 'correct' : 'wrong');

    if (correct) {
      const points = DIFFICULTY_MULTIPLIER[difficulty];
      setScore((s) => s + points);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      const nextRound = round + 1;
      if (nextRound >= TOTAL_ROUNDS) {
        setFinished(true);
      } else {
        setRound(nextRound);
        newProblem();
      }
    }, 800);
  };

  const handleKey = (key) => {
    if (key === 'clear') setInput('');
    else if (key === 'submit') submitAnswer();
    else setInput((prev) => prev + key);
  };

  if (!started) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="card space-y-4">
          <h2 className="font-semibold">কঠিনতা</h2>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`px-4 py-2 rounded-lg text-sm ${difficulty === key ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <h2 className="font-semibold">অপারেশন</h2>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(OP_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setOperation(key)}
                className={`px-4 py-2 rounded-lg text-sm ${operation === key ? 'bg-secondary text-white' : 'bg-gray-100'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <button onClick={startGame} className="btn-primary w-full">খেলা শুরু করো</button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-primary">গেম শেষ!</h2>
        <ScoreCard label="মোট স্কোর" value={toBanglaNumber(score)} color="text-accent" />
        <button onClick={startGame} className="btn-primary flex items-center gap-2 mx-auto">
          <RotateCcw size={18} /> আবার খেলো
        </button>
        <AdBanner size="leaderboard" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <ScoreCard label="স্কোর" value={toBanglaNumber(score)} />
        <ScoreCard label="স্ট্রিক" value={toBanglaNumber(streak)} color="text-accent" />
        <div className="card text-center">
          <p className="text-sm text-gray-500">সময়</p>
          <Timer seconds={timeLeft} total={60} size="sm" />
        </div>
      </div>

      <div className="card text-center">
        <p className="text-sm text-gray-500 mb-2">
          রাউন্ড {toBanglaNumber(round + 1)}/{toBanglaNumber(TOTAL_ROUNDS)}
        </p>
        {problem && (
          <div className={`text-5xl font-bold my-6 ${feedback === 'correct' ? 'text-success' : feedback === 'wrong' ? 'text-error' : 'text-primary'}`}>
            {toBanglaNumber(problem.a)} {problem.operation} {toBanglaNumber(problem.b)} = ?
          </div>
        )}
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-3xl text-center w-full border-2 border-gray-200 rounded-xl p-3 focus:border-primary focus:outline-none"
          placeholder="?"
          readOnly
        />
        {feedback === 'wrong' && problem && (
          <p className="text-error text-sm mt-2">সঠিক উত্তর: {toBanglaNumber(problem.answer)}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'submit'].map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className={`py-4 rounded-xl text-xl font-semibold transition-colors ${
              key === 'submit' ? 'bg-primary text-white col-span-1' :
              key === 'clear' ? 'bg-gray-200 text-gray-700' :
              'bg-white border border-gray-200 hover:bg-purple-50'
            }`}
          >
            {key === 'clear' ? 'C' : key === 'submit' ? '=' : toBanglaNumber(key)}
          </button>
        ))}
      </div>

      <AdBanner size="leaderboard" />
    </div>
  );
}
