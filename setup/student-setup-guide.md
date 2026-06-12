# 🛠️ Student Setup Guide — do this BEFORE Session 1

You'll work on **two devices at once**:

- 💻 a **laptop**, where you *write* the code, and
- 📱 a **phone**, where the app *runs* (through the free **Expo Go** app).

They talk to each other over **Wi-Fi**. Set everything up below — it takes ~15–20 minutes once. If you get stuck, jump to [Troubleshooting](#-troubleshooting) or ask the instructor.

> ✅ **Goal of this guide:** see the words *"Open up App.js to start working on your app!"* on your phone.

---

## Part A — Laptop setup

### 1. Install Node.js (this gives you the tools we run)

1. Go to **<https://nodejs.org>**.
2. Download the **LTS** version (the big green button on the left).
3. Run the installer — keep clicking **Next / Continue** with the default options.
4. **Verify it worked.** Open a terminal:
   - **Windows:** press `Win`, type **PowerShell**, open it.
   - **macOS:** press `Cmd+Space`, type **Terminal**, open it.
   - **Linux:** open your **Terminal** app.

   Type these two commands (press Enter after each):
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers like `v22.x.x` and `10.x.x`. **Numbers = success.** ✅
   (If you instead see *"command not found"*, close the terminal, reopen it, and try again. Still failing? Reinstall Node and restart your laptop.)

### 2. Install a code editor

Download **Visual Studio Code**: **<https://code.visualstudio.com>**. Install with defaults. This is where you'll write your app.

> 💡 Optional but nice: inside VS Code, open the Extensions panel (the four-squares icon) and install **"React Native Tools"** and **"Prettier"**.

---

## Part B — Phone setup

### 3. Install Expo Go

Install the **Expo Go** app:

- **Android:** [Google Play → "Expo Go"](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iPhone:** [App Store → "Expo Go"](https://apps.apple.com/app/expo-go/id982107779)

Open it once. You can skip / dismiss the sign-in — an account is **not** required for this workshop.

---

## Part C — Run the workshop app

You have two options. **Option 1** (clone the repo) is what we'll use in class.

### Option 1 — Clone the workshop repository

In your terminal:

```bash
# Download the code
git clone https://github.com/melvinmmelo/react-native-expo-workshop.git

# Go into it
cd react-native-expo-workshop

# Switch to Session 1's app
git checkout session-1

# Install the app's building blocks (takes a minute the first time)
npm install

# Start it!
npx expo start
```

> Don't have **git**? Install it from <https://git-scm.com/downloads>, or just download the repo as a ZIP from GitHub (green **Code** button → **Download ZIP**), unzip it, and `cd` into the folder.

### Option 2 — Create a brand-new app from scratch

```bash
npx create-expo-app@latest my-first-app --template blank
cd my-first-app
npx expo start
```

### Scan the QR code

When `npx expo start` runs, a **QR code** appears in your terminal. Make sure your **phone and laptop are on the same Wi-Fi**, then:

- **Android:** open **Expo Go → "Scan QR code"** → point at the terminal.
- **iPhone:** open the built-in **Camera** app → point at the QR → tap the yellow **"Open in Expo Go"** banner.

The app loads on your phone in a few seconds. 🎉

> 🔁 **Hot reload:** keep the app open. Change a word in `App.js`, save the file, and watch your phone update instantly. This is the magic loop we'll use all workshop.

---

## 🆘 Troubleshooting

| Problem | Fix |
|---|---|
| QR scan does nothing / app won't connect | Phone and laptop **must be on the same Wi-Fi**. Disable VPNs. |
| Campus / public Wi-Fi blocks the connection | Run `npx expo start --tunnel` (slower, but works across networks). First run may install one extra package — say yes. |
| `'node' is not recognized` / `command not found: node` | Node isn't installed or the terminal was open before installing. Reinstall Node, then **restart the terminal** (or the laptop). |
| `'npx' is not recognized` | Same as above — npx ships with Node. Reinstall Node LTS. |
| Stuck on a white screen or weird error on the phone | In the terminal press `r` to reload. Still stuck? Press `Ctrl+C`, then run `npx expo start -c` (clears the cache). |
| `npm install` fails | Check your internet, then delete the `node_modules` folder and run `npm install` again. |
| "Expo Go keeps crashing" | Update Expo Go from the app store; this workshop targets **Expo SDK 54**. |
| Totally blocked in class | Use the web fallback: open **<https://snack.expo.dev>** in your browser and code there — no install needed. |

---

## ✅ Pre-Session-1 checklist

- [ ] `node --version` shows a number
- [ ] `npm --version` shows a number
- [ ] VS Code is installed
- [ ] **Expo Go** is installed on my phone
- [ ] My phone and laptop are on the **same Wi-Fi**
- [ ] I ran an app and saw it on my phone (Option 1 or 2 above)

If all six are checked, **you're ready.** See you in Session 1! 🚀
