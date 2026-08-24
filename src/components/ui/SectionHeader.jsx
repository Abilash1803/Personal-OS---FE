export const SectionHeader = ({
  icon: Icon,
  iconBg = 'bg-blue-50 text-[#2563EB] border-blue-100',
  title,
  subtitle,
  rightAction,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className={`p-2 rounded-xl border ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-base font-semibold text-[#0F172A] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {rightAction && <div>{rightAction}</div>}
    </div>
  );
};
