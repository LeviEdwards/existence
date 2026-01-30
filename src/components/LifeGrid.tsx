'use client';

import { useMemo } from 'react';

interface LifeGridProps {
  weeksLived: number;
  totalWeeks: number;
}

export function LifeGrid({ weeksLived, totalWeeks }: LifeGridProps) {
  const rows = useMemo(() => {
    const weeksPerRow = 52; // One year per row
    const numRows = Math.ceil(totalWeeks / weeksPerRow);
    const result = [];
    
    for (let row = 0; row < numRows; row++) {
      const weeks = [];
      for (let col = 0; col < weeksPerRow; col++) {
        const weekNum = row * weeksPerRow + col;
        if (weekNum < totalWeeks) {
          weeks.push(weekNum);
        }
      }
      result.push({ row, weeks });
    }
    
    return result;
  }, [totalWeeks]);

  const getWeekClass = (weekNum: number) => {
    if (weekNum < weeksLived) {
      return 'week-lived';
    } else if (weekNum === weeksLived) {
      return 'week-current';
    } else {
      return 'week-future';
    }
  };

  const getYearLabel = (row: number) => {
    const age = row;
    if (age % 10 === 0 || age === 0) {
      return age;
    }
    return null;
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-fit">
        {rows.map(({ row, weeks }) => (
          <div key={row} className="flex items-center gap-0.5 md:gap-1 mb-0.5 md:mb-1">
            {/* Year label */}
            <div className="w-6 md:w-8 text-right pr-2 md:pr-3 text-[var(--text-muted)] text-[10px] md:text-xs font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
              {getYearLabel(row) !== null ? getYearLabel(row) : ''}
            </div>
            
            {/* Week cells */}
            <div className="flex gap-[1px] md:gap-[2px]">
              {weeks.map((weekNum) => (
                <div
                  key={weekNum}
                  className={`
                    week-cell
                    w-[3px] h-[3px]
                    md:w-[5px] md:h-[5px]
                    lg:w-[6px] lg:h-[6px]
                    rounded-[1px]
                    ${getWeekClass(weekNum)}
                  `}
                  title={`Week ${weekNum + 1} (Age ${Math.floor(weekNum / 52)})`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Age labels at bottom */}
      <div className="flex items-center gap-0.5 md:gap-1 mt-2 pt-2 border-t border-white/5">
        <div className="w-6 md:w-8" />
        <div className="flex justify-between text-[10px] md:text-xs text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)', width: 'calc(52 * (3px + 1px) - 1px)', maxWidth: 'calc(52 * (6px + 2px) - 2px)' }}>
          <span>Jan</span>
          <span>Apr</span>
          <span>Jul</span>
          <span>Oct</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}
