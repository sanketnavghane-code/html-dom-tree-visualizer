/**
 * Parses raw HTML string into a hierarchical DOM tree data structure.
 * Utilizes the browser's native DOMParser API.
 */
export function parseHTMLToTree(htmlString) {
  if (!htmlString || !htmlString.trim()) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  let idCounter = 0;

  function traverse(node, depth = 0) {
    const currentId = `node-${idCounter++}`;

    // Handle Text Nodes
    if (node.nodeType === Node.TEXT_NODE) {
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

    // Handle Comment Nodes
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

    // Handle Element Nodes
    if (node.nodeType === Node.ELEMENT_NODE) {
      const attrs = {};
      Array.from(node.attributes).forEach(attr => {
        attrs[attr.name] = attr.value;
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

  // Parse starting from body content or document element
  const target = doc.body.childNodes.length > 0 ? doc.body : doc.documentElement;
  const children = [];
  Array.from(target.childNodes).forEach(child => {
    const res = traverse(child, 1);
    if (res) children.push(res);
  });

  return {
    id: 'node-root',
    type: 'document',
    name: 'document',
    attributes: {},
    depth: 0,
    children: children.length === 1 && children[0].children.length > 0 ? children[0].children : children
  };
}

/**
 * Calculates summary metrics for the parsed DOM tree.
 */
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
