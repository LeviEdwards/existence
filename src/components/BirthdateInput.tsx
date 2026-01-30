'use client';

import { useState } from 'react';

interface BirthdateInputProps {
  onSubmit: (date: Date) => void;
}

export function BirthdateInput({ onSubmit }: BirthdateInputProps) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isNaN(date.getTime()) || date > new Date()) {
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      onSubmit(date);
    }, 800);
  };

  const isValid = () => {
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);
    if (isNaN(m) || isNaN(d) || isNaN(y)) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > new Date().getFullYear()) return false;
    const date = new Date(y, m - 1, d);
    return date <= new Date();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 transition-opacity duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-lg w-full text-center space-y-12">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight glow-text">
            Existence
          </h1>
          <p className="text-existence-muted text-lg">
            Your life, visualized in real-time
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-existence-muted text-sm uppercase tracking-widest">
              When did your existence begin?
            </label>
            
            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                value={month}
                onChange={(e) => setMonth(e.target.value.replace(/\D/g, ''))}
                className="w-20 h-16 text-center text-2xl font-mono bg-existence-surface border border-existence-border rounded-xl focus:border-existence-accent focus:ring-2 focus:ring-existence-accent/20 outline-none transition-all"
              />
              <span className="text-existence-muted text-2xl">/</span>
              <input
                type="text"
                placeholder="DD"
                maxLength={2}
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))}
                className="w-20 h-16 text-center text-2xl font-mono bg-existence-surface border border-existence-border rounded-xl focus:border-existence-accent focus:ring-2 focus:ring-existence-accent/20 outline-none transition-all"
              />
              <span className="text-existence-muted text-2xl">/</span>
              <input
                type="text"
                placeholder="YYYY"
                maxLength={4}
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
                className="w-28 h-16 text-center text-2xl font-mono bg-existence-surface border border-existence-border rounded-xl focus:border-existence-accent focus:ring-2 focus:ring-existence-accent/20 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid()}
            className="px-12 py-4 bg-existence-accent text-white font-medium rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-existence-glow transition-all duration-300 hover:shadow-lg hover:shadow-existence-accent/25"
          >
            Begin
          </button>
        </form>

        {/* Quote */}
        <p className="text-existence-muted/60 text-sm italic max-w-md mx-auto">
          "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience."
          <span className="block mt-2 not-italic">— Eleanor Roosevelt</span>
        </p>
      </div>
    </div>
  );
}
