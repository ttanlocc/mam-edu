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
  // 12-month plan (from 7.0 → 8.5, months: 12, per_day: 4h)
  localStorage.setItem('gieo_course', JSON.stringify({
    id: 'ielts-85', code: 'IELTS', from: '7.0', to: '8.5',
    name: 'IELTS · Lộ trình 8.5', days_to_test: 365,
    streak: 0, seeds: 0, tree_stage: 0,
    started_at: new Date().toISOString(),
    blocks_per_day: 5, per_day: '4h', months: 12,
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
  // ── Header & strip ───────────────────────────────────────────────────────
  ['LỘ TRÌNH · 12 THÁNG header',          text.includes('LỘ TRÌNH · 12 THÁNG')],
  ['Score "6.0 → 8.0"',                   text.includes('6') && text.includes('8')],
  ['Month strip shows T1 current',         text.includes('T1')],
  ['Status: "Đang ở Tháng 1"',            text.includes('Tháng 1')],
  ['Status: "Phase 1"',                   text.includes('Phase 1')],

  // ── Phase rows ────────────────────────────────────────────────────────────
  ['Phase 1 "Foundations" shown',          text.includes('Foundations')],
  ['Phase 2 "Skill Building" shown',       text.includes('Skill Building')],
  ['Phase 3 "Refinement" shown',           text.includes('Refinement')],
  ['Phase 4 "Exam Readiness" shown',       text.includes('Exam Readiness')],
  ['BẠN ĐANG Ở ĐÂY on Phase 1',           text.includes('BẠN ĐANG Ở ĐÂY')],
  ['Phase 1 span "06·2026"',               text.includes('06·2026')],

  // ── Band targets ──────────────────────────────────────────────────────────
  ['READING band row',                     text.includes('READING')],
  ['WRITING "–" (untested)',               text.includes('–')],
  ['SPEAKING band shows target 7.5',       text.includes('7.5')],

  // ── Schedule grid ─────────────────────────────────────────────────────────
  ['Schedule section header',             text.includes('PHÂN BỔ THỜI GIAN')],
  ['Writing 90′ in Phase 1',              text.includes("90′")],
  ['Vocab 30′ in Phase 1',               text.includes("30′")],

  // ── Materials ─────────────────────────────────────────────────────────────
  ['Sách bắt buộc section',               text.includes('SÁCH BẮT BUỘC')],
  ['Cambridge IELTS 14–20 listed',         text.includes('Cambridge IELTS')],
  ['Ứng dụng section',                     text.includes('ỨNG DỤNG')],
  ['Anki listed',                          text.includes('Anki')],
  ['Nguồn miễn phí section',              text.includes('NGUỒN MIỄN PHÍ')],
  ['ielts-simon.com listed',               text.includes('ielts-simon.com')],

  // ── YouTube ───────────────────────────────────────────────────────────────
  ['YouTube section',                      text.includes('YOUTUBE')],
  ['IELTS Simon channel',                  text.includes('IELTS Simon')],

  // ── No errors ────────────────────────────────────────────────────────────
  ['No console errors',                    consoleErrors.length === 0],
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
console.log(`\nScreenshot: scripts/roadmap-after.png`);
console.log(`\n${failed === 0 ? '✓ All checks passed' : `✗ ${failed} check(s) failed`}`);

await browser.close();
process.exit(failed > 0 ? 1 : 0);
