import { useMemo } from 'react';
import { reviewService } from '../services/reviewService';
import { getTodayISODate } from '../utils/dateUtils';

export const useWeeklyReview = (weekStartDateStr = getTodayISODate()) => {
  const review = useMemo(() => {
    return reviewService.getWeeklyReview(weekStartDateStr);
  }, [weekStartDateStr]);

  return review;
};
