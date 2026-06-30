'use client';

import BilingualQuizPage from '@/components/quiz/BilingualQuizPage';

export default function GKQuizPage() {
  return <BilingualQuizPage level="gk" titleKey="quiz.gkTitle" questionsPerSession={20} />;
}
