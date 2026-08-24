import { motion, AnimatePresence } from 'framer-motion';
import { Share, PlusSquare, X } from 'lucide-react';

export const IOSInstallSheet = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden font-sans select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Bottom Sheet Box */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full bg-white border-t border-[#E2E8F0] rounded-t-3xl p-6 space-y-5 shadow-2xl z-10 max-h-[85vh] overflow-y-auto pb-[calc(24px+env(safe-area-inset-bottom))]"
        >
          {/* Drag Handle Visual */}
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Install PersonalOS</h3>
              <span className="text-xs text-slate-500 font-medium block">
                Add to your iOS Home Screen for a standalone app experience.
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Steps List */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                <span>Tap the Safari Share button</span>
                <Share className="w-4 h-4 text-blue-600 shrink-0" />
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                <span>Scroll down and select</span>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px]">
                  Add to Home Screen
                </span>
                <PlusSquare className="w-4 h-4 text-blue-600 shrink-0" />
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div className="text-xs font-semibold text-[#0F172A]">
                <span>Tap <strong>Add</strong> in the top right corner</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-500/20"
          >
            Got it
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
