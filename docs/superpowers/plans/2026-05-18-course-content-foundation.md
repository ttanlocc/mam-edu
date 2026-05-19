# Course Content Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tách content khóa IELTS 7→8 ra khỏi `plan.yaml`/`data.js`, server đọc Markdown trên-the-fly, Roadmap screen proof-of-concept fetch từ API.

**Architecture:** Content sống ở `content/courses/<id>/*.md` (gray-matter parse), Express expose 3 endpoint mới (`/api/courses`, `/api/courses/:id`, `/api/courses/:id/weeks/:n`) với mtime-keyed in-memory cache. Frontend thêm `src/lib/api.js` wrapper, Roadmap đổi từ `window.GIEO_PLAN` sang fetch. `plan.yaml` và 4 screen còn lại không đụng.

**Tech Stack:** Node 22 + Express 4 + better-sqlite3 (giữ nguyên), `gray-matter` (mới), React 18 CDN + Babel standalone (giữ nguyên), Playwright (verify visual).

**Spec:** `docs/superpowers/specs/2026-05-18-course-and-roadmap-management-design.md`

---

## File Map

| Path | Action | Trách nhiệm |
|---|---|---|
| `content/courses/ielts-70-80/course.md` | **Create** | Meta + phases + bands + pitfalls, frontmatter YAML |
| `content/courses/ielts-70-80/weeks/w14.md` | **Create** | Week 14, blocks inline |
| `server/package.json` | **Modify** | Thêm `gray-matter` dependency |
| `server/index.js` | **Modify** | Thêm 3 endpoint + cache + `CONTENT_DIR` env |
| `server/Dockerfile` | **Modify** | `COPY content` hoặc đọc từ volume |
| `docker-compose.yml` | **Modify** | Thêm volume mount `./content:/app/content:ro` |
| `src/lib/api.js` | **Create** | `window.gieoApi` wrapper |
| `index.html` | **Modify** | Thêm `<script src="src/lib/api.js">` (load trước screens) |
| `src/screens/Roadmap.jsx` | **Modify** | Đổi `window.GIEO_PLAN` → `gieoApi.getCourse(courseId)` |
| `scripts/verify-content.sh` | **Create** | Bash test harness cho 3 endpoint (curl + jq) |
| `scripts/playwright-roadmap.mjs` | **Create** | Visual smoke test cho Roadmap |

---

## Task 1: Author content pack files

**Files:**
- Create: `content/courses/ielts-70-80/course.md`
- Create: `content/courses/ielts-70-80/weeks/w14.md`

- [ ] **Step 1.1: Create course.md**

Path: `content/courses/ielts-70-80/course.md`

