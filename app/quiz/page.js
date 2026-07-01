'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, Calculator } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Num from '@/components/ui/Num';

const QUIZ_ICONS = {
  '/quiz/gk': BookOpen,
  '/quiz/ssc': GraduationCap,
  '/quiz/hsc-accounting': Calculator,
};

export default function QuizHubPage() {
  const { t } = useLanguage();

  const categories = [
    {
      href: '/quiz/gk',
      titleKey: 'quiz.gkTitle',
      descKey: 'quiz.gkDesc',
      count: 500,
      difficultyKey: 'quiz.medium',
      gradient: 'from-accent to-secondary',
    },
    {
      href: '/quiz/ssc',
      titleKey: 'quiz.sscTitle',
      descKey: 'quiz.sscDesc',
      count: 1000,
      difficultyKey: 'quiz.mediumHard',
      gradient: 'from-secondary to-cream-light',
    },
    {
      href: '/quiz/hsc-accounting',
      titleKey: 'quiz.hscTitle',
      descKey: 'quiz.hscDesc',
      count: 1000,
      difficultyKey: 'quiz.hard',
      gradient: 'from-cream-dark to-accent',
    },
  ];

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">{t('quiz.hubTitle')}</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">{t('quiz.hubSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
        {categories.map((cat) => {
          const Icon = QUIZ_ICONS[cat.href];

          return (
            <Link
              key={cat.href}
              href={cat.href}
              className="group rounded-2xl border border-accent bg-cream-light shadow-card hover:shadow-soft hover:border-primary/20 transition-all overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${cat.gradient}`} />
              <div className="p-5 sm:p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-accent/50 text-primary`}>
                  {Icon && <Icon size={28} strokeWidth={2} />}
                </div>
                <h2 className="font-bold text-lg mb-1">{t(cat.titleKey)}</h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{t(cat.descKey)}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  <span className="px-2.5 py-1 bg-gray-100 rounded-full font-medium">
                    <Num value={cat.count} />+ {t('common.questions')}
                  </span>
                  <span className="px-2.5 py-1 bg-surface text-primary rounded-full font-medium">
                    {t(cat.difficultyKey)}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                  {t('features.playNow')} <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
