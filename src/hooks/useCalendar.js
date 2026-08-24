import { useState, useCallback, useMemo } from 'react';
import { calendarService } from '../services/calendarService';
import { getTodayISODate } from '../utils/dateUtils';

export const useCalendar = () => {
  const todayStr = getTodayISODate();
  const todayDateObj = new Date();

  const [currentYear, setCurrentYear] = useState(todayDateObj.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(todayDateObj.getMonth());
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const monthMatrix = useMemo(() => {
    return calendarService.getMonthMatrix(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const monthTitle = useMemo(() => {
    return calendarService.getMonthTitle(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const selectToday = useCallback(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setSelectedDate(todayStr);
  }, [todayStr]);

  return {
    currentYear,
    currentMonth,
    selectedDate,
    setSelectedDate,
    monthMatrix,
    monthTitle,
    nextMonth,
    prevMonth,
    selectToday,
  };
};
