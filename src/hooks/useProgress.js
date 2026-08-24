import { useMemo } from 'react';
import { computeTaskMetrics, TASK_STATUSES } from '../utils/taskUtils';

export const useProgress = (dailyTasks = [], goals = [], templates = []) => {
  // Overall Dashboard Progress
  const metrics = useMemo(() => computeTaskMetrics(dailyTasks), [dailyTasks]);

  // Goal Progress Calculator: Percentage of generated daily tasks completed for goal's templates
  const getGoalProgress = useMemo(() => {
    const templateGoalMap = new Map(templates.map((t) => [t.id, t.goalId]));

    return (goalId) => {
      // Find daily tasks belonging to templates under this goal
      const goalTasks = dailyTasks.filter(
        (dt) => templateGoalMap.get(dt.templateId) === goalId
      );

      if (goalTasks.length === 0) return 0;
      const completed = goalTasks.filter((t) => t.status === TASK_STATUSES.COMPLETED).length;
      const partial = goalTasks.filter((t) => t.status === TASK_STATUSES.PARTIALLY_DONE).length;
      return Math.min(100, Math.round(((completed + partial * 0.5) / goalTasks.length) * 100));
    };
  }, [dailyTasks, templates]);

  // Life Area Progress Calculator: Average goal progress under this life area
  const getLifeAreaProgress = useMemo(() => {
    return (lifeAreaId) => {
      const areaGoals = goals.filter((g) => g.lifeAreaId === lifeAreaId);
      if (areaGoals.length === 0) return 0;

      const progressSum = areaGoals.reduce(
        (sum, goal) => sum + getGoalProgress(goal.id),
        0
      );
      return Math.round(progressSum / areaGoals.length);
    };
  }, [goals, getGoalProgress]);

  return {
    metrics,
    getGoalProgress,
    getLifeAreaProgress,
  };
};
