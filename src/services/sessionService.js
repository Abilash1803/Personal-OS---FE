import { storageService } from './storageService.js';
import { focusService } from './focusService.js';
import { generatorService } from './generatorService.js';
import { timelineService, TIMELINE_EVENT_TYPES } from './timelineService.js';
import { TASK_STATUSES } from '../utils/taskUtils.js';

export const sessionService = {
  getActiveSession() {
    try {
      const raw = storageService.getItem('personal_os_active_focus_session');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.warn('PersonalOS safe parsing fallback for active focus session:', err);
      storageService.removeItem('personal_os_active_focus_session');
      return null;
    }
  },

  setActiveSession(session) {
    if (session) {
      storageService.setItem('personal_os_active_focus_session', JSON.stringify(session));
    } else {
      storageService.removeItem('personal_os_active_focus_session');
    }
  },

  startSession(dailyTaskId) {
    const currentActive = this.getActiveSession();

    if (currentActive && currentActive.dailyTaskId !== dailyTaskId && currentActive.status === 'Running') {
      throw new Error('An active focus session is already running. Please finish or pause it first.');
    }

    if (currentActive && currentActive.dailyTaskId === dailyTaskId) {
      return currentActive;
    }

    const session = focusService.create({
      dailyTaskId,
      startedAt: new Date().toISOString(),
      status: 'NotStarted',
    });

    this.setActiveSession(session);
    return session;
  },

  beginTimer(sessionId) {
    let session = this.getActiveSession() || focusService.getById(sessionId);
    if (!session) return null;

    const now = new Date().toISOString();
    session = {
      ...session,
      startedAt: session.startedAt || now,
      status: 'Running',
      pausedAt: null,
      updatedAt: now,
    };

    focusService.update(session.id, session);
    this.setActiveSession(session);

    timelineService.recordEvent({
      type: TIMELINE_EVENT_TYPES.FOCUS_STARTED,
      entityType: 'FocusSession',
      entityId: session.id,
      title: 'Focus Session Started',
      metadata: { dailyTaskId: session.dailyTaskId },
    });

    return session;
  },

  pauseSession(sessionId) {
    let session = this.getActiveSession() || focusService.getById(sessionId);
    if (!session || session.status !== 'Running') return session;

    const now = new Date().toISOString();
    session = {
      ...session,
      status: 'Paused',
      pausedAt: now,
      updatedAt: now,
    };

    focusService.update(session.id, session);
    this.setActiveSession(session);

    timelineService.recordEvent({
      type: TIMELINE_EVENT_TYPES.FOCUS_PAUSED,
      entityType: 'FocusSession',
      entityId: session.id,
      title: 'Focus Session Paused',
    });

    return session;
  },

  resumeSession(sessionId) {
    let session = this.getActiveSession() || focusService.getById(sessionId);
    if (!session || session.status !== 'Paused') return session;

    const now = Date.now();
    let addedPause = 0;
    if (session.pausedAt) {
      const pauseStart = new Date(session.pausedAt).getTime();
      addedPause = Math.floor((now - pauseStart) / 1000);
    }

    const updatedSession = {
      ...session,
      status: 'Running',
      pausedAt: null,
      pausedDuration: (session.pausedDuration || 0) + addedPause,
      updatedAt: new Date().toISOString(),
    };

    focusService.update(updatedSession.id, updatedSession);
    this.setActiveSession(updatedSession);

    timelineService.recordEvent({
      type: TIMELINE_EVENT_TYPES.FOCUS_RESUMED,
      entityType: 'FocusSession',
      entityId: session.id,
      title: 'Focus Session Resumed',
    });

    return updatedSession;
  },

  completeSession(sessionId, finalNotes = '') {
    let session = this.getActiveSession() || focusService.getById(sessionId);
    if (!session) return null;

    const now = new Date();
    const nowIso = now.toISOString();

    const startMs = session.startedAt ? new Date(session.startedAt).getTime() : now.getTime();
    const rawElapsed = Math.floor((now.getTime() - startMs) / 1000);
    const actualDuration = Math.max(0, rawElapsed - (session.pausedDuration || 0));
    const durationMinutes = Math.round(actualDuration / 60);

    const completedSession = {
      ...session,
      status: 'Completed',
      endedAt: nowIso,
      actualDuration,
      notes: finalNotes || session.notes || '',
      updatedAt: nowIso,
    };

    focusService.update(completedSession.id, completedSession);
    this.setActiveSession(null);

    // Update Dashboard task status to Completed
    if (session.dailyTaskId) {
      generatorService.updateTaskStatus(session.dailyTaskId, TASK_STATUSES.COMPLETED);
    }

    timelineService.recordEvent({
      type: TIMELINE_EVENT_TYPES.FOCUS_COMPLETED,
      entityType: 'FocusSession',
      entityId: session.id,
      title: 'Focus Session Completed',
      metadata: { durationMinutes, actualDuration },
    });

    return completedSession;
  },

  skipSession(sessionId) {
    let session = this.getActiveSession() || focusService.getById(sessionId);
    if (!session) return null;

    const nowIso = new Date().toISOString();
    const skippedSession = {
      ...session,
      status: 'Skipped',
      endedAt: nowIso,
      updatedAt: nowIso,
    };

    focusService.update(skippedSession.id, skippedSession);
    this.setActiveSession(null);

    timelineService.recordEvent({
      type: TIMELINE_EVENT_TYPES.TASK_SKIPPED,
      entityType: 'FocusSession',
      entityId: session.id,
      title: 'Focus Session Skipped',
    });

    return skippedSession;
  },

  updateNotes(sessionId, notes) {
    let session = this.getActiveSession() || focusService.getById(sessionId);
    if (!session) return null;

    const updated = {
      ...session,
      notes,
      updatedAt: new Date().toISOString(),
    };

    focusService.update(session.id, updated);
    if (this.getActiveSession()?.id === session.id) {
      this.setActiveSession(updated);
    }
    return updated;
  },
};
