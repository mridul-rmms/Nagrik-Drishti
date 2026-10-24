import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(here, '..');

export const config = Object.freeze({
  port: Number(process.env.PORT || 4173),
  environment: process.env.APP_ENV || 'development',
  clientRoot: path.join(projectRoot, 'client'),
  databasePath: process.env.DATABASE_PATH
    ? path.resolve(projectRoot, process.env.DATABASE_PATH)
    : path.join(projectRoot, 'data', 'nagrik-drishti.sqlite')
});
