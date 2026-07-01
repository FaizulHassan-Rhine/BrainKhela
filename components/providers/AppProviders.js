'use client';

import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { GlobalLoaderProvider } from '@/components/providers/GlobalLoader';

export default function AppProviders({ children }) {
  return (
    <LanguageProvider>
      <GlobalLoaderProvider>{children}</GlobalLoaderProvider>
    </LanguageProvider>
  );
}
