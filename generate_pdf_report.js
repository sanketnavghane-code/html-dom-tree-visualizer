import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  console.log('Generating Project Report PDF...');

  const promptSnippetBase64 = fs.readFileSync(path.resolve('screenshot_prompt_snippet.png')).toString('base64');
  const vscodeBase64 = fs.readFileSync(path.resolve('screenshot_vscode.png')).toString('base64');
  const appBase64 = fs.readFileSync(path.resolve('screenshot_app.png')).toString('base64');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML TO DOM TREE Convertor using Agentic AI</title>
  <style>
    @page {
      size: A4;
      margin: 25mm 20mm 20mm 20mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #000000;
      background: #ffffff;
      font-size: 11pt;
      line-height: 1.5;
    }
    .page {
      page-break-after: always;
      min-height: 960px;
      display: flex;
      flex-direction: column;
    }
    .page:last-child {
      page-break-after: avoid;
    }
    .doc-header {
      margin-bottom: 24px;
    }
    h1.doc-title {
      font-size: 16pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 18px;
      color: #000000;
    }
    .student-meta {
      font-size: 11pt;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .student-meta span.bold {
      font-weight: bold;
    }
    h2.section-title {
      font-size: 12pt;
      font-weight: bold;
      margin-top: 14px;
      margin-bottom: 10px;
      color: #000000;
    }
    h3.subsection-title {
      font-size: 11pt;
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 6px;
    }
    p {
      margin-bottom: 8px;
      text-align: justify;
    }
    ul {
      margin-left: 20px;
      margin-bottom: 10px;
    }
    li {
      margin-bottom: 4px;
    }
    .prompt-box {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      padding: 10px 14px;
      border-radius: 4px;
      margin-bottom: 12px;
      font-size: 10pt;
    }
    .code-title {
      font-size: 11pt;
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 2px;
    }
    .code-lang {
      font-size: 10pt;
      color: #333333;
      margin-bottom: 6px;
    }
    pre.code-block {
      font-family: Consolas, "Courier New", Courier, monospace;
      font-size: 9.5pt;
      line-height: 1.42;
      color: #111111;
      background: transparent;
      white-space: pre-wrap;
      word-break: break-word;
      margin-bottom: 10px;
    }
    .img-container {
      margin: 12px 0;
      text-align: center;
    }
    .img-container img {
      max-width: 100%;
      border: 1px solid #d1d5db;
      border-radius: 4px;
    }
    .img-prompt {
      max-width: 480px;
    }
    .img-full {
      width: 100%;
    }
    .repo-link {
      color: #0066cc;
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="page">
    <div class="doc-header">
      <h1 class="doc-title">HTML TO DOM TREE Convertor using Agentic AI</h1>
      <div class="student-meta">
        <div><span class="bold">Name:</span> Sanket Navghane</div>
        <div><span class="bold">PRN:</span> 1272250750</div>
        <div><span class="bold">Division :</span> SYMCA(D)</div>
      </div>
    </div>

    <h2 class="section-title">1. Initial AI Prompt</h2>
    <p><span class="bold">Prompt Given to ChatGPT / Generative AI:</span></p>
    <p>
      Generate a complete prompt and architecture to build an interactive HTML to DOM Tree Converter
      using React.js and Tailwind CSS. The tree must feature a vertical branching root-node structure with
      pure CSS connectors (no heavy external chart libraries like D3 or React Flow). Include live HTML
      input, native DOMParser integration, interactive node inspection, search highlighting, statistics, and
      expand/collapse support.
    </p>

    <div class="img-container">
      <img class="img-prompt" src="data:image/png;base64,${promptSnippetBase64}" alt="Initial Prompt Snippet" />
    </div>

    <h2 class="section-title">2. Project Architecture & Requirements</h2>
    <h3 class="subsection-title">System Specifications</h3>
    <ul>
      <li><span class="bold">Core Function:</span> Real-time translation of user-inputted raw HTML strings into a visual DOM tree diagram.</li>
      <li><span class="bold">DOM Parsing:</span> Utilizes the browser's native DOMParser API to recursively extract element</li>
    </ul>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page">
    <ul>
      <li>tags, text nodes, comments, and attribute maps.</li>
      <li><span class="bold">Layout Structure:</span>
        <ul style="list-style-type: circle; margin-top: 4px;">
          <li><span class="bold">Left Panel:</span> Raw HTML code editor with quick actions (Sample load, Clear).</li>
          <li><span class="bold">Center Canvas:</span> Visual tree diagram rendered with top-down vertical tree lines and collapsible branches.</li>
          <li><span class="bold">Right Sidebar:</span> Live DOM metrics (elements, text nodes, depth) and selected node inspector.</li>
        </ul>
      </li>
      <li><span class="bold">Styling & Theme:</span> Tailwind CSS with responsive layout and dark/light theme switching.</li>
    </ul>

    <div class="img-container">
      <img class="img-full" src="data:image/png;base64,${vscodeBase64}" alt="VS Code Workspace" />
    </div>

    <h2 class="section-title">3. Implementation Code</h2>
    <div class="code-title">File: src/utils/domParser.js</div>
    <div class="code-lang">JavaScript</div>
    <pre class="code-block">export function parseHTMLToTree(htmlString) {
  if (!htmlString.trim()) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  let idCounter = 0;

  function traverse(node, depth = 0) {
    const currentId = \`node-\${idCounter++}\`;</pre>
  </div>

  <!-- ==================== PAGE 3 ==================== -->
  <div class="page">
    <pre class="code-block">    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (!text) return null;
      return {
        id: currentId,
        type: 'text',
        name: '#text',
        textContent: text,
        attributes: {},
        depth,
        children: []
      };
    }

    if (node.nodeType === Node.COMMENT_NODE) {
      return {
        id: currentId,
        type: 'comment',
        name: '#comment',
        textContent: node.textContent,
        attributes: {},
        depth,
        children: []
      };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const attrs = {};
      Array.from(node.attributes).forEach(attr => {</pre>
  </div>

  <!-- ==================== PAGE 4 ==================== -->
  <div class="page">
    <pre class="code-block">        attrs[attr.name] = attr.value;
      });

      const children = [];
      Array.from(node.childNodes).forEach(child => {
        const parsed = traverse(child, depth + 1);
        if (parsed) children.push(parsed);
      });

      return {
        id: currentId,
        type: 'element',
        name: node.tagName.toLowerCase(),
        attributes: attrs,
        depth,
        children
      };
    }

    return null;
  }

  const target = doc.body.childNodes.length > 0 ? doc.body : doc.documentElement;
  const children = [];
  Array.from(target.childNodes).forEach(child => {
    const res = traverse(child, 1);
    if (res) children.push(res);
  });

  return {</pre>
  </div>

  <!-- ==================== PAGE 5 ==================== -->
  <div class="page">
    <pre class="code-block">    id: 'node-root',
    type: 'document',
    name: 'document',
    attributes: {},
    depth: 0,
    children: children.length === 1 && children[0].children.length > 0 ? children[0].children : children
  };
}

export function calculateStats(tree) {
  const stats = { elements: 0, textNodes: 0, comments: 0, maxDepth: 0 };
  if (!tree) return stats;

  function scan(node) {
    if (node.depth > stats.maxDepth) stats.maxDepth = node.depth;
    if (node.type === 'element') stats.elements++;
    else if (node.type === 'text') stats.textNodes++;
    else if (node.type === 'comment') stats.comments++;

    (node.children || []).forEach(scan);
  }

  scan(tree);
  return stats;
}

<span class="bold" style="font-size: 11pt;">File: src/components/DomNode.jsx</span>
JavaScript
import React, { useState } from 'react';

export default function DomNode({ node, onSelect, selectedNode, searchQuery })</pre>
  </div>

  <!-- ==================== PAGE 6 ==================== -->
  <div class="page">
    <pre class="code-block">{
  const [collapsed, setCollapsed] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedNode?.id === node.id;
  const isMatch = searchQuery && (
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.textContent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.attributes?.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.attributes?.class?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const badgeColor =
    node.type === 'element' ? 'bg-blue-600 text-white' :
    node.type === 'text' ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white';

  return (
    &lt;li&gt;
      &lt;div
        onClick={(e) => { e.stopPropagation(); onSelect(node); }}
        className={\`inline-block cursor-pointer p-2.5 rounded-lg border text-left min-w-[120px]
transition-all \${
          isSelected
            ? 'border-emerald-500 ring-2 ring-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' :
          isMatch
            ? 'border-yellow-500 ring-2 ring-yellow-400 bg-yellow-50 dark:bg-yellow-950/30'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:border-gray-400'
        }\`}
      &gt;
        &lt;div className="flex items-center justify-between gap-2"&gt;
          &lt;span className={\`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded \${badgeColor}\`}&gt;
            {node.type === 'element' ? \`<\${node.name}>\` : node.name}</pre>
  </div>

  <!-- ==================== PAGE 7 ==================== -->
  <div class="page">
    <pre class="code-block">          &lt;/span&gt;
          {hasChildren && (
            &lt;button
              onClick={(e) => { e.stopPropagation(); setCollapsed(!collapsed); }}
              className="text-[10px] w-4 h-4 flex items-center justify-center rounded bg-gray-200
dark:bg-gray-700 hover:bg-gray-300"
            &gt;
              {collapsed ? '+' : '−'}
            &lt;/button&gt;
          )}
        &lt;/div&gt;

        {node.attributes?.id && (
          &lt;div className="text-[11px] text-blue-500 font-mono mt-1 truncate max-w-[140px]"&gt;
            #{node.attributes.id}
          &lt;/div&gt;
        )}

        {node.attributes?.class && (
          &lt;div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono truncate max-w-[140px]"&gt;
            .{node.attributes.class.split(' ').join('.')}
          &lt;/div&gt;
        )}

        {node.textContent && (
          &lt;div className="text-[11px] text-gray-600 dark:text-gray-300 italic truncate max-w-[140px] mt-1"&gt;
            "{node.textContent}"
          &lt;/div&gt;
        )}
      &lt;/div&gt;

      {hasChildren && !collapsed && (</pre>
  </div>

  <!-- ==================== PAGE 8 ==================== -->
  <div class="page">
    <pre class="code-block">        &lt;ul&gt;
          {node.children.map((child) => (
            &lt;DomNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedNode={selectedNode}
              searchQuery={searchQuery}
            /&gt;
          ))}
        &lt;/ul&gt;
      )}
    &lt;/li&gt;
  );
}

<span class="bold" style="font-size: 11pt;">File: src/components/DomTree.jsx</span>
JavaScript
import React from 'react';
import DomNode from './DomNode';

export default function DomTree({ tree, onSelect, selectedNode, searchQuery }) {
  if (!tree) {
    return (
      &lt;div className="h-full flex items-center justify-center text-gray-400 text-sm"&gt;
        Enter valid HTML in the input panel to visualize the tree.
      &lt;/div&gt;
    );
  }

  return (</pre>
  </div>

  <!-- ==================== PAGE 9 ==================== -->
  <div class="page">
    <pre class="code-block">    &lt;div className="h-full overflow-auto p-12 flex justify-center items-start"&gt;
      &lt;div className="tree"&gt;
        &lt;ul&gt;
          &lt;DomNode
            node={tree}
            onSelect={onSelect}
            selectedNode={selectedNode}
            searchQuery={searchQuery}
          /&gt;
        &lt;/ul&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

<span class="bold" style="font-size: 11pt;">File: src/components/HtmlEditor.jsx</span>
JavaScript
import React from 'react';

const SAMPLE_HTML = \`&lt;div class="container" id="main"&gt;
  &lt;h1&gt;Welcome&lt;/h1&gt;
  &lt;!-- User Section --&gt;
  &lt;p class="desc"&gt;Hello World!&lt;/p&gt;
  &lt;button id="btn-submit"&gt;Submit&lt;/button&gt;
&lt;/div&gt;\`;

export default function HtmlEditor({ value, onChange }) {
  return (
    &lt;div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"&gt;
      &lt;div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-950"&gt;</pre>
  </div>

  <!-- ==================== PAGE 10 ==================== -->
  <div class="page">
    <pre class="code-block">        &lt;span className="text-xs font-semibold uppercase tracking-wider text-gray-500"&gt;
          HTML Input
        &lt;/span&gt;
        &lt;div className="flex gap-2"&gt;
          &lt;button
            onClick={() => onChange(SAMPLE_HTML)}
            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
          &gt;
            Sample
          &lt;/button&gt;
          &lt;button
            onClick={() => onChange('')}
            className="text-xs px-2 py-1 bg-red-100 dark:bg-red-950/40 text-red-600 rounded hover:bg-red-200"
          &gt;
            Clear
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;textarea
        className="w-full flex-1 p-4 font-mono text-sm bg-transparent outline-none resize-none text-gray-800 dark:text-gray-200"
        placeholder="Paste your raw HTML here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      /&gt;
    &lt;/div&gt;
  );
}

<span class="bold" style="font-size: 11pt;">File: src/components/NodeDetails.jsx</span>
JavaScript
import React from 'react';</pre>
  </div>

  <!-- ==================== PAGE 11 ==================== -->
  <div class="page">
    <pre class="code-block">export default function NodeDetails({ node, stats }) {
  return (
    &lt;aside className="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-4 overflow-y-auto"&gt;
      &lt;div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800"&gt;
        &lt;h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3"&gt;
          Tree Statistics
        &lt;/h3&gt;
        &lt;div className="grid grid-cols-2 gap-2 text-xs"&gt;
          &lt;div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300"&gt;Elements: &lt;span className="font-bold"&gt;{stats.elements}&lt;/span&gt;&lt;/div&gt;
          &lt;div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300"&gt;Text Nodes: &lt;span className="font-bold"&gt;{stats.textNodes}&lt;/span&gt;&lt;/div&gt;
          &lt;div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300"&gt;Comments: &lt;span className="font-bold"&gt;{stats.comments}&lt;/span&gt;&lt;/div&gt;
          &lt;div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300"&gt;Max Depth: &lt;span className="font-bold"&gt;{stats.maxDepth}&lt;/span&gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div&gt;
        &lt;h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3"&gt;
          Selected Node
        &lt;/h3&gt;
        {node ? (
          &lt;div className="space-y-3 text-xs"&gt;
            &lt;div&gt;
              &lt;span className="text-gray-400"&gt;Type:&lt;/span&gt;
              &lt;p className="font-semibold text-gray-800 dark:text-gray-200 capitalize"&gt;{node.type}&lt;/p&gt;
            &lt;/div&gt;
            &lt;div&gt;
              &lt;span className="text-gray-400"&gt;Tag / Name:&lt;/span&gt;
              &lt;p className="font-mono text-blue-500 font-semibold"&gt;{node.name}&lt;/p&gt;</pre>
  </div>

  <!-- ==================== PAGE 12 ==================== -->
  <div class="page">
    <pre class="code-block">            &lt;/div&gt;
            &lt;div&gt;
              &lt;span className="text-gray-400"&gt;Depth:&lt;/span&gt;
              &lt;p className="font-mono text-gray-700 dark:text-gray-300"&gt;{node.depth}&lt;/p&gt;
            &lt;/div&gt;
            &lt;div&gt;
              &lt;span className="text-gray-400"&gt;Attributes:&lt;/span&gt;
              &lt;div className="bg-gray-50 dark:bg-gray-800 p-2 rounded mt-1 font-mono text-[11px] overflow-x-auto text-gray-700 dark:text-gray-300"&gt;
                {Object.keys(node.attributes || {}).length > 0 ? (
                  Object.entries(node.attributes).map(([k, v]) => (
                    &lt;div key={k}&gt;&lt;span className="text-purple-400"&gt;{k}&lt;/span&gt;="{v}"&lt;/div&gt;
                  ))
                ) : (
                  &lt;span className="text-gray-400 italic"&gt;None&lt;/span&gt;
                )}
              &lt;/div&gt;
            &lt;/div&gt;
            {node.textContent && (
              &lt;div&gt;
                &lt;span className="text-gray-400"&gt;Content:&lt;/span&gt;
                &lt;p className="bg-gray-50 dark:bg-gray-800 p-2 rounded mt-1 font-mono break-all text-gray-700 dark:text-gray-300"&gt;
                  {node.textContent}
                &lt;/p&gt;
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        ) : (
          &lt;p className="text-xs text-gray-400 italic"&gt;Click on any node in the tree to inspect details.&lt;/p&gt;
        )}
      &lt;/div&gt;
    &lt;/aside&gt;
  );
}</pre>
  </div>

  <!-- ==================== PAGE 13 ==================== -->
  <div class="page">
    <div class="code-title">File: src/App.jsx</div>
    <div class="code-lang">JavaScript</div>
    <pre class="code-block">import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import HtmlEditor from './components/HtmlEditor';
import DomTree from './components/DomTree';
import NodeDetails from './components/NodeDetails';
import { parseHTMLToTree, calculateStats } from './utils/domParser';

const DEFAULT_CODE = \`&lt;div class="wrapper"&gt;
  &lt;h1&gt;Tree Visualizer&lt;/h1&gt;
  &lt;ul class="nav"&gt;
    &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;\`;

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [htmlCode, setHtmlCode] = useState(DEFAULT_CODE);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const parsedTree = useMemo(() => {
    try {
      return parseHTMLToTree(htmlCode);
    } catch {
      return null;
    }
  }, [htmlCode]);</pre>
  </div>

  <!-- ==================== PAGE 14 ==================== -->
  <div class="page">
    <pre class="code-block">  const stats = useMemo(() => calculateStats(parsedTree), [parsedTree]);

  return (
    &lt;div className={\`\${darkMode ? 'dark' : ''} h-screen flex flex-col\`}&gt;
      &lt;div className="flex flex-col h-full bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100"&gt;
        &lt;Header darkMode={darkMode} setDarkMode={setDarkMode} /&gt;
        &lt;div className="h-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between text-xs"&gt;
          &lt;input
            type="text"
            placeholder="Search tags, classes, id, text..."
            className="w-72 px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded outline-none focus:border-blue-500 text-gray-800 dark:text-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /&gt;
          &lt;span className="text-gray-400"&gt;Pure React & Tailwind Tree Render&lt;/span&gt;
        &lt;/div&gt;
        &lt;div className="flex-1 grid grid-cols-12 overflow-hidden"&gt;
          &lt;div className="col-span-3 h-full"&gt;
            &lt;HtmlEditor value={htmlCode} onChange={setHtmlCode} /&gt;
          &lt;/div&gt;
          &lt;div className="col-span-6 h-full bg-gray-50 dark:bg-black/20 overflow-hidden"&gt;
            &lt;DomTree
              tree={parsedTree}
              onSelect={setSelectedNode}</pre>
  </div>

  <!-- ==================== PAGE 15 ==================== -->
  <div class="page">
    <pre class="code-block">              selectedNode={selectedNode}
              searchQuery={searchQuery}
            /&gt;
          &lt;/div&gt;
          &lt;div className="col-span-3 h-full"&gt;
            &lt;NodeDetails node={selectedNode} stats={stats} /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

<span class="bold" style="font-size: 11pt;">File: src/components/Header.jsx</span>
import React from 'react';

export default function Header({ darkMode, setDarkMode }) {
  return (
    &lt;header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between"&gt;
      &lt;div className="flex items-center gap-2"&gt;
        &lt;span className="h-3 w-3 rounded-full bg-emerald-500"&gt;&lt;/span&gt;
        &lt;h1 className="font-bold text-gray-900 dark:text-white tracking-wide"&gt;HTML to DOM Tree Converter&lt;/h1&gt;
      &lt;/div&gt;
      &lt;button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-1 text-xs font-semibold rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      &gt;
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      &lt;/button&gt;</pre>
  </div>

  <!-- ==================== PAGE 16 ==================== -->
  <div class="page">
    <pre class="code-block">    &lt;/header&gt;
  );
}

<span class="bold" style="font-size: 11pt;">File: src/index.css (CSS Branching Connectors)</span>
@import "tailwindcss";

/* CSS Tree Connector Lines */
.tree ul {
  padding-top: 20px;
  position: relative;
  display: flex;
  justify-content: center;
}

.tree li {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;
}

/* Connectors from parent to siblings */
.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 2px solid #64748b;
  width: 50%;
  height: 20px;</pre>
  </div>

  <!-- ==================== PAGE 17 ==================== -->
  <div class="page">
    <pre class="code-block">}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 2px solid #64748b;
}

/* Remove connectors for single/edge nodes */
.tree li:only-child::after, .tree li:only-child::before {
  display: none;
}

.tree li:only-child {
  padding-top: 0;
}

.tree li:first-child::before, .tree li:last-child::after {
  border: 0 none;
}

.tree li:last-child::before {
  border-right: 2px solid #64748b;
  border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
  border-radius: 5px 0 0 0;
}</pre>
  </div>

  <!-- ==================== PAGE 18 ==================== -->
  <div class="page">
    <pre class="code-block">/* Vertical downward line from parent node */
.tree ul ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 2px solid #64748b;
  width: 0;
  height: 20px;
}</pre>

    <h2 class="section-title">4. Project Workspace in VS Code</h2>
    <div class="img-container">
      <img class="img-full" src="data:image/png;base64,${vscodeBase64}" alt="Project Workspace in VS Code" />
    </div>

    <h2 class="section-title" style="margin-top: 20px;">5. Final Output & Demonstration</h2>
  </div>

  <!-- ==================== PAGE 19 ==================== -->
  <div class="page">
    <div class="img-container" style="margin-top: 0; margin-bottom: 24px;">
      <img class="img-full" src="data:image/png;base64,${appBase64}" alt="Final Application Output & Demonstration" />
    </div>

    <h2 class="section-title">6. GitHub Repository Details</h2>
    <ul style="margin-top: 8px;">
      <li><span class="bold">Repository URL:</span> <a class="repo-link" href="https://github.com/sanketnavghane-code/html-dom-tree-visualizer">https://github.com/sanketnavghane-code/html-dom-tree-visualizer</a></li>
      <li><span class="bold">Branch:</span> main</li>
      <li><span class="bold">Version Control:</span> Managed via Git, fully committed with source code, documentation, and configuration files.</li>
    </ul>
  </div>

</body>
</html>
  `;

  const htmlReportPath = path.resolve('temp_report.html');
  fs.writeFileSync(htmlReportPath, htmlContent);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlReportPath}`, { waitUntil: 'networkidle' });

  const pdfPath = path.resolve('HTML_TO_DOM_TREE_Project_Report.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '20mm',
      right: '20mm'
    }
  });

  await browser.close();
  fs.unlinkSync(htmlReportPath);

  console.log(`Report PDF generated successfully at: ${pdfPath}`);
}

generatePDF().catch(console.error);
