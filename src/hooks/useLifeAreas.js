import { useState, useCallback, useEffect } from 'react';
import { lifeAreaService } from '../services/lifeAreaService';

export const useLifeAreas = () => {
  const [lifeAreas, setLifeAreas] = useState(() => lifeAreaService.getAll());
  const [selectedLifeAreaId, setSelectedLifeAreaId] = useState(() => {
    const all = lifeAreaService.getAll();
    return all.length > 0 ? all[0].id : null;
  });

  const refreshLifeAreas = useCallback(() => {
    const items = lifeAreaService.getAll();
    setLifeAreas(items);
    if (items.length > 0 && (!selectedLifeAreaId || !items.some(i => i.id === selectedLifeAreaId))) {
      setSelectedLifeAreaId(items[0].id);
    }
  }, [selectedLifeAreaId]);

  useEffect(() => {
    lifeAreaService.syncFromCloud().then((cloudItems) => {
      if (cloudItems) {
        setLifeAreas(cloudItems);
        setSelectedLifeAreaId((currentId) => {
          if (cloudItems.length > 0 && (!currentId || !cloudItems.some(i => i.id === currentId))) {
            return cloudItems[0].id;
          }
          return currentId;
        });
      }
    });
  }, []);

  const createLifeArea = useCallback((data) => {
    const created = lifeAreaService.create(data);
    refreshLifeAreas();
    setSelectedLifeAreaId(created.id);
    return created;
  }, [refreshLifeAreas]);

  const updateLifeArea = useCallback((id, updates) => {
    const updated = lifeAreaService.update(id, updates);
    refreshLifeAreas();
    return updated;
  }, [refreshLifeAreas]);

  const deleteLifeArea = useCallback((id) => {
    lifeAreaService.delete(id);
    refreshLifeAreas();
  }, [refreshLifeAreas]);

  return {
    lifeAreas,
    selectedLifeAreaId,
    setSelectedLifeAreaId,
    selectedLifeArea: lifeAreas.find((la) => la.id === selectedLifeAreaId) || null,
    createLifeArea,
    updateLifeArea,
    deleteLifeArea,
    refreshLifeAreas,
  };
};
