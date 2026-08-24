import { useState, useCallback, useEffect } from 'react';
import { plannerNotesService } from '../services/plannerNotesService';
import { getTodayISODate } from '../utils/dateUtils';

export const usePlannerNotes = (dateStr = getTodayISODate()) => {
  const [content, setContent] = useState(() => plannerNotesService.getByDate(dateStr));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(plannerNotesService.getByDate(dateStr));
  }, [dateStr]);

  const updateContent = useCallback((newContent) => {
    setIsSaving(true);
    setContent(newContent);
    plannerNotesService.saveNote(dateStr, newContent);

    const timer = setTimeout(() => {
      setIsSaving(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [dateStr]);

  return {
    content,
    isSaving,
    updateContent,
  };
};
