import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ReviewHighlights = ({ highlights = [] }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <Card hoverEffect={false} className="space-y-3 p-5">
      <SectionHeader
        icon={Sparkles}
        iconBg="bg-emerald-50 text-emerald-600 border-emerald-100"
        title="Period Highlights"
        subtitle="Key accomplishments & milestones"
      />

      <div className="space-y-2 pt-1">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl text-xs font-semibold text-[#0F172A]"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
