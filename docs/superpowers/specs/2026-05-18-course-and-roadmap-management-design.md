# Gieo · Course Content & User Roadmap Management — Design

**Date:** 2026-05-18
**Status:** Spec (pre-implementation)
**Scope:** End-to-end (data model · API · frontend) cho việc quản lý nội dung khóa và lộ trình học của từng user.

---

## 1. Problem

App Gieo IELTS hiện đang trộn lẫn 3 khái niệm trong một file duy nhất `content/plan.yaml`:

1. **Course catalog** (tĩnh, dùng chung) — `phases`, `bands targets`, `pitfalls`.
2. **Weekly templates** (tĩnh, dùng chung) — `week_grid`, `week_milestones`.
3. **User state** (động, riêng từng user) — `student.seeds/streak/tree_stage`, `today_blocks` đã chọn cho hôm nay, `feedback_log`, `band_trend`.

Hậu quả:

- Khi app scale lên multi-user (đã có Supabase auth + Login screen), không có chỗ nào tách "lộ trình IELTS" với "tiến độ của user X".
- `CourseSelect.jsx` đã có concept đa khóa (IELTS / TOEIC / HSK) và lưu `gieo_course` vào `localStorage`, nhưng sau khi chọn xong, app vẫn đọc cùng một `window.GIEO_PLAN` toàn cục → "chọn khóa" hiện chỉ là cosmetic.
- Memory ghi backend là Supabase nhưng repo thực tế đã có `server/index.js` (Express + SQLite, 1 bảng `state` JSON blob + 1 bảng `writing`). Backend hiện chỉ "dump JSON cho một user duy nhất".

Mục tiêu: tách rạch ròi **content layer** (curriculum của khóa) khỏi **progress layer** (lộ trình + tiến độ của user), và xác định cách author/serve/consume mỗi layer.

## 2. Goals & Non-Goals

**Goals**

- Mỗi khóa có content pack tự chứa, sống trong git, edit-được bằng Markdown trên Claude web → paste vào Claude Code.
- Mỗi user có một `enrollment` riêng cho mỗi khóa, track tiến độ độc lập với content.
- Today/Week/Roadmap screens resolve được "hôm nay làm gì" bằng cách join `enrollment.current_week` với content pack.
- Migration không big-bang: làm được Bước 1 (content tách ra) mà chưa cần Bước 2 (multi-user).

**Non-Goals (out of scope cho spec này)**

- Migrate sang Supabase auth/DB. Memory ghi Supabase nhưng repo dùng Express+SQLite — giữ nguyên SQLite.
- Personalization engine (cùng khóa, user khác nhau sinh task khác nhau theo level). Cùng khóa = cùng curriculum.
- Admin UI / CMS. Authoring chỉ qua file MD + git.
- TOEIC / HSK content thật. Hai khóa này vẫn placeholder.

## 3. Decisions Locked

| # | Quyết định | Lý do |
|---|---|---|
| D1 | Content pack = Markdown + YAML frontmatter, sống ở `content/courses/<id>/` | Claude web xuất MD tốt; YAML frontmatter cho metadata structured; diff git rõ. |
| D2 | Block templates tách riêng (`blocks/<id>.md`), week file chỉ reference id + override | Reuse "Task 2 Discussion essay" giữa nhiều tuần; sửa prompt 1 chỗ không động vào structure. |
| D3 | Server compile MD on-read (Approach B), không build step | Khớp với promise "no-build CDN" của frontend; tận dụng Express đã có; không cần nhớ `npm run build:content`. |
| D4 | Backend tiếp tục là Express + SQLite (`server/index.js`) | Bước nhỏ; migrate Supabase là chuyện khác, không kẹp vào spec này. |
| D5 | Demo mode (config chưa set / chưa login) đọc 1 fixture JSON bundled | Giữ promise hiện tại trong CLAUDE.md: feature mới phải xử lý cả `configured=true` và `configured=false`. |

## 4. Content Pack Layout

```
content/courses/ielts-70-80/
  course.md                    # Metadata + marketing copy cho CourseSelect
  phases.md                    # 4 phases: Foundations / Skill Building / Refinement / Exam Readiness
  bands.md                     # R/L/W/S targets, per-phase override OK
  pitfalls.md                  # P1–P5 watchlist
  weeks/
    w01.md ... w52.md          # week_grid + week_milestones + danh sách block_id mỗi ngày
  blocks/
    writing-task2-discussion.md
    writing-task1-linegraph.md
    speaking-record-shadow.md
    reading-cambridge-passage.md
    listening-section4-dictation.md
    anki-srs.md
```

