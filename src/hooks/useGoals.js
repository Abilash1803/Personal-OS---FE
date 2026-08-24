import { useState, useCallback, useEffect } from 'react';
import { goalService } from '../services/goalService';

export const useGoals = (lifeAreaId) => {
  const [goals, setGoals] = useState(() => goalService.getAll());
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const refreshGoals = useCallback(() => {
    const items = goalService.getAll();
    setGoals(items);
  }, []);

  useEffect(() => {
    goalService.syncFromCloud().then((cloudItems) => {
      if (cloudItems) setGoals(cloudItems);
    });
  }, []);

  // Filter goals by life area if specified
  const filteredGoals = lifeAreaId
    ? goals.filter((g) => g.lifeAreaId === lifeAreaId)
    : goals;

  // Sync selected goal ID when filtered goals change
  useEffect(() => {
    if (filteredGoals.length > 0) {
      if (!selectedGoalId || !filteredGoals.some((g) => g.id === selectedGoalId)) {
        setSelectedGoalId(filteredGoals[0].id);
      }
    } else {
      setSelectedGoalId(null);
    }
  }, [lifeAreaId, filteredGoals, selectedGoalId]);

  const createGoal = useCallback((data) => {
    const created = goalService.create(data);
    refreshGoals();
    setSelectedGoalId(created.id);
    return created;
  }, [refreshGoals]);

  const updateGoal = useCallback((id, updates) => {
    const updated = goalService.update(id, updates);
    refreshGoals();
    return updated;
  }, [refreshGoals]);

  const deleteGoal = useCallback((id) => {
    goalService.delete(id);
    refreshGoals();
  }, [refreshGoals]);

  const toggleArchiveGoal = useCallback((id) => {
    goalService.toggleArchive(id);
    refreshGoals();
  }, [refreshGoals]);

  return {
    allGoals: goals,
    goals: filteredGoals,
    selectedGoalId,
    setSelectedGoalId,
    selectedGoal: goals.find((g) => g.id === selectedGoalId) || null,
    createGoal,
    updateGoal,
    deleteGoal,
    toggleArchiveGoal,
    refreshGoals,
  };
};
