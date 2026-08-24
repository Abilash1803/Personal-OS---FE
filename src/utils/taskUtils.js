/**
 * Task definitions, helper functions, and default initial state
 */

export const TASK_STATUSES = {
  NOT_STARTED: 'Not Started',
  PARTIALLY_DONE: 'Partially Done',
  COMPLETED: 'Completed',
  MISSED: 'Missed',
};

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    name: 'Workout',
    category: 'Health',
    icon: '🏋️',
    status: TASK_STATUSES.COMPLETED,
  },
  {
    id: 'task-2',
    name: 'Learning',
    category: 'Skill',
    icon: '📚',
    status: TASK_STATUSES.PARTIALLY_DONE,
  },
  {
    id: 'task-3',
    name: 'Client Work',
    category: 'Work',
    icon: '💼',
    status: TASK_STATUSES.PARTIALLY_DONE,
  },
  {
    id: 'task-4',
    name: 'Reading',
    category: 'Personal',
    icon: '📖',
    status: TASK_STATUSES.MISSED,
  },
];

export const computeTaskMetrics = (tasks = []) => {
  const total = tasks.length;
  if (total === 0) {
    return {
      total: 0,
      completedCount: 0,
      partiallyCount: 0,
      missedCount: 0,
      percentage: 0,
    };
  }

  const completedCount = tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
  const partiallyCount = tasks.filter(t => t.status === TASK_STATUSES.PARTIALLY_DONE).length;
  const missedCount = tasks.filter(t => t.status === TASK_STATUSES.MISSED).length;
  
  const percentage = Math.round(((completedCount + (partiallyCount * 0.5)) / total) * 100);

  return {
    total,
    completedCount,
    partiallyCount,
    missedCount,
    percentage: Math.min(100, Math.max(0, percentage)),
  };
};
