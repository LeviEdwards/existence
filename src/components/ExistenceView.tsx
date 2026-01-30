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
  Trees,
  Settings2,
  Grid3X3
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
    <div className="min-h-screen py-12 md:py-20">
      <div className="container space-y-8 md:space-y-12">
        
        {/* ===== HEADER ===== */}
        <header className="flex items-start justify-between animate" style={{ animationDelay: '0ms' }}>
          <div>
            <h1 className="display text-4xl md:text-5xl text-gold text-glow">
              EXISTENCE
            </h1>
            <p className="text-gray-500 mt-3">
              Born {birthdate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button 
            onClick={onReset}
            className="p-3 rounded-xl bg-[var(--card)] border border-[var(--card-border)] text-[var(--gray-500)] hover:text-white hover:border-[rgba(255,255,255,0.1)] transition-all"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </header>

        {/* ===== HERO: LIVE COUNTER ===== */}
        <section className="card card-featured text-center animate" style={{ animationDelay: '50ms' }}>
          <div className="live-pill mx-auto mb-10">
            <span className="live-dot" />
            Live
          </div>
          <div className="hero-number">{f(d.secs)}</div>
          <p className="text-[var(--gray-500)] text-lg mt-6">seconds alive</p>
        </section>

        {/* ===== 3-COLUMN STATS ===== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate" style={{ animationDelay: '100ms' }}>
          <div className="card">
            <div className="icon-box">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="stat-value">{d.years.toFixed(2)}</div>
            <div className="stat-label">Years old</div>
          </div>
          
          <div className="card">
            <div className="icon-box">
              <Clock className="w-5 h-5" />
            </div>
            <div className="stat-value">{f(d.days)}</div>
            <div className="stat-label">Days lived</div>
          </div>
          
          <div className="card">
            <div className="icon-box">
              <Hourglass className="w-5 h-5" />
            </div>
            <div className="stat-value">{f(d.left)}</div>
            <div className="stat-label">Days remaining</div>
          </div>
        </section>

        {/* ===== PROGRESS ===== */}
        <section className="card animate" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
              <span className="font-semibold">Life Progress</span>
            </div>
            <span className="mono font-semibold text-lg">{d.pct.toFixed(1)}%</span>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${d.pct}%` }} />
          </div>
        </section>

        {/* ===== 2-COLUMN: BODY + WORLD ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          
          {/* Body */}
          <div className="card animate" style={{ animationDelay: '200ms' }}>
            <div className="section-header">
              <div className="icon-box" style={{ marginBottom: 0 }}>
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="section-title">Your Body</h2>
            </div>
            
            <div className="list-row">
              <div className="list-label">
                <Heart className="w-4 h-4 list-icon" />
                Heartbeats
              </div>
              <span className="list-value">{f(d.heart)}</span>
            </div>
            
            <div className="list-row">
              <div className="list-label">
                <Wind className="w-4 h-4 list-icon" />
                Breaths
              </div>
              <span className="list-value">{f(d.breath)}</span>
            </div>
            
            <div className="list-row">
              <div className="list-label">
                <Eye className="w-4 h-4 list-icon" />
                Blinks
              </div>
              <span className="list-value">{f(d.blink)}</span>
            </div>
          </div>

          {/* World */}
          <div className="card animate" style={{ animationDelay: '250ms' }}>
            <div className="section-header">
              <div className="icon-box" style={{ marginBottom: 0 }}>
                <Sunrise className="w-5 h-5" />
              </div>
              <h2 className="section-title">You&apos;ve Witnessed</h2>
            </div>
            
            <div className="list-row">
              <div className="list-label">
                <Sunrise className="w-4 h-4 list-icon" />
                Sunrises
              </div>
              <span className="list-value">{f(d.sun)}</span>
            </div>
            
            <div className="list-row">
              <div className="list-label">
                <Moon className="w-4 h-4 list-icon" />
                Full moons
              </div>
              <span className="list-value">{f(d.moon)}</span>
            </div>
            
            <div className="list-row">
              <div className="list-label">
                <Trees className="w-4 h-4 list-icon" />
                Seasons
              </div>
              <span className="list-value">{f(d.season)}</span>
            </div>
          </div>
        </section>

        {/* ===== LIFE GRID (FULL WIDTH) ===== */}
        <section className="card animate" style={{ animationDelay: '300ms' }}>
          <div className="section-header">
            <div className="icon-box" style={{ marginBottom: 0 }}>
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="section-title">Your Life in Weeks</h2>
              <p className="text-[var(--gray-500)] text-sm mt-1">
                {f(Math.ceil(LIFESPAN * 52))} weeks total · Each cell = 1 week
              </p>
            </div>
          </div>
          
          <div className="legend">
            <div className="legend-item">
              <div className="legend-dot week-past" />
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

        {/* ===== FOOTER ===== */}
        <footer className="text-center py-10 animate" style={{ animationDelay: '350ms' }}>
          <p className="text-[var(--gray-500)] italic max-w-md mx-auto">
            &ldquo;It is not the years in your life that count. It is the life in your years.&rdquo;
          </p>
          <p className="text-[var(--gray-700)] text-sm mt-3">— Abraham Lincoln</p>
        </footer>
      </div>
    </div>
  );
}
