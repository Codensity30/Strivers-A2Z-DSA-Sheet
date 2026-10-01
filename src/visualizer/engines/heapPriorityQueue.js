/**
 * Problem-Specific Simulation: Binary Heap & Priority Queue Operations
 * Simulates Min-Heap insertion, parent-child relationship (parent = floor((i-1)/2)),
 * and Sift-Up / Heapify-Up bubbling in O(log N) time.
 */

export function simulateHeapPriorityQueue(initialArray, newElement = 5) {
  const heap = Array.isArray(initialArray) && initialArray.length >= 3
    ? initialArray.slice(0, 5)
    : [10, 15, 20, 17, 25];

  const valToInsert = typeof newElement === 'number' && !isNaN(newElement) ? newElement : 5;
  const steps = [];

  // Fixed coordinate layout for up to 6 nodes in complete binary tree
  const treeCoords = [
    { x: 200, y: 30 },  // 0: Root
    { x: 120, y: 90 },  // 1: Left child of 0
    { x: 280, y: 90 },  // 2: Right child of 0
    { x: 75, y: 155 },  // 3: Left child of 1
    { x: 155, y: 155 }, // 4: Right child of 1
    { x: 245, y: 155 }  // 5: Left child of 2
  ];

  const makeNodes = (arr, activeId = null) => {
    return arr.map((val, idx) => ({
      id: `node-${idx}`,
      val: String(val),
      x: treeCoords[idx]?.x || 200,
      y: treeCoords[idx]?.y || 100
    }));
  };

  const makeEdges = (arr) => {
    const edges = [];
    for (let i = 1; i < arr.length; i++) {
      const parent = Math.floor((i - 1) / 2);
      edges.push({ from: `node-${parent}`, to: `node-${i}` });
    }
    return edges;
  };

  // Step 0: Initial Valid Min-Heap
  let currentHeap = [...heap];
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Initial Min-Heap with ${currentHeap.length} elements: [${currentHeap.join(', ')}]. Root has minimum value (${currentHeap[0]}). Inserting new element ${valToInsert}.`,
    metrics: {
      'Heap Size': currentHeap.length,
      'Min Element': currentHeap[0],
      'Pending Insertion': valToInsert,
      'Array': `[${currentHeap.join(', ')}]`
    },
    data: {
      type: 'tree',
      nodes: makeNodes(currentHeap),
      edges: makeEdges(currentHeap),
      activeNode: 'node-0',
      visited: ['node-0'],
      queue: [...currentHeap]
    }
  });

  // Step 1: Insert at leaf position (index N)
  currentHeap.push(valToInsert);
  let currIdx = currentHeap.length - 1;

  steps.push({
    step: steps.length,
    phase: 'push',
    explanation: `Push ${valToInsert} to the end of the heap array (index ${currIdx}) as the next leaf node in complete binary tree structure.`,
    metrics: {
      'Heap Size': currentHeap.length,
      'Inserted Index': currIdx,
      'Action': 'Placed at next leaf',
      'Array': `[${currentHeap.join(', ')}]`
    },
    data: {
      type: 'tree',
      nodes: makeNodes(currentHeap),
      edges: makeEdges(currentHeap),
      activeNode: `node-${currIdx}`,
      visited: [`node-${currIdx}`],
      queue: [...currentHeap]
    }
  });

  // Step 2 & 3: Sift Up / Heapify Up
  while (currIdx > 0) {
    const parentIdx = Math.floor((currIdx - 1) / 2);
    const parentVal = currentHeap[parentIdx];
    const currVal = currentHeap[currIdx];

    // Comparison Step
    steps.push({
      step: steps.length,
      phase: 'compare',
      explanation: `Compare node ${currVal} (index ${currIdx}) with its parent ${parentVal} (index ${parentIdx}). For a min-heap, child must be >= parent (${currVal} < ${parentVal} ? ${currVal < parentVal ? 'VIOLATION' : 'OK'}).`,
      metrics: {
        'Child Index': currIdx,
        'Child Value': currVal,
        'Parent Index': parentIdx,
        'Parent Value': parentVal
      },
      data: {
        type: 'tree',
        nodes: makeNodes(currentHeap),
        edges: makeEdges(currentHeap),
        activeNode: `node-${currIdx}`,
        visited: [`node-${parentIdx}`, `node-${currIdx}`],
        queue: [...currentHeap]
      }
    });

    if (currVal < parentVal) {
      // Swap with parent
      currentHeap[currIdx] = parentVal;
      currentHeap[parentIdx] = currVal;

      steps.push({
        step: steps.length,
        phase: 'swap',
        explanation: `Sift Up: Swap child (${currVal}) with parent (${parentVal}). Element ${currVal} bubbles up closer to the root!`,
        metrics: {
          'Swapped': `${currVal} ↔ ${parentVal}`,
          'New Index': parentIdx,
          'Action': 'Heapify Up Swap',
          'Array': `[${currentHeap.join(', ')}]`
        },
        data: {
          type: 'tree',
          nodes: makeNodes(currentHeap),
          edges: makeEdges(currentHeap),
          activeNode: `node-${parentIdx}`,
          visited: [`node-${parentIdx}`],
          queue: [...currentHeap]
        }
      });

      currIdx = parentIdx;
    } else {
      break;
    }
  }

  // Step 4: Final Heap Restored
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Min-Heap property fully satisfied! Element ${valToInsert} reached its correct position. New minimum element is ${currentHeap[0]}. Total comparisons took O(log N) time.`,
    isComplete: true,
    metrics: {
      'Final Heap Size': currentHeap.length,
      'Root Minimum': currentHeap[0],
      'Time Complexity': 'O(log N)',
      'Array': `[${currentHeap.join(', ')}]`
    },
    data: {
      type: 'tree',
      nodes: makeNodes(currentHeap),
      edges: makeEdges(currentHeap),
      activeNode: 'node-0',
      visited: currentHeap.map((_, i) => `node-${i}`),
      queue: [...currentHeap]
    }
  });

  return steps;
}
