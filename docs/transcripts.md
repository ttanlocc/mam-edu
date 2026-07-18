# Transcript cho các bài nghe (chạy live theo audio)

Mỗi material `type: "audio"` trong app giờ có panel **TRANSCRIPT** ngay dưới player:
đóng mặc định (không lộ đáp án bài chép chính tả), mở ra thì câu đang đọc **tự sáng +
tự cuộn theo audio**, bấm vào câu bất kỳ để tua tới đúng chỗ đó.

Transcript là file **WebVTT sidecar** sinh bằng Whisper, nằm ngoài repo (cùng chỗ với
kho tài liệu), app tự fetch khi người học mở panel. Chưa có file thì panel báo
"Chưa có transcript" — không lỗi, không chặn gì.

## Kiến trúc

```
materials-raw/            ← kho tài liệu gốc (GIEO_MATERIALS, giữ nguyên như cũ)
  extracted/.../AUDIO/1 A healthy lifestyle.mp3
materials-transcripts/    ← VTT sinh ra, mirror đúng đường dẫn (GIEO_TRANSCRIPTS)
  extracted/.../AUDIO/1 A healthy lifestyle.mp3.vtt
```

- API: `GET /transcripts/<src>.vtt` (route tĩnh, `server/index.js`). Mặc định
  `GIEO_TRANSCRIPTS` = thư mục `materials-transcripts` nằm **cạnh** `GIEO_MATERIALS`.
- UI: `src/screens/Today.jsx` · `AudioMaterial` (Session dùng chung qua `MaterialList`).
- Chạy docker-compose thì mở comment 2 dòng volume + 2 dòng env trong `docker-compose.yml`.

## Sinh transcript trên VM (một lần, ~57 file audio)

Cài Whisper trên máy chứa tài liệu (cần `ffmpeg`):

```bash
sudo apt install -y ffmpeg pipx
pipx install openai-whisper          # bản chuẩn, chậm hơn
# HOẶC nhanh hơn ~4x trên CPU, cùng giao diện CLI:
pipx install whisper-ctranslate2     # rồi chạy với WHISPER_BIN=whisper-ctranslate2
```

Chạy từ repo (trên VM, nơi có `materials-raw`):

```bash
node scripts/transcribe-materials.mjs --dry-run     # xem sẽ làm gì, file nào thiếu
node scripts/transcribe-materials.mjs               # chạy thật · model small · tự nhận ngôn ngữ
```

Tuỳ chọn hay dùng:

```bash
# chỉ làm bộ đề Nghĩa Phan
node scripts/transcribe-materials.mjs --filter "NGHĨA PHAN"
# ép tiếng Anh (bài thuần EN nhận nhanh + ổn định hơn; các bài vocab Ngọc Bách
# trộn Việt+Anh thì NÊN để tự nhận, đừng ép)
node scripts/transcribe-materials.mjs --filter "CHÉP CHÍNH TẢ" --language en
# model to hơn nếu máy khoẻ / cần chính xác hơn
node scripts/transcribe-materials.mjs --model medium
# làm lại 1 file đã có
node scripts/transcribe-materials.mjs --filter "baby toys" --force
```

Script idempotent: chạy lại chỉ làm file còn thiếu, `Ctrl-C` giữa chừng không sao.
Env: `GIEO_MATERIALS`, `GIEO_TRANSCRIPTS`, `WHISPER_BIN` (xem đầu file script).

## Kiểm tra

```bash
# server thấy file chưa (thay src bất kỳ):
curl -s "http://127.0.0.1:3030/transcripts/extracted/2.%20KHO%20T%C3%80I%20LI%E1%BB%86U%20IELTS%20/S%C3%A1ch%20IELTS%20NGH%C4%A8A%20PHAN/Audio/INPTest01-Section1.mp3.vtt" | head -5
# e2e UI (fixture tự tạo, không cần tài liệu thật):
npm i --no-save playwright react@18.3.1 react-dom@18.3.1 @babel/standalone@7.29.0
node scripts/playwright-transcript.mjs
```

Lưu ý: transcript Whisper là máy sinh — bài chép chính tả khi dò đáp án cuối cùng vẫn
đối chiếu thêm với PDF đáp án của bộ sách nếu có; VTT dùng để soi nhanh + tua theo câu.
