/**
 * Unit Tests for reviewScoreService & Review Engine Core Logic
 */

import { reviewScoreService } from '../reviewScoreService.js';

export function runReviewScoreTests() {
  const results = [];

  const assert = (condition, testName) => {
    if (condition) {
      results.push({ name: testName, status: 'PASS' });
    } else {
      results.push({ name: testName, status: 'FAIL' });
      console.error(`TEST FAILED: ${testName}`);
    }
  };

  // Test 1: 100% across all metrics should yield score 100 and "Excellent Day"
  const perfectScore = reviewScoreService.calculateScore({
    taskCompletionRate: 100,
    plannerAccuracy: 100,
    focusExecutionRate: 100,
    streakRatio: 100,
  });
  assert(perfectScore.score === 100, 'Perfect metrics should equal 100 score');
  assert(perfectScore.label === 'Excellent Day', '100 score label should be Excellent Day');

  // Test 2: 80% tasks, 80% planner, 80% focus, 80% streak should yield score 80 and "Strong Day"
  const strongScore = reviewScoreService.calculateScore({
    taskCompletionRate: 80,
    plannerAccuracy: 80,
    focusExecutionRate: 80,
    streakRatio: 80,
  });
  assert(strongScore.score === 80, '80% metrics should equal 80 score');
  assert(strongScore.label === 'Strong Day', '80 score label should be Strong Day');

  // Test 3: Calm score label boundaries
  assert(reviewScoreService.getCalmLabel(95) === 'Excellent Day', 'Score 95 label');
  assert(reviewScoreService.getCalmLabel(85) === 'Strong Day', 'Score 85 label');
  assert(reviewScoreService.getCalmLabel(65) === 'Steady Day', 'Score 65 label');
  assert(reviewScoreService.getCalmLabel(45) === 'Needs Attention', 'Score 45 label');
  assert(reviewScoreService.getCalmLabel(20) === 'Reset Tomorrow', 'Score 20 label');

  // Test 4: Weighted calculation check (50% tasks, 20% planner, 20% focus, 10% streak)
  // 100% tasks (50) + 0% others (0) = 50 score -> Needs Attention / Steady Day boundary
  const taskOnly = reviewScoreService.calculateScore({
    taskCompletionRate: 100,
    plannerAccuracy: 0,
    focusExecutionRate: 0,
    streakRatio: 0,
  });
  assert(taskOnly.score === 50, '100% task completion alone yields 50 score');

  return results;
}

// Auto-run if executed directly
if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
  runReviewScoreTests();
}
