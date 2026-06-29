'use client';

import { useState } from 'react';
import QuizEngine from '@/components/games/QuizEngine';
import AdBanner from '@/components/ui/AdBanner';
import { sscQuestions, sscSubjects } from '@/data/ssc-questions';

export default function SSCQuizPage() {
  const [subject, setSubject] = useState(null);

  if (!subject) {
    return (
      <div className="py-8 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">SSC MCQ প্র্যাকটিস</h1>
        <AdBanner size="leaderboard" />
        <p className="text-center text-gray-500 mb-6">বিষয় বেছে নাও</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sscSubjects.map((s) => (
            <button
              key={s.key}
              onClick={() => setSubject(s.key)}
              className="card hover:border-primary hover:shadow-md transition-all text-center py-6"
            >
              <span className="font-semibold text-lg">{s.label}</span>
              <p className="text-sm text-gray-500 mt-1">{sscQuestions[s.key].length} প্রশ্ন</p>
            </button>
          ))}
        </div>
        <AdBanner size="rectangle" />
      </div>
    );
  }

  const subjectLabel = sscSubjects.find((s) => s.key === subject)?.label;

  return (
    <div className="py-8 px-4">
      <button onClick={() => setSubject(null)} className="text-sm text-primary mb-4 hover:underline">
        ← বিষয় পরিবর্তন
      </button>
      <AdBanner size="leaderboard" />
      <QuizEngine
        questions={sscQuestions[subject]}
        title={`SSC ${subjectLabel} MCQ`}
        questionsPerSession={25}
        timePerQuestion={30}
        showChapter
      />
    </div>
  );
}
