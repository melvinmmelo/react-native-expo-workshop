# 🏁 Final Project — Build Your Own CRUD App

**The goal:** take everything from the 3 sessions and build *your own* mobile app, backed by a real **SQLite** database, with full **CRUD**.

> You already have every skill you need. The final project is the **same patterns** you practiced — just on **data you care about**.

**Suggested time:** 1–2 weeks · **Deliverable:** a working app you demo on your phone + the code.

---

## 1. Pick an idea

Choose one (or pitch your own). For each, here's a starter **table design** — that's the first thing you should plan.

### 🗂️ Task / To-Do Manager
Build on what you made. Add categories or due dates.
```
tasks( id, title, category TEXT, due TEXT, done INTEGER )
```

### 💸 Expense Tracker
Log spending and show a running total.
```
expenses( id, title, amount REAL, category TEXT, date TEXT )
```

### 📝 Notes / Journal
Write, edit, and search notes.
```
notes( id, title, body TEXT, created TEXT )
```

### 📇 Contacts Book
Save people; tap to view/edit.
```
contacts( id, name, phone TEXT, email TEXT )
```

### 📦 Inventory / Stock Tracker
Track items and quantities (+/−).
```
items( id, name, quantity INTEGER, price REAL )
```

### ✅ Habit Tracker
Check off daily habits, count a streak.
```
habits( id, name, streak INTEGER, lastDone TEXT )
```

> 💡 **Make it personal.** Track *your* expenses, *your* study habits, *your* book list. You'll enjoy it more and build it better.

---

## 2. Requirements (the MVP — required for full marks)

Your app **must**:

1. ✅ Use a **SQLite table** with **at least 3 columns**
2. ✅ Do **all four CRUD** operations:
   - **C**reate — add new records (`INSERT`)
   - **R**ead — list/show records (`SELECT`)
   - **U**pdate — edit an existing record (`UPDATE`)
   - **D**elete — remove a record (`DELETE`)
3. ✅ **Persist** — data survives a full app restart
4. ✅ Have a **list screen** + an **add/edit form** (a `Modal` is fine)
5. ✅ Show an **empty state** when there's no data
6. ✅ **Confirm before deleting** (`Alert`)
7. ✅ Be **styled** consistently (colors, spacing, rounded cards)
8. ✅ Use **parameterized queries** (`?`) — never glue strings into SQL

---

## 3. Stretch goals (the extra 10%)

Pick a few to stand out:

- 🔍 **Search / filter** the list
- ↕️ **Sort** (by date, name, amount, done)
- 🏷️ **Categories** or tags
- 📊 A **summary** (total spent, tasks left, longest streak)
- 🧭 **Real navigation** with **Expo Router** (separate screens instead of a Modal)
- 🌙 **Dark mode** or a theme switcher
- 🎨 A custom **app icon** & splash screen
- 📅 A **date picker** (`@react-native-community/datetimepicker`)

---

## 4. Milestones

| Milestone | When | What's done |
|---|---|---|
| **M1 — Plan** | Day 1–2 | Idea chosen · table schema designed · screens sketched on paper |
| **M2 — Create + Read** | Week 1 | `db.js` + table · add records · list them · persists on restart |
| **M3 — Update + Delete** | Week 1–2 | Edit form (Modal) · delete with confirm · all CRUD works |
| **M4 — Polish** | Final | Empty states · styling · 1–2 stretch goals · demo-ready |

> Build in this order. Get **Create + Read persisting first** — that's the hard part, and everything else is quick once it works.

---

## 5. How you'll be graded (100 pts)

| Area | Pts | What we look for |
|---|---:|---|
| **Functionality & CRUD** | 40 | All four operations work; data persists across a restart |
| **Data model & persistence** | 20 | Sensible table/columns; SQLite used correctly; `?` placeholders |
| **UI / UX & styling** | 20 | Clean, consistent design; empty state; confirm-delete; readable |
| **Code quality & structure** | 10 | DB code in `db.js`; reusable components; tidy, readable code |
| **Creativity & stretch** | 10 | Useful idea; at least one stretch feature; polish |
| **Live demo** | — | You run it on a real phone and walk us through CRUD |

**A passing project:** adds, lists, edits, and deletes records that survive a restart, looks tidy, and runs on a phone.

---

## 6. Submitting

1. **Code:** push to a GitHub repo (public), **or** share an [Expo Snack](https://snack.expo.dev) link, **or** a zip (without `node_modules`).
2. **README:** 4–5 lines — what the app does, your table schema, and how to run it (`npm install` → `npx expo start`).
3. **Demo:** a ~2-minute walkthrough on your phone (live in class, or a screen recording).

---

## 7. Tips for success 🌟

- **Start from the `session-3` branch** — it already has working CRUD + a Modal. Rename `tasks` to your thing and change the columns. *Don't start from a blank file.*
- **Change → `refresh()`** after every database write. This one habit prevents most bugs.
- **One feature at a time.** Get adding working before editing; get the data right before the styling.
- **Test persistence early and often** — force-close and reopen.
- **Stuck?** Re-read the Session 3 slides and presenter code. The answer is almost always there.

You went from *never coding* to *shipping a database-backed mobile app* in three weeks. The final project is your victory lap — make something **you'd actually use**. 🚀
