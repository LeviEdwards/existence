'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  icon: ReactNode;
  color?: 'cyan' | 'magenta' | 'amber' | 'emerald';
  progress?: number;
}

const colorClasses = {
  cyan: {
    icon: 'text-[var(--accent-cyan)]',
    value: 'text-[var(--accent-cyan)]',
    glow: 'glow-cyan',
    progress: 'from-[var(--accent-cyan)] to-[var(--accent-magenta)]',
  },
  magenta: {
    icon: 'text-[var(--accent-magenta)]',
    value: 'text-[var(--accent-magenta)]',
    glow: 'glow-magenta',
    progress: 'from-[var(--accent-magenta)] to-[var(--accent-amber)]',
  },
  amber: {
    icon: 'text-[var(--accent-amber)]',
    value: 'text-[var(--accent-amber)]',
    glow: 'glow-amber',
    progress: 'from-[var(--accent-amber)] to-[var(--accent-emerald)]',
  },
  emerald: {
    icon: 'text-[var(--accent-emerald)]',
    value: 'text-[var(--accent-emerald)]',
    glow: '',
    progress: 'from-[var(--accent-emerald)] to-[var(--accent-cyan)]',
  },
};

export function StatCard({ 
  label, 
  value, 
  sublabel, 
  icon, 
  color = 'cyan',
  progress 
}: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`glass glass-hover rounded-2xl p-4 md:p-5 lg:p-6 ${colors.glow}`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`${colors.icon} icon-glow`}>
          {icon}
        </span>
      </div>
      
      <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${colors.value}`} style={{ fontFamily: 'var(--font-mono)' }}>
        {value}
      </div>
      
      <div className="mt-2">
        <div className="text-[var(--text-secondary)] text-sm font-medium">{label}</div>
        {sublabel && (
          <div className="text-[var(--text-muted)] text-xs mt-0.5">{sublabel}</div>
        )}
      </div>
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="progress-track h-1.5">
            <div 
              className="progress-fill h-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
