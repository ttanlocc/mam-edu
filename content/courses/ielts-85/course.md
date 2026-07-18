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

# Hồ sơ người học — baseline THẬT, lưu kèm khóa học (cập nhật 2026-07-18).
# Nguồn sự thật cho target + điểm xuất phát. Roadmap.jsx chưa render block này (mới chỉ lưu).
student_profile:
  tested_before: false          # chưa từng thi IELTS
  hours_per_day: 4
  target: { overall: 8.5, listening: 9.0, reading: 9.0, writing: 7.0, speaking: 8.0 }
  baseline:
    reading:   { range: "7.5–9.0", note: "Cambridge test — đã mạnh; 6 tháng đầu cày lên khóa cứng 9.0" }
    listening: { range: "7.0–9.0", note: "dao động, sàn 7.0 — dictation mỗi ngày 6 tháng đầu kéo lên 9.0 ổn định" }
    writing:   { range: "0",       note: "chưa từng học/viết — 6 tháng đầu HOÀN TOÀN KHÔNG HỌC; tháng 7–12 xây từ 0 → 7.0" }
    speaking:  { range: "0",       note: "chưa từng học/nói — 6 tháng đầu xây 0 → 7.0; 6 tháng cuối đẩy 7.0 → 8.0" }
  note: "Nền tiếp nhận (R/L) rất mạnh nhưng chưa từng sản sinh (W/S). Chiến lược TUẦN TỰ thay vì song song: 6 tháng đầu dồn toàn lực cày L/R → 9.0 + Speaking → 7.0 (KHÔNG học Writing); 6 tháng cuối dồn Writing 0 → 7.0 + Speaking → 8.0, L/R chỉ duy trì. Σ4 kỹ năng phải ≥ 33 để ra 8.5; L9·R9·W7.0·S8.0 = đúng 33 (zero-slack)."
  strategy: "Đường lên 8.5 đi qua W7.0 + S8.0 (không phải W7.5 + S7.5): Speaking là kỹ năng duy nhất được luyện liên tục cả 12 tháng (dễ kéo nhất với nền nghe 9.0 + tutor) nên gánh 8.0; Writing chỉ cần 7.0 trong 6 tháng tập trung với feedback dày. L/R phải chốt 9.0 NGAY tại gate w26 để nửa cuối chỉ duy trì 30–35′/ngày. italki: chẩn đoán w4, 1 buổi/tuần từ w5, 2 buổi/tuần từ Phase 2. Writing mở màn w27; gửi chấm bài đầu w30, chấm HẰNG TUẦN từ w34. Gates bắt buộc: w13 (L+R+S mock) · w26 (L/R 39–40/40 + S 7.0) · w39 (W ~6.5 + S 7.5 + full mock đầu) · w47 (W 7.0 + S 8.0)."

