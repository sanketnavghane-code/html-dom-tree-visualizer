import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function generateSnippetScreenshot() {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #1e1e1e;
      color: #d4d4d4;
      font-family: "JetBrains Mono", Consolas, "Courier New", monospace;
      padding: 24px;
      width: 600px;
      font-size: 14px;
      line-height: 1.6;
      border-radius: 8px;
    }
    .keyword { color: #569cd6; }
    .func { color: #dcdcaa; }
    .prop { color: #9cdcfe; }
    .tag { color: #4ec9b0; }
    .attr { color: #9cdcfe; }
    .string { color: #ce9178; }
    .comment { color: #6a9955; }
    .number { color: #b5cea8; }
  </style>
</head>
<body>
<span class="keyword">function</span> <span class="func">DomNode</span>({ <span class="prop">node</span>, <span class="prop">depth</span> }) {
  <span class="keyword">return</span> (
    &lt;<span class="tag">div</span> <span class="attr">className</span>=<span class="string">"dom-node"</span>&gt;

      <span class="comment">{/* Connector */}</span>

      <span class="comment">{/* Node */}</span>
      &lt;<span class="tag">div</span>&gt;
        {<span class="prop">node</span>.<span class="prop">tagName</span>}
      &lt;/<span class="tag">div</span>&gt;

      <span class="comment">{/* Children */}</span>
      {<span class="prop">node</span>.<span class="prop">children</span>?.<span class="func">map</span>((<span class="prop">child</span>) =&gt; (
        &lt;<span class="func">DomNode</span>
          <span class="attr">key</span>={<span class="prop">child</span>.<span class="prop">id</span>}
          <span class="attr">node</span>={<span class="prop">child</span>}
          <span class="attr">depth</span>={<span class="prop">depth</span> + <span class="number">1</span>}
        /&gt;
      ))}

    &lt;/<span class="tag">div</span>&gt;
  );
}
</body>
</html>
  `;

  const htmlPath = path.resolve('temp_snippet.html');
  fs.writeFileSync(htmlPath, htmlContent);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 600, height: 420 },
    deviceScaleFactor: 2
  });

  await page.goto(`file://${htmlPath}`);
  await page.screenshot({ path: path.resolve('screenshot_prompt_snippet.png') });
  await browser.close();

  fs.unlinkSync(htmlPath);
  console.log('Created screenshot_prompt_snippet.png successfully!');
}

generateSnippetScreenshot().catch(console.error);
