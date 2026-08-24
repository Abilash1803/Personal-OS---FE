import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { BookOpen } from 'lucide-react';

export const ReviewReflection = ({ reflection, reflectionsSummary, reviewType }) => {
  if (reviewType === 'daily') {
    return (
      <Card hoverEffect={false} className="space-y-3 p-5">
        <SectionHeader
          icon={BookOpen}
          iconBg="bg-indigo-50 text-indigo-600 border-indigo-100"
          title="Daily Reflection"
          subtitle="Your written journal entry for this date"
        />

        {reflection && reflection.trim() ? (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F172A] leading-relaxed whitespace-pre-wrap font-sans">
            {reflection}
          </div>
        ) : (
          <div className="p-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
            No reflection entry recorded for this date.
          </div>
        )}
      </Card>
    );
  }

  // Weekly or Monthly reflections summary
  return (
    <Card hoverEffect={false} className="space-y-3 p-5">
      <SectionHeader
        icon={BookOpen}
        iconBg="bg-indigo-50 text-indigo-600 border-indigo-100"
        title="Reflections Summary"
        subtitle={`Journal entries recorded during this ${reviewType}`}
      />

      {reflectionsSummary && reflectionsSummary.length > 0 ? (
        <div className="space-y-2.5">
          {reflectionsSummary.map((ref, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600 block uppercase">
                {ref.date}
              </span>
              <p className="text-xs text-[#0F172A] line-clamp-2">{ref.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
          No reflections recorded during this period.
        </div>
      )}
    </Card>
  );
};
