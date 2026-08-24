import { useState, useCallback, useEffect } from 'react';
import { timelineService } from '../services/timelineService';

export const useTimeline = () => {
  const [recentEvents, setRecentEvents] = useState(() => timelineService.getRecent(5));

  const refreshRecentEvents = useCallback(() => {
    setRecentEvents(timelineService.getRecent(5));
  }, []);

  useEffect(() => {
    refreshRecentEvents();
  }, [refreshRecentEvents]);

  const recordEvent = useCallback((eventData) => {
    const recorded = timelineService.recordEvent(eventData);
    refreshRecentEvents();
    return recorded;
  }, [refreshRecentEvents]);

  return {
    recentEvents,
    recordEvent,
    refreshRecentEvents,
  };
};
