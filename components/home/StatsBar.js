'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import Num from '@/components/ui/Num';

export default function StatsBar() {
  const { t, lang } = useLanguage();

  const stats = [
    { value: 10000, suffix: '+', label: t('stats.questions') },
    { value: 50000, suffix: '+', label: t('stats.users') },
    { value: 9, suffix: lang === 'bn' ? 'টি' : '', label: t('stats.categories') },
  ];

  return (
    <section className="bg-accent text-primary py-8 border-y border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold">
                <Num value={stat.value} className="text-3xl md:text-4xl" />
                {stat.suffix}
              </div>
              <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
