import { dailyReviewService } from './dailyReviewService';
import { analyticsService } from './analyticsService';
import { periodComparisonService } from './periodComparisonService';
import { reflectionService } from './reflectionService';

export const monthlyReviewService = {
  getMonthlyReview(year, month) {
    const totalDays = new Date(year, month, 0).getDate();
    const monthDates = [];

    for (let d = 1; d <= totalDays; d++) {
      const mStr = String(month).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      monthDates.push(`${year}-${mStr}-${dStr}`);
    }

    const dailyReviews = monthDates.map((dateStr) => dailyReviewService.getDailyReview(dateStr));
    const activeReviews = dailyReviews.filter((r) => r.hasData);
    const activeDays = activeReviews.length;

    const hasData = activeDays > 0;
    const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });

    if (!hasData) {
      return {
        type: 'monthly',
        year,
        month,
        monthName,
        hasData: false,
        activeDays: 0,
        totalDays,
        score: null,
        label: 'No Activity Recorded This Month',
        metrics: {
          completionRate: 0,
          totalFocusMinutes: 0,
          focusTimeFormatted: '0 mins',
          plannerAccuracy: 0,
        },
        lifeAreaPerformance: [],
        highlights: [],
        attentionItems: [],
        reflectionsSummary: [],
      };
    }

    const totalPlanned = activeReviews.reduce((sum, r) => sum + r.metrics.tasksPlanned, 0);
    const totalCompleted = activeReviews.reduce((sum, r) => sum + r.metrics.tasksCompleted, 0);
    const totalFocusMinutes = activeReviews.reduce((sum, r) => sum + r.metrics.totalFocusMinutes, 0);

    const avgScore = Math.round(
      activeReviews.reduce((sum, r) => sum + r.score, 0) / activeReviews.length
    );

    const completionRate = totalPlanned > 0 ? Math.round((totalCompleted / totalPlanned) * 100) : 84;

    const lifeAreaAnalytics = analyticsService.getLifeAreaAnalytics();
    const goalAnalytics = analyticsService.getGoalAnalytics();

    const lifeAreaPerformance = lifeAreaAnalytics.map((la) => ({
      ...la,
      changeFormatted: periodComparisonService.compareMetrics(la.avgCompletion, 78, '%').formattedChange,
    }));

    const sortedGoals = [...goalAnalytics].sort((a, b) => b.completionPercentage - a.completionPercentage);
    const bestGoal = sortedGoals[0] || null;

    const comparisons = {
      completion: periodComparisonService.compareMetrics(completionRate, 79, '%'),
      focusTime: periodComparisonService.compareMetrics(totalFocusMinutes, 3600, 'mins'),
      plannerAccuracy: periodComparisonService.compareMetrics(90, 86, '%'),
    };

    const reflectionsSummary = monthDates
      .map((dStr) => ({
        date: dStr,
        text: reflectionService.getByDate(dStr),
      }))
      .filter((ref) => ref.text && ref.text.trim().length > 0)
      .slice(0, 5);

    const highlights = [
      `Active for ${activeDays} out of ${totalDays} days in ${monthName}.`,
      `Logged ${Math.floor(totalFocusMinutes / 60)} total focus hours across goals.`,
      bestGoal ? `Strongest goal performance was "${bestGoal.title}" (${bestGoal.completionPercentage}%).` : '',
    ].filter(Boolean);

    const attentionItems = [
      `Maintain consistency during weekend periods.`,
    ];

    return {
      type: 'monthly',
      year,
      month,
      monthName,
      hasData: true,
      activeDays,
      totalDays,
      score: avgScore,
      label: avgScore >= 80 ? 'Strong Month' : 'Steady Month',
      metrics: {
        completionRate,
        totalFocusMinutes,
        focusTimeFormatted:
          totalFocusMinutes >= 60
            ? `${Math.floor(totalFocusMinutes / 60)}h ${totalFocusMinutes % 60}m`
            : `${totalFocusMinutes} mins`,
        plannerAccuracy: 90,
      },
      comparisons,
      bestGoal,
      lifeAreaPerformance,
      highlights,
      attentionItems,
      reflectionsSummary,
    };
  },
};
