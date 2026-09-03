import React from 'react';
import { Code2, Trash2, FileText, Layout, ListTree } from 'lucide-react';

const SAMPLES = {
  nav: `<div class="wrapper" id="main-container">
  <h1>Tree Visualizer</h1>
  <!-- Main Navigation -->
  <ul class="nav" id="primary-menu">
    <li class="active"><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button id="btn-explore" class="btn primary">Explore More</button>
</div>`,
  card: `<div class="product-card" id="card-101">
  <div class="card-header">
    <span class="badge sale">New</span>
    <h3 class="title">Wireless Earbuds</h3>
  </div>
  <div class="card-body">
    <p class="description">High fidelity audio with noise cancellation.</p>
    <div class="price-tag">$99.00</div>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary" id="btn-buy">Buy Now</button>
  </div>
</div>`,
  form: `<form id="login-form" class="auth-box">
  <div class="form-header">
    <h2>Welcome Back</h2>
    <!-- Authentication Subtitle -->
    <p class="subtitle">Please sign in to your account</p>
  </div>
  <div class="input-group">
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="user@example.com" />
  </div>
  <div class="actions">
    <button type="submit" id="submit-btn" class="btn">Sign In</button>
  </div>
</form>`
};

export default function HtmlEditor({ value, onChange }) {
  const lineCount = (value.match(/\n/g) || []).length + 1;
  const charCount = value.length;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      {/* Editor Header Bar */}
      <div className="px-4 py-2.5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-950">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
            HTML Input
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative group">
            <button
              onClick={() => onChange(SAMPLES.nav)}
              className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 transition cursor-pointer font-medium"
            >
              Nav Sample
            </button>
          </div>
          <button
            onClick={() => onChange(SAMPLES.card)}
            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 transition cursor-pointer font-medium"
          >
            Card
          </button>
          <button
            onClick={() => onChange(SAMPLES.form)}
            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300 transition cursor-pointer font-medium"
          >
            Form
          </button>
          <button
            onClick={() => onChange('')}
            className="text-xs px-2 py-1 bg-red-100 dark:bg-red-950/40 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/50 rounded transition cursor-pointer font-medium flex items-center gap-1"
            title="Clear editor"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 relative flex overflow-hidden">
        <textarea
          className="w-full flex-1 p-4 font-mono text-xs leading-relaxed bg-transparent outline-none resize-none text-gray-800 dark:text-gray-200 selection:bg-blue-500/20"
          placeholder="Paste your raw HTML here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck="false"
        />
      </div>

      {/* Editor Footer Status */}
      <div className="px-4 py-1.5 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 flex justify-between items-center text-[10px] text-gray-500 font-mono">
        <span>Lines: {lineCount} | Chars: {charCount}</span>
        <span className="text-emerald-500">Live Parser Active</span>
      </div>
    </div>
  );
}
