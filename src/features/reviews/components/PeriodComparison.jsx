import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { GitCompare } from 'lucide-react';

export const PeriodComparison = ({ comparisons }) => {
  if (!comparisons) return null;

  const items = [
    { label: 'Completion Rate', data: comparisons.completion },
    { label: 'Total Focus Time', data: comparisons.focusTime },
    { label: 'Planner Accuracy', data: comparisons.plannerAccuracy },
  ];

  return (
    <Card hoverEffect={false} className="space-y-4 p-5">
      <SectionHeader
        icon={GitCompare}
        title="Period Comparison"
        subtitle="Performance delta compared to previous period"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item) => {
          if (!item.data) return null;
          const isUp = item.data.direction === 'up';
          const isDown = item.data.direction === 'down';

          return (
            <div key={item.label} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">
                {item.label}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-[#0F172A]">
                  {item.data.currentVal}%
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                    isUp
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : isDown
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {item.data.formattedChange}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
