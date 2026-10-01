/**
 * @typedef {'init' | 'compare' | 'swap' | 'partition' | 'expand' | 'shrink' | 'push' | 'pop' | 'visit' | 'found' | 'complete' | 'reset'} StepPhase
 *
 * @typedef {Object} PointerInfo
 * @property {string} name - Pointer label (e.g. 'i', 'j', 'low', 'mid', 'high', 'slow', 'fast')
 * @property {number | string} index - Target index or node ID
 * @property {string} [color] - Accent color theme ('indigo' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple')
 * @property {'top' | 'bottom'} [position] - Pointer label placement
 *
 * @typedef {Object} VisualizerSnapshot
 * @property {number} step - Current 0-based step index
 * @property {StepPhase} phase - Algorithmic phase
 * @property {string} explanation - Human-readable explanation of current operation
 * @property {number} [codeLineHighlight] - Line number in optimal C++ code to highlight
 * @property {PointerInfo[]} [pointers] - Active pointer chips
 * @property {number[]} [highlightIndices] - Cells being actively inspected or calculated
 * @property {number[]} [matchedIndices] - Cells that matched target or are in final sorted position
 * @property {number[]} [dangerIndices] - Cells being discarded, reset, or swapped out
 * @property {[number, number]} [window] - Active sliding window range [left, right]
 * @property {Record<string, string | number | boolean>} [metrics] - Key variables for metrics bar
 * @property {*} data - Renderer-specific data payload
 */

export {};
