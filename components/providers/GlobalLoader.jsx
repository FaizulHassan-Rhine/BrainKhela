'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LuxuryLoader from '@/components/ui/LuxuryLoader';
import { useLanguage } from '@/components/providers/LanguageProvider';

const LoaderContext = createContext({
  showLoader: () => {},
  hideLoader: () => {},
  isLoading: false,
});

function NavigationListener({ onRouteSettled }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteSettled();
  }, [pathname, searchParams, onRouteSettled]);

  return null;
}

export function GlobalLoaderProvider({ children }) {
  const { t } = useLanguage();
  const [navigating, setNavigating] = useState(false);
  const [manualCount, setManualCount] = useState(0);

  const showLoader = useCallback(() => {
    setManualCount((count) => count + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setManualCount((count) => Math.max(0, count - 1));
  }, []);

  const onRouteSettled = useCallback(() => {
    setNavigating(false);
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      try {
        const nextUrl = new URL(anchor.href, window.location.origin);
        if (nextUrl.origin !== window.location.origin) return;

        const current = `${window.location.pathname}${window.location.search}`;
        const next = `${nextUrl.pathname}${nextUrl.search}`;
        if (next !== current) setNavigating(true);
      } catch {
        /* ignore malformed href */
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const isLoading = navigating || manualCount > 0;

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {isLoading && (
        <LuxuryLoader variant="fullscreen" label={t('common.loading')} />
      )}
      <Suspense fallback={null}>
        <NavigationListener onRouteSettled={onRouteSettled} />
      </Suspense>
      {children}
    </LoaderContext.Provider>
  );
}

export function useGlobalLoader() {
  return useContext(LoaderContext);
}
