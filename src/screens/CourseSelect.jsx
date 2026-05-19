// Gieo · Course Select — shown once for new users, before the app runs.
// No seeds / streak / tree state exists until "Bắt đầu gieo" is pressed;
// at that point we persist `gieo_course` and the rest of the app boots.

const COURSES = [
  {
    id: 'ielts-70-80',
    code: 'IELTS',
    from: '7.0', to: '8.0',
    name: 'IELTS · Tinh chỉnh',
    desc: 'Lộ trình 8 tháng — chuyển ceiling thành floor. Trọng tâm: feedback ex-examiner & error analysis.',
    months: 8, per_day: '4h 45′', blocks: 5, days: 244,
    tree: 'fruiting',
    recommended: true,
  },
  {
    id: 'toeic-soon',
    code: 'TOEIC',
    from: '500', to: '800',
    name: 'TOEIC · Mục tiêu nghề',
    desc: 'Listening + Reading thực dụng cho người đi làm. Đang chuẩn bị bộ mock + giáo viên.',
    months: 6, per_day: '2h 30′', blocks: 3, days: 180,
    tree: 'young',
    placeholder: true,
    eta: 'Mở · Tháng 07 · 2026',
  },
  {
    id: 'hsk-soon',
    code: 'HSK',
    from: 'HSK 3', to: 'HSK 5',
    name: 'HSK · Trung cấp',
    desc: 'Tiếng Trung HSK 3 → 5. Đang hoàn thiện lộ trình cùng đối tác Sư phạm Ngoại ngữ.',
    months: 10, per_day: '2h', blocks: 3, days: 300,
    tree: 'sprout',
    placeholder: true,
    eta: 'Mở · Tháng 09 · 2026',
  },
];

const COURSE_DETAIL = {
  'ielts-70-80': {
    phases: [
      { n:1, nm:'Foundations',    r:'T1–3',  done:true },
      { n:2, nm:'Skill Building', r:'T4–6',  cur:true },
      { n:3, nm:'Refinement',     r:'T7–9'  },
      { n:4, nm:'Exam Readiness', r:'T10–12'},
    ],
    sample_day: [
      { time:'07:00', dur:'90′', kind:'W', kindName:'WRITING',   title:'Task 2 essay · timed + self-review', seeds:35, c:'butter' },
      { time:'09:00', dur:'60′', kind:'S', kindName:'SPEAKING',  title:'Ghi âm Part 1–3 + shadow TED',      seeds:22, c:'sky' },
      { time:'14:00', dur:'45′', kind:'R', kindName:'READING',   title:'Cambridge passage + error log',     seeds:22, c:'coral' },
      { time:'19:00', dur:'45′', kind:'L', kindName:'LISTENING', title:'Section 4 + dictation',              seeds:18, c:'sage' },
      { time:'·',     dur:'20′', kind:'A', kindName:'ANKI',      title:'15 thẻ mới + review (buổi tối)',    seeds:11, c:'mocha' },
    ],
    week: [
      { d:'T2', label:'Discussion essay' },
      { d:'T3', label:'Task 1 · line graph' },
      { d:'T4', label:'Opinion essay' },
      { d:'T5', label:'iTalki ex-examiner', special:true },
      { d:'T6', label:'Problem-solution' },
      { d:'T7', label:'Mock R + L', special:true },
      { d:'CN', label:'Nghỉ · deload', rest:true },
    ],
    features: [
      { gly:'✎', b:'Feedback ex-examiner hàng tuần', s:'Lan H. chấm Writing mỗi thứ Năm · Mark E. chấm Speaking mỗi thứ Bảy.' },
      { gly:'◆', b:'Mock test đầy đủ mỗi 2 tuần', s:'Cambridge 14–18 · chấm theo descriptor 9.0 · error analysis 3 cột.' },
      { gly:'◦', b:'Anki deck topic-tagged', s:'1.200+ thẻ · production cards, không recognition · SRS tự đẩy.' },
      { gly:'○', b:'Pitfall watchlist', s:'5 failure modes của high-reading students · cảnh báo thời gian thực.' },
    ],
  },
  'toeic-soon': { placeholder:true, note:'Lộ trình TOEIC đang được xây cùng đối tác giáo viên. Mở vào Tháng 07 · 2026.' },
  'hsk-soon':   { placeholder:true, note:'Lộ trình HSK 3 → 5 đang được hoàn thiện cùng Sư phạm Ngoại ngữ. Mở vào Tháng 09 · 2026.' },
};

