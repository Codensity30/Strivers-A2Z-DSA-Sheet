/**
 * Problem-Specific Simulation: Trie (Prefix Tree)
 * Simulates Trie node creation, character edge transitions, prefix sharing,
 * and prefix/word search lookups in O(L) time where L is word length.
 */

export function simulateTriePrefixTree(wordsList) {
  const words = Array.isArray(wordsList) && wordsList.length > 0
    ? wordsList
    : ['app', 'apple', 'apt'];

  const steps = [];

  // Tree nodes for "app", "apple", "apt"
  const nodes = [
    { id: 'root', val: '★', x: 200, y: 25 },
    { id: 'n_a', val: 'a', x: 200, y: 75 },
    { id: 'n_p1', val: 'p', x: 200, y: 125 },
    { id: 'n_p2', val: 'p*', x: 130, y: 175 }, // End of "app"
    { id: 'n_t', val: 't*', x: 270, y: 175 },  // End of "apt"
    { id: 'n_l', val: 'l', x: 90, y: 220 },
    { id: 'n_e', val: 'e*', x: 90, y: 255 }    // End of "apple"
  ];

  const edges = [
    { from: 'root', to: 'n_a' },
    { from: 'n_a', to: 'n_p1' },
    { from: 'n_p1', to: 'n_p2' },
    { from: 'n_p1', to: 'n_t' },
    { from: 'n_p2', to: 'n_l' },
    { from: 'n_l', to: 'n_e' }
  ];

  // Step 0: Init Root
  steps.push({
    step: 0,
    phase: 'init',
    explanation: 'Initialize empty Trie with Root node (★). Each node has up to 26 outgoing character pointers and an isEndOfWord flag.',
    metrics: {
      'Trie State': 'Initialized (Empty Root)',
      'Total Words': words.length,
      'Active Operation': 'Ready for insertion'
    },
    data: {
      type: 'tree',
      nodes: [nodes[0]],
      edges: [],
      activeNode: 'root',
      visited: ['root'],
      queue: []
    }
  });

  // Step 1: Insert "app"
  steps.push({
    step: steps.length,
    phase: 'push',
    explanation: 'Insert word "app": Create character edges \'a\' → \'p\' → \'p\'. Mark the final \'p\' node with an asterisk (*) indicating End-of-Word.',
    metrics: {
      'Current Word': 'app',
      'Path': 'root → a → p → p*',
      'Prefix Length': 3,
      'End of Word': 'Marked at node p*'
    },
    data: {
      type: 'tree',
      nodes: [nodes[0], nodes[1], nodes[2], nodes[3]],
      edges: [edges[0], edges[1], edges[2]],
      activeNode: 'n_p2',
      visited: ['root', 'n_a', 'n_p1', 'n_p2'],
      queue: ['app']
    }
  });

  // Step 2: Insert "apple" (Reuses prefix "app")
  steps.push({
    step: steps.length,
    phase: 'expand',
    explanation: 'Insert word "apple": Existing prefix "app" is automatically shared! Only characters \'l\' and \'e\' need to be created. Mark node \'e*\' as End-of-Word.',
    metrics: {
      'Current Word': 'apple',
      'Shared Prefix': 'app (Reused)',
      'New Nodes': 'l → e*',
      'Prefix Savings': '3 nodes saved'
    },
    data: {
      type: 'tree',
      nodes: [nodes[0], nodes[1], nodes[2], nodes[3], nodes[5], nodes[6]],
      edges: [edges[0], edges[1], edges[2], edges[4], edges[5]],
      activeNode: 'n_e',
      visited: ['root', 'n_a', 'n_p1', 'n_p2', 'n_l', 'n_e'],
      queue: ['app', 'apple']
    }
  });

  // Step 3: Insert "apt" (Branches at prefix "ap")
  steps.push({
    step: steps.length,
    phase: 'push',
    explanation: 'Insert word "apt": Follow shared prefix "ap" from Root, then branch out to new node \'t*\'. Mark node \'t*\' as End-of-Word.',
    metrics: {
      'Current Word': 'apt',
      'Shared Prefix': 'ap (Reused)',
      'Branch Point': 'Node p1',
      'Total Words in Trie': 3
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'n_t',
      visited: ['root', 'n_a', 'n_p1', 'n_t'],
      queue: ['app', 'apple', 'apt']
    }
  });

  // Step 4: Prefix Query startsWith("app")
  steps.push({
    step: steps.length,
    phase: 'found',
    explanation: 'Execute startsWith("app"): Traversed characters \'a\' → \'p\' → \'p\'. All 3 nodes exist in succession. Query result: TRUE (Prefix exists).',
    metrics: {
      'Query': 'startsWith("app")',
      'Lookup Time': 'O(L) where L=3',
      'Path Verified': 'root → a → p → p',
      'Result': 'FOUND'
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: 'n_p2',
      visited: ['root', 'n_a', 'n_p1', 'n_p2'],
      queue: ['app', 'apple', 'apt']
    }
  });

  // Step 5: Trie Complete
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: 'Trie Prefix Simulation Complete! Supports O(L) insertions, exact word lookups, and prefix searching with optimal prefix memory compression.',
    isComplete: true,
    metrics: {
      'Words in Trie': 'app, apple, apt',
      'Insert Complexity': 'O(L)',
      'Search Complexity': 'O(L)',
      'Prefix Compression': 'Active'
    },
    data: {
      type: 'tree',
      nodes: [...nodes],
      edges: [...edges],
      activeNode: null,
      visited: nodes.map(n => n.id),
      queue: ['app', 'apple', 'apt']
    }
  });

  return steps;
}
