---
marp: true
theme: workshop
paginate: true
header: 'Session 1 · Hello, Mobile World'
footer: 'Mobile Dev with React Native & Expo'
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 📱 Hello, Mobile World

## Mobile App Development with **React Native & Expo**

### Session 1 of 3 · 90 minutes

<!-- 🎤 WELCOME (0:00). Energy up. One line: "By the end of today, an app YOU built is running on YOUR phone." Ask for a show of hands: who has NEVER written code? Reassure them — that's exactly who this is for. Confirm everyone did the setup guide; anyone who didn't, pair them up or point to snack.expo.dev. -->

---

## Today's goal 🎯

By the end of 90 minutes you will:

1. Understand **what** React Native & Expo are
2. Run a **live app on your own phone**
3. Learn just enough **JavaScript** to be dangerous
4. Build an **"About Me" profile card** — your first screen

> No experience needed. We go slow. Questions are *encouraged*.

<!-- 🎤 (0:02) Set expectations: we build ONE app that grows over 3 weeks. Today = static screen. Next week = it reacts to you. Week 3 = it remembers your data. Keep it concrete. -->

---

## How this works ✋

- 💻 You **write code** on your laptop (in `App.js`)
- 📱 It **runs on your phone** through **Expo Go**
- 📶 They connect over the **same Wi-Fi**
- 💾 Save the file → the app **updates instantly** (hot reload)

That feedback loop is the whole magic. We'll use it constantly.

<!-- 🎤 (0:05) Do a LIVE demo right now if projector allows: change a word in App.js, save, show your phone updating. Nothing sells it like seeing it. Then make sure each student has their app open before moving on — this is the #1 place people fall behind. -->

---

<!-- _class: section -->

# Part 1
## **What is mobile development?**

---

## Native vs. cross-platform

| | **Native** | **Cross-platform** |
|---|---|---|
| Android | Kotlin / Java | ✅ one codebase |
| iPhone | Swift | ✅ one codebase |
| Teams need | 2 apps, 2 skills | **1 app, 1 skill** |
| Examples | — | React Native, Flutter |

**React Native** lets us write **one app in JavaScript** that runs on **both** Android and iPhone.

<!-- 🎤 ELABORATE (0:10): The big idea — historically you wrote an app TWICE (once per platform). Cross-platform = write once, run on both. That's a huge deal for small teams/solo devs. Don't go deep on the bridge/architecture — keep it at the "one codebase" level for beginners. -->

---

## Why **React Native + Expo**?

- 🌍 **One codebase** → Android **and** iPhone
- 🧰 **Expo** removes the painful setup (no Android Studio / Xcode today)
- 🔥 **Hot reload** — see changes instantly
- 🏢 Used in the real world by **Instagram, Discord, Shopify, Coinbase, Tesla**

> **React Native** = the toolkit. **Expo** = the friendly wrapper that makes it easy to start.

<!-- 🎤 ELABORATE (0:13): Distinguish the two clearly — React Native is the framework (the building blocks); Expo is a platform/toolset ON TOP that handles the hard native setup, gives us Expo Go, and bundles useful libraries (like the SQLite we'll use in week 3). Name-dropping real apps builds confidence that this is "real". -->

---

## The mental model 🧠

```
  JavaScript        ← the language you write
      ↓
    React           ← components & state (the "what shows")
      ↓
 React Native       ← turns components into REAL phone UI
      ↓
     Expo           ← bundles & serves your app
      ↓
   Expo Go 📱       ← the app on your phone that runs it
```

You write the **top**. Expo handles the **bottom**.

<!-- 🎤 (0:16) This stack slide is the anchor for the whole workshop. Walk DOWN the arrows once slowly. You only ever touch the top layer (JavaScript + React). Promise them they don't need to understand the lower layers to build real things. -->

---

<!-- _class: section -->

# Part 2
## **Let's get it running**

---

## What you installed 🧰

| Tool | What it's for |
|---|---|
| **Node.js** | Runs our developer tools |
| **VS Code** | Where you write code |
| **Expo Go** (phone) | Runs your app live |

Check your laptop is ready:

```bash
node --version    # should print a version number
```

<!-- 🎤 (0:18) Quick health check. Ask everyone to run `node --version`. If anyone errors, that's a setup problem — pair them with a neighbor or move them to snack.expo.dev so they're not blocked. Don't let setup eat more than a few minutes here. -->

---

## Create & run an app

```bash
# make a fresh app (blank = simplest, JavaScript)
npx create-expo-app@latest my-app --template blank

cd my-app
npx expo start          # a QR code appears
```

Then **scan the QR code**:

- **Android** → Expo Go → *Scan QR code*
- **iPhone** → Camera app → tap the banner

<!-- 🎤 (0:20) In class we'll use the cloned repo instead (`git checkout session-1`), but show this so they know how to start from zero later (they'll need it for the final project). Make sure phone + laptop share Wi-Fi. Tunnel fallback: `npx expo start --tunnel`. -->

