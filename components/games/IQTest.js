'use client';

import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ui/ProgressBar';
import { getIQScore, shareText } from '@/lib/utils';
import Num from '@/components/ui/Num';
import { Share2, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useLocalizedQuestions } from '@/hooks/useLocalizedQuestions';
import LuxuryLoader from '@/components/ui/LuxuryLoader';

function getIQLabel(iqHigh, t) {
  if (iqHigh >= 130) return t('iq.gifted');
  if (iqHigh >= 110) return t('iq.aboveAvg');
  if (iqHigh >= 90) return t('iq.average');
  return t('iq.belowAvg');
}

export default function IQTest({ questions }) {
  const { t, lang } = useLanguage();
  const { questions: localizedQuestions, loading: translating } = useLocalizedQuestions(questions, lang);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const TOTAL = 15;

  useEffect(() => {
    if (translating || !localizedQuestions.length) return;
    const shuffled = [...localizedQuestions].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled.slice(0, TOTAL));
  }, [localizedQuestions, translating]);

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
    const shuffled = [...localizedQuestions].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled.slice(0, TOTAL));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (translating) return <LuxuryLoader variant="inline" label={t('common.translating')} />;

  if (!current && !finished) return <LuxuryLoader variant="inline" label={t('common.loading')} />;

  if (finished) {
    const iq = getIQScore(score, TOTAL);
    const categoryLabel = getIQLabel(iq.high, t);
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-primary">{t('iq.resultTitle')}</h2>
        <div className="card">
          <p className="text-lg text-gray-600 mb-2">{t('iq.yourScore')}</p>
          <p className="text-5xl font-bold text-primary mb-2">
            <Num value={iq.low} />-<Num value={iq.high} />
          </p>
          <p className="text-xl text-primary-dark font-semibold">{categoryLabel}</p>
          <p className="text-sm text-gray-500 mt-2">
            {t('iq.correctOf')}: <Num value={score} />/<Num value={TOTAL} />
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary flex items-center gap-2">
            <RotateCcw size={18} /> {t('common.retry')}
          </button>
          <button
            onClick={() => shareText(`BrainKhela IQ: ${iq.low}-${iq.high} (${categoryLabel})`, lang)}
            className="btn-secondary flex items-center gap-2"
          >
            <Share2 size={18} /> {t('common.share')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ProgressBar current={currentIndex + 1} total={sessionQuestions.length} label={t('common.progress')} />

      <div className="card space-y-4">
        <p className="text-sm text-gray-500">
          {t('common.question')} <Num value={currentIndex + 1} />/<Num value={sessionQuestions.length} />
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
              {currentIndex + 1 >= sessionQuestions.length ? t('common.seeResult') : t('common.nextQuestion')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
