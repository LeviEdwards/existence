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
  const [focused, setFocused] = useState<string | null>(null);

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

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: focused === field ? 'rgba(217, 119, 6, 0.08)' : '#141414',
    border: focused === field ? '2px solid #D97706' : '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '24px 16px',
    textAlign: 'center',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontSize: '32px',
    fontWeight: 700,
    color: '#FAFAFA',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 20px rgba(217, 119, 6, 0.2)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#A8A29E',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '16px',
  };

  return (
    <div className="min-h-screen grid-pattern flex items-center justify-center" style={{ padding: '48px 24px' }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>
        
        {/* Header */}
        <div className="text-center animate-fadeInUp" style={{ marginBottom: '56px' }}>
          <h1 className="font-display gradient-text glow-text" style={{ fontSize: 'clamp(48px, 12vw, 80px)', fontWeight: 800, lineHeight: 1 }}>
            EXISTENCE
          </h1>
          <p style={{ color: '#78716C', marginTop: '24px', fontSize: '20px' }}>
            Your life, quantified
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="animate-fadeInUp" 
          style={{ 
            animationDelay: '150ms',
            background: 'rgba(217, 119, 6, 0.04)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            borderRadius: '28px',
            padding: '48px',
            boxShadow: '0 0 60px rgba(217, 119, 6, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '16px', 
              background: 'rgba(217, 119, 6, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Calendar style={{ width: '28px', height: '28px', color: '#D97706' }} />
            </div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '24px', color: '#FAFAFA' }}>
              When were you born?
            </h2>
          </div>

          <form onSubmit={submit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <div>
                <label style={labelStyle}>Month</label>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  onFocus={() => setFocused('month')}
                  onBlur={() => setFocused(null)}
                  placeholder="MM"
                  min="1"
                  max="12"
                  style={inputStyle('month')}
                />
              </div>
              <div>
                <label style={labelStyle}>Day</label>
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  onFocus={() => setFocused('day')}
                  onBlur={() => setFocused(null)}
                  placeholder="DD"
                  min="1"
                  max="31"
                  style={inputStyle('day')}
                />
              </div>
              <div>
                <label style={labelStyle}>Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  onFocus={() => setFocused('year')}
                  onBlur={() => setFocused(null)}
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  style={inputStyle('year')}
                />
              </div>
            </div>

            {error && (
              <div style={{
                color: '#F87171',
                fontSize: '15px',
                textAlign: 'center',
                background: 'rgba(248, 113, 113, 0.1)',
                border: '1px solid rgba(248, 113, 113, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                color: '#030303',
                fontFamily: 'Plus Jakarta Sans',
                fontWeight: 700,
                fontSize: '18px',
                padding: '20px 32px',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 0 40px rgba(217, 119, 6, 0.4)',
                transition: 'all 0.2s ease',
                marginTop: '8px',
              }}
            >
              <span>Continue</span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="animate-fadeInUp" style={{ 
          textAlign: 'center', 
          color: '#57534E', 
          fontSize: '14px', 
          marginTop: '32px',
          animationDelay: '300ms',
        }}>
          Your data never leaves your device
        </p>
      </div>
    </div>
  );
}
