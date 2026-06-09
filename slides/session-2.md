---
marp: true
theme: workshop
paginate: true
header: 'Session 2 · Make It Interactive'
footer: 'Mobile Dev with React Native & Expo'
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# ⚡ Make It Interactive

## State, Input & Lists in **React Native**

### Session 2 of 3 · 90 minutes

<!-- 🎤 WELCOME BACK (0:00). One-line recap of week 1: "you built a screen and ran it on your phone." Today's promise: "that screen was frozen — today it RESPONDS to you." Quick: did anyone do the take-home? Invite one person to show their card. -->

---

## Recap: last week 🔁

- React Native + Expo → app on your phone
- **Components** return UI
- `View`, `Text`, `Image`
- Styling with `StyleSheet` + **Flexbox**

> Your card looked great… but it couldn't **do** anything. Let's fix that.

<!-- 🎤 (0:03) Keep recap to ~3 min. Ask the active-recall questions: "what wraps all text?" "default flex direction?" Then pivot hard to the limitation: static = boring. -->

---

## Today's goal 🎯

Build a **To-Do list** that you can:

- ➕ **add** tasks to (by typing)
- ✅ **tap** to mark done
- 🗑️ **delete**
- 🔢 and it shows **how many are left**

The big new idea: **state**.

<!-- 🎤 (0:05) Show the finished To-Do on your phone NOW (run the session-2 branch) so they know the destination. Seeing the goal first makes the pieces make sense. -->

---

<!-- _class: section -->

# Part 1
## **State** — data that changes

---

## What is "state"? 🧠

> **State** = data that can **change while the app runs**.
> When state changes, the screen **redraws itself** automatically.

Examples of state:
- the text you've typed
- the list of tasks
- whether a task is done

**UI = a picture of your current state.**

<!-- 🎤 ELABORATE (0:07): THE core React idea. Analogy: state is the app's memory of "what's true right now." You don't manually update the screen — you change the data, and React repaints. Repeat: "change the data, the screen follows." -->

---

## `useState` — give a component memory

```jsx
import { useState } from 'react';

const [count, setCount] = useState(0);
//     ▲        ▲                ▲
//   value   function to     starting
//   to read  change it       value
```

- `count` → read the current value
- `setCount(...)` → change it (and redraw)

<!-- 🎤 ELABORATE (0:09): Decode the square brackets slowly — it hands back TWO things: the value, and a setter function. Naming convention: `x` and `setX`. The argument to useState is the STARTING value. Don't explain array destructuring deeply; "it's just how we grab both." -->

---

## Counter demo

```jsx
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.big}>{count}</Text>
      <Button title="Add 1" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

Tap → `setCount` → screen updates. **No manual redraw.**

<!-- 🎤 (0:11) LIVE-CODE this counter. Tap the button on your phone; watch the number change. Then break it on purpose: try `count = count + 1` (direct change) and show it does NOT update. That failure teaches the next slide. -->

---

## ⚠️ The rules of state

1. **Never change state directly** — always use the setter
   ```jsx
   count = count + 1;        // ❌ nothing happens
   setCount(count + 1);      // ✅ updates the screen
   ```
2. Changing state **re-runs your component** (a "re-render")
3. Each `useState` is **independent**

<!-- 🎤 ELABORATE (0:13): This is where beginners lose hours. Hammer it: the ONLY way to change state is the setter function. Direct assignment is silently ignored by React. We'll see the same rule with arrays in a minute (copy, don't mutate). -->

---

<!-- _class: section -->

# Part 2
## **Responding to taps**

---

## Buttons & `onPress`

```jsx
<Button title="Tap me" onPress={() => alert('Hi!')} />

// nicer-looking, fully stylable:
<TouchableOpacity onPress={handlePress}>
  <Text>Tap me</Text>
</TouchableOpacity>
```

`onPress` takes a **function** to run when tapped.

<!-- 🎤 ELABORATE (0:15): Two ways to make tappable things: <Button> (quick, looks basic, limited styling) vs <TouchableOpacity> (a View you can style however you want, dims when pressed). We use TouchableOpacity for custom UI. Note onPress wants a FUNCTION, not a function CALL — `onPress={handlePress}` not `onPress={handlePress()}`. -->

---

## Inline vs named handlers

```jsx
// inline (quick):
onPress={() => setCount(count + 1)}

