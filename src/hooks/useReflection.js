import { useState, useCallback, useEffect } from 'react';
import { reflectionService } from '../services/reflectionService';
import { getTodayISODate } from '../utils/dateUtils';

export const useReflection = (dateStr = getTodayISODate()) => {
  const [content, setContent] = useState(() => reflectionService.getByDate(dateStr));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(reflectionService.getByDate(dateStr));
  }, [dateStr]);

  const updateContent = useCallback((newContent) => {
    setIsSaving(true);
    setContent(newContent);
    reflectionService.saveReflection(dateStr, newContent);

    const timer = setTimeout(() => setIsSaving(false), 400);
    return () => clearTimeout(timer);
  }, [dateStr]);

  return {
    content,
    isSaving,
    updateContent,
  };
};
