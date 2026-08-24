import { useState, useCallback, useEffect } from 'react';
import { plannerService } from '../services/plannerService';

export const usePlanner = () => {
  const [events, setEvents] = useState(() => plannerService.getAll());
  const [activeFilter, setActiveFilter] = useState('All'); // All, Task, Meeting, Reminder, Payment, Birthday, Personal, Completed, Pending

  const refreshEvents = useCallback(() => {
    setEvents(plannerService.getAll());
  }, []);

  useEffect(() => {
    plannerService.syncFromCloud().then((cloudEvents) => {
      if (cloudEvents) setEvents(cloudEvents);
    });
  }, []);

  const createEvent = useCallback((data) => {
    const created = plannerService.create(data);
    refreshEvents();
    return created;
  }, [refreshEvents]);

  const updateEvent = useCallback((id, updates) => {
    const updated = plannerService.update(id, updates);
    refreshEvents();
    return updated;
  }, [refreshEvents]);

  const deleteEvent = useCallback((id) => {
    plannerService.delete(id);
    refreshEvents();
  }, [refreshEvents]);

  const toggleCompleted = useCallback((id) => {
    plannerService.toggleCompleted(id);
    refreshEvents();
  }, [refreshEvents]);

  const getAgendaForDate = useCallback(
    (dateStr) => {
      const dayEvents = events
        .filter((e) => e.date === dateStr)
        .sort((a, b) => (a.time || '').localeCompare(b.time || ''));

      if (!activeFilter || activeFilter === 'All') return dayEvents;
      if (activeFilter === 'Completed') return dayEvents.filter((e) => e.completed);
      if (activeFilter === 'Pending') return dayEvents.filter((e) => !e.completed);

      return dayEvents.filter(
        (e) =>
          (e.type || '').toLowerCase() === activeFilter.toLowerCase() ||
          (e.type || '').toLowerCase() === activeFilter.toLowerCase().slice(0, -1)
      );
    },
    [events, activeFilter]
  );

  const getUpcomingEvents = useCallback((startDateStr, daysCount = 7) => {
    return plannerService.getUpcoming(startDateStr, daysCount);
  }, []);

  return {
    events,
    activeFilter,
    setActiveFilter,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleCompleted,
    toggleEventCompleted: toggleCompleted,
    getAgendaForDate,
    getUpcomingEvents,
    refreshEvents,
  };
};
