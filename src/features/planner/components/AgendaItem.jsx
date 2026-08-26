import { motion } from 'framer-motion';
import { EventBadge } from './EventBadge';
import { Clock, CheckCircle2, Circle, Target, Trash2 } from 'lucide-react';

export const AgendaItem = ({ item, onToggleCompleted, onDelete }) => {
  const isCompleted = item.completed;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2, boxShadow: '0 8px 20px -4px rgba(15, 23, 42, 0.06)' }}
      transition={{ duration: 0.15 }}
      className={`p-3.5 bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 group ${
        isCompleted ? 'opacity-60 bg-slate-50/60' : ''
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Toggle Checkbox */}
        <button
          type="button"
          onClick={() => onToggleCompleted(item)}
          className="shrink-0 text-slate-300 hover:text-blue-600 focus:outline-none transition-colors"
          aria-label={`Mark ${item.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 hover:text-blue-600" />
          )}
        </button>

        {/* Time Badge */}
        {item.time ? (
          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100 shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>{item.displayTime || item.time}</span>
          </div>
        ) : (
          <div className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
            {item.displayTime || 'Untimed'}
          </div>
        )}

        {/* Title & Metadata */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-semibold tracking-tight truncate ${
                isCompleted ? 'line-through text-slate-400' : 'text-[#0F172A]'
              }`}
            >
              {item.title}
            </span>
            <EventBadge type={item.type} />
          </div>

          {item.description && (
            <p className="text-[11px] text-[#64748B] truncate mt-0.5">{item.description}</p>
          )}

          {item.category && (
            <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-0.5">
              <Target className="w-3 h-3 text-slate-400" />
              <span>{item.category} Goal Task</span>
            </div>
          )}
        </div>
      </div>

      {/* Delete button (accessible on both mobile & desktop) */}
      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shrink-0 opacity-70 hover:opacity-100 focus:opacity-100"
          title="Delete Entry"
          aria-label="Delete Entry"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};
