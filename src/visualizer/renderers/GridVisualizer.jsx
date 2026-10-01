import React, { useState } from 'react';

/**
 * GridVisualizer
 * Renders 2D Dynamic Programming matrix and grid pathfinding algorithms.
 * Highlights current active cell, source dependency cells, and coordinate crosshairs.
 */
export function GridVisualizer({ snapshot }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  if (!snapshot || !snapshot.data || !snapshot.data.grid) {
    return <div className="text-zinc-500 text-sm py-8 text-center">No 2D grid data available for this step.</div>;
  }

  const { grid = [], rows = 0, cols = 0, activeCell = null, dependencies = [] } = snapshot.data;

  // Check if cell is in dependencies list
  const isDependency = (r, c) => {
    return dependencies.some(([dr, dc]) => dr === r && dc === c);
  };

  const isActive = (r, c) => {
    return activeCell && activeCell[0] === r && activeCell[1] === c;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-6 px-4 select-none">
      {/* Reticle / Coordinate status */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 bg-zinc-900/70 px-4 py-1.5 rounded-full border border-zinc-800">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>Active Cell: <strong className="text-cyan-300">({activeCell ? activeCell.join(', ') : 'None'})</strong></span>
        </span>
        {dependencies.length > 0 && (
          <>
            <span className="text-zinc-600">|</span>
            <span className="text-amber-400/90">
              Depends on: {dependencies.map(d => `(${d.join(',')})`).join(' + ')}
            </span>
          </>
        )}
      </div>

      {/* Grid Container */}
      <div className="relative overflow-x-auto p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-inner">
        {/* Column Headers */}
        <div className="flex items-center ml-10 mb-2 gap-2">
          {Array.from({ length: cols }, (_, c) => (
            <div
              key={`col-h-${c}`}
              className={`w-12 text-center font-mono text-[11px] ${
                activeCell && activeCell[1] === c ? 'text-cyan-400 font-bold' : 'text-zinc-500'
              }`}
            >
              c={c}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-2">
          {grid.map((rowArr, r) => (
            <div key={`row-${r}`} className="flex items-center gap-2">
              {/* Row Header */}
              <div
                className={`w-8 text-right font-mono text-[11px] pr-2 ${
                  activeCell && activeCell[0] === r ? 'text-cyan-400 font-bold' : 'text-zinc-500'
                }`}
              >
                r={r}
              </div>

              {/* Row Cells */}
              <div className="flex items-center gap-2">
                {rowArr.map((val, c) => {
                  const active = isActive(r, c);
                  const dep = isDependency(r, c);
                  const isGoal = r === rows - 1 && c === cols - 1;

                  let cellClasses = 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700';

                  if (active) {
                    cellClasses = 'bg-cyan-950/70 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/60 scale-105';
                  } else if (dep) {
                    cellClasses = 'bg-amber-950/40 border-amber-500/60 text-amber-200 ring-1 ring-amber-500/30 border-dashed animate-pulse';
                  } else if (val > 0) {
                    cellClasses = 'bg-zinc-800/70 border-zinc-750 text-zinc-100';
                  }

                  return (
                    <div
                      key={`cell-${r}-${c}`}
                      onMouseEnter={() => setHoveredCell({ r, c, val })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`relative w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-150 cursor-pointer ${cellClasses}`}
                    >
                      <span>{val}</span>

                      {/* Small Goal or Origin indicator */}
                      {r === 0 && c === 0 && (
                        <span className="absolute -top-1.5 -left-1.5 text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded px-1">
                          0,0
                        </span>
                      )}
                      {isGoal && (
                        <span className="absolute -bottom-1.5 -right-1.5 text-[8px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded px-1">
                          goal
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover inspector footer */}
      {hoveredCell && (
        <div className="text-xs font-mono text-zinc-400 bg-zinc-900/80 px-3 py-1 rounded-lg border border-zinc-800">
          Inspecting cell ({hoveredCell.r}, {hoveredCell.c}): value = <strong className="text-zinc-100">{hoveredCell.val}</strong>
        </div>
      )}
    </div>
  );
}
