import * as SQLite from 'expo-sqlite';

// SESSION 3 — the database layer.
// All SQL lives here so App.js stays clean. We use the SYNCHRONOUS API
// (openDatabaseSync / execSync / runSync / getAllSync) — simplest for beginners.

// open (or create) the database file on the device
const db = SQLite.openDatabaseSync('tasks.db');

// create the table once — safe to call on every launch
export function setupDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id    INTEGER PRIMARY KEY NOT NULL,
      title TEXT    NOT NULL,
      done  INTEGER NOT NULL DEFAULT 0
    );
  `);
}

// READ — every task, newest first
export function getTasks() {
  return db.getAllSync('SELECT * FROM tasks ORDER BY id DESC');
}

// CREATE — insert a task, return its new id
export function addTask(title) {
  const result = db.runSync('INSERT INTO tasks (title, done) VALUES (?, ?)', title, 0);
  return result.lastInsertRowId;
}

// UPDATE — change a task's title
export function updateTask(id, title) {
  db.runSync('UPDATE tasks SET title = ? WHERE id = ?', title, id);
}

// UPDATE — flip done on/off (SQLite has no boolean, so 0 / 1)
export function toggleTask(id, done) {
  db.runSync('UPDATE tasks SET done = ? WHERE id = ?', done ? 1 : 0, id);
}

// DELETE — remove a task
export function deleteTask(id) {
  db.runSync('DELETE FROM tasks WHERE id = ?', id);
}
