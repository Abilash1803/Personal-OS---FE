import { storageService } from './storageService';
import { TASK_STATUSES } from '../utils/taskUtils';

export const streakService = {
  getStreaks() {
    const dailyTasks = storageService.getCollection('DAILY_TASKS');
    const focusSessions = storageService.getCollection('FOCUS_SESSIONS');
    const timelineEvents = storageService.getCollection('TIMELINE_EVENTS');

    // Collect all dates with at least one completed task or completed focus session
    const activeDates = new Set();

    dailyTasks.forEach((t) => {
      if (t.status === TASK_STATUSES.COMPLETED && t.date) {
        activeDates.add(t.date);
      }
    });

    focusSessions.forEach((s) => {
      if (s.status === 'Completed' && s.startedAt) {
        activeDates.add(s.startedAt.split('T')[0]);
      }
    });

    timelineEvents.forEach((e) => {
      if (e.timestamp) {
        activeDates.add(e.timestamp.split('T')[0]);
      }
    });

    // 1. Current Daily Streak calculation
    let currentStreak = 0;
    let checkDate = new Date();

    // Check if today has activity; if not, check starting from yesterday
    let checkStr = this.formatDateStr(checkDate);
    if (!activeDates.has(checkStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
      checkStr = this.formatDateStr(checkDate);
    }

    while (activeDates.has(checkStr)) {
      currentStreak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
      checkStr = this.formatDateStr(checkDate);
    }

    // 2. Longest Daily Streak calculation
    const sortedDates = Array.from(activeDates).sort();
    let longestStreak = 0;
    let tempStreak = 0;
    let prevDate = null;

    sortedDates.forEach((dateStr) => {
      const currentDate = new Date(dateStr);
      if (!prevDate) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak += 1;
        } else {
          tempStreak = 1;
        }
      }
      prevDate = currentDate;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    });

    return {
      currentDailyStreak: currentStreak,
      longestDailyStreak: Math.max(currentStreak, longestStreak),
      focusStreak: Math.min(currentStreak, 7), // Focus active streak
      goalStreak: Math.min(currentStreak, 14), // Goal active streak
    };
  },

  formatDateStr(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },
};