```markdown
---
id: ielts-70-80
code: IELTS
from: "7.0"
to: "8.0"
name: "IELTS · Tinh chỉnh"
months: 8
days: 244
blocks_per_day: 5
per_day: "4h 45′"
tree: fruiting
recommended: true

student_defaults:
  current_overall: 7
  target_overall: 8
  days_to_test: 244

phases:
  - { n: 1, name: Foundations,    range: "T1–3",   span: "02·2026 → 04·2026", target: "7.0",   months: "1–3",   done: true,
      achievements: ["IPA mastered", "Anki habit", "Cambridge 14 done", "Basic essay structure"] }
  - { n: 2, name: "Skill Building", range: "T4–6", span: "05·2026 → 07·2026", target: "7.5", months: "4–6", current: true,
      current_ach: "Engage feedback loop",
      achievements: ["Examiner feedback", "Essay cohesion", "Speaking fluency", "Dictation daily"] }
  - { n: 3, name: Refinement,     range: "T7–9",   span: "08·2026 → 10·2026", target: "7.875", months: "7–9",
      achievements: ["Mock test routine", "Band 7+ Writing", "Naturalise Speaking", "L9 ceiling"] }
  - { n: 4, name: "Exam Readiness", range: "T10–12", span: "11·2026 → 01·2027", target: "8.0", months: "10–12",
      achievements: ["Full mock × 3/week", "Error zero-tolerance", "Peak condition", "Test date"] }

bands:
  - { k: R, name: Reading,   cur: 8.5, tgt: 9.0, color: coral,  status: "Cheapest 0.5 jump" }
  - { k: L, name: Listening, cur: 8.0, tgt: 9.0, color: sage,   status: "Dictation 3×/tuần" }
  - { k: W, name: Writing,   cur: 6.5, tgt: 7.0, color: butter, status: "Binding constraint" }
  - { k: S, name: Speaking,  cur: 6.5, tgt: 7.5, color: sky,    status: "Insurance target" }

pitfalls:
  - { code: P1, name: "Passive→active gap",  note: "thesaurus syndrome — recognise nhưng misuse", seen: 8, hot: true }
  - { code: P2, name: "Memorised templates", note: "In contemporary society… → penalised 2026", seen: 5, hot: false }
  - { code: P3, name: "Coherence weakness",  note: "sentences yes, paragraphs no", seen: 6, hot: true }
  - { code: P4, name: "L1 translation",      note: "run-on conditional chains", seen: 3, hot: false }
  - { code: P5, name: "Task Response drift", note: "display knowledge ≠ answer prompt", seen: 2, hot: false }
---

Lộ trình 8 tháng — chuyển ceiling thành floor. Trọng tâm: feedback ex-examiner & error analysis.
```

- [ ] **Step 1.2: Create weeks/w14.md (minimal — Monday only, đủ proof cho Bước 1)**

Path: `content/courses/ielts-70-80/weeks/w14.md`

```markdown
---
n: 14
phase: 2
day_of_week: "Thứ Hai"
date_n: "11"
month_year: "05 · 2026"
headline: "feedback loop"

milestones:
  - { d: T2, date: "11", label: "Discussion essay", today: true }
  - { d: T3, date: "12", label: "Task 1 · line graph" }
  - { d: T4, date: "13", label: "Opinion essay" }
  - { d: T5, date: "14", label: "iTalki ex-examiner", special: true }
  - { d: T6, date: "15", label: "Problem-Solution essay" }
  - { d: T7, date: "16", label: "Mock R + L", special: true }
  - { d: CN, date: "17", label: "NGHỈ · deload", rest: true }

days:
  - dow: T2
    blocks:
      - { id: B1, kind: WRITING, kind_color: butter, time: "07:00–08:30", duration: 90,
          title: "Task 2 · Discussion type",
          prompt: "Some people believe smartphones are destroying real-life social interaction. Others argue they help people stay connected. Discuss both views and give your own opinion.",
          tasks: [
            { t: "Outline · TS · EX · EG · LK cho 4 đoạn", m: 10 },
            { t: "Viết full essay · 250+ từ · timed 40′", m: 40 },
            { t: "Self-review · 4 tiêu chí descriptor", m: 30 },
            { t: "So sánh Simon model answer", m: 10 }
          ],
          reward_seeds: 35, href: "#/writing" }
---

Tuần 14 đặt nặng feedback loop — Lan H. chấm thứ Năm, Mock thứ Bảy.
```

- [ ] **Step 1.3: Commit content pack**

```bash
git add content/courses/
git commit -m "feat(content): seed ielts-70-80 course pack (course.md + week 14)"
```

---

## Task 2: Add gray-matter dependency

**Files:**
- Modify: `server/package.json`

- [ ] **Step 2.1: Add dependency to package.json**

Open `server/package.json` and add `"gray-matter": "^4.0.3"` to `dependencies`:

```json
{
  "name": "gieo-api",
  "private": true,
  "type": "module",
  "main": "index.js",
  "scripts": { "start": "node index.js" },
  "dependencies": {
    "better-sqlite3": "^11.3.0",
    "express": "^4.21.0",
    "gray-matter": "^4.0.3"
  }
}
```

- [ ] **Step 2.2: Install locally (for local node run)**

```bash
cd server && npm install && cd ..
```

Expected: `npm install` succeeds, `node_modules/gray-matter/` exists.

