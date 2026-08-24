import { motion } from 'framer-motion';
import { InlineInput } from '../../../components/ui/InlineInput';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Trash2, Archive, Calendar, ChevronRight } from 'lucide-react';

export const GoalCard = ({
  goal,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onToggleArchive,
  templateCount = 0,
  progress = 0,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => onSelect(goal.id)}
      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group ${
        isSelected
          ? 'bg-blue-50/80 border-blue-500/80 shadow-xs'
          : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50/60'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A] truncate">
              <InlineInput
                value={goal.title}
                onSave={(newTitle) => onUpdate(goal.id, { title: newTitle })}
                className="font-bold text-sm"
              />
            </h3>
            {!goal.isActive && (
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                Archived
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
            <InlineInput
              value={goal.description}
              placeholder="Add description..."
              onSave={(newDesc) => onUpdate(goal.id, { description: newDesc })}
              className="text-xs text-[#64748B]"
            />
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleArchive(goal.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
            title={goal.isActive ? 'Archive Goal' : 'Activate Goal'}
          >
            <Archive className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(goal.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            title="Delete Goal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-2 pt-1 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{goal.targetDate || 'No Target Date'}</span>
          </span>
          <span className="font-semibold text-blue-600">{progress}% Progress</span>
        </div>

        <ProgressBar percentage={progress} height="h-2" />
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
        <span>{templateCount} Task Templates</span>
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform ${
            isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
          }`}
        />
      </div>
    </motion.div>
  );
};
