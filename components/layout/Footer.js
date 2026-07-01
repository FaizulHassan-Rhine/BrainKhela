'use client';

import Link from 'next/link';
import { Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-cream-light border-t border-accent mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <BrandLogo size="footer" showName={false} className="mb-3" />
            <p className="text-gray-500 text-sm">{t('tagline')}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">{t('footer.links')}</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-gray-500 hover:text-primary">{t('footer.about')}</Link>
              <Link href="/contact" className="block text-gray-500 hover:text-primary">{t('footer.contact')}</Link>
              <Link href="/privacy-policy" className="block text-gray-500 hover:text-primary">{t('footer.privacy')}</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">{t('footer.social')}</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-surface hover:bg-accent/50 text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-surface hover:bg-accent/50 text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
