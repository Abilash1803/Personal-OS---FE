import { motion } from 'framer-motion';

export const ProgressBar = ({ percentage = 0, className = '', height = 'h-2.5' }) => {
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100 ${height} ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-blue-600 to-[#2563EB] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${safePercentage}%` }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </div>
  );
};
