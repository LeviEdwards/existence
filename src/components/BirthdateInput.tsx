'use client';

import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface BirthdateInputProps {
  onSubmit: (date: Date) => void;
}

export function BirthdateInput({ onSubmit }: BirthdateInputProps) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);

    if (!m || m < 1 || m > 12) {
      setError('Enter a valid month (1-12)');
      return;
    }
    if (!d || d < 1 || d > 31) {
      setError('Enter a valid day (1-31)');
      return;
    }
    if (!y || y < 1900 || y > new Date().getFullYear()) {
      setError('Enter a valid year');
      return;
    }

    const date = new Date(y, m - 1, d);
    if (date > new Date()) {
      setError('Birthdate cannot be in the future');
      return;
    }

    onSubmit(date);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="page-bg" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10 animate-in">
          <h1 className="text-4xl sm:text-5xl text-display text-accent-glow mb-3">
            EXISTENCE
          </h1>
          <p className="text-[var(--text-muted)]">
            Your life, quantified
          </p>
        </div>

        {/* Form */}
        <div className="card card-highlight p-6 sm:p-8 animate-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold">When were you born?</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Month
                </label>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-center text-mono font-medium focus:outline-none focus:border-[var(--brand-accent)] focus:ring-1 focus:ring-[var(--brand-accent)] transition-all placeholder:text-[var(--text-muted)]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Day
                </label>
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-center text-mono font-medium focus:outline-none focus:border-[var(--brand-accent)] focus:ring-1 focus:ring-[var(--brand-accent)] transition-all placeholder:text-[var(--text-muted)]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-center text-mono font-medium focus:outline-none focus:border-[var(--brand-accent)] focus:ring-1 focus:ring-[var(--brand-accent)] transition-all placeholder:text-[var(--text-muted)]"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2 px-4 mb-6">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-light)] text-[var(--bg-base)] font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Privacy */}
        <p className="text-center text-[var(--text-muted)] text-xs mt-6 animate-in" style={{ animationDelay: '200ms' }}>
          Data stored locally · Never leaves your device
        </p>
      </div>
    </div>
  );
}
