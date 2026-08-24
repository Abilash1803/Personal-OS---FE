import { Card } from '../../../components/ui/Card';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const LifeAreaAnalyticsCard = ({ lifeArea }) => {
  return (
    <Card hoverEffect={true} className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{lifeArea.icon}</span>
          <h3 className="text-sm font-bold text-[#0F172A]">{lifeArea.name}</h3>
        </div>

        {lifeArea.isNeglected ? (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            <AlertTriangle className="w-3 h-3" /> Neglected
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Healthy
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Avg Completion</span>
          <span className="text-base font-extrabold text-[#0F172A]">{lifeArea.avgCompletion}%</span>
        </div>

        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Goals</span>
          <span className="text-base font-extrabold text-[#0F172A]">{lifeArea.activeGoalsCount}</span>
        </div>
      </div>
    </Card>
  );
};
