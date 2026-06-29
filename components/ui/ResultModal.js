'use client';

export default function ResultModal({ isOpen, onClose, title, children, onRetry }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center animate-in">
        <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex gap-3 justify-center">
          {onRetry && (
            <button onClick={onRetry} className="btn-primary">
              আবার চেষ্টা করো
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="btn-secondary">
              বন্ধ করো
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
