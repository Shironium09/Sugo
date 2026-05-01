# Sub-Phase 1: Async-ify the UI Contract

## Goal
Prepare the UI to consume asynchronous data without waiting for the actual local storage implementation (which will be done in Phase 3).

## Tasks
1. **Define the Contract**: Create an `IQuestRepository` interface inside `questStore.tsx` (or a separate file) containing `async` signatures for operations like `createQuest`, `claimQuest`, etc.
2. **Mock Async Behavior**: Refactor current implementations in `questStore.tsx` to return Promises. Wrapping state mutations in a slight delay (e.g., `setTimeout` / `Promise.resolve`) works perfectly.
3. **Update UI Consumers**: Search for all files currently consuming `questStore` sync methods (e.g. `HomeScreen.tsx`, `AppShell.tsx`, `CreateQuestScreen.tsx`). Add `await`, ensure function wrappers are `async`, and manage loading states (like `isSubmitting = true`).

## Verification
- UI components compile and function normally.
- Artificial delay reflects loading spinners or disabled buttons in the UI.
