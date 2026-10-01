/**
 * Algorithm Visualizer Engine
 * Generates deterministic simulation step sequences for classic DSA algorithms
 * and mounts interactive UI controls in the browser.
 */

// 1. Kadane's Algorithm Simulation
export function simulateKadane(nums) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let maxSum = nums[0];
  let currentSum = 0;
  let start = 0;
  let maxStart = 0;
  let maxEnd = 0;

  steps.push({
    step: 0,
    currentIndex: -1,
    currentSum: 0,
    maxSum: nums[0],
    currentWindow: [0, 0],
    maxWindow: [0, 0],
    array: [...nums],
    explanation: `Initialize Kadane's algorithm: maxSum = ${nums[0]}, currentSum = 0.`
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    currentSum += val;

    let resetOccurred = false;
    let newMaxOccurred = false;

    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxStart = start;
      maxEnd = i;
      newMaxOccurred = true;
    }

    steps.push({
      step: steps.length,
      currentIndex: i,
      currentVal: val,
      currentSum,
      maxSum,
      currentWindow: [start, i],
      maxWindow: [maxStart, maxEnd],
      array: [...nums],
      explanation: newMaxOccurred
        ? `At index ${i} (${val}): currentSum is now ${currentSum}, which exceeds previous maxSum! Updated maxSum to ${maxSum} with window [${maxStart}..${maxEnd}].`
        : `At index ${i} (${val}): currentSum is ${currentSum}. (maxSum remains ${maxSum})`
    });

    if (currentSum < 0) {
      currentSum = 0;
      start = i + 1;
      resetOccurred = true;
      steps.push({
        step: steps.length,
        currentIndex: i,
        currentVal: val,
        currentSum: 0,
        maxSum,
        currentWindow: [start, start],
        maxWindow: [maxStart, maxEnd],
        array: [...nums],
        explanation: `currentSum dropped below 0 (${val + currentSum - val} < 0), so reset currentSum to 0 and shift start pointer to index ${start}.`
      });
    }
  }

  // Final summary step
  steps.push({
    step: steps.length,
    currentIndex: -1,
    currentSum,
    maxSum,
    currentWindow: [maxStart, maxEnd],
    maxWindow: [maxStart, maxEnd],
    array: [...nums],
    isComplete: true,
    explanation: `Algorithm Complete! Maximum subarray sum is ${maxSum} spanning indices [${maxStart}..${maxEnd}] (subarray: [${nums.slice(maxStart, maxEnd + 1).join(', ')}]).`
  });

  return steps;
}

// 2. Binary Search Simulation
export function simulateBinarySearch(nums, target) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let low = 0;
  let high = nums.length - 1;
  let found = false;
  let foundIndex = -1;

  steps.push({
    step: 0,
    low,
    high,
    mid: -1,
    target,
    found: false,
    array: [...nums],
    explanation: `Start Binary Search for target ${target} across range [${low}..${high}].`
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];

    if (midVal === target) {
      found = true;
      foundIndex = mid;
      steps.push({
        step: steps.length,
        low,
        high,
        mid,
        midVal,
        target,
        found: true,
        array: [...nums],
        explanation: `Target ${target} found at mid index ${mid}! (nums[${mid}] === ${target})`
      });
      break;
    } else if (midVal < target) {
      steps.push({
        step: steps.length,
        low,
        high,
        mid,
        midVal,
        target,
        found: false,
        array: [...nums],
        explanation: `nums[${mid}] = ${midVal} < ${target}. Eliminate left half [${low}..${mid}]. Set low = ${mid + 1}.`
      });
      low = mid + 1;
    } else {
      steps.push({
        step: steps.length,
        low,
        high,
        mid,
        midVal,
        target,
        found: false,
        array: [...nums],
        explanation: `nums[${mid}] = ${midVal} > ${target}. Eliminate right half [${mid}..${high}]. Set high = ${mid - 1}.`
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      step: steps.length,
      low,
      high,
      mid: -1,
      target,
      found: false,
      isComplete: true,
      array: [...nums],
      explanation: `Search exhausted: low (${low}) > high (${high}). Target ${target} does not exist in array.`
    });
  }

  return steps;
}

