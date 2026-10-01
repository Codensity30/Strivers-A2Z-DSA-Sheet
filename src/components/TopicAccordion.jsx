import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';
import { ProblemCard } from './ProblemCard.jsx';

export function TopicAccordion({
  topicName,
  subtopicsMap,
  solvedIds,
  bookmarkedIds,
  onToggleSolved,
  onToggleBookmark,
  onSelectProblem,
  defaultExpanded = true
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Compute stats for this topic
  let totalProblems = 0;
  let solvedProblems = 0;

  subtopicsMap.forEach(problems => {
    totalProblems += problems.length;
    problems.forEach(p => {
      if (solvedIds.has(p.id)) solvedProblems++;
    });
  });

  const percent = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  // Clean topic title
  const displayTitle = topicName.replace(/^\d+\.\s*/, '');

  return (
    <div className="mb-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden transition-all shadow-sm">
      {/* Topic Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-4 bg-zinc-900/70 hover:bg-zinc-850 transition text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Folder className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-100 flex items-center gap-2">
              <span>{displayTitle}</span>
              <span className="text-xs font-mono text-zinc-500 font-normal">({topicName})</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {solvedProblems} / {totalProblems} Completed ({percent}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress bar */}
          <div className="hidden sm:block w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="text-zinc-500">
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
        </div>
      </button>

      {/* Expanded Subtopics & Problems */}
      {isExpanded && (
        <div className="px-5 py-3 border-t border-zinc-800/60 flex flex-col gap-4">
          {Array.from(subtopicsMap.entries()).map(([subtopicName, problems]) => {
            const cleanSubtopic = subtopicName.replace(/^\d+\.\s*/, '');

            return (
              <div key={subtopicName} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 pt-2 pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                    {cleanSubtopic}
                  </h4>
                  <span className="text-[11px] font-mono text-zinc-600">({problems.length})</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {problems.map(problem => (
                    <ProblemCard
                      key={problem.id}
                      problem={problem}
                      isSolved={solvedIds.has(problem.id)}
                      isBookmarked={bookmarkedIds.has(problem.id)}
                      onToggleSolved={onToggleSolved}
                      onToggleBookmark={onToggleBookmark}
                      onSelectProblem={onSelectProblem}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
