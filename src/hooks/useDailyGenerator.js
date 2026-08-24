import { useState, useCallback, useEffect, useRef } from 'react';
import { generatorService } from '../services/generatorService';
import { storageService } from '../services/storageService';

export const useDailyGenerator = () => {
  const [tasks, setTasks] = useState(() => generatorService.getResolvedTodayTasks());
  const [note, setNote] = useState(() => storageService.getItem('personal_os_note') || '');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const debounceTimerRef = useRef(null);

  const refreshTodayTasks = useCallback(() => {
    setTasks(generatorService.getResolvedTodayTasks());
  }, []);

  useEffect(() => {
    refreshTodayTasks();
  }, [refreshTodayTasks]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const updateTaskStatus = useCallback((taskId, status) => {
    const updated = generatorService.updateTaskStatus(taskId, status);
    setTasks(updated);
  }, []);

  const updateNote = useCallback((newNote) => {
    setIsSavingNote(true);
    setNote(newNote);
    storageService.setItem('personal_os_note', newNote);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setIsSavingNote(false);
    }, 400);
  }, []);

  return {
    tasks,
    note,
    isSavingNote,
    updateTaskStatus,
    updateNote,
    refreshTodayTasks,
  };
};

