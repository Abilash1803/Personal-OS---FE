import { motion } from 'framer-motion';
import { Clock, Target } from 'lucide-react';

export const FocusHeader = ({ task }) => {
  if (!task) return null;

  const priorityColors = {
    High: 'bg-rose-50 text-[#EF4444] border-rose-200',
    Medium: 'bg-amber-50 text-[#F59E0B] border-amber-200',
    Low: 'bg-blue-50 text-[#2563EB] border-blue-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="text-center space-y-3"
    >
      {/* Life Area & Priority Badges */}
      <div className="flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-white text-[#0F172A] border border-[#E2E8F0] rounded-full shadow-2xs">
          <span className="text-sm">{task.icon || '📌'}</span>
          <span>{task.category}</span>
        </span>

        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
            priorityColors[task.priority] || priorityColors.Medium
          }`}
        >
          {task.priority} Priority
        </span>
      </div>

      {/* Main Task Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
        {task.name}
      </h1>

      {/* Goal Subtitle & Estimated Time */}
      <div className="flex items-center justify-center gap-3 text-xs text-[#64748B] font-medium">
        <span className="flex items-center gap-1">
          <Target className="w-3.5 h-3.5 text-blue-600" />
          <span>Goal Task</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{task.estimatedMinutes || 30} mins estimated</span>
        </span>
      </div>
    </motion.div>
  );
};
