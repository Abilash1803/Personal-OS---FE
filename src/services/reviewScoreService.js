/**
 * Review Score Engine for PersonalOS
 * Calculates a deterministic, weighted review score (0-100)
 * Weights:
 * - Task Completion: 50%
 * - Planner Accuracy: 20%
 * - Focus Execution: 20%
 * - Consistency / Streak: 10%
 */

export const SCORE_WEIGHTS = {
  TASK_COMPLETION: 0.5,
  PLANNER_ACCURACY: 0.2,
  FOCUS_EXECUTION: 0.2,
  STREAK_CONSISTENCY: 0.1,
};

export const reviewScoreService = {
  calculateScore({
    taskCompletionRate = 0,
    plannerAccuracy = 0,
    focusExecutionRate = 0,
    streakRatio = 0,
  }) {
    const weightedTask = (taskCompletionRate / 100) * SCORE_WEIGHTS.TASK_COMPLETION * 100;
    const weightedPlanner = (plannerAccuracy / 100) * SCORE_WEIGHTS.PLANNER_ACCURACY * 100;
    const weightedFocus = (focusExecutionRate / 100) * SCORE_WEIGHTS.FOCUS_EXECUTION * 100;
    const weightedStreak = (streakRatio / 100) * SCORE_WEIGHTS.STREAK_CONSISTENCY * 100;

    const rawScore = weightedTask + weightedPlanner + weightedFocus + weightedStreak;
    const roundedScore = Math.min(100, Math.max(0, Math.round(rawScore)));
    const label = this.getCalmLabel(roundedScore);

    return {
      score: roundedScore,
      label,
    };
  },

  getCalmLabel(score) {
    if (score >= 90) return 'Excellent Day';
    if (score >= 75) return 'Strong Day';
    if (score >= 60) return 'Steady Day';
    if (score >= 40) return 'Needs Attention';
    return 'Reset Tomorrow';
  },
};
