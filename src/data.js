// Shared seed data — IELTS Foundation persona Minh Anh, 14yo.
window.LAGED_DATA = {
  student: {
    name: 'Nguyễn Minh Anh', nick: 'Minh Anh',
    grade: 'Lớp 8 · IELTS Foundation', avatar: 'MA',
    streak: 14, band: 6.5, target: 7.5, centerCode: 'LAGED-2401',
  },
  today: { dow: 'Thứ Tư', date: '08', month: 'Tháng 05', year: '2026' },

  classes: [
    { id: 'c1', code: 'IELTS-S2', subject: 'IELTS Speaking', level: 'B2 → C1', teacher: 'Ms. Hà Linh', room: 'Phòng 204 · Cs. Cầu Giấy', start: '17:00', end: '18:30', day: 'Hôm nay', status: 'upcoming', color: '#7C9885' },
    { id: 'c2', code: 'GRM-B2', subject: 'Grammar Intensive', level: 'B2', teacher: 'Mr. James W.', room: 'Phòng 109', start: '19:00', end: '20:30', day: 'Hôm nay', status: 'upcoming', color: '#22241F' },
    { id: 'c3', code: 'IELTS-W1', subject: 'IELTS Writing Task 2', level: 'B2', teacher: 'Ms. Hà Linh', room: 'Online · Zoom', start: '17:00', end: '18:30', day: 'Thứ Năm', status: 'scheduled', color: '#8FA89A' },
    { id: 'c4', code: 'IELTS-L1', subject: 'IELTS Listening Lab', level: 'B2', teacher: 'Mr. James W.', room: 'Lab 3', start: '15:30', end: '17:00', day: 'Thứ Sáu', status: 'scheduled', color: '#D9C58E' },
    { id: 'c5', code: 'IELTS-R1', subject: 'IELTS Reading Workshop', level: 'B2', teacher: 'Ms. Phương Mai', room: 'Phòng 204', start: '09:00', end: '11:00', day: 'Thứ Bảy', status: 'scheduled', color: '#9DB1C6' },
    { id: 'c6', code: 'IELTS-MOCK', subject: 'Mock Test #4', level: 'Full', teacher: 'Hội đồng', room: 'Hội trường A', start: '14:00', end: '17:00', day: 'CN', status: 'exam', color: '#C28872' },
  ],

  homework: [
    { id: 'h1', title: 'Speaking Part 2: Describe a person who inspires you', cls: 'IELTS Speaking', type: 'audio', due: 'Tối nay · 23:59', dueIn: 6, status: 'in-progress', progress: 60, points: 10, attachments: 2 },
    { id: 'h2', title: 'Writing Task 2 — Technology essay', cls: 'IELTS Writing', type: 'essay', due: 'Mai · 18:00', dueIn: 22, status: 'not-started', progress: 0, points: 20, attachments: 1, words: '0 / 250' },
    { id: 'h3', title: 'Cambridge 17 — Test 3 Reading', cls: 'IELTS Reading', type: 'reading', due: 'Thứ Năm · 09:00', dueIn: 38, status: 'not-started', progress: 0, points: 15, attachments: 3 },
    { id: 'h4', title: 'Grammar Drill — Conditionals (mixed)', cls: 'Grammar B2', type: 'quiz', due: 'Thứ Sáu', dueIn: 70, status: 'not-started', progress: 0, points: 8, attachments: 0 },
    { id: 'h5', title: 'Vocab Set 12 — Environment', cls: 'IELTS Foundation', type: 'flashcards', due: 'Đã nộp', dueIn: -2, status: 'submitted', progress: 100, points: 10, score: '9 / 10', attachments: 0 },
    { id: 'h6', title: 'Listening Section 4 — Lecture notes', cls: 'IELTS Listening', type: 'audio', due: 'Đã chấm', dueIn: -5, status: 'graded', progress: 100, points: 10, score: '8.5 / 10', feedback: 'Note-taking tốt, chú ý paraphrase', attachments: 0 },
  ],

  progress: {
    skills: [
      { name: 'Listening', score: 7.0, target: 7.5, delta: '+0.5' },
      { name: 'Reading',   score: 6.5, target: 7.5, delta: '+0.0' },
      { name: 'Writing',   score: 6.0, target: 7.0, delta: '+0.5' },
      { name: 'Speaking',  score: 6.5, target: 7.5, delta: '+1.0' },
    ],
    attendance: 0.94, completion: 0.78,
  },
};

window.LAGED_DAYS = [
  { code: 'T2', full: 'Thứ Hai',  date: '06' },
  { code: 'T3', full: 'Thứ Ba',   date: '07' },
  { code: 'T4', full: 'Thứ Tư',   date: '08', today: true },
  { code: 'T5', full: 'Thứ Năm',  date: '09' },
  { code: 'T6', full: 'Thứ Sáu',  date: '10' },
  { code: 'T7', full: 'Thứ Bảy',  date: '11' },
  { code: 'CN', full: 'Chủ Nhật', date: '12' },
];

window.LAGED_WEEK_GRID = [
  { d: 0, s: 17,   len: 1.5, subject: 'Grammar B2',     teacher: 'Mr. James W.',    color: '#22241F' },
  { d: 1, s: 9,    len: 2,   subject: 'Writing Lab',    teacher: 'Ms. Hà Linh',     color: '#8FA89A' },
  { d: 1, s: 17,   len: 1.5, subject: 'IELTS Speaking', teacher: 'Ms. Hà Linh',     color: '#7C9885' },
  { d: 2, s: 17,   len: 1.5, subject: 'IELTS Speaking', teacher: 'Ms. Hà Linh',     color: '#7C9885', today: true },
  { d: 2, s: 19,   len: 1.5, subject: 'Grammar B2',     teacher: 'Mr. James W.',    color: '#22241F', today: true },
  { d: 3, s: 17,   len: 1.5, subject: 'Writing Task 2', teacher: 'Ms. Hà Linh',     color: '#8FA89A' },
  { d: 4, s: 15.5, len: 1.5, subject: 'Listening Lab',  teacher: 'Mr. James W.',    color: '#D9C58E' },
  { d: 4, s: 19,   len: 1.5, subject: 'Grammar B2',     teacher: 'Mr. James W.',    color: '#22241F' },
  { d: 5, s: 9,    len: 2,   subject: 'IELTS Reading',  teacher: 'Ms. Phương Mai',  color: '#9DB1C6' },
  { d: 5, s: 15,   len: 1.5, subject: 'IELTS Speaking', teacher: 'Ms. Hà Linh',     color: '#7C9885' },
  { d: 6, s: 14,   len: 3,   subject: 'MOCK TEST #4',   teacher: 'Hội đồng',        color: '#C28872' },
];
