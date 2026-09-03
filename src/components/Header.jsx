import React from 'react';
import { Sun, Moon, GitBranch, Sparkles } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between transition-colors shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
          <GitBranch className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base text-gray-900 dark:text-white tracking-tight">
              HTML to DOM Tree Converter
            </h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-2.5 h-2.5" /> Agentic AI
            </span>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Interactive visual DOM tree hierarchy & inspector
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer shadow-xs"
          title="Toggle Theme"
        >
          {darkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-500" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
