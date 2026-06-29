import QuizEngine from '@/components/games/QuizEngine';
import AdBanner from '@/components/ui/AdBanner';
import { gkQuestions } from '@/data/gk-questions';

export const metadata = {
  title: 'সাধারণ জ্ঞান কুইজ',
  description: 'বাংলাদেশ, বিজ্ঞান, ইতিহাস, ভূগোল ও খেলাধুলা বিষয়ক সাধারণ জ্ঞান কুইজ।',
};

export default function GKQuizPage() {
  return (
    <div className="py-8 px-4">
      <AdBanner size="leaderboard" />
      <QuizEngine
        questions={gkQuestions}
        title="সাধারণ জ্ঞান কুইজ"
        questionsPerSession={20}
        timePerQuestion={30}
      />
    </div>
  );
}
