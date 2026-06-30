'use client';

import { ENGINE_MAP } from './engines/registry';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function BrainGameEngine({ engine, props }) {
  const { t } = useLanguage();
  const Component = ENGINE_MAP[engine];

  if (!Component) {
    return (
      <p className="text-center text-muted-foreground py-8">
        {engine === 'unsupported' ? t('brain.unsupported') : t('brain.unsupported')}
      </p>
    );
  }

  return <Component {...props} />;
}