### 4.1 `course.md` example

```yaml
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
---

Lộ trình 8 tháng — chuyển ceiling thành floor. Trọng tâm:
feedback ex-examiner & error analysis.
```

### 4.2 `weeks/w14.md` example

```yaml
---
n: 14
phase: 2
date_n: "11"
month_year: "05 · 2026"
day_of_week: "Thứ Hai"
headline: "feedback loop"
milestones:
  - { d: T2, date: "11", label: "Discussion essay" }
  - { d: T3, date: "12", label: "Task 1 · line graph" }
  - { d: T4, date: "13", label: "Opinion essay" }
  - { d: T5, date: "14", label: "iTalki ex-examiner", special: true }
  - { d: T6, date: "15", label: "Problem-Solution essay" }
  - { d: T7, date: "16", label: "Mock R + L", special: true }
  - { d: CN, date: "17", label: "NGHỈ · deload", rest: true }
days:
  - dow: T2
    blocks:
      - block: writing-task2-discussion
        time: "07:00–08:30"
        override:
          title: "Task 2 · Discussion type"
          prompt: |
            Some people believe smartphones are destroying real-life
            social interaction. Others argue they help people stay
            connected. Discuss both views and give your own opinion.
      - block: speaking-record-shadow
        time: "09:00–10:00"
        override:
          prompt: "Cambridge 18 · Test 2 · Part 2 — Describe a person who has influenced your career choice."
      - block: reading-cambridge-passage
        time: "14:00–14:45"
        override:
          prompt: "Cambridge 15 · Test 2 · Passage 3 — 13 câu · Matching Headings + T/F/NG + Summary"
      - block: listening-section4-dictation
        time: "19:00–19:45"
        override:
          prompt: 'Cambridge 16 · Test 1 · Section 4 · "Coastal erosion" · 10 câu'
      - block: anki-srs
        time: "Bookends"
        override:
          title: "15 mới · 142 review"
  # ... T3, T4, T5, T6, T7, CN
---

Tuần 14 đặt nặng feedback loop — Lan H. chấm thứ Năm, Mock thứ Bảy.
```

### 4.3 `blocks/writing-task2-discussion.md` example

```yaml
---
id: writing-task2-discussion
kind: WRITING
kind_color: butter
duration: 90
default_title: "Task 2 · Discussion type"
reward_seeds: 35
href: "#/writing"
tasks:
  - { t: "Outline · TS · EX · EG · LK cho 4 đoạn", m: 10 }
  - { t: "Viết full essay · 250+ từ · timed 40′", m: 40 }
  - { t: "Self-review · 4 tiêu chí descriptor", m: 30 }
  - { t: "So sánh Simon model answer", m: 10 }
---

Block "Task 2 Discussion essay" — dùng cho mọi tuần có lịch
discussion-type essay. Override `prompt` mỗi tuần.
```

## 5. Backend Schema (SQLite)

Giữ nguyên 2 bảng cũ (`state`, `writing`) cho backward compat trong giai đoạn migration. Thêm các bảng sau:

```sql
CREATE TABLE users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  created_at  INTEGER NOT NULL
);

CREATE TABLE courses (
  id              TEXT PRIMARY KEY,        -- 'ielts-70-80'
  manifest_path   TEXT NOT NULL,           -- 'content/courses/ielts-70-80'
  registered_at   INTEGER NOT NULL
);

CREATE TABLE enrollments (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id           INTEGER NOT NULL REFERENCES users(id),
  course_id         TEXT    NOT NULL REFERENCES courses(id),
  started_at        INTEGER NOT NULL,
  target_test_date  TEXT,                  -- 'YYYY-MM-DD'
  current_phase     INTEGER NOT NULL DEFAULT 1,
  current_week      INTEGER NOT NULL DEFAULT 1,
  streak            INTEGER NOT NULL DEFAULT 0,
  seeds             INTEGER NOT NULL DEFAULT 0,
  tree_stage        INTEGER NOT NULL DEFAULT 0,
  status            TEXT    NOT NULL DEFAULT 'active',  -- 'active'|'paused'|'finished'
  UNIQUE(user_id, course_id)
);

CREATE TABLE block_logs (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  enrollment_id   INTEGER NOT NULL REFERENCES enrollments(id),
  date            TEXT    NOT NULL,        -- 'YYYY-MM-DD'
  block_id        TEXT    NOT NULL,        -- references content/courses/<c>/blocks/<id>.md
  week_n          INTEGER NOT NULL,
  day_n           TEXT    NOT NULL,        -- 'T2'..'CN'
  duration_min    INTEGER,
  seeds_earned    INTEGER NOT NULL DEFAULT 0,
  done            INTEGER NOT NULL DEFAULT 0,   -- 0|1
  note            TEXT,
  created_at      INTEGER NOT NULL
);
CREATE INDEX idx_block_logs_enr_date ON block_logs(enrollment_id, date);

CREATE TABLE band_history (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  enrollment_id   INTEGER NOT NULL REFERENCES enrollments(id),
  date            TEXT    NOT NULL,
  skill           TEXT    NOT NULL,        -- 'R'|'L'|'W'|'S'
  band            REAL    NOT NULL,
  source          TEXT    NOT NULL         -- 'self'|'mock'|'examiner'
);

CREATE TABLE feedback_log (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  enrollment_id   INTEGER NOT NULL REFERENCES enrollments(id),
  date            TEXT    NOT NULL,
  kind            TEXT    NOT NULL,        -- 'W · Task 2', 'S · Part 3', ...
  band            REAL,
  examiner        TEXT,
  note            TEXT,
  created_at      INTEGER NOT NULL
);
```

