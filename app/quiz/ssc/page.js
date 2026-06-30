'use client';

import BilingualQuizPage from '@/components/quiz/BilingualQuizPage';

export default function SSCQuizPage() {
  return <BilingualQuizPage level="ssc" titleKey="quiz.sscTitle" questionsPerSession={25} />;
}
