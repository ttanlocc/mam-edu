---
id: ielts-70-80
code: IELTS
from: "6.5"
to: "8.0"
name: "IELTS · Lộ trình 8.0"
months: 12
days: 365
blocks_per_day: 5
per_day: "4h"
tree: sprouting

student_defaults:
  current_overall: 6
  target_overall: 8
  days_to_test: 365
  current_month: 1

# Phân bổ thời gian mỗi ngày theo phase (phút). Tổng = 240 phút = 4h.
schedule:
  - { phase: 1, writing: 90, speaking: 50, reading: 40, listening: 30, vocab: 30 }
  - { phase: 2, writing: 90, speaking: 60, reading: 40, listening: 30, vocab: 20 }
  - { phase: 3, writing: 80, speaking: 60, reading: 45, listening: 35, vocab: 20 }
  - { phase: 4, writing: 70, speaking: 60, reading: 45, listening: 40, vocab: 25 }

phases:
  - n: 1
    name: Foundations
    range: "T1–3"
    span: "06·2026 → 08·2026"
    target: "7.0"
    months: "1–3"
    current: true
    current_ach: "Xây nền ngữ pháp & cấu trúc"
    achievements:
      - "Hancock pronunciation (IPA + stress)"
      - "Murphy Grammar Intermediate done"
      - "Essay paragraph structure"
      - "Cambridge 17–18 (R + L done)"
      - "Anki habit · 15 từ/ngày"

  - n: 2
    name: "Skill Building"
    range: "T4–6"
    span: "09·2026 → 11·2026"
    target: "7.5"
    months: "4–6"
    achievements:
      - "Examiner feedback mỗi tuần"
      - "iTalki 2 sessions/tuần"
      - "Essay cohesion · linker variety"
      - "Topic bank 12 chủ đề"
      - "R/L consistent 8.5+"

  - n: 3
    name: Refinement
    range: "T7–9"
    span: "12·2026 → 02·2027"
    target: "7.875"
    months: "7–9"
    achievements:
      - "Diệt recurring errors (GR + LR)"
      - "Writing Band 7.0 confirmed"
      - "Speaking Band 7.5 confirmed"
      - "R/L mock 37+/40 consistently"
      - "Go/No-go exam decision"

  - n: 4
    name: "Exam Readiness"
    range: "T10–12"
    span: "03·2027 → 05·2027"
    target: "8.0"
    months: "10–12"
    achievements:
      - "Full mock 1x/tuần (timed)"
      - "Error zero-tolerance"
      - "Peak condition · deload"
      - "Test date confirmed"

bands:
  - { k: R, name: Reading,   cur: 7.5, tgt: 9.0, color: coral,  status: "Giữ momentum + 1.5 jump" }
  - { k: L, name: Listening, cur: 7.0, tgt: 9.0, color: sage,   status: "Dictation 3x/tuần" }
  - { k: W, name: Writing,   cur: 0,   tgt: 7.0, color: butter, status: "Xây từ đầu · ràng buộc chính" }
  - { k: S, name: Speaking,  cur: 0,   tgt: 7.5, color: sky,    status: "Xây từ đầu · mục tiêu bảo hiểm" }

pitfalls:
  - { code: P1, name: "Passive-active gap",      note: "biết từ từ Reading nhưng dùng sai collocation khi viết", seen: 0, hot: true }
  - { code: P2, name: "Memorised templates",     note: "In contemporary society... penalised từ 2024", seen: 0, hot: true }
  - { code: P3, name: "Complexity vs accuracy",  note: "câu phức nhiều lỗi — accuracy > complexity ở giai đoạn đầu", seen: 0, hot: false }
  - { code: P4, name: "No Task 2 outline",       note: "viết không có outline = lạc đề, mất C&C", seen: 0, hot: true }
  - { code: P5, name: "Speaking over-monitor",   note: "check grammar khi nói = kills fluency; minor errors OK", seen: 0, hot: false }

