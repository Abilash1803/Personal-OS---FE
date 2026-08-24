import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '../../../components/ui/Badge';
import { TaskDropdown } from './TaskDropdown';
import { TASK_STATUSES } from '../../../utils/taskUtils';
import { useActiveSession } from '../../../hooks/useActiveSession';
import { ChevronDown, CheckCircle2, Clock, AlertTriangle, Play, Zap } from 'lucide-react';

export const TaskItem = ({ task, onStatusChange }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { activeTaskId, isRunning } = useActiveSession();

  const isCurrentActiveTask = activeTaskId === task.id;

  const getStatusCircle = () => {
    switch (task.status) {
      case TASK_STATUSES.COMPLETED:
        return <CheckCircle2 className="w-4 h-4 text-[#22C55E] transition-colors duration-200" />;
      case TASK_STATUSES.PARTIALLY_DONE:
        return <Clock className="w-4 h-4 text-[#F59E0B] transition-colors duration-200" />;
      case TASK_STATUSES.MISSED:
        return <AlertTriangle className="w-4 h-4 text-[#EF4444] transition-colors duration-200" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-slate-300 transition-colors duration-200" />;
    }
  };

  const handleFocusClick = (e) => {
    e.stopPropagation();
    navigate(`/focus?taskId=${task.id}`);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2, boxShadow: '0 8px 20px -4px rgba(15, 23, 42, 0.08)' }}
      transition={{ duration: 0.2 }}
      className={`relative flex items-center justify-between p-3 sm:p-3.5 bg-slate-50/80 hover:bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl transition-all duration-200 cursor-pointer group gap-2.5 sm:gap-3 ${
        isDropdownOpen ? 'z-40 shadow-md bg-white' : 'z-10'
      }`}
      onClick={() => setIsDropdownOpen((prev) => !prev)}
    >
      {/* Left: Status Circle + Icon + Name + Category Tag */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div className="flex items-center justify-center shrink-0 w-5 h-5">
          {getStatusCircle()}
        </div>

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-base select-none shrink-0">{task.icon || '📌'}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-semibold text-[#0F172A] tracking-tight truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none">
                {task.name}
              </span>
              {task.category && (
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 bg-slate-200/60 px-1.5 sm:px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                  {task.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Start/Continue Focus Button + Status Badge & Dropdown Trigger */}
      <div className="relative flex items-center gap-1.5 sm:gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
        {/* Focus Trigger Button */}
        {task.status !== TASK_STATUSES.COMPLETED && (
          <button
            type="button"
            onClick={handleFocusClick}
            className={`inline-flex items-center justify-center gap-1 min-h-[34px] px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
              isCurrentActiveTask
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
            }`}
            title="Open Focus Engine for this task"
          >
            {isCurrentActiveTask && isRunning ? (
              <>
                <Zap className="w-3.5 h-3.5 animate-pulse text-amber-300 shrink-0" />
                <span className="hidden xs:inline">Continue</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current shrink-0" />
                <span className="hidden xs:inline">Focus</span>
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 min-h-[34px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg p-1 sm:p-1.5 hover:bg-slate-200/60 transition-colors"
          title="Click to change status"
          aria-label={`Change status for ${task.name}`}
        >
          <Badge status={task.status} />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
        </button>

        <TaskDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          currentStatus={task.status}
          onSelectStatus={(newStatus) => onStatusChange(task.id, newStatus)}
        />
      </div>
    </motion.div>
  );
};
