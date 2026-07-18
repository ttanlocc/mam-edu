#!/usr/bin/env node
// Generate sidecar VTT transcripts for every AUDIO material referenced by the courses.
// Run this WHERE THE MATERIALS LIVE (the laged-app VM), not in the app container.
//
//   node scripts/transcribe-materials.mjs [--dry-run] [--force] [--filter <substr>]
//                                         [--model small] [--language en]
//
//   --dry-run          list what would be transcribed (and what's missing/done), do nothing
//   --force            re-transcribe even if the .vtt already exists
//   --filter <substr>  only process material srcs containing <substr> (e.g. "NGHĨA PHAN")
//   --model <name>     whisper model (default: small — good CPU speed/quality balance)
//   --language <code>  force a language (e.g. en); default: whisper auto-detects per file
//                      (leave auto for the Ngọc Bách vocab audios — they mix VN + EN)
//
// Env:
//   GIEO_MATERIALS    root of the raw materials archive (default /home/azureuser/laged-app/materials-raw)
//   GIEO_TRANSCRIPTS  output root for VTTs (default <GIEO_MATERIALS>/../materials-transcripts)
//   WHISPER_BIN       whisper CLI to use (default "whisper" = openai-whisper;
//                     "whisper-ctranslate2" is a drop-in that runs ~4x faster on CPU)
//
// Output layout mirrors material src paths: <GIEO_TRANSCRIPTS>/<src>.vtt — served by the
// API at /transcripts/<src>.vtt (server/index.js) and rendered live by the app's
// transcript panel (src/screens/Today.jsx · AudioMaterial).

import { readdirSync, readFileSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MATERIALS_DIR   = process.env.GIEO_MATERIALS   || '/home/azureuser/laged-app/materials-raw';
const TRANSCRIPTS_DIR = process.env.GIEO_TRANSCRIPTS || join(MATERIALS_DIR, '..', 'materials-transcripts');
const WHISPER_BIN     = process.env.WHISPER_BIN      || 'whisper';

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt  = (name, dflt) => {
  const i = argv.indexOf(name);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : dflt;
};
const DRY      = flag('--dry-run');
const FORCE    = flag('--force');
const FILTER   = opt('--filter', '');
const MODEL    = opt('--model', 'small');
const LANGUAGE = opt('--language', '');

// ── Collect unique audio srcs from every week file of every course ────────────
// Material entries are flat flow-YAML objects ({ type: "audio", ..., src: "..." }),
// per the authoring spec. Match each {...} object individually — a `materials:` line
// can hold several objects of mixed types, so a per-line src grab is not enough.
function collectAudioSrcs() {
  const srcs = new Map(); // src → [refs like "ielts-85/w1"]
  const coursesDir = join(ROOT, 'content', 'courses');
  for (const course of readdirSync(coursesDir, { withFileTypes: true })) {
    if (!course.isDirectory()) continue;
    const weeksDir = join(coursesDir, course.name, 'weeks');
    if (!existsSync(weeksDir)) continue;
    for (const f of readdirSync(weeksDir).filter(n => /^w\d+\.md$/.test(n)).sort()) {
      const ref = `${course.name}/${f.replace(/\.md$/, '')}`;
      const text = readFileSync(join(weeksDir, f), 'utf8');
      for (const [obj] of text.matchAll(/\{[^{}]*\}/g)) {
        if (!/type:\s*"audio"/.test(obj)) continue;
        const m = obj.match(/src:\s*"([^"]+)"/);
        if (!m) continue;
        if (!srcs.has(m[1])) srcs.set(m[1], []);
        srcs.get(m[1]).push(ref);
      }
    }
  }
  return srcs;
}

function transcribe(input, output) {
  // Whisper writes <input stem>.vtt into --output_dir; write straight into the
  // final dir, then rename stem.vtt → <audio filename>.vtt (same fs, atomic).
  const outDir = dirname(output);
  mkdirSync(outDir, { recursive: true });
  const args = [input, '--model', MODEL, '--output_format', 'vtt', '--output_dir', outDir, '--task', 'transcribe'];
  if (LANGUAGE) args.push('--language', LANGUAGE);
  const res = spawnSync(WHISPER_BIN, args, { stdio: ['ignore', 'inherit', 'inherit'] });
  if (res.error || res.status !== 0) {
    return { ok: false, err: res.error ? String(res.error.message) : `exit ${res.status}` };
  }
  const produced = join(outDir, basename(input, extname(input)) + '.vtt');
  if (!existsSync(produced)) return { ok: false, err: `whisper produced no ${basename(produced)}` };
  renameSync(produced, output);
  return { ok: true };
}

// ── Main ──────────────────────────────────────────────────────────────────────
const all = [...collectAudioSrcs().entries()]
  .filter(([src]) => !FILTER || src.toLowerCase().includes(FILTER.toLowerCase()));

if (!all.length) {
  console.log('No audio materials matched.');
  process.exit(0);
}

const todo = [], done = [], missing = [];
for (const [src, refs] of all) {
  const input  = join(MATERIALS_DIR, src);
  const output = join(TRANSCRIPTS_DIR, src + '.vtt');
  if (!existsSync(input)) missing.push({ src, refs });
  else if (existsSync(output) && !FORCE) done.push({ src, refs });
  else todo.push({ src, refs, input, output });
}

console.log(`materials:   ${MATERIALS_DIR}`);
console.log(`transcripts: ${TRANSCRIPTS_DIR}`);
console.log(`whisper:     ${WHISPER_BIN} --model ${MODEL}${LANGUAGE ? ` --language ${LANGUAGE}` : ' (auto language)'}`);
console.log(`audio refs:  ${all.length} unique · ${done.length} already done · ${todo.length} to do · ${missing.length} missing\n`);

for (const { src } of missing) console.log(`  MISSING  ${src}`);
if (DRY) {
  for (const { src } of done) console.log(`  done     ${src}`);
  for (const { src } of todo) console.log(`  TODO     ${src}`);
  process.exit(missing.length ? 1 : 0);
}

let failed = 0;
for (const [i, t] of todo.entries()) {
  console.log(`\n[${i + 1}/${todo.length}] ${t.src}`);
  const t0 = Date.now();
  const res = transcribe(t.input, t.output);
  if (res.ok) console.log(`  ✓ ${basename(t.output)} · ${Math.round((Date.now() - t0) / 1000)}s`);
  else { failed++; console.error(`  ✗ FAILED — ${res.err}`); }
}

console.log(`\nDone: ${todo.length - failed} transcribed · ${failed} failed · ${done.length} skipped · ${missing.length} missing`);
process.exit(failed || missing.length ? 1 : 0);
