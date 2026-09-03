import React, { useState } from 'react';

export default function DomNode({ node, onSelect, selectedNode, searchQuery }) {
  const [collapsed, setCollapsed] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedNode?.id === node.id;

  // Real-time search query matching
  const isMatch = searchQuery && (
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (node.textContent && node.textContent.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (node.attributes?.id && node.attributes.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (node.attributes?.class && node.attributes.class.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const badgeColor =
    node.type === 'element'
      ? 'bg-blue-600 text-white shadow-xs'
      : node.type === 'text'
      ? 'bg-amber-600 text-white shadow-xs'
      : 'bg-purple-600 text-white shadow-xs';

  return (
    <li>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        className={`inline-block cursor-pointer p-2.5 rounded-lg border text-left min-w-[130px] max-w-[220px] transition-all duration-150 ${
          isSelected
            ? 'border-emerald-500 ring-2 ring-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-md'
            : isMatch
            ? 'border-yellow-500 ring-2 ring-yellow-400 bg-yellow-50/80 dark:bg-yellow-950/40 shadow-md animate-pulse'
            : 'border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded tracking-wide ${badgeColor}`}>
            {node.type === 'element' ? `<${node.name}>` : node.name}
          </span>
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCollapsed(!collapsed);
              }}
              title={collapsed ? "Expand subtree" : "Collapse subtree"}
              className="text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition cursor-pointer"
            >
              {collapsed ? '+' : '−'}
            </button>
          )}
        </div>

        {/* Node Attribute ID */}
        {node.attributes?.id && (
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono mt-1 truncate max-w-[150px]" title={`#${node.attributes.id}`}>
            #{node.attributes.id}
          </div>
        )}

        {/* Node Attribute Class */}
        {node.attributes?.class && (
          <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono truncate max-w-[150px]" title={`.${node.attributes.class.split(' ').join('.')}`}>
            .{node.attributes.class.split(' ').join('.')}
          </div>
        )}

        {/* Node Text Snippet */}
        {node.textContent && (
          <div className="text-[11px] text-gray-600 dark:text-gray-300 italic truncate max-w-[150px] mt-1" title={node.textContent}>
            "{node.textContent}"
          </div>
        )}
      </div>

      {/* Recursive Children Subtrees */}
      {hasChildren && !collapsed && (
        <ul>
          {node.children.map((child) => (
            <DomNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedNode={selectedNode}
              searchQuery={searchQuery}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
