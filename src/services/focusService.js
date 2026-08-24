import { storageService } from './storageService.js';
import { generateUUID } from '../utils/idUtils.js';

export const focusService = {
  getAll() {
    return storageService.getCollection('FOCUS_SESSIONS');
  },

  getById(id) {
    const sessions = this.getAll();
    return sessions.find((s) => s.id === id) || null;
  },

  getByDailyTaskId(dailyTaskId) {
    const sessions = this.getAll();
    return sessions.filter((s) => s.dailyTaskId === dailyTaskId);
  },

  create(data) {
    const sessions = this.getAll();
    const newSession = {
      id: generateUUID(),
      dailyTaskId: data.dailyTaskId,
      startedAt: data.startedAt || new Date().toISOString(),
      endedAt: null,
      pausedAt: null,
      pausedDuration: 0,
      actualDuration: 0,
      status: data.status || 'NotStarted',
      notes: data.notes || '',
      metadata: {
        mood: null,
        energy: null,
        distractionCount: 0,
        tags: [],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...sessions, newSession];
    storageService.setCollection('FOCUS_SESSIONS', updated);
    return newSession;
  },

  update(id, updates) {
    const sessions = this.getAll();
    const updated = sessions.map((s) =>
      s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    );
    storageService.setCollection('FOCUS_SESSIONS', updated);
    return updated.find((s) => s.id === id);
  },
};

