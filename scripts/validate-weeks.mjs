#!/usr/bin/env node
// Validate ielts-85 week files against docs/ielts-85/authoring-spec.md invariants.
// Usage: node scripts/validate-weeks.mjs [w1 w2 ...]   (no args = all 52)
// Run from repo root. Requires server/node_modules (gray-matter).

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const matter = (await import(join(ROOT, 'server', 'node_modules', 'gray-matter', 'index.js'))).default;

const WEEKS_DIR = join(ROOT, 'content', 'courses', 'ielts-85', 'weeks');

// Calendar from authoring-spec.md — wN → [month_year, [7 day-of-month numbers Mon..Sun]]
const CAL = {
  1:['07 · 2026',[6,7,8,9,10,11,12]],      2:['07 · 2026',[13,14,15,16,17,18,19]],
  3:['07 · 2026',[20,21,22,23,24,25,26]],  4:['07 · 2026',[27,28,29,30,31,1,2]],
  5:['08 · 2026',[3,4,5,6,7,8,9]],         6:['08 · 2026',[10,11,12,13,14,15,16]],
  7:['08 · 2026',[17,18,19,20,21,22,23]],  8:['08 · 2026',[24,25,26,27,28,29,30]],
  9:['08 · 2026',[31,1,2,3,4,5,6]],        10:['09 · 2026',[7,8,9,10,11,12,13]],
  11:['09 · 2026',[14,15,16,17,18,19,20]], 12:['09 · 2026',[21,22,23,24,25,26,27]],
  13:['09 · 2026',[28,29,30,1,2,3,4]],     14:['10 · 2026',[5,6,7,8,9,10,11]],
  15:['10 · 2026',[12,13,14,15,16,17,18]], 16:['10 · 2026',[19,20,21,22,23,24,25]],
  17:['10 · 2026',[26,27,28,29,30,31,1]],  18:['11 · 2026',[2,3,4,5,6,7,8]],
  19:['11 · 2026',[9,10,11,12,13,14,15]],  20:['11 · 2026',[16,17,18,19,20,21,22]],
  21:['11 · 2026',[23,24,25,26,27,28,29]], 22:['11 · 2026',[30,1,2,3,4,5,6]],
  23:['12 · 2026',[7,8,9,10,11,12,13]],    24:['12 · 2026',[14,15,16,17,18,19,20]],
  25:['12 · 2026',[21,22,23,24,25,26,27]], 26:['12 · 2026',[28,29,30,31,1,2,3]],
  27:['01 · 2027',[4,5,6,7,8,9,10]],       28:['01 · 2027',[11,12,13,14,15,16,17]],
  29:['01 · 2027',[18,19,20,21,22,23,24]], 30:['01 · 2027',[25,26,27,28,29,30,31]],
  31:['02 · 2027',[1,2,3,4,5,6,7]],        32:['02 · 2027',[8,9,10,11,12,13,14]],
  33:['02 · 2027',[15,16,17,18,19,20,21]], 34:['02 · 2027',[22,23,24,25,26,27,28]],
  35:['03 · 2027',[1,2,3,4,5,6,7]],        36:['03 · 2027',[8,9,10,11,12,13,14]],
  37:['03 · 2027',[15,16,17,18,19,20,21]], 38:['03 · 2027',[22,23,24,25,26,27,28]],
  39:['03 · 2027',[29,30,31,1,2,3,4]],     40:['04 · 2027',[5,6,7,8,9,10,11]],
  41:['04 · 2027',[12,13,14,15,16,17,18]], 42:['04 · 2027',[19,20,21,22,23,24,25]],
  43:['04 · 2027',[26,27,28,29,30,1,2]],   44:['05 · 2027',[3,4,5,6,7,8,9]],
  45:['05 · 2027',[10,11,12,13,14,15,16]], 46:['05 · 2027',[17,18,19,20,21,22,23]],
  47:['05 · 2027',[24,25,26,27,28,29,30]], 48:['05 · 2027',[31,1,2,3,4,5,6]],
  49:['06 · 2027',[7,8,9,10,11,12,13]],    50:['06 · 2027',[14,15,16,17,18,19,20]],
  51:['06 · 2027',[21,22,23,24,25,26,27]], 52:['06 · 2027',[28,29,30,1,2,3,4]],
};

