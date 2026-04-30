# Task Assignment — Bryce (Data + Mock States)

## Scope (high level)
- Build the local data layer and state rules.
- Provide mock verification and payment states.

## Tasks
- Implement quest repository with AsyncStorage.
- Provide CRUD + state transitions (open → in_progress → resolved).
- Add guardrails (no double claim, no invalid transitions).
- Add mock verification/payment states stored on each quest.
- Seed data for the feed demo.

## Integration notes
- Publish the repository API and quest types for Dev A and Dev C.
- No UI work needed.

## Out of scope
- Real payment integration.
- External APIs.

## AI handoff (short)
- Goal: stable local repository + mock states.
- Keep APIs simple and predictable for UI use.
