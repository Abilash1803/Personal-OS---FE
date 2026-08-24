import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getContextualGreeting, getFormattedTodayDate } from '../../../utils/dateUtils';
import { Sparkles } from 'lucide-react';

export const GreetingHeader = ({ userName = 'Abilash' }) => {
  const greeting = useMemo(() => getContextualGreeting(), []);
  const formattedDate = getFormattedTodayDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1"
    >
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily Focus</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
          {greeting.title}, {userName}
        </h1>
        <p className="text-sm text-[#64748B] mt-1 font-medium">
          {greeting.subtitle} • <span className="text-slate-400 font-normal">{formattedDate}</span>
        </p>
      </div>
    </motion.div>
  );
};
