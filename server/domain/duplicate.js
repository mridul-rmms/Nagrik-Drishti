import { haversineDistanceKm, jaccardSimilarity } from './geo.js';

export function scoreDuplicate(candidate, cluster) {
  const text = jaccardSimilarity(candidate.content, cluster.signature || cluster.title);
  const category = candidate.category === cluster.category ? 1 : 0;
  const distance = haversineDistanceKm(candidate.latitude, candidate.longitude, cluster.latitude, cluster.longitude);
  const geo = distance === null ? 0.25 : distance <= 0.75 ? 1 : distance <= 2 ? 0.7 : distance <= 5 ? 0.25 : 0;
  const elapsedHours = Math.abs(new Date(candidate.createdAt).getTime() - new Date(cluster.updatedAt).getTime()) / 3_600_000;
  const time = elapsedHours <= 24 ? 1 : elapsedHours <= 72 ? 0.7 : elapsedHours <= 168 ? 0.35 : 0;
  const evidence = candidate.mediaLabel && cluster.mediaLabel && candidate.mediaLabel === cluster.mediaLabel ? 1 : 0.25;
  const score = Number((text * 0.35 + category * 0.25 + geo * 0.2 + time * 0.1 + evidence * 0.1).toFixed(3));
  return {
    score,
    matched: score >= 0.62,
    explanation: `Text ${Math.round(text * 100)}%, category ${category ? 'matched' : 'different'}, ${distance === null ? 'location unavailable' : `${distance.toFixed(1)} km apart`}, and reports are ${Math.round(elapsedHours)} hours apart.`
  };
}
