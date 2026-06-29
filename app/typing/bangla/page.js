import TypingTest from '@/components/games/TypingTest';
import { banglaTexts } from '@/data/bangla-typing-texts';

export const metadata = {
  title: 'বাংলা টাইপিং টেস্ট',
  description: 'বাংলা টাইপিং স্পিড টেস্ট করুন। WPM এবং accuracy দেখুন।',
};

export default function BanglaTypingPage() {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">বাংলা টাইপিং টেস্ট</h1>
      <TypingTest texts={banglaTexts} language="bangla" />
    </div>
  );
}
