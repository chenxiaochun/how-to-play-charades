import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PINS = [
  {
    image: 'halloween-pin.png',
    title: '35 Halloween Charades Words for Kids & Family Parties',
    description:
      'Free Halloween charades word list for family game night 🎃 No cards needed — use your phone timer + our free online game. Full guide: how-to-play-charades.com/en/halloween-charades',
    link: 'https://how-to-play-charades.com/en/halloween-charades',
  },
  {
    image: 'classroom-pin.png',
    title: '35 Classroom Charades Words for ESL & Vocabulary Review',
    description:
      'Low-prep vocabulary game for teachers — charades with no printing required. Classroom guide + free word generator: how-to-play-charades.com/en/blog/charades-for-classroom',
    link: 'https://how-to-play-charades.com/en/blog/charades-for-classroom',
  },
  {
    image: 'family-pin.png',
    title: '35 Easy Charades Words for Family Game Night (All Ages)',
    description:
      'Simple charades words for kids, parents & grandparents. Free online play with timer — no app download. how-to-play-charades.com/en/charades-for-kids',
    link: 'https://how-to-play-charades.com/en/charades-for-kids',
  },
];

const PROFILE_DIR = path.join(__dirname, '.pinterest-profile');

async function openCreator(page) {
  await page.goto('https://www.pinterest.com/pin-creation-tool/', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForTimeout(2500);
}

async function uploadImage(page, imagePath) {
  const fileInput = page.locator('input[type="file"]');
  await fileInput.first().waitFor({ state: 'attached', timeout: 45_000 });
  await fileInput.first().setInputFiles(imagePath);
  await page.waitForTimeout(4000);
  await page.getByText('正在保存').waitFor({ state: 'hidden', timeout: 30_000 }).catch(() => {});
  await page.waitForTimeout(1000);
}

async function fillPinDetails(page, pin) {
  const title = page.locator('input[placeholder*="简要描述"], input[placeholder*="title" i]');
  await title.first().waitFor({ state: 'visible', timeout: 15_000 });
  await title.first().fill(pin.title);

  const desc = page.locator('[contenteditable="true"]').first();
  if (await desc.count()) {
    await desc.click();
    await desc.fill(pin.description);
  }

  const link = page.locator('input[type="url"], input[placeholder*="链接"], input[placeholder*="link" i]');
  await link.first().fill(pin.link);
  await page.waitForTimeout(800);
}

async function publish(page) {
  const publishBtn = page.getByRole('button', { name: /^发布$|^Publish$/i });
  await publishBtn.waitFor({ state: 'visible', timeout: 30_000 });
  await publishBtn.click();
  await page.waitForTimeout(5000);
  await page.getByText(/已发布|Pin 已发布|published|查看 Pin/i)
    .first()
    .waitFor({ state: 'visible', timeout: 30_000 })
    .catch(() => {});
}

async function main() {
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 1000 },
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const page = context.pages()[0] ?? (await context.newPage());

  try {
    for (let i = 0; i < PINS.length; i++) {
      const pin = PINS[i];
      const imagePath = path.join(__dirname, pin.image);
      console.log(`\n[${i + 1}/${PINS.length}] 发布: ${pin.title}`);

      await openCreator(page);
      await uploadImage(page, imagePath);
      await fillPinDetails(page, pin);
      await publish(page);
      console.log(`✓ 已发布: ${pin.image}`);
    }

    console.log('\n全部 3 个 Pin 已发布完成。');
    await page.waitForTimeout(3000);
  } finally {
    await context.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
