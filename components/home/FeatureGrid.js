import Link from 'next/link';
import {
  Keyboard, Type, BookOpen, GraduationCap, Calculator,
  Hash, Brain, Zap, Gamepad2,
} from 'lucide-react';
import { FEATURES } from '@/lib/constants';

const iconMap = {
  Keyboard, Type, BookOpen, GraduationCap, Calculator,
  Hash, Brain, Zap, Gamepad2,
};

export default function FeatureGrid() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          সব ধরনের শিক্ষামূলক গেম
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="card hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">এখনই খেলো →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
