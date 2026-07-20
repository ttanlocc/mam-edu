---
id: ielts-85
code: IELTS
from: "7.0"
to: "8.5"
name: "IELTS · Lộ trình 8.5"
months: 12
days: 365
blocks_per_day: 4
per_day: "4h"
tree: sprouting
recommended: true

student_defaults:
  current_overall: 7
  target_overall: 8.5
  days_to_test: 365
  current_month: 1

# Hồ sơ người học — baseline THẬT, lưu kèm khóa học (cập nhật 2026-07-20).
# Nguồn sự thật cho target + điểm xuất phát. Roadmap.jsx chưa render block này (mới chỉ lưu).
student_profile:
  tested_before: false          # chưa từng thi IELTS
  hours_per_day: 4
  target: { overall: 8.5, listening: 9.0, reading: 9.0, writing: 7.0, speaking: 8.5 }
  baseline:
    reading:   { range: "7.5–9.0", note: "Cambridge test — đã mạnh; cày lên khóa cứng 9.0 và giữ cả năm" }
    listening: { range: "7.0–9.0", note: "dao động, sàn 7.0 — dictation mỗi ngày kéo lên 9.0 ổn định" }
    writing:   { range: "0",       note: "KHÔNG học năm nay — để năm sau (giai đoạn 2). Năm nay lộ trình chỉ L·R·S" }
    speaking:  { range: "0",       note: "chưa từng học/nói — xây 0 → 7.0 (T6) → 8.0 (T9) → 8.5 (T12); kỹ năng trọng tâm cả năm" }
  note: "Nền tiếp nhận (R/L) rất mạnh nhưng chưa từng sản sinh. Quyết định 2026-07-20: BỎ HẲN Writing khỏi lộ trình năm nay (học năm sau — giai đoạn 2). Năm nay dồn 100% 4h/ngày vào 3 kỹ năng: L/R → 9.0 và Speaking → 8.5. Giờ Writing trống được chia cho L/R/S + mock, đẩy Speaking kịch trần."
  strategy: "Năm nay là GIAI ĐOẠN 1 — làm chủ L·R·S: L9 · R9 · S8.5. Overall 8.5 hoàn chỉnh (cần Writing) để GIAI ĐOẠN 2 năm sau, khi ghép Writing 0→7.0 vào nền L·R·S đã vững (L9·R9·W7.0·S8.5 = 33.5 → 8.5, dư nửa band ở Speaking làm bảo hiểm). Speaking là trục chính, luyện liên tục 12 tháng: italki chẩn đoán w4, 1 buổi/tuần từ w5, 2 buổi/tuần từ Phase 2, full mock chấm điểm ở các gate. L/R chốt 9.0 tại w26 rồi giữ bằng full mock hằng tuần. Gates: w13 (mock L+R+S) · w26 (L/R 39–40/40 + S 7.0) · w39 (S 8.0 + L/R giữ 9.0) · w47 (S 8.5 + L/R 9.0)."

# Phân bổ phút/ngày theo phase. Tổng = 240 phút = 4h. Writing = 0 CẢ NĂM (học năm sau).
# Giờ Writing trống dồn cho Speaking (kịch trần 8.5) + L/R (full-mock giữ 9.0) + vocab.
schedule:
  - { phase: 1, writing: 0, speaking: 70, reading: 70, listening: 75, vocab: 25 }
  - { phase: 2, writing: 0, speaking: 75, reading: 70, listening: 70, vocab: 25 }
  - { phase: 3, writing: 0, speaking: 85, reading: 65, listening: 65, vocab: 25 }
  - { phase: 4, writing: 0, speaking: 85, reading: 70, listening: 70, vocab: 15 }

