import { storageService } from './storageService.js';
import { generateUUID } from '../utils/idUtils.js';

export const TIMELINE_EVENT_TYPES = {
  GOAL_CREATED: 'Goal Created',
  GOAL_ARCHIVED: 'Goal Archived',
  TEMPLATE_CREATED: 'Template Created',
  PLANNER_EVENT_CREATED: 'Planner Event Created',
  PLANNER_EVENT_COMPLETED: 'Planner Event Completed',
  FOCUS_STARTED: 'Focus Started',
  FOCUS_PAUSED: 'Focus Paused',
  FOCUS_RESUMED: 'Focus Resumed',
  FOCUS_COMPLETED: 'Focus Completed',
  TASK_COMPLETED: 'Task Completed',
  TASK_SKIPPED: 'Task Skipped',
  DAILY_NOTE_UPDATED: 'Daily Note Updated',
  PLANNER_NOTE_UPDATED: 'Planner Note Updated',
  REFLECTION_UPDATED: 'Reflection Updated',
};

export const timelineService = {
  getAll() {
    const events = storageService.getCollection('TIMELINE_EVENTS');
    return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  getRecent(limit = 5) {
    const events = this.getAll();
    return events.slice(0, limit);
  },

  recordEvent({ type, entityType, entityId, lifeAreaId = null, goalId = null, title, metadata = {} }) {
    const events = storageService.getCollection('TIMELINE_EVENTS');
    const newEvent = {
      id: generateUUID(),
      type,
      timestamp: new Date().toISOString(),
      entityType: entityType || 'General',
      entityId: entityId || null,
      lifeAreaId: lifeAreaId || null,
      goalId: goalId || null,
      title: title || type,
      metadata: metadata || {},
      createdAt: new Date().toISOString(),
    };

    const updated = [newEvent, ...events];
    storageService.setCollection('TIMELINE_EVENTS', updated);
    return newEvent;
  },


  queryEvents({ search = '', dateRange = 'All', lifeAreaId = null, goalId = null, eventType = 'All' }) {
    let events = this.getAll();

    // Text search (Title, metadata, type)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      events = events.filter((e) => {
        const titleMatch = e.title && e.title.toLowerCase().includes(q);
        const typeMatch = e.type && e.type.toLowerCase().includes(q);
        const metaMatch = JSON.stringify(e.metadata || {}).toLowerCase().includes(q);
        return titleMatch || typeMatch || metaMatch;
      });
    }

    // Filter by Event Type
    if (eventType && eventType !== 'All') {
      events = events.filter((e) => e.type === eventType || e.type.includes(eventType));
    }

    // Filter by Life Area
    if (lifeAreaId) {
      events = events.filter((e) => e.lifeAreaId === lifeAreaId);
    }

    // Filter by Goal
    if (goalId) {
      events = events.filter((e) => e.goalId === goalId);
    }

    // Filter by Date Range
    if (dateRange && dateRange !== 'All') {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (dateRange === 'Today') {
        events = events.filter((e) => new Date(e.timestamp) >= todayStart);
      } else if (dateRange === 'Yesterday') {
        const yestStart = new Date(todayStart);
        yestStart.setDate(yestStart.getDate() - 1);
        events = events.filter((e) => {
          const d = new Date(e.timestamp);
          return d >= yestStart && d < todayStart;
        });
      } else if (dateRange === 'This Week') {
        const weekStart = new Date(todayStart);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        events = events.filter((e) => new Date(e.timestamp) >= weekStart);
      } else if (dateRange === 'This Month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        events = events.filter((e) => new Date(e.timestamp) >= monthStart);
      }
    }

    return events;
  },
};
