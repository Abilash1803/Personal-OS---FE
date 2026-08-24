import { storageService } from './storageService.js';
import { apiService } from './apiService.js';
import { generateUUID } from '../utils/idUtils.js';

export const templateService = {
  getAll() {
    const items = storageService.getCollection('TEMPLATES');
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  getByGoal(goalId) {
    const templates = this.getAll();
    return templates.filter((t) => t.goalId === goalId);
  },

  async syncFromCloud() {
    try {
      const remoteTemplates = await apiService.getTemplates();
      if (Array.isArray(remoteTemplates) && remoteTemplates.length > 0) {
        const formatted = remoteTemplates.map((t) => ({
          id: t.id,
          goalId: t.goal_id,
          title: t.title,
          estimatedMinutes: t.estimated_minutes || 30,
          priority: t.priority || 'Medium',
          recurrence: t.recurrence || 'Daily',
          order: t.sort_order || 1,
          active: t.is_active ?? true,
          createdAt: t.created_at,
        }));
        storageService.setCollection('TEMPLATES', formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('Realtime templates sync fallback to LocalStorage:', err.message);
    }
    return this.getAll();
  },

  create(data) {
    const templates = this.getAll();
    const goalTemplates = templates.filter((t) => t.goalId === data.goalId);
    const newTemplate = {
      id: generateUUID(),
      goalId: data.goalId,
      title: data.title.trim(),
      estimatedMinutes: Number(data.estimatedMinutes) || 30,
      priority: data.priority || 'Medium',
      recurrence: data.recurrence || 'Daily',
      order: goalTemplates.length + 1,
      active: true,
      createdAt: new Date().toISOString(),
    };
    const updated = [...templates, newTemplate];
    storageService.setCollection('TEMPLATES', updated);

    // Live Supabase Cloud Push with stable UUID
    apiService.createTemplate({
      id: newTemplate.id,
      goal_id: newTemplate.goalId,
      title: newTemplate.title,
      estimated_minutes: newTemplate.estimatedMinutes,
      priority: newTemplate.priority,
      recurrence: newTemplate.recurrence,
      sort_order: newTemplate.order,
      is_active: true,
    }).catch((err) => console.warn('Supabase Realtime template create warning:', err));

    return newTemplate;
  },

  update(id, updates) {
    const templates = this.getAll();
    const updated = templates.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    storageService.setCollection('TEMPLATES', updated);

    // Live Supabase Cloud Push
    apiService.updateTemplate(id, updates)
      .catch((err) => console.warn('Supabase Realtime template update warning:', err));

    return updated.find((t) => t.id === id);
  },

  delete(id) {
    const templates = this.getAll();
    const updated = templates.filter((t) => t.id !== id);
    storageService.setCollection('TEMPLATES', updated);

    // Live Supabase Cloud Push
    apiService.deleteTemplate(id)
      .catch((err) => console.warn('Supabase Realtime template delete warning:', err));

    return true;
  },

  toggleActive(id) {
    const templates = this.getAll();
    const target = templates.find((t) => t.id === id);
    if (!target) return null;
    return this.update(id, { active: !target.active });
  },
};

