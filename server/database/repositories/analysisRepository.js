import { randomUUID } from 'node:crypto';
import { database } from '../connection.js';

export const analysisRepository = {
  create(postId, analysis) {
    const id = randomUUID();
    database.prepare(`INSERT INTO ai_analyses (id, post_id, is_grievance, confidence, category, sentiment, urgency, severity, recommended_department, routing_confidence, location_confidence, suggested_action, explanation, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(id, postId, Number(analysis.isGrievance), analysis.confidence, analysis.category, analysis.sentiment, analysis.urgency, analysis.severity, analysis.routing.code, analysis.routing.confidence, analysis.location.confidence, analysis.action, analysis.explanation, new Date().toISOString());
    return database.prepare('SELECT * FROM ai_analyses WHERE id = ?').get(id);
  },
  forPost(postId) { return database.prepare('SELECT * FROM ai_analyses WHERE post_id = ?').get(postId); }
};
