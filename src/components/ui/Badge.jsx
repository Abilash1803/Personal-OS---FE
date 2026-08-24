import { motion } from 'framer-motion';
import { TASK_STATUSES } from '../../utils/taskUtils';

export const Badge = ({ status, className = '' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case TASK_STATUSES.COMPLETED:
        return 'bg-emerald-50 text-[#22C55E] border-emerald-200/80';
      case TASK_STATUSES.PARTIALLY_DONE:
        return 'bg-amber-50 text-[#F59E0B] border-amber-200/80';
      case TASK_STATUSES.MISSED:
        return 'bg-rose-50 text-[#EF4444] border-rose-200/80';
      default:
        return 'bg-slate-100 text-[#64748B] border-[#E2E8F0]';
    }
  };

  const getBadgeDot = () => {
    switch (status) {
      case TASK_STATUSES.COMPLETED:
        return 'bg-[#22C55E]';
      case TASK_STATUSES.PARTIALLY_DONE:
        return 'bg-[#F59E0B]';
      case TASK_STATUSES.MISSED:
        return 'bg-[#EF4444]';
      default:
        return 'bg-[#64748B]';
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${getBadgeStyle()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getBadgeDot()}`} />
      {status}
    </motion.span>
  );
};
