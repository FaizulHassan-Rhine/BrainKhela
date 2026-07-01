import HeroSection from '@/components/home/HeroSection';
import FeatureGrid from '@/components/home/FeatureGrid';
import HomeSeoContent from '@/components/seo/HomeSeoContent';
import JsonLd from '@/components/seo/JsonLd';
import { getWebPageSchema } from '@/lib/seo';

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
      <FeatureGrid />
      <HomeSeoContent />
    </>
  );
}
