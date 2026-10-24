import { database } from '../connection.js';

export const departmentRepository = {
  upsert(department) {
    database.prepare('INSERT INTO departments (code, name) VALUES (?, ?) ON CONFLICT(code) DO UPDATE SET name = excluded.name').run(department.code, department.name);
  },
  list() { return database.prepare('SELECT * FROM departments ORDER BY name').all(); },
  find(code) { return database.prepare('SELECT * FROM departments WHERE code = ?').get(code); }
};
