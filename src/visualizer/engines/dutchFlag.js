/**
 * Problem-Specific Simulation: Dutch National Flag Algorithm (Sort 0, 1, 2)
 * Sorts an array containing 0s, 1s, and 2s in one pass in O(N) time and O(1) space.
 */

export function simulateDutchFlag(nums) {
  if (!nums || nums.length === 0) return [];
  const arr = [...nums];
  const steps = [];

  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Initialize Dutch National Flag 3-pointer partition: low = 0 (0s zone boundary), mid = 0 (scanner), high = ${high} (2s zone boundary).`,
    pointers: [
      { name: 'low', index: low, color: 'emerald', position: 'top' },
      { name: 'mid', index: mid, color: 'cyan', position: 'top' },
      { name: 'high', index: high, color: 'amber', position: 'bottom' }
    ],
    highlightIndices: [mid],
    matchedIndices: [],
    dangerIndices: [],
    low,
    mid,
    high,
    metrics: { 'low': low, 'mid': mid, 'high': high, 'Current Val': arr[mid], 'Action': 'Start' },
    array: [...arr],
    data: { array: [...arr] }
  });

  while (mid <= high) {
    const val = arr[mid];

    if (val === 0) {
      // Swap arr[low] and arr[mid]
      const temp = arr[low];
      arr[low] = arr[mid];
      arr[mid] = temp;

      steps.push({
        step: steps.length,
        phase: 'swap',
        explanation: `arr[mid] is 0 at index ${mid}. Swap arr[low (${low})] with arr[mid (${mid})]. Elements swapped: ${temp} and ${arr[low]}. Increment low -> ${low + 1}, mid -> ${mid + 1}.`,
        pointers: [
          { name: 'low', index: low, color: 'emerald', position: 'top' },
          { name: 'mid', index: mid, color: 'cyan', position: 'top' },
          { name: 'high', index: high, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [low, mid],
        matchedIndices: Array.from({ length: low + 1 }, (_, k) => k),
        dangerIndices: [],
        low: low + 1,
        mid: mid + 1,
        high,
        metrics: { 'low': low, 'mid': mid, 'high': high, 'Swapped': `index ${low} <-> ${mid}`, 'Value': 0 },
        array: [...arr],
        data: { array: [...arr] }
      });

      low++;
      mid++;
    } else if (val === 1) {
      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `arr[mid] is 1 at index ${mid}. 1 belongs in the middle partition. Leave it in place and advance mid -> ${mid + 1}.`,
        pointers: [
          { name: 'low', index: low, color: 'emerald', position: 'top' },
          { name: 'mid', index: mid, color: 'cyan', position: 'top' },
          { name: 'high', index: high, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [mid],
        matchedIndices: Array.from({ length: low }, (_, k) => k),
        dangerIndices: [],
        low,
        mid: mid + 1,
        high,
        metrics: { 'low': low, 'mid': mid, 'high': high, 'Value': 1, 'Action': 'Advance mid' },
        array: [...arr],
        data: { array: [...arr] }
      });
      mid++;
    } else {
      // val === 2: Swap arr[mid] and arr[high]
      const temp = arr[high];
      arr[high] = arr[mid];
      arr[mid] = temp;

      steps.push({
        step: steps.length,
        phase: 'swap',
        explanation: `arr[mid] is 2 at index ${mid}. Swap arr[mid (${mid})] with arr[high (${high})]. Decrement high -> ${high - 1}. (Keep mid same to inspect swapped element).`,
        pointers: [
          { name: 'low', index: low, color: 'emerald', position: 'top' },
          { name: 'mid', index: mid, color: 'cyan', position: 'top' },
          { name: 'high', index: high, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [mid, high],
        matchedIndices: Array.from({ length: arr.length - high }, (_, k) => high + k),
        dangerIndices: [],
        low,
        mid,
        high: high - 1,
        metrics: { 'low': low, 'mid': mid, 'high': high, 'Swapped': `index ${mid} <-> ${high}`, 'Value': 2 },
        array: [...arr],
        data: { array: [...arr] }
      });
      high--;
    }
  }

  // Complete step
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Array fully partitioned and sorted: 0s [0..${low - 1}], 1s [${low}..${high}], 2s [${high + 1}..${arr.length - 1}]. Sorted array: [${arr.join(', ')}].`,
    pointers: [],
    highlightIndices: [],
    matchedIndices: Array.from({ length: arr.length }, (_, k) => k),
    dangerIndices: [],
    low,
    mid,
    high,
    isComplete: true,
    metrics: { 'Status': 'Sorted!', 'low': low, 'mid': mid, 'high': high },
    array: [...arr],
    data: { array: [...arr] }
  });

  return steps;
}
