# Sub-Phase 2: Navigation & Auth Scaffolding

## Goal
Provide a stable routing environment for the auth flows and the main application, enabling conditional routing based on authentication state.

## Tasks
1. **Create `AuthContext`**: Build `src/data/AuthContext.tsx` exposing a simple interface: `{ isAuthenticated: boolean, login: () => void, logout: () => void }`.
2. **Guarded Routing**: Refactor `src/navigation/AppNavigator.tsx` to conditionally render:
   - If `!isAuthenticated`: Return `<AuthStack />` (Landing, Login, SignUp, Verification).
   - If `isAuthenticated`: Return `<AppStack />` (Home, Nearby, CreateQuest, CurrentQuest, Settings).
3. **Wire `CreateQuest`**: Connect the `CreateQuestScreen` form to the _async_ `questStore.createQuest` method, handling the loading state.

## Verification
- Can toggle `isAuthenticated` and see the navigation stacks switch seamlessly.
- Form submission triggers async loading state before navigating away.
