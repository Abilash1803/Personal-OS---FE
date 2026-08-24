import { useState, useEffect, useCallback, useMemo } from 'react';
import { storageService } from '../services/storageService';
import { generatorService } from '../services/generatorService';
import { computeTaskMetrics } from '../utils/taskUtils';

export const usePersonalOSStorage = () => {
  const [tasks, setTasks] = useState(() => generatorService.getResolvedTodayTasks());
  const [note, setNote] = useState(() => storageService.getItem('personal_os_daily_note') || '');
  const [isSavingNote] = useState(false);
  const [lastSavedTime] = useState(null);

  // Re-verify on focus
  useEffect(() => {
    const handleFocus = () => {
      setTasks(generatorService.getResolvedTodayTasks());
      setNote(storageService.getItem('personal_os_daily_note') || '');
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Reset today's tasks & note
  const resetTodayData = useCallback(() => {
    storageService.setCollection('DAILY_TASKS', []);
    storageService.removeItem('personal_os_daily_note');
    setTasks([]);
    setNote('');
  }, []);

  // Clear all local storage data
  const clearAllData = useCallback(() => {
    storageService.clearAllData();
    window.location.reload();
  }, []);

  // Compute live progress metrics
  const metrics = useMemo(() => computeTaskMetrics(tasks), [tasks]);

  return {
    tasks,
    note,
    metrics,
    isSavingNote,
    lastSavedTime,
    resetTodayData,
    clearAllData,
  };
};
