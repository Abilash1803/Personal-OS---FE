/**
 * Calculates deltas and trends between two periods (current vs previous)
 */

export const periodComparisonService = {
  compareMetrics(currentVal = 0, previousVal = 0, unit = '%') {
    const diff = currentVal - previousVal;
    let direction = 'equal';

    if (diff > 0) direction = 'up';
    else if (diff < 0) direction = 'down';

    const absDiff = Math.abs(diff);
    let formattedChange = '0%';

    if (unit === '%') {
      formattedChange = `${direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→'} ${absDiff}%`;
    } else if (unit === 'mins' || unit === 'time') {
      const hrs = Math.floor(absDiff / 60);
      const mins = absDiff % 60;
      const timeStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
      formattedChange = `${direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→'} ${timeStr}`;
    } else {
      formattedChange = `${direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→'} ${absDiff}`;
    }

    return {
      currentVal,
      previousVal,
      diff,
      direction,
      formattedChange,
    };
  },
};
