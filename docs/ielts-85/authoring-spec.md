# IELTS 8.5 — Week Authoring Spec (SEQUENTIAL-FOCUS plan, 2026-07-18)

**Purpose.** Contract for authoring the daily-plan week files of course `ielts-85`
(`content/courses/ielts-85/weeks/wN.md`, N = 1..52). Every subagent authoring a week
MUST obey this spec so the 52 files are consistent, render correctly, and stay inside the
app's own material set.

**Plan shape (user decision 2026-07-18):** the 12 months are SEQUENTIAL, not parallel.
**Months 1–6 (w1–26): NO WRITING AT ALL** — grind Listening & Reading to 9.0 and build
Speaking 0→7.0. **Months 7–12 (w27–52): Writing 0→7.0** (largest daily block) + Speaking
7.0→8.0, while L/R drop to maintenance. Band math: L9 + R9 + W7.0 + S8.0 = 33 → overall 8.5.

---

## Rule #1 — Closed-corpus material reuse (HARD)

Every material reference in every task/prompt MUST come from the **Material Inventory** in
**`material-inventory.md`** (the real downloaded archive in `laged-app` — Ngọc Bách, Chép Chính Tả,
Nguyễn Huyền/BBC, Nghĩa Phan, Road to IELTS, Tú Phạm). **Do NOT invent or cite books/websites/apps
that are not downloaded** — in particular NOT Cambridge test-books, Simon, Cullen, Hancock, Collins,
ieltsliz/ieltsadvantage (these are NOT in the archive). The learner must never be sent to find a
resource. If a task needs material, cite a specific downloaded item, e.g.
`NgọcBách · Reading Online/4.TRUE FALSE NOT GIVEN`, `NgọcBách · Writing Online/IELTS Writing Task 2/DISCUSS OPINION`,
`ChépChínhTả · ADVANCED · Lesson 7`, `NguyễnHuyền · BBC ep26`, `NghĩaPhan · Test 14`. A week that
references anything outside the inventory FAILS validation. The only allowed non-archive items are the
**feedback services** (Writing marking, italki tutor, ELSA) and `[opt]`-flagged gap-fillers.

---

## Rule #2 — Phase-kind rule (HARD, new)

- **Weeks 1–26 (Phase 1–2): NO `WRITING` block anywhere.** The valid kinds are
  `SPEAKING | READING | LISTENING | ANKI`. A normal weekday runs all four.
  Do not sneak writing practice into other blocks (no "viết essay", no Task 1/Task 2 work);
  writing *sentences for Anki production cards* or *speaking cue-card bullet notes* is fine.
- **Weeks 27–52 (Phase 3–4): `WRITING` is the largest block and appears every day Mon–Sat.**
  `READING` and `LISTENING` alternate on weekdays (each ~3×/week) since Writing now owns the
  big morning slot; Saturday runs both (mock).

## Output & file naming

- One file per week: `content/courses/ielts-85/weeks/wN.md` (no zero-padding: `w1.md`, `w13.md`, `w52.md`).
- Markdown with a **YAML frontmatter** block fenced by `---` … `---`, then a **one-line body** (a short Vietnamese summary of the week).
- Frontmatter is parsed by `gray-matter` (js-yaml). It MUST parse. Quote any string containing `:`, `#`, `–`, `·`, `→`, or leading digits+`:`.

## Week frontmatter schema (exact — matches what Today.jsx / Week.jsx read)

