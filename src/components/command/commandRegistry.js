import {
  LayoutDashboard,
  Target,
  CalendarDays,
  Zap,
  History,
  BarChart3,
  ClipboardCheck,
  Settings,
  PlusCircle,
  Play,
  CalendarPlus,
} from 'lucide-react';

export const COMMAND_CATEGORIES = {
  QUICK_ACTIONS: 'Quick Actions',
  NAVIGATION: 'Navigation',
};

export const getCommandRegistry = (navigate) => [
  // Quick Actions
  {
    id: 'action-create-goal',
    label: 'Create Goal',
    category: COMMAND_CATEGORIES.QUICK_ACTIONS,
    keywords: ['goal', 'new', 'create', 'target', 'life area'],
    icon: PlusCircle,
    action: () => navigate('/goals'),
  },
  {
    id: 'action-add-planner-event',
    label: 'Add Planner Event',
    category: COMMAND_CATEGORIES.QUICK_ACTIONS,
    keywords: ['planner', 'reminder', 'meeting', 'event', 'calendar', 'add'],
    icon: CalendarPlus,
    action: () => navigate('/planner'),
  },
  {
    id: 'action-start-focus',
    label: 'Start Focus Session',
    category: COMMAND_CATEGORIES.QUICK_ACTIONS,
    keywords: ['focus', 'timer', 'work', 'execute', 'start'],
    icon: Play,
    action: () => navigate('/focus'),
  },

  // Navigation
  {
    id: 'nav-dashboard',
    label: 'Open Dashboard',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['home', 'dashboard', 'tasks', 'today'],
    icon: LayoutDashboard,
    action: () => navigate('/'),
  },
  {
    id: 'nav-goals',
    label: 'Open Goals',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['goals', 'targets', 'life areas', 'templates'],
    icon: Target,
    action: () => navigate('/goals'),
  },
  {
    id: 'nav-planner',
    label: 'Open Planner',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['planner', 'agenda', 'calendar', 'schedule'],
    icon: CalendarDays,
    action: () => navigate('/planner'),
  },
  {
    id: 'nav-focus',
    label: 'Open Focus Mode',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['focus', 'timer', 'execution'],
    icon: Zap,
    action: () => navigate('/focus'),
  },
  {
    id: 'nav-history',
    label: 'Open History',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['history', 'timeline', 'journal', 'log'],
    icon: History,
    action: () => navigate('/history'),
  },
  {
    id: 'nav-analytics',
    label: 'Open Analytics',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['analytics', 'metrics', 'heatmap', 'charts', 'performance'],
    icon: BarChart3,
    action: () => navigate('/analytics'),
  },
  {
    id: 'nav-reviews',
    label: 'Open Reviews',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['reviews', 'daily review', 'weekly review', 'score'],
    icon: ClipboardCheck,
    action: () => navigate('/reviews'),
  },
  {
    id: 'nav-settings',
    label: 'Open Settings',
    category: COMMAND_CATEGORIES.NAVIGATION,
    keywords: ['settings', 'preferences', 'profile', 'theme'],
    icon: Settings,
    action: () => navigate('/settings'),
  },
];
