import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon: Icon,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-[#2563EB] text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm',
    secondary: 'bg-slate-100 text-[#0F172A] hover:bg-slate-200 active:bg-slate-300',
    outline: 'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 hover:border-slate-300',
    danger: 'bg-[#EF4444] text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
    ghost: 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </motion.button>
  );
};
