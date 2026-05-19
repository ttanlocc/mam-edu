// Gieo · runtime config
// Tạo project tại https://supabase.com/dashboard → Settings → API
// Paste giá trị vào đây. Anon key public-safe vì RLS bảo vệ.
// Merge — preserve any pre-set values (e.g. API_BASE injected by tests).
window.GIEO_CONFIG = Object.assign({
  SUPABASE_URL:      'https://YOUR-PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR-ANON-KEY',
}, window.GIEO_CONFIG || {});
