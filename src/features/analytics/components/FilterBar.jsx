export const FilterBar = ({ activeRange, onSelectRange }) => {
  const ranges = ['Today', 'This Week', 'This Month', 'Last Month', 'All'];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {ranges.map((range) => {
        const isActive = activeRange === range;
        return (
          <button
            key={range}
            type="button"
            onClick={() => onSelectRange(range)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all duration-150 whitespace-nowrap ${
              isActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:bg-slate-50 hover:text-[#0F172A]'
            }`}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
};
