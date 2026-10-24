export function validatePostInput(input) {
  const errors = [];
  if (!input || typeof input !== 'object') errors.push('Request must contain a JSON object.');
  if (!input?.content || typeof input.content !== 'string' || input.content.trim().length < 8) errors.push('content must be at least 8 characters.');
  if (input?.engagement !== undefined && (!Number.isFinite(Number(input.engagement)) || Number(input.engagement) < 0)) errors.push('engagement must be a non-negative number.');
  if (input?.latitude !== undefined && input.latitude !== null && !Number.isFinite(Number(input.latitude))) errors.push('latitude must be a number.');
  if (input?.longitude !== undefined && input.longitude !== null && !Number.isFinite(Number(input.longitude))) errors.push('longitude must be a number.');
  return { valid: errors.length === 0, errors };
}

export function validateWorkflowUpdate(input, lifecycle) {
  const errors = [];
  if (input.status && !lifecycle.includes(input.status)) errors.push(`status must be one of: ${lifecycle.join(', ')}.`);
  if (input.assignedTo && typeof input.assignedTo !== 'string') errors.push('assignedTo must be text.');
  return { valid: errors.length === 0, errors };
}
