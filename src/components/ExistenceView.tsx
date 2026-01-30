'use client';

import { useState, useEffect, useMemo } from 'react';
import { LifeGrid } from './LifeGrid';
import { 
  Calendar, 
  Clock,
  Hourglass, 
  TrendingUp,
  Heart, 
  Wind, 
  Eye,
  Sunrise,
  Moon,
  TreeDeciduous,
  Settings2,
  LayoutGrid,
  Radio
} from 'lucide-react';

interface Props {
  birthdate: Date;
  onReset: () => void;
}

const LIFESPAN = 78.5;

export function ExistenceView({ birthdate, onReset }: Props) {
  const [now, setNow] = useState(new Date());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const t = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(t);
  }, []);

  const d = useMemo(() => {
    const ms = now.getTime() - birthdate.getTime();
    const mins = Math.floor(ms / 60000);
    const days = Math.floor(ms / 86400000);
    const years = ms / (365.25 * 24 * 60 * 60 * 1000);
    const total = LIFESPAN * 365.25 * 24 * 60 * 60 * 1000;
    
    return {
      secs: Math.floor(ms / 1000),
      days,
      weeks: Math.floor(days / 7),
      years,
      left: Math.max(0, Math.floor((total - ms) / 86400000)),
      pct: Math.min((ms / total) * 100, 100),
      heart: Math.floor(mins * 72),
      breath: Math.floor(mins * 16),
      blink: Math.floor(mins * 17),
      sun: days,
      moon: Math.floor(days / 29.53),
      season: Math.floor(years * 4),
    };
  }, [now, birthdate]);

  const f = (n: number) => n.toLocaleString();

  if (!ready) return null;

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container py-12 md:py-20 space-y-8 lg:space-y-12">
        
        {/* HEADER */}
        <header className="flex items-start justify-between animate-fadeInUp" style={{ animationDelay: '0ms' }}>
          <div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text glow-text">
              EXISTENCE
            </h1>
            <p className="text-[var(--neutral-500)] mt-3 text-sm md:text-base">
              Born {birthdate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button 
            onClick={onReset}
            className="p-3 rounded-xl glass-card hover:border-[var(--primary)]"
            style={{ padding: '12px' }}
          >
            <Settings2 className="w-5 h-5 text-[var(--neutral-400)]" />
          </button>
        </header>

        {/* HERO: LIVE SECONDS */}
        <section className="glass-card-featured text-center animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[rgba(217,119,6,0.1)] border border-[rgba(217,119,6,0.3)] mb-8">
            <Radio className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">Live</span>
          </div>
          
          <div className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold stat-number leading-none">
            {f(d.secs)}
          </div>
          
          <p className="text-[var(--neutral-400)] text-lg mt-6">seconds alive</p>
        </section>

        {/* 3 STAT CARDS */}
        <section className="grid grid-cols-3 gap-4 md:gap-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="glass-card">
            <div className="w-12 h-12 rounded-xl bg-[rgba(217,119,6,0.1)] flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div className="stat-number text-4xl md:text-5xl font-extrabold">{d.years.toFixed(2)}</div>
            <p className="text-[var(--neutral-500)] mt-3 font-medium">Years old</p>
          </div>
          
          <div className="glass-card">
            <div className="w-12 h-12 rounded-xl bg-[rgba(217,119,6,0.1)] flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div className="stat-number text-4xl md:text-5xl font-extrabold">{f(d.days)}</div>
            <p className="text-[var(--neutral-500)] mt-3 font-medium">Days lived</p>
          </div>
          
          <div className="glass-card">
            <div className="w-12 h-12 rounded-xl bg-[rgba(217,119,6,0.1)] flex items-center justify-center mb-6">
              <Hourglass className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div className="stat-number text-4xl md:text-5xl font-extrabold">{f(d.left)}</div>
            <p className="text-[var(--neutral-500)] mt-3 font-medium">Days remaining</p>
          </div>
        </section>

        {/* PROGRESS */}
        <section className="glass-card animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
              <span className="font-display font-semibold text-lg">Life Progress</span>
            </div>
            <span className="font-display font-bold text-2xl stat-number">{d.pct.toFixed(1)}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${d.pct}%` }} />
          </div>
        </section>

        {/* 2-COL: BODY + WITNESSED */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Body */}
          <div className="glass-card animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[rgba(217,119,6,0.1)] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h2 className="font-display font-bold text-xl">Your Body</h2>
            </div>
            
            <div className="list-row">
              <div className="flex items-center gap-4">
                <Heart className="w-5 h-5 text-[var(--neutral-500)]" />
                <span className="text-[var(--neutral-300)]">Heartbeats</span>
              </div>
              <span className="font-display font-bold text-lg">{f(d.heart)}</span>
            </div>
            
            <div className="list-row">
              <div className="flex items-center gap-4">
                <Wind className="w-5 h-5 text-[var(--neutral-500)]" />
                <span className="text-[var(--neutral-300)]">Breaths</span>
              </div>
              <span className="font-display font-bold text-lg">{f(d.breath)}</span>
            </div>
            
            <div className="list-row">
              <div className="flex items-center gap-4">
                <Eye className="w-5 h-5 text-[var(--neutral-500)]" />
                <span className="text-[var(--neutral-300)]">Blinks</span>
              </div>
              <span className="font-display font-bold text-lg">{f(d.blink)}</span>
            </div>
          </div>

          {/* Witnessed */}
          <div className="glass-card animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[rgba(217,119,6,0.1)] flex items-center justify-center">
                <Sunrise className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h2 className="font-display font-bold text-xl">You&apos;ve Witnessed</h2>
            </div>
            
            <div className="list-row">
              <div className="flex items-center gap-4">
                <Sunrise className="w-5 h-5 text-[var(--neutral-500)]" />
                <span className="text-[var(--neutral-300)]">Sunrises</span>
              </div>
              <span className="font-display font-bold text-lg">{f(d.sun)}</span>
            </div>
            
            <div className="list-row">
              <div className="flex items-center gap-4">
                <Moon className="w-5 h-5 text-[var(--neutral-500)]" />
                <span className="text-[var(--neutral-300)]">Full moons</span>
              </div>
              <span className="font-display font-bold text-lg">{f(d.moon)}</span>
            </div>
            
            <div className="list-row">
              <div className="flex items-center gap-4">
                <TreeDeciduous className="w-5 h-5 text-[var(--neutral-500)]" />
                <span className="text-[var(--neutral-300)]">Seasons</span>
              </div>
              <span className="font-display font-bold text-lg">{f(d.season)}</span>
            </div>
          </div>
        </section>

        {/* LIFE GRID - FULL WIDTH */}
        <section className="glass-card animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-[rgba(217,119,6,0.1)] flex items-center justify-center">
              <LayoutGrid className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Your Life in Weeks</h2>
              <p className="text-[var(--neutral-500)] text-sm mt-1">
                {f(Math.ceil(LIFESPAN * 52))} weeks · Each cell = 1 week
              </p>
            </div>
          </div>
          
          <div className="legend mt-6">
            <div className="legend-item">
              <div className="legend-dot week-lived" />
              Lived
            </div>
            <div className="legend-item">
              <div className="legend-dot week-now" />
              Now
            </div>
            <div className="legend-item">
              <div className="legend-dot week-future" />
              Future
            </div>
          </div>
          
          <LifeGrid weeks={d.weeks} total={Math.ceil(LIFESPAN * 52)} />
        </section>

        {/* FOOTER */}
        <footer className="text-center py-12 animate-fadeInUp" style={{ animationDelay: '700ms' }}>
          <p className="text-[var(--neutral-500)] italic max-w-lg mx-auto text-lg">
            &ldquo;It is not the years in your life that count. It is the life in your years.&rdquo;
          </p>
          <p className="text-[var(--neutral-700)] text-sm mt-4">— Abraham Lincoln</p>
        </footer>
      </div>
    </div>
  );
}
