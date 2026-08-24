import { useMemo } from 'react';
import { insightService } from '../services/insightService';

export const useInsights = () => {
  const insights = useMemo(() => {
    return insightService.getInsights();
  }, []);

  return { insights };
};
