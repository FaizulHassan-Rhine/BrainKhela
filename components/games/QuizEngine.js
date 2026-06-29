'use client';

import { useState, useEffect, useCallback } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import ProgressBar from '@/components/ui/ProgressBar';
import ScoreCard from '@/components/ui/ScoreCard';
import Timer from '@/components/ui/Timer';
import { calculateGrade, toBanglaNumber } from '@/lib/utils';
import { RotateCcw, SkipForward } from 'lucide-react';

export default function QuizEngine({
  questions,
  title,
  timePerQuestion = 30,
  questionsPerSession = 20,
  showChapter = false,
  showHint = false,
}) {
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [finished, setFinished] = useState(false);
  const [showHintText, setShowHintText] = useState(false);

  const initQuiz = useCallback(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled.slice(0, questionsPerSession));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setTimeLeft(timePerQuestion);
    setFinished(false);
    setShowHintText(false);
  }, [questions, questionsPerSession, timePerQuestion]);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  const current = sessionQuestions[currentIndex];

  const handleAnswer = useCallback((optionIndex) => {
    if (selected !== null || !current) return;
    setSelected(optionIndex);
    const isCorrect = optionIndex === current.correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswered((a) => a + 1);
  }, [selected, current]);

  useEffect(() => {
    if (finished || selected !== null) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, selected, handleAnswer]);

  const nextQuestion = () => {
    if (currentIndex + 1 >= sessionQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(timePerQuestion);
      setShowHintText(false);
    }
  };

  if (!current && !finished) return <div className="text-center py-12">লোড হচ্ছে...</div>;

  if (finished) {
    const percentage = Math.round((score / sessionQuestions.length) * 100);
    const grade = calculateGrade(percentage);
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-primary">কুইজ সম্পন্ন!</h2>
        <div className="grid grid-cols-3 gap-4">
          <ScoreCard label="স্কোর" value={`${toBanglaNumber(score)}/${toBanglaNumber(sessionQuestions.length)}`} />
          <ScoreCard label="শতাংশ" value={`${toBanglaNumber(percentage)}%`} color="text-accent" />
          <ScoreCard label="গ্রেড" value={grade} color="text-success" />
        </div>
        <AdBanner size="rectangle" />
        <button onClick={initQuiz} className="btn-primary flex items-center gap-2 mx-auto">
          <RotateCcw size={18} /> আবার চেষ্টা করো
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <span className="text-sm text-gray-500">
          {toBanglaNumber(score)} সঠিক / {toBanglaNumber(answered)} প্রশ্ন
        </span>
      </div>

      <ProgressBar current={currentIndex + 1} total={sessionQuestions.length} />

      <div className="card flex justify-between items-center">
        <span className="text-sm text-gray-500">প্রশ্ন {toBanglaNumber(currentIndex + 1)}/{toBanglaNumber(sessionQuestions.length)}</span>
        <Timer seconds={timeLeft} total={timePerQuestion} size="sm" />
      </div>

      {currentIndex === 5 && <AdBanner size="leaderboard" />}

      <div className="card space-y-4">
        {showChapter && current.chapter && (
          <span className="inline-block px-3 py-1 bg-purple-100 text-primary text-xs rounded-full">
            {current.chapter}
          </span>
        )}
        {current.category && (
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full ml-2">
            {current.category}
          </span>
        )}
        <h2 className="text-xl font-semibold">{current.question}</h2>

        {showHint && current.hint && (
          <button
            onClick={() => setShowHintText(!showHintText)}
            className="text-sm text-secondary hover:underline"
          >
            {showHintText ? current.hint : '💡 সূত্র দেখো'}
          </button>
        )}

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
                <span className="font-medium mr-2">{['ক', 'খ', 'গ', 'ঘ'][i]}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && current.explanation && (
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            💡 {current.explanation}
          </p>
        )}

        <div className="flex gap-3 justify-end">
          {selected === null && (
            <button onClick={() => handleAnswer(-1)} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
              <SkipForward size={16} /> স্কিপ
            </button>
          )}
          {selected !== null && (
            <button onClick={nextQuestion} className="btn-primary">
              {currentIndex + 1 >= sessionQuestions.length ? 'ফলাফল দেখো' : 'পরের প্রশ্ন'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
