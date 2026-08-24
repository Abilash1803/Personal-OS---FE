import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ReviewHeader = ({
  reviewType,
  onSelectType,
  periodLabel,
  onPrevious,
  onNext,
  onToday,
}) => {
  const types = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
  ];

  return (
    <div className="space-y-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
          Reviews
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5 font-normal">
          Understand your progress, patterns, and consistency.
        </p>
      </div>

      {/* Controls Row: Selector + Navigator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-200/80">
        {/* Review Type Selector */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0">
          {types.map((t) => {
            const isActive = reviewType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectType(t.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Period Navigator */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevious}
            className="p-1.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-600 rounded-xl transition-all"
            aria-label="Previous period"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="px-3.5 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] shadow-2xs min-w-36 text-center select-none">
            {periodLabel}
          </div>

          <button
            type="button"
            onClick={onNext}
            className="p-1.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-600 rounded-xl transition-all"
            aria-label="Next period"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToday}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 rounded-xl transition-all"
          >
            Current
          </button>
        </div>
      </div>
    </div>
  );
};
