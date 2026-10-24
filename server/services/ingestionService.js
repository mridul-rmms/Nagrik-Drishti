import { randomUUID } from 'node:crypto';
import { analyseComplaint } from '../domain/analysis.js';
import { validatePostInput } from '../domain/validation.js';
import { postRepository } from '../database/repositories/postRepository.js';
import { analysisRepository } from '../database/repositories/analysisRepository.js';
import { clusterService } from './clusterService.js';

function normaliseIncomingPost(input) {
  const createdAt = input.createdAt && !Number.isNaN(Date.parse(input.createdAt)) ? new Date(input.createdAt).toISOString() : new Date().toISOString();
  return {
    sourcePlatform: input.sourcePlatform || 'Manual review',
    sourceReference: input.sourceReference || `manual-${randomUUID()}`,
    content: input.content.trim(),
    language: input.language || 'unknown',
    mediaLabel: input.mediaLabel || null,
    createdAt,
    engagement: Number(input.engagement || 0),
    locality: input.locality || null,
    latitude: input.latitude === '' || input.latitude === undefined ? null : Number(input.latitude),
    longitude: input.longitude === '' || input.longitude === undefined ? null : Number(input.longitude),
    rawPayload: input.rawPayload || {}
  };
}

export const ingestionService = {
  ingest(input) {
    const validation = validatePostInput(input);
    if (!validation.valid) return { ok: false, errors: validation.errors };
    const postInput = normaliseIncomingPost(input);
    const analysis = analyseComplaint(postInput);
    if (Number.isFinite(postInput.latitude) && Number.isFinite(postInput.longitude)) {
      analysis.location.latitude = postInput.latitude;
      analysis.location.longitude = postInput.longitude;
      analysis.location.confidence = 'high';
    }
    const post = postRepository.create({ ...postInput, ...analysis.location });
    const savedAnalysis = analysisRepository.create(post.id, analysis);
    if (!analysis.isGrievance) return { ok: true, post, analysis: savedAnalysis, cluster: null, duplicate: null };
    const result = clusterService.createOrUpdate(post, analysis);
    return { ok: true, post, analysis: savedAnalysis, ...result };
  },
  importMany(posts) {
    if (!Array.isArray(posts)) return { ok: false, errors: ['posts must be an array.'] };
    const results = posts.map((post) => this.ingest(post));
    return { ok: true, imported: results.filter((result) => result.ok).length, rejected: results.filter((result) => !result.ok), results };
  }
};
