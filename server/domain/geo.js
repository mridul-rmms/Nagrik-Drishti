const EARTH_RADIUS_KM = 6371;

export function haversineDistanceKm(aLatitude, aLongitude, bLatitude, bLongitude) {
  if (![aLatitude, aLongitude, bLatitude, bLongitude].every(Number.isFinite)) return null;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const dLat = toRadians(bLatitude - aLatitude);
  const dLon = toRadians(bLongitude - aLongitude);
  const lat1 = toRadians(aLatitude);
  const lat2 = toRadians(bLatitude);
  const component = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(component));
}

export function normaliseText(value = '') {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenSet(value = '') {
  return new Set(normaliseText(value).split(' ').filter((token) => token.length > 1));
}

export function jaccardSimilarity(first, second) {
  const a = tokenSet(first);
  const b = tokenSet(second);
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / new Set([...a, ...b]).size;
}
