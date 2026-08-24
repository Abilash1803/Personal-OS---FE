import { Card } from '../../../components/ui/Card';
import { Target, Clock, Zap } from 'lucide-react';

export const GoalAnalyticsCard = ({ goal }) => {
  return (
    <Card hoverEffect={true} className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[#0F172A] truncate">{goal.title}</h3>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
          {goal.trend}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-400">Completion</span>
          <span className="text-blue-600 font-extrabold">{goal.completionPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${goal.completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B] font-medium">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>{goal.focusHours} Focus Hours</span>
        </span>
        <span className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>{goal.currentStreak}d Streak</span>
        </span>
      </div>
    </Card>
  );
};
