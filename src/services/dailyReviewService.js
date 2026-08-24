import { summaryService } from './summaryService';
import { analyticsService } from './analyticsService';
import { streakService } from './streakService';
import { reflectionService } from './reflectionService';
import { reviewScoreService } from './reviewScoreService';
import { reviewInsightService } from './reviewInsightService';
import { storageService } from './storageService';
import { TASK_STATUSES } from '../utils/taskUtils';

export const dailyReviewService = {
  getDailyReview(dateStr) {
    const dailyTasks = storageService.getCollection('DAILY_TASKS').filter((t) => t.date === dateStr);
    const plannerEvents = storageService.getCollection('PLANNER_EVENTS').filter((e) => e.date === dateStr);

    const tasksPlanned = dailyTasks.length;
    const tasksCompleted = dailyTasks.filter((t) => t.status === TASK_STATUSES.COMPLETED).length;
    const tasksPartiallyDone = dailyTasks.filter((t) => t.status === TASK_STATUSES.PARTIALLY_DONE).length;
    const tasksMissed = dailyTasks.filter((t) => t.status === TASK_STATUSES.MISSED).length;

    const summary = summaryService.getDailySummary(dateStr);
    const streaks = streakService.getStreaks();
    const lifeAreaAnalytics = analyticsService.getLifeAreaAnalytics();
    const reflectionText = reflectionService.getByDate(dateStr);

    // Determine if date has recorded data
    const hasData = tasksPlanned > 0 || plannerEvents.length > 0 || summary.focusSessionsCount > 0;

    if (!hasData) {
      return {
        type: 'daily',
        date: dateStr,
        hasData: false,
        score: null,
        label: 'No Data Recorded',
        metrics: {
          tasksPlanned: 0,
          tasksCompleted: 0,
          tasksPartiallyDone: 0,
          tasksMissed: 0,
          completionRate: 0,
          totalFocusMinutes: 0,
          focusTimeFormatted: '0 mins',
          plannerEvents: 0,
          plannerAccuracy: 0,
        },
        highlights: [],
        attentionItems: [],
        reflection: '',
      };
    }

    const taskRate = tasksPlanned > 0 ? Math.round((tasksCompleted / tasksPlanned) * 100) : 100;
    const focusRatio = summary.totalFocusMinutes > 0 ? Math.min(100, Math.round((summary.totalFocusMinutes / 120) * 100)) : 0;
    const streakRatio = Math.min(100, Math.round((streaks.currentDailyStreak / 14) * 100));

    // Calculate weighted review score
    const { score, label } = reviewScoreService.calculateScore({
      taskCompletionRate: taskRate,
      plannerAccuracy: summary.plannerEventsCount > 0 ? summary.completionRate : taskRate,
      focusExecutionRate: focusRatio,
      streakRatio,
    });

    const sortedAreas = [...lifeAreaAnalytics].sort((a, b) => b.avgCompletion - a.avgCompletion);
    const strongestLifeArea = sortedAreas[0] || null;
    const weakestLifeArea = sortedAreas[sortedAreas.length - 1] || null;

    const highlights = reviewInsightService.generateHighlights({
      tasksCompleted,
      tasksPlanned,
      totalFocusMinutes: summary.totalFocusMinutes,
      plannerEventsCompleted: summary.plannerEventsCount,
      currentStreak: streaks.currentDailyStreak,
      strongestLifeArea,
    });

    const attentionItems = reviewInsightService.generateAttentionItems({
      tasksMissed,
      tasksPlanned,
      weakestLifeArea,
      plannerAccuracy: summary.completionRate,
      totalFocusMinutes: summary.totalFocusMinutes,
    });

    return {
      type: 'daily',
      date: dateStr,
      hasData: true,
      score,
      label,
      metrics: {
        tasksPlanned,
        tasksCompleted,
        tasksPartiallyDone,
        tasksMissed,
        completionRate: summary.completionRate,
        totalFocusMinutes: summary.totalFocusMinutes,
        focusTimeFormatted: summary.totalFocusTimeFormatted,
        focusSessionsCount: summary.focusSessionsCount,
        plannerEventsCount: summary.plannerEventsCount,
        plannerAccuracy: summary.plannerEventsCount > 0 ? summary.completionRate : taskRate,
      },
      strongestLifeArea,
      weakestLifeArea,
      currentStreak: streaks.currentDailyStreak,
      highlights,
      attentionItems,
      reflection: reflectionText,
    };
  },
};
