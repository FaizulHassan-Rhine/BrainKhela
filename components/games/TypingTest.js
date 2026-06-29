'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import ScoreCard from '@/components/ui/ScoreCard';
import Timer from '@/components/ui/Timer';
import { calculateWPM, calculateCPM, calculateAccuracy, toBanglaNumber, shareText } from '@/lib/utils';
import { Share2, RotateCcw } from 'lucide-react';

export default function TypingTest({
  texts,
  language = 'bangla',
  showCPM = false,
  showDifficulty = false,
}) {
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState('all');
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, cpm: 0, correct: 0, wrong: 0 });
  const inputRef = useRef(null);
  const startTimeRef = useRef(null);

  const pickText = useCallback(() => {
    let pool = texts;
    if (showDifficulty && difficulty !== 'all') {
      pool = texts.filter((t) => t.difficulty === difficulty);
    }
    if (pool.length === 0) pool = texts;
    return pool[Math.floor(Math.random() * pool.length)].text;
  }, [texts, difficulty, showDifficulty]);

  const reset = useCallback(() => {
    setText(pickText());
    setInput('');
    setTimeLeft(duration);
    setStarted(false);
    setFinished(false);
    setStats({ wpm: 0, accuracy: 0, cpm: 0, correct: 0, wrong: 0 });
    startTimeRef.current = null;
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [duration, pickText]);

  useEffect(() => {
    reset();
  }, [duration, difficulty, reset]);

  const finishTest = useCallback(() => {
    const elapsed = duration - timeLeft || duration;
    let correct = 0;
    let wrong = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correct++;
      else wrong++;
    }
    const wpm = calculateWPM(input.length, elapsed, language === 'bangla');
    const cpm = calculateCPM(input.length, elapsed);
    const accuracy = calculateAccuracy(correct, input.length);
    setStats({ wpm, accuracy, cpm, correct, wrong });
    setFinished(true);
  }, [duration, timeLeft, input, text, language]);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      finishTest();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, finished, timeLeft, finishTest]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!started && val.length > 0) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }
    if (val.length > text.length) return;
    setInput(val);
    if (val.length === text.length) {
      finishTest();
    }
  };

  const renderText = () => {
    return text.split('').map((char, i) => {
      let className = 'text-gray-400';
      if (i < input.length) {
        className = input[i] === char ? 'text-success' : 'text-error bg-red-100';
      } else if (i === input.length) {
        className = 'text-primary bg-blue-100';
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  const liveWpm = started && !finished
    ? calculateWPM(input.length, duration - timeLeft || 1, language === 'bangla')
    : stats.wpm;
  const liveAccuracy = started && !finished
    ? calculateAccuracy(
        input.split('').filter((c, i) => c === text[i]).length,
        input.length || 1
      )
    : stats.accuracy;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {[30, 60, 120].map((d) => (
          <button
            key={d}
            onClick={() => { setDuration(d); setTimeLeft(d); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              duration === d ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {toBanglaNumber(d)}s
          </button>
        ))}
        {showDifficulty && (
          <>
            {['all', 'easy', 'medium', 'hard'].map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                  difficulty === d ? 'bg-secondary text-white' : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="card">
            <Timer seconds={timeLeft} total={duration} />
          </div>

          <AdBanner size="leaderboard" />

          {!finished ? (
            <>
              <div className="card text-2xl leading-loose min-h-[120px] select-none">
                {renderText()}
              </div>
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInput}
                disabled={finished}
                className="w-full card text-xl p-4 border-2 border-gray-200 focus:border-primary focus:outline-none resize-none min-h-[100px]"
                placeholder="এখানে টাইপ করো..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </>
          ) : (
            <div className="card text-center space-y-4">
              <h2 className="text-2xl font-bold text-primary">ফলাফল</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ScoreCard label="WPM" value={toBanglaNumber(stats.wpm)} />
                <ScoreCard label="Accuracy" value={`${toBanglaNumber(stats.accuracy)}%`} color="text-success" />
                {showCPM && <ScoreCard label="CPM" value={toBanglaNumber(stats.cpm)} color="text-secondary" />}
                <ScoreCard label="সঠিক" value={toBanglaNumber(stats.correct)} color="text-success" />
                <ScoreCard label="ভুল" value={toBanglaNumber(stats.wrong)} color="text-error" />
              </div>
              <AdBanner size="rectangle" />
              <div className="flex gap-3 justify-center">
                <button onClick={reset} className="btn-primary flex items-center gap-2">
                  <RotateCcw size={18} /> আবার চেষ্টা করো
                </button>
                <button
                  onClick={() => shareText(`BrainKhela টাইপিং: WPM ${stats.wpm}, Accuracy ${stats.accuracy}%`)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Share2 size={18} /> শেয়ার করো
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <ScoreCard label="WPM" value={toBanglaNumber(liveWpm)} />
          <ScoreCard label="Accuracy" value={`${toBanglaNumber(liveAccuracy)}%`} color="text-success" />
          {showCPM && <ScoreCard label="CPM" value={toBanglaNumber(calculateCPM(input.length, duration - timeLeft || 1))} color="text-secondary" />}
        </div>
      </div>
    </div>
  );
}
