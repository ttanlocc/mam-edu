// Smoke test: load Roadmap, verify it renders without errors and contains key text.
import { chromium } from 'playwright';

const BASE = process.env.GIEO_BASE || 'http://127.0.0.1:8080';
const API  = process.env.GIEO_API  || 'http://127.0.0.1:3000';

const browser = await chromium.launch();
const ctx = await browser.newContext();
await ctx.addInitScript((api) => {
  window.GIEO_CONFIG = window.GIEO_CONFIG || {};
  window.GIEO_CONFIG.API_BASE = api;
}, API);
const page = await ctx.newPage();

const consoleErrors = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', e => consoleErrors.push(String(e)));

// Set demo user + course so App routes past Login.
await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('gieo_demo_user', JSON.stringify({ email: 'demo@gieo.local' }));
  // Full course payload matching CourseSelect's handleStart() — Sidebar/Today need streak/seeds.
  localStorage.setItem('gieo_course', JSON.stringify({
    id: 'ielts-70-80', code: 'IELTS', from: '7.0', to: '8.0',
    name: 'IELTS · Tinh chỉnh', days_to_test: 244,
    streak: 0, seeds: 0, tree_stage: 0,
    started_at: new Date().toISOString(),
    blocks_per_day: 5, per_day: '4h 45′', months: 8,
  }));
});
await page.goto(BASE + '/#/roadmap', { waitUntil: 'networkidle' });

// Wait up to 5s for either content or error message
try {
  await page.waitForFunction(
    () => {
      const t = document.body.innerText;
      return t.includes('LỘ TRÌNH') || t.includes('error') || t.includes('Đang tải');
    },
    { timeout: 5000 }
  );
} catch (e) {
  console.log('TIMEOUT waiting for body text');
}

// If still loading, wait a bit more
await page.waitForTimeout(1500);

const text = await page.evaluate(() => document.body.innerText);

const checks = [
  ['LỘ TRÌNH · 12 THÁNG header',     text.includes('LỘ TRÌNH · 12 THÁNG')],
  ['Phase 2 "Skill Building"',       text.includes('Skill Building')],
  ['Phase 1 "Foundations"',          text.includes('Foundations')],
  ['Reading band row',               text.includes('READING')],
  ['BẠN ĐANG Ở ĐÂY marker',          text.includes('BẠN ĐANG Ở ĐÂY')],
  ['No console errors',              consoleErrors.length === 0],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  if (!ok) failed++;
}
if (consoleErrors.length) {
  console.log('--- console errors:');
  consoleErrors.forEach(e => console.log(' ', e));
}

await page.screenshot({ path: 'scripts/roadmap-after.png', fullPage: true });
console.log('Screenshot: scripts/roadmap-after.png');

await browser.close();
process.exit(failed > 0 ? 1 : 0);
