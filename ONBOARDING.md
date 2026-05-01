# 🕹️ Welcome to Sugo: Developer Onboarding

Welcome to the **Sugo** (Side Quests) development team. This document serves as your "Zero-Point Codex" for understanding the codebase, architecture, and engineering protocols of the Sugo prototype.

## 🚀 Project Overview

**Sugo** is a hyper-local, quest-based errand platform designed for university students (initially USC students). It enables users to post small "quests" (errands) for others to fulfill in exchange for rewards.

- **Vibe**: Retro-pixel aesthetic with a focus on high-legibility and fast interaction.
- **Goal**: A frictionless, local-first prototype that works end-to-end for a booth demonstration.

---

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (v54) + React Native (0.81)
- **Language**: TypeScript
- **Navigation**: [React Navigation 7](https://reactnavigation.org/)
- **Data Persistence**: `AsyncStorage` (Local-only, no backend for prototype)
- **Typography**: Pixelify Sans, IBM Plex Mono, VT323 (Google Fonts via Expo)

---

## 🗺️ Project Directory Map

```text
Sugo/
├── assets/                 # 🖼️ Images, icons, and static fonts
├── code-documentation/     # 📚 Technical SDK/API references (Expo, Navigation)
├── docs/                   # 📄 Project specs, team roles, and high-level plans
├── src/                    # 💻 Main application source
│   ├── components/         # 🧱 Reusable UI components (PixelButton, QuestCard)
│   ├── data/               # 💾 Persistence layer & Context (questStore, AuthContext)
│   ├── navigation/         # 🧭 AppNavigator and route definitions
│   ├── screens/            # 📱 Full-page views and their styles (*.styles.ts)
│   └── theme/              # 🎨 Design tokens (colors, typography)
├── App.tsx                 # 🏁 Root entry point & Provider setup
└── package.json            # 📦 Dependencies and scripts
```

---

## 🏗️ Core Architecture

### 1. Navigation Flow (`src/navigation/AppNavigator.tsx`)

- **Auth Stack**: Landing -> Login/SignUp -> Verification.
- **Main App**: Bottom Tabs (Quests, Create, Settings).
- **Detail Views**: Quests often transition into `CurrentQuestScreen` for tracking.

### 2. Data Management (`src/data/`)

- **Repository Pattern**: `AsyncStorageQuestRepository` abstracts the storage logic.
- **Context API**: `QuestProvider` and `AuthProvider` manage global state without the overhead of Redux/Zustand for this prototype.

### 3. Styling Logic (`src/theme/colors.ts`)

- **Design Tokens**: We use a central `colors.ts` for semantic color roles (e.g., `ink`, `surface`, `accentMint`).
- **Separation of Concerns**: Screen logic and styles are separated into `.tsx` and `.styles.ts` files to maintain clean components.

---

### 3. Persona Alignment

- **Planning**: Load `Kairou` (Architect) persona.
- **UI/UX**: Load `Sparks` (Designer) persona.
- **Debugging**: Load `Detective/Janitor` persona.

---

## 📖 Key References

- **Project Specs**: [docs/project_specification.md](file:///c:/Users/Peace/Documents/vscode/Personal%20Projects/Sugo/docs/project_specification.md)
- **Team Roles**: [docs/TEAM_SUMMARY.md](file:///c:/Users/Peace/Documents/vscode/Personal%20Projects/Sugo/docs/TEAM_SUMMARY.md)
- **Design Tokens**: [src/theme/colors.ts](file:///c:/Users/Peace/Documents/vscode/Personal%20Projects/Sugo/src/theme/colors.ts)

---

## 🏃 Quick Start

1.  **Dependencies**: `cmd /c npm install & REM \`
2.  **Start App**: `cmd /c npx expo start & REM \`
3.  **Check Entry**: Review `App.tsx` and `src/navigation/AppNavigator.tsx` to understand the routing.
