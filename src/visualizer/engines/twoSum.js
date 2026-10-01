/**
 * Problem-Specific Simulation: Two Sum
 * Finds two indices whose elements add up to the given target using Hash Map lookup.
 */

export function simulateTwoSum(nums, target) {
  if (!nums || nums.length === 0) return [];
  const steps = [];
  const seenMap = new Map(); // val -> index

  // Step 0: Initial state
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start Two Sum for target = ${target}. Initialized empty hash map to store visited elements and their indices.`,
    pointers: [{ name: 'i', index: 0, color: 'indigo', position: 'bottom' }],
    highlightIndices: [0],
    matchedIndices: [],
    dangerIndices: [],
    metrics: { 'Target': target, 'Hash Map': '{}', 'Status': 'Scanning' },
    array: [...nums],
    data: { array: [...nums], map: {} }
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    const complement = target - val;

    if (seenMap.has(complement)) {
      const matchIndex = seenMap.get(complement);
      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Pair Found! At index ${i} (value ${val}): Complement ${target} - ${val} = ${complement} was previously found at index ${matchIndex}! Indices [${matchIndex}, ${i}] sum to ${target}.`,
        pointers: [
          { name: 'Pair 1', index: matchIndex, color: 'emerald', position: 'top' },
          { name: 'Pair 2', index: i, color: 'emerald', position: 'bottom' }
        ],
        highlightIndices: [matchIndex, i],
        matchedIndices: [matchIndex, i],
        dangerIndices: [],
        found: true,
        resultIndices: [matchIndex, i],
        metrics: {
          'Target': target,
          'Current': `${val} (index ${i})`,
          'Complement': `${complement} (index ${matchIndex})`,
          'Result': `[${matchIndex}, ${i}]`
        },
        array: [...nums],
        data: { array: [...nums], map: Object.fromEntries(seenMap) }
      });
      return steps;
    }

    seenMap.set(val, i);

    steps.push({
      step: steps.length,
      phase: 'compare',
      explanation: `At index ${i} (${val}): Complement is ${target} - ${val} = ${complement}. Not yet in map. Adding ${val} -> index ${i} to map.`,
      pointers: [{ name: 'i', index: i, color: 'indigo', position: 'bottom' }],
      highlightIndices: [i],
      matchedIndices: [],
      dangerIndices: [],
      found: false,
      metrics: {
        'Current Val': val,
        'Needed Complement': complement,
        'Map Size': seenMap.size,
        'Status': 'Checking next'
      },
      array: [...nums],
      data: { array: [...nums], map: Object.fromEntries(seenMap) }
    });
  }

  // Not found
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Scan finished: No two elements in the array sum up to target ${target}.`,
    pointers: [],
    highlightIndices: [],
    matchedIndices: [],
    dangerIndices: [],
    found: false,
    resultIndices: [],
    metrics: { 'Target': target, 'Status': 'No Pair Found' },
    array: [...nums],
    data: { array: [...nums], map: Object.fromEntries(seenMap) }
  });

  return steps;
}
