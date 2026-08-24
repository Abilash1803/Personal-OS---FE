import { EVENT_TYPES } from '../../../services/plannerService';
import {
  CheckSquare,
  Users,
  Bell,
  CreditCard,
  Cake,
  User,
  Bookmark,
} from 'lucide-react';

const ICON_MAP = {
  CheckSquare,
  Users,
  Bell,
  CreditCard,
  Cake,
  User,
  Bookmark,
};

export const EventBadge = ({ type = 'Task', className = '' }) => {
  const config = EVENT_TYPES[type.toUpperCase()] || EVENT_TYPES.TASK;
  const IconComponent = ICON_MAP[config.icon] || CheckSquare;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${config.color} ${className}`}
    >
      <IconComponent className="w-3 h-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
