import { randomUUID } from 'node:crypto';
import { database } from '../connection.js';

export const auditRepository = {
  record(clusterId, eventType, actor, detail) {
    database.prepare('INSERT INTO audit_events (id, cluster_id, event_type, actor, detail, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run(randomUUID(), clusterId, eventType, actor, detail, new Date().toISOString());
  },
  forCluster(clusterId) {
    return database.prepare('SELECT * FROM audit_events WHERE cluster_id = ? ORDER BY created_at DESC').all(clusterId);
  }
};
