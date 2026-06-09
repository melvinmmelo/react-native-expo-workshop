---
marp: true
theme: workshop
paginate: true
header: 'Session 3 · Save It For Real'
footer: 'Mobile Dev with React Native & Expo'
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 💾 Save It For Real

## Persistent **CRUD** with **SQLite**

### Session 3 of 3 · 90 minutes

<!-- 🎤 WELCOME (0:00). Final session! Recap the pain from last week with a live demo: open the session-2 app, add tasks, FORCE-CLOSE, reopen → gone. "Today we fix this forever, and turn your To-Do into a finished app you'll be proud to show." -->

---

## The problem we left with 😱

Last week's tasks **disappeared** on restart.

> State lives in **memory** → memory clears when the app closes.

Today the app gets **permanent memory**: a real **database** that lives on the phone.

<!-- 🎤 (0:03) Re-show the data-loss live if you didn't in the intro. Make sure the pain is felt — it's the motivation for everything today. -->

---

## Today's goal 🎯

Upgrade the To-Do into a **real app**:

- 💾 tasks **survive** restarts (SQLite)
- 🔁 full **CRUD**: Create, Read, Update, Delete
- ✏️ an **edit screen** (a pop-up form)
- ✨ polish: confirm-delete, a floating **＋** button

Then: your **final project**. 🏁

<!-- 🎤 (0:05) Show the finished session-3 app on your phone — add/edit/delete, force-close, reopen, data persists. The destination. -->

---

<!-- _class: section -->

# Part 1
## **Where does data live?**

---

## Memory vs. storage

| | **State (memory)** | **Database (storage)** |
|---|---|---|
| Survives restart? | ❌ no | ✅ yes |
| Speed | instant | very fast |
| Good for | what's on screen *now* | data you want to **keep** |

We'll keep using state for the screen — and a **database** to remember.

<!-- 🎤 ELABORATE (0:07): They're partners, not rivals. State = the live picture; database = the permanent record. The pattern today: read from DB → put in state → show. Change DB → re-read → update state. -->

---

## Meet **SQLite** 🗃️

- A **real SQL database** that lives **inside your app**, on the phone
- No server, no internet, nothing to set up
- Comes with Expo: `expo-sqlite`
- The **same SQL** used by huge systems — just tiny & local

> Your data lives in a file on the device. It's still there tomorrow.

<!-- 🎤 ELABORATE (0:09): SQLite is the most-deployed database in the world (every phone, browser, car). "SQL" = the language to talk to it. We'll learn 4 commands — that's enough for full CRUD. No network = no failures to debug; perfect for learning. -->

---

## **CRUD** = the four things apps do

| Letter | Action | SQL command |
|---|---|---|
| **C** | Create | `INSERT` |
| **R** | Read | `SELECT` |
| **U** | Update | `UPDATE` |
| **D** | Delete | `DELETE` |

Almost every app is just CRUD on some data.

<!-- 🎤 (0:11) The mental model for today and the final project. To-do, notes, contacts, expenses — all CRUD. Once you can CRUD, you can build most apps. -->

---

<!-- _class: section -->

# Part 2
## **Set up the database**

---

## Install & open

```bash
npx expo install expo-sqlite
```

```jsx
import * as SQLite from 'expo-sqlite';

// open (or create) a database file on the device
const db = SQLite.openDatabaseSync('tasks.db');
```

`openDatabaseSync` gives us a `db` to run commands on.

<!-- 🎤 ELABORATE (0:14): `npx expo install` (not plain npm install) picks the version that matches our Expo SDK. `openDatabaseSync('tasks.db')` opens the file if it exists, creates it if not. "Sync" = simple, no async/await — perfect for learning. (An async version exists for advanced use.) -->

---

## Create a table (your data's shape)

```jsx
db.execSync(`
  CREATE TABLE IF NOT EXISTS tasks (
    id    INTEGER PRIMARY KEY NOT NULL,
    title TEXT    NOT NULL,
    done  INTEGER NOT NULL DEFAULT 0
  );
`);
```

A **table** is like a spreadsheet: **columns** = fields, **rows** = items.

<!-- 🎤 ELABORATE (0:17): Walk the columns. `id INTEGER PRIMARY KEY` = a unique auto-numbered id (SQLite fills it in). `title TEXT` = the task words. `done INTEGER DEFAULT 0` = SQLite has no true/false, so we use 0 = not done, 1 = done. `IF NOT EXISTS` = only create it the first time, safe to run every launch. -->

---

## SQLite data types (the short list)

| Type | Use for | Example |
|---|---|---|
| `INTEGER` | whole numbers, ids, true/false (0/1) | `id`, `done` |
| `TEXT` | any text | `title`, `note` |
| `REAL` | decimals | `price` |

> No `BOOLEAN` and no `DATE` — use `INTEGER` (0/1) and `TEXT`.

<!-- 🎤 (0:19) Keep it to these three. For the final project (e.g. expenses), `REAL` handles money. Dates are usually stored as TEXT ("2026-06-09"). Don't overload them. -->

---

<!-- _class: section -->

# Part 3
## **The four operations**

---

## ➕ Create → `INSERT`

