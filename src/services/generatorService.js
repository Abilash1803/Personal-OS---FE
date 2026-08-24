import { storageService } from './storageService.js';
import { goalService } from './goalService.js';
import { templateService } from './templateService.js';
import { lifeAreaService } from './lifeAreaService.js';
import { getTodayISODate } from '../utils/dateUtils.js';
import { TASK_STATUSES } from '../utils/taskUtils.js';
import { generateUUID } from '../utils/idUtils.js';

export const generatorService = {
  /**
   * Generates or syncs today's daily tasks from active Goals and Task Templates.
   */
  generateTodayTasks() {
    const today = getTodayISODate();
    const existingTasks = storageService.getCollection('DAILY_TASKS');
    
    // Filter existing tasks for today
    let todayTasks = existingTasks.filter((t) => t.date === today);

    // Fetch active goals and templates
    const activeGoals = goalService.getAll().filter((g) => g.isActive);
    const activeGoalIds = new Set(activeGoals.map((g) => g.id));

    const activeTemplates = templateService.getAll().filter(
      (t) => t.active && activeGoalIds.has(t.goalId)
    );

    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let modified = false;

    // Ensure every eligible template has a daily task generated for today
    activeTemplates.forEach((template) => {
      // Check recurrence filtering
      if (template.recurrence === 'Weekdays' && isWeekend) return;
      if (template.recurrence === 'Weekends' && !isWeekend) return;

      const existing = todayTasks.find((t) => t.templateId === template.id);
      if (!existing) {
        const newTask = {
          id: generateUUID(),
          templateId: template.id,
          date: today,
          status: TASK_STATUSES.NOT_STARTED,
          completedAt: null,
          notes: '',
        };
        todayTasks.push(newTask);
        modified = true;
      }
    });

    if (modified || existingTasks.length !== todayTasks.length) {
      // Keep previous days history + today's tasks
      const otherDaysTasks = existingTasks.filter((t) => t.date !== today);
      const updatedAllTasks = [...otherDaysTasks, ...todayTasks];
      storageService.setCollection('DAILY_TASKS', updatedAllTasks);
    }

    return todayTasks;
  },

  /**
   * Resolves today's generated daily tasks with template, goal, and life area metadata
   */
  getResolvedTodayTasks() {
    const dailyTasks = this.generateTodayTasks();
    const templates = templateService.getAll();
    const goals = goalService.getAll();
    const lifeAreas = lifeAreaService.getAll();

    const templateMap = new Map(templates.map((t) => [t.id, t]));
    const goalMap = new Map(goals.map((g) => [g.id, g]));
    const lifeAreaMap = new Map(lifeAreas.map((la) => [la.id, la]));

    return dailyTasks.map((task) => {
      const template = templateMap.get(task.templateId);
      const goal = template ? goalMap.get(template.goalId) : null;
      const lifeArea = goal ? lifeAreaMap.get(goal.lifeAreaId) : null;

      return {
        ...task,
        name: template ? template.title : 'Task',
        estimatedMinutes: template ? template.estimatedMinutes : 30,
        priority: template ? template.priority : 'Medium',
        category: lifeArea ? lifeArea.name : 'General',
        icon: lifeArea ? lifeArea.icon : '📌',
        color: lifeArea ? lifeArea.color : '#2563EB',
        goalId: goal ? goal.id : null,
        lifeAreaId: lifeArea ? lifeArea.id : null,
      };
    });
  },

  /**
   * Updates status of a generated daily task
   */
  updateTaskStatus(taskId, status) {
    const existingTasks = storageService.getCollection('DAILY_TASKS');
    const updated = existingTasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status,
          completedAt: status === TASK_STATUSES.COMPLETED ? new Date().toISOString() : t.completedAt,
        };
      }
      return t;
    });
    storageService.setCollection('DAILY_TASKS', updated);
    return this.getResolvedTodayTasks();
  },
};
