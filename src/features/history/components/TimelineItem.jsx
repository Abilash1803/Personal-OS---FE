import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Zap,
  Calendar,
  Target,
  StickyNote,
  Pause,
  Play,
  BookOpen,
} from 'lucide-react';

export const TimelineItem = ({ event }) => {
  const formatEventTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEventIcon = (type) => {
    if (type.includes('Focus Completed')) return <Zap className="w-4 h-4 text-emerald-500" />;
    if (type.includes('Focus Started') || type.includes('Focus Resumed')) return <Play className="w-4 h-4 text-blue-500" />;
    if (type.includes('Focus Paused')) return <Pause className="w-4 h-4 text-amber-500" />;
    if (type.includes('Task Completed')) return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (type.includes('Planner')) return <Calendar className="w-4 h-4 text-purple-500" />;
    if (type.includes('Goal')) return <Target className="w-4 h-4 text-blue-600" />;
    if (type.includes('Reflection')) return <BookOpen className="w-4 h-4 text-indigo-500" />;
    return <StickyNote className="w-4 h-4 text-slate-500" />;
  };

  const getEventBadge = (evt) => {
    if (evt.metadata?.durationMinutes) {
      return `${evt.metadata.durationMinutes} mins focus`;
    }
    if (evt.metadata?.category) {
      return evt.metadata.category;
    }
    return evt.type;
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="p-3.5 bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl transition-all flex items-center justify-between gap-3 group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 shrink-0">
          {getEventIcon(event.type)}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#0F172A] truncate">
              {event.title}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 uppercase tracking-wider shrink-0">
              {getEventBadge(event)}
            </span>
          </div>

          <span className="text-[11px] text-[#64748B] block mt-0.5">
            {event.type}
          </span>
        </div>
      </div>

      <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 shrink-0">
        {formatEventTime(event.timestamp)}
      </span>
    </motion.div>
  );
};
