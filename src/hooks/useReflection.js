import { useState, useCallback, useEffect, useRef } from 'react';
import { reflectionService } from '../services/reflectionService';
import { apiService } from '../services/apiService';
import { getTodayISODate } from '../utils/dateUtils';

export const useReflection = (dateStr = getTodayISODate()) => {
  const [content, setContent] = useState(() => reflectionService.getByDate(dateStr));
  const [isSaving, setIsSaving] = useState(false);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setContent(reflectionService.getByDate(dateStr));
  }, [dateStr]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const updateContent = useCallback((newContent) => {
    setIsSaving(true);
    setContent(newContent);
    reflectionService.saveReflection(dateStr, newContent);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      apiService.saveReflection(dateStr, newContent).catch(() => {});
      setIsSaving(false);
    }, 400);
  }, [dateStr]);

  return {
    content,
    isSaving,
    updateContent,
  };
};
