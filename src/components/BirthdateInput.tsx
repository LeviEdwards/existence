'use client';

import { useState } from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

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

    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const yearNum = parseInt(year);

    if (!monthNum || monthNum < 1 || monthNum > 12) {
      setError('Enter a valid month (1-12)');
      return;
    }
    if (!dayNum || dayNum < 1 || dayNum > 31) {
      setError('Enter a valid day (1-31)');
      return;
    }
    if (!yearNum || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setError('Enter a valid year');
      return;
    }

    const date = new Date(yearNum, monthNum - 1, dayNum);
    
    if (date > new Date()) {
      setError('Birthdate cannot be in the future');
      return;
    }

    onSubmit(date);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10 animate-reveal" style={{ animationDelay: '0ms' }}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text mb-4">
            EXISTENCE
          </h1>
          <p className="text-[var(--text-secondary)] text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent-amber)]" />
            Your life, quantified
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="glass glow-cyan rounded-3xl p-8 animate-reveal-scale"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[var(--accent-cyan)] icon-glow" />
            <h2 className="text-xl font-semibold">When were you born?</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2 font-medium">
                  Month
                </label>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-lg font-medium focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all placeholder:text-[var(--text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
              
              <div>
                <label className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2 font-medium">
                  Day
                </label>
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-lg font-medium focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all placeholder:text-[var(--text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
              
              <div>
                <label className="block text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2 font-medium">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-lg font-medium focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all placeholder:text-[var(--text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            {error && (
              <div className="text-[var(--accent-rose)] text-sm text-center bg-[var(--accent-rose)]/10 rounded-lg py-2 px-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] text-[var(--bg-deep)] font-semibold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Begin</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Privacy note */}
        <p 
          className="text-center text-[var(--text-muted)] text-sm mt-6 animate-reveal"
          style={{ animationDelay: '200ms' }}
        >
          Your data is stored locally and never leaves your device.
        </p>
      </div>
    </div>
  );
}
