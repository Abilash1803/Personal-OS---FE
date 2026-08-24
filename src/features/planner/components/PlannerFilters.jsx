

export const PlannerFilters = ({ activeFilter, onSelectFilter }) => {
  const filters = [
    'All',
    'Tasks',
    'Meetings',
    'Reminders',
    'Payments',
    'Birthdays',
    'Completed',
    'Pending',
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onSelectFilter(filter)}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-150 whitespace-nowrap ${
              isActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};
