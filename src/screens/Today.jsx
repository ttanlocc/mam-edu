// Student · Today / Hôm nay — vertical hour-spine.
function TodayScreen({ Nav }) {
  const T = window.T, F = window.FONTS;
  const startHour = 7;
  const hours = Array.from({ length: 16 }).map((_, i) => i + startHour);
  const blockH = 64;

  const todayItems = [
    { type: 'class', s: 17, len: 1.5, title: 'IELTS Speaking · Part 2', sub: 'Ms. Hà Linh · P. 204 · 17:00–18:30', color: T.coral, kind: 'CLASS', extra: 'Cue card · 3 ý cần chuẩn bị', cta: 'Mở phiếu' },
    { type: 'class', s: 19, len: 1.5, title: 'Grammar B2 · Mixed conditionals', sub: 'Mr. James W. · P. 109 · 19:00–20:30', color: T.ink, kind: 'CLASS', extra: '— P.109 thay đổi từ P.110 hôm nay' },
    { type: 'task',  s: 15, len: 0.5, title: 'Vocab Set 12 · Environment', sub: '10 phút · Flashcards', color: T.sage, kind: 'TASK' },
    { type: 'task',  s: 16, len: 0.5, title: 'Chuẩn bị 3 ý cue card', sub: 'Trước lớp Speaking', color: T.butter, kind: 'PREP' },
    { type: 'due',   s: 21, len: 0.4, title: 'Speaking HW · nộp ghi âm', sub: 'Hạn 23:59 · 60% đã ghi', color: T.brick, kind: 'DUE' },
  ];

  return (
    <div style={{ width: 1280, height: 820, background: T.bg, color: T.ink, fontFamily: F.body, fontSize: 13, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Nav label="01 · Today / Hôm nay" current="today" />

      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        {/* left rail */}
        <aside style={{ width: 320, padding: '24px 28px', borderRight: `1px solid ${T.rule}`, background: T.paper, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.16em', color: T.coral, textTransform: 'uppercase' }}>Trang cá nhân · 01</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 14 }}>
            <span style={{ fontFamily: F.display, fontSize: 96, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.85 }}>08</span>
            <div style={{ paddingBottom: 6 }}>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: T.ink2, letterSpacing: '0.08em' }}>THỨ TƯ</div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: T.mute, letterSpacing: '0.08em' }}>THÁNG 05 · 2026</div>
            </div>
          </div>
          <div style={{ fontFamily: F.body, fontSize: 14, color: T.ink2, marginTop: 18, lineHeight: 1.55 }}>
            Chào Minh Anh. Hôm nay <strong>2 lớp</strong>, <strong>1 bài Speaking</strong> phải nộp trước 23:59. Cô Hà Linh để lại lời nhắn 11:42.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 24, paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
            {[['14d', 'streak', T.coral], ['6.5', 'band', T.ink], ['78%', 'hoàn tất', T.sage]].map(([n, l, c]) => (
              <div key={l}>
                <div style={{ fontFamily: F.display, fontSize: 28, fontWeight: 500, color: c, lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.1em', color: T.mute, textTransform: 'uppercase', marginBottom: 10 }}>Chú giải spine</div>
            {[['CLASS · lớp học', T.coral], ['TASK · việc cần làm', T.sage], ['PREP · chuẩn bị', T.butter], ['DUE · hạn nộp', T.brick]].map(([n, c]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: T.ink2, padding: '5px 0' }}>
                <div style={{ width: 12, height: 4, background: c }} />
                <span style={{ fontFamily: F.mono }}>{n}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.1em', color: T.mute, textTransform: 'uppercase', marginBottom: 10 }}>Hôm nay · 11:42</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 28, height: 28, background: T.coral, color: T.bg, borderRadius: 8, display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 11 }}>HL</div>
              <div style={{ flex: 1, fontSize: 12, lineHeight: 1.45, color: T.ink2 }}>
                <strong style={{ color: T.ink }}>Ms. Hà Linh:</strong> nhớ chuẩn bị 3 ý cho cue card "a person who inspires you" trước 17:00 nhé.
              </div>
            </div>
          </div>
        </aside>

        {/* spine */}
        <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', borderBottom: `1px solid ${T.rule}` }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <span style={{ fontFamily: F.display, fontSize: 22, fontWeight: 500 }}>Trục thời gian / spine</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: T.mute }}>07:00 → 22:00 · 15 giờ</span>
            </div>
            <div style={{ display: 'flex', gap: 6, fontFamily: F.mono, fontSize: 11 }}>
              {['Hôm qua', 'Hôm nay', 'Mai', 'Tuần'].map((v, i) => (
                <span key={v} style={{ padding: '5px 12px', borderRadius: 4, cursor: 'pointer', background: i === 1 ? T.ink : 'transparent', color: i === 1 ? T.bg : T.ink2, border: i === 1 ? 'none' : `1px solid ${T.hair}` }}>{v}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr 280px', position: 'relative', height: 'calc(100% - 53px)', overflow: 'auto' }}>
            <div style={{ position: 'relative', borderRight: `1px solid ${T.rule}`, paddingTop: 18 }}>
              {hours.map(h => (
                <div key={h} style={{ position: 'relative', height: blockH, fontFamily: F.mono, paddingRight: 14, textAlign: 'right', color: h === 14 ? T.coral : T.mute, fontSize: 11, letterSpacing: '0.04em' }}>
                  <span style={{ position: 'absolute', right: 14, top: -7, background: T.bg, padding: '0 4px', fontWeight: h === 14 ? 700 : 400 }}>
                    {String(h).padStart(2, '0')}:00
                  </span>
                </div>
              ))}
            </div>

            <div style={{ position: 'relative', padding: '18px 24px 18px 0' }}>
              {hours.map((h, i) => (
                <div key={h} style={{ position: 'absolute', left: -1, right: 0, top: 18 + i * blockH, height: 1, background: T.hair }} />
              ))}
              <div style={{ position: 'absolute', left: -8, right: 0, top: 18 + (14.53 - startHour) * blockH, display: 'flex', alignItems: 'center', zIndex: 5 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: T.coral, border: `2px solid ${T.bg}` }} />
                <div style={{ flex: 1, height: 1.5, background: T.coral, position: 'relative' }}>
                  <div style={{ position: 'absolute', right: 8, top: -22, fontFamily: F.mono, fontSize: 10, color: T.coral, letterSpacing: '0.08em', background: T.bg, padding: '2px 6px' }}>
                    ── BÂY GIỜ · 14:32
                  </div>
                </div>
              </div>

              {todayItems.map((it, i) => {
                const top = 18 + (it.s - startHour) * blockH;
                const h = it.len * blockH - 6;
                const past = it.s < 14.53;
                return (
                  <div key={i} style={{
                    position: 'absolute', left: 0, right: 12, top, height: h,
                    background: past ? T.paper : '#fff',
                    borderLeft: `4px solid ${it.color}`,
                    borderTop: `1px solid ${T.hair}`,
                    borderRight: `1px solid ${T.hair}`,
                    borderBottom: `1px solid ${T.hair}`,
                    padding: '10px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    opacity: past ? 0.6 : 1, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.14em', color: it.color, fontWeight: 700 }}>{it.kind}</span>
                      <span style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>
                        {Math.floor(it.s)}:{(it.s % 1) ? '30' : '00'}{it.len ? ` → ${Math.floor(it.s + it.len)}:${((it.s + it.len) % 1) ? '30' : '00'}` : ''}
                      </span>
                    </div>
                    <div style={{ fontFamily: F.display, fontSize: it.type === 'class' ? 18 : 14, fontWeight: 500, color: T.ink, lineHeight: 1.2 }}>{it.title}</div>
                    {it.sub && <div style={{ fontSize: 11, color: T.mute, marginTop: 3 }}>{it.sub}</div>}
                    {it.extra && (
                      <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px dotted ${T.hair}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: T.ink2 }}>{it.extra}</span>
                        {it.cta && <button style={{ background: it.color, color: T.bg, border: 0, padding: '5px 10px', fontSize: 11, fontFamily: F.mono, fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer' }}>{it.cta} →</button>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* right rail */}
            <div style={{ borderLeft: `1px solid ${T.rule}`, padding: '18px 24px', background: T.paper }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.1em', color: T.mute, textTransform: 'uppercase' }}>Focus · 17:00</div>
              <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 500, color: T.ink, marginTop: 8, lineHeight: 1.15 }}>IELTS Speaking</div>
              <div style={{ fontSize: 12, color: T.ink2, marginTop: 4 }}>Phòng 204 · Cs. Cầu Giấy · Ms. Hà Linh</div>

              <div style={{ marginTop: 16, padding: '12px 14px', background: T.bg, border: `1px solid ${T.hair}` }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cue card</div>
                <div style={{ fontStyle: 'italic', fontSize: 13, color: T.ink, marginTop: 6, lineHeight: 1.4 }}>
                  "Describe a person who inspires you. You should say who they are, how you know them, what they do, and explain why they inspire you."
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>3 ý đã chuẩn bị</div>
                {[['1', 'Bố — kỹ sư xây dựng', true], ['2', 'Tinh thần kỉ luật', true], ['3', '— chưa có ý —', false]].map(([i, t, done]) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: `1px dotted ${T.hair}` }}>
                    <span style={{ width: 18, height: 18, border: `1.5px solid ${done ? T.sage : T.hair}`, background: done ? T.sage : 'transparent', borderRadius: 4, display: 'grid', placeItems: 'center', color: T.bg, fontSize: 11 }}>{done ? '✓' : ''}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>{i}.</span>
                    <span style={{ fontSize: 12, color: done ? T.ink : T.mute, fontStyle: done ? 'normal' : 'italic' }}>{t}</span>
                  </div>
                ))}
              </div>

              <button style={{ marginTop: 14, width: '100%', background: T.coral, color: T.bg, border: 0, padding: '10px', fontFamily: F.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Mở phiếu chuẩn bị →
              </button>

              <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Mai · T5 09·05</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 4, background: T.sage }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>IELTS Writing Task 2</div>
                    <div style={{ fontFamily: F.mono, fontSize: 11, color: T.mute, marginTop: 2 }}>17:00 → 18:30 · Online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
window.TodayScreen = TodayScreen;
