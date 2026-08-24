import { useMemo } from 'react';
import { reviewService } from '../services/reviewService';

export const useMonthlyReview = (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
  const review = useMemo(() => {
    return reviewService.getMonthlyReview(year, month);
  }, [year, month]);

  return review;
};
