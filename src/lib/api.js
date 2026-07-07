// Gieo · API client — wraps fetch for content endpoints.
// Exposes window.gieoApi for screens to use.

(function () {
  // Read base lazily at call-time so that window.GIEO_CONFIG can be set
  // at any point (e.g. by tests after page load) and still be honoured.
  function getBase() {
    return (window.GIEO_CONFIG && window.GIEO_CONFIG.API_BASE) || '';
  }

  async function getJson(path) {
    const res = await fetch(getBase() + path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${path} → ${res.status}`);
    return res.json();
  }

  function currentCourse() {
    try {
      return JSON.parse(localStorage.getItem('gieo_course') || 'null');
    } catch {
      return null;
    }
  }

  function currentCourseId() {
    return currentCourse()?.id || 'ielts-85';
  }

  function currentWeek() {
    return currentCourse()?.current_week || 1;
  }

  async function putJson(path, body) {
    const res = await fetch(getBase() + path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`${path} → ${res.status}`);
    return res.json();
  }

  window.gieoApi = {
    get base() { return getBase(); },
    currentCourse,
    currentCourseId,
    currentWeek,
    getCourses: () => getJson('/api/courses'),
    getCourse: (id) => getJson(`/api/courses/${encodeURIComponent(id)}`),
    getWeek: (id, n) => getJson(`/api/courses/${encodeURIComponent(id)}/weeks/${n}`),
    getState: () => getJson('/api/state'),
    putState: (body) => putJson('/api/state', body),
  };
})();