phases:
  - n: 1
    name: "LR Sprint"
    range: "T1–3"
    span: "07·2026 → 09·2026"
    target: "LR 8.5"
    months: "1–3"
    current: true
    current_ach: "Cày L/R làm chủ kỹ thuật · dựng nền Speaking từ 0 · KHÔNG Writing"
    achievements:
      - "Reading 70′/ngày: làm chủ 8 dạng câu hỏi Ngọc Bách (w1–7) → vào full test giải thích (w8–13)"
      - "Listening 75′/ngày: Chép Chính Tả INTERMEDIATE trọn bộ → ADVANCED · dictation mỗi ngày + BBC"
      - "Speaking: phát âm nền (ELSA + shadow) · 15 script Part 2 Ngọc Bách · nói 2 phút không khựng dài"
      - "italki chẩn đoán w4 · 1 buổi/tuần từ w5 (S phải chạm 7.0 ở tháng 6 — không đợi)"
      - "Anki 15 collocation/ngày · 13/19 chủ đề Ngọc Bách"
      - "Sat: mock L (NghĩaPhan 1–13) + R timed · w13 = mock L+R+S chốt phase"
      - "KHÔNG học WRITING (để năm sau) — 4h/ngày dồn hết cho L·R·S·Vocab"

  - n: 2
    name: "Khóa 9.0 · S lên 7"
    range: "T4–6"
    span: "10·2026 → 12·2026"
    target: "LR 9 · S 7"
    months: "4–6"
    achievements:
      - "L & R vào chế độ full-test timed: 39–40/40 đều đặn — khóa cứng 9.0"
      - "italki tăng 2 buổi/tuần · topic bank 19 chủ đề · Speaking chạm 7.0"
      - "Chép Chính Tả ADVANCED trọn bộ + vòng 2 bài khó · đủ accent UK/US/AUS"
      - "NghĩaPhan 14–26 full timed + kho BC 9 đề Reading + Cambridge re-timed"
      - "w26 = GATE nửa năm: L/R 39–40/40 + S 7.0 (italki chấm)"
      - "Vẫn KHÔNG Writing — nửa sau chuyển sang đẩy Speaking kịch trần"

  - n: 3
    name: "Speaking Sprint"
    range: "T7–9"
    span: "01·2027 → 03·2027"
    target: "S 8 · LR 9"
    months: "7–9"
    achievements:
      - "Speaking khối lớn nhất 85′/ngày: đẩy 7.0 → 8.0 · iTalki 2 buổi/tuần + full mock chấm điểm"
      - "Lexical range + pronunciation features (intonation · nối âm · sentence stress) — không chỉ fluency"
      - "Part 3 abstract chuyên sâu · trả lời câu hỏi dồn không khựng"
      - "L & R full mock timed 65′/ngày: giữ 39–40/40 · zero-tolerance lỗi cẩu thả"
      - "NghĩaPhan 27–34 + RoadToIELTS 1–5 + BC bank re-timed"
      - "w39 = GATE: iTk full mock chấm S 8.0 + L/R giữ 39–40/40"

  - n: 4
    name: "Exam Readiness"
    range: "T10–12"
    span: "04·2027 → 06·2027"
    target: "S 8.5 · LR 9"
    months: "10–12"
    achievements:
      - "Speaking đẩy 8.0 → 8.5: iTk full mock exam-pressure · fluency + pronunciation đỉnh · gate w47"
      - "L & R full mock 3 kỹ năng hằng tuần (NghĩaPhan re-timed + RoadToIELTS + BC bank) · giữ 9.0"
      - "Vocab kịch hoạt: less-common lexis vào Speaking Part 2/3"
      - "w48 peak → w49–51 taper + dress rehearsal (L→R→S) · w52 sẵn sàng thi L·R·S"
      - "Đóng GIAI ĐOẠN 1 với L9·R9·S8.5 — nền để năm sau ghép Writing lấy đủ overall 8.5"

bands:
  - { k: R, name: Reading,   cur: 8.0, tgt: 9.0, color: coral,  status: "Cày lên 39–40/40 tại gate w26 · full mock hằng tuần giữ 9.0 cả năm" }
  - { k: L, name: Listening, cur: 7.5, tgt: 9.0, color: sage,   status: "Dictation mỗi ngày → 9.0 ổn định tại w26 · sau đó full mock duy trì" }
  - { k: S, name: Speaking,  cur: 0,   tgt: 8.5, color: sky,    status: "Trục chính cả năm · xây 0 → 7.0 (T6) → 8.0 (T9) → 8.5 (T12) · iTalki + ELSA" }
  - { k: W, name: Writing,   cur: 0,   tgt: 7.0, color: butter, status: "KHÔNG luyện năm nay — học năm sau (giai đoạn 2) để ghép đủ overall 8.5" }

