import { Card } from '../../../components/ui/Card';
import { motion } from 'framer-motion';

export const ReviewScore = ({ score, label }) => {
  if (score === null || score === undefined) return null;

  return (
    <Card hoverEffect={false} className="p-6 text-center space-y-3 bg-gradient-to-b from-white to-slate-50">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Review Score
      </div>

      <motion.div
        key={score}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-1"
      >
        <div className="text-5xl font-extrabold tracking-tight text-[#0F172A] font-mono">
          {score}%
        </div>
        <div className="text-sm font-bold text-blue-600">{label}</div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full bg-blue-600 rounded-full"
        />
      </div>
    </Card>
  );
};
