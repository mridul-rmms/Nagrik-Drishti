export const allowedTransitions = Object.freeze({
  Detected: ['Needs Review', 'Rejected'],
  'Needs Review': ['Verified', 'Rejected'],
  Verified: ['Assigned', 'Rejected'],
  Assigned: ['In Progress', 'Verified'],
  'In Progress': ['Resolved', 'Assigned'],
  Resolved: ['Closed', 'In Progress'],
  Closed: [],
  Rejected: []
});

export function canTransition(from, to) {
  return from === to || Boolean(allowedTransitions[from]?.includes(to));
}