- [ ] **Step 2.3: Commit**

```bash
git add server/package.json server/package-lock.json 2>/dev/null || git add server/package.json
git commit -m "deps(server): add gray-matter for MD frontmatter parsing"
```

---

## Task 3: Add content endpoints to server

**Files:**
- Modify: `server/index.js`

- [ ] **Step 3.1: Add import + CONTENT_DIR constant**

At top of `server/index.js`, after the existing `import` lines, add:

```javascript
import matter from 'gray-matter';
import { readFileSync, statSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIR = process.env.GIEO_CONTENT || join(process.cwd(), '..', 'content');
```

Note: `process.cwd()` when run from `server/` is `server/`, so `..` points to repo root. In container `WORKDIR=/app`, env `GIEO_CONTENT=/app/content` will be set explicitly.

- [ ] **Step 3.2: Add mtime-keyed cache helper**

After the `db.exec(...)` block (around line 26), before `const getState = ...`, add:

```javascript
// Content cache — invalidate by file mtime
const contentCache = new Map();
function readContent(absPath) {
  const stat = statSync(absPath);
  const cached = contentCache.get(absPath);
  if (cached && cached.mtimeMs === stat.mtimeMs) return cached.parsed;
  const text = readFileSync(absPath, 'utf8');
  const { data, content } = matter(text);
  const parsed = { ...data, body: content.trim() || null };
  contentCache.set(absPath, { mtimeMs: stat.mtimeMs, parsed });
  return parsed;
}
```

- [ ] **Step 3.3: Add 3 endpoints**

After the existing `/api/writing` endpoints (after line 69), before `app.listen(...)`, add:

```javascript
// ──────────────────────────────────────────────────────────────
// Content endpoints — read-only, served from CONTENT_DIR
// ──────────────────────────────────────────────────────────────

app.get('/api/courses', (_req, res) => {
  const coursesDir = join(CONTENT_DIR, 'courses');
  if (!existsSync(coursesDir)) return res.json([]);
  const list = readdirSync(coursesDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => {
      const file = join(coursesDir, e.name, 'course.md');
      if (!existsSync(file)) return null;
      try {
        const c = readContent(file);
        return {
          id: c.id, code: c.code, from: c.from, to: c.to,
          name: c.name, months: c.months, days: c.days,
          blocks_per_day: c.blocks_per_day, per_day: c.per_day,
          tree: c.tree, recommended: !!c.recommended,
        };
      } catch { return null; }
    })
    .filter(Boolean);
  res.json(list);
});

app.get('/api/courses/:id', (req, res) => {
  const file = join(CONTENT_DIR, 'courses', req.params.id, 'course.md');
  if (!existsSync(file)) return res.status(404).json({ error: 'course_not_found' });
  try {
    res.json(readContent(file));
  } catch (err) {
    res.status(500).json({ error: 'parse_error', detail: String(err.message) });
  }
});

app.get('/api/courses/:id/weeks/:n', (req, res) => {
  const n = String(req.params.n).padStart(2, '0');
  const file = join(CONTENT_DIR, 'courses', req.params.id, 'weeks', `w${n}.md`);
  if (!existsSync(file)) return res.status(404).json({ error: 'week_not_found' });
  try {
    res.json(readContent(file));
  } catch (err) {
    res.status(500).json({ error: 'parse_error', detail: String(err.message) });
  }
});
```

- [ ] **Step 3.4: Commit (still untested — verify in Task 5)**

```bash
git add server/index.js
git commit -m "feat(server): /api/courses + /api/courses/:id + /api/courses/:id/weeks/:n"
```

---

## Task 4: Wire Docker container to read content

**Files:**
- Modify: `server/Dockerfile`
- Modify: `docker-compose.yml`

- [ ] **Step 4.1: Update Dockerfile**

Replace `server/Dockerfile` entirely with:

```dockerfile
FROM node:22-alpine
RUN apk add --no-cache python3 make g++ sqlite
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY index.js ./
ENV GIEO_CONTENT=/app/content
EXPOSE 3000
CMD ["node", "index.js"]
```

