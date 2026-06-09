# 📱 Mobile App Development with React Native & Expo

### A 3-session, hands-on workshop that takes complete beginners from "never coded" to "I shipped a real app on my phone."

![Expo SDK](https://img.shields.io/badge/Expo-SDK%2056-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.85-61DAFB?logo=react&logoColor=black)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Level](https://img.shields.io/badge/Level-Absolute%20Beginner-22C55E)
![License](https://img.shields.io/badge/License-MIT-blue)

> You write JavaScript on your laptop → **Expo** bundles it → it runs live on **your own phone** through the **Expo Go** app. No Android Studio, no Xcode, no app-store accounts. Just a phone, a laptop, and Wi-Fi.

---

## 👥 Who this is for

Students who have **never written code before**. We teach the small slice of JavaScript you need along the way. By the end you will have built and *run on your phone* a data-saving app with a real database.

### What you need (per student)
| Device | Requirement |
|---|---|
| 💻 Laptop | Windows / macOS / Linux with [Node.js LTS](https://nodejs.org) + a code editor ([VS Code](https://code.visualstudio.com)) |
| 📱 Phone | Android or iPhone with the free **Expo Go** app installed |
| 📶 Network | Laptop and phone on the **same Wi-Fi** |

👉 **Do the [Student Setup Guide](setup/student-setup-guide.md) *before* Session 1** (or arrive 20 min early).

---

## 🎯 What you'll build

The whole workshop is **one app that grows each session**, so every new idea has a reason to exist:

| Session | You build | New superpowers |
|---|---|---|
| **1 — Hello, Mobile World** | An **"About Me" profile card** | Components, JSX, core UI (`View`/`Text`/`Image`), Flexbox styling |
| **2 — Make It Interactive** | A **To-Do checklist** (lives in memory) | State (`useState`), buttons & text input, rendering lists (`FlatList`) |
| **3 — Save It For Real** | The To-Do app **upgraded with a real SQLite database** | Persistence, full **CRUD**, a pop-up edit screen, polish |

Then you take it further in a **[Final Project](final-project/BRIEF.md)** of your choice.

---

## 🧠 Learning outcomes

By the end, you can:

- Explain what React Native & Expo are and how a mobile app is structured.
- Read & write basic JavaScript: variables, functions, arrays, objects.
- Build screens from **components** and style them with **Flexbox**.
- Store changing data in **state** and respond to user input.
- Render dynamic **lists** from data.
- Persist data with an on-device **SQLite** database — full **C**reate / **R**ead / **U**pdate / **D**elete.
- Run your app on a physical device and demo it.

---

## 🗂️ Repository structure (this `main` branch)

```
.
├── README.md                  ← you are here (the curriculum hub)
├── setup/
│   └── student-setup-guide.md ← install Node, Expo Go, run your first app
├── slides/                    ← Marp slide sources (Markdown)
│   ├── session-1.md
│   ├── session-2.md
│   └── session-3.md
├── presenter-notes/           ← detailed run-of-show for the instructor
│   ├── session-1.md
│   ├── session-2.md
│   └── session-3.md
├── activities/                ← student worksheets (one per session)
│   ├── session-1-activity.md
│   ├── session-2-activity.md
│   └── session-3-activity.md
├── final-project/
│   └── BRIEF.md               ← project options, requirements, rubric, timeline
├── theme/                     ← Marp slide & document themes
├── build-pdfs.sh              ← regenerate every PDF (needs Node + Chrome)
└── pdf/                       ← ✅ pre-built PDFs (slides, presenter decks, handouts)
```

> 📄 **Want the PDFs right now?** They're committed in [`pdf/`](pdf/) — slides, presenter editions (with speaker notes), and printable handouts.

---

## 🌿 How the branches work (important!)

`main` holds the **teaching materials**. Each **session branch holds the runnable app** at the end of that session. The branches are *linear* — `session-2` is `session-1` plus Session 2's work, and so on — so you can `git diff` two branches to see exactly what changed.

| Branch | App state | Run it? |
|---|---|---|
| `main` | Curriculum & PDFs only — **no app** | ❌ |
| `session-1` | Static **profile card** | ✅ |
| `session-2` | Interactive **To-Do** (in memory) | ✅ |
| `session-3` | **SQLite CRUD** task app (final taught state) | ✅ |

---

## 🚀 Quick start (students)

```bash
# 1. Get the code
git clone https://github.com/melvinmmelo/react-native-expo-workshop.git
cd react-native-expo-workshop

# 2. Switch to the session you want (start with session-1)
git checkout session-1

# 3. Install dependencies (one-time per branch)
npm install

# 4. Start the dev server, then scan the QR code with Expo Go
npx expo start
```

- **Android:** open **Expo Go → Scan QR code**.
- **iPhone:** open the **Camera** app, point at the QR, tap the banner.
- Phone + laptop must be on the **same Wi-Fi**. On locked-down networks use `npx expo start --tunnel`.

> ⚠️ On `main` there's nothing to run — check out a `session-*` branch first.

---

## 🎤 For the instructor — building the PDFs

Pre-built PDFs are already committed in `pdf/`. To regenerate after editing the Markdown:

```bash
./build-pdfs.sh
```

It uses [Marp CLI](https://github.com/marp-team/marp-cli) (downloaded on demand via `npx`) + your local Google Chrome to produce, for each session:

- `session-N-slides.pdf` — clean projection deck
- `session-N-presenter.pdf` — same slides with **speaker notes embedded** as PDF notes
- plus printable handouts: presenter guides, activities, setup guide, final-project brief

See [`presenter-notes/`](presenter-notes/) for the full run-of-show, timings, "elaborate this" call-outs, live-coding scripts, common student errors, and activity solutions.

---

## 🏁 Final project

After Session 3, students build their own **SQLite-backed CRUD app** (task manager, expense tracker, notes, contacts, inventory, habit tracker, or their own idea). Full brief, requirements, milestones, and grading rubric: **[`final-project/BRIEF.md`](final-project/BRIEF.md)**.

---

## 🧰 Tech stack & versions

| Tool | Version | Why |
|---|---|---|
| Expo SDK | **56** | Run on a phone with zero native setup |
| React Native | 0.85.3 | The UI framework |
| React | 19.2.3 | Components & state |
| `expo-sqlite` | 56 | On-device SQL database for CRUD |
| Language | **JavaScript** | Simplest path for beginners (no TypeScript) |
| Slides | Marp | Markdown → PDF, speaker notes in the same file |

---

## 📅 At a glance

| # | Title | Activity | Take-home |
|---|---|---|---|
| 1 | Hello, Mobile World | Build an **About Me** card | Restyle it & add a section |
| 2 | Make It Interactive | Build a **To-Do** list | Add "clear all" + a counter |
| 3 | Save It For Real | Add **SQLite CRUD** | Start the final project |

Each session is **90 minutes**: ~10 recap · ~45 teach/live-code · ~25 guided activity · ~10 wrap-up.

---

## 📄 License

[MIT](LICENSE) — use, remix, and run this workshop freely. Attribution appreciated.

*Built for hands-on teaching. Questions or improvements welcome via issues & PRs.*
