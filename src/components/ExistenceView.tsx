'use client';

import { useState, useEffect, useMemo } from 'react';
import { LifeGrid } from './LifeGrid';
import { 
  Clock, 
  Calendar, 
  Hourglass, 
  Activity,
  Heart, 
  Wind, 
  Eye,
  Sun,
  Moon,
  TreeDeciduous,
  RotateCcw,
  Radio
} from 'lucide-react';

interface ExistenceViewProps {
  birthdate: Date;
  onReset: () => void;
}

const AVERAGE_LIFESPAN = 78.5;
const HEARTBEATS_PER_MIN = 72;
const BREATHS_PER_MIN = 16;
const BLINKS_PER_MIN = 17;

export function ExistenceView({ birthdate, onReset }: ExistenceViewProps) {
  const [now, setNow] = useState(new Date());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const ms = now.getTime() - birthdate.getTime();
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(ms / 60000);
    const days = Math.floor(ms / 86400000);
    const weeks = Math.floor(days / 7);
    const years = ms / (365.25 * 24 * 60 * 60 * 1000);
    
    const lifespanMs = AVERAGE_LIFESPAN * 365.25 * 24 * 60 * 60 * 1000;
    const remaining = Math.max(0, Math.floor((lifespanMs - ms) / 86400000));
    const progress = Math.min((ms / lifespanMs) * 100, 100);

    return {
      seconds,
      days,
      weeks,
      years,
      remaining,
      progress,
      heartbeats: Math.floor(minutes * HEARTBEATS_PER_MIN),
      breaths: Math.floor(minutes * BREATHS_PER_MIN),
      blinks: Math.floor(minutes * BLINKS_PER_MIN),
      sunrises: days,
      moons: Math.floor(days / 29.53),
      seasons: Math.floor(years * 4),
    };
  }, [now, birthdate]);

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="page-bg" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Header */}
        <header className="flex items-start justify-between mb-12 animate-in" style={{ animationDelay: '0ms' }}>
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-display text-accent-glow mb-2">
              EXISTENCE
            </h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base">
              Born {birthdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={onReset}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </header>

        {/* Hero: Seconds Counter */}
        <section className="card card-highlight p-6 sm:p-8 lg:p-10 mb-8 animate-in" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-accent pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Live</span>
          </div>
          <div className="hero-number text-mono font-bold text-accent-glow tracking-tight">
            {fmt(stats.seconds)}
          </div>
          <p className="text-[var(--text-secondary)] mt-2">seconds alive</p>
        </section>

        {/* Primary Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-in" style={{ animationDelay: '100ms' }}>
          <div className="card p-5">
            <Calendar className="w-5 h-5 text-accent mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-mono">{stats.years.toFixed(2)}</div>
            <p className="text-sm text-[var(--text-muted)] mt-1">years old</p>
          </div>
          
          <div className="card p-5">
            <Clock className="w-5 h-5 text-accent mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-mono">{fmt(stats.days)}</div>
            <p className="text-sm text-[var(--text-muted)] mt-1">days lived</p>
          </div>
          
          <div className="card p-5">
            <Hourglass className="w-5 h-5 text-accent mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-mono">{fmt(stats.remaining)}</div>
            <p className="text-sm text-[var(--text-muted)] mt-1">days remaining</p>
          </div>
          
          <div className="card p-5">
            <Activity className="w-5 h-5 text-accent mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-mono">{stats.progress.toFixed(1)}%</div>
            <p className="text-sm text-[var(--text-muted)] mt-1">life progress</p>
            <div className="progress-bar mt-3">
              <div className="progress-fill" style={{ width: `${stats.progress}%` }} />
            </div>
          </div>
        </section>

        {/* Two Column: Body + World */}
        <section className="grid lg:grid-cols-2 gap-4 mb-8">
          
          {/* Body Stats */}
          <div className="card p-6 animate-in" style={{ animationDelay: '150ms' }}>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              Body
            </h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-secondary)]">Heartbeats</span>
                </div>
                <span className="text-mono font-semibold">{fmt(stats.heartbeats)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wind className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-secondary)]">Breaths</span>
                </div>
                <span className="text-mono font-semibold">{fmt(stats.breaths)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-secondary)]">Blinks</span>
                </div>
                <span className="text-mono font-semibold">{fmt(stats.blinks)}</span>
              </div>
            </div>
          </div>

          {/* World Stats */}
          <div className="card p-6 animate-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Sun className="w-5 h-5 text-accent" />
              Witnessed
            </h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-secondary)]">Sunrises</span>
                </div>
                <span className="text-mono font-semibold">{fmt(stats.sunrises)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-secondary)]">Full Moons</span>
                </div>
                <span className="text-mono font-semibold">{fmt(stats.moons)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TreeDeciduous className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-secondary)]">Seasons</span>
                </div>
                <span className="text-mono font-semibold">{fmt(stats.seasons)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Life Grid */}
        <section className="card p-6 animate-in" style={{ animationDelay: '250ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Your Life in Weeks
              </h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Each cell represents one week · {Math.ceil(AVERAGE_LIFESPAN * 52).toLocaleString()} weeks total
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm week-lived" />
                <span className="text-[var(--text-muted)]">Lived</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm week-current" />
                <span className="text-[var(--text-muted)]">Now</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm week-future" />
                <span className="text-[var(--text-muted)]">Future</span>
              </div>
            </div>
          </div>
          <LifeGrid 
            weeksLived={stats.weeks} 
            totalWeeks={Math.ceil(AVERAGE_LIFESPAN * 52)} 
          />
        </section>

        {/* Footer */}
        <footer className="text-center py-12 text-[var(--text-muted)] text-sm animate-in" style={{ animationDelay: '300ms' }}>
          <p className="italic max-w-md mx-auto">
            "It is not the years in your life that count. It is the life in your years."
          </p>
          <p className="mt-2 text-xs">— Abraham Lincoln</p>
        </footer>
      </div>
    </div>
  );
}
