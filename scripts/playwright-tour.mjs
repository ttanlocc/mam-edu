// Tour: navigate every screen, screenshot each, report errors per screen.
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8080';
const API  = 'http://127.0.0.1:3000';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((api) => {
  window.GIEO_CONFIG = window.GIEO_CONFIG || {};
  window.GIEO_CONFIG.API_BASE = api;
}, API);

const page = await ctx.newPage();
const errsByStop = new Map();
let currentStop = 'init';
page.on('console', m => {
  if (m.type() === 'error') {
    const arr = errsByStop.get(currentStop) || [];
    arr.push(m.text().slice(0,180));
    errsByStop.set(currentStop, arr);
  }
});
page.on('pageerror', e => {
  const arr = errsByStop.get(currentStop) || [];
  arr.push('pageerror: ' + String(e).slice(0,180));
  errsByStop.set(currentStop, arr);
});

async function shot(name) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: `scripts/tour-${name}.png`, fullPage: true });
  const text = (await page.evaluate(() => document.body.innerText)).slice(0, 250).replace(/\s+/g, ' ');
  console.log(`✓ tour-${name}.png — ${text}`);
}

// ── Stop 1: Login (no demo user, no real session) ──────────────
currentStop = '1-login';
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('1-login');

// ── Stop 2: CourseSelect (set demo user only) ─────────────────
currentStop = '2-course-select';
await page.evaluate(() => {
  localStorage.setItem('gieo_demo_user', JSON.stringify({ email: 'demo@gieo.local' }));
  localStorage.removeItem('gieo_course');
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('2-course-select');

// ── Stop 3: Today (set course) ────────────────────────────────
const fullCourse = {
  id: 'ielts-70-80', code: 'IELTS', from: '7.0', to: '8.0',
  name: 'IELTS · Tinh chỉnh', days_to_test: 244,
  streak: 0, seeds: 0, tree_stage: 0,
  started_at: new Date().toISOString(),
  blocks_per_day: 5, per_day: '4h 45′', months: 8,
};
currentStop = '3-today';
await page.evaluate((c) => localStorage.setItem('gieo_course', JSON.stringify(c)), fullCourse);
await page.evaluate(() => { window.location.hash = '#/today'; });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('3-today');

// ── Stop 4: Week ──────────────────────────────────────────────
currentStop = '4-week';
await page.evaluate(() => { window.location.hash = '#/week'; });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('4-week');

// ── Stop 5: Roadmap (the migrated screen) ────────────────────
currentStop = '5-roadmap';
await page.evaluate(() => { window.location.hash = '#/roadmap'; });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('5-roadmap');

// ── Stop 6: Writing ──────────────────────────────────────────
currentStop = '6-writing';
await page.evaluate(() => { window.location.hash = '#/writing'; });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('6-writing');

// ── Stop 7: Feedback ─────────────────────────────────────────
currentStop = '7-feedback';
await page.evaluate(() => { window.location.hash = '#/feedback'; });
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('7-feedback');

console.log('');
console.log('=== ERRORS BY SCREEN ===');
let totalErrs = 0;
for (const stop of ['1-login','2-course-select','3-today','4-week','5-roadmap','6-writing','7-feedback']) {
  const errs = errsByStop.get(stop) || [];
  totalErrs += errs.length;
  console.log(`${stop}: ${errs.length === 0 ? 'CLEAN' : errs.length + ' error(s)'}`);
  errs.forEach(e => console.log('  ·', e));
}
console.log('');
console.log(totalErrs === 0 ? '✅ ALL CLEAN' : `❌ ${totalErrs} error(s) total`);

await browser.close();
process.exit(totalErrs === 0 ? 0 : 1);