materials:
  required:
    - { title: "Cambridge IELTS 14–20 (7 cuốn)", use: "Tất cả kỹ năng", priority: 3 }
    - { title: "Cambridge Vocabulary for IELTS Advanced — Pauline Cullen", use: "Vocabulary", priority: 3 }
    - { title: "English Pronunciation in Use Intermediate — Mark Hancock", use: "Speaking · Pronunciation", priority: 3 }
    - { title: "Cambridge Grammar for IELTS — Hopkins & Cullen", use: "Writing · Grammar", priority: 3 }
    - { title: "Advanced Grammar in Use — Hewings", use: "Writing · Grammar (Phase 2+)", priority: 2 }
    - { title: "Collins Speaking for IELTS — Karen Kovacs", use: "Speaking (Phase 1+)", priority: 2 }
    - { title: "IELTS Trainer 2 Academic — Cambridge", use: "Mock tests (Phase 4)", priority: 2 }
  free:
    - { name: "ielts-simon.com", note: "800+ Writing model answers, ex-examiner annotation" }
    - { name: "ieltsliz.com", note: "Band descriptor giải thích từng criterion" }
    - { name: "ieltsadvantage.com", note: "TFNG strategy, Task 2 structure" }
    - { name: "dcielts.com", note: "Paragraph-by-paragraph Writing method" }
    - { name: "British Council Band Descriptors PDF", note: "takeielts.britishcouncil.org" }
  apps:
    - { name: "Anki", cost: "Miễn phí", use: "Flashcard vocabulary · 15 từ/ngày" }
    - { name: "ELSA Speak", cost: "~$60/năm", use: "Pronunciation AI drilling" }
    - { name: "italki.com", cost: "Theo buổi", use: "Gia sư Speaking (Phase 2+)" }
    - { name: "British Council IELTS Prep App", cost: "Miễn phí", use: "Listening practice" }

youtube:
  - { channel: "IELTS Simon", best_for: "Writing Task 2 structure, band 7 essays" }
  - { channel: "IELTS Liz", best_for: "Band descriptor explanation, all skills" }
  - { channel: "E2 IELTS (Jay + Mark)", best_for: "Speaking mock interviews, Writing marking" }
  - { channel: "Keith's English", best_for: "Speaking fluency and pronunciation" }
  - { channel: "IELTS Advantage", best_for: "Reading strategies, Writing Task 2" }
  - { channel: "BBC Learning English", best_for: "Pronunciation, natural speech patterns" }
  - { channel: "TED Talks", best_for: "Shadowing material (pronunciation Phase 1+)" }

cambridge_schedule:
  - { month: 1,  books: "Cambridge 17 Test 1–2 (diagnostic + foundation)" }
  - { month: 2,  books: "Cambridge 17 Test 3–4, Cambridge 18 Test 1–2" }
  - { month: 3,  books: "Cambridge 18 Test 3–4, Cambridge 19 Test 1" }
  - { month: 4,  books: "Cambridge 14 (older = extra practice)" }
  - { month: 5,  books: "Cambridge 15" }
  - { month: 6,  books: "Cambridge 16, Cambridge 17 (review)" }
  - { month: 7,  books: "Cambridge 18 (timed review)" }
  - { month: 8,  books: "Cambridge 19" }
  - { month: 9,  books: "Cambridge 20 Test 1" }
  - { month: 10, books: "Cambridge 18 T3, 19 T3, 20 T2–3" }
  - { month: 11, books: "Cambridge 20 Test 4" }
  - { month: 12, books: "Cambridge 19 Test 4 (reserve), IELTS Trainer 2" }
---

Lộ trình 12 tháng — từ R/L nền cao, xây W/S từ đầu đến Band 8.0. Trọng tâm: feedback examiner hàng tuần (Phase 2+) và mock timed đều đặn (Phase 3+).