# Phân bổ phút/ngày theo phase. Tổng = 240 phút = 4h.
# 6 tháng đầu Writing = 0 — thời gian dồn cho L/R (cày 9.0) + S (xây 0 → 7.0).
# 6 tháng cuối Writing chiếm khối lớn nhất (0 → 7.0); L/R rút về duy trì.
schedule:
  - { phase: 1, writing: 0,   speaking: 70, reading: 70, listening: 75, vocab: 25 }
  - { phase: 2, writing: 0,   speaking: 75, reading: 70, listening: 70, vocab: 25 }
  - { phase: 3, writing: 100, speaking: 60, reading: 30, listening: 30, vocab: 20 }
  - { phase: 4, writing: 95,  speaking: 60, reading: 35, listening: 35, vocab: 15 }

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
      - "Sat: mock L (NghĩaPhan 1–13) + R timed · w13 = mock L+R+S chốt phase (KHÔNG có W)"
      - "HOÀN TOÀN KHÔNG HỌC WRITING — 4h/ngày dồn hết cho L·R·S·Vocab"

  - n: 2
    name: "Khóa 9.0 · S lên 7"
    range: "T4–6"
    span: "10·2026 → 12·2026"
    target: "LR 9 · S 7"
    months: "4–6"
    achievements:
      - "L & R vào chế độ full-test timed: 39–40/40 đều đặn — khóa cứng 9.0 TRƯỚC khi rẽ sang Writing"
      - "italki tăng 2 buổi/tuần · topic bank 19 chủ đề · Speaking chạm 7.0"
      - "Chép Chính Tả ADVANCED trọn bộ + vòng 2 bài khó · đủ accent UK/US/AUS"
      - "NghĩaPhan 14–26 full timed + kho BC 9 đề Reading + Cambridge re-timed"
      - "w26 = GATE nửa năm: L/R 39–40/40 + S 7.0 (italki chấm) — điều kiện mở Writing ở Phase 3"
      - "Vẫn KHÔNG Writing — dồn lực chốt L/R/S xong trước đã"

  - n: 3
    name: "Writing Sprint"
    range: "T7–9"
    span: "01·2027 → 03·2027"
    target: "W 6.5 · S 7.5"
    months: "7–9"
    achievements:
      - "Writing BẮT ĐẦU TỪ 0 — khối lớn nhất 100′/ngày: tiêu thụ trọn khóa Ngọc Bách Writing"
      - "w27–30 Task 1 (6 dạng biểu đồ) → GỬI CHẤM bài đầu tiên w30"
      - "w31–34 Task 2 (4 dạng) → chấm bài HẰNG TUẦN từ w34"
      - "w35–39 BONUS nâng cao + diệt lỗi lặp · W chạm ~6.5 cuối phase"
      - "Speaking đẩy 7.0 → 7.5: iTalki 2 buổi/tuần · lexical range + pronunciation features"
      - "L/R rút về duy trì 30′/ngày: passage/section timed + Error Log · không rớt 9.0"
      - "w39: FULL MOCK 4 kỹ năng ĐẦU TIÊN (L→R→W→S) + gate W ~6.5 · S 7.5"

  - n: 4
    name: "Exam Readiness"
    range: "T10–12"
    span: "04·2027 → 06·2027"
    target: "8.5"
    months: "10–12"
    achievements:
      - "Writing chốt 7.0: chấm hằng tuần · GRA 'frequent error-free' · gate w47 = 2 bài 7.0 liên tiếp"
      - "Speaking đẩy 7.5 → 8.0: iTk full mock chấm điểm · fluency dưới áp lực · gate w47"
      - "L & R zero-tolerance lỗi cẩu thả (giữ 9.0) · full mock hằng tuần"
      - "Full mock 4 kỹ năng 1×/tuần (NghĩaPhan re-timed + Road to IELTS + BC bank)"
      - "w48 peak → w49–51 taper + dress rehearsal · TEST ~28/06"

bands:
  - { k: R, name: Reading,   cur: 8.0, tgt: 9.0, color: coral,  status: "Cày 6 tháng đầu 70′/ngày → khóa 39–40/40 tại gate w26 · sau đó duy trì" }
  - { k: L, name: Listening, cur: 7.5, tgt: 9.0, color: sage,   status: "Dictation mỗi ngày 6 tháng đầu → 9.0 ổn định tại w26 · sau đó duy trì" }
  - { k: W, name: Writing,   cur: 0,   tgt: 7.0, color: butter, status: "KHÔNG học 6 tháng đầu · T7–12 xây từ 0 với khối 100′/ngày + chấm bài dày → 7.0" }
  - { k: S, name: Speaking,  cur: 0,   tgt: 8.0, color: sky,    status: "Xây từ 0 → 7.0 tại tháng 6 → đẩy 8.0 ở T7–12 · kỹ năng luyện liên tục 12 tháng" }

pitfalls:
  - { code: P1, name: "Passive-active gap",      note: "biết từ khi đọc nhưng sai collocation lúc nói/viết — S8.0 và W7.0 cần DÙNG đúng, không chỉ nhận diện", seen: 0, hot: true }
  - { code: P2, name: "Memorised templates",     note: "'In contemporary society...' bị phạt từ 2024 — examiner trừ TR + CC (áp dụng khi W mở ở T7)", seen: 0, hot: false }
  - { code: P3, name: "Complexity vs accuracy",  note: "GRA 7.0 cần 'frequent error-free' — câu phức nhiều lỗi hại hơn câu đơn đúng", seen: 0, hot: false }
  - { code: P4, name: "No Task 2 outline",       note: "viết không outline = lạc đề, mất TR + CC — kỷ luật bắt buộc từ w31", seen: 0, hot: false }
  - { code: P5, name: "Speaking over-monitor",   note: "vừa nói vừa soi grammar = mất fluency; S gánh 8.0 nên fluency là tiêu chí sống còn", seen: 0, hot: true }
  - { code: P6, name: "Listening spelling/số",   note: "sai chính tả hoặc format số/ngày = câu SAI dù nghe đúng → giết band 9.0", seen: 0, hot: true }
  - { code: P7, name: "Reading careless-timing", note: "2–3 câu cẩu thả cuối giờ = 8.5 thay vì 9.0 — zero slack không tha", seen: 0, hot: true }
  - { code: P8, name: "Writing cram-risk",       note: "W dồn hết vào 6 tháng cuối — trễ 1 tuần là mất buffer; gate w30/w34/w39/w47 KHÔNG được dời, không tự học chay thiếu chấm bài", seen: 0, hot: true }

