export function json(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*'
  });
  response.end(JSON.stringify(body));
}

export function noContent(response) {
  response.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,X-Actor' });
  response.end();
}

export function error(response, status, message, details = undefined) {
  json(response, status, { error: { message, details } });
}
