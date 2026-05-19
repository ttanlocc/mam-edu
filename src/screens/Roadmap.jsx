function RoadmapScreen() {
  const [course, setCourse] = React.useState(null);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    const id = window.gieoApi.currentCourseId();
    window.gieoApi.getCourse(id).then(setCourse).catch(e => setErr(String(e)));
  }, []);

  if (err) return <div style={{padding:24,color:'#a33',fontFamily:'monospace'}}>Roadmap load error: {err}</div>;
  if (!course) return <div style={{padding:24,color:'#888'}}>Đang tải lộ trình…</div>;

  const D = {
    student: {
      current_overall: course.student_defaults?.current_overall ?? 0,
      target_overall: course.student_defaults?.target_overall ?? 0,
      days_to_test: course.student_defaults?.days_to_test ?? 0,
    },
    phases: course.phases || [],
    bands: course.bands || [],
  };

  // 12 months, first 3 done, month 4 current
  const months = Array.from({length:12}, (_, i) => ({
    n: i + 1,
    done: i < 3,
    cur: i === 3,
  }));

  return (
    <>
      <window.GieoTopnav />
      <div className="app narrow">
        <window.GieoSidebar activeId="roadmap" />

        <main>
          <div className="page-hero">
            <div>
              <div className="eye acc">● LỘ TRÌNH · 12 THÁNG</div>
              <h1 className="page-title">{D.student.current_overall}.0 → <b>{D.student.target_overall}.0</b></h1>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="eye">● CÒN LẠI</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:48,letterSpacing:'-0.04em',lineHeight:1}}>
                {D.student.days_to_test}
              </div>
              <div className="eye" style={{marginTop:4}}>NGÀY</div>
            </div>
          </div>

          {/* 12-month progress strip */}
          <div className="progress-strip">
            {months.map(mo => (
              <div key={mo.n} className={mo.cur ? 'cur' : mo.done ? 'done' : ''}>
                T{mo.n}
              </div>
            ))}
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.08em',color:'var(--mute)',marginBottom:6}}>
            Đang ở Tháng 4 · Phase 2 · <span style={{color:'var(--coral)'}}>● Skill Building</span>
          </div>

          <div className="hair" />

          {/* Phase rows */}
          {D.phases.map(p => (
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
                  {p.achievements.map((a, i) => (
                    <span key={i} className={p.current && i === 0 ? 'now' : ''}>{a}</span>
                  ))}
                </div>
              </div>

              <div className="pr-right">
                <div className="pr-target">
                  <b>{p.target}</b>
                </div>
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

          {/* Band targets summary */}
          <div className="eye" style={{marginBottom:12}}>● MỤC TIÊU BAND</div>
          <div className="targets">
            {D.bands.map(b => {
              const pct = Math.round((b.cur / b.tgt) * 100);
              return (
                <div key={b.k} className={`tgt ${b.k}`}>
                  <div className="k" style={{color:`var(--${b.color})`}}>{b.name.toUpperCase()}</div>
                  <div className="v">{b.cur}<small>→ {b.tgt}</small></div>
                  <div className="frac">{b.status}</div>
                  <div className="bar"><div style={{width:`${pct}%`}}></div></div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
window.RoadmapScreen = RoadmapScreen;
