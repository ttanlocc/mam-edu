function App() {
  const getScreen = () => (window.location.hash.replace(/^#\/?/, '') || 'today').split('/')[0] || 'today';
  const [screen, setScreen]     = React.useState(getScreen);
  const [session, setSession]   = React.useState(undefined); // undefined = loading
  const [planReady, setPlanReady] = React.useState(!!window.GIEO_PLAN);
  const [demoUser, setDemoUser] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('gieo_demo_user') || 'null'); } catch { return null; }
  });

  React.useEffect(() => {
    const h = () => setScreen(getScreen());
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  React.useEffect(() => {
    window.GIEO_PLAN_READY?.then(() => setPlanReady(true));
  }, []);

  React.useEffect(() => {
    const auth = window.gieoAuth;
    if (!auth.configured) { setSession(null); return; }
    auth.getSession().then(setSession);
    const { data } = auth.onChange(s => setSession(s));
    return () => data?.subscription?.unsubscribe?.();
  }, []);

  // Loading screen — plan content or auth check in flight
  if (session === undefined || !planReady) {
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
                   fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.16em',color:'var(--mute)'}}>
        ● ĐANG MỞ CỬA…
      </div>
    );
  }

  // Auth gate — no real session AND no demo session → Login
  const loggedIn = !!session || !!demoUser;
  if (!loggedIn) return <window.LoginScreen />;

  // Course gate — logged in but hasn't picked a course → Course Select.
  // Seeds / streak / tree only start after "Bắt đầu gieo" is pressed.
  let course = null;
  try { course = JSON.parse(localStorage.getItem('gieo_course') || 'null'); } catch {}
  if (!course) return <window.CourseSelectScreen />;

  // Overlay course state onto the shared plan so Sidebar / Topnav / Today read
  // the fresh-start counters instead of the YAML demo persona.
  if (window.GIEO_PLAN?.student) {
    const s = window.GIEO_PLAN.student;
    s.seeds = course.seeds;
    s.streak = course.streak;
    s.tree_stage = course.tree_stage;
    s.days_to_test = course.days_to_test;
  }

  const screens = {
    today:    window.DailyPlanScreen,
    week:     window.WeekScreen,
    roadmap:  window.RoadmapScreen,
    writing:  window.WritingScreen,
    feedback: window.FeedbackScreen,
    session:  window.SessionScreen,
  };
  const Screen = screens[screen] || window.DailyPlanScreen;
  return <Screen />;
}

window.gieoLogout = async () => {
  if (window.gieoAuth?.configured) await window.gieoAuth.signOut();
  localStorage.removeItem('gieo_demo_user');
  localStorage.removeItem('gieo_course');
  window.location.hash = '#/today';
  window.location.reload();
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
