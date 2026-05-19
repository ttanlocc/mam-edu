// Gieo · IELTS Daily Plan screen
const KIND_CODE = { WRITING:'W', SPEAKING:'S', READING:'R', LISTENING:'L', ANKI:'A' };
const HAS_BAND  = { W:true, S:true, R:true, L:true, A:false };

function getCarry(block) {
  if (!block.carry_in) return null;
  if (block.carry_in.extra_minutes > 0) return `↘ +${block.carry_in.extra_minutes}′ bù hôm qua`;
  const m = block.carry_in.task_added.match(/\+(\d+)\s*(\S+)/);
  return m ? `↘ +${m[1]} ${m[2]} bù` : null;
}

function getYdayVerb(item, blocks) {
  if (item.policy === 'CARRY') {
    const block = blocks.find(b => b.id === item.target_block_id);
    const time = block ? block.time.split('–')[0] : 'hôm nay';
    return `→ ${time}`;
  }
  if (item.policy === 'MERGE') return `→ ${item.policy_label || 'gộp tối'}`;
  return 'bỏ';
}

function DailyPlanScreen() {
  const D = window.GIEO_PLAN;

  const [logOpen, setLogOpen]  = React.useState({});
  const [done, setDone]        = React.useState({});
  const [bandVal, setBandVal]  = React.useState({});
  const [noteVal, setNoteVal]  = React.useState({});

  const openLog   = id => setLogOpen(p => ({ ...p, [id]: true }));
  const cancelLog = id => setLogOpen(p => ({ ...p, [id]: false }));
  const logTask   = (id, code) => {
    const b  = bandVal[id];
    const n  = noteVal[id];
    const val = [b ? 'Band ' + b : '', n || ''].filter(Boolean).join(' · ');
    setDone(p => ({ ...p, [id]: val || '✓' }));
    setLogOpen(p => ({ ...p, [id]: false }));
  };

  const studyMins = D.today_blocks
    .filter(b => b.kind !== 'ANKI')
    .reduce((s, b) => s + b.duration + (b.carry_in?.extra_minutes || 0), 0);
  const totalSeeds = D.today_blocks.reduce((s, b) => s + b.reward_seeds, 0);
  const doneCount  = Object.keys(done).length;
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
                <div className="n">{D.phase.date_n}</div>
                <div>
                  <div className="eye" style={{color:'var(--ink)'}}>{D.phase.day_of_week.toUpperCase()}</div>
                  <div className="eye">{D.phase.month_year}</div>
                  <div className="eye" style={{color:'var(--coral)',marginTop:4}}>
                    ● {D.student.days_to_test} NGÀY → IELTS
                  </div>
                </div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="eye">● {h}H {m}′ · {D.today_blocks.length} BLOCK</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:18,letterSpacing:'-0.02em',marginTop:4}}>
                Tuần {D.phase.week} · <span style={{color:'var(--coral)'}}>{D.phase.headline}</span>
              </div>
            </div>
          </div>

          <div className="phase-strip">
            {D.phases.map(p => (
              <div key={p.n} className={`phase${p.current ? ' cur' : p.done ? ' done' : ''}`}>
                <div className="n">PHASE {p.n}</div>
                <div className="nm">{p.name}</div>
                <div className="r">{p.range}</div>
              </div>
            ))}
          </div>

          <div className="yday">
            <span className="lbl">● Hôm qua · {D.yesterday.total - D.yesterday.done} dở</span>
            <span className="body">
              {D.yesterday.items.map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 ? ' · ' : ''}
                  {item.kind.charAt(0) + item.kind.slice(1).toLowerCase()}{' '}
                  <b>{getYdayVerb(item, D.today_blocks)}</b>
                </React.Fragment>
              ))}
            </span>
          </div>

          <div className="blocks">
            {D.today_blocks.map(b => {
              const code      = KIND_CODE[b.kind] || b.kind[0];
              const totalDur  = b.duration + (b.carry_in?.extra_minutes || 0);
              const startTime = b.time.includes('–') ? b.time.split('–')[0] : '·';
              const carry     = getCarry(b);
              const isDone    = !!done[b.id];
              const isOpen    = !!logOpen[b.id];

              return (
                <div key={b.id} className={`block b-${code}${isDone ? ' done' : ''}`}>
                  <div className="when">
                    <div className="eye" style={{color:`var(--${b.kind_color})`,marginBottom:6}}>
                      ● {b.kind}
                    </div>
                    <div className="clk">{startTime}</div>
                    <div className="dur">{totalDur}′</div>
                  </div>

                  <div style={{minWidth:0}}>
                    <h3>{b.title}</h3>
                    {carry && <div className="carry-pill">{carry}</div>}
                    {isDone && (
                      <div className="done-badge">✓ ĐÃ GHI · {done[b.id]}</div>
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
                          <span className="lf-ph">{totalDur}′</span>
                          <input
                            className="inp-note" type="text" placeholder="Ghi chú tuỳ chọn…"
                            value={noteVal[b.id] || ''}
                            onChange={e => setNoteVal(p => ({ ...p, [b.id]: e.target.value }))}
                          />
                          <button className="lf-submit" onClick={() => logTask(b.id, code)}>✓ LƯU</button>
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
                      <a className="start" href={b.href || '#/'}>BẮT ĐẦU →</a>
                    )}
                    {!isDone && !isOpen && (
                      <button className="log-btn" onClick={() => openLog(b.id)}>✓ Ghi lại</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="totals-foot">
            <div>
              <div className="eye">● XONG HẾT</div>
              <div style={{marginTop:3,fontSize:15}}>
                Chuỗi <span style={{color:'var(--coral)'}}>{D.student.streak + 1}</span> · cây <b>GĐ {D.student.tree_stage + 1}</b>
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
            <div className="eye">● {D.student.current_overall} → {D.student.target_overall}</div>
            <div style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:14,marginTop:4}}>
              mean ≥ 7.875
            </div>
            <div className="bands-grid" style={{marginTop:10}}>
              {D.bands.map(b => (
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
              <div className="eye">● TUẦN {D.phase.week}</div>
              <a className="eye" style={{color:'var(--coral)',textDecoration:'none'}} href="#/week">
                {doneCount} / {D.week_milestones.filter(d => !d.rest).length} →
              </a>
            </div>
            <div className="week-grid">
              {D.week_milestones.map(d => (
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

          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div className="eye">● PHẢN HỒI</div>
              <a className="eye" style={{textDecoration:'none'}} href="#/feedback">XEM →</a>
            </div>
            <div style={{marginTop:6}}>
              {D.feedback_log.map((f, i) => (
                <div key={i} className="fb-item">
                  <span className="lbl">{f.date} · <b>{f.kind}</b></span>
                  <span className="v">{f.band}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
window.DailyPlanScreen = DailyPlanScreen;
