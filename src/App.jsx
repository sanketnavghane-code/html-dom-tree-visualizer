import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import HtmlEditor from './components/HtmlEditor';
import DomTree from './components/DomTree';
import NodeDetails from './components/NodeDetails';
import { parseHTMLToTree, calculateStats } from './utils/domParser';
import { Search, Sparkles } from 'lucide-react';

const DEFAULT_CODE = `<div class="wrapper" id="root-container">
  <h1>Tree Visualizer</h1>
  <!-- Main Navigation Section -->
  <ul class="nav">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</div>`;

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [htmlCode, setHtmlCode] = useState(DEFAULT_CODE);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Parse DOM tree on HTML changes
  const parsedTree = useMemo(() => {
    try {
      return parseHTMLToTree(htmlCode);
    } catch (err) {
      console.error("DOM Parsing error:", err);
      return null;
    }
  }, [htmlCode]);

  // Compute live statistics
  const stats = useMemo(() => calculateStats(parsedTree), [parsedTree]);

  return (
    <div className={`${darkMode ? 'dark' : ''} h-screen flex flex-col font-sans select-none`}>
      <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* App Top Navigation */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Search & Sub-header Bar */}
        <div className="h-11 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between text-xs transition-colors">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tags, classes, id, text..."
              className="w-80 pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 dark:text-gray-200 text-xs transition placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Pure CSS Branching Connectors
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline text-gray-400">Zero Heavy Chart Libraries (D3-free)</span>
          </div>
        </div>

        {/* 3-Column Studio Workspace */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          {/* Left Column: HTML Code Input */}
          <div className="col-span-3 h-full overflow-hidden">
            <HtmlEditor value={htmlCode} onChange={setHtmlCode} />
          </div>

          {/* Center Column: Interactive DOM Tree Canvas */}
          <div className="col-span-6 h-full bg-gray-50/50 dark:bg-black/30 overflow-hidden relative">
            <DomTree
              tree={parsedTree}
              onSelect={setSelectedNode}
              selectedNode={selectedNode}
              searchQuery={searchQuery}
            />
          </div>

          {/* Right Column: Node Details & Statistics */}
          <div className="col-span-3 h-full overflow-hidden">
            <NodeDetails node={selectedNode} stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
