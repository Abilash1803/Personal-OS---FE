import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { useTimeline } from '../../../hooks/useTimeline';
import { History, ArrowRight, CheckCircle2, Zap, Calendar, Target } from 'lucide-react';

export const RecentActivityCard = () => {
  const navigate = useNavigate();
  const { recentEvents } = useTimeline();

  const formatTimeAgo = (isoString) => {
    if (!isoString) return '';
    const now = new Date();
    const evtTime = new Date(isoString);
    const diffMs = now - evtTime;
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getEventIcon = (type) => {
    if (type.includes('Focus')) return <Zap className="w-3.5 h-3.5 text-blue-600" />;
    if (type.includes('Task')) return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
    if (type.includes('Planner')) return <Calendar className="w-3.5 h-3.5 text-purple-500" />;
    return <Target className="w-3.5 h-3.5 text-slate-500" />;
  };

  const hasEvents = recentEvents && recentEvents.length > 0;

  return (
    <Card hoverEffect={true} className="flex flex-col justify-between">
      <div>
        <SectionHeader
          icon={History}
          iconBg="bg-indigo-50 text-indigo-600 border-indigo-100"
          title="Recent Activity"
          subtitle="Live productivity stream"
        />

        {hasEvents ? (
          <div className="mt-4 space-y-2.5">
            {recentEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => navigate('/history')}
                className="p-3 bg-slate-50 border border-[#E2E8F0] hover:border-blue-300 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shrink-0">
                    {getEventIcon(evt.type)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-[#0F172A] block truncate">
                      {evt.title}
                    </span>
                    <span className="text-[10px] text-[#64748B] block mt-0.5">{evt.type}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-slate-600 rounded-md border border-slate-200 shrink-0">
                  {formatTimeAgo(evt.timestamp)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 p-6 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl text-center">
            <p className="text-xs text-[#64748B] font-medium">Complete your first task to begin your story.</p>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>Chronological Journal</span>
        <span
          onClick={() => navigate('/history')}
          className="flex items-center gap-1 font-medium text-[#2563EB] hover:underline cursor-pointer"
        >
          <span>View Full History</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Card>
  );
};
