import { isStandalone, isIOS } from '../pwaUtils.js';

export function runPWAUtilsTests() {
  const results = [];

  const assert = (condition, name) => {
    if (condition) {
      results.push({ name, status: 'PASS' });
    } else {
      results.push({ name, status: 'FAIL' });
      console.error(`Test failed: ${name}`);
    }
  };

  // Test 1: isStandalone handles browser environment without crashing
  try {
    const res = isStandalone();
    assert(typeof res === 'boolean', 'isStandalone returns a boolean value');
  } catch (e) {
    assert(false, `isStandalone error: ${e.message}`);
  }

  // Test 2: isIOS handles browser environment without crashing
  try {
    const res = isIOS();
    assert(typeof res === 'boolean', 'isIOS returns a boolean value');
  } catch (e) {
    assert(false, `isIOS error: ${e.message}`);
  }

  return results;
}
