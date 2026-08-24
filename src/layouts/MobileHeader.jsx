import { Search, Layers } from 'lucide-react';
import { getFormattedDate } from '../utils/dateUtils';

export const MobileHeader = ({ onOpenCommandPalette }) => {
  const formattedDate = getFormattedDate();

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between md:hidden select-none">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-extrabold tracking-tight text-[#0F172A]">
            Personal<span className="text-blue-600">OS</span>
          </h1>
          <span className="text-[10px] font-medium text-slate-500 block -mt-0.5">
            {formattedDate}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenCommandPalette}
        className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
        aria-label="Open Command Palette"
      >
        <Search className="w-4 h-4" />
      </button>
    </header>
  );
};
