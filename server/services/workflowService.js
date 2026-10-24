import { LIFECYCLE } from '../domain/constants.js';
import { validateWorkflowUpdate } from '../domain/validation.js';
import { clusterRepository } from '../database/repositories/clusterRepository.js';
import { departmentRepository } from '../database/repositories/departmentRepository.js';
import { auditRepository } from '../database/repositories/auditRepository.js';
import { canTransition } from '../domain/lifecycle.js';

export const workflowService = {
  update(clusterId, input, actor = 'Demo Officer') {
    const validation = validateWorkflowUpdate(input, LIFECYCLE);
    if (!validation.valid) return { ok: false, errors: validation.errors };
    const current = clusterRepository.findById(clusterId);
    if (!current) return { ok: false, errors: ['Cluster not found.'], code: 'NOT_FOUND' };
    if (input.departmentCode && !departmentRepository.find(input.departmentCode)) return { ok: false, errors: ['Unknown department.'] };
    if (input.status && input.status !== current.status && !canTransition(current.status, input.status)) {
      return { ok: false, errors: [`Cannot move a cluster from ${current.status} to ${input.status}.`] };
    }
    const updated = clusterRepository.updateWorkflow(clusterId, input);
    const detail = [
      input.status && input.status !== current.status ? `Status changed from ${current.status} to ${input.status}.` : null,
      input.assignedTo ? `Assigned to ${input.assignedTo}.` : null,
      input.departmentCode && input.departmentCode !== current.department_code ? `Routing updated to ${input.departmentCode}.` : null,
      input.note ? `Officer note: ${input.note}` : null
    ].filter(Boolean).join(' ');
    auditRepository.record(clusterId, 'workflow.updated', actor, detail || 'Cluster reviewed without field changes.');
    return { ok: true, cluster: { ...clusterRepository.detail(updated.id), audit: auditRepository.forCluster(updated.id) } };
  },
  detail(clusterId) {
    const cluster = clusterRepository.detail(clusterId);
    return cluster ? { ...cluster, audit: auditRepository.forCluster(clusterId) } : null;
  }
};
