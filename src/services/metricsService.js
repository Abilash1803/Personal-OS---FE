import { storageService } from './storageService';
import { TASK_STATUSES } from '../utils/taskUtils';

export const metricsService = {
  getOverviewMetrics(range = 'This Week') {
    const dailyTasks = storageService.getCollection('DAILY_TASKS');
    const plannerEvents = storageService.getCollection('PLANNER_EVENTS');
    const focusSessions = storageService.getCollection('FOCUS_SESSIONS');

    // Filter by date range if applicable
    const filteredTasks = this.filterByRange(dailyTasks, range, 'date');
    const filteredEvents = this.filterByRange(plannerEvents, range, 'date');
    const filteredSessions = this.filterByRange(focusSessions, range, 'startedAt');

    // 1. Completion Rate
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter((t) => t.status === TASK_STATUSES.COMPLETED).length;
    const skippedTasks = filteredTasks.filter((t) => t.status === TASK_STATUSES.MISSED).length;

    const totalPlannerEvents = filteredEvents.length;
    const completedPlannerEvents = filteredEvents.filter((e) => e.completed).length;

    const grandTotal = totalTasks + totalPlannerEvents;
    const grandCompleted = completedTasks + completedPlannerEvents;

    const completionRate = grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;

    // 2. Focus Time & Sessions
    const totalFocusSeconds = filteredSessions.reduce(
      (sum, s) => sum + (s.actualDuration || 0),
      0
    );
    const totalFocusMinutes = Math.round(totalFocusSeconds / 60);

    const sessionLengths = filteredSessions
      .map((s) => Math.round((s.actualDuration || 0) / 60))
      .filter((l) => l > 0);

    const avgSessionMinutes =
      sessionLengths.length > 0
        ? Math.round(sessionLengths.reduce((a, b) => a + b, 0) / sessionLengths.length)
        : 0;

    const longestSessionMinutes =
      sessionLengths.length > 0 ? Math.max(...sessionLengths) : 0;

    // 3. Planner Accuracy (%)
    const plannerAccuracy =
      totalPlannerEvents > 0
        ? Math.round((completedPlannerEvents / totalPlannerEvents) * 100)
        : 0;

    return {
      completionRate,
      completedTasks,
      skippedTasks,
      totalFocusMinutes,
      focusTimeFormatted:
        totalFocusMinutes >= 60
          ? `${Math.floor(totalFocusMinutes / 60)}h ${totalFocusMinutes % 60}m`
          : `${totalFocusMinutes} mins`,
      avgSessionMinutes,
      longestSessionMinutes,
      plannerAccuracy,
      totalFocusSessions: filteredSessions.length,
    };
  },

  filterByRange(items, range, dateProp) {
    if (!items || items.length === 0 || range === 'All') return items;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return items.filter((item) => {
      const rawVal = item[dateProp];
      if (!rawVal) return false;

      const itemDate = new Date(rawVal.includes('T') ? rawVal : `${rawVal}T00:00:00`);

      if (range === 'Today') {
        return itemDate >= todayStart;
      }
      if (range === 'This Week') {
        const weekStart = new Date(todayStart);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        return itemDate >= weekStart;
      }
      if (range === 'This Month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return itemDate >= monthStart;
      }
      if (range === 'Last Month') {
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        return itemDate >= lastMonthStart && itemDate <= lastMonthEnd;
      }
      return true;
    });
  },
};
