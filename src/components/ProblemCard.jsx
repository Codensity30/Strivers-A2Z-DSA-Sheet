import React from 'react';
import { Check, Star, Zap, ChevronRight } from 'lucide-react';

export function ProblemCard({
  problem,
  isSolved,
  isBookmarked,
  onToggleSolved,
  onToggleBookmark,
  onSelectProblem
}) {
  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  };

  const badgeClass = difficultyColors[problem.difficulty] || difficultyColors.Medium;

  return (
    <div className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/90 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-150">
      {/* Left: Checkbox + Star + Title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Solved Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSolved(problem.id);
          }}
          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
            isSolved
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm shadow-emerald-600/30'
              : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900'
          }`}
          title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
        >
          {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Bookmark Star */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(problem.id);
          }}
          className="text-zinc-600 hover:text-amber-400 transition"
          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Problem'}
        >
          <Star
            className={`w-4 h-4 transition ${
              isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-zinc-600 hover:text-amber-400'
            }`}
          />
        </button>

        {/* Title Link */}
        <button
          onClick={() => onSelectProblem(problem)}
          className="text-left font-medium text-xs sm:text-sm text-zinc-200 hover:text-indigo-400 truncate transition cursor-pointer"
        >
          <span className={isSolved ? 'line-through text-zinc-500' : ''}>
            {problem.title}
          </span>
        </button>
      </div>

      {/* Right: Badges & Open Action */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Interactive Visualizer Pill */}
        {problem.visualizationType && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            <Zap className="w-3 h-3 text-indigo-400" />
            <span>Interactive</span>
          </span>
        )}

        {/* Approaches Indicators */}
        <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-zinc-500">
          {problem.hasBrute && <span className="px-1.5 py-0.5 rounded bg-zinc-800/80">Brute</span>}
          {problem.hasBetter && <span className="px-1.5 py-0.5 rounded bg-zinc-800/80">Better</span>}
          {problem.hasOptimal && <span className="px-1.5 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">Optimal</span>}
        </div>

        {/* Difficulty Pill */}
        <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md border ${badgeClass}`}>
          {problem.difficulty}
        </span>

        {/* Open arrow */}
        <button
          onClick={() => onSelectProblem(problem)}
          className="p-1 rounded-lg text-zinc-500 group-hover:text-zinc-300 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
