import { motion } from 'framer-motion';
import { scaleIn } from '../../utils/animationVariants';

export const EmptyState = ({
  icon: Icon,
  emoji,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center justify-center p-8 text-center bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl ${className}`}
    >
      {emoji ? (
        <span className="text-3xl mb-2 select-none">{emoji}</span>
      ) : Icon ? (
        <div className="p-3 bg-white border border-slate-200 rounded-2xl text-blue-600 mb-3 shadow-xs">
          <Icon className="w-5 h-5" />
        </div>
      ) : null}

      <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
      {subtitle && (
        <p className="text-xs text-[#64748B] mt-1 max-w-xs leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
