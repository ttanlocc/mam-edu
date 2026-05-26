function RoadmapScreen() {
  const [course, setCourse] = React.useState(null);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    const id = window.gieoApi.currentCourseId();
    window.gieoApi.getCourse(id).then(setCourse).catch(e => setErr(String(e)));
  }, []);

  if (err) return <div style={{padding:24,color:'#a33',fontFamily:'monospace'}}>Roadmap load error: {err}</div>;
  if (!course) return <div style={{padding:24,color:'#888'}}>Đang tải lộ trình…</div>;

  const sd        = course.student_defaults || {};
  const phases    = course.phases    || [];
  const bands     = course.bands     || [];
  const schedule  = course.schedule  || [];
  const materials = course.materials || {};
  const youtube   = course.youtube   || [];

  const currentMonth = sd.current_month ?? 1;
  const totalMonths  = course.months    || 12;
  const curPhase     = phases.find(p => p.current);

  // Build month strip from data
  const months = Array.from({length: totalMonths}, (_, i) => ({
    n:    i + 1,
    done: i + 1 < currentMonth,
    cur:  i + 1 === currentMonth,
  }));

  // Skill labels + colors for schedule table
  const SKILLS = [
    { k: 'writing',   label: 'Writing',    color: 'butter' },
    { k: 'speaking',  label: 'Speaking',   color: 'sky'    },
    { k: 'reading',   label: 'Reading',    color: 'coral'  },
    { k: 'listening', label: 'Listening',  color: 'sage'   },
    { k: 'vocab',     label: 'Vocab/Anki', color: 'mute'   },
  ];

  return (
    <>
      <window.GieoTopnav />
      <div className="app narrow">
        <window.GieoSidebar activeId="roadmap" />

        <main>
          {/* ── Hero ─────────────────────────────────────── */}
          <div className="page-hero">
            <div>
              <div className="eye acc">● LỘ TRÌNH · {totalMonths} THÁNG</div>
              <h1 className="page-title">
                {sd.current_overall ?? 0}.0 → <b>{sd.target_overall ?? 0}.0</b>
              </h1>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="eye">● CÒN LẠI</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:48,letterSpacing:'-0.04em',lineHeight:1}}>
                {sd.days_to_test ?? 0}
              </div>
              <div className="eye" style={{marginTop:4}}>NGÀY</div>
            </div>
          </div>

          {/* ── Month progress strip ─────────────────────── */}
          <div className="progress-strip">
            {months.map(mo => (
              <div key={mo.n} className={mo.cur ? 'cur' : mo.done ? 'done' : ''}>
                T{mo.n}
              </div>
            ))}
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.08em',color:'var(--mute)',marginBottom:6}}>
            Đang ở Tháng {currentMonth} · Phase {curPhase?.n ?? '?'} ·{' '}
            <span style={{color:'var(--coral)'}}>● {curPhase?.name ?? ''}</span>
          </div>

          <div className="hair" />

          {/* ── Phase rows ───────────────────────────────── */}
          {phases.map(p => (
            <div key={p.n} className={`phase-row${p.current ? ' cur' : p.done ? ' done' : ''}`}>
              <div>
                <div className="pr-step">PHASE {p.n}</div>
                <div className="pr-nm">{p.name}</div>
                <div className="pr-rng">{p.range}</div>
                {p.span && (
                  <div style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.08em',color:'var(--mute)',marginTop:6}}>
                    {p.span}
                  </div>
                )}
              </div>

              <div className="pr-mid">
                <h3>{p.current_ach || (p.done ? 'Hoàn thành' : 'Kế hoạch')}</h3>
                <div className="ach">
                  {(p.achievements || []).map((a, i) => (
                    <span key={i} className={p.current && i === 0 ? 'now' : ''}>{a}</span>
                  ))}
                </div>
              </div>

              <div className="pr-right">
                <div className="pr-target"><b>{p.target}</b></div>
                <div className="pr-month">THÁNG {p.months}</div>
                {p.current && (
                  <div style={{marginTop:8}}>
                    <span className="you-marker">● BẠN ĐANG Ở ĐÂY</span>
                  </div>
                )}
                {p.done && (
                  <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.10em',color:'var(--sage)',marginTop:8}}>
                    ✓ XONG
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="hair" />

          {/* ── Band targets ─────────────────────────────── */}
          <div className="eye" style={{marginBottom:12}}>● MỤC TIÊU BAND</div>
          <div className="targets">
            {bands.map(b => {
              const pct = b.cur > 0 ? Math.round((b.cur / b.tgt) * 100) : 0;
              return (
                <div key={b.k} className={`tgt ${b.k}`}>
                  <div className="k" style={{color:`var(--${b.color})`}}>{b.name.toUpperCase()}</div>
                  <div className="v">
                    {b.cur > 0 ? b.cur : '–'}<small>→ {b.tgt}</small>
                  </div>
                  <div className="frac">{b.status}</div>
                  <div className="bar"><div style={{width:`${pct}%`}}></div></div>
                </div>
              );
            })}
          </div>

          {/* ── Schedule per phase ───────────────────────── */}
          {schedule.length > 0 && (
            <>
              <div className="hair" />
              <div className="eye" style={{marginBottom:12}}>● PHÂN BỔ THỜI GIAN · phút/ngày</div>
              <div className="sched-grid">
                {schedule.map(s => {
                  const isCur = curPhase?.n === s.phase;
                  return (
                    <div key={s.phase} className="sched-cell" style={isCur ? {border:'2px solid var(--coral)'} : {}}>
                      <div className={`sched-ph${isCur ? ' cur' : ''}`}>PHASE {s.phase}</div>
                      {SKILLS.map(({ k, label, color }) => (
                        <div key={k} className="sched-row">
                          <span className="sk">{label}</span>
                          <span className="mn" style={{color:`var(--${color})`}}>{s[k]}′</span>
                        </div>
                      ))}
                      <div className="sched-total">
                        {SKILLS.reduce((sum, { k }) => sum + (s[k] || 0), 0)}′ · 4h
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Required books ───────────────────────────── */}
          {materials.required?.length > 0 && (
            <>
              <div className="hair" />
              <div className="eye" style={{marginBottom:12}}>● SÁCH BẮT BUỘC</div>
              <div className="mats-grid">
                {materials.required.map((m, i) => (
                  <div key={i} className="mat-item">
                    <div className="mat-title">{m.title}</div>
                    <div className="mat-meta">{m.use} · {'⭐'.repeat(m.priority)}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Apps + Free resources (2-col) ────────────── */}
          {(materials.apps?.length > 0 || materials.free?.length > 0) && (
            <>
              <div className="hair" />
              <div className="mat-2col">
                {materials.apps?.length > 0 && (
                  <div>
                    <div className="eye" style={{marginBottom:10}}>● ỨNG DỤNG</div>
                    <div className="mat-list">
                      {materials.apps.map((a, i) => (
                        <div key={i} className="mat-row">
                          <span className="ml-nm">{a.name}</span>
                          <span className="ml-note">{a.cost} · {a.use}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {materials.free?.length > 0 && (
                  <div>
                    <div className="eye" style={{marginBottom:10}}>● NGUỒN MIỄN PHÍ</div>
                    <div className="mat-list">
                      {materials.free.map((f, i) => (
                        <div key={i} className="mat-row">
                          <span className="ml-nm">{f.name}</span>
                          <span className="ml-note">{f.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── YouTube channels ─────────────────────────── */}
          {youtube.length > 0 && (
            <>
              <div className="hair" />
              <div className="eye" style={{marginBottom:12}}>● YOUTUBE · THEO KỸ NĂNG</div>
              <div className="yt-grid">
                {youtube.map((y, i) => (
                  <div key={i} className="yt-item">
                    <div className="yt-ch">{y.channel}</div>
                    <div className="yt-for">{y.best_for}</div>
                  </div>
                ))}
              </div>
            </>
          )}

        </main>
      </div>
    </>
  );
}
window.RoadmapScreen = RoadmapScreen;
