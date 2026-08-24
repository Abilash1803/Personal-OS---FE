import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { History, BarChart3, ClipboardCheck, Settings, X, ChevronRight } from 'lucide-react';

export const MoreBottomSheet = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const items = [
    { name: 'History', path: '/history', icon: History, desc: 'Chronological activity journal' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, desc: 'Metrics, trends & heatmap' },
    { name: 'Reviews', path: '/reviews', icon: ClipboardCheck, desc: 'Daily, weekly & monthly reviews' },
    { name: 'Settings', path: '/settings', icon: Settings, desc: 'Application preferences' },
  ];

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

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
          className="relative w-full bg-white border-t border-[#E2E8F0] rounded-t-3xl p-5 space-y-4 shadow-2xl z-10 max-h-[85vh] overflow-y-auto pb-[calc(20px+env(safe-area-inset-bottom))]"
        >
          {/* Drag Handle Visual */}
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />

          {/* Sheet Header */}
          <div className="flex items-center justify-between pt-1 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">More Pages</h3>
              <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
                Secondary tools & views
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Rows */}
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/60 active:bg-blue-100/60 border border-slate-200/80 hover:border-blue-200 rounded-2xl transition-all cursor-pointer min-h-[52px]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-blue-600 shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#0F172A] block">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-medium text-[#64748B] block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Footer Version Tag */}
          <div className="pt-2 text-center text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>PersonalOS v1.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
