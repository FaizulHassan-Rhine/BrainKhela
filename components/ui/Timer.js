'use client';

import { toBanglaNumber } from '@/lib/utils';

export default function Timer({ seconds, total, size = 'lg' }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${mins}:${secs.toString().padStart(2, '0')}`;
  const percentage = total ? ((total - seconds) / total) * 100 : 0;
  const isLow = seconds <= 10 && seconds > 0;

  const sizeClasses = size === 'lg' ? 'text-4xl' : 'text-2xl';

  return (
    <div className="text-center">
      <div className={`font-bold ${sizeClasses} ${isLow ? 'text-error animate-pulse' : 'text-primary'}`}>
        {display}
      </div>
      {total > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function TimerDisplay({ seconds }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <span className="font-mono font-bold text-primary">
      {toBanglaNumber(mins)}:{toBanglaNumber(secs.toString().padStart(2, '0'))}
    </span>
  );
}
