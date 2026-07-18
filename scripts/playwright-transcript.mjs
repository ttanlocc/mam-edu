// Verify the audio transcript panel end-to-end: real API (/materials + /transcripts),
// real MaterialList component, fixture audio + VTT. Self-contained — creates fixtures,
// spawns the server, drives the harness page, screenshots, and cleans up.
//
//   npm i --no-save playwright react@18.3.1 react-dom@18.3.1 @babel/standalone@7.29.0
//   node scripts/playwright-transcript.mjs
//
// CDN requests (unpkg) are intercepted and served from local node_modules, so the
// run is deterministic and works offline / behind an egress policy.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 3011;
const BASE = `http://127.0.0.1:${PORT}`;

// ── Fixtures: 8s WAV (4 tones) + matching 4-cue VTT ───────────────────────────
const tmp = mkdtempSync(join(tmpdir(), 'gieo-transcript-'));
const matDir = join(tmp, 'materials');
const vttDir = join(tmp, 'transcripts');
mkdirSync(join(matDir, 'test'), { recursive: true });
mkdirSync(join(vttDir, 'test'), { recursive: true });

function makeWav(seconds, rate = 8000) {
  const n = seconds * rate;
  const data = Buffer.alloc(n * 2);
  for (let i = 0; i < n; i++) {
    const freq = 220 * (1 + Math.floor(i / (2 * rate))); // new tone every 2s
    data.writeInt16LE(Math.round(8000 * Math.sin((2 * Math.PI * freq * i) / rate)), i * 2);
  }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}
writeFileSync(join(matDir, 'test', 'beep.wav'), makeWav(8));
writeFileSync(join(vttDir, 'test', 'beep.wav.vtt'), `WEBVTT

00:00.000 --> 00:02.000
Câu thứ nhất của bài nghe.

00:02.000 --> 00:04.000
Câu thứ hai, đang chạy live.

00:04.000 --> 00:06.000
Câu thứ ba của transcript.

00:06.000 --> 00:08.000
Câu cuối cùng, hết bài.
`);

// ── Spawn API with fixtures + frontend same-origin ────────────────────────────
const server = spawn('node', ['server/index.js'], {
  cwd: ROOT,
  env: { ...process.env, PORT: String(PORT), GIEO_DB: join(tmp, 'gieo.db'),
    GIEO_CONTENT: join(ROOT, 'content'), GIEO_MATERIALS: matDir,
    GIEO_TRANSCRIPTS: vttDir, GIEO_FRONTEND: ROOT },
  stdio: ['ignore', 'inherit', 'inherit'],
});
const cleanup = () => { try { server.kill(); } catch {} try { rmSync(tmp, { recursive: true, force: true }); } catch {} };
process.on('exit', cleanup);

for (let i = 0; ; i++) {
  try { const r = await fetch(`${BASE}/api/health`); if (r.ok) break; } catch {}
  if (i > 50) { console.error('server never came up'); process.exit(1); }
  await new Promise(r => setTimeout(r, 200));
}

// ── Drive the harness ─────────────────────────────────────────────────────────
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures++;
};

// PW_CHROMIUM: override when the local playwright's bundled browser isn't installed
// (e.g. remote container ships /opt/pw-browsers/chromium).
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM || undefined,
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const page = await (await browser.newContext({ viewport: { width: 720, height: 900 } })).newPage();
const pageErrs = [];
page.on('console', m => {
  if (m.type() !== 'error') return;
  const url = (m.location() && m.location().url) || '';
  if (/favicon|missing\.wav\.vtt/.test(url)) return; // expected 404s (no favicon; test 5 probes a missing VTT)
  pageErrs.push(`${m.text().slice(0, 160)} @ ${url.slice(-60)}`);
});
page.on('pageerror', e => pageErrs.push('pageerror: ' + String(e).slice(0, 200)));

