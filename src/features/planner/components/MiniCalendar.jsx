import { CalendarCell } from './CalendarCell';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export const MiniCalendar = ({
  monthTitle = '',
  monthMatrix = [],
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onSelectToday,
}) => {
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] space-y-3">
      {/* Header Month Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-[#0F172A]">{monthTitle}</h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onSelectToday}
            className="px-2 py-0.5 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            onClick={onPrevMonth}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center">
        {weekDays.map((wd) => (
          <span key={wd} className="text-[11px] font-semibold text-slate-400 py-1">
            {wd}
          </span>
        ))}
      </div>

      {/* Days Grid (42 cells) */}
      <div className="grid grid-cols-7 gap-1">
        {monthMatrix.map((day) => (
          <CalendarCell
            key={day.dateStr}
            day={day}
            isSelected={selectedDate === day.dateStr}
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
};
