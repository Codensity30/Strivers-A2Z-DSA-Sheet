import React from 'react';

/**
 * ArrayVisualizer
 * Renders 1D array blocks with layout transitions, floating pointer badges,
 * sliding window brackets, and stack/queue sub-panels.
 */
export function ArrayVisualizer({ snapshot }) {
  if (!snapshot || !snapshot.data) {
    return <div className="text-zinc-500 text-sm py-8 text-center">No array data available for this step.</div>;
  }

  const { array = [] } = snapshot.data;
  const {
    pointers = [],
    highlightIndices = [],
    matchedIndices = [],
    dangerIndices = [],
    window: activeWindow = null,
    data = {}
  } = snapshot;

  // Stack data if available
  const stack = data.stack || null;
  const result = data.result || null;

  // Pointer color maps
  const pointerColorMap = {
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/20',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-amber-500/20',
    indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40 shadow-indigo-500/20',
    rose: 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-rose-500/20',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-cyan-500/20',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-purple-500/20',
  };

  // Group pointers by index and position
  const topPointersByIndex = {};
  const bottomPointersByIndex = {};

  pointers.forEach(p => {
    const idx = Number(p.index);
    if (isNaN(idx)) return;
    const pos = p.position || 'bottom';
    if (pos === 'top') {
      if (!topPointersByIndex[idx]) topPointersByIndex[idx] = [];
      topPointersByIndex[idx].push(p);
    } else {
      if (!bottomPointersByIndex[idx]) bottomPointersByIndex[idx] = [];
      bottomPointersByIndex[idx].push(p);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6 px-4 select-none">
      {/* Sliding Window Bracket (if present) */}
      {activeWindow && (
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/60 px-3 py-1 rounded-full border border-zinc-800">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>Window Range: [{activeWindow[0]} .. {activeWindow[1]}]</span>
          <span className="text-zinc-500">|</span>
          <span>Size: {Math.max(0, activeWindow[1] - activeWindow[0] + 1)}</span>
        </div>
      )}

      {/* Main Array Stage */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-full overflow-x-auto py-8 px-2">
        {array.map((val, idx) => {
          const isHighlighted = highlightIndices.includes(idx);
          const isMatched = matchedIndices.includes(idx);
          const isDanger = dangerIndices.includes(idx);
          const isInWindow = activeWindow && idx >= activeWindow[0] && idx <= activeWindow[1];

          // Determine cell styling
          let cellStyle = 'bg-zinc-900 border-zinc-800 text-zinc-100 shadow-sm';
          if (isMatched) {
            cellStyle = 'bg-emerald-950/60 border-emerald-500/70 text-emerald-200 shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/30';
          } else if (isHighlighted) {
            cellStyle = 'bg-indigo-950/60 border-indigo-500/70 text-indigo-100 shadow-lg shadow-indigo-950/50 ring-2 ring-indigo-500/30';
          } else if (isDanger) {
            cellStyle = 'bg-rose-950/30 border-rose-500/40 text-rose-300 opacity-60';
          } else if (isInWindow) {
            cellStyle = 'bg-zinc-800/80 border-indigo-500/30 text-zinc-100 ring-1 ring-indigo-500/20';
          }

          const topPointers = topPointersByIndex[idx] || [];
          const bottomPointers = bottomPointersByIndex[idx] || [];

          return (
            <div key={`cell-${idx}`} className="relative flex flex-col items-center">
              {/* Top Pointers */}
              <div className="absolute -top-7 flex flex-col items-center gap-0.5">
                {topPointers.map((p, pIdx) => {
                  const colorClass = pointerColorMap[p.color || 'emerald'] || pointerColorMap.emerald;
                  return (
                    <span
                      key={`top-p-${pIdx}`}
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shadow-sm ${colorClass} animate-bounce`}
                    >
                      {p.name}
                    </span>
                  );
                })}
              </div>

              {/* Array Element Block */}
              <div
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-base sm:text-lg transition-all duration-200 ${cellStyle}`}
              >
                <span>{val}</span>
                <span className="text-[10px] font-normal text-zinc-500 mt-0.5">i={idx}</span>
              </div>

              {/* Bottom Pointers */}
              <div className="absolute -bottom-7 flex flex-col items-center gap-0.5">
                {bottomPointers.map((p, pIdx) => {
                  const colorClass = pointerColorMap[p.color || 'indigo'] || pointerColorMap.indigo;
                  return (
                    <span
                      key={`bot-p-${pIdx}`}
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shadow-sm ${colorClass}`}
                    >
                      {p.name}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Auxiliary Display: Stack or Result if present */}
      {stack && (
        <div className="w-full max-w-md mt-2 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Stack (Top on right):</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {stack.length === 0 ? (
                <span className="text-zinc-600 italic">empty</span>
              ) : (
                stack.map((item, idx) => (
                  <span
                    key={`stack-${idx}`}
                    className={`px-2 py-0.5 rounded border text-xs font-bold ${
                      idx === stack.length - 1
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 ring-1 ring-indigo-500/30'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>
          <span className="text-zinc-500 text-[11px]">Size: {stack.length}</span>
        </div>
      )}

      {result && (
        <div className="w-full max-w-md p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex items-center gap-3 text-xs font-mono">
          <span className="text-zinc-400">NGE Result:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {result.map((resVal, rIdx) => (
              <span
                key={`res-${rIdx}`}
                className={`px-2 py-0.5 rounded border text-xs ${
                  resVal !== -1
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-zinc-800/60 text-zinc-500 border-zinc-700'
                }`}
              >
                {resVal}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
