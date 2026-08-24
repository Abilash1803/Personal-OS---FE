import { useMemo } from 'react';
import { reviewService } from '../services/reviewService';
import { getTodayISODate } from '../utils/dateUtils';

export const useDailyReview = (dateStr = getTodayISODate()) => {
  const review = useMemo(() => {
    return reviewService.getDailyReview(dateStr);
  }, [dateStr]);

  return review;
};
