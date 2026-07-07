# IELTS 8.5 — Week Authoring Spec

**Purpose.** Contract for authoring the daily-plan week files of course `ielts-85`
(`content/courses/ielts-85/weeks/wN.md`, N = 1..52). Every subagent authoring a week
MUST obey this spec so the 52 files are consistent, render correctly, and stay inside the
app's own material set.

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
- `headline`: short lowercase Vietnamese/English phrase, e.g. `"diagnostic"`, `"task 2 foundations"`, `"feedback loop"`. Rendered as “Engage **{headline}**”.
- `milestones`: list of **exactly 7** entries, one per day Mon→Sun:
  - `{ d, date, label }` where `d` ∈ `T2,T3,T4,T5,T6,T7,CN` (T2=Mon … T7=Sat, CN=Sun).
  - `date`: day-of-month string from Calendar table for that day.
  - `label`: short description of that day's focus.
  - `T7` (Saturday) carries `special: true` (mock/review day).
  - `CN` (Sunday) carries `rest: true` and has **no** matching `days` entry.
  - In **week 1 only**, `T2` carries `today: true`. No other week sets `today`.
  - A day with a tutor/examiner event may also set `special: true` (e.g. iTalki day in Phase 2+).
- `days`: list of **exactly 6** entries (Mon→Sat), `{ dow, blocks }` where `dow` ∈ `T2..T7` and matches the milestone `d`. **No CN entry.**

Block-level keys (each item in `blocks`):
- `id`: `"B1"`, `"B2"`, … — unique **within the day**, sequential.
- `kind`: one of `WRITING | SPEAKING | READING | LISTENING | ANKI`.
- `kind_color`: fixed by kind → `WRITING:butter`, `SPEAKING:sky`, `READING:coral`, `LISTENING:sage`, `ANKI:mute`.
- `time`: `"HH:MM–HH:MM"` (en-dash `–`). Use the daily time grid below.
- `duration`: int minutes. **Must equal Σ of the block's `tasks[].m`.**
- `title`: concise task title (≤ ~60 chars).
- `prompt`: 2–3 sentences, concrete and actionable, citing inventory material(s).
- `tasks`: list of `{ t, m }` — `t` = step text (imperative, specific), `m` = int minutes. **Σ m == duration.**
- `reward_seeds`: int — WRITING 25–35, SPEAKING 15–22, READING 15–20, LISTENING 15–20, ANKI 10–15.
- `href`: `"#/writing"` for WRITING blocks, else `"#/today"`.

