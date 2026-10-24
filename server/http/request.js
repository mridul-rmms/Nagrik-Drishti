export async function readJson(request, maxBytes = 1_000_000) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBytes) throw new Error('Request body is too large.');
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new Error('Request body must be valid JSON.'); }
}

export function queryObject(url) {
  return Object.fromEntries(url.searchParams.entries());
}
