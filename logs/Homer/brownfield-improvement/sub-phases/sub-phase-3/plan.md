# Sub-Phase 3: The Data Layer Drop-in

## Goal
Implement actual local persistence without touching any UI code, by dropping in a concrete implementation of the async contract defined in Phase 1.

## Tasks
1. **Implement AsyncStorage**: Create `src/data/AsyncStorageQuestRepository.ts` that implements `IQuestRepository`. Handle the serialization/deserialization of the quest list.
2. **Dependency Injection**: Update `QuestProvider` in `questStore.tsx` to initialize and use the `AsyncStorageQuestRepository` under the hood instead of `seedQuests`.
3. **Implement Mock Verification States**: Ensure the mock payment/verification state transitions defined in the scope are handled in the repository logic.

## Verification
- Data persists across app reloads.
- No UI components require updating.
