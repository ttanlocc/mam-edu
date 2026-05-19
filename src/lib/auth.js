// Gieo · Supabase auth wrapper
// `window.supabase` đến từ UMD bundle (@supabase/supabase-js v2).
// File config.js phải load trước file này.
(function () {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.GIEO_CONFIG || {};
  const configured =
    SUPABASE_URL && SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes('YOUR-PROJECT') &&
    !SUPABASE_ANON_KEY.includes('YOUR-ANON-KEY');

  const client = configured && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null;

  window.gieoAuth = {
    configured,
    client,
    getSession:    () => client ? client.auth.getSession().then(r => r.data.session) : Promise.resolve(null),
    onChange:      cb => client ? client.auth.onAuthStateChange((_e, s) => cb(s)) : { data: { subscription: { unsubscribe(){} } } },
    signInEmail:   (email, password) => client.auth.signInWithPassword({ email, password }),
    signUpEmail:   (email, password) => client.auth.signUp({ email, password }),
    signInGoogle:  () => client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } }),
    signInApple:   () => client.auth.signInWithOAuth({ provider: 'apple',  options: { redirectTo: window.location.origin } }),
    signOut:       () => client.auth.signOut(),
  };
})();
