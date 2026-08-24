import { Card } from '../../../components/ui/Card';
import { CheckCircle2, Zap, Target, AlertTriangle } from 'lucide-react';

export const ReviewMetricGrid = ({ metrics, strongestLifeArea, weakestLifeArea }) => {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Tasks Metric */}
      <Card hoverEffect={true} className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Tasks Performance</span>
        </div>
        <div className="text-xl font-extrabold text-[#0F172A]">
          {metrics.tasksCompleted} / {metrics.tasksPlanned} Completed
        </div>
        <span className="text-[11px] text-slate-400 font-medium block">
          {metrics.completionRate}% Completion Rate
        </span>
      </Card>

      {/* Focus Metric */}
      <Card hoverEffect={true} className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Zap className="w-4 h-4 text-blue-600" />
          <span>Focus Execution</span>
        </div>
        <div className="text-xl font-extrabold text-[#0F172A]">
          {metrics.focusTimeFormatted}
        </div>
        <span className="text-[11px] text-slate-400 font-medium block">
          {metrics.focusSessionsCount || 0} Total Sessions
        </span>
      </Card>

      {/* Strongest Area Metric */}
      <Card hoverEffect={true} className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Target className="w-4 h-4 text-blue-600" />
          <span>Strongest Area</span>
        </div>
        <div className="text-xl font-extrabold text-[#0F172A] flex items-center gap-1.5 truncate">
          <span>{strongestLifeArea?.icon || '📌'}</span>
          <span className="truncate">{strongestLifeArea?.name || 'N/A'}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium block">
          Highest productivity output
        </span>
      </Card>

      {/* Needs Attention Metric */}
      <Card hoverEffect={true} className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Needs Attention</span>
        </div>
        <div className="text-xl font-extrabold text-[#0F172A] flex items-center gap-1.5 truncate">
          <span>{weakestLifeArea?.icon || '💡'}</span>
          <span className="truncate">{weakestLifeArea?.name || 'Balanced'}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium block">
          Target for improvement
        </span>
      </Card>
    </div>
  );
};
