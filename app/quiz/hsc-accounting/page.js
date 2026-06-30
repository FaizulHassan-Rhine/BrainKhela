'use client';

import BilingualQuizPage from '@/components/quiz/BilingualQuizPage';

export default function HSCAccountingPage() {
  return <BilingualQuizPage level="hsc" titleKey="quiz.hscTitle" questionsPerSession={20} />;
}
