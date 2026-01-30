'use client';

import { useState, useEffect, useMemo } from 'react';
import { LifeGrid } from './LifeGrid';
import { StatCard } from './StatCard';
import { 
  Clock, 
  Calendar, 
  Hourglass, 
  TrendingUp, 
  Heart, 
  Wind, 
  Eye,
  Sun,
  Moon,
  Leaf,
  Sparkles,
  RotateCcw,
  Zap
} from 'lucide-react';

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
    // Trigger reveal animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Update every 100ms for smooth counting
    const interval = setInterval(() => {
      setNow(new Date());
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
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
    const percentLived = Math.min((msLived / avgLifespanMs) * 100, 100);

    const heartbeats = Math.floor(minutesLived * HEARTBEATS_PER_MINUTE);
    const breaths = Math.floor(minutesLived * BREATHS_PER_MINUTE);
    const blinks = Math.floor(minutesLived * BLINKS_PER_MINUTE);

    const sunrises = daysLived;
    const fullMoons = Math.floor(daysLived / 29.53);
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

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header */}
        <header 
          className="flex items-center justify-between animate-reveal"
          style={{ animationDelay: '0ms' }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text">
              EXISTENCE
            </h1>
            <p className="text-[var(--text-secondary)] text-sm md:text-base mt-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-amber)]" />
              Born {birthdate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={onReset}
            className="glass glass-hover rounded-full p-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </header>

        {/* Hero Counter */}
        <div 
          className="glass glow-cyan rounded-3xl p-8 md:p-12 lg:p-16 text-center animate-reveal-scale"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent-cyan)] icon-glow" />
            <p className="text-[var(--text-secondary)] text-sm md:text-base uppercase tracking-[0.3em] font-medium">
              Seconds Alive
            </p>
          </div>
          
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-glow-cyan" style={{ fontFamily: 'var(--font-mono)' }}>
            {formatNumber(stats.secondsLived)}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] pulse-dot" />
            <span className="text-[var(--text-secondary)] text-sm tracking-wide">and counting</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 animate-reveal"
          style={{ animationDelay: '200ms' }}
        >
          <StatCard
            label="Years"
            value={stats.yearsLived.toFixed(2)}
            icon={<Calendar className="w-5 h-5" />}
            color="cyan"
          />
          <StatCard
            label="Days Lived"
            value={formatNumber(stats.daysLived)}
            icon={<Clock className="w-5 h-5" />}
            color="magenta"
          />
          <StatCard
            label="Days Left"
            value={formatNumber(stats.daysRemaining)}
            sublabel="avg. lifespan"
            icon={<Hourglass className="w-5 h-5" />}
            color="amber"
          />
          <StatCard
            label="Progress"
            value={`${stats.percentLived.toFixed(1)}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="emerald"
            progress={stats.percentLived}
          />
        </div>

        {/* Body & World Stats - Side by Side on Large Screens */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          
          {/* Body Stats */}
          <div 
            className="glass glow-magenta rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 animate-reveal"
            style={{ animationDelay: '300ms' }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-3">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent-magenta)] icon-glow" />
              <span className="gradient-text">Your Body</span>
            </h2>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="text-center group">
                <div className="mb-2 flex justify-center">
                  <Heart className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-rose-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatNumber(stats.heartbeats)}
                </div>
                <div className="text-[var(--text-muted)] text-xs md:text-sm mt-1">heartbeats</div>
              </div>
              
              <div className="text-center group">
                <div className="mb-2 flex justify-center">
                  <Wind className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatNumber(stats.breaths)}
                </div>
                <div className="text-[var(--text-muted)] text-xs md:text-sm mt-1">breaths</div>
              </div>
              
              <div className="text-center group">
                <div className="mb-2 flex justify-center">
                  <Eye className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatNumber(stats.blinks)}
                </div>
                <div className="text-[var(--text-muted)] text-xs md:text-sm mt-1">blinks</div>
              </div>
            </div>
          </div>

          {/* World Stats */}
          <div 
            className="glass glow-amber rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 animate-reveal"
            style={{ animationDelay: '400ms' }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-3">
              <Sun className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent-amber)] icon-glow" />
              <span className="gradient-text">You&apos;ve Witnessed</span>
            </h2>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="text-center group">
                <div className="mb-2 flex justify-center">
                  <Sun className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatNumber(stats.sunrises)}
                </div>
                <div className="text-[var(--text-muted)] text-xs md:text-sm mt-1">sunrises</div>
              </div>
              
              <div className="text-center group">
                <div className="mb-2 flex justify-center">
                  <Moon className="w-6 h-6 text-slate-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-300" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatNumber(stats.fullMoons)}
                </div>
                <div className="text-[var(--text-muted)] text-xs md:text-sm mt-1">full moons</div>
              </div>
              
              <div className="text-center group">
                <div className="mb-2 flex justify-center">
                  <Leaf className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatNumber(stats.seasons)}
                </div>
                <div className="text-[var(--text-muted)] text-xs md:text-sm mt-1">seasons</div>
              </div>
            </div>
          </div>
        </div>

        {/* Life Grid */}
        <div 
          className="glass rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 animate-reveal"
          style={{ animationDelay: '500ms' }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[var(--accent-cyan)] icon-glow" />
                <span className="gradient-text">Life in Weeks</span>
              </h2>
              <p className="text-[var(--text-muted)] text-sm mt-2">
                Each cell = one week of your life
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm week-lived" />
                <span className="text-[var(--text-secondary)]">Lived</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm week-current" />
                <span className="text-[var(--text-secondary)]">Now</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm week-future" />
                <span className="text-[var(--text-secondary)]">Future</span>
              </div>
            </div>
          </div>
          
          <LifeGrid 
            weeksLived={stats.weeksLived} 
            totalWeeks={Math.ceil(AVERAGE_LIFESPAN_YEARS * 52)} 
          />
        </div>

        {/* Footer Quote */}
        <footer 
          className="text-center py-8 md:py-12 animate-reveal"
          style={{ animationDelay: '600ms' }}
        >
          <blockquote className="text-[var(--text-secondary)] text-base md:text-lg italic max-w-2xl mx-auto">
            &ldquo;In the end, it&apos;s not the years in your life that count. It&apos;s the life in your years.&rdquo;
          </blockquote>
          <cite className="text-[var(--text-muted)] text-sm mt-3 block">— Abraham Lincoln</cite>
        </footer>
      </div>
    </div>
  );
}
