import { useMemo } from 'react';
import { analyticsService } from '../services/analyticsService';
import { trendService } from '../services/trendService';

export const useAnalytics = (trendPeriod = 'Daily') => {
  const heatmapData = useMemo(() => analyticsService.getHeatmapData(), []);
  const goalAnalytics = useMemo(() => analyticsService.getGoalAnalytics(), []);
  const lifeAreaAnalytics = useMemo(() => analyticsService.getLifeAreaAnalytics(), []);
  const timeDistribution = useMemo(() => analyticsService.getTimeDistribution(), []);
  const completionTrends = useMemo(() => trendService.getCompletionTrends(trendPeriod), [trendPeriod]);

  return {
    heatmapData,
    goalAnalytics,
    lifeAreaAnalytics,
    timeDistribution,
    completionTrends,
  };
};
