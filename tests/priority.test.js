import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePriority } from '../server/domain/priority.js';

test('priority scoring promotes high-volume safety complaints', () => {
  const result = calculatePriority({ severity: 'critical', urgency: 'critical', sentiment: 'negative', reportCount: 6, engagement: 60, sensitiveLocation: true });
  assert.equal(result.level, 'Critical');
  assert.ok(result.score >= 90);
  assert.equal(result.breakdown.sensitiveLocation, 10);
});

test('priority scoring keeps isolated low-risk reports below critical', () => {
  const result = calculatePriority({ severity: 'low', urgency: 'low', sentiment: 'neutral', reportCount: 1, engagement: 0, sensitiveLocation: false });
  assert.equal(result.level, 'Low');
  assert.ok(result.score < 35);
});
