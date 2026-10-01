/**
 * Problem-Specific Simulation: Array Stepper
 * Simulates linear scan, element tracking (largest / current), and index stepping.
 */

export function simulateArrayStepper(nums) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let maxVal = nums[0];
  let maxIdx = 0;

  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Initialize array scan. Setting initial max = ${nums[0]} at index 0.`,
    pointers: [{ name: 'max', index: 0, color: 'emerald', position: 'top' }],
    highlightIndices: [0],
    matchedIndices: [0],
    dangerIndices: [],
    currentIndex: 0,
    maxVal,
    maxIdx,
    metrics: { 'Current Max': maxVal, 'Max Index': 0, 'Status': 'Scanning' },
    array: [...nums],
    data: { array: [...nums] }
  });

  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    let updated = false;

    if (val > maxVal) {
      maxVal = val;
      maxIdx = i;
      updated = true;
    }

    steps.push({
      step: steps.length,
      phase: updated ? 'found' : 'compare',
      explanation: updated
        ? `At index ${i} (${val}): New maximum found! Updated max = ${maxVal} at index ${i}.`
        : `At index ${i} (${val}): ${val} <= current max (${maxVal}). Continuing scan.`,
      pointers: [
        { name: 'max', index: maxIdx, color: 'emerald', position: 'top' },
        { name: 'i', index: i, color: 'indigo', position: 'bottom' }
      ],
      highlightIndices: [i],
      matchedIndices: [maxIdx],
      dangerIndices: updated ? [] : [i],
      currentIndex: i,
      maxVal,
      maxIdx,
      metrics: { 'Current Element': val, 'Current Max': maxVal, 'Max Index': maxIdx },
      array: [...nums],
      data: { array: [...nums] }
    });
  }

  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Scan complete! Maximum element in array is ${maxVal} at index ${maxIdx}.`,
    pointers: [{ name: 'MAX', index: maxIdx, color: 'emerald', position: 'top' }],
    highlightIndices: [],
    matchedIndices: [maxIdx],
    dangerIndices: [],
    currentIndex: -1,
    maxVal,
    maxIdx,
    isComplete: true,
    metrics: { 'Final Max': maxVal, 'Found at Index': maxIdx, 'Status': 'Complete' },
    array: [...nums],
    data: { array: [...nums] }
  });

  return steps;
}
