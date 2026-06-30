'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-accent via-secondary to-surface text-primary py-16 md:py-24 border-b border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary-dark">
          {t('tagline')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/typing/bangla" className="btn-primary py-3 px-8">
            {t('hero.ctaTyping')}
          </Link>
          <Link href="/quiz" className="bg-cream-light text-primary border-2 border-primary/30 font-semibold py-3 px-8 rounded-xl hover:bg-secondary transition-colors shadow-card">
            {t('hero.ctaQuiz')}
          </Link>
        </div>
      </div>
    </section>
  );
}
