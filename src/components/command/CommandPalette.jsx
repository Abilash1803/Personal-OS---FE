import { Search, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMAND_CATEGORIES } from './commandRegistry';

export const CommandPalette = ({
  isOpen,
  search,
  onSearchChange,
  filteredCommands,
  selectedIndex,
  onSelectIndex,
  onClose,
  onExecute,
  onKeyDown,
}) => {
  if (!isOpen) return null;

  // Group commands by category
  const quickActions = filteredCommands.filter(
    (c) => c.category === COMMAND_CATEGORIES.QUICK_ACTIONS
  );
  const navigationActions = filteredCommands.filter(
    (c) => c.category === COMMAND_CATEGORIES.NAVIGATION
  );

  let flatIndexCounter = 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 font-sans select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Command Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden z-10"
          onKeyDown={onKeyDown}
        >
          {/* Search Header */}
          <div className="relative flex items-center px-4 py-3.5 border-b border-[#E2E8F0] bg-slate-50/50">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search actions or type a navigation command..."
              className="w-full bg-transparent text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Commands List Container */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-4 no-scrollbar">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#64748B] font-medium">
                No matching commands found.
              </div>
            ) : (
              <>
                {/* Quick Actions Category */}
                {quickActions.length > 0 && (
                  <div className="space-y-1">
                    <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {COMMAND_CATEGORIES.QUICK_ACTIONS}
                    </span>
                    {quickActions.map((cmd) => {
                      const currentIndex = flatIndexCounter++;
                      const isSelected = selectedIndex === currentIndex;
                      const Icon = cmd.icon;

                      return (
                        <div
                          key={cmd.id}
                          onClick={() => onExecute(cmd)}
                          onMouseEnter={() => onSelectIndex(currentIndex)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50 text-[#2563EB] border border-blue-100 shadow-2xs'
                              : 'text-[#0F172A] hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{cmd.label}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">Action</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Navigation Category */}
                {navigationActions.length > 0 && (
                  <div className="space-y-1">
                    <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {COMMAND_CATEGORIES.NAVIGATION}
                    </span>
                    {navigationActions.map((cmd) => {
                      const currentIndex = flatIndexCounter++;
                      const isSelected = selectedIndex === currentIndex;
                      const Icon = cmd.icon;

                      return (
                        <div
                          key={cmd.id}
                          onClick={() => onExecute(cmd)}
                          onMouseEnter={() => onSelectIndex(currentIndex)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50 text-[#2563EB] border border-blue-100 shadow-2xs'
                              : 'text-[#0F172A] hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                            <span>{cmd.label}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">Navigate</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Shortcuts Hint */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-slate-400 font-medium select-none">
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-2xs">
                ↑↓
              </kbd>
              <span>Navigate</span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-2xs">
                ↵
              </kbd>
              <span>Select</span>
            </span>

            <span className="flex items-center gap-1">
              <Command className="w-3 h-3" />
              <span>PersonalOS Palette</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
