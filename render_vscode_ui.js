import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generateVscodeScreenshot() {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    body { background: #1e1e1e; color: #cccccc; width: 1200px; height: 680px; overflow: hidden; display: flex; flex-direction: column; }
    .title-bar { background: #323233; height: 30px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; font-size: 12px; color: #cccccc; }
    .window-controls { display: flex; gap: 8px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .red { background: #ff5f56; }
    .yellow { background: #ffbd2e; }
    .green { background: #27c93f; }
    .workspace { display: flex; flex: 1; overflow: hidden; }
    .activity-bar { width: 48px; background: #333333; display: flex; flex-direction: column; align-items: center; padding-top: 10px; gap: 20px; color: #858585; }
    .activity-bar svg { width: 22px; height: 22px; fill: currentColor; }
    .activity-bar .active { color: #ffffff; border-left: 2px solid #ffffff; width: 100%; display: flex; justify-content: center; }
    .sidebar { width: 220px; background: #252526; border-right: 1px solid #191919; display: flex; flex-direction: column; font-size: 11px; }
    .sidebar-header { padding: 10px 16px 6px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; color: #bbbbbb; }
    .file-tree { padding: 4px 0; }
    .tree-item { padding: 4px 16px; display: flex; align-items: center; gap: 6px; cursor: pointer; }
    .tree-item.active { background: #37373d; color: #ffffff; }
    .tree-folder { font-weight: 600; color: #cccccc; }
    .indent-1 { padding-left: 28px; }
    .indent-2 { padding-left: 40px; }
    .main-editor { flex: 1; display: flex; flex-direction: column; background: #1e1e1e; }
    .editor-tabs { background: #252526; display: flex; height: 35px; border-bottom: 1px solid #191919; overflow-x: auto; }
    .tab { padding: 0 16px; display: flex; align-items: center; gap: 8px; font-size: 12px; background: #2d2d2d; color: #969696; border-right: 1px solid #191919; }
    .tab.active { background: #1e1e1e; color: #ffffff; border-top: 1px solid #007acc; }
    .editor-content { flex: 1; display: flex; font-family: "JetBrains Mono", Consolas, "Courier New", monospace; font-size: 12px; line-height: 1.5; padding: 10px 0; overflow: hidden; }
    .line-numbers { width: 45px; text-align: right; padding-right: 14px; color: #6e7681; user-select: none; }
    .code { flex: 1; color: #d4d4d4; white-space: pre; }
    .keyword { color: #569cd6; }
    .string { color: #ce9178; }
    .tag { color: #4ec9b0; }
    .attr { color: #9cdcfe; }
    .comment { color: #6a9955; }
    .func { color: #dcdcaa; }
    .terminal-pane { height: 180px; background: #181818; border-top: 1px solid #333333; display: flex; flex-direction: column; }
    .terminal-tabs { height: 30px; background: #1e1e1e; display: flex; align-items: center; padding: 0 16px; gap: 16px; font-size: 11px; color: #969696; border-bottom: 1px solid #282828; }
    .terminal-tabs .active { color: #ffffff; border-bottom: 1px solid #007acc; padding-bottom: 6px; font-weight: 600; }
    .terminal-body { flex: 1; padding: 10px 16px; font-family: Consolas, monospace; font-size: 11px; line-height: 1.4; color: #cccccc; }
    .prompt { color: #4ec9b0; }
    .status-bar { height: 22px; background: #007acc; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; font-size: 11px; color: #ffffff; }
  </style>
</head>
<body>
  <div class="title-bar">
    <div class="window-controls">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <div style="font-weight: 500;">App.jsx — HTML TO DOM TREE — Visual Studio Code</div>
    <div></div>
  </div>

  <div class="workspace">
    <div class="activity-bar">
      <div class="active">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 0h-9L7 1.5V6H2.5L1 7.5v15L2.5 24h12l1.5-1.5V18h4.5l1.5-1.5v-15L17.5 0zM14 22H3V8h4v8.5l1.5 1.5H14v4zm5-6H9V2h8v4.5l1.5 1.5H19v8z"/></svg>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">Explorer: html-dom-tree</div>
      <div class="file-tree">
        <div class="tree-item tree-folder">▼ src</div>
        <div class="tree-item indent-1 tree-folder">▼ components</div>
        <div class="tree-item indent-2">📄 DomNode.jsx</div>
        <div class="tree-item indent-2">📄 DomTree.jsx</div>
        <div class="tree-item indent-2">📄 Header.jsx</div>
        <div class="tree-item indent-2">📄 HtmlEditor.jsx</div>
        <div class="tree-item indent-2">📄 NodeDetails.jsx</div>
        <div class="tree-item indent-1 tree-folder">▼ utils</div>
        <div class="tree-item indent-2">📄 domParser.js</div>
        <div class="tree-item indent-1 active">⚛️ App.jsx</div>
        <div class="tree-item indent-1">🎨 index.css</div>
        <div class="tree-item indent-1">⚛️ main.jsx</div>
        <div class="tree-item">📦 package.json</div>
        <div class="tree-item">⚡ vite.config.js</div>
        <div class="tree-item">🌐 index.html</div>
      </div>
    </div>

    <div class="main-editor">
      <div class="editor-tabs">
        <div class="tab active">⚛️ App.jsx</div>
        <div class="tab">📄 domParser.js</div>
        <div class="tab">📄 DomTree.jsx</div>
        <div class="tab">🎨 index.css</div>
      </div>

      <div class="editor-content">
        <div class="line-numbers">
1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17
        </div>
        <div class="code">
<span class="keyword">import</span> React, { useState, useMemo } <span class="keyword">from</span> <span class="string">'react'</span>;
<span class="keyword">import</span> Header <span class="keyword">from</span> <span class="string">'./components/Header'</span>;
<span class="keyword">import</span> HtmlEditor <span class="keyword">from</span> <span class="string">'./components/HtmlEditor'</span>;
<span class="keyword">import</span> DomTree <span class="keyword">from</span> <span class="string">'./components/DomTree'</span>;
<span class="keyword">import</span> NodeDetails <span class="keyword">from</span> <span class="string">'./components/NodeDetails'</span>;
<span class="keyword">import</span> { parseHTMLToTree, calculateStats } <span class="keyword">from</span> <span class="string">'./utils/domParser'</span>;

<span class="keyword">export default function</span> <span class="func">App</span>() {
  <span class="keyword">const</span> [darkMode, setDarkMode] = <span class="func">useState</span>(<span class="keyword">true</span>);
  <span class="keyword">const</span> [htmlCode, setHtmlCode] = <span class="func">useState</span>(DEFAULT_CODE);
  <span class="keyword">const</span> [selectedNode, setSelectedNode] = <span class="func">useState</span>(<span class="keyword">null</span>);
  <span class="keyword">const</span> [searchQuery, setSearchQuery] = <span class="func">useState</span>(<span class="string">''</span>);

  <span class="keyword">const</span> parsedTree = <span class="func">useMemo</span>(() => <span class="func">parseHTMLToTree</span>(htmlCode), [htmlCode]);
  <span class="keyword">const</span> stats = <span class="func">useMemo</span>(() => <span class="func">calculateStats</span>(parsedTree), [parsedTree]);

  <span class="keyword">return</span> (
    &lt;<span class="tag">div</span> <span class="attr">className</span>={<span class="string">\`\${darkMode ? 'dark' : ''} h-screen flex flex-col\`</span>}&gt;
        </div>
      </div>

      <div class="terminal-pane">
        <div class="terminal-tabs">
          <div>PROBLEMS</div>
          <div>OUTPUT</div>
          <div>DEBUG CONSOLE</div>
          <div class="active">TERMINAL</div>
        </div>
        <div class="terminal-body">
          <p><span class="prompt">PS C:\Users\sanket\OneDrive\Desktop\HTML TO DOM TREE></span> git init</p>
          <p>Initialized empty Git repository in C:/Users/sanket/OneDrive/Desktop/HTML TO DOM TREE/.git/</p>
          <p><span class="prompt">PS C:\Users\sanket\OneDrive\Desktop\HTML TO DOM TREE></span> git add .</p>
          <p><span class="prompt">PS C:\Users\sanket\OneDrive\Desktop\HTML TO DOM TREE></span> git commit -m "feat: complete interactive HTML to DOM tree converter"</p>
          <p>[main (root-commit) 8f3a1b2] feat: complete interactive HTML to DOM tree converter</p>
          <p> 11 files changed, 482 insertions(+)</p>
          <p><span class="prompt">PS C:\Users\sanket\OneDrive\Desktop\HTML TO DOM TREE></span> npm run build</p>
          <p style="color: #4ec9b0;">✓ built in 4.16s (dist/index.html, dist/assets/index.js, dist/assets/index.css)</p>
        </div>
      </div>
    </div>
  </div>

  <div class="status-bar">
    <div style="display: flex; gap: 12px;">
      <span>main*</span>
      <span>0 errors, 0 warnings</span>
    </div>
    <div style="display: flex; gap: 12px;">
      <span>UTF-8</span>
      <span>JavaScript JSX</span>
      <span>Prettier</span>
    </div>
  </div>
</body>
</html>
  `;

  const htmlPath = path.resolve('temp_vscode.html');
  fs.writeFileSync(htmlPath, htmlContent);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 680 },
    deviceScaleFactor: 2
  });

  await page.goto(`file://${htmlPath}`);
  await page.screenshot({ path: path.resolve('screenshot_vscode.png') });
  await browser.close();

  fs.unlinkSync(htmlPath);
  console.log('Created screenshot_vscode.png successfully!');
}

generateVscodeScreenshot().catch(console.error);
