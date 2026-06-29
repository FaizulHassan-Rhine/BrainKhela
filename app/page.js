import HeroSection from '@/components/home/HeroSection';
import FeatureGrid from '@/components/home/FeatureGrid';
import StatsBar from '@/components/home/StatsBar';
import AdBanner from '@/components/ui/AdBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner size="leaderboard" />
      </div>
      <FeatureGrid />
      <StatsBar />
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <AdBanner size="rectangle" />
      </div>
    </>
  );
}