---

## Hot reload = your superpower 🔥

1. Open `App.js` in VS Code
2. Change the text `"Open up App.js..."` to **your name**
3. **Save** (`Ctrl/Cmd + S`)
4. 👀 Watch your phone update **instantly**

> If it ever gets weird: press **`r`** in the terminal to reload, or `npx expo start -c` to clear the cache.

<!-- 🎤 (0:23) Everyone does this together. The "aha" moment. Celebrate it — they just changed a real app on a real phone. Pause until you see smiles/heads up across the room before continuing. -->

---

<!-- _class: section -->

# Part 3
## **A tiny bit of JavaScript**

<!-- 🎤 (0:25) Reassure: we only need a handful of JS ideas. We'll see each one again immediately in real code, so don't worry about memorizing. Keep this segment to ~12 min — resist going down rabbit holes. -->

---

## Variables — labeled boxes 📦

```js
const name = "Juan";    // can't be reassigned (use this by default)
let score = 0;          // CAN change later
score = 10;             // ✅ ok, because it's `let`
```

- `const` → a value that **won't change** (your default)
- `let` → a value that **will change**

<!-- 🎤 ELABORATE (0:26): This is THE most important beginner concept. Analogy: a box with a label. `const` = box is sealed after you fill it. `let` = you can swap what's inside. Rule of thumb: start with const, switch to let only if the value needs to change. Don't mention `var`. -->

---

## Basic data types

```js
const title   = "My Notes";   // string  → text (in quotes)
const count   = 42;           // number
const isDone  = true;         // boolean → true / false
```

Three flavors of data you'll use constantly: **text**, **numbers**, **yes/no**.

<!-- 🎤 (0:28) Keep it fast. Strings are quoted, numbers aren't, booleans are true/false. We'll use booleans for "is this task done?" next week. -->

---

## Arrays — a list of things 📋

```js
const fruits = ["apple", "banana", "mango"];

fruits[0];          // "apple"  (counting starts at 0!)
fruits.length;      // 3
fruits.push("kiwi") // add to the end
```

We'll store **lists of to-dos** in an array next session.

<!-- 🎤 ELABORATE (0:29): Two gotchas for beginners: (1) indexing starts at 0, so the first item is [0]; (2) `.length` gives the count. Foreshadow: a to-do app is just an array of tasks. -->

---

## Objects — a thing with properties 🏷️

```js
const task = {
  title: "Buy milk",
  done: false,
};

task.title;   // "Buy milk"
task.done;    // false
```

An object groups related info together. A to-do **item** is an object; a to-do **list** is an array of them.

<!-- 🎤 (0:31) Connect arrays + objects: a list (array) of tasks (objects). This is the exact shape of next week's app, so plant the seed now. -->

---

## Functions — reusable actions ⚙️

```js
function greet(name) {
  return "Hello, " + name + "!";
}

greet("Maria");   // "Hello, Maria!"

// modern "arrow" style (you'll see this a lot):
const greet = (name) => "Hello, " + name + "!";
```

A function takes **inputs** and gives back an **output**.

<!-- 🎤 ELABORATE (0:33): Don't over-explain arrow functions; just say "another way to write a function, very common in React." Buttons will call functions when tapped next week. Move on. -->

---

<!-- _class: section -->

# Part 4
## **Your first component**

---

