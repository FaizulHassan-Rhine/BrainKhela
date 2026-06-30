'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import ProgressBar from '@/components/ui/ProgressBar';
import ScoreCard from '@/components/ui/ScoreCard';
import Timer from '@/components/ui/Timer';
import { calculateGrade } from '@/lib/utils';
import Num from '@/components/ui/Num';
import { RotateCcw, SkipForward, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { translations } from '@/lib/translations';
import { useLocalizedQuestions } from '@/hooks/useLocalizedQuestions';
import { dedupeMcqItems } from '@/lib/data/bilingualMcq';

export default function QuizEngine({
  questions,
  title,
  titleKey,
  timePerQuestion = 30,
  questionsPerSession = 20,
  showChapter = false,
  showHint = false,
}) {
  const [sessionIds, setSessionIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [finished, setFinished] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const { t, lang } = useLanguage();
  const { questions: localizedQuestions, loading: translating } = useLocalizedQuestions(questions, lang);
  const displayTitle = titleKey ? t(titleKey) : title;
  const optionLabels = translations[lang].optionLabels;

  const questionSourceKey = useMemo(
    () => (questions?.length ? questions.map((q) => q.id).join('|') : ''),
    [questions]
  );

  const localizedById = useMemo(
    () => new Map(localizedQuestions.map((q) => [q.id, q])),
    [localizedQuestions]
  );

  const sessionQuestions = useMemo(
    () => sessionIds.map((id) => localizedById.get(id)).filter(Boolean),
    [sessionIds, localizedById]
  );

  const initQuiz = useCallback(() => {
    if (!questions?.length) return;
    const unique = dedupeMcqItems(questions);
    const shuffled = [...unique].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, questionsPerSession);
    setSessionIds(picked.map((q) => q.id));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setTimeLeft(timePerQuestion);
    setFinished(false);
    setShowHintText(false);
  }, [questions, questionsPerSession, timePerQuestion]);

  const prevSourceKey = useRef('');
  useEffect(() => {
    if (translating || !questionSourceKey) return;
    if (prevSourceKey.current === questionSourceKey && sessionIds.length) return;
    prevSourceKey.current = questionSourceKey;
    initQuiz();
  }, [questionSourceKey, translating, initQuiz, sessionIds.length]);

  const current = sessionQuestions[currentIndex];

  const handleAnswer = useCallback((optionIndex) => {
    if (selected !== null || !current) return;
    setSelected(optionIndex);
    if (optionIndex === current.correct) setScore((s) => s + 1);
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

  if (translating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-primary">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p>{t('common.translating')}</p>
      </div>
    );
  }

  if (!current && !finished) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  if (finished) {
    const percentage = Math.round((score / sessionQuestions.length) * 100);
    const grade = calculateGrade(percentage);
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 px-2">
        <div className="card bg-gradient-to-br from-secondary to-cream-light border-accent py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">{t('common.quizDone')}</h2>
          <p className="text-5xl sm:text-6xl font-bold text-primary-dark my-4">{grade}</p>
          <p className="text-gray-500"><Num value={percentage} />%</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ScoreCard label={t('common.score')} value={<><Num value={score} />/<Num value={sessionQuestions.length} /></>} />
          <ScoreCard label={t('common.percent')} value={<><Num value={percentage} />%</>} color="text-primary-dark" />
          <ScoreCard label={t('common.grade')} value={grade} color="text-success" />
        </div>
        <AdBanner size="rectangle" />
        <button
          onClick={() => {
            prevSourceKey.current = '';
            initQuiz();
          }}
          className="btn-primary flex items-center gap-2 mx-auto w-full sm:w-auto justify-center min-h-[52px]"
        >
          <RotateCcw size={18} /> {t('common.retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Sticky mobile header */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-sm -mx-3 px-3 py-3 sm:static sm:bg-transparent sm:mx-0 sm:px-0 sm:py-0 border-b sm:border-0 border-accent/40">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-lg sm:text-2xl font-bold text-primary line-clamp-2">{displayTitle}</h1>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs sm:text-sm text-muted-foreground bg-cream-light sm:bg-secondary px-3 py-1.5 rounded-full border border-accent">
              ✓ <Num value={score} /> / <Num value={answered} />
            </span>
            <Timer seconds={timeLeft} total={timePerQuestion} size="sm" />
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar current={currentIndex + 1} total={sessionQuestions.length} />
        </div>
      </div>

      {currentIndex === 5 && <AdBanner size="leaderboard" />}

      <div className="card space-y-4 sm:space-y-5 p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {showChapter && current.chapter && (
            <span className="inline-block px-3 py-1 bg-surface text-primary text-xs font-medium rounded-full border border-accent/40">
              {current.chapter}
            </span>
          )}
          {current.category && (
            <span className="inline-block px-3 py-1 bg-accent/40 text-primary-dark text-xs font-medium rounded-full">
              {current.category}
            </span>
          )}
        </div>

        <h2 className="text-lg sm:text-xl font-semibold leading-relaxed">{current.question}</h2>

        {showHint && current.hint && (
          <button
            onClick={() => setShowHintText(!showHintText)}
            className="text-sm text-secondary hover:underline text-left"
          >
            {showHintText ? current.hint : t('common.hintShow')}
          </button>
        )}

        <div className="space-y-2.5 sm:space-y-3">
          {(Array.isArray(current.options) ? current.options : []).map((option, i) => {
            const isCorrect = i === current.correct;
            const isSelected = i === selected;
            const answered = selected !== null;

            let className = 'quiz-option min-h-[52px] sm:min-h-[56px] flex items-center';
            let labelClass = 'font-bold mr-3 shrink-0 w-6 text-primary';
            let Icon = null;

            if (answered) {
              if (isCorrect && isSelected) {
                className = 'quiz-option quiz-option-correct min-h-[52px] sm:min-h-[56px] flex items-center';
                labelClass = 'font-bold mr-3 shrink-0 w-6 text-primary-dark';
                Icon = CheckCircle2;
              } else if (isCorrect) {
                className = 'quiz-option quiz-option-reveal-correct min-h-[52px] sm:min-h-[56px] flex items-center';
                labelClass = 'font-bold mr-3 shrink-0 w-6 text-primary';
                Icon = CheckCircle2;
              } else if (isSelected) {
                className = 'quiz-option quiz-option-wrong min-h-[52px] sm:min-h-[56px] flex items-center';
                labelClass = 'font-bold mr-3 shrink-0 w-6 text-red-700';
                Icon = XCircle;
              } else {
                className = 'quiz-option opacity-40 min-h-[52px] flex items-center pointer-events-none';
                labelClass = 'font-bold mr-3 shrink-0 w-6 text-gray-400';
              }
            }

            return (
              <button
                key={`${currentIndex}-${i}`}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className={className}
              >
                <span className={labelClass}>{optionLabels[i]}.</span>
                <span className="flex-1 text-left text-sm sm:text-base">{option}</span>
                {Icon && (
                  <Icon
                    size={22}
                    className={`shrink-0 ml-2 ${isCorrect ? 'text-primary' : 'text-red-500'}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {selected !== null && current.explanation && (
          <div className="text-sm text-gray-700 bg-surface border border-accent/50 p-4 rounded-xl">
            <span className="font-medium text-primary">💡 </span>
            {current.explanation}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
          {selected === null && (
            <button
              onClick={() => handleAnswer(-1)}
              className="text-sm text-gray-500 hover:text-primary flex items-center justify-center gap-1 min-h-[44px]"
            >
              <SkipForward size={16} /> {t('common.skip')}
            </button>
          )}
          {selected !== null && (
            <button onClick={nextQuestion} className="btn-primary w-full sm:w-auto min-h-[52px] text-base">
              {currentIndex + 1 >= sessionQuestions.length ? t('common.seeResult') : t('common.nextQuestion')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
