import { useMemo } from 'react';
import { streakService } from '../services/streakService';

export const useStreaks = () => {
  const streaks = useMemo(() => {
    return streakService.getStreaks();
  }, []);

  return streaks;
};
