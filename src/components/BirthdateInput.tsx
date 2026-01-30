'use client';

import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface Props {
  onSubmit: (date: Date) => void;
}

export function BirthdateInput({ onSubmit }: Props) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const m = parseInt(month), d = parseInt(day), y = parseInt(year);

    if (!m || m < 1 || m > 12) return setError('Enter a valid month');
    if (!d || d < 1 || d > 31) return setError('Enter a valid day');
    if (!y || y < 1900 || y > new Date().getFullYear()) return setError('Enter a valid year');

    const date = new Date(y, m - 1, d);
    if (date > new Date()) return setError('Cannot be in the future');

    onSubmit(date);
  };

  const inputClass = "w-full bg-[var(--dark-300)] border border-[rgba(255,255,255,0.05)] rounded-xl px-4 py-4 text-center font-display text-xl font-semibold text-white placeholder:text-[var(--neutral-700)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(217,119,6,0.2)] transition-all";

  return (
    <div className="min-h-screen grid-pattern flex items-center justify-center py-12">
      <div className="container max-w-md space-y-10">
        
        {/* Header */}
        <div className="text-center animate-fadeInUp" style={{ animationDelay: '0ms' }}>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold gradient-text glow-text">
            EXISTENCE
          </h1>
          <p className="text-[var(--neutral-500)] mt-4 text-lg">
            Your life, quantified
          </p>
        </div>

        {/* Form */}
        <div className="glass-card-featured animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[rgba(217,119,6,0.1)] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <h2 className="font-display font-bold text-xl">When were you born?</h2>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-3">
                  Month
                </label>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-3">
                  Day
                </label>
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-3">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  className={inputClass}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-400)] hover:from-[var(--primary-400)] hover:to-[var(--primary-300)] text-white font-display font-bold text-lg py-4 rounded-xl transition-all glow-md flex items-center justify-center gap-3 group"
            >
              Continue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--neutral-700)] text-sm animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          Your data stays on your device
        </p>
      </div>
    </div>
  );
}
