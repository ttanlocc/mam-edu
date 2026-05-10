// Mobile dashboard — Soft & Clean, 390×844 iPhone frame.
function MobileScreen() {
  const T = window.T, F = window.FONTS;
  const mono = F.mono;
  const accent = T.coral, sec = '#A88B6E', butter = T.butter;

  const items = [
    { t: '15:30', title: 'Vocab Set 12', sub: 'Flashcards · 10p', kind: 'TASK', color: sec, now: true },
    { t: '17:00', title: 'IELTS Speaking', sub: 'Ms. Hà Linh · P.204', kind: 'CLASS', color: accent, big: true },
    { t: '19:00', title: 'Grammar B2', sub: 'Mr. James · P.109', kind: 'CLASS', color: T.ink },
    { t: '21:00', title: 'Nộp Speaking HW', sub: 'Hạn 23:59 · 60% đã ghi', kind: 'DUE', color: butter },
  ];

  return (
    <div style={{
      width: 390, height: 844, background: T.bg, color: T.ink,
      fontFamily: F.body, fontSize: 13, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      borderRadius: 44, border: `8px solid ${T.ink}`, boxShadow: '0 30px 80px rgba(34,36,31,0.18)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 22px 6px', fontFamily: mono, fontSize: 12, fontWeight: 600 }}>
        <span>14:32</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>● ● ● <span style={{ fontSize: 11 }}>92%</span></span>
      </div>

      <div style={{ padding: '8px 22px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, color: accent, letterSpacing: '0.16em', textTransform: 'uppercase' }}>laged<span style={{ color: T.ink2 }}>/</span>edu</div>
          <div style={{ fontSize: 11, color: T.mute, marginTop: 2 }}>Hi Minh Anh ✦</div>
        </div>
        <div style={{ width: 36, height: 36, background: T.ink, color: T.bg, borderRadius: 12, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>MA</div>
      </div>

      <div style={{ padding: '0 22px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontSize: 88, fontWeight: 300, lineHeight: 0.85, letterSpacing: '-0.04em' }}>08</div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em' }}>THỨ TƯ</div>
            <div style={{ fontFamily: mono, fontSize: 11, color: T.mute, letterSpacing: '0.1em' }}>05 · 2026</div>
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 14, color: T.ink2, lineHeight: 1.45 }}>
          2 lớp · 1 bài Speaking nộp tối nay · cô Hà Linh nhắn 11:42
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '14px 22px' }}>
        {[['14d', 'streak', accent], ['6.5', 'band', sec], ['78%', 'done', butter]].map(([n, l, c], i) => (
          <div key={i} style={{ flex: 1, padding: '10px 12px', background: c, color: i === 2 ? T.ink : T.bg, borderRadius: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
            <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4, opacity: 0.85 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0, padding: '4px 22px 14px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: T.mute, letterSpacing: '0.12em', textTransform: 'uppercase' }}>SPINE · Hôm nay</div>
          <div style={{ fontFamily: mono, fontSize: 10, color: accent }}>● 14:32</div>
        </div>

        <div style={{ position: 'relative', paddingLeft: 50 }}>
          <div style={{ position: 'absolute', left: 50, top: 0, bottom: 0, width: 2, background: T.hair }} />

          {items.map((it, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 10 }}>
              <div style={{ position: 'absolute', left: -50, top: 14, fontFamily: mono, fontSize: 10, color: T.mute, width: 38, textAlign: 'right' }}>{it.t}</div>
              <div style={{ position: 'absolute', left: -2, top: 14, width: 10, height: 10, borderRadius: '50%', background: it.color, border: `2px solid ${T.bg}`, boxShadow: it.now ? `0 0 0 4px ${it.color}33` : 'none' }} />
              <div style={{ marginLeft: 16, padding: it.big ? '12px 14px' : '8px 12px', background: '#fff', borderRadius: 14, borderLeft: `4px solid ${it.color}`, boxShadow: it.big ? `0 4px 14px ${T.ink}11` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', color: it.color }}>{it.kind}</span>
                  {it.now && <span style={{ fontFamily: mono, fontSize: 8, color: accent }}>· NOW</span>}
                </div>
                <div style={{ fontSize: it.big ? 16 : 13, fontWeight: 600, lineHeight: 1.2, color: T.ink }}>{it.title}</div>
                <div style={{ fontSize: 11, color: T.mute, marginTop: 2 }}>{it.sub}</div>
                {it.big && (
                  <button style={{ marginTop: 10, background: it.color, color: T.bg, border: 0, padding: '8px 14px', borderRadius: 10, fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>
                    MỞ PHIẾU →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '0 14px 18px', padding: '10px 6px', background: T.ink, color: T.bg, borderRadius: 24, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {[
          { i: '◉', l: 'Hôm nay', a: true },
          { i: '▤', l: 'Lịch' },
          { i: '✎', l: 'Bài tập' },
          { i: '◇', l: 'Tài liệu' },
          { i: '✦', l: 'Trò chuyện' },
        ].map((t, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 12px', borderRadius: 14,
            background: t.a ? accent : 'transparent',
            color: t.a ? T.ink : T.bg,
          }}>
            <span style={{ fontSize: 14 }}>{t.i}</span>
            <span style={{ fontSize: 9, fontFamily: mono, letterSpacing: '0.04em' }}>{t.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
window.MobileScreen = MobileScreen;
