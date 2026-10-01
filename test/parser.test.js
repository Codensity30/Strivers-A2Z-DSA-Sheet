import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseCppContent, detectVisualizerType, cleanTitle } from '../js/parser.js';

describe('C++ Problem Parser', () => {
  it('cleans file names into readable titles', () => {
    assert.equal(cleanTitle('01.Largest_element_in_array.cpp'), 'Largest Element In Array');
    assert.equal(cleanTitle('02.Sort_0_1_2.cpp'), 'Sort 0 1 2');
    assert.equal(cleanTitle("04.Kadane's_algorithm.cpp"), "Kadane's Algorithm");
    assert.equal(cleanTitle("07.Move_0's_to_end.cpp"), "Move 0's To End");
  });

  it('parses a standard problem file with Question, Approach, Code, and Complexities', () => {
    const sampleCpp = `/*
QUESTION:-
Given an array A[] of size n. Find the largest element.
Example:
Input: A[] = {1, 8, 7, 56, 90}
Output: 90
*/

/*
APPROACH:-
-> Initialize ans with arr[0]
-> Traverse and update if greater
*/

// CODE:-
int largest(int arr[], int n) {
    int ans = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > ans) ans = arr[i];
    }
    return ans;
}

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(1)
`;

    const parsed = parseCppContent(sampleCpp, '01.Arrays/1.Easy/01.Largest_element_in_array.cpp');

    assert.equal(parsed.title, 'Largest Element In Array');
    assert.equal(parsed.topic, '01.Arrays');
    assert.equal(parsed.subtopic, '1.Easy');
    assert.equal(parsed.difficulty, 'Easy');
    assert.match(parsed.question, /Find the largest element/);
    assert.match(parsed.question, /Input: A\[\] = \{1, 8, 7, 56, 90\}/);
    assert.equal(parsed.approaches.length, 1);
    assert.equal(parsed.approaches[0].type, 'Optimal');
    assert.match(parsed.approaches[0].algorithm, /Initialize ans with arr\[0\]/);
    assert.match(parsed.approaches[0].code, /int largest\(int arr\[\], int n\)/);
    assert.equal(parsed.approaches[0].timeComplexity, 'O(N)');
    assert.equal(parsed.approaches[0].spaceComplexity, 'O(1)');
  });

  it('parses multi-approach files with Brute, Better, and Optimal sections', () => {
    const multiApproachCpp = `/*
QUESTION:-
Find the majority element that appears > n/2 times.
*/

/*
BRUTE FORCE:-
Count frequency of each element using two nested loops.
TIME COMPLEXITY: O(N^2)
SPACE COMPLEXITY: O(1)
CODE:
int bruteMajority(vector<int>& nums) {
    // brute code
    return nums[0];
}

BETTER APPROACH:-
Use a hash map to count occurrences in one pass.
TIME COMPLEXITY: O(N)
SPACE COMPLEXITY: O(N)
CODE:
int betterMajority(vector<int>& nums) {
    // better code with map
    return nums[0];
}

OPTIMAL APPROACH (Moore's Voting Algorithm):-
Use candidate and count variables.
TIME COMPLEXITY: O(N)
SPACE COMPLEXITY: O(1)
CODE:
int optimalMajority(vector<int>& nums) {
    // optimal code
    return candidate;
}
*/
`;

    const parsed = parseCppContent(multiApproachCpp, '01.Arrays/2.Medium/03.Majority_element.cpp');

    assert.equal(parsed.hasBrute, true);
    assert.equal(parsed.hasBetter, true);
    assert.equal(parsed.hasOptimal, true);
    assert.equal(parsed.approaches.length, 3);

    const [brute, better, optimal] = parsed.approaches;
    assert.equal(brute.type, 'Brute Force');
    assert.match(brute.algorithm, /nested loops/i);
    assert.match(brute.code, /bruteMajority/);
    assert.equal(brute.timeComplexity, 'O(N^2)');

    assert.equal(better.type, 'Better');
    assert.match(better.algorithm, /hash map/i);
    assert.match(better.code, /betterMajority/);
    assert.equal(better.timeComplexity, 'O(N)');

    assert.equal(optimal.type, 'Optimal');
    assert.match(optimal.algorithm, /candidate and count/i);
    assert.match(optimal.code, /optimalMajority/);
    assert.equal(optimal.timeComplexity, 'O(N)');
  });

  it('handles edge case files without explicit QUESTION header without crashing', () => {
    const minimalistCpp = `/*
I don't think anyone needs it's solution. The idea is to traverse the array using loop and when the element
is equal to k return the same
*/
`;

    const parsed = parseCppContent(minimalistCpp, '01.Arrays/1.Easy/08.Linear_search.cpp');
    assert.equal(parsed.title, 'Linear Search');
    assert.ok(parsed.question.length > 0);
    assert.ok(parsed.approaches.length >= 1);
  });

  it('detects visualizer archetype from problem title and topic', () => {
    assert.equal(detectVisualizerType("04.Kadane's_algorithm.cpp", '01.Arrays'), 'kadane');
    assert.equal(detectVisualizerType('01.2_sum_problem.cpp', '01.Arrays'), 'two-sum');
    assert.equal(detectVisualizerType('02.Sort_0_1_2.cpp', '01.Arrays'), 'dutch-flag');
    assert.equal(detectVisualizerType('01.Binary_Search.cpp', '02.Binary Search'), 'binary-search');
    assert.equal(detectVisualizerType('03.Majority_element.cpp', '01.Arrays'), 'majority-element');
    assert.equal(detectVisualizerType('05.Rotate_array_left_by_1place.cpp', '01.Arrays'), 'array-stepper');
    assert.equal(detectVisualizerType('01.Longest_substring_without_repeating_characters.cpp', '08. Sliding Window'), 'sliding-window');
    assert.equal(detectVisualizerType('01.Middle_of_the_linked_list.cpp', '04.Linked List'), 'linked-list');
    assert.equal(detectVisualizerType('01.Next_greater_element.cpp', '07.Stack and Queues'), 'stack-queue');
    assert.equal(detectVisualizerType('01.Level_order_traversal.cpp', '11. Binary Trees'), 'binary-tree');
    assert.equal(detectVisualizerType('01.Search_in_BST.cpp', '12. Binary Search Trees'), 'binary-search-tree');
    assert.equal(detectVisualizerType('01.BFS_of_graph.cpp', '13. Graphs'), 'graph-traversal');
    assert.equal(detectVisualizerType('01.Grid_unique_paths.cpp', '14. Dynamic Programming'), 'dp-grid');
    assert.equal(detectVisualizerType('01.Implement_min_heap.cpp', '09. Heaps'), 'heap-priority-queue');
    assert.equal(detectVisualizerType('01.N_meetings_in_one_room.cpp', '10. Greedy Approach'), 'greedy-intervals');
    assert.equal(detectVisualizerType('01.Implement_trie.cpp', '15. Tries'), 'trie-prefix-tree');
    assert.equal(detectVisualizerType('03.KMP_or_Z_string_matching_algo.cpp', '16. Strings (Hard)'), 'string-matching-kmp');
    assert.equal(detectVisualizerType('02.Power_set.cpp', '05.Recursion'), 'recursion-tree');
    assert.equal(detectVisualizerType('01.Bit_manipulation.cpp', '06.Bit Manipulation'), 'bit-manipulation');
    assert.equal(detectVisualizerType('07.Valid_anagram.cpp', '03.Strings'), 'string-algo');
  });
});
