export const SectionHeader = ({
  icon: Icon,
  iconBg = 'bg-blue-50 text-[#2563EB] border-blue-100',
  title,
  subtitle,
  rightAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 sm:gap-3 ${className}`}>
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {Icon && (
          <div className={`p-2 rounded-xl border shrink-0 ${iconBg}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#64748B] mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>

      {rightAction && (
        <div className="shrink-0 self-start xs:self-auto">{rightAction}</div>
      )}
    </div>
  );
};