function treeSvg(stage, size=56) {
  const svgs = {
    sprout: `<svg viewBox="0 0 200 200" width="${size}" height="${size}"><ellipse cx="100" cy="178" rx="38" ry="4" fill="#8B5A3C" opacity="0.20"/><path d="M 50 172 Q 100 162 150 172 L 150 178 L 50 178 Z" fill="#8B5A3C" opacity="0.30"/><path d="M 100 174 Q 100 150 100 122" stroke="#8B5A3C" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="86" cy="128" rx="12" ry="9" fill="#7C9885" transform="rotate(-22 86 128)"/><ellipse cx="116" cy="118" rx="14" ry="10" fill="#8FA89A" transform="rotate(22 116 118)"/><ellipse cx="100" cy="108" rx="16" ry="11" fill="#7C9885"/><circle cx="92" cy="120" r="3" fill="#E8C572"/><circle cx="111" cy="112" r="3.4" fill="#E8C572"/></svg>`,
    young: `<svg viewBox="0 0 200 200" width="${size}" height="${size}"><ellipse cx="100" cy="178" rx="48" ry="5" fill="#8B5A3C" opacity="0.20"/><path d="M 100 178 Q 100 144 100 108" stroke="#8B5A3C" stroke-width="4.5" fill="none" stroke-linecap="round"/><ellipse cx="82" cy="116" rx="22" ry="18" fill="#7C9885"/><ellipse cx="120" cy="108" rx="24" ry="19" fill="#8FA89A"/><ellipse cx="100" cy="92" rx="26" ry="20" fill="#7C9885"/><ellipse cx="100" cy="108" rx="34" ry="16" fill="#B5C7A1" opacity="0.55"/><circle cx="86" cy="104" r="5" fill="#E8C572"/><circle cx="116" cy="98" r="5.5" fill="#E8C572"/><circle cx="104" cy="120" r="4.5" fill="#E8C572"/></svg>`,
    fruiting: `<svg viewBox="0 0 200 200" width="${size}" height="${size}"><ellipse cx="100" cy="178" rx="58" ry="5" fill="#8B5A3C" opacity="0.22"/><path d="M 100 178 Q 100 138 100 94" stroke="#8B5A3C" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="78" cy="108" rx="26" ry="22" fill="#7C9885"/><ellipse cx="124" cy="100" rx="30" ry="23" fill="#8FA89A"/><ellipse cx="100" cy="80" rx="34" ry="25" fill="#7C9885"/><ellipse cx="102" cy="100" rx="42" ry="20" fill="#B5C7A1" opacity="0.55"/><circle cx="84" cy="94" r="6.5" fill="#E8C572"/><circle cx="120" cy="86" r="7" fill="#E8C572"/><circle cx="102" cy="114" r="5.5" fill="#E8C572"/><circle cx="130" cy="110" r="5" fill="#E8C572"/></svg>`,
    seed: `<svg viewBox="0 0 200 200" width="${size}" height="${size}"><ellipse cx="100" cy="176" rx="50" ry="5" fill="#8B5A3C" opacity="0.18"/><path d="M 50 168 Q 100 158 150 168 L 150 178 L 50 178 Z" fill="#8B5A3C" opacity="0.32"/><ellipse cx="100" cy="166" rx="8" ry="5.5" fill="#8B5A3C"/><path d="M 100 162 Q 96 144 90 124" stroke="#7C9885" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-dasharray="2 4" opacity="0.55"/><circle cx="90" cy="122" r="2.4" fill="#B5C7A1" opacity="0.7"/></svg>`,
  };
  return svgs[stage] || svgs.seed;
}

