'use client';

import { useState, useEffect, useMemo } from 'react';
import { LifeGrid } from './LifeGrid';
import { 
  Timer,
  Calendar, 
  Hourglass, 
  Percent,
  Heart, 
  Wind, 
  Eye,
  Sunrise,
  Moon,
  Leaf,
  Settings
} from 'lucide-react';

interface Props {
  birthdate: Date;
  onReset: () => void;
}

const LIFESPAN = 78.5;
const HEART_RATE = 72;
const BREATH_RATE = 16;
const BLINK_RATE = 17;

export function ExistenceView({ birthdate, onReset }: Props) {
  const [now, setNow] = useState(new Date());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const tick = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(tick);
  }, []);

  const data = useMemo(() => {
    const ms = now.getTime() - birthdate.getTime();
    const mins = Math.floor(ms / 60000);
    const days = Math.floor(ms / 86400000);
    const years = ms / (365.25 * 24 * 60 * 60 * 1000);
    const totalMs = LIFESPAN * 365.25 * 24 * 60 * 60 * 1000;
    
    return {
      seconds: Math.floor(ms / 1000),
      days,
      weeks: Math.floor(days / 7),
      years,
      daysLeft: Math.max(0, Math.floor((totalMs - ms) / 86400000)),
      progress: Math.min((ms / totalMs) * 100, 100),
      heartbeats: Math.floor(mins * HEART_RATE),
      breaths: Math.floor(mins * BREATH_RATE),
      blinks: Math.floor(mins * BLINK_RATE),
      sunrises: days,
      moons: Math.floor(days / 29.53),
      seasons: Math.floor(years * 4),
    };
  }, [now, birthdate]);

  const fmt = (n: number) => n.toLocaleString();

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-void)]">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 lg:py-20 space-y-8">
        
        {/* HEADER */}
        <header 
          className="flex items-start justify-between animate-in"
          style={{ animationDelay: '0ms' }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl text-display text-gold-glow tracking-tight">
              EXISTENCE
            </h1>
            <p className="text-[var(--text-muted)] mt-2 text-sm md:text-base">
              Born {birthdate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button 
            onClick={onReset}
            className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[rgba(255,255,255,0.1)] transition-all"
            title="Change birthdate"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        {/* HERO: SECONDS COUNTER */}
        <section 
          className="card card-hero animate-in"
          style={{ animationDelay: '50ms' }}
        >
          <div className="live-badge mb-8">
            <span className="live-dot" />
            <span>Live</span>
          </div>
          
          <div className="hero-counter font-mono text-gold-glow">
            {fmt(data.seconds)}
          </div>
          
          <p className="text-[var(--text-secondary)] text-lg mt-4">
            seconds you&apos;ve been alive
          </p>
        </section>

        {/* PRIMARY STATS - 2x2 GRID */}
        <section 
          className="grid grid-cols-2 gap-4 md:gap-6 animate-in"
          style={{ animationDelay: '100ms' }}
        >
          <div className="card">
            <div className="section-icon mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-mono font-semibold text-[var(--text-bright)]">
              {data.years.toFixed(2)}
            </div>
            <p className="text-[var(--text-muted)] mt-2">years old</p>
          </div>
          
          <div className="card">
            <div className="section-icon mb-4">
              <Timer className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.days)}
            </div>
            <p className="text-[var(--text-muted)] mt-2">days lived</p>
          </div>
          
          <div className="card">
            <div className="section-icon mb-4">
              <Hourglass className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.daysLeft)}
            </div>
            <p className="text-[var(--text-muted)] mt-2">days remaining</p>
          </div>
          
          <div className="card">
            <div className="section-icon mb-4">
              <Percent className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-mono font-semibold text-[var(--text-bright)]">
              {data.progress.toFixed(1)}%
            </div>
            <p className="text-[var(--text-muted)] mt-2">life progress</p>
            <div className="progress-track mt-4">
              <div 
                className="progress-fill" 
                style={{ width: `${data.progress}%` }} 
              />
            </div>
          </div>
        </section>

        {/* BODY STATS */}
        <section 
          className="card animate-in"
          style={{ animationDelay: '150ms' }}
        >
          <div className="section-header">
            <div className="section-icon">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="section-title">Your Body</h2>
          </div>
          
          <div className="stat-row">
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">Heartbeats</span>
            </div>
            <span className="font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.heartbeats)}
            </span>
          </div>
          
          <div className="stat-row">
            <div className="flex items-center gap-3">
              <Wind className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">Breaths taken</span>
            </div>
            <span className="font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.breaths)}
            </span>
          </div>
          
          <div className="stat-row">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">Times you&apos;ve blinked</span>
            </div>
            <span className="font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.blinks)}
            </span>
          </div>
        </section>

        {/* WORLD STATS */}
        <section 
          className="card animate-in"
          style={{ animationDelay: '200ms' }}
        >
          <div className="section-header">
            <div className="section-icon">
              <Sunrise className="w-5 h-5" />
            </div>
            <h2 className="section-title">You&apos;ve Witnessed</h2>
          </div>
          
          <div className="stat-row">
            <div className="flex items-center gap-3">
              <Sunrise className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">Sunrises</span>
            </div>
            <span className="font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.sunrises)}
            </span>
          </div>
          
          <div className="stat-row">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">Full moons</span>
            </div>
            <span className="font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.moons)}
            </span>
          </div>
          
          <div className="stat-row">
            <div className="flex items-center gap-3">
              <Leaf className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-[var(--text-secondary)]">Seasons</span>
            </div>
            <span className="font-mono font-semibold text-[var(--text-bright)]">
              {fmt(data.seasons)}
            </span>
          </div>
        </section>

        {/* LIFE GRID - FULL WIDTH */}
        <section 
          className="card animate-in"
          style={{ animationDelay: '250ms' }}
        >
          <div className="section-header">
            <div className="section-icon">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="section-title">Your Life in Weeks</h2>
              <p className="text-[var(--text-muted)] text-sm mt-1">
                {fmt(Math.ceil(LIFESPAN * 52))} weeks · Each cell is one week
              </p>
            </div>
          </div>
          
          <div className="grid-legend mb-6">
            <div className="legend-item">
              <div className="legend-dot week-lived" />
              <span>Lived</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot week-now" />
              <span>This week</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot week-future" />
              <span>Future</span>
            </div>
          </div>
          
          <LifeGrid 
            weeksLived={data.weeks} 
            totalWeeks={Math.ceil(LIFESPAN * 52)} 
          />
        </section>

        {/* FOOTER */}
        <footer 
          className="text-center py-8 animate-in"
          style={{ animationDelay: '300ms' }}
        >
          <blockquote className="text-[var(--text-secondary)] text-base md:text-lg italic max-w-lg mx-auto">
            &ldquo;It is not the years in your life that count. It is the life in your years.&rdquo;
          </blockquote>
          <cite className="text-[var(--text-muted)] text-sm mt-3 block">
            — Abraham Lincoln
          </cite>
        </footer>
      </div>
    </div>
  );
}
