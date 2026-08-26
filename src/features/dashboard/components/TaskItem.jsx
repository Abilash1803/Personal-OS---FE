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
  const isCompleted = task.status === TASK_STATUSES.COMPLETED;

  const getStatusCircle = () => {
    switch (task.status) {
      case TASK_STATUSES.COMPLETED:
        return <CheckCircle2 className="w-5 h-5 text-[#22C55E] transition-colors duration-200" />;
      case TASK_STATUSES.PARTIALLY_DONE:
        return <Clock className="w-5 h-5 text-[#F59E0B] transition-colors duration-200" />;
      case TASK_STATUSES.MISSED:
        return <AlertTriangle className="w-5 h-5 text-[#EF4444] transition-colors duration-200" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-blue-500 transition-colors duration-200" />;
    }
  };

  const handleToggleCheck = (e) => {
    e.stopPropagation();
    const nextStatus = isCompleted ? TASK_STATUSES.NOT_STARTED : TASK_STATUSES.COMPLETED;
    onStatusChange(task.id, nextStatus);
  };

  const handleFocusClick = (e) => {
    e.stopPropagation();
    navigate(`/focus?taskId=${task.id}`);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -1, boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.06)' }}
      transition={{ duration: 0.15 }}
      className={`relative p-3 sm:p-3.5 bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-xl transition-all duration-150 group flex flex-col gap-2 ${
        isDropdownOpen ? 'z-40 shadow-md ring-1 ring-blue-500/20' : 'z-10'
      } ${isCompleted ? 'bg-slate-50/70 opacity-80' : ''}`}
    >
      {/* Main Row: Checkbox + Icon + Task Title + Focus/Status Action */}
      <div className="flex items-start justify-between gap-2.5">
        {/* Left Side: Checkbox + Emoji + Title */}
        <div className="flex items-start gap-2.5 min-w-0 flex-1">
          {/* Quick Toggle Checkbox Button */}
          <button
            type="button"
            onClick={handleToggleCheck}
            className="shrink-0 pt-0.5 focus:outline-none transition-transform active:scale-90"
            title={isCompleted ? "Mark incomplete" : "Mark completed"}
            aria-label={`Toggle completion for ${task.name}`}
          >
            {getStatusCircle()}
          </button>

          {/* Emoji */}
          <span className="text-base select-none shrink-0 pt-0.5">{task.icon || '📌'}</span>

          {/* Title & Category Info */}
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm font-semibold tracking-tight text-[#0F172A] leading-snug break-words ${
                isCompleted ? 'line-through text-slate-400' : ''
              }`}
            >
              {task.name}
            </h4>

            {/* Sub-row: Category Badge & Details */}
            <div className="flex items-center gap-1.5 flex-wrap mt-1">
              {task.category && (
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/60 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  {task.category}
                </span>
              )}
              {task.estimatedMinutes && (
                <span className="text-[10px] text-slate-400 font-medium">
                  {task.estimatedMinutes}m
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Focus Action + Status Dropdown Button */}
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5" onClick={(e) => e.stopPropagation()}>
          {/* Focus Button */}
          {!isCompleted && (
            <button
              type="button"
              onClick={handleFocusClick}
              className={`inline-flex items-center justify-center gap-1 min-h-[30px] p-1.5 sm:px-2.5 sm:py-1 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                isCurrentActiveTask
                  ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                  : 'bg-slate-50 text-blue-600 border border-blue-200 hover:bg-blue-50'
              }`}
              title="Start Focus Session"
              aria-label="Start Focus Session"
            >
              {isCurrentActiveTask && isRunning ? (
                <>
                  <Zap className="w-3.5 h-3.5 animate-pulse text-amber-300 shrink-0" />
                  <span className="hidden sm:inline">Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current shrink-0" />
                  <span className="hidden sm:inline">Focus</span>
                </>
              )}
            </button>
          )}

          {/* Status Dropdown Trigger Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 min-h-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg p-0.5 hover:bg-slate-100 transition-colors"
              title="Change task status"
              aria-label={`Status: ${task.status}`}
            >
              <Badge status={task.status} />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 transition-colors shrink-0" />
            </button>

            <TaskDropdown
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              currentStatus={task.status}
              onSelectStatus={(newStatus) => onStatusChange(task.id, newStatus)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
