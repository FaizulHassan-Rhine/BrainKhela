import MathGame from '@/components/games/MathGame';

export const metadata = {
  title: 'গণিত প্র্যাকটিস গেম',
  description: 'যোগ, বিয়োগ, গুণ, ভাগ — গণিত প্র্যাকটিস করুন মজার গেমে।',
};

export default function MathPage() {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">গণিত প্র্যাকটিস গেম</h1>
      <MathGame />
    </div>
  );
}
