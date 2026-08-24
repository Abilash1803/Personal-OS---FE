import { supabase } from './supabaseClient.js';
import { storageService } from './storageService.js';

export const syncService = {
  /**
   * Tests Supabase cloud database connection status
   */
  async getCloudStatus() {
    if (!supabase) {
      return { connected: false, error: 'Supabase credentials not configured in frontend environment.' };
    }
    try {
      const { error } = await supabase.from('life_areas').select('id', { count: 'exact', head: true });
      if (error) return { connected: false, error: error.message };
      return { connected: true };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  },

  /**
   * Syncs local storage data up to Supabase Postgres database.
   */
  async pushLocalToCloud(userId = null) {
    if (!supabase) {
      throw new Error('Supabase client is not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    }
    const dataMap = storageService.getAllPersonalOSCollections();

    // 1. Life Areas
    if (dataMap.personal_os_life_areas?.length) {
      const payload = dataMap.personal_os_life_areas.map((item) => ({
        id: item.id,
        user_id: userId,
        name: item.name,
        icon: item.icon || '📌',
        color: item.color || '#2563EB',
        sort_order: item.order || 1,
        created_at: item.createdAt || new Date().toISOString(),
      }));
      await supabase.from('life_areas').upsert(payload);
    }

    // 2. Goals
    if (dataMap.personal_os_goals?.length) {
      const payload = dataMap.personal_os_goals.map((item) => ({
        id: item.id,
        user_id: userId,
        life_area_id: item.lifeAreaId || null,
        title: item.title,
        description: item.description || '',
        target_date: item.targetDate || '',
        is_active: item.isActive ?? true,
        created_at: item.createdAt || new Date().toISOString(),
      }));
      await supabase.from('goals').upsert(payload);
    }

    // 3. Task Templates
    if (dataMap.personal_os_task_templates?.length) {
      const payload = dataMap.personal_os_task_templates.map((item) => ({
        id: item.id,
        user_id: userId,
        goal_id: item.goalId || null,
        title: item.title,
        estimated_minutes: item.estimatedMinutes || 30,
        priority: item.priority || 'Medium',
        recurrence: item.recurrence || 'Daily',
        sort_order: item.order || 1,
        is_active: item.active ?? true,
        created_at: item.createdAt || new Date().toISOString(),
      }));
      await supabase.from('task_templates').upsert(payload);
    }

    // 4. Daily Tasks
    if (dataMap.personal_os_daily_tasks?.length) {
      const payload = dataMap.personal_os_daily_tasks.map((item) => ({
        id: item.id,
        user_id: userId,
        template_id: item.templateId || null,
        date: item.date,
        status: item.status || 'Pending',
        completed_at: item.completedAt || null,
        created_at: item.createdAt || new Date().toISOString(),
      }));
      await supabase.from('daily_tasks').upsert(payload);
    }

    // 5. Planner Events
    if (dataMap.personal_os_planner_events?.length) {
      const payload = dataMap.personal_os_planner_events.map((item) => ({
        id: item.id,
        user_id: userId,
        title: item.title,
        type: item.type || 'Task',
        date: item.date,
        time: item.time || '',
        description: item.description || '',
        linked_task_id: item.linkedTaskId || null,
        completed: item.completed ?? false,
        created_at: item.createdAt || new Date().toISOString(),
        updated_at: item.updatedAt || new Date().toISOString(),
      }));
      await supabase.from('planner_events').upsert(payload);
    }

    // 6. Focus Sessions
    if (dataMap.personal_os_focus_sessions?.length) {
      const payload = dataMap.personal_os_focus_sessions.map((item) => ({
        id: item.id,
        user_id: userId,
        daily_task_id: item.dailyTaskId || null,
        started_at: item.startedAt || new Date().toISOString(),
        ended_at: item.endedAt || null,
        paused_duration: item.pausedDuration || 0,
        actual_duration: item.actualDuration || 0,
        status: item.status || 'Completed',
        notes: item.notes || '',
        created_at: item.createdAt || new Date().toISOString(),
      }));
      await supabase.from('focus_sessions').upsert(payload);
    }

    // 7. Daily Reflections
    if (dataMap.personal_os_daily_reflections?.length) {
      const payload = dataMap.personal_os_daily_reflections.map((item) => ({
        id: item.id,
        user_id: userId,
        date: item.date,
        content: item.content || '',
        created_at: item.createdAt || new Date().toISOString(),
        updated_at: item.updatedAt || new Date().toISOString(),
      }));
      await supabase.from('daily_reflections').upsert(payload);
    }

    return { success: true, timestamp: new Date().toISOString() };
  },

  /**
   * Pulls remote Supabase database records into local storage.
   */
  async pullCloudToLocal() {
    if (!supabase) {
      throw new Error('Supabase client is not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    }
    const [
      { data: lifeAreas },
      { data: goals },
      { data: taskTemplates },
      { data: dailyTasks },
      { data: plannerEvents },
      { data: focusSessions },
      { data: dailyReflections },
    ] = await Promise.all([
      supabase.from('life_areas').select('*'),
      supabase.from('goals').select('*'),
      supabase.from('task_templates').select('*'),
      supabase.from('daily_tasks').select('*'),
      supabase.from('planner_events').select('*'),
      supabase.from('focus_sessions').select('*'),
      supabase.from('daily_reflections').select('*'),
    ]);

    if (lifeAreas?.length) {
      storageService.setCollection(
        'LIFE_AREAS',
        lifeAreas.map((l) => ({
          id: l.id,
          name: l.name,
          icon: l.icon,
          color: l.color,
          order: l.sort_order,
          createdAt: l.created_at,
        }))
      );
    }

    if (goals?.length) {
      storageService.setCollection(
        'GOALS',
        goals.map((g) => ({
          id: g.id,
          lifeAreaId: g.life_area_id,
          title: g.title,
          description: g.description,
          targetDate: g.target_date,
          isActive: g.is_active,
          createdAt: g.created_at,
        }))
      );
    }

    if (taskTemplates?.length) {
      storageService.setCollection(
        'TEMPLATES',
        taskTemplates.map((t) => ({
          id: t.id,
          goalId: t.goal_id,
          title: t.title,
          estimatedMinutes: t.estimated_minutes,
          priority: t.priority,
          recurrence: t.recurrence,
          order: t.sort_order,
          active: t.is_active,
          createdAt: t.created_at,
        }))
      );
    }

    if (dailyTasks?.length) {
      storageService.setCollection(
        'DAILY_TASKS',
        dailyTasks.map((t) => ({
          id: t.id,
          templateId: t.template_id,
          date: t.date,
          status: t.status,
          completedAt: t.completed_at,
          createdAt: t.created_at,
        }))
      );
    }

    if (plannerEvents?.length) {
      storageService.setCollection(
        'PLANNER_EVENTS',
        plannerEvents.map((e) => ({
          id: e.id,
          title: e.title,
          type: e.type,
          date: e.date,
          time: e.time,
          description: e.description,
          linkedTaskId: e.linked_task_id,
          completed: e.completed,
          createdAt: e.created_at,
          updatedAt: e.updated_at,
        }))
      );
    }

    if (focusSessions?.length) {
      storageService.setCollection(
        'FOCUS_SESSIONS',
        focusSessions.map((s) => ({
          id: s.id,
          dailyTaskId: s.daily_task_id,
          startedAt: s.started_at,
          endedAt: s.ended_at,
          actualDuration: s.actual_duration,
          pausedDuration: s.paused_duration,
          status: s.status,
          notes: s.notes,
          createdAt: s.created_at,
        }))
      );
    }

    if (dailyReflections?.length) {
      storageService.setCollection(
        'DAILY_REFLECTIONS',
        dailyReflections.map((r) => ({
          id: r.id,
          date: r.date,
          content: r.content,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }))
      );
    }

    return { success: true };
  },
};

