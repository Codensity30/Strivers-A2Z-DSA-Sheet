/**
 * Problem-Specific Simulation: 2D Dynamic Programming (Grid Unique Paths)
 * Demonstrates 2D state transition table dp[r][c] = dp[r-1][c] + dp[r][c-1].
 */

export function simulateDpGrid(rows = 3, cols = 4) {
  const steps = [];

  // Initialize DP grid with 0s
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  steps.push({
    step: 0,
    phase: 'init',
    explanation: `Start 2D Dynamic Programming for Grid Unique Paths on a ${rows}x${cols} grid. Initialized DP table with 0s. Start cell (0, 0) has 1 unique path to itself.`,
    pointers: [{ name: 'start (0,0)', index: '0-0', color: 'indigo', position: 'top' }],
    highlightIndices: [],
    matchedIndices: [],
    dangerIndices: [],
    metrics: { 'Grid Size': `${rows} x ${cols}`, 'Active Cell': '(0, 0)', 'Target': `(${rows - 1}, ${cols - 1})` },
    data: {
      type: 'grid',
      rows,
      cols,
      grid: grid.map(r => [...r]),
      activeCell: [0, 0],
      dependencies: []
    }
  });

  // Base cases: 1st row and 1st column are all 1
  for (let r = 0; r < rows; r++) {
    grid[r][0] = 1;
    steps.push({
      step: steps.length,
      phase: 'init',
      explanation: `Base Case: At cell (${r}, 0), only 1 path exists (moving straight down). Setting dp[${r}][0] = 1.`,
      pointers: [{ name: `dp[${r}][0]`, index: `${r}-0`, color: 'emerald', position: 'top' }],
      highlightIndices: [],
      matchedIndices: [],
      dangerIndices: [],
      metrics: { 'Active Cell': `(${r}, 0)`, 'Formula': 'Base case = 1', 'Value': 1 },
      data: {
        type: 'grid',
        rows,
        cols,
        grid: grid.map(row => [...row]),
        activeCell: [r, 0],
        dependencies: []
      }
    });
  }

  for (let c = 1; c < cols; c++) {
    grid[0][c] = 1;
    steps.push({
      step: steps.length,
      phase: 'init',
      explanation: `Base Case: At cell (0, ${c}), only 1 path exists (moving straight right). Setting dp[0][${c}] = 1.`,
      pointers: [{ name: `dp[0][${c}]`, index: `0-${c}`, color: 'emerald', position: 'top' }],
      highlightIndices: [],
      matchedIndices: [],
      dangerIndices: [],
      metrics: { 'Active Cell': `(0, ${c})`, 'Formula': 'Base case = 1', 'Value': 1 },
      data: {
        type: 'grid',
        rows,
        cols,
        grid: grid.map(row => [...row]),
        activeCell: [0, c],
        dependencies: []
      }
    });
  }

  // Fill inner cells
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      const fromTop = grid[r - 1][c];
      const fromLeft = grid[r][c - 1];
      grid[r][c] = fromTop + fromLeft;

      steps.push({
        step: steps.length,
        phase: 'compare',
        explanation: `At cell (${r}, ${c}): Paths from top dp[${r - 1}][${c}] = ${fromTop}, paths from left dp[${r}][${c - 1}] = ${fromLeft}. Total unique paths dp[${r}][${c}] = ${fromTop} + ${fromLeft} = ${grid[r][c]}.`,
        pointers: [{ name: `dp[${r}][${c}]`, index: `${r}-${c}`, color: 'cyan', position: 'top' }],
        highlightIndices: [],
        matchedIndices: [],
        dangerIndices: [],
        metrics: {
          'Active Cell': `(${r}, ${c})`,
          'Formula': `dp[${r-1}][${c}] (${fromTop}) + dp[${r}][${c-1}] (${fromLeft})`,
          'Computed Value': grid[r][c]
        },
        data: {
          type: 'grid',
          rows,
          cols,
          grid: grid.map(row => [...row]),
          activeCell: [r, c],
          dependencies: [[r - 1, c], [r, c - 1]]
        }
      });
    }
  }

  // Complete step
  const finalAns = grid[rows - 1][cols - 1];
  steps.push({
    step: steps.length,
    phase: 'complete',
    explanation: `2D DP Complete! Destination cell (${rows - 1}, ${cols - 1}) has ${finalAns} total unique paths from (0, 0).`,
    pointers: [{ name: 'GOAL', index: `${rows - 1}-${cols - 1}`, color: 'emerald', position: 'top' }],
    highlightIndices: [],
    matchedIndices: [],
    dangerIndices: [],
    isComplete: true,
    metrics: { 'Target Cell': `(${rows - 1}, ${cols - 1})`, 'Total Unique Paths': finalAns, 'Status': 'Complete' },
    data: {
      type: 'grid',
      rows,
      cols,
      grid: grid.map(row => [...row]),
      activeCell: [rows - 1, cols - 1],
      dependencies: []
    }
  });

  return steps;
}