pitfalls:
  - { code: P1, name: "Passive-active gap",      note: "biết từ khi đọc/nghe nhưng sai collocation lúc NÓI — S8.5 cần DÙNG đúng, không chỉ nhận diện", seen: 0, hot: true }
  - { code: P2, name: "Speaking over-monitor",   note: "vừa nói vừa soi grammar = mất fluency; S gánh 8.5 nên fluency + coherence là tiêu chí sống còn", seen: 0, hot: true }
  - { code: P3, name: "Memorised answers",       note: "học thuộc script Part 2 → examiner phát hiện, trừ điểm nặng; dùng KHUNG ý tái tạo, không đọc thuộc", seen: 0, hot: true }
  - { code: P4, name: "Pronunciation plateau",   note: "S 8.5 cần pronunciation features (intonation theo nghĩa · nối âm · weak forms), fluency trơn thôi chưa đủ", seen: 0, hot: true }
  - { code: P5, name: "Listening spelling/số",   note: "sai chính tả hoặc format số/ngày = câu SAI dù nghe đúng → giết band 9.0", seen: 0, hot: true }
  - { code: P6, name: "Reading careless-timing", note: "2–3 câu cẩu thả cuối giờ = 8.5 thay vì 9.0 — zero slack không tha", seen: 0, hot: true }
  - { code: P7, name: "Maintenance drift",       note: "nửa cuối L/R chỉ 'duy trì' — dễ tụt khỏi 9.0 nếu bỏ full mock; giữ mock hằng tuần + Error Log", seen: 0, hot: true }

materials:
  required:
    - { title: "Khóa IELTS Ngọc Bách — Package 2020 (đã tải)", use: "BACKBONE · Reading 8 dạng + full test · Vocab 19 chủ đề + 15 Speaking script + PARAPHRASE (Writing để năm sau)", priority: 3 }
    - { title: "Bộ Chép Chính Tả Bứt Phá Listening (đã tải)", use: "Listening · dictation 2 tier (Intermediate→Advanced) — vũ khí chính cày 9.0", priority: 3 }
    - { title: "Nguyễn Huyền FULL + BBC 6 Minute (đã tải)", use: "Listening · 72 track + 8 ep BBC có transcript (self-grade) — volume + shadow phát âm", priority: 3 }
    - { title: "Sách IELTS Nghĩa Phan (đã tải)", use: "Listening · 34 full test audio — mock T7 hằng tuần + timed mileage", priority: 2 }
    - { title: "Road to IELTS — British Council (đã tải)", use: "Listening · 9 full-test audio — mock Phase 3–4", priority: 2 }
    - { title: "Tú Phạm — Từ vựng IELTS 7.0+ (đã tải · 1/38 set)", use: "Vocabulary band 7+ · bổ sung mỏng cho Speaking", priority: 1 }
  apps:
    - { name: "italki — gia sư Speaking", cost: "Theo buổi", use: "Chẩn đoán w4 · 1 buổi/tuần từ w5 · 2 buổi/tuần từ Phase 2 — TRỤC CHÍNH S 0→7.0→8.0→8.5" }
    - { name: "ELSA Speak", cost: "~$60/năm", use: "Pronunciation drill mỗi ngày từ w1 — nền phát âm + pronunciation features cho S 8.5" }
    - { name: "Anki", cost: "Miễn phí", use: "Flashcard collocation từ Ngọc Bách Vocab · 15 từ/ngày · production card cho Speaking" }
  free:
    - { name: "✎ Writing — GIAI ĐOẠN 2 (năm sau)", note: "Kho đã có sẵn khóa Ngọc Bách Writing (T1+T2+BONUS) + vòng chấm bài — để dành năm sau ghép vào, KHÔNG học năm nay" }
    - { name: "⚠ Speaking Part 1&3 / phát âm nâng cao [tùy chọn]", note: "GAP: kho chỉ có 15 script Part 2 — italki/ELSA gánh; S 8.5 dựa vào tutor loop 12 tháng" }

youtube:
  - { channel: "BBC 6 Minute English (đã tải · có transcript)", best_for: "Listening Section 3–4 · self-grade · shadow connected speech cho Speaking" }
  - { channel: "Ngọc Bách — video bài giảng .TS (đã tải)", best_for: "Reading theo từng dạng câu hỏi (Phase 1)" }

