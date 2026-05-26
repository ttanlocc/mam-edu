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

  function currentCourseId() {
    try {
      const raw = localStorage.getItem('gieo_course');
      if (!raw) return 'ielts-70-80';
      const parsed = JSON.parse(raw);
      return parsed?.id || 'ielts-70-80';
    } catch {
      return 'ielts-70-80';
    }
  }

  window.gieoApi = {
    get base() { return getBase(); },
    currentCourseId,
    getCourses: () => getJson('/api/courses'),
    getCourse: (id) => getJson(`/api/courses/${encodeURIComponent(id)}`),
    getWeek: (id, n) => getJson(`/api/courses/${encodeURIComponent(id)}/weeks/${n}`),
  };
})();
