import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { AlertCircle, ArrowRight } from 'lucide-react';

export const AttentionList = ({ attentionItems = [] }) => {
  if (!attentionItems || attentionItems.length === 0) return null;

  return (
    <Card hoverEffect={false} className="space-y-3 p-5">
      <SectionHeader
        icon={AlertCircle}
        iconBg="bg-rose-50 text-rose-600 border-rose-100"
        title="Areas Needing Attention"
        subtitle="Opportunities for adjustment"
      />

      <div className="space-y-2 pt-1">
        {attentionItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 p-3 bg-rose-50/50 border border-rose-200/60 rounded-xl text-xs font-semibold text-[#0F172A]"
          >
            <ArrowRight className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
