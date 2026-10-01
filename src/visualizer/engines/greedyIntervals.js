/**
 * Problem-Specific Simulation: Greedy Intervals & Scheduling
 * Simulates interval scheduling, meeting room allocation, and non-overlapping
 * interval selection by greedily sorting by finish times in O(N log N) time.
 */

export function simulateGreedyIntervals(customIntervals) {
  const defaultIntervals = [
    { start: 1, end: 3, label: 'M1 [1-3]' },
    { start: 2, end: 4, label: 'M2 [2-4]' },
    { start: 3, end: 5, label: 'M3 [3-5]' },
    { start: 0, end: 6, label: 'M4 [0-6]' },
    { start: 5, end: 7, label: 'M5 [5-7]' },
    { start: 8, end: 9, label: 'M6 [8-9]' }
  ];

  // Parse custom intervals if provided as numbers or objects
  let intervals = defaultIntervals;
  if (Array.isArray(customIntervals) && customIntervals.length >= 2) {
    if (typeof customIntervals[0] === 'object' && customIntervals[0].start !== undefined) {
      intervals = customIntervals;
    }
  }

  // Sort greedily by finish time (end)
  const sorted = [...intervals].sort((a, b) => a.end - b.end);
  const displayArray = sorted.map(it => `[${it.start}..${it.end}]`);

  const steps = [];
  const selectedIndices = [];
  const rejectedIndices = [];

  // Step 0: Initial Sorting
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Greedy Strategy: Sort all ${sorted.length} intervals by end time. Choosing the meeting that finishes earliest leaves maximum remaining time for subsequent meetings.`,
    pointers: [
      { name: 'earliest end', index: 0, color: 'emerald', position: 'top' }
    ],
    highlightIndices: [0],
    matchedIndices: [],
    dangerIndices: [],
    metrics: {
      'Total Intervals': sorted.length,
      'Strategy': 'Sort by finish time (end asc)',
      'Selected Count': 0,
      'Last End Time': '-'
    },
    array: [...displayArray],
    data: { array: [...displayArray] }
  });

  // Step 1: Pick the first interval
  selectedIndices.push(0);
  let lastEnd = sorted[0].end;

  steps.push({
    step: steps.length,
    phase: 'found',
    explanation: `Select first interval ${displayArray[0]}: Finishes earliest at time ${lastEnd}. Meeting scheduled.`,
    pointers: [
      { name: 'selected', index: 0, color: 'emerald', position: 'top' }
    ],
    highlightIndices: [0],
    matchedIndices: [...selectedIndices],
    dangerIndices: [],
    metrics: {
      'Selected Meeting': displayArray[0],
      'Last End Time': lastEnd,
      'Selected Count': 1,
      'Decision': 'Compatible (Earliest Finish)'
    },
    array: [...displayArray],
    data: { array: [...displayArray] }
  });

  // Step 2 to N: Iterate through remaining intervals
  for (let i = 1; i < sorted.length; i++) {
    const it = sorted[i];
    const isCompatible = it.start >= lastEnd;

    if (isCompatible) {
      selectedIndices.push(i);
      const prevEnd = lastEnd;
      lastEnd = it.end;

      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Interval ${displayArray[i]}: Start time ${it.start} >= last finish time ${prevEnd}. No conflict! Greedily ACCEPT and update last finish time to ${lastEnd}.`,
        pointers: [
          { name: 'accepted', index: i, color: 'emerald', position: 'top' }
        ],
        highlightIndices: [i],
        matchedIndices: [...selectedIndices],
        dangerIndices: [...rejectedIndices],
        metrics: {
          'Interval': displayArray[i],
          'Start Time': it.start,
          'Prev End': prevEnd,
          'Decision': `ACCEPTED (Start >= ${prevEnd})`
        },
        array: [...displayArray],
        data: { array: [...displayArray] }
      });
    } else {
      rejectedIndices.push(i);

      steps.push({
        step: steps.length,
        phase: 'reset',
        explanation: `Interval ${displayArray[i]}: Start time ${it.start} < last finish time ${lastEnd}. Conflict! Overlaps with previous meeting. Greedily REJECT.`,
        pointers: [
          { name: 'conflict', index: i, color: 'rose', position: 'top' }
        ],
        highlightIndices: [i],
        matchedIndices: [...selectedIndices],
        dangerIndices: [...rejectedIndices],
        metrics: {
          'Interval': displayArray[i],
          'Start Time': it.start,
          'Last End': lastEnd,
          'Decision': `REJECTED (Overlap: ${it.start} < ${lastEnd})`
        },
        array: [...displayArray],
        data: { array: [...displayArray] }
      });
    }
  }

  // Final Step: Completion
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Greedy Scheduling Complete! Selected ${selectedIndices.length} non-overlapping intervals out of ${sorted.length} total. Optimal schedule achieved in O(N log N) time.`,
    pointers: [],
    highlightIndices: [],
    matchedIndices: [...selectedIndices],
    dangerIndices: [...rejectedIndices],
    isComplete: true,
    metrics: {
      'Max Meetings': selectedIndices.length,
      'Rejected Conflicts': rejectedIndices.length,
      'Time Complexity': 'O(N log N)',
      'Space Complexity': 'O(1)'
    },
    array: [...displayArray],
    data: { array: [...displayArray] }
  });

  return steps;
}