## Anatomy of `App.js`

```jsx
import { Text, View } from 'react-native';   // 1. bring in pieces

export default function App() {              // 2. a component
  return (                                   // 3. describe the UI
    <View>
      <Text>Hello!</Text>
    </View>
  );
}                                            // 4. (export = "use me")
```

A **component** is a function that **returns UI**.

<!-- 🎤 ELABORATE (0:35): Walk the 4 numbered parts. Key sentence: "A component is just a function that returns what to show on screen." `export default` = "this is the main thing in the file." That HTML-looking stuff inside return is JSX → next slide. -->

---

## JSX — HTML's cousin, inside JavaScript

```jsx
<View>
  <Text>Hi {name}!</Text>
</View>
```

3 rules to remember:

1. Everything returns **one parent** wrapper (`<View>`)
2. Use **`{ }`** to drop JavaScript in: `{name}`, `{2 + 2}`
3. Tags must **close**: `<Image />`

<!-- 🎤 ELABORATE (0:38): JSX = writing UI that looks like HTML but is really JavaScript. The curly braces are the bridge back to JS — anything in {} is evaluated. The "one parent wrapper" rule trips people up: if you need two things side by side, wrap them in a <View>. -->

---

<!-- _class: section -->

# Part 5
## **Core building blocks**

---

## `<View>` — the box 📦

The container for everything. Think of it as a **`<div>`** or just **a box** that holds other things and arranges them.

```jsx
<View>
  {/* other components go inside */}
</View>
```

You'll nest Views inside Views to build layouts.

<!-- 🎤 (0:40) Analogy: Views are like boxes you put things into, and boxes inside boxes. Nearly every layout is just nested Views. -->

---

## `<Text>` — all words live here ✍️

```jsx
<Text>Hello world</Text>
```

> ⚠️ **The #1 beginner error:** every piece of text **must** be inside a `<Text>`.
> Raw text loose in a `<View>` will crash the app.

<!-- 🎤 ELABORATE (0:41): Emphasize hard — unlike the web, you cannot put bare text in a box. It MUST be wrapped in <Text>. The error message "Text strings must be rendered within a <Text> component" will appear a LOT; teach them to recognize it now so it doesn't scare them later. -->

---

## `<Image>` — pictures 🖼️

```jsx
import { Image } from 'react-native';

<Image
  source={{ uri: 'https://i.pravatar.cc/300' }}
  style={{ width: 120, height: 120 }}
/>
```

> A remote image **needs a `width` and `height`** or it won't show.

<!-- 🎤 ELABORATE (0:43): Two ways to load images: from the internet (`uri`) or from a local file (`require('./assets/pic.png')`). For internet images you MUST give width+height. Live-tip: pravatar.cc gives random avatar images — handy for demos. -->

---

## Putting them together

```jsx
<View>
  <Image source={{ uri: 'https://i.pravatar.cc/300' }}
         style={{ width: 100, height: 100 }} />
  <Text>Juan dela Cruz</Text>
  <Text>Mobile Developer</Text>
</View>
```

That's already a tiny profile! Now let's make it **look good**.

<!-- 🎤 (0:45) This is the skeleton of today's activity. It works but looks plain. Segue to styling — "right now it's ugly; let's fix that." -->

---

<!-- _class: section -->

# Part 6
## **Styling & layout**

---

## The `style` prop + `StyleSheet`

```jsx
import { StyleSheet, Text, View } from 'react-native';

<View style={styles.card}>
  <Text style={styles.name}>Juan</Text>
</View>

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: '#EEF2FF', borderRadius: 16 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#4338CA' },
});
```

<!-- 🎤 ELABORATE (0:47): Styles are just JavaScript objects: property: value. Note the differences from CSS — camelCase (backgroundColor not background-color), values are numbers (no "px") or strings. StyleSheet.create keeps styles tidy and reusable. -->

---

## Flexbox — how things arrange

Every `<View>` lays out its children with **Flexbox**.

```jsx
<View style={{ flexDirection: 'row' }}>   // side by side →
<View style={{ flexDirection: 'column' }}> // stacked ↓ (DEFAULT)
```

