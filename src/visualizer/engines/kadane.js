/**
 * Problem-Specific Simulation: Kadane's Algorithm (Maximum Subarray Sum)
 * Computes contiguous subarray with largest sum in O(N) time and O(1) space.
 */

export function simulateKadane(nums) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let maxSum = nums[0];
  let currentSum = 0;
  let start = 0;
  let maxStart = 0;
  let maxEnd = 0;

  // Step 0: Initial state
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Initialize Kadane's algorithm: currentSum = 0, maxSum = ${nums[0]}. Scanning begins at index 0.`,
    pointers: [{ name: 'start', index: 0, color: 'emerald', position: 'top' }],
    highlightIndices: [0],
    matchedIndices: [],
    dangerIndices: [],
    window: [0, 0],
    maxWindow: [0, 0],
    maxSum: nums[0],
    currentSum: 0,
    currentIndex: -1,
    metrics: { 'Current Sum': 0, 'Max Sum': nums[0], 'Active Window': '[0..0]' },
    array: [...nums],
    data: { array: [...nums] }
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    currentSum += val;

    let newMaxOccurred = false;

    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxStart = start;
      maxEnd = i;
      newMaxOccurred = true;
    }

    steps.push({
      step: steps.length,
      phase: newMaxOccurred ? 'found' : 'compare',
      explanation: newMaxOccurred
        ? `At index ${i} (${val}): currentSum is now ${currentSum}, exceeding previous max! Updated maxSum = ${maxSum}, max window = [${maxStart}..${maxEnd}].`
        : `At index ${i} (${val}): currentSum = ${currentSum}. (maxSum remains ${maxSum})`,
      pointers: [
        { name: 'i', index: i, color: 'indigo', position: 'bottom' },
        { name: 'start', index: start, color: 'emerald', position: 'top' }
      ],
      highlightIndices: [i],
      matchedIndices: newMaxOccurred ? Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k) : [],
      dangerIndices: [],
      window: [start, i],
      maxWindow: [maxStart, maxEnd],
      maxSum,
      currentSum,
      currentIndex: i,
      currentVal: val,
      metrics: {
        'Current Val': val,
        'Current Sum': currentSum,
        'Max Sum': maxSum,
        'Max Window': `[${maxStart}..${maxEnd}]`
      },
      array: [...nums],
      data: { array: [...nums] }
    });

    if (currentSum < 0) {
      const prevVal = currentSum;
      currentSum = 0;
      start = i + 1;

      steps.push({
        step: steps.length,
        phase: 'reset',
        explanation: `currentSum dropped below zero (${prevVal} < 0). A negative running sum will only hurt subsequent subarrays, so reset currentSum to 0 and shift start pointer to index ${start}.`,
        pointers: [
          { name: 'reset', index: i, color: 'rose', position: 'bottom' },
          ...(start < nums.length ? [{ name: 'next start', index: start, color: 'emerald', position: 'top' }] : [])
        ],
        highlightIndices: [],
        matchedIndices: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
        dangerIndices: [i],
        window: [start, Math.min(start, nums.length - 1)],
        maxWindow: [maxStart, maxEnd],
        maxSum,
        currentSum: 0,
        currentIndex: i,
        currentVal: val,
        metrics: {
          'Current Val': val,
          'Current Sum': 'Reset to 0',
          'Max Sum': maxSum,
          'Next Start': start < nums.length ? start : 'End'
        },
        array: [...nums],
        data: { array: [...nums] }
      });
    }
  }

  // Final step
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Algorithm Complete! Maximum subarray sum is ${maxSum} spanning indices [${maxStart}..${maxEnd}] (subarray elements: [${nums.slice(maxStart, maxEnd + 1).join(', ')}]).`,
    pointers: [
      { name: 'maxStart', index: maxStart, color: 'emerald', position: 'top' },
      { name: 'maxEnd', index: maxEnd, color: 'amber', position: 'bottom' }
    ],
    highlightIndices: [],
    matchedIndices: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
    dangerIndices: [],
    window: [maxStart, maxEnd],
    maxWindow: [maxStart, maxEnd],
    maxSum,
    currentSum,
    currentIndex: -1,
    isComplete: true,
    metrics: {
      'Final Max Sum': maxSum,
      'Best Subarray': `[${nums.slice(maxStart, maxEnd + 1).join(', ')}]`,
      'Range': `[${maxStart}..${maxEnd}]`
    },
    array: [...nums],
    data: { array: [...nums] }
  });

  return steps;
}
