import { Hind_Siliguri, Noto_Sans_Bengali } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import AppProviders from '@/components/providers/AppProviders';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { GA_MEASUREMENT_ID, ADSENSE_CLIENT } from '@/lib/constants';
import { HOME_METADATA, GLOBAL_KEYWORDS, getOrganizationSchema, getWebsiteSchema } from '@/lib/seo';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['500', '600', '700'],
  variable: '--font-noto-bengali',
});

export const metadata = {
  ...HOME_METADATA,
  metadataBase: new URL('https://brainkhela.com'),
  title: {
    default: HOME_METADATA.title,
    template: '%s | BrainKhela',
  },
  keywords: GLOBAL_KEYWORDS,
  authors: [{ name: 'BrainKhela', url: 'https://brainkhela.com' }],
  creator: 'BrainKhela',
  publisher: 'BrainKhela',
  applicationName: 'BrainKhela',
  category: 'education',
  formatDetection: { email: false, telephone: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${notoBengali.variable}`}>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-bangla">
        <JsonLd data={[getOrganizationSchema(), getWebsiteSchema()]} />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
