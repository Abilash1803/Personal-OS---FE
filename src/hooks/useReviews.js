import { useMemo } from 'react';
import { useReviewNavigation } from './useReviewNavigation';
import { reviewService } from '../services/reviewService';

export const useReviews = () => {
  const nav = useReviewNavigation();

  const activeReview = useMemo(() => {
    if (nav.reviewType === 'daily') {
      return reviewService.getDailyReview(nav.dateStr);
    }
    if (nav.reviewType === 'weekly') {
      return reviewService.getWeeklyReview(nav.dateStr);
    }
    const year = nav.currentDate.getFullYear();
    const month = nav.currentDate.getMonth() + 1;
    return reviewService.getMonthlyReview(year, month);
  }, [nav.reviewType, nav.dateStr, nav.currentDate]);

  return {
    ...nav,
    review: activeReview,
  };
};
