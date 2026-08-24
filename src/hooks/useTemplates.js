import { useState, useCallback, useEffect } from 'react';
import { templateService } from '../services/templateService';

export const useTemplates = (goalId) => {
  const [templates, setTemplates] = useState(() => templateService.getAll());

  const refreshTemplates = useCallback(() => {
    setTemplates(templateService.getAll());
  }, []);

  useEffect(() => {
    templateService.syncFromCloud().then((cloudItems) => {
      if (cloudItems) setTemplates(cloudItems);
    });
  }, []);

  const filteredTemplates = goalId
    ? templates.filter((t) => t.goalId === goalId)
    : templates;

  const createTemplate = useCallback((data) => {
    const created = templateService.create(data);
    refreshTemplates();
    return created;
  }, [refreshTemplates]);

  const updateTemplate = useCallback((id, updates) => {
    const updated = templateService.update(id, updates);
    refreshTemplates();
    return updated;
  }, [refreshTemplates]);

  const deleteTemplate = useCallback((id) => {
    templateService.delete(id);
    refreshTemplates();
  }, [refreshTemplates]);

  const toggleActiveTemplate = useCallback((id) => {
    templateService.toggleActive(id);
    refreshTemplates();
  }, [refreshTemplates]);

  return {
    allTemplates: templates,
    templates: filteredTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleActiveTemplate,
    refreshTemplates,
  };
};
