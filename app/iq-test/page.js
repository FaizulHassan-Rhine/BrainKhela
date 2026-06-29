import IQTest from '@/components/games/IQTest';
import { iqQuestions } from '@/data/iq-questions';

export const metadata = {
  title: 'IQ টেস্ট বাংলা',
  description: 'বাংলায় IQ টেস্ট করুন। প্যাটার্ন, লজিক ও সংখ্যা ধারা প্রশ্ন।',
};

export default function IQTestPage() {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">IQ টেস্ট বাংলা</h1>
      <IQTest questions={iqQuestions} />
    </div>
  );
}
