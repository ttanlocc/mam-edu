// App shell — role + screen switcher with hash routing.

const { useState, useEffect } = React;

function parseHash() {
  // #role/screen  e.g. #student/today, #parent, #teacher, #mobile
  const raw = (window.location.hash || '#student/today').replace(/^#/, '');
  const [role, screen] = raw.split('/');
  return { role: role || 'student', screen: screen || 'today' };
}

function StudentNav({ label, current }) {
  const T = window.T, F = window.FONTS;
  const items = [
    { id: 'today',    label: 'Hôm nay' },
    { id: 'schedule', label: 'Lịch · tuần' },
    { id: 'homework', label: 'Bài tập' },
    { id: 'mobile',   label: 'Mobile' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 28px', borderBottom: `1px solid ${T.rule}`, gap: 24 }}>
      <a href="#student/today" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
        <svg width="22" height="22" viewBox="0 0 22 22"><rect x="2" y="2" width="18" height="18" fill="none" stroke={T.ink} strokeWidth="1.5"/><line x1="2" y1="11" x2="20" y2="11" stroke={T.coral} strokeWidth="1.5"/><circle cx="11" cy="11" r="2.5" fill={T.coral}/></svg>
        <span style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 14, letterSpacing: '0.04em' }}>laged<span style={{ color: T.coral }}>/</span>edu</span>
      </a>
      <div style={{ width: 1, height: 18, background: T.hair }} />
      <span style={{ fontFamily: F.mono, fontSize: 11, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
      <nav style={{ display: 'flex', gap: 18, marginLeft: 18, fontSize: 12 }}>
        {items.map(it => {
          const active = it.id === current;
          const href = it.id === 'mobile' ? '#mobile' : `#student/${it.id}`;
          return (
            <a key={it.id} href={href} style={{
              color: active ? T.ink : T.ink2,
              fontWeight: active ? 600 : 400,
              cursor: 'pointer', paddingBottom: 2, textDecoration: 'none',
              borderBottom: active ? `1.5px solid ${T.coral}` : '1.5px solid transparent',
            }}>{it.label}</a>
          );
        })}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14, fontFamily: F.mono, fontSize: 11, color: T.ink2 }}>
        <RoleSwitcher current="student" />
        <span style={{ width: 1, height: 14, background: T.hair }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.coral }} /> 14:32 · T4 08·05
        </span>
        <div style={{ width: 30, height: 30, background: T.ink, color: T.bg, borderRadius: 8, display: 'grid', placeItems: 'center', fontFamily: F.body, fontWeight: 600, fontSize: 12 }}>MA</div>
      </div>
    </div>
  );
}

function RoleHeader({ role, label, name, avatarBg }) {
  const T = window.T, F = window.FONTS;
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 28px', borderBottom: `1px solid ${T.rule}`, gap: 24 }}>
      <a href="#student/today" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
        <svg width="22" height="22" viewBox="0 0 22 22"><rect x="2" y="2" width="18" height="18" fill="none" stroke={T.ink} strokeWidth="1.5"/><line x1="2" y1="11" x2="20" y2="11" stroke={T.coral} strokeWidth="1.5"/><circle cx="11" cy="11" r="2.5" fill={T.coral}/></svg>
        <span style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 14, letterSpacing: '0.04em' }}>laged<span style={{ color: T.coral }}>/</span>{role}</span>
      </a>
      <div style={{ width: 1, height: 18, background: T.hair }} />
      <span style={{ fontFamily: F.mono, fontSize: 11, color: T.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14, fontFamily: F.mono, fontSize: 11, color: T.ink2 }}>
        <RoleSwitcher current={role} />
        <span style={{ width: 1, height: 14, background: T.hair }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.coral }} /> 14:32 · T4 08·05
        </span>
        <div style={{ width: 30, height: 30, background: avatarBg, color: T.bg, borderRadius: 8, display: 'grid', placeItems: 'center', fontFamily: F.body, fontWeight: 600, fontSize: 11 }}>{name}</div>
      </div>
    </div>
  );
}

function RoleSwitcher({ current }) {
  const T = window.T, F = window.FONTS;
  const roles = [
    { id: 'student', label: 'HS',   href: '#student/today' },
    { id: 'parent',  label: 'PH',   href: '#parent' },
    { id: 'teacher', label: 'GV',   href: '#teacher' },
  ];
  return (
    <div style={{ display: 'flex', gap: 4, padding: 2, background: T.paper, border: `1px solid ${T.hair}`, borderRadius: 6 }}>
      {roles.map(r => {
        const active = r.id === current;
        return (
          <a key={r.id} href={r.href} style={{
            padding: '4px 10px', fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em',
            background: active ? T.ink : 'transparent',
            color: active ? T.bg : T.ink2,
            textDecoration: 'none', borderRadius: 4, cursor: 'pointer',
          }}>{r.label}</a>
        );
      })}
    </div>
  );
}

function App() {
  const T = window.T;
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const { role, screen } = route;

  let content;
  if (role === 'mobile') {
    content = (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 40, background: T.paper }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <RoleSwitcher current="student" />
          <window.MobileScreen />
          <a href="#student/today" style={{ fontFamily: window.FONTS.mono, fontSize: 11, color: T.ink2 }}>← Back to desktop</a>
        </div>
      </div>
    );
  } else if (role === 'parent') {
    content = <window.ParentScreen RoleHeader={RoleHeader} />;
  } else if (role === 'teacher') {
    content = <window.TeacherScreen RoleHeader={RoleHeader} />;
  } else {
    // student
    if (screen === 'schedule') content = <window.ScheduleScreen Nav={StudentNav} />;
    else if (screen === 'homework') content = <window.HomeworkScreen Nav={StudentNav} />;
    else content = <window.TodayScreen Nav={StudentNav} />;
  }

  // Center frame on viewport, allow scroll if smaller
  return (
    <div style={{ minHeight: '100vh', background: T.paper, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: role === 'mobile' ? 0 : '20px 0' }}>
      <div style={{ boxShadow: role === 'mobile' ? 'none' : '0 4px 30px rgba(34,36,31,0.08)' }}>
        {content}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
