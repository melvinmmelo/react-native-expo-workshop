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

A panel opens at the bottom — it's already pointed at your project. Type each command and press Enter:

```bash
git checkout session-1
npm install
```

- `git checkout session-1` switches to **Session 1's version** of the code. You may already be on it from setup — running it again is harmless.
- `npm install` downloads the app's building blocks. You ran this in setup too; running it again just confirms nothing is missing. It can take a minute the first time — that's normal. ✅

---

## Part 2 — Create / run the app

> You already have the workshop app from setup, so we'll **run it**. (Want to make a *brand-new* app from zero instead? See [Appendix A](#appendix-a--create-a-brand-new-app-from-scratch).)

### 4. Start it

In the same terminal:

```bash
npx expo start
```

A **QR code** appears **in the terminal panel** (the black area at the bottom of VS Code — not a separate window). 🟦

> 💡 `npm` *installs* building blocks; `npx` *runs* a tool (here, Expo). Different jobs — that's why you use both.

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
>
> 👀 Near the top you'll also see `<ScrollView>` (a `View` you can scroll) and `<StatusBar style="light" />` (sets the color of the phone's clock/battery bar). **Leave those two alone** — they already work.

---

## Part 4 — Variables, objects, and functions

So far the name is **hard-coded** — typed directly between the tags. Real apps keep their information in **variables** so it's easy to find and reuse. Let's learn the three core ideas by upgrading the card. Do these in order; save and check your phone after each one.

> 🔑 **The one rule to remember:** inside JSX, curly braces `{ }` mean *"run this JavaScript and drop the result right here."*
> So `<Text>{name}</Text>` shows the **value** of `name`, while `<Text>name</Text>` just shows the word "name".

> 🧩 **Why do some lines have *double* braces `{{ }}`** (like `source={{ uri: ... }}`)? The **outer** `{ }` is the JSX rule above ("run JavaScript here"). The **inner** `{ }` is a JavaScript *object*. So `{{ }}` just means "JSX braces holding an object." **Not a typo!**

### 8. ① A variable — store one thing under a name

At the very **top** of `App.js`, **below** the two `import` lines (and below the green `// SESSION 1 …` comment lines — green text is just notes, ignore it), add:

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

Under your `role` variable, add (put **your real name** as the `name` value):

```jsx
const profile = {
  name: 'Your Name Here',
  photo: 'https://i.pravatar.cc/300?img=12',
  location: 'Batangas City, PH',
  school: 'University of Batangas',
  learning: 'React Native + Expo',
};
```

Read it out loud: *"profile has a name, a photo, a location…"* You reach inside an object with a **dot**: `profile.name`, `profile.location`.

> ⚠️ **Your name moves house.** In Step 7 you typed your name straight into the card. From now on your name lives **here**, in `profile.name`. So change it in the object — not in the card. (In the next step the card will read *from* the object, which is why the name has to be correct here.)

Now wire the card to read **from** the object. Make these three edits:

**a) The photo.** Find this 4-line block in the card…

```jsx
<Image
  style={styles.avatar}
  source={{ uri: 'https://i.pravatar.cc/300?img=12' }}
/>
```

…and change only the `source` line so the link comes from the object:

```jsx
<Image
  style={styles.avatar}
  source={{ uri: profile.photo }}
/>
```

**b) The name.** Change the name line (the one you edited in Step 7) to:

```jsx
<Text style={styles.name}>{profile.name}</Text>
```

**c) The three info rows.** In each row, replace **only the value text on the right** — keep the labels and all the tags exactly as they are:

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

Now find the bio box. Right now it holds a hard-coded sentence spread over two lines:

```jsx
<View style={styles.bioBox}>
  <Text style={styles.bioText}>
    👋 Hi! I'm learning to build mobile apps with React Native & Expo.
    This entire screen is my very first app — made on my own phone!
  </Text>
</View>
```

**Delete that sentence** and **call** the function in its place (calling = running it with real input):

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

### ✅ The finished `App.js` — check yours against this

Everything above the `styles` block should now look like this. (The big `StyleSheet.create({ … })` block at the bottom of the file stays **exactly as it came** — you don't change it.)

```jsx
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// ① variable
const role = 'Future Mobile Developer';

// ② object
const profile = {
  name: 'Your Name Here',
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
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <Image
          style={styles.avatar}
          source={{ uri: profile.photo }}
        />

        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>{role}</Text>

        <View style={styles.bioBox}>
          <Text style={styles.bioText}>{makeBio(profile.name)}</Text>
        </View>

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
      </View>
    </ScrollView>
  );
}

// …the StyleSheet.create({ … }) block stays here, unchanged.
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

## Appendix A — Prefer to build from an empty app?

If you'd rather create your own app from zero (instead of the workshop repo) and build the card by hand, **don't follow Part 3 here** — Parts 3–5 assume the workshop's profile-card `App.js`, which a blank app doesn't have. Use the dedicated guide instead:

👉 **[Build Your First App From Scratch](from-scratch-walkthrough.md)** — walks you through `create-expo-app`, then building the card and the same variables / objects / functions from an empty file.
