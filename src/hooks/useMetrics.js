import { useMemo } from 'react';
import { metricsService } from '../services/metricsService';

export const useMetrics = (range = 'This Week') => {
  const metrics = useMemo(() => {
    return metricsService.getOverviewMetrics(range);
  }, [range]);

  return metrics;
};
