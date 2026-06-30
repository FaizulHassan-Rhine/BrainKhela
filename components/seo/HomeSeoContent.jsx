import Link from 'next/link';

/** Crawlable homepage copy — bilingual keywords, natural prose for search engines. */
export default function HomeSeoContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 text-muted-foreground text-sm leading-relaxed space-y-4 border-t border-accent">
      <h2 className="text-lg font-semibold text-primary-dark">
        BrainKhela — বাংলাদেশের ফ্রি শিক্ষামূলক গেমিং সাইট
      </h2>
      <p>
        <strong>BrainKhela.com</strong> বাংলাদেশের শিক্ষার্থীদের জন্য সম্পূর্ণ বিনামূল্যে{' '}
        <Link href="/quiz/ssc" className="text-primary hover:underline">SSC MCQ প্র্যাকটিস</Link>,{' '}
        <Link href="/quiz/hsc-accounting" className="text-primary hover:underline">HSC MCQ প্র্যাকটিস</Link>,{' '}
        <Link href="/typing/bangla" className="text-primary hover:underline">বাংলা টাইপিং টেস্ট</Link>,{' '}
        <Link href="/typing/english" className="text-primary hover:underline">ইংরেজি টাইপিং টেস্ট</Link>,{' '}
        <Link href="/iq-test" className="text-primary hover:underline">IQ টেস্ট</Link>,{' '}
        <Link href="/math" className="text-primary hover:underline">গণিত প্র্যাকটিস</Link> ও{' '}
        <Link href="/brain-game" className="text-primary hover:underline">ব্রেইন গেম</Link> অফার করে।
        সব কন্টেন্ট বাংলা ও ইংরেজি — দ্বিভাষিক MCQ, টাইপিং ও ব্রেইন ট্রেনিং এক জায়গায়।
      </p>
      <p lang="en">
        <strong>BrainKhela</strong> is a free educational gaming platform for students in Bangladesh.
        Practice SSC &amp; HSC MCQ online, improve Bangla &amp; English typing speed, take IQ tests,
        play math quizzes and 50+ brain games — all bilingual (Bangla &amp; English), no signup required.
      </p>
    </section>
  );
}
