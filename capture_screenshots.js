import { chromium } from 'playwright';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';

async function capture() {
  console.log('Starting preview server...');
  const server = await preview({
    preview: { port: 5173 }
  });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1500);

  // Take full app screenshot
  console.log('Capturing app screenshot...');
  const appScreenshotPath = path.resolve('screenshot_app.png');
  await page.screenshot({ path: appScreenshotPath });

  // Click on a node to show selected state in inspector
  const navNode = await page.locator('text=<ul class="nav">, text=<ul>, text=<div class="wrapper">').first();
  try {
    const nodeToClick = page.locator('.tree li div').nth(2);
    if (await nodeToClick.isVisible()) {
      await nodeToClick.click();
      await page.waitForTimeout(500);
      console.log('Capturing selected node screenshot...');
      await page.screenshot({ path: path.resolve('screenshot_app_selected.png') });
    }
  } catch (e) {
    console.log('Selection note:', e.message);
  }

  await browser.close();
  await server.close();
  console.log('Done capturing screenshots!');
}

capture().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
