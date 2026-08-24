import { plannerService } from './plannerService';
import { generatorService } from './generatorService';
import { getTodayISODate } from '../utils/dateUtils';
import { TASK_STATUSES } from '../utils/taskUtils';

export const agendaService = {
  /**
   * Combines generated daily tasks and planner events for a given date into a single chronological timeline.
   */
  getCombinedAgenda(dateStr = getTodayISODate()) {
    const todayStr = getTodayISODate();
    
    // 1. Fetch planner events for date
    const events = plannerService.getByDate(dateStr);

    // 2. Fetch daily tasks (resolved)
    let tasks = [];
    if (dateStr === todayStr) {
      tasks = generatorService.getResolvedTodayTasks();
    } else {
      // For historical/future dates, fetch resolved tasks if available
      tasks = generatorService.getResolvedTodayTasks().filter((t) => t.date === dateStr);
    }

    // 3. Map planner events to unified agenda format
    const formattedEvents = events.map((e) => ({
      id: e.id,
      originalType: 'EVENT',
      title: e.title,
      type: e.type || 'Meeting',
      time: e.time || '',
      displayTime: e.time ? this.formatTime12Hour(e.time) : 'Untimed',
      description: e.description,
      completed: e.completed,
      status: e.completed ? TASK_STATUSES.COMPLETED : TASK_STATUSES.PARTIALLY_DONE,
      linkedTaskId: e.linkedTaskId,
      category: 'Planner Event',
      icon: 'Calendar',
    }));

    // 4. Map daily tasks to unified agenda format
    const formattedTasks = tasks.map((t) => ({
      id: t.id,
      originalType: 'TASK',
      title: t.name,
      type: 'Task',
      time: t.time || '', // Tasks can have an assigned time or be untimed
      displayTime: t.time ? this.formatTime12Hour(t.time) : 'Daily Goal Task',
      description: `Target Goal Item (${t.category})`,
      completed: t.status === TASK_STATUSES.COMPLETED,
      status: t.status,
      category: t.category,
      icon: t.icon || 'CheckSquare',
      color: t.color,
      goalId: t.goalId,
    }));

    // 5. Combine and sort chronologically by time
    const combined = [...formattedEvents, ...formattedTasks];

    return combined.sort((a, b) => {
      if (a.time && b.time) {
        return a.time.localeCompare(b.time);
      }
      if (a.time && !b.time) return -1;
      if (!a.time && b.time) return 1;
      return a.title.localeCompare(b.title);
    });
  },

  formatTime12Hour(time24) {
    if (!time24) return '';
    const [hStr, mStr] = time24.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    if (isNaN(h)) return time24;

    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // hour 0 is 12 AM
    return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
  },
};
