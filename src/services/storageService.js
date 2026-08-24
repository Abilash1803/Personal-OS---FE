/**
 * Low-level storage abstraction layer for PersonalOS
 * Manages independent collections in LocalStorage.
 * Components NEVER import or call storageService directly.
 * Includes safe JSON parsing to protect against LocalStorage corruption.
 */



const STORAGE_KEYS = {
  LIFE_AREAS: 'personal_os_life_areas',
  GOALS: 'personal_os_goals',
  TEMPLATES: 'personal_os_task_templates',
  DAILY_TASKS: 'personal_os_daily_tasks',
  HISTORY: 'personal_os_daily_history',
  SETTINGS: 'personal_os_settings',
  PLANNER_EVENTS: 'personal_os_planner_events',
  PLANNER_DAY_NOTES: 'personal_os_planner_day_notes',
  PLANNER_SETTINGS: 'personal_os_planner_settings',
  FOCUS_SESSIONS: 'personal_os_focus_sessions',
  ACTIVE_FOCUS_SESSION: 'personal_os_active_focus_session',
  TIMELINE_EVENTS: 'personal_os_timeline_events',
  DAILY_REFLECTIONS: 'personal_os_daily_reflections',
  HISTORY_SETTINGS: 'personal_os_history_settings',
  ANALYTICS_SETTINGS: 'personal_os_analytics_settings',
  REVIEW_SETTINGS: 'personal_os_review_settings',
  VERSION: 'personal_os_version',
  LAST_BACKUP_AT: 'personal_os_last_backup_at',
};

const CURRENT_STORAGE_VERSION = '1.0.0';

export const storageService = {
  initializeStorage() {
    try {
      const version = localStorage.getItem(STORAGE_KEYS.VERSION);
      if (!version || version !== CURRENT_STORAGE_VERSION) {
        if (!localStorage.getItem(STORAGE_KEYS.LIFE_AREAS)) {
          localStorage.setItem(STORAGE_KEYS.LIFE_AREAS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.GOALS)) {
          localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.TEMPLATES)) {
          localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.DAILY_TASKS)) {
          localStorage.setItem(STORAGE_KEYS.DAILY_TASKS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.PLANNER_EVENTS)) {
          localStorage.setItem(STORAGE_KEYS.PLANNER_EVENTS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.PLANNER_DAY_NOTES)) {
          localStorage.setItem(STORAGE_KEYS.PLANNER_DAY_NOTES, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.FOCUS_SESSIONS)) {
          localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.TIMELINE_EVENTS)) {
          localStorage.setItem(STORAGE_KEYS.TIMELINE_EVENTS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.DAILY_REFLECTIONS)) {
          localStorage.setItem(STORAGE_KEYS.DAILY_REFLECTIONS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
          localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.REVIEW_SETTINGS)) {
          localStorage.setItem(
            STORAGE_KEYS.REVIEW_SETTINGS,
            JSON.stringify({ defaultReviewType: 'daily', weekStartsOn: 'Monday' })
          );
        }
        localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_STORAGE_VERSION);
      }
    } catch {
      console.warn('PersonalOS Storage initialization fallback triggered');
    }
  },

  getCollection(key) {
    this.initializeStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS[key]);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.warn(`PersonalOS Storage safe parsing fallback for collection [${key}]:`, err);
      return [];
    }
  },

  setCollection(key, data) {
    try {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
    } catch (err) {
      console.error(`PersonalOS Storage error setting collection [${key}]:`, err);
    }
  },

  getItem(key) {
    try {
      return localStorage.getItem(STORAGE_KEYS[key]);
    } catch {
      return null;
    }
  },

  setItem(key, value) {
    try {
      localStorage.setItem(STORAGE_KEYS[key], value);
    } catch (err) {
      console.error(`PersonalOS Storage error setting item [${key}]:`, err);
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(STORAGE_KEYS[key]);
    } catch (err) {
      console.error(`PersonalOS Storage error removing item [${key}]:`, err);
    }
  },

  clearAllData() {
    Object.values(STORAGE_KEYS).forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });
    this.initializeStorage();
  },

  /**
   * Returns a key-value snapshot of all PersonalOS-owned localStorage data for backup.
   */
  getAllPersonalOSCollections() {
    this.initializeStorage();
    const dataMap = {};
    Object.entries(STORAGE_KEYS).forEach(([alias, storageKey]) => {
      if (alias === 'VERSION' || alias === 'LAST_BACKUP_AT') return;
      try {
        const raw = localStorage.getItem(storageKey);
        dataMap[storageKey] = raw ? JSON.parse(raw) : null;
      } catch {
        dataMap[storageKey] = null;
      }
    });
    return dataMap;
  },

  /**
   * Overwrites all PersonalOS collections with validated dataMap object.
   * Whitelists only known PersonalOS keys to prevent prototype pollution or storage corruption.
   */
  restorePersonalOSCollections(dataMap) {
    if (!dataMap || typeof dataMap !== 'object') return;
    const allowedStorageKeys = new Set(Object.values(STORAGE_KEYS));

    Object.entries(dataMap).forEach(([storageKey, value]) => {
      // Disallow prototype pollution keys & non-PersonalOS keys
      if (
        storageKey === '__proto__' ||
        storageKey === 'constructor' ||
        storageKey === 'prototype' ||
        !allowedStorageKeys.has(storageKey)
      ) {
        return;
      }

      if (value !== undefined && value !== null) {
        localStorage.setItem(storageKey, typeof value === 'string' ? value : JSON.stringify(value));
      }
    });
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_STORAGE_VERSION);
  },

  STORAGE_KEYS,
};
