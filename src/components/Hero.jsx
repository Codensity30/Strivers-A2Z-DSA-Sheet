import React from 'react';
import { BookOpen, Layers, Zap, ShieldCheck } from 'lucide-react';

export function Hero({ stats }) {
  return (
    <section className="py-8 sm:py-10 text-center relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Interactive Algorithm Visualizer Engine 2.0</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Master DSA with <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">Intuitive Step Visualizations</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          The complete Striver A2Z curriculum indexed with Brute Force, Better, and Optimal C++ solutions, time/space complexities, and problem-specific interactive visualizers.
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-mono font-medium text-zinc-400">Total DSA</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">{stats.total} Problems</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-mono font-medium text-zinc-400">Curriculum</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">16 Topics</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-mono font-medium text-zinc-400">Visualizers</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">{stats.visualizableCount} Interactive</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-mono font-medium text-zinc-400">Philosophy</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">Zero Bloat</div>
          </div>
        </div>
      </div>
    </section>
  );
}