**Quy tắc tách content vs progress:**

- `content/` = read-only theo user → curriculum.
- DB = write-heavy → tiến độ.
- Hai cái join qua `enrollment.course_id` + `block_logs.block_id`.

## 6. API Surface

### 6.1 Content (public, read-only)

```
GET  /api/courses
       → [{ id, code, from, to, name, months, days, blocks_per_day, tree, recommended, placeholder, eta }]
GET  /api/courses/:id
       → { ...course, phases: [...], bands: [...], pitfalls: [...] }
GET  /api/courses/:id/weeks/:n
       → { n, phase, headline, milestones, days: [{ dow, blocks: [<resolved block>] }] }
```

Server reads MD files, parses frontmatter (gray-matter), resolves block references (merge `blocks/<id>.md` defaults with week-level `override`), returns flat JSON.

### 6.2 User progress (authenticated)

```
GET   /api/me/enrollment              → enrollment row + course metadata
POST  /api/me/enrollment               → tạo khi user "Bắt đầu gieo"
                                         body: { course_id, target_test_date }
PATCH /api/me/enrollment                → update current_week/phase, target_test_date, status

GET   /api/me/today                    → resolve enrollment.current_week → week file → today's blocks,
                                         merged với block_logs hôm nay (done/undone)
POST  /api/me/blocks/:block_id/complete → ghi block_logs, cộng seeds, update streak
                                         body: { date, duration_min, note? }

POST  /api/me/feedback                 → ghi feedback_log
GET   /api/me/feedback                 → list mới nhất (replace endpoint /api/writing hiện tại)

GET   /api/me/band-trend               → band_history aggregated theo tuần
POST  /api/me/band                     → ghi 1 entry band_history
```

### 6.3 Backward-compat trong giai đoạn migration

- `/api/state` (PUT/GET) tiếp tục hoạt động ở Bước 1, chỉ deprecate ở Bước 2.
- `/api/writing` (POST/GET) tiếp tục hoạt động, internally ghi vào `feedback_log` mới.

## 7. Frontend Changes

| File | Thay đổi |
|---|---|
| `src/data.js` | **Xóa** sau Bước 1. Hardcoded `window.GIEO_PLAN` thay bằng API fetch. |
| `src/lib/api.js` (mới) | Wrapper `window.gieoApi`: `getCourses()`, `getCourse(id)`, `getWeek(id, n)`, `getToday()`, `completeBlock(blockId, payload)`, `getMyEnrollment()`, `createEnrollment(courseId, opts)`, `submitFeedback(payload)`. Tự switch demo-mode fallback. |
| `src/lib/fixture.js` (mới) | Pre-compiled JSON dump của `ielts-70-80` content pack (bundled tại commit time). Dùng khi `gieoApi.configured === false`. |
| `src/screens/CourseSelect.jsx` | Bỏ hardcoded `COURSES` + `COURSE_DETAIL`. Fetch `/api/courses`. Detail sheet fetch `/api/courses/:id` on open. "Bắt đầu gieo" gọi `POST /api/me/enrollment` thay vì chỉ set `localStorage`. |
| `src/screens/Today.jsx` | `useEffect → gieoApi.getToday()`. Block "DONE" → `gieoApi.completeBlock(...)`. |
| `src/screens/Week.jsx` | `gieoApi.getWeek(courseId, currentWeek)`. |
| `src/screens/Roadmap.jsx` | `gieoApi.getCourse(courseId)` (phases + bands) + `gieoApi.getBandTrend()`. |
| `src/screens/Writing.jsx` / `Feedback.jsx` | Đổi `/api/writing` calls sang `gieoApi.submitFeedback / getFeedback`. |
| `src/App.jsx` | Sau auth, gọi `gieoApi.getMyEnrollment()`. Không có enrollment → redirect `#/course-select`. Có enrollment → cho vào `#/today`. |

