'use client';

import { LanguageProvider } from '@/components/providers/LanguageProvider';

export default function AppProviders({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
