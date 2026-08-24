import { motion } from 'framer-motion';
import { InlineInput } from '../../../components/ui/InlineInput';
import { Clock, Trash2, Calendar } from 'lucide-react';

export const TemplateRow = ({
  template,
  onUpdate,
  onDelete,
  onToggleActive,
}) => {
  const priorityColors = {
    High: 'bg-rose-50 text-[#EF4444] border-rose-200',
    Medium: 'bg-amber-50 text-[#F59E0B] border-amber-200',
    Low: 'bg-blue-50 text-[#2563EB] border-blue-200',
  };

  return (
    <motion.div
      layout
      className={`p-3.5 bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 group ${
        !template.active ? 'opacity-50 bg-slate-50/50' : ''
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Active Toggle Switch */}
        <button
          type="button"
          onClick={() => onToggleActive(template.id)}
          className={`w-9 h-5 rounded-full p-0.5 transition-colors relative focus:outline-none ${
            template.active ? 'bg-blue-600' : 'bg-slate-300'
          }`}
          title={template.active ? 'Disable Template' : 'Enable Template'}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              template.active ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>

        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#0F172A] truncate">
            <InlineInput
              value={template.title}
              onSave={(newTitle) => onUpdate(template.id, { title: newTitle })}
              className="font-semibold text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#64748B] mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{template.estimatedMinutes || 30} mins</span>
            </span>

            <span>•</span>

            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{template.recurrence || 'Daily'}</span>
            </span>

            <span>•</span>

            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                priorityColors[template.priority] || priorityColors.Medium
              }`}
            >
              {template.priority} Priority
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(template.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
        title="Delete Task Template"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
