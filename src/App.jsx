import React from 'react';
import { useStore } from './store/useStore.js';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { FilterBar } from './components/FilterBar.jsx';
import { TopicAccordion } from './components/TopicAccordion.jsx';
import { ProblemModal } from './components/ProblemModal.jsx';
import { Inbox, Sparkles } from 'lucide-react';

export default function App() {
  const {
    filteredProblems,
    groupedData,
    stats,
    allTopics,
    solvedIds,
    bookmarkedIds,
    notes,
    saveNote,
    exportProgress,
    importProgress,
    searchQuery,
    setSearchQuery,
    selectedTopic,
    setSelectedTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedStatus,
    setSelectedStatus,
    visualizerOnly,
    setVisualizerOnly,
    activeProblem,
    setActiveProblem,
    toggleSolved,
    toggleBookmark,
    resetProgress,
    pickRandomProblem
  } = useStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        stats={stats}
        onPickRandom={pickRandomProblem}
        onResetProgress={resetProgress}
        onExportProgress={exportProgress}
        onImportProgress={importProgress}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <Hero stats={stats} />

        {/* Filters and Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTopics={allTopics}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          visualizerOnly={visualizerOnly}
          onVisualizerOnlyToggle={setVisualizerOnly}
          totalResults={filteredProblems.length}
        />

        {/* Problem Accordions List */}
        {groupedData.size > 0 ? (
          <div className="space-y-4">
            {Array.from(groupedData.entries()).map(([topicName, subtopicsMap]) => (
              <TopicAccordion
                key={topicName}
                topicName={topicName}
                subtopicsMap={subtopicsMap}
                solvedIds={solvedIds}
                bookmarkedIds={bookmarkedIds}
                onToggleSolved={toggleSolved}
                onToggleBookmark={toggleBookmark}
                onSelectProblem={setActiveProblem}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-zinc-900/30 border border-zinc-800/80">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4 shadow-sm">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-zinc-200 mb-1">No matching problems found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mb-4">
              Try adjusting your search query, topic, difficulty, or visualizer-only filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('all');
                setSelectedDifficulty('all');
                setSelectedStatus('all');
                setVisualizerOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Problem Detail Modal (with problem-specific visualizer button) */}
      {activeProblem && (
        <ProblemModal
          problem={activeProblem}
          onClose={() => setActiveProblem(null)}
          isSolved={solvedIds.has(activeProblem.id)}
          isBookmarked={bookmarkedIds.has(activeProblem.id)}
          onToggleSolved={toggleSolved}
          onToggleBookmark={toggleBookmark}
          note={notes[activeProblem.id] || ''}
          onSaveNote={(text) => saveNote(activeProblem.id, text)}
        />
      )}

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 py-8 px-4 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>takeuforward-for-free • Zero Bloatware DSA Platform</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Striver A2Z 495 Curriculum</span>
            <span>•</span>
            <span>React + Vite + Tailwind + Motion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
