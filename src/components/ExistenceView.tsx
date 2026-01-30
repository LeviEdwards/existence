'use client';

import { useState, useEffect, useMemo } from 'react';
import { LifeGrid } from './LifeGrid';
import { StatCard } from './StatCard';

interface ExistenceViewProps {
  birthdate: Date;
  onReset: () => void;
}

const AVERAGE_LIFESPAN_YEARS = 78.5;
const HEARTBEATS_PER_MINUTE = 72;
const BREATHS_PER_MINUTE = 16;
const BLINKS_PER_MINUTE = 17;

export function ExistenceView({ birthdate, onReset }: ExistenceViewProps) {
  const [now, setNow] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setNow(new Date());
    }, 100); // Update 10 times per second for smooth counting
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const msLived = now.getTime() - birthdate.getTime();
    const secondsLived = Math.floor(msLived / 1000);
    const minutesLived = Math.floor(msLived / 60000);
    const hoursLived = Math.floor(msLived / 3600000);
    const daysLived = Math.floor(msLived / 86400000);
    const weeksLived = Math.floor(daysLived / 7);
    const yearsLived = msLived / (365.25 * 24 * 60 * 60 * 1000);
    
    const avgLifespanMs = AVERAGE_LIFESPAN_YEARS * 365.25 * 24 * 60 * 60 * 1000;
    const msRemaining = Math.max(0, avgLifespanMs - msLived);
    const daysRemaining = Math.floor(msRemaining / 86400000);
    const percentLived = (msLived / avgLifespanMs) * 100;

    const heartbeats = Math.floor(minutesLived * HEARTBEATS_PER_MINUTE);
    const breaths = Math.floor(minutesLived * BREATHS_PER_MINUTE);
    const blinks = Math.floor(minutesLived * BLINKS_PER_MINUTE);

    // Calculate sunrises (one per day lived)
    const sunrises = daysLived;
    
    // Calculate full moons (average 29.53 days per lunar cycle)
    const fullMoons = Math.floor(daysLived / 29.53);
    
    // Calculate seasons (4 per year)
    const seasons = Math.floor(yearsLived * 4);

    return {
      secondsLived,
      minutesLived,
      hoursLived,
      daysLived,
      weeksLived,
      yearsLived,
      daysRemaining,
      percentLived,
      heartbeats,
      breaths,
      blinks,
      sunrises,
      fullMoons,
      seasons,
    };
  }, [now, birthdate]);

  const formatLargeNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight glow-text">
              Existence
            </h1>
            <p className="text-existence-muted text-sm mt-1">
              Born {birthdate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={onReset}
            className="text-existence-muted hover:text-existence-text text-sm transition-colors"
          >
            Reset
          </button>
        </header>

        {/* Main Counter */}
        <div className="glass rounded-3xl p-8 md:p-12 text-center">
          <p className="text-existence-muted text-sm uppercase tracking-widest mb-4">
            Seconds Alive
          </p>
          <div className="text-5xl md:text-7xl lg:text-8xl font-mono font-light tracking-tight animate-tick">
            {formatLargeNumber(stats.secondsLived)}
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-existence-muted">
            <span className="w-2 h-2 bg-existence-lived rounded-full animate-pulse" />
            <span className="text-sm">and counting</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Years"
            value={stats.yearsLived.toFixed(2)}
            icon="🎂"
          />
          <StatCard
            label="Days Lived"
            value={formatLargeNumber(stats.daysLived)}
            icon="☀️"
          />
          <StatCard
            label="Days Remaining"
            value={formatLargeNumber(stats.daysRemaining)}
            sublabel="(average lifespan)"
            icon="⏳"
          />
          <StatCard
            label="Life Progress"
            value={`${stats.percentLived.toFixed(1)}%`}
            icon="📊"
            progress={stats.percentLived}
          />
        </div>

        {/* Body Stats */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <span>💓</span> Your Body Has...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-light text-red-400">
                {formatLargeNumber(stats.heartbeats)}
              </div>
              <div className="text-existence-muted text-sm mt-1">heartbeats</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-light text-blue-400">
                {formatLargeNumber(stats.breaths)}
              </div>
              <div className="text-existence-muted text-sm mt-1">breaths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-light text-amber-400">
                {formatLargeNumber(stats.blinks)}
              </div>
              <div className="text-existence-muted text-sm mt-1">blinks</div>
            </div>
          </div>
        </div>

        {/* World Stats */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <span>🌍</span> You Have Witnessed...
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-light text-orange-400">
                {formatLargeNumber(stats.sunrises)}
              </div>
              <div className="text-existence-muted text-sm mt-1">sunrises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-light text-slate-300">
                {formatLargeNumber(stats.fullMoons)}
              </div>
              <div className="text-existence-muted text-sm mt-1">full moons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-light text-emerald-400">
                {formatLargeNumber(stats.seasons)}
              </div>
              <div className="text-existence-muted text-sm mt-1">seasons</div>
            </div>
          </div>
        </div>

        {/* Life Grid */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
            <span>📅</span> Your Life in Weeks
          </h2>
          <p className="text-existence-muted text-sm mb-6">
            Each square is one week. Green = lived. Purple = now. Gray = future.
          </p>
          <LifeGrid 
            weeksLived={stats.weeksLived} 
            totalWeeks={Math.ceil(AVERAGE_LIFESPAN_YEARS * 52)} 
          />
        </div>

        {/* Footer */}
        <footer className="text-center text-existence-muted text-sm py-8">
          <p className="italic mb-2">
            "In the end, it's not the years in your life that count. It's the life in your years."
          </p>
          <p className="text-existence-muted/60">— Abraham Lincoln</p>
        </footer>
      </div>
    </div>
  );
}
