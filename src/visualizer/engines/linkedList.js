/**
 * Problem-Specific Simulation: Linked List (Floyd's Cycle Detection & Pointer Movement)
 * Demonstrates Tortoise & Hare algorithm (slow advances 1 step, fast advances 2 steps).
 */

export function simulateLinkedList(values = [3, 2, 0, -4], cyclePos = 1) {
  const steps = [];
  const nodes = values.map((val, idx) => ({
    id: `node-${idx}`,
    val,
    index: idx,
    nextIndex: idx === values.length - 1 ? (cyclePos >= 0 ? cyclePos : null) : idx + 1
  }));

  let slow = 0;
  let fast = 0;
  let stepCount = 0;
  let cycleDetected = false;

  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start Floyd's Cycle Detection (Tortoise & Hare). Slow pointer moves 1 step per cycle, Fast pointer moves 2 steps. Both initialize at Head (Node ${values[0]} at index 0). Cycle loops back to index ${cyclePos >= 0 ? cyclePos : 'None'}.`,
    pointers: [
      { name: 'slow', index: slow, color: 'emerald', position: 'top' },
      { name: 'fast', index: fast, color: 'amber', position: 'bottom' }
    ],
    highlightIndices: [slow],
    matchedIndices: [],
    dangerIndices: [],
    metrics: { 'Slow Pointer': `Node ${values[slow]} (idx ${slow})`, 'Fast Pointer': `Node ${values[fast]} (idx ${fast})`, 'Cycle Found': 'No' },
    data: {
      type: 'linked-list',
      nodes,
      slow,
      fast,
      cyclePos
    }
  });

  const maxSteps = 15;
  while (stepCount < maxSteps) {
    stepCount++;

    const nextSlow = nodes[slow]?.nextIndex;
    const nextFastIntermediate = nodes[fast]?.nextIndex;
    const nextFast = nextFastIntermediate !== null ? nodes[nextFastIntermediate]?.nextIndex : null;

    if (nextSlow === null || nextFastIntermediate === null || nextFast === null) {
      steps.push({
        step: steps.length,
        phase: 'complete',
        explanation: `Fast pointer reached the end of the list (NULL pointer). Therefore, no cycle exists in this linked list.`,
        pointers: [{ name: 'end', index: fast, color: 'rose', position: 'bottom' }],
        highlightIndices: [],
        matchedIndices: [],
        dangerIndices: [],
        isComplete: true,
        metrics: { 'Status': 'No Cycle (Reached NULL)', 'Total Iterations': stepCount },
        data: { type: 'linked-list', nodes, slow, fast, cyclePos }
      });
      return steps;
    }

    slow = nextSlow;
    fast = nextFast;

    if (slow === fast) {
      cycleDetected = true;
      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Cycle Detected! Both Slow and Fast pointers collided at Node ${values[slow]} (index ${slow}). According to Floyd's Theorem, this confirms a loop in O(N) time and O(1) space!`,
        pointers: [
          { name: 'COLLISION', index: slow, color: 'rose', position: 'top' },
          { name: 'slow & fast', index: slow, color: 'emerald', position: 'bottom' }
        ],
        highlightIndices: [slow],
        matchedIndices: [slow],
        dangerIndices: [],
        isComplete: true,
        metrics: { 'Status': 'Cycle Detected!', 'Collision Node': `Val ${values[slow]} at idx ${slow}`, 'Iterations': stepCount },
        data: { type: 'linked-list', nodes, slow, fast, cyclePos, collision: slow }
      });
      break;
    } else {
      steps.push({
        step: steps.length,
        phase: 'visit',
        explanation: `Step ${stepCount}: Slow advanced 1 node to index ${slow} (${values[slow]}). Fast advanced 2 nodes to index ${fast} (${values[fast]}).`,
        pointers: [
          { name: 'slow', index: slow, color: 'emerald', position: 'top' },
          { name: 'fast', index: fast, color: 'amber', position: 'bottom' }
        ],
        highlightIndices: [slow, fast],
        matchedIndices: [],
        dangerIndices: [],
        metrics: {
          'Slow': `Node ${values[slow]} [idx ${slow}]`,
          'Fast': `Node ${values[fast]} [idx ${fast}]`,
          'Cycle Detected': 'False'
        },
        data: { type: 'linked-list', nodes, slow, fast, cyclePos }
      });
    }
  }

  return steps;
}
