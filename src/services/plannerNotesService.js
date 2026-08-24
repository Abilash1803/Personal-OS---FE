import { storageService } from './storageService';
import { apiService } from './apiService';
import { getTodayISODate } from '../utils/dateUtils';

export const plannerNotesService = {
  getAll() {
    return storageService.getCollection('PLANNER_DAY_NOTES');
  },

  getByDate(dateStr = getTodayISODate()) {
    const notes = this.getAll();
    const found = notes.find((n) => n.date === dateStr);
    return found ? found.content : '';
  },

  saveNote(dateStr, content) {
    const notes = this.getAll();
    const existingIndex = notes.findIndex((n) => n.date === dateStr);

    let updated = [];
    if (existingIndex >= 0) {
      updated = notes.map((n, idx) =>
        idx === existingIndex ? { ...n, content, updatedAt: new Date().toISOString() } : n
      );
    } else {
      updated = [
        ...notes,
        {
          id: `note-${dateStr}`,
          date: dateStr,
          content,
          updatedAt: new Date().toISOString(),
        },
      ];
    }

    storageService.setCollection('PLANNER_DAY_NOTES', updated);

    // Realtime Supabase Cloud Push
    apiService.saveReflection(dateStr, content)
      .catch((err) => console.warn('Supabase Realtime note sync warning:', err));

    return content;
  },
};
