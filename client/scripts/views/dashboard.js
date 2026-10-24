import { clusterTable } from '../components/clusterTable.js';
import { hotspotMap } from '../components/mapView.js';
import { escapeHtml, labelFor } from '../components/format.js';

function metric(icon, tone, label, value, detail) {
  return `
    <article class="metric-card">
      <div>
        <p>${label}</p>
        <strong>${value}</strong>
        <small>${detail}</small>
      </div>
      <span class="metric-icon ${tone}">${icon}</span>
    </article>
  `;
}

export const dashboardView = {
  title: 'Command centre',
  eyebrow: 'CIVIC GRIEVANCE INTELLIGENCE',
  render(store) {
    const summary = store.dashboard;
    const categoryTotals = store.clusters.reduce((totals, cluster) => {
      totals[cluster.category] = (totals[cluster.category] || 0) + cluster.report_count;
      return totals;
    }, {});
    const max = Math.max(1, ...Object.values(categoryTotals));

    return `
      <!-- MINIMALIST CLEAN OVERVIEW -->
      <section class="hero-banner">
        <div class="hero-content">
          <div class="hero-crest">NAGRIK DRISHTI · BIHAR STATE PLATFORM</div>
          <h1 class="hero-title">Civic intelligence & <span>automated grievance routing</span></h1>
          <p class="hero-description">
            Converts citizen reports across Bihar into deduplicated issue clusters, providing officers with an explainable priority score, geographic context, and direct department dispatch.
          </p>
          <div class="hero-actions">
            <button class="button button-primary" data-view-link="monitoring">＋ Ingest new complaint</button>
            <button class="button button-secondary" data-view-link="clusters">View active queue</button>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat-item">
            <small>Active Clusters</small>
            <strong>${summary.metrics.activeClusters}</strong>
          </div>
          <div class="hero-stat-item">
            <small>Reports Triaged</small>
            <strong>${summary.metrics.sourceReports}</strong>
          </div>
          <div class="hero-stat-item">
            <small>Verification Rate</small>
            <strong>${summary.metrics.verifiedRate}%</strong>
          </div>
        </div>
      </section>

      <!-- HEADLINE METRICS -->
      <section class="metric-grid">
        ${metric('!', 'critical', 'Critical attention', summary.metrics.criticalClusters, 'Requires immediate officer review')}
        ${metric('◈', 'primary', 'Active issue clusters', summary.metrics.activeClusters, `${summary.metrics.sourceReports} linked public reports`)}
        ${metric('◎', 'high', 'Emerging hotspots', store.hotspots.length, 'Geographic signals across Bihar')}
        ${metric('✓', 'low', 'Verified or actioned', `${summary.metrics.verifiedRate}%`, 'Officer resolution rate')}
      </section>

      <!-- MAP & VOLUME GRIDS -->
      <section class="dashboard-grid">
        <article class="panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">GEOSPATIAL SIGNALS</p>
              <h2>Priority hotspot map</h2>
            </div>
            <button class="button button-quiet" data-view-link="clusters">View all clusters →</button>
          </div>
          ${hotspotMap(store.hotspots)}
          <div class="map-footer">
            <span><b>${summary.metrics.activeClusters} active clusters</b> from ${summary.metrics.sourceReports} reports</span>
            <span>Click any map pin to review</span>
          </div>
        </article>

        <article class="panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">CATEGORY BREAKDOWN</p>
              <h2>Issue distribution</h2>
            </div>
          </div>
          <p class="trend-stat"><strong>${summary.metrics.sourceReports}</strong>reports categorized</p>
          <div class="trend-list">
            ${Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).map(([category, count]) => `
              <div class="trend-row">
                <span>${escapeHtml(labelFor[category] || category)}</span>
                <div class="trend-bar"><i style="width:${Math.round((count / max) * 100)}%"></i></div>
                <b>${count}</b>
              </div>
            `).join('')}
          </div>
          <div class="insight-callout">
            <b>Operational priority:</b> Focus resources on multi-report clusters near schools, hospitals, or high-density areas.
          </div>
        </article>
      </section>

      <!-- HIGHEST PRIORITY CLUSTERS QUEUE -->
      <section class="panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">ACTIONABLE QUEUE</p>
            <h2>High-priority clusters</h2>
          </div>
          <button class="button button-secondary" data-view-link="monitoring">Analyse complaint</button>
        </div>
        ${clusterTable(summary.recent, 'No active clusters are currently pending review.')}
        <div class="table-footer">Click any row to open the verification drawer and dispatch field teams.</div>
      </section>
    `;
  }
};