// named (cleaner for bigger logic):
function addTask() {
  // ...several lines...
}
onPress={addTask}
```

> Gotcha: `onPress={addTask}` ✅ (pass it)
> `onPress={addTask()}` ❌ (runs it immediately!)

<!-- 🎤 (0:17) The () mistake is extremely common. `addTask` = "here's the function, call it later." `addTask()` = "call it right now" (wrong — runs on render, not on tap). Show the bug if time allows. -->

---

<!-- _class: section -->

# Part 3
## **Typing: `TextInput`**

---

## A controlled text box

```jsx
const [text, setText] = useState('');

<TextInput
  placeholder="Add a task..."
  value={text}                 // state drives the box
  onChangeText={setText}       // typing updates state
/>
```

The input's value **is** state. Type → `onChangeText` → state → screen.

<!-- 🎤 ELABORATE (0:19): "Controlled input" = the text box is a mirror of state. value={text} shows state; onChangeText={setText} pushes keystrokes back into state. They stay in sync. This loop (state ⇄ UI) is the same idea as the counter, now with typing. -->

---

## Turning typed text into a task

```jsx
function addTask() {
  if (text.trim() === '') return;        // ignore empty
  const newTask = { id: Date.now(), title: text, done: false };
  setTasks([newTask, ...tasks]);         // add to the list
  setText('');                           // clear the box
}
```

- `Date.now()` → a quick unique **id**
- `...tasks` → keep the old tasks (next slide!)

<!-- 🎤 (0:21) Walk through addTask line by line. id from Date.now() (milliseconds — unique enough). Build a task OBJECT (remember week 1!). Then add it to the array and clear the input. The `...tasks` spread is the key new syntax → explain next. -->

---

<!-- _class: section -->

# Part 4
## **Lists that change**

---

## Arrays in state — **copy, don't mutate**

Same rule as before: make a **new array**, don't edit the old one.

```jsx
// ➕ ADD — spread the old, add the new
setTasks([newTask, ...tasks]);

// 🗑️ REMOVE — keep everything except one
setTasks(tasks.filter((t) => t.id !== id));

// ✅ UPDATE — change one, copy the rest
setTasks(tasks.map((t) =>
  t.id === id ? { ...t, done: !t.done } : t
));
```

<!-- 🎤 ELABORATE (0:24): THE most important slide of the day. Three array tools = your CRUD-in-memory: spread to add, filter to remove, map to update. Explain each: `...` copies items into a new array; `.filter` keeps items that pass a test; `.map` transforms each item. Why copy? Because React only repaints when you hand it a NEW array via the setter. Mutating the old one = no repaint. -->

---

## `.filter` and `.map` in plain words

```jsx
// filter → KEEP the ones that pass the test
[1,2,3,4].filter((n) => n > 2)        // [3, 4]

// map → TRANSFORM every item
[1,2,3].map((n) => n * 10)            // [10, 20, 30]
```

- **delete** a task → `filter` it out
- **toggle** a task → `map`, flip the matching one

<!-- 🎤 (0:26) Slow concrete examples with numbers BEFORE applying to tasks. Once they see filter=keep-some and map=change-each, the task code clicks. -->

---

## Showing a list: `FlatList`

```jsx
<FlatList
  data={tasks}
  keyExtractor={(item) => String(item.id)}
  renderItem={({ item }) => (
    <Text>{item.title}</Text>
  )}
/>
```

- `data` → your array
- `renderItem` → how to draw **one** item
- `keyExtractor` → a unique id per row (helps performance)

<!-- 🎤 ELABORATE (0:28): FlatList is the right tool for lists (it only renders what's on screen — fast even with thousands of items). Contrast with `tasks.map(...)` which is fine for tiny lists but renders everything. Every row needs a unique `key` so React can track it. -->

---

## Empty states matter

```jsx
<FlatList
  data={tasks}
  ListEmptyComponent={
    <Text style={styles.empty}>No tasks yet. Add one! ✨</Text>
  }
  ...
/>
```

Always tell the user when there's **nothing to show**.

<!-- 🎤 (0:30) Good UX habit. An empty screen looks broken; an empty STATE looks intentional. FlatList gives us ListEmptyComponent for free. -->

---

<!-- _class: section -->

# Part 5
## **Reusable components & props**

---

## Extract a `<TodoItem>` component

```jsx
function TodoItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onToggle}>
        <Text>{task.done ? '✅' : '⬜️'} {task.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}