// Serve the harness's CDN <script>s from node_modules (offline-safe).
const VENDOR = {
  'react@18.3.1/umd/react.development.js': 'react/umd/react.development.js',
  'react-dom@18.3.1/umd/react-dom.development.js': 'react-dom/umd/react-dom.development.js',
  '@babel/standalone@7.29.0/babel.min.js': '@babel/standalone/babel.min.js',
};
await page.route('https://unpkg.com/**', (route) => {
  const key = route.request().url().replace('https://unpkg.com/', '');
  const local = VENDOR[key];
  if (!local) return route.abort();
  route.fulfill({ contentType: 'application/javascript',
    body: readFileSync(join(ROOT, 'node_modules', local), 'utf8') });
});

await page.goto(`${BASE}/scripts/transcript-harness.html`, { waitUntil: 'networkidle' });
await page.waitForSelector('audio', { timeout: 15000 });

// 1 · collapsed by default (no cue rows before toggling — dictation not spoiled)
check('transcript đóng mặc định', (await page.locator('[data-cue]').count()) === 0);

// 2 · toggle → 4 cues fetched from /transcripts and rendered
await page.getByRole('button', { name: 'TRANSCRIPT' }).click();
await page.waitForSelector('[data-cue="3"]', { timeout: 10000 });
check('mở panel → 4 câu từ VTT', (await page.locator('[data-cue]').count()) === 4);
check('nội dung câu đúng', (await page.locator('[data-cue="1"]').innerText()).includes('đang chạy live'));
await page.screenshot({ path: 'scripts/transcript-1-open.png' });

// 3 · live highlight: play, jump to t=3s → cue #2 (index 1) active
await page.evaluate(() => document.querySelector('audio').play());
await page.waitForFunction(() => document.querySelector('audio').currentTime > 0.2, { timeout: 10000 });
await page.evaluate(() => { document.querySelector('audio').currentTime = 3; });
await page.waitForFunction(
  () => document.querySelector('[data-cue="1"]')?.dataset.active === '1', { timeout: 5000 }
).catch(() => {});
check('highlight live theo audio (t=3s → câu 2)',
  await page.evaluate(() => document.querySelector('[data-cue="1"]')?.dataset.active === '1'));
await page.screenshot({ path: 'scripts/transcript-2-live.png' });

// 4 · click cue #4 → audio seeks to ~6s and that cue becomes active
await page.locator('[data-cue="3"]').click();
await page.waitForFunction(
  () => document.querySelector('[data-cue="3"]')?.dataset.active === '1', { timeout: 5000 }
).catch(() => {});
const t = await page.evaluate(() => document.querySelector('audio').currentTime);
check('bấm câu 4 → tua tới ~6s', t >= 5.9 && t < 8, `currentTime=${t.toFixed(2)}`);
check('câu 4 thành active',
  await page.evaluate(() => document.querySelector('[data-cue="3"]')?.dataset.active === '1'));
await page.screenshot({ path: 'scripts/transcript-3-seek.png' });

// 5 · missing transcript → graceful note (fetch a src with no VTT)
await page.evaluate(() => {
  const root = document.createElement('div'); root.id = 'root2'; document.body.appendChild(root);
  window.__mount2 = () => ReactDOM.createRoot(root).render(
    React.createElement(window.MaterialList, { block: { material:
      { type: 'audio', name: 'No transcript', src: 'test/missing.wav' } } })
  );
  window.__mount2();
});
await page.locator('#root2').getByRole('button', { name: 'TRANSCRIPT' }).click();
await page.waitForSelector('#root2 code', { timeout: 5000 }).catch(() => {});
check('thiếu VTT → báo "Chưa có transcript"',
  (await page.locator('#root2').innerText()).includes('Chưa có transcript'));

check('không có lỗi console/page', pageErrs.length === 0, pageErrs.join(' | '));

await browser.close();
console.log(failures ? `\n${failures} CHECK(S) FAILED` : '\nALL TRANSCRIPT CHECKS PASSED');
process.exit(failures ? 1 : 0);
