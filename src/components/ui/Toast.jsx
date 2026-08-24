import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../hooks/useToast';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyle = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-slate-900 border-l-4 border-l-[#22C55E]',
          icon: <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />,
        };
      case 'error':
        return {
          bg: 'bg-slate-900 border-l-4 border-l-[#EF4444]',
          icon: <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />,
        };
      default:
        return {
          bg: 'bg-slate-900 border-l-4 border-l-[#2563EB]',
          icon: <Info className="w-4 h-4 text-[#2563EB] shrink-0" />,
        };
    }
  };

  return (
    <div className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-2 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = getToastStyle(toast.type);
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 text-white text-sm px-4 py-3 rounded-xl shadow-xl border border-slate-800 ${style.bg}`}
            >
              <div className="flex items-center gap-2.5">
                {style.icon}
                <span className="font-medium text-slate-100">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
