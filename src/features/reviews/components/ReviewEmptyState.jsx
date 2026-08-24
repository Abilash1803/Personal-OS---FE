import { Card } from '../../../components/ui/Card';
import { CalendarX2 } from 'lucide-react';

export const ReviewEmptyState = ({ reviewType }) => {
  const getMessage = () => {
    if (reviewType === 'daily') {
      return 'No activity recorded for this day.';
    }
    if (reviewType === 'weekly') {
      return 'Not enough activity recorded this week yet.';
    }
    return 'Your monthly review will grow as you use PersonalOS.';
  };

  return (
    <Card hoverEffect={false} className="p-12 text-center space-y-3 bg-slate-50/60 border-dashed border-slate-200">
      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
        <CalendarX2 className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-[#0F172A]">No Activity Recorded</h3>
        <p className="text-xs text-[#64748B] max-w-sm mx-auto">
          {getMessage()}
        </p>
      </div>
    </Card>
  );
};
