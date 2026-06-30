'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">{t('about.title')}</h1>
      <div className="card space-y-6 text-gray-700 leading-relaxed">
        <p>{t('about.intro')}</p>
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('about.missionTitle')}</h2>
          <p>{t('about.mission')}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('about.offerTitle')}</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('about.offer1')}</li>
            <li>{t('about.offer2')}</li>
            <li>{t('about.offer3')}</li>
            <li>{t('about.offer4')}</li>
            <li>{t('about.offer5')}</li>
          </ul>
        </div>
        <p>
          {t('about.contactLabel')}:{' '}
          <a href="mailto:contact@brainkhela.com" className="text-primary hover:underline">contact@brainkhela.com</a>
        </p>
      </div>
    </div>
  );
}
