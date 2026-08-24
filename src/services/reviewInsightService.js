/**
 * Rule-based deterministic Review Highlights & Attention Items Generator
 * Maximum 3 items each. NO AI used.
 */

export const reviewInsightService = {
  generateHighlights({
    tasksCompleted = 0,
    tasksPlanned = 0,
    totalFocusMinutes = 0,
    plannerEventsCompleted = 0,
    currentStreak = 0,
    strongestLifeArea = null,
  }) {
    const highlights = [];

    // 1. Task Completion Highlight
    if (tasksPlanned > 0 && tasksCompleted === tasksPlanned) {
      highlights.push(`Completed all ${tasksPlanned} planned tasks for the day.`);
    } else if (tasksCompleted > 0) {
      highlights.push(`Finished ${tasksCompleted} of ${tasksPlanned} planned tasks.`);
    }

    // 2. Focus Duration Highlight
    if (totalFocusMinutes >= 60) {
      const hrs = Math.floor(totalFocusMinutes / 60);
      const mins = totalFocusMinutes % 60;
      highlights.push(`Focused for ${hrs}h ${mins}m in deep execution mode.`);
    } else if (totalFocusMinutes > 0) {
      highlights.push(`Logged ${totalFocusMinutes} minutes of focused work.`);
    }

    // 3. Streak / Planner Highlight
    if (currentStreak >= 3 && highlights.length < 3) {
      highlights.push(`Maintained a ${currentStreak}-day active productivity streak.`);
    } else if (plannerEventsCompleted > 0 && highlights.length < 3) {
      highlights.push(`Completed ${plannerEventsCompleted} scheduled planner items.`);
    } else if (strongestLifeArea && highlights.length < 3) {
      highlights.push(`${strongestLifeArea.name} was your highest performing area.`);
    }

    return highlights.slice(0, 3);
  },

  generateAttentionItems({
    tasksMissed = 0,
    tasksPlanned = 0,
    weakestLifeArea = null,
    plannerAccuracy = 100,
    totalFocusMinutes = 0,
  }) {
    const items = [];

    // 1. Missed Tasks Attention Item
    if (tasksMissed > 0) {
      items.push(`${tasksMissed} task${tasksMissed > 1 ? 's were' : ' was'} missed or incomplete.`);
    }

    // 2. Weakest Life Area Attention Item
    if (weakestLifeArea && weakestLifeArea.isNeglected) {
      items.push(`${weakestLifeArea.name} received lower focus and needs attention.`);
    }

    // 3. Low Planner Accuracy
    if (plannerAccuracy < 70 && plannerAccuracy > 0) {
      items.push(`Planner completion was lower than target (${plannerAccuracy}%).`);
    }

    // 4. Low Focus Execution
    if (totalFocusMinutes === 0 && tasksPlanned > 0 && items.length < 3) {
      items.push(`No focus sessions recorded for today's planned tasks.`);
    }

    return items.slice(0, 3);
  },
};
