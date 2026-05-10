// Student · Lịch tuần — week as 7 vertical hour-spines.
function ScheduleScreen({ Nav }) {
  const T = window.T, F = window.FONTS;
  const startHour = 8;
  const hours = Array.from({ length: 14 }).map((_, i) => i + startHour);
  const blockH = 38;

  return (
    <div style={{ width: 1280, height: 820, background: T.bg, color: T.ink, fontFamily: F.body, fontSize: 13, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Nav label="02 · Schedule / Lịch tuần" current="schedule" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '20px 28px 14px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1px solid ${T.rule}` }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: T.coral, letterSpacing: '0.1em', textTransform: 'uppercase' }}>tuần 19 · w19</div>
            <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 500, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.02em' }}>
              06 / 05  →  12 / 05 · <span style={{ color: T.mute }}>11 lớp · 16,5 giờ</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, fontFamily: F.mono, fontSize: 11, alignItems: 'center' }}>
            <button style={{ padding: '6px 10px', border: `1px solid ${T.hair}`, background: T.bg, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>← W18</button>
            <span style={{ padding: '6px 14px', background: T.ink, color: T.bg, fontWeight: 600 }}>Hôm nay</span>
            <button style={{ padding: '6px 10px', border: `1px solid ${T.hair}`, background: T.bg, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>W20 →</button>
            <span style={{ width: 1, height: 18, background: T.hair, margin: '0 8px' }} />
            <span style={{ color: T.mute }}>NGÀY</span>
            <span style={{ background: T.coral, color: T.bg, padding: '6px 12px', fontWeight: 600 }}>TUẦN</span>
            <span style={{ color: T.mute }}>THÁNG</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', minHeight: 0, position: 'relative' }}>
          <div style={{ borderRight: `1px solid ${T.rule}`, position: 'relative', paddingTop: 64 }}>
            {hours.map(h => (
              <div key={h} style={{ height: blockH, position: 'relative' }}>
                <span style={{ position: 'absolute', right: 8, top: -7, background: T.bg, fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.04em', padding: '0 4px' }}>
                  {String(h).padStart(2, '0')}h
                </span>
              </div>
            ))}
          </div>

          {window.LAGED_DAYS.map((d, di) => (
            <div key={d.code} style={{ borderRight: di === 6 ? 'none' : `1px solid ${T.hair}`, position: 'relative' }}>
              <div style={{ padding: '14px 16px', borderBottom: `1.5px solid ${d.today ? T.coral : T.rule}`, background: d.today ? T.paper : 'transparent', height: 64, boxSizing: 'border-box' }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.12em', color: d.today ? T.coral : T.mute, textTransform: 'uppercase' }}>{d.code}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                  <span style={{ fontFamily: F.display, fontSize: 24, fontWeight: 500, lineHeight: 1, color: d.today ? T.ink : T.ink2 }}>{d.date}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>{d.full.replace('Thứ ', 'T')}</span>
                </div>
              </div>

              <div style={{ position: 'relative', height: hours.length * blockH }}>
                {hours.map((_, i) => (
                  <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * blockH, height: 1, background: i % 2 === 0 ? T.hair : 'rgba(31,27,22,0.04)' }} />
                ))}

                {window.LAGED_WEEK_GRID.filter(g => g.d === di).map((g, gi) => {
                  const top = (g.s - startHour) * blockH;
                  const h = g.len * blockH - 4;
                  const past = d.today && g.s + g.len < 14.53;
                  return (
                    <div key={gi} style={{
                      position: 'absolute', left: 4, right: 4, top, height: h,
                      background: T.bg,
                      borderLeft: `4px solid ${g.color}`,
                      borderTop: `1px solid ${T.hair}`,
                      borderRight: `1px solid ${T.hair}`,
                      borderBottom: `1px solid ${T.hair}`,
                      padding: '5px 8px', overflow: 'hidden', opacity: past ? 0.5 : 1,
                    }}>
                      <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.04em' }}>
                        {Math.floor(g.s)}:{(g.s % 1) ? '30' : '00'}
                      </div>
                      <div style={{ fontFamily: F.display, fontSize: 12, fontWeight: 500, color: T.ink, marginTop: 2, lineHeight: 1.15 }}>{g.subject}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, marginTop: 2 }}>{g.teacher.replace('Ms. ', '').replace('Mr. ', '')}</div>
                    </div>
                  );
                })}

                {d.today && (
                  <div style={{ position: 'absolute', left: -2, right: -2, top: (14.53 - startHour) * blockH, display: 'flex', alignItems: 'center', zIndex: 5 }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: T.coral, border: `2px solid ${T.bg}` }} />
                    <div style={{ flex: 1, height: 1.5, background: T.coral }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderTop: `1px solid ${T.rule}`, background: T.paper }}>
          <div style={{ borderRight: `1px solid ${T.rule}`, padding: '8px 8px 8px 0', textAlign: 'right' }}>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>tổng</span>
          </div>
          {[1.5, 3.5, 3, 1.5, 3, 3.5, 3].map((tot, di) => (
            <div key={di} style={{ borderRight: di === 6 ? 'none' : `1px solid ${T.hair}`, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>{tot}h</span>
              <div style={{ display: 'flex', gap: 2 }}>
                {window.LAGED_WEEK_GRID.filter(g => g.d === di).map((g, gi) => (
                  <div key={gi} style={{ width: 12, height: 4, background: g.color, borderRadius: 1 }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.ScheduleScreen = ScheduleScreen;
