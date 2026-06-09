# 🧪 Activity 3 — Make Your Tasks Permanent

**Time:** ~20 minutes · **Files:** `db.js` (new) + `App.js` · **Goal:** your tasks **survive a full restart** using a real SQLite database.

You'll practice today's ideas: **`expo-sqlite`, CRUD (INSERT/SELECT/UPDATE/DELETE), `useEffect`,** and the **refresh** pattern.

---

## 🏁 Start it up

```bash
git checkout session-3
npm install        # installs expo-sqlite too
npx expo start
```

> If you're upgrading your own Session 2 app instead, first run:
> ```bash
> npx expo install expo-sqlite
> ```

---

## Build it in 4 moves

### 1️⃣ Create `db.js` (all the database code)

```jsx
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('tasks.db');

export function setupDatabase() {
  db.execSync(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  );`);
}
export function getTasks()     { return db.getAllSync('SELECT * FROM tasks ORDER BY id DESC'); }
export function addTask(title) { db.runSync('INSERT INTO tasks (title, done) VALUES (?, ?)', title, 0); }
export function deleteTask(id) { db.runSync('DELETE FROM tasks WHERE id = ?', id); }
```

### 2️⃣ Load saved tasks when the app opens

```jsx
import { useEffect, useState } from 'react';
import * as DB from './db';

const [tasks, setTasks] = useState([]);

useEffect(() => {
  DB.setupDatabase();   // make the table (first run)
  refresh();            // load saved tasks
}, []);                 // [] = run once

function refresh() {
  setTasks(DB.getTasks());
}
```

### 3️⃣ Add → save to DB → refresh

```jsx
function add(title) {
  if (title.trim() === '') return;
  DB.addTask(title.trim());   // 1) change the database
  refresh();                  // 2) re-read so the screen updates
}
```

### 4️⃣ Delete → remove from DB → refresh

```jsx
function remove(id) {
  DB.deleteTask(id);
  refresh();
}
```

Wire `add` to your input/button and `remove` to each row's 🗑️ (from Session 2).

---

## 🧪 The big test

1. Add a few tasks.
2. **Fully close the app** (swipe it away — don't just minimize).
3. Reopen it.
4. **Your tasks are still there.** 🎉 You built a real database app!

---

## ✅ Checkpoints — you're done when…

- [ ] `db.js` exists with `setupDatabase`, `getTasks`, `addTask`, `deleteTask`
- [ ] Tasks **load on open** (via `useEffect`)
- [ ] **Adding** a task saves it and shows it
- [ ] **Deleting** a task removes it
- [ ] Tasks **survive a full restart** ✅✅✅

---

## 🌟 Stretch goals (these prep your final project!)

1. **Toggle done that persists:**
   ```jsx
   export function toggleTask(id, done) {
     db.runSync('UPDATE tasks SET done = ? WHERE id = ?', done ? 1 : 0, id);
   }
   ```
2. **Edit a task** with a `Modal` (reuse one form for add + edit — see the slides).
3. **Confirm before delete** with `Alert.alert(...)`.
4. **A floating ＋ button** (`position: 'absolute'`) to open the add form.

> The full, polished version of all of these is on the `session-3` branch — peek if you get stuck!

---

## 😵 Stuck? Quick fixes

| Problem | Try this |
|---|---|
| `Cannot find module 'expo-sqlite'` | Run `npx expo install expo-sqlite`, then restart `npx expo start` |
| Added a task but the list didn't change | You forgot `refresh()` after the DB change — call it after **every** write |
| Nothing shows on open | Make sure `useEffect` calls `setupDatabase()` **and** `refresh()` |
| I changed/deleted everything by accident | Your SQL is missing `WHERE id = ?` |
| Old test data won't clear | Delete the app from your phone (this drops the database file) and reopen |

---

## 🏁 Next: your Final Project

You now have **every skill** to build a real app. Pick a CRUD app you'd actually use — task manager, expense tracker, notes, contacts, habits — and build it.

👉 Full brief, requirements & rubric: **`final-project/BRIEF.md`**