// 3. Two Sum Simulation (Hash Map approach)
export function simulateTwoSum(nums, target) {
  if (!nums || nums.length === 0) return [];
  const steps = [];
  const map = Object.create(null);
  let found = false;
  let pairIndices = [];

  steps.push({
    step: 0,
    currentIndex: -1,
    target,
    mapState: {},
    found: false,
    pairIndices: [],
    array: [...nums],
    explanation: `Initialize empty hash map to store seen elements and their indices for target sum ${target}.`
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    const complement = target - val;

    if (map[complement] !== undefined) {
      found = true;
      pairIndices = [map[complement], i];
      steps.push({
        step: steps.length,
        currentIndex: i,
        currentVal: val,
        target,
        complement,
        mapState: { ...map },
        found: true,
        pairIndices: [...pairIndices],
        array: [...nums],
        explanation: `Index ${i} (${val}): complement ${target} - ${val} = ${complement} FOUND in map at index ${map[complement]}! Pair: indices [${pairIndices.join(', ')}].`
      });
      break;
    } else {
      steps.push({
        step: steps.length,
        currentIndex: i,
        currentVal: val,
        target,
        complement,
        mapState: { ...map },
        found: false,
        pairIndices: [],
        array: [...nums],
        explanation: `Index ${i} (${val}): complement ${target} - ${val} = ${complement} not in map yet. Adding nums[${i}] = ${val} -> index ${i} to map.`
      });
      map[val] = i;
    }
  }

  if (!found) {
    steps.push({
      step: steps.length,
      currentIndex: -1,
      target,
      mapState: { ...map },
      found: false,
      pairIndices: [],
      array: [...nums],
      isComplete: true,
      explanation: `No two numbers in the array sum to ${target}.`
    });
  }

  return steps;
}

// 4. Dutch National Flag (Sort 0 1 2) Simulation
export function simulateDutchFlag(nums) {
  if (!nums || nums.length === 0) return [];
  const arr = [...nums];
  const steps = [];

  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  steps.push({
    step: 0,
    array: [...arr],
    low,
    mid,
    high,
    action: 'init',
    explanation: `Dutch National Flag 3-pointer setup: low = 0, mid = 0, high = ${high}. (0s go left of low, 1s between low and mid, 2s right of high).`
  });

  while (mid <= high) {
    const val = arr[mid];

    if (val === 0) {
      // Swap arr[low] and arr[mid]
      const temp = arr[low];
      arr[low] = arr[mid];
      arr[mid] = temp;

      steps.push({
        step: steps.length,
        array: [...arr],
        low,
        mid,
        high,
        action: 'swap_low',
        explanation: `arr[mid=${mid}] is 0: Swap arr[low=${low}] (${temp}) with arr[mid=${mid}] (0). Increment low to ${low + 1} and mid to ${mid + 1}.`
      });
      low++;
      mid++;
    } else if (val === 1) {
      steps.push({
        step: steps.length,
        array: [...arr],
        low,
        mid,
        high,
        action: 'advance_mid',
        explanation: `arr[mid=${mid}] is 1: Already in correct middle section. Just increment mid to ${mid + 1}.`
      });
      mid++;
    } else {
      // Swap arr[mid] and arr[high]
      const temp = arr[high];
      arr[high] = arr[mid];
      arr[mid] = temp;

      steps.push({
        step: steps.length,
        array: [...arr],
        low,
        mid,
        high,
        action: 'swap_high',
        explanation: `arr[mid=${mid}] is 2: Swap arr[mid=${mid}] (2) with arr[high=${high}] (${temp}). Decrement high to ${high - 1}. (mid not incremented because swapped element must be checked).`
      });
      high--;
    }
  }

  steps.push({
    step: steps.length,
    array: [...arr],
    low,
    mid,
    high,
    action: 'complete',
    isComplete: true,
    explanation: `Array sorted in-place in O(N) time and O(1) space: [${arr.join(', ')}].`
  });

  return steps;
}

// 5. Majority Element (Boyer-Moore Voting) Simulation
export function simulateMajorityElement(nums) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  let candidate = nums[0];
  let count = 0;

  steps.push({
    step: 0,
    currentIndex: -1,
    candidate,
    count: 0,
    array: [...nums],
    explanation: `Initialize Boyer-Moore Voting Algorithm: candidate = ${candidate}, count = 0.`
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];

    if (count === 0) {
      candidate = val;
      count = 1;
      steps.push({
        step: steps.length,
        currentIndex: i,
        currentVal: val,
        candidate,
        count,
        array: [...nums],
        explanation: `Count reached 0: pick new candidate = ${candidate} at index ${i}, set count = 1.`
      });
    } else if (val === candidate) {
      count++;
      steps.push({
        step: steps.length,
        currentIndex: i,
        currentVal: val,
        candidate,
        count,
        array: [...nums],
        explanation: `Element at index ${i} (${val}) matches candidate (${candidate}): increment count to ${count}.`
      });
    } else {
      count--;
      steps.push({
        step: steps.length,
        currentIndex: i,
        currentVal: val,
        candidate,
        count,
        array: [...nums],
        explanation: `Element at index ${i} (${val}) differs from candidate (${candidate}): decrement count to ${count}.`
      });
    }
  }

  steps.push({
    step: steps.length,
    currentIndex: -1,
    candidate,
    count,
    array: [...nums],
    isComplete: true,
    explanation: `Voting complete! Majority element candidate is ${candidate}.`
  });

  return steps;
}

