/**
 * Problem-Specific Simulation: Bit Manipulation & Bitwise Register Operations
 * Simulates binary representation, checking the i-th bit, setting/clearing bits,
 * toggling, and Brian Kernighan's rightmost bit extraction in O(1) operations.
 */

export function simulateBitManipulation(num = 29, bitIndex = 3) {
  const n = typeof num === 'number' && !isNaN(num) ? Math.floor(Math.abs(num)) : 29;
  const targetBit = typeof bitIndex === 'number' && !isNaN(bitIndex) ? Math.max(0, Math.min(7, bitIndex)) : 3;

  const to8BitArray = (val) => {
    const bits = [];
    for (let pos = 7; pos >= 0; pos--) {
      bits.push((val >> pos) & 1);
    }
    return bits;
  };

  const steps = [];
  const initialBits = to8BitArray(n);
  // Array index corresponding to bit pos (pos 0 is at index 7, pos 7 is at index 0)
  const bitArrIdx = 7 - targetBit;

  // Step 0: Register Initialization
  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Load decimal ${n} into 8-bit register. Binary representation: 0b${initialBits.join('')}. Examining bit position i = ${targetBit}.`,
    pointers: [
      { name: `bit ${targetBit}`, index: bitArrIdx, color: 'indigo', position: 'bottom' }
    ],
    highlightIndices: [bitArrIdx],
    matchedIndices: initialBits.map((b, i) => b === 1 ? i : -1).filter(i => i !== -1),
    dangerIndices: [],
    metrics: {
      'Decimal N': n,
      'Binary 8-Bit': `0b${initialBits.join('')}`,
      'Bit Position i': targetBit,
      'Operation': 'Register Loaded'
    },
    array: [...initialBits],
    data: { array: [...initialBits] }
  });

  // Step 1: Check i-th bit using (N & (1 << i))
  const mask = 1 << targetBit;
  const maskBits = to8BitArray(mask);
  const isSet = ((n >> targetBit) & 1) === 1;

  steps.push({
    step: steps.length,
    phase: 'compare',
    explanation: `Check i-th bit using mask (1 << ${targetBit}) = ${mask} (0b${maskBits.join('')}). Formula: (N >> ${targetBit}) & 1 = ${isSet ? '1 (BIT IS SET)' : '0 (BIT IS UNSET)'}.`,
    pointers: [
      { name: `mask 1<<${targetBit}`, index: bitArrIdx, color: 'amber', position: 'top' },
      { name: isSet ? 'SET (1)' : 'UNSET (0)', index: bitArrIdx, color: isSet ? 'emerald' : 'rose', position: 'bottom' }
    ],
    highlightIndices: [bitArrIdx],
    matchedIndices: isSet ? [bitArrIdx] : [],
    dangerIndices: isSet ? [] : [bitArrIdx],
    metrics: {
      'Formula': `(N >> ${targetBit}) & 1`,
      'Mask (1 << i)': mask,
      'Bit Value': isSet ? 1 : 0,
      'Status': isSet ? 'Bit is SET' : 'Bit is UNSET'
    },
    array: [...initialBits],
    data: { array: [...initialBits] }
  });

  // Step 2: Set the i-th bit: N | (1 << i)
  const setN = n | mask;
  const setBits = to8BitArray(setN);

  steps.push({
    step: steps.length,
    phase: 'found',
    explanation: `Set the ${targetBit}-th bit: Execute N | (1 << ${targetBit}). Resulting value is ${setN} (0b${setBits.join('')}). The ${targetBit}-th bit is guaranteed to be 1.`,
    pointers: [
      { name: 'bit forced to 1', index: bitArrIdx, color: 'emerald', position: 'top' }
    ],
    highlightIndices: [bitArrIdx],
    matchedIndices: [bitArrIdx],
    dangerIndices: [],
    metrics: {
      'Operation': `N | (1 << ${targetBit})`,
      'Old N': n,
      'New N': setN,
      'Binary': `0b${setBits.join('')}`
    },
    array: [...setBits],
    data: { array: [...setBits] }
  });

  // Step 3: Clear the i-th bit: N & ~(1 << i)
  const clearN = n & (~mask);
  const clearBits = to8BitArray(clearN);

  steps.push({
    step: steps.length,
    phase: 'reset',
    explanation: `Clear the ${targetBit}-th bit: Execute N & ~(1 << ${targetBit}). Resulting value is ${clearN} (0b${clearBits.join('')}). The ${targetBit}-th bit is forced to 0.`,
    pointers: [
      { name: 'bit cleared to 0', index: bitArrIdx, color: 'rose', position: 'top' }
    ],
    highlightIndices: [bitArrIdx],
    matchedIndices: [],
    dangerIndices: [bitArrIdx],
    metrics: {
      'Operation': `N & ~(1 << ${targetBit})`,
      'Old N': n,
      'New N': clearN,
      'Binary': `0b${clearBits.join('')}`
    },
    array: [...clearBits],
    data: { array: [...clearBits] }
  });

  // Step 4: Brian Kernighan's trick: N & (N - 1)
  const bkN = n & (n - 1);
  const bkBits = to8BitArray(bkN);

  steps.push({
    step: steps.length,
    phase: 'shrink',
    explanation: `Brian Kernighan's Algorithm: Execute N & (N - 1). This clears the rightmost set bit in O(1) time! ${n} & ${n - 1} = ${bkN} (0b${bkBits.join('')}).`,
    pointers: [],
    highlightIndices: bkBits.map((b, i) => (initialBits[i] !== b ? i : -1)).filter(i => i !== -1),
    matchedIndices: bkBits.map((b, i) => b === 1 ? i : -1).filter(i => i !== -1),
    dangerIndices: [],
    metrics: {
      'Operation': 'N & (N - 1)',
      'Initial N': n,
      'Removed Bit': 'Rightmost set bit',
      'Result': bkN
    },
    array: [...bkBits],
    data: { array: [...bkBits] }
  });

  // Step 5: Complete summary
  const setBitCount = initialBits.filter(b => b === 1).length;
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `Bitwise Inspection Complete! N = ${n} contains ${setBitCount} set bit(s). Is Power of 2: ${(n > 0 && (n & (n - 1)) === 0) ? 'YES' : 'NO'}. All operations run in O(1) time.`,
    pointers: [],
    highlightIndices: [],
    matchedIndices: initialBits.map((b, i) => b === 1 ? i : -1).filter(i => i !== -1),
    dangerIndices: [],
    isComplete: true,
    metrics: {
      'Decimal N': n,
      'Total Set Bits': setBitCount,
      'Is Power of 2': (n > 0 && (n & (n - 1)) === 0) ? 'True' : 'False',
      'Time Complexity': 'O(1) CPU cycles'
    },
    array: [...initialBits],
    data: { array: [...initialBits] }
  });

  return steps;
}
