import { Hind_Siliguri } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GA_MEASUREMENT_ID, ADSENSE_CLIENT } from '@/lib/constants';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

export const metadata = {
  metadataBase: new URL('https://brainkhela.com'),
  title: {
    default: 'BrainKhela - বাংলা কুইজ, টাইপিং টেস্ট ও ব্রেইন গেম',
    template: '%s | BrainKhela',
  },
  description: 'বাংলাদেশের সেরা শিক্ষামূলক গেমিং সাইট। SSC MCQ, HSC কুইজ, বাংলা টাইপিং টেস্ট, IQ টেস্ট এবং ব্রেইন গেম সম্পূর্ণ বিনামূল্যে।',
  keywords: ['বাংলা কুইজ', 'SSC MCQ', 'HSC quiz', 'bangla typing test', 'IQ test bangla', 'brain game bangla'],
  openGraph: {
    title: 'BrainKhela - মাথা খাটাও, মজা করো!',
    description: 'বাংলাদেশের সেরা ফ্রি এডুকেশনাল গেমিং সাইট',
    url: 'https://brainkhela.com',
    siteName: 'BrainKhela',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="min-h-screen flex flex-col font-bangla">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
