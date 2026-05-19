function GieoTopnav() {
  const D = window.GIEO_PLAN;
  return (
    <nav className="topnav">
      <span className="brand">gieo<span className="dot">.</span></span>
      <div className="meta">
        <span>Band <b>{D.student.current_overall} → {D.student.target_overall}</b></span>
        <span>Chuỗi <b>{D.student.streak}</b></span>
        <span>→ IELTS <b>{D.student.days_to_test}</b> ngày</span>
      </div>
    </nav>
  );
}
window.GieoTopnav = GieoTopnav;
