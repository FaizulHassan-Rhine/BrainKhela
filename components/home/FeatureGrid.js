'use client';

import Link from 'next/link';
import {
  Keyboard,
  Type,
  BookOpen,
  GraduationCap,
  Calculator,
  Hash,
  Brain,
  Zap,
  Gamepad2,
} from 'lucide-react';
import { FEATURE_KEYS } from '@/lib/translations';
import { useLanguage } from '@/components/providers/LanguageProvider';

const ICON_MAP = {
  Keyboard,
  Type,
  BookOpen,
  GraduationCap,
  Calculator,
  Hash,
  Brain,
  Zap,
  Gamepad2,
};

export default function FeatureGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
          {t('features.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_KEYS.map((feature) => {
            const Icon = ICON_MAP[feature.icon];

            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="card hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {Icon && <Icon size={28} strokeWidth={2} />}
                </div>
                <h3 className="font-semibold text-lg">{t(feature.key)}</h3>
                <p className="text-sm text-gray-500 mt-1">{t('features.playNow')}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
