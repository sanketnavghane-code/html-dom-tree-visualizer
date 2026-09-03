import React from 'react';
import { BarChart3, Info, Tag, Layers, AlignLeft, Hash } from 'lucide-react';

export default function NodeDetails({ node, stats }) {
  return (
    <aside className="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-4 overflow-y-auto flex flex-col gap-6">
      {/* Tree Statistics Section */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-1.5 mb-3">
          <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
            Tree Statistics
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Elements</span>
            <span className="text-base font-bold text-blue-600 dark:text-blue-400">{stats.elements}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Text Nodes</span>
            <span className="text-base font-bold text-amber-600 dark:text-amber-400">{stats.textNodes}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Comments</span>
            <span className="text-base font-bold text-purple-600 dark:text-purple-400">{stats.comments}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/80 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Max Depth</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{stats.maxDepth}</span>
          </div>
        </div>
      </div>

      {/* Selected Node Details Section */}
      <div className="flex-1">
        <div className="flex items-center gap-1.5 mb-3">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
            Selected Node
          </h3>
        </div>

        {node ? (
          <div className="space-y-4 text-xs">
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 dark:text-gray-400 block mb-0.5">Node Type</span>
              <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  node.type === 'element' ? 'bg-blue-500' : node.type === 'text' ? 'bg-amber-500' : 'bg-purple-500'
                }`} />
                {node.type}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 dark:text-gray-400 block mb-0.5">Tag / Name</span>
              <p className="font-mono text-blue-600 dark:text-blue-400 font-bold text-sm">{node.name}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 dark:text-gray-400 block mb-0.5">Tree Depth Level</span>
              <p className="font-mono text-gray-800 dark:text-gray-200 font-medium">Level {node.depth}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">Attributes</span>
              <div className="font-mono text-[11px] space-y-1">
                {Object.keys(node.attributes || {}).length > 0 ? (
                  Object.entries(node.attributes).map(([k, v]) => (
                    <div key={k} className="p-1.5 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700/80 overflow-x-auto">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{k}</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-emerald-600 dark:text-emerald-400">"{v}"</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 italic text-[11px]">No attributes present</span>
                )}
              </div>
            </div>

            {node.textContent && (
              <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">Text Content</span>
                <p className="bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700/80 font-mono text-[11px] break-words text-gray-700 dark:text-gray-300">
                  {node.textContent}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-lg text-gray-400 text-xs">
            Click on any node in the tree diagram to inspect its properties and attributes.
          </div>
        )}
      </div>
    </aside>
  );
}
