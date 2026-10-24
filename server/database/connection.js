import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { config } from '../config.js';

fs.mkdirSync(path.dirname(config.databasePath), { recursive: true });
export const database = new DatabaseSync(config.databasePath);
database.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