function CourseSelectScreen() {
  const [selectedId, setSelectedId] = React.useState('ielts-70-80');
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  const selected = COURSES.find(c => c.id === selectedId);

  const handleStart = () => {
    if (!selected || selected.placeholder) return;
    setBusy(true);
    const payload = {
      id: selected.id, code: selected.code, from: selected.from, to: selected.to,
      name: selected.name,
      days_to_test: selected.days,
      streak: 0, seeds: 0, tree_stage: 0,
      started_at: new Date().toISOString(),
      blocks_per_day: selected.blocks, per_day: selected.per_day, months: selected.months,
    };
    try { localStorage.setItem('gieo_course', JSON.stringify(payload)); } catch {}
    setTimeout(() => {
      window.location.hash = '#/today';
      window.location.reload();
    }, 600);
  };

  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setSheetOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheetOpen]);

  const d = selected ? COURSE_DETAIL[selected.id] : null;

  return (
    <>
      <main className="cs-shell">
        <header>
          <div className="cs-step">
            <span className="dot"></span>
            <span className="cs-eye">Bước 1 / 1 · chọn cây</span>
            <span className="cs-stepline">Bạn có thể đổi cây 1 lần / 30 ngày · Chuỗi sẽ reset.</span>
          </div>
          <h1 className="cs-headline">
            Cây múi nào sẽ <em>lớn lên</em> cùng bạn?
          </h1>
          <p className="cs-sub">
            Mỗi khóa là một cây múi riêng — band điểm khác, nhịp khác, mùa thu hoạch khác.
            Bạn chỉ chọn <b>một lần</b>. Sau khi bấm <b>Bắt đầu gieo</b>, hạt, chuỗi và đếm ngược ngày thi mới bắt đầu chạy.
          </p>
        </header>

        <div className="cs-rule"></div>

        <div className="cs-grid">
          <div className="cs-cards">
            {COURSES.map(c => (
              <div
                key={c.id}
                className={`cs-card ${c.placeholder ? 'placeholder' : ''} ${selectedId === c.id ? 'selected' : ''}`}
                onClick={() => { if (!c.placeholder) setSelectedId(c.id); }}
              >
                <div className="cs-tree" dangerouslySetInnerHTML={{__html: treeSvg(c.tree, 56)}} />
                <div className="cs-card-main">
                  <div className="cs-card-code">
                    {c.code} · {c.from} → {c.to}
                    {c.recommended && <span className="cs-rec-pill">● ĐỀ XUẤT</span>}
                    {c.placeholder && <span className="cs-soon-pill">○ SẮP MỞ · {c.eta || 'sớm'}</span>}
                  </div>
                  <div className="cs-card-title">{c.name}</div>
                  <div className="cs-card-desc">{c.desc}</div>
                  <div className="cs-card-meta">
                    <span><b>{c.months}</b> tháng</span><span>·</span>
                    <span><b>{c.per_day}</b> / ngày</span><span>·</span>
                    <span><b>{c.blocks}</b> block</span><span>·</span>
                    <span>{c.days} ngày</span>
                  </div>
                </div>
                <div className="cs-radio"></div>
              </div>
            ))}
          </div>

          <aside className="cs-rail">
            <div className="cs-card-pane">
              <div className="cs-eye">● Bản xem trước</div>
              <div className="cs-preview-stage" dangerouslySetInnerHTML={{__html: selected ? treeSvg(selected.tree, 130) : ''}} />
              <div className="cs-preview-title">{selected ? selected.name : '—'}</div>
              <div className="cs-preview-sub">{selected ? `${selected.code} · ${selected.from} → ${selected.to}` : 'CHỌN MỘT KHÓA'}</div>

              <div className="cs-band-line">
                <span className="from">{selected ? selected.from : '—'}</span>
                <span className="arr">→</span>
                <span className="to">{selected ? selected.to : '—'}</span>
              </div>

              <div className="cs-stat-row">
                <div className="cs-stat-cell">
                  <div className="k">Thời lượng</div>
                  <div className="v">{selected ? `${selected.months} tháng` : '—'}</div>
                </div>
                <div className="cs-stat-cell">
                  <div className="k">Mỗi ngày</div>
                  <div className="v">{selected ? selected.per_day : '—'}</div>
                </div>
              </div>

              <div className="cs-promise-list">
                <div><b>+0</b>Streak bắt đầu từ <b style={{color:'var(--ink)',fontFamily:'inherit',fontSize:13}}>hôm nay</b>.</div>
                <div><b>+0</b>Hạt bắt đầu từ <b style={{color:'var(--ink)',fontFamily:'inherit',fontSize:13}}>0</b>.</div>
                <div><b>D1</b>Hạt được gieo lần đầu sau block đầu tiên.</div>
              </div>

              <button className="cs-detail-btn" onClick={() => selected && !selected.placeholder && setSheetOpen(true)}>
                <span>◦ XEM CHI TIẾT KHÓA</span><span className="arr">→</span>
              </button>
            </div>

            <div className="cs-card-pane dark">
              <div className="cs-eye">● Tại sao chỉ một?</div>
              <p className="cs-quote-pane" style={{marginTop:8}}>
                Trồng một cây cho ra <em>quả ngọt</em> tốt hơn trồng năm cây nửa chừng.
                Mầm xếp lịch theo <em>một mục tiêu</em> — không chia trí cho hai band cùng lúc.
              </p>
              <div className="cs-quote-cite">— Nguyên tắc Mầm</div>
            </div>
          </aside>
        </div>
      </main>

      {/* Detail sheet */}
      <div className={`cs-sheet-backdrop ${sheetOpen ? 'open' : ''}`} onClick={() => setSheetOpen(false)}></div>
      <aside className={`cs-sheet ${sheetOpen ? 'open' : ''}`} aria-hidden={!sheetOpen} style={{display: sheetOpen ? 'flex' : 'none'}}>
        <header className="cs-sheet-head">
          <div className="stage" dangerouslySetInnerHTML={{__html: selected ? treeSvg(selected.tree, 48) : ''}} />
          <div className="meta">
            <div className="code">{selected ? `${selected.code} · ${selected.from} → ${selected.to}` : ''}</div>
            <div className="title">{selected?.name}</div>
          </div>
          <button className="cs-sheet-close" onClick={() => setSheetOpen(false)} aria-label="Đóng">✕</button>
        </header>

        <div className="cs-sheet-body">
          {d?.placeholder ? (
            <div className="cs-sheet-section">
              <div className="cs-sheet-eye muted">○ SẮP MỞ</div>
              <p style={{fontSize:13.5,color:'var(--ink-2)',lineHeight:1.55}}>{d.note}</p>
            </div>
          ) : d && (
            <>
              <div className="cs-sheet-section">
                <div className="cs-sheet-eye">● {selected.months} THÁNG · {d.phases.length} PHASE</div>
                <div className="ph-strip">
                  {d.phases.map(p => (
                    <div key={p.n} className="ph-cell" style={{
                      ...(p.cur  ? { background:'var(--coral)', color:'var(--ink)', borderTopColor:'var(--ink)' } : {}),
                      ...(p.done ? { background:'rgba(124,152,133,0.10)', borderTopColor:'var(--coral)', opacity:0.85 } : {}),
                    }}>
                      <div className="n">PHASE {p.n}</div>
                      <div className="nm">{p.nm}</div>
                      <div className="r">{p.r}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cs-sheet-section">
                <div className="cs-sheet-eye">● MỘT NGÀY ĐIỂN HÌNH · {selected.blocks} BLOCK · {selected.per_day}</div>
                <div className="sd-list">
                  {d.sample_day.map((b, i) => (
                    <div key={i} className={`sd-row ${b.kind}`}>
                      <div className="sd-time">{b.time}<span className="dur">{b.dur}</span></div>
                      <div className="sd-main">
                        <div className="k" style={{color:`var(--${b.c})`}}>● {b.kindName}</div>
                        <div className="t">{b.title}</div>
                      </div>
                      <div className="sd-seeds">+{b.seeds}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cs-sheet-section">
                <div className="cs-sheet-eye">● TUẦN ĐIỂN HÌNH</div>
                <div className="wk-grid">
                  {d.week.map((w, i) => (
                    <div key={i} className={`wk-cell ${w.special?'special':''} ${w.rest?'rest':''}`} title={w.label}>
                      <div>{w.d}</div>
                      <div className="d">●</div>
                      <div style={{fontSize:9,lineHeight:1.3,color:w.rest?'var(--mute)':'var(--ink-2)',letterSpacing:0,textTransform:'none',fontFamily:'var(--font-body)',textWrap:'balance',padding:'0 2px'}}>{w.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cs-sheet-section">
                <div className="cs-sheet-eye">● BẠN SẼ CÓ</div>
                <div className="ft-list">
                  {d.features.map((f, i) => (
                    <div key={i} className="ft-row">
                      <div className="gly">{f.gly}</div>
                      <div><div className="b">{f.b}</div><div className="s">{f.s}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <footer className="cs-sheet-foot">
          <div className="lbl">Sau khi bắt đầu, các chỉ số mới <b>chạy</b>.</div>
          <button className="cs-cta" onClick={handleStart} disabled={!selected || selected.placeholder || busy}>
            <span>{busy ? 'ĐANG GIEO HẠT…' : 'BẮT ĐẦU GIEO'}</span><span className="arr">→</span>
          </button>
        </footer>
      </aside>

      {/* Sticky footer CTA */}
      <footer className="cs-foot">
        <div className="cs-foot-inner">
          <div className="cs-foot-msg">
            <span className="pulse"></span>
            {selected && !selected.placeholder
              ? <span>Sẵn sàng. <b>{selected.name}</b> · {selected.code} {selected.from} → {selected.to}. Hạt sẽ bắt đầu được đếm từ block đầu tiên.</span>
              : <span><b>Chưa chọn cây.</b> Cây múi sẽ nảy mầm sau khi bạn bắt đầu.</span>}
          </div>
          <button className="cs-cta-sec" onClick={() => { window.gieoLogout?.(); }}>← Quay lại</button>
          <button className="cs-cta" onClick={handleStart} disabled={!selected || selected.placeholder || busy}>
            <span>{busy ? 'ĐANG GIEO HẠT…' : 'BẮT ĐẦU GIEO'}</span><span className="arr">→</span>
          </button>
        </div>
      </footer>
    </>
  );
}

window.CourseSelectScreen = CourseSelectScreen;
