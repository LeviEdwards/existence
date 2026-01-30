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

  return (
    <div className="min-h-screen grid-pattern flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg space-y-12">
        
        {/* Header */}
        <div className="text-center animate-fadeInUp" style={{ animationDelay: '0ms' }}>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold gradient-text glow-text">
            EXISTENCE
          </h1>
          <p className="text-[var(--neutral-400)] mt-6 text-xl">
            Your life, quantified
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card-featured animate-fadeInUp" style={{ animationDelay: '150ms', padding: '48px' }}>
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[rgba(217,119,6,0.15)] flex items-center justify-center">
              <Calendar className="w-7 h-7 text-[var(--primary)]" />
            </div>
            <h2 className="font-display font-bold text-2xl">When were you born?</h2>
          </div>

          <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[var(--neutral-400)] uppercase tracking-wider mb-4">
                  Month
                </label>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  className="w-full bg-[var(--dark-100)] border-2 border-[rgba(255,255,255,0.08)] rounded-2xl px-6 py-5 text-center font-display text-2xl font-bold text-white placeholder:text-[var(--neutral-700)] focus:outline-none focus:border-[var(--primary)] focus:bg-[rgba(217,119,6,0.05)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--neutral-400)] uppercase tracking-wider mb-4">
                  Day
                </label>
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  className="w-full bg-[var(--dark-100)] border-2 border-[rgba(255,255,255,0.08)] rounded-2xl px-6 py-5 text-center font-display text-2xl font-bold text-white placeholder:text-[var(--neutral-700)] focus:outline-none focus:border-[var(--primary)] focus:bg-[rgba(217,119,6,0.05)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--neutral-400)] uppercase tracking-wider mb-4">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full bg-[var(--dark-100)] border-2 border-[rgba(255,255,255,0.08)] rounded-2xl px-6 py-5 text-center font-display text-2xl font-bold text-white placeholder:text-[var(--neutral-700)] focus:outline-none focus:border-[var(--primary)] focus:bg-[rgba(217,119,6,0.05)] transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-base text-center bg-red-500/10 border border-red-500/20 rounded-2xl py-4 px-6">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-400)] hover:from-[var(--primary-400)] hover:to-[var(--primary-300)] text-white font-display font-bold text-xl py-5 rounded-2xl transition-all glow-md hover:glow-lg flex items-center justify-center gap-4 group mt-4"
              style={{ boxShadow: '0 0 40px rgba(217, 119, 6, 0.3)' }}
            >
              <span>Continue</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--neutral-600)] text-sm animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          Your data never leaves your device
        </p>
      </div>
    </div>
  );
}
