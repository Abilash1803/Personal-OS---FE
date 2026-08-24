import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Sparkles } from 'lucide-react';

export const InstallPromptBanner = ({ isInstallable, isStandalone, onInstall }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in this session
    const dismissed = sessionStorage.getItem('personal_os_pwa_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('personal_os_pwa_banner_dismissed', 'true');
  };

  // Only show if the app is installable, NOT running in standalone mode, and NOT dismissed
  if (isStandalone || !isInstallable || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed bottom-[calc(76px+env(safe-area-inset-bottom))] left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3 select-none backdrop-blur-md"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold tracking-tight text-white truncate">
              Install PersonalOS
            </h4>
            <p className="text-[11px] text-slate-300 font-medium line-clamp-1">
              Add to Home Screen for offline focus & 1-tap launch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onInstall}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-blue-500/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Dismiss install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
