/**
 * Timer calculation utilities for PersonalOS Focus Engine
 */

export const timerService = {
  formatTime(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    const pad = (num) => String(num).padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  },

  calculateSessionMetrics(session, estimatedMinutes = 30) {
    if (!session) {
      const totalSec = estimatedMinutes * 60;
      return {
        elapsedSeconds: 0,
        remainingSeconds: totalSec,
        totalSeconds: totalSec,
        progressPercentage: 0,
      };
    }

    const totalTargetSeconds = estimatedMinutes * 60;

    // Calculate elapsed focus seconds (excluding paused duration)
    let elapsedSeconds = session.actualDuration || 0;

    if (session.status === 'Running' && session.startedAt) {
      const now = Date.now();
      const startTime = new Date(session.startedAt).getTime();
      const rawElapsed = Math.floor((now - startTime) / 1000);
      const pausedSec = session.pausedDuration || 0;
      elapsedSeconds = Math.max(0, rawElapsed - pausedSec);
    }

    const remainingSeconds = Math.max(0, totalTargetSeconds - elapsedSeconds);
    const progressPercentage = Math.min(
      100,
      Math.round((elapsedSeconds / totalTargetSeconds) * 100)
    );

    return {
      elapsedSeconds,
      remainingSeconds,
      totalSeconds: totalTargetSeconds,
      progressPercentage,
    };
  },
};
