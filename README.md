# HTML to DOM Tree Converter

An interactive, responsive web application built with **React.js** and **Tailwind CSS** that converts raw HTML strings into a visual, hierarchical DOM tree diagram in real-time.

## Features

- **Pure CSS Connectors**: Vertical branching root-node structure rendered with lightweight CSS pseudo-elements (no heavy chart libraries like D3 or React Flow).
- **Native DOMParser**: Real-time extraction of element tags, text nodes, comments, and attribute maps using the browser's native `DOMParser` API.
- **Interactive Node Inspection**: Click any node to view detailed properties, attribute key-value pairs, and textual content in the inspector sidebar.
- **Collapsible Subtrees**: Expand/collapse branch nodes with `+` / `−` controls.
- **Live Search & Highlighting**: Highlight nodes matching tag names, classes, IDs, or text queries.
- **DOM Metrics & Statistics**: Real-time counters for elements, text nodes, comments, and maximum depth.
- **Dark/Light Mode**: Smooth theme switching with responsive studio layout.

## Tech Stack

- **Frontend**: React 18 / 19, Tailwind CSS v4, Lucide React Icons
- **Build Tool**: Vite

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
