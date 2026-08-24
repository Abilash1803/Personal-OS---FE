import { Card } from '../../../components/ui/Card';
import { Sun, Moon, Info } from 'lucide-react';

export const ThemeCard = () => {
  return (
    <Card hoverEffect={false} className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl border border-blue-100">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#0F172A]">Appearance & Theme</h2>
            <p className="text-xs text-[#64748B]">Personalize UI visual mode</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
          Light Mode Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-1">
        {/* Light Theme - Active */}
        <div className="p-3 bg-white border-2 border-blue-600 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Light Theme</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        </div>

        {/* Dark Theme - Disabled */}
        <div className="p-3 bg-slate-100/60 border border-slate-200 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed select-none">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Moon className="w-4 h-4 text-slate-400" />
            <span>Dark Theme</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Disabled</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
        <Info className="w-4 h-4 text-blue-500 shrink-0" />
        <span>Sprint 1 supports high-contrast Light Theme only. Dark mode planned for Sprint 2.</span>
      </div>
    </Card>
  );
};
