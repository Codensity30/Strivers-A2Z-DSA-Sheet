/**
 * Problem-Specific Simulation: Monotonic Stack (Next Greater Element)
 * Demonstrates LIFO stack operations (push, pop, top inspection) in O(N) time.
 */

export function simulateStackQueue(nums = [4, 5, 2, 25, 7, 8]) {
  if (!nums || nums.length === 0) return [];
  const steps = [];
  const n = nums.length;
  const nge = new Array(n).fill(-1);
  const stack = []; // will store values or indices

  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start Next Greater Element using a Monotonic Decreasing Stack. Initialized empty stack and result array filled with -1. We iterate from right to left (index ${n - 1} down to 0).`,
    pointers: [{ name: 'start', index: n - 1, color: 'indigo', position: 'bottom' }],
    highlightIndices: [n - 1],
    matchedIndices: [],
    dangerIndices: [],
    metrics: { 'Stack Size': 0, 'Current Index': n - 1, 'Status': 'Initializing' },
    array: [...nums],
    data: { array: [...nums], stack: [], result: [...nge] }
  });

  for (let i = n - 1; i >= 0; i--) {
    const val = nums[i];

    // Pop all elements <= current val
    while (stack.length > 0 && stack[stack.length - 1] <= val) {
      const popped = stack.pop();
      steps.push({
        step: steps.length,
        phase: 'pop',
        explanation: `At index ${i} (${val}): Top of stack is ${popped} <= ${val}. Popped ${popped} because ${val} will overshadow it for all elements to the left.`,
        pointers: [{ name: 'i', index: i, color: 'indigo', position: 'bottom' }],
        highlightIndices: [i],
        matchedIndices: [],
        dangerIndices: [i],
        metrics: { 'Current Val': val, 'Popped': popped, 'Stack': `[${stack.join(', ')}]` },
        array: [...nums],
        data: { array: [...nums], stack: [...stack], result: [...nge] }
      });
    }

    if (stack.length > 0) {
      nge[i] = stack[stack.length - 1];
    } else {
      nge[i] = -1;
    }

    stack.push(val);

    steps.push({
      step: steps.length,
      phase: 'push',
      explanation: `At index ${i} (${val}): Next greater element is ${nge[i] === -1 ? 'None (-1)' : nge[i]}. Pushed ${val} onto stack.`,
      pointers: [{ name: 'i', index: i, color: 'emerald', position: 'bottom' }],
      highlightIndices: [i],
      matchedIndices: nge[i] !== -1 ? [i] : [],
      dangerIndices: [],
      metrics: {
        'Current Val': val,
        'NGE': nge[i],
        'Stack Top': stack[stack.length - 1],
        'Stack': `[${stack.join(', ')}]`
      },
      array: [...nums],
      data: { array: [...nums], stack: [...stack], result: [...nge] }
    });
  }

  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Next Greater Element complete! Input: [${nums.join(', ')}]. Result: [${nge.join(', ')}].`,
    pointers: [],
    highlightIndices: [],
    matchedIndices: Array.from({ length: n }, (_, k) => k),
    dangerIndices: [],
    isComplete: true,
    metrics: { 'Final Result': `[${nge.join(', ')}]`, 'Status': 'Complete' },
    array: [...nums],
    data: { array: [...nums], stack: [...stack], result: [...nge] }
  });

  return steps;
}
