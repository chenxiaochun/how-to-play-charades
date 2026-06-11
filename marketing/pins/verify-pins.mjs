import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROFILE_DIR = path.join(__dirname, '.pinterest-profile');

const context = await chromium.launchPersistentContext(PROFILE_DIR, {
  channel: 'chrome',
  headless: true,
  viewport: { width: 1400, height: 1000 },
});
const page = context.pages()[0] ?? (await context.newPage());
await page.goto('https://www.pinterest.com/chenx0928/_created/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(5000);
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(2000);
const text = await page.evaluate(() => document.body.innerText);
const pins = [
  'Halloween Charades',
  'Classroom Charades',
  'Family Game Night',
  'how-to-play-charades',
];
console.log(
  JSON.stringify(
    {
      url: page.url(),
      matches: pins.map((k) => ({ k, found: text.includes(k) })),
      snippet: text.slice(0, 1500),
    },
    null,
    2,
  ),
);
await context.close();
