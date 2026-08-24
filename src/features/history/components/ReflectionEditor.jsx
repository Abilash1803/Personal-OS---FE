import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { BookOpen, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReflectionEditor = ({ content, onContentChange, isSaving }) => {
  const maxLength = 5000;
  const currentLength = (content || '').length;

  return (
    <Card hoverEffect={false} className="flex flex-col gap-3">
      <SectionHeader
        icon={BookOpen}
        iconBg="bg-indigo-50 text-indigo-600 border-indigo-100"
        title="Daily Reflection Journal"
        subtitle={`Reflect on your achievements & learnings`}
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
          value={content}
          maxLength={maxLength}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Write your daily reflection journal here. What went well today? What challenges did you overcome?..."
          className="w-full h-36 p-3.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white resize-none transition-all duration-150"
          aria-label="Daily reflection journal textarea"
        />
        <div className="absolute bottom-3 right-3 text-xs font-mono font-medium text-slate-400 select-none bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
          {currentLength} / {maxLength}
        </div>
      </div>
    </Card>
  );
};
