import { useState, useEffect, useCallback } from 'react';
import { sessionService } from '../services/sessionService';

export const useActiveSession = () => {
  const [activeSession, setActiveSession] = useState(() => sessionService.getActiveSession());

  const refreshActiveSession = useCallback(() => {
    setActiveSession(sessionService.getActiveSession());
  }, []);

  useEffect(() => {
    const handleFocus = () => refreshActiveSession();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refreshActiveSession]);

  return {
    activeSession,
    hasActiveSession: !!activeSession,
    isRunning: activeSession?.status === 'Running',
    isPaused: activeSession?.status === 'Paused',
    activeTaskId: activeSession?.dailyTaskId || null,
    refreshActiveSession,
  };
};
