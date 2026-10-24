async function request(path, options = {}) {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json', 'X-Actor': 'Demo Officer', ...(options.headers || {}) }, ...options });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error?.message || `Request failed with status ${response.status}.`);
  return payload;
}

export const api = Object.freeze({
  health: () => request('/api/health'),
  dashboard: () => request('/api/dashboard'),
  hotspots: () => request('/api/hotspots'),
  trends: () => request('/api/trends'),
  graph: () => request('/api/graph'),
  departments: () => request('/api/departments'),
  clusters: (filters = {}) => request(`/api/clusters?${new URLSearchParams(filters)}`),
  cluster: (id) => request(`/api/clusters/${id}`),
  createPost: (post) => request('/api/posts', { method: 'POST', body: JSON.stringify(post) }),
  updateCluster: (id, update) => request(`/api/clusters/${id}`, { method: 'PATCH', body: JSON.stringify(update) })
});
