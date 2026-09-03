import React, { useState } from 'react';
import DomNode from './DomNode';
import { ZoomIn, ZoomOut, RotateCcw, Network } from 'lucide-react';

export default function DomTree({ tree, onSelect, selectedNode, searchQuery }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.4));
  const handleResetZoom = () => setZoom(1);

  if (!tree) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-sm gap-3 p-6">
        <Network className="w-12 h-12 stroke-[1.25] text-gray-300 dark:text-gray-700" />
        <p className="font-medium text-center">
          Enter valid HTML in the input panel to visualize the tree.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col">
      {/* Canvas Zoom Controls Overlay */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 transition cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-mono px-1 text-gray-600 dark:text-gray-400 min-w-[36px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 transition cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700 mx-0.5"></div>
        <button
          onClick={handleResetZoom}
          title="Reset Zoom"
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Visual Canvas */}
      <div className="flex-1 overflow-auto p-12 flex justify-center items-start cursor-grab active:cursor-grabbing">
        <div
          className="tree transition-transform duration-150 origin-top"
          style={{ transform: `scale(${zoom})` }}
        >
          <ul>
            <DomNode
              node={tree}
              onSelect={onSelect}
              selectedNode={selectedNode}
              searchQuery={searchQuery}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
