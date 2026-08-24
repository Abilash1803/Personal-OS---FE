import { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { getFormattedDate, getDayOfYear, getDaysRemainingInYear } from '../utils/dateUtils';
import { ProgressBar } from '../components/ui/ProgressBar';

export const Navbar = ({ onOpenCommandPalette }) => {
  const [currentDateString, setCurrentDateString] = useState(getFormattedDate());
  const [dayOfYear, setDayOfYear] = useState(getDayOfYear());
  const [daysRemaining, setDaysRemaining] = useState(getDaysRemainingInYear());

  // Periodically check if midnight passed
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateString(getFormattedDate());
      setDayOfYear(getDayOfYear());
      setDaysRemaining(getDaysRemainingInYear());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isLeapYear = new Date().getFullYear() % 4 === 0;
  const totalDays = isLeapYear ? 366 : 365;
  const progressPercentage = (dayOfYear / totalDays) * 100;

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-8 py-3 hidden md:flex items-center justify-between select-none">
      {/* Left: Today's Date */}
      <div>
        <h2 className="text-sm font-bold text-[#0F172A] tracking-tight">
          {currentDateString}
        </h2>
        <span className="text-[11px] font-medium text-[#64748B] block -mt-0.5">
          {daysRemaining} days remaining in year
        </span>
      </div>

      {/* Right: Command Palette Trigger Button + Year Progress Bar */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Command Palette Trigger Button */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition-all shadow-2xs"
          title="Open Command Palette (Ctrl+K or Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search or command...</span>
          <span className="sm:hidden">Command</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-500 shadow-2xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Year Progress Bar */}
        <div className="hidden sm:flex flex-col items-end w-40">
          <div className="flex items-center justify-between w-full text-[11px] font-semibold text-[#0F172A] mb-1">
            <span>Day {dayOfYear} of {totalDays}</span>
            <span className="text-blue-600 font-mono">{Math.round(progressPercentage)}%</span>
          </div>
          <ProgressBar progress={progressPercentage} height={5} color="#2563EB" />
        </div>
      </div>
    </header>
  );
};
