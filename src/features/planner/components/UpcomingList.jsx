import { EventBadge } from './EventBadge';
import { Calendar } from 'lucide-react';

export const UpcomingList = ({ upcomingEvents = [], onSelectDate }) => {
  if (upcomingEvents.length === 0) {
    return (
      <div className="p-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-2xl text-center">
        <p className="text-xs text-[#64748B] font-medium">Nothing planned for the next 7 days.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {upcomingEvents.map((evt) => (
        <div
          key={evt.id}
          onClick={() => onSelectDate(evt.date)}
          className="p-3 bg-white border border-[#E2E8F0] hover:border-blue-300 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#0F172A] truncate">{evt.title}</span>
                <EventBadge type={evt.type} />
              </div>
              <span className="text-[11px] text-[#64748B] block mt-0.5">{evt.date}</span>
            </div>
          </div>

          {evt.time && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md shrink-0">
              {evt.time}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