const phaseOf = n => n <= 13 ? 1 : n <= 26 ? 2 : n <= 39 ? 3 : 4;
const KIND_COLOR = { WRITING:'butter', SPEAKING:'sky', READING:'coral', LISTENING:'sage', ANKI:'mute' };
const DOW = ['T2','T3','T4','T5','T6','T7'];
const MILE_DOW = [...DOW, 'CN'];
// Not-downloaded sources that must never be cited (spec Rule #1).
const BLACKLIST = /Simon|Cullen|Hancock|Collins|ieltsliz|ieltsadvantage|IELTS Liz|Official Cambridge Guide|Barron|Kaplan|Magoosh|E2 ?Language/i;

const targets = process.argv.slice(2).length
  ? process.argv.slice(2).map(s => Number(String(s).replace(/^w/i, '')))
  : Array.from({ length: 52 }, (_, i) => i + 1);

let totalErrs = 0;
for (const n of targets) {
  const errs = [];
  const file = join(WEEKS_DIR, `w${n}.md`);
  if (!existsSync(file)) { console.log(`w${n}: MISSING FILE`); totalErrs++; continue; }

  let fm, body;
  try {
    const parsed = matter(readFileSync(file, 'utf8'));
    fm = parsed.data; body = parsed.content.trim();
  } catch (e) { console.log(`w${n}: YAML PARSE FAIL — ${e.message.split('\n')[0]}`); totalErrs++; continue; }

  const [expMY, expDates] = CAL[n];
  const expPhase = phaseOf(n);

  if (fm.n !== n) errs.push(`n=${fm.n} ≠ ${n}`);
  if (fm.phase !== expPhase) errs.push(`phase=${fm.phase} ≠ ${expPhase}`);
  if (fm.day_of_week !== 'Thứ Hai') errs.push(`day_of_week="${fm.day_of_week}"`);
  if (String(fm.date_n) !== String(expDates[0])) errs.push(`date_n=${fm.date_n} ≠ ${expDates[0]}`);
  if (fm.month_year !== expMY) errs.push(`month_year="${fm.month_year}" ≠ "${expMY}"`);
  if (!fm.headline) errs.push('missing headline');
  if (!body) errs.push('missing one-line body');

  // milestones
  const ms = fm.milestones || [];
  if (ms.length !== 7) errs.push(`milestones ×${ms.length} ≠ 7`);
  ms.forEach((m, i) => {
    if (m.d !== MILE_DOW[i]) errs.push(`milestone[${i}].d=${m.d} ≠ ${MILE_DOW[i]}`);
    if (String(m.date) !== String(expDates[i])) errs.push(`milestone[${i}].date=${m.date} ≠ ${expDates[i]}`);
    if (!m.label) errs.push(`milestone[${i}] missing label`);
  });
  if (ms[6] && !ms[6].rest) errs.push('CN missing rest:true');
  if (ms[5] && !ms[5].special) errs.push('T7 missing special:true');
  if (n === 1 && ms[0] && !ms[0].today) errs.push('w1 T2 missing today:true');
  if (n !== 1 && ms.some(m => m.today)) errs.push('today:true outside w1');

  // days
  const days = fm.days || [];
  if (days.length !== 6) errs.push(`days ×${days.length} ≠ 6`);
  days.forEach((d, i) => {
    if (d.dow !== DOW[i]) errs.push(`days[${i}].dow=${d.dow} ≠ ${DOW[i]}`);
    const blocks = d.blocks || [];
    if (blocks.length < 4 || blocks.length > 6) errs.push(`${d.dow}: ${blocks.length} blocks (need 4–6)`);
    const ids = new Set(), kinds = new Set();
    let dayMin = 0;
    for (const b of blocks) {
      const tag = `${d.dow}/${b.id ?? '?'}`;
      if (!b.id || ids.has(b.id)) errs.push(`${tag}: bad/dup id`); ids.add(b.id);
      if (!KIND_COLOR[b.kind]) { errs.push(`${tag}: bad kind ${b.kind}`); continue; }
      if (kinds.has(b.kind)) errs.push(`${d.dow}: duplicate kind ${b.kind}`); kinds.add(b.kind);
      if (b.kind_color !== KIND_COLOR[b.kind]) errs.push(`${tag}: kind_color=${b.kind_color} ≠ ${KIND_COLOR[b.kind]}`);
      if (!Number.isInteger(b.duration)) errs.push(`${tag}: duration not int`);
      const tsum = (b.tasks || []).reduce((s, t) => s + (t.m || 0), 0);
      if (!b.tasks?.length) errs.push(`${tag}: no tasks`);
      else if (tsum !== b.duration) errs.push(`${tag}: Σtasks.m=${tsum} ≠ duration=${b.duration}`);
      if (!Number.isInteger(b.reward_seeds)) errs.push(`${tag}: reward_seeds not int`);
      const wantHref = b.kind === 'WRITING' ? '#/writing' : '#/today';
      if (b.href !== wantHref) errs.push(`${tag}: href=${b.href} ≠ ${wantHref}`);
      if (!b.title || !b.prompt) errs.push(`${tag}: missing title/prompt`);
      if (b.time && !/^\d{2}:\d{2}–\d{2}:\d{2}$/.test(b.time)) errs.push(`${tag}: time "${b.time}" not HH:MM–HH:MM`);
      dayMin += b.duration || 0;
    }
    // Rule #2 — NO Writing in ANY week (Writing dropped from this year's plan; học năm sau)
    if (kinds.has('WRITING')) errs.push(`${d.dow}: WRITING block — kế hoạch năm nay BỎ HẲN Writing (không tuần nào có block WRITING)`);
    // day-total ranges (spec inv. 7; all phases now 4-block S/R/L/A; w49–52 taper lighter)
    const sat = d.dow === 'T7';
    const taper = n >= 49;
    const [lo, hi] = sat
      ? (taper ? [140, 300] : [200, 270])
      : (taper ? [140, 240] : [190, 240]);
    if (dayMin < lo || dayMin > hi) errs.push(`${d.dow}: total ${dayMin}′ outside ${lo}–${hi}′`);
  });

  // Rule #1 blacklist over the whole file
  const raw = readFileSync(file, 'utf8');
  const bl = raw.match(BLACKLIST);
  if (bl) errs.push(`blacklisted citation "${bl[0]}"`);
  // Writing removed entirely — marking service must NEVER appear
  if (/gửi chấm|writing marking|writing9/i.test(raw)) errs.push('marking service mentioned (Writing bỏ khỏi kế hoạch năm nay)');
  // italki timing: none before w4
  if (n < 4 && /italki|iTk/i.test(raw)) errs.push('italki mentioned before w4');
  // RoadToIELTS only from phase 3 (w27+)
  if (n < 27 && /RoadToIELTS|RtI/.test(raw)) errs.push('RoadToIELTS cited before w27');
  // No writing-course material / essay / Task 1–2 in ANY week
  if (/Writing Online\/(IELTS Writing Task|BONUS)|Task 1|Task 2|\bessay\b/i.test(raw)) errs.push('writing-course/essay/Task reference (Writing bỏ khỏi kế hoạch)');

  if (errs.length) { console.log(`w${n}: ${errs.length} error(s)\n  - ` + errs.join('\n  - ')); totalErrs += errs.length; }
  else console.log(`w${n}: OK`);
}

console.log(totalErrs ? `\nFAIL — ${totalErrs} total error(s)` : '\nALL WEEKS VALID');
process.exit(totalErrs ? 1 : 0);
