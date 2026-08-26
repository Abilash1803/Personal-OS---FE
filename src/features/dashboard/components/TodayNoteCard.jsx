import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { StickyNote, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getTodayISODate } from '../../../utils/dateUtils';

export const TodayNoteCard = ({ note = '', onNoteChange, isSaving, date = getTodayISODate() }) => {
  const maxLength = 500;
  const currentLength = (note || '').length;
  const todayStr = getTodayISODate();
  const isToday = date === todayStr;

  return (
    <Card hoverEffect={false} className="flex flex-col gap-4">
      <SectionHeader
        icon={StickyNote}
        title={isToday ? "How was your day?" : "Daily Journal & Thoughts"}
        subtitle={isToday ? "Quick scratchpad for thoughts & reflections" : `Journal entry for ${date}`}
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
          value={note}
          maxLength={maxLength}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder={isToday ? "Write two or three lines about today..." : `Write thoughts or notes for ${date}...`}
          className="w-full h-32 p-3.5 bg-slate-50/80 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 focus:bg-white resize-none transition-all duration-150"
          aria-label="Daily note textarea"
        />
        <div className="absolute bottom-3 right-3 text-xs font-mono font-medium text-slate-400 select-none bg-slate-100/90 px-1.5 py-0.5 rounded border border-slate-200/60">
          {currentLength} / {maxLength}
        </div>
      </div>
    </Card>
  );
};
