import { useMemo } from 'react';

export const WeekStrip = ({ selectedDateStr, onSelectDate }) => {
  const selectedDate = useMemo(() => {
    return selectedDateStr ? new Date(selectedDateStr) : new Date();
  }, [selectedDateStr]);

  // Compute 7 days surrounding or starting Monday for current selected date
  const weekDays = useMemo(() => {
    const day = selectedDate.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Monday start
    const monday = new Date(selectedDate);
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
        isToday: dateStr === new Date().toISOString().split('T')[0],
      });
    }
    return days;
  }, [selectedDate]);

  return (
    <div className="flex items-center justify-between gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar select-none">
      {weekDays.map((day) => {
        const isSelected = day.dateStr === selectedDateStr;

        return (
          <button
            key={day.dateStr}
            type="button"
            onClick={() => onSelectDate(day.dateStr)}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all min-w-[42px] ${
              isSelected
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : day.isToday
                ? 'bg-white text-blue-600 border border-blue-200 font-semibold'
                : 'text-slate-600 hover:bg-white/60 font-medium'
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
  );
};
