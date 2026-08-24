import { storageService } from './storageService';
import { getTodayISODate } from '../utils/dateUtils';
import { TASK_STATUSES } from '../utils/taskUtils';

export const summaryService = {
  getDailySummary(dateStr = getTodayISODate()) {
    const dailyTasks = storageService.getCollection('DAILY_TASKS').filter((t) => t.date === dateStr);
    const plannerEvents = storageService.getCollection('PLANNER_EVENTS').filter((e) => e.date === dateStr);
    const focusSessions = storageService.getCollection('FOCUS_SESSIONS');

    // Tasks stats
    const tasksCompleted = dailyTasks.filter((t) => t.status === TASK_STATUSES.COMPLETED).length;
    const tasksSkipped = dailyTasks.filter((t) => t.status === TASK_STATUSES.MISSED).length;

    // Focus Sessions stats
    const daySessions = focusSessions.filter((s) => {
      const sDate = s.startedAt ? s.startedAt.split('T')[0] : '';
      return sDate === dateStr;
    });

    const focusSessionsCount = daySessions.length;
    const totalFocusSeconds = daySessions.reduce(
      (sum, s) => sum + (s.actualDuration || 0),
      0
    );
    const totalFocusMinutes = Math.round(totalFocusSeconds / 60);

    // Planner & Meetings stats
    const plannerEventsCount = plannerEvents.length;
    const meetingsCount = plannerEvents.filter((e) => e.type === 'Meeting').length;

    // Completion Rate
    const totalItems = dailyTasks.length + plannerEventsCount;
    const completedItems = tasksCompleted + plannerEvents.filter((e) => e.completed).length;
    const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    return {
      dateStr,
      tasksCompleted,
      tasksSkipped,
      focusSessionsCount,
      totalFocusMinutes,
      totalFocusTimeFormatted:
        totalFocusMinutes >= 60
          ? `${Math.floor(totalFocusMinutes / 60)}h ${totalFocusMinutes % 60}m`
          : `${totalFocusMinutes} mins`,
      plannerEventsCount,
      meetingsCount,
      completionRate,
    };
  },
};
