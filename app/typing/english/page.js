import TypingTest from '@/components/games/TypingTest';
import { englishTexts } from '@/data/english-typing-texts';

export const metadata = {
  title: 'ইংরেজি টাইপিং টেস্ট',
  description: 'ইংরেজি টাইপিং স্পিড টেস্ট করুন। WPM, CPM এবং accuracy দেখুন।',
};

export default function EnglishTypingPage() {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">ইংরেজি টাইপিং টেস্ট</h1>
      <TypingTest texts={englishTexts} language="english" showCPM showDifficulty />
    </div>
  );
}
