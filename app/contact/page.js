'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`BrainKhela Contact from ${form.name}`);
    const nameLabel = lang === 'en' ? 'Name' : 'নাম';
    const emailLabel = lang === 'en' ? 'Email' : 'ইমেইল';
    const body = encodeURIComponent(`${nameLabel}: ${form.name}\n${emailLabel}: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:contact@brainkhela.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">{t('contact.title')}</h1>

      {submitted ? (
        <div className="card text-center">
          <p className="text-success font-semibold text-lg mb-2">✓ {t('contact.success')}</p>
          <p className="text-gray-500 text-sm">{t('contact.successHint')}</p>
          <button onClick={() => setSubmitted(false)} className="btn-secondary mt-4 text-sm py-2">
            {t('contact.sendAgain')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.name')}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.email')}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.message')}</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary focus:outline-none resize-none"
            />
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Send size={18} /> {t('contact.send')}
          </button>
        </form>
      )}
    </div>
  );
}
