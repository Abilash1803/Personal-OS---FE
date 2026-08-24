import { storageService } from './storageService';
import { apiService } from './apiService';
import { generateUUID } from '../utils/idUtils';

export const EVENT_TYPES = {
  TASK: { label: 'Task', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: 'CheckSquare' },
  MEETING: { label: 'Meeting', color: 'bg-[#2563EB]/10 text-[#2563EB] border-blue-200', icon: 'Users' },
  REMINDER: { label: 'Reminder', color: 'bg-amber-50 text-amber-600 border-amber-200', icon: 'Bell' },
  PAYMENT: { label: 'Payment', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: 'CreditCard' },
  BIRTHDAY: { label: 'Birthday', color: 'bg-pink-50 text-pink-600 border-pink-200', icon: 'Cake' },
  PERSONAL: { label: 'Personal', color: 'bg-purple-50 text-purple-600 border-purple-200', icon: 'User' },
  CUSTOM: { label: 'Custom', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: 'Bookmark' },
};

export const plannerService = {
  getAll() {
    return storageService.getCollection('PLANNER_EVENTS');
  },

  getByDate(dateStr) {
    const events = this.getAll();
    return events.filter((e) => e.date === dateStr);
  },

  getUpcoming(startDateStr, daysCount = 7) {
    const events = this.getAll();
    const start = new Date(startDateStr);
    const end = new Date(start);
    end.setDate(end.getDate() + daysCount);

    return events.filter((e) => {
      const evtDate = new Date(e.date);
      return evtDate >= start && evtDate <= end;
    }).sort((a, b) => new Date(a.date) - new Date(b.date) || (a.time || '').localeCompare(b.time || ''));
  },

  async syncFromCloud() {
    try {
      const remoteEvents = await apiService.getPlannerEvents();
      if (Array.isArray(remoteEvents) && remoteEvents.length > 0) {
        const formatted = remoteEvents.map((e) => ({
          id: e.id,
          title: e.title,
          type: e.type || 'Task',
          date: e.date,
          time: e.time || '',
          description: e.description || '',
          linkedTaskId: e.linked_task_id || null,
          completed: e.completed ?? false,
          createdAt: e.created_at,
          updatedAt: e.updated_at,
        }));
        storageService.setCollection('PLANNER_EVENTS', formatted);
        return formatted;
      }
    } catch (err) {
      console.warn('Realtime planner sync fallback to LocalStorage:', err.message);
    }
    return this.getAll();
  },

  create(data) {
    const events = this.getAll();
    const newEvent = {
      id: generateUUID(),
      title: data.title.trim(),
      type: data.type || 'Task',
      date: data.date,
      time: data.time || '',
      description: data.description ? data.description.trim() : '',
      linkedTaskId: data.linkedTaskId || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...events, newEvent];
    storageService.setCollection('PLANNER_EVENTS', updated);

    // Realtime Supabase Cloud Push with stable UUID
    apiService.createPlannerEvent({
      id: newEvent.id,
      title: newEvent.title,
      type: newEvent.type,
      date: newEvent.date,
      time: newEvent.time,
      description: newEvent.description,
      linked_task_id: newEvent.linkedTaskId,
    }).catch((err) => console.warn('Supabase Realtime event create sync warning:', err));

    return newEvent;
  },

  update(id, updates) {
    const events = this.getAll();
    const updated = events.map((e) =>
      e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
    );
    storageService.setCollection('PLANNER_EVENTS', updated);
    const result = updated.find((e) => e.id === id);

    // Realtime Supabase Cloud Push
    apiService.updatePlannerEvent(id, updates)
      .catch((err) => console.warn('Supabase Realtime event update sync warning:', err));

    return result;
  },

  delete(id) {
    const events = this.getAll();
    const updated = events.filter((e) => e.id !== id);
    storageService.setCollection('PLANNER_EVENTS', updated);

    // Realtime Supabase Cloud Push
    apiService.deletePlannerEvent(id)
      .catch((err) => console.warn('Supabase Realtime event delete sync warning:', err));

    return true;
  },

  toggleCompleted(id) {
    const events = this.getAll();
    const target = events.find((e) => e.id === id);
    if (!target) return null;
    return this.update(id, { completed: !target.completed });
  },
};

