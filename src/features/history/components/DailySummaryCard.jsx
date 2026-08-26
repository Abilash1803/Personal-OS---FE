import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CheckCircle2, Zap, Clock, Calendar, PieChart } from 'lucide-react';

export const DailySummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <Card hoverEffect={false} className="p-4 sm:p-6 space-y-4">
      <SectionHeader
        icon={PieChart}
        title="Daily Summary"
        subtitle={`Productivity metrics for ${summary.dateStr}`}
        rightAction={
          <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 whitespace-nowrap shrink-0">
            {summary.completionRate}% Done
          </span>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
        <div className="p-2.5 sm:p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-xl min-w-0">
          <span className="text-[11px] font-semibold text-emerald-900 flex items-center gap-1 mb-1 truncate">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span className="truncate">Completed</span>
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#0F172A] block font-mono">
            {summary.tasksCompleted}
          </span>
        </div>

        <div className="p-2.5 sm:p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl min-w-0">
          <span className="text-[11px] font-semibold text-blue-900 flex items-center gap-1 mb-1 truncate">
            <Zap className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span className="truncate">Focus Sessions</span>
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#0F172A] block font-mono">
            {summary.focusSessionsCount}
          </span>
        </div>

        <div className="p-2.5 sm:p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl min-w-0">
          <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1 mb-1 truncate">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            <span className="truncate">Focus Time</span>
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#0F172A] block font-mono truncate">
            {summary.totalFocusTimeFormatted}
          </span>
        </div>

        <div className="p-2.5 sm:p-3 bg-purple-50/60 border border-purple-200/60 rounded-xl min-w-0">
          <span className="text-[11px] font-semibold text-purple-900 flex items-center gap-1 mb-1 truncate">
            <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="truncate">Events</span>
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#0F172A] block font-mono">
            {summary.plannerEventsCount}
          </span>
        </div>
      </div>
    </Card>
  );
};
