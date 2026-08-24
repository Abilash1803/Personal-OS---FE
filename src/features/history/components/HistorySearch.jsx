import { Search, X } from 'lucide-react';

export const HistorySearch = ({ search, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search history, task titles, goals, reflections..."
        className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 transition-all"
      />
      {search && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
