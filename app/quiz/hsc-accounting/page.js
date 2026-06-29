'use client';

import { useState } from 'react';
import QuizEngine from '@/components/games/QuizEngine';
import AdBanner from '@/components/ui/AdBanner';
import { hscAccountingQuestions, hscChapters } from '@/data/hsc-accounting-questions';

export default function HSCAccountingPage() {
  const [chapter, setChapter] = useState(null);

  if (!chapter) {
    return (
      <div className="py-8 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">HSC অ্যাকাউন্টিং MCQ</h1>
        <AdBanner size="leaderboard" />
        <p className="text-center text-gray-500 mb-6">অধ্যায় বেছে নাও</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hscChapters.map((ch) => (
            <button
              key={ch}
              onClick={() => setChapter(ch)}
              className="card hover:border-primary hover:shadow-md transition-all text-left py-4"
            >
              <span className="font-semibold">{ch}</span>
              <p className="text-sm text-gray-500 mt-1">{hscAccountingQuestions[ch].length} প্রশ্ন</p>
            </button>
          ))}
        </div>
        <AdBanner size="rectangle" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <button onClick={() => setChapter(null)} className="text-sm text-primary mb-4 hover:underline">
        ← অধ্যায় পরিবর্তন
      </button>
      <AdBanner size="leaderboard" />
      <QuizEngine
        questions={hscAccountingQuestions[chapter]}
        title={`HSC অ্যাকাউন্টিং — ${chapter}`}
        questionsPerSession={20}
        timePerQuestion={30}
        showChapter
        showHint
      />
    </div>
  );
}
