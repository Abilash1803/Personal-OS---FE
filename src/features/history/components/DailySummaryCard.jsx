import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CheckCircle2, Zap, Clock, Calendar, PieChart } from 'lucide-react';

export const DailySummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <Card hoverEffect={false} className="space-y-4">
      <SectionHeader
        icon={PieChart}
        title="Daily Summary"
        subtitle={`Calculated productivity metrics for ${summary.dateStr}`}
        rightAction={
          <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
            {summary.completionRate}% Completion Rate
          </span>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-xl">
          <span className="text-[11px] font-semibold text-emerald-900 flex items-center gap-1 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            Tasks Completed
          </span>
          <span className="text-xl font-extrabold text-[#0F172A]">{summary.tasksCompleted}</span>
        </div>

        <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl">
          <span className="text-[11px] font-semibold text-blue-900 flex items-center gap-1 mb-1">
            <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
            Focus Sessions
          </span>
          <span className="text-xl font-extrabold text-[#0F172A]">{summary.focusSessionsCount}</span>
        </div>

        <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
          <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1 mb-1">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            Total Focus Time
          </span>
          <span className="text-base font-extrabold text-[#0F172A]">{summary.totalFocusTimeFormatted}</span>
        </div>

        <div className="p-3 bg-purple-50/60 border border-purple-200/60 rounded-xl">
          <span className="text-[11px] font-semibold text-purple-900 flex items-center gap-1 mb-1">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            Planner Events
          </span>
          <span className="text-xl font-extrabold text-[#0F172A]">{summary.plannerEventsCount}</span>
        </div>
      </div>
    </Card>
  );
};
