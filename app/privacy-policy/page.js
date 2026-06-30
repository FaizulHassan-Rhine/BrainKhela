'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">{t('privacy.title')}</h1>

      <div className="card space-y-6 text-gray-700 leading-relaxed">
        <p>{t('privacy.intro')}</p>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy.collectionTitle')}</h2>
          <p>{t('privacy.collection')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy.cookiesTitle')}</h2>
          <p>{t('privacy.cookies')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy.adsenseTitle')}</h2>
          <p>
            {t('privacy.adsense')}{' '}
            <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              google.com/settings/ads
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy.analyticsTitle')}</h2>
          <p>{t('privacy.analytics')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy.childrenTitle')}</h2>
          <p>{t('privacy.children')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">{t('privacy.contactTitle')}</h2>
          <p>
            {t('privacy.contact')}{' '}
            <a href="mailto:contact@brainkhela.com" className="text-primary hover:underline">contact@brainkhela.com</a>
          </p>
        </section>

        <p className="text-sm text-gray-500">{t('privacy.lastUpdated')}</p>
      </div>
    </div>
  );
}
