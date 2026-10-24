import { database } from './connection.js';

export function migrate() {
  database.exec(`
    CREATE TABLE IF NOT EXISTS departments (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS source_posts (
      id TEXT PRIMARY KEY,
      source_platform TEXT NOT NULL,
      source_reference TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      language TEXT NOT NULL,
      media_label TEXT,
      created_at TEXT NOT NULL,
      engagement INTEGER NOT NULL DEFAULT 0,
      locality TEXT,
      district TEXT,
      latitude REAL,
      longitude REAL,
      raw_payload TEXT NOT NULL DEFAULT '{}'
    );
    CREATE TABLE IF NOT EXISTS ai_analyses (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL UNIQUE REFERENCES source_posts(id) ON DELETE CASCADE,
      is_grievance INTEGER NOT NULL,
      confidence REAL NOT NULL,
      category TEXT NOT NULL,
      sentiment TEXT NOT NULL,
      urgency TEXT NOT NULL,
      severity TEXT NOT NULL,
      recommended_department TEXT NOT NULL REFERENCES departments(code),
      routing_confidence REAL NOT NULL,
      location_confidence TEXT NOT NULL,
      suggested_action TEXT NOT NULL,
      explanation TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS issue_clusters (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      signature TEXT NOT NULL,
      category TEXT NOT NULL,
      department_code TEXT NOT NULL REFERENCES departments(code),
      priority_score INTEGER NOT NULL,
      priority_level TEXT NOT NULL,
      priority_breakdown TEXT NOT NULL,
      status TEXT NOT NULL,
      locality TEXT,
      district TEXT,
      latitude REAL,
      longitude REAL,
      location_confidence TEXT NOT NULL,
      report_count INTEGER NOT NULL DEFAULT 1,
      total_engagement INTEGER NOT NULL DEFAULT 0,
      confidence REAL NOT NULL,
      media_label TEXT,
      suggested_action TEXT NOT NULL,
      assigned_to TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cluster_posts (
      cluster_id TEXT NOT NULL REFERENCES issue_clusters(id) ON DELETE CASCADE,
      post_id TEXT NOT NULL REFERENCES source_posts(id) ON DELETE CASCADE,
      duplicate_score REAL,
      duplicate_explanation TEXT,
      PRIMARY KEY(cluster_id, post_id)
    );
    CREATE TABLE IF NOT EXISTS audit_events (
      id TEXT PRIMARY KEY,
      cluster_id TEXT NOT NULL REFERENCES issue_clusters(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL,
      actor TEXT NOT NULL,
      detail TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS source_posts_created_at_idx ON source_posts(created_at);
    CREATE INDEX IF NOT EXISTS clusters_status_idx ON issue_clusters(status);
    CREATE INDEX IF NOT EXISTS clusters_department_idx ON issue_clusters(department_code);
  `);
}
