import { supabase } from './supabaseClient.js';

export const apiService = {
  // Health / Connection check
  async checkHealth() {
    if (!supabase) return { status: 'offline', connected: false };
    try {
      const { error } = await supabase.from('life_areas').select('id', { count: 'exact', head: true });
      return { status: error ? 'error' : 'ok', connected: !error, error: error?.message };
    } catch (err) {
      return { status: 'error', connected: false, error: err.message };
    }
  },

  // 1. Life Areas
  async getLifeAreas() {
    if (!supabase) return [];
    const { data, error } = await supabase.from('life_areas').select('*').order('sort_order', { ascending: true });
    if (error) {
      console.warn('Supabase getLifeAreas error:', error.message);
      return [];
    }
    return data || [];
  },

  async createLifeArea(data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('life_areas').upsert([
      {
        id: data.id,
        name: data.name,
        icon: data.icon || '📌',
        color: data.color || '#2563EB',
        sort_order: data.sort_order || 1,
      },
    ]).select();
    if (error) console.warn('Supabase createLifeArea error:', error.message);
    return result?.[0] || null;
  },

  async updateLifeArea(id, data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('life_areas').update(data).eq('id', id).select();
    if (error) console.warn('Supabase updateLifeArea error:', error.message);
    return result?.[0] || null;
  },

  async deleteLifeArea(id) {
    if (!supabase) return true;
    const { error } = await supabase.from('life_areas').delete().eq('id', id);
    if (error) console.warn('Supabase deleteLifeArea error:', error.message);
    return !error;
  },

  // 2. Goals
  async getGoals() {
    if (!supabase) return [];
    const { data, error } = await supabase.from('goals').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase getGoals error:', error.message);
      return [];
    }
    return data || [];
  },

  async createGoal(data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('goals').upsert([
      {
        id: data.id,
        life_area_id: data.life_area_id || null,
        title: data.title,
        description: data.description || '',
        target_date: data.target_date || '',
        is_active: data.is_active ?? true,
      },
    ]).select();
    if (error) console.warn('Supabase createGoal error:', error.message);
    return result?.[0] || null;
  },

  async updateGoal(id, data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('goals').update(data).eq('id', id).select();
    if (error) console.warn('Supabase updateGoal error:', error.message);
    return result?.[0] || null;
  },

  async deleteGoal(id) {
    if (!supabase) return true;
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) console.warn('Supabase deleteGoal error:', error.message);
    return !error;
  },

  // 3. Planner Events
  async getPlannerEvents(date = '') {
    if (!supabase) return [];
    let query = supabase.from('planner_events').select('*');
    if (date) {
      query = query.eq('date', date);
    }
    const { data, error } = await query.order('time', { ascending: true });
    if (error) {
      console.warn('Supabase getPlannerEvents error:', error.message);
      return [];
    }
    return data || [];
  },

  async createPlannerEvent(data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('planner_events').upsert([
      {
        id: data.id,
        title: data.title,
        type: data.type || 'Task',
        date: data.date,
        time: data.time || '',
        description: data.description || '',
        linked_task_id: data.linked_task_id || null,
        completed: data.completed ?? false,
      },
    ]).select();
    if (error) console.warn('Supabase createPlannerEvent error:', error.message);
    return result?.[0] || null;
  },

  async updatePlannerEvent(id, data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('planner_events').update(data).eq('id', id).select();
    if (error) console.warn('Supabase updatePlannerEvent error:', error.message);
    return result?.[0] || null;
  },

  async deletePlannerEvent(id) {
    if (!supabase) return true;
    const { error } = await supabase.from('planner_events').delete().eq('id', id);
    if (error) console.warn('Supabase deletePlannerEvent error:', error.message);
    return !error;
  },

  // 4. Task Templates
  async getTemplates() {
    if (!supabase) return [];
    const { data, error } = await supabase.from('task_templates').select('*').order('sort_order', { ascending: true });
    if (error) {
      console.warn('Supabase getTemplates error:', error.message);
      return [];
    }
    return data || [];
  },

  async createTemplate(data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('task_templates').upsert([
      {
        id: data.id,
        goal_id: data.goal_id || null,
        title: data.title,
        estimated_minutes: data.estimated_minutes || 30,
        priority: data.priority || 'Medium',
        recurrence: data.recurrence || 'Daily',
        sort_order: data.sort_order || 1,
        is_active: data.is_active ?? true,
      },
    ]).select();
    if (error) console.warn('Supabase createTemplate error:', error.message);
    return result?.[0] || null;
  },

  async updateTemplate(id, data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('task_templates').update(data).eq('id', id).select();
    if (error) console.warn('Supabase updateTemplate error:', error.message);
    return result?.[0] || null;
  },

  async deleteTemplate(id) {
    if (!supabase) return true;
    const { error } = await supabase.from('task_templates').delete().eq('id', id);
    if (error) console.warn('Supabase deleteTemplate error:', error.message);
    return !error;
  },

  // 5. Daily Tasks
  async getDailyTasks(date = '') {
    if (!supabase) return [];
    let query = supabase.from('daily_tasks').select('*');
    if (date) {
      query = query.eq('date', date);
    }
    const { data, error } = await query;
    if (error) {
      console.warn('Supabase getDailyTasks error:', error.message);
      return [];
    }
    return data || [];
  },

  async createDailyTask(data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('daily_tasks').upsert([
      {
        id: data.id,
        template_id: data.template_id || null,
        date: data.date,
        status: data.status || 'Pending',
        completed_at: data.completed_at || null,
        actual_minutes: data.actual_minutes || 0,
      },
    ]).select();
    if (error) console.warn('Supabase createDailyTask error:', error.message);
    return result?.[0] || null;
  },

  async updateDailyTask(id, data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('daily_tasks').update(data).eq('id', id).select();
    if (error) console.warn('Supabase updateDailyTask error:', error.message);
    return result?.[0] || null;
  },

  async deleteDailyTask(id) {
    if (!supabase) return true;
    const { error } = await supabase.from('daily_tasks').delete().eq('id', id);
    if (error) console.warn('Supabase deleteDailyTask error:', error.message);
    return !error;
  },

  // 6. Focus Sessions
  async getFocusSessions() {
    if (!supabase) return [];
    const { data, error } = await supabase.from('focus_sessions').select('*').order('started_at', { ascending: false });
    if (error) {
      console.warn('Supabase getFocusSessions error:', error.message);
      return [];
    }
    return data || [];
  },

  async createFocusSession(data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('focus_sessions').upsert([
      {
        id: data.id,
        daily_task_id: data.daily_task_id || null,
        started_at: data.started_at || new Date().toISOString(),
        ended_at: data.ended_at || null,
        paused_duration: data.paused_duration || 0,
        actual_duration: data.actual_duration || 0,
        status: data.status || 'Completed',
        notes: data.notes || '',
      },
    ]).select();
    if (error) console.warn('Supabase createFocusSession error:', error.message);
    return result?.[0] || null;
  },

  async updateFocusSession(id, data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('focus_sessions').update(data).eq('id', id).select();
    if (error) console.warn('Supabase updateFocusSession error:', error.message);
    return result?.[0] || null;
  },

  // 7. Timeline Events
  async getTimelineEvents() {
    if (!supabase) return [];
    const { data, error } = await supabase.from('timeline_events').select('*').order('timestamp', { ascending: false }).limit(100);
    if (error) {
      console.warn('Supabase getTimelineEvents error:', error.message);
      return [];
    }
    return data || [];
  },

  async createTimelineEvent(data) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('timeline_events').insert([
      {
        id: data.id,
        type: data.type,
        timestamp: data.timestamp || new Date().toISOString(),
        entity_type: data.entity_type || 'General',
        entity_id: data.entity_id || null,
        life_area_id: data.life_area_id || null,
        goal_id: data.goal_id || null,
        title: data.title,
        metadata: data.metadata || {},
      },
    ]).select();
    if (error) console.warn('Supabase createTimelineEvent error:', error.message);
    return result?.[0] || null;
  },

  // 8. Reflections
  async getReflection(date) {
    if (!supabase) return null;
    const { data, error } = await supabase.from('daily_reflections').select('*').eq('date', date).maybeSingle();
    if (error) {
      console.warn('Supabase getReflection error:', error.message);
      return null;
    }
    return data || null;
  },

  async saveReflection(date, content) {
    if (!supabase) return null;
    const { data: result, error } = await supabase.from('daily_reflections').upsert([
      {
        date,
        content: content || '',
        updated_at: new Date().toISOString(),
      },
    ], { onConflict: 'user_id,date' }).select();
    if (error) console.warn('Supabase saveReflection error:', error.message);
    return result?.[0] || null;
  },
};
