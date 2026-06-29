export const metadata = {
  title: 'আমাদের সম্পর্কে',
  description: 'BrainKhela.com — বাংলাদেশের শিক্ষার্থীদের জন্য বিনামূল্যে শিক্ষামূলক গেম।',
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">আমাদের সম্পর্কে</h1>
      <div className="card space-y-6 text-gray-700 leading-relaxed">
        <p>
          <strong>BrainKhela.com</strong> বাংলাদেশের শিক্ষার্থীদের জন্য একটি বিনামূল্যে শিক্ষামূলক গেমিং প্ল্যাটফর্ম।
          আমরা বিশ্বাস করি শেখা হতে পারে মজাদার এবং আকর্ষণীয়।
        </p>
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">আমাদের মিশন</h2>
          <p>বাংলাদেশের শিক্ষার্থীদের জন্য বিনামূল্যে শিক্ষামূলক গেম প্রদান করা।</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">আমরা কী অফার করি</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>বাংলা ও ইংরেজি টাইপিং টেস্ট</li>
            <li>SSC ও HSC MCQ প্র্যাকটিস</li>
            <li>সাধারণ জ্ঞান কুইজ</li>
            <li>গণিত প্র্যাকটিস গেম</li>
            <li>IQ টেস্ট ও ব্রেইন গেম</li>
          </ul>
        </div>
        <p>
          যোগাযোগ: <a href="mailto:contact@brainkhela.com" className="text-primary hover:underline">contact@brainkhela.com</a>
        </p>
      </div>
    </div>
  );
}
