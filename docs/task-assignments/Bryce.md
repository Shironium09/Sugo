# Task Assignment — Bryce (Data + Quest State)

## Scope (high level)
- Own the local quest data layer and state transitions.
- Keep the demo data predictable for the Home-first flow.

## Tasks
- Maintain the quest repository backed by localStorage with an in-memory fallback.
- Keep the existing quest lifecycle rules stable: open → in_progress → resolved.
- Preserve the mock verification and payment state fields on each quest.
- Keep the seed feed data aligned with the quest card spec in the decision log.
- Guard invalid transitions such as double-claiming or resolving out of order.

## Integration notes
- The repository is now consumed by `questStore.tsx`; do not reintroduce AsyncStorage.
- Preserve the repository contract used by Home, Current Quest, and Settings.
- Keep seed data and state fields consistent with the locked quest-card and urgency decisions.

## Out of scope
- Real backend persistence.
- Real payment or verification services.

## AI handoff (short)
- Goal: keep the local quest store reliable for the POC.
- Data should work on web and degrade cleanly on native via memory fallback.
