import { getTodayISODate } from '../utils/dateUtils';
import { plannerService } from './plannerService';
import { generatorService } from './generatorService';

export const calendarService = {
  /**
   * Generates a 42-day month grid (6 rows x 7 days) for the specified year and month.
   */
  getMonthMatrix(year, monthIndex) {
    const todayStr = getTodayISODate();
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sun, 1 is Mon...
    const daysInMonth = lastDayOfMonth.getDate();

    // Previous month padding
    const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();

    // Fetch all planner events and generated tasks to populate indicator badges
    const allEvents = plannerService.getAll();
    const resolvedTasks = generatorService.getResolvedTodayTasks();

    const eventDatesSet = new Set(allEvents.map((e) => e.date));
    const taskDatesSet = new Set(resolvedTasks.map((t) => t.date));

    const days = [];

    // 1. Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const dateObj = new Date(year, monthIndex - 1, dayNum);
      const dateStr = this.formatISODate(dateObj);
      days.push({
        dateStr,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        hasEvents: eventDatesSet.has(dateStr),
        hasTasks: taskDatesSet.has(dateStr),
      });
    }

    // 2. Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, monthIndex, d);
      const dateStr = this.formatISODate(dateObj);
      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        hasEvents: eventDatesSet.has(dateStr),
        hasTasks: taskDatesSet.has(dateStr),
      });
    }

    // 3. Next month days padding to complete 42 cells
    const remainingCells = 42 - days.length;
    for (let n = 1; n <= remainingCells; n++) {
      const dateObj = new Date(year, monthIndex + 1, n);
      const dateStr = this.formatISODate(dateObj);
      days.push({
        dateStr,
        dayNumber: n,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        hasEvents: eventDatesSet.has(dateStr),
        hasTasks: taskDatesSet.has(dateStr),
      });
    }

    return days;
  },

  formatISODate(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  getMonthTitle(year, monthIndex) {
    const dateObj = new Date(year, monthIndex, 1);
    return dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  },
};
