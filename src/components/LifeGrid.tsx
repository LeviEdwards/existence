'use client';

import { useMemo } from 'react';

interface Props {
  weeks: number;
  total: number;
}

export function LifeGrid({ weeks, total }: Props) {
  const rows = useMemo(() => {
    const result = [];
    const years = Math.ceil(total / 52);
    
    for (let y = 0; y < years; y++) {
      const w = [];
      for (let i = 0; i < 52; i++) {
        const n = y * 52 + i;
        if (n < total) w.push(n);
      }
      result.push({ year: y, weeks: w });
    }
    return result;
  }, [total]);

  const cls = (n: number) => {
    if (n < weeks) return 'week week-past';
    if (n === weeks) return 'week week-now';
    return 'week week-future';
  };

  return (
    <div className="grid-container">
      {rows.map(({ year, weeks: w }) => (
        <div key={year} className="grid-row">
          <div className="grid-label">
            {year % 10 === 0 ? year : ''}
          </div>
          <div className="grid-weeks">
            {w.map((n) => (
              <div key={n} className={cls(n)} title={`Week ${n + 1} · Age ${Math.floor(n / 52)}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
