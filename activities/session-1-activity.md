# 🧪 Activity 1 — Build Your "About Me" Card

**Time:** ~25 minutes · **File you edit:** `App.js` · **Goal:** a profile card that's all about *you*, running on your phone.

You'll practice everything from today: **components, `View` / `Text` / `Image`, `StyleSheet`,** and **Flexbox**.

---

## 🏁 Before you start

Make sure your app is running:

```bash
git checkout session-1
npm install
npx expo start
```

Scan the QR with **Expo Go**. You should see a profile card. Now let's make it yours — open `App.js` in VS Code.

> 💡 Keep the app open on your phone. Every time you **save**, it updates. Make one small change at a time.

---

## Step-by-step

### 1️⃣ Make it your name

Find the `<Text style={styles.name}>` line and change it to **your name**. Save. See it change on your phone. 🎉

```jsx
<Text style={styles.name}>Your Name Here</Text>
<Text style={styles.role}>Future Mobile Developer</Text>
```

### 2️⃣ Use your own photo

Swap the image URL, or use a fun avatar:

```jsx
<Image
  style={styles.avatar}
  source={{ uri: 'https://i.pravatar.cc/300?img=5' }}  // try numbers 1–70
/>
```

> Want a local photo? Drop `me.jpg` into the `assets/` folder and use
> `source={require('./assets/me.jpg')}` (no `width`/`height` needed for local files, but keep the avatar style).

### 3️⃣ Write your bio

Change the text inside the bio box to a sentence or two about you:

```jsx
<View style={styles.bioBox}>
  <Text style={styles.bioText}>
    Write something about yourself here. What do you like? Why are you here?
  </Text>
</View>
```

### 4️⃣ Fill in your three info rows

Each row uses `flexDirection: 'row'` to put the label and value **side by side**:

```jsx
<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>📍 Location</Text>
  <Text style={styles.infoValue}>Your City</Text>
</View>
```

Update all three rows (📍 Location, 🎓 School, 💡 Learning) with your real info.

---

## ✅ Checkpoints — you're done when…

- [ ] The card shows **your** photo, name, and role
- [ ] Your **bio** is in the rounded box
- [ ] **Three info rows** show, each with a label on the left and value on the right
- [ ] Everything is **centered** and nicely spaced (no text crammed in a corner)

---

## 🌟 Stretch goals (if you finish early)

1. **Change the theme color.** Edit `screen.backgroundColor` and `avatar.borderColor` to your favorite color.
2. **Perfect circle avatar.** It's already circular — try changing the size to `100` and fix `borderRadius` to `50`. What's the rule? *(half the size!)*
3. **Add a "Skills" row** of emojis: ⚛️ 📱 🎨 — a new `<View>` + `<Text>`.
4. **Add a shadow.** The card already has `elevation: 6` (Android). Try changing it to `12`.
5. **Add a second card** below the first (hint: copy the `<View style={styles.card}>` block — `ScrollView` lets you scroll).

---

## 😵 Stuck? Quick fixes

| Problem | Try this |
|---|---|
| 🔴 "Text strings must be rendered within a `<Text>`" | You have loose text — wrap it in `<Text>...</Text>` |
| Image won't show | Check the URL; make sure the `avatar` style has width & height |
| Red error screen | Read the **line number** at the top, look for a missing `}`, `>`, or quote |
| Nothing updates | Press `r` in the terminal, or shake the phone → **Reload** |

---

## 🏠 Take-home

Restyle your card and **add one brand-new section** — your hobbies, your favorite quote, or a row of skill emojis. Bring it next week.

**Next session:** we make this screen *come alive* — buttons, typing, and a To-Do list that grows. 🚀
