import { departmentRepository } from '../database/repositories/departmentRepository.js';
import { postRepository } from '../database/repositories/postRepository.js';
import { clusterRepository } from '../database/repositories/clusterRepository.js';
import { dashboardService } from '../services/dashboardService.js';
import { ingestionService } from '../services/ingestionService.js';
import { workflowService } from '../services/workflowService.js';
import { readJson, queryObject } from './request.js';
import { error, json, noContent } from './response.js';

export async function handleApiRequest(request, response, url) {
  if (request.method === 'OPTIONS') return noContent(response);
  const path = url.pathname;
  const query = queryObject(url);
  if (request.method === 'GET' && path === '/api/health') return json(response, 200, { ok: true, service: 'nagrik-drishti-api' });
  if (request.method === 'GET' && path === '/api/dashboard') return json(response, 200, dashboardService.summary());
  if (request.method === 'GET' && path === '/api/hotspots') return json(response, 200, { hotspots: dashboardService.hotspots() });
  if (request.method === 'GET' && path === '/api/trends') return json(response, 200, { trends: dashboardService.trends() });
  if (request.method === 'GET' && path === '/api/graph') return json(response, 200, dashboardService.graph());
  if (request.method === 'GET' && path === '/api/departments') return json(response, 200, { departments: departmentRepository.list() });
  if (request.method === 'GET' && path === '/api/posts') return json(response, 200, { posts: postRepository.list(Number(query.limit || 100)) });
  if (request.method === 'GET' && path === '/api/clusters') return json(response, 200, { clusters: clusterRepository.list(query) });
  if (request.method === 'POST' && path === '/api/posts') {
    const result = ingestionService.ingest(await readJson(request));
    return result.ok ? json(response, 201, result) : error(response, 422, 'Post validation failed.', result.errors);
  }
  if (request.method === 'POST' && path === '/api/posts/import') {
    const payload = await readJson(request);
    const result = ingestionService.importMany(payload.posts);
    return result.ok ? json(response, 201, result) : error(response, 422, 'Import validation failed.', result.errors);
  }
  const clusterMatch = path.match(/^\/api\/clusters\/([^/]+)$/);
  if (clusterMatch && request.method === 'GET') {
    const cluster = workflowService.detail(clusterMatch[1]);
    return cluster ? json(response, 200, { cluster }) : error(response, 404, 'Cluster not found.');
  }
  if (clusterMatch && request.method === 'PATCH') {
    const result = workflowService.update(clusterMatch[1], await readJson(request), request.headers['x-actor'] || 'Demo Officer');
    return result.ok ? json(response, 200, result) : error(response, result.code === 'NOT_FOUND' ? 404 : 422, 'Unable to update cluster.', result.errors);
  }
  if (request.method === 'GET' && path.startsWith('/api/department-queue/')) {
    const department = decodeURIComponent(path.slice('/api/department-queue/'.length));
    return json(response, 200, { clusters: clusterRepository.list({ department }), department });
  }
  return error(response, 404, 'API route not found.');
}
