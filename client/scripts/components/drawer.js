import { api } from '../api.js';
import { escapeHtml, iconFor, niceDate } from './format.js';
import { showToast } from './toast.js';

const nextWorkflow = Object.freeze({
  'Needs Review': { status: 'Verified', label: 'Verify cluster' },
  Verified: { status: 'Assigned', label: 'Assign field team', assignedTo: 'Demo Field Team' },
  Assigned: { status: 'In Progress', label: 'Start work' },
  'In Progress': { status: 'Resolved', label: 'Mark resolved' },
  Resolved: { status: 'Closed', label: 'Close cluster' }
});

function drawerMarkup(cluster) {
  const next = nextWorkflow[cluster.status];
  const breakdown = cluster.priority_breakdown;
  return `<div class="drawer-backdrop" data-drawer-close></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Issue cluster details"><button class="drawer-close" data-drawer-close aria-label="Close details">×</button>
    <span class="badge ${cluster.priority_level}">${cluster.priority_level} priority</span><span class="badge status">${escapeHtml(cluster.status)}</span>
    <h2>${escapeHtml(cluster.title)}</h2><p class="detail-location">⌖ ${escapeHtml(cluster.locality || 'Location pending review')} · ${escapeHtml(cluster.location_confidence)} location confidence</p>
    <div class="score-card"><strong>${cluster.priority_score}</strong><p><b>Priority score / 100</b><br/>Severity ${breakdown.severity} · urgency ${breakdown.urgencyAndSentiment} · reports ${breakdown.reportVolume} · engagement ${breakdown.engagement} · sensitive location ${breakdown.sensitiveLocation}</p></div>
    <section class="detail-section"><h3>AI SUMMARY</h3><p>${escapeHtml(cluster.summary)}<br/><br/><b>Suggested action:</b> ${escapeHtml(cluster.suggested_action)}</p></section>
    <section class="detail-section"><h3>EVIDENCE BUNDLE</h3><div class="evidence-list"><div class="evidence-card">${iconFor[cluster.category] || '◈'}<small>${escapeHtml(cluster.media_label || 'Text signal')}</small></div><div class="evidence-card">💬<small>${cluster.posts.length} linked reports</small></div><div class="evidence-card">⌖<small>${escapeHtml(cluster.locality || 'Unmapped')}</small></div></div></section>
    <section class="detail-section"><h3>ROUTING RECOMMENDATION</h3><div class="detail-metrics"><span>Department<strong>${escapeHtml(cluster.department_name)}</strong></span><span>AI confidence<strong>${Math.round(cluster.confidence * 100)}%</strong></span><span>Assigned to<strong>${escapeHtml(cluster.assigned_to || 'Not assigned')}</strong></span><span>Category<strong>${escapeHtml(cluster.category)}</strong></span></div></section>
    <section class="detail-section"><h3>HUMAN REVIEW TIMELINE</h3><div class="timeline">${cluster.audit.map((event) => `<p>${escapeHtml(event.detail)}<small>${escapeHtml(event.actor)} · ${niceDate(event.created_at)}</small></p>`).join('') || '<p>No review actions yet.</p>'}</div></section>
    <div class="workflow-actions">${next ? `<button class="button button-primary" data-workflow-status="${next.status}" data-assignee="${next.assignedTo || ''}">${next.label}</button>` : ''}<button class="button button-secondary" data-reject-cluster>Reject cluster</button></div>
  </aside>`;
}

export async function openClusterDrawer(id, afterUpdate) {
  const root = document.querySelector('#drawerRoot');
  root.className = 'drawer-layer is-open';
  root.innerHTML = '<div class="drawer-backdrop"></div><aside class="drawer"><p>Loading verified cluster details…</p></aside>';
  try {
    const { cluster } = await api.cluster(id);
    root.innerHTML = drawerMarkup(cluster);
    root.querySelectorAll('[data-drawer-close]').forEach((node) => node.addEventListener('click', () => { root.className = 'drawer-layer'; root.innerHTML = ''; }));
    root.querySelector('[data-reject-cluster]')?.addEventListener('click', async () => updateWorkflow('Rejected', 'Rejected after officer review.'));
    root.querySelector('[data-workflow-status]')?.addEventListener('click', async (event) => updateWorkflow(event.currentTarget.dataset.workflowStatus, `Moved to ${event.currentTarget.dataset.workflowStatus}.`, event.currentTarget.dataset.assignee));
    async function updateWorkflow(status, note, assignedTo = undefined) {
      try {
        await api.updateCluster(id, { status, assignedTo, note });
        showToast(`Cluster updated: ${status}.`);
        root.className = 'drawer-layer'; root.innerHTML = '';
        await afterUpdate();
      } catch (caught) { showToast(caught.message); }
    }
  } catch (caught) {
    root.innerHTML = `<div class="drawer-backdrop" data-drawer-close></div><aside class="drawer"><button class="drawer-close" data-drawer-close>×</button><p>${escapeHtml(caught.message)}</p></aside>`;
    root.querySelector('[data-drawer-close]').addEventListener('click', () => { root.className = 'drawer-layer'; root.innerHTML = ''; });
  }
}
