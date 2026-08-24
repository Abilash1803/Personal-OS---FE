import { motion, AnimatePresence } from 'framer-motion';
import { Target, CalendarDays, Zap, History, BookOpen, AlertTriangle, X, RotateCcw } from 'lucide-react';

export const RestorePreviewModal = ({ isOpen, metadata, onConfirm, onCancel }) => {
  if (!isOpen || !metadata) return null;

  const statsList = [
    { label: 'Goals', count: metadata.stats.goals, icon: Target, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Planner Events', count: metadata.stats.plannerEvents, icon: CalendarDays, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'Focus Sessions', count: metadata.stats.focusSessions, icon: Zap, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { label: 'Timeline Events', count: metadata.stats.timelineEvents, icon: History, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Reflections', count: metadata.stats.reflections, icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          onClick={onCancel}
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden z-10 p-6 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Restore Backup</h3>
                <span className="text-xs text-slate-500 font-medium block">
                  Created {metadata.createdAtFormatted} • App v{metadata.appVersion}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Warning Banner */}
          <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Replace current data?</strong> Restoring this backup will replace your current PersonalOS data on this browser.
            </span>
          </div>

          {/* Records Summary Grid */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Backup Record Contents
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {statsList.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5"
                  >
                    <div className={`p-1.5 rounded-lg border ${stat.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold font-mono text-[#0F172A] block leading-none">
                        {stat.count}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-1">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-sm shadow-blue-500/20 min-h-[44px]"
            >
              Restore Backup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