cambridge_schedule:
  - { month: 1,  books: "NB Reading dạng 1–5 (GAP FILL→HEADINGS) + CCT-I 1–15 + script #1–4 · italki chẩn đoán w4" }
  - { month: 2,  books: "NB Reading dạng 6–8 + TONG KET → vào NB-R10 full test · CCT-I xong → CCT-A + BBC · italki 1×/tuần" }
  - { month: 3,  books: "NB-R10 Cambridge/BC giải trọn + CCT-A 7–16 + script #9–15 · w13 MOCK L+R+S chốt phase" }
  - { month: 4,  books: "NghĩaPhan 14–17 full timed + BC bank Reading + CCT-A 17–24 · italki lên 2 buổi/tuần" }
  - { month: 5,  books: "NghĩaPhan 18–22 + BC bank tiếp + CCT-A vòng 2 bài khó · topic bank Speaking 19 chủ đề" }
  - { month: 6,  books: "NghĩaPhan 23–26 + Cambridge/BC re-timed 39–40/40 · w26 GATE: L/R 9.0 + S 7.0 (italki chấm)" }
  - { month: 7,  books: "ĐẨY SPEAKING: iTk 2×/tuần đẩy 7.0→7.5 + pronunciation features · NP 27–30 L + BC bank R giữ 9.0" }
  - { month: 8,  books: "Speaking Part 3 abstract + less-common lexis · NP 31–34 + RtI 1–3 full timed · BC re-timed" }
  - { month: 9,  books: "RtI 4–5 + Cambridge/BC re-timed · w39 GATE: iTk full mock S 8.0 + L/R 39–40/40" }
  - { month: 10, books: "S đẩy 8.0→8.5 · full mock 3 kỹ năng: NP 1–3 re-timed fresh + RtI 6 · zero-tolerance L/R" }
  - { month: 11, books: "BC bank A–C full mock + NP 4–7 re-mock · w47 GATE: S 8.5 + L/R 9.0" }
  - { month: 12, books: "w48 peak (NP8) → RtI 7–9 taper + dress rehearsal L→R→S · deload · sẵn sàng thi L·R·S" }
---

Lộ trình 12 tháng — **GIAI ĐOẠN 1: làm chủ L·R·S** (L 9.0 · R 9.0 · S 8.5), 4h/ngày. **Writing KHÔNG học năm nay — để năm sau (giai đoạn 2).** Ba điểm tựa:

1. **Bỏ hẳn Writing khỏi năm nay — dồn 100% giờ cho ba kỹ năng còn lại.** Writing là kỹ năng sản sinh nặng nhất, xây từ số 0 cần nhiều tháng feedback riêng; tách hẳn sang năm sau để năm nay không phân mảnh 4h/ngày. Toàn bộ thời gian (kể cả ~85–100′/ngày trước đây định cho Writing) chuyển sang: **Speaking đẩy kịch trần 8.5**, **L/R full mock giữ chắc 9.0**, và vocab. Cả 52 tuần đều chỉ có bốn loại buổi: Speaking · Reading · Listening · Anki.

2. **Speaking là trục chính, luyện liên tục cả năm 0 → 8.5.** Xây nền phát âm từ w1 (ELSA + shadow BBC), 15 script Part 2 Ngọc Bách, italki chẩn đoán w4 rồi 1 buổi/tuần từ w5, 2 buổi/tuần từ tháng 4. Mốc: **7.0 ở gate w26** (nửa năm), **8.0 ở gate w39**, **8.5 ở gate w47**. Nửa sau (Phase 3–4) Speaking chiếm khối lớn nhất 85′/ngày với pronunciation features (intonation, nối âm, weak forms) và Part 3 abstract — vì 8.5 đòi hỏi hơn fluency trơn tru.

3. **L/R lên 9.0 nửa đầu rồi GIỮ bằng full mock cả năm.** L/R từ nền 7.5–8.0 phải khóa cứng 39–40/40 tại **gate w26** (dictation Chép Chính Tả mỗi ngày + 8 dạng câu hỏi Ngọc Bách + full test bank). Nửa sau không "buông" mà giữ ở 65–70′/ngày với full mock hằng tuần — pitfall lớn nhất giai đoạn cuối là *maintenance drift* (tưởng đã chắc 9.0 rồi lơ là). Kho tài liệu đã tải dùng 100% cho L·R·S (Ngọc Bách + Chép Chính Tả + Nghĩa Phan + Nguyễn Huyền/BBC + Road to IELTS); italki + ELSA là 2 dịch vụ ngoài duy nhất. **Năm sau:** ghép Writing 0→7.0 vào nền này để lấy đủ overall 8.5 (L9·R9·W7.0·S8.5 = 33.5 → 8.5, Speaking dư nửa band làm bảo hiểm).
