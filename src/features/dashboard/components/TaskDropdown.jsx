import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TASK_STATUSES } from '../../../utils/taskUtils';
import { dropdownVariant } from '../../../utils/animationVariants';
import { Check, Clock, AlertTriangle, Circle, Trash2 } from 'lucide-react';

export const TaskDropdown = ({ isOpen, onClose, currentStatus, onSelectStatus, onDeleteTask }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const options = [
    {
      label: TASK_STATUSES.NOT_STARTED,
      color: 'text-slate-600 hover:bg-slate-100',
      icon: Circle,
    },
    {
      label: TASK_STATUSES.PARTIALLY_DONE,
      color: 'text-amber-600 hover:bg-amber-50',
      icon: Clock,
    },
    {
      label: TASK_STATUSES.COMPLETED,
      color: 'text-emerald-600 hover:bg-emerald-50',
      icon: Check,
    },
    {
      label: TASK_STATUSES.MISSED,
      color: 'text-rose-600 hover:bg-rose-50',
      icon: AlertTriangle,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          variants={dropdownVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-1 overflow-hidden"
        >
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Set Status
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = currentStatus === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => {
                  onSelectStatus(opt.label);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${opt.color}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            );
          })}

          {onDeleteTask && (
            <div className="pt-1 mt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  onDeleteTask();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Task</span>
                </div>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