### Structural invariants (validation checks all of these)
1. Frontmatter parses as YAML; top-level `n`, `phase`, `milestones`, `days` present.
2. `milestones` has 7 entries with the exact `d` sequence `T2,T3,T4,T5,T6,T7,CN`; CN `rest:true`; T7 `special:true`.
3. `days` has 6 entries `T2..T7`; each `dow` matches a milestone `d`.
4. Each day has **4–6 blocks**; **at most ONE block per `kind`** (the week grid shows one cell per skill/day).
5. Every block: `id` unique in day, valid `kind`, correct `kind_color`, `duration` int, `tasks` non-empty, **Σ tasks.m == duration**, `reward_seeds` int, `href` correct.
6. Weekday total (T2–T6) ≈ 195–225 min; Saturday T7 (mock/review) 5–6 blocks ≈ 240–300 min; Sunday rest.
7. **Every material citation ∈ Material Inventory** (Rule #1) — a downloaded item (`NgọcBách`/`ChépChínhTả`/`NguyễnHuyền`/`NghĩaPhan`/`RoadToIELTS`/`TúPhạm`) or a feedback service. NO Cambridge-book/Simon/Cullen/Hancock/Collins.
8. The materials used match the week's row in `curriculum-map.md` and the phase (e.g. NghĩaPhan/RoadToIELTS mocks only from Phase 2+; feedback loop only Phase 2+).

### Worked example (a valid day — mirror this exact YAML shape)
```yaml
---
n: 1
phase: 1
day_of_week: "Thứ Hai"
date_n: "6"
month_year: "07 · 2026"
headline: "diagnostic"
milestones:
  - { d: T2, date: "6", label: "Diagnostic · W+S+R+L", today: true }
  - { d: T3, date: "7", label: "Model Ngọc Bách · đối chiếu" }
  - { d: T4, date: "8", label: "Viết lại Task 2 · GAP FILL" }
  - { d: T5, date: "9", label: "Task 1 review · vocab" }
  - { d: T6, date: "10", label: "Task 2 mới · shadow BBC" }
  - { d: T7, date: "11", label: "Mock · NghĩaPhan T1", special: true }
  - { d: CN, date: "12", label: "NGHỈ · deload", rest: true }
days:
  - dow: T2
    blocks:
      - { id: B1, kind: WRITING, kind_color: butter, time: "07:00–08:25", duration: 85,
          title: "Diagnostic · Task 1 + Task 2 (chưa tính giờ)",
          prompt: "Làm 1 Task 1 + 1 Task 2 chưa giới hạn giờ để lấy baseline. Đọc file hướng dẫn phương pháp học của Ngọc Bách. Ghi 5 điểm yếu nhất vào Writing Error Log.",
          tasks: [
            { t: "Task 1 diagnostic · untimed", m: 20 },
            { t: "Task 2 diagnostic · untimed", m: 40 },
            { t: "Đọc NgọcBách · Writing Online/COURSE CURRICULUM phương pháp học", m: 15 },
            { t: "Ghi 5 lỗi lớn nhất vào Writing Error Log", m: 10 }
          ],
          reward_seeds: 30, href: "#/writing" }
      - { id: B4, kind: LISTENING, kind_color: sage, time: "19:00–19:40", duration: 40,
          title: "Chép Chính Tả · INTERMEDIATE Lesson 1",
          prompt: "Nghe chép chính tả từng từ Lesson 1 (Intermediate). Tự dò lại bằng cách tìm nguồn. Đánh dấu lỗi chính tả/số.",
          tasks: [
            { t: "Chép chính tả ChépChínhTả · INTERMEDIATE · Lesson 1", m: 25 },
            { t: "Tự dò + đánh dấu lỗi spelling/số", m: 15 }
          ],
          reward_seeds: 15, href: "#/today" }
  # ... T3..T7 similar; CN has no days entry (rest)
---

Tuần 1 — chẩn đoán baseline + làm quen khóa Ngọc Bách. Chưa lo điểm, chỉ cần thấy điểm yếu rõ.
```
Note in the example: `tasks[].m` sums to `duration` (20+40+15+10=85; 25+15=40); `kind_color` matches `kind`; every material is a downloaded item.

## Daily time grid (default slots — adjust durations, keep order)
- Morning: `07:00–08:xx` → **WRITING** (longest block).
- Late morning: `09:00–09:xx` → **SPEAKING**.
- Afternoon: `14:00–14:xx` → **READING**.
- Evening: `19:00–19:xx` → **LISTENING** or **ANKI**.
- Saturday (mock day) uses a compressed morning exam block + afternoon review (see Phase notes).
- Not every day runs all 5 kinds — weekdays run 4 blocks; alternate ANKI vs LISTENING in the evening so each appears ~3×/week. Saturday adds review blocks.

---

## Phase table

| Phase | Weeks | Months | Span | Target | Daily minutes (W/S/R/L/V) | Theme |
|---|---|---|---|---|---|---|
| 1 Foundations | 1–13 | 1–3 | 07·2026→09·2026 | 7.5 | 85/60/30/40/25 | Build W & S from 0; set LR precision discipline |
| 2 Skill Building | 14–26 | 4–6 | 10·2026→12·2026 | 8.0 | 90/60/30/35/25 | Weekly examiner feedback; iTalki 2×/wk; L→8.5+ |
| 3 Refinement | 27–39 | 7–9 | 01·2027→03·2027 | 8.25 | 90/55/35/35/25 | Kill recurring W errors; confirm W7.5/S7.5; LR 39+/40 |
| 4 Exam Readiness | 40–52 | 10–12 | 04·2027→06·2027 | 8.5 | 80/55/40/40/25 | Full timed mocks weekly; hold everything; peak+deload |

Daily minutes are the **nominal full-stack** allocation; real weekdays run ~4 blocks so
the day lands a bit under the sum. Keep each skill near its weekly share
(≈ phase-minutes × 5–6 across the week).

---

## Material Inventory — see `material-inventory.md` (the ONLY citable sources)

The full closed corpus (real downloaded archive in `laged-app`, with disk paths, structure, counts,
verdicts, gaps) lives in **`material-inventory.md`**. Cite ONLY items from there. Condensed map:

- **`NgọcBách`** (backbone) — `Reading Online` 8 q-type folders (`2.GAP FILL`…`8.SHORT ANSWER`, `9.TONG KET`, `10.ÁP DỤNG GIẢI FULL ĐỀ THI THẬT`) · `Writing Online` Task 1 (LINE/BAR/PIE/TABLE/PROCESS/MAP) + Task 2 (DISCUSS OPINION/DISCUSS/CAUSES SOLUTIONS/2 PART QUESTION) + `BONUS _3` + `COURSE CURRICULUM` (COLLOCATIONS 1–6, 15 Speaking Part 2 scripts) · `Vocabulary online` 19 topics · `Giải CAM 7-14/PARAPHRASE` phrasal-verb→Speaking notes.
- **`ChépChínhTả`** — dictation `INTERMEDIATE` (24) + `ADVANCED` (24) — the L-precision core.
- **`NguyễnHuyền`** — `BBC` 8 episodes (audio+transcript, self-gradable) + 72-track dictation audio.
- **`NghĩaPhan`** 34 full L tests (audio) · **`RoadToIELTS`** 9 full L audios · **`TúPhạm`** 1 vocab set (Inventions) · `ThanhLoan` (beginner — skip).
- **Feedback services** (the 7.0→7.5 mechanism, not "material"): `Writing marking (writing9/tutor)` weekly Phase 2+; `italki` Speaking tutor 2×/wk Phase 2+; `ELSA` pronunciation.
- **Cite format in tasks:** `NgọcBách · Writing Online/IELTS Writing Task 2/DISCUSS OPINION` · `ChépChínhTả · ADVANCED · Lesson 7` · `NguyễnHuyền · BBC ep26` · `NghĩaPhan · Test 14`.
- **`[opt]` gap-fillers ONLY** (band-8 Writing models, grammar, pronunciation course): never required daily; flag inline as "nếu muốn đẩy nhanh".

---

## Per-skill progression (drives each week's tasks — all cited from the archive)

**WRITING 0→7.5** (heaviest block; build on NgọcBách, then marking loop):
- P1: work `NgọcBách · Writing Online` in order — Task 1 (LINE→BAR→PIE→TABLE→PROCESS→MAP) then Task 2 (DISCUSS OPINION→DISCUSS→CAUSES SOLUTIONS→2 PART) then `BONUS _3`. Each lesson = watch `.TS` video → study slide + `HUONG-DAN-ON-TAP` PDF + vocab mp3 → self-write full response → self-review vs the model (method per `COURSE CURRICULUM`).
- P2: **weekly `Writing marking`** on a timed Task 2, rewrite from the marks; fold `NgọcBách · COLLOCATIONS 1–6` + Vocabulary-online lexis into essays. `[opt]` compare one band-8 model.
- P3: eliminate recurring Error-Log errors → "majority error-free" (GRA 7.5); marking confirms 7.5 on all 4 criteria. `[opt]` grammar top-up if a structure keeps failing.
- P4: full timed essays exam-conditions; hold 7.5.

**SPEAKING 0→7.5** (NgọcBách scripts + vocab + tutor loop):
- P1: study `NgọcBách` 15 Part 2 scripts (one/week as model) + `Vocabulary online` topic lexis for Part 1/3 answers + `PARAPHRASE` phrasal-verb notes; record own answers, self-review; shadow `NguyễnHuyền · BBC` for connected speech.
- P2: **`italki` 2×/wk** tutor feedback (Part 1/2/3) + `ELSA` pronunciation → target 7.0.
- P3: lexical range + pronunciation features; iTk mock scored; confirm 7.5.
- P4: iTk exam mocks; hold fluency under pressure.

**READING hold 9.0** (NgọcBách technique + test banks):
- P1: work `NgọcBách · Reading Online` 8 q-type modules (2–9) in order — each = video + slide + practice PDF (real Cambridge passages, bilingual paraphrase); build Error Log.
- P2: `NgọcBách · Reading Online/10` full-test explanations (Cambridge 5/7/11/12/13 + BC 9-test bank) timed → 39–40/40.
- P3: full timed tests from the BC bank + cross-skill reading; careless-error elimination.
- P4: full timed mocks; hold 9.0.

**LISTENING 7.0→9.0** (dictation-driven — the archive's strength):
- P1: `ChépChínhTả · INTERMEDIATE` (spelling/number precision) → `ADVANCED` (academic natural-pace); dictate word-for-word, self-check by locating the source; `NguyễnHuyền · BBC` paired episodes (audio+transcript).
- P2: `ChépChínhTả · ADVANCED` deepen + `NghĩaPhan` full tests as timed mileage → reliable 8.5+.
- P3: `NghĩaPhan` / `RoadToIELTS` full timed; distractor + spelling audit → 39+/40.
- P4: full mocks; hold 9.0.

**VOCAB:** one `NgọcBách · Vocabulary online` topic/week (19 topics, then review) + `COLLOCATIONS 1–6`; `TúPhạm` Inventions set opportunistically. 15 collocations/day into Anki (production cards).

## Weekly cadence
- **Saturday (T7)** = mock/review day, `special:true`. P1–2: timed L + R (per schedule book) + review + one model-study block. P3–4: fuller timed mock + scoring + error analysis.
- **Phase 2+**: one weekday (mark `special:true`) = `italki` Speaking session; `Writing feedback` returned + reviewed once per week.
- **Sunday (CN)** = rest/deload, no blocks.

## Style / quality bar
- Instructional voice in **Vietnamese**, matching the app's existing tone (imperative, concrete, e.g. “Làm timed 17 phút…”, “Ghi 5 lỗi vào Error Log”).
- Tasks must be **doable today** with the cited inventory item — no vague “research X”.
- **Vary** titles/prompts across weeks; no copy-paste days. Progression must be visible week to week.
- No memorised-template advice (penalised). Reference the **Error Log** and band descriptors often.

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
