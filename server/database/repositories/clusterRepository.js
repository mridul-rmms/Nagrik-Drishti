import { randomUUID } from 'node:crypto';
import { database } from '../connection.js';

function parseCluster(row) {
  return row ? { ...row, priority_breakdown: JSON.parse(row.priority_breakdown) } : null;
}

export const clusterRepository = {
  create(input) {
    const id = randomUUID();
    database.prepare(`INSERT INTO issue_clusters (id, title, summary, signature, category, department_code, priority_score, priority_level, priority_breakdown, status, locality, district, latitude, longitude, location_confidence, report_count, total_engagement, confidence, media_label, suggested_action, assigned_to, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(id, input.title, input.summary, input.signature, input.category, input.departmentCode, input.priority.score, input.priority.level, JSON.stringify(input.priority.breakdown), input.status, input.locality, input.district, input.latitude, input.longitude, input.locationConfidence, input.reportCount, input.totalEngagement, input.confidence, input.mediaLabel, input.suggestedAction, input.assignedTo || null, input.createdAt, input.updatedAt);
    return this.findById(id);
  },
  findById(id) {
    const row = database.prepare(`SELECT c.*, d.name AS department_name FROM issue_clusters c JOIN departments d ON d.code = c.department_code WHERE c.id = ?`).get(id);
    return parseCluster(row);
  },
  list(filters = {}) {
    const clauses = [];
    const values = [];
    if (filters.status) { clauses.push('c.status = ?'); values.push(filters.status); }
    if (filters.department) { clauses.push('c.department_code = ?'); values.push(filters.department); }
    if (filters.category) { clauses.push('c.category = ?'); values.push(filters.category); }
    if (filters.priority) { clauses.push('c.priority_level = ?'); values.push(filters.priority); }
    if (filters.search) { clauses.push('(c.title LIKE ? OR c.locality LIKE ? OR c.summary LIKE ?)'); values.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`); }
    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const limit = Math.min(Number(filters.limit || 100), 200);
    return database.prepare(`SELECT c.*, d.name AS department_name FROM issue_clusters c JOIN departments d ON d.code = c.department_code ${where} ORDER BY c.priority_score DESC, c.updated_at DESC LIMIT ?`).all(...values, limit).map(parseCluster);
  },
  listCandidates() {
    return database.prepare(`SELECT c.*, MAX(p.created_at) AS latest_post_at
      FROM issue_clusters c LEFT JOIN cluster_posts cp ON cp.cluster_id = c.id LEFT JOIN source_posts p ON p.id = cp.post_id
      WHERE c.status NOT IN ('Closed', 'Rejected') GROUP BY c.id ORDER BY c.updated_at DESC LIMIT 150`).all().map(parseCluster);
  },
  linkPost(clusterId, postId, duplicate) {
    database.prepare('INSERT OR IGNORE INTO cluster_posts (cluster_id, post_id, duplicate_score, duplicate_explanation) VALUES (?, ?, ?, ?)')
      .run(clusterId, postId, duplicate?.score ?? null, duplicate?.explanation ?? 'Initial cluster report');
  },
  linkedPosts(clusterId) {
    return database.prepare(`SELECT p.*, a.category, a.sentiment, a.urgency, a.severity, a.confidence AS analysis_confidence, cp.duplicate_score, cp.duplicate_explanation
      FROM cluster_posts cp JOIN source_posts p ON p.id = cp.post_id JOIN ai_analyses a ON a.post_id = p.id
      WHERE cp.cluster_id = ? ORDER BY p.created_at DESC`).all(clusterId);
  },
  refresh(id, aggregate) {
    database.prepare(`UPDATE issue_clusters SET title = ?, summary = ?, signature = ?, department_code = ?, priority_score = ?, priority_level = ?, priority_breakdown = ?, status = ?, report_count = ?, total_engagement = ?, confidence = ?, media_label = ?, suggested_action = ?, updated_at = ? WHERE id = ?`)
      .run(aggregate.title, aggregate.summary, aggregate.signature, aggregate.departmentCode, aggregate.priority.score, aggregate.priority.level, JSON.stringify(aggregate.priority.breakdown), aggregate.status, aggregate.reportCount, aggregate.totalEngagement, aggregate.confidence, aggregate.mediaLabel, aggregate.suggestedAction, aggregate.updatedAt, id);
    return this.findById(id);
  },
  updateWorkflow(id, update) {
    const current = this.findById(id);
    if (!current) return null;
    database.prepare('UPDATE issue_clusters SET status = ?, assigned_to = ?, department_code = ?, updated_at = ? WHERE id = ?')
      .run(update.status || current.status, update.assignedTo ?? current.assigned_to, update.departmentCode || current.department_code, new Date().toISOString(), id);
    return this.findById(id);
  },
  detail(id) {
    const cluster = this.findById(id);
    if (!cluster) return null;
    return { ...cluster, posts: this.linkedPosts(id) };
  }
};
