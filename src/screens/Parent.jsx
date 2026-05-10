// Parent dashboard — Mr. Nguyễn Văn Hùng theo dõi tiến độ con.
function ParentScreen({ RoleHeader }) {
  const T = window.T, F = window.FONTS;
  return (
    <div style={{ width: 1280, height: 820, background: T.bg, color: T.ink, fontFamily: F.body, fontSize: 13, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <RoleHeader role="parent" label="Trang phụ huynh · Mr. Nguyễn Văn Hùng" name="VH" avatarBg={T.sky} />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 0 }}>
        <aside style={{ background: T.paper, borderRight: `1px solid ${T.rule}`, padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: T.coral, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Con của bạn · 2</div>

          <div style={{ marginTop: 14, padding: '14px 16px', background: T.bg, border: `2px solid ${T.ink}` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: T.coral, color: T.bg, display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 16 }}>MA</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Minh Anh</div>
                <div style={{ fontSize: 11, color: T.mute }}>14 tuổi · IELTS Foundation</div>
              </div>
              <span style={{ fontFamily: F.mono, fontSize: 9, color: T.coral, letterSpacing: '0.1em' }}>● ACTIVE</span>
            </div>
          </div>

          <div style={{ marginTop: 8, padding: '12px 16px', border: `1px solid ${T.hair}`, opacity: 0.7 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.sage, color: T.bg, display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 13 }}>NK</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13 }}>Nam Khánh</div>
                <div style={{ fontSize: 10, color: T.mute }}>9 tuổi · English Kids 2</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Cần lưu ý</div>
            {[
              { c: T.coral, t: 'Học phí kỳ 06·2026', s: '4.800.000đ · hạn 15·05', cta: 'Thanh toán' },
              { c: T.butter, t: 'Mock Test #4 · Chủ Nhật', s: '14:00 · Hội trường A · cần xác nhận' },
              { c: T.sage, t: 'Nhận xét mới từ Ms. Hà Linh', s: 'Listening 8.5/10 · "Note-taking tốt"' },
            ].map((a, i) => (
              <div key={i} style={{ padding: '10px 12px', background: T.bg, border: `1px solid ${T.hair}`, borderLeft: `3px solid ${a.c}`, marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{a.t}</div>
                <div style={{ fontSize: 11, color: T.mute, marginTop: 2 }}>{a.s}</div>
                {a.cta && <button style={{ marginTop: 8, background: a.c, color: T.bg, border: 0, padding: '5px 10px', fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{a.cta} →</button>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Giáo viên</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['HL', T.coral], ['JW', T.ink], ['PM', T.sage]].map(([n, c], i) => (
                <button key={i} style={{ flex: 1, padding: '8px 6px', background: T.bg, border: `1px solid ${T.hair}`, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ width: 22, height: 22, background: c, color: T.bg, borderRadius: 6, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700 }}>{n}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10 }}>chat</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main style={{ padding: '24px 32px', overflow: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: T.coral, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tiến độ tuần · 06 → 12·05</div>
              <div style={{ fontSize: 36, fontWeight: 500, lineHeight: 1.05, marginTop: 8, letterSpacing: '-0.02em' }}>
                Minh Anh đang ở band <span style={{ color: T.coral }}>6.5</span>,<br/>
                cách mục tiêu 7.5 còn <em style={{ fontFamily: F.body }}>4 tháng.</em>
              </div>
              <div style={{ marginTop: 10, fontSize: 13, color: T.ink2, maxWidth: 560 }}>
                Tuần này con đi học đầy đủ 4/4 buổi, hoàn thành 2/3 bài tập đúng hạn, điểm trung bình 8.7/10.
              </div>
            </div>
            <div style={{ padding: '14px 18px', background: T.ink, color: T.bg }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: T.butter, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tóm tắt sức khỏe học tập</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 38, fontWeight: 500, color: T.sage }}>A−</span>
                <span style={{ fontSize: 12, color: 'rgba(245,241,232,0.6)' }}>↑ tăng 1 bậc</span>
              </div>
              <div style={{ fontSize: 11, marginTop: 4, color: 'rgba(245,241,232,0.7)' }}>so với tháng trước</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 22 }}>
            {[
              { l: 'Đi học đúng giờ', n: '94%', s: '17/18 buổi · 2 tháng', c: T.sage },
              { l: 'Hoàn thành bài tập', n: '78%', s: '21/27 đúng hạn', c: T.butter },
              { l: 'Điểm TB tháng', n: '8.7', s: '/ 10 · ↑ 0.5', c: T.coral },
              { l: 'Giờ học/tuần', n: '6.5h', s: '4 buổi · ổn định', c: T.ink },
            ].map((k, i) => (
              <div key={i} style={{ padding: '16px 18px', background: '#fff', border: `1px solid ${T.hair}`, borderTop: `3px solid ${k.c}` }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k.l}</div>
                <div style={{ fontSize: 36, fontWeight: 500, color: k.c, marginTop: 6, letterSpacing: '-0.02em', lineHeight: 1 }}>{k.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, marginTop: 6 }}>{k.s}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginTop: 22 }}>
            <div style={{ padding: '18px 20px', background: '#fff', border: `1px solid ${T.hair}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lịch tuần này · checkin của con</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute }}>← 06·05 · → 12·05</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginTop: 12 }}>
                {window.LAGED_DAYS.map((d, i) => {
                  const status = i === 0 ? 'attended' : i === 1 ? 'attended' : i === 2 ? 'today' : i === 6 ? 'mock' : 'scheduled';
                  return (
                    <div key={d.code} style={{
                      padding: '12px 10px', textAlign: 'center',
                      background: status === 'today' ? T.ink : status === 'attended' ? T.sage : status === 'mock' ? T.brick : 'transparent',
                      color: status === 'scheduled' ? T.ink : T.bg,
                      border: status === 'scheduled' ? `1px dashed ${T.hair}` : 'none',
                    }}>
                      <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.08em', opacity: 0.8 }}>{d.code}</div>
                      <div style={{ fontFamily: F.body, fontSize: 22, fontWeight: 500, lineHeight: 1.1 }}>{d.date}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 8, marginTop: 4, opacity: 0.85 }}>
                        {status === 'attended' ? '✓ ON TIME' : status === 'today' ? '● HÔM NAY' : status === 'mock' ? '◆ MOCK#4' : 'scheduled'}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px dotted ${T.hair}`, fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.06em' }}>
                17:00 SPEAKING · 19:00 GRAMMAR · cha mẹ sẽ nhận thông báo khi con check-in
              </div>
            </div>

            <div style={{ padding: '18px 20px', background: '#fff', border: `1px solid ${T.hair}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>4 kỹ năng IELTS</div>
              <div style={{ marginTop: 10 }}>
                {window.LAGED_DATA.progress.skills.map(s => (
                  <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '74px 1fr 32px 36px', gap: 8, alignItems: 'center', padding: '6px 0' }}>
                    <span style={{ fontFamily: F.mono, fontSize: 11 }}>{s.name}</span>
                    <div style={{ height: 8, background: T.hair, position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, width: `${(s.score / 9) * 100}%`, background: T.ink }} />
                      <div style={{ position: 'absolute', left: `${(s.target / 9) * 100}%`, top: -2, bottom: -2, width: 2, background: T.coral }} />
                    </div>
                    <span style={{ fontFamily: F.body, fontSize: 16, fontWeight: 600 }}>{s.score.toFixed(1)}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 10, color: T.sage, textAlign: 'right' }}>{s.delta}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dotted ${T.hair}`, fontFamily: F.mono, fontSize: 10, color: T.mute }}>━ điểm hiện tại  · | mục tiêu 7.5</div>
            </div>
          </div>

          <div style={{ marginTop: 22, padding: '18px 20px', background: T.paper, border: `1px solid ${T.hair}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nhận xét gần nhất từ giáo viên</div>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: T.coral }}>3 mới</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 12 }}>
              {[
                { who: 'Ms. Hà Linh', av: 'HL', c: T.coral, cls: 'IELTS Speaking', t: 'Em phát âm tự nhiên hơn nhiều, intonation tốt. Cần thêm idioms cho Part 3.', score: '8.0', when: 'Hôm qua' },
                { who: 'Mr. James W.', av: 'JW', c: T.ink, cls: 'Grammar B2', t: 'Conditional 3 đã chắc rồi. Tuần sau ta học inversion.', score: '9.0', when: '2 ngày' },
                { who: 'Ms. Phương Mai', av: 'PM', c: T.sage, cls: 'IELTS Reading', t: 'Skim/scan ổn nhưng matching headings còn nhầm. Cần luyện thêm.', score: '7.5', when: '4 ngày' },
              ].map((f, i) => (
                <div key={i} style={{ padding: 14, background: T.bg, border: `1px solid ${T.hair}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, background: f.c, color: T.bg, borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700 }}>{f.av}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{f.who}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 9, color: T.mute, letterSpacing: '0.04em' }}>{f.cls} · {f.when}</div>
                    </div>
                    <span style={{ fontFamily: F.body, fontSize: 18, fontWeight: 600, color: T.sage }}>{f.score}</span>
                  </div>
                  <div style={{ fontSize: 12, color: T.ink2, marginTop: 8, lineHeight: 1.4, fontStyle: 'italic' }}>"{f.t}"</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
window.ParentScreen = ParentScreen;
