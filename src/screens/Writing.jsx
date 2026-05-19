function WritingScreen() {
  const D = window.GIEO_PLAN;
  const block = D.today_blocks.find(b => b.kind === 'WRITING');
  const [step, setStep] = React.useState(1);
  const [text, setText] = React.useState('');
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const steps = [
    { n: 1, label: 'OUTLINE',    nm: 'Lập dàn ý' },
    { n: 2, label: 'WRITE',      nm: 'Viết essay' },
    { n: 3, label: 'SELF-CHECK', nm: 'Tự kiểm tra' },
    { n: 4, label: 'MODEL',      nm: 'So model' },
  ];

  const outline = [
    { tag: 'INTRO',  text: 'Paraphrase + TS: "Both camps make valid points; however, the net effect depends on individual usage patterns."' },
    { tag: 'BODY 1', text: 'Harmful view · EX: passive scrolling displaces face-to-face time · EG: dinner table, family data · LK: Consequently' },
    { tag: 'BODY 2', text: 'Beneficial view · EX: bridging distance, diaspora families · EG: video call, 2.9B users · LK: Nevertheless' },
    { tag: 'CONC',   text: 'Own view: depends on intentionality · restate both · no new argument' },
  ];

  return (
    <>
      <window.GieoTopnav />
      <div className="app narrow">
        <window.GieoSidebar activeId="writing" />

        <main>
          <div className="page-hero">
            <div>
              <div className="eye acc">● WRITING · TASK 2</div>
              <h1 className="page-title">Discussion <b>essay</b>.</h1>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="eye">● TARGET</div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:42,letterSpacing:'-0.03em',lineHeight:1}}>
                7.0
              </div>
              <div className="eye" style={{color:'var(--butter)',marginTop:4}}>WRITING BAND</div>
            </div>
          </div>

          {/* Step strip */}
          <div className="step-strip">
            {steps.map(s => (
              <div
                key={s.n}
                className={s.n === step ? 'cur' : s.n < step ? 'done' : ''}
                onClick={() => setStep(s.n)}
                style={{cursor:'pointer'}}
              >
                {s.label}
                <span className="nm">{s.nm}</span>
              </div>
            ))}
          </div>

          <div className="editor-wrap">
            {/* Left: editor */}
            <div className="editor-card">
              <div className="prompt-bar">
                <span className="tag">● TOPIC · TECHNOLOGY</span>
                <div className="body">
                  {block?.prompt || 'Some people believe smartphones are destroying real-life social interaction. Others argue they help people stay connected. Discuss both views and give your own opinion.'}
                </div>
              </div>

              {step === 1 ? (
                /* Outline step */
                <div style={{padding:'24px 28px'}}>
                  <div className="eye" style={{marginBottom:14}}>● DÀN Ý · TS · EX · EG · LK</div>
                  <div style={{display:'flex',flexDirection:'column',gap:14}}>
                    {outline.map((row, i) => (
                      <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                        <span style={{
                          fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.14em',
                          color:'var(--coral)', fontWeight:700, paddingTop:3, width:44, flexShrink:0,
                        }}>{row.tag}</span>
                        <span style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.55}}>{row.text}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      marginTop:24, padding:'10px 24px', background:'var(--ink)', color:'var(--bg)',
                      border:'none', borderRadius:10, fontFamily:'var(--font-mono)',
                      fontSize:10, fontWeight:600, letterSpacing:'0.08em', cursor:'pointer',
                    }}
                  >
                    BẮT ĐẦU VIẾT →
                  </button>
                </div>
              ) : step === 2 ? (
                /* Write step */
                <>
                  <div
                    className="editor-area"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={e => setText(e.currentTarget.innerText)}
                    data-placeholder="Bắt đầu viết essay của bạn…"
                    style={{minHeight:360}}
                  />
                  <div className="wc-bar">
                    <span className="wc">
                      <b>{wordCount}</b> / 250 từ
                    </span>
                    <button
                      className="submit-btn"
                      onClick={() => setStep(3)}
                      disabled={wordCount < 200}
                      style={{opacity: wordCount < 200 ? 0.4 : 1}}
                    >
                      NỘP → TỰ KIỂM
                    </button>
                  </div>
                </>
              ) : step === 3 ? (
                /* Self-check step */
                <div style={{padding:'24px 28px'}}>
                  <div className="eye" style={{marginBottom:16}}>● 4 TIÊU CHÍ IELTS</div>
                  {[
                    { k:'TR', label:'Task Response',         q:'Trả lời đúng câu hỏi? Có cả 2 views + own opinion?' },
                    { k:'CC', label:'Coherence & Cohesion',  q:'Topic sentence mỗi đoạn rõ? Linker đa dạng, không cliché?' },
                    { k:'LR', label:'Lexical Resource',      q:'Paraphrase tốt? Có collocations, không lặp từ?' },
                    { k:'GR', label:'Grammar Range',         q:'Complex sentences? Mixed tenses? 0 errors cơ bản?' },
                  ].map(c => (
                    <div key={c.k} style={{
                      display:'flex', gap:14, padding:'12px 0',
                      borderBottom:'1px solid var(--hair)', alignItems:'flex-start',
                    }}>
                      <span style={{
                        fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.16em',
                        color:'var(--butter)', fontWeight:700, width:28, flexShrink:0, paddingTop:2,
                      }}>{c.k}</span>
                      <div>
                        <div style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:14}}>{c.label}</div>
                        <div style={{fontSize:12.5,color:'var(--ink-2)',marginTop:3,lineHeight:1.5}}>{c.q}</div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setStep(4)}
                    style={{
                      marginTop:20, padding:'10px 24px', background:'var(--ink)', color:'var(--bg)',
                      border:'none', borderRadius:10, fontFamily:'var(--font-mono)',
                      fontSize:10, fontWeight:600, letterSpacing:'0.08em', cursor:'pointer',
                    }}
                  >
                    XEM MODEL ANSWER →
                  </button>
                </div>
              ) : (
                /* Model answer step */
                <div style={{padding:'24px 28px'}}>
                  <div className="eye" style={{marginBottom:12}}>● SIMON MODEL ANSWER · BAND 8.0</div>
                  <div style={{
                    fontFamily:'Charter,Georgia,serif', fontSize:15, lineHeight:1.8,
                    color:'var(--ink)', background:'var(--paddy)', padding:'20px 24px',
                    borderRadius:12,
                  }}>
                    <p>The debate over whether smartphones harm or enhance human connection is one that divides opinion sharply. While there are legitimate concerns about digital distraction, I would argue that the technology itself is neutral, and its effects depend entirely on how it is used.</p>
                    <p>Those who view smartphones as socially destructive point to the phenomenon of <b style={{background:'rgba(124,152,133,0.15)',padding:'0 2px',borderRadius:3}}>phubbing</b> — the act of snubbing someone in favour of one's phone. Studies suggest that the mere presence of a device on a dinner table reduces conversational depth, as participants subconsciously moderate their topics to avoid being interrupted. <b>Consequently</b>, face-to-face relationships may become shallower over time.</p>
                    <p>Nevertheless, for the 270 million members of diaspora communities worldwide, smartphones are not a substitute for real interaction but the only viable form of it. A Vietnamese student studying in Berlin and her grandmother in Hà Nội can sustain a relationship through daily video calls that would have been impossible a generation ago. <b>In this sense</b>, the technology is not eroding connection but extending its reach across previously insurmountable distances.</p>
                    <p>In conclusion, smartphones carry both risks and possibilities. The key variable is intentionality: used mindlessly, they fragment attention; used deliberately, they can deepen bonds that geography would otherwise sever.</p>
                  </div>
                  <div style={{marginTop:16,display:'flex',gap:10,alignItems:'center'}}>
                    <a href="#/today" className="start">← QUAY LẠI HÔM NAY</a>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.10em',color:'var(--sage)'}}>
                      ✓ WRITING BLOCK HOÀN THÀNH
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: outline + coach */}
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <div className="outline-card">
                <div className="eye" style={{marginBottom:8}}>● DÀN Ý NHANH</div>
                {outline.map((row, i) => (
                  <div key={i} className="ol-row">
                    <span className="ol-tag">{row.tag}</span>
                    <span className="ol-text">{row.text.split('·')[0]}</span>
                  </div>
                ))}
              </div>

              <div className="coach-card">
                <div className="coach-label">● AI COACH</div>
                <div className="coach-text">
                  Tránh mở bài bằng <b>"In today's rapidly changing world"</b> — IELTS 2026 examiner notes đánh dấu đây là memorised template và giảm TR score. Thay bằng cách paraphrase thẳng từ đề bài.
                </div>
              </div>

              <div className="card" style={{fontSize:12.5}}>
                <div className="eye" style={{marginBottom:10}}>● THỜI GIAN</div>
                {block?.tasks.map((t, i) => (
                  <div key={i} style={{
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'6px 0', borderBottom:'1px solid var(--hair)',
                  }}>
                    <span style={{color:'var(--ink-2)',flex:1,paddingRight:10}}>{t.t}</span>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--mute)',flexShrink:0}}>{t.m}′</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
window.WritingScreen = WritingScreen;
