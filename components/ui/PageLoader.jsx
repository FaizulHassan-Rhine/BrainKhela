'use client';

import LuxuryLoader from '@/components/ui/LuxuryLoader';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function PageLoader() {
  const { t } = useLanguage();
  return <LuxuryLoader variant="page" label={t('common.loading')} />;
}
