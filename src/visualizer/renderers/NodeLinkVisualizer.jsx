import React from 'react';

/**
 * NodeLinkVisualizer
 * Renders graph structures, binary tree hierarchies (SVG + DOM),
 * and linked list pointer chains.
 */
export function NodeLinkVisualizer({ snapshot }) {
  if (!snapshot || !snapshot.data) {
    return <div className="text-zinc-500 text-sm py-8 text-center">No node-link data available for this step.</div>;
  }

  const { type } = snapshot.data;

  // 1. Linked List Renderer
  if (type === 'linked-list') {
    const { nodes = [], slow, fast, collision = null } = snapshot.data;

    return (
      <div className="flex flex-col items-center justify-center gap-6 py-6 px-4 select-none w-full">
        {/* Linked List Nodes Chain */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto max-w-full py-8 px-4">
          {nodes.map((node, idx) => {
            const isSlow = slow === idx;
            const isFast = fast === idx;
            const isCollision = collision === idx;

            let nodeBorder = 'border-zinc-800 bg-zinc-900 text-zinc-100';
            if (isCollision) {
              nodeBorder = 'border-rose-500 bg-rose-950/60 text-rose-200 ring-4 ring-rose-500/30 animate-pulse';
            } else if (isSlow && isFast) {
              nodeBorder = 'border-purple-500 bg-purple-950/60 text-purple-200 ring-2 ring-purple-500/40';
            } else if (isSlow) {
              nodeBorder = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-2 ring-emerald-500/40';
            } else if (isFast) {
              nodeBorder = 'border-amber-500 bg-amber-950/60 text-amber-200 ring-2 ring-amber-500/40';
            }

            return (
              <React.Fragment key={`ll-node-${node.id}`}>
                <div className="relative flex flex-col items-center">
                  {/* Slow Pointer Chip */}
                  {isSlow && (
                    <div className="absolute -top-7 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm animate-bounce">
                      🐢 slow
                    </div>
                  )}

                  {/* Node Box: [ Val | Next ] */}
                  <div className={`flex items-center rounded-xl border font-mono shadow-md overflow-hidden ${nodeBorder}`}>
                    <div className="px-3.5 py-2.5 font-bold text-sm sm:text-base border-r border-zinc-800/80">
                      {node.val}
                    </div>
                    <div className="px-2 py-2.5 text-[11px] text-zinc-500 bg-zinc-950/40">
                      #{idx}
                    </div>
                  </div>

                  {/* Fast Pointer Chip */}
                  {isFast && (
                    <div className="absolute -bottom-7 flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm">
                      🐇 fast
                    </div>
                  )}
                </div>

                {/* Connector Arrow */}
                {idx < nodes.length - 1 ? (
                  <div className="text-zinc-600 font-mono text-lg font-bold">→</div>
                ) : node.nextIndex !== null ? (
                  <div className="flex items-center gap-1 text-xs font-mono text-rose-400 bg-rose-950/30 border border-rose-500/30 px-2 py-1 rounded">
                    <span>↺ loop to #{node.nextIndex}</span>
                  </div>
                ) : (
                  <div className="text-xs font-mono text-zinc-600 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">
                    NULL
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Binary Tree Renderer
  if (type === 'tree') {
    const { nodes = [], edges = [], activeNode = null, visited = [], queue = [] } = snapshot.data;

    return (
      <div className="flex flex-col items-center justify-center gap-5 py-4 px-2 select-none w-full">
        {/* Traversal State Bar */}
        <div className="flex items-center gap-4 flex-wrap justify-center text-xs font-mono bg-zinc-900/60 px-4 py-1.5 rounded-full border border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">Queue:</span>
            <span className="text-indigo-300 font-bold">[{queue.join(', ')}]</span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">Visited Order:</span>
            <span className="text-emerald-400 font-bold">[{visited.join(', ')}]</span>
          </div>
        </div>

        {/* Tree SVG Canvas */}
        <div className="relative w-full max-w-[420px] h-[240px] bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-2 overflow-hidden shadow-inner flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 220">
            {/* Edges */}
            {edges.map((e, idx) => {
              const fromNode = nodes.find(n => n.id === e.from);
              const toNode = nodes.find(n => n.id === e.to);
              if (!fromNode || !toNode) return null;

              const isEdgeVisited = visited.includes(e.from) && visited.includes(e.to);

              return (
                <line
                  key={`edge-${idx}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isEdgeVisited ? '#10b981' : '#3f3f46'}
                  strokeWidth={isEdgeVisited ? 2.5 : 1.5}
                  strokeDasharray={isEdgeVisited ? 'none' : '3 3'}
                  className="transition-all duration-200"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const isActive = activeNode === node.id;
              const isVisited = visited.includes(node.id);

              let fillColor = '#18181b';
              let strokeColor = '#3f3f46';
              let textColor = '#d4d4d8';

              if (isActive) {
                fillColor = '#312e81';
                strokeColor = '#818cf8';
                textColor = '#ffffff';
              } else if (isVisited) {
                fillColor = '#064e3b';
                strokeColor = '#10b981';
                textColor = '#6ee7b7';
              }

              return (
                <g key={`tree-node-${node.id}`} className="cursor-pointer transition-all duration-200">
                  {isActive && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      className="animate-ping opacity-50"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="16"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {node.val}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  // 3. Graph Renderer
  if (type === 'graph') {
    const { vertices = [], edges = [], activeVertex = null, visited = [], queue = [] } = snapshot.data;

    return (
      <div className="flex flex-col items-center justify-center gap-4 py-4 px-2 select-none w-full">
        {/* Graph Traversal HUD */}
        <div className="flex items-center gap-4 flex-wrap justify-center text-xs font-mono bg-zinc-900/60 px-4 py-1.5 rounded-full border border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">Queue:</span>
            <span className="text-indigo-300 font-bold">[{queue.join(', ')}]</span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">Visited Set:</span>
            <span className="text-emerald-400 font-bold">[{visited.join(', ')}]</span>
          </div>
        </div>

        {/* Graph Canvas */}
        <div className="relative w-full max-w-[420px] h-[260px] bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-2 overflow-hidden shadow-inner flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 260">
            {/* Edges */}
            {edges.map((e, idx) => {
              const u = vertices.find(v => v.id === e.from);
              const v = vertices.find(v => v.id === e.to);
              if (!u || !v) return null;

              const isTraversed = visited.includes(e.from) && visited.includes(e.to);

              return (
                <line
                  key={`graph-edge-${idx}`}
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={isTraversed ? '#10b981' : '#3f3f46'}
                  strokeWidth={isTraversed ? 2.5 : 1.5}
                  strokeOpacity={isTraversed ? 0.9 : 0.4}
                />
              );
            })}

            {/* Vertices */}
            {vertices.map(v => {
              const isActive = activeVertex === v.id;
              const isVisited = visited.includes(v.id);

              let fillColor = '#18181b';
              let strokeColor = '#3f3f46';
              let textColor = '#d4d4d8';

              if (isActive) {
                fillColor = '#312e81';
                strokeColor = '#818cf8';
                textColor = '#ffffff';
              } else if (isVisited) {
                fillColor = '#064e3b';
                strokeColor = '#10b981';
                textColor = '#6ee7b7';
              }

              return (
                <g key={`vertex-${v.id}`} className="transition-all duration-200">
                  {isActive && (
                    <circle
                      cx={v.x}
                      cy={v.y}
                      r="22"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      className="animate-ping opacity-60"
                    />
                  )}
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r="16"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />
                  <text
                    x={v.x}
                    y={v.y + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {v.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  return <div className="text-zinc-500 text-sm py-8 text-center">Unsupported node-link type.</div>;
}
