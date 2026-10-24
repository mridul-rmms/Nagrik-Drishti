import test from 'node:test';
import assert from 'node:assert/strict';
import { canTransition } from '../server/domain/lifecycle.js';

test('lifecycle permits officer verification and assignment flow', () => {
  assert.equal(canTransition('Needs Review', 'Verified'), true);
  assert.equal(canTransition('Verified', 'Assigned'), true);
  assert.equal(canTransition('Assigned', 'In Progress'), true);
  assert.equal(canTransition('In Progress', 'Resolved'), true);
  assert.equal(canTransition('Resolved', 'Closed'), true);
});

test('lifecycle blocks unsupported status jumps', () => {
  assert.equal(canTransition('Needs Review', 'Resolved'), false);
  assert.equal(canTransition('Closed', 'In Progress'), false);
});
