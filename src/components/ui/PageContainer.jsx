import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animationVariants';

export const PageContainer = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`max-w-[1200px] w-full mx-auto space-y-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};
