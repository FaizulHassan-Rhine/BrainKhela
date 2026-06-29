'use client';

export default function ScoreCard({ label, value, unit = '', color = 'text-primary' }) {
  return (
    <div className="card text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>
        {value}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </p>
    </div>
  );
}
