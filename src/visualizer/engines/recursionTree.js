/**
 * Problem-Specific Simulation: Recursion Decision Tree
 * Simulates recursion and backtracking (e.g. Subsets / Combination Sum)
 * displaying recursion tree hierarchy, call stack, pick/don't-pick branches, and backtrack transitions.
 */

export function simulateRecursionTree(elements) {
  const nums = Array.isArray(elements) && elements.length > 0
    ? elements.slice(0, 3)
    : [1, 2, 3];

  const steps = [];

  // Pre-generate complete binary decision tree layout for nums (up to 3 items = 2^3 = 8 leaves, 15 nodes)
  const nodes = [
    { id: 'root', val: '[]', x: 200, y: 25 },
    // Level 1: Choice on nums[0] (e.g. 1)
    { id: 'L1_P', val: `[${nums[0]}]`, x: 100, y: 80 },
    { id: 'L1_S', val: '[]', x: 300, y: 80 },
    // Level 2: Choice on nums[1] (e.g. 2)
    { id: 'L2_PP', val: `[${nums[0]},${nums[1]}]`, x: 50, y: 140 },
    { id: 'L2_PS', val: `[${nums[0]}]`, x: 150, y: 140 },
    { id: 'L2_SP', val: `[${nums[1]}]`, x: 250, y: 140 },
    { id: 'L2_SS', val: '[]', x: 350, y: 140 }
  ];

  const edges = [
    { from: 'root', to: 'L1_P' },
    { from: 'root', to: 'L1_S' },
    { from: 'L1_P', to: 'L2_PP' },
    { from: 'L1_P', to: 'L2_PS' },
    { from: 'L1_S', to: 'L2_SP' },
    { from: 'L1_S', to: 'L2_SS' }
  ];

  const visited = [];
  const collectedSubsets = [];

  // Step 0: Init root
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Initialize Recursion Tree for generating subsets of [${nums.join(', ')}]. Start at Root with empty subset []. At each level, choose to either PICK or SKIP the next element.`,
    pointers: [],
    highlightIndices: [],
    matchedIndices: [],
    dangerIndices: [],
    metrics: {
      'Current Level': 0,
      'Active Branch': 'Root []',
      'Action': 'Begin DFS Exploration',
      'Subsets Found': 0
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'root',
      visited: ['root'],
      queue: []
    }
  });

  // Step 1: Branch Left -> Pick nums[0]
  visited.push('root', 'L1_P');
  steps.push({
    step: steps.length,
    phase: 'expand',
    explanation: `Level 0: Choose to PICK element ${nums[0]}. Push ${nums[0]} onto call stack. Current subset becomes [${nums[0]}].`,
    metrics: {
      'Current Level': 1,
      'Decision': `PICK ${nums[0]}`,
      'Call Stack': `[${nums[0]}]`,
      'Subsets Found': 0
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'L1_P',
      visited: [...visited],
      queue: [...collectedSubsets]
    }
  });

  // Step 2: Branch Left-Left -> Pick nums[1]
  visited.push('L2_PP');
  collectedSubsets.push(`[${nums[0]},${nums[1]}]`);
  steps.push({
    step: steps.length,
    phase: 'found',
    explanation: `Level 1: Choose to PICK element ${nums[1]}. Reached base leaf: Valid subset [${nums[0]}, ${nums[1]}] collected!`,
    metrics: {
      'Current Level': 2,
      'Decision': `PICK ${nums[1]}`,
      'Collected Subset': `[${nums[0]}, ${nums[1]}]`,
      'Total Found': collectedSubsets.length
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'L2_PP',
      visited: [...visited],
      queue: [...collectedSubsets]
    }
  });

  // Step 3: Backtrack up to L1_P, then branch right to Skip nums[1]
  visited.push('L2_PS');
  collectedSubsets.push(`[${nums[0]}]`);
  steps.push({
    step: steps.length,
    phase: 'shrink',
    explanation: `Backtrack to Level 1. Now choose to SKIP element ${nums[1]}. Pop ${nums[1]} from path. Leaf reached: Valid subset [${nums[0]}] collected!`,
    metrics: {
      'Current Level': 2,
      'Decision': `SKIP ${nums[1]}`,
      'Collected Subset': `[${nums[0]}]`,
      'Total Found': collectedSubsets.length
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'L2_PS',
      visited: [...visited],
      queue: [...collectedSubsets]
    }
  });

  // Step 4: Backtrack to Root, then branch Right -> Skip nums[0]
  visited.push('L1_S');
  steps.push({
    step: steps.length,
    phase: 'expand',
    explanation: `Backtrack completely up to Root []. Now explore the right branch: Choose to SKIP element ${nums[0]}.`,
    metrics: {
      'Current Level': 1,
      'Decision': `SKIP ${nums[0]}`,
      'Call Stack': '[]',
      'Total Found': collectedSubsets.length
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'L1_S',
      visited: [...visited],
      queue: [...collectedSubsets]
    }
  });

  // Step 5: Branch Right-Left -> Pick nums[1]
  visited.push('L2_SP');
  collectedSubsets.push(`[${nums[1]}]`);
  steps.push({
    step: steps.length,
    phase: 'found',
    explanation: `Level 1: Choose to PICK element ${nums[1]}. Leaf reached: Valid subset [${nums[1]}] collected!`,
    metrics: {
      'Current Level': 2,
      'Decision': `PICK ${nums[1]}`,
      'Collected Subset': `[${nums[1]}]`,
      'Total Found': collectedSubsets.length
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'L2_SP',
      visited: [...visited],
      queue: [...collectedSubsets]
    }
  });

  // Step 6: Branch Right-Right -> Skip nums[1]
  visited.push('L2_SS');
  collectedSubsets.push('[]');
  steps.push({
    step: steps.length,
    phase: 'found',
    explanation: `Level 1: Choose to SKIP element ${nums[1]}. Leaf reached: Empty subset [] collected!`,
    metrics: {
      'Current Level': 2,
      'Decision': `SKIP ${nums[1]}`,
      'Collected Subset': '[]',
      'Total Found': collectedSubsets.length
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'L2_SS',
      visited: [...visited],
      queue: [...collectedSubsets]
    }
  });

  // Step 7: Completed DFS Traversal
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Recursion & Backtracking Complete! Explored all 2^N branch possibilities. All subsets generated: ${collectedSubsets.join(', ')}.`,
    isComplete: true,
    metrics: {
      'Total Subsets': collectedSubsets.length,
      'Time Complexity': 'O(2^N)',
      'Auxiliary Space': 'O(N) Call Stack',
      'Result': collectedSubsets.join(' | ')
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: null,
      visited: [...visited],
      queue: [...collectedSubsets]
    }
  });

  return steps;
}
