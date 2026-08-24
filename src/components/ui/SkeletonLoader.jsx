export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs animate-pulse ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-slate-200 rounded-xl" />
        <div className="space-y-1.5">
          <div className="w-28 h-4 bg-slate-200 rounded" />
          <div className="w-20 h-3 bg-slate-100 rounded" />
        </div>
      </div>
      <div className="w-12 h-6 bg-slate-200 rounded-full" />
    </div>
    <div className="space-y-2 pt-2">
      <div className="w-full h-3 bg-slate-200 rounded-full" />
      <div className="flex justify-between pt-2">
        <div className="w-24 h-3 bg-slate-100 rounded" />
        <div className="w-16 h-3 bg-slate-100 rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonTaskList = () => (
  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-3 animate-pulse">
    <div className="flex justify-between items-center mb-2">
      <div className="w-32 h-5 bg-slate-200 rounded" />
      <div className="w-16 h-5 bg-slate-100 rounded-full" />
    </div>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-14 bg-slate-100 rounded-xl border border-slate-200/60" />
    ))}
  </div>
);