Week-level keys:
- `n`: int — week number (1..52).
- `phase`: int — 1..4 (see Phase table).
- `day_of_week`: `"Thứ Hai"` — always (week starts Monday).
- `date_n`: string — Monday's day-of-month (from Calendar table), e.g. `"6"`.
- `month_year`: string — `"MM · YYYY"` from Calendar table, e.g. `"07 · 2026"`.
- `headline`: short lowercase Vietnamese/English phrase, e.g. `"diagnostic"`, `"khóa 39/40"`, `"writing mở màn"`. Rendered as “Engage **{headline}**”.
- `milestones`: list of **exactly 7** entries, one per day Mon→Sun:
  - `{ d, date, label }` where `d` ∈ `T2,T3,T4,T5,T6,T7,CN` (T2=Mon … T7=Sat, CN=Sun).
  - `date`: day-of-month string from Calendar table for that day.
  - `label`: short description of that day's focus.
  - `T7` (Saturday) carries `special: true` (mock/review day).
  - `CN` (Sunday) carries `rest: true` and has **no** matching `days` entry.
  - In **week 1 only**, `T2` carries `today: true`. No other week sets `today`.
  - A day with a tutor/examiner event also sets `special: true` (italki day, marking-return day).
- `days`: list of **exactly 6** entries (Mon→Sat), `{ dow, blocks }` where `dow` ∈ `T2..T7` and matches the milestone `d`. **No CN entry.**

