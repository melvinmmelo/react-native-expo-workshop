# 🧱 Build Your First App From Scratch

This guide is for students who want to **create their own app from an empty template** — instead of cloning the workshop repo. You'll generate a blank Expo app, run it, build a simple profile card with your own hands, and then add **variables, objects, and functions**.

> 📋 **Before you start**, finish the [Student Setup Guide](student-setup-guide.md): Node.js + VS Code on your laptop, **Expo Go** on your phone, both on the **same Wi-Fi**.
>
> 🔁 Already have the workshop repo? Use the other guide instead: [Your First App — A Step-by-Step Walkthrough](first-app-walkthrough.md). This one starts from *nothing*.

Golden loop the whole way through: **edit → save → watch your phone update.** 🎯

---

## Part 1 — Create the project

### 1. Open a terminal

- **Windows:** press `Win`, type **PowerShell**, open it.
- **macOS:** press `Cmd+Space`, type **Terminal**, open it.
- **Linux:** open your **Terminal** app.

Pick where your project will live. `cd` means **change directory** (move into a folder). For example, to put it inside Documents:

```bash
cd Documents
```

> 🆘 See `cannot find path` or `No such file or directory`? You just don't have a `Documents` folder there — **skip this command**. The app will be created wherever your terminal currently is, and that's perfectly fine.

### 2. Create a blank app

```bash
npx create-expo-app@latest my-first-app --template blank@sdk-54
```

- `my-first-app` is your project's folder name — change it if you like.
- `--template blank@sdk-54` gives you the **smallest possible** starting app, on **Expo SDK 54** — the same version the workshop uses, so it matches your Expo Go and the class repo.
- It downloads everything and sets up the project. This takes a minute the first time. ✅

> 💡 **Why pin `@sdk-54`?** Plain `--template blank` always grabs the *newest* SDK, which can be newer than the **Expo Go** app on your phone — the usual cause of *"Expo Go won't open my project."* Matching SDK 54 avoids that.
> 💡 If it asks to install `create-expo-app`, say **yes** (`y`). If it *doesn't* ask, that's fine too — it's already cached.

---

## Part 2 — Open it in VS Code and run it

### 3. Open the folder in VS Code

Open **VS Code**, then **File → Open Folder…** and choose the **`my-first-app`** folder you just created.

> ⚠️ Open the *folder*, not a single file. An app is a whole folder of files working together. On the left, the **Explorer** shows them all. You'll spot `index.js`, `app.json`, `package.json`, and an `assets/` folder — **today you only ever edit `App.js`**. Ignore the rest.

### 4. Open the built-in terminal

