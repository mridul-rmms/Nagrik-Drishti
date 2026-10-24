import { DEPARTMENTS } from '../domain/constants.js';
import { departmentRepository } from './repositories/departmentRepository.js';
import { postRepository } from './repositories/postRepository.js';
import { samplePosts } from './samplePosts.js';
import { ingestionService } from '../services/ingestionService.js';

export function seedDatabase() {
  DEPARTMENTS.forEach((department) => departmentRepository.upsert(department));
  if (postRepository.count() > 0) return { seeded: false, count: postRepository.count() };
  const result = ingestionService.importMany(samplePosts);
  return { seeded: true, count: result.imported };
}
