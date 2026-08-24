import { backupService } from '../backupService.js';

// Mock localStorage for Node test runner
if (typeof global.localStorage === 'undefined') {
  const store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
  };
}

export function runBackupServiceTests() {
  const results = [];

  const assert = (condition, name) => {
    if (condition) {
      results.push({ name, status: 'PASS' });
    } else {
      results.push({ name, status: 'FAIL' });
      console.error(`Test failed: ${name}`);
    }
  };

  // Test 1: Backup generation format
  try {
    const backupObj = backupService.collectBackupData();
    assert(
      backupObj.format === 'PersonalOSBackup' && backupObj.backupVersion === 1,
      'collectBackupData produces valid format and version 1'
    );
  } catch (e) {
    assert(false, `collectBackupData error: ${e.message}`);
  }

  // Test 2: Validation of valid backup
  try {
    const validObj = backupService.collectBackupData();
    const validation = backupService.validateBackup(validObj);
    assert(validation.isValid === true, 'validateBackup passes valid backup object');
  } catch (e) {
    assert(false, `validateBackup valid error: ${e.message}`);
  }

  // Test 3: Rejection of invalid format
  try {
    const invalidObj = { format: 'WrongFormat', backupVersion: 1, data: {} };
    const validation = backupService.validateBackup(invalidObj);
    assert(validation.isValid === false, 'validateBackup rejects wrong format name');
  } catch (e) {
    assert(false, `validateBackup wrong format error: ${e.message}`);
  }

  // Test 4: Rejection of future version
  try {
    const futureObj = { format: 'PersonalOSBackup', backupVersion: 999, data: {} };
    const validation = backupService.validateBackup(futureObj);
    assert(validation.isValid === false, 'validateBackup rejects unsupported future version');
  } catch (e) {
    assert(false, `validateBackup future version error: ${e.message}`);
  }

  // Test 5: Rejection of null/non-object
  try {
    const validation = backupService.validateBackup(null);
    assert(validation.isValid === false, 'validateBackup rejects null payload');
  } catch (e) {
    assert(false, `validateBackup null error: ${e.message}`);
  }

  // Test 6: Metadata extraction
  try {
    const sample = {
      format: 'PersonalOSBackup',
      backupVersion: 1,
      appVersion: '7.7.0',
      createdAt: new Date().toISOString(),
      data: {
        personal_os_goals: [{ id: 'g1' }, { id: 'g2' }],
        personal_os_planner_events: [{ id: 'e1' }],
        personal_os_focus_sessions: [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }],
      },
    };
    const metadata = backupService.getBackupMetadata(sample);
    assert(
      metadata.stats.goals === 2 &&
        metadata.stats.plannerEvents === 1 &&
        metadata.stats.focusSessions === 3,
      'getBackupMetadata extracts exact record counts'
    );
  } catch (e) {
    assert(false, `getBackupMetadata error: ${e.message}`);
  }

  // Test 7: Atomic restore
  try {
    const sampleBackup = backupService.collectBackupData();
    sampleBackup.data['personal_os_goals'] = [{ id: 'restored-goal-1', title: 'Restored Goal' }];
    const res = backupService.restoreBackup(sampleBackup);
    assert(res.success === true, 'restoreBackup executes successfully');
  } catch (e) {
    assert(false, `restoreBackup error: ${e.message}`);
  }

  return results;
}
