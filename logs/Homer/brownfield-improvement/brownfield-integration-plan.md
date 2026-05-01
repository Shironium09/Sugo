# Brownfield Integration Plan (Kairou Blueprint)

> **Role**: Kairou (Technical Scaffolder / Architect)
> **Goal**: Unblock brownfield development for Dev B (Bryce) and Dev C (Dustin) by resolving architectural coupling in the current codebase.

---

## 1. Technical Reality Check

**Current State & Bottlenecks:**

- **Data (Bryce)**: The existing `questStore.tsx` uses synchronous `React.useState` methods. If Bryce implements `AsyncStorage` (which is inherently asynchronous), the entire UI layer will break.
- **Auth/Nav (Dustin)**: `AppNavigator.tsx` has a hardcoded initial route (`Landing`). There is no global authentication state controlling access to protected routes (like the Feed).

**Strategic Objective:**
Establish strict interface boundaries (Contracts) _before_ Bryce and Dustin begin their implementation, preventing a "Big Bang Integration" nightmare.

---

## 2. Implementation Safeguards & Contracts

- ✅ **Contract 1 (Data):** All repository operations (`createQuest`, `claimQuest`, etc.) must return `Promise<T>`. The UI must explicitly `await` these.
- ✅ **Contract 2 (State Separation):** Data persistence (Repository) must be cleanly separated from UI State Management (Context).
- ✅ **Contract 3 (Navigation Guarding):** Navigation stacks must conditionally render based on an `AuthContext` rather than relying on flat, hardcoded stacks.

---

## 3. Step-by-Step Implementation Plan

### Phase 1: Async-ify the UI Contract (Lead / Homer)

_Goal: Prepare the UI to consume asynchronous data without waiting for Bryce's actual implementation._

- [ ] **Define the Contract:** Create an `IQuestRepository` interface with `async` methods.
- [ ] **Mock Async Behavior:** Update the existing `questStore.tsx` methods to return Promises (e.g., wrap existing state mutations in `Promise.resolve` or a slight `setTimeout`).
- [ ] **Update UI Consumers:** Refactor `HomeScreen.tsx`, `AppShell.tsx`, and other components to use `await` when calling `createQuest`, `claimQuest`, etc. Add basic loading state handlers (e.g., `isSubmitting`).

### Phase 2: Navigation & Auth Scaffolding (Dustin)

_Goal: Provide a stable routing environment for the auth flows and the main application._

- [ ] **Create `AuthContext`:** Build `src/data/AuthContext.tsx` exposing a simple interface: `{ isAuthenticated: boolean, login: () => void, logout: () => void }`.
- [ ] **Guarded Routing:** Refactor `src/navigation/AppNavigator.tsx` to conditionally render:
  - If `!isAuthenticated`: Return `<AuthStack />` (Landing, Login, SignUp, Verification).
  - If `isAuthenticated`: Return `<AppStack />` (Home, Nearby, CreateQuest, CurrentQuest, Settings).
- [ ] **Wire `CreateQuest`:** Connect the `CreateQuestScreen` form to the _async_ `questStore.createQuest` method, handling the loading state.

### Phase 3: The Data Layer Drop-in (Bryce)

_Goal: Implement local persistence without touching any UI code._

- [ ] **Implement AsyncStorage:** Create `src/data/AsyncStorageQuestRepository.ts` that implements `IQuestRepository`. Handle the serialization/deserialization of the quest list.
- [ ] **Dependency Injection:** Update `QuestProvider` in `questStore.tsx` to initialize and use the `AsyncStorageQuestRepository` under the hood instead of `seedQuests`.
- [ ] **Implement Mock Verification States:** Ensure the mock payment/verification state transitions defined in the scope are handled in the repository logic.

---

## 4. Definition of Done

- [ ] **No UI blocking:** Bryce can modify the repository storage mechanism without opening a single `.tsx` UI component.
- [ ] **Safe Routing:** Dustin can build his `.edu.ph` auth stub and the UI will automatically drop him into the Feed (Home) upon successful login.
- [ ] **Synchronous Elimination:** There are zero synchronous data mutations for business logic in the app.
