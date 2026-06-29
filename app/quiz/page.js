import Link from 'next/link';
import { BookOpen, GraduationCap, Calculator } from 'lucide-react';
import AdBanner from '@/components/ui/AdBanner';
import { gkQuestions } from '@/data/gk-questions';
import { sscQuestions } from '@/data/ssc-questions';
import { hscAccountingQuestions } from '@/data/hsc-accounting-questions';

export const metadata = {
  title: 'কুইজ হাব',
  description: 'সাধারণ জ্ঞান, SSC MCQ ও HSC অ্যাকাউন্টিং কুইজ খেলুন।',
};

const categories = [
  {
    href: '/quiz/gk',
    title: 'সাধারণ জ্ঞান কুইজ',
    icon: BookOpen,
    count: gkQuestions.length,
    difficulty: 'মাঝারি',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    href: '/quiz/ssc',
    title: 'SSC MCQ প্র্যাকটিস',
    icon: GraduationCap,
    count: Object.values(sscQuestions).flat().length,
    difficulty: 'মাঝারি-কঠিন',
    color: 'bg-green-100 text-success',
  },
  {
    href: '/quiz/hsc-accounting',
    title: 'HSC অ্যাকাউন্টিং MCQ',
    icon: Calculator,
    count: Object.values(hscAccountingQuestions).flat().length,
    difficulty: 'কঠিন',
    color: 'bg-blue-100 text-blue-600',
  },
];

export default function QuizHubPage() {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">কুইজ হাব</h1>
      <p className="text-center text-gray-500 mb-8">ক্যাটাগরি বেছে নিয়ে কুইজ শুরু করো</p>

      <AdBanner size="leaderboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link key={cat.href} href={cat.href} className="card hover:shadow-md hover:border-primary/30 transition-all group">
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <h2 className="font-semibold text-lg mb-2">{cat.title}</h2>
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-1 bg-gray-100 rounded-full">{cat.count}+ প্রশ্ন</span>
                <span className="px-2 py-1 bg-purple-100 text-primary rounded-full">{cat.difficulty}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <AdBanner size="rectangle" />
    </div>
  );
}
