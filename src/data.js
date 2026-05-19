// Gieo · IELTS Daily Plan — loader
// Content sống ở /content/plan.yaml (mount vào container, sửa → refresh).
// Set window.GIEO_PLAN + resolve window.GIEO_PLAN_READY khi xong.

window.GIEO_PLAN = null;
window.GIEO_PLAN_READY = (async () => {
  const res = await fetch('/content/plan.yaml', { cache: 'no-cache' });
  if (!res.ok) throw new Error(`plan.yaml ${res.status}`);
  const text = await res.text();
  const plan = jsyaml.load(text);
  window.GIEO_PLAN = plan;
  return plan;
})().catch(err => {
  console.error('[gieo] không load được plan.yaml:', err);
  document.body.innerHTML = `<pre style="padding:24px;font-family:monospace;color:#a33">
[gieo] Lỗi load content/plan.yaml — kiểm tra file syntax.
${err.message}
  </pre>`;
});
