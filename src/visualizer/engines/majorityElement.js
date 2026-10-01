/**
 * Problem-Specific Simulation: Majority Element (Boyer-Moore Voting Algorithm)
 * Finds the element that appears > n/2 times in O(N) time and O(1) space.
 */

export function simulateMajorityElement(nums) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let candidate = null;
  let count = 0;

  // Initial step
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start Boyer-Moore Voting: candidate = null, count = 0. Scanning begins.`,
    pointers: [{ name: 'scan', index: 0, color: 'indigo', position: 'bottom' }],
    highlightIndices: [0],
    matchedIndices: [],
    dangerIndices: [],
    candidate: null,
    count: 0,
    metrics: { 'Candidate': 'None', 'Count': 0, 'Index': 0, 'Status': 'Initializing' },
    array: [...nums],
    data: { array: [...nums] }
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];

    if (count === 0) {
      candidate = val;
      count = 1;
      steps.push({
        step: steps.length,
        phase: 'swap',
        explanation: `At index ${i} (${val}): Count was 0. New candidate chosen: candidate = ${candidate}, count reset to 1.`,
        pointers: [
          { name: `cand: ${candidate}`, index: i, color: 'emerald', position: 'top' },
          { name: 'i', index: i, color: 'indigo', position: 'bottom' }
        ],
        highlightIndices: [i],
        matchedIndices: [i],
        dangerIndices: [],
        candidate,
        count,
        currentIndex: i,
        metrics: { 'Candidate': candidate, 'Count': count, 'Action': 'Elected new candidate' },
        array: [...nums],
        data: { array: [...nums] }
      });
    } else if (val === candidate) {
      count++;
      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `At index ${i} (${val}): Matches current candidate ${candidate}! Incremented count to ${count}.`,
        pointers: [
          { name: `cand: ${candidate}`, index: i, color: 'emerald', position: 'top' },
          { name: 'i', index: i, color: 'indigo', position: 'bottom' }
        ],
        highlightIndices: [i],
        matchedIndices: [i],
        dangerIndices: [],
        candidate,
        count,
        currentIndex: i,
        metrics: { 'Candidate': candidate, 'Count': count, 'Action': 'Vote matched (+1)' },
        array: [...nums],
        data: { array: [...nums] }
      });
    } else {
      count--;
      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `At index ${i} (${val}): Differs from candidate ${candidate}! Decremented count to ${count}.`,
        pointers: [
          { name: 'diff', index: i, color: 'rose', position: 'top' },
          { name: 'i', index: i, color: 'indigo', position: 'bottom' }
        ],
        highlightIndices: [i],
        matchedIndices: [],
        dangerIndices: [i],
        candidate,
        count,
        currentIndex: i,
        metrics: { 'Candidate': candidate, 'Count': count, 'Action': 'Opposing vote (-1)' },
        array: [...nums],
        data: { array: [...nums] }
      });
    }
  }

  // Final confirmation step
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Algorithm Complete! The majority element is ${candidate} (survived with final count = ${count}).`,
    pointers: [{ name: 'MAJORITY', index: nums.lastIndexOf(candidate), color: 'emerald', position: 'top' }],
    highlightIndices: [],
    matchedIndices: nums.map((v, idx) => (v === candidate ? idx : -1)).filter(idx => idx !== -1),
    dangerIndices: [],
    candidate,
    count,
    isComplete: true,
    metrics: { 'Winner Candidate': candidate, 'Final Lead Count': count, 'Status': 'Confirmed' },
    array: [...nums],
    data: { array: [...nums] }
  });

  return steps;
}
