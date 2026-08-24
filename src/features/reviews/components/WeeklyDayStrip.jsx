import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CalendarDays } from 'lucide-react';

export const WeeklyDayStrip = ({ dayScores = [] }) => {
  if (!dayScores || dayScores.length === 0) return null;

  const getScoreColor = (day) => {
    if (!day.hasData) return 'bg-slate-100 border-slate-200 text-slate-400';
    if (day.score >= 85) return 'bg-blue-600 border-blue-700 text-white font-bold';
    if (day.score >= 70) return 'bg-blue-500 border-blue-600 text-white font-bold';
    if (day.score >= 50) return 'bg-blue-300 border-blue-400 text-slate-900 font-semibold';
    return 'bg-amber-100 border-amber-300 text-amber-900 font-semibold';
  };

  return (
    <Card hoverEffect={false} className="space-y-4 p-5">
      <SectionHeader
        icon={CalendarDays}
        title="Weekly Performance Strip"
        subtitle="Daily score intensity (Monday – Sunday)"
      />

      <div className="grid grid-cols-7 gap-2">
        {dayScores.map((day) => (
          <div
            key={day.dateStr}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${getScoreColor(
              day
            )}`}
          >
            <span className="text-xs uppercase font-extrabold block">{day.label}</span>
            <span className="text-base font-extrabold font-mono mt-1">
              {day.hasData ? `${day.score}%` : '—'}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
