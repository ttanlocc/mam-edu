const GIEO_NAV_GROUPS = {
  lich: [
    { id: 'today',    href: '#/today',    g: '◉', t: 'Hôm nay' },
    { id: 'week',     href: '#/week',     g: '▤', t: 'Tuần này' },
    { id: 'roadmap',  href: '#/roadmap',  g: '⚐', t: 'Lộ trình' },
  ],
  baitap: [
    { id: 'writing',   href: '#/writing',  g: '✎', t: 'Writing' },
    { id: 'speaking',  href: '#/',         g: '◐', t: 'Speaking' },
    { id: 'reading',   href: '#/',         g: '◇', t: 'Reading' },
    { id: 'listening', href: '#/',         g: '◉', t: 'Listening' },
    { id: 'anki',      href: '#/',         g: '▥', t: 'Anki' },
    { id: 'feedback',  href: '#/feedback', g: '☷', t: 'Phản hồi' },
    { id: 'mock',      href: '#/',         g: '◆', t: 'Mock tests' },
    { id: 'tree',      href: '#/',         g: '✦', t: 'Cây Múi' },
  ],
};

function GieoSidebar({ activeId }) {
  const D = window.GIEO_PLAN;
  const inLich = GIEO_NAV_GROUPS.lich.some(i => i.id === activeId);
  const [tab, setTab] = React.useState(inLich ? 'lich' : 'baitap');
  const [collapsed, setCollapsed] = React.useState(
    localStorage.getItem('gieo_sidebar') === 'collapsed'
  );

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('gieo_sidebar', next ? 'collapsed' : 'open');
  };

  const items = GIEO_NAV_GROUPS[tab];

  return (
    <aside className={`side${collapsed ? ' collapsed' : ''}`}>
      <div className="stabs">
        <button className={`stab${tab === 'lich' ? ' active' : ''}`} onClick={() => setTab('lich')}>
          <span className="gly">▤</span><span className="lbl"> Lịch</span>
        </button>
        <button className={`stab${tab === 'baitap' ? ' active' : ''}`} onClick={() => setTab('baitap')}>
          <span className="gly">✎</span><span className="lbl"> Bài tập</span>
        </button>
      </div>

      <div className="sitems">
        {items.map(i => (
          <a key={i.id} className={`sitem${i.id === activeId ? ' active' : ''}`} href={i.href}>
            <span className="gly">{i.g}</span>
            <span className="lbl">{i.t}</span>
          </a>
        ))}
      </div>

      <div className="tree-card">
        <div className="stage">● CÂY MÚI · GĐ {D.student.tree_stage}</div>
        <div style={{display:'flex',justifyContent:'center',margin:'6px 0 4px'}}>
          <svg width="88" height="88" viewBox="0 0 200 200">
            <ellipse cx="100" cy="170" rx="60" ry="8" fill="#8B5A3C" opacity="0.20"/>
            <path d="M100 168 q 4 -32 0 -76" stroke="#7C9885" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <ellipse cx="72"  cy="130" rx="22" ry="10" fill="#7C9885" transform="rotate(-22 72 130)"/>
            <ellipse cx="130" cy="120" rx="26" ry="11" fill="#B5C7A1" transform="rotate(28 130 120)"/>
            <ellipse cx="84"  cy="100" rx="20" ry="9"  fill="#7C9885" transform="rotate(-15 84 100)"/>
            <ellipse cx="110" cy="86"  rx="22" ry="10" fill="#7C9885" transform="rotate(12 110 86)"/>
          </svg>
        </div>
        <div className="totals">
          <span>HẠT</span>
          <span>{D.student.seeds.toLocaleString()}</span>
        </div>
        <div className="bar-track" style={{marginTop:6}}>
          <div className="bar-fill" style={{width: `${Math.min(100, Math.max(0, (D.student.seeds / (D.student.seeds_per_stage || 2000)) * 100))}%`}}></div>
        </div>
        <div className="eye" style={{marginTop:6}}>
          CHUỖI <span style={{color:'var(--coral)'}}>{D.student.streak}</span> NGÀY
        </div>
      </div>

      <div className="s-spacer"></div>

      <button className="s-toggle" onClick={() => window.gieoLogout && window.gieoLogout()}>
        <span className="arr">↪</span>
        <span className="lbl">Đăng xuất</span>
      </button>
      <button className="s-toggle" onClick={toggle}>
        <span className="arr">←</span>
        <span className="lbl">Thu nhỏ</span>
      </button>
    </aside>
  );
}
window.GieoSidebar = GieoSidebar;