materials:
  required:
    - { title: "Khóa IELTS Ngọc Bách — Package 2020 (đã tải)", use: "BACKBONE · Reading 8 dạng + full test (T1–6) · Writing T1+T2+BONUS (T7–12) · Vocab 19 chủ đề + 15 Speaking script", priority: 3 }
    - { title: "Bộ Chép Chính Tả Bứt Phá Listening (đã tải)", use: "Listening · dictation 2 tier (Intermediate→Advanced) — vũ khí chính cày 9.0 trong 6 tháng đầu", priority: 3 }
    - { title: "Nguyễn Huyền FULL + BBC 6 Minute (đã tải)", use: "Listening · 72 track + 8 ep BBC có transcript (self-grade) — volume 6 tháng đầu", priority: 3 }
    - { title: "Sách IELTS Nghĩa Phan (đã tải)", use: "Listening · 34 full test audio — mock T7 hằng tuần + timed mileage", priority: 2 }
    - { title: "Road to IELTS — British Council (đã tải)", use: "Listening · 9 full-test audio — mock Phase 3–4", priority: 2 }
    - { title: "Tú Phạm — Từ vựng IELTS 7.0+ (đã tải · 1/38 set)", use: "Vocabulary band 7+ · bổ sung mỏng", priority: 1 }
  apps:
    - { name: "italki — gia sư Speaking", cost: "Theo buổi", use: "Chẩn đoán w4 · 1 buổi/tuần từ w5 · 2 buổi/tuần từ Phase 2 — trục chính S 0→7.0→8.0" }
    - { name: "Writing marking (writing9 / gia sư)", cost: "~$5–30/bài", use: "Từ Phase 3: bài đầu w30 (Task 1) · HẰNG TUẦN từ w34 — mắt xích W 0→7.0, không tự học chay" }
    - { name: "ELSA Speak", cost: "~$60/năm", use: "Pronunciation drill mỗi ngày từ w1 — nền phát âm cho S 8.0" }
    - { name: "Anki", cost: "Miễn phí", use: "Flashcard collocation từ Ngọc Bách Vocab · 15 từ/ngày · production card" }
  free:
    - { name: "⚠ Band-8 Writing models [tùy chọn]", note: "GAP: kho top ~7.0 — đủ cho target W 7.0; model ngoài chỉ nếu muốn dư an toàn" }
    - { name: "⚠ Grammar nâng cao [tùy chọn]", note: "GAP: kho = 0 grammar — phân tích model + chấm bài bù; chỉ bổ sung nếu 1 cấu trúc rớt hoài" }
    - { name: "⚠ Speaking Part 1&3 / phát âm [tùy chọn]", note: "GAP: kho chỉ có 15 script Part 2 — italki/ELSA gánh; S 8.0 dựa vào tutor loop 12 tháng" }

youtube:
  - { channel: "BBC 6 Minute English (đã tải · có transcript)", best_for: "Listening Section 3–4 · self-grade · shadow connected speech" }
  - { channel: "Ngọc Bách — video bài giảng .TS (đã tải)", best_for: "Reading theo dạng (T1–6) · Writing theo dạng (T7–12)" }

