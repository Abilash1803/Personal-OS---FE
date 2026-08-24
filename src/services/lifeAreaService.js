import { storageService } from './storageService.js';
import { apiService } from './apiService.js';
import { generateUUID } from '../utils/idUtils.js';

export const lifeAreaService = {
  getAll() {
    const items = storageService.getCollection('LIFE_AREAS');
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  getById(id) {
    const items = this.getAll();
    return items.find((item) => item.id === id) || null;
  },

  async syncFromCloud() {
    try {
      const remoteAreas = await apiService.getLifeAreas();
      if (Array.isArray(remoteAreas) && remoteAreas.length > 0) {
        const formatted = remoteAreas.map((la) => ({
          id: la.id,
          name: la.name,
          icon: la.icon || '📌',
          color: la.color || '#2563EB',
          order: la.sort_order || 1,
          createdAt: la.created_at,
        }));
        storageService.setCollection('LIFE_AREAS', formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('Realtime life areas sync fallback to LocalStorage:', err.message);
    }
    return this.getAll();
  },

  create(data) {
    const items = this.getAll();
    const newItem = {
      id: generateUUID(),
      name: data.name.trim(),
      icon: data.icon || '📌',
      color: data.color || '#2563EB',
      order: items.length + 1,
      createdAt: new Date().toISOString(),
    };
    const updated = [...items, newItem];
    storageService.setCollection('LIFE_AREAS', updated);

    // Live Supabase Cloud Push with stable UUID
    apiService.createLifeArea({
      id: newItem.id,
      name: newItem.name,
      icon: newItem.icon,
      color: newItem.color,
      sort_order: newItem.order,
    }).catch((err) => console.warn('Supabase Realtime life area create warning:', err));

    return newItem;
  },

  update(id, updates) {
    const items = this.getAll();
    const updated = items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    storageService.setCollection('LIFE_AREAS', updated);

    // Live Supabase Cloud Push
    apiService.updateLifeArea(id, updates)
      .catch((err) => console.warn('Supabase Realtime life area update warning:', err));

    return updated.find((item) => item.id === id);
  },

  delete(id) {
    const items = this.getAll();
    const updated = items.filter((item) => item.id !== id);
    storageService.setCollection('LIFE_AREAS', updated);

    // Live Supabase Cloud Push
    apiService.deleteLifeArea(id)
      .catch((err) => console.warn('Supabase Realtime life area delete warning:', err));

    return true;
  },
};

