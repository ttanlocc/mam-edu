// Gieo · API client — wraps fetch for content endpoints.
// Exposes window.gieoApi for screens to use.

(function () {
  const base = (window.GIEO_CONFIG && window.GIEO_CONFIG.API_BASE) || '';

  async function getJson(path) {
    const res = await fetch(base + path, { cache: 'no-cache' });
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
    base,
    currentCourseId,
    getCourses: () => getJson('/api/courses'),
    getCourse: (id) => getJson(`/api/courses/${encodeURIComponent(id)}`),
    getWeek: (id, n) => getJson(`/api/courses/${encodeURIComponent(id)}/weeks/${n}`),
  };
})();
