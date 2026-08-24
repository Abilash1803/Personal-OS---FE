import { dailyReviewService } from './dailyReviewService';
import { weeklyReviewService } from './weeklyReviewService';
import { monthlyReviewService } from './monthlyReviewService';
import { storageService } from './storageService';
import { getTodayISODate } from '../utils/dateUtils';

export const reviewService = {
  getDailyReview(dateStr = getTodayISODate()) {
    return dailyReviewService.getDailyReview(dateStr);
  },

  getWeeklyReview(weekStartDateStr = getTodayISODate()) {
    return weeklyReviewService.getWeeklyReview(weekStartDateStr);
  },

  getMonthlyReview(year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
    return monthlyReviewService.getMonthlyReview(year, month);
  },

  getReviewSettings() {
    const settings = storageService.getCollection('REVIEW_SETTINGS');
    return settings && settings.defaultReviewType
      ? settings
      : { defaultReviewType: 'daily', weekStartsOn: 'Monday' };
  },

  saveReviewSettings(newSettings) {
    storageService.setItem('personal_os_review_settings', JSON.stringify(newSettings));
    return newSettings;
  },
};
