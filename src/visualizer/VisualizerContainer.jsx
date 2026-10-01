import React, { useState, useMemo } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Zap, Sliders, CheckCircle2 } from 'lucide-react';
import { getEngine } from './engines/engineRegistry.js';
import { useVisualizer } from './useVisualizer.js';
import { ArrayVisualizer } from './renderers/ArrayVisualizer.jsx';
import { GridVisualizer } from './renderers/GridVisualizer.jsx';
import { NodeLinkVisualizer } from './renderers/NodeLinkVisualizer.jsx';

/**
 * VisualizerContainer
 * High-performance, obsidian dark theme visualizer container with
 * problem-specific simulation, playback scrubber, metrics, and custom inputs.
 */
export function VisualizerContainer({ problem }) {
  const engine = useMemo(() => getEngine(problem?.visualizationType), [problem?.visualizationType]);

  // Custom inputs state initialized with engine defaults
  const [customInputs, setCustomInputs] = useState(() => ({
    arrayStr: engine.defaultInputs.array ? engine.defaultInputs.array.join(', ') : '',
    target: engine.defaultInputs.target ?? '',
    rows: engine.defaultInputs.rows ?? 3,
    cols: engine.defaultInputs.cols ?? 4
  }));

  const [activeInputs, setActiveInputs] = useState(() => ({ ...engine.defaultInputs }));

  // Generate simulation step snapshots
  const steps = useMemo(() => {
    try {
      return engine.generateSteps(activeInputs);
    } catch (err) {
      console.error('Error generating simulation steps:', err);
      return [];
    }
  }, [engine, activeInputs]);

  // Headless playback engine hook
  const {
    currentStepIndex,
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    progressPercent,
    isAtStart,
    isAtEnd,
    togglePlay,
    stepForward,
    stepBack,
    reset,
    jumpTo,
    setSpeed
  } = useVisualizer(steps, { initialSpeed: 1000 });

  // Handle applying custom user input
  const handleApplyInputs = (e) => {
    e.preventDefault();
    const updated = { ...activeInputs };

    if (customInputs.arrayStr) {
      const parsedArray = customInputs.arrayStr
        .split(',')
        .map(s => Number(s.trim()))
        .filter(n => !isNaN(n));
      if (parsedArray.length > 0) {
        updated.array = parsedArray;
      }
    }

    if (customInputs.target !== '' && !isNaN(Number(customInputs.target))) {
      updated.target = Number(customInputs.target);
    }

    if (customInputs.rows) updated.rows = Number(customInputs.rows);
    if (customInputs.cols) updated.cols = Number(customInputs.cols);

    setActiveInputs(updated);
  };

  // Phase badges styling
  const phaseColors = {
    init: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    compare: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40',
    swap: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
    found: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
    expand: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
    shrink: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
    push: 'bg-purple-950/60 text-purple-300 border-purple-500/40',
    pop: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
    visit: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
    reset: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
    complete: 'bg-emerald-950/80 text-emerald-200 border-emerald-500/60 ring-1 ring-emerald-500/40'
  };

  const currentPhase = currentStep?.phase || 'init';
  const phaseBadgeClass = phaseColors[currentPhase] || phaseColors.init;

  return (
    <div className="w-full rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl overflow-hidden mb-6 backdrop-blur-xl">
      {/* Visualizer Top Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-900/50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-zinc-100">{engine.name}</h4>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                {engine.category}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Step-by-step problem-specific simulation engine</p>
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500 font-medium">Speed:</span>
          <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5">
            {[
              { label: '0.5x', ms: 1500 },
              { label: '1.0x', ms: 1000 },
              { label: '2.0x', ms: 500 }
            ].map(s => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.ms)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  speed === s.ms
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Input Bar (Tailored to specific problem) */}
      {(engine.inputConfig.arrayLabel || engine.inputConfig.hasTarget || engine.inputConfig.hasGridDims) && (
        <form
          onSubmit={handleApplyInputs}
          className="flex items-center flex-wrap gap-3 px-5 py-2.5 bg-zinc-900/30 border-b border-zinc-800/50 text-xs font-mono"
        >
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Sliders className="w-3.5 h-3.5 text-zinc-500" />
            <span>Inputs:</span>
          </div>

          {engine.inputConfig.arrayLabel && (
            <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
              <input
                type="text"
                value={customInputs.arrayStr}
                onChange={e => setCustomInputs({ ...customInputs, arrayStr: e.target.value })}
                placeholder="e.g. 2, 7, 11, 15"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 text-xs"
              />
            </div>
          )}

          {engine.inputConfig.hasTarget && (
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">{engine.inputConfig.targetLabel || 'Target'}:</span>
              <input
                type="number"
                value={customInputs.target}
                onChange={e => setCustomInputs({ ...customInputs, target: e.target.value })}
                className="w-20 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-zinc-200 focus:outline-none focus:border-indigo-500/60 text-xs text-center"
              />
            </div>
          )}

          {engine.inputConfig.hasGridDims && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Rows:</span>
              <input
                type="number"
                min="2"
                max="6"
                value={customInputs.rows}
                onChange={e => setCustomInputs({ ...customInputs, rows: e.target.value })}
                className="w-14 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-zinc-200 text-center"
              />
              <span className="text-zinc-500">Cols:</span>
              <input
                type="number"
                min="2"
                max="6"
                value={customInputs.cols}
                onChange={e => setCustomInputs({ ...customInputs, cols: e.target.value })}
                className="w-14 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-zinc-200 text-center"
              />
            </div>
          )}

          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-sans font-medium transition"
          >
            Apply Data
          </button>
        </form>
      )}

      {/* Main Interactive Stage */}
      <div className="min-h-[220px] flex items-center justify-center p-4 bg-zinc-950/50">
        {engine.category === 'array' && <ArrayVisualizer snapshot={currentStep} />}
        {engine.category === 'grid' && <GridVisualizer snapshot={currentStep} />}
        {engine.category === 'nodelink' && <NodeLinkVisualizer snapshot={currentStep} />}
      </div>

      {/* Dynamic Metrics Panel */}
      {currentStep?.metrics && (
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap px-5 py-2.5 bg-zinc-900/40 border-t border-zinc-800/60 text-xs font-mono">
          {Object.entries(currentStep.metrics).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-400">{key}:</span>
              <span className="text-indigo-300 font-bold">{String(val)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Step Explanation & Narrative */}
      <div className="px-5 py-3.5 bg-zinc-900/70 border-t border-zinc-800">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded border ${phaseBadgeClass}`}>
              {currentPhase}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Step {currentStepIndex + 1} of {Math.max(1, totalSteps)}
            </span>
          </div>
          {currentStep?.isComplete && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Algorithm Finished
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
          {currentStep?.explanation || 'Loading step explanation...'}
        </p>
      </div>

      {/* Timeline Scrubber */}
      <div className="px-5 pt-3 pb-1 bg-zinc-900/90 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
          <span>Timeline Scrubber</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={e => jumpTo(Number(e.target.value))}
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition"
        />
      </div>

      {/* Playback Controls & Keyboard Hints */}
      <div className="flex items-center justify-between flex-wrap gap-4 px-5 py-3 bg-zinc-900 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            title="Reset to beginning (R)"
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={stepBack}
            disabled={isAtStart}
            title="Step Back (←)"
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{isAtEnd ? 'Replay' : 'Play'}</span>
              </>
            )}
          </button>

          <button
            onClick={stepForward}
            disabled={isAtEnd}
            title="Step Forward (→)"
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard hints */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-zinc-500">
          <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">Space</kbd> Play/Pause</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">→</kbd> Step</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">R</kbd> Reset</span>
        </div>
      </div>
    </div>
  );
}
