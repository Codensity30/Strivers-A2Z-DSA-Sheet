import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProgress,
  filterProblems,
  groupProblemsByTopic
} from '../js/store.js';

describe('Store & Progress Engine', () => {
  const mockProblems = [
    {
      id: '01-arrays-1-easy-01-largest-element-in-array',
      title: 'Largest Element in Array',
      topic: '01.Arrays',
      subtopic: '1.Easy',
      difficulty: 'Easy',
      question: 'Find largest element in array',
      hasBrute: false,
      hasBetter: false,
      hasOptimal: true
    },
    {
      id: '01-arrays-2-medium-01-2-sum-problem',
      title: '2 Sum Problem',
      topic: '01.Arrays',
      subtopic: '2.Medium',
      difficulty: 'Medium',
      question: 'Find two numbers adding up to target',
      hasBrute: true,
      hasBetter: true,
      hasOptimal: true
    },
    {
      id: '02-binary-search-1-learning-01-binary-search',
      title: 'Binary Search',
      topic: '02.Binary Search',
      subtopic: '1.Learning',
      difficulty: 'Easy',
      question: 'Search target in sorted array',
      hasBrute: false,
      hasBetter: false,
      hasOptimal: true
    }
  ];

  it('calculates progress accurately based on solved set', () => {
    const solvedSet = new Set(['01-arrays-1-easy-01-largest-element-in-array']);
    const progress = calculateProgress(mockProblems, solvedSet);

    assert.equal(progress.total, 3);
    assert.equal(progress.solved, 1);
    assert.equal(progress.percentage, 33);
  });

  it('filters problems by text search query', () => {
    const results = filterProblems(mockProblems, { search: 'two numbers' });
    assert.equal(results.length, 1);
    assert.equal(results[0].title, '2 Sum Problem');
  });

  it('filters problems by difficulty', () => {
    const results = filterProblems(mockProblems, { difficulty: 'Easy' });
    assert.equal(results.length, 2);
  });

  it('filters problems by topic', () => {
    const results = filterProblems(mockProblems, { topic: '01.Arrays' });
    assert.equal(results.length, 2);
  });

  it('filters problems by solved and bookmarked status', () => {
    const solvedSet = new Set(['01-arrays-1-easy-01-largest-element-in-array']);
    const bookmarkSet = new Set(['01-arrays-2-medium-01-2-sum-problem']);

    const solvedOnly = filterProblems(mockProblems, { status: 'solved', solvedSet, bookmarkSet });
    assert.equal(solvedOnly.length, 1);
    assert.equal(solvedOnly[0].id, '01-arrays-1-easy-01-largest-element-in-array');

    const bookmarkedOnly = filterProblems(mockProblems, { status: 'bookmarked', solvedSet, bookmarkSet });
    assert.equal(bookmarkedOnly.length, 1);
    assert.equal(bookmarkedOnly[0].id, '01-arrays-2-medium-01-2-sum-problem');

    const unsolvedOnly = filterProblems(mockProblems, { status: 'unsolved', solvedSet, bookmarkSet });
    assert.equal(unsolvedOnly.length, 2);
  });

  it('groups problems hierarchically by topic and subtopic', () => {
    const grouped = groupProblemsByTopic(mockProblems);
    assert.ok(grouped['01.Arrays']);
    assert.ok(grouped['01.Arrays']['1.Easy']);
    assert.equal(grouped['01.Arrays']['1.Easy'].length, 1);
  });
});
