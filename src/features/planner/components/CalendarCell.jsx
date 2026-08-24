

export const CalendarCell = ({ day, isSelected, onSelect }) => {
  const { dateStr, dayNumber, isCurrentMonth, isToday, hasEvents, hasTasks } = day;

  return (
    <button
      type="button"
      onClick={() => onSelect(dateStr)}
      className={`relative h-9 w-full flex flex-col items-center justify-center rounded-xl text-xs font-semibold transition-all duration-150 ${
        isSelected
          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
          : isToday
          ? 'bg-blue-50 text-blue-600 border border-blue-200'
          : isCurrentMonth
          ? 'text-[#0F172A] hover:bg-slate-100'
          : 'text-slate-300 hover:text-slate-500'
      }`}
    >
      <span>{dayNumber}</span>

      {/* Event/Task Indicator Dots */}
      <div className="absolute bottom-1 flex items-center gap-0.5">
        {hasEvents && (
          <span
            className={`w-1 h-1 rounded-full ${
              isSelected ? 'bg-white' : 'bg-amber-500'
            }`}
          />
        )}
        {hasTasks && (
          <span
            className={`w-1 h-1 rounded-full ${
              isSelected ? 'bg-white' : 'bg-blue-500'
            }`}
          />
        )}
      </div>
    </button>
  );
};
