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

Frontend đọc thẳng `window.GIEO_PLAN` hardcoded → không thể có 2 khóa, không thể sửa nội dung mà không deploy code.

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

Thêm gray-matter dependency, ~50 dòng code mới. **Không đụng schema DB.**

```
GET  /api/courses
       → scan content/courses/*/course.md → trả frontmatter array (cho CourseSelect).

GET  /api/courses/:id
       → parse content/courses/:id/course.md → trả { ...frontmatter, body }.

GET  /api/courses/:id/weeks/:n
       → parse content/courses/:id/weeks/w<NN>.md → trả frontmatter (đã có days[].blocks[] inline).
```

**Cache:** `Map<filepath, {mtime, parsed}>`, invalidate khi `fs.statSync().mtimeMs` đổi → file edit reload tức thì, không restart server.

**Endpoint cũ (`/api/state`, `/api/writing`) giữ nguyên.** Spec multi-user sau sẽ deprecate.

## 6. Frontend Changes

| File | Thay đổi |
|---|---|
| `src/lib/api.js` (mới) | Wrapper `window.gieoApi`: `getCourses()`, `getCourse(id)`, `getWeek(id, n)`. Demo mode (config chưa set) → fetch tĩnh `/content/courses/...` qua chính Express (server đã serve static được). |
| `src/screens/Roadmap.jsx` | Đổi từ đọc `window.GIEO_PLAN` sang `useEffect(() => gieoApi.getCourse(courseId))`. **Proof of concept duy nhất ở Bước 1.** |
| `src/data.js` | Giữ nguyên cho Today/Week/CourseSelect tiếp tục chạy. Đánh dấu deprecated trong comment. |
| Các screen khác | **Không đụng.** Migrate dần ở các spec/PR sau. |

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
| R3 | Roadmap mới dùng API, Today/Week vẫn `GIEO_PLAN` → 2 source of truth tạm thời | Có chủ ý. State này tồn tại tối đa cho tới khi viết spec/PR migrate Today/Week. Note rõ trong CLAUDE.md. |

## 9. Success Criteria

- [ ] `content/courses/ielts-70-80/course.md` + `weeks/w14.md` tồn tại, là source of truth duy nhất cho dữ liệu khóa.
- [ ] `content/plan.yaml` xóa được (hoặc rỗng).
- [ ] `curl localhost:3000/api/courses/ielts-70-80` trả JSON đầy đủ phases/bands/pitfalls.
- [ ] Roadmap screen render đúng như trước, nhưng data đến từ fetch.
- [ ] Sửa `course.md` → refresh browser → thấy thay đổi. Không restart server.

## 10. Next Specs (khi cần)

- `2026-XX-XX-multi-user-enrollment-design.md` — users/enrollments/block_logs tables, auth.
- `2026-XX-XX-block-template-reuse-design.md` — tách `blocks/<id>.md` + override khi viết tới tuần thứ 3 lặp.
- `2026-XX-XX-toeic-content-pack-design.md` — content pack khóa thứ 2.