Block-level keys (each item in `blocks`):
- `id`: `"B1"`, `"B2"`, … — unique **within the day**, sequential.
- `kind`: one of `WRITING | SPEAKING | READING | LISTENING | ANKI` (subject to Rule #2).
- `kind_color`: fixed by kind → `WRITING:butter`, `SPEAKING:sky`, `READING:coral`, `LISTENING:sage`, `ANKI:mute`.
- `time`: `"HH:MM–HH:MM"` (en-dash `–`). Use the daily time grid below.
- `duration`: int minutes. **Must equal Σ of the block's `tasks[].m`.**
- `title`: concise task title (≤ ~60 chars).
- `prompt`: 2–3 sentences, concrete and actionable, citing inventory material(s).
- `tasks`: list of `{ t, m }` — `t` = step text (imperative, specific), `m` = int minutes. **Σ m == duration.**
- `reward_seeds`: int — WRITING 25–35, SPEAKING 15–22, READING 15–20, LISTENING 15–20, ANKI 10–15.
- `href`: `"#/writing"` for WRITING blocks, else `"#/today"`.
- `material` / `materials` (OPTIONAL): wired study-material object(s) `{ type, name, src, locator, note }`
  pointing into the sliced/extracted archive. **Only weeks 1–7 currently have these.** When re-authoring
  w1–7, PRESERVE the existing wired objects for any block whose cited material stays in the new plan
  (same lesson / passage / script / vocab topic); drop the ones attached to removed WRITING blocks.
  Do NOT invent new `src` paths — only reuse paths already present in the old file.

### Structural invariants (validation checks all of these)
1. Frontmatter parses as YAML; top-level `n`, `phase`, `milestones`, `days` present.
2. `milestones` has 7 entries with the exact `d` sequence `T2,T3,T4,T5,T6,T7,CN`; CN `rest:true`; T7 `special:true`.
3. `days` has 6 entries `T2..T7`; each `dow` matches a milestone `d`.
4. Each day has **4–6 blocks**; **at most ONE block per `kind`** (the week grid shows one cell per skill/day).
5. Every block: `id` unique in day, valid `kind`, correct `kind_color`, `duration` int, `tasks` non-empty, **Σ tasks.m == duration**, `reward_seeds` int, `href` correct.
6. **Phase-kind rule (Rule #2):** w1–26 contain zero `WRITING` blocks; w27–52 have a `WRITING` block on every day T2–T7.
7. Day totals: weekday (T2–T6) ≈ **195–235 min**. Saturday: Phase 1–2 ≈ **205–255 min** across 4 blocks (timed L + R mocks with review folded in; w13/w26 = the scored S mock too); Phase 3 ≈ **210–270 min** (L+R mock + W block + S); Phase 4 ≈ **250–300 min** (full timed 4-skill mock + scoring + error analysis); w49–52 taper lighter. Sunday rest.
8. **Every material citation ∈ Material Inventory** (Rule #1) — a downloaded item (`NgọcBách`/`ChépChínhTả`/`NguyễnHuyền`/`NghĩaPhan`/`RoadToIELTS`/`TúPhạm`) or a feedback service. NO Cambridge-book/Simon/Cullen/Hancock/Collins.
9. The materials used match the week's row in `curriculum-map.md` and the phase (NghĩaPhan Sat mocks from w1; RoadToIELTS from Phase 3; Writing marking only from w30; italki: diagnostic w4, 1×/wk w5–13, 2×/wk w14+).

### Worked example (a valid Phase-1 day — mirror this exact YAML shape; note: NO WRITING block)
```yaml
---
n: 1
phase: 1
day_of_week: "Thứ Hai"
date_n: "6"
month_year: "07 · 2026"
headline: "diagnostic"
milestones:
  - { d: T2, date: "6", label: "Diagnostic R+L+S · KHÔNG Writing", today: true }
  - { d: T3, date: "7", label: "GAP FILL video+slide · CCT-I 2 · script #1 sâu" }
  # ... T4..T6
  - { d: T7, date: "11", label: "Mock · NghĩaPhan T1 L + R timed", special: true }
  - { d: CN, date: "12", label: "NGHỈ · deload", rest: true }
days:
  - dow: T2
    blocks:
      - { id: B1, kind: READING, kind_color: coral, time: "07:00–08:05", duration: 65,
          title: "Diagnostic Reading + NB-R2 GAP FILL (video)",
          prompt: "Làm 2 passage GAP FILL trong NgọcBách · Reading Online/2.GAP FILL practice PDF chưa tính giờ để lấy baseline. Xem video + slide dạng GAP FILL. Đối chiếu key, ghi lỗi vào Reading Error Log.",
          tasks: [
            { t: "Làm 2 passage NgọcBách · Reading Online/2.GAP FILL practice PDF", m: 30 },
            { t: "Xem video + slide NgọcBách · Reading Online/2.GAP FILL", m: 20 },
            { t: "Đối chiếu key · ghi lỗi + từ khóa vào Reading Error Log", m: 15 }
          ],
          reward_seeds: 18, href: "#/today" }
      - { id: B2, kind: SPEAKING, kind_color: sky, time: "09:00–10:05", duration: 65,
          title: "Diagnostic Speaking P1/2/3 + ELSA setup",
          prompt: "Tự thu âm trả lời Part 1, Part 2 (2 phút), Part 3 để lấy baseline. Đọc NgọcBách · Script Speaking #1 làm mẫu. Cài ELSA, chạy bài test phát âm đầu tiên.",
          tasks: [
            { t: "Thu âm Part 1 + Part 2 + Part 3 baseline", m: 25 },
            { t: "Đọc + phân tích NgọcBách · Script Speaking #1", m: 20 },
            { t: "ELSA · test phát âm đầu + drill 10 từ yếu nhất", m: 20 }
          ],
          reward_seeds: 20, href: "#/today" }
      - { id: B3, kind: LISTENING, kind_color: sage, time: "14:00–15:10", duration: 70,
          title: "Diagnostic nghe + Chép Chính Tả INTERMEDIATE 1",
          prompt: "Chép chính tả từng từ ChépChínhTả · INTERMEDIATE · Lesson 1 để đo độ chính xác spelling/số. Nghe thêm NguyễnHuyền · 72-track Track 1 chép ý chính.",
          tasks: [
            { t: "Chép chính tả ChépChínhTả · INTERMEDIATE · Lesson 1", m: 30 },
            { t: "Tự dò + đánh dấu lỗi spelling/số vào Listening Log", m: 15 },
            { t: "NguyễnHuyền · 72-track Track 1 · chép ý chính + dò lại", m: 25 }
          ],
          reward_seeds: 18, href: "#/today" }
      - { id: B4, kind: ANKI, kind_color: mute, time: "19:00–19:25", duration: 25,
          title: "Anki · NB-V1 Business & Money (15 collocation)",
          prompt: "Học chủ đề 1 trong NgọcBách · Vocabulary online. Chọn 15 collocation, tạo production card, đọc to từng câu ví dụ.",
          tasks: [
            { t: "Nghe + đọc NgọcBách · Vocabulary online - Chủ đề 1", m: 10 },
            { t: "Tạo 15 production card vào Anki", m: 10 },
            { t: "Đọc to từng câu ví dụ · đánh dấu card khó", m: 5 }
          ],
          reward_seeds: 12, href: "#/today" }
  # ... T3..T7 similar; CN has no days entry (rest)
---

Tuần 1 — chẩn đoán R/L/S + vào nhịp cày L·R. KHÔNG Writing: 4h/ngày dồn hết cho tiếp nhận + nói.
```
Note in the example: `tasks[].m` sums to `duration`; `kind_color` matches `kind`; every material is a downloaded item; NO WRITING block (Phase 1).

## Daily time grid (default slots — adjust durations, keep order)

**Phase 1–2 (w1–26, no Writing):**
- Morning: `07:00–08:0x` → **READING** (timed work with fresh mind, 55–70′).
- Late morning: `09:00–10:0x` → **SPEAKING** (55–75′; italki days = the tutor session).
- Afternoon: `14:00–15:1x` → **LISTENING** (dictation core, 60–75′).
- Evening: `19:00–19:2x` → **ANKI** (20–25′).
- All four kinds run daily on weekdays (4 blocks). Saturday = timed mock: bigger L + R blocks (test + review inside one block each) + S + ANKI — still 4 blocks (only 4 kinds exist, max one block per kind).

**Phase 3–4 (w27–52, Writing largest):**
- Morning: `07:00–08:4x` → **WRITING** (85–100′, the anchor block).
- Late morning: `09:00–10:0x` → **SPEAKING** (55–60′).
- Afternoon: `14:00–14:4x` → **READING** *or* **LISTENING** (30–40′ — alternate weekdays, each ~3×/wk).
- Evening: `19:00–19:2x` → **ANKI** (15–20′).
- Saturday = full timed mock (Phase 4: all 4 skills back-to-back) + review, 5–6 blocks.

---

## Phase table

| Phase | Weeks | Months | Span | Target | Daily minutes (W/S/R/L/V) | Theme |
|---|---|---|---|---|---|---|
| 1 LR Sprint | 1–13 | 1–3 | 07·2026→09·2026 | LR 8.5 | **0**/70/70/75/25 | Grind L&R technique + dictation; build S from 0; NO WRITING |
| 2 Khóa 9.0 · S lên 7 | 14–26 | 4–6 | 10·2026→12·2026 | LR 9 · S 7 | **0**/75/70/70/25 | Full-test timed → 39–40/40; italki 2×/wk → S 7.0 gate w26; NO WRITING |
| 3 Writing Sprint | 27–39 | 7–9 | 01·2027→03·2027 | W 6.5 · S 7.5 | 100/60/30/30/20 | Writing from 0 (NB course, marking from w30, weekly from w34); S → 7.5; L/R maintenance |
| 4 Exam Readiness | 40–52 | 10–12 | 04·2027→06·2027 | 8.5 | 95/60/35/35/15 | W → 7.0 confirmed (gate w47); S → 8.0; weekly full 4-skill mocks; peak+deload |

Daily minutes are the **nominal full-stack** allocation; real weekdays run 4 blocks so
the day lands near 195–235′. Keep each skill near its weekly share.

---

## Material Inventory — see `material-inventory.md` (the ONLY citable sources)

The full closed corpus (real downloaded archive in `laged-app`, with disk paths, structure, counts,
verdicts, gaps) lives in **`material-inventory.md`**. Cite ONLY items from there. Condensed map:

- **`NgọcBách`** (backbone) — `Reading Online` 8 q-type folders (`2.GAP FILL`…`8.SHORT ANSWER`, `9.TONG KET`, `10.ÁP DỤNG GIẢI FULL ĐỀ THI THẬT`) · `Writing Online` Task 1 (LINE/BAR/PIE/TABLE/PROCESS/MAP) + Task 2 (DISCUSS OPINION/DISCUSS/CAUSES SOLUTIONS/2 PART QUESTION) + `BONUS _3` + `COURSE CURRICULUM` (COLLOCATIONS 1–6, 15 Speaking Part 2 scripts) · `Vocabulary online` 19 topics · `Giải CAM 7-14/PARAPHRASE` phrasal-verb→Speaking notes.
- **`ChépChínhTả`** — dictation `INTERMEDIATE` (24) + `ADVANCED` (24) — the L-precision core.
- **`NguyễnHuyền`** — `BBC` 8 episodes #25–32 (audio+transcript, self-gradable) + 72-track dictation audio (`Track N.mp3`).
- **`NghĩaPhan`** 34 full L tests (audio) · **`RoadToIELTS`** 9 full L audios · **`TúPhạm`** 1 vocab set (Inventions) · `ThanhLoan` (beginner — skip).
- **Feedback services** (not "material"): `italki` Speaking tutor — **diagnostic w4, 1×/wk w5–13, 2×/wk w14–52**; `Writing marking (writing9/tutor)` — **first submission w30, weekly from w34**; `ELSA` pronunciation daily from w1.
- **Cite format in tasks:** `NgọcBách · Writing Online/IELTS Writing Task 2/DISCUSS OPINION` · `ChépChínhTả · ADVANCED · Lesson 7` · `NguyễnHuyền · BBC ep26` · `NguyễnHuyền · 72-track Track 12` · `NghĩaPhan · Test 14` · `RoadToIELTS · Part 3`.
- **`[opt]` gap-fillers ONLY** (band-8 Writing models, grammar, pronunciation course): never required daily; flag inline as "nếu muốn đẩy nhanh".

---

## Per-skill progression (drives each week's tasks — all cited from the archive)

**READING 8.0→9.0 (w1–26 the grind · w27–52 maintenance 30–35′):**
- P1 (70′/d): w1–7 master the 8 NB q-type modules IN ORDER (video + slide + practice PDF, 2–3 passages/day, Error Log per q-type); w8–13 `NgọcBách · Reading Online/10` full-test explained sets (Cam 12 → Cam 13 → Cam 5/7 → Cam 11 → BC 4-test) — untimed→timed transition.
- P2 (70′/d): full tests TIMED (60′, 39–40/40 target) rotating Cam 12/13/11/5/7 re-timed + BC 9-test bank; careless-error autopsy; w26 GATE 39–40/40 twice in a row.
- P3 (30′/d): maintenance — 2–3 timed passages/wk (NP cross-skill + BC re-timed) + Error Log review; hold 9.0.
- P4 (35′/d): weekly full timed R mocks inside Sat full mock + fresh-eyes NP re-timed; zero carelessness.

**LISTENING 7.5→9.0 (w1–26 dictation-driven · w27–52 maintenance 30–35′):**
- P1 (75′/d): `ChépChínhTả · INTERMEDIATE` 24 lessons w1–6 (~4/wk, spelling/number precision) → `ADVANCED` from w7 (natural-pace, A1–16 by w13); `NguyễnHuyền · BBC` ep25–31 paired episodes + `72-track` extra dictation; NP L test each Sat (NP1–13).
- P2 (70′/d): CCT-A 17–24 finish + round 2 of the hardest; NP14–26 full timed; accent range via BBC re-shadow; w26 GATE 39–40/40.
- P3 (30′/d): NP27–34 + RtI1–5 sections + CCT-A spot dictation; hold the ear.
- P4 (35′/d): weekly full L mocks (NP fresh re-timed, RtI6–9, BC bank); spelling/số zero-tolerance.

**SPEAKING 0→7.0 (w1–26) →8.0 (w27–52)** — the ONLY skill trained all 12 months:
- P1 (70′/d): pronunciation floor (ELSA daily 10–15′ + shadow BBC); NB 15 Part 2 scripts (#1–7 w1–7, #8–15 w8–13); `Vocabulary online` topic lexis into Part 1/3 answers; `PARAPHRASE` phrasal-verb notes; record + self-review vs script daily. **italki: diagnostic w4, then 1 session/wk from w5.** w13 iTk mock scored (expect ~5.5–6.0).
- P2 (75′/d): **italki 2×/wk**; topic bank for all 19 NB-V topics; less-common lexis + connected speech; mid-phase scored mock w20; **w26 GATE: iTk full mock scored 7.0.**
- P3 (60′/d): push 7.0→7.5 — lexical range, pronunciation features (intonation, weak forms), P3 abstract depth; iTk 2×/wk keeps; w39 gate 7.5.
- P4 (60′/d): push 7.5→8.0 — iTk full mocks under exam pressure, fluency never drops; w47 GATE 8.0; then hold + taper.

**WRITING 0→7.0 — STARTS AT w27, not before (100′/d P3 · 95′/d P4):**
- P3: w27 method + diagnostic (COURSE CURRICULUM, band descriptors, untimed T1+T2 baseline) + LINE GRAPH; w28 BAR + PIE; w29 TABLE + PROCESS; w30 MAP + 6-type review → **first marking submission (Task 1)**; w31 T2 DISCUSS OPINION; w32 DISCUSS; w33 CAUSES SOLUTIONS; w34 2-PART → **weekly marking starts**; w35–37 BONUS ×4 + weekly FB rewrite; w38 error-kill top-3; w39 timed T1+T2 → FB, gate ~6.5. Each lesson = watch `.TS` video → study slide + `HUONG-DAN-ON-TAP` + vocab mp3 → self-write full → self-review vs model.
- P4: weekly timed T2 (+T1 rotation) → FB → rewrite; GRA "frequent error-free"; gate w47 = two consecutive 7.0 marks; w48 peak, w49–52 taper/hold. `[opt]` band-8 models only as accelerator.

**VOCAB (25′ P1–2 · 20′ P3 · 15′ P4):** NB-V topics 1–13 (w1–13), 14–19 (w14–19), review rounds + COLLOCATIONS 1–6 (w20–26); P3–4 rotate reviews to feed Writing Task 2 + Speaking; TúPhạm Inventions opportunistically (w46). 15 production cards/day.

## Weekly cadence
- **Saturday (T7)** = mock/review day, `special:true`.
  - P1: timed NP L test (NP = week number) + NB-R timed set + review; w4 also the italki diagnostic debrief; **w13 = phase gate: NP13 L full + NB-R10 R full + iTk-scored S mock (NO Writing).**
  - P2: NP L full + Cam/BC R full timed + review; scored iTk S mock ~every 3–4 wks (w20, w26); **w26 = half-year GATE: L/R 39–40/40 + S 7.0.**
  - P3: L+R maintenance mock + Writing self-review; from w33 add timed W essay; **w39 = FIRST FULL 4-SKILL MOCK (L→R→W→S).**
  - P4: full 4-skill timed mock weekly (NP re-timed / RtI / BC bank); w48 peak; w51 dress rehearsal; w52 rest → TEST.
- **italki**: diagnostic w4 · 1×/wk w5–13 (one weekday `special:true`) · 2×/wk w14–52 (two weekdays `special:true`).
- **Writing marking**: first submission w30 (Task 1) · second w34 (first Task 2) · **weekly from w34 on** — submission day + return/rewrite day visible in the week.
- **Sunday (CN)** = rest/deload, no blocks.

## Style / quality bar
- Instructional voice in **Vietnamese**, matching the app's existing tone (imperative, concrete, e.g. “Làm timed 17 phút…”, “Ghi 5 lỗi vào Error Log”).
- Tasks must be **doable today** with the cited inventory item — no vague “research X”.
- **Vary** titles/prompts across weeks; no copy-paste days. Progression must be visible week to week.
- No memorised-template advice (penalised). Reference the **Error Log** and band descriptors often.
- Phase 1–2 tone: make the "no Writing" strategy explicit occasionally (e.g. tuần 1 body) so the learner trusts the plan.

---

## Calendar (plan starts Mon 2026-07-06 → test ~2027-06-28)
`wN: month_year | Mon Tue Wed Thu Fri Sat Sun` (day-of-month)

```
w1:  07·2026 | 6 7 8 9 10 11 12       w27: 01·2027 | 4 5 6 7 8 9 10
w2:  07·2026 | 13 14 15 16 17 18 19    w28: 01·2027 | 11 12 13 14 15 16 17
w3:  07·2026 | 20 21 22 23 24 25 26    w29: 01·2027 | 18 19 20 21 22 23 24
w4:  07·2026 | 27 28 29 30 31 1 2      w30: 01·2027 | 25 26 27 28 29 30 31
w5:  08·2026 | 3 4 5 6 7 8 9           w31: 02·2027 | 1 2 3 4 5 6 7
w6:  08·2026 | 10 11 12 13 14 15 16    w32: 02·2027 | 8 9 10 11 12 13 14
w7:  08·2026 | 17 18 19 20 21 22 23    w33: 02·2027 | 15 16 17 18 19 20 21
w8:  08·2026 | 24 25 26 27 28 29 30    w34: 02·2027 | 22 23 24 25 26 27 28
w9:  08·2026 | 31 1 2 3 4 5 6          w35: 03·2027 | 1 2 3 4 5 6 7
w10: 09·2026 | 7 8 9 10 11 12 13       w36: 03·2027 | 8 9 10 11 12 13 14
w11: 09·2026 | 14 15 16 17 18 19 20    w37: 03·2027 | 15 16 17 18 19 20 21
w12: 09·2026 | 21 22 23 24 25 26 27    w38: 03·2027 | 22 23 24 25 26 27 28
w13: 09·2026 | 28 29 30 1 2 3 4        w39: 03·2027 | 29 30 31 1 2 3 4
w14: 10·2026 | 5 6 7 8 9 10 11         w40: 04·2027 | 5 6 7 8 9 10 11
w15: 10·2026 | 12 13 14 15 16 17 18    w41: 04·2027 | 12 13 14 15 16 17 18
w16: 10·2026 | 19 20 21 22 23 24 25    w42: 04·2027 | 19 20 21 22 23 24 25
w17: 10·2026 | 26 27 28 29 30 31 1     w43: 04·2027 | 26 27 28 29 30 1 2
w18: 11·2026 | 2 3 4 5 6 7 8           w44: 05·2027 | 3 4 5 6 7 8 9
w19: 11·2026 | 9 10 11 12 13 14 15     w45: 05·2027 | 10 11 12 13 14 15 16
w20: 11·2026 | 16 17 18 19 20 21 22    w46: 05·2027 | 17 18 19 20 21 22 23
w21: 11·2026 | 23 24 25 26 27 28 29    w47: 05·2027 | 24 25 26 27 28 29 30
w22: 11·2026 | 30 1 2 3 4 5 6          w48: 05·2027 | 31 1 2 3 4 5 6
w23: 12·2026 | 7 8 9 10 11 12 13       w49: 06·2027 | 7 8 9 10 11 12 13
w24: 12·2026 | 14 15 16 17 18 19 20    w50: 06·2027 | 14 15 16 17 18 19 20
w25: 12·2026 | 21 22 23 24 25 26 27    w51: 06·2027 | 21 22 23 24 25 26 27
w26: 12·2026 | 28 29 30 31 1 2 3       w52: 06·2027 | 28 29 30 1 2 3 4
```

Month→Phase: w1–13 P1 · w14–26 P2 · w27–39 P3 · w40–52 P4.
