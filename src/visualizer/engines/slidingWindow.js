/**
 * Problem-Specific Simulation: Sliding Window
 * Demonstrates dynamic window expansion and contraction for substring/subarray problems.
 */

export function simulateSlidingWindow(nums = [2, 1, 5, 1, 3, 2], targetSum = 7) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let left = 0;
  let currentSum = 0;
  let maxLen = 0;
  let bestWindow = [0, 0];

  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start Sliding Window with targetSum <= ${targetSum}. Both left and right pointers initialize at index 0.`,
    pointers: [
      { name: 'L', index: 0, color: 'emerald', position: 'top' },
      { name: 'R', index: 0, color: 'amber', position: 'bottom' }
    ],
    highlightIndices: [0],
    matchedIndices: [],
    dangerIndices: [],
    window: [0, 0],
    metrics: { 'Target Max Sum': targetSum, 'Window Sum': 0, 'Max Length': 0, 'Window': '[0..0]' },
    array: [...nums],
    data: { array: [...nums] }
  });

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    // Right expansion step
    steps.push({
      step: steps.length,
      phase: 'expand',
      explanation: `Expand right boundary to index ${right} (added ${nums[right]}). Current window sum = ${currentSum}.`,
      pointers: [
        { name: 'L', index: left, color: 'emerald', position: 'top' },
        { name: 'R', index: right, color: 'amber', position: 'bottom' }
      ],
      highlightIndices: [right],
      matchedIndices: Array.from({ length: right - left + 1 }, (_, k) => left + k),
      dangerIndices: [],
      window: [left, right],
      metrics: { 'Window Sum': currentSum, 'Left': left, 'Right': right, 'Window Length': right - left + 1 },
      array: [...nums],
      data: { array: [...nums] }
    });

    // Shrink if sum exceeds target
    while (currentSum > targetSum && left <= right) {
      const removed = nums[left];
      currentSum -= removed;
      left++;

      steps.push({
        step: steps.length,
        phase: 'shrink',
        explanation: `Window sum exceeded target ${targetSum}! Shrinking left boundary: removed arr[${left - 1}] (${removed}). New left = ${left}, sum = ${currentSum}.`,
        pointers: [
          { name: 'L', index: left, color: 'emerald', position: 'top' },
          { name: 'R', index: right, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [left - 1],
        matchedIndices: Array.from({ length: Math.max(0, right - left + 1) }, (_, k) => left + k),
        dangerIndices: [left - 1],
        window: [left, right],
        metrics: { 'Window Sum': currentSum, 'Left': left, 'Right': right, 'Action': 'Shrank window' },
        array: [...nums],
        data: { array: [...nums] }
      });
    }

    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
      bestWindow = [left, right];
    }
  }

  // Complete step
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Sliding Window complete! Longest valid window has length ${maxLen} spanning [${bestWindow[0]}..${bestWindow[1]}]. Elements: [${nums.slice(bestWindow[0], bestWindow[1] + 1).join(', ')}].`,
    pointers: [
      { name: 'Best L', index: bestWindow[0], color: 'emerald', position: 'top' },
      { name: 'Best R', index: bestWindow[1], color: 'amber', position: 'bottom' }
    ],
    highlightIndices: [],
    matchedIndices: Array.from({ length: bestWindow[1] - bestWindow[0] + 1 }, (_, k) => bestWindow[0] + k),
    dangerIndices: [],
    window: [bestWindow[0], bestWindow[1]],
    isComplete: true,
    metrics: { 'Max Valid Length': maxLen, 'Best Window': `[${bestWindow[0]}..${bestWindow[1]}]`, 'Status': 'Complete' },
    array: [...nums],
    data: { array: [...nums] }
  });

  return steps;
}
