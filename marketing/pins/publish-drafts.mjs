import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROFILE_DIR = path.join(__dirname, '.pinterest-profile');

const PINS = [
  {
    title: '35 Halloween Charades Words for Kids & Family Parties',
    description:
      'Free Halloween charades word list for family game night. No cards needed — free online game. how-to-play-charades.com/en/halloween-charades',
    link: 'https://how-to-play-charades.com/en/halloween-charades',
  },
  {
    title: '35 Classroom Charades Words for ESL & Vocabulary Review',
    description:
      'Low-prep vocabulary game for teachers — charades with no printing required. how-to-play-charades.com/en/blog/charades-for-classroom',
    link: 'https://how-to-play-charades.com/en/blog/charades-for-classroom',
  },
  {
    title: '35 Easy Charades Words for Family Game Night (All Ages)',
    description:
      'Simple charades words for kids and family. Free online play with timer. how-to-play-charades.com/en/charades-for-kids',
    link: 'https://how-to-play-charades.com/en/charades-for-kids',
  },
];

async function openDraft(page, title) {
  const draft = page.getByText(title, { exact: false }).first();
  await draft.click({ timeout: 15_000 });
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: /^发布$/ }).waitFor({ state: 'visible', timeout: 30_000 });
}

async function fillDetails(page, pin) {
  const titleInput = page.locator('input[placeholder*="简要描述"]');
  await titleInput.waitFor({ state: 'visible', timeout: 15_000 });
  await page.waitForFunction(
    () => {
      const el = document.querySelector('input[placeholder*="简要描述"]');
      return el && !el.disabled;
    },
    { timeout: 30_000 },
  );
  await titleInput.fill(pin.title);

  const desc = page.locator('[contenteditable="true"]').first();
  await desc.click();
  await page.keyboard.press('Meta+A');
  await page.keyboard.type(pin.description, { delay: 5 });

  const link = page.locator('input[type="url"]');
  await link.fill(pin.link);
  await page.waitForTimeout(1000);
}

async function publish(page) {
  await page.getByText('正在保存').waitFor({ state: 'hidden', timeout: 20_000 }).catch(() => {});
  const btn = page.getByRole('button', { name: /^发布$/ });
  await btn.waitFor({ state: 'visible', timeout: 15_000 });
  await btn.click();
  await page.waitForTimeout(6000);
}

async function main() {
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 1000 },
  });
  const page = context.pages()[0] ?? (await context.newPage());

  try {
    for (const pin of PINS) {
      console.log(`发布草稿: ${pin.title}`);
      await page.goto('https://www.pinterest.com/pin-creation-tool/', {
        waitUntil: 'domcontentloaded',
      });
      await page.waitForTimeout(3000);
      await openDraft(page, pin.title);
      await fillDetails(page, pin);
      await publish(page);
      console.log(`✓ 已点击发布: ${pin.title}`);
    }
  } finally {
    await context.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
