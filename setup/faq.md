# ❓ Beginner FAQ — Frequently Asked Questions

Real questions students ask in their first hour, answered in **plain language**. No prior coding knowledge assumed.

> 📚 New here? Start with the [Student Setup Guide](student-setup-guide.md), then a walkthrough: [edit the workshop app](first-app-walkthrough.md) or [build from scratch](from-scratch-walkthrough.md).

Jump to: [Tools & words](#-tools--words) · [Running the app](#-running-the-app--phone) · [Editing code](#-editing-code--vs-code) · [Understanding the code](#-understanding-the-code) · [When things break](#-when-things-break)

---

## 🧰 Tools & words

**What's the difference between `npm` and `npx`?**
`npm` **installs** building blocks (libraries your app needs). `npx` **runs** a tool. In this workshop you use `npm install` once to download stuff, and `npx expo start` every time you want to run your app. Different jobs — that's why you type both.

**What does `git checkout session-1` do?**
`git` keeps different *versions* of the code. `checkout session-1` switches you to **Session 1's version**. If you're already on it, running it again does nothing bad.

**What is Node.js? What is Expo? What is Expo Go?**
- **Node.js** is the engine that runs the workshop's tools on your laptop.
- **Expo** is the toolkit that takes your code and turns it into a real mobile app.
- **Expo Go** is the free app on your *phone* that opens your project. You write code on the laptop → Expo bundles it → Expo Go shows it on your phone.

**What does `cd` mean?**
"**Change directory**" — it moves your terminal *into* a folder. `cd Documents` means "go into the Documents folder." If it says *cannot find path*, that folder isn't there — just skip it.

**What is `App.js`? Do I touch the other files?**
`App.js` is the file that draws what you see on the phone. **Today you only edit `App.js`.** Ignore `index.js`, `app.json`, `package.json`, and the `assets/` folder — they already work.

---

## 📱 Running the app & phone

**Where does the QR code appear?**
In the **terminal panel** — the black area at the bottom of VS Code. Not a separate window or a browser. Scroll up a little if you don't see it.

**The QR code does nothing / my app won't open. Why?**
Almost always Wi-Fi: your **phone and laptop must be on the same Wi-Fi network**, and any VPN must be off. On school/public Wi-Fi, stop the app (`Ctrl+C` in the terminal) and run `npx expo start --tunnel` instead — slower, but it gets through.

**My friend's app opened but mine says "Expo Go can't open this project" / it keeps crashing.**
Your project's **Expo version (SDK)** is probably newer than the **Expo Go** app on your phone. Two fixes: (1) update **Expo Go** from the app store, or (2) if you created the app from scratch, make it with `--template blank@sdk-54` so it matches the workshop. This workshop targets **Expo SDK 54**.

**Do I need to keep the terminal running?**
Yes. While `npx expo start` is running, your phone stays connected and updates live. Closing the terminal or pressing `Ctrl+C` stops the app — just run `npx expo start` again to bring it back.

**How do I stop the app? How do I restart it?**
Click the terminal and press `Ctrl+C` to stop. Type `npx expo start` to start again. If it acts weird, `npx expo start -c` starts fresh (clears the cache).

---

## ✏️ Editing code & VS Code

**How do I save? Does it update by itself?**
Save with `Ctrl+S` (Windows/Linux) or `Cmd+S` (Mac). The moment you save, your phone updates automatically. This live-update is called **hot reload** — it's the magic loop: *edit → save → see it*.

**The guide says "around line X" but my line is a bit different. Is that okay?**
Yes. Line numbers shift as you add code, so "around line X" is just a hint. Match the **code** shown, not the exact number. The line number on the left of VS Code is just a label.

**Do I *replace* the code, or *add* it next to what's there?**
Read carefully — the guides say which:
- "**Replace**" / "change this line to" → edit what's already there, don't duplicate it.
- "**Add**" → type a new line.
A classic beginner bug is ending up with **two** of something (two names, two images) because you added instead of replaced.

**There are green lines starting with `//`. What are those? Can I delete them?**
Those are **comments** — notes for humans that the app ignores. You can leave them or delete them; either way the app runs the same. When a guide says "below the import lines," you can paste below the comments too.

**Where exactly is the backtick key `` ` ``?**
Top-left of most keyboards, above `Tab`, on the same key as `~`. It is **not** the apostrophe `'`. Some code (template literals like `` `Hi, ${name}` ``) needs the backtick specifically — the apostrophe won't work there.

**My quotes look curly (`'` `'`) and cause errors.**
Use **straight** quotes `'` `'`. VS Code types straight ones by default; curly ones usually come from pasting out of a chat app or document. Retype them inside VS Code.

---

## 🧠 Understanding the code

**What is JSX? Why does it look like HTML?**
JSX is the tag-style code inside `App.js` — `<Text>`, `<View>`, `<Image>`. Each tag describes *what to show*: `<Text>` = words, `<View>` = a box that groups things, `<Image>` = a picture.

**What's the deal with curly braces `{ }`?**
Inside JSX, `{ }` means *"run this JavaScript and show the result here."* So `<Text>{name}</Text>` shows the **value** of `name`, while `<Text>name</Text>` literally shows the word "name."

**Why do some lines have DOUBLE braces `{{ }}`? Is it a typo?**
No! Like `source={{ uri: '...' }}`. The **outer** `{ }` is the JSX rule ("run JavaScript here"). The **inner** `{ }` is a JavaScript **object**. So `{{ }}` = "JSX braces holding an object."

**What's a variable vs an object vs a function?**
- **Variable** = one value with a name. `const role = 'Student';`
- **Object** = several related values grouped together. `const profile = { name: 'Ana', city: 'Batangas' };` — reach inside with a dot: `profile.name`.
- **Function** = a reusable recipe: give it input, it gives back a result. `makeGreeting('Ana')` returns `"Hi, Ana!"`.

**Should variables go INSIDE or OUTSIDE the `App()` function?**
Both work, but:
- **Outside** (above `App`) → made **once**, shared. Best for **fixed data that never changes** — like a profile. ✅
- **Inside** → rebuilt every time the screen redraws. Needed for data that **changes while the app runs** (that's "state," coming in Session 2).

For a profile card, the info never changes, so we put it **outside**. (One rule for later: anything using `useState`/`useEffect` *must* go inside.)

**What does `export default function App()` mean?**
`App` is the main function that *is* your app — whatever it `return`s gets drawn on the phone. `export default` just means "this is the main thing this file hands to the rest of the app." You don't need to fully understand it yet; just don't delete it.

**What are `ScrollView` and `<StatusBar />`?**
`ScrollView` is a box you can scroll with your finger. `<StatusBar style="light" />` sets the color of your phone's top bar (clock/battery). They're already set up — **leave them alone**.

**Do I really type the emojis (📍 🎓 👋) into the code?**
Yes — emojis are just characters. Copy them or use your keyboard's emoji picker. They show up exactly as typed.

---

## 🧯 When things break

**A red error screen appeared on my phone. Now what?**
Don't panic — it's normal and fixable. Read the **first line / top** of the error and the **line number** it mentions. Usually it's a small typo: a missing `}`, `)`, `>`, quote, or comma. Fix it, save, and the red screen disappears.

**"Text strings must be rendered within a `<Text>`."**
You have loose words floating in the code. Wrap them: `<Text>your words</Text>`.

**My image won't show up.**
Two common causes: (1) the `avatar` style is missing a `width` and `height`, or (2) the link (URL) is wrong. Also make sure `Image` is listed in the import line at the top.

**`{profile.name}` shows nothing / is blank.**
The spelling must match the object **exactly** — `name`, not `Name`. Capital letters matter.

**I saved but nothing changed on my phone.**
Did you actually save (`Ctrl+S`)? If yes, press `r` in the terminal to reload, or shake the phone and tap **Reload**. Still stuck? Stop with `Ctrl+C` and run `npx expo start -c`.

**My name reverted / I see two of something.**
You probably *added* code where you should have *replaced* it (or your name now lives in the `profile` object — change it there, not in the card). Compare your file against the **finished `App.js`** at the end of your walkthrough guide.

**Everything's broken and I can't tell why.**
Compare your `App.js` line-by-line with the complete finished version at the bottom of your walkthrough guide. 90% of "it's all broken" is one missing bracket or quote. Still stuck? Raise your hand — that's what the instructor is for. 🙌

---

*Didn't find your question? Ask in class, or check the **Stuck?** table inside each walkthrough guide.*
