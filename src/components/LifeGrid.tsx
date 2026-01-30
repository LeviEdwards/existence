'use client';

import { useMemo, useState } from 'react';

interface LifeGridProps {
  weeksLived: number;
  totalWeeks: number;
}

export function LifeGrid({ weeksLived, totalWeeks }: LifeGridProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const weeks = useMemo(() => {
    return Array.from({ length: totalWeeks }, (_, i) => {
      const weekNumber = i + 1;
      const yearNumber = Math.floor(i / 52);
      const weekOfYear = (i % 52) + 1;
      
      let status: 'lived' | 'current' | 'future';
      if (weekNumber < weeksLived) {
        status = 'lived';
      } else if (weekNumber === weeksLived) {
        status = 'current';
      } else {
        status = 'future';
      }

      return { weekNumber, yearNumber, weekOfYear, status };
    });
  }, [weeksLived, totalWeeks]);

  const getWeekTooltip = (week: typeof weeks[0]) => {
    const age = week.yearNumber;
    if (week.status === 'lived') {
      return `Week ${week.weekOfYear} of age ${age} - Lived ✓`;
    } else if (week.status === 'current') {
      return `Week ${week.weekOfYear} of age ${age} - NOW`;
    } else {
      return `Week ${week.weekOfYear} of age ${age} - Future`;
    }
  };

  // Group by years for visual clarity
  const years = useMemo(() => {
    const grouped: typeof weeks[] = [];
    for (let i = 0; i < weeks.length; i += 52) {
      grouped.push(weeks.slice(i, i + 52));
    }
    return grouped;
  }, [weeks]);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-existence-muted">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm week-lived" />
          <span>Lived</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm week-current" />
          <span>Now</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm week-future" />
          <span>Future</span>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[600px]">
          {/* Year labels on the left */}
          <div className="flex">
            <div className="w-8 flex-shrink-0" /> {/* Spacer for year labels */}
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-existence-muted/60 mb-1 px-1">
                <span>Week 1</span>
                <span>Week 26</span>
                <span>Week 52</span>
              </div>
            </div>
          </div>
          
          {years.map((yearWeeks, yearIndex) => (
            <div key={yearIndex} className="flex items-center group">
              {/* Year label */}
              <div className="w-8 flex-shrink-0 text-[10px] text-existence-muted/40 group-hover:text-existence-muted transition-colors">
                {yearIndex}
              </div>
              
              {/* Week cells */}
              <div className="flex-1 flex gap-[2px]">
                {yearWeeks.map((week) => (
                  <div
                    key={week.weekNumber}
                    className={`
                      w-[10px] h-[10px] rounded-[2px] transition-all duration-200 cursor-pointer
                      ${week.status === 'lived' ? 'week-lived hover:scale-150' : ''}
                      ${week.status === 'current' ? 'week-current hover:scale-150' : ''}
                      ${week.status === 'future' ? 'week-future hover:bg-existence-border' : ''}
                    `}
                    title={getWeekTooltip(week)}
                    onMouseEnter={() => setHoveredWeek(week.weekNumber)}
                    onMouseLeave={() => setHoveredWeek(null)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredWeek !== null && (
        <div className="text-center text-sm text-existence-muted">
          {getWeekTooltip(weeks[hoveredWeek - 1])}
        </div>
      )}
    </div>
  );
}
