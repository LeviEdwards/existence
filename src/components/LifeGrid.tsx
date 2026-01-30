'use client';

import { useMemo } from 'react';

interface LifeGridProps {
  weeksLived: number;
  totalWeeks: number;
}

export function LifeGrid({ weeksLived, totalWeeks }: LifeGridProps) {
  const WEEKS_PER_YEAR = 52;
  
  const years = useMemo(() => {
    const result = [];
    const totalYears = Math.ceil(totalWeeks / WEEKS_PER_YEAR);
    
    for (let year = 0; year < totalYears; year++) {
      const weeks = [];
      for (let week = 0; week < WEEKS_PER_YEAR; week++) {
        const weekNum = year * WEEKS_PER_YEAR + week;
        if (weekNum < totalWeeks) {
          weeks.push(weekNum);
        }
      }
      result.push({ year, weeks });
    }
    return result;
  }, [totalWeeks]);

  const getClass = (week: number) => {
    if (week < weeksLived) return 'week-lived';
    if (week === weeksLived) return 'week-current';
    return 'week-future';
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-fit">
        {years.map(({ year, weeks }) => (
          <div key={year} className="flex items-center gap-1 mb-1">
            <div className="w-8 text-right pr-2 text-[10px] text-[var(--text-muted)] text-mono">
              {year % 10 === 0 ? year : ''}
            </div>
            <div className="flex gap-[2px]">
              {weeks.map((week) => (
                <div
                  key={week}
                  className={`week-cell ${getClass(week)}`}
                  title={`Week ${week + 1} · Age ${Math.floor(week / 52)}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
