import React, { useRef, useEffect } from 'react';
import { Search, Zap, Filter, Check, Star } from 'lucide-react';

export function FilterBar({
  searchQuery,
  onSearchChange,
  allTopics,
  selectedTopic,
  onTopicChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedStatus,
  onStatusChange,
  visualizerOnly,
  onVisualizerOnlyToggle,
  totalResults
}) {
  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="mb-8">
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search questions by title, topic, algorithm, or keyword... (Press '/' to focus)"
          className="w-full pl-11 pr-24 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 text-sm transition shadow-lg shadow-black/20"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-md">
            /
          </kbd>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Topic Select */}
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => onTopicChange(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-medium text-zinc-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer appearance-none pr-8"
            >
              <option value="all">All Topics ({allTopics.length})</option>
              {allTopics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-500 text-xs">
              ▾
            </div>
          </div>

          {/* Difficulty Select */}
          <div className="relative">
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-medium text-zinc-200 focus:outline-none focus:border-indigo-500 transition cursor-pointer appearance-none pr-8"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-500 text-xs">
              ▾
            </div>
          </div>

          {/* Status Buttons Group */}
          <div className="flex items-center rounded-xl bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-medium">
            {[
              { id: 'all', label: 'All' },
              { id: 'unsolved', label: 'Unsolved' },
              { id: 'solved', label: 'Solved' },
              { id: 'bookmarked', label: '★ Starred' }
            ].map(status => (
              <button
                key={status.id}
                onClick={() => onStatusChange(status.id)}
                className={`px-3 py-1 rounded-lg transition ${
                  selectedStatus === status.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          {/* Visualizable Only Toggle */}
          <button
            onClick={() => onVisualizerOnlyToggle(!visualizerOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              visualizerOnly
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/60 shadow-md shadow-indigo-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${visualizerOnly ? 'text-indigo-400 fill-indigo-400' : 'text-zinc-500'}`} />
            <span>Interactive Only</span>
          </button>
        </div>

        {/* Results Counter */}
        <div className="text-xs font-mono text-zinc-500">
          Showing <span className="text-zinc-300 font-bold">{totalResults}</span> problems
        </div>
      </div>
    </section>
  );
}
