---
id: ielts-85
code: IELTS
from: "7.0"
to: "8.5"
name: "IELTS · Lộ trình 8.5"
months: 12
days: 365
blocks_per_day: 5
per_day: "4h"
tree: sprouting
recommended: true

student_defaults:
  current_overall: 7
  target_overall: 8.5
  days_to_test: 365
  current_month: 1

# Hồ sơ người học — baseline THẬT, lưu kèm khóa học (cập nhật 2026-07-07).
# Nguồn sự thật cho target + điểm xuất phát. Roadmap.jsx chưa render block này (mới chỉ lưu).
student_profile:
  tested_before: false          # chưa từng thi IELTS
  hours_per_day: 4
  target: { overall: 8.5, listening: 9.0, reading: 9.0, writing: 7.5, speaking: 7.5 }
  baseline:
    reading:   { range: "7.5–9.0", note: "Cambridge test — đã mạnh; chỉ cần khóa cứng 9.0" }
    listening: { range: "7.0–9.0", note: "dao động, sàn 7.0 — dictation kéo lên 9.0 ổn định" }
    writing:   { range: "0",       note: "chưa từng học/viết — xây từ 0" }
    speaking:  { range: "0",       note: "chưa từng học/nói — xây từ 0" }
  note: "Nền tiếp nhận (R/L) rất mạnh nhưng chưa từng sản sinh (W/S). Điểm nghẽn là chất lượng + độ đều của feedback W/S, không phải tổng số giờ. Σ4 kỹ năng phải ≥ 33 để ra 8.5; L9·R9·W7.5·S7.5 = đúng 33 (zero-slack)."
  strategy: "Nhắm S8.0 làm bảo hiểm cho overall 8.5 (nếu W kẹt 7.0 thì L9·R9·W7.0·S8.0 = 33 → vẫn 8.5). Chấm bài + italki chẩn đoán ngay Phase 1 (w4/w8/w13), không đợi Phase 2. Full mock 4 kỹ năng lần đầu ở w13."

# Phân bổ phút/ngày theo phase. Tổng = 240 phút = 4h.
# W/S (xây từ 0 → 7.5) chiếm phần lớn thời gian; LR là "bảo trì độ chính xác" để khóa cứng 9.0.
schedule:
  - { phase: 1, writing: 85, speaking: 60, reading: 30, listening: 40, vocab: 25 }
  - { phase: 2, writing: 90, speaking: 60, reading: 30, listening: 35, vocab: 25 }
  - { phase: 3, writing: 90, speaking: 55, reading: 35, listening: 35, vocab: 25 }
  - { phase: 4, writing: 80, speaking: 55, reading: 40, listening: 40, vocab: 25 }

phases:
  - n: 1
    name: Foundations
    range: "T1–3"
    span: "07·2026 → 09·2026"
    target: "7.5"
    months: "1–3"
    current: true
    current_ach: "Xây nền W/S từ 0 · dựng kỷ luật chính xác cho LR"
    achievements:
      - "Phát âm nền (IPA + trọng âm) qua ELSA + shadow NguyễnHuyền·BBC"
      - "Grammar nền: viết câu phức CHÍNH XÁC (phân tích model + tự sửa)"
      - "Task 1 overview + Task 2 4-đoạn: viết được bài hoàn chỉnh untimed"
      - "Speaking Part 1–3: nói 2 phút không khựng dài"
      - "Chấm bài chẩn đoán sớm w4·w8·w13 + 1 buổi italki chẩn đoán (KHÔNG đợi Phase 2)"
      - "w13: full mock 4 kỹ năng timed liền mạch · làm quen áp lực thi"
      - "LR: dựng Error Log + dictation 3x/tuần · giữ 8.0+"
      - "Anki 15 từ/ngày · collocation-first"

  - n: 2
    name: "Skill Building"
    range: "T4–6"
    span: "10·2026 → 12·2026"
    target: "8.0"
    months: "4–6"
    achievements:
      - "Examiner feedback Writing MỖI TUẦN (mắt xích cho 7.5)"
      - "iTalki 2 buổi/tuần · Speaking chạm 7.0"
      - "Task 2: cohesion linh hoạt + lexical range · body phát triển sâu"
      - "Topic bank 15 chủ đề (ý + collocation + ví dụ)"
      - "L kéo lên ổn định 8.5+ · quen đủ accent (UK/US/AUS/CAN)"
      - "R khóa 9.0 các dạng khó (TFNG, Matching, Y/N/NG)"

  - n: 3
    name: Refinement
    range: "T7–9"
    span: "01·2027 → 03·2027"
    target: "8.25"
    months: "7–9"
    achievements:
      - "Diệt recurring errors W: đạt 'majority error-free' (ngưỡng GRA 7.5)"
      - "Writing 7.5 xác nhận qua examiner · đủ cả 4 tiêu chí"
      - "Speaking chạm 7.5, nhắm 8.0 (bảo hiểm) · fluency + pronunciation ổn định"
      - "L/R mock 39+/40 đều đặn (khóa cứng 9.0)"
      - "Full mock timed 1x/tuần · quyết định Go/No-go"

  - n: 4
    name: "Exam Readiness"
    range: "T10–12"
    span: "04·2027 → 06·2027"
    target: "8.5"
    months: "10–12"
    achievements:
      - "W giữ 7.5 (sàn 7.0) · Speaking giữ 7.5–8.0 · không rớt fluency khi áp lực"
      - "L & R zero-tolerance lỗi cẩu thả (giữ 9.0)"
      - "Full mock 1x/tuần timed · peak rồi deload"
      - "Ngày thi xác nhận · chốt điều kiện đỉnh"

