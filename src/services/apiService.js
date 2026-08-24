const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);
  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.error || `API error (${response.status})`);
  }

  return json.data;
}

export const apiService = {
  // Health
  checkHealth() {
    return request('/health');
  },

  // Life Areas
  getLifeAreas() {
    return request('/life-areas');
  },
  createLifeArea(data) {
    return request('/life-areas', { method: 'POST', body: data });
  },
  updateLifeArea(id, data) {
    return request(`/life-areas/${id}`, { method: 'PUT', body: data });
  },
  deleteLifeArea(id) {
    return request(`/life-areas/${id}`, { method: 'DELETE' });
  },

  // Goals
  getGoals() {
    return request('/goals');
  },
  createGoal(data) {
    return request('/goals', { method: 'POST', body: data });
  },
  updateGoal(id, data) {
    return request(`/goals/${id}`, { method: 'PUT', body: data });
  },
  deleteGoal(id) {
    return request(`/goals/${id}`, { method: 'DELETE' });
  },

  // Planner Events
  getPlannerEvents(date = '') {
    const query = date ? `?date=${encodeURIComponent(date)}` : '';
    return request(`/planner${query}`);
  },
  createPlannerEvent(data) {
    return request('/planner', { method: 'POST', body: data });
  },
  updatePlannerEvent(id, data) {
    return request(`/planner/${id}`, { method: 'PUT', body: data });
  },
  deletePlannerEvent(id) {
    return request(`/planner/${id}`, { method: 'DELETE' });
  },

  // Task Templates
  getTemplates() {
    return request('/templates');
  },
  createTemplate(data) {
    return request('/templates', { method: 'POST', body: data });
  },
  updateTemplate(id, data) {
    return request(`/templates/${id}`, { method: 'PUT', body: data });
  },
  deleteTemplate(id) {
    return request(`/templates/${id}`, { method: 'DELETE' });
  },

  // Daily Tasks
  getDailyTasks(date = '') {
    const query = date ? `?date=${encodeURIComponent(date)}` : '';
    return request(`/daily-tasks${query}`);
  },
  createDailyTask(data) {
    return request('/daily-tasks', { method: 'POST', body: data });
  },
  updateDailyTask(id, data) {
    return request(`/daily-tasks/${id}`, { method: 'PUT', body: data });
  },
  deleteDailyTask(id) {
    return request(`/daily-tasks/${id}`, { method: 'DELETE' });
  },

  // Focus Sessions
  getFocusSessions() {
    return request('/focus-sessions');
  },
  createFocusSession(data) {
    return request('/focus-sessions', { method: 'POST', body: data });
  },
  updateFocusSession(id, data) {
    return request(`/focus-sessions/${id}`, { method: 'PUT', body: data });
  },

  // Timeline Events
  getTimelineEvents() {
    return request('/timeline-events');
  },
  createTimelineEvent(data) {
    return request('/timeline-events', { method: 'POST', body: data });
  },

  // Reflections
  getReflection(date) {
    return request(`/reflections/${encodeURIComponent(date)}`);
  },
  saveReflection(date, content) {
    return request('/reflections', { method: 'POST', body: { date, content } });
  },
};
