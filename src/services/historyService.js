import { timelineService } from './timelineService';

export const historyService = {
  getGroupedTimeline(queryParams = {}) {
    const events = timelineService.queryEvents(queryParams);
    
    // Group events by YYYY-MM-DD
    const groupsMap = new Map();

    events.forEach((evt) => {
      const dateObj = new Date(evt.timestamp);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      if (!groupsMap.has(dateStr)) {
        groupsMap.set(dateStr, []);
      }
      groupsMap.get(dateStr).push(evt);
    });

    // Convert to sorted array of groups (newest date first)
    const grouped = Array.from(groupsMap.entries()).map(([dateStr, items]) => ({
      dateStr,
      formattedDate: new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      items,
    }));

    return grouped.sort((a, b) => b.dateStr.localeCompare(a.dateStr));
  },
};