> ⚠️ On the web the default is `row`. In React Native the default is **`column`** (top → bottom).

<!-- 🎤 ELABORATE (0:49): The single most useful layout idea. Default is column (vertical stacking) — surprises people coming from web. Change to flexDirection:'row' to put things side-by-side (like the info rows in the card). -->

---

## Flexbox — centering

```jsx
<View style={{
  flex: 1,                    // fill available space
  justifyContent: 'center',   // along the main axis
  alignItems: 'center',       // across the other axis
}}>
```

- `justifyContent` → spacing **along** the direction
- `alignItems` → alignment **across** it

<!-- 🎤 ELABORATE (0:51): Don't make them memorize axes — give the practical recipe: "to center something, use flex:1 + justifyContent:'center' + alignItems:'center'." They'll internalize main/cross axis with practice. Demo live by toggling values if you have time. -->

---

## Handy style properties

```js
{
  padding: 16,            // space INSIDE
  margin: 12,             // space OUTSIDE
  backgroundColor: '#fff',
  borderRadius: 16,       // rounded corners
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
}
```

Mix & match these to style anything.

<!-- 🎤 (0:53) Padding vs margin: inside vs outside the box. These 7 properties cover ~80% of styling. Encourage experimentation — change a number, save, see what happens. -->

---

## 🎬 Live-code target

We'll build this **Profile Card** together, then you'll make your own:

- 🖼️ a round avatar image
- 🔤 a name + role
- 💬 a short bio box
- 📋 three info rows (📍 location, 🎓 school, 💡 learning)

<!-- 🎤 (0:55) Live-code the card now, step by step, narrating each piece (View → Image → Text → styles → flex rows). Build the SAME thing students will adapt in the activity. Keep ~10 min. Full code is in the presenter guide and on the `session-1` branch (App.js). Type it live; let them watch, don't expect them to keep up keystroke-for-keystroke yet. -->

---

<!-- _class: activity -->

# 🧪 Activity 1
## Build your **"About Me"** card

**Time:** ~25 min · **File:** `App.js`

Make the profile card **about you**:

1. Your **photo** (an `<Image>` — internet URL or `./assets`)
2. Your **name** and a **role** ("Future Developer")
3. A short **bio** in a styled box
4. **Three info rows** (📍, 🎓, 💡) using `flexDirection: 'row'`

<!-- 🎤 (1:05) Hand off to the activity sheet (activities/session-1-activity.md). Circulate and help. Common errors to watch for are listed in the presenter guide. Encourage personalization — it makes them care. Aim to leave 10 min at the end. -->

---

<!-- _class: activity -->

## Activity 1 — checkpoints & stretch

✅ **Done when:** your card shows your photo, name, bio, and 3 info rows, nicely spaced.

🌟 **Stretch goals:**
- Give the card a colored background + rounded corners + shadow (`elevation`)
- Add an emoji "skills" row
- Make the avatar a perfect circle (`borderRadius: 60` on a 120×120 image)

<!-- 🎤 (1:10) For fast finishers, point them at stretch goals so they stay engaged while others catch up. The circle-avatar trick (borderRadius = half the width) is a satisfying win. -->

---

## ✅ Recap — you can now…

- Explain **React Native vs Expo** and the mental model
- Run a **live app on your phone** with hot reload
- Use core JS: **variables, arrays, objects, functions**
- Build UI with **`View`, `Text`, `Image`**
- Style with **`StyleSheet`** + **Flexbox**

That's a real foundation. 👏

<!-- 🎤 (1:20) Quick verbal recall — ask the room "what wraps all text?" (<Text>), "default flex direction?" (column). Active recall cements it. Celebrate how far they came from zero. -->

---

<!-- _class: lead -->

## 🏠 Take-home

Restyle your card & **add one new section**
(skills, hobbies, or a favorite quote).

## ⏭️ Next session

Your card is **frozen**. Next week we make it **react to you** —
buttons, typing, and a **To-Do list** that grows. 🚀

<!-- 🎤 (1:25) Tease Session 2 with a hook: "today's screen can't DO anything yet — next week it responds to taps and typing." Remind them to bring their laptop + phone charged. Thank them. End on time. -->
