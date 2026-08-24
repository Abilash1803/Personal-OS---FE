import { useState, useCallback, useMemo } from 'react';


export const useReviewNavigation = () => {
  const [reviewType, setReviewType] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const formattedDateStr = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(currentDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [currentDate]);

  const periodLabel = useMemo(() => {
    if (reviewType === 'daily') {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (reviewType === 'weekly') {
      const monday = new Date(currentDate);
      const day = monday.getDay();
      const diff = day === 0 ? -6 : 1 - day;
      monday.setDate(monday.getDate() + diff);

      const sunday = new Date(monday);
      sunday.setDate(sunday.getDate() + 6);

      return `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [reviewType, currentDate]);

  const navigatePrevious = useCallback(() => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      if (reviewType === 'daily') {
        next.setDate(next.getDate() - 1);
      } else if (reviewType === 'weekly') {
        next.setDate(next.getDate() - 7);
      } else {
        next.setMonth(next.getMonth() - 1);
      }
      return next;
    });
  }, [reviewType]);

  const navigateNext = useCallback(() => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      if (reviewType === 'daily') {
        next.setDate(next.getDate() + 1);
      } else if (reviewType === 'weekly') {
        next.setDate(next.getDate() + 7);
      } else {
        next.setMonth(next.getMonth() + 1);
      }
      return next;
    });
  }, [reviewType]);

  const resetToCurrent = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  return {
    reviewType,
    setReviewType,
    currentDate,
    dateStr: formattedDateStr,
    periodLabel,
    navigatePrevious,
    navigateNext,
    resetToCurrent,
  };
};