In VS Code: **Terminal → New Terminal** (or press `` Ctrl+` ``). A panel opens at the bottom — this is where you run commands, already pointed at your project.

### 5. Start the app

```bash
npx expo start
```

A **QR code** appears **in the terminal panel** (the black area at the bottom of VS Code — not a separate window). 🟦

### 6. Scan it with your phone

Phone and laptop on the **same Wi-Fi**, then:

- **Android:** **Expo Go → "Scan QR code"** → point at the screen.
- **iPhone:** open the **Camera** app → point at the QR → tap **"Open in Expo Go."**

Your phone shows a blank screen with the words **"Open up App.js to start working on your app!"** That sentence is literally telling you what to do next. 😄

> 🆘 QR does nothing? Same Wi-Fi, VPN off. On campus Wi-Fi, stop with `Ctrl+C` and run `npx expo start --tunnel`.

---

## Part 3 — Understand the blank `App.js`

In the Explorer, click **`App.js`**. The blank template looks like this:

```jsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Read it like a sentence:

- **`import …`** — grab the building blocks we need (`Text` shows words, `View` is a box).
- **`export default function App()`** — this function *is* your app. Whatever it `return`s gets drawn on the phone.
- **`return ( … )`** — the tags inside describe **what to show**. This tag-style code is called **JSX**.
- **`const styles = StyleSheet.create({ … })`** — the "CSS" for your app: colors, sizes, spacing.

> 🔁 Keep the app open on your phone. Every **save** (`Ctrl+S` / `Cmd+S`) hot-reloads it instantly.

---

## Part 4 — Build a profile card piece by piece

We'll replace the blank screen with a small profile card. Do each step, **save**, and watch your phone.

### 7. Change the words

Replace the `<Text>` line:

```jsx
<Text>Hi, I'm learning to build apps! 🎉</Text>
```

Save → your phone updates. You just programmed. ✅

### 8. Add more `<Text>` and an `<Image>`

First, add `Image` to the import line so we can use it:

```jsx
import { Image, StyleSheet, Text, View } from 'react-native';
```

Now **replace your whole `<View>…</View>` block** (the one holding the single `<Text>` line from Step 7) with this:

```jsx
<View style={styles.container}>
  <Image
    style={styles.avatar}
    source={{ uri: 'https://i.pravatar.cc/300?img=12' }}
  />
  <Text style={styles.name}>Juan dela Cruz</Text>
  <Text style={styles.role}>Future Mobile Developer</Text>
  <StatusBar style="auto" />
</View>
```

Save. The image won't look right yet — it has no size, so it may disappear and the text looks tiny. **That's expected** — we fix it in the very next step. (Don't panic and start deleting things!)

### 9. Style it

Replace the whole `styles` block at the bottom with this:

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,                       // fill the whole screen
    backgroundColor: '#EEF2FF',
    alignItems: 'center',          // center left-to-right
    justifyContent: 'center',      // center top-to-bottom
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,              // half the size = a circle
    borderWidth: 4,
    borderColor: '#06B6D4',
    marginBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  role: {
    fontSize: 16,
    fontWeight: '600',
    color: '#06B6D4',
  },
});
```

Save. You now have a round photo, a bold name, and a colored role — built **by you**, from an empty app. 🏆

---

## Part 5 — Variables, objects, and functions

Right now the name, photo, and role are **hard-coded** — typed straight into the tags. Real apps store their info in **variables** so it's easy to find and reuse. Let's learn the three core ideas.

> 🔑 **The one rule to remember:** inside JSX, curly braces `{ }` mean *"run this JavaScript and drop the result here."*
> So `<Text>{name}</Text>` shows the **value** of `name`; `<Text>name</Text>` just shows the word "name".

> 🧩 **Why does the image have *double* braces `{{ }}`** (`source={{ uri: ... }}`)? The **outer** `{ }` is the JSX rule above. The **inner** `{ }` is a JavaScript *object*. So `{{ }}` means "JSX braces holding an object" — **not a typo**.

### 🧭 First: where do variables go — inside or outside the function?

You can declare a variable in **two** places, and the difference matters:

| Where | What happens | Use it for |
|---|---|---|
| **Outside** `App()` | Created **once** when the file loads. Shared, never rebuilt. | **Fixed data that never changes** — like a profile. ✅ |
| **Inside** `App()` | Rebuilt **every time the screen redraws**. | Values that change while the app runs — **state** (Session 2). |

React **calls your `App()` function again every time the screen updates**. Since a profile card's data never changes, we put it **outside** the function — it's made once and shared. That's the correct, clean choice here.

> ⚠️ One rule for later: anything using a React *hook* (`useState`, `useEffect` — Session 2) **must** go **inside** the component. Plain data and helper functions can live outside.

### 10. ① A variable — one value under a name

At the **top** of `App.js`, just below the two `import` lines (outside `App`), add:

```jsx
const role = 'Future Mobile Developer';
```

Use it in the card:

```jsx
<Text style={styles.role}>{role}</Text>
```

Save. Looks the same — but the role now lives in **one place** you control.

### 11. ② An object — group related values together

A person has many facts. An **object** bundles them under one name with `key: value` pairs. Under your `role` line, add (put **your real name** as the `name` value):

```jsx
const profile = {
  name: 'Your Name Here',
  photo: 'https://i.pravatar.cc/300?img=12',
};
```

Reach inside with a **dot**: `profile.name`, `profile.photo`. Now wire the card to read **from** the object — **edit the lines you already typed** in Step 8 (don't add new ones, or you'll see the photo/name twice):

- In the `<Image>`, change the `source` line to `source={{ uri: profile.photo }}`.
- Change the name line to `<Text style={styles.name}>{profile.name}</Text>`.

So that part of the card now reads:

```jsx
<Image
  style={styles.avatar}
  source={{ uri: profile.photo }}