```

<!-- 🎤 ELABORATE (0:32): Components keep code clean and reusable. `props` = the inputs you pass to a component (like function arguments). Here TodoItem receives a `task` to show and two functions (`onToggle`, `onDelete`) to call. Data and behavior flow DOWN from parent to child. -->

---

## Props flow **down**

```jsx
<FlatList
  data={tasks}
  renderItem={({ item }) => (
    <TodoItem
      task={item}
      onToggle={() => toggleTask(item.id)}
      onDelete={() => deleteTask(item.id)}
    />
  )}
/>
```

Parent owns the data & functions → passes them to each child.

<!-- 🎤 (0:34) Connect it: App owns `tasks` state and the toggle/delete functions; it hands each TodoItem just what that row needs. The child doesn't own data — it just displays and reports taps upward by calling the functions it was given. -->

---

## Derived values (no extra state!)

```jsx
const remaining = tasks.filter((t) => !t.done).length;

<Text>{remaining} left to do</Text>
```

Don't store what you can **calculate** from existing state.

<!-- 🎤 ELABORATE (0:36): A subtle but powerful idea — "remaining" is NOT separate state; it's computed from `tasks` every render. Storing it separately would risk the two getting out of sync. Rule: derive, don't duplicate. -->

---

## 🎬 Live-code target

The full **To-Do app**:
header with counter → input + add button → scrollable list of tappable, deletable tasks → empty state.

<!-- 🎤 (0:38) Live-code the full app now, reusing the pieces just taught (state, addTask, toggle/delete with map/filter, FlatList, TodoItem). Full code is in the presenter guide / `session-2` branch. ~8–10 min, narrating. Then hand off to the activity. -->

---

<!-- _class: activity -->

# 🧪 Activity 2
## Build the **To-Do** app

**Time:** ~25 min · **File:** `App.js`

Make it work end-to-end:

1. A `text` state + a **`TextInput`** (controlled)
2. A `tasks` state (start with 1–2 sample tasks)
3. **Add** a task (`...spread`), **clear** the input
4. **Toggle** done (`map`) and **delete** (`filter`)
5. Show them in a **`FlatList`** with an empty state

<!-- 🎤 (0:55) Hand off to activities/session-2-activity.md. Circulate. Watch for the classic bugs (listed in the presenter guide): onPress={fn()} , mutating arrays, missing keys. -->

---

<!-- _class: activity -->

## Activity 2 — checkpoints & stretch

✅ **Done when:** you can add, complete (tap), and delete tasks, and the "left to do" count is correct.

🌟 **Stretch goals:**
- A **"Clear done"** button (`filter` out completed)
- Strike-through style on completed tasks
- Prevent adding **empty** tasks (already handled — read how!)
- Sort done tasks to the bottom

<!-- 🎤 (1:10) Stretch goals for fast finishers. "Clear done" reinforces filter; strike-through reinforces conditional styling (`task.done && styles.done`). -->

---

<!-- _class: section -->

# ⚠️ But there's a problem…

## **Close the app. Reopen it.**
## Your tasks are **gone.** 😱

<!-- 🎤 (1:20) The cliffhanger. Have everyone fully close & reopen the app — the list resets to the samples. Let the disappointment land. "State lives in memory; memory clears. Next week we give the app real MEMORY with a database." Perfect setup for SQLite. -->

---

## ✅ Recap — you can now…

- Store changing data in **state** (`useState`)
- Respond to taps with **`onPress`**
- Capture typing with a controlled **`TextInput`**
- Add / remove / update with **spread / filter / map**
- Render dynamic lists with **`FlatList`**
- Build **reusable components** with **props**

<!-- 🎤 (1:23) Active recall: "how do we add to an array in state?" (spread into a new array + setter). "What makes a row tappable?" (TouchableOpacity + onPress). Big applause — this was a dense, powerful session. -->

---

<!-- _class: lead -->

## 🏠 Take-home

Add a **"Clear done"** button and a **strike-through**
style for completed tasks.

## ⏭️ Next session

We make your tasks **survive a restart** with a real
on-device **SQLite database** — full **CRUD**. 💾

<!-- 🎤 (1:26) Tease Week 3: "your app forgets everything on restart. Next week it remembers — forever — with a real database, and we turn this into a finished app you can show off." Remind: laptop + phone. End on time. -->
