import { Card } from '../../../components/ui/Card';

export const MetricCard = ({ title, value, subtext, icon: Icon, iconBg = 'bg-blue-50 text-blue-600 border-blue-100', trend }) => {
  return (
    <Card hoverEffect={true} className="flex flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className={`p-2 rounded-xl border ${iconBg}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-semibold text-[#64748B]">{title}</span>
        </div>

        {trend && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
          {value}
        </div>
        {subtext && <p className="text-[11px] text-[#64748B] mt-0.5">{subtext}</p>}
      </div>
    </Card>
  );
};
