/**
 * Problem-Specific Simulation: Binary Search
 * Iteratively halves the search space in a sorted array in O(log N) time and O(1) space.
 */

export function simulateBinarySearch(nums, target) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let low = 0;
  let high = nums.length - 1;
  let found = false;
  let foundIndex = -1;

  // Initial step
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start Binary Search for target = ${target} across search boundary [${low}..${high}]. Array length = ${nums.length}.`,
    pointers: [
      { name: 'low', index: low, color: 'emerald', position: 'top' },
      { name: 'high', index: high, color: 'amber', position: 'bottom' }
    ],
    highlightIndices: [],
    matchedIndices: [],
    dangerIndices: [],
    low,
    high,
    mid: -1,
    target,
    found: false,
    metrics: { 'Target': target, 'Low': low, 'High': high, 'Mid': 'N/A', 'Status': 'Searching' },
    array: [...nums],
    data: { array: [...nums], activeRange: [low, high] }
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];

    // Determine discarded indices
    const discarded = [];
    for (let k = 0; k < low; k++) discarded.push(k);
    for (let k = high + 1; k < nums.length; k++) discarded.push(k);

    if (midVal === target) {
      found = true;
      foundIndex = mid;
      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Target Found! At mid index ${mid}, arr[${mid}] == ${midVal} which matches target ${target}.`,
        pointers: [
          { name: 'FOUND', index: mid, color: 'emerald', position: 'top' },
          { name: 'low', index: low, color: 'indigo', position: 'bottom' },
          { name: 'high', index: high, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [mid],
        matchedIndices: [mid],
        dangerIndices: discarded,
        low,
        high,
        mid,
        target,
        found: true,
        metrics: { 'Target': target, 'Mid Index': mid, 'arr[mid]': midVal, 'Status': 'Match Found!' },
        array: [...nums],
        data: { array: [...nums], activeRange: [low, high] }
      });
      break;
    }

    if (midVal < target) {
      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `At mid index ${mid}, arr[${mid}] = ${midVal} < target (${target}). Since array is sorted, target must be in the right half. Eliminating range [${low}..${mid}] and moving low = ${mid + 1}.`,
        pointers: [
          { name: 'mid', index: mid, color: 'cyan', position: 'top' },
          { name: 'low', index: low, color: 'emerald', position: 'bottom' },
          { name: 'high', index: high, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [mid],
        matchedIndices: [],
        dangerIndices: [...discarded, ...Array.from({ length: mid - low + 1 }, (_, k) => low + k)],
        low,
        high,
        mid,
        target,
        found: false,
        metrics: { 'Target': target, 'Mid Index': mid, 'arr[mid]': midVal, 'Comparison': `${midVal} < ${target}`, 'Action': 'Shift low to right' },
        array: [...nums],
        data: { array: [...nums], activeRange: [low, high] }
      });
      low = mid + 1;
    } else {
      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `At mid index ${mid}, arr[${mid}] = ${midVal} > target (${target}). Target must be in the left half. Eliminating range [${mid}..${high}] and moving high = ${mid - 1}.`,
        pointers: [
          { name: 'mid', index: mid, color: 'cyan', position: 'top' },
          { name: 'low', index: low, color: 'emerald', position: 'bottom' },
          { name: 'high', index: high, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [mid],
        matchedIndices: [],
        dangerIndices: [...discarded, ...Array.from({ length: high - mid + 1 }, (_, k) => mid + k)],
        low,
        high,
        mid,
        target,
        found: false,
        metrics: { 'Target': target, 'Mid Index': mid, 'arr[mid]': midVal, 'Comparison': `${midVal} > ${target}`, 'Action': 'Shift high to left' },
        array: [...nums],
        data: { array: [...nums], activeRange: [low, high] }
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      step: steps.length,
      phase: 'complete',
      explanation: `Binary search concluded: low (${low}) > high (${high}). Target element ${target} does not exist in the array.`,
      pointers: [],
      highlightIndices: [],
      matchedIndices: [],
      dangerIndices: Array.from({ length: nums.length }, (_, k) => k),
      low,
      high,
      mid: -1,
      target,
      found: false,
      metrics: { 'Target': target, 'Search Status': 'Not Found (-1)', 'Condition': `low (${low}) > high (${high})` },
      array: [...nums],
      data: { array: [...nums], activeRange: [-1, -1] }
    });
  }

  return steps;
}
