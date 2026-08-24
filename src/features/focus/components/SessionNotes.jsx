import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { StickyNote, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SessionNotes = ({ notes, onNotesChange, isSaving }) => {
  const maxLength = 1000;
  const currentLength = (notes || '').length;

  return (
    <Card hoverEffect={false} className="flex flex-col gap-3">
      <SectionHeader
        icon={StickyNote}
        title="Session Notes"
        subtitle="Capture thoughts & breakthroughs during work"
        rightAction={
          <div className="h-7 flex items-center">
            <AnimatePresence mode="wait">
              {isSaving ? (
                <motion.span
                  key="saving"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200"
                >
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Saving...</span>
                </motion.span>
              ) : (
                <motion.span
                  key="saved"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
                >
                  <Check className="w-3 h-3" />
                  <span>Saved</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        }
      />

      <div className="relative">
        <textarea
          value={notes}
          maxLength={maxLength}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Capture thoughts, key decisions, or breakthroughs during this focus session..."
          className="w-full h-32 p-3.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white resize-none transition-all duration-150"
          aria-label="Focus session notes"
        />
        <div className="absolute bottom-3 right-3 text-xs font-mono font-medium text-slate-400 select-none bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
          {currentLength} / {maxLength}
        </div>
      </div>
    </Card>
  );
};