// 6. Generic Array Stepper
export function simulateArrayStepper(nums) {
  if (!nums || nums.length === 0) return [];
  const steps = [];

  steps.push({
    step: 0,
    currentIndex: -1,
    array: [...nums],
    explanation: `Array initialized with ${nums.length} elements: [${nums.join(', ')}].`
  });

  for (let i = 0; i < nums.length; i++) {
    steps.push({
      step: steps.length,
      currentIndex: i,
      currentVal: nums[i],
      array: [...nums],
      explanation: `Inspecting element at index ${i}: value = ${nums[i]}.`
    });
  }

  steps.push({
    step: steps.length,
    currentIndex: -1,
    array: [...nums],
    isComplete: true,
    explanation: `Completed traversing all elements in the array.`
  });

  return steps;
}

/**
 * Visualizer Controller Class for UI rendering
 */
export class VisualizerController {
  constructor(containerElement, problem) {
    this.container = containerElement;
    this.problem = problem;
    this.steps = [];
    this.currentStepIdx = 0;
    this.timer = null;
    this.speed = 1000;
    this.init();
  }

  init() {
    this.loadDefaultData();
    this.generateSteps();
    this.render();
  }

  loadDefaultData() {
    const vType = this.problem.visualizationType;
    if (vType === 'kadane') {
      this.inputData = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    } else if (vType === 'binary-search') {
      this.inputData = [1, 3, 5, 7, 9, 11, 13];
      this.target = 7;
    } else if (vType === 'two-sum') {
      this.inputData = [2, 7, 11, 15];
      this.target = 9;
    } else if (vType === 'dutch-flag') {
      this.inputData = [2, 0, 2, 1, 1, 0];
    } else if (vType === 'majority-element') {
      this.inputData = [2, 2, 1, 1, 1, 2, 2];
    } else {
      this.inputData = [12, 35, 1, 10, 34, 1];
    }
  }

  generateSteps() {
    const vType = this.problem.visualizationType;
    if (vType === 'kadane') {
      this.steps = simulateKadane(this.inputData);
    } else if (vType === 'binary-search') {
      this.steps = simulateBinarySearch(this.inputData, this.target || 7);
    } else if (vType === 'two-sum') {
      this.steps = simulateTwoSum(this.inputData, this.target || 9);
    } else if (vType === 'dutch-flag') {
      this.steps = simulateDutchFlag(this.inputData);
    } else if (vType === 'majority-element') {
      this.steps = simulateMajorityElement(this.inputData);
    } else {
      this.steps = simulateArrayStepper(this.inputData);
    }
    this.currentStepIdx = 0;
  }

