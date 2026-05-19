# Gieo · Course Content Foundation — Design

**Date:** 2026-05-18
**Status:** Spec (pre-implementation)
**Scope:** Tách content khóa khỏi code. Một khóa thật (IELTS 7→8), một user (chính bạn / demo). Đủ để các spec tiếp theo (multi-user, block reuse, fixture build) đính vào mà không phải sửa nền.

---

## 1. Problem

`content/plan.yaml` hiện đang trộn 3 thứ:

1. **Course catalog** — `phases`, `bands targets`, `pitfalls` (tĩnh, dùng chung).
2. **Weekly template** — `week_grid`, `week_milestones`, `today_blocks` (tĩnh, dùng chung).
3. **User state** — `student.seeds/streak/tree_stage`, `feedback_log`, `band_trend` (động, riêng user).

Frontend dùng một biến toàn cục `window.GIEO_PLAN` cho cả 5 screens (`src/data.js` fetch `/content/plan.yaml` rồi expose qua promise `GIEO_PLAN_READY`). Mọi thứ — catalog, template, state — đều đi qua một object → không thể có 2 khóa song song, không thể tách progress khỏi content.

Mục tiêu spec này: **content sống ngoài code, server biết phục vụ content, một screen chứng minh pipeline chạy**. Không hơn.

## 2. Out of Scope (defer to future specs)

- Multi-user / auth / Supabase migration.
- Per-user enrollment, block_logs, band_history tables.
- Block template reuse (`blocks/<id>.md` + override merge).
- TOEIC / HSK content thật.
- Build pipeline (`scripts/build-fixture.js`, pre-commit hooks).
- Validation script.
- Personalization engine.

Mỗi mục trên sẽ là một spec riêng khi đụng vấn đề thật.

## 3. Decisions Locked

| # | Quyết định | Lý do |
|---|---|---|
| D1 | Content pack = Markdown + YAML frontmatter, ở `content/courses/<id>/` | Claude web xuất MD tốt; diff git rõ. |
| D2 | Server compile MD on-read (không build step) | Giữ promise "no-build CDN" của frontend; tận dụng Express đã có. |
| D3 | Backend tiếp tục Express + SQLite. **Không đụng schema DB trong spec này.** | "Nền" = content layer; state layer giữ nguyên. |
| D4 | Inline mọi block content trong `weeks/wNN.md`. **Không** tách `blocks/` riêng. | Chưa có ≥3 use case reuse thật. Tách khi đau, không tách phòng xa. |

## 4. Content Pack Layout

```
content/courses/ielts-70-80/
  course.md           # Meta + phases + bands + pitfalls (tất cả ở 1 file)
  weeks/
    w14.md            # Mỗi tuần 1 file, blocks inline
```

### 4.1 `course.md`

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

phases:
  - { n: 1, name: Foundations,    range: "T1–3",   span: "02·2026 → 04·2026", target: "7.0",   done: true }
  - { n: 2, name: Skill Building, range: "T4–6",   span: "05·2026 → 07·2026", target: "7.5",   current: true }
  - { n: 3, name: Refinement,     range: "T7–9",   span: "08·2026 → 10·2026", target: "7.875" }
  - { n: 4, name: Exam Readiness, range: "T10–12", span: "11·2026 → 01·2027", target: "8.0" }

bands:
  - { k: R, name: Reading,   tgt: 9.0, color: coral,  status: "Cheapest 0.5 jump" }
  - { k: L, name: Listening, tgt: 9.0, color: sage,   status: "Dictation 3×/tuần" }
  - { k: W, name: Writing,   tgt: 7.0, color: butter, status: "Binding constraint" }
  - { k: S, name: Speaking,  tgt: 7.5, color: sky,    status: "Insurance target" }

pitfalls:
  - { code: P1, name: "Passive→active gap", note: "thesaurus syndrome — recognise nhưng misuse", hot: true }
  - { code: P2, name: "Memorised templates", note: "In contemporary society… → penalised 2026" }
  - { code: P3, name: "Coherence weakness", note: "sentences yes, paragraphs no", hot: true }
  - { code: P4, name: "L1 translation", note: "run-on conditional chains" }
  - { code: P5, name: "Task Response drift", note: "display knowledge ≠ answer prompt" }
