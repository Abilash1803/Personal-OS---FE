import { storageService } from './storageService';
import { goalService } from './goalService';
import { lifeAreaService } from './lifeAreaService';
import { templateService } from './templateService';
import { TASK_STATUSES } from '../utils/taskUtils';

export const analyticsService = {
  /**
   * Generates a 90-day GitHub-style heatmap activity matrix
   */
  getHeatmapData() {
    const dailyTasks = storageService.getCollection('DAILY_TASKS');
    const focusSessions = storageService.getCollection('FOCUS_SESSIONS');
    const plannerEvents = storageService.getCollection('PLANNER_EVENTS');

    const activityCounts = new Map();

    // Tally completed tasks
    dailyTasks.forEach((t) => {
      if (t.status === TASK_STATUSES.COMPLETED && t.date) {
        activityCounts.set(t.date, (activityCounts.get(t.date) || 0) + 1);
      }
    });

    // Tally completed focus sessions
    focusSessions.forEach((s) => {
      if (s.status === 'Completed' && s.startedAt) {
        const d = s.startedAt.split('T')[0];
        activityCounts.set(d, (activityCounts.get(d) || 0) + 1);
      }
    });

    // Tally planner events
    plannerEvents.forEach((e) => {
      if (e.completed && e.date) {
        activityCounts.set(e.date, (activityCounts.get(e.date) || 0) + 1);
      }
    });

    const days = [];
    const now = new Date();

    for (let i = 83; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dayNum = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${dayNum}`;

      const count = activityCounts.get(dateStr) || 0;
      let level = 0;
      if (count >= 6) level = 3;
      else if (count >= 3) level = 2;
      else if (count >= 1) level = 1;

      days.push({
        dateStr,
        count,
        level,
        dayOfWeek: d.getDay(),
      });
    }

    return days;
  },

  getGoalAnalytics() {
    const goals = goalService.getAll();
    const templates = templateService.getAll();
    const dailyTasks = storageService.getCollection('DAILY_TASKS');
    const focusSessions = storageService.getCollection('FOCUS_SESSIONS');

    const templateGoalMap = new Map(templates.map((t) => [t.id, t.goalId]));

    return goals.map((goal) => {
      // Find tasks belonging to templates under this goal
      const goalTasks = dailyTasks.filter(
        (dt) => templateGoalMap.get(dt.templateId) === goal.id
      );

      const total = goalTasks.length;
      const completed = goalTasks.filter((t) => t.status === TASK_STATUSES.COMPLETED).length;
      const partial = goalTasks.filter((t) => t.status === TASK_STATUSES.PARTIALLY_DONE).length;

      const completionPercentage =
        total > 0 ? Math.min(100, Math.round(((completed + partial * 0.5) / total) * 100)) : 0;

      // Focus time for this goal
      const goalSessionSec = focusSessions
        .filter((s) => {
          const task = dailyTasks.find((dt) => dt.id === s.dailyTaskId);
          return task && templateGoalMap.get(task.templateId) === goal.id;
        })
        .reduce((sum, s) => sum + (s.actualDuration || 0), 0);

      const focusHours = Math.round(goalSessionSec / 3600);

      return {
        id: goal.id,
        title: goal.title,
        completionPercentage,
        focusHours,
        currentStreak: 0,
        trend: 'Steady',
        status: goal.isActive ? 'Active' : 'Archived',
      };
    });
  },

  getLifeAreaAnalytics() {
    const lifeAreas = lifeAreaService.getAll();
    const goals = goalService.getAll();
    const goalAnalytics = this.getGoalAnalytics();

    return lifeAreas.map((la) => {
      const areaGoals = goals.filter((g) => g.lifeAreaId === la.id);
      const areaGoalAnalytics = goalAnalytics.filter((ga) =>
        areaGoals.some((g) => g.id === ga.id)
      );

      const avgCompletion =
        areaGoalAnalytics.length > 0
          ? Math.round(
              areaGoalAnalytics.reduce((sum, g) => sum + g.completionPercentage, 0) /
                areaGoalAnalytics.length
            )
          : 0;

      const totalFocusHours = areaGoalAnalytics.reduce((sum, g) => sum + g.focusHours, 0);
      const isNeglected = avgCompletion < 50;

      return {
        id: la.id,
        name: la.name,
        icon: la.icon,
        color: la.color,
        avgCompletion,
        totalFocusHours,
        activeGoalsCount: areaGoals.length,
        isNeglected,
      };
    });
  },

  getTimeDistribution() {
    const lifeAreaAnalytics = this.getLifeAreaAnalytics();

    return lifeAreaAnalytics.map((la) => ({
      name: la.name,
      hours: la.totalFocusHours || 0,
      color: la.color,
      percentage: la.avgCompletion,
    }));
  },
};

