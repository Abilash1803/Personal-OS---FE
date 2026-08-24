import { storageService } from './storageService.js';
import { apiService } from './apiService.js';
import { generateUUID } from '../utils/idUtils.js';

export const goalService = {
  getAll() {
    return storageService.getCollection('GOALS');
  },

  getByLifeArea(lifeAreaId) {
    const goals = this.getAll();
    return goals.filter((g) => g.lifeAreaId === lifeAreaId);
  },

  async syncFromCloud() {
    try {
      const remoteGoals = await apiService.getGoals();
      if (Array.isArray(remoteGoals) && remoteGoals.length > 0) {
        const formatted = remoteGoals.map((g) => ({
          id: g.id,
          lifeAreaId: g.life_area_id,
          title: g.title,
          description: g.description || '',
          targetDate: g.target_date || '',
          isActive: g.is_active ?? true,
          createdAt: g.created_at,
        }));
        storageService.setCollection('GOALS', formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('Realtime goals sync fallback to LocalStorage:', err.message);
    }
    return this.getAll();
  },

  create(data) {
    const goals = this.getAll();
    const newGoal = {
      id: generateUUID(),
      lifeAreaId: data.lifeAreaId,
      title: data.title.trim(),
      description: data.description ? data.description.trim() : '',
      targetDate: data.targetDate || '',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    const updated = [...goals, newGoal];
    storageService.setCollection('GOALS', updated);

    // Live Supabase Cloud Push with stable UUID
    apiService.createGoal({
      id: newGoal.id,
      life_area_id: newGoal.lifeAreaId,
      title: newGoal.title,
      description: newGoal.description,
      target_date: newGoal.targetDate,
      is_active: true,
    }).catch((err) => console.warn('Supabase Realtime goal create warning:', err));

    return newGoal;
  },

  update(id, updates) {
    const goals = this.getAll();
    const updated = goals.map((g) => (g.id === id ? { ...g, ...updates } : g));
    storageService.setCollection('GOALS', updated);

    // Live Supabase Cloud Push
    apiService.updateGoal(id, updates)
      .catch((err) => console.warn('Supabase Realtime goal update warning:', err));

    return updated.find((g) => g.id === id);
  },

  delete(id) {
    const goals = this.getAll();
    const updated = goals.filter((g) => g.id !== id);
    storageService.setCollection('GOALS', updated);

    // Live Supabase Cloud Push
    apiService.deleteGoal(id)
      .catch((err) => console.warn('Supabase Realtime goal delete warning:', err));

    return true;
  },

  toggleArchive(id) {
    const goals = this.getAll();
    const target = goals.find((g) => g.id === id);
    if (!target) return null;
    return this.update(id, { isActive: !target.isActive });
  },
};

