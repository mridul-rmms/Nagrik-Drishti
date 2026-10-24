import http from 'node:http';
import { config } from './config.js';
import { migrate } from './database/schema.js';
import { seedDatabase } from './database/seed.js';
import { handleApiRequest } from './http/apiRouter.js';
import { serveStatic } from './http/staticServer.js';
import { error } from './http/response.js';

migrate();
const seedResult = seedDatabase();

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) return await handleApiRequest(request, response, url);
    return await serveStatic(response, url.pathname);
  } catch (caught) {
    console.error(caught);
    return error(response, 500, 'Unexpected server error.', config.environment === 'development' ? caught.message : undefined);
  }
});

server.listen(config.port, () => {
  console.log(`Nagrik Drishti is running at http://127.0.0.1:${config.port}`);
  console.log(seedResult.seeded ? `Seeded ${seedResult.count} synthetic source posts.` : `Using ${seedResult.count} existing source posts.`);
});
