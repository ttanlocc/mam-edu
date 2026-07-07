function progressKey(weekN, dow, blockId) {
  return `${weekN}:${dow}:${blockId}`;
}

const SKILL_ROWS = [
  { skill: 'writing',   kind: 'WRITING',   label: 'Writing'    },
  { skill: 'speaking',  kind: 'SPEAKING',  label: 'Speaking'   },
  { skill: 'reading',   kind: 'READING',   label: 'Reading'    },
  { skill: 'listening', kind: 'LISTENING', label: 'Listening'  },
  { skill: 'anki',      kind: 'ANKI',      label: 'Vocab/Anki' },
];

function WeekScreen() {
  const courseId = window.gieoApi.currentCourseId();
  const weekN    = window.gieoApi.currentWeek();

  const [course, setCourse]     = React.useState(null);
  const [week, setWeek]         = React.useState(null);
  const [progress, setProgress] = React.useState(null);
  const [err, setErr]           = React.useState(null);

  React.useEffect(() => {
    Promise.all([
      window.gieoApi.getCourse(courseId),
      window.gieoApi.getWeek(courseId, weekN),
      window.gieoApi.getState(),
    ]).then(([c, w, s]) => {
      setCourse(c);
      setWeek(w);
      setProgress((s && s.progress && s.progress[courseId]) || {});
    }).catch(e => setErr(String(e)));
  }, [courseId, weekN]);

  if (err) return <div style={{padding:24,color:'#a33',fontFamily:'monospace'}}>Không tải được Tuần: {err}</div>;
  if (!course || !week || !progress) return <div style={{padding:24,color:'#888'}}>Đang tải tuần…</div>;

  const days  = week.milestones || [];
  const bands = course.bands || [];

  const dayBlocks = dow => (week.days || []).find(x => x.dow === dow)?.blocks || [];
  const dayDone   = d => !d.rest && dayBlocks(d.d).length > 0 &&
    dayBlocks(d.d).every(b => progress[progressKey(weekN, d.d, b.id)]?.done);

  const doneCount  = days.filter(d => !d.rest && dayDone(d)).length;
  const totalCount = days.filter(d => !d.rest).length;

  const [moNum] = (week.month_year || '').split('·').map(s => s.trim());
  const dateRange = days.length ? `${days[0].date}–${days[days.length - 1].date} THÁNG ${moNum}` : '';

  const weekGrid = SKILL_ROWS.map(row => ({
    ...row,
    days: days.map(d => {
      if (d.rest) return { rest: true };
      const block = dayBlocks(d.d).find(b => b.kind === row.kind);
      if (!block) return { rest: true };
      return {
        topic: block.title,
        done:  !!progress[progressKey(weekN, d.d, block.id)]?.done,
        flag:  !!d.special,
      };
    }),
  }));

  return (
    <>
      <window.GieoTopnav />
      <div className="app narrow">
        <window.GieoSidebar activeId="week" />

        <main>
          <div className="page-hero">
            <div>
              <div className="eye acc">● TUẦN {weekN} · {dateRange}</div>
              <h1 className="page-title">Engage <b>{week.headline}</b>.</h1>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="eye">● HOÀN THÀNH</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:42,letterSpacing:'-0.03em',lineHeight:1}}>
                {doneCount}<span style={{color:'var(--mute)',fontSize:24}}>/ {totalCount}</span>
              </div>
              <div className="eye" style={{color:'var(--coral)',marginTop:4}}>CHỦ NHẬT NGHỈ</div>
            </div>
          </div>

          {/* Week grid */}
          <div className="wgrid">
            {/* Header row — spacer + 7 day columns */}
            <div style={{background:'var(--paper)'}}></div>
            {days.map(d => (
              <div key={d.d} className={`colhead${d.today ? ' today' : ''}${d.rest ? ' rest' : ''}`}>
                {d.d}
                <div className="num">{d.date}</div>
              </div>
            ))}

            {/* Skill rows */}
            {weekGrid.map(row => (
              <React.Fragment key={row.skill}>
                <div className="rowlbl">{row.label}</div>
                {row.days.map((cell, di) => {
                  if (cell.rest) return <div key={di} className="wcell rest">nghỉ</div>;
                  return (
                    <div key={di} className={[
                      'wcell', row.skill,
                      cell.done ? 'done' : '',
                      cell.flag ? 'flag' : '',
                    ].filter(Boolean).join(' ')}>
                      <span className="topic">{cell.topic}</span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Band targets */}
          <div style={{marginTop:28}}>
            <div className="eye">● MỤC TIÊU TUẦN NÀY</div>
            <div className="targets">
              {bands.map(b => {
                const pct = Math.round((b.cur / b.tgt) * 100);
                return (
                  <div key={b.k} className={`tgt ${b.k}`}>
                    <div className="k" style={{color:`var(--${b.color})`}}>{b.name.toUpperCase()}</div>
                    <div className="v">
                      {b.cur}<small>/ {b.tgt}</small>
                    </div>
                    <div className="frac">{b.status}</div>
                    <div className="bar"><div style={{width:`${pct}%`}}></div></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Week milestones list */}
          <div style={{marginTop:28}}>
            <div className="eye">● MILESTONES</div>
            <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:0}}>
              {days.map(d => (
                <div key={d.d} style={{
                  display:'flex', gap:16, alignItems:'center',
                  padding:'10px 0', borderBottom:'1px solid var(--hair)',
                }}>
                  <div style={{
                    fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.12em',
                    color: d.today ? 'var(--coral)' : d.rest ? 'var(--mute)' : 'var(--ink-2)',
                    width:28,
                  }}>{d.d}</div>
                  <div style={{
                    fontFamily:'var(--font-display)', fontWeight: d.today ? 500 : 400,
                    fontSize:14, color: d.rest ? 'var(--mute)' : d.today ? 'var(--ink)' : 'var(--ink-2)',
                    flex:1,
                  }}>{d.label}</div>
                  {d.special && (
                    <span style={{
                      fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.12em',
                      color:'var(--brick)', background:'rgba(194,136,114,0.10)',
                      padding:'2px 8px', borderRadius:999,
                    }}>★</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
window.WeekScreen = WeekScreen;
