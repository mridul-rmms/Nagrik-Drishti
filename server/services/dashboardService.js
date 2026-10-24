import { ACTIVE_STATUSES } from '../domain/constants.js';
import { clusterRepository } from '../database/repositories/clusterRepository.js';

const dayKey = (date) => new Date(date).toISOString().slice(0, 10);

export const dashboardService = {
  summary() {
    const clusters = clusterRepository.list();
    const active = clusters.filter((cluster) => ACTIVE_STATUSES.includes(cluster.status));
    const critical = active.filter((cluster) => cluster.priority_level === 'Critical');
    const verified = clusters.filter((cluster) => ['Verified', 'Assigned', 'In Progress', 'Resolved', 'Closed'].includes(cluster.status));
    const workloads = Object.values(active.reduce((result, cluster) => {
      const key = cluster.department_code;
      result[key] ||= { code: key, name: cluster.department_name, total: 0, critical: 0 };
      result[key].total += 1;
      if (cluster.priority_level === 'Critical') result[key].critical += 1;
      return result;
    }, {})).sort((a, b) => b.total - a.total);
    return {
      metrics: {
        activeClusters: active.length,
        criticalClusters: critical.length,
        verifiedRate: clusters.length ? Math.round((verified.length / clusters.length) * 100) : 0,
        sourceReports: clusters.reduce((sum, cluster) => sum + cluster.report_count, 0)
      },
      critical: critical.slice(0, 5),
      workload: workloads,
      recent: clusters.slice(0, 8)
    };
  },
  hotspots() {
    const buckets = new Map();
    for (const cluster of clusterRepository.list()) {
      if (!Number.isFinite(cluster.latitude) || !Number.isFinite(cluster.longitude)) continue;
      const key = `${cluster.district || cluster.locality}|${cluster.category}`;
      const bucket = buckets.get(key) || { key, locality: cluster.locality, district: cluster.district, category: cluster.category, latitude: cluster.latitude, longitude: cluster.longitude, clusters: 0, reports: 0, maxPriority: 0, clusterIds: [] };
      bucket.clusters += 1;
      bucket.reports += cluster.report_count;
      bucket.maxPriority = Math.max(bucket.maxPriority, cluster.priority_score);
      bucket.clusterIds.push(cluster.id);
      buckets.set(key, bucket);
    }
    return [...buckets.values()].sort((a, b) => b.maxPriority - a.maxPriority);
  },
  trends() {
    const clusters = clusterRepository.list();
    const byDay = new Map();
    for (const cluster of clusters) {
      const key = dayKey(cluster.updated_at);
      const entry = byDay.get(key) || { date: key, total: 0, critical: 0 };
      entry.total += cluster.report_count;
      entry[cluster.category] = (entry[cluster.category] || 0) + cluster.report_count;
      if (cluster.priority_level === 'Critical') entry.critical += 1;
      byDay.set(key, entry);
    }
    return [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date));
  },
  graph() {
    const clusters = clusterRepository.list();
    const nodes = [];
    const edges = [];
    const seen = new Set();
    const addNode = (id, label, type) => { if (!seen.has(id)) { nodes.push({ id, label, type }); seen.add(id); } };
    for (const cluster of clusters) {
      const clusterId = `cluster:${cluster.id}`;
      const departmentId = `department:${cluster.department_code}`;
      const locationId = `location:${cluster.locality}`;
      addNode(clusterId, cluster.title, 'cluster');
      addNode(departmentId, cluster.department_name, 'department');
      addNode(locationId, cluster.locality || 'Unresolved location', 'location');
      edges.push({ source: clusterId, target: departmentId, label: 'routes to' });
      edges.push({ source: clusterId, target: locationId, label: 'reported at' });
    }
    return { nodes, edges };
  }
};
