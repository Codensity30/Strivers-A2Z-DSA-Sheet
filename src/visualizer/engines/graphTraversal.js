/**
 * Problem-Specific Simulation: Graph BFS / DFS Traversal
 * Demonstrates vertex exploration, adjacency expansion, visited set, and queue tracking.
 */

export function simulateGraphTraversal() {
  // Graph vertices in circular / organic layout
  const vertices = [
    { id: 0, label: '0', x: 80, y: 70 },
    { id: 1, label: '1', x: 220, y: 50 },
    { id: 2, label: '2', x: 340, y: 110 },
    { id: 3, label: '3', x: 280, y: 220 },
    { id: 4, label: '4', x: 120, y: 200 }
  ];

  const edges = [
    { from: 0, to: 1 },
    { from: 0, to: 4 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 3 },
    { from: 3, to: 4 }
  ];

  const adj = {
    0: [1, 4],
    1: [0, 2, 3, 4],
    2: [1, 3],
    3: [1, 2, 4],
    4: [0, 1, 3]
  };

  const steps = [];
  const queue = [0];
  const visited = new Set([0]);
  const traversalOrder = [];

  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start Graph Breadth First Search (BFS) from source vertex 0. Marked 0 as visited and enqueued into BFS Queue.`,
    pointers: [{ name: 'source', index: 0, color: 'indigo', position: 'top' }],
    highlightIndices: [0],
    matchedIndices: [0],
    dangerIndices: [],
    metrics: { 'Queue': '[0]', 'Visited Vertices': '{0}', 'Current Vertex': '0' },
    data: {
      type: 'graph',
      vertices,
      edges,
      activeVertex: 0,
      visited: [0],
      queue: [0],
      activeEdge: null
    }
  });

  while (queue.length > 0) {
    const u = queue.shift();
    traversalOrder.push(u);

    const neighbors = adj[u] || [];
    const newlyEnqueued = [];

    for (const v of neighbors) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        newlyEnqueued.push(v);
      }
    }

    steps.push({
      step: steps.length,
      phase: 'visit',
      explanation: `Dequeued Vertex ${u}. Inspected neighbors [${neighbors.join(', ')}]. ${
        newlyEnqueued.length > 0
          ? `Discovered unvisited neighbor(s) [${newlyEnqueued.join(', ')}] -> marked visited and added to queue.`
          : 'All neighbors already visited.'
      } Current Queue: [${queue.join(', ')}].`,
      pointers: [{ name: 'current', index: u, color: 'emerald', position: 'top' }],
      highlightIndices: [u, ...newlyEnqueued],
      matchedIndices: [...visited],
      dangerIndices: [],
      metrics: {
        'Current Vertex': u,
        'Queue': queue.length > 0 ? `[${queue.join(', ')}]` : 'Empty',
        'Visited Count': visited.size,
        'Traversal Order': `[${traversalOrder.join(', ')}]`
      },
      data: {
        type: 'graph',
        vertices,
        edges,
        activeVertex: u,
        visited: Array.from(visited),
        queue: [...queue],
        activeEdge: newlyEnqueued.length > 0 ? { from: u, to: newlyEnqueued[0] } : null
      }
    });
  }

  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `BFS Traversal complete! All reachable vertices in the graph component visited. Order: [${traversalOrder.join(' -> ')}].`,
    pointers: [],
    highlightIndices: [],
    matchedIndices: Array.from(visited),
    dangerIndices: [],
    isComplete: true,
    metrics: { 'Final BFS Order': `[${traversalOrder.join(', ')}]`, 'Status': 'Complete' },
    data: {
      type: 'graph',
      vertices,
      edges,
      activeVertex: null,
      visited: Array.from(visited),
      queue: []
    }
  });

  return steps;
}
