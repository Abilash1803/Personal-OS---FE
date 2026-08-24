import { motion } from 'framer-motion';
import { InlineInput } from '../../../components/ui/InlineInput';
import { Trash2, ChevronRight } from 'lucide-react';

export const LifeAreaCard = ({
  lifeArea,
  isSelected,
  onSelect,
  onRename,
  onDelete,
  goalCount = 0,
  progress = 0,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => onSelect(lifeArea.id)}
      className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
        isSelected
          ? 'bg-blue-50/80 border-blue-500/80 shadow-xs'
          : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50/60'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl select-none shrink-0">{lifeArea.icon || '📌'}</span>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#0F172A] truncate">
            <InlineInput
              value={lifeArea.name}
              onSave={(newName) => onRename(lifeArea.id, newName)}
              className="font-semibold text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-0.5">
            <span>{goalCount} Goals</span>
            <span>•</span>
            <span className="text-blue-600 font-semibold">{progress}% Progress</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(lifeArea.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
          title="Delete Life Area"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <ChevronRight
          className={`w-4 h-4 transition-transform ${
            isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
          }`}
        />
      </div>
    </motion.div>
  );
};
