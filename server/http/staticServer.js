import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from '../config.js';

const contentTypes = Object.freeze({
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8'
});

export async function serveStatic(response, pathname) {
  const cleanPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.resolve(config.clientRoot, `.${cleanPath}`);
  if (!filePath.startsWith(config.clientRoot)) { response.writeHead(403); response.end('Forbidden'); return; }
  try {
    const data = await fs.readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(data);
  } catch {
    const index = await fs.readFile(path.join(config.clientRoot, 'index.html'));
    response.writeHead(200, { 'Content-Type': contentTypes['.html'], 'Cache-Control': 'no-store' });
    response.end(index);
  }
}
