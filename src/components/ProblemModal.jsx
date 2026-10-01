import React, { useState, useEffect } from 'react';
import { X, Check, Star, Zap, Copy, CheckCheck, FileCode, Clock, Cpu, Edit3 } from 'lucide-react';
import { VisualizerContainer } from '../visualizer/VisualizerContainer.jsx';

export function ProblemModal({
  problem,
  onClose,
  isSolved,
  isBookmarked,
  onToggleSolved,
  onToggleBookmark,
  note = '',
  onSaveNote
}) {
  // CRITICAL REQUIREMENT: Visualizer is NOT open immediately when opening a problem.
  // It is accessed via the dedicated visualization button.
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);

  // Active Approach Tab (Default to Optimal if present, else first available)
  const [activeTab, setActiveTab] = useState('Optimal');
  const [copiedCode, setCopiedCode] = useState(false);
  const [localNote, setLocalNote] = useState(note);

  useEffect(() => {
    if (!problem) return;
    setIsVisualizerOpen(false); // Reset to closed on problem change

    if (problem.hasOptimal) setActiveTab('Optimal');
    else if (problem.hasBetter) setActiveTab('Better');
    else if (problem.hasBrute) setActiveTab('Brute Force');
    else if (problem.approaches?.length > 0) setActiveTab(problem.approaches[0].type);

    setLocalNote(note || '');
  }, [problem, note]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!problem) return null;

  const currentApproach = problem.approaches?.find(a => a.type === activeTab) || problem.approaches?.[0];

  const handleCopyCode = () => {
    if (!currentApproach?.code) return;
    navigator.clipboard.writeText(currentApproach.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex flex-col gap-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>{problem.topic}</span>
              <span>/</span>
              <span className="text-zinc-500">{problem.subtopic}</span>
            </div>

            {/* Title & Difficulty */}
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {problem.title}
              </h2>
              <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${difficultyColors[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
            </div>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* PROBLEM-SPECIFIC VISUALIZATION TRIGGER BUTTON */}
            {problem.visualizationType && (
              <button
                onClick={() => setIsVisualizerOpen(!isVisualizerOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                  isVisualizerOpen
                    ? 'bg-indigo-600 text-white border border-indigo-400 ring-2 ring-indigo-500/30 shadow-indigo-600/30'
                    : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:border-indigo-500/70'
                }`}
                title={isVisualizerOpen ? 'Collapse visualization studio' : 'Open problem-specific visualizer'}
              >
                <Zap className={`w-4 h-4 ${isVisualizerOpen ? 'text-white fill-white' : 'text-indigo-400'}`} />
                <span>{isVisualizerOpen ? 'Hide Visualizer' : '⚡ Visualize Algorithm'}</span>
              </button>
            )}

            {/* Solved Toggle */}
            <button
              onClick={() => onToggleSolved(problem.id)}
              className={`p-2 rounded-xl border transition ${
                isSolved
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-600/30'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
              }`}
              title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
            >
              <Check className="w-4 h-4" />
            </button>

            {/* Bookmark Star */}
            <button
              onClick={() => onToggleBookmark(problem.id)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 transition"
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* PROBLEM SPECIFIC VISUALIZER STUDIO (Rendered when toggled open) */}
          {isVisualizerOpen && problem.visualizationType && (
            <div className="animate-fadeIn">
              <VisualizerContainer problem={problem} />
            </div>
          )}

          {/* Problem Statement Section */}
          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>Problem Statement</span>
            </h3>
            <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line font-sans">
              {problem.question || 'No problem description provided.'}
            </div>
          </div>

          {/* Approaches Tabs & Code View */}
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden">
            {/* Approach Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2 flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {problem.approaches?.map((app) => (
                  <button
                    key={app.type}
                    onClick={() => setActiveTab(app.type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeTab === app.type
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {app.type}
                  </button>
                ))}
              </div>

              {/* Copy Code Action */}
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition"
              >
                {copiedCode ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy C++</span>
                  </>
                )}
              </button>
            </div>

            {/* Approach Content */}
            <div className="p-5 space-y-4">
              {/* Complexities */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-zinc-400">Time:</span>
                  <span className="text-zinc-100 font-bold">{currentApproach?.timeComplexity || 'O(N)'}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-zinc-400">Space:</span>
                  <span className="text-zinc-100 font-bold">{currentApproach?.spaceComplexity || 'O(1)'}</span>
                </div>
              </div>

              {/* Algorithm Explanation */}
              {currentApproach?.algorithm && (
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-line">
                  <strong className="text-zinc-100 block mb-1">Algorithm Strategy:</strong>
                  {currentApproach.algorithm}
                </div>
              )}

              {/* C++ Code Block */}
              {currentApproach?.code && (
                <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d11]">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/80 text-xs font-mono text-zinc-400">
                    <span>Solution.cpp ({activeTab})</span>
                    <span>C++ 20</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200 leading-relaxed">
                    <code>{currentApproach.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Personal Notes Section */}
          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
            <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Personal Notes & Revision Reminders</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-normal">Auto-saved to local storage</span>
            </h3>
            <textarea
              value={localNote}
              onChange={(e) => {
                const val = e.target.value;
                setLocalNote(val);
                onSaveNote?.(val);
              }}
              placeholder="Write your personal notes, edge cases to remember, or revision tricks here..."
              rows={3}
              className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 transition resize-none font-sans"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
