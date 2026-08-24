import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSession } from '../../hooks/useActiveSession';
import { RefreshCw } from 'lucide-react';

export const UpdateBanner = ({ needRefresh, onUpdate, onDismiss }) => {
  const { isRunning } = useActiveSession();

  if (!needRefresh) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-50 flex items-center justify-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto flex items-center justify-between gap-3 bg-slate-900 border border-slate-700 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl max-w-md w-full"
        >
          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-4 h-4 text-blue-400 shrink-0 animate-spin" />
            <div>
              <span className="block font-bold text-slate-100">Update Available</span>
              <span className="block text-[11px] font-normal text-slate-300">
                {isRunning
                  ? 'A new version is ready. Update after your focus session.'
                  : 'A new version of PersonalOS is ready.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onDismiss}
              className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Later
            </button>
            <button
              type="button"
              onClick={onUpdate}
              className="px-3.5 py-1.5 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-xs"
            >
              Update
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