---

Lộ trình 8 tháng — chuyển ceiling thành floor. Trọng tâm: feedback ex-examiner & error analysis.
```

### 4.2 `weeks/w14.md`

Inline mọi block. Lặp nội dung giữa các tuần là OK ở giai đoạn này — sẽ refactor khi viết tới tuần thứ 3 lặp cùng template.

```yaml
---
n: 14
phase: 2
headline: "feedback loop"
milestones:
  - { d: T2, date: "11", label: "Discussion essay", today: true }
  - { d: T5, date: "14", label: "iTalki ex-examiner", special: true }
  - { d: T7, date: "16", label: "Mock R + L", special: true }
  - { d: CN, date: "17", label: "NGHỈ · deload", rest: true }
days:
  - dow: T2
    blocks:
      - id: B1
        kind: WRITING
        kind_color: butter
        time: "07:00–08:30"
        duration: 90
        title: "Task 2 · Discussion type"
        prompt: |
          Some people believe smartphones are destroying real-life social interaction.
          Others argue they help people stay connected. Discuss both views and give your own opinion.
        tasks:
          - { t: "Outline · TS · EX · EG · LK cho 4 đoạn", m: 10 }
          - { t: "Viết full essay · 250+ từ · timed 40′", m: 40 }
          - { t: "Self-review · 4 tiêu chí descriptor", m: 30 }
        reward_seeds: 35
        href: "#/writing"
      # ... B2 Speaking, B3 Reading, B4 Listening, B5 Anki
  # ... T3 → CN
---

