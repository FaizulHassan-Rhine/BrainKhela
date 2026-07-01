'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINK_KEYS } from '@/lib/translations';
import { useLanguage } from '@/components/providers/LanguageProvider';
import LanguageToggle from '@/components/ui/LanguageToggle';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 bg-cream-light/95 backdrop-blur-md border-b border-accent shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[4.5rem]">
          <Link href="/" className="flex items-center" aria-label="BrainKhela home">
            <BrandLogo size="nav" showName={false} priority />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {NAV_LINK_KEYS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-surface text-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-surface/60'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            <LanguageToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(!open)}
              aria-label={t('nav.menu')}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-accent bg-cream-light">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINK_KEYS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.href) ? 'bg-surface text-primary' : 'text-muted-foreground'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
