export const metadata = {
  title: 'গোপনীয়তা নীতি | Privacy Policy',
  description: 'BrainKhela.com গোপনীয়তা নীতি — ডেটা সংগ্রহ, কুকিজ, AdSense ও Google Analytics বিষয়ে।',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">গোপনীয়তা নীতি / Privacy Policy</h1>

      <div className="card space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-primary mb-3">বাংলা</h2>
          <div className="space-y-4">
            <p>
              BrainKhela.com (&quot;আমরা&quot;, &quot;আমাদের&quot;) আপনার গোপনীয়তাকে সম্মান করে।
              এই নীতিতে ব্যাখ্যা করা হয়েছে আমরা কীভাবে তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করি।
            </p>

            <h3 className="font-semibold">তথ্য সংগ্রহ</h3>
            <p>
              আমরা সরাসরি ব্যক্তিগত তথ্য সংগ্রহ করি না। যোগাযোগ ফর্ম ইমেইল ক্লায়েন্টের মাধ্যমে কাজ করে।
              গেম স্কোর ও পছন্দ localStorage-এ আপনার ডিভাইসে সংরক্ষিত থাকে।
            </p>

            <h3 className="font-semibold">কুকিজ (Cookies)</h3>
            <p>
              Google AdSense ও Google Analytics কুকিজ ব্যবহার করতে পারে বিজ্ঞাপন ও ট্রাফিক বিশ্লেষণের জন্য।
              আপনি ব্রাউজার সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন।
            </p>

            <h3 className="font-semibold">Google AdSense</h3>
            <p>
              তৃতীয় পক্ষের বিজ্ঞাপন সরবরাহকারী হিসেবে Google AdSense ব্যবহার করি।
              Google আপনার আগ্রহ অনুযায়ী বিজ্ঞাপন দেখাতে কুকিজ ব্যবহার করতে পারে।
              Google-এর বিজ্ঞাপন সেটিংস:{' '}
              <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                google.com/settings/ads
              </a>
            </p>

            <h3 className="font-semibold">Google Analytics</h3>
            <p>
              সাইট ট্রাফিক বুঝতে Google Analytics 4 ব্যবহার করি।
              এটি anonymized ডেটা সংগ্রহ করে পৃষ্ঠা ভিউ ও ব্যবহারকারী আচরণ বিশ্লেষণে সাহায্য করে।
            </p>

            <h3 className="font-semibold">শিশুদের গোপনীয়তা</h3>
            <p>
              আমাদের সাইট শিক্ষামূলক উদ্দেশ্যে সকল বয়সের ব্যবহারকারীর জন্য।
              ১৩ বছরের নিচে শিশুদের অভিভাবকের তত্ত্বাবধানে ব্যবহার করার পরামর্শ দিই।
            </p>

            <h3 className="font-semibold">যোগাযোগ</h3>
            <p>
              গোপনীয়তা সংক্রান্ত প্রশ্ন:{' '}
              <a href="mailto:contact@brainkhela.com" className="text-primary hover:underline">contact@brainkhela.com</a>
            </p>
          </div>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-primary mb-3">English</h2>
          <div className="space-y-4">
            <p>
              BrainKhela.com (&quot;we&quot;, &quot;our&quot;) respects your privacy.
              This policy explains how we collect, use, and protect information.
            </p>

            <h3 className="font-semibold">Information Collection</h3>
            <p>
              We do not directly collect personal information. The contact form uses your email client.
              Game scores and preferences are stored locally on your device via localStorage.
            </p>

            <h3 className="font-semibold">Cookies</h3>
            <p>
              Google AdSense and Google Analytics may use cookies for advertising and traffic analysis.
              You can disable cookies in your browser settings.
            </p>

            <h3 className="font-semibold">Google AdSense</h3>
            <p>
              We use Google AdSense as a third-party advertising vendor.
              Google may use cookies to serve ads based on your interests.
              Opt out at{' '}
              <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                google.com/settings/ads
              </a>
            </p>

            <h3 className="font-semibold">Google Analytics</h3>
            <p>
              We use Google Analytics 4 to understand site traffic.
              It collects anonymized data about page views and user behavior.
            </p>

            <h3 className="font-semibold">Children&apos;s Privacy</h3>
            <p>
              Our site is educational for all ages. We recommend parental supervision for children under 13.
            </p>

            <h3 className="font-semibold">Contact</h3>
            <p>
              Privacy questions:{' '}
              <a href="mailto:contact@brainkhela.com" className="text-primary hover:underline">contact@brainkhela.com</a>
            </p>

            <p className="text-sm text-gray-500">Last updated: 2024</p>
          </div>
        </section>
      </div>
    </div>
  );
}
