import { Card } from '../../../components/ui/Card';
import { Rocket, Clock, BarChart3, CloudSync, Sparkles } from 'lucide-react';

export const FutureFeaturesCard = () => {
  const roadmap = [
    {
      title: 'Focus Mode & Pomodoro',
      description: 'Built-in distraction-free timer with ambient sound generators.',
      icon: Clock,
      status: 'Sprint 2',
    },
    {
      title: 'Habit Analytics & Streaks',
      description: 'Historical performance charts and weekly completion insights.',
      icon: BarChart3,
      status: 'Sprint 2',
    },
    {
      title: 'Cloud Backup & Multi-device Sync',
      description: 'Optional encrypted sync across desktop and mobile browsers.',
      icon: CloudSync,
      status: 'Sprint 3',
    },
  ];

  return (
    <Card hoverEffect={false} className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
          <Rocket className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#0F172A]">Future Roadmap</h2>
          <p className="text-xs text-[#64748B]">Upcoming features planned for PersonalOS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {roadmap.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-indigo-600">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-200/60">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Planned Expansion</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
