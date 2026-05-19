import express from 'express';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';

const DB_PATH = process.env.GIEO_DB || '/data/gieo.db';
const PORT    = Number(process.env.PORT || 3000);

mkdirSync(DB_PATH.replace(/\/[^/]+$/, ''), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    json TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS writing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    task TEXT,
    band_tr REAL, band_cc REAL, band_lr REAL, band_gra REAL, band_overall REAL,
    note TEXT,
    created_at INTEGER NOT NULL
  );
`);

const getState = db.prepare('SELECT json FROM state WHERE id = 1');
const upsertState = db.prepare(`
  INSERT INTO state (id, json, updated_at) VALUES (1, ?, ?)
  ON CONFLICT(id) DO UPDATE SET json = excluded.json, updated_at = excluded.updated_at
`);
const listWriting   = db.prepare('SELECT * FROM writing ORDER BY date DESC, id DESC LIMIT 200');
const insertWriting = db.prepare(`
  INSERT INTO writing (date, task, band_tr, band_cc, band_lr, band_gra, band_overall, note, created_at)
  VALUES (@date, @task, @band_tr, @band_cc, @band_lr, @band_gra, @band_overall, @note, @created_at)
`);

const app = express();
app.use(express.json({ limit: '64kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, t: Date.now() }));

app.get('/api/state', (_req, res) => {
  const row = getState.get();
  res.json(row ? JSON.parse(row.json) : null);
});

app.put('/api/state', (req, res) => {
  upsertState.run(JSON.stringify(req.body ?? {}), Date.now());
  res.json({ ok: true });
});

app.get('/api/writing', (_req, res) => res.json(listWriting.all()));

app.post('/api/writing', (req, res) => {
  const b = req.body ?? {};
  const row = {
    date: String(b.date || new Date().toISOString().slice(0, 10)),
    task: b.task ?? null,
    band_tr: b.band_tr ?? null, band_cc: b.band_cc ?? null,
    band_lr: b.band_lr ?? null, band_gra: b.band_gra ?? null,
    band_overall: b.band_overall ?? null,
    note: b.note ?? null,
    created_at: Date.now(),
  };
  const out = insertWriting.run(row);
  res.json({ ok: true, id: out.lastInsertRowid });
});

app.listen(PORT, '0.0.0.0', () => console.log(`gieo-api on :${PORT} · db=${DB_PATH}`));