```jsx
const result = db.runSync(
  'INSERT INTO tasks (title, done) VALUES (?, ?)',
  title, 0
);

result.lastInsertRowId;   // the new task's id
```

`runSync` runs a command that **changes** data.

<!-- 🎤 ELABORATE (0:21): The `?` are placeholders; the values after fill them in order. `runSync` is for INSERT/UPDATE/DELETE (changes) and returns `{ lastInsertRowId, changes }`. We pass `0` for done = not finished yet. -->

---

## 📖 Read → `SELECT`

```jsx
const tasks = db.getAllSync(
  'SELECT * FROM tasks ORDER BY id DESC'
);
// → [ { id: 3, title: '...', done: 0 }, ... ]
```

`getAllSync` returns an **array of rows** — exactly what `FlatList` wants!

<!-- 🎤 ELABORATE (0:23): `SELECT *` = "give me all columns". `ORDER BY id DESC` = newest first. getAllSync hands back a normal JS array of objects — drop it straight into state and FlatList. This is the bridge between SQL and the UI we already know. -->

---

## ✏️ Update → `UPDATE`  ·  🗑️ Delete → `DELETE`

```jsx
// change a task's title
db.runSync('UPDATE tasks SET title = ? WHERE id = ?', title, id);

// flip done on/off (0 ↔ 1)
db.runSync('UPDATE tasks SET done = ? WHERE id = ?', done ? 1 : 0, id);

// remove a task
db.runSync('DELETE FROM tasks WHERE id = ?', id);
```

> ⚠️ **Always include `WHERE id = ?`** — without it you change/delete **every** row!

<!-- 🎤 ELABORATE (0:25): The WHERE clause targets ONE row by id. Forgetting WHERE on UPDATE/DELETE hits the whole table — a classic, scary bug. Say it twice. -->

---

## Why the `?` placeholders matter

```jsx
// ✅ safe — values go in the params
db.runSync('INSERT INTO tasks (title) VALUES (?)', title);

// ❌ never glue strings together
db.runSync(`INSERT INTO tasks (title) VALUES ('${title}')`);
```

Placeholders handle quotes for you and block **SQL injection**.

<!-- 🎤 ELABORATE (0:26): Two reasons: (1) correctness — a title with an apostrophe (O'Brien) breaks glued strings; (2) security — gluing user text into SQL is the #1 web vulnerability (injection). Always use `?`. Good habit from day one. -->

---

<!-- _class: section -->

# Part 4
## **Organize it: a `db.js` module**

---

## Keep database code in one file

```jsx
// db.js
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('tasks.db');

export function setupDatabase() {
  db.execSync(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0);`);
}
export function getTasks()        { return db.getAllSync('SELECT * FROM tasks ORDER BY id DESC'); }
export function addTask(title)    { db.runSync('INSERT INTO tasks (title, done) VALUES (?, ?)', title, 0); }
export function updateTask(id, t) { db.runSync('UPDATE tasks SET title = ? WHERE id = ?', t, id); }
export function toggleTask(id, d) { db.runSync('UPDATE tasks SET done = ? WHERE id = ?', d ? 1 : 0, id); }
export function deleteTask(id)    { db.runSync('DELETE FROM tasks WHERE id = ?', id); }
```

<!-- 🎤 ELABORATE (0:28): Separation of concerns — all SQL lives here; App.js just calls friendly functions like `getTasks()`. `export` makes each usable elsewhere. In App.js: `import * as DB from './db'` then `DB.getTasks()`. This keeps the UI clean and is exactly how you'll structure the final project. -->

---

<!-- _class: section -->

# Part 5
## **Wire it into the screen**

---

## Load on startup with `useEffect`

```jsx
import { useEffect, useState } from 'react';
import * as DB from './db';

const [tasks, setTasks] = useState([]);

useEffect(() => {
  DB.setupDatabase();   // create table (first run)
  refresh();            // load saved tasks
}, []);                 // [] = run ONCE when the app starts
```

<!-- 🎤 ELABORATE (0:31): `useEffect` runs code at the right moment, not on every render. The empty `[]` means "run once, on mount." Perfect for: make sure the table exists, then load whatever's already saved. This is why data appears the moment you open the app. -->

---

## The golden pattern: **change → refresh**

```jsx
function refresh() {
  setTasks(DB.getTasks());     // re-read the DB into state
}

function add(title) {
  DB.addTask(title);           // 1) change the database
  refresh();                   // 2) re-read so the screen updates
}
```

> Database = the truth. State = a fresh copy for the screen.

<!-- 🎤 ELABORATE (0:33): The mental model for the whole app: after ANY change (add/edit/toggle/delete), call refresh() to re-read the DB. The DB is the single source of truth; state is just the current snapshot we render. Simple and reliable for beginners (no manual array juggling). -->

---

<!-- _class: section -->

# Part 6
## **A second screen + polish**

---

## One `Modal`, two jobs (add **and** edit)

```jsx
const [modalVisible, setModalVisible] = useState(false);
const [draft, setDraft] = useState('');
const [editingId, setEditingId] = useState(null); // null = adding

