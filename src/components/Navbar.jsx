import React, { useRef } from 'react';
import { Sparkles, Dices, RotateCcw, Star, CheckCircle, Code2, Download, Upload } from 'lucide-react';

export function Navbar({ stats, onPickRandom, onResetProgress, onExportProgress, onImportProgress }) {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    if (!onExportProgress) return;
    const jsonStr = onExportProgress();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `takeuforward-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const res = onImportProgress?.(text);
        if (res?.success) {
          alert('Progress imported and merged successfully!');
        } else {
          alert('Failed to import progress: ' + (res?.error || 'Invalid JSON'));
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-mono font-bold shadow-md shadow-indigo-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                takeuforward<span className="text-indigo-400 font-normal">-for-free</span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                OG EDITION
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">Striver A2Z DSA • Zero Bloatware</p>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="hidden md:flex flex-col gap-1 w-64 lg:w-80">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Solved: <strong className="text-zinc-100">{stats.solved} / {stats.total}</strong> ({stats.percentage}%)</span>
            </span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <strong className="text-zinc-200">{stats.bookmarked}</strong>
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Backup / Export Progress */}
          <button
            onClick={handleExport}
            title="Backup / Export Solved Progress & Notes (JSON)"
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Import Progress */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import Saved Progress"
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition"
          >
            <Upload className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={onPickRandom}
            title="Pick a random problem to solve"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-medium transition shadow-sm"
          >
            <Dices className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Pick Random</span>
          </button>

          <button
            onClick={onResetProgress}
            title="Reset progress"
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
