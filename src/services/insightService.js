import { metricsService } from './metricsService';
import { analyticsService } from './analyticsService';
import { streakService } from './streakService';

export const insightService = {
  getInsights() {
    const overview = metricsService.getOverviewMetrics('This Month');
    const lifeAreas = analyticsService.getLifeAreaAnalytics();
    const streaks = streakService.getStreaks();

    const insights = [];

    // 1. Strongest Life Area Insight
    if (lifeAreas.length > 0) {
      const sorted = [...lifeAreas].sort((a, b) => b.avgCompletion - a.avgCompletion);
      const top = sorted[0];
      insights.push({
        id: 'ins-1',
        type: 'success',
        title: `${top.name} is your strongest Life Area`,
        description: `You have achieved a ${top.avgCompletion}% completion rate in ${top.name} with ${top.activeGoalsCount} active goals.`,
        actionLabel: 'Keep Momentum',
      });
    }

    // 2. Neglected Life Area Insight
    const neglected = lifeAreas.find((la) => la.avgCompletion < 60 || la.isNeglected);
    if (neglected) {
      insights.push({
        id: 'ins-2',
        type: 'warning',
        title: `${neglected.name} needs attention`,
        description: `${neglected.name} completion rate is currently ${neglected.avgCompletion}%. Consider scheduling dedicated focus time.`,
        actionLabel: 'Schedule Focus',
      });
    }

    // 3. Streak & Consistency Insight
    if (streaks.currentDailyStreak > 0) {
      insights.push({
        id: 'ins-3',
        type: 'info',
        title: `${streaks.currentDailyStreak} Day Active Streak`,
        description: `You have completed daily productivity targets for ${streaks.currentDailyStreak} consecutive days.`,
        actionLabel: 'View History',
      });
    }

    // 4. Focus Session Length Improvement
    if (overview.avgSessionMinutes > 0) {
      insights.push({
        id: 'ins-4',
        type: 'success',
        title: `Average Focus Session: ${overview.avgSessionMinutes} mins`,
        description: `Your average focus duration shows strong deep work stamina with a peak session of ${overview.longestSessionMinutes} minutes.`,
        actionLabel: 'Start Focus',
      });
    }

    return insights;
  },
};