  play() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (this.currentStepIdx < this.steps.length - 1) {
        this.stepForward();
      } else {
        this.pause();
      }
    }, this.speed);
    this.updateControlsUI();
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.updateControlsUI();
  }

  stepForward() {
    if (this.currentStepIdx < this.steps.length - 1) {
      this.currentStepIdx++;
      this.renderStep();
    }
  }

  stepBack() {
    if (this.currentStepIdx > 0) {
      this.currentStepIdx--;
      this.renderStep();
    }
  }

  reset() {
    this.pause();
    this.currentStepIdx = 0;
    this.renderStep();
  }

  setSpeed(ms) {
    this.speed = ms;
    if (this.timer) {
      this.pause();
      this.play();
    }
  }

  updateControlsUI() {
    const playBtn = this.container.querySelector('.btn-viz-play');
    if (playBtn) {
      playBtn.textContent = this.timer ? '⏸ Pause' : '▶ Play';
    }
  }

  render() {
    if (!this.container) return;

    const vType = this.problem.visualizationType || 'array-stepper';
    const typeLabel = vType
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    this.container.innerHTML = `
      <div class="visualizer-box">
        <div class="visualizer-header">
          <div class="visualizer-title">
            <span class="viz-icon">⚡</span>
            <span>Interactive Visualizer: <strong>${typeLabel}</strong></span>
          </div>
          <div class="visualizer-speed">
            <label>Speed:</label>
            <select class="viz-speed-select">
              <option value="1500">0.5x</option>
              <option value="1000" selected>1.0x</option>
              <option value="500">2.0x</option>
            </select>
          </div>
        </div>

        <div class="visualizer-input-bar">
          <label>Array:</label>
          <input type="text" class="viz-input-array" value="${this.inputData.join(', ')}" />
          ${
            this.target !== undefined
              ? `<label>Target:</label><input type="number" class="viz-input-target" value="${this.target}" style="width: 70px;" />`
              : ''
          }
          <button class="viz-btn viz-btn-secondary btn-apply-input">Apply</button>
        </div>

        <div class="visualizer-stage">
          <div class="viz-array-container"></div>
          <div class="viz-metrics-bar"></div>
        </div>

        <div class="visualizer-explanation">
          <div class="viz-step-counter">Step 0 of 0</div>
          <div class="viz-step-text">Loading visualization...</div>
        </div>

        <div class="visualizer-controls">
          <button class="viz-btn viz-btn-secondary btn-viz-reset" title="Reset to start">⏮ Reset</button>
          <button class="viz-btn viz-btn-secondary btn-viz-prev" title="Previous step">◀ Step</button>
          <button class="viz-btn viz-btn-primary btn-viz-play" title="Play / Pause">▶ Play</button>
          <button class="viz-btn viz-btn-secondary btn-viz-next" title="Next step">Step ▶</button>
        </div>
      </div>
    `;

    // Attach event listeners
    this.container.querySelector('.btn-viz-play')?.addEventListener('click', () => {
      if (this.timer) this.pause();
      else this.play();
    });

    this.container.querySelector('.btn-viz-prev')?.addEventListener('click', () => this.stepBack());
    this.container.querySelector('.btn-viz-next')?.addEventListener('click', () => this.stepForward());
    this.container.querySelector('.btn-viz-reset')?.addEventListener('click', () => this.reset());

    this.container.querySelector('.viz-speed-select')?.addEventListener('change', (e) => {
      this.setSpeed(parseInt(e.target.value, 10));
    });

    this.container.querySelector('.btn-apply-input')?.addEventListener('click', () => {
      const arrInput = this.container.querySelector('.viz-input-array')?.value;
      if (arrInput) {
        const parsed = arrInput
          .split(',')
          .map(s => parseInt(s.trim(), 10))
          .filter(n => !isNaN(n));
        if (parsed.length > 0) {
          this.inputData = parsed;
        }
      }
      const targetInput = this.container.querySelector('.viz-input-target');
      if (targetInput) {
        const tVal = parseInt(targetInput.value, 10);
        if (!isNaN(tVal)) this.target = tVal;
      }
      this.pause();
      this.generateSteps();
      this.renderStep();
    });

    this.renderStep();
  }

  renderStep() {
    if (!this.steps || this.steps.length === 0) return;
    const step = this.steps[this.currentStepIdx];
    const arrayContainer = this.container.querySelector('.viz-array-container');
    const metricsBar = this.container.querySelector('.viz-metrics-bar');
    const counter = this.container.querySelector('.viz-step-counter');
    const text = this.container.querySelector('.viz-step-text');

    if (counter) counter.textContent = `Step ${this.currentStepIdx + 1} of ${this.steps.length}`;
    if (text) text.textContent = step.explanation;

    const arr = step.array || this.inputData;
    if (arrayContainer) {
      arrayContainer.innerHTML = '';
      arr.forEach((val, idx) => {
        const item = document.createElement('div');
        item.className = 'viz-array-item';

        // Check highlights
        if (step.currentIndex === idx) item.classList.add('active');
        if (step.currentWindow && idx >= step.currentWindow[0] && idx <= step.currentWindow[1]) {
          item.classList.add('in-window');
        }
        if (step.maxWindow && idx >= step.maxWindow[0] && idx <= step.maxWindow[1]) {
          item.classList.add('in-max-window');
        }
        if (step.low === idx) item.classList.add('ptr-low');
        if (step.mid === idx) item.classList.add('ptr-mid');
        if (step.high === idx) item.classList.add('ptr-high');
        if (step.pairIndices && step.pairIndices.includes(idx)) item.classList.add('matched');

        // Pointer label indicators
        const pointers = [];
        if (step.low === idx) pointers.push('low');
        if (step.mid === idx) pointers.push('mid');
        if (step.high === idx) pointers.push('high');
        if (step.currentIndex === idx && !pointers.length) pointers.push('i');

        item.innerHTML = `
          <div class="viz-item-pointer">${pointers.join(', ')}</div>
          <div class="viz-item-box">${val}</div>
          <div class="viz-item-index">${idx}</div>
        `;
        arrayContainer.appendChild(item);
      });
    }

    // Metrics rendering
    if (metricsBar) {
      const metrics = [];
      if (step.currentSum !== undefined) metrics.push(`currentSum: <strong>${step.currentSum}</strong>`);
      if (step.maxSum !== undefined) metrics.push(`maxSum: <strong>${step.maxSum}</strong>`);
      if (step.target !== undefined) metrics.push(`target: <strong>${step.target}</strong>`);
      if (step.candidate !== undefined) metrics.push(`candidate: <strong>${step.candidate}</strong>`);
      if (step.count !== undefined) metrics.push(`count: <strong>${step.count}</strong>`);
      if (step.complement !== undefined) metrics.push(`complement: <strong>${step.complement}</strong>`);

      metricsBar.innerHTML = metrics.map(m => `<span class="viz-metric-pill">${m}</span>`).join(' ');
    }
  }

  destroy() {
    this.pause();
  }
}

// Re-export all modern visualizer engines for unified access
export { simulateStringAlgo } from '../src/visualizer/engines/stringAlgo.js';
export { simulateRecursionTree } from '../src/visualizer/engines/recursionTree.js';
export { simulateBitManipulation } from '../src/visualizer/engines/bitManipulation.js';
export { simulateHeapPriorityQueue } from '../src/visualizer/engines/heapPriorityQueue.js';
export { simulateGreedyIntervals } from '../src/visualizer/engines/greedyIntervals.js';
export { simulateTriePrefixTree } from '../src/visualizer/engines/triePrefixTree.js';
export { simulateStringMatchingKmp } from '../src/visualizer/engines/stringMatchingKmp.js';
export { simulateBinarySearchTree } from '../src/visualizer/engines/binarySearchTree.js';

