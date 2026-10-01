import { simulateKadane } from './kadane.js';
import { simulateBinarySearch } from './binarySearch.js';
import { simulateTwoSum } from './twoSum.js';
import { simulateDutchFlag } from './dutchFlag.js';
import { simulateMajorityElement } from './majorityElement.js';
import { simulateSlidingWindow } from './slidingWindow.js';
import { simulateArrayStepper } from './arrayStepper.js';
import { simulateStackQueue } from './stackQueue.js';
import { simulateLinkedList } from './linkedList.js';
import { simulateBinaryTree } from './binaryTree.js';
import { simulateBinarySearchTree } from './binarySearchTree.js';
import { simulateGraphTraversal } from './graphTraversal.js';
import { simulateDpGrid } from './dpGrid.js';
import { simulateHeapPriorityQueue } from './heapPriorityQueue.js';
import { simulateGreedyIntervals } from './greedyIntervals.js';
import { simulateTriePrefixTree } from './triePrefixTree.js';
import { simulateStringMatchingKmp } from './stringMatchingKmp.js';
import { simulateRecursionTree } from './recursionTree.js';
import { simulateBitManipulation } from './bitManipulation.js';
import { simulateStringAlgo } from './stringAlgo.js';

export const ENGINE_REGISTRY = {
  'kadane': {
    name: "Kadane's Algorithm (Max Subarray Sum)",
    category: 'array',
    defaultInputs: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    generateSteps: (inputs) => simulateKadane(inputs.array),
    inputConfig: { arrayLabel: 'Array (comma-separated)', hasTarget: false }
  },
  'binary-search': {
    name: 'Binary Search (Range Elimination)',
    category: 'array',
    defaultInputs: { array: [1, 3, 5, 7, 9, 11, 13, 17, 21], target: 7 },
    generateSteps: (inputs) => simulateBinarySearch(inputs.array, Number(inputs.target ?? 7)),
    inputConfig: { arrayLabel: 'Sorted Array', hasTarget: true, targetLabel: 'Target' }
  },
  'two-sum': {
    name: 'Two Sum (Hash Map Lookup)',
    category: 'array',
    defaultInputs: { array: [2, 7, 11, 15, 3, 6], target: 9 },
    generateSteps: (inputs) => simulateTwoSum(inputs.array, Number(inputs.target ?? 9)),
    inputConfig: { arrayLabel: 'Array', hasTarget: true, targetLabel: 'Target' }
  },
  'dutch-flag': {
    name: 'Sort 0 1 2 (Dutch National Flag)',
    category: 'array',
    defaultInputs: { array: [2, 0, 2, 1, 1, 0, 2, 1, 0] },
    generateSteps: (inputs) => simulateDutchFlag(inputs.array),
    inputConfig: { arrayLabel: 'Array (0s, 1s, 2s)', hasTarget: false }
  },
  'majority-element': {
    name: "Boyer-Moore Voting (Majority Element)",
    category: 'array',
    defaultInputs: { array: [2, 2, 1, 1, 1, 2, 2] },
    generateSteps: (inputs) => simulateMajorityElement(inputs.array),
    inputConfig: { arrayLabel: 'Array', hasTarget: false }
  },
  'sliding-window': {
    name: 'Sliding Window (Dynamic Expansion & Contraction)',
    category: 'array',
    defaultInputs: { array: [2, 1, 5, 1, 3, 2], target: 7 },
    generateSteps: (inputs) => simulateSlidingWindow(inputs.array, Number(inputs.target ?? 7)),
    inputConfig: { arrayLabel: 'Array', hasTarget: true, targetLabel: 'Max Sum' }
  },
  'stack-queue': {
    name: 'Monotonic Stack (Next Greater Element)',
    category: 'array',
    defaultInputs: { array: [4, 5, 2, 25, 7, 8] },
    generateSteps: (inputs) => simulateStackQueue(inputs.array),
    inputConfig: { arrayLabel: 'Array', hasTarget: false }
  },
  'array-stepper': {
    name: 'Array Traversal & Maximum Element',
    category: 'array',
    defaultInputs: { array: [12, 35, 1, 10, 34, 1] },
    generateSteps: (inputs) => simulateArrayStepper(inputs.array),
    inputConfig: { arrayLabel: 'Array', hasTarget: false }
  },
  'linked-list': {
    name: "Floyd's Cycle Detection (Tortoise & Hare)",
    category: 'nodelink',
    defaultInputs: { values: [3, 2, 0, -4], cyclePos: 1 },
    generateSteps: (inputs) => simulateLinkedList(inputs.values, inputs.cyclePos),
    inputConfig: { arrayLabel: 'Node Values', hasTarget: false }
  },
  'binary-tree': {
    name: 'Binary Tree Level Order Traversal (BFS)',
    category: 'nodelink',
    defaultInputs: { traversalType: 'level-order' },
    generateSteps: () => simulateBinaryTree('level-order'),
    inputConfig: { hasTarget: false }
  },
  'binary-search-tree': {
    name: 'Binary Search Tree (Search & Inorder Traversal)',
    category: 'nodelink',
    defaultInputs: { target: 6 },
    generateSteps: (inputs) => simulateBinarySearchTree(Number(inputs.target ?? 6)),
    inputConfig: { hasTarget: true, targetLabel: 'Target Value' }
  },
  'graph-traversal': {
    name: 'Graph Breadth First Search (BFS)',
    category: 'nodelink',
    defaultInputs: {},
    generateSteps: () => simulateGraphTraversal(),
    inputConfig: { hasTarget: false }
  },
  'dp-grid': {
    name: '2D Dynamic Programming (Grid Unique Paths)',
    category: 'grid',
    defaultInputs: { rows: 3, cols: 4 },
    generateSteps: (inputs) => simulateDpGrid(Number(inputs.rows || 3), Number(inputs.cols || 4)),
    inputConfig: { hasGridDims: true, hasTarget: false }
  },
  'heap-priority-queue': {
    name: 'Binary Heap & Priority Queue (Heapify-Up Operations)',
    category: 'nodelink',
    defaultInputs: { target: 5 },
    generateSteps: (inputs) => simulateHeapPriorityQueue([10, 15, 20, 17, 25], Number(inputs.target ?? 5)),
    inputConfig: { hasTarget: true, targetLabel: 'Element to Insert' }
  },
  'greedy-intervals': {
    name: 'Greedy Interval Scheduling (Activity Selection & Room Allocation)',
    category: 'array',
    defaultInputs: {},
    generateSteps: () => simulateGreedyIntervals(),
    inputConfig: { hasTarget: false }
  },
  'trie-prefix-tree': {
    name: 'Trie Prefix Tree (Word Insertions & Prefix Search)',
    category: 'nodelink',
    defaultInputs: {},
    generateSteps: () => simulateTriePrefixTree(['app', 'apple', 'apt']),
    inputConfig: { hasTarget: false }
  },
  'string-matching-kmp': {
    name: 'KMP String Matching & LPS Prefix Table',
    category: 'array',
    defaultInputs: { array: ['a', 'b', 'a', 'b', 'c', 'a', 'b', 'a', 'b', 'a'] },
    generateSteps: (inputs) => simulateStringMatchingKmp(inputs.array?.join('') || 'ababcababa', 'ababa'),
    inputConfig: { arrayLabel: 'Text Characters', hasTarget: false }
  },
  'recursion-tree': {
    name: 'Recursion Decision Tree & Backtracking (Subsets)',
    category: 'nodelink',
    defaultInputs: { array: [1, 2, 3] },
    generateSteps: (inputs) => simulateRecursionTree(inputs.array),
    inputConfig: { arrayLabel: 'Elements', hasTarget: false }
  },
  'bit-manipulation': {
    name: 'Bit Manipulation & 8-Bit Register Operations',
    category: 'array',
    defaultInputs: { target: 3 },
    generateSteps: (inputs) => simulateBitManipulation(29, Number(inputs.target ?? 3)),
    inputConfig: { hasTarget: true, targetLabel: 'Bit Position (0-7)' }
  },
  'string-algo': {
    name: 'Two-Pointer String Algorithms & Symmetry Verification',
    category: 'array',
    defaultInputs: { array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'] },
    generateSteps: (inputs) => simulateStringAlgo(inputs.array),
    inputConfig: { arrayLabel: 'Characters', hasTarget: false }
  }
};

export function getEngine(type) {
  if (!type || !ENGINE_REGISTRY[type]) {
    return ENGINE_REGISTRY['array-stepper'];
  }
  return ENGINE_REGISTRY[type];
}
