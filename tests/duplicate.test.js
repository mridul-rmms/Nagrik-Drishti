import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreDuplicate } from '../server/domain/duplicate.js';

test('duplicate score clusters nearby same-category pothole complaints', () => {
  const result = scoreDuplicate(
    { content: 'Huge pothole near school road, please repair urgently', category: 'roads', latitude: 25.594, longitude: 85.138, createdAt: '2026-10-15T12:00:00.000Z', mediaLabel: 'Road-damage image' },
    { title: 'Road pothole near school', signature: 'pothole near school road repair', category: 'roads', latitude: 25.595, longitude: 85.139, updatedAt: '2026-10-15T09:00:00.000Z', mediaLabel: 'Road-damage image' }
  );
  assert.equal(result.matched, true);
  assert.ok(result.score >= 0.62);
});

test('duplicate score rejects distant unrelated issues', () => {
  const result = scoreDuplicate(
    { content: 'No water supply in Gaya colony', category: 'water', latitude: 24.795, longitude: 85.000, createdAt: '2026-10-15T12:00:00.000Z', mediaLabel: 'No media' },
    { title: 'Broken road in Bhagalpur', signature: 'road pothole bridge damage', category: 'roads', latitude: 25.242, longitude: 86.984, updatedAt: '2026-09-01T12:00:00.000Z', mediaLabel: 'Road-damage image' }
  );
  assert.equal(result.matched, false);
});