cambridge_schedule:
  - { month: 1,  books: "NB Reading dạng 1–5 (GAP FILL→HEADINGS) + CCT-I 1–15 + script #1–4 · italki chẩn đoán w4" }
  - { month: 2,  books: "NB Reading dạng 6–8 + TONG KET → vào NB-R10 full test · CCT-I xong → CCT-A + BBC · italki 1×/tuần" }
  - { month: 3,  books: "NB-R10 Cambridge/BC giải trọn + CCT-A 7–16 + script #9–15 · w13 MOCK L+R+S chốt phase" }
  - { month: 4,  books: "NghĩaPhan 14–17 full timed + BC bank Reading + CCT-A 17–24 · italki lên 2 buổi/tuần" }
  - { month: 5,  books: "NghĩaPhan 18–22 + BC bank tiếp + CCT-A vòng 2 bài khó · topic bank Speaking 19 chủ đề" }
  - { month: 6,  books: "NghĩaPhan 23–26 + Cambridge/BC re-timed 39–40/40 · w26 GATE: L/R 9.0 + S 7.0 (italki chấm)" }
  - { month: 7,  books: "MỞ WRITING: NB Task 1 trọn 6 dạng (100′/ngày) · GỬI CHẤM bài đầu w30 · NP 27–30 duy trì L/R" }
  - { month: 8,  books: "NB Task 2 trọn 4 dạng · chấm bài HẰNG TUẦN từ w34 · NP 31–34 + BC bank duy trì" }
  - { month: 9,  books: "NB BONUS + diệt lỗi lặp W · RtI 1–5 · w39 FULL MOCK 4 kỹ năng đầu tiên · gate W 6.5 S 7.5" }
  - { month: 10, books: "W chấm tuần (đẩy 7.0) + S mock hướng 8.0 · NP 1–3 re-timed fresh + RtI 6 full mock" }
  - { month: 11, books: "BC bank A–C full mock + NP 4–7 re-mock · w47 GATE: W 7.0 (2 bài liên tiếp) + S 8.0" }
  - { month: 12, books: "w48 peak (NP8) → RtI 7–9 taper + dress rehearsal · deload · TEST ~28/06" }
---

Lộ trình 12 tháng lên **overall 8.5** (L 9.0 · R 9.0 · W 7.0 · S 8.0) — 4h/ngày, chiến lược **TUẦN TỰ** thay vì song song. Ba điểm tựa:

1. **6 tháng đầu (w1–26): cày L·R lên 9.0 + Speaking 0→7.0 — HOÀN TOÀN KHÔNG học Writing.** Toàn bộ 4h/ngày dồn cho 3 kỹ năng + vocab: L/R từ nền 7.5–8.0 phải KHÓA CỨNG 39–40/40 tại gate w26 (dictation Chép Chính Tả mỗi ngày + 8 dạng câu hỏi Ngọc Bách + full test bank); Speaking xây từ 0 bằng ELSA + 15 script Ngọc Bách + italki (chẩn đoán w4, 1 buổi/tuần từ w5, 2 buổi/tuần từ tháng 4) để chạm 7.0 ở tháng 6. Bỏ Writing giai đoạn này là chủ đích: học song song W/S từ con số 0 sẽ phân mảnh 4h/ngày; dồn tiếp nhận trước còn tạo sẵn kho từ vựng + cấu trúc câu cho Writing dùng sau.
2. **6 tháng cuối (w27–52): Writing 0→7.0 (khối lớn nhất 95–100′/ngày) + Speaking 7.0→8.0; L/R rút về duy trì.** Writing nén đúng trình tự Ngọc Bách: Task 1 sáu dạng (w27–30) → Task 2 bốn dạng (w31–34) → BONUS (w35+), với chấm bài từ w30 và HẰNG TUẦN từ w34 — từ số 0 không thể tự chấm mà lên nổi 7.0, vòng feedback là mắt xích sống còn (đúng phương pháp "nộp bài sửa" của Ngọc Bách). Speaking tiếp đà không đứt quãng: mock italki chấm điểm tiến 7.5 (gate w39) rồi 8.0 (gate w47). L/R duy trì 30–35′/ngày độ chính xác + full mock thứ Bảy — không được rớt khỏi 9.0.
3. **Phép tính band zero-slack: L9 + R9 + W7.0 + S8.0 = 33 → overall 8.5.** W chỉ cần 7.0 (khả thi trong 6 tháng tập trung + feedback dày, kho Ngọc Bách top ~7.0 là vừa khớp); S gánh 8.0 vì là kỹ năng duy nhất luyện liên tục 12 tháng trên nền nghe 9.0 + tutor. Rủi ro lớn nhất và cách chặn: (a) L/R không kịp 9.0 tại w26 → Phase 3 phải chia lại giờ, vì vậy gate w26 là bắt buộc; (b) Writing trễ nhịp — mất 1 tuần là mất buffer, nên các gate w30/w34/w39/w47 không được dời. Kho tài liệu đã tải dùng 100% (Ngọc Bách backbone + Chép Chính Tả + Nghĩa Phan + Nguyễn Huyền/BBC + Road to IELTS); chấm bài + italki là 2 dịch vụ ngoài duy nhất.
