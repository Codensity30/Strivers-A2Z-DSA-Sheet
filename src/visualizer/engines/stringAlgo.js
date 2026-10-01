/**
 * Problem-Specific Simulation: String Algorithms & Two-Pointer Verification
 * Simulates two-pointer character comparison, palindrome verification,
 * and character transformations in O(N) time and O(1) space.
 */

export function simulateStringAlgo(input) {
  const chars = Array.isArray(input)
    ? input.map(c => String(c))
    : String(input || 'racecar').replace(/[\s,]+/g, '').split('');

  if (chars.length === 0) return [];

  const steps = [];
  const matched = [];
  let isPalindrome = true;
  let left = 0;
  let right = chars.length - 1;

  // Step 0: Init
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Initialize String Algorithm visualizer on "${chars.join('')}". Setting left pointer to index 0 ('${chars[0]}') and right pointer to index ${right} ('${chars[right]}').`,
    pointers: [
      { name: 'left', index: 0, color: 'emerald', position: 'top' },
      { name: 'right', index: right, color: 'indigo', position: 'bottom' }
    ],
    highlightIndices: [0, right],
    matchedIndices: [],
    dangerIndices: [],
    metrics: {
      'String': chars.join(''),
      'Left Char': chars[0],
      'Right Char': chars[right],
      'Status': 'Comparing ends'
    },
    array: [...chars],
    data: { array: [...chars] }
  });

  while (left <= right) {
    const charL = chars[left];
    const charR = chars[right];
    const isSame = charL.toLowerCase() === charR.toLowerCase();

    if (left === right) {
      // Center character of odd-length string
      matched.push(left);
      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Pointers met at center index ${left} ('${charL}'). Single middle character matches with itself by definition.`,
        pointers: [
          { name: 'center', index: left, color: 'purple', position: 'top' }
        ],
        highlightIndices: [left],
        matchedIndices: [...matched],
        dangerIndices: [],
        metrics: {
          'Position': `Center (i=${left})`,
          'Character': charL,
          'Symmetry': 'Maintained',
          'Status': 'Center verified'
        },
        array: [...chars],
        data: { array: [...chars] }
      });
      break;
    }

    if (isSame) {
      matched.push(left, right);
      steps.push({
        step: steps.length,
        phase: 'found',
        explanation: `Comparing left index ${left} ('${charL}') and right index ${right} ('${charR}'): Characters MATCH! Moving left pointer rightwards and right pointer leftwards.`,
        pointers: [
          { name: 'left', index: left, color: 'emerald', position: 'top' },
          { name: 'right', index: right, color: 'indigo', position: 'bottom' }
        ],
        highlightIndices: [left, right],
        matchedIndices: [...matched],
        dangerIndices: [],
        metrics: {
          [`Left (i=${left})`]: charL,
          [`Right (i=${right})`]: charR,
          'Match': 'YES (Symmetric)',
          'Pairs Verified': matched.length / 2
        },
        array: [...chars],
        data: { array: [...chars] }
      });
    } else {
      isPalindrome = false;
      steps.push({
        step: steps.length,
        phase: 'reset',
        explanation: `Mismatch detected: '${charL}' at index ${left} does not equal '${charR}' at index ${right}! String symmetry is broken.`,
        pointers: [
          { name: 'mismatch L', index: left, color: 'rose', position: 'top' },
          { name: 'mismatch R', index: right, color: 'rose', position: 'bottom' }
        ],
        highlightIndices: [],
        matchedIndices: [...matched],
        dangerIndices: [left, right],
        metrics: {
          'Left Char': charL,
          'Right Char': charR,
          'Match': 'MISMATCH',
          'Symmetry': 'Violated'
        },
        array: [...chars],
        data: { array: [...chars] }
      });
      break;
    }

    left++;
    right--;
  }

  // Completion Step
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: isPalindrome
      ? `Algorithm Finished! The string "${chars.join('')}" is completely symmetric and valid under two-pointer verification.`
      : `Algorithm Finished! The string "${chars.join('')}" failed symmetry comparison due to character mismatch.`,
    pointers: isPalindrome
      ? [{ name: 'verified', index: Math.floor(chars.length / 2), color: 'emerald', position: 'top' }]
      : [],
    highlightIndices: [],
    matchedIndices: isPalindrome ? chars.map((_, i) => i) : [...matched],
    dangerIndices: isPalindrome ? [] : [left, right],
    isComplete: true,
    metrics: {
      'Total Length': chars.length,
      'Result': isPalindrome ? 'Valid Palindrome' : 'Asymmetric String',
      'Time Complexity': 'O(N)',
      'Space Complexity': 'O(1)'
    },
    array: [...chars],
    data: { array: [...chars] }
  });

  return steps;
}