(Only change: `ENV GIEO_CONTENT=/app/content`. We rely on docker-compose mount to provide the actual files — no `COPY content ./`.)

- [ ] **Step 4.2: Update docker-compose.yml**

Replace `docker-compose.yml` entirely with:

```yaml
services:
  api:
    build: ./server
    restart: unless-stopped
    environment:
      GIEO_DB: /data/gieo.db
      PORT: "3000"
      GIEO_CONTENT: /app/content
    volumes:
      - ./data:/data
      - ./content:/app/content:ro
    ports:
      - "127.0.0.1:3030:3000"
```

(Added `GIEO_CONTENT` env and `./content:/app/content:ro` mount.)

- [ ] **Step 4.3: Commit**

```bash
git add server/Dockerfile docker-compose.yml
git commit -m "build: mount content/ into api container (read-only)"
```

---

## Task 5: Verify endpoints with curl

**Files:**
- Create: `scripts/verify-content.sh`

- [ ] **Step 5.1: Write verification script**

Path: `scripts/verify-content.sh`

```bash
#!/usr/bin/env bash
# Verify /api/courses endpoints — runs against local node OR docker.
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:3030}"
fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }

# Test 1: GET /api/courses returns array with ielts-70-80
list=$(curl -fsS "$BASE/api/courses")
echo "$list" | grep -q '"id":"ielts-70-80"' || fail "/api/courses missing ielts-70-80 — got: $list"
pass "GET /api/courses → contains ielts-70-80"

# Test 2: GET /api/courses/ielts-70-80 has phases, bands, pitfalls
course=$(curl -fsS "$BASE/api/courses/ielts-70-80")
echo "$course" | grep -q '"phases"' || fail "course missing phases"
echo "$course" | grep -q '"bands"' || fail "course missing bands"
echo "$course" | grep -q '"pitfalls"' || fail "course missing pitfalls"
echo "$course" | grep -q '"Skill Building"' || fail "course missing phase 2 name"
pass "GET /api/courses/ielts-70-80 → phases/bands/pitfalls present"

# Test 3: GET /api/courses/ielts-70-80/weeks/14
week=$(curl -fsS "$BASE/api/courses/ielts-70-80/weeks/14")
echo "$week" | grep -q '"n":14' || fail "week n != 14"
echo "$week" | grep -q '"feedback loop"' || fail "week headline missing"
pass "GET /api/courses/ielts-70-80/weeks/14 → ok"

# Test 4: 404 for missing course
status=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/courses/does-not-exist")
[[ "$status" == "404" ]] || fail "expected 404 for missing course, got $status"
pass "GET /api/courses/does-not-exist → 404"

echo "ALL TESTS PASSED"
```

- [ ] **Step 5.2: Start server locally**

```bash
cd server && GIEO_DB=/tmp/gieo-verify.db GIEO_CONTENT="$(pwd)/../content" node index.js &
SERVER_PID=$!
cd ..
sleep 1
curl -fsS http://127.0.0.1:3000/api/health
```

Expected: `{"ok":true,"t":...}`

If port 3000 is taken, use 3001: `PORT=3001 node index.js &` and set `BASE=http://127.0.0.1:3001`.

- [ ] **Step 5.3: Run verification**

```bash
chmod +x scripts/verify-content.sh
BASE=http://127.0.0.1:3000 scripts/verify-content.sh
```

Expected output: 4 lines `PASS:` + `ALL TESTS PASSED`.

- [ ] **Step 5.4: Kill server, commit**

```bash
kill $SERVER_PID 2>/dev/null || true
git add scripts/verify-content.sh
git commit -m "test(content): curl smoke test for /api/courses endpoints"
```

---

## Task 6: Add frontend API client

**Files:**
- Create: `src/lib/api.js`
- Modify: `index.html`

- [ ] **Step 6.1: Create api.js**

Path: `src/lib/api.js`

