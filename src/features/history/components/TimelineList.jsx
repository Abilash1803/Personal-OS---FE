import { TimelineItem } from './TimelineItem';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Calendar } from 'lucide-react';

export const TimelineList = ({ groupedTimeline = [] }) => {
  if (groupedTimeline.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No history found"
        subtitle="Complete tasks or schedule items to begin recording your productivity story."
        className="py-12"
      />
    );
  }

  return (
    <div className="space-y-6">
      {groupedTimeline.map((group) => (
        <div key={group.dateStr} className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] pb-1 border-b border-slate-200/80">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>{group.formattedDate}</span>
            <span className="text-[11px] font-normal text-slate-400">
              ({group.items.length} Events)
            </span>
          </div>

          <div className="space-y-2">
            {group.items.map((evt) => (
              <TimelineItem key={evt.id} event={evt} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
