// Gieo · Login screen — single-user "Continue as Đậu"
function LoginScreen() {
  const [busy, setBusy] = React.useState(false);
  const D = window.GIEO_PLAN;
  const seeds  = D?.student?.seeds  ?? 1284;
  const streak = D?.student?.streak ?? 47;

  const handleContinue = () => {
    setBusy(true);
    localStorage.setItem('gieo_demo_user', JSON.stringify({ email: 'dau@gieo.app', name: 'Đậu', at: Date.now() }));
    window.location.hash = '#/today';
    window.location.reload();
  };

  return (
    <div className="lg-shell">
      {/* ───── LEFT · brand / atmosphere ───── */}
      <aside className="lg-art">
        <div className="lg-meta">
          <div><span className="pulse"></span>Hệ <b>v2.4</b></div>
          <div>{D?.student?.days_to_test ?? 244} ngày → IELTS</div>
          <div>Mầm · Gieo · Lớn</div>
        </div>

        <header className="lg-head">
          <svg className="lg-mark" viewBox="0 0 64 64" fill="none">
            <path d="M 6 50 Q 32 38 58 50 L 58 58 L 6 58 Z" fill="var(--soil)"/>
            <path d="M 6 54 Q 32 46 58 54 L 58 58 L 6 58 Z" fill="var(--ink)" opacity="0.18"/>
            <ellipse cx="32" cy="46" rx="5" ry="3.6" fill="var(--soil)"/>
            <ellipse cx="32" cy="46" rx="5" ry="3.6" fill="var(--ink)" opacity="0.18"/>
            <path d="M 32 44 C 31.5 38, 32.5 32, 32 24" stroke="var(--coral)" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
            <path d="M 32 28 C 24 26, 19 21, 19.5 13 C 26 15, 31 21, 32 28 Z" fill="var(--coral)"/>
            <path d="M 32 25 C 40 22.5, 45.5 16.5, 44.5 8 C 38 10, 32.5 17, 32 25 Z" fill="var(--coral)"/>
            <circle cx="32" cy="22.5" r="1.5" fill="var(--rice)"/>
          </svg>
          <span className="lg-brand">gieo<span className="dot">.</span></span>
        </header>

        <div className="lg-hero">
          <div className="lg-eyebrow">● Mỗi ngày · một hạt</div>
          <h1 className="lg-headline">
            Gieo hạt hôm nay,<br/>
            <em>gặt 8.0</em> ngày mai.
          </h1>
          <p className="lg-sub">
            Một lộ trình IELTS bền bỉ — không cày 12 tiếng, không streak ảo.
            Mỗi block là một hạt. Cây Múi lớn lên cùng band điểm.
          </p>

          <div className="lg-tree-wrap">
            <svg className="lg-tree-svg" viewBox="0 0 64 64" fill="none">
              <ellipse cx="32" cy="56" rx="20" ry="3" fill="var(--soil)" opacity="0.18"/>
              <path d="M 6 50 Q 32 40 58 50 L 58 58 L 6 58 Z" fill="var(--soil)"/>
              <ellipse cx="32" cy="46" rx="5" ry="3.4" fill="var(--soil)"/>
              <ellipse cx="32" cy="46" rx="5" ry="3.4" fill="var(--ink)" opacity="0.15"/>
              <path d="M 32 44 q 0 -18 0 -28" stroke="var(--coral)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              <ellipse cx="22" cy="28" rx="9" ry="5" fill="var(--coral)" transform="rotate(-22 22 28)"/>
              <ellipse cx="42" cy="22" rx="11" ry="5.5" fill="var(--bamboo)" transform="rotate(28 42 22)"/>
              <ellipse cx="26" cy="14" rx="8" ry="4" fill="var(--coral)" transform="rotate(-12 26 14)"/>
              <circle cx="34" cy="10" r="2" fill="var(--rice)"/>
            </svg>
            <div className="lg-tree-meta">
              <div className="lg-tree-stage">CÂY MÚI · <span className="acc">GĐ {D?.student?.tree_stage ?? 0}</span></div>
              <div className="lg-tree-title">{['Hạt mầm','Nảy mầm','Đang lớn','Đang ra hoa','Chín rộ'][D?.student?.tree_stage ?? 0] ?? 'Hạt mầm'}</div>
              <div className="lg-tree-bar"><i></i></div>
              <div className="lg-tree-foot">
                <span>{seeds.toLocaleString()} hạt</span>
                <span>chuỗi <b>{streak}</b> ngày</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="lg-art-foot">
          <span>© 2026 Gieo</span>
          <span><a href="#">Điều khoản</a> · <a href="#">Bảo mật</a></span>
        </footer>
      </aside>

      {/* ───── RIGHT · single-tap continue ───── */}
      <section className="lg-form-col">
        <div className="lg-top">
          <span className="eye">● MỘT NGƯỜI · MỘT CÂY MÚI</span>
        </div>

        <div className="lg-form-wrap">
          <h2 className="lg-title">Chào mừng quay lại 👋</h2>
          <p className="lg-greet">Cây Múi đang đợi bạn tưới. Một chạm để tiếp tục lộ trình.</p>

          <button className="lg-submit" type="button" onClick={handleContinue} disabled={busy} style={{marginTop:24}}>
            <span style={{fontSize:22,marginRight:4}}>🫘</span>
            <span>{busy ? 'Đang mở cửa…' : 'Tiếp tục với tư cách Đậu'}</span>
            {!busy && <span className="arr">→</span>}
          </button>

          <div className="lg-form-foot" style={{marginTop:18}}>
            Chuỗi <b>{streak}</b> ngày · {seeds.toLocaleString()} hạt đã gieo
          </div>
        </div>
      </section>
    </div>
  );
}
window.LoginScreen = LoginScreen;
