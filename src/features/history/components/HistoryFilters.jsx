import { Filter } from 'lucide-react';

export const HistoryFilters = ({ eventType, onSelectEventType }) => {
  const types = [
    'All',
    'Task Completed',
    'Focus Completed',
    'Planner Event Completed',
    'Goal Created',
    'Reflection Updated',
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F172A]">
        <Filter className="w-3.5 h-3.5 text-blue-600" />
        <span>Event Type Filter</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {types.map((t) => {
          const isActive = eventType === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onSelectEventType(t)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
};
