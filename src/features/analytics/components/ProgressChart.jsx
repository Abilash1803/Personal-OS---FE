import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { BarChart3 } from 'lucide-react';

export const ProgressChart = ({ lifeAreas = [] }) => {
  if (!lifeAreas || lifeAreas.length === 0) return null;

  return (
    <Card hoverEffect={false} className="space-y-4">
      <SectionHeader
        icon={BarChart3}
        title="Life Area Performance"
        subtitle="Completion rates across life areas"
      />

      <div className="space-y-3.5">
        {lifeAreas.map((la) => (
          <div key={la.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{la.icon}</span>
                <span className="text-[#0F172A]">{la.name}</span>
              </div>
              <span className="text-blue-600 font-bold">{la.avgCompletion}%</span>
            </div>

            {/* Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${la.avgCompletion}%`,
                  backgroundColor: la.color || '#2563EB',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