Tuần 14 đặt nặng feedback loop — Lan H. chấm thứ Năm, Mock thứ Bảy.
```

## 5. Backend Changes (`server/index.js`)

Thêm `gray-matter` dependency vào `server/package.json`, ~60 dòng code mới. **Không đụng schema DB.**

```
GET  /api/courses
       → scan content/courses/*/course.md → trả frontmatter array (cho CourseSelect).

GET  /api/courses/:id
       → parse content/courses/:id/course.md → trả { ...frontmatter, body }.

GET  /api/courses/:id/weeks/:n
       → parse content/courses/:id/weeks/w<NN>.md → trả frontmatter (đã có days[].blocks[] inline).
```

**Cache:** `Map<filepath, {mtime, parsed}>`, invalidate khi `fs.statSync().mtimeMs` đổi → file edit reload tức thì, không restart server.

**Content path resolution:** `const CONTENT_DIR = process.env.GIEO_CONTENT || '/app/content';` — tham số hoá để dev local (chạy `node index.js` từ repo root) khác container path.

**Wiring container:**
- `server/Dockerfile`: thêm `COPY content /app/content` (hoặc để docker-compose mount thay).
- `docker-compose.yml`: thêm volume `./content:/app/content:ro` cạnh `./data:/data` để edit content không cần rebuild image.

**Endpoint cũ (`/api/state`, `/api/writing`) giữ nguyên.** Spec multi-user sau sẽ deprecate.

## 6. Frontend Changes

| File | Thay đổi |
|---|---|
| `src/lib/api.js` (mới) | Wrapper `window.gieoApi`: `getCourses()`, `getCourse(id)`, `getWeek(id, n)`. Endpoint base lấy từ `window.GIEO_CONFIG.API_BASE` (mặc định `''` = same-origin). **Không có** demo-mode tĩnh fallback ở Bước 1 — nếu API down, screen show error state. Demo-mode static fallback sẽ là spec riêng nếu cần. |
| `src/screens/Roadmap.jsx` | Đổi từ `window.GIEO_PLAN` sang `useEffect` gọi `gieoApi.getCourse(courseId)`. `courseId` lấy: `JSON.parse(localStorage.getItem('gieo_course') \|\| 'null')?.id ?? 'ielts-70-80'`. **Proof of concept duy nhất ở Bước 1.** |
| `src/data.js` | **Giữ nguyên hoàn toàn** ở Bước 1. Today/Week/Writing/Feedback/CourseSelect vẫn đọc `window.GIEO_PLAN` (load từ `plan.yaml`). |
| `content/plan.yaml` | **Giữ nguyên ở Bước 1.** Chỉ xóa ở Bước cuối khi tất cả 5 screen đã migrate sang `gieoApi`. |
| Các screen khác | **Không đụng** trong PR Bước 1. Migrate từng cái ở các PR sau (mỗi screen 1 PR). |

## 7. Resolution Flow (`GET /api/courses/:id/weeks/:n`)

1. Cache lookup theo `mtime` → hit thì return.
2. Read `content/courses/:id/weeks/w<NN padded>.md`.
3. `gray-matter(text)` → `{ data, content }`.
4. Return `{ ...data, body: content }`.

Không có bước merge override, không có resolve reference. Khi nào đụng spec block-reuse mới thêm.

## 8. Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | Memory file ghi backend Supabase, hiện thực Express+SQLite | Update memory khi merge spec này. |
| R2 | Lặp nội dung block giữa các tuần khi viết w15, w16, w17 | Chấp nhận. Refactor sang `blocks/` khi tuần thứ 3 lặp cùng template — đó là tín hiệu spec block-reuse. |
| R3 | Roadmap mới dùng API, Today/Week vẫn `GIEO_PLAN` → 2 source of truth tạm thời | Có chủ ý. State này tồn tại tối đa cho tới khi viết spec/PR migrate Today/Week. Note rõ trong CLAUDE.md. Phải đảm bảo `plan.yaml` và `course.md` *đồng bộ thủ công* trong giai đoạn chuyển — sửa 1 chỗ phải sửa 2. Đây là pain point có chủ đích để gây áp lực hoàn tất migration nhanh. |
| R4 | Memory file nói backend = Supabase, thực tế hybrid (Supabase auth + Express/SQLite cho state/content) | Update `MEMORY.md project_gieo.md` khi merge PR Bước 1 để reflect "hybrid": auth = Supabase (`src/lib/auth.js`), content + state = Express/SQLite. |

## 9. Success Criteria (Bước 1 — PR đầu)

- [ ] `content/courses/ielts-70-80/course.md` + `weeks/w14.md` tồn tại, parse được, chứa tất cả field mà Roadmap hiện đang dùng từ `plan.yaml` (`phases`, `bands`, `student.days_to_test`, `student.current_overall`, `student.target_overall`).
- [ ] `content/plan.yaml` **vẫn còn** (Today/Week/Writing/Feedback/CourseSelect chưa migrate).
- [ ] `curl http://127.0.0.1:3030/api/courses` trả array có 1 phần tử (`ielts-70-80`).
- [ ] `curl http://127.0.0.1:3030/api/courses/ielts-70-80` trả JSON đầy đủ `phases[]`, `bands[]`, `pitfalls[]`.
- [ ] Roadmap screen render đúng như trước (visual diff zero), nhưng DevTools Network tab cho thấy data đến từ `/api/courses/ielts-70-80` thay vì `plan.yaml`.
- [ ] Sửa `course.md` (ví dụ đổi `target` của phase 2 từ "7.5" → "7.6") → refresh browser → Roadmap hiển thị "7.6". Không restart `docker compose`.

## 9.1 Final criterion (đạt được sau khi tất cả 5 screen migrate ở các PR sau)

- [ ] `content/plan.yaml` xoá. `src/data.js` xoá. `js-yaml` CDN script ở `index.html:607` xoá.

## 10. Next Specs (khi cần)

- `2026-XX-XX-multi-user-enrollment-design.md` — users/enrollments/block_logs tables, auth.
- `2026-XX-XX-block-template-reuse-design.md` — tách `blocks/<id>.md` + override khi viết tới tuần thứ 3 lặp.
- `2026-XX-XX-toeic-content-pack-design.md` — content pack khóa thứ 2.
