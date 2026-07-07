// Gieo · IELTS Daily Plan screen
const KIND_CODE = { WRITING:'W', SPEAKING:'S', READING:'R', LISTENING:'L', ANKI:'A' };
const HAS_BAND  = { W:true, S:true, R:true, L:true, A:false };

function getCarry(block) {
  if (!block.carry_in) return null;
  if (block.carry_in.extra_minutes > 0) return `↘ +${block.carry_in.extra_minutes}′ bù hôm qua`;
  const m = block.carry_in.task_added.match(/\+(\d+)\s*(\S+)/);
  return m ? `↘ +${m[1]} ${m[2]} bù` : null;
}

function progressKey(weekN, dow, blockId) {
  return `${weekN}:${dow}:${blockId}`;
}

// Inline viewer for a block's downloaded study material (audio/pdf/image),
// served by the API's /materials static route. src is a raw path under MATERIALS_DIR.
function MaterialView({ m }) {
  if (!m || !m.src) return null;
  const base = (window.gieoApi && window.gieoApi.base) || '';
  const url = base + '/materials/' + String(m.src).split('/').map(encodeURIComponent).join('/');
  const glyph = m.type === 'audio' ? '♪' : m.type === 'pdf' ? '▤' : '▦';
  const btn = { fontSize:12, padding:'5px 12px', border:'1px solid var(--hair)', borderRadius:8,
    color:'var(--ink)', textDecoration:'none', background:'var(--paper)', display:'inline-flex', alignItems:'center', gap:4 };
  return (
    <div style={{ margin:'8px 0 4px', padding:'8px 10px', border:'1px solid var(--hair)', borderRadius:10, background:'var(--paper)' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-2)', marginBottom:6,
        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
        {glyph} {m.name || m.src}
      </div>
      {m.type === 'audio' && <audio controls preload="none" src={url} style={{ width:'100%', height:32 }} />}
      {m.type === 'pdf' && (
        <div style={{ display:'flex', gap:8 }}>
          <a style={btn} href={url} target="_blank" rel="noopener noreferrer">◱ Mở PDF</a>
          <a style={btn} href={url} download>⭳ Tải</a>
        </div>
      )}
      {m.type === 'image' && <img src={url} alt={m.name || ''} style={{ maxWidth:'100%', borderRadius:8, border:'1px solid var(--hair)' }} />}
    </div>
  );
}
window.MaterialView = MaterialView;

function DailyPlanScreen() {
  const courseId = window.gieoApi.currentCourseId();
  const weekN    = window.gieoApi.currentWeek();
  const enrollment = window.gieoApi.currentCourse() || {};

  const [course, setCourse]     = React.useState(null);
  const [week, setWeek]         = React.useState(null);
  const [progress, setProgress] = React.useState(null);
  const [err, setErr]           = React.useState(null);

  const [logOpen, setLogOpen] = React.useState({});
  const [bandVal, setBandVal] = React.useState({});
  const [noteVal, setNoteVal] = React.useState({});

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

  const openLog   = id => setLogOpen(p => ({ ...p, [id]: true }));
  const cancelLog = id => setLogOpen(p => ({ ...p, [id]: false }));

  const logTask = async (dow, block) => {
    const key = progressKey(weekN, dow, block.id);
    const entry = {
      done: true,
      band: bandVal[block.id] || null,
      note: noteVal[block.id] || null,
      logged_at: new Date().toISOString(),
    };
    setProgress(p => ({ ...(p || {}), [key]: entry }));
    setLogOpen(p => ({ ...p, [block.id]: false }));
    try {
      const state = (await window.gieoApi.getState()) || {};
      const nextCourseProgress = { ...(state.progress?.[courseId] || {}), [key]: entry };
      await window.gieoApi.putState({
        ...state,
        progress: { ...(state.progress || {}), [courseId]: nextCourseProgress },
      });
    } catch (e) {
      console.error('[gieo] không lưu được tiến độ:', e);
    }
  };

  if (err) return <div style={{padding:24,color:'#a33',fontFamily:'monospace'}}>Không tải được Hôm nay: {err}</div>;
  if (!course || !week || !progress) return <div style={{padding:24,color:'#888'}}>Đang tải kế hoạch hôm nay…</div>;

  const sd     = course.student_defaults || {};
  const phases = course.phases || [];
  const bands  = course.bands  || [];
  const currentPhaseN = phases.find(p => p.current)?.n || 1;

  const milestones  = week.milestones || [];
  const todayM      = milestones.find(m => m.today) || milestones[0];
  const todayIdx    = milestones.findIndex(m => m === todayM);
  const todayDay    = (week.days || []).find(d => d.dow === todayM?.d);
  const todayBlocks = todayDay?.blocks || [];

  const prevM      = todayIdx > 0 ? milestones[todayIdx - 1] : null;
  const prevDay    = prevM && !prevM.rest ? (week.days || []).find(d => d.dow === prevM.d) : null;
  const prevBlocks = prevDay?.blocks || [];
  const prevUndone = prevBlocks.filter(b => !progress[progressKey(weekN, prevM.d, b.id)]?.done);

  const studyMins  = todayBlocks.filter(b => b.kind !== 'ANKI').reduce((s, b) => s + b.duration, 0);
  const totalSeeds = todayBlocks.reduce((s, b) => s + b.reward_seeds, 0);
  const h = Math.floor(studyMins / 60);
  const m = studyMins % 60;

  return (
    <>
      <window.GieoTopnav />
      <div className="app">
        <window.GieoSidebar activeId="today" />

        <main>
          <div className="head">
            <div>
              <div className="eye acc">● HÔM NAY</div>
              <div className="hero-date" style={{marginTop:6}}>
                <div className="n">{week.date_n}</div>
                <div>
                  <div className="eye" style={{color:'var(--ink)'}}>{(week.day_of_week || '').toUpperCase()}</div>
                  <div className="eye">{week.month_year}</div>
                  <div className="eye" style={{color:'var(--coral)',marginTop:4}}>
                    ● {sd.days_to_test ?? course.days} NGÀY → IELTS
                  </div>
                </div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="eye">● {h}H {m}′ · {todayBlocks.length} BLOCK</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:18,letterSpacing:'-0.02em',marginTop:4}}>
                Tuần {weekN} · <span style={{color:'var(--coral)'}}>{week.headline}</span>
              </div>
            </div>
          </div>

          <div className="phase-strip">
            {phases.map(p => (
              <div key={p.n} className={`phase${p.current ? ' cur' : p.n < currentPhaseN ? ' done' : ''}`}>
                <div className="n">PHASE {p.n}</div>
                <div className="nm">{p.name}</div>
                <div className="r">{p.range}</div>
              </div>
            ))}
          </div>

          {prevDay && (
            <div className="yday">
              <span className="lbl">● Hôm qua · {prevUndone.length} dở</span>
              <span className="body">
                {prevBlocks.map((b, i) => {
                  const done = !!progress[progressKey(weekN, prevM.d, b.id)]?.done;
                  return (
                    <React.Fragment key={b.id}>
                      {i > 0 ? ' · ' : ''}
                      {b.kind.charAt(0) + b.kind.slice(1).toLowerCase()} <b>{done ? 'đã xong' : 'chưa xong'}</b>
                    </React.Fragment>
                  );
                })}
              </span>
            </div>
          )}

          {todayBlocks.length === 0 ? (
            <div className="yday"><span className="lbl">● Hôm nay nghỉ · deload</span></div>
          ) : (
          <div className="blocks">
            {todayBlocks.map(b => {
              const code        = KIND_CODE[b.kind] || b.kind[0];
              const key         = progressKey(weekN, todayM.d, b.id);
              const loggedEntry = progress[key];
              const isDone      = !!loggedEntry?.done;
              const isOpen      = !!logOpen[b.id];
              const carry       = getCarry(b);
              const startTime   = b.time.includes('–') ? b.time.split('–')[0] : '·';

              return (
                <div key={b.id} className={`block b-${code}${isDone ? ' done' : ''}`}>
                  <div className="when">
                    <div className="eye" style={{color:`var(--${b.kind_color})`,marginBottom:6}}>
                      ● {b.kind}
                    </div>
                    <div className="clk">{startTime}</div>
                    <div className="dur">{b.duration}′</div>
                  </div>

                  <div style={{minWidth:0}}>
                    <h3>{b.title}</h3>
                    {b.material && <MaterialView m={b.material} />}
                    {carry && <div className="carry-pill">{carry}</div>}
                    {isDone && (
                      <div className="done-badge">
                        ✓ ĐÃ GHI{loggedEntry.band ? ` · Band ${loggedEntry.band}` : ''}{loggedEntry.note ? ` · ${loggedEntry.note}` : ''}
                      </div>
                    )}
                    {isOpen && (
                      <div className="log-form open">
                        <div className="lf-row">
                          {HAS_BAND[code] && <>
                            <span className="lf-ph">BAND</span>
                            <input
                              className="inp-band" type="text" inputMode="decimal" placeholder="6.5"
                              value={bandVal[b.id] || ''}
                              onChange={e => setBandVal(p => ({ ...p, [b.id]: e.target.value }))}
                            />
                            <div className="lf-div" />
                          </>}
                          <span className="lf-ph">{b.duration}′</span>
                          <input
                            className="inp-note" type="text" placeholder="Ghi chú tuỳ chọn…"
                            value={noteVal[b.id] || ''}
                            onChange={e => setNoteVal(p => ({ ...p, [b.id]: e.target.value }))}
                          />
                          <button className="lf-submit" onClick={() => logTask(todayM.d, b)}>✓ LƯU</button>
                          <button className="lf-cancel" onClick={() => cancelLog(b.id)}>Huỷ</button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rew">
                    <div style={{textAlign:'right'}}>
                      <div className="seeds">+{b.reward_seeds}</div>
                      <div className="eye">HẠT</div>
                    </div>
                    {!isDone && (
                      <a className="start" href={`#/session/${weekN}/${todayM.d}/${b.id}`}>BẮT ĐẦU →</a>
                    )}
                    {!isDone && !isOpen && (
                      <button className="log-btn" onClick={() => openLog(b.id)}>✓ Ghi lại</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          )}

          <div className="totals-foot">
            <div>
              <div className="eye">● XONG HẾT</div>
              <div style={{marginTop:3,fontSize:15}}>
                Chuỗi <span style={{color:'var(--coral)'}}>{(enrollment.streak || 0) + 1}</span> · cây <b>GĐ {(enrollment.tree_stage || 0) + 1}</b>
              </div>
            </div>
            <div style={{display:'flex',gap:30}}>
              <div>
                <div className="big">{h}h {m}′</div>
                <div className="eye" style={{color:'var(--mute)'}}>GIỜ</div>
              </div>
              <div>
                <div className="big acc">+{totalSeeds}</div>
                <div className="eye" style={{color:'var(--mute)'}}>HẠT</div>
              </div>
            </div>
          </div>
        </main>

        <aside className="rail">
          <div className="card">
            <div className="eye">● {sd.current_overall ?? 0} → {sd.target_overall ?? 0}</div>
            <div style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:14,marginTop:4}}>
              mean ≥ 7.875
            </div>
            <div className="bands-grid" style={{marginTop:10}}>
              {bands.map(b => (
                <div key={b.k} className="band-cell" style={{borderLeft:`3px solid var(--${b.color})`}}>
                  <div className="k" style={{color:`var(--${b.color})`}}>{b.k}</div>
                  <div className="v">{b.cur}</div>
                  <div className="t">/ {b.tgt}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div className="eye">● TUẦN {weekN}</div>
              <a className="eye" style={{color:'var(--coral)',textDecoration:'none'}} href="#/week">
                {milestones.filter(d => !d.rest && (week.days || []).find(x => x.dow === d.d)?.blocks.every(b => progress[progressKey(weekN, d.d, b.id)]?.done)).length} / {milestones.filter(d => !d.rest).length} →
              </a>
            </div>
            <div className="week-grid">
              {milestones.map(d => (
                <a key={d.d} href="#/week" className={[
                  'day',
                  d.today   ? 'today'   : '',
                  d.rest    ? 'rest'    : '',
                  d.special ? 'special' : '',
                ].filter(Boolean).join(' ')}>
                  <div>{d.d}</div>
                  <div className="num">{d.date}</div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
window.DailyPlanScreen = DailyPlanScreen;
