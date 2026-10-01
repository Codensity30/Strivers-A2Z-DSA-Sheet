/**
 * Problem-Specific Simulation: Binary Tree Traversals (Level Order BFS & Inorder DFS)
 * Generates hierarchical node coordinate map and step-by-step traversal states.
 */

export function simulateBinaryTree(traversalType = 'level-order') {
  // Sample binary tree:
  //         1
  //       /   \
  //      2     3
  //     / \   / \
  //    4   5 6   7
  const nodes = [
    { id: 1, val: 1, x: 200, y: 40, left: 2, right: 3 },
    { id: 2, val: 2, x: 100, y: 110, left: 4, right: 5 },
    { id: 3, val: 3, x: 300, y: 110, left: 6, right: 7 },
    { id: 4, val: 4, x: 50, y: 180, left: null, right: null },
    { id: 5, val: 5, x: 150, y: 180, left: null, right: null },
    { id: 6, val: 6, x: 250, y: 180, left: null, right: null },
    { id: 7, val: 7, x: 350, y: 180, left: null, right: null },
  ];

  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
  ];

  const steps = [];

  if (traversalType === 'level-order') {
    // BFS using Queue
    const queue = [1];
    const visited = [];

    steps.push({
      step: 0,
      phase: 'init',
      explanation: `Start Level Order Traversal (BFS) using a Queue. Pushed Root Node 1 into queue.`,
      pointers: [{ name: 'root', index: 1, color: 'indigo', position: 'top' }],
      highlightIndices: [1],
      matchedIndices: [],
      dangerIndices: [],
      metrics: { 'Queue': '[1]', 'Visited Order': '[]', 'Current Level': 0 },
      data: { type: 'tree', nodes, edges, activeNode: 1, visited: [], queue: [1] }
    });

    while (queue.length > 0) {
      const currId = queue.shift();
      const currNode = nodes.find(n => n.id === currId);
      visited.push(currId);

      const addedChildren = [];
      if (currNode.left) {
        queue.push(currNode.left);
        addedChildren.push(currNode.left);
      }
      if (currNode.right) {
        queue.push(currNode.right);
        addedChildren.push(currNode.right);
      }

      steps.push({
        step: steps.length,
        phase: 'visit',
        explanation: `Popped Node ${currId} from queue and processed value. ${
          addedChildren.length > 0 ? `Enqueued child node(s): [${addedChildren.join(', ')}].` : 'No children to enqueue.'
        } Current queue: [${queue.join(', ')}].`,
        pointers: [{ name: 'curr', index: currId, color: 'emerald', position: 'top' }],
        highlightIndices: [currId],
        matchedIndices: [...visited],
        dangerIndices: [],
        metrics: {
          'Processed Node': currId,
          'Queue': queue.length ? `[${queue.join(', ')}]` : 'Empty',
          'Traversal': `[${visited.join(', ')}]`
        },
        data: { type: 'tree', nodes, edges, activeNode: currId, visited: [...visited], queue: [...queue] }
      });
    }

    steps.push({
      step: steps.length,
      phase: 'complete',
      explanation: `Level Order Traversal complete! Queue is empty. Traversal sequence: [${visited.join(', ')}].`,
      pointers: [],
      highlightIndices: [],
      matchedIndices: [...visited],
      dangerIndices: [],
      isComplete: true,
      metrics: { 'Final Traversal': `[${visited.join(', ')}]`, 'Status': 'Complete' },
      data: { type: 'tree', nodes, edges, activeNode: null, visited: [...visited], queue: [] }
    });
  } else {
    // Inorder (Left -> Root -> Right)
    // 4 -> 2 -> 5 -> 1 -> 6 -> 3 -> 7
    const inorderSequence = [4, 2, 5, 1, 6, 3, 7];
    const visited = [];

    steps.push({
      step: 0,
      phase: 'init',
      explanation: `Start Inorder Traversal (Left -> Root -> Right). Recursion starts at Root Node 1.`,
      pointers: [{ name: 'root', index: 1, color: 'indigo', position: 'top' }],
      highlightIndices: [1],
      matchedIndices: [],
      dangerIndices: [],
      metrics: { 'Current Node': 1, 'Inorder Result': '[]' },
      data: { type: 'tree', nodes, edges, activeNode: 1, visited: [] }
    });

    for (const nodeId of inorderSequence) {
      visited.push(nodeId);
      steps.push({
        step: steps.length,
        phase: 'visit',
        explanation: `Visited Node ${nodeId} in Inorder sequence. Result sequence is now: [${visited.join(', ')}].`,
        pointers: [{ name: 'visited', index: nodeId, color: 'emerald', position: 'top' }],
        highlightIndices: [nodeId],
        matchedIndices: [...visited],
        dangerIndices: [],
        metrics: { 'Visited Node': nodeId, 'Inorder Array': `[${visited.join(', ')}]` },
        data: { type: 'tree', nodes, edges, activeNode: nodeId, visited: [...visited] }
      });
    }

    steps.push({
      step: steps.length,
      phase: 'complete',
      explanation: `Inorder Traversal complete! Final sequence: [${visited.join(', ')}].`,
      pointers: [],
      highlightIndices: [],
      matchedIndices: [...visited],
      dangerIndices: [],
      isComplete: true,
      metrics: { 'Inorder Sequence': `[${visited.join(', ')}]`, 'Status': 'Complete' },
      data: { type: 'tree', nodes, edges, activeNode: null, visited: [...visited] }
    });
  }

  return steps;
}
