import Link from 'next/link';
import { SITE_TAGLINE } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-primary to-secondary text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {SITE_TAGLINE}
        </h1>
        <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          বাংলাদেশের সেরা ফ্রি এডুকেশনাল গেমিং সাইট। SSC MCQ, টাইপিং টেস্ট, IQ টেস্ট ও ব্রেইন গেম — সব বিনামূল্যে!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/typing/bangla" className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-purple-50 transition-colors">
            টাইপিং শুরু করো
          </Link>
          <Link href="/quiz" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
            কুইজ খেলো
          </Link>
        </div>
      </div>
    </section>
  );
}
