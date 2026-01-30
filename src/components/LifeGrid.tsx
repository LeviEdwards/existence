'use client';

import { useMemo } from 'react';

interface Props {
  weeksLived: number;
  totalWeeks: number;
}

export function LifeGrid({ weeksLived, totalWeeks }: Props) {
  const WEEKS_PER_YEAR = 52;
  
  const rows = useMemo(() => {
    const years = Math.ceil(totalWeeks / WEEKS_PER_YEAR);
    const result = [];
    
    for (let y = 0; y < years; y++) {
      const weeks = [];
      for (let w = 0; w < WEEKS_PER_YEAR; w++) {
        const num = y * WEEKS_PER_YEAR + w;
        if (num < totalWeeks) weeks.push(num);
      }
      result.push({ year: y, weeks });
    }
    return result;
  }, [totalWeeks]);

  const weekClass = (n: number) => {
    if (n < weeksLived) return 'week week-lived';
    if (n === weeksLived) return 'week week-now';
    return 'week week-future';
  };

  return (
    <div className="life-grid-container">
      {rows.map(({ year, weeks }) => (
        <div key={year} className="life-grid-row">
          <div className="life-grid-label">
            {year % 10 === 0 ? year : ''}
          </div>
          <div className="life-grid-weeks">
            {weeks.map((w) => (
              <div
                key={w}
                className={weekClass(w)}
                title={`Week ${w + 1} · Age ${Math.floor(w / 52)}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
