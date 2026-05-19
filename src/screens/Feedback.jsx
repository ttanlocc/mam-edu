function FeedbackScreen() {
  const D = window.GIEO_PLAN;
  const trend = D.band_trend;

  // Build simple SVG sparkline path from band data
  function sparkline(data, color, width, height) {
    const min = Math.min(...data) - 0.5;
    const max = Math.max(...data) + 0.5;
    const pad = 8;
    const w = width - pad * 2;
    const h = height - pad * 2;
    const pts = data.map((v, i) => {
      const x = pad + (i / (data.length - 1)) * w;
      const y = pad + h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    });
    return (
      <polyline
        points={pts.join(' ')}
        fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    );
  }

  return (
    <>
      <window.GieoTopnav />
      <div className="app narrow">
        <window.GieoSidebar activeId="feedback" />

        <main>
          <div className="page-hero">
            <div>
              <div className="eye acc">● PHẢN HỒI EXAMINER</div>
              <h1 className="page-title">Patterns & <b>progress</b>.</h1>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="eye">● SESSIONS</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:42,letterSpacing:'-0.03em',lineHeight:1}}>
                {D.feedback_log.length}
              </div>
              <div className="eye" style={{marginTop:4}}>THÁNG NÀY</div>
            </div>
          </div>

          {/* Top row: W+S trend + recent submissions */}
          <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:14}}>
            {/* Band trend sparklines */}
            <div className="card">
              <div className="eye" style={{marginBottom:12}}>● BAND TREND · 8 TUẦN</div>
              {['W','S'].map(skill => {
                const data = trend[skill];
                const color = skill === 'W' ? 'var(--butter)' : 'var(--sky)';
                const tgt   = D.bands.find(b => b.k === skill);
                return (
                  <div key={skill} style={{marginBottom:16}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                      <span style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.14em',color}}>
                        ● {skill === 'W' ? 'WRITING' : 'SPEAKING'}
                      </span>
                      <span style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:18,letterSpacing:'-0.02em'}}>
                        {data[data.length - 1]}
                        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--mute)',marginLeft:4}}>
                          / {tgt?.tgt}
                        </span>
                      </span>
                    </div>
                    <svg width="100%" height="56" viewBox="0 0 300 56" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[6.0,6.5,7.0,7.5].map(v => {
                        const y = 8 + 40 - ((v - 5.5) / 2) * 40;
                        return <line key={v} x1="0" y1={y} x2="300" y2={y} stroke="var(--hair)" strokeWidth="1"/>;
                      })}
                      {sparkline(data, color, 300, 56)}
                      {/* Current dot */}
                      {(() => {
                        const i = data.length - 1;
                        const min = 5.5, max = 7.5;
                        const x = 8 + (i / (data.length - 1)) * (300 - 16);
                        const y = 8 + 40 - ((data[i] - min) / (max - min)) * 40;
                        return <circle cx={x} cy={y} r="4" fill={color}/>;
                      })()}
                    </svg>
                    {/* Week labels */}
                    <div style={{display:'flex',justifyContent:'space-between',fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.08em',color:'var(--mute)',marginTop:2}}>
                      {trend.weeks.map(w => <span key={w}>{w}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent submissions */}
            <div className="card">
              <div className="eye" style={{marginBottom:12}}>● GẦN ĐÂY</div>
              {D.feedback_log.map((f, i) => (
                <div key={i} style={{
                  padding:'10px 0', borderBottom:'1px solid var(--hair)',
                  display:'flex', gap:12, alignItems:'flex-start',
                }}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:3}}>
                      <span style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.12em',color:'var(--mute)'}}>{f.date}</span>
                      <span style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.10em',color:'var(--coral)'}}>{f.kind}</span>
                    </div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:500}}>{f.examiner}</div>
                  </div>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:22,letterSpacing:'-0.02em',lineHeight:1,flexShrink:0}}>
                    {f.band}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern analysis */}
          <div style={{marginTop:28}}>
            <div className="eye" style={{marginBottom:4}}>● PATTERNS · TỪ EXAMINER</div>
            <div style={{marginBottom:18,fontSize:12.5,color:'var(--ink-2)'}}>
              Những lỗi tái diễn được đánh dấu từ phiên examiner. Số lần xuất hiện trong 4 tuần qua.
            </div>
            {D.pitfalls.map((p, i) => (
              <div key={p.code} className={`pat${p.hot ? ' hot' : ''}`}>
                <div className="pat-num">{i + 1}</div>
                <div className="pat-body">
                  <h3>{p.name}</h3>
                  <div className="quote">"{p.note}"</div>
                </div>
                <div className="pat-seen">
                  {p.seen}
                  <span className="lbl">LẦN GẶP</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback log detail */}
          <div style={{marginTop:28}}>
            <div className="eye" style={{marginBottom:12}}>● CHI TIẾT PHẢN HỒI</div>
            {D.feedback_log.map((f, i) => (
              <div key={i} style={{
                padding:'16px', marginBottom:10,
                background:'var(--bg)', border:'1px solid var(--hair)',
                borderRadius:14, borderLeft:'4px solid var(--butter)',
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.12em',color:'var(--mute)'}}>{f.date} · </span>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.10em',color:'var(--coral)'}}>{f.kind}</span>
                    <div style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:500,marginTop:2}}>{f.examiner}</div>
                  </div>
                  <div style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:32,letterSpacing:'-0.03em',lineHeight:1}}>
                    {f.band}
                  </div>
                </div>
                <div style={{
                  fontSize:13, color:'var(--ink-2)', lineHeight:1.6,
                  borderLeft:'2px solid var(--hair)', paddingLeft:12, fontStyle:'italic',
                }}>
                  "{f.note}"
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
window.FeedbackScreen = FeedbackScreen;
