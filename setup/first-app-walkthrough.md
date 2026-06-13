# 🚀 Your First App — A Step-by-Step Walkthrough

This guide takes you from **opening VS Code** to **editing real code** and understanding your first three programming ideas: **variables, objects, and functions**.

> 📋 **Before you start**, finish the [Student Setup Guide](student-setup-guide.md): Node.js + VS Code on your laptop, **Expo Go** on your phone, both on the **same Wi-Fi**.

We'll go slowly. Make **one change at a time**, save, and watch your phone update. That loop — *edit → save → see it* — is the whole game. 🎯

---

## Part 1 — Open the project in VS Code

### 1. Open VS Code

- **Windows:** press `Win`, type **Visual Studio Code**, press Enter.
- **macOS:** press `Cmd+Space`, type **Visual Studio Code**, press Enter.
- **Linux:** open it from your apps menu (or type `code` in a terminal).

### 2. Open the app folder

In VS Code: **File → Open Folder…** and pick the `react-native-expo-workshop` folder you downloaded in setup.

> 💡 *"Open Folder", not "Open File."* An app is a whole folder of files working together. On the left you'll now see the **Explorer** — the list of files in the project.

### 3. Open the built-in terminal

This is where you'll type commands. In VS Code: **Terminal → New Terminal** (or press `` Ctrl+` `` — the backtick key, top-left of most keyboards).

A panel opens at the bottom. Check you're in the right place:

```bash
git checkout session-1
npm install
```

`npm install` downloads the app's building blocks. It can take a minute the first time — that's normal. ✅

---

## Part 2 — Create / run the app

> You already have the workshop app from setup, so we'll **run it**. (Want to make a *brand-new* app from zero instead? See [Appendix A](#appendix-a--create-a-brand-new-app-from-scratch).)

### 4. Start it

In the same terminal:

```bash
npx expo start
```

A **QR code** appears in the terminal. 🟦

### 5. Scan it with your phone

Make sure your **phone and laptop are on the same Wi-Fi**, then:

- **Android:** open **Expo Go → "Scan QR code"** → point at the screen.
- **iPhone:** open the built-in **Camera** app → point at the QR → tap the **"Open in Expo Go"** banner.

In a few seconds, a **profile card** loads on your phone. You're running a real app. 🎉

> 🆘 QR does nothing? Same Wi-Fi, VPN off. On campus Wi-Fi, stop it (`Ctrl+C`) and run `npx expo start --tunnel`.

---

## Part 3 — Edit `App.js`

### 6. Open the file

In the Explorer (left side), click **`App.js`**. This is the file that draws everything you see on your phone.

> 🔁 **Keep the app open on your phone.** Every time you **save** (`Ctrl+S` / `Cmd+S`), the phone updates instantly. This is called *hot reload*.

### 7. Make your first change

Find this line (around line 19):

```jsx
<Text style={styles.name}>Juan dela Cruz</Text>
```

Change the name to **yours**:

```jsx
<Text style={styles.name}>Your Name Here</Text>
```

**Save the file.** Look at your phone — the name changed! 🎉 That's the loop. You just programmed.

> 🧩 **What is `App.js` made of?** Tags like `<Text>`, `<View>`, and `<Image>` describe *what to show*. `<Text>` shows words, `<View>` is a box that groups things, `<Image>` shows a picture. This tag-style code is called **JSX**.

---

## Part 4 — Variables, objects, and functions

So far the name is **hard-coded** — typed directly between the tags. Real apps keep their information in **variables** so it's easy to find and reuse. Let's learn the three core ideas by upgrading the card. Do these in order; save and check your phone after each one.

> 🔑 **The one rule to remember:** inside JSX, curly braces `{ }` mean *"run this JavaScript and drop the result right here."*
> So `<Text>{name}</Text>` shows the **value** of `name`, while `<Text>name</Text>` just shows the word "name".

### 8. ① A variable — store one thing under a name

At the very **top** of `App.js`, just under the two `import` lines, add:

```jsx
const role = 'Future Mobile Developer';
```

- `const` means "make a constant — a named value."
- `role` is the name **you** chose.
- The text in quotes is the value.

Now find the role line in the card and use the variable instead of the hard-coded text:

```jsx
<Text style={styles.role}>{role}</Text>
```

Save. The card looks the same — but now the role lives in **one place** you control. ✅

### 9. ② An object — group related things together

One person has *many* facts: name, photo, location, school… An **object** bundles related variables under one name, using `key: value` pairs.

Under your `role` variable, add:

```jsx
const profile = {
  name: 'Juan dela Cruz',
  photo: 'https://i.pravatar.cc/300?img=12',
  location: 'Batangas City, PH',
  school: 'University of Batangas',
  learning: 'React Native + Expo',
};
```