```javascript
// Gieo · API client — wraps fetch for content endpoints.
// Exposes window.gieoApi for screens to use.

(function () {
  const base = (window.GIEO_CONFIG && window.GIEO_CONFIG.API_BASE) || '';

  async function getJson(path) {
    const res = await fetch(base + path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${path} → ${res.status}`);
    return res.json();
  }

  function currentCourseId() {
    try {
      const raw = localStorage.getItem('gieo_course');
      if (!raw) return 'ielts-70-80';
      const parsed = JSON.parse(raw);
      return parsed?.id || 'ielts-70-80';
    } catch {
      return 'ielts-70-80';
    }
  }

  window.gieoApi = {
    base,
    currentCourseId,
    getCourses: () => getJson('/api/courses'),
    getCourse: (id) => getJson(`/api/courses/${encodeURIComponent(id)}`),
    getWeek: (id, n) => getJson(`/api/courses/${encodeURIComponent(id)}/weeks/${n}`),
  };
})();
```

- [ ] **Step 6.2: Wire script into index.html**

Open `index.html`, find line 611 (`<script src="src/data.js"></script>`). Insert BEFORE it:

```html
<script src="src/lib/api.js"></script>
```

Result (lines around 611):
```html
<script src="src/config.js"></script>
<script src="src/lib/auth.js"></script>
<script src="src/lib/api.js"></script>
<script src="src/data.js"></script>
```

Run `grep -n 'src/lib/api.js' index.html` to verify the new line is there exactly once.

- [ ] **Step 6.3: Commit**

```bash
git add src/lib/api.js index.html
git commit -m "feat(frontend): window.gieoApi wrapper (courses + weeks)"
```

---

## Task 7: Migrate Roadmap.jsx to gieoApi

**Files:**
- Modify: `src/screens/Roadmap.jsx`

- [ ] **Step 7.1: Replace top of file with fetch-based state**

Open `src/screens/Roadmap.jsx`. Currently line 1–2:
```javascript
function RoadmapScreen() {
  const D = window.GIEO_PLAN;
```

Replace lines 1–9 with:
```javascript
function RoadmapScreen() {
  const [course, setCourse] = React.useState(null);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    const id = window.gieoApi.currentCourseId();
    window.gieoApi.getCourse(id).then(setCourse).catch(e => setErr(String(e)));
  }, []);

  if (err) return <div style={{padding:24,color:'#a33',fontFamily:'monospace'}}>Roadmap load error: {err}</div>;
  if (!course) return <div style={{padding:24,color:'#888'}}>Đang tải lộ trình…</div>;

  const D = {
    student: {
      current_overall: course.student_defaults?.current_overall ?? 0,
      target_overall: course.student_defaults?.target_overall ?? 0,
      days_to_test: course.student_defaults?.days_to_test ?? 0,
    },
    phases: course.phases || [],
    bands: course.bands || [],
  };

  // 12 months, first 3 done, month 4 current
  const months = Array.from({length:12}, (_, i) => ({
    n: i + 1,
    done: i < 3,
    cur: i === 3,
  }));
```

(Everything from `return (` downward stays unchanged.)

- [ ] **Step 7.2: Verify by reading the file**

```bash
head -25 src/screens/Roadmap.jsx
```

Expected: see `React.useState`, `window.gieoApi.getCourse`, and the `const D = { student: { ... }, phases, bands }` shim.

- [ ] **Step 7.3: Commit**

```bash
git add src/screens/Roadmap.jsx
git commit -m "feat(roadmap): migrate from GIEO_PLAN to gieoApi.getCourse"
```

---

## Task 8: Playwright visual smoke test for Roadmap

**Files:**
- Create: `scripts/playwright-roadmap.mjs`

- [ ] **Step 8.1: Ensure playwright installed**

```bash
npx --yes playwright --version
```

Expected: a version string. If failure: `npm install --no-save playwright @playwright/test && npx playwright install chromium`.

- [ ] **Step 8.2: Write smoke test**

Path: `scripts/playwright-roadmap.mjs`

```javascript
// Smoke test: load Roadmap, verify it renders without errors and contains key text.
import { chromium } from 'playwright';

const BASE = process.env.GIEO_BASE || 'http://127.0.0.1:8080';
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

const consoleErrors = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', e => consoleErrors.push(String(e)));

// Demo mode → set demo user so App routes past Login.
await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem('gieo_demo_user', JSON.stringify({ email: 'demo@gieo.local' }));
  localStorage.setItem('gieo_course', JSON.stringify({ id: 'ielts-70-80' }));
});
await page.goto(BASE + '#/roadmap', { waitUntil: 'networkidle' });

