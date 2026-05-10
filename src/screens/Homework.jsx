// Student · Bài tập — pipeline spine grouped by status.
function HomeworkScreen({ Nav }) {
  const T = window.T, F = window.FONTS;
  const D = window.LAGED_DATA;

  const sections = [
    { key: 'doing', label: 'ĐANG LÀM', color: T.coral, items: D.homework.filter(h => h.status === 'in-progress') },
    { key: 'next',  label: 'SẮP TỚI', color: T.ink,   items: D.homework.filter(h => h.status === 'not-started') },
    { key: 'done',  label: 'ĐÃ NỘP / ĐÃ CHẤM', color: T.sage, items: D.homework.filter(h => h.status === 'submitted' || h.status === 'graded') },
  ];

  return (
    <div style={{ width: 1280, height: 820, background: T.bg, color: T.ink, fontFamily: F.body, fontSize: 13, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Nav label="03 · Homework / Bài tập" current="homework" />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 0 }}>
        <aside style={{ borderRight: `1px solid ${T.rule}`, background: T.paper, padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.16em', color: T.coral, textTransform: 'uppercase' }}>Pipeline · 03</div>
          <div style={{ fontFamily: F.display, fontSize: 40, fontWeight: 500, lineHeight: 1, marginTop: 14, letterSpacing: '-0.02em' }}>
            6 bài.<br/>
            <span style={{ color: T.coral }}>1 đang làm.</span><br/>
            <span style={{ color: T.mute }}>3 chưa bắt đầu.</span>
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Lịch hạn nộp · 7 ngày</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {window.LAGED_DAYS.map((d, i) => {
                const due = i === 2 || i === 3 || i === 4 || i === 5;
                return (
                  <div key={d.code} style={{ padding: '8px 4px', textAlign: 'center', background: d.today ? T.ink : T.bg, color: d.today ? T.bg : T.ink, border: `1px solid ${T.hair}` }}>
                    <div style={{ fontFamily: F.mono, fontSize: 8, letterSpacing: '0.08em', opacity: 0.7 }}>{d.code}</div>
                    <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 500, lineHeight: 1.1 }}>{d.date}</div>
                    {due && <div style={{ width: 6, height: 6, background: T.coral, borderRadius: '50%', margin: '4px auto 0' }} />}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 28, padding: '14px 16px', background: T.bg, border: `1px solid ${T.hair}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Điểm trung bình</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontFamily: F.display, fontSize: 36, fontWeight: 500, color: T.ink }}>8.7</span>
              <span style={{ fontSize: 12, color: T.mute }}>/ 10 · ↑ 0.5 so với tháng 04</span>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Lọc</div>
            {['Tất cả · 6', 'IELTS Speaking · 1', 'IELTS Writing · 1', 'IELTS Reading · 1', 'Grammar B2 · 1'].map((f, i) => (
              <div key={f} style={{ padding: '7px 10px', fontSize: 12, background: i === 0 ? T.ink : 'transparent', color: i === 0 ? T.bg : T.ink2, fontFamily: F.mono, letterSpacing: '0.04em', marginBottom: 2, cursor: 'pointer' }}>{f}</div>
            ))}
          </div>
        </aside>

        <main style={{ position: 'relative', overflow: 'auto', padding: '24px 32px' }}>
          <div style={{ position: 'absolute', left: 56, top: 24, bottom: 24, width: 2, background: T.rule }} />

          {sections.map(sec => (
            <div key={sec.key} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10, paddingLeft: 28, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 56, top: '50%', transform: 'translate(-50%, -50%)', width: 14, height: 14, background: sec.color, borderRadius: '50%', border: `3px solid ${T.bg}`, zIndex: 2 }} />
                <span style={{ marginLeft: 56, fontFamily: F.mono, fontSize: 11, letterSpacing: '0.16em', color: sec.color, fontWeight: 700 }}>{sec.label}</span>
                <span style={{ flex: 1, height: 1, background: T.hair }} />
                <span style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>{sec.items.length} bài</span>
              </div>

              {sec.items.map((h) => (
                <div key={h.id} style={{ position: 'relative', marginLeft: 88, marginBottom: 10, padding: '14px 18px', background: '#fff', border: `1px solid ${T.hair}`, borderLeft: `4px solid ${sec.color}` }}>
                  <div style={{ position: 'absolute', left: -36, top: 22, width: 28, height: 1, background: T.rule }} />
                  <div style={{ position: 'absolute', left: -40, top: 18, width: 8, height: 8, background: T.bg, border: `1.5px solid ${sec.color}`, borderRadius: '50%' }} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontFamily: F.mono, fontSize: 9, padding: '2px 6px', background: T.paper, color: T.ink2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h.type}</span>
                        <span style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>{h.cls}</span>
                        <span style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>· {h.points} điểm</span>
                      </div>
                      <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 500, color: T.ink, lineHeight: 1.3 }}>{h.title}</div>
                      {h.feedback && <div style={{ marginTop: 6, fontSize: 12, color: T.ink2, fontStyle: 'italic' }}>"{h.feedback}" — Ms. Hà Linh</div>}
                      {h.words && <div style={{ marginTop: 6, fontFamily: F.mono, fontSize: 11, color: T.mute }}>đã viết: {h.words}</div>}
                      {h.status === 'in-progress' && (
                        <div style={{ marginTop: 8, height: 4, background: T.hair, position: 'relative' }}>
                          <div style={{ position: 'absolute', inset: 0, width: `${h.progress}%`, background: T.coral }} />
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 140 }}>
                      <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Hạn</div>
                      <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 500, color: h.dueIn > 0 && h.dueIn < 12 ? T.coral : T.ink, marginTop: 2 }}>{h.due}</div>
                      {h.score && <div style={{ marginTop: 8, fontFamily: F.display, fontSize: 22, fontWeight: 500, color: T.sage }}>{h.score}</div>}
                      {h.status === 'in-progress' && (
                        <button style={{ marginTop: 8, background: T.coral, color: T.bg, border: 0, padding: '6px 12px', fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Tiếp tục →</button>
                      )}
                      {h.status === 'not-started' && (
                        <button style={{ marginTop: 8, background: 'transparent', color: T.ink, border: `1px solid ${T.ink}`, padding: '6px 12px', fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Bắt đầu</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
window.HomeworkScreen = HomeworkScreen;
