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

    if (!m || m < 1 || m > 12) return setError('Enter a valid month (1-12)');
    if (!d || d < 1 || d > 31) return setError('Enter a valid day (1-31)');
    if (!y || y < 1900 || y > new Date().getFullYear()) return setError('Enter a valid year');

    const date = new Date(y, m - 1, d);
    if (date > new Date()) return setError('Birthdate cannot be in the future');

    onSubmit(date);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-void)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-10">
        
        {/* HEADER */}
        <div className="text-center animate-in" style={{ animationDelay: '0ms' }}>
          <h1 className="text-5xl md:text-6xl text-display text-gold-glow tracking-tight">
            EXISTENCE
          </h1>
          <p className="text-[var(--text-muted)] mt-4 text-lg">
            Your life, quantified
          </p>
        </div>

        {/* FORM CARD */}
        <div 
          className="card card-hero animate-in"
          style={{ animationDelay: '100ms' }}
        >
          <div className="section-header mb-8">
            <div className="section-icon">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="section-title">When were you born?</h2>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Month
                </label>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-card)] rounded-xl px-4 py-4 text-center font-mono text-lg font-medium text-[var(--text-bright)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-gold)] focus:ring-1 focus:ring-[var(--brand-gold)] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Day
                </label>
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-card)] rounded-xl px-4 py-4 text-center font-mono text-lg font-medium text-[var(--text-bright)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-gold)] focus:ring-1 focus:ring-[var(--brand-gold)] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border-card)] rounded-xl px-4 py-4 text-center font-mono text-lg font-medium text-[var(--text-bright)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-gold)] focus:ring-1 focus:ring-[var(--brand-gold)] transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl py-3 px-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-light)] text-[var(--bg-void)] font-semibold text-lg py-4 rounded-xl transition-colors flex items-center justify-center gap-3 group"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <p 
          className="text-center text-[var(--text-muted)] text-sm animate-in"
          style={{ animationDelay: '200ms' }}
        >
          Your data stays on your device. Always.
        </p>
      </div>
    </div>
  );
}
