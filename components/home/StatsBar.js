export default function StatsBar() {
  const stats = [
    { value: '১০,০০০+', label: 'প্রশ্ন' },
    { value: '৫০,০০০+', label: 'ব্যবহারকারী' },
    { value: '৯টি', label: 'ক্যাটাগরি' },
  ];

  return (
    <section className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-purple-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