## 8. Resolution Flow (key algorithm)

`GET /api/me/today` server-side:

1. Look up `enrollments` for current user → get `course_id`, `current_week`.
2. Read `content/courses/<course_id>/weeks/w<NN>.md`, parse frontmatter.
3. Compute `dow` cho `Date.today()` (T2..CN).
4. Find `days[].dow === today_dow → blocks[]`.
5. For each block reference, read `blocks/<block.block>.md`, merge `override` từ week file đè lên defaults.
6. Read `block_logs WHERE enrollment_id = ? AND date = today` → set `done`, `seeds_earned`, `note` cho mỗi block.
7. Return flat JSON tương đương `today_blocks` schema hiện tại trong `plan.yaml` (để frontend đổi tối thiểu).

Cache MD parse trong RAM (`Map<filepath, {mtime, parsed}>`), invalidate khi `fs.statSync().mtimeMs` đổi → re-read miễn phí, file edit reload tức thì.

## 9. Migration Path (3 bước, không big-bang)

### Bước 1 — Content pack only (tuần này)

- Tách `content/plan.yaml` thành `content/courses/ielts-70-80/{course.md,phases.md,bands.md,pitfalls.md,weeks/w14.md,blocks/*.md}`.
- Thêm gray-matter dependency vào `server/package.json`.
- Thêm `GET /api/courses`, `/api/courses/:id`, `/api/courses/:id/weeks/:n` vào `server/index.js`.
- Build `src/lib/fixture.js` bằng script một lần (`node scripts/build-fixture.js`) để bundle demo data.
- Đổi `Roadmap.jsx` sang fetch API (proof of concept 1 screen).
- **Kết quả:** `plan.yaml` xóa được; Roadmap chạy bằng content pack; các screen khác vẫn dùng `GIEO_PLAN` (deprecated).

### Bước 2 — Enrollment + block_logs (tuần sau)

- Thêm 5 bảng mới (`users`, `courses`, `enrollments`, `block_logs`, `band_history`, `feedback_log`).
- Seed bảng `courses` từ folders trong `content/courses/`.
- Auth: trước mắt dùng email magic-link đơn giản (Express session). Supabase migration là spec riêng.
- Migrate dữ liệu từ `state` JSON blob → 1 row `enrollments` + N row `block_logs`.
- Đổi Today/Week/Writing/CourseSelect sang `gieoApi.*`.
- `state` table chỉ còn dùng cho demo mode.

### Bước 3 — Multi-course thật (sau khi có user thật)

- Author content pack TOEIC + HSK theo schema § 4.
- Bỏ `placeholder: true` ở `CourseSelect`.
- Hỗ trợ user có nhiều enrollment (UNIQUE constraint đã cho phép 1-per-course).

## 10. Risks & Open Questions

| # | Risk | Mitigation |
|---|---|---|
| R1 | Memory file ghi backend Supabase, hiện thực Express+SQLite → confusion lần sau onboard | Update memory ngay khi merge spec này. |
| R2 | Gray-matter parse runtime mỗi request → latency | Cache theo mtime (xem § 8). Hot path đo dưới 5ms cho 1 week. |
| R3 | Author quên đồng bộ `week_n` field với filename `w14.md` | Validation script: server boot, scan tất cả `weeks/*.md`, assert `frontmatter.n === parseInt(filename)`. Fail-fast. |
| R4 | User đổi khóa giữa chừng → block_logs cũ orphan | UNIQUE(user_id, course_id) + status='paused' giữ history; tạo enrollment mới cho course khác. |
| R5 | Demo mode fixture lệch khỏi content pack thật | `scripts/build-fixture.js` chạy ở pre-commit hook để force re-sync. |

## 11. Out of Scope / Future Work

- Supabase migration (spec riêng).
- Personalization engine — cùng khóa, content khác nhau theo level đầu vào của user.
- Admin UI cho author không-dev.
- A/B test giữa các curriculum variant.
- Localization (hiện chỉ Tiếng Việt + thuật ngữ IELTS).
