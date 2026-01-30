'use client';

interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  icon: string;
  progress?: number;
}

export function StatCard({ label, value, sublabel, icon, progress }: StatCardProps) {
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden">
      {progress !== undefined && (
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-existence-accent to-existence-glow transition-all duration-500"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      )}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-existence-muted text-xs uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-2xl md:text-3xl font-mono font-light">
            {value}
          </p>
          {sublabel && (
            <p className="text-existence-muted/60 text-xs mt-1">
              {sublabel}
            </p>
          )}
        </div>
        <span className="text-2xl opacity-60">{icon}</span>
      </div>
    </div>
  );
}
