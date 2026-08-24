import { Card } from '../../../components/ui/Card';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CheckCircle2, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export const TodayProgressCard = ({ metrics }) => {
  const { total, completedCount, partiallyCount, missedCount, percentage } = metrics;

  return (
    <Card hoverEffect={true} className="relative overflow-hidden flex flex-col justify-between">
      <div>
        <SectionHeader
          icon={CheckCircle2}
          title="Today's Progress"
          subtitle="Daily task completion overview"
          rightAction={
            <div className="flex items-baseline gap-1 text-right bg-blue-50/80 border border-blue-100 px-3 py-1 rounded-xl">
              <span className="text-xl font-bold text-[#2563EB]">{percentage}%</span>
              <span className="text-xs font-semibold text-blue-600/70">Done</span>
            </div>
          }
        />

        {/* Progress Bar & Large Percentage Counter */}
        <div className="space-y-2 mt-5">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-[#64748B]">Target Completion</span>
            <span className="text-[#0F172A] font-bold">
              {completedCount} of {total} Tasks Completed
            </span>
          </div>
          
          <ProgressBar percentage={percentage} height="h-3" />
        </div>

        {/* Stat Badges Grid: Completed / Partial / Missed */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mt-5">
          <div className="p-2 sm:p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-xl flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22C55E] shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-900">Done</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#22C55E]">{completedCount}</span>
          </div>

          <div className="p-2 sm:p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B] shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-amber-900">Partial</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#F59E0B]">{partiallyCount}</span>
          </div>

          <div className="p-2 sm:p-3 bg-rose-50/60 border border-rose-200/60 rounded-xl flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EF4444] shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-rose-900">Missed</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#EF4444]">{missedCount}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span className="flex items-center gap-1.5 text-slate-600 font-medium">
          <TrendingUp className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>
            {percentage === 100
              ? 'All daily targets achieved!'
              : percentage >= 50
              ? 'Great momentum today'
              : 'Keep pushing forward'}
          </span>
        </span>
      </div>
    </Card>
  );
};
