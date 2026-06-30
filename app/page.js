import HeroSection from '@/components/home/HeroSection';
import FeatureGrid from '@/components/home/FeatureGrid';
import StatsBar from '@/components/home/StatsBar';
import HomeSeoContent from '@/components/seo/HomeSeoContent';
import AdBanner from '@/components/ui/AdBanner';
import JsonLd from '@/components/seo/JsonLd';
import { getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={getWebPageSchema({
          title: 'BrainKhela - বাংলা কুইজ, টাইপিং টেস্ট ও ব্রেইন গেম',
          description: 'বাংলাদেশের ফ্রি শিক্ষামূলক গেমিং সাইট — SSC MCQ, HSC quiz, typing test, IQ test & brain games.',
          path: '/',
        })}
      />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner size="leaderboard" />
      </div>
      <FeatureGrid />
      <StatsBar />
      <HomeSeoContent />
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <AdBanner size="rectangle" />
      </div>
    </>
  );
}
