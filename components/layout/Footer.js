import Link from 'next/link';
import { Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-primary mb-2">
              <span className="text-2xl">🧠</span>
              <span>BrainKhela</span>
            </div>
            <p className="text-gray-500 text-sm">মাথা খাটাও, মজা করো!</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">লিংক</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-gray-500 hover:text-primary">About</Link>
              <Link href="/contact" className="block text-gray-500 hover:text-primary">Contact</Link>
              <Link href="/privacy-policy" className="block text-gray-500 hover:text-primary">Privacy Policy</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">সোশ্যাল</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          © ২০২৪ BrainKhela.com — সর্বস্বত্ব সংরক্ষিত
        </div>
      </div>
    </footer>
  );
}
