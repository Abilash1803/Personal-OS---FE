/**
 * Backup and Restore service for PersonalOS
 * Handles JSON backup generation, validation, preview extraction, atomic restore,
 * and snapshot rollback safety.
 * 100% local-first — no network requests or external storage dependencies.
 */

import { storageService } from './storageService.js';
import { sessionService } from './sessionService.js';
import { getTodayISODate } from '../utils/dateUtils.js';

const FORMAT_NAME = 'PersonalOSBackup';
const CURRENT_BACKUP_VERSION = 1;
const APP_VERSION = '1.0.0';
const MAX_BACKUP_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB safety limit

export const backupService = {
  /**
   * Generates complete backup object containing all PersonalOS storage collections.
   */
  collectBackupData() {
    const dataMap = storageService.getAllPersonalOSCollections();
    return {
      format: FORMAT_NAME,
      backupVersion: CURRENT_BACKUP_VERSION,
      appVersion: APP_VERSION,
      createdAt: new Date().toISOString(),
      data: dataMap,
    };
  },

  /**
   * Creates backup JSON file and triggers native browser file download.
   */
  createBackup() {
    const backupObj = this.collectBackupData();
    const jsonStr = JSON.stringify(backupObj, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const todayDate = getTodayISODate();
    const link = document.createElement('a');
    link.href = url;
    link.download = `personalos-backup-${todayDate}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Save metadata
    const nowIso = new Date().toISOString();
    storageService.setItem('LAST_BACKUP_AT', nowIso);

    return { success: true, timestamp: nowIso };
  },

  /**
   * Validates imported backup JSON object.
   * Returns { isValid: boolean, error?: string }
   */
  validateBackup(backupObj) {
    if (!backupObj || typeof backupObj !== 'object') {
      return { isValid: false, error: "This doesn't appear to be a valid PersonalOS backup." };
    }

    if (backupObj.format !== FORMAT_NAME) {
      return { isValid: false, error: "This doesn't appear to be a valid PersonalOS backup format." };
    }

    if (!backupObj.backupVersion || typeof backupObj.backupVersion !== 'number') {
      return { isValid: false, error: 'Backup file is missing version information.' };
    }

    if (backupObj.backupVersion > CURRENT_BACKUP_VERSION) {
      return {
        isValid: false,
        error: `Unsupported backup version (${backupObj.backupVersion}). Please update PersonalOS.`,
      };
    }

    if (!backupObj.data || typeof backupObj.data !== 'object') {
      return { isValid: false, error: 'Backup payload is corrupt or missing data collections.' };
    }

    // Check size limit
    const stringified = JSON.stringify(backupObj);
    if (stringified.length > MAX_BACKUP_SIZE_BYTES) {
      return { isValid: false, error: 'Backup file exceeds maximum allowed size (15 MB).' };
    }

    // Validate structure of core collections if present
    const arrayKeys = [
      'personal_os_life_areas',
      'personal_os_goals',
      'personal_os_task_templates',
      'personal_os_daily_tasks',
      'personal_os_planner_events',
      'personal_os_focus_sessions',
      'personal_os_timeline_events',
      'personal_os_daily_reflections',
    ];

    for (const key of arrayKeys) {
      if (backupObj.data[key] !== undefined && !Array.isArray(backupObj.data[key])) {
        return { isValid: false, error: `Corrupt backup collection format for key [${key}].` };
      }
    }

    return { isValid: true };
  },

  /**
   * Extracts record count metadata for Restore Preview modal.
   */
  getBackupMetadata(backupObj) {
    const data = backupObj.data || {};

    const getCount = (key) => {
      const col = data[key];
      return Array.isArray(col) ? col.length : 0;
    };

    const goalsCount = getCount('personal_os_goals');
    const templatesCount = getCount('personal_os_task_templates');
    const plannerEventsCount = getCount('personal_os_planner_events');
    const focusSessionsCount = getCount('personal_os_focus_sessions');
    const timelineEventsCount = getCount('personal_os_timeline_events');
    const reflectionsCount = getCount('personal_os_daily_reflections');

    const createdDateFormatted = backupObj.createdAt
      ? new Date(backupObj.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Unknown date';

    return {
      createdAt: backupObj.createdAt,
      createdAtFormatted: createdDateFormatted,
      appVersion: backupObj.appVersion || '1.0.0',
      backupVersion: backupObj.backupVersion || 1,
      stats: {
        goals: goalsCount,
        templates: templatesCount,
        plannerEvents: plannerEventsCount,
        focusSessions: focusSessionsCount,
        timelineEvents: timelineEventsCount,
        reflections: reflectionsCount,
      },
    };
  },

  /**
   * Atomic restore of PersonalOS collections with in-memory snapshot rollback safety.
   */
  restoreBackup(backupObj) {
    // 1. Check if active focus session is running
    const activeSession = sessionService.getActiveSession();
    if (activeSession && activeSession.status === 'Running') {
      throw new Error('Finish or exit your active Focus Session before restoring a backup.');
    }

    // 2. Validate backup format
    const validation = this.validateBackup(backupObj);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // 3. Create in-memory snapshot of current storage
    const currentSnapshot = storageService.getAllPersonalOSCollections();

    try {
      // 4. Overwrite storage collections with backup data
      storageService.restorePersonalOSCollections(backupObj.data);

      // 5. Verify integrity
      const restoredGoals = storageService.getCollection('GOALS');
      if (!Array.isArray(restoredGoals)) {
        throw new Error('Restored collection verification failed.');
      }

      // Update metadata timestamp
      storageService.setItem('LAST_BACKUP_AT', new Date().toISOString());

      return { success: true };
    } catch (err) {
      // 6. Rollback to original snapshot if restore fails
      console.warn('PersonalOS restore error triggered automated snapshot rollback:', err);
      storageService.restorePersonalOSCollections(currentSnapshot);
      throw new Error(
        err.message || 'There was an error restoring the backup. Current data has been preserved.'
      );
    }
  },

  /**
   * Gets last backup timestamp formatted string.
   */
  getLastBackupTimestamp() {
    const raw = storageService.getItem('LAST_BACKUP_AT');
    if (!raw) return null;

    try {
      const d = new Date(raw);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return null;
    }
  },
};
