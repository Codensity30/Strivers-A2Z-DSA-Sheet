/**
 * Problem-Specific Simulation: Binary Search Tree (BST) Search & Traversal
 * Simulates BST property (left < root < right), directional branch decisions,
 * and O(log N) target search in a Binary Search Tree.
 */

export function simulateBinarySearchTree(target = 6) {
  const targetVal = typeof target === 'number' && !isNaN(target) ? target : 6;

  const nodes = [
    { id: 'n8', val: '8', x: 200, y: 30 },
    { id: 'n3', val: '3', x: 120, y: 90 },
    { id: 'n10', val: '10', x: 280, y: 90 },
    { id: 'n1', val: '1', x: 75, y: 155 },
    { id: 'n6', val: '6', x: 165, y: 155 },
    { id: 'n14', val: '14', x: 320, y: 155 }
  ];

  const edges = [
    { from: 'n8', to: 'n3' },
    { from: 'n8', to: 'n10' },
    { from: 'n3', to: 'n1' },
    { from: 'n3', to: 'n6' },
    { from: 'n10', to: 'n14' }
  ];

  const steps = [];
  const visited = [];

  // Step 0: Initial BST State
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Initialize Binary Search Tree with root 8. Searching for target value ${targetVal}. In a BST: all left descendants < root < all right descendants.`,
    metrics: {
      'Target': targetVal,
      'Root Node': 8,
      'BST Inorder': '1, 3, 6, 8, 10, 14',
      'Status': 'Starting at Root'
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'n8',
      visited: ['n8'],
      queue: []
    }
  });

  // Step 1: Compare with Root (8)
  visited.push('n8');
  if (targetVal === 8) {
    steps.push({
      step: steps.length,
      phase: 'found',
      explanation: `Target ${targetVal} matches Root node 8 directly on the very first comparison!`,
      metrics: { 'Target': targetVal, 'Active Node': 8, 'Result': 'FOUND AT ROOT' },
      data: { type: 'tree', nodes, edges, activeNode: 'n8', visited, queue: [8] }
    });
  } else if (targetVal < 8) {
    // Go Left to 3
    steps.push({
      step: steps.length,
      phase: 'compare',
      explanation: `Target ${targetVal} < 8. Due to BST property, target cannot exist in the right subtree. Discard right subtree and branch LEFT to node 3.`,
      metrics: {
        'Comparison': `${targetVal} < 8`,
        'Branch Decision': 'GO LEFT',
        'Discarded Subtree': 'Right subtree (>= 8)'
      },
      data: { type: 'tree', nodes, edges, activeNode: 'n3', visited: [...visited, 'n3'], queue: [8] }
    });
    visited.push('n3');

    // Step 2: Compare with 3
    if (targetVal === 3) {
      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Target ${targetVal} matches node 3! Search completed in 2 comparisons.`,
        metrics: { 'Target': targetVal, 'Active Node': 3, 'Result': 'FOUND' },
        data: { type: 'tree', nodes, edges, activeNode: 'n3', visited, queue: [8, 3] }
      });
    } else if (targetVal < 3) {
      // Go Left to 1
      visited.push('n1');
      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `Target ${targetVal} < 3. Branch LEFT to node 1.`,
        metrics: { 'Comparison': `${targetVal} < 3`, 'Branch Decision': 'GO LEFT' },
        data: { type: 'tree', nodes, edges, activeNode: 'n1', visited, queue: [8, 3] }
      });
      if (targetVal === 1) {
        steps.push({
          step: steps.length,
          phase: 'found',
          explanation: `Target 1 found at leaf node!`,
          metrics: { 'Target': 1, 'Result': 'FOUND' },
          data: { type: 'tree', nodes, edges, activeNode: 'n1', visited, queue: [8, 3, 1] }
        });
      }
    } else {
      // Go Right to 6
      visited.push('n6');
      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `Target ${targetVal} > 3. Branch RIGHT to node 6.`,
        metrics: { 'Comparison': `${targetVal} > 3`, 'Branch Decision': 'GO RIGHT' },
        data: { type: 'tree', nodes, edges, activeNode: 'n6', visited, queue: [8, 3] }
      });
      if (targetVal === 6) {
        steps.push({
          step: steps.length,
          phase: 'found',
          explanation: `Target 6 found at node 6! Reached node in O(log N) steps.`,
          metrics: { 'Target': 6, 'Result': 'FOUND', 'Comparisons': 3 },
          data: { type: 'tree', nodes, edges, activeNode: 'n6', visited, queue: [8, 3, 6] }
        });
      }
    }
  } else {
    // Go Right to 10
    visited.push('n10');
    steps.push({
      step: steps.length,
      phase: 'compare',
      explanation: `Target ${targetVal} > 8. Due to BST property, target cannot exist in the left subtree. Branch RIGHT to node 10.`,
      metrics: { 'Comparison': `${targetVal} > 8`, 'Branch Decision': 'GO RIGHT' },
      data: { type: 'tree', nodes, edges, activeNode: 'n10', visited, queue: [8] }
    });
  }

  // Completion Step
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `BST Search Finished! Traversed path [${visited.map(id => id.replace('n', '')).join(' → ')}]. The BST property reduced the search space by half at each level (O(h) time).`,
    isComplete: true,
    metrics: {
      'Target': targetVal,
      'Path Traversed': visited.map(id => id.replace('n', '')).join(' → '),
      'Time Complexity': 'O(h) where h is tree height',
      'Space Complexity': 'O(1)'
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: visited[visited.length - 1],
      visited: [...visited],
      queue: visited.map(id => id.replace('n', ''))
    }
  });

  return steps;
}
