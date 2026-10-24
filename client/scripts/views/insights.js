import { escapeHtml, labelFor } from '../components/format.js';

function graphMarkup(graph) {
  const positions = new Map();
  const width = 780;
  const height = 320;
  const grouped = {
    department: graph.nodes.filter((node) => node.type === 'department'),
    location: graph.nodes.filter((node) => node.type === 'location'),
    cluster: graph.nodes.filter((node) => node.type === 'cluster')
  };
  const place = (nodes, x, spacing) => nodes.forEach((node, index) => positions.set(node.id, { x, y: 30 + index * spacing }));
  place(grouped.department, 10, Math.max(50, 260 / Math.max(1, grouped.department.length)));
  place(grouped.location, 680, Math.max(50, 260 / Math.max(1, grouped.location.length)));
  grouped.cluster.forEach((node, index) => positions.set(node.id, { x: 330 + (index % 2) * 130, y: 20 + Math.floor(index / 2) * 54 }));

  const edges = graph.edges.map((edge) => {
    const a = positions.get(edge.source);
    const b = positions.get(edge.target);
    if (!a || !b) return '';
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    return `<i class="graph-edge" style="left:${a.x + 39}px;top:${a.y + 18}px;width:${Math.max(0, length - 78)}px;transform:rotate(${angle}deg)"></i>`;
  }).join('');

  const nodes = graph.nodes.map((node) => {
    const point = positions.get(node.id);
    return point ? `<button class="graph-node ${node.type}" style="left:${point.x}px;top:${point.y}px" title="${escapeHtml(node.label)}">${escapeHtml(node.label.slice(0, 20))}</button>` : '';
  }).join('');

  return `<div class="graph-wrap" style="min-width:${width}px;min-height:${height}px">${edges}${nodes}</div>`;
}

export const insightsView = {
  title: 'Insights & graph',
  eyebrow: 'GEOGRAPHIC PATTERNS & RELATIONSHIPS',
  render(store) {
    const topHotspots = store.hotspots.slice(0, 5);
    const trendRows = store.trends.map((trend) => `
      <tr>
        <td>${escapeHtml(trend.date)}</td>
        <td><b>${trend.total}</b></td>
        <td><span class="badge ${trend.critical ? 'Critical' : 'status'}">${trend.critical}</span></td>
        <td>${trend.roads || 0}</td>
        <td>${trend.water || 0}</td>
        <td>${trend.sanitation || 0}</td>
        <td>${trend.electricity || 0}</td>
      </tr>
    `).join('');

    return `
      <section class="dashboard-grid">
        <article class="panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">RECURRING SIGNALS</p>
              <h2>Top geographic hotspots</h2>
            </div>
          </div>
          <div class="toolbar" style="display:block">
            ${topHotspots.map((hotspot, index) => `
              <div class="notice">
                <b>#${index + 1} · ${escapeHtml(hotspot.locality)}</b><br/>
                ${escapeHtml(labelFor[hotspot.category] || hotspot.category)} · ${hotspot.reports} linked reports · peak risk score ${hotspot.maxPriority}/100
              </div>
            `).join('') || '<div class="notice">No mapped clusters yet.</div>'}
          </div>
        </article>

        <article class="panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">DETECTION RULES</p>
              <h2>Anomaly threshold interpretation</h2>
            </div>
          </div>
          <div class="toolbar" style="display:block">
            <div class="notice">
              <b>Density threshold:</b> Flag a locality when 3+ independent reports emerge within 48 hours in the same geographic radius.
            </div>
            <div class="notice">
              <b>Primary hotspot:</b> ${topHotspots[0] ? `${escapeHtml(topHotspots[0].locality)} carries the highest accumulated risk score.` : 'Awaiting data.'}
            </div>
            <div class="notice">
              <b>Field directive:</b> Verify sensitive proximity (schools, clinics) before dispatching maintenance units.
            </div>
          </div>
        </article>
      </section>

      <section class="panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">RELATIONAL GRAPH</p>
            <h2>Department, cluster, and location topology</h2>
          </div>
        </div>
        ${graphMarkup(store.graph)}
        <div class="table-footer">Black = issue cluster · Slate = department · Green = locality. Relational topology calculated from SQLite links.</div>
      </section>

      <section class="panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">TIME SERIES</p>
            <h2>Source complaint volume over time</h2>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Reports</th>
                <th>Critical Alerts</th>
                <th>Roads</th>
                <th>Water</th>
                <th>Sanitation</th>
                <th>Electricity</th>
              </tr>
            </thead>
            <tbody>
              ${trendRows || '<tr><td colspan="7">No trend data available.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }
};
