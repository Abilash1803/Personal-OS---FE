import { Card } from '../../../components/ui/Card';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export const InsightCard = ({ insight }) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBg = () => {
    switch (insight.type) {
      case 'success':
        return 'bg-emerald-50/70 border-emerald-200/80';
      case 'warning':
        return 'bg-rose-50/70 border-rose-200/80';
      default:
        return 'bg-blue-50/70 border-blue-200/80';
    }
  };

  return (
    <Card hoverEffect={true} className={`p-4 ${getBg()} flex items-start gap-3`}>
      <div className="p-2 bg-white rounded-xl border border-slate-200 shrink-0 mt-0.5">
        {getIcon()}
      </div>

      <div className="space-y-1 min-w-0">
        <h4 className="text-xs font-bold text-[#0F172A]">{insight.title}</h4>
        <p className="text-xs text-[#64748B] leading-relaxed">{insight.description}</p>
      </div>
    </Card>
  );
};
