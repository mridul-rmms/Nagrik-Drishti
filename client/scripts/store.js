import { api } from './api.js';

export const store = {
  view: 'dashboard',
  dashboard: null,
  hotspots: [],
  clusters: [],
  trends: [],
  graph: { nodes: [], edges: [] },
  departments: [],
  async refresh() {
    const [dashboard, hotspots, clusters, trends, graph, departments] = await Promise.all([
      api.dashboard(), api.hotspots(), api.clusters(), api.trends(), api.graph(), api.departments()
    ]);
    this.dashboard = dashboard;
    this.hotspots = hotspots.hotspots;
    this.clusters = clusters.clusters;
    this.trends = trends.trends;
    this.graph = graph;
    this.departments = departments.departments;
  }
};
