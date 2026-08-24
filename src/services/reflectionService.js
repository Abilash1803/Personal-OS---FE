import { storageService } from './storageService';
import { timelineService, TIMELINE_EVENT_TYPES } from './timelineService';
import { getTodayISODate } from '../utils/dateUtils';

export const reflectionService = {
  getAll() {
    return storageService.getCollection('DAILY_REFLECTIONS');
  },

  getByDate(dateStr = getTodayISODate()) {
    const reflections = this.getAll();
    const found = reflections.find((r) => r.date === dateStr);
    return found ? found.content : '';
  },

  saveReflection(dateStr, content) {
    const reflections = this.getAll();
    const existingIndex = reflections.findIndex((r) => r.date === dateStr);

    let updated = [];
    if (existingIndex >= 0) {
      updated = reflections.map((r, idx) =>
        idx === existingIndex ? { ...r, content, updatedAt: new Date().toISOString() } : r
      );
    } else {
      updated = [
        ...reflections,
        {
          id: `refl-${dateStr}`,
          date: dateStr,
          content,
          updatedAt: new Date().toISOString(),
        },
      ];
    }

    storageService.setCollection('DAILY_REFLECTIONS', updated);

    // Record Timeline Event
    timelineService.recordEvent({
      type: TIMELINE_EVENT_TYPES.REFLECTION_UPDATED,
      entityType: 'DailyReflection',
      entityId: `refl-${dateStr}`,
      title: `Daily Reflection Updated for ${dateStr}`,
      metadata: { date: dateStr, length: content.length },
    });

    return content;
  },
};
