import { useState, useEffect } from 'react';
import { timerService } from '../services/timerService';

export const useTimer = (session, estimatedMinutes = 30) => {
  const [metrics, setMetrics] = useState(() =>
    timerService.calculateSessionMetrics(session, estimatedMinutes)
  );

  useEffect(() => {
    // Initial calculation
    setMetrics(timerService.calculateSessionMetrics(session, estimatedMinutes));

    if (!session || session.status !== 'Running') {
      return;
    }

    // Tick every 1 second when session is Running
    const interval = setInterval(() => {
      setMetrics(timerService.calculateSessionMetrics(session, estimatedMinutes));
    }, 1000);

    return () => clearInterval(interval);
  }, [session, estimatedMinutes]);

  const formattedTime = timerService.formatTime(metrics.remainingSeconds);
  const formattedElapsed = timerService.formatTime(metrics.elapsedSeconds);

  return {
    ...metrics,
    formattedTime,
    formattedElapsed,
  };
};
