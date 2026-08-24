import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { useDailyReview } from '../../../hooks/useDailyReview';
import { getTodayISODate } from '../../../utils/dateUtils';
import { Award, ArrowRight } from 'lucide-react';

export const TodayReviewCard = () => {
  const navigate = useNavigate();
  const todayStr = getTodayISODate();
  const review = useDailyReview(todayStr);

  return (
    <Card hoverEffect={true} className="flex flex-col justify-between">
      <div>
        <SectionHeader
          icon={Award}
          iconBg="bg-blue-50 text-blue-600 border-blue-100"
          title="Today's Review"
          subtitle="Daily performance evaluation"
        />

        {review && review.hasData ? (
          <div className="mt-4 p-4 bg-gradient-to-br from-white to-slate-50 border border-[#E2E8F0] rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-2xl font-extrabold text-[#0F172A] font-mono block">
                {review.score}%
              </span>
              <span className="text-xs font-bold text-blue-600 block">
                {review.label}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-slate-600 block">
                {review.metrics.tasksCompleted} / {review.metrics.tasksPlanned} Tasks
              </span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                {review.metrics.focusTimeFormatted} Focus
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl text-center">
            <p className="text-xs text-[#64748B] font-medium">
              Your review will appear as you complete today's activities.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>Structured Review Engine</span>
        <span
          onClick={() => navigate('/reviews')}
          className="flex items-center gap-1 font-semibold text-[#2563EB] hover:underline cursor-pointer"
        >
          <span>View Review</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Card>
  );
};
