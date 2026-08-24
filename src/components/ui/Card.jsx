import { motion } from 'framer-motion';
import { cardHover } from '../../utils/animationVariants';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  animate = true,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverEffect ? cardHover : undefined}
      onClick={onClick}
      className={`bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