function save() {
  if (editingId === null) DB.addTask(draft);        // CREATE
  else                    DB.updateTask(editingId, draft); // UPDATE
  setModalVisible(false);
  refresh();
}
```

<!-- 🎤 ELABORATE (0:35): A Modal is a pop-up "screen" over the list — the simplest way to show a second view. We reuse ONE form for both add and edit: `editingId === null` means we're adding; otherwise we're editing that id. This is your first taste of multiple screens. -->

---

## Confirm before deleting (`Alert`)

```jsx
import { Alert } from 'react-native';

function remove(task) {
  Alert.alert('Delete task?', `"${task.title}"`, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive',
      onPress: () => { DB.deleteTask(task.id); refresh(); } },
  ]);
}
```

Never delete user data without asking. 🙏

<!-- 🎤 (0:37) Alert.alert(title, message, buttons) gives a native confirm dialog for free. Good UX + prevents accidental taps. The destructive button runs the delete then refresh. -->

---

## "Real" navigation (for later) 🧭

A `Modal` is great for one pop-up. Multi-screen apps use a **navigation library**:

- **Expo Router** — files become screens (`app/index.js`, `app/details.js`)
- **React Navigation** — stacks & tabs

> Stretch goal / final project — not required today.

<!-- 🎤 (0:38) Name-drop so they know the "real" tool exists and what to search for. For today and the MVP final project, Modal is enough. Mention Expo Router is the Expo-native, beginner-friendly choice when they're ready for true multi-screen. -->

---

## 🎬 Live-code target

The finished **persistent To-Do**: list + floating **＋** → add/edit modal → tap to toggle → ✏️ edit → 🗑️ delete (with confirm) → **survives restart**.

<!-- 🎤 (0:40) Live-code: build db.js first, then wire App.js (useEffect → refresh → modal → alert). ~10 min. Full code in the presenter guide / session-3 branch. After building, FORCE-CLOSE and reopen on your phone to prove persistence. Cue the applause. -->

---

<!-- _class: activity -->

# 🧪 Activity 3
## Make your tasks **permanent**

**Time:** ~20 min · **Files:** `db.js` + `App.js`

1. Create **`db.js`** with `setupDatabase`, `getTasks`, `addTask`, `deleteTask`
2. In `App.js`, load tasks in **`useEffect`** (run once)
3. **Add** a task → save to DB → **refresh**
4. **Delete** a task → remove from DB → **refresh**
5. **Prove it:** force-close the app, reopen — tasks are still there ✅

<!-- 🎤 (0:52) Hand off to activities/session-3-activity.md. MVP = Create + Read + Delete persisting. Update/edit-modal is the stretch. Circulate; watch for the errors in the presenter guide (forgot expo install, forgot refresh, WHERE missing). -->

---

<!-- _class: activity -->

## Activity 3 — checkpoints & stretch

✅ **Done when:** tasks **survive a full restart**, and you can add + delete.

🌟 **Stretch goals:**
- **Toggle done** persists (`UPDATE ... SET done`)
- **Edit** a task with the Modal (`UPDATE ... SET title`)
- **Confirm delete** with `Alert`
- A **"saved 💾"** badge so users know it's permanent

<!-- 🎤 (1:08) For finishers, edit-via-modal is the juiciest stretch and directly preps the final project. Help stragglers reach at least Create+Read+Delete persisting before moving on. -->

---

<!-- _class: section -->

# 🏁 Final Project
## **Build your own CRUD app**

---

## Your mission

Build a **SQLite-backed CRUD app** of your choice:

🗂️ Task manager · 💸 Expense tracker · 📝 Notes/Journal
📇 Contacts · 📦 Inventory · ✅ Habit tracker · 💡 *your idea*

**Must have:** a table (≥3 columns) · full **CRUD** · a list + an add/edit form · empty state · confirm-delete · clean styling.

📄 Full brief, milestones & rubric: **`final-project/BRIEF.md`**

<!-- 🎤 (1:12) Walk the options; encourage personal/useful ideas (track THEIR money, THEIR study habits). Point them to BRIEF.md for requirements + rubric. Emphasize: you already have ALL the skills — the final project is the same patterns on different data. Suggest 1–2 weeks + a demo day. -->

---

## You started at **zero**. Look now. 🚀

In three sessions you learned to:

- think in **components** & **state**
- handle **input**, **events**, and **lists**
- store data in a real **SQLite** database (full CRUD)
- ship a working app **on your own phone**

That's genuine mobile development. 👏

<!-- 🎤 (1:24) Zoom out. Remind them how far they came from "never coded." This is real, marketable skill. Active recall across all 3 weeks: components? state? CRUD letters? -->

---

<!-- _class: lead -->

## Where to go next 🧭

- 📚 **docs.expo.dev** — your reference
- 🧭 **Expo Router** — multi-screen apps
- 🎨 Component kits, icons, animations
- 🛠️ **Build the final project** — then keep building

## Thank you! 🙌
### Now go ship something.

<!-- 🎤 (1:27) Send-off. Share where to ask questions / submit the final project. Encourage them to keep the momentum within a week while it's fresh. Celebrate them. End on time. -->
