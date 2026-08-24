import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { Layers } from 'lucide-react';

export const LifeAreaReview = ({ lifeAreas = [] }) => {
  if (!lifeAreas || lifeAreas.length === 0) return null;

  return (
    <Card hoverEffect={false} className="space-y-4 p-5">
      <SectionHeader
        icon={Layers}
        title="Life Area Performance Review"
        subtitle="Completion rates and period trends across core categories"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {lifeAreas.map((la) => (
          <div key={la.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{la.icon}</span>
                <span className="text-xs font-bold text-[#0F172A]">{la.name}</span>
              </div>
              <span className="text-xs font-extrabold text-blue-600">
                {la.avgCompletion}%
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${la.avgCompletion}%`, backgroundColor: la.color || '#2563EB' }}
              />
            </div>

            {la.changeFormatted && (
              <span className="text-[10px] font-semibold text-slate-500 block text-right">
                {la.changeFormatted} vs last period
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
