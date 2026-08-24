import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { PieChart } from 'lucide-react';

export const TimeDistributionChart = ({ timeDistribution = [] }) => {
  if (!timeDistribution || timeDistribution.length === 0) return null;

  const totalHours = timeDistribution.reduce((sum, item) => sum + item.hours, 0);

  return (
    <Card hoverEffect={false} className="space-y-4">
      <SectionHeader
        icon={PieChart}
        title="Time Distribution"
        subtitle="Focus hours allocated across Life Areas"
      />

      <div className="space-y-3">
        {timeDistribution.map((item) => {
          const percentage = totalHours > 0 ? Math.round((item.hours / totalHours) * 100) : 25;
          return (
            <div key={item.name} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color || '#2563EB' }}
                />
                <span className="text-xs font-semibold text-[#0F172A]">{item.name}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-bold text-[#0F172A]">{item.hours} hrs</span>
                <span className="text-slate-400">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
