import { useState, useCallback, useMemo } from 'react';
import { historyService } from '../services/historyService';

export const useHistory = () => {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('All'); // All, Today, Yesterday, This Week, This Month
  const [eventType, setEventType] = useState('All');
  const [lifeAreaId, setLifeAreaId] = useState(null);

  const queryParams = useMemo(() => {
    return {
      search,
      dateRange,
      eventType,
      lifeAreaId,
    };
  }, [search, dateRange, eventType, lifeAreaId]);

  const groupedTimeline = useMemo(() => {
    return historyService.getGroupedTimeline(queryParams);
  }, [queryParams]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setDateRange('All');
    setEventType('All');
    setLifeAreaId(null);
  }, []);

  return {
    groupedTimeline,
    search,
    setSearch,
    dateRange,
    setDateRange,
    eventType,
    setEventType,
    lifeAreaId,
    setLifeAreaId,
    resetFilters,
  };
};