// Wait for either content or error
await page.waitForFunction(
  () => document.body.innerText.includes('LỘ TRÌNH') || document.body.innerText.includes('error'),
  { timeout: 5000 }
);

const html = await page.content();
const text = await page.evaluate(() => document.body.innerText);

const checks = [
  ['LỘ TRÌNH · 12 THÁNG', text.includes('LỘ TRÌNH · 12 THÁNG')],
  ['Skill Building (phase 2)', text.includes('Skill Building')],
  ['Foundations (phase 1)', text.includes('Foundations')],
  ['Reading band row', text.includes('READING')],
  ['BẠN ĐANG Ở ĐÂY marker', text.includes('BẠN ĐANG Ở ĐÂY')],
  ['No console errors', consoleErrors.length === 0],
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
```

- [ ] **Step 8.3: Run end-to-end: API + static + playwright**

```bash
# Start API on 3000
cd server && GIEO_DB=/tmp/gieo-playwright.db GIEO_CONTENT="$(pwd)/../content" PORT=3000 node index.js &
API_PID=$!
cd ..

# Start static server on 8080 (serves index.html, src/, content/)
python3 -m http.server 8080 &
STATIC_PID=$!

sleep 2

# Configure frontend to point at API on 3000
# (We need a tiny shim — write config override before running playwright)
cat > /tmp/gieo-config-override.html <<'EOF'
<script>window.GIEO_CONFIG = window.GIEO_CONFIG || {}; window.GIEO_CONFIG.API_BASE = 'http://127.0.0.1:3000';</script>
EOF

# Actually patch src/config.js temporarily? Simpler: set window.GIEO_CONFIG via page.addInitScript
```

Actually, simpler approach — modify the playwright script to set API_BASE via `addInitScript`. Replace `await ctx.newPage();` and lines after with this updated block in `scripts/playwright-roadmap.mjs`:

```javascript
const ctx = await browser.newContext();
await ctx.addInitScript(() => {
  window.GIEO_CONFIG = window.GIEO_CONFIG || {};
  window.GIEO_CONFIG.API_BASE = 'http://127.0.0.1:3000';
});
const page = await ctx.newPage();
```

(Make sure this is in the script BEFORE `page.goto`.)

Then run:

```bash
node scripts/playwright-roadmap.mjs
```

Expected: 6 lines `PASS:`, screenshot saved, exit 0.

- [ ] **Step 8.4: Tear down + commit**

```bash
kill $API_PID $STATIC_PID 2>/dev/null || true
git add scripts/playwright-roadmap.mjs
git commit -m "test(roadmap): playwright smoke test for fetch-based render"
```

(Screenshot `scripts/roadmap-after.png` is NOT committed — added to .gitignore in next task if needed.)

---

## Task 9: Update memory + close

**Files:**
- Modify: `/home/azureuser/.claude/projects/-home-azureuser-ed-tech/memory/project_gieo.md`
- Modify: `.gitignore`

- [ ] **Step 9.1: Refresh memory file**

Update the project memory to reflect:
- Backend is hybrid: Supabase auth + Express/SQLite for state/content (not Supabase-only as previously stated).
- Content layer lives at `content/courses/<id>/` with `course.md` + `weeks/wNN.md`.
- API endpoints: `/api/courses`, `/api/courses/:id`, `/api/courses/:id/weeks/:n`.
- Roadmap migrated to API; Today/Week/Writing/Feedback/CourseSelect still on `GIEO_PLAN` (Bước 1 of multi-PR migration).

Edit `/home/azureuser/.claude/projects/-home-azureuser-ed-tech/memory/project_gieo.md`:

Find the line:
```
**Architecture:** CDN React (no build step) — `index.html` loads React + Babel + Supabase UMD, then `type="text/babel"` scripts in order. All components exported via `window.ComponentName`. Backend: Supabase (auth + Postgres + RLS), no server code.
```

Replace with:
```
**Architecture:** CDN React (no build step) — `index.html` loads React + Babel + Supabase UMD, then `type="text/babel"` scripts in order. All components exported via `window.ComponentName`. Backend: **hybrid** — Supabase (auth only) + Express/SQLite container `server/index.js` (state + content). Content sống ở `content/courses/<id>/` (MD + YAML frontmatter), server đọc on-read via gray-matter.
```

Find the line:
```
- `src/data.js` — `window.GIEO_PLAN` seed data
```

Replace with:
```
- `src/data.js` — `window.GIEO_PLAN` legacy loader (fetch /content/plan.yaml). Today/Week/Writing/Feedback/CourseSelect vẫn dùng. Sẽ xóa khi tất cả migrate sang gieoApi.
- `src/lib/api.js` — `window.gieoApi` wrapper (getCourses/getCourse/getWeek). Roadmap đã migrate.
- `content/courses/ielts-70-80/{course.md, weeks/w14.md}` — content pack mới
- `server/index.js` endpoint mới: GET /api/courses, /api/courses/:id, /api/courses/:id/weeks/:n
```

- [ ] **Step 9.2: Add roadmap screenshot to .gitignore**

```bash
echo "scripts/roadmap-after.png" >> .gitignore
git add .gitignore
git commit -m "chore: ignore roadmap smoke test screenshot"
```

- [ ] **Step 9.3: Final verification — checklist against spec § 9**

Run from repo root with API + static server running (per Task 8.3):

```bash
curl -fsS http://127.0.0.1:3000/api/courses | python3 -m json.tool
curl -fsS http://127.0.0.1:3000/api/courses/ielts-70-80 | python3 -m json.tool | head -30
ls -la content/courses/ielts-70-80/course.md content/courses/ielts-70-80/weeks/w14.md
ls -la content/plan.yaml   # MUST still exist
node scripts/playwright-roadmap.mjs
```

Expected:
- `/api/courses` returns array with `ielts-70-80`
- `/api/courses/ielts-70-80` returns object with `phases`, `bands`, `pitfalls`
- Both content files exist
- `plan.yaml` still exists (criterion § 9 bullet 2)
- Playwright passes all 6 checks

- [ ] **Step 9.4: Live edit test (criterion § 9 final bullet)**

While API server is running:

```bash
# Edit phase 2 target
sed -i 's/target: "7.5"/target: "7.6"/' content/courses/ielts-70-80/course.md
curl -fsS http://127.0.0.1:3000/api/courses/ielts-70-80 | grep -o '"target":"7.6"' | head -1
# Should print: "target":"7.6"
# Revert
sed -i 's/target: "7.6"/target: "7.5"/' content/courses/ielts-70-80/course.md
```

Expected: `"target":"7.6"` printed (cache invalidation working, no server restart needed).

---

## Success Criteria (mirrors spec § 9)

- [ ] `content/courses/ielts-70-80/course.md` + `weeks/w14.md` exist and parse.
- [ ] `content/plan.yaml` still present.
- [ ] `curl /api/courses` returns ielts-70-80.
- [ ] `curl /api/courses/ielts-70-80` returns full phases/bands/pitfalls.
- [ ] Roadmap renders with same visible text as before (Playwright 6/6 checks pass).
- [ ] Edit `course.md` → reload `/api/courses/ielts-70-80` → new value visible without server restart.
- [ ] All console errors = 0 on Roadmap load.
- [ ] Memory file updated to reflect hybrid backend.