bands:
  - { k: R, name: Reading,   cur: 8.0, tgt: 9.0, color: coral,  status: "Ổn định 7.5–9.0 → khóa cứng 39–40/40" }
  - { k: L, name: Listening, cur: 7.5, tgt: 9.0, color: sage,   status: "Dao động 7.0–9.0 → dictation + đủ accent" }
  - { k: W, name: Writing,   cur: 0,   tgt: 7.5, color: butter, status: "Xây từ 0 · mục tiêu 7.5; sàn 7.0 chấp nhận NẾU S đạt 8.0" }
  - { k: S, name: Speaking,  cur: 0,   tgt: 7.5, color: sky,    status: "Xây từ 0 · mục tiêu 7.5 · LUYỆN nhắm 8.0 (bảo hiểm total 8.5)" }

pitfalls:
  - { code: P1, name: "Passive-active gap",      note: "biết từ khi đọc nhưng sai collocation lúc viết/nói — 7.5 LR cần DÙNG đúng, không chỉ nhận diện", seen: 0, hot: true }
  - { code: P2, name: "Memorised templates",     note: "'In contemporary society...' bị phạt từ 2024 — examiner trừ TR + CC", seen: 0, hot: true }
  - { code: P3, name: "Complexity vs accuracy",  note: "7.5 GRA cần 'majority error-free' — câu phức nhiều lỗi hại hơn câu đơn đúng", seen: 0, hot: true }
  - { code: P4, name: "No Task 2 outline",       note: "viết không outline = lạc đề, mất TR + CC", seen: 0, hot: true }
  - { code: P5, name: "Speaking over-monitor",   note: "vừa nói vừa soi grammar = mất fluency; lỗi nhỏ chấp nhận ở mức 7.5", seen: 0, hot: false }
  - { code: P6, name: "Listening spelling/số",   note: "sai chính tả hoặc format số/ngày = câu SAI dù nghe đúng → giết band 9.0", seen: 0, hot: true }
  - { code: P7, name: "Reading careless-timing", note: "2–3 câu cẩu thả cuối giờ = 8.5 thay vì 9.0 — zero slack không tha", seen: 0, hot: true }

materials:
  required:
    - { title: "Khóa IELTS Ngọc Bách — Package 2020 (đã tải)", use: "BACKBONE · Reading 8 dạng + Writing T1+T2+BONUS + Vocab 19 chủ đề + 15 Speaking script", priority: 3 }
    - { title: "Bộ Chép Chính Tả Bứt Phá Listening (đã tải)", use: "Listening · dictation 4 tier (Intermediate→Advanced) — khóa 9.0", priority: 3 }
    - { title: "Nguyễn Huyền FULL + BBC 6 Minute (đã tải)", use: "Listening · 72 track + 8 ep BBC có transcript (self-grade)", priority: 3 }
    - { title: "Sách IELTS Nghĩa Phan (đã tải)", use: "Listening · 34 full test audio — timed + dictation", priority: 2 }
    - { title: "Road to IELTS — British Council (đã tải)", use: "Listening · 9 full-test audio", priority: 2 }
    - { title: "Tú Phạm — Từ vựng IELTS 7.0+ (đã tải · 1/38 set)", use: "Vocabulary band 7+ · bổ sung mỏng", priority: 1 }
  apps:
    - { name: "Writing marking (writing9 / gia sư)", cost: "~$5–30/bài", use: "Chấm Task 2 hàng tuần — đẩy W 7.0→7.5 (đúng 'nộp bài sửa' của Ngọc Bách)" }
    - { name: "italki — gia sư Speaking", cost: "Theo buổi", use: "2 buổi/tuần từ Phase 2 · Part 1/3 + phát âm — đẩy S 7.0→7.5" }
    - { name: "Anki", cost: "Miễn phí", use: "Flashcard collocation từ Ngọc Bách Vocab · 15 từ/ngày" }
    - { name: "ELSA Speak", cost: "~$60/năm", use: "Pronunciation drill (thay khóa phát âm kho chưa có)" }
  free:
    - { name: "⚠ Band-8 Writing models [tùy chọn]", note: "GAP: kho top ~7.0 — nguồn ngoài nếu muốn đẩy nhanh Writing; feedback loop bù" }
    - { name: "⚠ Grammar nâng cao [tùy chọn]", note: "GAP: kho = 0 grammar — phân tích model + chấm bài bù" }
    - { name: "⚠ Speaking Part 1&3 / phát âm [tùy chọn]", note: "GAP: kho chỉ có 15 script Part 2 — italki/ELSA bù" }

