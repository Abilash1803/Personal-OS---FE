import { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { Activity, Calendar } from 'lucide-react';

export const Heatmap = ({ days = [] }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const getLevelStyle = (level) => {
    switch (level) {
      case 3:
        return 'bg-blue-600 border-blue-700'; // 6+ activities
      case 2:
        return 'bg-blue-400 border-blue-500'; // 3-5 activities
      case 1:
        return 'bg-blue-200 border-blue-300'; // 1-2 activities
      default:
        return 'bg-slate-100 border-slate-200/80'; // 0 activities
    }
  };

  return (
    <Card hoverEffect={false} className="space-y-4">
      <SectionHeader
        icon={Activity}
        title="Activity Consistency Heatmap"
        subtitle="90-day productivity activity matrix"
        rightAction={
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-200" />
            <span className="w-2.5 h-2.5 rounded bg-blue-200 border border-blue-300" />
            <span className="w-2.5 h-2.5 rounded bg-blue-400 border border-blue-500" />
            <span className="w-2.5 h-2.5 rounded bg-blue-600 border border-blue-700" />
            <span>More</span>
          </div>
        }
      />

      {/* Touch-Friendly Inspection Banner */}
      {selectedDay && (
        <div className="flex items-center justify-between px-3 py-2 bg-blue-50/80 border border-blue-100 rounded-xl text-xs font-semibold text-blue-900 transition-all">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{selectedDay.dateStr}</span>
          </div>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[11px]">
            {selectedDay.count} {selectedDay.count === 1 ? 'activity' : 'activities'}
          </span>
        </div>
      )}

      <div className="overflow-x-auto pb-2 no-scrollbar">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-full py-1">
          {days.map((day) => (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`w-3.5 h-3.5 rounded-sm border transition-all hover:scale-125 focus:scale-125 focus:ring-2 focus:ring-blue-500/50 cursor-pointer ${
                selectedDay?.dateStr === day.dateStr ? 'ring-2 ring-blue-600 scale-125' : ''
              } ${getLevelStyle(day.level)}`}
              title={`${day.dateStr}: ${day.count} activities`}
              aria-label={`${day.dateStr}: ${day.count} activities`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

