'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft, Search, BookOpen, Play,
} from 'lucide-react';
import QuizEngine from '@/components/games/QuizEngine';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Num from '@/components/ui/Num';
import LuxuryLoader, { LuxuryLoaderSpinner } from '@/components/ui/LuxuryLoader';
import { SUBJECT_COLORS, GK_CATEGORY_COLORS } from '@/lib/data/bilingualMcq';

const SESSION_SIZES = [10, 20, 25, 30];

export default function BilingualQuizPage({ level, titleKey, questionsPerSession: defaultSession = 25 }) {
  const { t, lang } = useLanguage();
  const [meta, setMeta] = useState(null);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [sessionSize, setSessionSize] = useState(defaultSession);
  const [search, setSearch] = useState('');
  const [questions, setQuestions] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setLoadingMeta(true);
    fetch(`/api/quiz/${level}/meta?lang=${lang}`)
      .then((r) => r.json())
      .then(setMeta)
      .finally(() => setLoadingMeta(false));
  }, [level, lang]);

  const subject = useMemo(
    () => meta?.subjects?.find((s) => s.key === selectedSubject),
    [meta, selectedSubject]
  );

  const filteredSubjects = useMemo(() => {
    if (!meta?.subjects) return [];
    const q = search.trim().toLowerCase();
    if (!q) return meta.subjects;
    return meta.subjects.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.labelBn?.toLowerCase().includes(q) ||
        s.labelEn?.toLowerCase().includes(q)
    );
  }, [meta, search]);

  const startQuiz = async () => {
    if (!selectedSubject) return;
    setLoadingQuestions(true);
    try {
      const params = new URLSearchParams({
        lang,
        subject: selectedSubject,
      });
      if (selectedChapter) params.set('chapter', selectedChapter);
      const res = await fetch(`/api/quiz/${level}/questions?${params}`);
      const data = await res.json();
      setQuestions(data.questions);
      setStarted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoadingQuestions(false);
    }
  };

  const reset = () => {
    setStarted(false);
    setQuestions(null);
  };

  const isGk = level === 'gk';
  const showChapterPicker = !isGk && (subject?.chapters?.length > 0);
  const showDifficultyPicker = isGk && (subject?.chapters?.length > 1);

  const backToSubjects = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
    setSearch('');
    reset();
  };

  const getVisuals = (key) => {
    if (isGk) {
      return {
        gradient: GK_CATEGORY_COLORS[key] || 'from-primary to-secondary',
      };
    }
    return {
      gradient: SUBJECT_COLORS[key] || 'from-primary to-secondary',
    };
  };

  const pickerSubtitle = selectedSubject
    ? (showChapterPicker || showDifficultyPicker ? t('common.selectChapter') : t('common.questionsPerSession'))
    : (isGk ? t('common.selectCategory') : t('common.selectSubject'));

  if (started && questions?.length) {
    const chapterLabel = selectedChapter
      ? subject?.chapters?.find((c) => c.key === selectedChapter)?.label
      : t('common.all');

    return (
      <div className="py-4 sm:py-8 px-3 sm:px-4 max-w-3xl mx-auto">
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-primary font-medium mb-4 hover:underline min-h-[44px]"
        >
          <ChevronLeft size={18} /> {isGk ? t('common.changeCategory') : t('common.changeSubject')}
        </button>
        <QuizEngine
          questions={questions}
          title={`${t(titleKey)} — ${subject?.label}${selectedChapter ? ` · ${chapterLabel}` : ''}`}
          questionsPerSession={Math.min(sessionSize, questions.length)}
          timePerQuestion={30}
          showChapter={!isGk}
        />
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-primary text-sm font-medium mb-3">
          <BookOpen size={14} />
          <Num value={meta?.total || 0} />+ MCQ
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">{t(titleKey)}</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">{pickerSubtitle}</p>
      </div>

      {loadingMeta ? (
        <LuxuryLoader variant="inline" label={t('common.loading')} />
      ) : !selectedSubject ? (
        <>
          {/* Search */}
          <div className="relative my-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isGk ? t('common.selectCategory') : t('common.selectSubject')}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-accent focus:border-primary focus:ring-2 focus:ring-accent/60 outline-none text-base bg-cream-light"
            />
          </div>

          {/* Subject grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSubjects.map((s) => {
              const { gradient } = getVisuals(s.key);

              return (
                <button
                  key={s.key}
                  onClick={() => { setSelectedSubject(s.key); setSelectedChapter(null); }}
                  className="group text-left rounded-2xl border border-accent bg-cream-light shadow-card hover:shadow-soft hover:border-primary/30 transition-all overflow-hidden min-h-[88px]"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
                  <div className="p-4 sm:p-5">
                    <h3 className="font-semibold text-lg text-gray-900">{s.label}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        <Num value={s.count} className="text-base text-primary-dark" /> {t('common.questions')}
                        {!isGk && s.chapters?.length > 0 && (
                          <> · <Num value={s.chapters.length} className="text-base text-primary-dark" /> {t('common.chapters')}</>
                        )}
                      </p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="mt-6 space-y-6">
          <button
            onClick={backToSubjects}
            className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline min-h-[44px]"
          >
            <ChevronLeft size={18} /> {isGk ? t('common.changeCategory') : t('common.changeSubject')}
          </button>

          {/* Selected subject card */}
          <div className="card bg-gradient-to-br from-secondary to-cream-light border-accent">
            <h2 className="text-xl font-bold text-primary">{subject?.label}</h2>
            <p className="text-sm text-gray-500 mt-1">
              <Num value={subject?.count || 0} className="text-base text-primary-dark" /> {t('common.questions')}
            </p>
          </div>

          {(showChapterPicker || showDifficultyPicker) && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              {isGk ? t('common.selectDifficulty') : t('common.selectChapter')}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedChapter(null)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                  !selectedChapter ? 'bg-primary text-cream-light' : 'bg-cream-light text-gray-700 hover:bg-secondary border border-accent'
                }`}
              >
                {t('common.all')} (<Num value={subject?.count || 0} />)
              </button>
              {subject?.chapters?.map((ch) => (
                <button
                  key={ch.key}
                  onClick={() => setSelectedChapter(ch.key)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                    selectedChapter === ch.key ? 'bg-primary text-cream-light' : 'bg-cream-light text-gray-700 hover:bg-secondary border border-accent'
                  }`}
                >
                  {ch.label} (<Num value={ch.count} />)
                </button>
              ))}
            </div>
          </div>
          )}

          {/* Session size */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">{t('common.questionsPerSession')}</p>
            <div className="flex flex-wrap gap-2">
              {SESSION_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSessionSize(size)}
                  className={`w-14 h-11 rounded-xl text-sm font-semibold transition-colors ${
                    sessionSize === size ? 'bg-primary text-cream-light' : 'bg-cream-light text-gray-700 border border-accent'
                  }`}
                >
                  <Num value={size} />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startQuiz}
            disabled={loadingQuestions}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 text-lg min-h-[52px]"
          >
            {loadingQuestions ? (
              <LuxuryLoaderSpinner />
            ) : (
              <Play size={22} />
            )}
            {t('common.startQuiz')}
          </button>
        </div>
      )}

    </div>
  );
}
