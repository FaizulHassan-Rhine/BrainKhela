'use client';

import { useState, useMemo } from 'react';
import QuizEngine from '@/components/games/QuizEngine';
import { getMathQuestions } from '@/lib/data/mathQuestions';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Num from '@/components/ui/Num';

const DIFF_KEYS = ['easy', 'medium', 'hard'];
const OP_KEYS = ['all', 'add', 'sub', 'mul', 'div'];

export default function MathGame() {
  const { t } = useLanguage();
  const [difficulty, setDifficulty] = useState('easy');
  const [operation, setOperation] = useState('all');
  const [started, setStarted] = useState(false);

  const questions = useMemo(
    () => getMathQuestions({ difficulty, operation }),
    [difficulty, operation]
  );

  if (started && questions.length > 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setStarted(false)}
          className="text-sm text-primary font-medium mb-4 hover:underline"
        >
          ← {t('common.changeSubject')}
        </button>
        <QuizEngine
          questions={questions}
          title={t('math.title')}
          questionsPerSession={Math.min(15, questions.length)}
          timePerQuestion={45}
        />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="card space-y-4">
        <h2 className="font-semibold">{t('common.difficulty')}</h2>
        <div className="flex gap-2 flex-wrap">
          {DIFF_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setDifficulty(key)}
              className={`px-4 py-2 rounded-lg text-sm ${
                difficulty === key ? 'bg-primary text-cream-light' : 'bg-cream-light border border-accent text-muted-foreground'
              }`}
            >
              {t(`common.${key}`)}
            </button>
          ))}
        </div>
        <h2 className="font-semibold">{t('common.operation')}</h2>
        <div className="flex gap-2 flex-wrap">
          {OP_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setOperation(key)}
              className={`px-4 py-2 rounded-lg text-sm ${
                operation === key ? 'bg-accent text-primary' : 'bg-cream-light border border-accent text-muted-foreground'
              }`}
            >
              {t(key === 'all' ? 'common.all' : `math.${key}`)}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          <Num value={questions.length} className="text-base text-primary-dark" /> {t('common.questions')}
        </p>
        <button
          onClick={() => setStarted(true)}
          disabled={!questions.length}
          className="btn-primary w-full disabled:opacity-50"
        >
          {t('math.startGame')}
        </button>
      </div>
    </div>
  );
}
