import { randomUUID } from 'node:crypto';
import { database } from '../connection.js';

export const postRepository = {
  count() { return database.prepare('SELECT COUNT(*) AS count FROM source_posts').get().count; },
  create(input) {
    const id = randomUUID();
    database.prepare(`INSERT INTO source_posts (id, source_platform, source_reference, content, language, media_label, created_at, engagement, locality, district, latitude, longitude, raw_payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(id, input.sourcePlatform, input.sourceReference, input.content, input.language || 'unknown', input.mediaLabel || null, input.createdAt, input.engagement || 0, input.locality || null, input.district || null, input.latitude, input.longitude, JSON.stringify(input.rawPayload || {}));
    return this.findById(id);
  },
  findById(id) { return database.prepare('SELECT * FROM source_posts WHERE id = ?').get(id); },
  list(limit = 100) { return database.prepare('SELECT * FROM source_posts ORDER BY created_at DESC LIMIT ?').all(limit); }
};
