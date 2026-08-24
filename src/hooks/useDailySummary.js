import { useMemo } from 'react';
import { summaryService } from '../services/summaryService';
import { getTodayISODate } from '../utils/dateUtils';

export const useDailySummary = (dateStr = getTodayISODate()) => {
  const summary = useMemo(() => {
    return summaryService.getDailySummary(dateStr);
  }, [dateStr]);

  return summary;
};