/>
<Text style={styles.name}>{profile.name}</Text>
<Text style={styles.role}>{role}</Text>
```

Save. Change `profile.name` once and it updates everywhere it's used. 💪

### 12. ③ A function — a recipe that returns a result

A **function** takes input and gives back a result. Under your `profile` object (still outside `App`), add:

```jsx
function makeGreeting(name) {
  return `👋 Hi, I'm ${name}!`;
}
```

- `makeGreeting` is the name; `(name)` is the **input**; `return` hands back the result.
- The backticks `` ` `` with `${ }` let you drop a variable inside text (a *template literal*).

> ⌨️ **Find the backtick key.** It's `` ` `` — top-left of most keyboards, above `Tab`, sharing a key with `~`. It is **not** the apostrophe `'`. Using `'` here breaks the `${name}` trick.

Now **call** it — add **one new line** (the `greeting` one) just below the role line:

```jsx
<Text style={styles.name}>{profile.name}</Text>
<Text style={styles.role}>{role}</Text>
<Text style={styles.greeting}>{makeGreeting(profile.name)}</Text>
```

And add a style for it inside `StyleSheet.create({ … })`:

```jsx
greeting: {
  fontSize: 15,
  color: '#475569',
  marginTop: 10,
},
```

Save. A greeting now appears, **built from your name automatically**. Change `profile.name` and both the name *and* the greeting change. 🔁

---

## Part 6 — Run it again & confirm

Hot reload has been updating your phone the whole time. To prove everything is wired up:

1. Change `profile.name` to a friend's name. **Save.** → The name *and* greeting both change.
2. Change `role` to `'Future Game Developer 🎮'`. **Save.** → The role line updates.

If both work, you built an app from scratch **and** used variables, objects, and functions. 🎉

> 🔄 Stop the app with `Ctrl+C`; start it again with `npx expo start`. Weird glitch? `npx expo start -c` clears the cache.

### ✅ What your finished `App.js` should look like

```jsx
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';

// Declared OUTSIDE App() — fixed data, made once, shared.
const role = 'Future Mobile Developer';

const profile = {
  name: 'Your Name Here',
  photo: 'https://i.pravatar.cc/300?img=12',
};

function makeGreeting(name) {
  return `👋 Hi, I'm ${name}!`;
}

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: profile.photo }}
      />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.greeting}>{makeGreeting(profile.name)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#06B6D4',
    marginBottom: 12,
  },
  name: { fontSize: 26, fontWeight: 'bold', color: '#0F172A' },
  role: { fontSize: 16, fontWeight: '600', color: '#06B6D4' },
  greeting: { fontSize: 15, color: '#475569', marginTop: 10 },
});
```

---

## 😵 Stuck? Quick fixes

| Problem | Try this |
|---|---|
| 🔴 "Text strings must be rendered within a `<Text>`" | Loose words must be wrapped: `<Text>...</Text>` |
| Image doesn't show | Make sure the `avatar` style has `width` **and** `height`, and `Image` is in the import line. |
| Red error screen | Read the **line number** at the top. Look for a missing `}`, `)`, `>`, quote, or comma. |
| `{profile.name}` shows nothing | The key must match exactly — `name`, not `Name`. |
| Nothing updates on save | Did you save? Else press `r` in the terminal, or shake the phone → **Reload**. |
| Smart/curly quotes error | Use straight quotes `' '`, not `' '`. VS Code uses straight ones by default. |

---

## 🎓 What you just learned

- **Create** a brand-new app with `create-expo-app --template blank`.
- **Run** it on your phone with `npx expo start` + Expo Go.
- **Build** UI from `View`, `Text`, `Image`, and style it with `StyleSheet`.
- **Variable / object / function** — store one value, group related values, and build results from input.
- **Where variables live:** fixed data goes **outside** the component (made once); changing data goes **inside** (Session 2's state).
- The golden JSX rule: `{ }` runs JavaScript and shows its result.

Next: try the [Session 1 Activity](../activities/session-1-activity.md) and make the card fully yours. 🚀
