import { useState, useCallback, useEffect, useMemo } from 'react';
import { agendaService } from '../services/agendaService';
import { plannerService } from '../services/plannerService';
import { generatorService } from '../services/generatorService';
import { getTodayISODate } from '../utils/dateUtils';

export const useAgenda = (dateStr = getTodayISODate(), activeFilter = 'All') => {
  const [agendaItems, setAgendaItems] = useState(() => agendaService.getCombinedAgenda(dateStr));

  const refreshAgenda = useCallback(() => {
    setAgendaItems(agendaService.getCombinedAgenda(dateStr));
  }, [dateStr]);

  useEffect(() => {
    refreshAgenda();
  }, [refreshAgenda]);

  // Filter agenda items based on type or completion status
  const filteredAgenda = useMemo(() => {
    if (activeFilter === 'All') return agendaItems;
    if (activeFilter === 'Completed') return agendaItems.filter((i) => i.completed);
    if (activeFilter === 'Pending') return agendaItems.filter((i) => !i.completed);

    // Filter by type name e.g. Tasks, Meetings, Reminders, Payments, Birthdays
    const normalizedFilter = activeFilter.toLowerCase().replace(/s$/, ''); // 'Meetings' -> 'meeting'
    return agendaItems.filter((i) => i.type.toLowerCase() === normalizedFilter);
  }, [agendaItems, activeFilter]);

  const toggleItemCompletion = useCallback((item) => {
    if (item.originalType === 'EVENT') {
      plannerService.toggleCompleted(item.id);
    } else if (item.originalType === 'TASK') {
      const newStatus = item.completed ? 'Partially Done' : 'Completed';
      generatorService.updateTaskStatus(item.id, newStatus);
    }
    refreshAgenda();
  }, [refreshAgenda]);

  return {
    agendaItems: filteredAgenda,
    totalCount: agendaItems.length,
    completedCount: agendaItems.filter((i) => i.completed).length,
    toggleItemCompletion,
    refreshAgenda,
  };
};
