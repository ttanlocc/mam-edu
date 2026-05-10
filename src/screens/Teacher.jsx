// Teacher dashboard — Ms. Hà Linh quản lý lớp IELTS Speaking.
function TeacherScreen({ RoleHeader }) {
  const T = window.T, F = window.FONTS;
  const roster = [
    { id: 1, name: 'Nguyễn Minh Anh',   av: 'MA', c: T.coral,  attend: 'present', score: 8.5, hwDone: 5, hwTotal: 6, note: 'Note-taking tốt' },
    { id: 2, name: 'Trần Bảo Châu',     av: 'BC', c: T.sage,   attend: 'present', score: 7.5, hwDone: 4, hwTotal: 6 },
    { id: 3, name: 'Lê Hoàng Long',     av: 'HL', c: T.sky,    attend: 'late',    score: 7.0, hwDone: 3, hwTotal: 6, note: 'Đến muộn 12p' },
    { id: 4, name: 'Phạm Diệu Linh',    av: 'DL', c: T.butter, attend: 'present', score: 9.0, hwDone: 6, hwTotal: 6, note: 'Top performer' },
    { id: 5, name: 'Vũ Anh Khôi',       av: 'AK', c: T.brick,  attend: 'absent',  score: 6.5, hwDone: 2, hwTotal: 6, note: 'Đã báo nghỉ ốm' },
    { id: 6, name: 'Đặng Thu Hà',       av: 'TH', c: '#9C7AB7', attend: 'present', score: 7.5, hwDone: 4, hwTotal: 6 },
    { id: 7, name: 'Hoàng Tuấn Minh',   av: 'TM', c: '#5BA38A', attend: 'present', score: 8.0, hwDone: 5, hwTotal: 6 },
    { id: 8, name: 'Bùi Hà My',         av: 'HM', c: '#D08F5C', attend: 'pending', score: null, hwDone: 4, hwTotal: 6 },
  ];

  return (
    <div style={{ width: 1280, height: 820, background: T.bg, color: T.ink, fontFamily: F.body, fontSize: 13, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <RoleHeader role="teacher" label="IELTS Speaking · B2 → C1 · Lớp 17:00 hôm nay" name="HL" avatarBg={T.coral} />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '300px 1fr 320px', minHeight: 0 }}>
        <aside style={{ background: T.paper, borderRight: `1px solid ${T.rule}`, padding: '20px 22px', overflow: 'auto' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: T.coral, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Lớp của tôi · 4</div>
          {[
            { code: 'IELTS-S2',     name: 'IELTS Speaking',    sub: 'B2 → C1 · 8 HS · Hôm nay 17:00', active: true },
            { code: 'IELTS-W1',     name: 'Writing Task 2',    sub: 'B2 · 10 HS · T5 17:00', active: false },
            { code: 'IELTS-FOUND',  name: 'IELTS Foundation',  sub: 'A2 → B1 · 12 HS · T7 09:00', active: false },
            { code: 'PRIVATE-MA',   name: 'Riêng · Minh Anh',  sub: '1-1 · CN 10:00', active: false },
          ].map((c, i) => (
            <div key={i} style={{ padding: '12px 14px', marginTop: 8, background: c.active ? T.bg : 'transparent', border: c.active ? `2px solid ${T.ink}` : `1px solid ${T.hair}`, cursor: 'pointer' }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: T.coral, letterSpacing: '0.1em' }}>{c.code}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{c.name}</div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, marginTop: 2 }}>{c.sub}</div>
            </div>
          ))}

          <div style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Hôm nay · 14:32</div>
            <div style={{ padding: '10px 12px', background: T.bg, border: `1px solid ${T.hair}`, borderLeft: `3px solid ${T.coral}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: T.coral, letterSpacing: '0.1em' }}>SẮP DẠY · 2g 28p</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>IELTS Speaking</div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, marginTop: 2 }}>17:00–18:30 · P.204</div>
              <button style={{ marginTop: 8, width: '100%', background: T.coral, color: T.bg, border: 0, padding: '7px', fontFamily: F.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>BẮT ĐẦU LỚP →</button>
            </div>
          </div>
        </aside>

        <main style={{ padding: '20px 26px', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: T.coral, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Roster · 8 học sinh</div>
              <div style={{ fontSize: 26, fontWeight: 500, marginTop: 4, letterSpacing: '-0.02em' }}>IELTS Speaking · B2 → C1</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Roster', 'Điểm danh', 'Bài tập', 'Điểm', 'Tài liệu'].map((t, i) => (
                <span key={t} style={{ padding: '6px 12px', fontFamily: F.mono, fontSize: 11, letterSpacing: '0.04em', cursor: 'pointer', background: i === 0 ? T.ink : 'transparent', color: i === 0 ? T.bg : T.ink2, border: i === 0 ? 'none' : `1px solid ${T.hair}` }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 16 }}>
            {[['CÓ MẶT', 6, T.sage], ['MUỘN', 1, T.butter], ['VẮNG', 1, T.brick], ['CHƯA ĐIỂM DANH', 0, T.mute]].map(([l, n, c], i) => (
              <div key={i} style={{ padding: '10px 14px', background: '#fff', borderTop: `3px solid ${c}`, border: `1px solid ${T.hair}` }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
                <div style={{ fontSize: 24, fontWeight: 500, color: c, marginTop: 4, lineHeight: 1 }}>{n}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, background: '#fff', border: `1px solid ${T.hair}`, flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 110px 130px 120px', padding: '10px 14px', borderBottom: `1px solid ${T.hair}`, fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', background: T.paper }}>
              <span></span><span>Học sinh</span><span>Điểm danh</span><span>Điểm TB</span><span>Bài tập</span><span style={{ textAlign: 'right' }}>Thao tác</span>
            </div>
            {roster.map((s, i) => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 110px 130px 120px', padding: '12px 14px', borderBottom: i === roster.length - 1 ? 'none' : `1px solid ${T.hair}`, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, background: s.c, color: T.bg, borderRadius: 8, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 11 }}>{s.av}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                  {s.note && <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, marginTop: 2 }}>{s.note}</div>}
                </div>
                <div>
                  <span style={{ padding: '3px 8px', fontFamily: F.mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: s.attend === 'present' ? T.sage : s.attend === 'late' ? T.butter : s.attend === 'absent' ? T.brick : T.hair, color: s.attend === 'pending' ? T.ink : T.bg, fontWeight: 600 }}>
                    {s.attend === 'present' ? '✓ Có mặt' : s.attend === 'late' ? '⚠ Muộn' : s.attend === 'absent' ? '✕ Vắng' : '— Chưa'}
                  </span>
                </div>
                <div style={{ fontFamily: F.body, fontSize: 16, fontWeight: 600, color: s.score >= 8 ? T.sage : s.score ? T.ink : T.mute }}>{s.score ? s.score.toFixed(1) : '—'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: T.hair, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, width: `${(s.hwDone / s.hwTotal) * 100}%`, background: s.hwDone === s.hwTotal ? T.sage : T.coral }} />
                  </div>
                  <span style={{ fontFamily: F.mono, fontSize: 10 }}>{s.hwDone}/{s.hwTotal}</span>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                  <button style={{ padding: '4px 8px', background: 'transparent', border: `1px solid ${T.hair}`, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.06em', cursor: 'pointer' }}>✎ chấm</button>
                  <button style={{ padding: '4px 8px', background: 'transparent', border: `1px solid ${T.hair}`, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.06em', cursor: 'pointer' }}>✉ PH</button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside style={{ borderLeft: `1px solid ${T.rule}`, padding: '20px 22px', overflow: 'auto' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: T.coral, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Hàng đợi chấm · 7</div>
          {[
            { who: 'Minh Anh',    av: 'MA', c: T.coral,  type: 'AUDIO', task: 'Speaking Part 2 · cue card', when: '2g trước', urgent: true },
            { who: 'Bảo Châu',    av: 'BC', c: T.sage,   type: 'AUDIO', task: 'Speaking Part 2',           when: '4g trước' },
            { who: 'Diệu Linh',   av: 'DL', c: T.butter, type: 'ESSAY', task: 'Writing T2 · technology',   when: 'Hôm qua' },
            { who: 'Hoàng Long',  av: 'HL', c: T.sky,    type: 'AUDIO', task: 'Speaking Part 1',           when: '2 ngày' },
          ].map((q, i) => (
            <div key={i} style={{ padding: '12px 14px', marginTop: 8, background: i === 0 ? T.bg : 'transparent', border: `1px solid ${T.hair}`, borderLeft: q.urgent ? `3px solid ${T.coral}` : `1px solid ${T.hair}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, background: q.c, color: T.bg, borderRadius: 8, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 10 }}>{q.av}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{q.who}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute }}>{q.type} · {q.when}</div>
                </div>
                {q.urgent && <span style={{ fontFamily: F.mono, fontSize: 8, color: T.coral, letterSpacing: '0.1em' }}>● MỚI</span>}
              </div>
              <div style={{ fontSize: 11, color: T.ink2, marginTop: 6 }}>{q.task}</div>
              <button style={{ marginTop: 6, width: '100%', background: i === 0 ? T.ink : 'transparent', color: i === 0 ? T.bg : T.ink, border: i === 0 ? 'none' : `1px solid ${T.ink}`, padding: '6px', fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', cursor: 'pointer' }}>CHẤM →</button>
            </div>
          ))}

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Hành động nhanh</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {['Giao bài tập', 'Upload tài liệu', 'Nhập điểm', 'Gửi PH', 'Tạo lớp bù', 'Báo cáo lớp'].map(a => (
                <button key={a} style={{ padding: '10px 8px', background: T.bg, border: `1px solid ${T.hair}`, fontFamily: F.body, fontSize: 11, fontWeight: 500, color: T.ink, cursor: 'pointer' }}>+ {a}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
window.TeacherScreen = TeacherScreen;