youtube:
  - { channel: "BBC 6 Minute English (đã tải · có transcript)", best_for: "Listening Section 3–4 · self-grade" }
  - { channel: "Ngọc Bách — video bài giảng .TS (đã tải)", best_for: "Reading/Writing bài giảng theo từng dạng" }

cambridge_schedule:
  - { month: 1,  books: "Ngọc Bách Reading dạng 1–4 + Writing Task 1 + CCT Intermediate · diagnostic W/S" }
  - { month: 2,  books: "Ngọc Bách Reading dạng 5–8 + Writing Task 1 còn lại + CCT Advanced" }
  - { month: 3,  books: "Ngọc Bách Writing Task 2 + BONUS + Reading folder-10 (Cambridge giải) · self-assess" }
  - { month: 4,  books: "Feedback loop Writing bắt đầu · Nghĩa Phan 14–17 timed · CCT Advanced" }
  - { month: 5,  books: "Nghĩa Phan 18–22 + BC bank Reading · italki Speaking 2x/tuần" }
  - { month: 6,  books: "Nghĩa Phan 23–26 + Ngọc Bách Cambridge re-timed · xác nhận ~7.0" }
  - { month: 7,  books: "Nghĩa Phan 27–30 full timed · W/S confirm 7.5 qua FB/iTk" }
  - { month: 8,  books: "Nghĩa Phan 31–34 + Road to IELTS 1–2 · error zero" }
  - { month: 9,  books: "Road to IELTS 3–5 full mock · go/no-go" }
  - { month: 10, books: "Nghĩa Phan re-mock + Road to IELTS 7 · full timed all-skills" }
  - { month: 11, books: "BC bank A–C full mock + Nghĩa Phan 4–8 · peak" }
  - { month: 12, books: "Road to IELTS 8–9 dress rehearsal · deload · TEST ~28/06" }
---

Lộ trình 12 tháng lên **overall 8.5** (L 9.0 · R 9.0 · W 7.5 · S 7.5) — 4h/ngày. Ba điểm tựa:

1. **Writing & Speaking xây từ 0 phải chạm 7.5 ở *cả 4* tiêu chí** — ràng buộc khó nhất. Từ số 0 KHÔNG thể tự chấm mà lên nổi 7.5 — cần mắt chuyên gia SỚM: có **chấm bài chẩn đoán ngay Phase 1** (w4 sau Task 1, w8 sau Task 2 đầu, w13 chốt phase) + 1 buổi italki chẩn đoán, rồi Phase 2 mới **chấm Writing mỗi tuần + italki 2 buổi/tuần**. Đây là lý do Writing giữ 85–90 phút/ngày gần như suốt lộ trình.
2. **LR không có đệm (zero-slack)** — 8.5 cần Σ4 kỹ năng ≥ 33, mà L9+R9+W7.5+S7.5 = đúng 33, không dư. Rớt một mắt xích (L xuống 8.5, hoặc W xuống 7.0) là overall về 8.0. **Bảo hiểm:** nhắm **Speaking 8.0** — kỹ năng dễ kéo nhất với nền nghe mạnh + tutor; nếu Writing kẹt ở 7.0 thì L9·R9·W7.0·S8.0 = 33 → vẫn 8.5. Không hạ mục tiêu nào, chỉ dời nửa band "dư" sang Speaking. LR vẫn luyện chính xác mỗi ngày để khóa cứng 9.0 (39–40/40).
3. **Tái dùng 100% kho tài liệu đã tải** (Ngọc Bách backbone + Chép Chính Tả + Nghĩa Phan + Nguyễn Huyền/BBC + Road to IELTS) — không phải tìm tài liệu ngoài. Kho đủ đưa L→9.0, R→9.0 và xây W/S tới ~7.0; chặng 7.0→7.5 của W/S dùng **vòng chấm bài** (đúng phương pháp "nộp bài sửa" của Ngọc Bách). Grammar & model band-8 là gap của kho — chỉ bổ sung nếu muốn đẩy nhanh.