Read it out loud: *"profile has a name, a photo, a location…"* You reach inside an object with a **dot**: `profile.name`, `profile.location`.

Now wire the card to the object. Replace the hard-coded values with `{profile.something}`:

```jsx
<Image style={styles.avatar} source={{ uri: profile.photo }} />

<Text style={styles.name}>{profile.name}</Text>
<Text style={styles.role}>{role}</Text>
```

…and the three info rows:

```jsx
<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>📍 Location</Text>
  <Text style={styles.infoValue}>{profile.location}</Text>
</View>
<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>🎓 School</Text>
  <Text style={styles.infoValue}>{profile.school}</Text>
</View>
<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>💡 Learning</Text>
  <Text style={styles.infoValue}>{profile.learning}</Text>
</View>
```

Save. Same card — but now **all your info lives in the `profile` object**. Change `profile.name` once and it updates everywhere it's used. That's the power of variables + objects. 💪

### 10. ③ A function — code that *does* something and gives back a result

A **function** is a reusable recipe: you give it input, it gives back a result. Let's write one that builds the bio sentence from a name.

Under your `profile` object, add:

```jsx
function makeBio(name) {
  return `👋 Hi! I'm ${name}, and this whole screen is my very first app — made on my own phone!`;
}
```

- `makeBio` is the function's name.
- `(name)` is the **input** (called a *parameter*).
- `return` hands back the result.
- The backticks `` ` `` let you drop a variable inside text with `${ }` — that's a *template literal*.

Now **call** the function inside the bio box (calling = running it with real input):

```jsx
<View style={styles.bioBox}>
  <Text style={styles.bioText}>{makeBio(profile.name)}</Text>
</View>
```

Save. The bio now greets you **by name**, built automatically. Change `profile.name` and the bio changes too — because the function reads from it. 🔁

---

## Part 5 — Run it again & confirm

You never *stopped* the app — hot reload has been updating your phone the whole time. To prove it's all wired up:

1. Change `profile.name` to a friend's name. **Save.** → The name, *and* the bio, both change.
2. Change `profile.learning` to `'Cooking 🍳'`. **Save.** → The "Learning" row updates.

If both work, you've used variables, objects, **and** functions together. 🏆

> 🔄 **Restarting from scratch later?** In the terminal press `Ctrl+C` to stop, then `npx expo start` to start again. Weird glitch? `npx expo start -c` clears the cache.

### ✅ What the top of your `App.js` should look like now

```jsx
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// ① variable
const role = 'Future Mobile Developer';

// ② object
const profile = {
  name: 'Juan dela Cruz',
  photo: 'https://i.pravatar.cc/300?img=12',
  location: 'Batangas City, PH',
  school: 'University of Batangas',
  learning: 'React Native + Expo',
};

// ③ function
function makeBio(name) {
  return `👋 Hi! I'm ${name}, and this whole screen is my very first app — made on my own phone!`;
}

export default function App() {
  // …the card, using {profile.name}, {role}, {makeBio(profile.name)}, etc.
}
```

---

## 😵 Stuck? Quick fixes

| Problem | Try this |
|---|---|
| 🔴 "Text strings must be rendered within a `<Text>`" | Loose words must be wrapped: `<Text>...</Text>` |
| Red error screen on the phone | Read the **line number** at the top. Look for a missing `}`, `)`, `>`, quote, or comma. |
| `{profile.name}` shows nothing | Check the spelling matches a key in the object exactly (`name`, not `Name`). |
| Nothing updates when I save | Did you save (`Ctrl+S`)? Else press `r` in the terminal, or shake the phone → **Reload**. |
| Quotes look wrong / curly | Use straight quotes `' '`, not smart quotes `' '`. VS Code uses straight ones by default. |

---

## 🎓 What you just learned

- **Open** a project as a *folder* in VS Code and use its terminal.
- **Run** an app on your real phone with `npx expo start` + Expo Go.
- **Edit** JSX and watch it hot-reload.
- **Variable** — store one value under a name (`const role = …`).
- **Object** — group related values with `key: value` (`profile.name`).
- **Function** — a reusable recipe that takes input and `return`s a result (`makeBio(...)`).
- The golden JSX rule: `{ }` runs JavaScript and shows its result.

Next up: the [Session 1 Activity](../activities/session-1-activity.md) — make the card fully *yours*. 🚀

---

## Appendix A — Create a brand-new app from scratch

Want to start with an empty app instead of the workshop one? In a terminal:

```bash
npx create-expo-app@latest my-first-app --template blank
cd my-first-app
npx expo start
```

This makes a fresh folder `my-first-app` with its own `App.js` that just says *"Open up App.js to start working on your app!"* — then follow **Part 3** onward to edit it.
