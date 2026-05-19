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
