import { useMemo } from 'react';
import { getTodayISODate } from '../../../utils/dateUtils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';

export const DashboardDateNav = ({ selectedDate, onSelectDate }) => {
  const todayStr = getTodayISODate();
  const isToday = selectedDate === todayStr;

  const formattedDate = useMemo(() => {
    if (!selectedDate) return '';
    const parts = selectedDate.split('-').map(Number);
    if (parts.length < 3) return selectedDate;
    const [y, m, d] = parts;
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  // Compute 7 days of the current week surrounding selectedDate
  const weekDays = useMemo(() => {
    const curr = selectedDate ? new Date(selectedDate) : new Date();
    const day = curr.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Monday start
    const monday = new Date(curr);
    monday.setDate(monday.getDate() + diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dateNum = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${dateNum}`;

      days.push({
        dateStr,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        isToday: dateStr === todayStr,
      });
    }
    return days;
  }, [selectedDate, todayStr]);

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayNum = String(d.getDate()).padStart(2, '0');
    onSelectDate(`${y}-${m}-${dayNum}`);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayNum = String(d.getDate()).padStart(2, '0');
    onSelectDate(`${y}-${m}-${dayNum}`);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
      {/* Top Bar: Prev/Next Buttons, Current Date Label, & Quick Today Reset */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1.5 text-slate-500 hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
            title="Previous Day"
            aria-label="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-sm font-bold text-[#0F172A]">
              {formattedDate}
            </span>
            {isToday ? (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
                Today
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full border border-amber-200">
                Viewing Past Day
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextDay}
            className="p-1.5 text-slate-500 hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
            title="Next Day"
            aria-label="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {!isToday && (
          <button
            type="button"
            onClick={() => onSelectDate(todayStr)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Back to Today</span>
          </button>
        )}
      </div>

      {/* Horizontal Day Buttons */}
      <div className="flex items-center justify-between gap-1 bg-slate-50/80 p-1.5 rounded-xl border border-slate-200/80 overflow-x-auto no-scrollbar select-none">
        {weekDays.map((day) => {
          const isSelected = day.dateStr === selectedDate;

          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => onSelectDate(day.dateStr)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all min-w-[42px] ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : day.isToday
                  ? 'bg-white text-blue-600 border border-blue-200 font-semibold'
                  : 'text-slate-600 hover:bg-white/70 font-medium'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
                {day.dayName}
              </span>
              <span className="text-sm font-extrabold font-mono mt-0.5 block">
                {day.dayNumber}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
