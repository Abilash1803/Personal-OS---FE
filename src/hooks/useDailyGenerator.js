import { useState, useCallback, useEffect, useRef } from 'react';
import { generatorService } from '../services/generatorService';
import { reflectionService } from '../services/reflectionService';
import { apiService } from '../services/apiService';
import { getTodayISODate } from '../utils/dateUtils';

export const useDailyGenerator = (selectedDate = getTodayISODate()) => {
  const [tasks, setTasks] = useState(() => generatorService.getResolvedTasksForDate(selectedDate));
  const [note, setNote] = useState(() => reflectionService.getByDate(selectedDate) || '');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const debounceTimerRef = useRef(null);

  // Sync tasks and journal note whenever selected date changes
  useEffect(() => {
    setTasks(generatorService.getResolvedTasksForDate(selectedDate));
    setNote(reflectionService.getByDate(selectedDate) || '');
  }, [selectedDate]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const refreshTasks = useCallback(() => {
    setTasks(generatorService.getResolvedTasksForDate(selectedDate));
  }, [selectedDate]);

  const updateTaskStatus = useCallback((taskId, status) => {
    const updated = generatorService.updateTaskStatus(taskId, status, selectedDate);
    setTasks(updated);
  }, [selectedDate]);

  const updateNote = useCallback((newNote) => {
    setIsSavingNote(true);
    setNote(newNote);
    
    // Save to daily reflections storage
    reflectionService.saveReflection(selectedDate, newNote);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      // Cloud sync to Supabase
      apiService.saveReflection(selectedDate, newNote).catch(() => {});
      setIsSavingNote(false);
    }, 400);
  }, [selectedDate]);

  return {
    tasks,
    note,
    isSavingNote,
    updateTaskStatus,
    updateNote,
    refreshTasks,
  };
};
