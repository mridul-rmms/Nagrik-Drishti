import { escapeHtml, iconFor, niceDate } from './format.js';

export function clusterTable(clusters, emptyMessage = 'No clusters match the selected filters.') {
  if (!clusters.length) return `<div class="empty-state"><strong>No issue clusters found</strong>${escapeHtml(emptyMessage)}</div>`;
  return `<div class="table-wrap"><table><thead><tr><th>Issue cluster</th><th>Department</th><th>Signals</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>${clusters.map((cluster) => `
    <tr data-cluster-id="${cluster.id}">
      <td><div class="cluster-cell"><span class="category-bubble">${iconFor[cluster.category] || '◈'}</span><span><strong>${escapeHtml(cluster.title)}</strong><small>${escapeHtml(cluster.locality || 'Location pending')} · ${cluster.report_count} linked reports · ${niceDate(cluster.updated_at)}</small></span></div></td>
      <td>${escapeHtml(cluster.department_name)}</td>
      <td>${Math.round(cluster.confidence * 100)}% AI confidence</td>
      <td><span class="badge ${cluster.priority_level}">${cluster.priority_level} · ${cluster.priority_score}</span></td>
      <td><span class="badge status">${escapeHtml(cluster.status)}</span></td>
      <td>›</td>
    </tr>`).join('')}</tbody></table></div>`;
}
