'use client';

import { useState, useEffect } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import ProgressBar from '@/components/ui/ProgressBar';
import { getIQScore, getIQCategory, toBanglaNumber, shareText } from '@/lib/utils';
import { Share2, RotateCcw } from 'lucide-react';

export default function IQTest({ questions }) {
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const TOTAL = 15;

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled.slice(0, TOTAL));
  }, [questions]);

  const current = sessionQuestions[currentIndex];

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === current.correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= sessionQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled.slice(0, TOTAL));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (!current && !finished) return <div className="text-center py-12">লোড হচ্ছে...</div>;

  if (finished) {
    const iq = getIQScore(score, TOTAL);
    const category = getIQCategory(iq.high);
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-primary">IQ টেস্ট ফলাফল</h2>
        <div className="card">
          <p className="text-lg text-gray-600 mb-2">আপনার IQ স্কোর:</p>
          <p className="text-5xl font-bold text-primary mb-2">
            {toBanglaNumber(iq.low)}-{toBanglaNumber(iq.high)}
          </p>
          <p className="text-xl text-accent font-semibold">{category.label}</p>
          <p className="text-sm text-gray-500 mt-2">
            সঠিক উত্তর: {toBanglaNumber(score)}/{toBanglaNumber(TOTAL)}
          </p>
        </div>
        <AdBanner size="rectangle" />
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary flex items-center gap-2">
            <RotateCcw size={18} /> আবার চেষ্টা করো
          </button>
          <button
            onClick={() => shareText(`BrainKhela IQ: ${iq.low}-${iq.high} (${category.label})`)}
            className="btn-secondary flex items-center gap-2"
          >
            <Share2 size={18} /> শেয়ার করো
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ProgressBar current={currentIndex + 1} total={sessionQuestions.length} label="অগ্রগতি" />

      {currentIndex === 7 && <AdBanner size="leaderboard" />}

      <div className="card space-y-4">
        <p className="text-sm text-gray-500">
          প্রশ্ন {toBanglaNumber(currentIndex + 1)}/{toBanglaNumber(sessionQuestions.length)}
        </p>
        <h2 className="text-xl font-semibold">{current.question}</h2>

        <div className="space-y-3">
          {current.options.map((option, i) => {
            let className = 'quiz-option';
            if (selected !== null) {
              if (i === current.correct) className = 'quiz-option quiz-option-correct';
              else if (i === selected) className = 'quiz-option quiz-option-wrong';
              else className = 'quiz-option opacity-50';
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={className}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="flex justify-end">
            <button onClick={nextQuestion} className="btn-primary">
              {currentIndex + 1 >= sessionQuestions.length ? 'ফলাফল দেখো' : 'পরের প্রশ্ন'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
