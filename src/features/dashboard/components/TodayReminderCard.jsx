import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { EventBadge } from '../../planner/components/EventBadge';
import { useAgenda } from '../../../hooks/useAgenda';
import { getTodayISODate } from '../../../utils/dateUtils';
import { Clock, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

export const TodayReminderCard = () => {
  const navigate = useNavigate();
  const todayStr = getTodayISODate();
  const { agendaItems, toggleItemCompletion } = useAgenda(todayStr);

  const hasItems = agendaItems && agendaItems.length > 0;

  return (
    <Card hoverEffect={true} className="flex flex-col justify-between">
      <div>
        <SectionHeader
          icon={Clock}
          iconBg="bg-[#2563EB]/10 text-[#2563EB] border-blue-200"
          title="Today's Agenda"
          subtitle="Combined tasks & scheduled timeline"
          rightAction={
            hasItems && (
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-blue-50 text-[#2563EB] rounded-full border border-blue-200/60">
                {agendaItems.length} Items
              </span>
            )
          }
        />

        {hasItems ? (
          <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {agendaItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 bg-slate-50/80 border-l-4 border-l-[#2563EB] border-y border-r border-[#E2E8F0] rounded-xl flex items-center justify-between gap-3 transition-all duration-200 hover:bg-white ${
                  item.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleItemCompletion(item)}
                    className="shrink-0 text-slate-300 hover:text-blue-600 focus:outline-none transition-colors"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 hover:text-blue-600" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold truncate ${item.completed ? 'line-through text-slate-400' : 'text-[#0F172A]'}`}>
                        {item.title}
                      </span>
                      <EventBadge type={item.type} />
                    </div>
                    <span className="text-[11px] text-[#64748B] block mt-0.5">{item.description}</span>
                  </div>
                </div>

                {item.time ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-white text-[#2563EB] rounded-md border border-blue-100 shadow-2xs shrink-0">
                    {item.displayTime}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                    All Day
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 p-6 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl text-center">
            <p className="text-xs text-[#64748B] font-medium">You're all caught up today.</p>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>Combined Planner & Goal Tasks</span>
        <span
          onClick={() => navigate('/planner')}
          className="flex items-center gap-1 font-medium text-[#2563EB] hover:underline cursor-pointer"
        >
          <span>Open Full Planner</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Card>
  );
};
