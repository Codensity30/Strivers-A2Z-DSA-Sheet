/**
 * Problem-Specific Simulation: KMP (Knuth-Morris-Pratt) Pattern Matching
 * Simulates LPS (Longest Prefix Suffix) fallback transitions, text & pattern pointer
 * advancement, and O(N + M) linear-time substring search without backtracking.
 */

export function simulateStringMatchingKmp(textStr = 'ababcababa', patStr = 'ababa') {
  const text = String(textStr || 'ababcababa');
  const pat = String(patStr || 'ababa');
  const textChars = text.split('');
  const patChars = pat.split('');

  // 1. Compute LPS (Longest Prefix Suffix) array for the pattern
  const lps = new Array(pat.length).fill(0);
  let len = 0;
  let pIdx = 1;
  while (pIdx < pat.length) {
    if (pat[pIdx] === pat[len]) {
      len++;
      lps[pIdx] = len;
      pIdx++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[pIdx] = 0;
        pIdx++;
      }
    }
  }

  const steps = [];

  // Step 0: LPS Precomputation HUD
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Precomputed KMP LPS (Longest Prefix Suffix / π) table for pattern "${pat}": [${lps.join(', ')}]. This allows skipping redundant character comparisons when mismatches occur.`,
    pointers: [
      { name: 'text i=0', index: 0, color: 'emerald', position: 'top' },
      { name: `pat j=0 ('${pat[0]}')`, index: 0, color: 'indigo', position: 'bottom' }
    ],
    highlightIndices: [0],
    matchedIndices: [],
    dangerIndices: [],
    metrics: {
      'Text Length N': text.length,
      'Pattern Length M': pat.length,
      'LPS Array': `[${lps.join(', ')}]`,
      'Status': 'Ready to scan text'
    },
    array: [...textChars],
    data: { array: [...textChars], stack: lps }
  });

  let i = 0; // Text pointer
  let j = 0; // Pattern pointer
  let matchFound = false;
  let matchStart = -1;

  while (i < text.length) {
    const charT = text[i];
    const charP = pat[j];

    if (charT === charP) {
      i++;
      j++;

      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Text index ${i - 1} ('${charT}') matches pattern index ${j - 1} ('${charP}'). Advancing both pointers (i=${i}, j=${j}).`,
        pointers: [
          { name: `i=${i}`, index: Math.min(i, text.length - 1), color: 'emerald', position: 'top' },
          { name: `j=${j}`, index: Math.min(i - 1, text.length - 1), color: 'indigo', position: 'bottom' }
        ],
        highlightIndices: [i - 1],
        matchedIndices: Array.from({ length: j }, (_, k) => i - j + k),
        dangerIndices: [],
        metrics: {
          'Matching Characters': `${j} / ${pat.length}`,
          'Current Match': pat.slice(0, j),
          'Text Pointer i': i,
          'Pattern Pointer j': j
        },
        array: [...textChars],
        data: { array: [...textChars], stack: lps }
      });

      if (j === pat.length) {
        matchFound = true;
        matchStart = i - j;

        steps.push({
          step: steps.length,
          phase: 'complete',
          explanation: `Complete Pattern "${pat}" Found in text starting at index ${matchStart} (range [${matchStart}..${i - 1}])!`,
          pointers: [
            { name: 'match start', index: matchStart, color: 'emerald', position: 'top' },
            { name: 'match end', index: i - 1, color: 'amber', position: 'bottom' }
          ],
          highlightIndices: [],
          matchedIndices: Array.from({ length: pat.length }, (_, k) => matchStart + k),
          dangerIndices: [],
          isComplete: true,
          metrics: {
            'Pattern Match': `Index ${matchStart}`,
            'Range': `[${matchStart}..${i - 1}]`,
            'Time Complexity': 'O(N + M)',
            'Result': 'SUCCESS'
          },
          array: [...textChars],
          data: { array: [...textChars], stack: lps }
        });

        // Use LPS to look for next match
        j = lps[j - 1];
        break;
      }
    } else {
      // Mismatch
      steps.push({
        step: steps.length,
        phase: 'reset',
        explanation: `Mismatch at text index ${i} ('${charT}') vs pattern index ${j} ('${charP}'). KMP Fallback: Look up LPS[j-1] = LPS[${j - 1}] = ${j > 0 ? lps[j - 1] : 0}.`,
        pointers: [
          { name: `mismatch i=${i}`, index: i, color: 'rose', position: 'top' }
        ],
        highlightIndices: [],
        matchedIndices: [],
        dangerIndices: [i],
        metrics: {
          'Mismatch At': `i=${i}, j=${j}`,
          'LPS Fallback': j > 0 ? `j = ${lps[j - 1]}` : 'j = 0, i++',
          'Action': 'Jump pattern without rewinding text i'
        },
        array: [...textChars],
        data: { array: [...textChars], stack: lps }
      });

      if (j !== 0) {
        j = lps[j - 1]; // Smart jump
      } else {
        i++;
      }
    }
  }

  if (!matchFound) {
    steps.push({
      step: steps.length,
      phase: 'complete',
      explanation: `Algorithm Finished. Pattern "${pat}" was not found in the text. Entire scan completed in linear O(N) comparisons.`,
      pointers: [],
      highlightIndices: [],
      matchedIndices: [],
      dangerIndices: [],
      isComplete: true,
      metrics: {
        'Result': 'Pattern not found',
        'Text Scanned': `${text.length} chars`,
        'Time Complexity': 'O(N + M)'
      },
      array: [...textChars],
      data: { array: [...textChars], stack: lps }
    });
  }

  return steps;
}
