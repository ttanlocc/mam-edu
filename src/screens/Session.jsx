// Gieo · Session detail — full-screen "study mode" for ONE task block.
// Opened from Today's "Bắt đầu": route #/session/{weekN}/{dow}/{blockId}
// Shows: goal (prompt) · material (audio/pdf) · step checklist (persisted) · finish.

function SessionScreen() {
  const parts    = window.location.hash.replace(/^#\/?/, '').split('/'); // [session, weekN, dow, blockId]
  const weekN    = parts[1] || String(window.gieoApi.currentWeek());
  const dow      = parts[2] || '';
  const blockId  = parts[3] || '';
  const courseId = window.gieoApi.currentCourseId();
  const key      = `${weekN}:${dow}:${blockId}`;

  const [week, setWeek]   = React.useState(null);
  const [entry, setEntry] = React.useState(null);   // progress entry for this block
  const [err, setErr]     = React.useState(null);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    Promise.all([
      window.gieoApi.getWeek(courseId, weekN),
      window.gieoApi.getState(),
    ]).then(([w, s]) => {
      setWeek(w);
      setEntry((s && s.progress && s.progress[courseId] && s.progress[courseId][key]) || {});
    }).catch(e => setErr(String(e)));
  }, [courseId, weekN, dow, blockId]);

  const goBack = () => { window.location.hash = '#/today'; };

  // read-modify-write the whole state blob (mirrors Today.logTask)
  const saveEntry = async (nextEntry) => {
    setEntry(nextEntry);
    try {
      const state = (await window.gieoApi.getState()) || {};
      const cp = { ...(state.progress?.[courseId] || {}), [key]: nextEntry };
      await window.gieoApi.putState({ ...state, progress: { ...(state.progress || {}), [courseId]: cp } });
    } catch (e) { /* optimistic — keep local */ }
  };

  if (err) return <div style={{padding:24,color:'#a33',fontFamily:'var(--font-mono)'}}>Không mở được buổi: {err} · <a href="#/today">← Hôm nay</a></div>;
  if (!week || !entry) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--mute)',fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.14em'}}>● ĐANG MỞ BUỔI…</div>;

  const day   = (week.days || []).find(d => d.dow === dow);
  const block = day && (day.blocks || []).find(b => b.id === blockId);
  if (!block) return <div style={{padding:32,fontFamily:'var(--font-body)'}}>Không tìm thấy buổi này. <a href="#/today">← Về Hôm nay</a></div>;

  const tasks     = block.tasks || [];
  const steps     = entry.steps || {};
  const stepsDone = tasks.filter((_, i) => steps[i]).length;
  const allDone   = tasks.length > 0 && stepsDone === tasks.length;
  const kc        = block.kind_color || 'mute';
  const MV        = window.MaterialView;

  const toggleStep = (i) => saveEntry({ ...entry, steps: { ...steps, [i]: !steps[i] } });
  const finish = async () => {
    setSaving(true);
    await saveEntry({ ...entry, done: true, logged_at: new Date().toISOString() });
    goBack();
  };

  const eye = { fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'0.14em', color:'var(--mute)', marginBottom:8 };

  return (
    <div style={{minHeight:'100vh', background:'var(--paper)', display:'flex', flexDirection:'column'}}>
      {/* Header */}
      <header style={{background:'var(--paper)', borderBottom:'1px solid var(--hair)', padding:'14px 20px'}}>
        <button onClick={goBack} style={{border:'none', background:'transparent', color:'var(--ink-2)', fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em', cursor:'pointer', padding:0, marginBottom:12}}>← HÔM NAY</button>
        <div style={{display:'flex', alignItems:'flex-start', gap:12, maxWidth:660, margin:'0 auto', width:'100%'}}>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em', color:`var(--${kc})`, marginBottom:6}}>
              ● {block.kind} · {block.time} · {block.duration}′
            </div>
            <h1 style={{fontFamily:'var(--font-display)', fontWeight:500, fontSize:24, letterSpacing:'-0.02em', color:'var(--ink)', margin:0, lineHeight:1.2}}>{block.title}</h1>
          </div>
          {entry.done && <span style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em', color:'var(--sage)', border:'1px solid var(--sage)', borderRadius:999, padding:'3px 10px', whiteSpace:'nowrap'}}>✓ ĐÃ XONG</span>}
        </div>
      </header>

      {/* Body */}
      <main style={{flex:1, maxWidth:660, margin:'0 auto', width:'100%', padding:'22px 20px 120px', boxSizing:'border-box'}}>
        <section style={{marginBottom:26}}>
          <div style={eye}>● LÀM GÌ</div>
          <p style={{fontSize:15, lineHeight:1.65, color:'var(--ink-2)', margin:0}}>{block.prompt}</p>
        </section>

        {block.material && MV && (
          <section style={{marginBottom:26}}>
            <div style={eye}>● TÀI LIỆU</div>
            <MV m={block.material} />
          </section>
        )}

        <section>
          <div style={eye}>● CÁC BƯỚC · {stepsDone}/{tasks.length} · {block.duration}′</div>
          <div>
            {tasks.map((t, i) => {
              const on = !!steps[i];
              return (
                <div key={i} onClick={() => toggleStep(i)} role="button" tabIndex={0}
                     style={{display:'flex', alignItems:'center', gap:12, padding:'11px 4px', borderBottom:'1px solid var(--hair)', cursor:'pointer'}}>
                  <span style={{width:20, height:20, borderRadius:'50%', flex:'none', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#fff',
                    border: on ? '1.5px solid var(--sage)' : '1.5px solid var(--mute)', background: on ? 'var(--sage)' : 'transparent'}}>{on ? '✓' : ''}</span>
                  <span style={{flex:1, fontSize:14.5, color: on ? 'var(--mute)' : 'var(--ink)', textDecoration: on ? 'line-through' : 'none'}}>{t.t}</span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--mute)'}}>{t.m}′</span>
                </div>
              );
            })}
          </div>
        </section>

        {block.href === '#/writing' && (
          <a href={block.href} style={{display:'inline-flex', alignItems:'center', gap:6, marginTop:20, fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.06em', color:'var(--ink)', textDecoration:'none', border:'1px solid var(--hair)', borderRadius:9, padding:'8px 14px', background:'var(--paper)'}}>
            ✎ Mở trình soạn Writing →
          </a>
        )}
      </main>

      {/* Footer */}
      <footer style={{position:'sticky', bottom:0, background:'var(--paper)', borderTop:'1px solid var(--hair)', padding:'12px 20px'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, maxWidth:660, margin:'0 auto', width:'100%'}}>
          <div style={{fontFamily:'var(--font-mono)', fontSize:12, color:`var(--${kc})`}}>+{block.reward_seeds} hạt{allDone ? ' · đủ bước rồi 🌱' : ''}</div>
          <button onClick={finish} disabled={saving || entry.done}
            style={{fontSize:13.5, fontWeight:500, padding:'10px 20px', border:'none', borderRadius:10, cursor: entry.done ? 'default' : 'pointer',
              background: entry.done ? 'var(--hair)' : 'var(--ink)', color: entry.done ? 'var(--mute)' : 'var(--paper)', fontFamily:'var(--font-body)'}}>
            {entry.done ? '✓ Đã xong' : (saving ? 'Đang lưu…' : '✓ Xong buổi này')}
          </button>
        </div>
      </footer>
    </div>
  );
}
window.SessionScreen = SessionScreen;
